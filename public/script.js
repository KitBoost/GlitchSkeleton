// client-side js, loaded by index.html
// run by the browser each time the page is loaded

console.log("hello world :o");

// define variables that reference elements on our page
const TheList = document.getElementById("ListContainer");
const TheForm = document.querySelector("form");

// a helper function
function appendNewItem(inItem) {
  const newListItem = document.createElement("li");
  newListItem.innerText = inItem;
  TheList.appendChild(newListItem);
}

// fetch the initial list
fetch("/thelist")
  .then(response => response.json()) // parse the JSON from the server
  .then(inParsedList => {
    // remove the loading text
    TheList.firstElementChild.remove();

    // iterate through every item and add it to our page
    inParsedList.forEach(appendNewItem);

    // listen for the form to be submitted and add item when it is
    TheForm.addEventListener("submit", event => {
      // stop our form submission from refreshing the page
      event.preventDefault();

      // get item value and add it to the list
      let newItem = TheForm.elements.Suggestion.value;
      appendNewItem(newItem);

      // reset form
      TheForm.reset();
      TheForm.elements.Suggestion.focus();
    });
  });
