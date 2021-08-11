"use strict"
let carat="█"
let prompt;
var currentdirectory=[]
var timer;
let res;
let filesystem={
    "skills" : {
                "proficient.txt" : "proficient.html",
                "learning.txt" : "learning.html",
                "want_to_learn.txt":"want_to_learn.html"
                
                },
    "projects":{
                "this.txt":"this website"
                }
}
let commands={
    'ls':lis,
    'help':h,
    'cd':cd,
    'cat':ca
}
function load(){
    console.log(window.location.href)
    clearInterval(timer)
    let t=document.getElementById("terminal")
    if (innerWidth<500){
        console.log('yes')
        t.style.position="absolute"
        t.style.margin="0px"
        t.style.right="0px"
        t.style.top="0px"
        t.style.left="0px"
        t.style.width="100vw"
        t.style.height="50vh"
    }else{
        t.style.width="100%"
        t.style.height="90%"
        t.style.margin="auto"
    }
    prompt=document.getElementById("prompt").innerHTML;
    timer=setInterval(() => {
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
        
        if (command.split(' ')[0]==key){
            output=commands[key](command.substring(key.length+1))
        }

    }
    



    console.log(output)
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
    x=x.split('/')
    return cd2(x)
}
function cd2(y){
    var current=filesystem
    for (var i=0;i<currentdirectory.length;i++){
        current=filesystem[currentdirectory[i]]
    }

    let x = y.shift().replace(/[<]br[^>]*[>]/gi,"");
    if (x=='.'){}
    else if (x=='..'){
        if (currentdirectory.length >0){
            currentdirectory.pop()
        }
    }else{
        if (x in current){
            if (current[x].constructor == Object){
                currentdirectory.push(x)

            }else{
                return "not dir"
            }

        } else{
            return "not in"
        }
    }
    if (y.length>0){
        return cd2(y)
    }
    return ''
}
function ca(x){
    var current=filesystem
    for (var i=0;i<currentdirectory.length;i++){
        current=filesystem[currentdirectory[i]]
    }
    if (x in current){
        let d=currentdirectory.join('/')
        res=''
        console.log(window.location.href.concat("root/",d,'/',current[x]))
        fetch(window.location.href.concat("root/",d))
  .then(response => response.text())
  .then((data) => {
    console.log(data)
  })
    }
    return res
   
}