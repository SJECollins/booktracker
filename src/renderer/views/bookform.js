import { getBook, createBook, updateBook, getAuthor } from "../components/api";

const initBookFormView = async () => {
  const bookId = window.viewParams.id;
  const app = document.getElementById("app");
  app.innerHTML = "<h1>Book Form</h1><form id='book-form'></form>";

  const bookForm = document.getElementById("book-form");

  try {
    let book = {
      title: "",
      author: "",
      rating: "",
      isRead: false,
      isOwned: false,
      comment: "",
    };
    if (bookId) {
      book = await getBook(bookId);
    }
    bookForm.innerHTML = `
            <label for="title">Title:</label>
            <input type="text" id="title" name="title" value="${
              book.title
            }" required><br>
            <label for="author">Author:</label>
            <input type="text" id="author" name="author" value="${
              book.author ? book.author.name : ""
            }" required><br>
            <label for="rating">Rating:</label>
            <select id="rating" name="rating">
                <option value="">--</option>
                <option value="1" ${
                  book.rating === "1" ? "selected" : ""
                }>⭐</option>
                <option value="2" ${
                  book.rating === "2" ? "selected" : ""
                }>⭐⭐</option>
                <option value="3" ${
                  book.rating === "3" ? "selected" : ""
                }>⭐⭐⭐</option>
                <option value="4" ${
                  book.rating === "4" ? "selected" : ""
                }>⭐⭐⭐⭐</option>
                <option value="5" ${
                  book.rating === "5" ? "selected" : ""
                }>⭐⭐⭐⭐⭐</option>
            </select><br>
            <label for="isRead">Read:</label>
            <input type="checkbox" id="isRead" name="isRead" ${
              book.isRead ? "checked" : ""
            }><br>
            <label for="isOwned">Owned:</label>
            <input type="checkbox" id="isOwned" name="isOwned" ${
              book.isOwned ? "checked" : ""
            }><br>
            <label for="comment">Comment:</label>
            <input type="text" id="comment" name="comment" value="${
              book.comment
            }"><br>
            <button type="submit">Submit</button>
            `;
    bookForm.addEventListener("submit", (event) => submitForm(event, bookId));
  } catch (error) {
    console.error("Error fetching book:", error);
    app.innerHTML = "<h1>Error fetching book</h1>";
  }
};

const submitForm = async (event, bookId = null) => {
  event.preventDefault();
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const rating = document.getElementById("rating").value;
  const isRead = document.getElementById("isRead").checked;
  const isOwned = document.getElementById("isOwned").checked;
  const comment = document.getElementById("comment").value;

  const book = { title, author, rating, isRead, isOwned, comment };
  if (bookId) {
    try {
      const updatedBook = await updateBook(bookId, book);
      console.log("Book updated:", updatedBook);
    } catch (error) {
      console.error("Error updating book:", error);
    }
  } else {
    try {
      const newBook = await createBook(book);
      console.log("New book created:", newBook);
    } catch (error) {
      console.error("Error creating book:", error);
    }
  }
  window.loadView("booklist");
};

initBookFormView();
