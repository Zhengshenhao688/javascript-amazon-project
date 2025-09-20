// --- 模块导入 ---
// 从 cart.js 文件中导入需要测试的函数(addToCart)和变量(cart)，以及辅助函数(loadFromStorage)
import {
  addToCart,
  cart,
  loadFromStorage,
  removeFromCart,
  updateDeliveryOption,
} from "../../data/cart.js";

describe("test suite: addToCart", () => {
  beforeEach(() => {
    spyOn(localStorage, "setItem");
  });

  it("adds an existing product to the cart", () => {
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 1,
          deliveryOptionId: "1",
        },
      ]);
    });
    // 4. 调用 loadFromStorage()。这会触发上面伪造的 getItem，从而把我们的假数据加载到 cart 变量中
    loadFromStorage();

    // --- 执行阶段 (Act) ---
    // 5. 调用我们要测试的函数，传入一个已存在的商品ID
    addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6", 1);

    // --- 验证阶段 (Assert) ---
    // 6. 使用 expect(...) 来断言结果是否符合预期
    expect(cart.length).toEqual(1);
    // 期望：saveToStorage (内部调用了 setItem) 被调用了1次
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart[0].quantity).toEqual(2);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "cart",
      JSON.stringify([
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 2, // <-- 验证数量是否已更新为 2
          deliveryOptionId: "1",
        },
      ])
    );
  });

  /**
   * it: 定义另一个“测试用例”
   * 描述了另一个场景：“测试向一个空的购物车中，添加一个新商品”
   */
  it("adds a new product to the cart", () => {
    // 2. 伪造 getItem 的行为，这次让它返回一个空数组的字符串
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([]);
    });

    // 3. 加载这个“空购物车”到 cart 变量中
    loadFromStorage();

    // --- 执行阶段 (Act) ---
    // 4. 调用函数，添加一个新商品
    addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6", 1);

    // --- 验证阶段 (Assert) ---
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart[0].quantity).toEqual(1);

    expect(localStorage.setItem).toHaveBeenCalledWith(
      "cart",
      JSON.stringify([
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 1,
          deliveryOptionId: "1",
        },
      ])
    );
  });

  
});

describe("Test suite: removeFromCart", () => {
  const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
  const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";

  beforeEach(() => {
    spyOn(localStorage, "setItem");
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: productId1,
          quantity: 2,
          deliveryOptionId: "1",
        },
        {
          productId: productId2,
          quantity: 1,
          deliveryOptionId: "2",
        },
      ]);
    });

    loadFromStorage();
  });

  // 测试移除一个存在的商品
  it("remove a product that is in the cart", () => {
    removeFromCart(productId1);

    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual(productId2);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "cart",
      JSON.stringify([
        {
          productId: productId2,
          quantity: 1,
          deliveryOptionId: "2",
        },
      ])
    );
  });

  // 测试移除一个不存在的商品
  it("does nothing if a product is not in the cart", () => {
    removeFromCart("does-not-exist");

    expect(cart.length).toEqual(2);
    expect(cart[0].productId).toEqual(productId1);
    expect(cart[1].productId).toEqual(productId2);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "cart",
      JSON.stringify([
        {
          productId: productId1,
          quantity: 2,
          deliveryOptionId: "1",
        },
        {
          productId: productId2,
          quantity: 1,
          deliveryOptionId: "2",
        },
      ])
    );
  });

});

describe('test suite: updateDeliveryOption', () => {
  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';

  beforeEach(() => {
    spyOn(localStorage, 'setItem');

    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([
        {
          productId: productId1,
          quantity: 2,
          deliveryOptionId: '1' 
        }
      ]);
    });
    loadFromStorage();
  });

  // 测试更新一个商品的配送选项 (练习 16k)
  it('updates the delivery option of a product', () => {
    updateDeliveryOption(productId1, '3');

    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual(productId1);
    expect(cart[0].quantity).toEqual(2);
    expect(cart[0].deliveryOptionId).toEqual('3');
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
      productId: productId1,
      quantity: 2,
      deliveryOptionId: '3'
    }]));
  });

  // 测试更新一个不存在的商品 (练习 16l)
  it('does nothing if the product is not in the cart', () => {
    updateDeliveryOption('does-not-exist', '3');

    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual(productId1);
    expect(cart[0].quantity).toEqual(2);
    // 验证 deliveryOptionId 未被改变
    expect(cart[0].deliveryOptionId).toEqual('1'); 
    // 验证 setItem 完全没有被调用
    expect(localStorage.setItem).not.toHaveBeenCalled(); 
  });

  it('does nothing if the delivery option does not exist', () => {
    // 执行：尝试将配送选项更新为一个不存在的 ID 'does-not-exist'
    updateDeliveryOption(productId1, 'does-not-exist');

    // 验证：
    // 1. 验证购物车内容和原来完全一样
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual(productId1);
    expect(cart[0].quantity).toEqual(2);
    // 2. 关键：验证 deliveryOptionId 仍然是初始的 '1'，未被改变
    expect(cart[0].deliveryOptionId).toEqual('1');
    // 3. 关键：验证 localStorage.setItem 完全没有被调用
    expect(localStorage.setItem).not.toHaveBeenCalled();
  });

});