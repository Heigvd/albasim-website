# Copy of the .htaccess of albasim.ch, in the root of its site folder on the server.
# The deploy never uploads it: edit it on the server, then update this copy (see the README).

# Redirect to https://albasim.ch (HTTPS, without www).
RewriteEngine On
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
