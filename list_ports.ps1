# Get a list of all TCP listening ports and their associated processes
$tcpPorts = Get-NetTCPConnection | Where-Object { $_.State -eq 'Listen' }

# Create a custom object to hold the output
$results = foreach ($port in $tcpPorts) {
    $process = Get-Process -Id $port.OwningProcess -ErrorAction SilentlyContinue
    [PSCustomObject]@{
        Port        = $port.LocalPort
        Address     = $port.LocalAddress
        ProcessName = if ($process) { $process.ProcessName } else { 'N/A' }
        PID         = $port.OwningProcess
    }
}

# Sort the results by Port in ascending order and display
$results | Sort-Object Port | Format-Table -AutoSize
