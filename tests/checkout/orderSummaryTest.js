// Import the functions that we want to test.
import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { loadFromStorage, cart } from "../../data/cart.js";
import { loadProducts, loadProductsFetch, getProduct } from "../../data/products.js";

// 定义一个测试套件，专门测试 renderOrderSummary 功能
describe('test suite: renderOrderSummary', () => {
  // 定义两个固定的商品ID，方便在测试中统一使用
  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

  // 在所有测试运行前，先异步加载商品数据
  beforeAll(async () => {
    await loadProductsFetch();
  })

  // 在每一个测试（it）运行前，都执行一次这里的准备代码
  beforeEach(() => {
    spyOn(localStorage,'setItem');

    // 创建一个干净的HTML测试环境
    document.querySelector('.js-test-container')
      .innerHTML= `
        <div class="js-checkout-header"></div>
        <div class="js-order-summary"></div>
        <div class="js-payment-summary"></div>
      `;

    // 监视 localStorage.getItem，并让它返回我们提供的假购物车数据  
    spyOn(localStorage, 'getItem').and.callFake(() => {

      return JSON.stringify([{
      productId: productId1,
      quantity: 2,
      deliveryOptionId: '1',
      priceCents: 1090
    }, {
      productId: productId2,
      quantity: 1,
      deliveryOptionId: '2',
      priceCents: 2095
    }]);
    });
    // 加载我们伪造的购物车数据
    loadFromStorage();
    renderOrderSummary();
  });

  afterEach(() => {
    document.querySelector('.js-test-container')
    .innerHTML= ''; 
  });

  // 'it' defines a test case for a specific scenario.
  // This test checks if the cart displays
  // correctly on initial load.
  it('displays the cart', () => {
    expect(
      document.querySelectorAll('.js-cart-item-container').length).toEqual(2);
    expect(
      document.querySelector
        (`.js-product-quantity-${productId1}`).innerText).toContain('Quantity: 2'); 
    expect(
      document.querySelector
        (`.js-product-quantity-${productId2}`).innerText).toContain('Quantity: 1');      
    expect(
      document.querySelector
        (`.js-product-name-${productId1}`).innerText).toEqual
        ('Black and Gray Athletic Cotton Socks - 6 Pairs')    
    expect(
      document.querySelector
        (`.js-product-name-${productId2}`).innerText).toEqual
        ('Intermediate Size Basketball')    
    expect(
      document.querySelector(`.js-product-price-${productId1}`).innerText
    ).toEqual('$10.90');
    expect(
      document.querySelector(`.js-product-price-${productId2}`).innerText
    ).toEqual('$20.95');    
  });

  // This test checks if
  // the delete functionality works.
  it('removes a product', () => {
    document.querySelector(`.js-delete-link-${productId1}`).click();

    expect(
      document.querySelectorAll('.js-cart-item-container').length).toEqual(1);
    expect(
      document.querySelector(`.js-cart-item-container-${productId1}`)
    ).toEqual(null);  
    expect(
      document.querySelector(`.js-cart-item-container-${productId2}`)
    ).not.toEqual(null);

    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual(productId2);
  });

  it('updates the delivery option', () => {
    document.querySelector(
      `.js-delivery-option-${productId1}-3`
    ).click();

    expect(
      document.querySelector(
        `.js-delivery-option-input-${productId1}-3`
      ).checked
    ).toBe(true);

    expect(cart.length).toEqual(2);
    expect(cart[0].productId).toEqual(productId1);
    expect(cart[0].deliveryOptionId).toEqual('3');
    expect(
      document.querySelector('.js-shipping-price').innerText
    ).toEqual('$14.98');
    expect(
      document.querySelector('.js-total-price').innerText
    ).toEqual('$63.50');
  })
});