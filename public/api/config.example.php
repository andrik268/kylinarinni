<?php

return [
    'db' => [
        'host' => 'localhost',
        'name' => 'timeweb_database_name',
        'user' => 'timeweb_database_user',
        'password' => 'timeweb_database_password',
        'charset' => 'utf8mb4',
    ],
    'notifications' => [
        'to_email' => 'info@example.com',
        'from_email' => 'noreply@your-domain.ru',
    ],
    'uploads' => [
        'max_size' => 5 * 1024 * 1024,
        'allowed_types' => [
            'image/jpeg' => 'jpg',
            'image/png' => 'png',
            'image/webp' => 'webp',
        ],
    ],
];
