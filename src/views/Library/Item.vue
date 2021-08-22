<template>
  <div class="container pt-4">
    <div class="row">
      <div class="col-12 col-sm-12 col-md-3">
        <div class="card">
          <img :src="image" class="card-img-top" alt="..." />
          <div class="card-body">
            <p class="card-text">
              {{ name }}
            </p>
            <p class="card-text">
              {{ address }}
            </p>
          </div>
        </div>
        <router-link to="/" class="btn btn-success mt-2 w-100">
          Назад
        </router-link>
      </div>
      <div class="col-12 col-sm-12 col-md-9">
        <table class="table">
          <tbody>
            <tr>
              <td class="fw-bold">Тип:</td>
              <td>{{ category }}</td>
            </tr>
            <tr>
              <td class="fw-bold">Описание:</td>
              <td v-html="description" class="text-start"></td>
            </tr>
            <tr v-if="tags && tags.length">
              <td class="fw-bold">Тэги:</td>
              <td class="text-start">
                <span
                  class="badge bg-info me-2"
                  v-for="tag in tags"
                  :key="tag.id"
                >
                  {{ tag.name }}
                </span>
              </td>
            </tr>
            <tr v-if="site">
              <td class="fw-bold">Веб-сайт:</td>
              <td>
                <a :href="site" target="_blank">{{ site }}</a>
              </td>
            </tr>
            <tr v-if="email">
              <td class="fw-bold">E-mail:</td>
              <td>{{ email }}</td>
            </tr>
            <tr v-if="phones && phones.length">
              <td class="fw-bold">Телефон:</td>
              <td>
                <p class="mb-0" v-for="(phone, index) in phones" :key="index">
                  {{ phone.value }}
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LibraryItem',
  props: ['id'],
  computed: {
    library() {
      return this.$store?.getters?.getLibraryById(this.id)
    },
    image() {
      return this.library?.data?.general?.image?.url
    },
    address() {
      return this.library?.data?.general?.address?.fullAddress
    },
    name() {
      return this.library?.data?.general?.name
    },
    category() {
      return this.library?.data?.general?.category?.name
    },
    description() {
      return this.library?.data?.general?.description
    },
    tags() {
      return this.library?.data?.general?.tags
    },
    site() {
      return this.library?.data?.general?.contacts?.website
    },
    email() {
      return this.library?.data?.general?.contacts?.email
    },
    phones() {
      return this.library?.data?.general?.contacts?.phones
    },
  },
}
</script>
