let boardTop=canvasBoard.getBoundingClientRect().top;//ab humne check kiya ki hmara canvas kha se start kiya hai top pe se 
let boardLeft=canvasBoard.getBoundingClientRect().left;//ab humne check kiya hai ki humara canvas khase se start hota hai left me se 
let iX,iY,fX,fY;//ab humne dekha ki humara initial point kya hai aur humara final point kya haia abi ix iy fx fy 0 hai 
let drawingMode=false;//drawing mode false hai iska mtlb ye hua ki abi hume drawing start nhi krni hai , drawing hume tbhi start krni hoti hai jab humara mouse down ho otherwise dont start the drawing 
body.addEventListener("mousedown",function(e)
{
iX=e.clientX-boardLeft;
iY=e.clientY-boardTop;
if(cTool=="pencil"||cTool=="eraser")
{
drawingMode=true; 
tool.beginPath();
tool.moveTo(iX,iY);
}
})
body.addEventListener("mouseup",function(e)
{    
    if(cTool=="pencil"||cTool=="eraser")
    {
       drawingMode=false;
    }
    else if(cTool=="rectangle"||cTool=="line")
    {
        fX=e.clientX-boardLeft;
        fY=e.clientY-boardTop;

             let width=fX-iX;
             let height=fY-iY;

             if(cTool=="rectangle")  
             {
               tool.strokeRect(iX,iY,width,height);
             }
             else if(cTool=="line") //line
             {
                tool.beginPath();
                tool.moveTo(iX,iY);
                tool.lineTo(fX,fY);
                tool.stroke();
             }
    }
          
});

body.addEventListener("mousemove",function(e)
{
    if(drawingMode==false)//agar drawing mode false hai to tb to bas return krjao kyuki tab kuch b draw ni krna
    {
        return;
    }
    fX=e.clientX-boardLeft; //fx aur fy nikalo , jo abi point hai uski position nikalo mtlb us position ka fx aur fy nikalo
    fY=e.clientY-boardTop;
    tool.lineTo(fX,fY);//ab fx fy se line bnado ix iy tk 
    tool.stroke();
    iX=fX;// jo ab hai humara final x aur final y unhe bnado initial x aur initial y;
    iY=fY; 
});
  