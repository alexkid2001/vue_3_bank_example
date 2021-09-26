<template>
  <app-loader v-if="loading"/>
  <app-page v-else title="Список заказов">
    <template #header>
      <button class="btn primary" @click="modal = true">Создать</button>
    </template>
    <request-filter v-model="filter"/>
    <request-table :requests="requests"/>
    <teleport to="body">
      <app-modal v-if="modal" title="Создать заявку" @close="modal = false">
        <template #default>
          <request-modal @created="modal = false" />
        </template>
      </app-modal>
    </teleport>
  </app-page>
</template>

<script>
import {ref, computed, onMounted} from 'vue';
import {useStore} from 'vuex'
import AppPage from '../components/ui/AppPage'
import RequestTable from '../components/request/RequestTable'
import AppModal from '../components/ui/AppModal'
import RequestModal from '../components/request/RequestModal'
import AppLoader from '../components/ui/AppLoader'
import RequestFilter from '../components/request/RequestFilter'

export default {
  name: "Home",
  components: { AppPage, RequestTable, AppModal, RequestModal, AppLoader, RequestFilter },
  setup() {
    const modal = ref(false)
    const store = useStore()
    const loading = ref(false)

    onMounted(async () => {
      loading.value = true
      await store.dispatch('request/load')
      loading.value = false
    })
    const requests = computed(() => store.getters['request/requests']
        .filter(request => {
          if(filter.value.name) {
            return request.name.includes(filter.value.name)
          }

          return request
        })
        .filter(request => {
          if(filter.value.status) {
            return filter.value.status === request.status
          }

          return request
        })
    )
    const filter = ref({})

    return {
      modal,
      close: () => modal.value = false,
      requests,
      loading,
      filter,
    }
  }
}
</script>

<style scoped>

</style>