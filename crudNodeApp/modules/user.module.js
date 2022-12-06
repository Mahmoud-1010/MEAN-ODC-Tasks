heads = [
    {key:"id",default: Date.now()}, 
    {key:"name", default:null},
    {key: "age", default:null}, 
    {key:"email", default:null}, 
    {key:"status", default: false}]
const deal = require("./deal.module")
class User{
    static add(data){
        const user = {}
        heads.forEach(head => {
            if(head.default!=null) 
                user[head.key]= head.default
            else user[head.key] = data[head.key]
        });
        console.log(user)
        const all = deal.readFromJson()
        all.push(user)
        deal.writeToJson(all)
    }
    static showAll(){
        const all = deal.readFromJson()
        console.log(all)
    }
    static showSingle(arg){
        const all = deal.readFromJson()
        const ele = all.find(e=>e.id==arg.id)
        console.log(ele)
    }
    static edit(arg){
        const all = deal.readFromJson()
        const ele = all.find(e=>e.id==arg.id)
        ele.name=arg.name
        ele.age=arg.age
        ele.email=arg.email
        ele.status=arg.status
        deal.writeToJson(all)
    }
    static del(arg){
        const all = deal.readFromJson()
        const ele = all.findIndex(e=>e.id==arg.id)
        all.splice(ele,1)

        deal.writeToJson(all)

    }
    
}
module.exports = User