//Appel de l'API pour la réccupération de données
fetch("http://localhost:3000/api/products")
    .then(res => {
        if (res.ok===true) {         //Si la réccupération est un succès
            return res.json()       //l'API est en transcrite en format .JSON
        }
        throw new Error ('Oops ! La récupération des produits a echoué !')
    })
    .then(pageProducts)             //Déclaration de la fonction pageProduct
    .catch(err => {
        // Une erreur est survenue
          console.log('Voici une erreur', err)
          pageProducts([{name:'une erreur est survenue',description:err.message,_id:null,imageUrl:"/back/images/error_icon.png" ,altTxt:'image d\'erreur'}])    //Erreur en format JSON dans le cas ou le serveur ne répond pas
    })

function pageProducts(data) {
    const kanapParent = document.querySelector('section#items')
    kanapParent.innerHTML = '' 

    for (let index = 0; index < data.length; index+=1) {
    console.log(data[index])

    const currentKanap = data[index]

    let kanapLink 
    if(currentKanap._id!=null){
        kanapLink = document.createElement('a')
        kanapLink.href = "./product.html?id="+currentKanap._id
    }

    let kanapArticle = document.createElement('article')
    if(currentKanap._id!=null){
        kanapLink.appendChild(kanapArticle)
    }
    let kanapImage = document.createElement('img')
    kanapArticle.appendChild(kanapImage)
    kanapImage.src = currentKanap.imageUrl
    kanapImage.alt = currentKanap.altTxt

    let kanapName = document.createElement('h3')
    kanapArticle.appendChild(kanapName)
    kanapName.appendChild(document.createTextNode(currentKanap.name))

    let kanapDescription = document.createElement('p')
    kanapArticle.appendChild(kanapDescription)
    kanapDescription.appendChild(document.createTextNode(currentKanap.description))
    
    if(currentKanap._id!=null){
        kanapParent.appendChild(kanapLink)
    }else{
        kanapParent.appendChild(kanapArticle)
    }  
}  
}


