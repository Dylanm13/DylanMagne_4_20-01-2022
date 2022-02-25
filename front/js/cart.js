let productLocalStorage = JSON.parse(localStorage.getItem("product"))
console.log(productLocalStorage)
const positionEmptyCart = document.querySelector("#cart__items")

// Si le panier est vide
function getCart(){
if (productLocalStorage === null || productLocalStorage == 0) {
    const emptyCart = `<p>Votre panier est vide</p>`
    positionEmptyCart.innerHTML = emptyCart
} else {
for (let product in productLocalStorage){
    // Insertion de l'élément "article"
    let productArticle = document.createElement("article")
    document.querySelector("#cart__items").appendChild(productArticle)
    productArticle.className = "cart__item"
    productArticle.setAttribute('data-id', productLocalStorage[product].productId)

    // Insertion de l'élément "div"
    let productDivImg = document.createElement("div")
    productArticle.appendChild(productDivImg)
    productDivImg.className = "cart__item__img"

    // Insertion de l'image
    let productImg = document.createElement("img")
    productDivImg.appendChild(productImg)
    productImg.src = productLocalStorage[product].productImage
    productImg.alt = productLocalStorage[product].productAltTxt

    // Insertion de l'élément "div"
    let productItemContent = document.createElement("div")
    productArticle.appendChild(productItemContent)
    productItemContent.className = "cart__item__content"

    // Insertion de l'élément "div"
    let productItemContentTitlePrice = document.createElement("div")
    productItemContent.appendChild(productItemContentTitlePrice)
    productItemContentTitlePrice.className = "cart__item__content__titlePrice"
    
    // Insertion du titre h3
    let productTitle = document.createElement("h2")
    productItemContentTitlePrice.appendChild(productTitle)
    productTitle.innerHTML = productLocalStorage[product].productName

    // Insertion de la couleur
    let productColors = document.createElement("p")
    productTitle.appendChild(productColors)
    productColors.innerHTML = productLocalStorage[product].productColor
    productColors.style.fontSize = "20px"

    // Insertion du prix
    let productPrices = document.createElement("p")
    productItemContentTitlePrice.appendChild(productPrices)
    productPrices.innerHTML = productLocalStorage[product].prodcutPrice + " €"

    // Insertion de l'élément "div"
    let productItemContentSettings = document.createElement("div")
    productItemContent.appendChild(productItemContentSettings)
    productItemContentSettings.className = "cart__item__content__settings"

    // Insertion de l'élément "div"
    let productItemContentSettingsQuantity = document.createElement("div")
    productItemContentSettings.appendChild(productItemContentSettingsQuantity)
    productItemContentSettingsQuantity.className = "cart__item__content__settings__quantity"
    
    // Insertion de "Qté : "
    let productQte = document.createElement("p")
    productItemContentSettingsQuantity.appendChild(productQte)
    productQte.innerHTML = "Qté : "

    // Insertion de la quantité
    let productQtty = document.createElement("input")
    productItemContentSettingsQuantity.appendChild(productQtty)
    productQtty.value = productLocalStorage[product].productQuantity
    productQtty.className = "itemQuantity"
    productQtty.setAttribute("type", "number")
    productQtty.setAttribute("min", "1")
    productQtty.setAttribute("max", "100")
    productQtty.setAttribute("name", "itemQuantity")

    // Insertion de l'élément "div"
    let productItemContentSettingsDelete = document.createElement("div")
    productItemContentSettings.appendChild(productItemContentSettingsDelete)
    productItemContentSettingsDelete.className = "cart__item__content__settings__delete"

    // Insertion de "p" supprimer
    let productSupprimer = document.createElement("p")
    productItemContentSettingsDelete.appendChild(productSupprimer)
    productSupprimer.className = "deleteItem"
    productSupprimer.innerHTML = "Supprimer"
}
}}
getCart()

function getTotals(){

    // Récupération du total des quantités
    let elementQuantity = document.getElementsByClassName('itemQuantity')
    let elementLength = elementQuantity.length,
    totalQtt = 0

    for (let index = 0; index < elementLength; ++index) {
        totalQtt += elementQuantity[index].valueAsNumber
    }

    let productTotalQuantity = document.getElementById('totalQuantity')
    productTotalQuantity.innerHTML = totalQtt
    console.log(totalQtt)

    // Récupération du prix total
    totalPrice = 0;

    for (let index = 0; index < elementLength; ++index) {
        totalPrice += (elementQuantity[index].valueAsNumber * productLocalStorage[index].prodcutPrice)
    }

    let productTotalPrice = document.getElementById('totalPrice')
    productTotalPrice.innerHTML = totalPrice
    console.log(totalPrice)
}
getTotals()

function modifyQtt() {
    let elementModif = document.querySelectorAll(".itemQuantity")

    for (let modif = 0; modif < elementModif.length; modif++){
        elementModif[modif].addEventListener("change" , (event) => {
            event.preventDefault()

            //Selection de l'element à modifier en fonction de son id ET sa couleur
            let quantityModif = productLocalStorage[modif].productQuantity
            let elementModifValue = elementModif[modif].valueAsNumber
            
            const resultFound = productLocalStorage.find((element) => element.elementModifValue !== quantityModif)

            resultFound.productQuantity = elementModifValue
            productLocalStorage[modif].productQuantity = resultFound.productQuantity

            localStorage.setItem("product", JSON.stringify(productLocalStorage))
        
            // refresh rapide
            location.reload()
        })
    }
}
modifyQtt()

