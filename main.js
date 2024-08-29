const { app, BrowserWindow, ipcMain, globalShortcut } = require("electron");
const path = require("path");
const db = require("./models");
const sequelize = require("./config/database");

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "./src/preload.js"),
      contextIsolation: true,
      enableRemoteModule: false,
      nodeIntegration: false,
    },
  });

  mainWindow.loadFile("index.html");

  globalShortcut.register("CommandOrControl+R", () => {
    mainWindow.reload();
  });
}

ipcMain.handle("get-books", async () => {
  try {
    const books = await db.Book.findAll({
      include: {
        model: db.Author,
        as: "author",
        attributes: ["name"],
      },
    });
    return books.map((book) => book.toJSON());
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
});

ipcMain.handle("get-book", async (event, id) => {
  console.log("id:", id);
  try {
    const book = await db.Book.findByPk(id, {
      include: {
        model: db.Author,
        as: "author",
        attributes: ["name"],
      },
    });
    return book.toJSON();
  } catch (error) {
    console.error("Error fetching book:", error);
    throw error;
  }
});

ipcMain.handle("create-book", async (event, book) => {
  try {
    const author = await db.Author.findOne({ where: { name: book.author } });
    if (!author) {
      const newAuthor = await db.Author.create({ name: book.author });
      book.author = newAuthor.name;
      book.authorId = newAuthor.id;
    } else {
      book.author = author.name;
      book.authorId = author.id;
    }
    const newBook = await db.Book.create(book);
    return newBook;
  } catch (error) {
    console.error("Error creating book:", error);
    throw error;
  }
});

ipcMain.handle("update-book", async (event, id, bookData) => {
  try {
    const author = await db.Author.findOne({
      where: { name: bookData.author },
    });
    if (!author) {
      const newAuthor = await db.Author.create({ name: bookData.author });
      bookData.author = newAuthor.name;
      bookData.authorId = newAuthor.id;
    } else {
      bookData.author = author.name;
      bookData.authorId = author.id;
    }
    const book = await db.Book.findByPk(id);
    if (!book) {
      throw new Error("Book not found");
    }
    Object.assign(book, bookData);
    await book.save();
    return book;
  } catch (error) {
    console.error("Error updating book:", error);
    throw error;
  }
});

ipcMain.handle("delete-book", async (event, id) => {
  try {
    const book = await db.Book.findByPk(id);
    if (!book) {
      throw new Error("Book not found");
    }
    await book.destroy();
  } catch (error) {
    console.error("Error deleting book:", error);
    throw error;
  }
});

ipcMain.handle("get-authors", async () => {
  try {
    const authors = await db.Author.findAll({
      include: {
        model: db.Book,
        as: "books",
      },
    });
    return authors.map((author) => author.toJSON());
  } catch (error) {
    console.error("Error fetching authors:", error);
    throw error;
  }
});

ipcMain.handle("get-author", async (event, id) => {
  try {
    const author = await db.Author.findByPk(id, {
      include: {
        model: db.Book,
        as: "books",
      },
    });
    return author.toJSON();
  } catch (error) {
    console.error("Error fetching author:", error);
    throw error;
  }
});

ipcMain.handle("create-author", async (event, authorData) => {
  try {
    const author = await db.Author.create(authorData);
    return author;
  } catch (error) {
    console.error("Error creating author:", error);
    throw error;
  }
});

ipcMain.handle("update-author", async (event, id, authorData) => {
  try {
    const author = await db.Author.findByPk(id);
    if (!author) {
      throw new Error("Author not found");
    }

    Object.assign(author, authorData);
    await author.save();
    return author;
  } catch (error) {
    console.error("Error updating author:", error);
    throw error;
  }
});

ipcMain.handle("delete-author", async (event, id) => {
  try {
    const author = await db.Author.findByPk(id);
    if (!author) {
      throw new Error("Author not found");
    }
    await author.destroy();
  } catch (error) {
    console.error("Error deleting author:", error);
    throw error;
  }
});

app.whenReady().then(async () => {
  try {
    await db.sequelize.sync({ force: false }).then((result) => {
      console.log(result);
    });
    console.log("Database connected.");
    createWindow();

    app.on("activate", () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
      }
    });
  } catch (error) {
    console.error("Error connecting to database:", error);
    process.exit(1);
  }
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
