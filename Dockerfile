# PROFESI - Multi-service Disaster Prediction Platform
# This Dockerfile runs docker-compose to start all services

FROM docker:24-dind

# Install docker-compose and other utilities
RUN apk add --no-cache \
    docker-compose \
    python3 \
    py3-pip \
    bash

# Set working directory
WORKDIR /app

# Copy all project files
COPY . /app/

# Expose ports for all services
EXPOSE 3000 8000 8001 8002 8003 8004 8005 8006 8007 8008 5432 5050

# Start docker daemon and docker-compose
CMD ["sh", "-c", "dockerd-entrypoint.sh & docker-compose up"]
