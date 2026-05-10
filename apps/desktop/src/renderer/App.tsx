import { useState, useEffect } from 'react'

function App() {
  const [isActivated, setIsActivated] = useState(false)
  const [licenseKey, setLicenseKey] = useState('')
  const [activeTab, setActiveTab] = useState('agent')
  const [qrCode, setQrCode] = useState<string | null>(null)
  const [whatsappStatus, setWhatsappStatus] = useState('disconnected')
  const [messages, setMessages] = useState<any[]>([])

  useEffect(() => {
    if (isActivated) {
      // @ts-ignore
      window.api.whatsapp.onQR((qr: string) => {
        setQrCode(qr)
        setWhatsappStatus('waiting-for-scan')
      })

      // @ts-ignore
      window.api.whatsapp.onStatus((status: string) => {
        setWhatsappStatus(status)
        if (status === 'ready') setQrCode(null)
      })

      // @ts-ignore
      window.api.whatsapp.onMessage((msg: any) => {
        setMessages(prev => [...prev, msg])
      })
    }
  }, [isActivated])

  const handleActivate = () => {
    if (licenseKey === 'SHADOW-2026') {
      setIsActivated(true)
    } else {
      alert('Invalid License Key')
    }
  }

  const initWhatsApp = () => {
    // @ts-ignore
    window.api.whatsapp.init()
  }

  if (!isActivated) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-[#05050A] text-white font-sans p-10">
        <div className="w-20 h-20 bg-cyan-500 rounded-2xl mb-8 flex items-center justify-center shadow-[0_0_30px_rgba(0,240,255,0.4)]">
          <span className="text-4xl font-bold text-black">S</span>
        </div>
        <h1 className="text-3xl font-bold mb-2 tracking-tight">ShadowAgent</h1>
        <p className="text-gray-500 mb-10 text-sm">Please activate your local license</p>
        <div className="w-full max-w-sm glass-dark p-8 rounded-3xl border border-white/10">
          <div className="mb-6">
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">License Key</label>
            <input 
              type="text" 
              value={licenseKey}
              onChange={(e) => setLicenseKey(e.target.value)}
              placeholder="XXXX-XXXX-XXXX-XXXX"
              className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-4 text-center font-mono tracking-widest focus:outline-none focus:border-cyan-500/50 transition-all"
            />
          </div>
          <button 
            onClick={handleActivate}
            className="w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-cyan-400 transition-all active:scale-95"
          >
            Activate System
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-[#05050A] text-white font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 flex flex-col p-6">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center">
            <span className="font-bold text-black">S</span>
          </div>
          <span className="font-bold tracking-tight">ShadowAgent</span>
        </div>

        <nav className="flex-1 space-y-2">
          {['agent', 'integrations', 'files', 'settings'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === tab ? 'bg-white/10 text-cyan-400 border border-cyan-500/20' : 'text-gray-500 hover:text-white'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-6 border-t border-white/5">
          <div className="text-[10px] text-gray-700 uppercase tracking-widest mb-2">System Status</div>
          <div className="flex items-center gap-2 text-xs text-green-500">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            ENCRYPTED_LINK_UP
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="p-6 border-b border-white/5 flex items-center justify-between">
          <h2 className="text-xl font-bold font-space capitalize">{activeTab}</h2>
          <div className="flex items-center gap-4 text-xs">
            <span className="text-gray-500">v1.0.4-stable</span>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8">
          {activeTab === 'agent' && (
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="glass-dark p-6 rounded-3xl border border-white/10 h-[500px] flex flex-col">
                <div className="flex-1 overflow-y-auto space-y-4 mb-6 pr-4 custom-scrollbar">
                  {messages.length === 0 ? (
                    <div className="h-full flex items-center justify-center text-gray-600 text-sm italic">
                      Waiting for incoming WhatsApp messages...
                    </div>
                  ) : (
                    messages.map((m, i) => (
                      <div key={i} className="bg-white/5 p-4 rounded-2xl border border-white/5">
                        <div className="text-[10px] text-cyan-500 font-bold mb-1">{m.from}</div>
                        <div className="text-sm text-gray-300">{m.body}</div>
                      </div>
                    ))
                  )}
                </div>
                <div className="relative">
                   <input type="text" placeholder="Command your agent..." className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-4 text-sm focus:outline-none focus:border-cyan-500/50" />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'integrations' && (
            <div className="max-w-4xl mx-auto grid grid-cols-2 gap-6">
              <div className="glass-dark p-8 rounded-3xl border border-white/10">
                <h3 className="text-lg font-bold mb-4">WhatsApp</h3>
                <div className="flex items-center justify-between mb-6">
                  <span className={`text-xs px-2 py-1 rounded-md font-bold uppercase ${
                    whatsappStatus === 'ready' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                  }`}>
                    {whatsappStatus}
                  </span>
                  {whatsappStatus === 'disconnected' && (
                    <button onClick={initWhatsApp} className="text-xs text-cyan-400 hover:underline">Connect</button>
                  )}
                </div>

                {qrCode ? (
                  <div className="bg-white p-4 rounded-xl inline-block mx-auto">
                    <img src={qrCode} alt="WhatsApp QR" className="w-48 h-48" />
                    <p className="text-black text-[10px] text-center mt-2 font-bold">SCAN WITH WHATSAPP</p>
                  </div>
                ) : (
                  <div className="text-gray-500 text-sm">
                    {whatsappStatus === 'ready' ? 'Successfully linked to local device.' : 'Connect to start local automation.'}
                  </div>
                )}
              </div>

              <div className="glass-dark p-8 rounded-3xl border border-white/10">
                <h3 className="text-lg font-bold mb-4">Email (IMAP/SMTP)</h3>
                <p className="text-gray-500 text-sm mb-6">Connect your private email server for local management.</p>
                <button className="w-full py-3 bg-white/5 border border-white/10 text-white rounded-xl text-sm font-bold hover:bg-white/10">Configure IMAP</button>
              </div>
            </div>
          )}
        </div>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        .glass-dark { background: rgba(255, 255, 255, 0.02); backdrop-filter: blur(20px); }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.1); border-radius: 10px; }
      `}} />
    </div>
  )
}

export default App
