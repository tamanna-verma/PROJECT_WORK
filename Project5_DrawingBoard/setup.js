let cTool="pencil";       
let canvasBoard=document.querySelector("canvas");//ye mene select kiya hai drawing board ko 
let tool=canvasBoard.getContext("2d");//ye mene select  kiya hai tool ko mtlb pencil ko

let body=document.querySelector("body");//ab hume body ko sleect krliya hai
  // canavas board -> left  point kitna aage  hai 
canvasBoard.height=window.innerHeight;//ab humne canvas ki height ko inner height k equal set kiys hai
canvasBoard.width=window.innerWidth;//ab humne canvas ki width ko set kiya hai inner width k equal

//canvas dimensions set krne k bad jo changes kroge vhi reflect honge
tool.strokeStyle="brown";