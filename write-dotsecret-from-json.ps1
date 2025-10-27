param(
    [string]$JsonPath = 'fourth-outpost-470409-u3-a70945cd7a5b.json'
)

if (-not (Test-Path $JsonPath)) {
    Write-Error "Service account JSON not found at '$JsonPath'. Provide the path as an argument or place the file in the repo root."
    exit 1
}

Write-Host "Reading service account JSON from: $JsonPath"
$raw = Get-Content $JsonPath -Raw
$bytes = [System.Text.Encoding]::UTF8.GetBytes($raw)
$b64 = [Convert]::ToBase64String($bytes)

$dotSecretPath = Join-Path (Resolve-Path .) '.secret.local'
"SERVICE_ACCOUNT_JSON_B64=\"$b64\"" | Out-File -FilePath $dotSecretPath -Encoding utf8
Write-Host ".secret.local written to $dotSecretPath"
Write-Host "Ensure .secret.local is in your .gitignore (this repo already appends it)."

Write-Host "Done. Remove any temporary plaintext copies of the JSON if present."
