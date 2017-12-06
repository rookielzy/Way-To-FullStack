<template>
  <div class="item">
    <img :src="`/${item.img}`" :alt="`Image of ${item.name}`" />
      <h4>{{ item.name }}</h4>
      <p>{{ item.price | usdollar }}</p>
      <button class="add" @click="addItem">Add Item</button>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object
    },
    index: {
      type: Number
    }
  },
  filters: {
    usdollar: value => {
      return `$${value}`
    }
  },
  methods: {
    addItem () {
      this.$store.commit('addItem', this.item)
    }
  }
}
</script>

<style scoped>
p {
  font-size: 18px;
}
</style>
