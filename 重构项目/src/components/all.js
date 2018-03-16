import RSSearch from '@/components/rs-search'
import RSList from '@/components/rs-list'
import RSLayout from '@/components/rs-layout'
import RSAside from '@/components/rs-aside'
import RSHeader from '@/components/rs-header'
import RSSelect from '@/components/rs-select'
import RSPage from '@/components/rs-page'
import RSModal from '@/components/rs-modal'
import RSTree from '@/components/rs-tree'

export default {
  install: function(Vue) {
      Vue.component('rs-search', RSSearch),
      Vue.component('rs-list', RSList),
      Vue.component('rs-layout', RSLayout),
      Vue.component('rs-aside', RSAside),
      Vue.component('rs-header', RSHeader),
      Vue.component('rs-select', RSSelect),
      Vue.component('rs-page', RSPage),
      Vue.component('rs-modal', RSModal)
      Vue.component('rs-tree', RSTree)
  }
}
