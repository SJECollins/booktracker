import { getAuthors } from "../components/api";

const renderAuthors = (authors) => {
  const authorList = document.getElementById("author-list");
  while (authorList.rows.length > 1) {
    authorList.deleteRow(1);
  }
  authors.forEach((author) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td class="name-cell view-author" data-author-id="${author.id}">${author.name}</td>
      <td class="books-cell">${author.books.length}</td>
      <td><button class="edit-author" data-author-id="${author.id}">Edit</button></td>
    `;
    authorList.appendChild(row);
  });
};

const addSortListeners = (authors) => {
  const headers = document.querySelectorAll("#author-list th");
  headers.forEach((header) => {
    if (header.id) {
      header.addEventListener("click", () => sortAuthors(authors, header.id));
    }
  });
};

const sortAuthors = (authors, criteria) => {
  const sortedAuthors = [...authors].sort((a, b) => {
    switch (criteria) {
      case "name":
        return a.name.localeCompare(b.name);
      case "book-number":
        return b.books.length - a.books.length;
      default:
        return 0;
    }
  });
  renderAuthors(sortedAuthors);
};

const initAuthorListView = async () => {
  const app = document.getElementById("app");
  app.innerHTML = "<h1>Author List</h1><table id='author-list'></table>";
  const authorList = document.getElementById("author-list");
  const headerRow = document.createElement("tr");
  headerRow.innerHTML =
    "<th id='name'>Name</th><th id='book-number'>Books</th><th>Edit</th>";
  authorList.appendChild(headerRow);

  try {
    const authors = await getAuthors();
    renderAuthors(authors);
    addSortListeners(authors);
  } catch (error) {
    console.error("Error fetching authors:", error);
    app.innerHTML = "<h1>Error fetching authors</h1>";
  }
};

initAuthorListView();
