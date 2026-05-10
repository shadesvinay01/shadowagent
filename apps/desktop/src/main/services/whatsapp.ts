import { Client, LocalAuth } from 'whatsapp-web.js'
import qrcode from 'qrcode'
import { BrowserWindow } from 'electron'

export class WhatsAppService {
  private client: Client
  private window: BrowserWindow

  constructor(window: BrowserWindow) {
    this.window = window
    this.client = new Client({
      authStrategy: new LocalAuth(),
      puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      }
    })

    this.setupListeners()
  }

  private setupListeners() {
    this.client.on('qr', async (qr) => {
      // Convert QR code to data URL and send to renderer
      const qrDataUrl = await qrcode.toDataURL(qr)
      this.window.webContents.send('whatsapp-qr', qrDataUrl)
    })

    this.client.on('ready', () => {
      console.log('WhatsApp Client is ready!')
      this.window.webContents.send('whatsapp-status', 'ready')
    })

    this.client.on('message', (msg) => {
      // Send incoming messages to renderer for the agent to process
      this.window.webContents.send('whatsapp-message', {
        from: msg.from,
        body: msg.body,
        timestamp: msg.timestamp
      })
    })
  }

  public async initialize() {
    try {
      await this.client.initialize()
    } catch (error) {
      console.error('Failed to initialize WhatsApp:', error)
    }
  }

  public async sendMessage(to: string, message: string) {
    try {
      await this.client.sendMessage(to, message)
      return { success: true }
    } catch (error) {
      return { success: false, error: (error as Error).message }
    }
  }

  public async getChats() {
    return await this.client.getChats()
  }
}
