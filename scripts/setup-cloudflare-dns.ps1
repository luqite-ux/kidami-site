# Configure Cloudflare DNS for kidami-ent.com -> Vercel
# Usage: $env:CLOUDFLARE_API_TOKEN="your_token"; .\scripts\setup-cloudflare-dns.ps1

param(
  [string]$ZoneId = "be7436eb82a35d8ec41e619120ca7b97",
  [string]$Token = $env:CLOUDFLARE_API_TOKEN
)

if (-not $Token) {
  Write-Error "Set CLOUDFLARE_API_TOKEN with Zone.DNS Edit permission for kidami-ent.com"
  exit 1
}

$headers = @{
  Authorization = "Bearer $Token"
  "Content-Type" = "application/json"
}

$records = @(
  @{ type = "CNAME"; name = "kidami-ent.com"; content = "cd78b0564eab8a46.vercel-dns-016.com"; proxied = $false },
  @{ type = "CNAME"; name = "www"; content = "cd78b0564eab8a46.vercel-dns-016.com"; proxied = $false }
)

foreach ($rec in $records) {
  $query = [uri]::EscapeDataString($rec.name)
  if ($rec.name -eq "kidami-ent.com") { $query = "kidami-ent.com" }
  $existing = Invoke-RestMethod -Uri "https://api.cloudflare.com/client/v4/zones/$ZoneId/dns_records?type=$($rec.type)&name=$query" -Headers $headers
  $body = $rec | ConvertTo-Json
  if ($existing.result.Count -gt 0) {
    $id = $existing.result[0].id
    $resp = Invoke-RestMethod -Method Put -Uri "https://api.cloudflare.com/client/v4/zones/$ZoneId/dns_records/$id" -Headers $headers -Body $body
    Write-Host "Updated $($rec.name)"
  } else {
    $resp = Invoke-RestMethod -Method Post -Uri "https://api.cloudflare.com/client/v4/zones/$ZoneId/dns_records" -Headers $headers -Body $body
    Write-Host "Created $($rec.name)"
  }
}

Write-Host "Done. Run: vercel domains verify kidami-ent.com"
