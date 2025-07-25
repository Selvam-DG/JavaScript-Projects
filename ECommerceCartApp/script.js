const products = [
    { id: 1 , name: "T-Shirt", price:20, image: ""},
    { id: 2 , name: "Jeans", price:20, image: ""},
    { id: 3 , name: "Sneakers", price:20, image: ""},
    { id: 4 , name: "Shorts", price:20, image: ""},
    { id: 5 , name: "Watch", price:20, image: ""},
    
]

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const productList = document.getElementById("product-list");
const cartItems = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const totalPrice = document.getElementById("total-price");

function showProduct(){
    products.forEach( product =>{
        const div = document.createElement("div");
        div.className ="product";
        div.innerHTML = `
        <img src = "${product.image}" alt="product-image" />
        <h3> ${product.name} </h3>
        <p>$ ${product.price.toFixed(2)} </p>
        <button onclick = "addToCart(${product.id})"> Add to Cart </button>
        `;
        productList.appendChild(div);
    });
}

function addToCart(id){
    const item = products.find( p => p.id === id);
    const existing  = cart.find( p=> p.id === id);
    if (existing){
        existing.qty += 1;
    }else{
        cart.push( {...item, qty:1});
    }
    updateCart();
}

function removeFromCart(id){
    cart = cart.filter( p=> p.id === id);
    updateCart();
}

function updateCart(){
    cartItems.innerHTML = "";
    let total = 0;
    let count = 0;
    cart.forEach( item => {
        const div = document.createElement("div");
        div.className = "cart-item";
        div.innerHTML = `
        ${item.name} x${item.qty} - $${(item.price * item.qty).toFixed(2)}
      <button onclick="removeFromCart(${item.id})">Remove</button>
    `;
    cartItems.appendChild(div);
    total += item.price * item.qty;
    count += item.qty;
    });
    cartCount.textContent = count;
    totalPrice.textContent = total.toFixed(2);
    localStorage.setItem("cart", JSON.stringify(cart));
}

showProduct();
updateCart();