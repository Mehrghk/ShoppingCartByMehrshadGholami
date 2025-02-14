//TODO open shopping cart with click on cart icon ✅
//TODO close shopping cart with click on icon × ✅
//TODO add product to shoppig cart ✅
//TODO increase product quantity by tapping + or the button again ✅
//TODO removing product from shopping cart with or without × button ✅
//TODO add mikoni shappingCart open beshe ✅

//TODO adding total price to my shopping cart ✅
//TODO adding checkout button ✅

//TODO if price more than 100 hezar no shipping price else adding 5 hezar to total price ✅
//TODO adding 10% maliat to total price

const shopping_icon = document.querySelector(".icon-cart");
const product_add_button = document.querySelectorAll(".addCartBtn");
// console.log(product_add_button);
const product_div = document.querySelector(".item");
const Shopping_cart_div = document.querySelector(".shoppingCartTab");
const list_cart_HTML = document.querySelector(".listCartHtml");
const close_btn = document.querySelector(".close");


function init(){
    document.addEventListener('click', function (event){
        let action = event.target;

        if(action.closest(".icon-cart")){
            Shopping_cart_div.classList.toggle("translate-x-[-700px]");
        } else if (action === close_btn){
            Shopping_cart_div.classList.toggle("translate-x-[-700px]");
        } else if (action.closest(".addCartBtn")){
            addProductToShoppingCart(action.closest(".addCartBtn"));
            if(Shopping_cart_div.classList.contains("translate-x-[-700px]")){
                Shopping_cart_div.classList.toggle("translate-x-[-700px]");
            } else {
                //do nothing
            }
        } else if (action.closest(".remove")){
            action.closest(".remove").closest(".grid").remove();
            updateTotalPrice();
        }
        //  else if (action.closest(".item")){ //for more info 
        //     console.log("list item");
        // } 
        else if (action.closest(".minus")){
            reduceProductQuantityByOne(action.closest(".minus"));
        } else if (action.closest(".plus")){
            increaseProductQuantityByOne(action);
        } else {
            //do nothing
            return;
        }
    });
}

function addProductToShoppingCart(clickedProduct){
    
    
    let productContainer = clickedProduct.closest(".item");
    let productImage = productContainer.querySelector("img").src;
    let productName = productContainer.querySelector(".name").innerText;
    let productPriceSpan = productContainer.querySelector(".price");
    let productPrice = parseInt(productContainer.querySelector(".price").dataset.price);
    // productPrice.innerText = parseInt(productPrice.innerText)+",000";
    // console.log(productPrice);

        
    let existingProduct = Array.from(list_cart_HTML.children).find(item => 
        item.querySelector(".name").innerText === productName
    );

    console.log(existingProduct);

    if(existingProduct){
        let quantitySpan = existingProduct.querySelector(".quantity span:nth-child(2)");
        let priceSpan = existingProduct.querySelector(".price");

        let currentQuantity = parseInt(quantitySpan.innerText)+1;
        quantitySpan.innerText = currentQuantity;

        let totalProductPrice = currentQuantity*productPrice;
        priceSpan.innerText = `${totalProductPrice.toLocaleString()} تومان`;

        updateTotalPrice();
    } else {
        let newItem = document.createElement('div');
        newItem.classList.add("grid", "grid-cols-13", "items-center", "justify-items-center", "text-white", "border-b-1", "border-gray-300");
        newItem.innerHTML = `
            <div class="remove text-2xl">×</div>
            <div class="image col-span-3">
                <img src="${productImage}" class="drop-shadow-[0_20px_20px_#ffffff99] w-20 h-20">
            </div>
            <div class="name text-sm col-span-3">
            ${productName}
            </div>
            <div class="price text-sm col-span-3" data-price="${productPrice}">${productPrice.toLocaleString()} تومان</div>
            <div class="quantity flex justify-center items-center col-span-3">
                <span class="minus bg-gray-300 w-5 h-5 rounded-2xl text-black flex items-center justify-center text-lg ml-1">-</span>
                <span>1</span>
                <span class="plus bg-gray-300 w-5 h-5 rounded-2xl text-black flex items-center justify-center text-lg mr-1">+</span>
            </div>        
        `;
        list_cart_HTML.appendChild(newItem);
        updateTotalPrice();
    }
}
function updateTotalPrice(){
    let totalPrice = 0;
    let shippingPrice = 0;

    let allItems = list_cart_HTML.querySelectorAll(".grid");
    allItems.forEach(product => {
        let quantity = parseInt(product.querySelector(".quantity span:nth-child(2)").innerText);
        let price = parseInt(product.querySelector(".price").innerText.replace(",", "").replace(" تومان", ""));

        shippingPrice = parseInt(document.querySelector(".shippingPrice").innerText.replace(",", "").replace(" تومان", ""));
        
        if(price >= 100000){
            document.querySelector(".shippingPrice").innerText = `${shippingPrice.toLocaleString()} تومان`;
            shippingPrice = 500*0;
            
        } else {
            shippingPrice = 5000*quantity;
            document.querySelector(".shippingPrice").innerText = `${shippingPrice.toLocaleString()} تومان`;
        }


        totalPrice += price + shippingPrice;
        let Maliat = totalPrice * 10/100;
        totalPrice += Maliat;

    });
   
    document.querySelector(".totalPrice").innerText = `${totalPrice.toLocaleString()} تومان`;
    

}
function reduceProductQuantityByOne(clickedButton){
    let productCartDiv = clickedButton.closest(".grid");
    let quantitySpan = productCartDiv.querySelector(".quantity span:nth-child(2)");
    let priceSpan = productCartDiv.querySelector(".price");

    let productPrice = parseInt(priceSpan.dataset.price);
    let currentQuantity = parseInt(quantitySpan.innerText);

    if (currentQuantity > 1) {
        currentQuantity--;
        quantitySpan.innerText = currentQuantity;
        
        let totalProductPrice = currentQuantity * productPrice;
        priceSpan.innerText = `${totalProductPrice.toLocaleString()} تومان`;
        updateTotalPrice();
    } else {
        clickedButton.closest(".grid").remove();
        updateTotalPrice();
    }
}

function increaseProductQuantityByOne(clickedButton){
    let productCartDiv = clickedButton.closest(".grid");
    let quantitySpan = productCartDiv.querySelector(".quantity span:nth-child(2)");
    let priceSpan = productCartDiv.querySelector(".price");

    let productPrice = parseInt(priceSpan.dataset.price);
    let currentQuantity = parseInt(quantitySpan.innerText);

    currentQuantity++;
    quantitySpan.innerText = currentQuantity;

    // quantitySpan.innerText = parseInt(quantitySpan.innerText) + 1;

    let totalProductPrice = currentQuantity * productPrice;
    priceSpan.innerText = `${totalProductPrice.toLocaleString()} تومان`;

    updateTotalPrice();
}

init();