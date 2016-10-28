//Variables used
var Openlist=[];
var Closedlist=[];
var Path=[];
var target;
var pointer=null;
var near=[];
var blocked=[];
var starts;
var parent=null;
var costc=0;
var parentfound=[];
var auto;
var quit=0;


var x;
var over=false;
function init(){
	var start=null;
	var end=null;
	var count=1;
	var input;
	document.getElementById("Main").innerHTML = "";		//creates a grid with individual nodes
	for (var i=0,counts=1;i<104;i++,counts++) {
		input = document.createElement("div");
		input.className = "node" + count.toString();
		input.style.position = "relative";
		input.style.border = "solid";
		input.style.width = "100px";
		input.style.height = "100px";
		input.style.borderWidth = "5px";
		input.id = counts.toString();
		input.onclick=get;
		var c = i / 8;
		c = Math.floor(c);
		input.style.left = 110 * c + "px";
		input.style.bottom = 880 * c + "px";
		document.getElementById("Main").appendChild(input);
		count +=1;
	}
	function block(){			// image used for the obstacles
		this.style.backgroundImage="url('brick.jpg')"

		this.onclick=remove;
		blocked.push(this.id)
	}
	function remove(){			//clicks on a node makes a block
		this.style.backgroundImage=""
		var index=blocked.indexOf(this.id.toString());
		blocked.splice(index,1);
		this.onclick=block;


	}

	function get(){			//start and blocks leading goal are green
		if (start==null){
			start=this;
			start.style.backgroundColor="green";
			var tt='<div style="font-size: 40px;color:white"> Start </div>'
			start.innerHTML=tt;
			starts=this.id
		auto=starts}

		else if (start!=null && end==null) {  //neighbors are bordered by red
			end=this;
			end.style.backgroundColor="red";
			var tt='<div style="font-size: 40px;color:white"> Goal </div>'
			end.innerHTML=tt;
			target=this.id;
			for (var i=0,counts=1;i<104;i++,counts++) {
				input = document.getElementById(counts.toString());
				input.onclick=block;}
		}


	}
}
function jump() {			//the Jump search algorith

	var tester = starts;
	var nodesfound = []
	var vtest = tester;
	var y = vtest;
	var previous;
	var down = [1, 9, 17, 25, 33, 41, 49, 57, 65, 73, 81, 89, 97];  //these are the edges where the nodes can't go past
	var up = [0, 8, 16, 24, 32, 40, 48, 56, 64, 72, 80, 88, 96];
	var left = [-7, -6, -5, -4, -3, -2, -1, 0];
	var altleft = [1, 2, 3, 4, 5, 6, 7, 8];
	var diagleft = [-8, -7, -6, -5, -4, -3, -2, -1, 0, 8, 16, 24, 32, 40, 48, 56, 64, 72, 80, 88, 96];
	var diagdownleft = [-6, -5, -4, -3, -2, -1, 0, 1, 9, 17, 25, 34, 42, 50, 58, 66, 74, 82, 90, 98, 106, 114];
	var prev;
	x = tester;     //Function for diagonal left up and down
	maincheck();


	y = tester;  //function for up
	prev = y;


	function maincheck() {    //fuction to check vertical, diagonal left, and diagonal down,left
		var right = [105, 106, 107, 108, 109, 110, 111, 112];
		var left = [-7, -6, -5, -4, -3, -2, -1, 0];

		while (true) {
			if ((blocked.includes(x.toString()) == false) && left.includes(parseInt(x)) == false) {
				document.getElementById(x.toString()).style.backgroundColor = "green";
				x = parseInt(x) - 8;
			}
			else if (blocked.includes(x.toString()) == true) {
				x += 8;
				block = x;
				prev = x;
				Vertical(x);   //looks up and down for goal/obstacles
				diagupleft();	//if horizonal and vertical fail, looks diagonal
				diagdownleftfunc();
				break;
			}


			else {
				break;
			}

		}

		x = tester;
		while (true) { 												//function for diagonal right up and down
			if ((blocked.includes(x.toString()) == false) && right.includes(parseInt(x)) == false) {
				document.getElementById(x.toString()).style.backgroundColor = "green";
				x = parseInt(x) + 8;
			}
			else if (blocked.includes(x.toString()) == true) {
				x -= 8;
				block = x;
				x = block;
				prev = x;
				Vertical(x);
				diagupright();
				diagdownright();
				var len = nodesfound.length
				if (len > 0) {
					var send = nodesfound.pop();
				}
				else{
					var send=previous
				}
				while (len != 0 && previous != send) {

					block = send;

					previous = send;
					vtest=send;
					x = send;
					y = send;
					tester = send;
					maincheck();



				}break}



			else {
				break;
			}
		}
		prev = y;
		y = tester;	//function for down
		while (true) {
			if ((blocked.includes(y.toString()) == false) && (down.includes(parseInt(y)) == false) || y == tester) {
				document.getElementById(y.toString()).style.backgroundColor = "green";
				y = parseInt(y) + 1;
			}
			else if (blocked.includes(y.toString()) == true) {
				y -= 1;
				x = y;
				block = x;
				prev = x;
				Horizontal(block);
				diagdownleftfunc();
				diagdownright();



			 var len = nodesfound.length
			if (len > 0) {
				var send = nodesfound.pop();
			}
			else{
				var send=previous
			}
			while (len != 0 && previous != send) {

				block = send;

				previous = send;
				vtest=send;
				x = send;
				y = send;
				tester = send;
				maincheck();



			}break}


		else
			{
				break;
			}
		}
		prev = y;

		y = tester;	//function for down
		while (true) {
			if ((blocked.includes(y.toString()) == false) && (up.includes(parseInt(y)) == false) || y == tester) {
				document.getElementById(y.toString()).style.backgroundColor = "green";
				y = parseInt(y) - 1;
			}
			else if (blocked.includes(y.toString()) == true) {
				y += 1;
				x = y;
				block = x;
				prev = x;
				Horizontal(block);
				diagupright();
				diagupleft()
				break;
			}
			else {
				break;
			}
		}
	}

	/*	function diagvertright(){

	 var down = [1, 9, 17, 25, 33, 41, 49, 57, 65, 73, 81, 89, 97];
	 var altright = [97, 98, 99, 100, 101, 102, 103, 104];
	 var diagright = [8, 16, 24, 32, 40, 48, 56, 64, 72, 80, 88, 96, 104, 105, 106, 107, 108, 109, 110, 111];
	 x=block;
	 prev = x;
	 while (((diagright.includes(x) == false && up.includes(prev) == false && altright.includes(prev) == false)) && x <= 104 && blocked.includes(x.toString()) == false) {
	 prev = x;
	 document.getElementById(x.toString()).style.backgroundColor = "green";
	 x = parseInt(x) + 7;
	 }
	 } */
	function vertdownleft() {

	}

	function Vertical(start) {
		prev = y;
		y = start;	//function for down
		while (true) {
			if ((blocked.includes(y.toString()) == false) && (down.includes(parseInt(y)) == false) || y == tester) {
				document.getElementById(y.toString()).style.backgroundColor = "green";
				y = parseInt(y) + 1;
			}
			else {
				break;
			}
		}

		prev = y;
		y = start;	//function for down
		while ((blocked.includes(y.toString()) == false) && (up.includes(parseInt(y)) == false) || y == tester) {
			document.getElementById(y.toString()).style.backgroundColor = "green";
			y = parseInt(y) - 1;
		}
		y = tester;
		prev = tester;
	}

	function Horizontal(start) {
		var right = [105, 106, 107, 108, 109, 110, 111, 112];
		x = start;	//function for down
		prev = x;
		while (true) { 												//function for diagonal right up and down
			if ((blocked.includes(x.toString()) == false) && right.includes(parseInt(x)) == false) {
				document.getElementById(x.toString()).style.backgroundColor = "green";
				x = parseInt(x) + 8;
			}
			else {
				break;
			}
		}
		x = start;	//function for down
		prev = x;
		while (true) {
			if ((blocked.includes(x.toString()) == false) && left.includes(parseInt(x)) == false) {
				document.getElementById(x.toString()).style.backgroundColor = "green";
				x = parseInt(x) - 8;
			}
			else {
				break
			}
		}

	}

	function diagupright() {   //check diagonal up right when horizonal and vertical don't have obstacles/no goal

		var down = [1, 9, 17, 25, 33, 41, 49, 57, 65, 73, 81, 89, 97];
		var altright = [97, 98, 99, 100, 101, 102, 103, 104];
		var right = [105, 106, 107, 108, 109, 110, 111, 112];
		var diagright = [8, 16, 24, 32, 40, 48, 56, 64, 72, 80, 88, 96, 104, 105, 106, 107, 108, 109, 110, 111];
		var prev;
		x = block;
		prev = x;
		while (true) {

		if (((diagright.includes(x) == false && down.includes(prev) == false && altright.includes(prev) == false)) && x <= 104 && blocked.includes(x.toString()) == false) {
			prev = x;
			document.getElementById(x.toString()).style.backgroundColor = "green";
			x = parseInt(x) + 7;
		}
			else if(blocked.includes(x.toString())==true){
			x-=7;
			nodesfound.push(x);
			break;
		}
	else{
		break;}


}	x = block;
		prev = x;
		}
	function diagupleft() {

		x = block;
while (true){
		if (((diagleft.includes(x) == false && down.includes(prev) == false && altleft.includes(prev) == false) && (x > 0 && blocked.includes(x.toString()) == false))) {
			prev = x;
			document.getElementById(x.toString()).style.backgroundColor = "green";
			x = parseInt(x) - 9;
		}
		else if(blocked.includes(x.toString())==true){
			x+=9;
			nodesfound.push(x);
			break;}
else{break;}}
		x = block;
		prev = x

	}   //checks diagonal left

function diagdownleftfunc(){

		x=block;
		y=x;

				prev=y
				while (true) {
					if ((diagdownleft.includes(y) == false && down.includes(prev) == false && altleft.includes(prev) == false) && y > 0 && blocked.includes(y.toString()) == false) {
						prev = y;
						document.getElementById(y.toString()).style.backgroundColor = "green";
						y = parseInt(y) - 7;
					}
					else if(blocked.includes(y.toString())==true){
						y-=1;
						nodesfound.push(y);
						break;}
else{break;}
				}
		prev=y
		y = block;;
}	//checks diagonal down left



function diagdownright() {
	var down = [1, 9, 17, 25, 33, 41, 49, 57, 65, 73, 81, 89, 97];
	var altright = [97, 98, 99, 100, 101, 102, 103, 104];
	var right = [105, 106, 107, 108, 109, 110, 111, 112];
	var diagdownright = [10, 18, 26, 42, 50, 58, 66, 74, 82, 90, 98, 106];
	var prev;
	var block=x;
while (true) {
	if (((diagdownright.includes(x) == false && down.includes(prev) == false && altright.includes(prev) == false)) && x < 105 && blocked.includes(x.toString()) == false) {
		prev = x;
		document.getElementById(x.toString()).style.backgroundColor = "green";
		x = parseInt(x) + 9;
	}
	else if(blocked.includes(x.toString())==true){
		x-=9;
		nodesfound.push(x);
		break;}
	else{break;}
}
	prev=x
	x = block;;
		}}   //function that checks diagonal right




