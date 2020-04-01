<template>
  <view-title></view-title>
</template>

<script>
import ViewGame from "@/components/ViewGame";
import ViewTitle from "@/components/ViewTitle";

export default {
  name: "GameScreen",
  data() {
    return {
      currentComponent: "view-title"
    };
  },
  components: {
    "view-title": ViewTitle,
    "view-game": ViewGame
  },
  mounted() {
    const log = document.getElementById("console");

    document.addEventListener("keyup", logKey);

    function logKey(e) {
      if (`${e.key}` === "Enter") log.innerHTML += "<br />";
      else if (`${e.key}` === "Backspace") {
        var newStr = log.innerHTML.split(""); // or newStr = [...str];
        newStr.splice(newStr.length - 1, 1);
        newStr = newStr.join("");
        log.innerHTML = newStr;
      } else if (
        `${e.key}` !== "Shift" &&
        `${e.key}` !== "Control" &&
        `${e.key}` !== "Alt"
      )
        log.innerHTML += `${e.key}`;
    }

    const levelString =
      //'<div style="font-face: Ringbearer">Heart of the Bastard Coward</div>';
      "<br><strong>DROP OFF</strong><br><br>In Russia, the Kremlin told <i>journalists</i> who cover President Vladimir <h2>Putin</h2> to stay away from official events if they felt unwell as a precautionary measure to protect Kremlin staff from the coronavirus. <br> <br>Moscow says it has officially recorded 34 cases of coronavirus. It says nobody has died from the virus in Russia. ";
    var levelStringIndex = 0;
    var levelStringHTMLTextIndex = 0;
    var levelStringHTMLTextStartIndex = 0;
    var levelStringHTMLTextEndIndex = 0;
    var levelStringHTMLTextLength = 0;
    var startTag = "";
    var endTag = "";
    var firstTime = true;

    setInterval(() => {
      return;
      if (levelStringIndex > levelString.length - 1) return;

      if (levelStringHTMLTextIndex <= levelStringHTMLTextEndIndex - 1) {
        levelStringHTMLTextIndex = levelStringHTMLTextIndex + 1;

        // On the first run for these particular brackets, there are no brackets/html elements to remove
        if (!firstTime) {
          // We remove the tags, if any
          let indexToRemoveFrom = log.innerHTML.lastIndexOf(
            "<",
            log.innerHTML.length - 1 - endTag.length
          );

          let newStr = log.innerHTML.split("");
          newStr.splice(
            indexToRemoveFrom,
            startTag.length + levelStringHTMLTextLength - 1 + endTag.length
          );
          newStr = newStr.join("");
          log.innerHTML = newStr;
        } else {
          firstTime = false;
        }
        // We re-add the tags with the current text
        log.innerHTML +=
          startTag +
          levelString.substring(
            levelStringHTMLTextStartIndex,
            levelStringHTMLTextIndex
          ) +
          endTag;
      } else if (levelString.substr(levelStringIndex, 4) == "<br>") {
        console.error(levelStringIndex);
        console.error(log.innerHTML);
        log.innerHTML += "<br>";
        levelStringIndex = levelStringIndex + 4;
      } else if (levelString[levelStringIndex] == "<") {
        levelStringHTMLTextIndex = 0;
        levelStringHTMLTextStartIndex = 0;
        levelStringHTMLTextEndIndex = 0;
        levelStringHTMLTextLength = 0;
        startTag = "";
        endTag = "";
        firstTime = true;

        // Find the end of start tag
        let endOfStartTagIndex = levelString.indexOf(">", levelStringIndex);
        startTag = levelString.substring(
          levelStringIndex,
          endOfStartTagIndex + 1
        );
        endTag = startTag.slice(0, 1) + "/" + startTag.slice(1);

        levelStringHTMLTextIndex = levelStringHTMLTextStartIndex =
          levelStringIndex + startTag.length;

        // We find the second tag here and calculate the length of the HTML internal text
        levelStringHTMLTextLength =
          levelString.indexOf("<", levelStringHTMLTextIndex) -
          levelStringHTMLTextIndex;

        levelStringHTMLTextEndIndex =
          levelStringHTMLTextIndex + levelStringHTMLTextLength;

        // The below is the start of the next part of text
        levelStringIndex =
          levelString.indexOf(">", levelStringHTMLTextIndex) + 1;
      } else {
        // If no html string, then we just keep going as usual
        log.innerHTML += levelString[levelStringIndex];
        levelStringIndex++;
      }
    }, 25);
  },
  methods: {
    swapComponent: function(component) {
      this.currentComponent = component;
    }
  }
};
</script>
<style type="text/css">
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
  letter-spacing: 0.1em; /* Adjust as needed - was initially 0.15em*/
  font-size: 22px;
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
