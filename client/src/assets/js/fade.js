/* eslint-disable */

export default function getSoundandFadeAudio(audioPlayer) {
  // Set the point in playback that fadeout begins. This is for a 2 second fade out.

  // These rates and the below logic create a slow easing out of the audio
  let fadeRate1 = 0.06;
  let fadeRate2 = 0.03;
  let fadeRate3 = 0.005;
  let fadeRate4 = 0.0005;
  let fadeRate = fadeRate1;

  let fadeAudio = setInterval(function() {
    // When volume at zero stop all the intervalling (Note: We may never hit less than zero - once the volume is set to negative, we get an error)
    if (audioPlayer.volume - fadeRate <= 0) {
      if (fadeRate === fadeRate1) {
        fadeRate = fadeRate2;
      } else if (fadeRate === fadeRate2) {
        fadeRate = fadeRate3;
      } else if (fadeRate === fadeRate3) {
        fadeRate = fadeRate4;
      } else {
        audioPlayer.volume = 0;
        clearInterval(fadeAudio);
      }
    }
    // Only fade if past the fade out point or not at zero already
    else {
      audioPlayer.volume -= fadeRate;
    }
  }, 300);
}
