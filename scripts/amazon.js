import { cart, addToCart, calculateCartQuantity,} from "../data/cart.js";
import { products, loadProducts } from "../data/products.js";
import { formatCurrency } from "../scripts/utils/money.js";

loadProducts(renderProductsGrid);

export function renderProductsGrid() {
  let productsHTML = "";

  const url = new URL(window.location.href);
  const search = url.searchParams.get('search')?.toLowerCase() || "";

  let filteredProducts = products;

  if (search) {
    filteredProducts = products.filter((product) => {
      const nameMatch = product.name.toLowerCase().includes(search);

      const keywordMatch = product.keywords.some((kw) =>
        kw.toLowerCase().includes(search)
      );

      return nameMatch || keywordMatch;
    });
  }


  filteredProducts.forEach((product) => {
    productsHTML += `
      <div class="product-container">
        <div class="product-image-container">
          <img class="product-image"
            src="${product.image}">
        </div>

        <div class="product-name limit-text-to-2-lines">
          ${product.name}
        </div>

        <div class="product-rating-container">
          <img class="product-rating-stars"
            src="${product.getStarsUrl()}">
          <div class="product-rating-count link-primary">
            ${product.rating.count}
          </div>
        </div>

        <div class="product-price">
          ${product.getPrice()}
        </div>

        <div class="product-quantity-container">
          <select
             class="js-quantity-selector-${product.id}"
             >
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>

        ${product.extraInfoHTML()}

        <div class="product-spacer"></div>

        <div class="added-to-cart js-added-to-cart-${product.id}">
          <img src="images/icons/checkmark.png">
          Added
        </div>

        <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id ="${
          product.id
        }">
          Add to Cart
        </button>
      </div>
    `;
  });

  // 替代页面
  document.querySelector(".js-products-grid").innerHTML = productsHTML;

  updateCartQuantity();

  // 更新主页面的购物车数量
  function updateCartQuantity() {
    /*
    let cartQuantity = 0;

    cart.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });
    */
   const cartQuantity = calculateCartQuantity();

    document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
  }

  // 找到所有“添加到购物车”按钮，并为它们分别添加功能。
  document.querySelectorAll(".js-add-to-cart").forEach((button) => {
    // 为每个按钮创建一个独立的计时器ID，防止互相干扰
    let addedMessageTimeoutId;

    // 当按钮被点击时，执行以下操作：
    button.addEventListener("click", () => {
      
      // 1. 获取商品ID和用户选择的数量。
      const productId = button.dataset.productId;
      const quantitySelector = document.querySelector(
        `.js-quantity-selector-${productId}`
      );
      const quantity = Number(quantitySelector.value);

      // 2. 更新购物车数据，并刷新页面顶部的总数量。
      addToCart(productId, quantity);
      updateCartQuantity();

      // 3. 显示“已添加”的确认消息。
      const addedMessage = document.querySelector(
        `.js-added-to-cart-${productId}`
      );

      addedMessage.classList.add('added-to-cart-visible');

      // 4. 设置一个2秒后自动隐藏消息的计时器，并处理重复点击（重置计时器）。
      if(addedMessageTimeoutId) {
        clearTimeout(addedMessageTimeoutId);
      }

      const timeoutId = setTimeout(() => {
        addedMessage.classList.remove('added-to-cart-visible');
      }, 2000);

      addedMessageTimeoutId = timeoutId;
    });
  });

  document.querySelector('.js-search-button')
    .addEventListener('click', () => {
      const search = document.querySelector('.js-search-bar').value;
      window.location.href = `amazon.html?search=${search}`;
    });
}
