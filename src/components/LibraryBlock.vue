<template>
  <div class="col-12 col-sm-12 col-md-4 col-lg-3 px-0">
    <div class="card px-0 library-block me-2 mb-2">
      <div class="library-block_image mb-3" :style="imageStyle"></div>
      <div class="card-body text-start d-flex flex-column">
        <p class="card-text" v-if="name">{{ name }}</p>
        <p class="card-text flex-grow-1" v-if="address">{{ address }}</p>
        <router-link :to="'/library/' + item._id" class="card-link">
          Детали
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LibraryBlock',
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  computed: {
    address() {
      return this.item?.data?.general?.address?.fullAddress
    },
    name() {
      return this.item?.data?.general?.name
    },
    image() {
      return this.item?.data?.general?.image?.url
    },
    imageStyle() {
      return {
        backgroundImage: `url(${this.image})`,
      }
    },
  },
}
</script>
