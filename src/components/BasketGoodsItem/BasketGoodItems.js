import {} from '../CloseButton'
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