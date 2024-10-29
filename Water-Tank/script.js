let count = 0;

function tableCreator(isOutput, inputarr) {
  let maxheight = Math.max.apply(null, inputarr);
  let element = "";
  let first = [];
  let last = [];
  // If the array is empty return an empty string.
  if (!inputarr || inputarr.length === 0) {
    return element;
  }
  // Loop through each element in the array.
  for (let i = 0; i < inputarr.length; i++) {
    element += "<div class=col>";
    // If the element is not 0 then it is a wall.
    if (inputarr[i] > 0) {
      first = [i, inputarr[i]];
    }
    // Loop through each element from the current to the end of the array.
    for (let l = i; l < inputarr.length; l++) {
      // If the previous element is 0 and the current element is not 0 then it is the end of a wall.
      if (inputarr[l - 1] == 0 && inputarr[l] > 0) {
        last = [l, inputarr[l]];
        break;
      }
    }
    // If the current element is between the start and end of a wall then render the water.
    if (first[0] < i && last[0] > i) {
      let min = Math.min.apply(null, [first[1], last[1]]);
      let remainingBox = maxheight - min;
      if (remainingBox >= 0) {
        // Render the empty space above the water.
        for (let b = 0; b <= remainingBox; b++) {
          element += "<div class=empty></div>";
        }
      }
      // Render the water.
      for (let w = min - 1; w >= 0; w--) {
        element += `<div class=water><p>${count + 1}</p></div>`;
        count += 1;
      }
      // Reset the last element so it can be used for the next wall.
      last = [];
    } else {
      // If the current element is not between the start and end of a wall then render the brick or empty space.
      for (let j = maxheight; j >= 0; j--) {
        if (isOutput) {
          element += "<div class=empty></div>";
        } else {
          if (j < inputarr[i]) {
            element += "<div class=brick></div>";
          } else {
            element += "<div class=empty></div>";
          }
        }
      }
    }
    element += "</div>";
  }
  // Reset the count so it can be used for the next table.
  if (!isOutput) {
    count = 0;
  }
  //return element
  return element;
}

//Function to render the two tables when the button is clicked.
function renderTables() {
  const tableElement = document.getElementById("table");
  const table1Element = document.getElementById("table1");
  const inputArray = document.getElementsByTagName("input")[0].value.split(",");

  let isAlphabet = false;
  for (let i = 0; i < inputArray.length; i++) {
    if (!Number(inputArray[i])) {
      if (inputArray[i] == 0) {
        continue;
      } else {
        isAlphabet = true;
        alert(`Invalid Input\nInput value must be a Number`);
        break;
      }
    }
  }
  if (!isAlphabet) {
    // Render the first table which does not have water
    tableElement.innerHTML = tableCreator(false, inputArray);
    // Render the second table which has water
    table1Element.innerHTML = tableCreator(true, inputArray);
    document.getElementById("input").innerText = "Input :";
    document.getElementById("output").innerText = "Output :";
    const countElement = document.getElementById("count");
    // Update the count element with the count of water
    countElement.innerText = `Water Count : ${count}`;
  }
}
