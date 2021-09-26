<template>
  <the-nav-bar/>
  <the-sidebar />
  <div class="container with-nav">
    <app-message />
    <router-view />
  </div>
</template>

<script>
import TheNavBar from '../components/TheNavBar'
import TheSidebar from '../components/TheSidebar'
import AppMessage from '../components/ui/AppMessage'

export default {
  components: {AppMessage, TheNavBar, TheSidebar}

}
</script>

<style scoped>

</style>