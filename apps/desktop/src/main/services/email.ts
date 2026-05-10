import nodemailer from 'nodemailer'
import imaps from 'imap-simple'

export class EmailService {
  private transporter: nodemailer.Transporter | null = null

  public async setupTransporter(config: any) {
    this.transporter = nodemailer.createTransport(config)
  }

  public async sendEmail(to: string, subject: string, text: string) {
    if (!this.transporter) throw new Error('Email transporter not configured')
    
    return await this.transporter.sendMail({
      from: '"ShadowAgent" <agent@local>',
      to,
      subject,
      text
    })
  }

  public async fetchLatestEmails(config: any) {
    try {
      const connection = await imaps.connect({ imap: config })
      await connection.openBox('INBOX')
      
      const searchCriteria = ['UNSEEN']
      const fetchOptions = {
        bodies: ['HEADER', 'TEXT'],
        markSeen: false
      }

      const messages = await connection.search(searchCriteria, fetchOptions)
      connection.end()
      
      return messages.map(msg => ({
        subject: msg.parts.find(p => p.which === 'HEADER')?.body.subject[0],
        from: msg.parts.find(p => p.which === 'HEADER')?.body.from[0],
        date: msg.parts.find(p => p.which === 'HEADER')?.body.date[0],
      }))
    } catch (error) {
      console.error('Email fetch error:', error)
      return []
    }
  }
}
