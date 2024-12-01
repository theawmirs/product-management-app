//Reload webstie by clicking on the Logo
const websiteTitle = document.querySelector(".header__title");
websiteTitle.addEventListener("click", () => {
  location.reload();
});

//Dark mode Section
const darkModeBtn = document.querySelector(".header__light-mode");

darkModeBtn.addEventListener("click", () => {
  //Dark mode for body
  const body = document.body;
  body.classList.toggle("dark-mode-body");

  //Dark mode for header icons
  const addProductBtn = document.querySelector(".header__add-btn");
  const darkModeChangeBtn = document.querySelector(".header__light-mode");

  addProductBtn.classList.toggle("dark-mode-header-icons");
  darkModeChangeBtn.classList.toggle("dark-mode-header-icons");

  //Dark mode for main product container
  const productCard = document.querySelectorAll(".main__product");
  productCard.forEach((product) => {
    product.classList.toggle("dark-mode-product");
  });

  //Dark mode for product content
  const productCardTitle = document.querySelectorAll(".main__product-name");
  const productCardPrice = document.querySelectorAll(".main__product-price");
  productCardTitle.forEach((title) => {
    title.classList.toggle("dark-mode-content");
  });
  productCardPrice.forEach((title) => {
    title.classList.toggle("dark-mode-content");
  });

  //Dark mode for create product section
  const createProduct = document.querySelector(".create-product");
  createProduct.classList.toggle("dark-mode-create-product");
  const createProductInput = document.querySelectorAll("input");
  createProductInput.forEach((input) => {
    input.classList.toggle("dark-mode-create-product-input");
  });

  //Dark mode for Edit product section
  const editProduct = document.querySelector(".edit-product");
  editProduct.classList.toggle("dark-mode-edit-product");
  const editProductInput = document.querySelectorAll("input");
  editProductInput.forEach((input) => {
    input.classList.toggle("dark-mode-edit-product-input");
  });

  //Dark mode for No Product text
  const noProductTitle = document.querySelector(".main__no-product");
  noProductTitle.classList.toggle("dark-mode-no-product-title");

  //Dark mode for product buttons
  const editBtn = document.querySelector(".main__product__edit");
  editBtn.classList.toggle("dark-mode-main__product-edit");
  const deleteBtn = document.querySelector(".main__product__delete");
  deleteBtn.classList.add("dark-mode-main__product-delete");
});

//Create Product section button toggle
const headerAddProductBtn = document.querySelector(".header__add-btn");

function toggleAddProduct() {
  const main = document.querySelector(".main");
  main.classList.toggle("hidden");

  const addProductSection = document.querySelector(".create-product");
  addProductSection.classList.toggle("hidden");
}
headerAddProductBtn.addEventListener("click", () => {
  toggleAddProduct();
});

//No product text - Create one Toggle create product section
const createOneNow = document.querySelector(".main__no-product__create");
createOneNow.addEventListener("click", () => {
  toggleAddProduct();
});

//No Product text section
function noProductTextUpdate() {
  const noProduct = document.querySelector(".main__no-product");
  const product = document.querySelectorAll(".main__product");

  if (product.length === 0) {
    noProduct.classList.remove("hidden");
    return;
  }
  noProduct.classList.add("hidden");
}

//Will check if there is any product avilable so toggle/untoggle the No product text
noProductTextUpdate();

//Add Product button function
const addProduct = document.querySelector(".create-product__btn");

//Function that will create error
function error(textContent, parent, insertBefore) {
  const existingError = document.querySelector(".error");

  if (existingError) {
    existingError.remove();
  }

  const error = document.createElement("h2");
  error.classList.add("error");
  error.textContent = textContent;
  parent.insertBefore(error, insertBefore);
}

//Function that will create success message
function success(textContent, parent, insertBefore) {
  const existingSuccess = document.querySelector(".success");

  if (existingSuccess) {
    existingSuccess.remove();
  }

  const success = document.createElement("h2");
  success.classList.add("success");
  success.textContent = textContent;
  parent.insertBefore(success, insertBefore);
}

