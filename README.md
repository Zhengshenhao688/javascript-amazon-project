# Amazon Clone Project (Frontend) / 亚马逊克隆项目（前端）

This project is a frontend clone of the Amazon e-commerce website, developed as part of a comprehensive JavaScript course. It covers both basic and advanced JavaScript concepts, including DOM manipulation, modularization, object-oriented programming (OOP), asynchronous operations, and automated testing.  

本项目是亚马逊电子商务网站的前端克隆，作为综合性 JavaScript 课程的一部分开发。它涵盖基础与高级 JavaScript 概念，包括 DOM 操作、模块化、面向对象编程 (OOP)、异步操作和自动化测试。  

---

## Features / 已实现的功能

### Home Page (`amazon.html`) / 主页
- **Dynamic product grid / 动态产品网格**: Products are loaded from the backend and rendered dynamically.  
  产品从后端服务器加载并动态呈现在页面上。  
- **Add to cart / 添加到购物车**: Users can add products to the cart.  
  用户可以将产品添加到购物车。  
  - Quantity selector allows adding multiple items at once. / 数量选择器允许一次添加多件商品。  
  - "Added" confirmation message shows for 2 seconds and resets on repeated clicks. / 添加商品后，“已添加”确认信息显示 2 秒，再次点击会重置计时器。  
- **Dynamic cart quantity / 动态购物车数量**: Updates the cart count in the header in real-time. / 页头购物车数量会实时更新。  
- **Search / 搜索功能**:  
  - Search terms are saved in the URL parameter (`?search=...`). / 搜索查询会保存到 URL 参数中。  
  - Filters products by name and keywords, case-insensitive. / 根据产品名称和关键词过滤结果，不区分大小写。  

### Checkout Page (`checkout.html`) / 结账页
- **Modular MVC design / 模块化设计 (MVC)**: The checkout page is organized using MVC principles, separating header, order summary, and payment summary into modules. / 使用模型-视图-控制器方法构建，模块化组织页头、订单摘要和支付摘要。  
- **Dynamic order summary / 动态订单摘要**:  
  - Displays correct product details, allows quantity updates and deletions. / 显示正确的商品详情，允许修改数量和删除商品。  
  - Input validation (quantity ≥ 0 and < 1000) and supports saving changes via Enter key. / 数量输入验证，并支持按回车保存。  
- **Dynamic shipping options / 动态配送选项**:  
  - Users can select multiple shipping options per item. / 每件商品可选择多种配送方式。  
  - Delivery dates are calculated using **DayJS** and automatically skip weekends. / 使用 DayJS 动态计算配送日期并跳过周末。  
- **Dynamic payment summary / 动态支付摘要**: Correctly calculates totals, taxes, shipping, and updates in real-time when cart changes. / 自动计算总价、税费、运费，购物车变动时实时更新。  
- **Place order / 下订单**: Sends final cart data to the backend to simulate placing an order. / 将最终购物车数据发送到后端模拟下单。  

### Orders & Tracking Pages (`orders.html`, `tracking.html`) / 订单与追踪页
- **Orders page / 订单页**: Dynamically displays past orders. / 动态生成历史订单列表。  
- **Interactive buttons / 交互式按钮**:  
  - "Buy Again" adds the product back to the cart. / “再次购买”按钮重新添加商品到购物车。  
  - "Track Package" navigates to the tracking page with `orderId` and `productId` parameters. / “追踪包裹”按钮带 URL 参数跳转。  
- **Tracking page / 追踪页**:  
  - Reads `orderId` and `productId` from URL to show correct tracking info. / 从 URL 获取订单信息。  
  - Shows a dynamic progress bar indicating shipping progress. / 显示动态进度条显示配送进度。  
  - Updates shipping status (Preparing, Shipped, Delivered) based on progress. / 根据进度显示状态（准备中/已发货/已送达）。  

---

## Key Concepts / 掌握的核心概念
- **JavaScript Basics / JavaScript 基础**: Variables, functions, loops, conditionals, objects, arrays. / 变量、函数、循环、条件语句、对象、数组。  
- **DOM Manipulation / DOM 操作**: `document.querySelector`, `.innerHTML`, `data-*` attributes, event listeners. / DOM 查询、修改、事件监听。  
- **Asynchronous JavaScript / 异步 JavaScript**:  
  - Callbacks (XMLHttpRequest) / 回调函数 (XMLHttpRequest)  
  - Promises with `fetch()` / 使用 fetch() 的 Promise  
  - Async/await / async/await  
  - `Promise.all` for parallel requests / 并行请求管理  
- **Object-Oriented Programming (OOP) / 面向对象编程**:  
  - `class`, `extends`, encapsulation. / 类、继承、封装  
  - Product, Clothing, Appliance, Cart classes. / 商品类、服装类、电器类、购物车类  
- **ES6 Modules / ES6 模块**: `import` / `export` for modular code. / 模块化代码组织  
- **Automated Testing (Jasmine) / 自动化测试**: `describe`, `it`, `beforeEach`, `afterEach`, `spyOn`. / 测试套件、钩子函数、模拟依赖  
- **Version Control / 版本控制**: Clean commits and feature-based workflow. / 清晰专业的 Git 提交记录  

---


