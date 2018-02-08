<template>
  <button
    class="jet__btn"
    @click="handleClick"
    :style="{backgroundColor: bgColor, color: color, 'border-color': borderColor}"
    :class="[
      'jet__btn--'+type,
      {
        'is-plain': plain,
        'is-round': round,
        'is-long': long,
        'jet__btn--block': block,
        'no-radius': noRadius
      },
      iconClass
    ]"
    :disabled="disabled">
    <i :class="icon" v-if="icon"></i>
    <i class="jet__icon--loading" v-if="loading && !icon"></i>
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'JETButton',
  props: {
    type: {
      type: String,
      default: 'default'
    },
    long: Boolean,
    loading: {
      type: Boolean,
      default: false
    },
    noRadius: {
      type: Boolean,
      default: false
    },
    bgColor: {
      type: String,
      default: ''
    },
    borderColor: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: ''
    },
    block: Boolean,
    disabled: Boolean,
    plain: Boolean,
    round: Boolean
  },
  methods: {
    handleClick () {
      this.$emit('test')
    }
  },
  computed: {
    iconClass () {
      return ''
    }
  }
}
</script>
