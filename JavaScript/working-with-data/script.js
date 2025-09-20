// Select the element where the data will go
const productList = document.getElementById('product-list');

// Fetch the data from data.json
fetch('data.json')
    .then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then(data => {
        // Loop through each item and add it to the DOM
        data.forEach(product => {
            const listItem = document.createElement('li');
            listItem.textContent = `${product.name} - $${product.price}`;
            productList.appendChild(listItem);
        });
    })
    .catch(error => {
        console.error('Fetch error:', error);
        productList.innerHTML = `<li style="color: red;">Failed to load products.</li>`;
    });
