# Use the official MySQL image from Docker Hub
FROM mysql:8.0

# Copy initialization SQL script
COPY ./regions_database.sql /docker-entrypoint-initdb.d/regions_database.sql

# Ensure the script has execution permissions
RUN chmod +x /docker-entrypoint-initdb.d/regions_database.sql

# Expose MySQL port (3306)
EXPOSE 3306