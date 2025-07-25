document.addEventListener('DOMContentLoaded', () => {
    const coffeeMenuContainer = document.querySelector('.coffee-menu');
    const nonCoffeeMenuContainer = document.querySelector('.non-coffee-menu');
    const categoryButtons = document.querySelectorAll('.category-btn');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalAmount = document.getElementById('cart-total-amount');
    const checkoutBtn = document.getElementById('checkout-btn');
    const paymentModal = document.getElementById('payment-modal');
    const confirmationModal = document.getElementById('confirmation-modal');
    const closeButtons = document.querySelectorAll('.modal .close-button');
    const paymentForm = document.getElementById('payment-form');
    const receiptDetails = document.getElementById('receipt-details');
    const orderNowBtn = document.querySelector('.order-now-btn');
    const orderSection = document.getElementById('order');
    const emptyCartMessage = document.querySelector('.empty-cart-message');

    let cart = [];

    // Define menu items
    const coffeeMenuItems = [
        { name: 'Espresso', price: 3.50, image: 'images/espresso.jpg', description: 'A shot of intense coffee goodness.' },
        { name: 'Macchiato', price: 4.00, image: 'images/macchiato.jpg', description: 'Espresso with a dash of foamed milk.' },
        { name: 'Cappuccino', price: 4.80, image: 'images/cappuccino.jpg', description: 'Equal parts espresso, steamed milk, and foam.' },
        { name: 'Latte', price: 5.20, image: 'images/latte.jpg', description: 'Smooth espresso with plenty of steamed milk.' },
        { name: 'Mocha', price: 5.50, image: 'images/mocha.jpg', description: 'A delightful blend of chocolate, espresso, and steamed milk.' },
        { name: 'Affogato', price: 6.00, image: 'images/affogato.jpg', description: 'Vanilla ice cream drowned in a shot of hot espresso.' },
    ];

    const nonCoffeeMenuItems = [
        { name: 'Watermelon Juice', price: 4.50, image: 'images/watermelon-juice.jpg', description: 'Refreshing freshly squeezed watermelon juice.' },
        { name: 'Milo', price: 3.80, image: 'images/milo.jpg', description: 'Classic chocolate malt drink.' },
        { name: 'Teh Tarik', price: 4.20, image: 'images/teh-tarik.jpg', description: 'Frothy Malaysian pulled tea.' },
        { name: 'Vanilla Ice Cream Cone', price: 3.00, image: 'images/vanilla-ice-cream.jpg', description: 'A classic scoop of creamy vanilla ice cream.' },
    ];

    // Function to render menu items
    function renderMenuItems(items, container) {
        container.innerHTML = ''; // Clear previous items
        items.forEach(item => {
            const menuItemDiv = document.createElement('div');
            menuItemDiv.classList.add('menu-item');
            menuItemDiv.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <span class="price">$${item.price.toFixed(2)}</span>
                <button class="add-to-cart-btn" data-name="${item.name}" data-price="${item.price.toFixed(2)}">Add to Cart</button>
            `;
            container.appendChild(menuItemDiv);
        });
        addAddToCartListeners();
    }

    // Function to add event listeners for "Add to Cart" buttons
    function addAddToCartListeners() {
        document.querySelectorAll('.add-to-cart-btn').forEach(button => {
            button.onclick = (event) => {
                const name = event.target.dataset.name;
                const price = parseFloat(event.target.dataset.price);
                addToCart(name, price);
            };
        });
    }

    // Function to add item to cart
    function addToCart(name, price) {
        const existingItemIndex = cart.findIndex(item => item.name === name);
        if (existingItemIndex > -1) {
            cart[existingItemIndex].quantity += 1;
        } else {
            cart.push({ name, price, quantity: 1 });
        }
        updateCartDisplay();
    }

    // Function to update item quantity in cart
    function updateCartQuantity(name, change) {
        const itemIndex = cart.findIndex(item => item.name === name);
        if (itemIndex > -1) {
            cart[itemIndex].quantity += change;
            if (cart[itemIndex].quantity <= 0) {
                cart.splice(itemIndex, 1); // Remove if quantity is 0 or less
            }
        }
        updateCartDisplay();
    }

    // Function to remove item from cart
    function removeItemFromCart(name) {
        cart = cart.filter(item => item.name !== name);
        updateCartDisplay();
    }

    // Function to update the cart display
    function updateCartDisplay() {
        cartItemsContainer.innerHTML = ''; // Clear current cart display
        let total = 0;

        if (cart.length === 0) {
            emptyCartMessage.style.display = 'block';
            checkoutBtn.disabled = true;
        } else {
            emptyCartMessage.style.display = 'none';
            checkoutBtn.disabled = false;
            cart.forEach(item => {
                const cartItemDiv = document.createElement('div');
                cartItemDiv.classList.add('cart-item');
                cartItemDiv.innerHTML = `
                    <div class="cart-item-info">
                        <span>${item.name} x ${item.quantity}</span>
                        <span>$${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                    <div class="cart-item-actions">
                        <button class="update-quantity-btn" data-name="${item.name}" data-change="-1">-</button>
                        <button class="update-quantity-btn" data-name="${item.name}" data-change="1">+</button>
                        <button class="remove-item" data-name="${item.name}">Remove</button>
                    </div>
                `;
                cartItemsContainer.appendChild(cartItemDiv);
                total += item.price * item.quantity;
            });
        }
        cartTotalAmount.textContent = total.toFixed(2);
        addCartItemListeners();
    }

    // Function to add event listeners for cart item actions
    function addCartItemListeners() {
        document.querySelectorAll('.update-quantity-btn').forEach(button => {
            button.onclick = (event) => {
                const name = event.target.dataset.name;
                const change = parseInt(event.target.dataset.change);
                updateCartQuantity(name, change);
            };
        });

        document.querySelectorAll('.remove-item').forEach(button => {
            button.onclick = (event) => {
                const name = event.target.dataset.name;
                removeItemFromCart(name);
            };
        });
    }

    // Handle category button clicks
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const category = button.dataset.category;
            if (category === 'coffee') {
                document.querySelector('.coffee-menu').classList.add('active');
                document.querySelector('.non-coffee-menu').classList.remove('active');
            } else {
                document.querySelector('.non-coffee-menu').classList.add('active');
                document.querySelector('.coffee-menu').classList.remove('active');
            }
        });
    });

    // Initial render of coffee menu
    renderMenuItems(coffeeMenuItems, coffeeMenuContainer);
    renderMenuItems(nonCoffeeMenuItems, nonCoffeeMenuContainer);
    updateCartDisplay(); // Initialize cart display

    // Scroll to order section when "Order Now" is clicked
    orderNowBtn.addEventListener('click', () => {
        orderSection.scrollIntoView({ behavior: 'smooth' });
    });

    // Checkout button click
    checkoutBtn.addEventListener('click', () => {
        if (cart.length > 0) {
            paymentModal.style.display = 'flex'; // Show payment modal
        } else {
            alert('Your cart is empty! Please add some items before checking out.');
        }
    });

    // Close modals
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            paymentModal.style.display = 'none';
            confirmationModal.style.display = 'none';
        });
    });

    // Close modal when clicking outside of it
    window.addEventListener('click', (event) => {
        if (event.target == paymentModal) {
            paymentModal.style.display = 'none';
        }
        if (event.target == confirmationModal) {
            confirmationModal.style.display = 'none';
        }
    });

    // Payment form submission
    paymentForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default form submission

        // In a real application, you would send payment details to a server.
        // For this client-side only example, we'll simulate success.

        const orderType = document.querySelector('input[name="orderType"]:checked').value;
        const totalAmount = cartTotalAmount.textContent;

        // Generate receipt
        let receiptHtml = `
            <p><strong>Order Type:</strong> ${orderType.charAt(0).toUpperCase() + orderType.slice(1)}</p>
            <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
            <hr style="border-top: 1px dashed #DDD; margin: 10px 0;">
            <p><strong>Items:</strong></p>
        `;

        cart.forEach(item => {
            receiptHtml += `<div><span>${item.name} x ${item.quantity}</span><span>$${(item.price * item.quantity).toFixed(2)}</span></div>`;
        });

        receiptHtml += `
            <hr style="border-top: 1px dashed #DDD; margin: 10px 0;">
            <div><span><strong>Total:</strong></span><span><strong>$${totalAmount}</strong></span></div>
        `;

        receiptDetails.innerHTML = receiptHtml;

        // Reset cart
        cart = [];
        updateCartDisplay();

        // Close payment modal and open confirmation modal
        paymentModal.style.display = 'none';
        confirmationModal.style.display = 'flex'; // Show confirmation modal

        // Clear payment form fields
        paymentForm.reset();
    });
});