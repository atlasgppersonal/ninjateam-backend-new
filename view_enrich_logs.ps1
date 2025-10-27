# PowerShell script to view Firebase logs for the most recent contactId found in logs.
# This script assumes you have the Firebase CLI installed and authenticated.

Write-Host "Fetching recent logs to identify the latest contactId..."

# Get the last 20 log entries from all functions
$recentLogs = firebase functions:log --limit 20 --json

# Parse the JSON output
$logEntries = $recentLogs | ConvertFrom-Json

# Regular expression to find contactId (UUID format) in log messages
$contactIdPattern = "[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}"

$latestContactId = $null

# Iterate through log entries from newest to oldest to find the first contactId
foreach ($entry in $logEntries) {
    if ($entry.text -match $contactIdPattern) {
        $latestContactId = $matches[0]
        Write-Host "Identified latest contactId: $latestContactId"
        break # Found the latest, exit loop
    }
}

if ($latestContactId) {
    Write-Host "Streaming logs for contactId: $latestContactId"
    Write-Host "Press Ctrl+C to stop streaming logs."
    # Stream logs, filtering by the identified contactId
    firebase functions:log --follow | Select-String -Pattern "$latestContactId"
} else {
    Write-Host "No contactId found in recent logs. Streaming all enrichContact logs."
    Write-Host "Press Ctrl+C to stop streaming logs."
    # Fallback: Stream all enrichContact logs if no contactId is found
    firebase functions:log --only enrichContact --follow
}
