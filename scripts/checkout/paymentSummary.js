/**
 * --- 支付总结模块 (paymentSummary.js) ---
 * * 这个文件的主要作用是：
 * 1. 计算购物车中所有商品的总价、总运费、税费和最终支付金额。
 * 2. 生成一个订单总结的HTML区块。
 * 3. 将这个HTML区块渲染到页面的指定位置。
 */

// --- 模块导入 ---
import { cart ,calculateCartQuantity} from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { formatCurrency } from "../utils/money.js";
import { addOrder } from "../../data/orders.js";

/**
 * 渲染支付总结区域的函数
 * 这个函数没有参数，也不返回任何值，它的作用是直接操作页面（DOM）
 * @returns {void}
 */
export function renderPaymentSummary() {
  // --- 1. 初始化变量 ---
  // 初始化商品总价（单位：美分），用于累加
  let productPriceCents = 0;
  // 初始化总运费（单位：美分），用于累加
  let shippingPriceCents = 0;

  // --- 2. 遍历购物车，计算商品总价和总运费 ---
  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
    productPriceCents += product.priceCents * cartItem.quantity;

    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    shippingPriceCents += deliveryOption.priceCents;
  });

  // --- 3. 计算税前总计、税费和最终总计 ---
  const totalBeforeTaxCents = productPriceCents + shippingPriceCents;

  const taxCents = totalBeforeTaxCents * 0.1;
  const totalCents = totalBeforeTaxCents + taxCents;

  // --- 4. 生成支付总结区域的HTML ---
  const paymentSummaryHTML = `
    <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div>Items (${calculateCartQuantity()}):</div>
      <div class="payment-summary-money js-payment-summary-items-price">
        $${formatCurrency(productPriceCents)}
      </div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money js-shipping-price">
        $${formatCurrency(shippingPriceCents)}
      </div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money js-total-before-tax">
       $${formatCurrency(totalBeforeTaxCents)}
      </div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">
       $${formatCurrency(taxCents)}
      </div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money js-total-price">
       $${formatCurrency(totalCents)}
      </div>
    </div>

    <button class="place-order-button button-primary
     js-place-order">
      Place your order
    </button>
  `;

  // --- 5. 将生成的HTML渲染到页面上 ---
  document.querySelector(".js-payment-summary").innerHTML = paymentSummaryHTML;

  document
    .querySelector(".js-place-order")
    .addEventListener("click", async () => {
      try {
        const response = await fetch("https://supersimplebackend.dev/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cart: cart,
          }),
        });

        const order = await response.json();
        addOrder(order);

      } catch (error) {
        console.log('Unexpected error. Try again later.')
      }

      window.location.href = 'orders.html';
    });
}
