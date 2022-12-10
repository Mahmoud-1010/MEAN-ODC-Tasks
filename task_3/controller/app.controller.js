const dealHelper = require("../helper/dealWithJson.helper")
class App {
    static allTasks = (req,res)=>{
        const data = dealHelper.readFromJson()
        res.render("allTasks",{
        pageTitle:"allTask",data})
    }
    
    static addTask = (req,res)=>res.render("addTasks",{
        pageTitle:"addTask"
    })
    static addTaskLogic = (req,res)=>{
        let task ={}
        if(req.method=="POST") task = {id:Date.now(),status:false, ...req.body}
        else task = {id:Date.now(),status:false, ...req.query}
        const all = dealHelper.readFromJson()
        all.push(task)
        dealHelper.writeToJson(all)
        res.redirect("/")

    }
    static editTasks = (req,res)=>res.render("edit",{
        pageTitle:"editTasks"
    })
    static showSingle = (req,res)=>{
        const id = req.params.id
        const tasks = dealHelper.readFromJson()
        let task = tasks.find(task=>task.id==id)
        res.render("showSingle",{pageTitle:"showSingle" ,task})
    }
    static delete = (req,res)=>{
        const id = req.params.id
        const tasks = dealHelper.readFromJson()
        const index = tasks.findIndex(task=>{
            return task.id==id
        })
        tasks.splice(index,1)
        dealHelper.writeToJson(tasks)
        res.redirect("/")
        // res.send(id)
    }
    static changeStatus = (req,res)=>{
        const id = req.params.id
        const tasks = dealHelper.readFromJson()
        const index = tasks.findIndex(task=>
            task.id==id
        )
        if(index==-1) return res.send("error")
        tasks[index].status = !(tasks[index].status)
        dealHelper.writeToJson(tasks)
        res.redirect("/")
    }
}

module.exports = App;