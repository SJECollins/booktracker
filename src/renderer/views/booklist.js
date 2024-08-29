import { convertRatingToStars } from "../components/utils";
import { getBooks } from "../components/api";

const initBookListView = async () => {
  const app = document.getElementById("app");
  app.innerHTML = "<h1>Book List</h1><table id='book-list'></table>";
  const bookList = document.getElementById("book-list");
  const headerRow = document.createElement("tr");
  headerRow.innerHTML =
    "<th id='title'>Title</th><th id='author'>Author</th><th id='read'>Finished</th><th id='rating'>Rating</th><th>Edit</th>";
  bookList.appendChild(headerRow);

  let books = [];
  try {
    books = await getBooks();
    renderBooks(books);
    addSortListeners(books);
  } catch (error) {
    console.error("Error fetching books:", error);
    app.innerHTML = "<h1>Error fetching books</h1>";
  }
};

const renderBooks = (books) => {
  const bookList = document.getElementById("book-list");
  while (bookList.rows.length > 1) {
    bookList.deleteRow(1);
  }

  books.forEach((book) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td class="title-cell view-book" data-book-id="${book.id}">${
      book.title
    }</td>
      <td class="author-cell view-author" data-author-id="${book.authorId}">${
      book.author.name
    }</td>
      <td class="read-cell">${book.isRead ? "Yes" : "No"}</td>
      <td class="rating-cell">${convertRatingToStars(book.rating)}</td>
      <td><button class="edit-book" data-book-id="${book.id}">Edit</button></td>
    `;
    bookList.appendChild(row);
  });
};

const addSortListeners = (books) => {
  const headers = document.querySelectorAll("#book-list th");
  headers.forEach((header) => {
    if (header.id) {
      header.addEventListener("click", () => sortBooks(books, header.id));
    }
  });
};

const sortBooks = (books, criteria) => {
  const sortedBooks = [...books].sort((a, b) => {
    switch (criteria) {
      case "title":
        return a.title.localeCompare(b.title);
      case "author":
        return a.author.name.localeCompare(b.author.name);
      case "read":
        return (b.isRead ? 1 : 0) - (a.isRead ? 1 : 0);
      case "rating":
        return b.rating - a.rating;
      default:
        return 0;
    }
  });
  renderBooks(sortedBooks);
};

initBookListView();
