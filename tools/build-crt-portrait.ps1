# Build the CRT title image from the source headshot.
#
# Why a dither rather than a tone curve:
#
# The screen mesh uses a MeshStandardMaterial lit by a 0.55 ambient light, so
# everything on the CRT is multiplied down. Simply darkening the portrait to
# stop the face blowing out makes it vanish. Upstream's portrait avoids the
# problem a different way: it is a 1-bit halftone, so even the brightest areas
# are a dense pattern of lit and unlit pixels rather than a solid fill. That
# keeps facial detail readable and gives UnrealBloomPass no flat white to smear.
#
# So: keep the brightness up, and break the highlights with a Bayer 8x8 dither.
#
# Usage, from the repo root:
#   powershell -File tools/build-crt-portrait.ps1 -Source path\to\headshot.jpg

param(
  [string]$Source,
  [string]$Output
)

Add-Type -AssemblyName System.Drawing

$repo = Split-Path -Parent $PSScriptRoot
$src = if ($Source) { $Source } else { Join-Path $repo "tools\source-headshot.jpg" }
$out = if ($Output) { $Output } else { Join-Path $repo "public\images\pracheer-title.png" }

if (-not (Test-Path $src)) {
  Write-Error "Source image not found: $src"
  exit 1
}

$CANVAS_W = 640; $CANVAS_H = 320
$PORTRAIT = 330
$OFF_X = 300; $OFF_Y = -8

# Dot coverage: cap below 1.0 so the brightest patch never becomes solid.
$MAX_COVERAGE = 0.78
$DENSITY_GAMMA = 1.05
# Brightness of a lit pixel, as luminance.
$ON_LUM = 0.84
# Background crush.
$BLACK = 0.10
$KNEE  = 0.18

$bayer = @(
  @( 0,32, 8,40, 2,34,10,42),
  @(48,16,56,24,50,18,58,26),
  @(12,44, 4,36,14,46, 6,38),
  @(60,28,52,20,62,30,54,22),
  @( 3,35,11,43, 1,33, 9,41),
  @(51,19,59,27,49,17,57,25),
  @(15,47, 7,39,13,45, 5,37),
  @(63,31,55,23,61,29,53,21)
)

$img = [System.Drawing.Image]::FromFile($src)
$small = New-Object System.Drawing.Bitmap($PORTRAIT, $PORTRAIT)
$g = [System.Drawing.Graphics]::FromImage($small)
$g.InterpolationMode = 'HighQualityBicubic'
$g.DrawImage($img, 0, 0, $PORTRAIT, $PORTRAIT)
$g.Dispose(); $img.Dispose()

$canvas = New-Object System.Drawing.Bitmap($CANVAS_W, $CANVAS_H)
$cg = [System.Drawing.Graphics]::FromImage($canvas)
$cg.Clear([System.Drawing.Color]::Black)
$cg.Dispose()

for ($y = 0; $y -lt $PORTRAIT; $y++) {
  $ty = $y + $OFF_Y
  if ($ty -lt 0 -or $ty -ge $CANVAS_H) { continue }

  for ($x = 0; $x -lt $PORTRAIT; $x++) {
    $tx = $x + $OFF_X
    if ($tx -lt 0 -or $tx -ge $CANVAS_W) { continue }

    $p = $small.GetPixel($x, $y)
    $lum = (0.299 * $p.R + 0.587 * $p.G + 0.114 * $p.B) / 255.0
    if ($lum -le 0.0001) { continue }

    # fade the backdrop out entirely
    $k = ($lum - $BLACK) / $KNEE
    if ($k -lt 0) { $k = 0 }
    if ($k -gt 1) { $k = 1 }
    if ($k -le 0) { continue }

    $density = [Math]::Pow($lum, $DENSITY_GAMMA) * $MAX_COVERAGE * $k
    $threshold = ($bayer[$y % 8][$x % 8] + 0.5) / 64.0
    if ($density -le $threshold) { continue }

    # lit pixel: keep the source hue, normalise the brightness
    $scale = $ON_LUM / $lum
    $r  = [int][Math]::Round([Math]::Min(255, $p.R * $scale))
    $gg = [int][Math]::Round([Math]::Min(255, $p.G * $scale))
    $b  = [int][Math]::Round([Math]::Min(255, $p.B * $scale))

    $canvas.SetPixel($tx, $ty, [System.Drawing.Color]::FromArgb(255, $r, $gg, $b))
  }
}

$small.Dispose()
$canvas.Save($out, [System.Drawing.Imaging.ImageFormat]::Png)
$canvas.Dispose()

Get-Item $out | Select-Object Name, @{n='KB';e={[math]::Round($_.Length/1KB)}}
