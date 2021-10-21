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
    data: function () {
        return {
          style: {
            padding: '30px 15px',
            display: 'grid',
            gridTemplateColumns: 'min-content 1fr min-content'
          }
        }
      },
    template:`
    <div class="basket-goods-item" :style="style">  
     <div>{{item.title}}</div>
     <img src=item.img alt={{item.img}}>
     <div>{{item.price}}</div>
    </div>`
})



Vue.component('basket-card',{
    data: function () {
        return {
          styles: {
            root: {
              display: 'grid',
              gridTemplateRows: 'min-content 1fr min-content'
            },
            header: {
              padding: '20px',
              background: 'lightgray'
            },
            footer: {
                padding: '20px',
                background: 'grey'
              }
          },
        }
      },
    template:`
        <div class="basket-card" :style="styles.root" >
         <div :style="styles.header">
         <slot name="header"></slot>
         </div>
         <div>
         <slot></slot>
         </div>
         <div :style="styles.footer">
         <slot name="footer"></slot>
         </div>
    </div>
  `
});

Vue.component('custom-button', {
    data: 
    function () {
      return {
        style: {
          border: '1px solid grey',
          padding: '6px',
          borderRadius: '5px',
          cursor: 'pointer'
        }
      }
    },
    template: `
      <button :style="style" @click="$emit('open')">
      <slot></slot>
      </button>
    `
  })

  Vue.component('close-button', {
    data: 
    function () {
      return {
        style: {
            position: 'absolute',
            fontWeight: '700',
            fontSize: '15px',
            lineHeight: '15px',
            opacity: '0.6',
            cursor: 'pointer',
            top: '19px',
            right: '19px'
         
        }
      }
    },
    template: `    
      <span :style="style" @click="$emit('close')">✖</span>
    `
  })


  

Vue.component('goods-item',{
    props:['item'],
    template:`
    <div class="goods-item">  
     <div>{{item.title}}</div>
     <div><img src="" alt=""></div>
     <div>{{item.price}}</div>
    <custom-button>Add</custom-button>
    </div>`,
})

const app = new Vue({
 el:'#app',
 data:{
     goods:GOODS,
     filteredGoods:GOODS,
     basketCardVision:false,
     search:'',
     classes:['body','border'],
 },
     methods: {
      filterGoods: function(){
        this.filteredGoods = this.goods.filter(({title})=>{return new RegExp(this.search, 'i').test(title)})
      },
      openCart: function(){
          this.basketCardVision = true;
      },
      closeCart: function(){
        this.basketCardVision = false;
    }
     }
})










