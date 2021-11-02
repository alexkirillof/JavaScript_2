import {} from '../CustomButton'
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