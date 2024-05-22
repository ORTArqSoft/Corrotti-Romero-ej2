#!/bin/bash

# Start Redis container using Docker Compose
echo "Starting MongoDB container..."
docker-compose up -d

# Current directory
cd "$(dirname "$0")"

# Start the server in a new terminal window
osascript -e 'tell app "Terminal" to do script "cd '"$(pwd)"' && npm start"'
