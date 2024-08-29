import { getBook } from "../components/api";

const initBookDetailsView = async () => {
  const bookId = window.viewParams.id;
  const app = document.getElementById("app");
  app.innerHTML = "<h1>Book Details</h1><div id='book-details'></div>";

  const bookDetails = document.getElementById("book-details");

  try {
    const book = await getBook(bookId);
    bookDetails.innerHTML = `
        <h2>${book.title}</h2>
        <p class="view-author" data-author-id="${book.authorId}">Author: ${
      book.author.name
    }</p>
        <p>Rating: ${book.rating}</p>
        <p>Read: ${book.isRead ? "Yes" : "No"}</p>
        <p>Owned: ${book.isOwned ? "Yes" : "No"}</p>
        <p>Comment: ${book.comment ? book.comment : "None"}</p>
        <div class='center-items'>
        <button id="edit-book" data-book-id="${book.id}">Edit</button>
        <button id="delete-book" data-book-id="${book.id}">Delete</button>
        </div>
        `;
  } catch (error) {
    console.error("Error fetching book:", error);
    app.innerHTML = "<h1>Error fetching book</h1>";
  }
};

initBookDetailsView();
