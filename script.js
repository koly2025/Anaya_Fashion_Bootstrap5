// Owl Carousel JS Init Script

    $(document).ready(function(){
        $(".category-carousel").owlCarousel({
            loop: true,
            margin: 10,
            nav: true,
            autoplay: true,
            autoplayTimeout: 2000,
            responsive: {
                0: { items: 2 },
                576: { items: 3 },
                768: { items: 4 },
                992: { items: 5 },
                1200: { items: 6 }
            }
        });
    });

// Vendor carousel
    $('.vendor-carousel').owlCarousel({
        loop: true,
        margin: 29,
        nav: false,
        autoplay: true,
        smartSpeed: 3000,
        responsive: {
            0:{
                items:2
            },
            576:{
                items:3
            },
            768:{
                items:4
            },
            992:{
                items:5
            },
            1200:{
                items:6
            }
        }
    });


    // Related carousel
    $('.related-carousel').owlCarousel({
        loop: true,
        margin: 29,
        nav: false,
        autoplay: true,
        smartSpeed: 1000,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:2
            },
            768:{
                items:3
            },
            992:{
                items:4
            }
        }
    });


    // Product Quantity
    $('.quantity button').on('click', function () {
        var button = $(this);
        var oldValue = button.parent().parent().find('input').val();
        if (button.hasClass('btn-plus')) {
            var newVal = parseFloat(oldValue) + 1;
        } else {
            if (oldValue > 0) {
                var newVal = parseFloat(oldValue) - 1;
            } else {
                newVal = 0;
            }
        }
        button.parent().parent().find('input').val(newVal);
    });
    
(jQuery);

// trandy product cart
document.addEventListener("DOMContentLoaded", function () {
    const cartCount = document.getElementById('cart-count');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cartCount.textContent = cart.length;
    }

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();

            const product = {
                id: this.dataset.id,
                name: this.dataset.name,
                price: parseFloat(this.dataset.price),
                image: this.dataset.image,
                size: this.dataset.size,
                color: this.dataset.color,
                quantity: 1
            };

            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            cart.push(product);
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();

            // Redirect to cart.html
            window.location.href = "cart.html";
        });
    });

    updateCartCount();
});

// ✅ Confirmed Order (Heart) Count and Logic
document.addEventListener("DOMContentLoaded", function () {
    const heartCount = document.getElementById('heart-count');
    const confirmButtons = document.querySelectorAll('.confirm-order');

    // ✅ Function to update the count in the heart icon
    function updateHeartCount() {
        const orders = JSON.parse(localStorage.getItem('orders')) || [];
        if (heartCount) {
            heartCount.textContent = orders.length;
        }
    }

    // ✅ When user clicks "Confirm Order" button
    confirmButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();

            const order = {
                id: this.dataset.id,
                name: this.dataset.name,
                price: parseFloat(this.dataset.price),
                image: this.dataset.image,
                size: this.dataset.size,
                color: this.dataset.color,
                quantity: 1
            };

            let orders = JSON.parse(localStorage.getItem('orders')) || [];
            orders.push(order);
            localStorage.setItem('orders', JSON.stringify(orders));

            updateHeartCount();

            // Redirect to checkout page
            window.location.href = 'heart.html';
        });
    });

    // ✅ Always update heart count when page loads
    updateHeartCount();
});



// cart.html

// Initialize cart data
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let cartItems = document.getElementById('cartItems');
let totalPriceDisplay = document.getElementById('totalPrice');
let deliveryChargeDisplay = document.getElementById('deliveryCharge');
let checkoutBtn = document.getElementById('checkoutBtn');
let checkoutFormDiv = document.getElementById('checkoutFormDiv');
let locationSelect = document.getElementById('location');

