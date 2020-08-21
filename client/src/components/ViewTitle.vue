<template>
  <div class="typewriter">
    <transition name="slide-fade">
      <button
        id="beginButton"
        v-if="showButton"
        class="typewriter_ringbearer"
        @click="clickToBegin"
      >
        Begin
      </button>
    </transition>
    <span>
      <transition name="slide-fade rotate">
        <h1 v-if="showTitle" class="typewriter_ringbearer" id="type_text"></h1>
      </transition>
    </span>
  </div>
</template>

<script>
import getSoundandFadeAudio from './../assets/js/fade'

export default {
  name: 'ViewTitle',
  data () {
    return {
      showTitle: false,
      showButton: true,
      buttonClicked: false,
      clearTimeoutID: 0,
      audioPlayer: null
    }
  },
  methods: {
    async clickToCancelTitle () {
      if (this.clearTimeoutID !== 0) {
        // Cancel the current timeOut
        clearTimeout(this.clearTimeoutId)

        // this.audioPlayer.pause()
        if (this.audioPlayer !== null) {
          getSoundandFadeAudio(this.audioPlayer)
        }

        // Move to the endTitles state
        this.$emit('endTitles', 'someValue')
      }
    },
    async sleepTimeout (timeInMS) {
      await new Promise(resolve => (this.clearTimeoutID = setTimeout(resolve, timeInMS)))
    },
    async clickToBegin () {
      // Debounce clicking so this code doesn't run over-and-over again
      if (this.buttonClicked === true) return
      this.buttonClicked = true

      this.showButton = false
      await this.sleepTimeout(3000)

      this.audioPlayer = new Audio([require('../assets/media/drums.mp3')])
      this.audioPlayer.volume = 0.9
      this.audioPlayer.play()

      // Manually grab the body element to add click handler to
      document.body.addEventListener('click', () => this.clickToCancelTitle())

      this.addPreTitleImage1()

      await this.sleepTimeout(2000)
      document.body.classList.add('background-image-visible')
      await this.sleepTimeout(7000)
      this.showTitle = true
      await this.sleepTimeout(200)
      this.addTitleText()
      await this.sleepTimeout(6800)
      this.showTitle = false
      document.body.classList.add('background-image-hidden')
      document.body.classList.remove('background-image-visible')

      await this.sleepTimeout(4000)

      await this.sleepTimeout(4000)
      this.showTitle = true
      this.addPreTitleImage2()
      document.body.classList.add('background-image-visible')
      document.body.classList.remove('background-image-hidden')
      await this.sleepTimeout(200)
      this.addCreditsText()
      await this.sleepTimeout(6800)
      this.showTitle = false
      await this.sleepTimeout(1000)

      await this.sleepTimeout(3000)
      document.body.classList.add('background-image-hidden')
      await this.sleepTimeout(8000)

      document.body.removeEventListener('click', () => this.clickToCancelTitle())
      // Change to Game screen component
      this.$emit('endTitles', 'someValue')
    },
    addTitleText () {
      let h1Element = document.getElementById('type_text')
      h1Element.innerHTML =
        'TextQuest<br />#1<br /><br />Heart <br />Of The <br />Bastard <br />Coward'
    },
    addPreTitleImage1 () {
      let imageLocation = require('../assets/img/title_background1.jpg')
      // document.body.style.backgroundColor = "rgba(255, 255, 255, 1.0)";
      document.body.style.backgroundImage = `url(${imageLocation})`
      document.body.style.backgroundRepeat = 'no-repeat'
      document.body.style.backgroundPositionX = 'center'
      document.body.style.backgroundPositionY = '-75%'
      document.body.style.backgroundSize = '110% 700%'
    },
    addPreTitleImage2 () {
      let imageLocation = require('../assets/img/title_background2.jpg')
      document.body.style.backgroundImage = `url(${imageLocation})`
    },
    addCreditsText () {
      let h1Element = document.getElementById('type_text')
      h1Element.innerHTML = 'Composed by <br />Robert Deskoski'
    }
  }
}
</script>
<style>
#logo {
  display: none !important;
}

body {
  background-color: rgba(255, 255, 255, 1);
  background-blend-mode: overlay;
  transition: background-color 4s ease;
  opacity: 1;
}
</style>
<style>
span {
  display: inline-block;
  vertical-align: middle;
}

#beginButton {
  border: 0;
  background-color: transparent;
  cursor: pointer;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  outline: 0;
}

#app {
  /*margin-top: 100px;*/
}

.typewriter_ringbearer {
  /* Ringbearer */
  letter-spacing: 0.05em;
  font-family: Ringbearer;
  font-size: 80px;
  color: black;
  text-align: center !important;
  line-height: 100px;
}

.typewriter {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-shadow: 3px 3px rgba(255, 255, 255, 0.4);
}

.typewriter h1 {
  -webkit-animation: none !important;
  animation: none !important;
  border-right: none !important;
}

/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
  transition: all 4.8s ease;
}
.slide-fade-leave-active {
  transition: all 4.2s cubic-bezier(1, 0.5, 0.95, 1);
}
.slide-fade-enter {
  transform: translateX(10px);
  opacity: 0;
}
.slide-fade-leave-to {
  transform: translateX(30px);
  opacity: 0;
}

/*.rotate-enter {
  transform: perspective(500px) rotate3d(0, 1, 0, 90deg);
}
.rotate-enter-active,
.rotate-leave-active {
  transition: 1.5s;
}
.rotate-leave-to {
  transform: perspective(500px) rotate3d(0, 1, 0, -90deg);
}*/

.rotate-enter {
  transform: perspective(500px) rotate3d(0, 1, 0, 90deg);
}
.rotate-enter-active {
  transition: 2.5s;
}
.rotate-leave-active {
  transition: all 5.5s cubic-bezier(1, 0.5, 0.95, 1);
}
.rotate-leave-to {
  transform: translateX(30px);
  opacity: 0;
}
* .background-image-visible {
  transition: background-color 14s ease !important;
  background: rgba(255, 255, 255, 0);
}

.background-image-hidden {
  transition: background-color 4s ease-in !important;
  background: rgba(255, 255, 255, 1);
}
</style>
