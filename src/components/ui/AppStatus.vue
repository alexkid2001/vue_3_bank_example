<template>
  <span :class="['badge', className]">{{ text }}</span>
</template>

<script>
import {ref, watch} from "vue";

export default {
  props: {
    type: {
      type: String,
      required: true,
      validator(value) {
        return ['active', 'canceled', 'done', 'pending'].includes(value)
      }
    }
  },
  setup(props) {
    const classMap = {
      active: 'primary',
      canceled: 'danger',
      done: 'primary',
      pending: 'warning'
    }

    const textMap = {
      active: 'Активен',
      canceled: 'Отменен',
      done: 'Завершен',
      pending: 'Выполняется'
    }

    watch(props, val => {
      className.value = classMap[val.type]
      text.value = textMap[val.type]
    })

    const className = ref(classMap[props.type])
    const text = ref(textMap[props.type])
    return {
      className,
      text
    }
  }
}
</script>

<style scoped>

</style>