function deleteProduct() {
    let btn_supprimer = document.querySelectorAll(".deleteItem")

    for (let suppr = 0; suppr < btn_supprimer.length; suppr++){
        btn_supprimer[suppr].addEventListener("click" , (event) => {
            event.preventDefault()

            //Selection de l'element à supprimer en fonction de son id ET sa couleur
            let idDelete = productLocalStorage[suppr].productId
            let colorDelete = productLocalStorage[suppr].productColor

            productLocalStorage = productLocalStorage.filter(element => element.productId !== idDelete || element.productColor !== colorDelete)
            
            localStorage.setItem("product", JSON.stringify(productLocalStorage))

            //Alerte produit supprimé et refresh
            alert("Ce produit a bien été supprimé du panier")
            location.reload()
        })
    }
}
deleteProduct()

function getForm() {
    // Ajout des Regex
    let form = document.querySelector(".cart__order__form")

    //Création des expressions régulières
    let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$')
    let charRegExp = new RegExp("^[a-zA-Z ,.'-]+$")
    let addressRegExp = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+")

    // Ecoute de la modification du prénom
    form.firstName.addEventListener('change', function() {
        validFirstName(this)
    });

    // Ecoute de la modification du nom
    form.lastName.addEventListener('change', function() {
        validLastName(this)
    });

    // Ecoute de la modification de l'adresse
    form.address.addEventListener('change', function() {
        validAddress(this)
    });

    // Ecoute de la modification de la ville
    form.city.addEventListener('change', function() {
        validCity(this)
    });

    // Ecoute de la modification de l'email
    form.email.addEventListener('change', function() {
        validEmail(this)
    });

    //validation du prénom
    const validFirstName = function(inputFirstName) {
        let firstNameErrorMsg = inputFirstName.nextElementSibling

        if (charRegExp.test(inputFirstName.value)) {
            firstNameErrorMsg.innerHTML = ''
        } else {
            firstNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.'
        }
    };

    //validation du nom
    const validLastName = function(inputLastName) {
        let lastNameErrorMsg = inputLastName.nextElementSibling

        if (charRegExp.test(inputLastName.value)) {
            lastNameErrorMsg.innerHTML = ''
        } else {
            lastNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.'
        }
    };

    //validation de l'adresse
    const validAddress = function(inputAddress) {
        let addressErrorMsg = inputAddress.nextElementSibling

        if (addressRegExp.test(inputAddress.value)) {
            addressErrorMsg.innerHTML = ''
        } else {
            addressErrorMsg.innerHTML = 'Veuillez renseigner ce champ.'
        }
    };

    //validation de la ville
    const validCity = function(inputCity) {
        let cityErrorMsg = inputCity.nextElementSibling

        if (charRegExp.test(inputCity.value)) {
            cityErrorMsg.innerHTML = ''
        } else {
            cityErrorMsg.innerHTML = 'Veuillez renseigner ce champ.'
        }
    };

    //validation de l'email
    const validEmail = function(inputEmail) {
        let emailErrorMsg = inputEmail.nextElementSibling

        if (emailRegExp.test(inputEmail.value)) {
            emailErrorMsg.innerHTML = ''
        } else {
            emailErrorMsg.innerHTML = 'Veuillez renseigner votre email.'
        }
    }
    }
getForm()


function postForm(){
    const btn_commander = document.getElementById("order")

    //Ecouter le panier
    btn_commander.addEventListener("click", (event)=>{
    
        //Récupération des coordonnées du formulaire client
        let inputName = document.getElementById('firstName')
        let inputLastName = document.getElementById('lastName')
        let inputAdress = document.getElementById('address')
        let inputCity = document.getElementById('city')
        let inputMail = document.getElementById('email')

        //Construction d'un array depuis le local storage
        let idProducts = [];
        for (let index = 0; index < productLocalStorage.length; index++) {
            idProducts.push(productLocalStorage[index].productId)
        }
        console.log(idProducts)

        const order = {
            contact : {
                firstName: inputName.value,
                lastName: inputLastName.value,
                address: inputAdress.value,
                city: inputCity.value,
                email: inputMail.value,
            },
            products: idProducts,
        } 

        const options = {
            method: 'POST',
            body: JSON.stringify(order),
            headers: {
                'Accept': 'application/json', 
                "Content-Type": "application/json" 
            },
        }

        fetch("http://localhost:3000/api/products/order", options)
        .then(res => {           
            if (res.ok==true) {         //Si la réccupération est un succès
            return res.json()       //l'API est en transcrite en format .JSON
        }
        throw new Error ('Oops ! La récupération des produits a echoué !')
    })
        .then(data => {
            console.log(data)

            localStorage.setItem("orderId", data.orderId)

            document.location.href = "confirmation.html"
        })
        .catch(err => {
            alert ("Problème avec fetch : " + err.message)
        })
        })
}
postForm()



