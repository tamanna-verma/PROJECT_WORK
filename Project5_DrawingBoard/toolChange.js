
//----------------------------------------------------tool change logic--------------------------------------------------------// 
let pencil=document.querySelector("#Pencil");
let eraser=document.querySelector("#Eraser");
let rectangle=document.querySelector("#Rectangle");
let line=document.querySelector("#Line");
let SizeOptions=document.querySelectorAll(".size-box");

//we need to identify ki click hua hai to kya hua hai aur double click hua hai to kya hua hai 
pencil.addEventListener("click",function(e)
{ 
if(cTool=="pencil")
{
    //agar phle se eraser
    //second click
    SizeOptions[0].style.display="flex";
}
else
{
    //first click 
    cTool="pencil";
    tool.strokeStyle="lightpink";
    //giving borders
    pencil.style.border="0px";
    eraser.style.border="0px";
    rectangle.style.border="0px";
    line.style.border="0px"; 
   pencil.style.border="1px solid red";


    for(let i=0;i<SizeOptions.length;i++)
    {
        SizeOptions[i].style.display="none";
    } 
}
})

eraser.addEventListener("click",function(e)
{
if(cTool=="eraser")
{
    SizeOptions[1].style.display="flex";//agar phle se hi eraser tha aur firse click hua to size vale options show krdo   
}
else 
{
    //first click 
    cTool="eraser";  
    tool.strokeStyle="beige";

     //giving borders
    pencil.style.border="0px";
    eraser.style.border="0px";
    rectangle.style.border="0px";
    line.style.border="0px";  
    eraser.style.border="1px solid red"; 

    for(let i=0;i<SizeOptions.length;i++)
    {
        SizeOptions[i].style.display="none";
    }
} 
})

rectangle.addEventListener("click",function(e)
{
if(cTool=="rectangle")
{
    SizeOptions[2].style.display="flex";
    //agar phle se rectangle tha aur ek aur bar click hua to rectangle k size options ko flex krdo 
}
else
{
    //first click  
    cTool="rectangle";
    tool.strokeStyle="lightpink";
    tool.lineWidth=PencilSize;

     //giving borders
    pencil.style.border="0px";
    eraser.style.border="0px";
    rectangle.style.border="0px";
    line.style.border="0px";
    rectangle.style.border="1px solid red";

     
    for(let i=0;i<SizeOptions.length;i++)
    {
        SizeOptions[i].style.display="none";
    }
}
})

line.addEventListener("click",function(e)
{
if(cTool=="line")
{
   SizeOptions[3].style.display="flex";
}
else
{
    cTool="line";
    tool.strokeStyle="lightpink";

    //giving border if clicked
    pencil.style.border="0px";
    eraser.style.border="0px";
    rectangle.style.border="0px";
    line.style.border="0px";
   line.style.border="1px solid red";

    for(let i=0;i<SizeOptions.length;i++)
    {
        SizeOptions[i].style.display="none";
    }
}
})




//----------------------------------------------------------color change logic--------------------------------------------------------//
    let redcolor=document.querySelector(".red");
    let greencolor=document.querySelector(".green");
    let bluecolor=document.querySelector(".blue");
    redcolor.addEventListener("click",function()
    {
        tool.strokeStyle="lightpink";
    })
    bluecolor.addEventListener("click",function()
    {
        tool.strokeStyle="lightblue";
    })
    greencolor.addEventListener("click",function()
    {
        tool.strokeStyle="lightgreen";
    })








    //----------------------------------------------------------size change logic--------------------------------------------------------//
    //pencil
    let PencilSize=5;
    //eraser
    let EraserSize=5;
    //rectangle 
    let RectangleSize=5;
    //line
    let LineSize=5;
