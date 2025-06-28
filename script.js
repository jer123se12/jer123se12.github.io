const sections=[
"about",
"projects",
"events",
"experience",
"achievements"]
let nav;
const randomAction=["BOING","CODING","DEVELOPING","DANCING","STUDYING"];
function load(){
    nav=document.getElementsByTagName("nav")[0].getElementsByTagName("a")
document.onscroll=scroll
    setCorrectTab()
    setRandomAction()
}
function setRandomAction(){
    document.getElementById("rac").innerText=randomAction[Math.floor(Math.random()*randomAction.length)];
}
function selectNav(position){
    for (let i=0;i<nav.length;i++){
        if (i==position){
            nav[i].className="selected"
        }else{
            nav[i].className=""
        }
    }
}
function setCorrectTab(){

        let selected=false;
        for (let i=0;i<sections.length;i++){
            let section=document.getElementById(sections[i])
            let scroll=window.scrollY
            +1;
           if (section.offsetTop-scroll>0) {
               selectNav(i-1)
               selected=true;
               console.log("selected")
               break
           }
        }
        if (!selected){
            selectNav(sections.length-1)
        }
}
function scroll(event){
    setCorrectTab()
}
