const dealHelper = require("../helper/dealWithJson.helper")
const dataHelper = require("../helper/data.helper")
class Books{
    static allBooks = (req,res)=>{
        const books = dealHelper.readFromJSON()
        res.render("allBooks",{books,pageTitle:"allBooks",hasBooks : books.length})
    }

    static addBook = (req,res)=>res.render("addBook",{pageTitle: "add Task"})

    static addBookLogic = (req,res)=>{
        let book
        if(req.method=="POST") book = {id:date.now(), ...req.body}
        else  book = {id:Date.now(), ...req.query}
        const allBooks = dealHelper.readFromJSON()
        allBooks.push(book)
        dealHelper.writeToJSON(allBooks)
        res.redirect("/")

    }
    static showSingle = (req,res)=>{
        const allBooks = dealHelper.readFromJSON()
        // const result = all.find(task=> task.id == id )
        // const result = (dealHelper.readFromJSON()).find(task=> task.id == req.params.id)
        const book = dataHelper.getId(allBooks, "id", req.params.id)
        res.render("showSingleBook", {
            pageTitle: "single Book",
            book: allBooks[book] 
        })
    }
    static delBook = (req, res)=>{
        const allBooks = dealHelper.readFromJSON()
        // const data = all.filter(task=> task.id!=req.params.id)
        const bookIndex = dataHelper.getId(allBooks, "id", req.params.id)
        if(bookIndex!=-1) allBooks.splice(bookIndex, 1)
        dealHelper.writeToJSON(allBooks)
        res.redirect("/")
    }
    static editBooks = (req, res)=>{
        const allBooks = dealHelper.readFromJSON()
        const result = dataHelper.getId(allBooks, "id", req.params.id)
        res.render("editBook", {
            pageTitle: "edit page",
            result: allBooks[result]
        })    
    }
    static editBooksLogic = (req,res)=>{
        const allBooks = dealHelper.readFromJSON()
        const bookindex = dataHelper.getId(allBooks, "id", req.params.id)
        if(bookindex==-1) return res.render("err404", {pageTitle:"invalid", err:"invalid id"})
        const newBook = {id: req.params.id,...req.body}
        
        allBooks[bookindex] = newBook
        dealHelper.writeToJSON(allBooks)
        res.redirect(`/single/${req.params.id}`)
    }
    static sortByName=(req,res)=>{
        const books = dealHelper.readFromJSON()
        const sorter = (a, b) => a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1;
        books.sort(sorter);

        res.render("allBooks",{books,pageTitle:"allBooks",hasBooks : books.length})
    }
    static sortByNumberOfPages = (req,res)=>{
        const books = dealHelper.readFromJSON()
        // const sorter = (a, b) => a.number > b.number ? 1 : -1;
        // books.sort(sorter);
        books.sort( (a, b)=>a.number-b.number);
        res.render("allBooks",{books,pageTitle:"allBooks",hasBooks : books.length})
    }
    static search=(req,res)=>{
        let searchValue 
        searchValue = req.query
        searchValue = searchValue.searchValue
        // res.send(searchValue)
        let allBooks = dealHelper.readFromJSON()
        let books = allBooks.filter(ele=>ele.title.toLowerCase().includes(searchValue.toLowerCase()))
        res.render("allBooks",{books,pageTitle:"allBooks",hasBooks : books.length})
    }
    
} 

module.exports = Books