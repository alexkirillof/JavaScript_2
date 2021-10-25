
const GET_GOODS_URL = 'http://localhost:8000/goods.json',
      ADD_GOOD_URL = "http://localhost:8000/api",
      GET_BASKET_GOODS_URL = "http://localhost:8000/basket-goods.json ";



const service = (method,path,body) =>(
    new Promise((resolve) => {
      const xhr = new XMLHttpRequest(); 
      xhr.open(method, path,true);
      if(body){
        xhr.setRequestHeader("Content-type", "application/json");
      }
      xhr.send(body);
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
     <custom-button  @click="$emit('del')">Удалить</custom-button>
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
     <img :src="item.img" alt="">
     <div>{{item.price}}</div>
     <custom-button @click="$emit('click', item)">Добавить</custom-button>
    </div>`,
})

const app = new Vue({
 el:'#app',
 data:{
     goods:[],
     filteredGoods:[],
     basketGoods: [],
     basketCardVision:false,
     search:'',
     classes:['body','border'],
 },
 mounted: function () {
  service('GET', GET_GOODS_URL).then((goods) => {
    this.goods = goods;
    this.filteredGoods = goods;
  })
  service('GET', GET_BASKET_GOODS_URL).then((basketGoods) => {
    this.basketGoods = basketGoods;
  })
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
    },
      addGood: function ({ title, price,img, id }) {
      service('PATCH', ADD_GOOD_URL, JSON.stringify({
        id,
        title,
        img,
        price
      })).then((_basketGoods) => {
        this.basketGoods = _basketGoods;
      })
    },
      delGood: function ({ title, price,img, id }) {
        service('PATCH', ADD_GOOD_URL, JSON.stringify({
          id,
          title,
          img,
          price
        })).then((_basketGoods) => {
          this.basketGoods = _basketGoods;
        })
      }
   

     }
})










