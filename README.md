# 翼世界夢想領域（封存版）

灆洢個人空間 [knightzone.studio](https://knightzone.studio) 的靜態網站封存，部署在 GitHub Pages。

原站使用 WordPress + 自製主題 `knightzone-wordpress-theme`，所有文章皆以 Markdown 撰寫。此封存版將 1078 篇文章與 15 個頁面從 WordPress 資料庫抽出為 `.md`，並用 [Astro](https://astro.build) 以 SSG 形式重新呈現。

## 結構

```
.
├── src/
│   ├── content/        # 1078 posts + 15 pages 的 .md
│   ├── pages/          # Astro 動態路由
│   ├── components/
│   ├── layouts/
│   ├── lib/            # site config、posts utilities
│   └── styles/         # 從原主題移植的 CSS
├── public/
│   ├── theme/          # 原主題的圖片
│   ├── uploads/        # WordPress uploads（已移除未引用的縮圖變體）
│   └── raw/            # 原站 /raw 內容
├── scripts/
│   ├── extract_posts.py # 從 MySQL dump 抽出 Markdown
│   └── rewrite_urls.py  # 將 knightzone.studio URL 轉為本地路徑
├── docker/             # 本機 MySQL + WordPress 還原環境
├── astro.config.mjs
└── .github/workflows/deploy.yml
```

## 本機開發

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # 輸出 ./dist
```

## 重新抽取資料

需求：Docker 已啟動，docker compose 設定在 `docker/`。

```bash
# 1. 啟動 MySQL + WordPress
cd docker && docker compose up -d

# 2. 抽出 .md
./scripts/.venv/bin/python scripts/extract_posts.py

# 3. URL 重寫
./scripts/.venv/bin/python scripts/rewrite_urls.py
```

## 部署

Push 到 `main` branch 即透過 GitHub Actions 自動部署。

## 已知差異

- 原 Adobe Typekit `source-han-serif-tc` 改用 Google Fonts `Noto Serif TC` 替代
- 文章內含的 `[latex]...[/latex]`、`[audio]`、`[video]` shortcode 未轉換（極少數）
- 留言區未保留
- 原站 `/games/` 目錄（406MB）未納入，相關連結會 404
