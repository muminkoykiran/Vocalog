# Vocalog

[English](README.md) | [简体中文](README.zh-CN.md)

Obsidian 插件，自动进行音频转录并生成 AI 笔记。

## 功能特性

- 🎤 使用 STT API 自动转录
- 🤖 使用 LLM 生成 AI 摘要（兼容 OpenAI 格式）
- 📝 自动写入每日笔记
- 📅 按日期范围批量处理
- 🗓️ 日历界面选择日期

## 安装

### 从 Obsidian 社区插件安装（推荐）
[待社区审核后可用]

### 手动安装
1. 从 GitHub 下载最新版本
2. 解压到 `<vault>/.obsidian/plugins/vocalog/`
3. 重启 Obsidian 并启用插件

## 配置

打开 设置 → Vocalog 进行配置：

### 必需设置
1. **音频文件夹**: 存放录音的文件夹（例如：`Inbox/Voice`）
2. **STT API 配置**:
   - API URL（Whisper 兼容的端点）
   - API Key
   - 模型名称（默认：`whisper-1`）
3. **LLM API 配置**:
   - API URL（OpenAI Chat 兼容的端点）
   - API Key
   - 模型名称（默认：`deepseek-chat`）
   - 系统提示词（自定义笔记结构）

### 可选设置
- **输出文件夹**: 每日笔记保存位置（默认为仓库根目录）
- **每日笔记格式**: 日期格式模式（默认：`YYYY-MM-DD`）

## 使用方法

### 生成今日音频笔记
点击麦克风图标或使用命令：`Vocalog: Generate Audio Notes`

### 处理特定日期
使用命令：`Vocalog: Generate Audio Notes by Date Range`

### 处理选中文件
在文件浏览器中选中音频文件，然后使用命令：`Vocalog: Generate from Selected Audio Files`

### 右键菜单
右键点击任意音频文件 → `🎤 Generate Audio Note`

## API 兼容性

本插件兼容 OpenAI 格式的 API：

**STT (语音转文字)**:
- 兼容 OpenAI Whisper API 格式
- 已测试：OpenAI Whisper、Groq Whisper

**LLM (摘要生成)**:
- 兼容 OpenAI Chat Completion API 格式
- 已测试：OpenAI GPT 系列、DeepSeek 及其他 OpenAI 兼容服务

## 网络与数据使用

Vocalog 只会在你运行转录或摘要命令时发送数据。

- 你选择处理的音频文件会发送到已配置的语音转文字 API 端点。
- 生成的转录文本会发送到已配置的 AI 摘要 API 端点。
- API Key 保存在本插件的 Obsidian 本地设置数据中。
- Vocalog 不收集分析、遥测或追踪数据。

## 许可证

MIT

## 贡献

欢迎贡献！这是一个与 Claude AI 协作开发的"氛围编程"项目。
