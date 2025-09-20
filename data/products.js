// data/products.js
import { formatCurrency } from "../scripts/utils/money.js";

export function getProduct(productId) {
  let matchingProduct;

  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });

  return matchingProduct;
}

export class Product {
  id;
  image;
  name;
  rating;
  priceCents;
  keywordsl

  constructor(productDetails) {
    this.id = productDetails.id;
    this.image = productDetails.image;
    this.name = productDetails.name;
    this.rating = productDetails.rating;
    this.priceCents = productDetails.priceCents;
    this.keywords = productDetails.keywords;
  }

  getStarsUrl() {
    return `images/ratings/rating-${this.rating.stars * 10}.png`;
  }

  getPrice() {
    return `$${formatCurrency(this.priceCents)}`;
  }

  extraInfoHTML() {
    return '<div class="extra-info-placeholder"></div>';
  }
}

export class Clothing extends Product {
  sizeChartLink;

  constructor(productDetails) {
    super(productDetails);
    this.sizeChartLink = productDetails.sizeChartLink;
  }

  extraInfoHTML() {
    // super.extraInfoHTML();
    return `
    <div class="extra-info-placeholder">
      <a href="${this.sizeChartLink}" target="_blank">
        Size chart
      </a>
    </div>
  `;
  }
}

export class Appliance extends Product {
  instructionsLink;
  warrantyLink;

  constructor(productDetails) {
    super(productDetails);
    this.instructionsLink = productDetails.instructionsLink;
    this.warrantyLink = productDetails.warrantyLink;
  }

  extraInfoHTML() {
    return `
      <div class="product-extra-info">
        <a href="${this.instructionsLink}" target="_blank">
          Instructions
        </a>
      </div>
      <div class="product-extra-info">
        <a href="${this.warrantyLink}" target="_blank">
          Warranty
        </a>
      </div>
  `;
  }
}

/*
const date = new Date();
console.log(date);
console.log(date.toLocaleTimeString());
*/
/*
console.log(this);
const boject2 = {
  a: 2,
  b: this.a
};
*/
/*
function logThis() {
  console.log(this);
}
logThis();
logThis.call('hello');

this
const object3 = {
  method: () => {
    console.log(this);
  }
};
object3.method();
*/

export let products = [];

export function loadProductsFetch() {
  const promise = fetch("https://supersimplebackend.dev/products")
    .then((response) => {
      // console.log("第一步：response 对象 👉", response);
      return response.json();
    })
    .then((productsData) => {
      // console.log("第二步：productsData 真正数据 👉", productsData);

      products = productsData.map((productDetails) => {

        if (productDetails.name.toLowerCase().includes("toaster")) {
          convertToAppliance(productDetails, {
            instructionsLink: "images/appliance-instructions.png",
            warrantyLink: "images/appliance-warranty.png"
          });
        }

        // kettle
        if (productDetails.name.toLowerCase().includes("kettle")) {
          convertToAppliance(productDetails, {
            instructionsLink: "images/appliance-instructions.png",
            warrantyLink: "images/appliance-warranty.png"
          });
        }

        // blender
        if (productDetails.name.toLowerCase().includes("blender")) {
          convertToAppliance(productDetails, {
            instructionsLink: "images/appliance-instructions.png",
            warrantyLink: "images/appliance-warranty.png"
          });
        }


        if (productDetails.type === "clothing") {
          return new Clothing(productDetails);
        } else if (productDetails.type === "appliance") {
          return new Appliance(productDetails);
        }
        return new Product(productDetails);
      });

      // console.log("第三步：整理后的 products 👉", products);
      console.log("load products");
    })
    .catch((error) => {
      console.log("Unexpected error. Please try again later.");
    });

  return promise;
}
/*
loadProductsFetch().then(() => {
  console.log('next step');
});
*/

export function loadProducts(fun) {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener("load", () => {
    products = JSON.parse(xhr.response).map((productDetails) => {

      // toaster
      if (productDetails.name.toLowerCase().includes("toaster")) {
        convertToAppliance(productDetails, {
          instructionsLink: "images/appliance-instructions.png",
          warrantyLink: "images/appliance-warranty.png"
        });
      }

      // kettle
      if (productDetails.name.toLowerCase().includes("kettle")) {
        convertToAppliance(productDetails, {
          instructionsLink: "images/appliance-instructions.png",
          warrantyLink: "images/appliance-warranty.png"
        });
      }

      // blender
      if (productDetails.name.toLowerCase().includes("blender")) {
        convertToAppliance(productDetails, {
          instructionsLink: "images/appliance-instructions.png",
          warrantyLink: "images/appliance-warranty.png"
        });
      }

      if (productDetails.type === "clothing") {
        return new Clothing(productDetails);
      } else if (productDetails.type === "appliance") {
        return new Appliance(productDetails);
      }
      return new Product(productDetails);
    });
    console.log("load products");

    fun();
  });

  xhr.addEventListener("error", (error) => {
    console.log("Unexpected error. Please try again later.");
  });

  xhr.open("GET", "https://supersimplebackend.dev/products");
  xhr.send();
}

function convertToAppliance(productDetails, { instructionsLink, warrantyLink}) {
  productDetails.type = "appliance";
  productDetails.instructionsLink = instructionsLink;
  productDetails.warrantyLink = warrantyLink;
}