# 生日密室：GitHub Pages 部署说明

## 1. 先把这个修订版项目提交到你的 GitHub 仓库

仓库：https://github.com/lxshstm/pixel-perfect-picture-481

在此文件夹内打开终端，**如果你尚未在本机克隆过 Git 仓库，推荐先克隆再覆盖文件**：

```bash
git clone https://github.com/lxshstm/pixel-perfect-picture-481.git
cd pixel-perfect-picture-481
```

然后将压缩包内的所有文件及子文件夹复制到克隆目录（覆盖同名文件，**不要复制一个多余的外层目录**）。

```bash
git add .
git commit -m "Add static GitHub Pages deployment"
git push origin main
```

如果 GitHub 仓库是私有的，需确认当前账户计划支持该仓库的 GitHub Pages。

## 2. 开启 Pages

GitHub 仓库 → Settings → Pages → Build and deployment → Source：选择 **GitHub Actions**。

去 Actions 标签页，查看 `Deploy Birthday Game to GitHub Pages` 是否成功（绿色对号）。如尚未执行，点击 Run workflow 手动执行。

打开：https://lxshstm.github.io/pixel-perfect-picture-481/

## 3. 发布原理

- 原 `vite.config.ts` 不变，Lovable 的原有构建方式不变。
- 新增 `vite.config.pages.ts` 只供 Pages 使用，将 TanStack Start 切换为 SPA 静态模式。
- `src/router.tsx` 以 `import.meta.env.BASE_URL` 作为路由 basepath，适配 GitHub 仓库子路径。
- `.github/workflows/deploy-pages.yml` 用 Bun 安装锁定依赖并构建，然后将 `dist/client/_shell.html` 复制为 `index.html` 和 `404.html`。
- 构建后的 `dist/client` 会自动上传 GitHub Pages。
- 九宫格拼图仍为 3×3，游戏功能代码未变。

## 4. 注意事项

本修订版已经完成文件级校验，**但由于本环境无法连到 npm/Bun 依赖仓库，尚未实际完成在线构建与浏览器测试**。如 Actions 出现红色失败，请复制失败日志中第一条 Error；不要盲目重复改动游戏代码。

因为 GitHub Pages 没有服务端，未来如果往游戏添加 `createServerFn` 或 `/api` 路由，静态版本不能直接使用这些服务端功能。当前游戏主要用浏览器本地状态。

如果 GitHub Pages 地址在你的网络（特别是某些中国大陆网络环境）打不开，换用原 Lovable 链接或专用支持 SSR 的平台。
