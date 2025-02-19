# Use the official MySQL image from Docker Hub
FROM mysql:8.0

# Copy initialization SQL script
COPY ./init/regions_database.sql /tmp/regions_database.sql

# Copy custom entrypoint script
COPY ./init/init.sh /docker-entrypoint-initdb.d/init.sh

# Ensure the script has execution permissions
RUN chmod +x /docker-entrypoint-initdb.d/init.sh

# Expose MySQL port (3306)
EXPOSE 3306