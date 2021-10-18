const GOODS = [
    {title:'Notebook', img:"img/1.jpg", price:2400},
    {title:'Mouse', img:'img/2.jpg', price:40},
    {title:'Keyboard', img:'img/3.jpg', price:230},
    {title:'Gamepad', img:'img/4.jpg', price:70},
];

const CORE_API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses',
      GET_GOODS_URL = '/catalogData.json',
      GET_BASKET_GOODS_URL='/getBasket.json';

const service = (method,postfix) =>(
    new Promise((resolve) => {
      const xhr = new XMLHttpRequest(); 
      xhr.open(method, `${CORE_API_URL}${postfix}`,true);
      xhr.send();
      xhr.onload = (event) => {
          resolve(JSON.parse(event.target.response));
        }
    })
 );

 Vue.component('basket-goods-item',{
    props:['item'],
    template:`
    <div class="basket-goods-item">  
     <div>{{item.title}}</div>
     <img src=item.img alt={{item.img}}>
     <div>{{item.price}}</div>
    </div>`,
})

Vue.component('basket-card',{
    template:`
    <div class="basket-card">  
    
    </div>`,
})


Vue.component('goods-item',{
    props:['item'],
    template:`
    <div class="goods-item">  
     <div>{{item.title}}</div>
     <div><img src="" alt=""></div>
     <div>{{item.price}}</div>
    
    </div>`,
})

const app = new Vue({
 el:'#app',
 data:{
     goods:GOODS,
     filteredGoods:GOODS,
     basketCardVision:false,
     search:'',
 },
  methods: {
      filterGoods: function(event){
        this.filteredGoods = this.goods.filter(({title})=>{return new RegExp(this.search, 'i').test(title)})
      }
  }
})










