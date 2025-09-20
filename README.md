# Amazon Clone Project (Frontend) 

This project is a frontend clone of the Amazon e-commerce website, developed as part of a comprehensive JavaScript course. It covers both basic and advanced JavaScript concepts, including DOM manipulation, modularization, object-oriented programming (OOP), asynchronous operations, and automated testing.  

本项目是亚马逊电子商务网站的前端克隆，作为综合性 JavaScript 课程的一部分开发。涵盖基础与高级 JavaScript 概念，包括 DOM 操作、模块化、面向对象编程 (OOP)、异步操作和自动化测试。  

---

## Features

### Home Page (`amazon.html`)
- **Dynamic Product Grid**: Products are loaded from the backend and rendered dynamically.  
- **Add to Cart**: Users can add products to the cart.  
  - Quantity selector allows adding multiple items at once.  
  - "Added" confirmation message shows for 2 seconds and resets on repeated clicks.  
- **Dynamic Cart Quantity**: Updates the cart count in the header in real-time.  
- **Search**:  
  - Search terms are saved in the URL parameter (`?search=...`).  
  - Filters products by name and keywords, case-insensitive.  

### Checkout Page (`checkout.html`)
- **Modular MVC Design**: The checkout page is organized using MVC principles, separating header, order summary, and payment summary into modules.  
- **Dynamic Order Summary**:  
  - Displays correct product details, allows quantity updates and deletions.  
  - Input validation (quantity ≥ 0 and < 1000) and supports saving changes via Enter key.  
- **Dynamic Shipping Options**:  
  - Users can select multiple shipping options per item.  
  - Delivery dates are calculated using **DayJS** and automatically skip weekends.  
- **Dynamic Payment Summary**: Correctly calculates totals, taxes, shipping, and updates in real-time when cart changes.  
- **Place Order**: Sends final cart data to the backend to simulate placing an order.  

### Orders & Tracking Pages (`orders.html`, `tracking.html`)
- **Orders Page**: Dynamically displays past orders.  
- **Interactive Buttons**:  
  - "Buy Again" adds the product back to the cart.  
  - "Track Package" navigates to the tracking page with `orderId` and `productId` parameters.  
- **Tracking Page**:  
  - Reads `orderId` and `productId` from URL to show correct tracking info.  
  - Shows a dynamic progress bar indicating shipping progress.  
  - Updates shipping status (Preparing, Shipped, Delivered) based on progress.  

---

## Key Concepts
- **JavaScript Basics**: Variables, functions, loops, conditionals, objects, arrays.  
- **DOM Manipulation**: `document.querySelector`, `.innerHTML`, `data-*` attributes, event listeners.  
- **Asynchronous JavaScript**:  
  - Callbacks (XMLHttpRequest)  
  - Promises with `fetch()`  
  - Async/await  
  - `Promise.all` for parallel requests  
- **Object-Oriented Programming (OOP)**:  
  - `class`, `extends`, encapsulation  
  - Product, Clothing, Appliance, Cart classes  
- **ES6 Modules**: `import` / `export` for modular code  
- **Automated Testing (Jasmine)**: `describe`, `it`, `beforeEach`, `afterEach`, `spyOn`  
- **Version Control**: Clean commits and feature-based workflow  
