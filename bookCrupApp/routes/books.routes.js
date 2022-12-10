const router = require("express").Router()
const booksControl = require("../controller/books.controller.js")

router.get("/", booksControl.allBooks)
router.get("/addBook", booksControl.addBook)
router.get("/addBookLogic", booksControl.addBookLogic)
router.get("/single/:id", booksControl.showSingle)
router.get("/delete/:id", booksControl.delBook)
router.get("/editBook/:id", booksControl.editBooks)
router.post("/editBook/:id", booksControl.editBooksLogic)

router.get("/sortByName", booksControl.sortByName)
router.get("/sortByNumberOfPages", booksControl.sortByNumberOfPages)
router.get("/search", booksControl.search)

module.exports = router