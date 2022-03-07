package main
import(
	"fmt"
)
func BarChart(arr[6] int){//humne barchart function me ek array pass kiya hai size 6 hai us array ka aur integer elements hai 

	var max int=0//max ko shuru me 0 mana hai
	for  i:=0;i<len(arr);i++{
		if(max<arr[i]){
		max=arr[i]// aise max hume miljayega pure array pe traverse krne k bad
		}
	}
	for i:=max;i>=0;i-- {//ab hum max ko decrease krte chlege 

		var str string ="";// string ko phle empty manlo 
		
		for j:=0;j<len(arr);j++{//pure array pe traverse krrhe hai , array array[i]ki value max se km hai to blank add krdo vrna * array krna hai 
			if arr[j]<i{
				str=str+"\t";
			}else{
				str=str+"*\t";	
			}
			//aise krte krte hume max ki value km krke usse array ki har value ko compare krna hai eg--> 4 se 5 3 2 5 4 1 ko jb compare krege
			// agar array[i] 4 se chota hua then add a blank in string else a * to ab string bnegi "*__**_"
		}
		fmt.Println(str)// ye printline hai
	}
	
}
func main(){
arr:=[6]int{5,4,3,5,4,1}
BarChart(arr)
}