import { precacheAndRoute } from 'workbox-precaching'
import { Workbox } from 'workbox-window'

const manifest = self.__WB_MANIFEST

precacheAndRoute(manifest || [])
let wb
if ('serviceWorker' in navigator) {
  wb = new Workbox(`${process.env.BASE_URL}service-worker.js`)
  wb.addEventListener('controlling', () => {
    window.location.reload()
  })
  wb.register()
} else {
  wb = null
}
export default wb
