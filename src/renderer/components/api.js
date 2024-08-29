export function getBooks() {
  return window.api.getBooks();
}

export function getBook(id) {
  return window.api.getBook(id);
}

export function createBook(book) {
  return window.api.createBook(book);
}

export function updateBook(id, book) {
  return window.api.updateBook(id, book);
}

export function deleteBook(id) {
  return window.api.deleteBook(id);
}

export function getAuthors() {
  return window.api.getAuthors();
}

export function getAuthor(id) {
  return window.api.getAuthor(id);
}

export function createAuthor(author) {
  return window.api.createAuthor(author);
}

export function updateAuthor(id, author) {
  return window.api.updateAuthor(id, author);
}

export function deleteAuthor(id) {
  return window.api.deleteAuthor(id);
}
