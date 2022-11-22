
function load(){
	document.body.innerHTML=getstuff({"root":filesystem})


}
function getstuff(directory,cwd=[],depth=0){
	console.log(cwd)
	output=""
	console.log(directory)
	for (const fn in directory){
		console.log(fn)
		output+=`<div class="row">
				<div 	class="header"  
					style="width:100vw;max-width:80ch"
				>`+
			`<div 
				style="width:fit-content;height:fit-content"
				onclick="toggle('${cwd[cwd.length-1]}${fn}${depth+1}')"
				onmouseenter="this.style.cursor='pointer'"
				onmouseexit="this.style.cursor='default'"
			>
				<span 
					style='color:${(typeof directory[fn]==='string')?"#ff0000":"#00ff00"}'><h${depth+1}>${fn}</h${depth+1}></span>`+
			`</div></div>`
		output+=`<div id='${cwd[cwd.length-1]}${fn}${depth+1}'style='border-left: 2px solid #00ff00;display:none;margin-left:1rem; height: fit-content; width: 100vw; max-width:80ch;'>`
		if (typeof directory[fn]==='string'){
			
				output+=getfile(cwd,directory[fn])

		}else{
			output+=getstuff(directory[fn],[...cwd,fn],depth+1)
		}
		output+="</div></div>"
	}
	console.log(output)
	return output
	
}
function toggle(ele){
	if (document.getElementById(ele).style.display=="none"){
		document.getElementById(ele).style.display='block'
	}else{
		document.getElementById(ele).style.display='none'

	}


}
function getfile(currentdirectory,filename){
	let d=currentdirectory.join('/')
	res=''
	done=true
	let loc=(window.location.pathname)
	let path=loc.substring(0, loc.lastIndexOf('/'));
	path+="".concat("/",d,(d!="")?'/':'',filename)
	console.log(path)

	console.log(path)
	console.log(currentdirectory)
	let xhr = new XMLHttpRequest();
	xhr.open("GET", path, false);
	xhr.onload = function (e) {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				responset=(xhr.responseText);
			} else {
				responset="<span style='color:red'> Error in requesting file</span>"
				console.error(xhr.statusText);
			}
		}
	};
	xhr.setRequestHeader("Access-Control-Allow-Origin","*")
	xhr.send(null); 
	res=responset;
	return res


}
