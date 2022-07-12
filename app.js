// Product List
const products = [
  {
    id: 0,
    name: "Nike ZoomX Streakfly",
    imgSrc: "./images/product1.jpeg",
    tag: "streakfly",
    price: 230,
    instock: 10,
  },
  {
    id: 1,
    name: "Nike Metcon 7",
    imgSrc: "./images/product2.jpeg",
    tag: "metcon",
    price: 190,
    instock: 10,
  },
  {
    id: 2,
    name: "Nike Zoom Alphafly",
    imgSrc: "./images/product3.jpeg",
    tag: "alphafly",
    price: 370,
    instock: 10,
  },
  {
    id: 3,
    name: "Air Kukini SE",
    imgSrc: "./images/product4.jpeg",
    tag: "kukini",
    price: 200,
    instock: 10,
  },
  {
    id: 4,
    name: "LeBron 19 Low",
    imgSrc: "./images/product5.jpeg",
    tag: "lebron",
    price: 230,
    instock: 10,
  },
  {
    id: 5,
    name: "Nike SuperRep Go 3",
    imgSrc: "./images/product6.jpeg",
    tag: "go",
    price: 150,

    instock: 10,
  },
  {
    id: 6,
    name: "Nike Air Force 1 07 LV8",
    imgSrc: "./images/product7.jpeg",
    tag: "airforce",
    price: 170,
    instock: 10,
  },
  {
    id: 7,
    name: "Nike Zoom Metcon Turbo 2",
    imgSrc: "./images/product8.jpeg",
    tag: "turbo",
    price: 220,
    instock: 10,
  },
];

// ELEMENTS
const productsEl = document.querySelector(".shop-content");
const cartItemsEl = document.querySelector(".cart-box-container");
const subTotalEl = document.querySelector(".total-price");
const totalItemsInCartEl = document.querySelector(".cart-number");
const cartBtn = document.querySelectorAll(".cart-btn");
const openCart = document.querySelector(".open-cart");
const closeCart = document.querySelector(".close-cart");
const cartContainer = document.querySelector(".cart");
const buyBtn = document.querySelector(".buy-btn");

// Open & Close Cart
openCart.addEventListener("click", () => {
  cartContainer.style.display = "block";
});
closeCart.addEventListener("click", () => {
  cartContainer.style.display = "none";
});

// Render Products into HTML
function renderProducts() {
  products.forEach((product) => {
    productsEl.innerHTML += `
    
    <div class="product box1">
          <img src="${product.imgSrc}" alt="${product.name}" />
          <h2 class="product-title">${product.name}</h2>
          <span class="product-price">$${product.price}</span>
          <button class="cart-btn" onclick="addToCart(${product.id})">
            <i class="fas fa-shopping-cart" id="cart-icon"></i>
          </button>
        </div>
    
    `;
  });
}
renderProducts();

// Cart Array
let cart = JSON.parse(localStorage.getItem("CART")) || [];
updateCart();

//  ADD TO CART
function addToCart(id) {
  // Product BOX open cart
  cartContainer.style.display = "block";

  // Check if product already exists in Cart
  if (cart.some((item) => item.id === id)) {
    changeNumberOfUnits("plus", id);
  } else {
    const item = products.find((product) => product.id === id);
    cart.push({
      ...item,
      numberOfUnits: 1,
    });
    console.log(cart);
  }

  updateCart();
}

// Render product into cart
function updateCart() {
  renderCartItems();
  renderSubtotal();

  // Save CART to localStorage
  localStorage.setItem("CART", JSON.stringify(cart));
}

// Calculate and Render subtotal
function renderSubtotal() {
  let totalPrice = 0;
  let totalItems = 0;

  cart.forEach((item) => {
    totalPrice += item.price * item.numberOfUnits;
    totalItems += item.numberOfUnits;
  });

  subTotalEl.innerHTML = `(${totalItems}) $${totalPrice}`;
  totalItemsInCartEl.innerHTML = `${totalItems}`;
}

// Render Cart Items
function renderCartItems() {
  cartItemsEl.innerHTML = ""; //Clear cart element
  cart.forEach((item) => {
    cartItemsEl.innerHTML += `
          <div class="cart-box">
                <img src="${item.imgSrc}" alt="${item.name}" class="cart-img" />
                <div class="cart-details">
                  <div class="cart-product-title">${item.name}</div>
                  <div class="cart-price">$${item.price}</div>
                  <div class="cart-quantity">
                      <div class="quantity-btn minus" onclick="changeNumberOfUnits('minus', ${item.id})" >-</div>
                      <div class="number">${item.numberOfUnits}</div>
                      <div class="quantity-btn plus" onclick="changeNumberOfUnits('plus', ${item.id})" >+</div>
                    </div>
                </div>
                <button class="cart-remove-btn" onclick="removeItemFromCart(${item.id})" >
                <i class="fa fa-trash " aria-hidden="true"></i>  </button>
          </div>
`;
  });
}

// Remove cart item
function removeItemFromCart(id) {
  cart = cart.filter((item) => item.id !== id);

  updateCart();
}

// Change number of units for an item
function changeNumberOfUnits(action, id) {
  cart = cart.map((item) => {
    let numberOfUnits = item.numberOfUnits;

    if (item.id === id) {
      if (action === "minus" && numberOfUnits > 1) {
        numberOfUnits--;
      } else if (action === "plus" && numberOfUnits < item.instock) {
        numberOfUnits++;
      }
    }
    return {
      ...item,
      numberOfUnits,
    };
  });

  updateCart();
}

// Purchase button
buyBtn.onclick = () => {
  alert("Thank you for your purchase");
  cartContainer.style.display = "none";
};
