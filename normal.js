let filesystem={
"projects": {
	"3d+electornics": {
		"myKb.md": "mykeyboard.html"
	}, "programming": {
		"thisWebsite.md": "this_website.html",
		"tetris.md": "TeTrIs.html",
		"homepage.md":"homepage.html"
	}
}, 
"education.md": "education.html",
"skills": {
	"Proficient.md": "proficient.html", "learning.md": "learning.html"}, "aboutMe.md": "aboutme.html", "certificates": {"programming": {"NSC_2021.md": "NSC2021.html"}, "science": {"ISIS_2021.md": "ISIF2021.html"}, "cybersecurity": {"hackNFlag_2021.md": "Hack-n-Flag2021.html", "YCEP_CTF_2021.md": "YCEP-CTF2021.html"}}}
function load(){
	document.body.innerHTML=getstuff({"root":filesystem})


}
function getstuff(directory,cwd=[],depth=0){
	output=""
	console.log(directory)
	for (const fn in directory){
		console.log(fn)
		output+=`<div class="header"  onclick="toggle('${cwd[cwd.length-1]}${fn}${depth+1}')">
			<h${depth+1}>${fn}</h${depth+1}>
			</div>`
		output+=`<div id='${cwd[cwd.length-1]}${fn}${depth+1}'style='border-left: 5px solid grey;display:none;margin-left:2rem;'>`
		if (typeof directory[fn]==='string'){
			
				output+=getfile(cwd,directory[fn])

		}else{
			output+=getstuff(directory[fn],[...cwd,fn],depth+1)
		}
		output+="</div>"
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
	path+="".concat("/root/",d,(d!="")?'/':'',filename)

	console.log(path)
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