function main(){   //main used for A*
	var tester=0;
	var count=1;
	var input;

	for (var i=0,counts=1;i<104;i++,counts++) {
		input = document.getElementById(counts.toString());
		if (blocked.includes(counts.toString())== true){
			input.style.backgroundImage="url('brick.jpg')"
			input.onclick="";
		}

		else {
			var k = 1
			var l = distance(parseInt(target), counts);     //Below calculates the heuristic between the start and the goal
			if (count == starts) {
				var tt = `<div id="heuristic${counts}"> ${l}</div><div style="font-size: 40px;color:white"> Start </div><br><div id="Cost${counts}">0</div>`
			}
			else if (count == target) {
				var tt = `<div id="heuristic${counts}"> ${l}</div><div style="font-size: 40px;color:white"> Goal </div><br><div id="Cost${counts}"> </div>`
			}
			else {
				var tt = `<div id="heuristic${counts}"> ${l}</div><br><br><br><div id="Cost${counts}"> </div>` //takes into account the cost from start to goal
			}
			input.innerHTML = tt;
			input.onclick=neighbors; //shows the neighbors
		}

		var c = i / 8;
		c = Math.floor(c);
		input.style.left = 110 * c + "px";
		input.style.bottom = 880 * c + "px";

		document.getElementById("Main").appendChild(input);
		count +=1;
	}

	function distance(start,id){


		var y=Math.floor((parseInt(id)/8)); //calculates what column the input is
		var endy=Math.floor((parseInt(start)/8));
		var ends=[1,2,3,4,5,6,7,8];
		while (ends.includes(start)==false){
			start-=8;
		}
		start-=1;
		while (ends.includes(id)==false){
			id-=8;
		}
		id-=1;
		var distance = Math.abs(y-endy) + Math.abs(id-start);

/*		var direcC;
		var direcR;

		var h=((movec-mover)*8+1); //calculates how many diagonal moves you can make to get closest to the node (outs closest id you can get to)

		mover=Math.abs(mover);
		var dist;
		movec=Math.abs(movec);
		if (mover>movec){
			var diag=movec;
			dist=mover-diag*1;
		}
		else if (movec>mover){
			var diag=mover;
			dist=movec-diag*1;
		}
		else {
			var diag=mover;
			dist=movec-diag*1;

		}
		var out=dist+diag;*/
		return (parseInt(distance));
	}

	function astar() {   //calculation for A*

		var value;
		var min=null;
		var inp;

		for(var i=0;i<=Openlist.length;i++){

			try {
				var t=Openlist[i];
				if (Closedlist.includes(t.id.toString())==false){


					var test=t.f;
					var possible=t.id;



					if ((min==null || test<min)){

						value=possible;
						min=test;
						inp=i;
					}
					else if (test==min){
						var calc=value-target;
						var calc2=possible-target;
						if (Math.abs(calc)<Math.abs(calc2)){
							calc=null;
						}
						else if(Math.abs(calc)>Math.abs(calc2)){
							value=possible;
							min=test;
							inp=i;
						}

					}


				}}

			catch(err) {
				var y=0;
			}}


		if (parent!=null){
			var k= Openlist[inp];
			k.parent=parent;

		}
		if(quit==0) {
			document.getElementById("heuristic" + (value)).style.backgroundColor = "green";



		}

		var mincost=null
		minid=null;
		for (var tt=0;tt<near.length;tt++){

			var tes=near[tt];
			if(pointer==starts){
				parent=null;
			}
			else if(mincost==null || parseInt(tes.cost)<parseInt(mincost)){
				mincost=tes.cost
				minid=tes.id;
				parent=minid;
			}
		}

		var write=document.getElementById(id.toString()).innerHTML;

		write=write+`<div id="parent${pointer}"style="visibility: hidden">${parent}</div>`;

		document.getElementById(pointer.toString()).innerHTML=write;

		if(quit==1){
			document.getElementById(pointer.toString()).style.backgroundColor="green";
			var x=document.getElementById("parent"+pointer.toString()).innerHTML;
		

			while(x.toString()!="null"){

				document.getElementById(x.toString()).style.backgroundColor="green";
				x=document.getElementById("parent"+x.toString()).innerHTML;}

		}}



	function neighbors(){   //calculates the neighbors for the path


			id=this.id;

		Closedlist.push(id);
		var index=Openlist.indexOf(id.toString());
		Openlist.splice(index,1);
		near=[];

		pointer=id;
		var i=id;
		document.getElementById(i.toString()).style.borderColor="blue";
		var w;
		var y=Math.floor(parseInt(id)/8);
		var x=y*8+1;
		var dif=(parseInt(id)-x);
		if (dif==0){
			var t=[1,8,-8,-7,9];
		}
		else if (dif==-1){
			var t=[-8,8,-1,-9,7]
		}
		else{
			var t=[-1,1,8,-8,9,-9,7,-7];}



		for (change=0;change<t.length;change++){
			var z=parseInt(i)+(t[change]);

			if (z.toString()==target.toString()) { //once it gets to one before the goal
				quit=1;

			}
			else{

				if (blocked.includes(z.toString())==false){
					if (Closedlist[Closedlist.length-1]==null){
						try
						{
							document.getElementById("Cost" + z.toString()).innerHTML = 1;
						}
						catch(err){
							;
						}
					}
					else{

						var out=document.getElementById("Cost" + pointer.toString()).innerHTML;
						try{
							if(document.getElementById("Cost"+z.toString()).innerHTML==" ") {
								var send = parseInt(out)+1;
								document.getElementById("Cost" + z.toString()).innerHTML = send
							}}
						catch (err){;}

					}



					try{

						document.getElementById(z.toString()).style.cursor="pointer";
						document.getElementById(z.toString()).style.borderColor="red";
						var y=document.getElementById(z.toString());


						var heur=document.getElementById(("heuristic"+z.toString()));
						heur=heur.innerHTML;

						var cost=document.getElementById(("Cost"+z.toString()));  //gives the cost
						cost=cost.innerHTML;

						var tot=parseInt(heur)+parseInt(cost);
						var add = new Object();
						add.f = tot;
						add.id=z;
						add.parent;
						add.cost=cost;
						Openlist.push(add);
						near.push(add);
					}
					catch(err) {
						w=1;
					}}}}


		astar()
	}}