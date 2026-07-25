# Vocalog

English | [简体中文](README.zh-CN.md)

Obsidian plugin for automatic audio transcription and AI-powered note generation.

## Features

- 🎤 Automatic transcription using STT API
- 🤖 AI-powered summaries using LLM (OpenAI-compatible)
- 📝 Automatic writing to daily notes
- 📅 Batch processing by date range
- 🗓️ Calendar interface for date selection

## Installation

### From Obsidian Community Plugins (Recommended)
[To be available after community review]

### Manual Installation
1. Download the latest release from GitHub
2. Extract to `<vault>/.obsidian/plugins/vocalog/`
3. Reload Obsidian and enable the plugin

## Configuration

Open Settings → Vocalog to configure:

### Required Settings
1. **Audio Folder**: Where your audio recordings are stored (e.g., `Inbox/Voice`)
2. **STT API Configuration**:
   - API URL (Whisper-compatible endpoint)
   - API Key
   - Model name (default: `whisper-1`)
3. **LLM API Configuration**:
   - API URL (OpenAI Chat-compatible endpoint)
   - API Key
   - Model name (default: `deepseek-chat`)
   - System Prompt (customize how notes are structured)

### Optional Settings
- **Output Folder**: Where to save daily notes (defaults to vault root)
- **Daily Note Format**: Date format pattern (default: `YYYY-MM-DD`)

## Usage

### Generate Notes from Today's Audio
Click the microphone ribbon icon or use command: `Vocalog: Generate Audio Notes`

### Process Specific Dates
Use command: `Vocalog: Generate Audio Notes by Date Range`

### Process Selected Files
Select audio files in file explorer, then use command: `Vocalog: Generate from Selected Audio Files`

### Context Menu
Right-click any audio file → `🎤 Generate Audio Note`

## API Compatibility

This plugin works with OpenAI-compatible APIs:

**STT (Speech-to-Text)**:
- Compatible with OpenAI Whisper API format
- Tested with: OpenAI Whisper, Groq Whisper

**LLM (Summarization)**:
- Compatible with OpenAI Chat Completion API format
- Tested with: OpenAI GPT models, DeepSeek, other OpenAI-compatible services

## Network and Data Use

Vocalog only sends data when you run a transcription or summarization command.

- Audio files you choose to process are sent to the configured speech-to-text API endpoint.
- Generated transcripts are sent to the configured AI summarization API endpoint.
- API keys are stored locally in this plugin's Obsidian settings data.
- Vocalog does not collect analytics, telemetry, or tracking data.

## License

MIT

## Contributing

Contributions welcome! This is a "vibe coding" project developed with Claude AI assistance.
