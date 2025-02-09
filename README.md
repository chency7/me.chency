# Chency's Portfolio

一个使用 Next.js 14 构建的个人作品集网站，包含项目展示、博客和娱乐板块。

## 🌟 特性

- 🎨 优雅的打字机动画效果
- 🌓 深色主题设计
- 🚀 基于 Next.js 14 的 App Router
- 📱 响应式设计
- 🔤 自定义字体加载
- ✨ 粒子动画背景
- 📊 项目访问统计
- 📝 MDX 内容管理

## 🛠 技术栈

- **框架**: Next.js 14
- **样式**: Tailwind CSS
- **内容**: ContentLayer + MDX
- **字体**:
  - Inter
  - LXGW WenKai
  - Pacifico
  - CalSans
- **动画**: Framer Motion
- **数据库**: Upstash Redis
- **部署**: Vercel

## 🚀 快速开始

1. 克隆仓库

```bash
git clone https://github.com/chency7/me.chency.git
```

1. 安装依赖

```bash
pnpm install
```

1. 配置环境变量

```bash
cp .env.example .env.local
```

然后编辑 `.env.local` 文件，填入必要的环境变量。

1. 启动开发服务器

```bash
pnpm dev
```

现在你可以访问 `http://localhost:3000` 查看网站了！

## 📝 内容管理

项目使用 ContentLayer 管理 MDX 内容：

- `content/projects/`: 存放项目展示的 MDX 文件
- `content/pages/`: 存放页面内容的 MDX 文件

## 🎨 自定义主题

通过修改 `tailwind.config.js` 自定义主题样式：

- 颜色主题
- 动画效果
- 字体设置
- 响应式断点

## 📦 可用脚本

- `pnpm dev`: 启动开发服务器
- `pnpm build`: 构建生产版本
- `pnpm start`: 启动生产服务器
- `pnpm lint`: 运行 ESLint 检查
- `pnpm format`: 格式化代码
- `pnpm clean`: 清理构建文件
- `pnpm clean:all`: 清理所有生成的文件

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可

MIT License © 2024 Chency
