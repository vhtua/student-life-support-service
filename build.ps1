# Docker Compose Control Panel Script

function Show-Menu {
    Clear-Host
    Write-Host "==============================="
    Write-Host "Docker Compose Control Panel" -ForegroundColor Cyan
    Write-Host "==============================="
    Write-Host "1: Basic (client + server + db + redis)"
    Write-Host "2: Dev (client + server + db + redis + pgadmin + redis_insight)"
    Write-Host "0: Exit"
    Write-Host "==============================="
}

function Start-Compose {
    param (
        [string]$composeFile
    )
    docker-compose --env-file .env.dev -f $composeFile up
}

while ($true) {
    Show-Menu
    $choice = Read-Host "Please select 1, 2, or 0" | ForEach-Object { $_.Trim() }

    switch ($choice) {
        '1' {
            Start-Compose "docker-compose.basic.yaml" 
        }
        '2' {
            Start-Compose "docker-compose.dev.yaml"
        }
        '0' {
            Write-Host "Exiting..." -ForegroundColor Yellow
            exit
        }
        default {
            Write-Host "Invalid choice. Please select 1, 2, or 0." -ForegroundColor Red
        }
    }
}
