import * as products from '../../data/products.js';
import * as deliveryOptions from '../../data/deliveryOptions.js';

describe('test suite: renderPaymentSummary', () => {
  // ...

  beforeEach(() => {
    // 1. 设置HTML挂载点
    document.querySelector('.js-test-container').innerHTML = `
      <div class="js-payment-summary"></div>
    `;

    // 2. 伪造购物车数据 
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([
        { productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6', quantity: 2, deliveryOptionId: '1' },
        { productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d', quantity: 1, deliveryOptionId: '2' }
      ]);
    });
    loadFromStorage();

    // 3. 伪造商品数据
    spyOn(products, 'getProduct').and.callFake((productId) => {
      if (productId === 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6') {
        return { priceCents: 1090 };
      } else if (productId === '15b6fc6f-327a-4ec4-896f-486349e85a3d') {
        return { priceCents: 2095 };
      }
    });

    // 4. 伪造配送选项数据 
    spyOn(deliveryOptions, 'getDeliveryOption').and.callFake((deliveryOptionId) => {
      if (deliveryOptionId === '1') {
        return { priceCents: 0 };
      } else if (deliveryOptionId === '2') {
        return { priceCents: 499 };
      }
    });
  });

  // 测试用例1：测试商品总价和运费是否正确计算
  it('displays the correct items and shipping price', () => {
    renderPaymentSummary();

    // (2 * 1090) + (1 * 2095) = 2180 + 2095 = 4275
    expect(
      document.querySelector('.js-payment-summary-items-price').innerText
    ).toEqual('$42.75');

    // 0 + 499 = 499
    expect(
      document.querySelector('.js-shipping-price').innerText
    ).toEqual('$4.99');
  });

  // 测试用例2：测试税前、税后总价是否正确
  it('displays the correct totals', () => {
    renderPaymentSummary();

    // 4275 + 499 = 4774
    expect(
      document.querySelector('.js-total-before-tax').innerText
    ).toEqual('$47.74');
    
    // (4275 + 499) * 1.1 = 5251.4 => 5251
    expect(
      document.querySelector('.js-total-price').innerText
    ).toEqual('$52.51');
  });
});