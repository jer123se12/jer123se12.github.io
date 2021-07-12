let rv;let cw;let radius;let mo;let linewidth
let pres;
let prem;
let preh;
let sp;
let sm;
let sh
let done=false;
let set=false;
function setup() {
  
  windowResized()
  createCanvas(innerWidth, innerHeight-5);
  cw=innerWidth/2
  ch=innerHeight/2
  mo=min(innerWidth,innerHeight)-50
  linewidth=(mo/2)/3
  let colrs=["#0c090d","#e01a4f","#f15946","#f9c22e","#53b3cb"]
  set=true
  
  
}

let colrs=["#0c090d","#e01a4f","#f15946","#f9c22e","#53b3cb"]
function draw() {
  d=new Date()
  let se=d.getSeconds()
  let mi=d.getMinutes()
  let ho=d.getHours()
  let millise=d.getMilliseconds()
  let s=(se+((millise)/1000)) ;
  let m=(mi+(s/60));
  let h=((ho%12)+(m/60))*30;
  m=m*6
  s=s*6
  if (millis()<500){
    
    let percent=millis()/500;
    h=h*percent;
    m=m*percent;
    s=s*percent;
    drawtime(h,m,s)
  }else if (se>58){
    let percent=1-(millise/1000);
    
    if (mi>58){
      m=m*percent
      if (ho%12==11){
        h=h*percent
      }
    }
    
    
    s=s*percent;
    drawtime(h,m,-s)
}if (set){

  
  
  
  
  noStroke();
  let d=colrs[4]
  drawingContext.shadowBlur = 0;
  fill(color(d))
  

  drawtime(h,m,s)
  
  
  // let c = color(255, 204, 0);
  // fill(c);
  // noStroke();
  // rect(30, 20, 55, 55);
  pres=second() 
  
 
 
}}
function windowResized() {
  resizeCanvas(innerWidth, innerHeight-5);
  cw=innerWidth/2
  ch=innerHeight/2
  mo=min(innerWidth,innerHeight)-50
  linewidth=(mo/2)/3
  let colrs=["#0c090d","#e01a4f","#f15946","#f9c22e","#53b3cb"]
}


















function drawtime(h,m,s){
  let d=colrs[4]
  

  background(color(d));
  
  drawingContext.shadowOffsetX = 0;
  drawingContext.shadowOffsetY = 0;
  drawingContext.shadowBlur = 20;
  drawingContext.shadowColor = 'black';
  noStroke();

  drawingContext.shadowBlur = 0;
  fill(color(d))
  circle(cw,ch,mo)

  drawingContext.shadowBlur = 20;
  var c=color(colrs[1]);
  fill(c);
  arc(cw, ch, mo, mo,(PI/-2),radians(s)-(PI/2));
  

  c=color(colrs[2]);

  drawingContext.shadowBlur = 0;
  fill(color(d))
  circle(cw,ch,mo-(linewidth))

  fill(c);
  drawingContext.shadowBlur = 20;
  arc(cw, ch, mo-linewidth, mo-linewidth,(PI/-2),radians(m)-(PI/2));

  drawingContext.shadowBlur = 0;
  fill(color(d))
  circle(cw,ch,mo-(linewidth*2))

  c=color(colrs[3]);
  fill(c);
  drawingContext.shadowBlur = 20;
  arc(cw, ch, mo-(linewidth*2), mo-(linewidth*2),(PI/-2),radians(h)-(PI/2));
  
  drawingContext.shadowBlur = 10;
  fill(color(d))
  stroke('white')
  strokeWeight(5)
  circle(cw,ch,mo-(linewidth*3))
  noStroke()


  drawingContext.shadowBlur = 0;
  textStyle(BOLD);
  textSize(innerWidth/17);
  textFont('YuKyokasho Yoko')
  fill(color('white'))
  textAlign(CENTER);
  h=String(hour()%12)
  if (h.length==1){
    h='0'.concat(h);
  }
  m=String(minute())
  if (m.length==1){
    m='0'.concat(m);
  }
  
  
  text(h+':'+m, cw, ch-(linewidth/2));
}