<template>
  <div class="container pt-4 d-flex flex-grow-1">
    <LoadingElement v-if="loading" />
    <div class="row" v-else>
      <LibraryBlock v-for="item in items" :item="item" :key="item._id" />
      <Observer @intersect="intersected" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Observer from '@/components/Observer'
import LibraryBlock from '@/components/LibraryBlock'
import types from '@/store/types'
import LoadingElement from '@/components/Loading'
export default {
  name: 'Library',
  components: {
    Observer,
    LibraryBlock,
    LoadingElement,
  },
  computed: {
    ...mapState({
      loading: (state) => state.loading,
      items: (state) => state.fetchedLibraries,
    }),
  },
  methods: {
    ...mapActions([types.INCREASE_PAGE_ACTION]),
    async intersected() {
      const part = await this[types.INCREASE_PAGE_ACTION]()
    },
    openDetails(item) {
      console.log(item)
      this.$router.push({ name: 'LibraryItem', params: { id: item._id } })
    },
  },
}
</script>
