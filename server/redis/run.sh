#!/bin/bash

# Function to display the menu
show_menu() {
    clear
    echo "==============================="
    echo " Redis Server Control Menu"
    echo "==============================="
    echo "1. Shutdown Redis Server"
    echo "2. Start Redis Server"
    echo "0. Exit"
    echo "==============================="
}

# Function to shutdown Redis server
shutdown_redis() {
    echo "Shutting down Redis server..."
    redis-cli shutdown
    echo "Redis server shutdown complete."
    read -p "Press any key to continue..."
}

# Function to start Redis server
start_redis() {
    echo "Starting Redis server..."
    redis-server &
    echo "Redis server started."
    read -p "Press any key to continue..."
}

# Main menu loop
choice=3
while [ $choice -ne 0 ]; do
    show_menu
    read -p "Enter your choice: " choice
    case $choice in
        1)
            shutdown_redis
            ;;
        2)
            start_redis
            ;;
        0)
            echo "Exiting..."
            ;;
        *)
            echo "Invalid choice. Please select 1, 2, or 0."
            read -p "Press any key to continue..."
            ;;
    esac
done
