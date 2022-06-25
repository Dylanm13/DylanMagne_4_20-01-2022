function main(){
    const orderNumber = document.getElementById("orderId")
    orderNumber.innerText = localStorage.getItem("orderId")
    console.log(localStorage.getItem("orderId"))
    localStorage.clear()
}

main()