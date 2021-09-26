<template>
  <app-loader v-if="loading"/>
  <app-page title="Заявка" back v-else-if="request">
    <p><strong>Имя клиента</strong>: {{request.name}} </p>
    <p><strong>Phone</strong>: {{request.phone}} </p>
    <p><strong>Amount</strong>: {{currency(request.amount)}} </p>
    <p><strong>Status</strong>: <app-status :type="request.status"/></p>
    <div class="form-control">
      <label for="status">Статус</label>
      <select id="status" v-model="status">
        <option value="done">Завершен</option>
        <option value="canceled">Отменен</option>
        <option value="active">Активен</option>
        <option value="pending">Выполняется</option>
      </select>
    </div>

    <button class="btn danger" @click="remove">Remove</button>
    <button class="btn" @click="update" v-if="isChanged">Update</button>
  </app-page>
  <h3 v-else class="text-center text-white">
    Заявки с ID = {{id}} нет.
  </h3>
</template>

<script>
import {useRoute, useRouter} from 'vue-router'
import {ref, onMounted, computed} from 'vue'
import {useStore} from 'vuex'
import AppPage from '../components/ui/AppPage'
import AppLoader from '../components/ui/AppLoader'
import AppStatus from '../components/ui/AppStatus'
import {currency} from '../utils/currency'

export default {
  name: "Request",
  components: {
    AppPage,
    AppLoader,
    AppStatus
  },
  setup () {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const status = ref()
    const loading = ref(true)
    const request = ref({})
    const id = route.params.id;

    const remove = async () => {
      await store.dispatch('request/remove', id)
      router.push('/')
    }

    const update = async () => {
      const data = {...request.value, id, status: status.value}
      await store.dispatch('request/update', data)
      request.value.status = status.value
    }

    onMounted(async () => {
      request.value = await store.dispatch('request/loadById', id)
      status.value = request.value?.status
      loading.value = false
    })

    const isChanged = computed(() => request.value.status !== status.value)

    return {
      request,
      loading,
      id,
      currency,
      remove,
      update,
      status,
      isChanged
    }
  }
}
</script>

<style scoped>

</style>