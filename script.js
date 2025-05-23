const menu = document.getElementById("menu")
const CartBtn = document.getElementById("cart-btn")
const cartModal = document.getElementById("cart-modal")
const cartitemsContainer = document.getElementById("cart-items")
const cartotal = document.getElementById("cart-total")
const checkoutBtn = document.getElementById("checkout-btn")
const clesemodalbtn = document.getElementById("close-modal-btn")
const cartcounter = document.getElementById("cart-count")
const addressInput = document.getElementById("address")
const addressWarn = document.getElementById("address-warn")

let cart=[];

//Abrir o modal do carrinho
CartBtn.addEventListener("click", function(){
    updateCartModal()
    cartModal.style.display= "flex"
})

    //Fechar o modal do carrinho

cartModal.addEventListener("click", function(event){
if(event.target===cartModal){
        cartModal.style.display="none"
    }
})

clesemodalbtn.addEventListener("click",function(){
  cartModal.style.display = "none"    
})

//Adicionar item no carrinho

menu.addEventListener("click", function(event) {
    let parentButton = event.target.closest(".add-to-cart-btn");

    if (parentButton) {
        const name = parentButton.getAttribute("data-name");
        const price = parseFloat(parentButton.getAttribute("data-price"));

        addToCart(name, price)
    }
});
//Function para add no carrinho
 function addToCart(name, price){
    const existingItem =cart.find(intem=> intem.name=== name)
    if(existingItem){

        //se o item já existe, apenas add mais
        existingItem.quantity +=1;
    }else{
        cart.push({
            name,
            price,
            quantity:1,
            })
        
    }
    updateCartModal()
   }

 //atualiza o carrinho
 function updateCartModal(){
    cartitemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        const cartItemElement = document.createElement("div");
        cartItemElement.classList.add("flex", "justify-between", "mb-4", "flex-col");
    
        cartItemElement.innerHTML = `
          <div class="flex items-center justify-between">
            <div>
              <p class="font-bold">${item.name}</p>
              <p>Qtd: ${item.quantity}</p>
              <p class="font-medium mt-2">R$ ${item.price.toFixed(2)}</p>
            </div>
    
        <button class="remove-from-cart-btn" data-name="${item.name}">
            Remover
        </button>


          </div>
        `;

        total += item.price * item.quantity;
    
    
        cartitemsContainer.appendChild(cartItemElement)
    })

    cartotal.textContent=total.toLocaleString("pt-BR",{
        style: "currency",
        currency:"BRL"
    });
    
     cartcounter.innerHTML = cart.length;
 }

  //Função para remover o item do carrinho

  cartitemsContainer.addEventListener("click", function(event) {
    if (event.target.classList.contains("remove-from-cart-btn")) {
        const name = event.target.getAttribute("data-name");
        removeItemCart(name);
    }
});

function removeItemCart(name) {
    const index = cart.findIndex(item => item.name === name);
    if (index !== -1) {
     const item = cart[index];
     if(item.quantity>1){
        item.quantity -=1;
        updateCartModal();
        return;
    }
    cart.splice(index,1);
    updateCartModal();
    }
}

//Endereço

addressInput.addEventListener("input",function(event){
    let inputValue = event.target.value;
    if(inputValue!== ""){
        addressInput.classList.remove("border-red-500")
        addressWarn.classList.add("hidden")
    }

    
 })
 
 checkoutBtn.addEventListener("click", function(){
    const isOpen=checkRestaurantOpen();
    if(!isOpen){
        Toastify({
            text: "Restaurante está fechado",
            duration: 3000,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "#ef4444",
            },
          }).showToast();
        return;
    }
    if (cart.length === 0) return;

    if (addressInput.value === "") {
        addressWarn.classList.remove("hidden");
        addressInput.classList.add("border-red-500");
        return;
    }

    const cartItems = cart.map((item) => {
        return `${item.name} Quantidade: (${item.quantity}) Preço: R$${item.price.toFixed(2)}`;
    }).join("\n");

    const message = encodeURIComponent(`${cartItems}\n\nEndereço: ${addressInput.value}`);
    const phone = "43988490835";

    window.open(`https://wa.me/${phone}?text=${message}`, "_blank");

    cart=[];
    updateCartModal();
});


//Check horario

function checkRestaurantOpen(){
    const data = new Date();
    const hora = data.getHours();
    return hora >= 18 && hora <22;
    //True Restaurante
}

const spanItem = document.getElementById("date-span")
const isOpen = checkRestaurantOpen();
if(isOpen){
    spanItem.classList.remove("bg-red-500");
    spanItem.classList.add("bg-green-600")
}else{
    spanItem.classList.remove("bg-green-600")
    spanItem.classList.add("bg-red-500")
}

