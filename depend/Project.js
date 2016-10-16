/**
 * Created by Jonathan McClanahan on 10/13/2016.
 */
var Openlist=[];
var Closedlist=[];
var Path=[];
var target=30;
var pointer=null;

var gray="16";
var count=0;
var time=0;
var x;
var over=false;
function main(){
    var count=1;
    var input;
    document.getElementById("Main").innerHTML = "";
    for (var i=0,counts=1;i<104;i++,counts++) {
        input = document.createElement("div");
        input.className = "node" + count.toString();
        input.style.position = "relative";
        input.style.border = "solid";
        input.style.width = "100px";
        input.onload = heuristic;
        input.onclick=neighbors;

        input.style.height = "100px";
        input.style.borderWidth = "5px";
        input.id = counts.toString();
if (count==1){
    var tt = `<div id="heuristic${counts}"> ${heuristic(counts)}</div><div style="font-size: 40px;color:white"> Start </div><br><div id="Cost${counts}"> 1</div>`
}
else if (count==64){
    var tt = `<div id="heuristic${counts}"> ${heuristic(counts)}</div><div style="font-size: 40px;color:white"> Goal </div><br><div id="Cost${counts}"> 1</div>`
}
else{
        var tt = `<div id="heuristic${counts}"> ${heuristic(counts)}</div><br><br><br><div id="Cost${counts}"> 1</div>`}
        input.innerHTML = tt;

        var c = i / 8;
        c = Math.floor(c);
        input.style.left = 110 * c + "px";
        input.style.bottom = 880 * c + "px";

        document.getElementById("Main").appendChild(input);
        count +=1;
    }



    function astar() {

        var t=[-1,1,8,-8,9,-9,7,-7];
        var value;
        var min=null;

        for(var i=0;i<=t.length;i++){

        try {
            possible=parseInt(pointer)+parseInt(t[i]);

            heur=document.getElementById("heuristic"+possible).innerHTML;

            cost=document.getElementById("Cost"+possible).innerHTML;



            var test=parseInt(cost)+parseInt(heur);


            if ((test<min || min==null)&& test !=pointer){
                min=test;
                value=possible;
            }



        }

    catch(err) {
        var y=0;
    }}
    document.getElementById("heuristic"+(value)).style.backgroundColor="green";
    }
    function heuristic(targ){
        var id=targ;
        var y=Math.floor(parseInt(id)/8);
        var x=y*8+1;
        var dif=(parseInt(id)-x)+y;

        var z=(parseInt(id)-(y*8+1));

       var h=((y-z)*8+1);
        var t=0;

        while(h!=1 && h>1){
            h-=8;
            t+=1;
        }
        var out=t+z;
        return out;


    }

function pops(array,array2,r){
    if (r!=null) {
        var y=array.indexOf(r)
        array.splice(y, 1);
        array2.push(y);
        return y;

    }

   else if (array.length>0){
       var y=array[0];
           array.splice(0, 1);
        array2.push(y);
       return y;
    }}

function neighbors(){
    pointer=this.id;
    var i=this.id;
    document.getElementById(i.toString()).style.borderColor="blue";
    var w;
    var y=Math.floor(parseInt(this.id)/8);
    var x=y*8+1;
    var dif=(parseInt(this.id)-x);
    if (dif==0){
        var t=[1,8,-8,-7,9];
    }
    else{
    var t=[-1,1,8,-8,9,-9,7,-7];}
var children=[];
children.push(parseInt(this.id)+parseInt(t));
    alert(children.toString());
    for (change=0;change<t.length;change++){
        var z=parseInt(i)+(t[change]);
        if (document.getElementById(z.toString()).style.borderColor=="blue"){
            w=1;
        }
        else{
            if (z.toString()=="64"){
                return;
            }
            else {
                try{
                    document.getElementById(z.toString()).style.cursor="pointer";
                    document.getElementById(z.toString()).style.borderColor="red";
                }
                catch(err) {
                    w=1;
                }}}}
            astar()
}}