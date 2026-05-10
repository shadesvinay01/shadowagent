import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/utils'

// Custom APIs for renderer
const api = {
  ping: () => ipcRenderer.send('ping'),
  whatsapp: {
    init: () => ipcRenderer.invoke('whatsapp-init'),
    send: (to: string, message: string) => ipcRenderer.invoke('whatsapp-send', { to, message }),
    onQR: (callback: any) => ipcRenderer.on('whatsapp-qr', (_, qr) => callback(qr)),
    onStatus: (callback: any) => ipcRenderer.on('whatsapp-status', (_, status) => callback(status)),
    onMessage: (callback: any) => ipcRenderer.on('whatsapp-message', (_, msg) => callback(msg))
  },
  email: {
    send: (data: any) => ipcRenderer.invoke('email-send', data)
  }
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
