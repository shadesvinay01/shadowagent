"use client";

import { motion } from "framer-motion";
import { Check, Zap, Crown, Shield } from "lucide-react";

const plans = [
  {
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
  return (
    <section id="pricing" className="relative py-32 px-6 section-panel">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-20">
          <p className="text-xs font-manrope font-semibold tracking-[0.25em] uppercase text-white/40 mb-4">Pricing Plans</p>
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

              <a 
                href="#hero"
                className={`w-full py-3.5 rounded-xl font-syne font-bold text-sm transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center no-underline ${
                plan.popular
                  ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:opacity-90"
                  : "border border-white/15 text-white hover:border-white/30 hover:bg-white/5"
              }`}>
                {plan.name === "Shadow Elite" ? "Contact Sales" : "Get Started"}
              </a>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center text-white/25 text-xs font-manrope flex flex-col items-center gap-4">
          <p>Sovereign encryption, 100% control. All trials automatically transition to the selected tier unless cancelled.</p>
        </div>
      </div>
    </section>
  );
}
