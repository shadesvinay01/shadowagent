import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Key, ArrowRight, CheckCircle2, MessageSquare, Globe } from "lucide-react";
import { validateLicense, startWhatsappSession } from "../../lib/tauri/commands";

export default function OnboardingWizard({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [license, setLicense] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const nextStep = () => setStep(prev => prev + 1);

  const handleActivation = async () => {
    setLoading(true);
    setError("");

    // Instant Master Key Bypass (Frontend Logic)
    if (license === "SHADOW-INVESTOR-2026") {
      setTimeout(() => {
        localStorage.setItem("shadow_license_token", "MASTER_TOKEN_BYPASS");
        nextStep();
        setLoading(false);
      }, 800);
      return;
    }

    try {
      const res = await validateLicense(email, license);
      if (res.success) {
        localStorage.setItem("shadow_license_token", res.token!);
        nextStep();
      } else {
        setError(res.error || "Activation failed");
      }
    } catch (e) {
      setError("Connection error. Ensure you are online for activation.");
    } finally {
      setLoading(false);
    }
  };

  const handleConnectWhatsApp = async () => {
    setLoading(true);
    try {
      await startWhatsappSession();
      nextStep();
    } catch (e) {
      setError("Failed to start WhatsApp service.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-6 relative">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] animate-pulse" />

      <div className="w-full max-w-2xl glass-panel rounded-[2rem] p-12 relative overflow-hidden">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="space-y-8"
            >
              <div className="w-20 h-20 rounded-3xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-10 shadow-[0_0_30px_rgba(0,240,255,0.2)]">
                <Shield className="w-10 h-10 text-primary" />
              </div>
              <h1 className="text-5xl font-syne font-bold tracking-tight text-glow">SHADOWAGENT</h1>
              <p className="text-white/60 text-lg leading-relaxed font-manrope font-light">
                Secure. Local. Autonomous. <br />
                Initialize your private intelligence layer.
              </p>
              <button
                onClick={nextStep}
                className="w-full py-5 bg-primary text-primary-foreground font-syne font-bold rounded-2xl hover:brightness-110 transition-all flex items-center justify-center gap-3 group shadow-[0_0_40px_rgba(0,240,255,0.3)]"
              >
                INITIALIZE SYSTEM
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="space-y-8"
            >
              <div className="flex items-center gap-4 mb-2">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <Key className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-3xl font-syne font-bold">License Access</h2>
              </div>
              
              <div className="space-y-5">
                <div className="space-y-2">
                  <label className="text-xs font-mono text-white/40 uppercase tracking-widest ml-1">Identity</label>
                  <input
                    type="email"
                    placeholder="email@vault.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-primary/40 focus:bg-white/10 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-mono text-white/40 uppercase tracking-widest ml-1">Access Key</label>
                  <input
                    type="text"
                    placeholder="SHADOW-XXXX-XXXX-XXXX"
                    value={license}
                    onChange={(e) => setLicense(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm font-mono focus:outline-none focus:border-primary/40 focus:bg-white/10 transition-all"
                  />
                </div>
                {error && <p className="text-red-400 text-xs font-manrope">{error}</p>}
              </div>

              <button
                onClick={handleActivation}
                disabled={loading}
                className="w-full py-5 bg-white text-black font-syne font-bold rounded-2xl hover:bg-white/90 disabled:opacity-50 transition-all shadow-xl"
              >
                {loading ? "VALIDATING..." : "ACTIVATE LICENSE"}
              </button>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="space-y-8"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <MessageSquare className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-3xl font-syne font-bold">WhatsApp Sync</h2>
              </div>
              <p className="text-white/50 font-manrope">
                ShadowAgent requires a local session to read and respond to messages. This session is stored only on your machine.
              </p>
              
              <div className="p-8 rounded-3xl border border-white/5 bg-black/40 flex flex-col items-center gap-6">
                <div className="w-48 h-48 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 relative overflow-hidden">
                   <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-purple-500/20 animate-pulse" />
                   <Globe className="w-12 h-12 text-white/20 animate-spin-slow" />
                </div>
                <p className="text-xs text-white/30 font-mono">WAITING FOR QR INITIALIZATION...</p>
              </div>

              <button
                onClick={nextStep}
                className="w-full py-5 border border-white/10 rounded-2xl hover:bg-white/5 transition-all font-syne font-bold uppercase tracking-widest text-xs text-white/40 hover:text-white"
              >
                Skip Synchronization
              </button>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-8"
            >
              <div className="relative mx-auto w-32 h-32">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl animate-pulse" />
                <div className="relative w-32 h-32 rounded-full bg-black/40 border border-primary/30 flex items-center justify-center">
                  <CheckCircle2 className="w-16 h-16 text-primary shadow-glow" />
                </div>
              </div>
              
              <div className="space-y-4">
                <h2 className="text-4xl font-syne font-bold tracking-tight text-glow">SYSTEM READY.</h2>
                <p className="text-white/50 font-manrope max-w-sm mx-auto">
                  Neural link established. Privacy shields at 100%. All tools are now under your local control.
                </p>
              </div>

              <button
                onClick={() => {
                  localStorage.setItem("shadow_setup_complete", "true");
                  onComplete();
                }}
                className="w-full py-5 bg-primary text-primary-foreground font-syne font-bold rounded-2xl hover:brightness-110 transition-all shadow-[0_0_50px_rgba(0,240,255,0.3)]"
              >
                ENTER THE SHADOW
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
