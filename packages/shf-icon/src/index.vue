<template>
  <div v-if="isExternal" :style="styleExternalIcon" class="shf-external-icon shf-icon" v-on="$listeners" />
  <svg v-else :class="svgClass" aria-hidden="true" v-on="$listeners">
    <use :href="iconName" />
  </svg>
</template>

<script>
export default {
  name: 'ShfIcon',
  props: {
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ''
    }
  },
  computed: {
    isExternal () {
      return this.isExternalFunc(this.iconClass)
    },
    iconName () {
      return `#icon-${this.iconClass}`
    },
    svgClass () {
      if (this.className) {
        return 'shf-icon ' + this.className
      } else {
        return 'shf-icon'
      }
    },
    styleExternalIcon () {
      return {
        mask: `url(${this.iconClass}) no-repeat 50% 50%`,
        '-webkit-mask': `url(${this.iconClass}) no-repeat 50% 50%`
      }
    }
  },
  methods: {
    isExternalFunc (path) {
      return /^(https?:|mailto:|tel:)/.test(path)
    }
  }
}
</script>

<style scoped>
.shf-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.shf-external-icon {
  background-color: currentColor;
  mask-size: cover!important;
  display: inline-block;
}
</style>