//Function will remove any existing error or success message
function existingMessage() {
  const existingError = document.querySelector(".error");
  const existingSuccess = document.querySelector(".success");

  if (existingError) {
    existingError.remove();
  }

  if (existingSuccess) {
    existingSuccess.remove();
  }
}

//Function that will create a new product
function createProduct(productName, productImage, productPrice) {
  const main = document.querySelector(".main__product-gallary");

  //Main product Div
  const mainProductDiv = document.createElement("div");
  mainProductDiv.classList.add("main__product");
  main.appendChild(mainProductDiv);

  //Product image
  const mainProductImage = document.createElement("img");
  mainProductImage.classList.add("main__product-img");
  mainProductImage.src = productImage;
  mainProductDiv.appendChild(mainProductImage);

  //Main product content Div
  const mainProductContent = document.createElement("div");
  mainProductContent.classList.add("main__product-content");
  mainProductDiv.appendChild(mainProductContent);

  //Product name
  const mainProductName = document.createElement("h3");
  mainProductName.classList.add("main__product-name");
  mainProductName.textContent = productName;
  mainProductContent.appendChild(mainProductName);

  //Product price
  const mainProductPrice = document.createElement("h4");
  mainProductPrice.classList.add("main__product-price");
  mainProductPrice.textContent = productPrice;
  mainProductContent.appendChild(mainProductPrice);

  //Product buttons container
  const productBtnContainer = document.createElement("div");
  productBtnContainer.classList.add("main__product__btn-container");
  mainProductContent.appendChild(productBtnContainer);

  //Product delete button
  const productDeleteBtn = document.createElement("i");
  productDeleteBtn.classList.add(
    "bx",
    "bxs-trash-alt",
    "main__product__delete"
  );
  productBtnContainer.appendChild(productDeleteBtn);

  const productEditBtn = document.createElement("i");
  productEditBtn.classList.add("bx", "bxs-edit", "main__product__edit");
  productBtnContainer.appendChild(productEditBtn);
}

//Function that will create a new button
function createButton(className, textContent, parent) {
  const button = document.createElement("button");
  button.classList.add(className);
  button.textContent = textContent;
  parent.appendChild(button);
}

//Add product to the main page
addProduct.addEventListener("click", () => {
  const nameInput = document.querySelector(".create-product__name");
  const imageInput = document.querySelector(".create-product__img");
  const priceInput = document.querySelector(".create-product__price");

  //Get data from Local Storage
  const productData = JSON.parse(localStorage.getItem("product-store")) || [];

  //Check for existing product name
  const existingProduct = productData.some(
    (product) => product.name === nameInput.value
  );

  const parent = document.querySelector(".create-product");
  const insertBefore = document.querySelector(".create-product__btn");

  //Check if inputs are empty or not
  if (
    nameInput.value.length === 0 ||
    imageInput.value.length === 0 ||
    priceInput.value.length === 0
  ) {
    error("Inputs cannot be empty!", parent, insertBefore);
    return;
  }

  //Check if product does exist
  if (existingProduct) {
    error("Product already does exist!", parent, insertBefore);
    return;
  }

  const name = nameInput.value;
  const image = imageInput.value;
  const price = priceInput.value;

  //Product add to the main page
  const newProduct = { name, image, price };

  //Push the product data to the local storage
  productData.push(newProduct);
  localStorage.setItem("product-store", JSON.stringify(productData));

  //Successful message

  success("Product has been added!", parent, insertBefore);

  //Closing Button
  addProduct.classList.add("hidden");
  createProduct(name, image, price);

  createButton("closeAddSection", "Close", parent);
  const closeBtn = document.querySelector(".closeAddSection");

  closeBtn.addEventListener("click", () => {
    existingMessage();
    addProduct.classList.remove("hidden");
    closeBtn.remove();
    location.reload();
  });
});

//Delete and Edit the product from main page and LocalStorage
const productGallery = document.querySelector(".main__product-gallary");

