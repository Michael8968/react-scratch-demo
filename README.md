# React Scratch Demo

一个基于 React + TypeScript + Vite 的 Scratch 编辑器集成项目，可以在网页中运行完整的 Scratch 编辑器，支持创建、编辑和导出 Scratch 项目。

## 功能特性

- 🎨 **Scratch 编辑器集成** - 在网页中运行完整的 Scratch 编辑器界面
- 📦 **项目导出** - 支持将 Scratch 项目导出为 `.sb3` 文件
- 🎮 **项目播放器** - 支持嵌入和播放来自 scratch.mit.edu 的 Scratch 项目
- ⚡ **现代化技术栈** - 使用 React 18、TypeScript 和 Vite 构建
- 🚀 **快速开发** - 支持热模块替换（HMR）和快速构建

## 技术栈

- **框架**: React 18.3.1
- **语言**: TypeScript 5.8.3
- **构建工具**: Vite 6.3.5
- **Scratch 核心库**:
  - `@scratch/scratch-gui` - Scratch 图形用户界面
  - `scratch-vm` - Scratch 虚拟机
  - `scratch-blocks` - Scratch 积木块系统
  - `scratch-render` - Scratch 渲染引擎
  - `scratch-audio` - Scratch 音频处理

## 项目结构

```
react-scratch-demo/
├── src/
│   ├── components/
│   │   ├── ScratchEditor.tsx    # Scratch 编辑器组件
│   │   ├── ScratchPlayer.tsx    # Scratch 项目播放器组件
│   │   └── render-gui.tsx       # GUI 渲染逻辑
│   ├── App.tsx                  # 主应用组件
│   └── download-blob.ts         # 文件下载工具
├── public/
│   └── scratch/                 # Scratch GUI 静态资源
└── package.json
```

## 快速开始

### 安装依赖

```bash
npm install
# 或
yarn install
```

### 开发模式

```bash
npm run start
# 或
yarn start
```

访问 http://localhost:5173 查看应用。

### 构建生产版本

```bash
npm run build
# 或
yarn build
```

### 预览生产构建

```bash
npm run preview
# 或
yarn preview
```

### 部署到 GitHub Pages

```bash
npm run deploy
# 或
yarn deploy
```

## 使用说明

### 编辑器模式

项目默认运行在编辑器模式，你可以：
- 使用完整的 Scratch 编辑器创建和编辑项目
- 通过消息通信机制导出项目为 `.sb3` 文件

### 播放器模式

切换到播放器模式后，可以：
- 通过项目 ID 嵌入和播放来自 scratch.mit.edu 的 Scratch 项目

## 开发说明

### 消息通信

应用通过 `postMessage` API 与嵌入的 Scratch 编辑器进行通信：

- **导出项目**: 向 iframe 发送 `EXPORT_PROJECT` 消息
- **接收导出数据**: 监听 `PROJECT_EXPORTED` 消息，获取项目数据并下载

### 配置

项目配置了 GitHub Pages 部署路径（`/react-scratch-demo/`），如需修改，请更新 `vite.config.ts` 中的 `base` 配置。

## 许可证

MIT

## 相关链接

- [Scratch 官网](https://scratch.mit.edu)
- [Scratch GUI GitHub](https://github.com/scratchfoundation/scratch-gui)
- [React 文档](https://react.dev)
- [Vite 文档](https://vitejs.dev)
