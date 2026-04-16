const figureEl = document.getElementById('blog-image');

// Create the image element
const img = document.createElement('img');

img.src = "./assets/images/illustration-article.svg";
img.alt = "Blog Illustration";
img.style.borderRadius = "10px";


// Append it to the figure
figureEl.appendChild(img);