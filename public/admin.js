// Your Code Here

async function main() {
  //Retrieve a list of books from the server
  let response = await fetch("http://localhost:3001/listBooks");

  let listBooks = await response.json();

  listBooks.forEach(displayBook);
}

// Display a list of book titles to the admin
function displayBook(book) {
  let root = document.querySelector("#root");

  let li = document.createElement("li");
  li.textContent = book.title;

  //Place a text input next to each book title and Give each text input a value: the quantity of the associated book
  let quantityInput = document.createElement("input");
  quantityInput.value = book.quantity;

  //Place a submit button next to each text input
  let saveButton = document.createElement("button");
  saveButton.textContent = "Save";

  //retrieve the quantity from the associated text input and save the updated quantity to the server
  saveButton.addEventListener("click", () => {
    fetch("http://localhost:3001/updateBook", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: book.id,
        quantity: quantityInput.value,
      }),
    });
  });

  li.append(quantityInput, saveButton);

  root.append(li);
}

main();
