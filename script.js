"use strict"
let carat="█"
let prompt;
let currentdirectory=[]
let timer;
let res;
let responset;
let done;
let history=[];
let hi=0;
//list of commands avaliable
let commands={
    'ls':lis,
    'help':h,
    'cd':cd,
    'cat':ca,
    'clear':clea
}
let expanded=false
function toggleExpand(){
    expanded = !expanded;
    if (expanded){
	console.log(expanded)
        let main=document.getElementById("terminal")
	main.style.position="absolute"
	main.style.top="0px"
	main.style.left="0px"
	main.style.height="100vh"
	main.style.width="100vw"
    }else{

    }
}
//if autocomplet is wanted
let ac={
    'cat':undefined,
    'cd':undefined
}
function load(){
    document.onkeydown = checkaKey;

    clearInterval(timer)
    let t=document.getElementById("terminal")
    if (innerWidth<500){

        t.style.position="absolute"
        t.style.margin="0px"
        t.style.right="0px"
        t.style.top="0px"
        t.style.left="0px"
        t.style.width="100vw"
        t.style.height="50vh"
        t.style.borderRadius="0px"
    }else{
	t.style.verticalAlign="middle"
        t.style.margin="auto"
        t.style.borderRadius="10px"
        t.style.width="50vw"
        t.style.height="50vh"
    }
    prompt=document.getElementById("prompt").innerHTML;
    timer=setInterval(() => {
        let c=document.getElementById("cursorblink")
        if (c.innerHTML==carat){
            c.innerHTML=""
        }else{
            c.innerHTML=carat
        }
    }, 800);
    document.getElementsByClassName('command')[document.getElementsByClassName('command').length-1].focus();
}
function cwd(){
    let current=filesystem
    console.log(currentdirectory)
    for (let i=0;i<currentdirectory.length;i++){

        current=current[currentdirectory[i]]
    }
    return current
}
function checkaKey(a){
    let t=document.getElementsByClassName('command')
    if (document.activeElement==t[t.length-1])setEndOfContenteditable(t[t.length-1]);
    
    let e = a || window.event;
    e=e.keyCode;
    if(e==38) {a.preventDefault();gethistory(1);}
    if(e==40) {a.preventDefault();gethistory(-1);}
    if(e==9){a.preventDefault();autocomplete();}
}

function checkkey(key){

    if(key == 13) runcommand();
    

}
function autocomplete(){
    console.log("hello")
    let t=document.getElementsByClassName('command')
    let current=t[t.length-1]
    console.log(current)
    let cd=cwd()
    let cmd=current.innerHTML.replace(/[<]br[^>]*[>]/gi,"").replace(/&nbsp;/g,' ').trim().split(" ");
    if (cmd.length>0){
        if (cmd[0] in ac){
            console.log(cmd)
            let possible=[]
            for (const fn in cd){
                if (cmd.length>1 && fn.includes(cmd[cmd.length-1])){
		console.log(fn)
		    
                    possible.push(fn)
                }else if(cmd.length==1){possible.push(fn)}
            }
            if (possible.length==1){
		if (cmd.length>1){
                cmd.pop()}
		console.log(possible)
                current.innerHTML=cmd.concat(possible).join(" ");
                current.focus();
                setEndOfContenteditable(current)
                
            }
        }
    }
}
function gethistory(a){
    if (a>0){
        if (hi>0){
            let t=document.getElementsByClassName('command')
            if (hi==history.length){
                history.push(t[t.length-1].innerHTML)
                
            }
            hi-=1
            t[t.length-1].innerHTML=history[hi]
            setEndOfContenteditable(t[t.length-1])
        }
    }else{
        if (hi<history.length-1){
            let t=document.getElementsByClassName('command')
            
            hi+=1
            t[t.length-1].innerHTML=history[hi]
            setEndOfContenteditable(t[t.length-1])

            

        }
    }
}
//lol stolen func
function setEndOfContenteditable(contentEditableElement)
{
    let range,selection;
    if(document.createRange)//Firefox, Chrome, Opera, Safari, IE 9+
    {
        range = document.createRange();//Create a range (a range is a like the selection but invisible)
        range.selectNodeContents(contentEditableElement);//Select the entire contents of the element with the range
        range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
        selection = window.getSelection();//get the selection object (allows you to change selection)
        selection.removeAllRanges();//remove any selections already made
        selection.addRange(range);//make the range you have just created the visible selection
    }
    else if(document.selection)//IE 8 and lower
    { 
        range = document.body.createTextRange();//Create a range (a range is a like the selection but invisible)
        range.moveToElementText(contentEditableElement);//Select the entire contents of the element with the range
        range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
        range.select();//Select the range (make it the visible selection
    }
}


