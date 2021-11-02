
import {GET_GOODS_URL, ADD_GOOD_URL, GET_BASKET_GOODS_URL} from './constanse';
import {service} from './services';
import * as components from './components';


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










