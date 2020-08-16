<template>
  <component v-bind:is="currentComponent" v-on:endTitles="nextComponent"></component>
</template>

<script>
import ViewGame from '@/components/ViewGame'
import ViewTitle from '@/components/ViewTitle'

export default {
  name: 'GameScreen',
  data () {
    return {
      currentComponent: 'view-title'
    }
  },
  components: {
    'view-title': ViewTitle,
    'view-game': ViewGame
  },
  methods: {
    nextComponent: function () {
      if (this.currentComponent === 'view-title') { this.currentComponent = 'view-game' }
    }
  },
  mounted () {
    // If a parameter is passed, then we skip the beginning page
    if (this.$route.params.id !== undefined) {
      this.nextComponent()
    }
  }
}
</script>
<style>
@font-face {
  font-family: "Ringbearer";
  src: url("../assets/fonts/Ringbearer.ttf") format("truetype");
  font-weight: 400;
  font-style: normal;
}
@font-face {
  font-family: "BlancoRegular";
  src: url("../assets/fonts/Blanco-Regular.ttf") format("truetype");
  font-weight: 400;
  font-style: normal;
}

.typewriter h1 {
  overflow: hidden; /* Ensures the content is not revealed until the animation */
  border-right: 0.15em solid black; /* The typwriter cursor */
  /*white-space: nowrap; /* Keeps the content on a single line */
  margin: 0 auto; /* Gives that scrolling effect as the typing happens */
  -webkit-animation: typing 3.5s steps(40, end),
    blink-caret 0.75s step-end infinite;
  animation: typing 3.5s steps(40, end), blink-caret 0.75s step-end infinite;
  width: 100% !important;
  height: 100%;
  font-weight: 100;
  border-width: thin;
  /*text-align: justify;  /* Or possibly left - but we still need title to be centered?*/
  text-align: left;
}

.typewriter_default {
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
  letter-spacing: 0.05em; /* Adjust as needed - was initially 0.15em*/
  font-size: 22px;
  line-height: 28px;
}

.typewriter_blanco {
  /* Blanco */
  letter-spacing: 0.05em;
  font-family: BlancoRegular;
  font-size: 18px;
}

div.typewriter {
  width: 60% !important;
  /*height: 100%; /* Removed for span in ViewTitle*/
  margin: auto;
}

/* The typing effect */
/*@-webkit-keyframes typing {
    from {
        width: 0;
    }
    to {
        width: 100%;
    }
}
@keyframes typing {
    from {
        width: 0;
    }
    to {
        width: 100%;
    }
}*/

/* The typewriter cursor effect */
@-webkit-keyframes blink-caret {
  from,
  to {
    border-color: transparent;
  }
  50% {
    border-color: black;
  }
}
@keyframes blink-caret {
  from,
  to {
    border-color: transparent;
  }
  50% {
    border-color: black;
  }
}
</style>
