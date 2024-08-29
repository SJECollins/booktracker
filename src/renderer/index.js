document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("app");
  window.viewParams = {};

  const loadView = (viewName, params = {}) => {
    app.innerHTML = "";
    const oldScript = document.getElementById("view-script");
    if (oldScript) {
      oldScript.remove();
    }
    window.viewParams = params;
    const script = document.createElement("script");
    script.id = "view-script";
    script.src = `dist/${viewName}.bundle.js`;
    document.body.appendChild(script);
  };

  window.loadView = loadView;

  const viewMappings = {
    "view-book-list": { view: "booklist", idParam: null },
    "view-author-list": { view: "authorlist", idParam: null },
    "view-book": { view: "bookdetails", idParam: "bookId" },
    "view-author": { view: "authordetails", idParam: "authorId" },
    "add-book": { view: "bookform", idParam: null },
    "add-author": { view: "authorform", idParam: null },
    "edit-book": { view: "bookform", idParam: "bookId" },
    "edit-author": { view: "authorform", idParam: "authorId" },
    "delete-book": { view: "deletebook", idParam: "bookId" },
    "delete-author": { view: "deleteauthor", idParam: "authorId" },
  };

  document.body.addEventListener("click", (event) => {
    const target = event.target;
    const viewConfig = Object.entries(viewMappings).find(
      ([key]) => target.id === key || target.classList.contains(key)
    );

    if (viewConfig) {
      const [, { view, idParam }] = viewConfig;
      const params = idParam ? { id: target.dataset[idParam] } : {};
      loadView(view, params);
    }
  });

  loadView("booklist");
});
