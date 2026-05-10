"use client";

import { motion } from "framer-motion";
import { Check, Zap, Crown, Shield } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "$0",
    period: "Forever",
    desc: "Basic local automation for privacy enthusiasts.",
    features: ["Local WhatsApp Summaries", "Email Filtering", "Manual Calendar Sync", "Community Support"],
    icon: <Shield className="w-6 h-6 text-white/50" />,
    popular: false
  },
  {
    name: "Pro",
    price: "$49",
    period: "/ year",
    desc: "Full autonomy for professionals and power users.",
    features: ["Everything in Starter", "Auto-Reply Integrations", "PDF & Document RAG", "Social Media Posting", "Priority Updates"],
    icon: <Zap className="w-6 h-6 text-cyan-400" />,
    popular: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "/ year",
    desc: "Bespoke security for teams and organizations.",
    features: ["Bulk License Management", "SLA Support", "Custom Model Integration", "On-Prem Deployment"],
    icon: <Crown className="w-6 h-6 text-purple-400" />,
    popular: false
  }
];

export default function Pricing() {
  return (
    <section id="pricing" className="relative py-32 px-6 section-panel">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-20">
          <p className="text-xs font-manrope font-semibold tracking-[0.25em] uppercase text-white/40 mb-4">Pricing</p>
          <h2 className="text-4xl md:text-6xl font-syne font-bold mb-4 tracking-tight">
            Invest in Your <span className="text-white/40">Privacy</span>
          </h2>
          <p className="text-white/50 font-manrope">No monthly subscriptions. A simple annual license for continued support.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative rounded-2xl p-8 flex flex-col border transition-all duration-300 hover:border-white/20 ${
                plan.popular
                  ? "border-white/25"
                  : "border-white/8"
              }`}
              style={{ background: plan.popular ? 'rgb(15,15,28)' : 'rgb(10,10,18)' }}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-white text-black text-[10px] font-syne font-black uppercase tracking-widest rounded-full">
                  Most Popular
                </div>
              )}

              <div className="mb-5">{plan.icon}</div>
              <h3 className="text-xl font-syne font-bold text-white mb-2">{plan.name}</h3>
              <div className="flex items-baseline gap-1.5 mb-3">
                <span className="text-4xl font-syne font-bold text-white">{plan.price}</span>
                <span className="text-white/40 text-sm font-manrope">{plan.period}</span>
              </div>
              <p className="text-white/50 text-sm font-manrope mb-8 leading-relaxed">{plan.desc}</p>

              <div className="space-y-3.5 mb-10 flex-1">
                {plan.features.map((feat, j) => (
                  <div key={j} className="flex items-center gap-3 text-sm font-manrope text-white/60">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${plan.popular ? 'bg-white/15' : 'bg-white/6'}`}>
                      <Check className="w-2.5 h-2.5 text-white" />
                    </div>
                    {feat}
                  </div>
                ))}
              </div>

              <button className={`w-full py-3.5 rounded-xl font-syne font-bold text-sm transition-all hover:scale-[1.02] active:scale-[0.98] ${
                plan.popular
                  ? "bg-white text-black hover:bg-white/90"
                  : "border border-white/15 text-white hover:border-white/30 hover:bg-white/5"
              }`}>
                {plan.name === "Enterprise" ? "Contact Sales" : "Get Started"}
              </button>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center text-white/25 text-xs font-manrope flex flex-col items-center gap-4">
          <p>Cancel anytime. We earn your renewal through excellence.</p>
        </div>
      </div>
    </section>
  );
}
