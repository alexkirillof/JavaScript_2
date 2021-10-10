const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
//Основные фукнкции корзины:
 function addBasket(id) {
    cart.addToBasket(id);
 };

 function deleteItem(id) {
    cart.deleteFromBasket(id);
 }

 function viewCart() {
    cart.render();
 };
    

// Функция, которая при нажатии кнопки делает запрос по ссылке, указанной в аргументе

 function loadBut() {
    const target = event.target;
    const src = target.getAttribute('data-load');
    list.fetchGoods(src);
 }
    // Функция запроса / ответа на промисах

 function makeGETRequest(url, callback) {
    return new Promise((resolve, reject) => {
        // console.log('Работает промис');
        let xhr = window.XMLHttpRequest ? new window.XMLHttpRequest() : new window.ActiveXObject;
        xhr.open("GET", url, true);
        xhr.onload = () => resolve(callback(xhr.responseText));
        xhr.onerror = () => reject(xhr.statusText);
        xhr.send();
      });
 }

 class GoodItem {
    constructor(id_product, product_name, price, img) {
        this.id_product = id_product;
        this.product_name = product_name;
        this.price = price;
        this.img = img;
    }
    render() {
        return `<div class="product-item">
                        <h3>${this.product_name}</h3>
                       <img src="${this.img}" alt="${this.product_name}">
                        <p>${this.price}</p>
                        <button class='buy-btn onclick='addBasket(${this.id_product})'>Купить</button>
              </div>`
    }
 }

  class GoodsList {

    constructor() {
        this.goods = [];
    }

     fetchGoods(url) {
        makeGETRequest(url, (good) => {
            this.goods = JSON.parse(good);
            this.render();
            this.calcAllGoods();
        })
    }
    render() {
        let listHtml = '';
        this.goods.forEach((good) => {
            const goodItem = new GoodItem(good.id_product, good.product_name, good.price, good.img);
            listHtml += goodItem.render();
        })
        document.querySelector('.products').innerHTML = listHtml;
    }
    calcAllGoods() {
        let totalPrice = 0;
        this.goods.forEach((good) => {
            if (good.price !== undefined) {
                totalPrice += good.price;
            }
        });
        let totalGoodsAnswer = "Все товары на сумму $" + totalPrice;
        document.querySelector('.products-summ').innerHTML = totalGoodsAnswer;
    }
  }
  
  class BasketItem {
    constructor(id, title, price, img) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.img = img;
    }
    render() {
        return `<div class="basket-item">
        <img src="${this.img}" alt="${this.title}">
        <div class="basket-info">
        <h3>${this.title}</h3>
        <p>${this.price}</p>
        </div><button class='deleteItem' onclick='deleteItem(${this.id})'>&times;</button></div>`;
    }
  }

  class Basket {
    constructor() {
        this.cartGoods = [];
    }
    addToBasket(id) {
        let toBasket;
        list.goods.forEach(function(item) {
            if(id == item.id) {
                toBasket = {
                    id: item.id,
                    title: item.title,
                    price: item.price,
                    img: item.img
                }
            }
        });
        this.cartGoods.push(toBasket);
        this.basketCount();
    }
    deleteFromBasket(id) {
        let getIdElemen;
        this.cartGoods.forEach(function(item, i) {
            let thisId = item.id;
            if(id == thisId) {
                getIdElemen = i;
            }
            
        });
        this.cartGoods.splice(getIdElemen, 1);
        this.render();
        this.basketCount();
    }
    calcAllGoods() {
        let totalPrice = 0;
        this.cartGoods.forEach((good) => {
            if (good.price !== undefined) {
                totalPrice += good.price;
            }
        });
        let totalGoodsAnswer = "Общая сумма товаров в корзине: $" + totalPrice;
        document.querySelector('.products-summ').innerHTML = totalGoodsAnswer;
    }
  
    render() {
        let readHtml = '';
        this.cartGoods.forEach((good) => {
            const goodItem = new BasketItem(good.id, good.title, good.price, good.img);
            readHtml += goodItem.render();
        })
        document.querySelector('.products').innerHTML = readHtml;
        this.calcAllGoods();
    }
  }

const list = new GoodsList();
const cart = new Basket();
list.fetchGoods(`${API_URL}/catalogData.json`);
