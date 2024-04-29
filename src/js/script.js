document.addEventListener('DOMContentLoaded', function() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartButton = document.querySelector('.carrinho');
    const cartItemsContainer = document.createElement('div');
    cartItemsContainer.classList.add('cart-items-container');
    const body = document.querySelector('body');

    let cartItems = [];

    // Função para adicionar um item ao carrinho
    function addToCart(item) {
        cartItems.push(item);
        showCartItems();
    }

    // Função para exibir os itens no carrinho
    function showCartItems() {
        cartItemsContainer.innerHTML = '';
        cartItems.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <img src="${item.image}" alt="">
                <div class="cart-item-info">
                    <h3>${item.title}</h3>
                    <h4>${item.price}</h4>
                    <button class="remove-from-cart" data-index="${index}">Remover</button>
                </div>
            `;
            cartItemsContainer.appendChild(cartItem);
        });
    }

    // Função para remover um item do carrinho
    function removeFromCart(index) {
        cartItems.splice(index, 1);
        showCartItems();
    }

    // Adicionar evento de clique aos botões de adicionar ao carrinho
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.parentElement;
            const item = {
                image: card.querySelector('img').src,
                title: card.querySelector('h3').textContent,
                price: card.querySelector('h4').textContent
            };
            addToCart(item);
        });
    });

    // Adicionar evento de clique ao botão do carrinho
    cartButton.addEventListener('click', function() {
        if (!body.contains(cartItemsContainer)) {
            body.appendChild(cartItemsContainer);
        }
        showCartItems();
    });

    // Adicionar evento de clique aos botões de remover do carrinho
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('remove-from-cart')) {
            const index = event.target.dataset.index;
            removeFromCart(index);
        }
    });
});
