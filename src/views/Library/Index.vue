<template>
  <div class="container pt-2 d-flex flex-grow-1">
    <div class="loading-element" v-if="loading">
      <h3>LOADING...</h3>
    </div>
    <div class="row" v-else>
      <div
        class="col-12"
        v-for="(item, index) in items"
        :key="item._id"
        @click="openDetails(item)"
      >
        <div class="lib-item py-3 mb-2">
          <span>{{ index + 1 }}</span>
          {{ item.data.general.name }}
        </div>
      </div>
      <Observer @intersect="intersected" />
      <!-- <div class="col-12 b2 col-sm-6 col-md-4 col-lg-3">123</div> -->
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Observer from '@/components/Observer'
import types from '@/store/types'
export default {
  name: 'Library',
  components: {
    Observer,
  },
  computed: {
    ...mapState({
      loading: (state) => state.loading,
      items: (state) => state.fetchedLibraries,
    }),
  },
  async mounted() {
    await this[types.GET_LIBRARIES]()
  },
  methods: {
    // ...mapMutations([types.SET_LOADING]),
    ...mapActions([types.GET_LIBRARIES, types.INCREASE_PAGE_ACTION]),
    async intersected() {
      const part = await this[types.INCREASE_PAGE_ACTION]()
      //
      // console.log('part', part)
    },
    openDetails(item) {
      console.log(item)
      this.$router.push({ name: 'LibraryItem', params: { id: item._id } })
    },
  },
}
</script>

<style scoped lang="scss">
// .app-wrapper {
//   display: flex;
//   flex-flow: column;
//   min-height: 100vh;
// }
.lib-item {
  border: 1px solid silver;
}

.loading-element {
  border: 1px solid blue;
  display: flex;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
}
</style>
