# 🛡️ ShadowAgent

**The World's Most Private AI Desktop Agent.**  
ShadowAgent is a 100% local, production-ready AI platform built on **Tauri 2** and **Ollama**. It allows you to automate your digital life—WhatsApp, Email, Calendar, and Local Files—without a single byte of your data ever leaving your machine.

---

## 🌟 Key Features

- **🧠 100% Local Intelligence**: Powered by Ollama. No cloud processing. No data leaks.
- **📱 WhatsApp Automation**: Read, reply, and manage chats locally via secure session persistence.
- **📧 Email & Calendar**: Unified AI control over your inbox and schedule.
- **📁 Local RAG (File Analysis)**: Feed the AI your local PDFs and documents for instant, private insights.
- **🛡️ Secure Keychain**: All credentials and API keys are stored in your OS-native secure vault.
- **🔑 Annual Licensing**: A robust JWT-based licensing system that works fully offline after activation.

---

## 🏗️ Tech Stack

- **Frontend**: React 19 + TypeScript + Tailwind CSS + Framer Motion
- **Backend**: Rust (Tauri 2.0)
- **AI Engine**: Ollama (LangChain.js + LangGraph)
- **Design System**: "Cyber-Dark" Glassmorphism with Futuristic Micro-animations

---

## 🚀 Getting Started

### 1. Prerequisites
- **Rust**: [Install Rust](https://rustup.rs/)
- **Ollama**: [Download Ollama](https://ollama.com/)
- **Node.js**: [Install Node](https://nodejs.org/)

### 2. Setup Local Model
```bash
ollama pull llama3-groq-tool-use
```

### 3. Installation
```bash
# Clone the repository
git clone https://github.com/shadesvinay01/shadowagent.git
cd shadowagent

# Install dependencies (Monorepo)
npm install
```

### 4. Development
```bash
# Run the licensing server mock
node licensing-server-mock.js

# In another terminal, start the app
npm run dev:desktop
```

---

## 📂 Project Structure

- `apps/website`: Next.js landing page (Optimized for performance & SEO).
- `apps/desktop`: The main Tauri 2 application.
- `licensing-server-mock.js`: Simulation of the production activation backend.

---

## ⚖️ Licensing & Support

ShadowAgent is designed as a privacy-first SaaS. It requires an annual license key for activation. After the initial handshake, the app remains fully functional offline for 365 days.

---

## 🛡️ Privacy Statement
**Your data is yours.** ShadowAgent does not track you, does not store your messages on any cloud, and does not sell your interactions. Everything happens in your shadow.

---

*Built with ❤️ by the ShadowAgent Team.*
