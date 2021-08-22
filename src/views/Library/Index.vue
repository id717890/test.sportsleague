<template>
  <div class="container pt-4 d-flex flex-column flex-grow-1">
    <LoadingElement v-if="loading" />
    <template v-else>
      <div class="row mb-4">
        <div class="col-12 col-sm-12 col-md-6">
          <input
            v-model="search"
            class="form-control mb-2"
            placeholder="Поиск по название и адресу"
          />
        </div>
        <div class="col-12 col-sm-12 col-md-6">
          <select class="form-select" v-model="sort" placeholder="Сортировать">
            <option value="default">Сортировать по...</option>
            <option value="name">По названию</option>
            <option value="address">По адресу</option>
          </select>
        </div>
      </div>
      <div class="row">
        <LibraryBlock v-for="item in libraries" :item="item" :key="item._id" />
        <Observer @intersect="intersected" />
      </div>
    </template>
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
  data: () => ({
    search: null,
    sort: 'default',
  }),
  computed: {
    ...mapState({
      loading: (state) => state.loading,
      items: (state) => state.fetchedLibraries,
    }),
    libraries() {
      if (!this.search) {
        return this.sortFunction(this.items)
      } else {
        const result = this.items?.filter(
          (lib) =>
            lib?.data?.general?.name?.toLowerCase().indexOf(this.search) !==
              -1 ||
            lib?.data?.general?.address?.fullAddress
              ?.toLowerCase()
              .indexOf(this.search) !== -1
        )
        const sortData = this.sortFunction(result)
        return sortData
      }
    },
  },
  methods: {
    ...mapActions([types.INCREASE_PAGE_ACTION]),
    async intersected() {
      const part = await this[types.INCREASE_PAGE_ACTION]()
    },
    sortFunction(data) {
      let result
      switch (this.sort) {
        case 'name':
          result = data.sort((a, b) => {
            if (
              a?.data?.general?.name?.toLowerCase() >
              b?.data?.general?.name?.toLowerCase()
            )
              return 1
            else if (
              a?.data?.general?.name?.toLowerCase() <
              b?.data?.general?.name?.toLowerCase()
            )
              return -1
            else return 0
          })
          break
        case 'address':
          result = data.sort((a, b) => {
            if (
              a?.data?.general?.address?.fullAddress?.toLowerCase() >
              b?.data?.general?.address?.fullAddress?.toLowerCase()
            )
              return 1
            else if (
              a?.data?.general?.address?.fullAddress?.toLowerCase() <
              b?.data?.general?.address?.fullAddress?.toLowerCase()
            )
              return -1
            else return 0
          })
          break
        default:
          return data
      }
      return result
    },
    openDetails(item) {
      this.$router.push({ name: 'LibraryItem', params: { id: item._id } })
    },
  },
}
</script>
