# Experiment 07: DOM Manipulation

**Course:** Backend Development

**Student:** Kabir Chaudhary

**Roll number:** 590015728

**Experiment:** Manipulate page text, styles, and elements using the Document Object Model (DOM)

## 1. Aim

To use JavaScript and the DOM to select HTML elements and respond to button clicks by changing text, toggling a CSS class, adding a new element, and removing the last element in a container.

## 2. Learning objectives

- Understand how an HTML document is represented as a DOM tree.
- Select existing elements with `document.getElementById()`.
- Register click handlers with `addEventListener()`.
- Change text using the `textContent` property.
- Add and remove CSS classes with `classList`.
- Create elements with `document.createElement()`.
- Insert elements into the page with `appendChild()`.
- Find and remove the last child element safely.

## 3. Project files and technologies

- `index.html` provides the page structure, inline CSS, initial content, and four buttons.
- `script.js` selects the relevant elements and attaches the DOM event handlers.
- `sceernshots/` contains screenshots showing the initial page and the style, add, and remove interactions.
- **HTML5** describes the page content and controls.
- **CSS** styles the page and the highlighted container state.
- **JavaScript** interacts with the DOM in the browser.

Open `index.html` in a browser to use the demonstration. The script is included with `<script src="./script.js"></script>`, so no server, package installation, or backend is required.

## 4. Initial page and DOM structure

The page declares an HTML5 document, sets the document language to English, and includes UTF-8 character encoding and a viewport meta tag. The browser tab title is **“Experiment 07 - DOM Manipulation.”**

The body contains:

- An `<h1>` with `id="heading"` and the initial text **“DOM Manipulation.”**
- A paragraph with `id="message"` containing the original message.
- A `<div>` with `id="container"` and `class="box"`.
- Two initial paragraphs inside the container, labelled **“First item”** and **“Second item.”**
- Four buttons with IDs `changeBtn`, `styleBtn`, `addBtn`, and `removeBtn`.
- A script element that loads `script.js`.

The IDs provide stable selectors for JavaScript. The `box` class supplies the initial appearance of the container, and each item paragraph uses the `item` class.

![Experiment 07 initial DOM page with two items and four controls](sceernshots/Experiment07%20-%20Initial%20DOM%20State.png)

## 5. CSS and page presentation

The styles are embedded in the HTML document's `<style>` element:

- The `body` uses Arial with a sans-serif fallback, a maximum width of 600 pixels, a 40-pixel vertical margin, and 20 pixels of padding.
- `.box` gives the item container a light gray background, 15 pixels of padding, and vertical spacing.
- `.highlight` changes the container background to yellow.
- `button` styles add padding, spacing, and a pointer cursor.

The style interaction works by toggling the `highlight` class on the container rather than directly assigning a CSS color from JavaScript. CSS therefore controls how each state looks, and JavaScript changes which state is active.

## 6. Button 1: Change Text

The `changeBtn` click handler updates two existing DOM elements:

- `heading.textContent` becomes **“DOM Manipulation Successful!”**
- `message.textContent` becomes **“The paragraph text has been changed using JavaScript.”**

`textContent` replaces the text inside each selected element. It treats the assigned value as text, rather than parsing it as HTML markup.

The folder does not contain a screenshot of the changed-text state; this behavior is described from the event handler in `script.js`.

## 7. Button 2: Change Style

The `styleBtn` click handler calls:

```js
container.classList.toggle("highlight");
```

`classList.toggle()` adds `highlight` when the class is absent and removes it when the class is already present. Repeated clicks therefore switch the container between its default light-gray background and the yellow highlighted background.

![Experiment 07 container after toggling the highlight style](sceernshots/Experiment07%20-%20Task%201%20Change%20Style.png)

## 8. Button 3: Add Element

The `addBtn` click handler:

1. Creates a new paragraph with `document.createElement("p")`.
2. Sets its text to **“New item added using the DOM!”** using `textContent`.
3. Adds the `item` class with `classList.add("item")`.
4. Appends the paragraph to the container with `container.appendChild(newItem)`.

Each click creates and appends another paragraph. The example demonstrates creating a DOM node at runtime and attaching it to an existing parent element.

![Experiment 07 page after adding a new item to the container](sceernshots/Experiment07%20-%20Task%203%20Add%20Element.png)

## 9. Button 4: Remove Element

The `removeBtn` click handler retrieves `container.lastElementChild`. If a last child exists, it calls `.remove()` on that element. This removes the final element in the container, whether it is one of the original paragraphs or a paragraph added with the Add Element button.

The `if (lastItem)` check prevents an error when the container is empty. Clicking Remove Element repeatedly removes one item at a time until none remain.

![Experiment 07 page after removing the last item](sceernshots/Experiment07%20-%20Task%204%20Remove%20Element.png)

## 10. DOM APIs and concepts used

- **`document.getElementById(id)`** finds the page element with the given ID.
- **`addEventListener("click", handler)`** runs a function in response to a button click.
- **`textContent`** reads or replaces an element's text.
- **`classList.toggle(name)`** switches a CSS class on and off.
- **`classList.add(name)`** adds a CSS class to a newly created item.
- **`document.createElement(tagName)`** creates a new element node.
- **`appendChild(node)`** adds a node at the end of a parent element's children.
- **`lastElementChild`** retrieves the last child element, or `null` when there is none.
- **`Element.remove()`** removes an element from the document.
- **Arrow functions** provide concise callback functions for the click handlers.

## 11. Expected result

On opening the page, the user sees the original heading and paragraph, a gray container with two items, and four buttons. Clicking **Change Text** updates the heading and paragraph. Clicking **Change Style** alternates the container background between gray and yellow. Clicking **Add Element** appends a new paragraph. Clicking **Remove Element** removes the current last paragraph, if one exists.

## 12. Conclusion

Experiment 07 demonstrates the DOM as a way for JavaScript to interact with and update an HTML page after it has loaded. The four controls show how to change text, toggle CSS presentation, create and append elements, and safely remove elements. Separating the page structure in HTML, presentation in CSS, and interaction logic in JavaScript makes each responsibility clear.
