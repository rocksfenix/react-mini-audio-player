
export default function calculateTotalValue (length) {
  var minutes = Math.floor(length / 60)
  var secondsInt = length - minutes * 60
  var secondsStr = secondsInt.toString()
  var seconds = secondsStr.substr(0, 2)
  var time = minutes + ':' + seconds

  return time
}
