param(
    [string]$SecretName = 'service_account_key'
)

# Fetch the latest version of the secret into a temporary plaintext file
Write-Host "Fetching secret '$SecretName' from Secret Manager..."
$plainPath = Join-Path $PSScriptRoot 'sa_tmp.json'

gcloud secrets versions access latest --secret="$SecretName" | Out-File -FilePath $plainPath -Encoding utf8

if (-not (Test-Path $plainPath)) {
    Write-Error "Failed to fetch secret into $plainPath"
    exit 1
}

# Read and base64-encode the plaintext JSON
$raw = Get-Content $plainPath -Raw
$bytes = [System.Text.Encoding]::UTF8.GetBytes($raw)
$b64 = [Convert]::ToBase64String($bytes)

# Build .secret.local content
$projectRoot = Resolve-Path "$PSScriptRoot\..\.."
$dotSecretPath = Join-Path $projectRoot '.secret.local'

$line = "SERVICE_ACCOUNT_JSON_B64=\"$b64\""
Set-Content -Path $dotSecretPath -Value $line -Encoding utf8
Write-Host "Wrote .secret.local to $dotSecretPath"

# Clean up plaintext file
Remove-Item $plainPath -ErrorAction SilentlyContinue

Write-Host "Done. Remember to add .secret.local to .gitignore if not already ignored."