// Update cart count and display
function displayCartItems() {
    let total = 0;
    cartItems.innerHTML = ''; // Clear existing items

    cart.forEach((item, index) => {
        total += item.price * item.quantity;
        let row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${item.image}" alt="${item.name}" width="50"></td>
            <td>${item.size}</td>
            <td>${item.color}</td>
            <td>${item.quantity}</td>
            <td>$${item.price}</td>
            <td>$${item.price * item.quantity}</td>
            <td><button class="btn btn-danger btn-sm" onclick="removeItem(${index})">Delete</button></td>
        `;
        cartItems.appendChild(row);
    });

    totalPriceDisplay.innerText = total.toFixed(2);
    updateDeliveryCharge();  // Update the delivery charge when cart items change
}

// Remove item from cart
function removeItem(index) {
    cart.splice(index, 1);  // Remove the product at the specified index
    localStorage.setItem('cart', JSON.stringify(cart));  // Save the updated cart
    displayCartItems();  // Re-render the cart
}

// Handle Proceed to Checkout
checkoutBtn.addEventListener('click', function() {
    // Hide cart and show checkout form
    document.querySelector('table').style.display = 'none';
    checkoutFormDiv.style.display = 'block';
    document.getElementById('totalPrice').value = totalPriceDisplay.innerText;
});

// Handle Checkout Form Submission
document.getElementById('checkoutForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Collect customer details
    let name = document.getElementById('name').value;
    let address = document.getElementById('address').value;
    let phone = document.getElementById('phone').value;

    // Create order object
    let order = {
        name: name,
        address: address,
        phone: phone,
        total: totalPriceDisplay.innerText,
        items: cart
    };

    // Save order to localStorage (Simulating Order Confirmation)
    localStorage.setItem('order', JSON.stringify(order));

    alert('Order Confirmed! Thank you for your purchase.');

    // Clear the cart after order confirmation (if needed)
    localStorage.removeItem('cart');
    cart = [];

    // Redirect to home or confirmation page
    window.location.href = 'index.html'; // Change this as per your design
});

// Update delivery charge based on location
function updateDeliveryCharge() {
    let location = locationSelect.value;
    let deliveryCharge = 0;

    // Delivery charge logic
    if (location === 'inside') {
        deliveryCharge = 80;
    } else if (location === 'outside') {
        deliveryCharge = 150;
    }

    // Update delivery charge and total price
    deliveryChargeDisplay.innerText = deliveryCharge;
    let total = parseFloat(totalPriceDisplay.innerText);
    let totalWithDelivery = total + deliveryCharge;
    totalPriceDisplay.innerText = totalWithDelivery.toFixed(2);
}

// Initially display cart items
displayCartItems();
function displayCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartContainer = document.getElementById("cart-container");

    cartContainer.innerHTML = ""; // Clear existing cart items

    cart.forEach(product => {
        cartContainer.innerHTML += `
            <div class="cart-item">
                <img src="${product.image}" class="img-thumbnail" width="80">
                <p>Product: ${product.name}</p>
                <p>Price: ${product.price} Tk</p>
                <p>Size: ${product.size}</p>
                <p>Color: ${product.color}</p>
                <p>Quantity: ${product.quantity}</p>
                <p>Delivery Fee: ${product.delivery} Tk</p>
            </div>
        `;
    });
}

window.onload = displayCart;

let cartCount = 0;
        let orderCount = 0;

        function changeImage(img) { 
            document.getElementById('main-image').src = img.src; 
            document.getElementById('order-image').src = img.src;
        }

        function addToCart() {
            let product = {
                name: document.getElementById('product-name').innerText,
                price: document.getElementById('price').innerText,
                image: document.getElementById('main-image').src,
                size: document.getElementById('size').value,
                color: document.getElementById('color').value,
                quantity: document.getElementById('quantity').value,
                delivery: document.getElementById('delivery').value
            };
            localStorage.setItem("cart", JSON.stringify(product));
            cartCount++;
            document.getElementById('cartCount').innerText = cartCount;
            alert("Product added to cart!");
        }
        

        function openOrderForm() {
            let product = {
                name: document.getElementById('product-name').innerText,
                size: document.getElementById('size').value,
                color: document.getElementById('color').value,
                quantity: document.getElementById('quantity').value,
                delivery: document.getElementById('delivery').value,
                price: document.getElementById('price').innerText
            };

            document.getElementById("order-product").innerText = product.name;
            document.getElementById("order-size").innerText = product.size;
            document.getElementById("order-color").innerText = product.color;
            document.getElementById("order-quantity").innerText = product.quantity;
            document.getElementById("order-delivery").innerText = product.delivery;
            let total = (product.price * product.quantity) + parseFloat(product.delivery);
            document.getElementById("order-total").innerText = total.toFixed(2);
            document.getElementById("order-modal").style.display = "block";
        }

        function closeOrderForm() {
            document.getElementById("order-modal").style.display = "none";
        }

        function confirmOrder() {
            if (document.getElementById("customer-name").value === "" || document.getElementById("customer-address").value === "" || document.getElementById("customer-phone").value === "") {
                alert("Please fill all fields before confirming.");
                return;
            }
            orderCount++;
            document.getElementById('heartCount').innerText = orderCount;
            alert("Order confirmed!");
            document.getElementById("order-modal").style.display = "none";
        }

        function openOrderDetails() {
            // Show the order details form
            let order = JSON.parse(localStorage.getItem("cart"));
            document.getElementById("order-details-image").src = order.image;
            document.getElementById("order-details-product").innerText = order.name;
            document.getElementById("order-details-size").innerText = order.size;
            document.getElementById("order-details-color").innerText = order.color;
            document.getElementById("order-details-quantity").innerText = order.quantity;
            document.getElementById("order-details-delivery").innerText = order.delivery;
            document.getElementById("order-details-total").innerText = (order.price * order.quantity + parseFloat(order.delivery)).toFixed(2);
            document.getElementById("order-details").style.display = "block";
        }

        function closeOrderDetails() {
            document.getElementById("order-details").style.display = "none";
        }
        

        function removeOrder() {
            localStorage.removeItem("cart");
            orderCount--;
            document.getElementById('heartCount').innerText = orderCount;
            document.getElementById("order-details").style.display = "none";
            alert("Order has been canceled.");
        }
       
        function addToCart() {
    // Collect product details
    let product = {
        name: document.getElementById('product-name').innerText,
        price: document.getElementById('price').innerText,
        image: document.getElementById('main-image').src,
        size: document.getElementById('size').value,
        color: document.getElementById('color').value,
        quantity: document.getElementById('quantity').value,
        delivery: document.getElementById('delivery').value
    };
    
    // Check if the cart already exists in localStorage
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    // Add the new product to the cart array
    cart.push(product);
    
    // Save the updated cart back to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Update the cart count in the navbar
    cartCount = cart.length;
    document.getElementById('cartCount').innerText = cartCount;

    alert("Product added to cart!");
}
function addToCart() {
    // প্রোডাক্টের তথ্য সংগ্রহ করুন
    let product = {
        name: document.getElementById('product-name').innerText,
        price: document.getElementById('price').innerText,
        image: document.getElementById('main-image').src,
        size: document.getElementById('size').value,
        color: document.getElementById('color').value,
        quantity: document.getElementById('quantity').value,
        delivery: document.getElementById('delivery').value
    };
    
    // চেক করুন cart ইতিমধ্যে localStorage এ আছে কিনা
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // নতুন প্রোডাক্ট cart এ যোগ করুন
    cart.push(product);
    
    // আপডেট করা cart আবার localStorage এ সংরক্ষণ করুন
    localStorage.setItem("cart", JSON.stringify(cart));

    // cart count আপডেট করুন
    cartCount = cart.length;
    document.getElementById('cartCount').innerText = cartCount;

    alert("Product has been added to the cart!");
}
function confirmOrder() {
    if (document.getElementById("customer-name").value === "" || document.getElementById("customer-address").value === "" || document.getElementById("customer-phone").value === "") {
        alert("Please fill all fields before confirming.");
        return;
    }

    let order = {
        name: document.getElementById("customer-name").value,
        address: document.getElementById("customer-address").value,
        phone: document.getElementById("customer-phone").value,
        product: {
            name: document.getElementById("product-name").innerText,
            size: document.getElementById("size").value,
            color: document.getElementById("color").value,
            quantity: document.getElementById("quantity").value,
            price: document.getElementById("price").innerText,
            image: document.getElementById("main-image").src,
            delivery: document.getElementById("delivery").value,
        }
    };

    let confirmedOrders = JSON.parse(localStorage.getItem("confirmedOrders")) || [];
    confirmedOrders.push(order);

    // Save confirmed orders to localStorage
    localStorage.setItem("confirmedOrders", JSON.stringify(confirmedOrders));
    
    // Increment order count and update heart icon
    orderCount++;
    document.getElementById('heartCount').innerText = orderCount;

    alert("Order confirmed!");
    document.getElementById("order-modal").style.display = "none";
}


// registration form

  
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("registerForm");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const email = document.getElementById("regEmail").value.trim();
    const mobile = document.getElementById("regMobile").value.trim();
    const password = document.getElementById("regPassword").value;
    const confirmPassword = document.getElementById("regConfirmPassword").value;

    // Password match check
    if (password !== confirmPassword) {
      alert("❌ Passwords do not match!");
      return;
    }

    // Success alert
    alert(`✅ Thank you, ${firstName}! Your account has been registered.`);

    // Redirect to login.html
    window.location.href = "login.html";
  });
});


// registration form end


// login start
document.getElementById("loginForm").addEventListener("submit", function(e) {
      e.preventDefault();

      const email = document.getElementById("loginEmail").value.trim();
      const password = document.getElementById("loginPassword").value;

      // Example authentication simulation (for now just alert)
      alert(`Logged in as: ${email}`);
    });

    // login end

 
 