//kispe hua hai click konsi div pe ye bhi event bubbling dekhti hai ,when an event occur at an element , then the event bubbles up to its parent element unless it doesnt encounter any eventListener  
/* This concept is known as Event Bubbling and this concept is very important, jb hume size box k sare size pe alag alag se sbpe event listener nhi lgana pda ,bas ekbar size box pe event listener lga hai , to is conceot ko boldege event bubbling*/
let sizeBoxArr = document.querySelectorAll(".size-box");//sbhi k size box select krne hai , pencil ,eraser,rectangle ,line
sizeBoxArr[0].addEventListener("click",function(e)//ek event hota tha maths me jisse hum x aur y coordinates lelete the 
{
   // console.log(e.target);//ye deta hai konse element pe click hua mtlb exact size no. //size box k andar konse size pe click hua exact
    // console.log(e.currentTarget);//current target mtlb event listener btayega us position pe konsa hai //sometimes target can also be equal to the current target iff the 
  // actual event occur -->target

    let elements=["size1","size2","size3","size4"];
    let AllTheClasses=e.target.classList;//ek element pe  //array me jitni b classes hai , un sb classes ki list milegi hume , eg --> size1 size , this is the list of class here 
    let firstClass=AllTheClasses[0];
    let test=elements.includes(firstClass);//ye check krke true ya false save krega test me 
    if(test)//agar test ki value true hui to hume   
    {
        if(firstClass=="size1")
        {
          PencilSize=5;
        }else if(firstClass=="size2")
        {
          PencilSize=10;
        }
        else if(firstClass=="size3")
        {
         PencilSize=15;
        }
        else if(firstClass=="size4")
        {
         PencilSize=20;
        } 
        tool.lineWidth=PencilSize;
    }
    console.log("pencilsize"+PencilSize);
})
sizeBoxArr[1].addEventListener("click",function(e)//ek event hota tha maths me jisse hum x aur y coordinates lelete the 
{
   // console.log(e.target);//ye deta hai konse element pe click hua mtlb exact size no. //size box k andar konse size pe click hua exact
    // console.log(e.currentTarget);//current target mtlb event listener btayega us position pe konsa hai //sometimes target can also be equal to the current target iff the 
  // actual event occur -->target

    let elements=["size1","size2","size3","size4"];
    let AllTheClasses=e.target.classList;//ek element pe  //array me jitni b classes hai , un sb classes ki list milegi hume , eg --> size1 size , this is the list of class here 
    let firstClass=AllTheClasses[0];
    let test=elements.includes(firstClass);//ye check krke true ya false save krega test me 
    if(test)//agar test ki value true hui to hume   
    {
        if(firstClass=="size1")
        {
 EraserSize=5;
        }else if(firstClass=="size2")
        {
 EraserSize=10;
        }
        else if(firstClass=="size3")
        {
 EraserSize=15;
        }
        else if(firstClass=="size4")
        {
 EraserSize=20;
        } 
        tool.lineWidth=EraserSize;
    }
    
})
sizeBoxArr[2].addEventListener("click",function(e)//ek event hota tha maths me jisse hum x aur y coordinates lelete the 
{
   // console.log(e.target);//ye deta hai konse element pe click hua mtlb exact size no. //size box k andar konse size pe click hua exact
    // console.log(e.currentTarget);//current target mtlb event listener btayega us position pe konsa hai //sometimes target can also be equal to the current target iff the 
  // actual event occur -->target

    let elements=["size1","size2","size3","size4"];
    let AllTheClasses=e.target.classList;//ek element pe  //array me jitni b classes hai , un sb classes ki list milegi hume , eg --> size1 size , this is the list of class here 
    let firstClass=AllTheClasses[0];
    let test=elements.includes(firstClass);//ye check krke true ya false save krega test me 
    if(test)//agar test ki value true hui to hume   
    {
        if(firstClass=="size1")
        {
          RectangleSize=5;
        }else if(firstClass=="size2")
        {
          RectangleSize=10;
        }
        else if(firstClass=="size3")
        {
         RectangleSize=15;
        }
        else if(firstClass=="size4")
        {
         RectangleSize=20;
        } 
        tool.lineWidth=RectangleSize; 
    }
    
})
sizeBoxArr[3].addEventListener("click",function(e)//ek event hota tha maths me jisse hum x aur y coordinates lelete the 
{
   // console.log(e.target);//ye deta hai konse element pe click hua mtlb exact size no. //size box k andar konse size pe click hua exact
    // console.log(e.currentTarget);//current target mtlb event listener btayega us position pe konsa hai //sometimes target can also be equal to the current target iff the 
  // actual event occur -->target

    let elements=["size1","size2","size3","size4"];
    let AllTheClasses=e.target.classList;//ek element pe  //array me jitni b classes hai , un sb classes ki list milegi hume , eg --> size1 size , this is the list of class here 
    let firstClass=AllTheClasses[0];
    let test=elements.includes(firstClass);//ye check krke true ya false save krega test me 
    if(test)//agar test ki value true hui to hume   
    {
        if(firstClass=="size1")
        {
          LineSize=5;
        }else if(firstClass=="size2")
        {
          LineSize=10;
        }
        else if(firstClass=="size3")
        {
         LineSize=15;
        }
        else if(firstClass=="size4")
        {
         LineSize=20;
        } 
       tool.lineWidth=LineSize;
    }
    
})