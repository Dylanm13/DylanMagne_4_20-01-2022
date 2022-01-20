const url = new URL(window.location.href).searchParams
const idUrl = url.get('id')
console.log(idUrl)

fetch("http://localhost:3000/api/products/" + idUrl)
    .then(res => {
        
        if (res.ok==true) {
            return res.json();
        }
        throw new Error('Oops ! Une erreur est apparue !')
    })

    .then(data => {
        console.log(data)
        
        let image = document.createElement('img')
        document.querySelector(".item__img").appendChild(image)
        image.src = data.imageUrl
        image.alt = data.altTxt

        let title = document.getElementById('title')
        title.innerHTML = data.name

        let price = document.getElementById('price')
        price.innerHTML = data.price

        let description = document.getElementById('description')
        description.innerHTML = data.description

        for (let colors of data.colors) {
            console.log(colors)
            let option = document.createElement('option')
            document.querySelector("#colors").appendChild(option)
            option.value = colors
            option.innerHTML = colors
        }
    })

    .catch(err => {
        // Une erreur est survenue
        console.log('Voici une erreur', err)
        let errorUser = document.createElement('h1')
        document.querySelector('#title').appendChild(errorUser)
        errorUser.innerHTML = 'Nous sommes désolés une erreur est survenue !'
    });