"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Zap, Crown, Shield, X, CreditCard, Lock, CheckCircle, Copy } from "lucide-react";

const plans = [
  {
    id: "BYOK",
    tier: "TIER 1 · BYOK",
    name: "BYOK Pro",
    price: "$9",
    period: "/ mo",
    desc: "OWN API KEYS",
    features: [
      "All Free features",
      "Advanced workflows",
      "Profile automation",
      "Priority support",
      "Early access"
    ],
    icon: <Shield className="w-6 h-6 text-white/50" />,
    popular: false,
    trial: "1-day free trial"
  },
  {
    id: "CORE",
    tier: "TIER 2 · MANAGED AI",
    name: "Shadow AI Core",
    price: "$25",
    period: "/ mo",
    desc: "500K TOKENS INCL.",
    features: [
      "All BYOK features",
      "Managed API (no key)",
      "Haiku/Flash quality",
      "Usage dashboard",
      "Token rollover"
    ],
    icon: <Zap className="w-6 h-6 text-cyan-400" />,
    popular: false,
    trial: "1-day free trial"
  },
  {
    id: "PRO",
    tier: "TIER 3 · PREMIUM",
    name: "Shadow AI Pro",
    price: "$59",
    period: "/ mo",
    desc: "2M TOKENS INCL.",
    features: [
      "All Core features",
      "Sonnet / Pro / GPT-4o",
      "Multi-model routing",
      "Custom personas",
      "API analytics"
    ],
    icon: <Crown className="w-6 h-6 text-pink-400 animate-pulse" />,
    popular: true,
    trial: "1-day free trial"
  },
  {
    id: "ELITE",
    tier: "TIER 4 · ENTERPRISE",
    name: "Shadow Elite",
    price: "$299",
    period: "/ mo",
    desc: "UP TO 10 SEATS",
    features: [
      "Opus / Ultra models",
      "Air-gap deployment",
      "SLA + compliance",
      "Custom fine-tune",
      "Dedicated CSM"
    ],
    icon: <Crown className="w-6 h-6 text-purple-400" />,
    popular: false,
    trial: "1-day free trial"
  }
];

