// Storage Controller
const StorageController = (function () {

    // private

    // public
    return {
        storeProduct: function (product) {
            let products;

            if (localStorage.getItem('products') === null){
                products = [];
                products.push(product);
            }else{
                products = JSON.parse(localStorage.getItem('products'));
                products.push(product);
            }
            localStorage.setItem('products',JSON.stringify(products));
        },
        getProducts: function () {
            let products;
            if (localStorage.getItem('products') === null){
                products = [];
            }else{
                products = JSON.parse(localStorage.getItem('products'));
            }
            return products;
        },
        updateProduct: function (product) {
            let products = JSON.parse(localStorage.getItem('products'));;

            products.forEach(function (prd,index) {
                if (prd.id == product.id){
                    products.splice(index, 1, product) // aynı id 'li elemanı sil yerine parametre ile verilen product'i ekle
                }
            })

            localStorage.setItem('products',JSON.stringify(products));
        },
        deleteProduct: function (id) {
            let products = JSON.parse(localStorage.getItem('products'));;

            products.forEach(function (prd,index) {
                if (prd.id == id){
                    products.splice(index, 1) // aynı id 'li elemanı sil yerine parametre ile verilen product'i ekle
                }
            })

            localStorage.setItem('products',JSON.stringify(products));
        }
    }

})();



// Product Controller
const ProductController = (function () {

    // private
    const Product = function(id,name,price){
        this.id = id;
        this.name = name;
        this.price = price;
    }

    // uygulama içerisinde data bilgilerimizi taşıyacak
    const data = { // db, harici bir json sayfasından , yada api uzerinden gelebilir
        products : StorageController.getProducts(),
        selectedProduct:null,
        totalPrice :0
    }

    // public
    return {
        getProducts: function () {
            return data.products;
        },
        getData: function () {
            return data;
        },
        getProductById:function (id) {
            let product = null;
            data.products.forEach(prd => {
                if(prd.id == id){
                    product = prd;
                }
            })
            return product;
        },
        setCurrentProduct: function (product) {
            data.selectedProduct = product;
        },
        getCurrentProduct: function () {
            return data.selectedProduct;
        },
        addProduct: function (name, price) {
            let id;

            if (data.products.length > 0){
                id = data.products[data.products.length - 1].id + 1;
            }else {
                id = 0;
            }

            const newProduct = new Product(id, name, parseFloat(price));
            data.products.push(newProduct);
            return newProduct;
        },
        updateProduct: function (productName,productPrice) {
            let product = null;

            data.products.forEach(function (prd) {
                if (prd.id == data.selectedProduct.id){
                    prd.name = productName;
                    prd.price = parseFloat(productPrice);
                    product = prd;
                }
            })

            return product;
        },
        deleteProduct: function (product) {
            // TODO: parametre olarak kendisi verebiliyorduk ama burda ayrıyeten index'inide verebiliyormusuz!
            data.products.forEach((prd,index) => {
               if (prd.id == product.id){
                   data.products.splice(index,1);
               }
            });
            // bunun yerine indexof(product) ile index'ini bulup splice işlemi yapabiliriz!
        },
        getTotal: function () {
            let total = 0;
            data.products.forEach(item => {
                total += item.price;
            });
            data.totalPrice = total;
            return data.totalPrice;
        }
    }


})();


// UI Controller
const UIController = (function () {

    // private
    const Selectors = {
        productList: '#item-list',
        productListItems: '#item-list tr',
        addButton: '.addBtn',
        updateButton: '.updateBtn',
        deleteButton: '.deleteBtn',
        cancelButton: '.cancelBtn',
        productName: '#productName',
        productPrice: '#productPrice',
        productCard: '#productCard',
        totalTL: '#total-tl',
        totalDolar: '#total-dolar',
    }

    // public
    return {
        createProductList: function (products) {
            let  html ="";
            products.forEach(product => {
                html += `
                    <tr>
                        <td>${product.id}</td>
                        <td>${product.name}</td>
                        <td>${product.price} $</td>
                        <td class="text-end">                      
                            <i class="far fa-edit edit-product"></i>                            
                        </td>
                 </tr>`;
            })
            document.querySelector(Selectors.productList).innerHTML = html;
        },
        getSelectors: function () {
            return Selectors;
        },
        addProduct: function (product) {
            document.querySelector(Selectors.productCard).style.display = 'block';
            let html = `
                <tr>
                    <td>${product.id}</td>
                    <td>${product.name}</td>
                    <td>${product.price} $</td>
                    <td class="text-end">
                        <i class="far fa-edit edit-product"></i> <!-- iconu seçmek için edit-product class'i ekleyelim-->
                     </td>
             </tr>`;
            document.querySelector(Selectors.productList).insertAdjacentHTML("beforeend",html);
        },
        updateProduct: function (product) {
            let updatedItem = null;

            let items = document.querySelectorAll(Selectors.productListItems);
            items.forEach(item => {
               if(item.classList.contains('bg-warning')){
                   item.children[1].textContent = product.name;
                   item.children[2].textContent = product.price + ' $';
                   updatedItem = item;
               }
            });

            return updatedItem;
        },
        deleteProduct: function () {
            let items = document.querySelectorAll(Selectors.productListItems);
            items.forEach(function (item) {
                if (item.classList.contains('bg-warning')){
                    item.remove(); // The Element.remove() method removes the element from the tree it belongs to.
                }
            })

        },
        clearInputs: function () {
            document.querySelector(Selectors.productName).value ="";
            document.querySelector(Selectors.productPrice).value ="";
        },
        clearWarnings: function () {
            document.querySelectorAll(Selectors.productListItems).forEach(function (item) {
                        if (item.classList.contains('bg-warning')){
                            item.classList.remove('bg-warning');
                        }
                }
            )
        },
        hideCard: function () {
            document.querySelector(Selectors.productCard).style.display = 'none';
        },
        showTotal: function (total) {
            document.querySelector(Selectors.totalDolar).textContent = total;
            document.querySelector(Selectors.totalTL).textContent = (total*18.15).toFixed(2); // convert TL
        },
        addProductToForm: function () {
            const selectedProduct = ProductController.getCurrentProduct();
            document.querySelector(Selectors.productName).value = selectedProduct.name;
            document.querySelector(Selectors.productPrice).value = selectedProduct.price;
        },
        addingState: function () {
            UIController.clearWarnings();
            UIController.clearInputs();
            document.querySelector(Selectors.addButton).style.display = "inline";
            document.querySelector(Selectors.updateButton).style.display = "none";
            document.querySelector(Selectors.deleteButton).style.display = "none";
            document.querySelector(Selectors.cancelButton).style.display = "none";
        },
        editState: function (tr) {
            const parent = tr.parentNode;
            tr.classList.add("bg-warning");
            document.querySelector(Selectors.addButton).style.display = "none";
            document.querySelector(Selectors.updateButton).style.display = "inline";
            document.querySelector(Selectors.deleteButton).style.display = "inline";
            document.querySelector(Selectors.cancelButton).style.display = "inline";
        }
    }

})();


