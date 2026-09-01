# Wedding Invitation

一份以“红线装订两个人生”为视觉线索的互动婚礼请柬。访客可以从封面启封请柬，在目录页浏览恋爱故事、照片档案、婚礼日程与周边游玩信息。

## 功能

- 沉浸式请柬封面与启封交互
- 红线主题栏目导航
- 恋爱时间线与照片展示
- 婚礼日期、流程及场地信息
- 场地图片弹窗浏览
- 周边游玩建议
- 适配移动端的单页交互体验

## 技术栈

- React 19
- TypeScript
- Next.js 16（App Router，静态导出）
- Tailwind CSS 4
- shadcn/ui 与 Base UI
- Vercel

## 本地运行

环境要求：Node.js `22.13.0` 或更高版本。

```bash
npm install
npm run dev
```

开发服务器默认运行在 `http://localhost:3000`。

## 常用命令

```bash
# 启动开发环境
npm run dev

# 生成生产构建
npm run build

# 代码检查
npm run lint

# 代码格式化
npm run format
```

## 项目结构

```text
app/                 页面与全局样式
components/          通用 UI 组件
hooks/               React Hooks
lib/                 工具函数
public/assets/       请柬图片资源
next.config.ts       Next.js 静态导出配置
postcss.config.mjs   Tailwind CSS PostCSS 配置
```

## 内容定制

请柬的主要文案、时间线、婚礼流程和场地信息位于 `app/page.tsx`；图片资源位于 `public/assets/`。替换内容时建议保留原有文件名，或同步修改页面中的资源路径。

## Vercel 部署

项目使用标准 Next.js 构建链，并通过 `output: 'export'` 在 `out/` 目录生成纯静态站点。将 GitHub 仓库导入 Vercel 后使用默认的 Next.js Framework Preset 和 `npm run build` 即可，无需配置 `vercel.json` 或自定义输出目录。

推荐将 Vercel 的 Production Branch 设置为 `prod`：

- `prod`：生产部署
- `dev`：集成预览
- `codex/*`：开发预览

在阿里云管理的域名可以继续使用阿里云 DNS。先在 Vercel 项目 Domains 中添加域名，再按照 Vercel 控制台给出的实际记录值，在阿里云云解析中添加或修改对应的 CNAME/A 记录。建议先使用独立子域名，避免覆盖根域名、邮箱或其他现有业务记录。

> Vercel 自定义域名和 HTTPS 不等同于中国大陆境内 CDN。若大陆网络实测不稳定，可直接将同一份 `out/` 部署到阿里云 OSS + CDN 或其他支持大陆节点的平台。

