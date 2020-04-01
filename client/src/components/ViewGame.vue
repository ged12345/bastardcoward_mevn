<template>
  <div class="typewriter">
    <h1 id="console" class="typewriter_default"></h1>
  </div>
</template>

<script>
import LocationsService from "@/services/LocationsService";

export default {
  name: "ViewGame",
  data() {
    return {
      currentLocationID: 1
    };
  },
  async mounted() {
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

    // Fetch the location information including the actions
    const locationResponse = await LocationsService.findLocation(
      this.currentLocationID
    );
    console.error(locationResponse);

    // No response to room location request
    if (locationResponse.data.length === 0) return;

    // Then we request every action to do with this room, and after the first pass where we set the description, we replace each number with whatever special symbol we decide on with a link to the action and a generic function that will run our actions for us. May even add a field in action to link to another action (one after another so we can chain them together).

    const levelString = `<br><strong>${locationResponse.data[0].title}</strong><br><br>${locationResponse.data[0].description}`;

    var levelStringIndex = 0;
    var levelStringHTMLTextIndex = 0;
    var levelStringHTMLTextStartIndex = 0;
    var levelStringHTMLTextEndIndex = 0;
    var levelStringHTMLTextLength = 0;
    var startTag = "";
    var endTag = "";
    var firstTime = true;

    setInterval(() => {
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
  }
};
</script>
<style>
#logo {
  display: inline !important;
}
</style>
