<?php

declare(strict_types=1);

// Receives the contact form (src/components/contact/ContactForm.astro) and emails the message.
//
// - Called by the form's script (`Accept: application/json`), it answers in JSON:
//   {"ok": true}, or {"ok": false, "error": "invalid" | "failed"}.
// - Posted by the browser without JavaScript, it redirects to the thank-you or error page.
//
// The addresses are not in the repository: they come from a config file on the server, outside
// the site folder, named after it (`/sites/contact-config-dev.albasim.ch.php` for the site in
// `/sites/dev.albasim.ch`). See server/contact-config.example.php and the README.

ini_set('display_errors', '0');

/** Pages to redirect to without JavaScript. Keep in sync with `routes` in src/i18n/ui.ts. */
const PAGES = [
    'en' => ['sent' => '/contact/thanks/', 'error' => '/contact/error/'],
    'fr' => ['sent' => '/fr/contact/merci/', 'error' => '/fr/contact/erreur/'],
];

/** Maximum lengths, in characters. Keep in sync with the `maxlength` of the form fields. */
const MAX_LENGTHS = ['name' => 100, 'email' => 254, 'subject' => 200, 'message' => 5000];

$wantsJson = str_contains($_SERVER['HTTP_ACCEPT'] ?? '', 'application/json');
$lang = ($_POST['lang'] ?? '') === 'fr' ? 'fr' : 'en';

/** Ends the request: 'sent', 'invalid' or 'failed'. */
$finish = function (string $outcome, int $status) use ($wantsJson, $lang): never {
    header('Cache-Control: no-store');
    if ($wantsJson) {
        http_response_code($status);
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode($outcome === 'sent' ? ['ok' => true] : ['ok' => false, 'error' => $outcome]);
    } else {
        header('Location: ' . PAGES[$lang][$outcome === 'sent' ? 'sent' : 'error'], true, 303);
    }
    exit;
};

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    http_response_code(405);
    header('Allow: POST');
    exit;
}

// Browsers send the page's origin with the form: refuse forms posted from other sites.
$origin = $_SERVER['HTTP_ORIGIN'] ?? null;
$host = preg_replace('/:\d+$/', '', strtolower($_SERVER['HTTP_HOST'] ?? ''));
if ($origin !== null && strtolower((string) parse_url($origin, PHP_URL_HOST)) !== $host) {
    $finish('failed', 403);
}

// Only bots fill in the honeypot: pretend the message went out, and drop it.
if (trim((string) ($_POST['website'] ?? '')) !== '') {
    $finish('sent', 200);
}

/** A posted field as trimmed text, or '' when it is missing or not text. */
$field = static fn (string $key): string => is_string($_POST[$key] ?? null) ? trim($_POST[$key]) : '';

$name = $field('name');
$email = $field('email');
$subject = $field('subject');
$message = str_replace(["\r\n", "\r"], "\n", $field('message'));

$valid = $name !== '' && $email !== '' && $message !== ''
    && filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
foreach (['name' => $name, 'email' => $email, 'subject' => $subject, 'message' => $message] as $key => $value) {
    $valid = $valid && mb_check_encoding($value, 'UTF-8') && mb_strlen($value) <= MAX_LENGTHS[$key];
}
// One-line fields must not contain line breaks or other control characters: they end up in
// the email headers, where a line break would let a bot add its own headers.
$valid = $valid && preg_match('/[\x00-\x1F\x7F]/', $name . $email . $subject) === 0;
if (!$valid) {
    $finish('invalid', 400);
}

$site = basename(__DIR__);
$configFile = dirname(__DIR__) . "/contact-config-$site.php";
$config = is_file($configFile) ? require $configFile : null;
if (
    !is_array($config)
    || filter_var($config['to'] ?? '', FILTER_VALIDATE_EMAIL) === false
    || filter_var($config['from'] ?? '', FILTER_VALIDATE_EMAIL) === false
) {
    error_log("contact.php: missing or invalid config file $configFile");
    $finish('failed', 500);
}

$body = "Name: $name\nEmail: $email\nLanguage: $lang\n"
    . ($subject !== '' ? "Subject: $subject\n" : '')
    . "\n$message\n";

$sent = mail(
    $config['to'],
    mb_encode_mimeheader("[$site] " . ($subject !== '' ? $subject : "Message from $name"), 'UTF-8'),
    quoted_printable_encode($body),
    [
        'From' => mb_encode_mimeheader('AlbaSim website', 'UTF-8') . " <{$config['from']}>",
        // The visitor's address only goes here, after the checks above: answering the email
        // writes to them.
        'Reply-To' => $email,
        'MIME-Version' => '1.0',
        'Content-Type' => 'text/plain; charset=UTF-8',
        'Content-Transfer-Encoding' => 'quoted-printable',
    ],
);

if (!$sent) {
    error_log('contact.php: mail() failed');
    $finish('failed', 500);
}
$finish('sent', 200);
