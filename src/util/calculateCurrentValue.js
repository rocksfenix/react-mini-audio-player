
export default function calculateCurrentValue (currentTime) {
  var currentMinute = parseInt(currentTime / 60) % 60
  var currentSecondsLong = currentTime % 60
  var currentSeconds = currentSecondsLong.toFixed()
  var currentime = (currentMinute < 10 ? '0' + currentMinute : currentMinute) + ':' + (currentSeconds < 10 ? '0' + currentSeconds : currentSeconds)

  return currentime
}
