import { getAuthor, createAuthor, updateAuthor } from "../components/api";

const initAuthorFormView = async () => {
  const authorId = window.viewParams.id;
  const app = document.getElementById("app");
  app.innerHTML = "<h1>Author Form</h1><form id='author-form'></form>";

  const authorForm = document.getElementById("author-form");

  try {
    let author = { name: "", bio: "" };
    if (authorId) {
      author = await getAuthor(authorId);
    }

    authorForm.innerHTML = `
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" value="${author.name}"><br>
            <label for="bio">Bio:</label>
            <textarea id="bio" name="bio">${author.bio}</textarea><br>
            <button type="submit">Save</button>
            `;
    authorForm.addEventListener("submit", (event) =>
      submitForm(event, authorId)
    );
  } catch (error) {
    console.error("Error fetching author:", error);
    app.innerHTML = "<h1>Error fetching author</h1>";
  }
};

const submitForm = async (event, authorId = null) => {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const bio = document.getElementById("bio").value;

  try {
    if (authorId) {
      await updateAuthor(authorId, { name, bio });
    } else {
      await createAuthor({ name, bio });
    }
    console.log("Author saved successfully");
  } catch (error) {
    console.error("Error saving author:", error);
    console.log("Error saving author");
  }
  window.loadView("authorlist");
};

initAuthorFormView();
