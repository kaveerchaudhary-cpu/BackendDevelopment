// Select DOM elements
const heading = document.getElementById("heading");
const message = document.getElementById("message");
const container = document.getElementById("container");

// Change text
document.getElementById("changeBtn").addEventListener("click", () => {
    heading.textContent = "DOM Manipulation Successful!";
    message.textContent = "The paragraph text has been changed using JavaScript.";
});

// Change style
document.getElementById("styleBtn").addEventListener("click", () => {
    container.classList.toggle("highlight");
});

// Add a new element
document.getElementById("addBtn").addEventListener("click", () => {
    const newItem = document.createElement("p");
    newItem.textContent = "New item added using the DOM!";
    newItem.classList.add("item");
    container.appendChild(newItem);
});

// Remove the last item
document.getElementById("removeBtn").addEventListener("click", () => {
    const lastItem = container.lastElementChild;

    if (lastItem) {
        lastItem.remove();
    }
});