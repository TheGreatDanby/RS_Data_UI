#!/bin/bash

# Check if Docker daemon is running
if ! docker info >/dev/null 2>&1; then
    echo "Starting Docker..."
    # Start Docker. Command may vary based on your OS
    # For macOS:
    open /Applications/Docker.app
    # For Linux (might require sudo):
    # sudo systemctl start docker
    # Wait for Docker to start
    while ! docker info >/dev/null 2>&1; do
        echo "Waiting for Docker to start..."
        sleep 1
    done
fi

# Check if your container is running
container_name="my-container"
if [ "$(docker ps -q -f name=^/${container_name}$)" ]; then
    echo "Container ${container_name} is already running."
else
    echo "Starting container ${container_name}..."
    # Start your container here
    docker run --name ${container_name} --restart always -d your_image_name
    # Or use docker start if the container already exists
    # docker start ${container_name}
fi