export default function Pricing() {
  const [selectedPlan, setSelectedPlan] = useState<typeof plans[0] | null>(null);
  const [email, setEmail] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [checkoutResult, setCheckoutResult] = useState<any>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    value = value.substring(0, 16);
    const matches = value.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length > 0) {
      setCardNumber(parts.join(" "));
    } else {
      setCardNumber(value);
    }
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length >= 2) {
      setCardExpiry(`${value.substring(0, 2)}/${value.substring(2, 4)}`);
    } else {
      setCardExpiry(value);
    }
  };

  const handleOpenCheckout = (plan: typeof plans[0]) => {
    setSelectedPlan(plan);
    setEmail("");
    setCardNumber("");
    setCardExpiry("");
    setCardCvc("");
    setCheckoutResult(null);
    setCopied(false);
    setError(null);
  };

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    if (cardNumber.replace(/\s/g, "").length !== 16) {
      setError("Please enter a valid 16-digit card number.");
      return;
    }
    
    setError(null);
    setIsProcessing(true);

    // Simulate 1.5 seconds loading state
    await new Promise((resolve) => setTimeout(resolve, 1500));

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, tier: selectedPlan?.id })
      });
      const data = await res.json();
      if (data.success) {
        setCheckoutResult(data);
      } else {
        setError(data.error || "Payment failed.");
      }
    } catch (err: any) {
      setError("Could not complete checkout. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCopy = () => {
    if (checkoutResult?.token) {
      navigator.clipboard.writeText(checkoutResult.token);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section id="pricing" className="relative py-32 px-6 section-panel">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-20">
          <p className="text-xs font-manrope font-semibold tracking-[0.25em] uppercase text-cyan-400 mb-4">Pricing Plans</p>
          <h2 className="text-4xl md:text-6xl font-syne font-bold mb-4 tracking-tight">
            Invest in Your <span className="text-white/40">Sovereignty</span>
          </h2>
          <p className="text-white/50 font-manrope">Flexible plans suited for local operators, builders, and large enterprises. All plans start with a 1-day free trial.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative rounded-2xl p-8 flex flex-col border transition-all duration-300 hover:border-white/20 ${
                plan.popular
                  ? "border-pink-500/30 shadow-[0_0_30px_rgba(236,72,153,0.1)]"
                  : "border-white/8"
              }`}
              style={{ background: plan.popular ? 'rgb(18,12,24)' : 'rgb(10,10,18)' }}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-[10px] font-syne font-black uppercase tracking-widest rounded-full shadow-lg shadow-pink-500/20">
                  POPULAR
                </div>
              )}

              <div className="mb-5">{plan.icon}</div>
              
              <div className="text-[9px] font-mono tracking-widest text-cyan-400/80 uppercase font-bold mb-1.5">{plan.tier}</div>
              <h3 className="text-xl font-syne font-bold text-white mb-1">{plan.name}</h3>
              <div className="flex items-baseline gap-1.5 mb-1.5">
                <span className="text-4xl font-syne font-bold text-white">{plan.price}</span>
                <span className="text-white/40 text-sm font-manrope">{plan.period}</span>
              </div>
              <div className="text-[9px] font-mono tracking-wider text-pink-400 font-bold mb-4">{plan.desc}</div>
              
              <div className="inline-flex items-center gap-1 mb-6 px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-[8px] font-mono text-cyan-400 uppercase tracking-widest w-fit">
                <span>⚡</span> {plan.trial}
              </div>

              <div className="space-y-3.5 mb-10 flex-1">
                {plan.features.map((feat, j) => (
                  <div key={j} className="flex items-center gap-3 text-sm font-manrope text-white/60">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${plan.popular ? 'bg-pink-500/20' : 'bg-white/6'}`}>
                      <Check className="w-2.5 h-2.5 text-white" />
                    </div>
                    {feat}
                  </div>
                ))}
              </div>

              <button 
                onClick={() => handleOpenCheckout(plan)}
                className={`w-full py-3.5 rounded-xl font-syne font-bold text-sm transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center border-none cursor-pointer ${
                plan.popular
                  ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:opacity-90 shadow-lg shadow-pink-500/10"
                  : "border border-white/15 bg-white/5 text-white hover:border-white/30 hover:bg-white/10"
              }`}>
                {plan.id === "ELITE" ? "Contact Sales" : "Get Started"}
              </button>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center text-white/25 text-xs font-manrope flex flex-col items-center gap-4">
          <p>Sovereign encryption, 100% control. All trials automatically transition to the selected tier unless cancelled.</p>
        </div>
      </div>

      {/* CHECKOUT MODAL OVERLAY */}
      <AnimatePresence>
        {selectedPlan && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/85 backdrop-blur-md flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="w-full max-w-lg glass-panel rounded-3xl overflow-hidden border border-white/10 relative p-8 bg-[#0D0D15] text-white"
            >
              <button 
                onClick={() => setSelectedPlan(null)} 
                className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-white/40 hover:text-white cursor-pointer border-none"
              >
                <X className="w-5 h-5" />
              </button>

              {!checkoutResult ? (
                <form onSubmit={handleCheckoutSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <div className="text-[10px] font-mono tracking-widest text-cyan-400 uppercase font-black">{selectedPlan.tier}</div>
                    <h3 className="text-3xl font-syne font-black uppercase">Activate {selectedPlan.name}</h3>
                    <p className="text-xs text-white/40 font-manrope">
                      You are starting a <strong>1-Day Free Trial</strong>, followed by {selectedPlan.price}{selectedPlan.period}.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-[9px] font-mono text-white/40 uppercase tracking-widest block mb-2 font-bold">Email Address</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@domain.com"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm focus:border-cyan-500/50 focus:outline-none"
                      />
                    </div>

                    <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 space-y-4">
                      <div className="flex justify-between items-center text-[10px] font-mono text-white/40 uppercase tracking-wider font-bold border-b border-white/5 pb-2">
                        <span>Card Details</span>
                        <span className="flex items-center gap-1"><Lock className="w-3 h-3 text-cyan-400" /> Secure SSL</span>
                      </div>
                      
                      <div>
                        <label className="text-[8px] font-mono text-white/30 uppercase block mb-1">Card Number</label>
                        <div className="relative">
                          <input
                            type="text"
                            required
                            value={cardNumber}
                            onChange={handleCardNumberChange}
                            placeholder="4242 4242 4242 4242 (Stripe Test Card)"
                            className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm focus:border-cyan-500/50 focus:outline-none font-mono"
                          />
                          <CreditCard className="w-4 h-4 text-white/30 absolute left-4 top-1/2 -translate-y-1/2" />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-[8px] font-mono text-white/30 uppercase block mb-1">Expiry Date</label>
                          <input
                            type="text"
                            required
                            value={cardExpiry}
                            onChange={handleExpiryChange}
                            maxLength={5}
                            placeholder="MM/YY"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-cyan-500/50 focus:outline-none font-mono text-center"
                          />
                        </div>
                        <div>
                          <label className="text-[8px] font-mono text-white/30 uppercase block mb-1">CVC</label>
                          <input
                            type="password"
                            required
                            value={cardCvc}
                            onChange={(e) => setCardCvc(e.target.value.replace(/\D/g, "").substring(0, 4))}
                            placeholder="123"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-cyan-500/50 focus:outline-none font-mono text-center"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {error && (
                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-xs font-bold text-red-400 text-center uppercase tracking-wide">
                      ⚠️ {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-95 text-white font-syne font-bold text-sm rounded-xl transition-all shadow-xl shadow-pink-500/10 border-none cursor-pointer disabled:opacity-55 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Processing Securely...
                      </>
                    ) : (
                      `Start 1-Day Trial & Subscribe`
                    )}
                  </button>
                </form>
              ) : (
                <div className="space-y-8 text-center py-4">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center text-green-400">
                      <CheckCircle className="w-10 h-10" />
                    </div>
                    <h3 className="text-3xl font-syne font-black uppercase text-green-400 mt-2">Trial Activated!</h3>
                    <p className="text-xs text-white/50 max-w-sm leading-relaxed">
                      Your trial is active. Below is your cryptographically signed local **Sovereign Activation Key** for <code>{checkoutResult.email}</code>.
                    </p>
                  </div>

                  <div className="space-y-3 text-left">
                    <label className="text-[8px] font-mono text-white/30 uppercase tracking-widest block font-black">Activation Token (JWT)</label>
                    <div className="relative bg-black/40 border border-white/5 rounded-2xl p-5 font-mono text-[9px] text-cyan-400/90 break-all select-all pr-12 line-clamp-4">
                      {checkoutResult.token}
                      <button 
                        onClick={handleCopy}
                        title="Copy to clipboard"
                        className="absolute right-4 top-4 p-2 bg-white/5 hover:bg-white/10 rounded-lg text-white/40 hover:text-white transition-colors cursor-pointer border-none"
                      >
                        {copied ? <CheckCircle className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 text-xs text-white/40 leading-relaxed text-left space-y-2">
                    <p className="font-bold text-white/60 text-xs">How to activate your desktop app:</p>
                    <ol className="list-decimal pl-4 space-y-1 text-xs">
                      <li>Copy the JWT token above.</li>
                      <li>Open your **ShadowAgent** desktop app.</li>
                      <li>Navigate to Step 5 (Final Activation) in Onboarding.</li>
                      <li>Paste this token into the access key input, enter your email <strong>{checkoutResult.email}</strong>, and finalize setup!</li>
                    </ol>
                  </div>

                  <button
                    onClick={() => setSelectedPlan(null)}
                    className="w-full py-4 border border-white/15 hover:bg-white/5 text-white font-syne font-bold text-sm rounded-xl transition-all cursor-pointer bg-transparent"
                  >
                    Done
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
