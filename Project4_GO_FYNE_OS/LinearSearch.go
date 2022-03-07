package main
import (
	"fmt"
)
func linearSearch(dataList[]int ,key int)bool{//hume dataList nam ka array aur ek number  (key )pass kiya hzi linearSearch function k andar
	for _,item:=range dataList{//humne index variable nhi declare kiya kyuki vo khi use nhi hota , to fir go se hume error mil jata agar ek variable aisa hota jo aage kbi use nhi hota 
		//to fir humne index ki jgh ek underscore use kiya , ye memory me ek instance jesa hota hai variable ka , aur kyuki humne ye declare nhi kiya kuch variable to hum use nhi bhi krege to go ko koi dikkat nhi hogi usse
		if item==key{//agar dataList[index] mtlb item agar key k equal hai mtlb hume element milgya then we should return true else return false
			return true
		}
	}
	return false
}

func main(){
	arr:=[]int{1,2,3,4,5}//humne array liya
	fmt.Println(linearSearch(arr,6))//aur array aur key ko pass krdiya linearSearch function me 
}
