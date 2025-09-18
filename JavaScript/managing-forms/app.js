const form = document.querySelector('form');

function handleSubmit(e) {
    e.preventDefault();

    const data = {};
    const fields = e.target.querySelectorAll('input, select, textarea');

    for (const field of fields) {
        data[field.name] = field.value;
    }
    console.log(data);
}

form.addEventListener('submit', handleSubmit);