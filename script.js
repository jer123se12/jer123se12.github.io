
let prevScroll=0
let baseScroll=[]
function load(){
	prevScroll=window.scrollY
	let rotator=document.getElementsByClassName("spinner")
	for (let i=0;i<rotator.length;i++){
		
		baseScroll.push(getRotation(rotator[i]))
	}
	console.log(baseScroll);

}
function getRotation(element){
	let tr=window.getComputedStyle(element,null).getPropertyValue("transform");

	let values = tr.split('(')[1];
	values = values.split(')')[0];
	values = values.split(',');

	var a = values[0]; // 0.866025
	var b = values[1]; // 0.5
	var c = values[2]; // -0.5
	var d = values[3]; // 0.866025
	return Math.round(Math.asin(b) * (180/Math.PI))
}
function scroll(){
	let rotator=document.getElementsByClassName("spinner")
	let currentScroll=window.scrollY
	for (let i=0; i<rotator.length;i++){
		rotator[i].style.transform=`rotate(${(baseScroll[i]+currentScroll)/(rotator[i].width/100)}deg)`
		
	}
	preScroll=currentScroll;
}

