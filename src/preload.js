const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  getBooks: () => ipcRenderer.invoke("get-books"),
  getBook: (id) => ipcRenderer.invoke("get-book", id),
  updateBook: (id, book) => ipcRenderer.invoke("update-book", id, book),
  deleteBook: (id) => ipcRenderer.invoke("delete-book", id),
  createBook: (book) => ipcRenderer.invoke("create-book", book),
  getAuthors: () => ipcRenderer.invoke("get-authors"),
  getAuthor: (id) => ipcRenderer.invoke("get-author", id),
  createAuthor: (author) => ipcRenderer.invoke("create-author", author),
  updateAuthor: (id, author) => ipcRenderer.invoke("update-author", id, author),
  deleteAuthor: (id) => ipcRenderer.invoke("delete-author", id),
});
