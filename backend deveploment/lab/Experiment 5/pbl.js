const library = [];

function addBook(title, author) {
    const book = {
        title: title,
        author: author,
    };

    library.push(book);
}

function findBook(title) {
    return library.find((book) => book.title === title);
}

addBook("Clean Code", "Robert C. Martin");
addBook("The Pragmatic Programmer", "Andrew Hunt");
addBook("JavaScript: The Good Parts", "Douglas Crockford");

console.log("--- Library Books ---");
console.log(library);

console.log("\n--- Find Book ---");
console.log(findBook("Clean Code"));