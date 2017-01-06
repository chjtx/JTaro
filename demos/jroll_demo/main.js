/* global Vue */
import home from './pages/home.js'

Vue.component('pages__home', home)

Vue.use(JTaro, {
    default: 'pages/home'
})
