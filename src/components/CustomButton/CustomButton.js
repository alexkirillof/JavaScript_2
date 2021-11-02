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