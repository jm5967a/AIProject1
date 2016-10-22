/**
 * Created by Jonathan McClanahan on 10/13/2016.
 */
var Openlist=[];
var Closedlist=[];
var Path=[];
var target;
var pointer=null;
var near=[];
var blocked=[];
var starts;


var x;
var over=false;
function init(){
    var start=null;
    var end=null;
    var count=1;
    var input;
    document.getElementById("Main").innerHTML = "";
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
    function block(){
        this.style.backgroundImage="url('brick.jpg')"
        this.onclick=remove;
        blocked.push(this.id)
    }
    function remove(){
        this.style.backgroundImage=""
        var index=blocked.indexOf(this.id.toString());
        blocked.splice(index,1);
        this.onclick=block;


    }

    function get(){
       if (start==null){
        start=this;
        start.style.backgroundColor="green";
        var tt='<div style="font-size: 40px;color:white"> Start </div>'
        start.innerHTML=tt;
       starts=this.id}

        else if (start!=null && end==null) {
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

function main(){
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
            var l = distance(parseInt(target), counts);
            if (count == starts) {
                var tt = `<div id="heuristic${counts}"> ${l}</div><div style="font-size: 40px;color:white"> Start </div><br><div id="Cost${counts}">${k} </div>`
            }
            else if (count == target) {
                var tt = `<div id="heuristic${counts}"> ${l}</div><div style="font-size: 40px;color:white"> Goal </div><br><div id="Cost${counts}"> ${k}</div>`
            }
            else {
                var tt = `<div id="heuristic${counts}"> ${l}</div><br><br><br><div id="Cost${counts}"> ${k}</div>`
            }
            input.innerHTML = tt;
            input.onclick=neighbors;
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

        var x=y*8+1; //what top id in that row is


        var z=(parseInt(id)-(y*8+1)); //calculates what row
        if (z==-1){
            z=7;
        }

        var begc=Math.floor(parseInt(start)/8); //calculates what column the input is

        var begrid=begc*8+1; //what top id in that row is


        var begr=(parseInt(start)-(begc*8+1)); //calculates what row
        if (begr==-1){
            begr=7;
        }
        var yz=Math.round((parseInt(id)/8)); //calculates what column the input is
        var movec=yz-begc;
        var mover=z-begr;

        var direcC;
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
        var out=dist+diag;
        return out;
    }

    function astar() {

        var value;
        var min=null;

        for(var i=0;i<=Openlist.length;i++){

        try {
var t=Openlist[i];
            if (Closedlist.includes(t.id.toString())==false){


            var test=t.f;
                var possible=t.id;



            if ((min==null || test<min)){

                value=possible;
                min=test;
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
                }

                }


        }}

    catch(err) {
        var y=0;
    }}

    document.getElementById("heuristic"+(value)).style.backgroundColor="green";
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
id=this.id;
    Closedlist.push(id);

near=[];

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
    else if (dif==-1){
        var t=[-8,8,-1,-9,7]
    }
    else{
    var t=[-1,1,8,-8,9,-9,7,-7];}



var quit=0;
    for (change=0;change<t.length;change++){
        var z=parseInt(i)+(t[change]);
        if (z.toString()==target.toString()) {
            alert("congrats")
            quit=1;

        }
        else{

        if (blocked.includes(z.toString())==false){



                try{

                    document.getElementById(z.toString()).style.cursor="pointer";
                    document.getElementById(z.toString()).style.borderColor="red";
                    var y=document.getElementById(z.toString());


                    var heur=document.getElementById(("heuristic"+z.toString()));
                    heur=heur.innerHTML;

                    var cost=document.getElementById(("Cost"+z.toString()));
                    cost=cost.innerHTML;

                    var tot=parseInt(heur)+parseInt(cost);
                    var add = new Object();
                    add.f = tot;
                    add.id=z;


                    Openlist.push(add);

                    near.push(z.toString());
                }
                catch(err) {
                    w=1;
                }}}}
if (quit==0){
            astar()}
}}
