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
- Vinext / Vite
- Tailwind CSS 4
- shadcn/ui 与 Base UI
- Cloudflare Workers / Wrangler

## 本地运行

环境要求：Node.js `22.13.0` 或更高版本。

```bash
npm install
npm run dev
```

开发服务器启动后，根据终端输出访问本地地址。

## 常用命令

```bash
# 启动开发环境
npm run dev

# 生成生产构建
npm run build

# 本地运行生产构建
npm run start

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
next.config.ts       Vinext / Next 兼容配置
vite.config.ts       Vite 与 Cloudflare 配置
```

## 内容定制

请柬的主要文案、时间线、婚礼流程和场地信息位于 `app/page.tsx`；图片资源位于 `public/assets/`。替换内容时建议保留原有文件名，或同步修改页面中的资源路径。

