class ProductsItem {
    constructor(title, img , price) {
        this.title = title;
        this.price = price;
        this.img = img;
    }
    render() {
        return `<div class="product-item">
                        <h3>${this.title}</h3>
                       <img src="${this.img}" alt="${this.title}">
                        <p>${this.price}</p>
                        <button class='buy-btn'>Купить</button>
              </div>`
    }
    }
class ProductsList {
    constructor() {
        this.products = []
    }
    fetchProducts() {
        this.products = [{
                title: 'Notebook',
                img: "img/1.jpg",
                price: 2400    
            },
            {
                title: 'Mouse',
                img: 'img/2.jpg',
                price: 40
            },
            {
                title: 'Keyboard',
                img: 'img/3.jpg',
                price: 230   
            },
            {
                title: 'Gamepad',
                img: 'img/4.jpg',
                price: 70  
            },
        ]
    }
    render() {
        let listHtml = '';
        this.products.forEach((product) => {
            const productItem = new ProductsItem(product.title, product.img, product.price);
            listHtml += productItem.render();
        })
        document.querySelector('.products').innerHTML = listHtml;
    }
    calcAllProducts() {
        let totalPrice = 0;
        this.products.forEach(product => {
            if(product.price !== undefined) {
                totalPrice += product.price;
            }
        })

        let totalProductsAnswer = `<span>Сумма товаров:${totalPrice}</span>`;
        document.querySelector('.products-summ').innerHTML = totalProductsAnswer;
    }
}


class BasketItem {
    constructor(title, price, img, link) {
        this.title = title;
        this.price = price;
        this.img = img;
        this.link = link; // ссылка на страницу товара
    }
    render() {

    }
}
// Класс корзины
class Basket {
    constructor() {
        
        this.addProducts = []; //Добавить в корзину
        this.deletedProducts = []; //Удалить из корзины
    }
    
    addToBasket() {} // Добавление товара в корзину 

    deleteFromBasket() {} // Удаление товара из корзины 

    calcBasket() {} //Суммирование содержимого корзины

   render() {}  //Отображение содержимого корзины

   openBasket() {}  // Открывание корзины
}

const list = new ProductsList();
list.fetchProducts();

window.onload = () => {
    list.render();
    list.calcAllProducts();
};




// const Items = [
//     {id:1,name:'Notebook', img:"img/1.jpg", price:2400},
//     {id:2,name:'Mouse', img:"img/2.jpg", price:40},
//     {id:3,name:'Keyboard', img:"img/3.jpg", price:230},
//     {id:4,name:'Gamepad', img:"img/4.jpg", price:70}
//     ];
    
//     const part = item => {
//        return `
//             <div class="product-item">
//             <h3>${item.name}</h3>
//             <img src="${item.img}">
//             <p>${item.price}</p>
//             <button class="buy-btn">Купить</button>
//         </div> 
//         `
//     };
    
//     const render = list => {
//         const productList = list.map(item=>part(item)).join('');
//         document.querySelector('.products').innerHTML = productList;
//     }
    
//     render(Items);