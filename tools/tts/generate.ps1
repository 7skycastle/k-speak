param(
  [string]$SentenceId = "",
  [string]$LessonId = "",
  [string]$CharacterId = "",
  [ValidateSet("natural", "slow", "")]
  [string]$Speed = "",
  [string]$Manifest = "",
  [switch]$Execute,
  [switch]$WriteManifest,
  [switch]$Force,
  [switch]$ContinueOnError
)

$argsList = @("tools/tts/generate_audio.py")
if ($SentenceId) { $argsList += @("--sentence-id", $SentenceId) }
if ($LessonId) { $argsList += @("--lesson-id", $LessonId) }
if ($CharacterId) { $argsList += @("--character-id", $CharacterId) }
if ($Speed) { $argsList += @("--speed", $Speed) }
if ($Manifest) { $argsList += @("--manifest", $Manifest) }
if ($Execute) { $argsList += "--execute" } else { $argsList += "--dry-run" }
if ($WriteManifest) { $argsList += "--write-manifest" }
if ($Force) { $argsList += "--force" }
if ($ContinueOnError) { $argsList += "--continue-on-error" }

python @argsList
