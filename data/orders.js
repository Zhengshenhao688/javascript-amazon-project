export const orders = JSON.parse(localStorage.getItem('orders')) || [];

// 添加一个函数，保证每个 order 都有 products 数组
export function sanitizeOrders() {
  orders.forEach(order => {
    if (!Array.isArray(order.products)) {
      order.products = [];
    }
  });
}

export function addOrder(order) {
  // 确保新订单也有 products 数组
  if (!Array.isArray(order.products)) {
    order.products = [];
  }

  orders.unshift(order);
  saveToStorage();
}

function saveToStorage() {
  localStorage.setItem('orders', JSON.stringify(orders));
}

export function getOrder(orderId) {
  sanitizeOrders();
  return orders.find(order => order.id === orderId);
}
