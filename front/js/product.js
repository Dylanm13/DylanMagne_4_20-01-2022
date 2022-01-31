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
        infoProducts([{name:'une erreur est survenue',colors:'inconnues',price:'le prix est inconnu',description:err.message,imageUrl:"../images/error_icon.png" ,altTxt:'image d\'erreur'}])
    });

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
}
