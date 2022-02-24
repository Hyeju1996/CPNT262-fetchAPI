const main = document.querySelector('main')
const searchInput = document.querySelector('header input')
const searchBtn = document.querySelector('header button')

searchBtn.addEventListener('click', () => {
    main.innerHTML = ""
    getData()
})

const getData = async() => {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
            throw new Error(response.statusText)
        }
        const data = await response.json();
        const store = data.filter(item => item.title.match(new RegExp(searchInput.value, 'gi')))

        // if no error, loop through the data
        store.forEach(item => {
            // create the card
            const card = document.createElement('div')
            card.className = "card"
                // children of the card
            const image = document.createElement('img')
            image.src = item.image
            const title = document.createElement('h2')
            title.className = "title"
            title.innerText = item.title
            const price = document.createElement('p')
            price.className = "price"
            price.innerText = `Price: ${item.price} CAD`
            const desc = document.createElement('p')
            desc.className = "desc"
            desc.innerText = item.description

            // insert all the childs in card
            card.append(image, title, price, desc)

            // insert the card in the main element
            main.append(card)
        })



    } catch (error) {
        console.log(error)
    }
}

// invoke function
getData()