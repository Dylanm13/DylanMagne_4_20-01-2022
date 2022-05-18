const url = new URL(window.location.href).searchParams
const idUrl = url.get('id')
console.log(idUrl)

fetch("http://localhost:3000/api/products/" + idUrl)
    .then(res => {    
        if (res.ok==true) {
            return res.json();
        }
        throw new Error('Oops ! Le récupération du produit a echoué !')
    })
    .then(infoProducts)
    .catch(err => {
        // Une erreur est survenue
        console.log('Voici une erreur', err)
        infoProducts({name:'une erreur est survenue',price:null,description:err.message,imageUrl:"/back/images/error_icon.png" ,altTxt:'image d\'erreur'})
    })

function infoProducts(data) {
    console.log(data)

    const currentKanap = data
    
    let kanapImage = document.createElement('img')
    document.querySelector(".item__img").appendChild(kanapImage)
    kanapImage.src = currentKanap.imageUrl
    kanapImage.alt = currentKanap.altTxt

    let kanapName = document.getElementById('title')
    kanapName.innerHTML = currentKanap.name

    let kanapPrice = document.getElementById('price')
    kanapPrice.innerHTML = currentKanap.price

    let kanapDescription = document.getElementById('description')
    kanapDescription.innerHTML = currentKanap.description

    for (let colors of currentKanap.colors) {
        console.log(colors)
        let option = document.createElement('option')
        document.querySelector("#colors").appendChild(option)
        option.value = colors
        option.innerHTML = colors
    }
    addProduct(currentKanap)
}


let cartQuantity
addCartNotif()
let cartNotif = document.createElement('div')
cartNotif.className = 'cart__notif'
let cartNotifContainer = document.createElement('p')
let cartNotifText = document.createTextNode(cartQuantity)
cartNotifContainer.appendChild(cartNotifText)
cartNotif.appendChild(cartNotifContainer)
document.querySelector('nav').appendChild(cartNotif)
cartNotif.style.borderRadius = '1rem'
cartNotif.style.width = '12px'
cartNotif.style.height = '12px'
cartNotif.style.padding = '2px 2px'
cartNotif.style.marginTop = '2.5rem'
cartNotif.style.textAlign = 'center'
cartNotif.style.background = '#3498db'
cartNotifContainer.style.color = 'white'
cartNotifContainer.style.margin = '0px'
cartNotifContainer.style.fontSize = '10px'
if (cartQuantity == 0) {
    cartNotif.style.display = 'none'
}

function addProduct(currentKanap) {
    const colorPicked = document.querySelector("#colors")
    const quantityPicked = document.querySelector("#quantity")
    const addToCart = document.querySelector("#addToCart")

    addToCart.addEventListener('click', (event)=>{
        if (quantityPicked.value > 0) {
            
            addConfirm()
            addCartNotif()
            console.log(cartQuantity)
            let choiceColor = colorPicked.value
            let choiceQuantity = quantityPicked.value
            
            let productOption = {
                productId: idUrl,
                productColor: choiceColor,
                productQuantity: Number(choiceQuantity),
                productName: currentKanap.name,
                productPrice: currentKanap.price,
                productDescription: currentKanap.description,
                productImage: currentKanap.imageUrl,
                productAltTxt: currentKanap.altTxt
            }

            let productLocalStorage = JSON.parse(localStorage.getItem("product"))
            console.log(productLocalStorage)

            if (productLocalStorage) {
                const resultFound = productLocalStorage.find(element => element.productId === idUrl && element.productColor === choiceColor)
                    //Si le produit commandé est déjà dans le panier
                    if (resultFound) {
                        let newQuantite =
                        parseInt(productOption.productQuantity) + parseInt(resultFound.productQuantity)
                        resultFound.productQuantity = newQuantite
                        localStorage.setItem("product", JSON.stringify(productLocalStorage))
                        console.log(productLocalStorage)
                    //Si le produit commandé n'est pas dans le panier
                    } else {
                        productLocalStorage.push(productOption)
                        localStorage.setItem("product", JSON.stringify(productLocalStorage))
                        console.log(productLocalStorage)
                    }
                    //Si le panier est vide
                    } else {
                        productLocalStorage =[]
                        productLocalStorage.push(productOption)
                        localStorage.setItem("product", JSON.stringify(productLocalStorage))
                        console.log(productLocalStorage)
                }
        }
       })
}

function addConfirm() {
    let orderConfirmation = document.createElement('div')
    orderConfirmation.className = 'item__content__addConfirm'
    let orderConfirmationContainer = document.createElement('p')
    let orderConfirmationText = document.createTextNode("L'article a été ajouter au panier !")
    orderConfirmation.appendChild(orderConfirmationContainer)
    orderConfirmationContainer.appendChild(orderConfirmationText)
    document.querySelector('.item__content').appendChild(orderConfirmation)
    orderConfirmation.style.textAlign = 'center'
    orderConfirmation.style.fontSize = '25px'
    orderTimeout()
}


function orderTimeout() {
    let orderConfirmationLength = document.getElementsByClassName('item__content__addConfirm')
        console.log(orderConfirmationLength.length)
        timeout = window.setTimeout(disappears, 2000)  
}

function disappears() {
    let orderConfirmationDisappears = document.querySelector('.item__content__addConfirm')
    orderConfirmationDisappears.style.display = 'none'
}

function addCartNotif() {
    let productLocalStorage = JSON.parse(localStorage.getItem("product"))
        cartQuantity = 0
        for (index = 0; index < productLocalStorage.length; index++) {
        cartQuantity += productLocalStorage[index].productQuantity
        }
}

    


