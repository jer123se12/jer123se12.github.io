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
    // console.log("hit")
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
        // console.log(start)
        for (let i=0;i<items.length;i++){
            items[i].style.top=toString(start)+"rem"
            // console.log(items[i].style.height)
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
    last=0
    var x=0
    var y=0
    var s=10
    var arr = Array(Math.floor((innerHeight/s)+2)).fill().map(() => Array(Math.floor((innerWidth/s)+2)).fill().map(() => 1));
    var ps=[]
    ps=[[Math.floor(Math.random()*arr.length),Math.floor( Math.random()*arr[0].length)]]
    for (var i=0;i<Math.floor(Math.random()*arr.length)+10;i++){
        ps.push([Math.floor(Math.random()*arr[0].length),Math.floor( Math.random()*arr.length)])
    }
    var directions=[]
    for (var i=0;i<ps.length;i++){
        directions.push([Math.floor((Math.random()-0.5)*30)/10,Math.floor((Math.random()-0.5)*30)/10])
    }
    document.addEventListener("click", addpos);
    window.requestAnimationFrame(gameLoop);
    function addpos(event){
        // arr[Math.floor(event.clientY/s)][Math.floor(event.clientX/s)]=1
        // console.log(arr)
        x=Math.floor(event.clientX/s)
        y=Math.floor(event.clientY/s)
        ps.push([x,y])

    }
    function gameLoop(ts){
        // console.log(ts);


        if (last != Math.floor(ts/50)){
            last=Math.floor(ts/50)
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#000000";
        ctx.fillRect(0,0,canvas.width, canvas.height)

        arr=generation(ps,arr)
        
        for (var i=0;i<arr.length;i++){
            for (var j=0;j<arr[i].length;j++){
                if (arr[i][j]>0){
                ctx.fillStyle = `rgb(
                    ${/*Math.floor(arr[i][j]*255)*/ 50},
                    ${Math.floor(arr[i][j]*200)},
                    ${200})`;
                ctx.fillRect((j-1)*s,(i-1)*s,s,s)
            }
            }
        }
        for (var i=0;i<directions.length;i++){
            ps[i]=[ps[i][0]+directions[i][0],ps[i][1]+directions[i][1]]
            if (ps[i][0]-2<0 || ps[i][0]+2>arr[0].length){
                directions[i][0]=directions[i][0]*-1
            }
            if (ps[i][1]-2<0 || ps[i][1]+2>arr.length){
                directions[i][1]=directions[i][1]*-1
            }
            
        }


    }        
        window.requestAnimationFrame(gameLoop);
    }
}

function generation(points,l){
    // l3=l.map(x => x.map(y => Math.floor(y*90)/100))
    // l2=l.map(x => x.map(y => Math.floor(y*90)/100))
    // for (var i=0;i<l.length;i++){
    //     for (var j=0;j<l[i].length;j++){
    //         if (l[i][j]>0){
    //             if (i+1<l.length){
    //                 l2[i+1][j]=(l2[i][j]>l3[i+1][j]) ? l2[i][j]:l3[i+1][j]
    //             }
    //             if (i-1>0){
    //                 l2[i-1][j]=(l2[i][j]>l3[i-1][j]) ? l2[i][j]:l3[i-1][j]
    //             }
    //             if (j+1<l[i].length){
    //                 l2[i][j+1]=(l2[i][j]>l3[i][j+1]) ? l2[i][j]:l3[i][j+1]
    //             }
    //             if (j-1>0){
    //                 l2[i][j-1]=(l2[i][j]>l3[i][j-1]) ? l2[i][j]:l3[i][j-1]
    //             }
    //         }
    //     }
    // }
    l2=l.map(x => x.map(y => Math.floor(y*90)/100))
       for (var i=0;i<l.length;i++){
        for (var j=0;j<l[i].length;j++){
            m=1
            if (points.length>1){
            var m=Math.floor((Math.sqrt(((points[0][0]-j)**2)+((points[0][1]-i)**2))*10))/500
            for (var p=0;p<points.length;p++){
                distance=Math.floor((Math.sqrt(((points[p][0]-j)**2)+((points[p][1]-i)**2))*10))/500

                 m=(distance<m)?distance:m
            
            }    
            }
            l2[i][j]=(m>0)? m:0.1
        }
    }

    return l2
}
