# Get current date and time
$currentDateTime = Get-Date -Format "yyyyMMdd_HHmmss"

# Set the file name with the date and time
$fileName = "sqlfile_$currentDateTime.sql"

# Run pg_dump and export to the new file name
pg_dump -U postgres -h localhost vgusls_db > $fileName
