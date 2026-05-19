let quantity = 0;
let cart = [];

/* =========================
   ELEMENTS
========================= */
const qtyDisplay = document.getElementById("quantity-value");
const increaseBtn = document.getElementById("increase-qty");
const decreaseBtn = document.getElementById("decrease-qty");
const addToCartBtn = document.getElementById("add-to-cart");

const cartBtn = document.querySelector(".nav__cart-button");
const cartDropdown = document.getElementById("cart-dropdown");
const cartItemsContainer = document.getElementById("cart-items");
const cartEmpty = document.getElementById("cart-empty");

/* =========================
   QUANTITY LOGIC
========================= */
function updateQuantity(value) {
  quantity = Math.max(0, value);
  qtyDisplay.textContent = quantity;
}

increaseBtn.addEventListener("click", () => {
  updateQuantity(quantity + 1);
});

decreaseBtn.addEventListener("click", () => {
  updateQuantity(quantity - 1);
});

/* =========================
   ADD TO CART
========================= */
addToCartBtn.addEventListener("click", () => {
  if (quantity === 0) return;

  const product = {
    id: 1,
    name: "Fall Limited Edition Sneakers",
    price: 125,
    image: "images/image-product-1-thumbnail.jpg",
    quantity: quantity,
  };

  const existing = cart.find((item) => item.id === product.id);

  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push(product);
  }

  updateQuantity(0);
  renderCart();
});

/* =========================
   CART TOGGLE
========================= */
cartBtn.addEventListener("click", () => {
  cartDropdown.hidden = !cartDropdown.hidden;
});

/* =========================
   REMOVE ITEM
========================= */
function removeFromCart(id) {
  cart = cart.filter((item) => item.id !== id);
  renderCart();
}

/* =========================
   RENDER CART
========================= */
function renderCart() {
  if (cart.length === 0) {
    cartEmpty.style.display = "block";
    cartItemsContainer.innerHTML = "";
    return;
  }

  cartEmpty.style.display = "none";

  cartItemsContainer.innerHTML = cart
    .map((item) => {
      const total = item.price * item.quantity;

      return `
      <div class="cart-item flex-between">
        <img src="${item.image}" width="50" />

        <div class="cart-item__info">
          <p>${item.name}</p>
          <p>$${item.price} x ${item.quantity} 
          <strong>$${total}</strong></p>
        </div>

        <button 
          class="cart-item__delete"
          data-id="${item.id}"
          aria-label="Remove item"
        >
          🗑️
        </button>
      </div>
    `;
    })
    .join("");

  /* attach delete events */
  document.querySelectorAll(".cart-item__delete").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = Number(e.currentTarget.dataset.id);
      removeFromCart(id);
    });
  });
}

renderCart();
