<template>
  <div>
    <button type="button" @click="showModal">Show Modal</button>
    <modal v-show="isVisible" @close="closeModal">
      <h1 slot="header">I am the new header</h1>
    </modal>
  </div>
</template>

<script>
import modal from '../../components/modal/modal'

export default {
  data () {
    return {
      isVisible: false
    }
  },
  components: {
    modal
  },
  methods: {
    showModal () {
      this.isVisible = true
    },
    closeModal () {
      this.isVisible = false
    }
  }
}
</script>
