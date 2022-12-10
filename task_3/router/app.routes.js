const router = require("express").Router()

const app = require("../controller/app.controller")
// app.use(express.urlencoded({extended:true}))
router.get("/",app.allTasks)
router.get("/addtask",app.addTask)
router.get("/addTaskLogic",app.addTaskLogic)
router.get("/del/:id",app.delete)
router.get("/showSingle/:id",app.showSingle)
router.get("/changeStatus/:id",app.changeStatus)
module.exports = router;