import { getAuthor } from "../components/api";

const initAuthorDetailView = async () => {
  const authorId = window.viewParams.id;
  const app = document.getElementById("app");
  app.innerHTML = "<h1>Author Detail</h1><div id='author-detail'></div>";

  const authorDetail = document.getElementById("author-detail");

  try {
    const author = await getAuthor(authorId);
    console.log(author);

    authorDetail.innerHTML = `
                <h2>${author.name}</h2>
                <p>${author.bio}</p>
                <div id="books">
                <h3>Books</h3>
                <ul>
                ${
                  author.books.length > 0
                    ? author.books
                        .map(
                          (book) => `<li>
                    <a href="#" class="view-book" data-book-id="${book.id}">${book.title}</a>
                    </li>`
                        )
                        .join("")
                    : "<li>No books found</li>"
                }
                </div>
                <div id='center-items'>
                <button id="edit-author" data-author-id="${
                  author.id
                }">Edit</button>
                <button id="delete-author" data-author-id="${
                  author.id
                }">Delete</button>
                </div>
                `;
  } catch (error) {
    console.error("Error fetching author:", error);
    app.innerHTML = "<h1>Error fetching author</h1>";
  }
};

initAuthorDetailView();
