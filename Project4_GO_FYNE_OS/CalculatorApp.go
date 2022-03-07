package main

import(
	"strconv"
	"fyne.io/fyne/v2"//isse fyne milega    
	"fyne.io/fyne/v2/app"
	"fyne.io/fyne/v2/container"
	"fyne.io/fyne/v2/widget"
	"github.com/Knetic/govaluate"
)

func main(){

	a:=app.New()//hume ek new app banana hai a variable me app hai
	w:=a.NewWindow("Hello")// w variable me humari window stored hai 
    w.Resize(fyne.NewSize(500,280))
	//abi hum sare buttons bnadete hai series wise ,
	//series kuch aise hai

	//history button //back button 
	//clear button  // ( ye hai open paranthesis button  // ) ye hai closed paranthesis button  // / ye hai divide button
	// 7 button //8 button //9 button //* multiply ka button 
	// 4 button //5 button //6 button //- minus ka button
	// 1 button //2 button //3 button //+ plus ka button 
	// 0 button //. dot ka button // = equal ka button
	
	output:=""
	input:=widget.NewLabel(output)//hume jo b output hoga ,use ek label me print krna hai , to uskeliye alag space hona chaiye to hum label me hi use store krege
	isHistory:=false;
	historyStr:=""
	history:=widget.NewLabel(historyStr )
	var historyArr [] string;
	historyBtn:=widget.NewButton("History",func(){
		if isHistory{
                      historyStr=""  
		            }else{
							for i:=len(historyArr)-1;i>=0;i--{ 
								historyStr=historyStr+historyArr[i];
								historyStr+="\n";
							}
			
						}
		isHistory=!isHistory
		history.SetText(historyStr);
			}) 
			BackBtn:=widget.NewButton("Back",func(){
		       if(len(output)>0){
								output=output[:len(output)-1];
								input.SetText(output)
		                        }
	})
	ClearBtn:=widget.NewButton("Clear",func(){
     output=""
	 input.SetText(output)
	})
	OpenBtn:=widget.NewButton("(",func(){
     output=output+"("
	 input.SetText(output)
	})
	CloseBtn:=widget.NewButton(")",func(){
		output=output+")"
		input.SetText(output)
	})
	DivideBtn:=widget.NewButton("/",func(){
		output=output+"/"
		input.SetText(output)
	})
	SevenBtn:=widget.NewButton("7",func(){
		output=output+"7"
		input.SetText(output)
	})
	EightBtn:=widget.NewButton("8",func(){
		output=output+"8"
		input.SetText(output)
	})
	NineBtn:=widget.NewButton("9",func(){
		output=output+"9"
		input.SetText(output)
	})
	MultiplyBtn:=widget.NewButton("*",func(){
		output=output+"*"
		input.SetText(output)
	})
	FourBtn:=widget.NewButton("4",func(){
		output=output+"4"
		input.SetText(output)
	})
	FiveBtn:=widget.NewButton("5",func(){
		output=output+"5"
		input.SetText(output)
	})
	SixBtn:=widget.NewButton("6",func(){
		output=output+"6"
		input.SetText(output)
	})
	MinusBtn:=widget.NewButton("-",func(){
		output=output+"-"
		input.SetText(output)
	})
	OneBtn:=widget.NewButton("1",func(){
		output=output+"1"
		input.SetText(output)
	})
    TwoBtn:=widget.NewButton("2",func(){
		output=output+"2"
		input.SetText(output)
	})
	ThreeBtn:=widget.NewButton("3",func(){
		output=output+"3"
		input.SetText(output)
	})
	PlusBtn:=widget.NewButton("+",func(){
		output=output+"+"
		input.SetText(output)
	})
	ZeroBtn:=widget.NewButton("0",func(){
		output=output+"0"
		input.SetText(output)
	})
    DotBtn:=widget.NewButton(".",func(){
		output=output+"."
		input.SetText(output)
	})
	EqualBtn:=widget.NewButton("=",func(){
		expression, err := govaluate.NewEvaluableExpression(output);
		if err==nil{
            result, err := expression.Evaluate(nil);
			if err==nil{
				ans:=strconv.FormatFloat(result.(float64),'f',-1,64);
				strToApppend:=output+" = "+ans;
				historyArr=append(historyArr,strToApppend);
				output=ans;
			}else{
				output="error";
			}
		}else{
			output="error";  
		}
	input.SetText(output)
	})

//ab humne buttons bna to liye hai , ab hume ye buttons set krne hai window k andar 
//to ab hum window me set krege ye content aur window w variable me stored hai

w.SetContent(container.NewVBox(// (container ko vertical box me divide krte jayege )hume content vertical boxes me milta jayega mtlb row me 
input,//ye ek row hai jha answer print hoga ,abi k liye is label ka nam humne rkha hai hello  
history, 
//ab ek row k andar hume kafi column chahiye (to hume vertical box me columns bnane hog aur use grid ki form me convert krna hoga)

container.NewGridWithColumns(1,//niche k sare buttons ko hum ek column ki trh dekhre hai aur upar jha answer print hoga , vo alag space hoga
	container.NewGridWithColumns(2,
		historyBtn,
		BackBtn,
	),
	container.NewGridWithColumns(4,
		ClearBtn,
	    OpenBtn,
        CloseBtn,
        DivideBtn,
	),
	container.NewGridWithColumns(4,
		SevenBtn,
		EightBtn,
        NineBtn,
        MultiplyBtn,
	),
	container.NewGridWithColumns(4,
		FourBtn,
		FiveBtn,
		SixBtn,
        MinusBtn,
	),
	container.NewGridWithColumns(4,
		OneBtn,
		TwoBtn,
		ThreeBtn,
		PlusBtn,
	),
	container.NewGridWithColumns(2,
	container.NewGridWithColumns(2,
		ZeroBtn,
		DotBtn,
		),
	EqualBtn,
),
),),)
w.ShowAndRun()//window ko run krne k liye aur show krne k liye
 }