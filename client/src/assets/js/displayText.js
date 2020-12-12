/* eslint-disable */

export default class DisplayText {
  static displayElement = null;
  static levelStringIndex = 0;
  static levelStringHTMLTextIndex = 0;
  static levelStringHTMLTextStartIndex = 0;
  static levelStringHTMLTextEndIndex = 0;
  static levelStringHTMLTextLength = 0;
  static startTag = "";
  static endTag = "";
  static firstTime = true;

  static resetDisplay() {
    DisplayText.levelStringIndex = 0;
    DisplayText.levelStringHTMLTextIndex = 0;
    DisplayText.levelStringHTMLTextStartIndex = 0;
    DisplayText.levelStringHTMLTextEndIndex = 0;
    DisplayText.levelStringHTMLTextLength = 0;
    DisplayText.startTag = "";
    DisplayText.endTag = "";
    DisplayText.firstTime = true;
  }

  static setDisplayElement(displayElement) {
    DisplayText.displayElement = displayElement;
  }

  static display(displayString, displayElement = null) {
    // Set the display element if we haven't yet
    if (DisplayText.displayElement === null) {
      DisplayText.displayElement = displayElement;
    }

    if (DisplayText.levelStringIndex > displayString.length - 1) {
      // Stop the displaying of text.
      DisplayText.resetDisplay();
      return false;
    }

    //console.log("Display Str: " + displayString + "\r\n");
    //console.log("Display: " + DisplayText.displayElement.innerHTML + "\r\n");
    //console.log("Index: " + DisplayText.levelStringIndex + "\r\n");

    // Make this more efficient - needs to be called per a line, not per a character but is working as auto-scrolling
    window.scrollBy(0, 100);

    if (
      DisplayText.levelStringHTMLTextIndex <=
      DisplayText.levelStringHTMLTextEndIndex - 1
    ) {
      DisplayText.levelStringHTMLTextIndex =
        DisplayText.levelStringHTMLTextIndex + 1;

      // On the first run for these particular brackets, there are no brackets/html elements to remove
      if (!DisplayText.firstTime) {
        // We remove the tags, if any
        // Note: This section adds each letter with the appropriate tags, then removes them and re-adds the next letter with the appropriate tags.
        let indexToRemoveFrom = DisplayText.displayElement.innerHTML.lastIndexOf(
          "<",
          DisplayText.displayElement.innerHTML.length -
            1 -
            DisplayText.endTag.length
        );

        let newStr = DisplayText.displayElement.innerHTML.split("");
        newStr.splice(
          indexToRemoveFrom,
          DisplayText.startTag.length +
            DisplayText.levelStringHTMLTextLength -
            1 +
            DisplayText.endTag.length
        );
        newStr = newStr.join("");
        DisplayText.displayElement.innerHTML = newStr;
      } else {
        DisplayText.firstTime = false;
      }
      // We re-add the tags with the current text
      DisplayText.displayElement.innerHTML +=
        DisplayText.startTag +
        displayString.substring(
          DisplayText.levelStringHTMLTextStartIndex,
          DisplayText.levelStringHTMLTextIndex
        ) +
        DisplayText.endTag;
    } else if (
      displayString.substr(DisplayText.levelStringIndex, 4) === "<br>"
    ) {
      /* Added the break and increment the index */
      DisplayText.displayElement.innerHTML += "<br>";
      DisplayText.levelStringIndex = parseInt(DisplayText.levelStringIndex) + 4;
    } else if (displayString[DisplayText.levelStringIndex] === "<") {
      // If start of a tag, we enter this phase

      // Reset display
      DisplayText.levelStringHTMLTextIndex = 0;
      DisplayText.levelStringHTMLTextStartIndex = 0;
      DisplayText.levelStringHTMLTextEndIndex = 0;
      DisplayText.levelStringHTMLTextLength = 0;
      DisplayText.startTag = "";
      DisplayText.endTag = "";
      DisplayText.firstTime = true;

      // Find the end of start tag
      let endOfStartTagIndex = displayString.indexOf(
        ">",
        DisplayText.levelStringIndex
      );
      DisplayText.startTag = displayString.substring(
        DisplayText.levelStringIndex,
        endOfStartTagIndex + 1
      );
      DisplayText.endTag =
        DisplayText.startTag.slice(0, 1) + "/" + DisplayText.startTag.slice(1);

      DisplayText.levelStringHTMLTextIndex = DisplayText.levelStringHTMLTextStartIndex =
        DisplayText.levelStringIndex + DisplayText.startTag.length;

      // We find the second tag here and calculate the length of the HTML internal text
      DisplayText.levelStringHTMLTextLength =
        displayString.indexOf("<", DisplayText.levelStringHTMLTextIndex) -
        DisplayText.levelStringHTMLTextIndex;

      DisplayText.levelStringHTMLTextEndIndex =
        DisplayText.levelStringHTMLTextIndex +
        DisplayText.levelStringHTMLTextLength;

      // The below is the start of the next part of text
      DisplayText.levelStringIndex =
        parseInt(
          displayString.indexOf(">", DisplayText.levelStringHTMLTextIndex)
        ) + 1;
    } else {
      // If no html string, then we just keep going as usual
      DisplayText.displayElement.innerHTML +=
        displayString[DisplayText.levelStringIndex];
      DisplayText.levelStringIndex++;
    }

    return true;
  }
}
