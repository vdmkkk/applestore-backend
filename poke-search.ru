server {
    # Listen on port 80 and redirect all traffic to HTTPS
    listen 80;
    server_name poke-search.ru www.poke-search.ru;
    return 301 https://$server_name$request_uri;
}

server {
    # SSL configuration
    listen 443 ssl http2;
    server_name poke-search.ru www.poke-search.ru;

    # Paths to Certbot's SSL files
    ssl_certificate /etc/letsencrypt/live/poke-search.ru/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/poke-search.ru/privkey.pem;

    # SSL session caching
    ssl_session_cache shared:le_nginx_SSL:10m;
    ssl_session_timeout 1440m;

    # SSL protocols and ciphers
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers on;
    ssl_ciphers 'ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256';

    # HSTS (optional)
    add_header Strict-Transport-Security "max-age=31536000; includeSubdomains; preload";

    # Diffie-Hellman parameter for DHE ciphersuites (optional)
    # Generate it using: openssl dhparam -out /etc/ssl/certs/dhparam.pem 2048
    # ssl_dhparam /etc/ssl/certs/dhparam.pem;

    # Resource locations
    location / {
        proxy_pass http://localhost:3000; # Where your node.js app is running
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /api {
        proxy_pass http://localhost:3001; # Backend
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Real-IP $remote_addr;
    }

    # Error log and access log settings
    error_log /var/log/nginx/poke-search.ru_error.log;
    access_log /var/log/nginx/poke-search.ru_access.log;

    # Other configurations...
}