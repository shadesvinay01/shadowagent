# 🛡️ ShadowAgent: The Sovereign AI Operating System

> **The only AI agent that values your privacy as much as you do. 100% Local. 100% Yours.**

ShadowAgent is a high-performance, privacy-first personal AI assistant built for the modern age. Unlike traditional cloud-based AI, ShadowAgent runs entirely on your local hardware, ensuring your messages, files, and thoughts never leave your control.

---

## ✨ Key Features

### 🧠 Local Intelligence (RAG)
Analyze PDFs, documents, and private data using a full local RAG pipeline. Powered by **Ollama** and **LangChain.js**, your data is indexed and searched without ever touching a cloud server.

### 💬 Unified Integration Hub
- **WhatsApp Node**: Automate outreach and summarize chats using local session mirroring.
- **Email & Calendar**: Draft responses and manage your schedule via encrypted local IMAP/SMTP protocols.
- **Shadow Nodes**: An expandable plugin marketplace for integrating with tools like Shopify, Discord, and more.

### 🎙️ Shadow Voice Protocol
Interactive local voice interface using Whisper STT and Piper TTS. Talk to your agent in real-time with zero latency.

### 🏎️ Hardware Acceleration
Native support for **Apple Silicon (MLX)** and **NVIDIA (CUDA)**. ShadowAgent automatically detects your hardware to provide sub-100ms response times.

---

## 🔒 Security Protocol (The Shadow-Vault)

- **Zero-Server Policy**: Daily tasks are executed entirely offline.
- **OS-Native Encryption**: Credentials and session tokens are stored in the **macOS Keychain** or **Windows Credential Manager** using AES-256 encryption.
- **JWT Activation**: A one-time activation handshake issues an annual local token, after which the app enters air-gapped mode.

---

## 🛠️ Tech Stack

- **Desktop Core**: [Tauri 2.0](https://tauri.app/) (Rust + React)
- **Neural Engine**: [Ollama](https://ollama.com/)
- **Frontend**: Next.js 16 (Website), React (Desktop)
- **Styling**: Vanilla CSS + Framer Motion (Cinematic Aesthetic)
- **Vector Store**: HNSWLib (Local)

---

## 🚀 Getting Started

### Prerequisites
- [Ollama](https://ollama.com/) installed and running.
- [Node.js](https://nodejs.org/) (v18+)
- (Windows Only) Visual Studio with "Desktop development with C++" workload.

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/shadesvinay01/shadowagent.git
   cd shadowagent
   ```

2. **Install Dependencies**:
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Launch the Desktop App**:
   ```bash
   npm run dev:desktop
   ```

4. **Run the Website Locally**:
   ```bash
   npm run dev:website
   ```

---

## 🗺️ Roadmap: Phase 3
- [x] Hardware Detection (MLX/CUDA)
- [x] Voice Protocol Interface
- [x] Plugin Marketplace Foundation
- [ ] P2P Cross-Device Sync
- [ ] Enterprise Dashboard

---

## 📄 License
© 2026 ShadowAgent Collective. All rights reserved locally. ShadowAgent is a subscription-based software. See [Documentation](/docs) for licensing details.
