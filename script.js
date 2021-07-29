let did=0
var running=true
function load(){
    if (window.innerWidth>500){
        desktop()
    }else{
        mobile()
    }
    draw()
}
function mobile(){
    document.getElementById("mobile-navbar").style.display="block"
    document.getElementById("mobile-navbar").style.listStyleType = "none";
    items=document.getElementsByClassName("navitem")
    start=0
    for (let i=0;i<items.length;i++){
        items[i].style.float="none"
        items[i].style.display="none"
    }
    
    document.getElementById("mm").style.display="block"
}
function show(){
    console.log("hit")
    items=document.getElementsByClassName("navitem")
    if (items[1].style.display=="none"){
        for (let i=0;i<items.length;i++){
        items[i].style.display="block"
        }
        start=0
        id=setInterval(frame,10)
        function frame(){
        if (start>=2){
            clearInterval(id)
        }
        start+=0.1
        console.log(start)
        for (let i=0;i<items.length;i++){
            items[i].style.top=toString(start)+"rem"
            console.log(items[i].style.height)
        }
        }
    }else{
        for (let i=0;i<items.length;i++){
            items[i].style.display="none"
            }
            document.getElementById("mm").style.display="block"
    }
}

function desktop(){
    items=document.getElementsByClassName("navitem")
    for (let i=0;i<items.length;i++){
        items[i].style.display="block"
        items[i].style.float="right"
    }
    document.getElementById("mm").style.display="none"

}




function draw(){
    var canvas = document.querySelector("canvas");
    var ctx = canvas.getContext("2d");
    ctx.canvas.width  =innerWidth;
    ctx.canvas.height = innerHeight;
    var history=[]
    var x=100
    var y=100
    var v=[100,0.1]
    var s=10
    window.requestAnimationFrame(gameLoop);

    function gameLoop(ts){
        // console.log(ts);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#000000";
        ctx.fillRect(0,0,canvas.width, canvas.height)
        



        
        window.requestAnimationFrame(gameLoop);
    }
}