// App
const App = (function (ProductCtrl,UICtrl, StorageCtrl) {

    const UISelectors = UICtrl.getSelectors();

    // Load Event Listeners
    const loadEventListeners = function () {
        // add product event
        document.querySelector(UISelectors.addButton).addEventListener("click", productAddSubmit);

        // edit product click
        document.querySelector(UISelectors.productList).addEventListener("click", productEditClick);

        // edit product submit
        document.querySelector(UISelectors.updateButton).addEventListener("click", productEditSubmit);

        // cancel button click
        document.querySelector(UISelectors.cancelButton).addEventListener("click", cancelUpdate);

        // delete product
        document.querySelector(UISelectors.deleteButton).addEventListener("click",deleteProduct);
    }

    const productAddSubmit = function (e) {
        const  productName = document.querySelector(UISelectors.productName).value;
        const  productPrice = document.querySelector(UISelectors.productPrice).value;

        if (productName !== "" && productPrice !== ""){
            // add product
            const newProduct = ProductCtrl.addProduct(productName, productPrice);
            // add item to list
            UICtrl.addProduct(newProduct);

            // add product to LS
            StorageCtrl.storeProduct(newProduct);

            // get total
            const total = ProductCtrl.getTotal();
            // show total on UI
            UICtrl.showTotal(total);

            // clear inputs
            UICtrl.clearInputs();
        }else {
            // error :
        }

        e.preventDefault();
    }

    const productEditClick = function (e) {
       if(e.target.classList.contains("edit-product")){
           const id = parseInt(e.target.parentNode.parentNode.children[0].textContent);
           // get selected product
           const product = ProductCtrl.getProductById(id);

           // set current product:
           ProductCtrl.setCurrentProduct(product);

           UICtrl.clearWarnings();

           // add product to UI
           UICtrl.addProductToForm();

           UICtrl.editState(e.target.parentNode.parentNode);
       }
    }

    const productEditSubmit = function (e) {
        const  productName = document.querySelector(UISelectors.productName).value;
        const  productPrice = document.querySelector(UISelectors.productPrice).value;

        if (productName !== "" && productPrice !== ""){
            // update product
            const updatedProduct = ProductCtrl.updateProduct(productName,productPrice);
            // update ui
            UICtrl.updateProduct(updatedProduct);

            // Update Total Value ::
            // get total
            const total = ProductCtrl.getTotal();
            // show total on UI
            UICtrl.showTotal(total);

            // update LS
            StorageCtrl.updateProduct(updatedProduct);

            // adding state and delete bg-warning class
            UICtrl.addingState();
        }


        e.preventDefault();
    }

    const deleteProduct = function (e) {
        // get selected product
        let selectedProduct = ProductCtrl.getCurrentProduct();
        // delete product
        ProductCtrl.deleteProduct(selectedProduct);
        // delete UI
        UICtrl.deleteProduct(selectedProduct);

        // Update Total Value ::
        // get total
        const total = ProductCtrl.getTotal();
        // show total on UI
        UICtrl.showTotal(total);

        // delete from LS
        StorageCtrl.deleteProduct(selectedProduct.id);

        // adding state and delete bg-warning class
        UICtrl.addingState();

        if (ProductCtrl.getProducts().length == 0){
            UICtrl.hideCard();
        }

        e.preventDefault();
    }

    const cancelUpdate = function (e) {

        UICtrl.addingState();
        UICtrl.clearWarnings();

        e.preventDefault()
    }
    

    return {
        init: function () {
            console.log("starting app....");

            UICtrl.addingState();
            const products = ProductCtrl.getProducts();

            if (products.length == 0){
                UICtrl.hideCard();
            }else {
                UICtrl.createProductList(products);
                let total = ProductCtrl.getTotal();
                UICtrl.showTotal(total);
            }

            // load event listeners
            loadEventListeners();
        }
    }



})(ProductController, UIController, StorageController);


App.init();