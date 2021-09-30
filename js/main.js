const Items = [
{id:1,name:'Notebook', img:"img/1.jpg", price:2400},
{id:2,name:'Mouse', img:"img/2.jpg", price:20},
{id:3,name:'Keyboard', img:"img/3.jpg", price:230},
{id:4,name:'Gamepad', img:"img/4.jpg", price:70}
];

const part = item => {
   return `
        <div class="product-item">
        <h3>${item.name}</h3>
        <img src="${item.img}">
        <p>${item.price}</p>
        <button class="buy-btn">Купить</button>
    </div> 
    `
};

const render = list => {
    const productList = list.map(item=>part(item)).join('');
    document.querySelector('.products').innerHTML = productList;
}

render(Items);


