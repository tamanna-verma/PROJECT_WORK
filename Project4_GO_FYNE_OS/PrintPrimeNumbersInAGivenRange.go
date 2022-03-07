package main 
import(
	"fmt"
	"math"
)
func printPrimeNumber(num1,num2 int){
if num1<2 || num2<2 {
	fmt.Println("Numbers must be greater than 2")
	return 
}

for num1 <= num2 {//ye for lopp while loop ki trh work krrha hai , ye tabtk chlega jbtk num1 ki value num 2 se kam hai 
	isPrime:=true//ye short head syntax use krrhe hai hum 

	for i:=2;i<=(int)(math.Sqrt(float64(num1)));i++{//ye loop check krega ki num1 kisi number se divide horha hai ya nhi (num k sqrt tk hi check krege)
		if(num1 % i==0){
			isPrime=false//aur agar vo divide hogya to hume is prime ko false krdena hai bcz vo number to prime hai hi nhi 
			break
		}
	}
	if isPrime{//agar num1 abibi prime hai then we just need to print it 
	fmt.Printf("%d " ,num1)//ye % d num 1 ko catch krlega
	}

num1 ++	// num 1 ki value 1 se increase krdo taki next numbercheck hopaye ki vo 

}
fmt.Println()//next line me aajao taki agla prime number next liune me hi ho print 
}

func main(){
	printPrimeNumber(5,15)
	printPrimeNumber(3,100)
}