<h1 align="center">
  <br/>
  <img src="apps/website/public/logo.svg" alt="ShadowAgent" width="60"/>
  <br/>
  ShadowAgent
  <br/>
</h1>

<h4 align="center">Your Personal AI Agent. 100% Local. Zero Cloud. Total Privacy.</h4>

<p align="center">
  <img src="https://img.shields.io/badge/version-1.0.4--stable-white?style=flat-square" />
  <img src="https://img.shields.io/badge/license-MIT-white?style=flat-square" />
  <img src="https://img.shields.io/badge/platform-Windows%20%7C%20macOS%20%7C%20Linux-white?style=flat-square" />
  <img src="https://img.shields.io/badge/cloud%20data-0%20bytes-brightgreen?style=flat-square" />
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#project-structure">Project Structure</a> •
  <a href="#contributing">Contributing</a>
</p>

---

## What is ShadowAgent?

ShadowAgent is an AI agent that runs **entirely on your own hardware**. It automates WhatsApp, Email, Calendar, and File operations using a locally-hosted LLM — no data ever leaves your machine.

> **Zero bytes uploaded. Zero telemetry. Zero cloud dependencies.**

---

## Features

| Capability | Description |
|---|---|
| 💬 **WhatsApp Control** | Read, summarize, and auto-reply to messages via local whatsapp-web.js |
| 📧 **Email Intelligence** | Draft replies, filter inbox, organize threads via local IMAP |
| 📅 **Smart Calendar** | Schedule and reschedule events without cloud sync |
| 📄 **Local RAG** | Search and summarize your PDFs and documents using a local vector store |
| 🔒 **Air-Gapped Mode** | Works with zero internet after initial setup |
| ⚡ **Hardware Optimized** | Leverages Apple Silicon, CUDA, and ARM acceleration |

---

## Tech Stack

### Website (Marketing)
- **Next.js 16** (App Router, Turbopack)
- **React Three Fiber** — Photorealistic 3D glass prism WebGL background
- **Framer Motion** — Cinematic scroll animations, draggable components
- **Tailwind CSS v4** — Utility-first styling
- **Google Fonts: Syne + Manrope** — Premium editorial typography

### Desktop App (Electron)
- **Electron** — Cross-platform desktop wrapper
- **Ollama / llama.cpp** — Local LLM inference (Mistral, LLaMA 3, Phi-3)
- **ExLlamaV2 / GGUF** — Quantized model format support
- **whatsapp-web.js** — WhatsApp automation via local browser session
- **FAISS / LanceDB** — Local vector database for RAG

---

## Getting Started

### Prerequisites
- Node.js 20+
- pnpm 9+

### 1. Clone the repo

```bash
git clone https://github.com/shadesvinay01/shadowagent.git
cd shadowagent
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Run the marketing website

```bash
cd apps/website
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view it.

### 4. Run the desktop app (Electron)

```bash
cd apps/desktop
pnpm dev
```

---

## Project Structure

```
shadowagent/
├── apps/
│   ├── website/          # Next.js marketing website
│   │   ├── src/
│   │   │   ├── app/       # App router pages & layouts
│   │   │   ├── components/
│   │   │   │   ├── canvas/    # Three.js WebGL components (GlassPrism)
│   │   │   │   ├── layout/    # Navbar
│   │   │   │   ├── sections/  # Hero, Capabilities, Pricing, FAQ, etc.
│   │   │   │   └── ui/        # Reusable UI (LogoMark, DownloadModal, Cursor)
│   │   │   └── ...
│   │   └── package.json
│   └── desktop/          # Electron desktop application
│       └── ...
├── packages/             # Shared packages (types, utils)
├── README.md
└── package.json
```

---

## Website Sections

The marketing website includes:

- 🎬 **Cinematic Hero** — Full-screen GSAP reveal with the glass prism backdrop
- 📊 **Stats Counter** — Animated counters (0 bytes cloud, 100% local, 12ms latency)
- 🧩 **Capabilities** — Feature Bento grid
- 🔢 **How It Works** — 4-step setup guide
- ⚖️ **Comparison Table** — ShadowAgent vs ChatGPT vs Copilot
- 🔐 **Privacy Fortress** — Air-gapped security breakdown
- 🤖 **Live Demo** — Interactive local agent chat simulator
- ⭐ **Testimonials** — Auto-scrolling dual-row ticker
- 💰 **Pricing** — Starter / Pro / Enterprise tiers
- ❓ **FAQ** — Animated accordion
- 📥 **Download Modal** — OS-specific installer picker (Windows / macOS / Linux)

---

## Privacy Guarantee

ShadowAgent is built with one non-negotiable principle:

> **Your data never leaves your device.**

- ✅ No analytics, no Sentry, no Mixpanel
- ✅ No cloud LLM API calls (no OpenAI, no Anthropic)
- ✅ Integration tokens stored locally with AES-256 encryption
- ✅ Works fully offline after installation
- ✅ Open source — verify every line yourself

---

## License

MIT © 2026 ShadowAgent

---

<p align="center">Built with privacy as the first principle, not an afterthought.</p>
