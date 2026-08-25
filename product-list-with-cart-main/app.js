document.addEventListener("DOMContentLoaded", () => {
  const productGrid = document.getElementById("product-grid");
  const cartSection = document.querySelector(".cart-section");
  let cart = [];
  let productsData = [];

  // 1. Fetch JSON Data
  fetch("./data.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      productsData = data;
      renderProducts(productsData);
    })
    .catch((error) => {
      console.error("Failed to load JSON:", error);
    });

  // 2. Render Product Cards Grid
  function renderProducts(products) {
    productGrid.innerHTML = "";

    products.forEach((product, index) => {
      const cartItem = cart.find((item) => item.name === product.name);
      const quantity = cartItem ? cartItem.quantity : 0;

      const card = document.createElement("article");
      card.classList.add("product-card");

      card.innerHTML = `
        <div class="image-wrapper ${quantity > 0 ? "selected" : ""}">
          <picture>
            <source srcset="${product.image.desktop}" media="(min-width: 1024px)" />
            <source srcset="${product.image.tablet}" media="(min-width: 768px)" />
            <img src="${product.image.mobile}" alt="${product.name}" class="product-img" />
          </picture>
          
          ${
            quantity > 0
              ? `
            <div class="btn-quantity" data-index="${index}">
              <button class="btn-decrement" aria-label="Decrease quantity">
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="2" fill="none" viewBox="0 0 10 2"><path fill="#fff" d="M0 .375h10v1.25H0z"/></svg>
              </button>
              <span>${quantity}</span>
              <button class="btn-increment" aria-label="Increase quantity">
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10"><path fill="#fff" d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25z"/></svg>
              </button>
            </div>
          `
              : `
            <button class="btn-add-cart" data-index="${index}">
              <img src="./assets/images/icon-add-to-cart.svg" alt="" aria-hidden="true" />
              Add to Cart
            </button>
          `
          }
        </div>
        <div class="product-info">
          <span class="category">${product.category}</span>
          <h2 class="product-title">${product.name}</h2>
          <span class="price">$${product.price.toFixed(2)}</span>
        </div>
      `;

      productGrid.appendChild(card);
    });

    addEventListeners();
  }

  // 3. Attach Event Listeners to Buttons
  function addEventListeners() {
    document.querySelectorAll(".btn-add-cart").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const index = e.currentTarget.dataset.index;
        addToCart(productsData[index]);
      });
    });

    document.querySelectorAll(".btn-increment").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const index = e.currentTarget.closest(".btn-quantity").dataset.index;
        updateQuantity(productsData[index].name, 1);
      });
    });

    document.querySelectorAll(".btn-decrement").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const index = e.currentTarget.closest(".btn-quantity").dataset.index;
        updateQuantity(productsData[index].name, -1);
      });
    });
  }

  // 4. Cart Logic & Updates
  function addToCart(product) {
    cart.push({ ...product, quantity: 1 });
    updateUI();
  }

  function updateQuantity(productName, change) {
    const item = cart.find((i) => i.name === productName);
    if (!item) return;

    item.quantity += change;

    if (item.quantity <= 0) {
      cart = cart.filter((i) => i.name !== productName);
    }

    updateUI();
  }

  function removeFromCart(productName) {
    cart = cart.filter((item) => item.name !== productName);
    updateUI();
  }

  function updateUI() {
    renderProducts(productsData);
    renderCart();
  }

  // 5. Render Cart UI
  function renderCart() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    if (cart.length === 0) {
      cartSection.innerHTML = `
        <h2>Your Cart (0)</h2>
        <div class="cart-empty">
          <img src="./assets/images/illustration-empty-cart.svg" alt="" aria-hidden="true" />
          <p>Your added items will appear here</p>
        </div>
      `;
      return;
    }

    let itemsHTML = cart
      .map(
        (item) => `
      <div class="cart-item">
        <div class="cart-item-details">
          <p class="cart-item-name">${item.name}</p>
          <div class="cart-item-pricing">
            <span class="quantity">${item.quantity}x</span>
            <span class="unit-price">@ $${item.price.toFixed(2)}</span>
            <span class="total-price">$${(
              item.price * item.quantity
            ).toFixed(2)}</span>
          </div>
        </div>
        <button class="btn-remove" data-name="${item.name}" aria-label="Remove item">
          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10"><path fill="#CAAFA7" d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1z"/></svg>
        </button>
      </div>
    `
      )
      .join("");

    cartSection.innerHTML = `
      <h2>Your Cart (${totalItems})</h2>
      <div class="cart-items">
        ${itemsHTML}
        <div class="cart-order-total">
          <span>Order Total</span>
          <span class="grand-total">$${totalPrice.toFixed(2)}</span>
        </div>
        <div class="carbon-neutral-note">
          <img src="./assets/images/icon-carbon-neutral.svg" alt="" />
          <p>This is a <strong>carbon-neutral</strong> delivery</p>
        </div>
        <button class="btn-confirm-order">Confirm Order</button>
      </div>
    `;

    document.querySelectorAll(".btn-remove").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const name = e.currentTarget.dataset.name;
        removeFromCart(name);
      });
    });
  }
});