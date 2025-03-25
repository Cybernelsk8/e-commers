import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

import axios from 'axios'

import Button from './components/Button.vue'
import Modal from './components/Modal.vue'
import Card from './components/Card.vue'
import Input from './components/Input.vue'
import ToolTip from './components/ToolTip.vue'


library.add(fas)
library.add(fab)
library.add(far)

axios.defaults.baseURL = import.meta.env.VITE_MY_API

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.component('Icon', FontAwesomeIcon)
app.component('Button', Button)
app.component('Input', Input)
app.component('Modal', Modal)
app.component('Card', Card)
app.component('Tool-Tip', ToolTip)

app.mount('#app')