//Delete
productGallery.addEventListener("click", (e) => {
  if (e.target.classList.contains("main__product__delete")) {
    const productToRemove = e.target.closest(".main__product");
    if (productToRemove) {
      productToRemove.remove();

      const mainTitle = document.querySelector(".main__title");
      const parent = document.querySelector(".main");
      success("Product has been removed!", parent, mainTitle);

      setTimeout(() => {
        if (success().parentNode) {
          success().remove();
        }
      }, 2000); // 3000 ms = 3 seconds

      // Update localStorage
      const productName = productToRemove.querySelector(
        ".main__product-name"
      ).textContent;
      const productData =
        JSON.parse(localStorage.getItem("product-store")) || [];
      const updatedProductData = productData.filter(
        (product) => product.name !== productName
      );
      localStorage.setItem("product-store", JSON.stringify(updatedProductData));

      // Update no-product text
      noProductTextUpdate();
    }
  }
});

//Edit
productGallery.addEventListener("click", (e) => {
  if (e.target.classList.contains("main__product__edit")) {
    const productToEdit = e.target.closest(".main__product");
    if (productToEdit) {
      //Save the product data
      const main = document.querySelector(".main");
      main.classList.add("hidden");

      const productDetails = {
        name: productToEdit.querySelector(".main__product-name").textContent,
        image: productToEdit.querySelector(".main__product-img").src,
        price: productToEdit.querySelector(".main__product-price").textContent,
      };

      //Open the Edit section
      const editSection = document.querySelector(".edit-product");
      editSection.classList.toggle("hidden");

      //Get the Edit section inputs
      const productNameInput = document.querySelector(".edit-product__name");
      const productImageInput = document.querySelector(".edit-product__img");
      const productPriceInput = document.querySelector(".edit-product__price");

      //Fill the inputs with the existing data
      productNameInput.value = productDetails.name;
      productImageInput.value = productDetails.image;
      productPriceInput.value = productDetails.price;

      //Change the product data with the new Data
      const saveBtn = document.querySelector(".edit-product__btn");

      saveBtn.addEventListener("click", () => {
        const name = productNameInput.value;
        const image = productImageInput.value;
        const price = productPriceInput.value;

        //Check if the inputs are empty or not
        if (name.length === 0 || image.length === 0 || price.length === 0) {
          const parent = document.querySelector(".edit-product");
          const insertBefore = document.querySelector(".edit-product__btn");
          error("Inputs cannot be empty!", parent, insertBefore);
          return;
        }
        const parent = document.querySelector(".edit-product");
        const insertBefore = document.querySelector(".edit-product__btn");
        success("Product data has been updated!", parent, insertBefore);

        //Create close Button
        saveBtn.classList.add("hidden");
        createButton("closeEditSection", "Close", editSection);

        const closeBtn = document.querySelector(".closeEditSection");
        closeBtn.addEventListener("click", () => {
          //Remove any existing error or success message
          existingMessage();
          saveBtn.classList.remove("hidden");
          closeBtn.remove();

          //Update the data of LocalStorage
          const productData =
            JSON.parse(localStorage.getItem("product-store")) || [];

          const updatedProductData = productData.map((product) => {
            if (
              product.name === productDetails.name &&
              product.image === productDetails.image
            ) {
              // Update only the matched product
              return {
                ...product, // Spread operator to keep existing properties
                name: name, // New values
                image: image,
                price: price,
              };
            }
            return product; // Return other products as-is
          });

          localStorage.setItem(
            "product-store",
            JSON.stringify(updatedProductData)
          );
          location.reload();
        });
      });
    }
  }
});

//Load saved products when the website load
function load() {
  const productData = JSON.parse(localStorage.getItem("product-store")) || [];

  const products = productData.forEach((product) => {
    createProduct(product.name, product.image, product.price);
  });

  console.log(products);
  // createProduct(products.name, products.image, products.price);

  noProductTextUpdate();
}

//Will load the saved data from storage
load();
