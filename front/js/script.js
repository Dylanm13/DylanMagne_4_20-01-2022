fetch("http://localhost:3000/api/products")
    .then(res => {
        
        if (res.ok==true) {
            return res.json();
        }
        throw new Error('Oops ! Une erreur est apparue !')
    })
    .then(data => {
        const parent = document.querySelector('section#items')
            parent.innerHTML = '' 
            console.log('initialisation fucntion data')

        for (let i = 0; i < data.length; i+=1) {
            console.log(data[i])

            const dataKanap = data[i]
            let kanap = document.createElement('a');
            kanap.href = "./product.html?id="+dataKanap._id;
            
        
            let article = document.createElement('article');
            kanap.appendChild(article);
        
            let img = document.createElement('img');
            img.src = dataKanap.imageUrl;
            img.alt = dataKanap.altTxt
            article.appendChild(img);
        
            let nameKanap = document.createElement('h3')
            article.appendChild(nameKanap)
            let nameKanapProdudct = document.createTextNode(dataKanap.name)
            nameKanap.appendChild(nameKanapProdudct)
        
            let kanapDescription = document.createElement('p')
            article.appendChild(kanapDescription)
            let kanapDescriptionText = document.createTextNode(dataKanap.description)
            kanapDescription.appendChild(kanapDescriptionText)
         
            parent.appendChild(kanap);
        
        }  
    })
    .catch(err => {
  // Une erreur est survenue
    console.log('Voici une erreur', err)
    let errorUser = document.createElement('h1')
    document.querySelector('.titles').appendChild(errorUser)
    errorUser.innerHTML = 'Nous sommes désolés une erreur est survenue !'

});



