#!/bin/bash
set -e

# Wait for MySQL to be ready
echo "Waiting for MySQL to start..."
until mysql -u root -p"${MYSQL_ROOT_PASSWORD}" -e "SELECT 1" &> /dev/null; do
  sleep 2
done

# Import the database schema & data
echo "Importing regions_database.sql..."
mysql -u root -p"${MYSQL_ROOT_PASSWORD}" --default-character-set=utf8mb4 -D "${MYSQL_DATABASE}" < /tmp/regions_database.sql

echo "Database initialization complete."