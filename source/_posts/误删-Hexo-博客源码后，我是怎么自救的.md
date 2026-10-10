---
title: 误删 Hexo 博客源码后，我是怎么自救的
date: 2026-10-10 22:00:00
tags:
  - Hexo
  - GitHub
  - 踩坑
categories:
  - 技术笔记
---

我不小心删掉了本地的 Hexo 博客文件夹，但线上网站还能正常访问。这篇文章记录当时的判断过程。

## 先搞清楚：线上网站和源码是两回事

`hexo deploy` 推送到 GitHub 的，只是**生成后的静态网页**（html、css、js），不是源码。

| 内容 | 位置 | 作用 |
|---|---|---|
| 静态网页 | GitHub 的 `master` 分支 | 被 GitHub Pages 托管，线上显示 |
| 源码（`source/_posts`、`_config.yml`、`themes`） | 只在本地 | 用来写文章、生成网页 |

所以博客现在正常显示，并不代表源码还在。

## 怎么判断源码有没有备份

在 GitHub 仓库页面看分支列表，逐个点进去，检查根目录有没有：

- `_config.yml`
- `source/`
- `themes/`
- `package.json`

我的仓库有 `master` 和 `main` 两个分支，里面都只有 `index.html`、`css`、`js`、`archives` 这类文件，没有上面几样，说明源码没有备份。

## 先做的事：备份线上内容

重新搭建后，`hexo d` 会**整体覆盖** `master` 分支。动手之前先把线上网页克隆一份：

```bash
git clone -b master https://github.com/用户名/用户名.github.io.git site-backup
```

之后出任何问题，都能从这份备份恢复。

## 本地还能去哪里找

- 废纸篓
- Time Machine 备份
- iCloud、网盘、U 盘
- 终端搜索：`mdfind -name "_config.yml" | grep -v node_modules`

如果都找不到，旧文章的内容还能从 `site-backup` 里的 html 反推，复制正文重新写成 md 即可。

## 小结

1. 线上正常 ≠ 源码还在。
2. 先备份线上内容，再动手。
3. 以后一定要把**源码也推到 GitHub 的另一个分支**。