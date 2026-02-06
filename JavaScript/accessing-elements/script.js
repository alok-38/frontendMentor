const elements = document.querySelectorAll('.myClass');
// elements is a NodeList (array-like object)
elements.forEach(el => {
    // Manipulate each element
    console.log(el);
    
});

const lastEl= document.getElementById('last');

lastEl.innerHTML = "Hello World";