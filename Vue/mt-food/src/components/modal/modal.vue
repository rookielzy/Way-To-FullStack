<template>
  <transition name="modal-fade">
  <div class="modal">
    <div class="test" @click="close"></div>
    <div class="modal-dialog">
      <div class="modal-header">
        <slot name="header">I am the header</slot>
        <button type="button" class="close-btn" @click="close"><span>&times;</span></button>
      </div>
      <div class="modal-body">
        <slot name="body">I am the body</slot>
      </div>
      <div class="modal-footer">
        <slot name="footer">I am the footer</slot>
      </div>
    </div>
  </div>
  </transition>
</template>
<script>
export default {
  name: 'modal',
  methods: {
    close () {
      this.$emit('close')
    }
  }
}
</script>

<style>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.test {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 99;
}

.modal-dialog {
  position: absolute;
  background-color: #fff;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-flow: column;
  border-radius: 5px;
  min-width: 200px;
  padding: 5px 10px;
  z-index: 999;
}

.modal-dialog > div {
  width: 100%;
}

.modal-header {
  position: relative;
  min-height: 20px;
}

.close-btn {
  position: absolute;
  top: 0px;
  right: 0px;
  border: none;
  outline: none;
  cursor: pointer;
}

.modal-body {
  min-height: 100px;
}

.modal-footer {
  min-height: 20px;
}

.modal-fade-enter-active, .modal-fade-leave-active {
  transition: opacity .5s;
}
.modal-fade-enter, .modal-fade-leave-to {
  opacity: 0;
}
</style>
