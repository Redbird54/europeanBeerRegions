# Use the official MySQL image from Docker Hub
FROM mysql:8.0

# Set environment variables for MySQL credentials
ENV MYSQL_ROOT_PASSWORD=${CONTAINER_DB_ROOT_PASSWORD}
ENV MYSQL_DATABASE=${CONTAINER_DB_NAME}
ENV MYSQL_USER=${CONTAINER_DB_USER}
ENV MYSQL_PASSWORD=${CONTAINER_DB_USER_PASSWORD}

# Copy initialization SQL script
COPY ./init/regions_database.sql /tmp/regions_database.sql

# Copy custom entrypoint script
COPY ./init/init.sh /docker-entrypoint-initdb.d/init.sh

# Ensure the script has execution permissions
RUN chmod +x /docker-entrypoint-initdb.d/init.sh

# Expose MySQL port (3306)
EXPOSE 3306