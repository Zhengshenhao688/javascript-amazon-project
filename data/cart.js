import { getDeliveryOption } from "./deliveryOptions.js";
/**
 * --- 购物车数据管理模块 (cart.js) ---
 * 这个文件负责所有与购物车相关的核心数据和操作，包括：
 * 1. 从本地存储加载购物车数据
 * 2. 将商品添加到购物车
 * 3. 从购物车中移除商品
 * 4. 更新商品的数量
 * 5. 更新商品的配送选项
 * 6. 将购物车数据保存回本地存储
 * 7. 计算购物车总数量
 * 8. (可选) 从后端加载购物车
 */


export let cart;



loadFromStorage();

/**
 * 从浏览器的 localStorage 中加载购物车数据。
 * 如果 localStorage 中没有，则创建一个包含默认商品的示例购物车。
 */
export function loadFromStorage() {
  cart =JSON.parse(localStorage.getItem('cart'));

  if (!cart) {
    cart = [{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 2,
      deliveryOptionId: '1'
    }, {
      productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity: 1,
      deliveryOptionId: '2'
    }];
  };
}

/**
 * 将当前的 cart 数组保存到 localStorage。
 * 这是一个内部函数，在每次购物车数据被修改后调用。
 */
function saveToStorage () {
  localStorage.setItem('cart', JSON.stringify(cart));
}

/**
 * 将指定ID和数量的商品添加到购物车。
 * @param {string} productId - 要添加的商品的ID。
 * @param {number} quantity - 要添加的数量。
 */
export function addToCart(productId, quantity) {
  // 定义一个变量，
  // 用于存放购物车中已存在的匹配商品
  let matchingItem;

  // 遍历购物车，检查商品是否已经存在
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem; // 找到匹配的商品
    }
  });

  // 如果商品已存在，增加数量；
  // 否则添加新商品到购物车
  if (matchingItem) {
    matchingItem.quantity += quantity;
  } else {
    cart.push({
      productId: productId,
      quantity: quantity,
      deliveryOptionId: '1'
    });
  }
  saveToStorage ()
};

/**
 * 从购物车中移除指定ID的商品
 * @param {string} productId - 要移除的商品的ID
 */
export function removeFromCart(productId) {
  // 创建一个新的空数组，
  // 用于存放保留下来的商品
  const newCart = [];

  // 遍历当前购物车
  cart.forEach((cartItem) => {
    // 如果当前商品的ID和要删除的ID不相同
    if (cartItem.productId !== productId) {
      // 就将这个商品添加到新数组中
      newCart.push(cartItem);
    }
  });

  // 用只包含保留商品的新数组，
  // 替换掉原来的 cart 数组
  cart = newCart;
  saveToStorage ()
};

/**
 * 更新购物车中指定商品的配送选项。
 * @param {string} productId - 需要更新的商品ID。
 * @param {string} deliveryOptionId - 新的配送选项ID。
 */
export function updateDeliveryOption(productId, deliveryOptionId) {
  // 定义一个变量，用于存放需要更新的商品
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem; 
    }
  });

  if(!matchingItem) {
    return;
  }

  const deliveryOption = getDeliveryOption(deliveryOptionId);
  if (!deliveryOption) {
    return;
  }

  // 更新该商品的配送选项ID
  matchingItem.deliveryOptionId = deliveryOptionId;

  saveToStorage();
}

/**
 * (可选功能) 异步地从后端服务器加载购物车。
 * @param {function} fun - 加载成功后要执行的回调函数。
 */

export async function loadCartFetch() {
  const response = await fetch('https://supersimplebackend.dev/cart');
  const text = await response.text();
  console.log(text);
  return text;
}

/*
export function loadCart(fun) {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', () => {
    console.log(xhr.response);
    fun();
  });

  xhr.open('GET', 'https://supersimplebackend.dev/cart');
  xhr.send();
}
*/


/**
 * 计算购物车中所有商品的总数量。
 * @returns {number} - 返回商品总数。
 */
export function calculateCartQuantity() {
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  return cartQuantity;
}

/**
 * 更新购物车中指定商品的数量。
 * @param {string} productId - 需要更新的商品ID。
 * @param {number} newQuantity - 新的数量。
 */
export function updateQuantity(productId, newQuantity) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if(productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  matchingItem.quantity = newQuantity;

  saveToStorage();
}