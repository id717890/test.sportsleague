<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <router-link class="navbar-brand" to="/">Каталог библиотек</router-link>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import types from '@/store/types'

export default {
  async mounted() {
    await this[types.GET_LIBRARIES]()
  },
  methods: {
    ...mapActions([types.GET_LIBRARIES, types.INCREASE_PAGE_ACTION]),
  },
}
</script>
