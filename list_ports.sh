#!/bin/bash

# Check for netstat command availability
if ! command -v netstat &> /dev/null; then
    echo "netstat could not be found. Please install it to run this script."
    exit 1
fi

# List all listening TCP ports and their associated processes
netstat -tuln | awk '/LISTEN/ {print $4}' | cut -d: -f2 | sort -n | uniq | while read port; do
    # Get the process name associated with the port
    pid=$(lsof -i TCP:"$port" | awk 'NR==2 {print $2}')
    process=$(ps -p "$pid" -o comm= 2>/dev/null)
    echo "Port: $port, Process: ${process:-N/A}, PID: ${pid:-N/A}"
done
