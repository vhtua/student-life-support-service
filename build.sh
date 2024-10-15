#!/bin/bash

# Docker Compose Control Panel Script
# This script is used to start the docker-compose services based on the user's choice.
# The user can select the basic or dev configuration to start the services.
# Remember to grant execute permission to this script by running `chmod +x build.sh`.

function show_menu {
    clear
    echo "==============================="
    echo "Docker Compose Control Panel"
    echo "==============================="
    echo "1: Basic (client + server + db + redis)"
    echo "2: Dev (client + server + db + redis + pgadmin + redis_insight)"
    echo "0: Exit"
    echo "==============================="
}

function start_compose {
    local compose_file=$1
    docker-compose --env-file .env.dev -f "$compose_file" up
}

while true; do
    show_menu
    read -p "Please select 1, 2, or 0: " choice
    choice=$(echo "$choice" | xargs)  # Trim whitespace

    case $choice in
        '1')
            start_compose "docker-compose.basic.yaml" 
            ;;
        '2')
            start_compose "docker-compose.dev.yaml"
            ;;
        '0')
            echo "Exiting..."
            exit
            ;;
        *)
            echo "Invalid choice. Please select 1, 2, or 0."
            ;;
    esac
done
