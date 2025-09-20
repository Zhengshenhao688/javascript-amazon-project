// --- 模块导入 ---
// 从不同文件中导入所需的数据和函数
import {
  cart,
  removeFromCart,
  updateDeliveryOption,
  updateQuantity,
} from "../../data/cart.js";
import { products, getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import {
  deliveryOptions,
  getDeliveryOption,
  calculateDeliveryDate
} from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";
import { renderCheckoutHeader } from "./checkoutHeader.js";

/**
 * --- 订单总结模块的核心渲染函数 ---
 * 负责读取购物车（Model）的当前状态，生成整个订单商品列表的HTML（View），
 * 并为列表中的所有交互元素（如删除、更新、保存链接）绑定事件监听器（Controller）。
 * 这是一个典型的MVC模式中的视图更新函数。
 * * @returns {void} 这个函数没有返回值，它的作用是直接修改页面的DOM。
 */
export function renderOrderSummary() {
  // --- 视图(View)生成阶段 ---

  // 1. 初始化一个空字符串，用于累加所有购物车商品的HTML。
  let cartSummaryHtml = "";

  // dayjs()
  const today = dayjs();
  const deliveryDate = today.format("dddd, MMMM D");

  // 2. 遍历购物车(cart)数组，为每个商品生成一段HTML。
  cart.forEach((cartItem) => {
    // 根据购物车项中的productId，获取完整的商品信息。
    const productId = cartItem.productId;
    const matchingProduct = getProduct(productId);

    // 根据购物车项中的deliveryOptionId，获取完整的配送选项信息。
    const deliveryOptionId = cartItem.deliveryOptionId;
    const deliveryOption = getDeliveryOption(deliveryOptionId);

    // 调用辅助函数计算出格式化后的配送日期字符串。
    const dateString = calculateDeliveryDate(deliveryOption);

    // 3. 使用模板字符串拼接出单个商品的HTML结构,
    // 并累加到cartSummaryHtml中。
    cartSummaryHtml += `
      <div class="cart-item-container
      js-cart-item-container
      js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
          Delivery date: ${dateString}
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image"
            src="${matchingProduct.image}">

          <div class="cart-item-details">
            <div class="product-name
              js-product-name-${matchingProduct.id}">
              ${matchingProduct.name}
            </div>
            <div class="product-price
              js-product-price-${matchingProduct.id}">
              ${matchingProduct.getPrice()}
            </div>
            <div class="product-quantity
            js-product-quantity-${matchingProduct.id}">
              <span>
                Quantity: <span class="quantity-label">${
                  cartItem.quantity
                }</span>
              </span>
              <span class="update-quantity-link link-primary js-update-link"
                data-product-id="${matchingProduct.id}">
                Update
              </span>

              <input class="quantity-input
                js-quantity-input-${matchingProduct.id}"
                data-product-id="${matchingProduct.id}">
              <span class="save-quantity-link link-primary js-save-link"
                data-product-id="${matchingProduct.id}">
                save
              </span>

              <span class="delete-quantity-link link-primary js-delete-link 
              js-delete-link-${matchingProduct.id}" data-product-id= ${matchingProduct.id}>
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            ${deliveryOptionsHTML(matchingProduct, cartItem)}
          </div>
        </div>
      </div>
    `;
  });

  /**
   * 内部辅助函数：为单个商品生成其所有可选配送方式的HTML（三个单选框）
   * @param {object} matchingProduct - 当前商品的完整信息
   * @param {object} cartItem - 当前购物车项目的信息，用于判断哪个选项应被选中
   * @returns {string} - 返回包含所有配送选项的HTML字符串
   */
  function deliveryOptionsHTML(matchingProduct, cartItem) {
    let html = "";
    // 遍历所有可用的配送选项
    deliveryOptions.forEach((deliveryOption) => {
      const dateString = calculateDeliveryDate(deliveryOption);

      const priceString =
        deliveryOption.priceCents === 0
          ? `FREE`
          : `$${formatCurrency(deliveryOption.priceCents)} -`;

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

      html += `
      <div class="delivery-option js-delivery-option
        js-delivery-option-${matchingProduct.id}-${deliveryOption.id}"
        data-product-id="${matchingProduct.id}"
        data-delivery-option-id="${deliveryOption.id}">
        <input type="radio"
          ${isChecked ? "checked" : ""} 
          class="delivery-option-input
          js-delivery-option-input-${matchingProduct.id}-${deliveryOption.id}"
          name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
            ${dateString}
          </div>
          <div class="delivery-option-price">
            ${priceString} Shipping
          </div>
        </div>
      </div>
    `;
    });

    return html;
  }

  // --- 渲染与交互(Controller)阶段 ---

  // 4. 将拼接好的所有HTML内容，
  // 一次性渲染到页面指定的容器中。
  document.querySelector(".js-order-summary").innerHTML = cartSummaryHtml;

  // 5. 为所有新生成的“删除”链接添加点击事件监听器。
  document.querySelectorAll(".js-delete-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      
      // 更新数据模型(Model)
      removeFromCart(productId);
      // 根据更新后的模型，重新渲染所有相关的视图(View)
      renderOrderSummary();
      renderCheckoutHeader();
      renderPaymentSummary();
    });
  });

  // 6. 为所有新生成的“配送选项”添加点击事件监听器。
  document.querySelectorAll(".js-delivery-option").forEach((element) => {
    element.addEventListener("click", () => {
      // 通过解构赋值，
      // 从被点击元素的data属性中
      // 获取商品ID和配送选项ID
      const { productId, deliveryOptionId } = element.dataset;
      console.log(productId, deliveryOptionId);
      // 更新数据模型(Model)
      updateDeliveryOption(productId, deliveryOptionId);
      // 重新渲染视图(View)
      renderOrderSummary();
      renderPaymentSummary();
    });
  });

  // 7. 为所有新生成的“Update”链接添加点击事件，
  // 使其进入编辑模式。
  document.querySelectorAll(".js-update-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
  
      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );

      container.classList.add("is-editing-quantity");
    });
  });

  // 8. 为所有新生成的“Save”链接添加点击事件。
  document.querySelectorAll(".js-save-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      saveNewQuantity(productId);
    });
  });

  // 9. 将保存逻辑提取到一个可复用的函数中。
  function saveNewQuantity(productId) {
    const container = document.querySelector(
      `.js-cart-item-container-${productId}`
    );
    const quantityInput = document.querySelector(
      `.js-cart-item-container-${productId} .quantity-input`
    );

    const newQuantity = Number(quantityInput.value);

    if (newQuantity < 1 || newQuantity >= 1000) {
      alert("Quantity must be at least 1 and less than 1000");
      return renderOrderSummary()
    }

    // 更新数据模型(Model)
    updateQuantity(productId, newQuantity);
    // 重新渲染所有相关的视图(View)
    renderOrderSummary();
    renderPaymentSummary();
    renderCheckoutHeader();
  }

  // 10. 为所有新生成的数量输入框添加键盘事件（回车键保存）。
  document.querySelectorAll(".quantity-input").forEach((input) => {
    input.addEventListener("keydown", (event) => {
      if (event.key === 'Enter') {
        const productId = input.dataset.productId;
        saveNewQuantity(productId);
      }
    });
  });
}
