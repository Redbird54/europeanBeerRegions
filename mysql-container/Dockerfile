# Use the official MySQL image from Docker Hub
FROM mysql:8.0

# Copy initialization SQL script
COPY ./regions_database.sql /docker-entrypoint-initdb.d/regions_database.sql

# Ensure the script has execution permissions
RUN chmod +x /docker-entrypoint-initdb.d/regions_database.sql

# Expose MySQL port (3306)
EXPOSE 3306

# Force MySQL to listen on port 3306
CMD ["mysqld", "--port=3306", "--bind-address=0.0.0.0"]

# Dummy port to satisfy Render
EXPOSE 80

# Install netcat (use the right package manager for Debian-based images)
RUN microdnf install -y nc

# Start a dummy HTTP server in the background and then start MySQL
CMD (while true; do echo -e "HTTP/1.1 200 OK\n\nHello" | nc -l -p 80; done) & docker-entrypoint.sh mysqld