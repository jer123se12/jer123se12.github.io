"use strict"
let carat="█"
let prompt;
var currentdirectory=[]
let filesystem={
    "skills" : {
                "proficient.txt" : "proficient.txt",
                "learning.txt" : "learning.txt",
                "want_to_learn.txt":"want_to_learn.txt"
                
                },
    "projects":{
                "this.txt":"this website"
                }
}
let commands={
    'ls':lis,
    'help':h,
    'cd':cd
}
function load(){
    prompt=document.getElementById("prompt").innerHTML;
    setInterval(() => {
        var c=document.getElementById("cursorblink")
        if (c.innerHTML==carat){
            c.innerHTML=""
        }else{
            c.innerHTML=carat
        }
    }, 800);
    document.getElementsByClassName('command')[document.getElementsByClassName('command').length-1].focus();
}
function runcommand(){
    var t=document.getElementsByClassName('command')
    t[t.length-1].setAttribute("contenteditable", false);
    let command=t[t.length-1].innerHTML.replace(/[<]br[^>]*[>]/gi,"");
    var output="<span style='color:red;'>OOP command not found</span>"
    for (var key in commands){
        console.log(command.split(' ')[0])
        if (command.split(' ')[0]==key){
            output=commands[key](command.substring(key.length+1))
        }

    }
    



    
    document.getElementById("history").innerHTML=document.getElementById("history").innerHTML.concat('<br>',output,(output.length>0)? '<br>' :'' , prompt)
    document.getElementsByClassName('command')[document.getElementsByClassName('command').length-1].focus();
    var dir=document.getElementsByClassName('dir')[document.getElementsByClassName('dir').length-1]
    dir.innerHTML=(currentdirectory.length>0) ? currentdirectory[currentdirectory.length-1]:"root"
    


}
function lis (x){
    var current=filesystem
    for (var i=0;i<currentdirectory.length;i++){
        current=filesystem[currentdirectory[i]]
        
    }
    console.log(current)
    var final=[]
    for (var key in current){
        final.push(key)
    }
    return final.join('<br>')
}
function h(x){
    var final=''
    for (var keys in commands){
        final=final.concat('\t',keys)
    }
    return  final
}
function cd(x){
    var current=filesystem
    for (var i=0;i<currentdirectory.length;i++){
        current=filesystem[currentdirectory[i]]
        
    }

    x = x.replace(/[<]br[^>]*[>]/gi,"");
    console.log(x in current)
    if (x=='..'){
        if (currentdirectory.length >0){
            currentdirectory.pop()
        }
    }else{
        if (x in current){
            if (current[x].constructor == Object){
                currentdirectory.push(x)
                console.log(currentdirectory)
            }else{
                return "not dir"
            }

        } else{
            return "not in"
        }
    }
    return ''
}