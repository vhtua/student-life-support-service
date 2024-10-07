# Get current date and time
$currentDateTime = Get-Date -Format "yyyyMMdd_HHmmss"

# Set the file name with the date and time
$fileName = "vgusls_db_$currentDateTime.sql"

# Jump back to folder backup
cd ../backup

# Run pg_dump and export to the new file name
pg_dump -U postgres -h localhost vgusls_db > $fileName
