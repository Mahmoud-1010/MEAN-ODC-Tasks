const express = require("express")
const app = express()

const hbs = require("hbs")
const path = require("path")

const staticFiles = path.join(__dirname,"../frontend/static")
const layoutsFiles = path.join(__dirname,"../frontend/layouts")
const viewsFiles = path.join(__dirname,"../frontend/views")

app.use(express.static(staticFiles))
app.set("view engine", "hbs")
app.set("views", viewsFiles)
hbs.registerPartials(layoutsFiles)

app.use(express.urlencoded({extended:true}))

const router = require("../router/app.routes.js")
app.use(router)
app.all('*',(req,res)=>res.render('err404',{
    pageTitle :"page note found",
    err : "invalide url please try again   "

}))
module.exports = app