---
title: Hexo 写作与源码备份的完整流程
date: 2026-10-10 23:00:00
tags:
  - Hexo
  - GitHub
  - 备份
categories:
  - 技术笔记
---

这篇是写给以后的自己：怎么写文章、怎么发布、怎么避免再丢源码。

## 日常写作流程

```bash
cd ~/Documents/myblog

# 1. 新建文章，生成 source/_posts/标题.md
hexo new "文章标题"

# 2. 用 VS Code 编辑 md 文件

# 3. 本地预览：http://localhost:4000
hexo s

# 4. 清理、生成、部署
hexo clean && hexo g -d
```

文章顶部的 front-matter 示例：

```yaml
---
title: 文章标题
date: 2026-10-10 21:31:23
tags:
  - 标签
categories:
  - 分类
---
```

想让首页只显示摘要，在正文中加一行 `<!-- more -->`。

## 部署配置

`_config.yml` 末尾：

```yaml
deploy:
  type: git
  repo: https://github.com/用户名/用户名.github.io.git
  branch: master
```

`branch` 要和仓库 Pages 实际使用的分支一致。注意：**部署会用新生成的网页整体覆盖这个分支。**

## 标签页和分类页（Butterfly）

菜单里的"标签""分类"要先创建页面：

```bash
hexo new page tags
hexo new page categories
```

分别在 `source/tags/index.md` 和 `source/categories/index.md` 的 front-matter 里加上 `type: "tags"` 和 `type: "categories"`。

## 重点：把源码备份到 GitHub

线上的 `master` 分支只有生成后的网页。源码要推到**另一个分支**，比如 `hexo`：

```bash
cd ~/Documents/myblog
git init
git checkout -b hexo
git remote add origin https://github.com/用户名/用户名.github.io.git
git add .
git commit -m "hexo source"
git push origin hexo
```

这样仓库里就有两个分支，各司其职：

- `master`：线上网站（`hexo d` 自动更新）
- `hexo`：博客源码（手动提交）

主题用 npm 安装，`node_modules` 默认被 `.gitignore` 忽略，不会冲突。如果以后改用 `git clone` 的方式放主题，要先删掉主题目录里的 `.git`。

## 每次写完文章的习惯

```bash
hexo clean && hexo g -d      # 发布网页
git add .
git commit -m "新增文章：标题"
git push origin hexo          # 备份源码
```

## 换电脑或重装系统时

```bash
git clone -b hexo https://github.com/用户名/用户名.github.io.git blog
cd blog
npm install
hexo s
```

几分钟就能恢复整个博客。

## 小结

> 生成的网页不是源码，源码一定要有备份。

两个分支、两条习惯，就能避免再次误删带来的麻烦。