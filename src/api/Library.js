import ApiBase from './_ApiBase'

export default {
  getAllLibraries() {
    return ApiBase.get('/libraries?o={"version":-1}')
  },
}
