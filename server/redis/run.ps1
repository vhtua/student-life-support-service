# Menu.ps1 - Script to start or stop Redis server

function Show-Menu {
    Clear-Host
    Write-Host "==============================="
    Write-Host " Redis Server Control Menu"
    Write-Host "==============================="
    Write-Host "1. Shutdown Redis Server"
    Write-Host "2. Start Redis Server"
    Write-Host "0. Exit"
    Write-Host "==============================="
}

function Shutdown-Redis {
    Write-Host "Shutting down Redis server..."
    redis-cli shutdown
    Write-Host "Redis server shutdown complete."
    Pause
}

function Start-Redis {
    Write-Host "Starting Redis server..."
    Start-Process redis-server
    Write-Host "Redis server started."
    Pause
}

# Main Menu Loop
do {
    Show-Menu
    $choice = Read-Host "Enter your choice"

    switch ($choice) {
        1 {
            Shutdown-Redis
        }
        2 {
            Start-Redis
        }
        0 {
            Write-Host "Exiting..."
        }
        default {
            Write-Host "Invalid choice. Please select 1, 2, or 0."
        }
    }
} while ($choice -ne 0)
