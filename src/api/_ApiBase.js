import axios from 'axios'

const Axios = axios.create({
  // https://opendata.mkrf.ru/opendata/7705851331-libraries/data-52-structure-3.json?e={%22attachment%22:true}
  baseURL: 'https://opendata.mkrf.ru/v2',
  // baseURL: 'https://api.loycon.ru/WebService/UNK/unklcmanagerpartner/',
  headers: {
    'X-API-KEY':
      '9d2a91ce695d5ffb3dbb8f03d37331f96ef6a97991085375820f64e0c010b0da',
    Accept: 'application/json',
  },
})

// 37253cecbe7924bad9f27db90e8c5b0667852bd51c9141aa51599d842608ba37

Axios.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

Axios.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default Axios
