<?php

// Template of the contact form configuration, read by public/contact.php.
//
// Never put the real file in the repository. Create it on the server, in the folder that holds
// the sites (`/sites/`), next to the site folder, never inside it. Name it after the site folder:
// - `/sites/contact-config-dev.albasim.ch.php` for dev.albasim.ch;
// - `/sites/contact-config-albasim.ch.php` for albasim.ch.
// Then replace the two addresses below.

return [
    // Where the messages go. On dev.albasim.ch, use a test address.
    'to' => 'recipient@example.org',
    // Sender of the messages: an existing mailbox, the same as the "Sender Email" in the site's
    // advanced settings in the Infomaniak Manager, otherwise the messages may be refused.
    // Replies go to the visitor, not to it.
    'from' => 'sender@example.org',
];