function runcommand(){
    let t=document.getElementsByClassName('command')
    t[t.length-1].setAttribute("contenteditable", false);
    let command=t[t.length-1].innerHTML.replace(/[<]br[^>]*[>]/gi,"").replace(/&nbsp;/g,' ').trim();
    let output=(command.length>0)?"<span style='color:red;'>abc: command not found: ".concat(command.split(' ')[0],"</span>"):""
    for (let key in commands){
        
        if (command.split(' ')[0]==key){
            hi+=1
            history=history.slice(0,hi);
            history.push(command)
            output=commands[key](command.substring(key.length+1))
        }

    }
    




    document.getElementById("history").innerHTML=document.getElementById("history").innerHTML.concat('<br>',output,(output.length>0)? '<br>' :'' , prompt)
    
    let newprompt=document.getElementsByClassName('command')[document.getElementsByClassName('command').length-1]
    newprompt.focus();
    let dir=document.getElementsByClassName('dir')[document.getElementsByClassName('dir').length-1]
    dir.innerHTML=(currentdirectory.length>0) ? currentdirectory[currentdirectory.length-1]:"root"
   function setscroll(){ 
    document.getElementById("texts").scrollTop=10000000}
      setTimeout(setscroll,100)
    


}

//ls
function lis(x,he=false){
    if (he){return "Lists all files in directory"}
    let current=cwd()
    

    console.log(current)
    let final=[]
    for (let key in current){
	    console.log(key)
        if (current[key].constructor == Object){
            final.unshift('<span style="color:white">'.concat(key,'</span>'))
        }else{final.push(key)};
    }
    return final.join('<br>')
}

//help
function h(x,he=false){
    if (he){return "Shows list commands"}
    let final='<table><tr><th>Command</th><th>Desc</th></tr>'

    for (let keys in commands){
        final=final.concat('<tr><td>',keys,'</td><td>',commands[keys]('',true),'</td></tr>')
    }
    return  final.concat('</table>')
}


//cd
function cd(x,he=false){
    if (he){return "set current folder to folder given. Usage: cd (foldername)"}
    if (x==""){currentdirectory=[]; return ''};
    x=x.split('/')
    return cd2(x)
}
function cd2(y){
    
    let current=cwd()
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
                return "<span style='color:red;'>cd: not a directory: ".concat(x,"</span>")
            }

        } else{
            return "<span style='color:red;'>cd: no such file or directory: ".concat(x,"</span>")
        }
    }
    if (y.length>0){
        return cd2(y)
    }
    return ''
}



//cat
function ca(x,he=false){
    if (he){return "Outputs content of file. Usage: cat (filename with extension)"}
    let current=cwd()
    res=''
    if (x in current){
        
        if (current[x].constructor != Object){
            let d=currentdirectory.join('/')
            res=''
            done=true
	    let loc=(window.location.pathname)
	    let path=loc.substring(0, loc.lastIndexOf('/'));
            path+="".concat("/root/",d,(d!="")?'/':'',current[x])
            console.log(path)
            let xhr = new XMLHttpRequest();
            xhr.open("GET", path, false);
            xhr.onload = function (e) {
                if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    responset=(xhr.responseText);
                } else {

                    console.log(xhr.statusText);
                    responset="<span style='color:red;'>Error Please contact person in charge</span>"


                }
                }
            };
	    xhr.setRequestHeader("Access-Control-Allow-Origin","*")
            xhr.send(null); 
            res=responset;
            return res
        }else{
            return "<span style='color:red;'>cat: not a file: ".concat(x,"</span>")
        }
    }else{
        return "<span style='color:red;'>cat: no such file or directory: ".concat(x,"</span>")
    }

    
   
}

//clear
function clea(x,h=false){
    if (h){return "Clears screen"}
    document.getElementById("history").innerHTML=""
    return ""
}
