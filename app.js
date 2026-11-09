const catalog = [
 {id:1,name:"Wireless Headphones",category:"Electronics",price:24.99,icon:"🎧"},
 {id:2,name:"Smart Watch",category:"Electronics",price:39.99,icon:"⌚"},
 {id:3,name:"Everyday Sneakers",category:"Shoes",price:34.50,icon:"👟"},
 {id:4,name:"Classic Backpack",category:"Accessories",price:22.00,icon:"🎒"},
 {id:5,name:"Cotton T-Shirt",category:"Clothing",price:14.99,icon:"👕"},
 {id:6,name:"Desk Lamp",category:"Home",price:18.75,icon:"💡"},
 {id:7,name:"Water Bottle",category:"Home",price:12.50,icon:"🧴"},
 {id:8,name:"Sunglasses",category:"Accessories",price:16.00,icon:"🕶️"},
 {id:9,name:"Skincare Set",category:"Beauty",price:19.99,icon:"🧴"},
 {id:10,name:"Bluetooth Speaker",category:"Electronics",price:29.99,icon:"🔊"},
 {id:11,name:"Baseball Cap",category:"Clothing",price:11.99,icon:"🧢"},
 {id:12,name:"Running Shoes",category:"Shoes",price:42.00,icon:"👟"}
];
let selected = "All", cart = [];
const productsEl=document.querySelector("#products"), categoriesEl=document.querySelector("#categories");
const searchEl=document.querySelector("#search");
const money=n=>"$"+n.toFixed(2);
function renderCategories(){
 const cats=["All",...new Set(catalog.map(p=>p.category))];
 categoriesEl.innerHTML=cats.map(c=>`<button class="${selected===c?"active":""}" data-cat="${c}">${c}</button>`).join("");
 categoriesEl.querySelectorAll("button").forEach(b=>b.addEventListener("click",()=>{selected=b.dataset.cat;renderCategories();renderProducts()}));
}
function renderProducts(){
 const q=searchEl.value.trim().toLowerCase();
 const list=catalog.filter(p=>(selected==="All"||p.category===selected)&&(p.name.toLowerCase().includes(q)||p.category.toLowerCase().includes(q)));
 document.querySelector("#sectionTitle").textContent=selected==="All"?"Popular products":selected;
 document.querySelector("#resultCount").textContent=`${list.length} items`;
 productsEl.innerHTML=list.length?list.map(p=>`<article class="product"><div class="product-art" aria-hidden="true">${p.icon}</div><div class="product-info"><div class="muted">${p.category}</div><h3>${p.name}</h3><div class="price">${money(p.price)}</div><button class="add" data-add="${p.id}">Add to cart</button></div></article>`).join(""):"<p>No products found. Try another search.</p>";
 productsEl.querySelectorAll("[data-add]").forEach(b=>b.addEventListener("click",()=>addToCart(Number(b.dataset.add))));
}
function addToCart(id){const item=cart.find(x=>x.id===id);if(item)item.qty++;else cart.push({id,qty:1});renderCart();}
function renderCart(){
 const count=cart.reduce((s,x)=>s+x.qty,0);document.querySelector("#cartCount").textContent=count;
 document.querySelector("#cartItems").innerHTML=cart.length?cart.map(x=>{const p=catalog.find(y=>y.id===x.id);return `<div class="cart-row"><span>${p.icon} ${p.name} × ${x.qty}</span><strong>${money(p.price*x.qty)}</strong></div>`}).join(""):"<p>Your cart is empty.</p>";
 document.querySelector("#cartTotal").textContent="Total: "+money(cart.reduce((s,x)=>s+catalog.find(p=>p.id===x.id).price*x.qty,0));
}
searchEl.addEventListener("input",renderProducts);
document.querySelector("#cartButton").addEventListener("click",()=>document.querySelector("#cartPanel").hidden=false);
document.querySelector("#closeCart").addEventListener("click",()=>document.querySelector("#cartPanel").hidden=true);
document.querySelector("#year").textContent=new Date().getFullYear();
renderCategories();renderProducts();renderCart();