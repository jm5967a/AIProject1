# AIProject1

A* pathfinding implementation using WebStorm I used Javascript, html, and css to create a dynamic grid with individual nodes for each block. The ditance from the start to goal point is calculated and the algorithm uses breadth first search to locate the optimal path. 

Here is a snippet that just includes my A* algorithm:

function astar() {
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
			alert(x.toString().length)
			while(x.toString()!="null"){
				document.getElementById(x.toString()).style.backgroundColor="green";
				x=document.getElementById("parent"+x.toString()).innerHTML;}
		}
	}
