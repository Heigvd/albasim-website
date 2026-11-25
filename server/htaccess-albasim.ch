# Copy of the .htaccess of albasim.ch, in the root of its site folder on the server.
# The deploy never uploads it: edit it on the server, then update this copy (see the README).

RewriteEngine On

# Addresses of the former WordPress site, still in search results and links: send each one to
# the matching page, permanently (301), and drop their old query strings (QSD). Written to the
# final address directly, so that www and http requests take a single redirect.
# English pages lived under /en/ and at the root, French pages under /fr/. The !-f conditions
# keep the rules from catching existing files, such as team/index.html.
RewriteRule ^(?:en/)?programming-game/?$ https://albasim.ch/serious-games/programming-game/ [R=301,L,QSD]
RewriteRule ^(?:en/)?pm-game/?$ https://albasim.ch/serious-games/pm-game/ [R=301,L,QSD]
RewriteRule ^(?:en/)?mimmsim/?$ https://albasim.ch/serious-games/mimmsim/ [R=301,L,QSD]
RewriteRule ^(?:en/)?mass-casualties-triage/?$ https://albasim.ch/serious-games/mass-casualties-triage/ [R=301,L,QSD]
RewriteRule ^(?:en/)?(?:our-serious-games|references-en)(?:/.*)?$ https://albasim.ch/serious-games/ [R=301,L,QSD]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^(?:en/)?(?:team|staff)/.+$ https://albasim.ch/team/ [R=301,L,QSD]
RewriteRule ^en/(?:team|staff|about)/?$ https://albasim.ch/team/ [R=301,L,QSD]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^(?:en/)?publications(?:-2)?/.+$ https://albasim.ch/publications/ [R=301,L,QSD]
RewriteRule ^en/publications(?:-2)?/?$ https://albasim.ch/publications/ [R=301,L,QSD]
RewriteRule ^en/news(?:/.*)?$ https://albasim.ch/news/ [R=301,L,QSD]
RewriteRule ^en/(?:research|idea)/?$ https://albasim.ch/research/ [R=301,L,QSD]
RewriteRule ^en/partnership/?$ https://albasim.ch/serious-games/ [R=301,L,QSD]
RewriteRule ^en/contact-us/?$ https://albasim.ch/contact/ [R=301,L,QSD]
RewriteRule ^en(?:/.*)?$ https://albasim.ch/ [R=301,L,QSD]

RewriteRule ^fr/nos-serious-games(?:/.*)?$ https://albasim.ch/fr/serious-games/ [R=301,L,QSD]
RewriteRule ^fr/(?:references|partenariats)/?$ https://albasim.ch/fr/serious-games/ [R=301,L,QSD]
RewriteRule ^fr/(?:team(?:/.*)?|a-propos/?)$ https://albasim.ch/fr/equipe/ [R=301,L,QSD]
RewriteRule ^fr/news(?:/.*)?$ https://albasim.ch/fr/actualites/ [R=301,L,QSD]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^fr/actualites/.+$ https://albasim.ch/fr/actualites/ [R=301,L,QSD]
RewriteRule ^fr/concept/?$ https://albasim.ch/fr/recherche/ [R=301,L,QSD]
RewriteRule ^fr/(?:wegas|embed|test|page/\d+)/?$ https://albasim.ch/fr/ [R=301,L,QSD]

# Redirect to https://albasim.ch (HTTPS, without www).
RewriteCond %{HTTPS} off [OR]
RewriteCond %{HTTP_HOST} ^www\. [NC]
RewriteRule ^ https://albasim.ch%{REQUEST_URI} [R=301,L]

SetOutputFilter DEFLATE
AddOutputFilterByType DEFLATE "application/atom+xml" "application/javascript" "application/json" "application/ld+json" "application/manifest+json" "application/rdf+xml" "application/rss+xml" "application/schema+json" "application/vnd.geo+json" "application/vnd.ms-fontobject" "application/x-font-ttf" "application/x-javascript" "application/x-web-app-manifest+json" "application/xhtml+xml" "application/xml" "font/eot" "font/opentype" "image/bmp" "image/svg+xml" "image/vnd.microsoft.icon" "image/x-icon" "text/cache-manifest" "text/css" "text/html" "text/javascript" "text/plain" "text/vcard" "text/vnd.rim.location.xloc" "text/vtt" "text/x-component" "text/x-cross-domain-policy" "text/xml"

# SECTION BEGIN GIT PROTECTION
RedirectMatch 404 /\.git
# SECTION END GIT PROTECTION

# Only contact.php may run as PHP.
<FilesMatch "^(?!contact\.php$).*\.(php|phtml|phar)$">
    Require all denied
</FilesMatch>

ErrorDocument 404 /404.html
<If "%{REQUEST_URI} =~ m#^/fr(/|$)#">
    ErrorDocument 404 /fr/404/index.html
</If>
