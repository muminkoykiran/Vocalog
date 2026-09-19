# 🎙️ Vocalog - AI Voice Notes & Audio Journal for Obsidian

[![GitHub Release](https://img.shields.io/github/v/release/muminkoykiran/Vocalog?style=flat-square&color=blue)](https://github.com/muminkoykiran/Vocalog/releases)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![Obsidian](https://img.shields.io/badge/Obsidian-v1.4.0%2B-purple?style=flat-square&logo=obsidian)](https://obsidian.md)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://github.com/muminkoykiran/Vocalog/pulls)

> **Capture your thoughts at the speed of sound.**  
> Vocalog is an Obsidian plugin that brings **one-click live voice recording**, lightning-fast **Whisper speech-to-text (STT)**, and **LLM-powered intelligent summarization** directly into your daily notes and PKM workflow.

---

## ⚡ Why Vocalog?

Most voice note solutions require you to record in an external app, export the audio, find a transcription service, paste the transcript into Obsidian, and manually organize it.

**Vocalog automates the entire pipeline inside Obsidian:**
1. **Speak**: Click the ribbon mic icon to start live recording.
2. **Transcribe**: Ultra-fast transcription via OpenAI Whisper, Groq, or local models.
3. **Synthesize**: An LLM (DeepSeek, GPT-4o, Claude, Ollama) distills your speech into structured daily notes (actions, insights, summaries).
4. **Preserve**: Raw verbatim transcripts are automatically kept in collapsible blocks so you never lose context.

---

## ✨ Features

- 🎙️ **In-App Live Microphone Recording**: Record voice memos directly inside Obsidian without external tools.
- 🔴 **Active Visual Pulse Feedback**: Ribbon button pulses with glowing red animation while recording is active.
- 🤖 **Custom AI Mic Studio Icon**: Specially designed icon representing voice intelligence.
- ⚡ **Whisper Speech-to-Text Support**: Compatible with any OpenAI-compatible audio transcription API (Groq Whisper, OpenAI Whisper, LocalAI, self-hosted).
- 🧠 **Smart LLM Summarization**: Turns noisy speech into actionable Markdown journals, extracting TODOs, insights, and key points.
- 📝 **Raw Transcript Preservation**: Raw transcripts are retained in collapsible `<details><summary>📝 Raw Transcripts</summary></details>` blocks.
- 📅 **Automated Daily Journaling**: Appends entries cleanly to your existing daily notes and refreshes frontmatter `updated:` timestamps.
- 🗓️ **Interactive Calendar & Date Range Batching**: Batch process historical recordings for any selected days or date ranges.
- 🔒 **100% Private & Local-First**: Zero telemetry, zero tracking, no intermediate servers. All API keys and recordings remain strictly in your local vault.

---

## 🚀 Recommended Provider: Groq + DeepSeek / OpenAI

For the fastest and most cost-effective experience:

| Service | Provider | Recommended Model | Benefits |
| :--- | :--- | :--- | :--- |
| **Speech-to-Text (STT)** | **Groq Cloud** | `whisper-large-v3` / `whisper-large-v3-turbo` | Near-instant transcription speed, generous free tier |
| **Summarization (LLM)** | **DeepSeek** or **OpenAI** | `deepseek-chat` / `gpt-4o-mini` | High-quality reasoning, highly affordable, concise Markdown |

---

## 📦 Installation

### Manual Installation
1. Download the latest `main.js`, `manifest.json`, and `styles.css` from the [Releases](https://github.com/muminkoykiran/Vocalog/releases) page.
2. Create a folder in your vault: `<vault>/.obsidian/plugins/vocalog/`
3. Copy the downloaded files into that folder.
4. Open Obsidian → **Settings** → **Community plugins** → Enable **Vocalog**.

---

## ⚙️ Configuration

Navigate to **Settings → Vocalog**:

### 1. Basic Configuration
- **Audio Folder**: Folder where recordings are stored (e.g. `attachments` or `Inbox/Voice`). Defaults to `Inbox/Voice`.
- **Output Folder**: Folder where daily notes are saved (leave empty for vault root).
- **Daily Note Format**: Date pattern matching your daily notes (default: `YYYY-MM-DD`).

### 2. Speech-to-Text (STT) Settings
- **STT API URL**:
  - *Groq*: `https://api.groq.com/openai/v1/audio/transcriptions`
  - *OpenAI*: `https://api.openai.com/v1/audio/transcriptions`
- **STT API Key**: Your provider API key.
- **STT Model**: `whisper-large-v3` (Groq) or `whisper-1` (OpenAI).

### 3. AI Summarization (LLM) Settings
- **LLM API URL**:
  - *DeepSeek*: `https://api.deepseek.com/v1/chat/completions`
  - *OpenAI*: `https://api.openai.com/v1/chat/completions`
  - *Groq*: `https://api.groq.com/openai/v1/chat/completions`
  - *Local (Ollama)*: `http://localhost:11434/v1/chat/completions`
- **LLM API Key**: Your LLM API key.
- **LLM Model**: `deepseek-chat`, `gpt-4o`, `llama-3.3-70b-versatile`, etc.
- **System Prompt**: Customize how the AI formats your daily notes.

---

## 🎮 How to Use

### 1. Live Recording (Ribbon Icon)
- Click the **Vocalog Studio Mic** icon in the left ribbon to start recording.
- The icon pulses red while you speak.
- Click the icon again to stop: Vocalog automatically transcribes, generates AI notes, and writes to your daily journal!

### 2. Command Palette
- `Vocalog: Start / stop live audio recording`
- `Vocalog: Generate audio notes` (processes today's audio files in the folder)
- `Vocalog: Generate audio notes by date range` (opens interactive calendar modal)
- `Vocalog: Generate from selected audio files` (processes files selected in File Explorer)

### 3. File Explorer Context Menu
- Right-click any `.mp3`, `.m4a`, `.wav`, `.webm`, or `.ogg` file in Obsidian → select **Generate audio note**.

---

## 🔒 Privacy & Security

- **Direct Connections**: Network requests are made directly from your Obsidian client to your configured API endpoints.
- **No Third-Party Middleman**: There are no proxy servers, tracking scripts, or analytics.
- **Credential Storage**: API keys are securely saved only in your local `.obsidian/plugins/vocalog/data.json` file.

---

## 🤝 Contributing & Feedback

Contributions, feature requests, and bug reports are warmly welcome!
- Open an [Issue](https://github.com/muminkoykiran/Vocalog/issues) to report a bug or request a feature.
- Submit a [Pull Request](https://github.com/muminkoykiran/Vocalog/pulls) following standard Git Flow (`feature/...` branches into `develop`).

---

## 📄 License

Distributed under the [MIT License](LICENSE).
