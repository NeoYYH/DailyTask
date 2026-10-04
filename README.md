# DailyTask

Ponytail 的**中文线上使用指南**（静态站点，可直接用 GitHub Pages 发布）。

- 本地打开：把 `docs/` 目录用 HTTP 服务起来（见下方）
- 所写产品：[DietrichGebert/ponytail](https://github.com/DietrichGebert/ponytail) v4.10.3
- 指南入口：[docs/index.html](docs/index.html)

## 打开指南

在仓库根目录执行：

```bash
python3 -m http.server 8080 --directory docs
```

浏览器打开 http://127.0.0.1:8080/

也可以直接用浏览器打开 `docs/index.html`（搜索、复制命令仍可用）。

## 发布到 GitHub Pages

1. 仓库 **Settings → Pages**
2. Source 选 **Deploy from a branch**
3. Branch 选 `main`（或包含 `docs/` 的分支），Folder 选 `/docs`
4. 保存后站点地址为 `https://<用户名>.github.io/DailyTask/`

不需要 Jekyll：已放置 `docs/.nojekyll`。
