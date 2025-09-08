document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', () => {
        const item = button.parentElement;
        // Toggle the current item
        item.classList.toggle('active');
    })
})