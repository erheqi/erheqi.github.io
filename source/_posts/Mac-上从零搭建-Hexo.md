---
title: Mac 上从零搭建 Hexo + Butterfly 主题：踩坑全记录
date: 2026-10-10 22:30:00
tags:
  - Hexo
  - Butterfly
  - macOS
categories:
  - 技术笔记
---

这篇记录我在一台 Mac 上从零重新搭建 Hexo 博客的过程，以及一路遇到的问题。

## 1. 安装 Git

第一次运行 `git` 时，终端提示：

```
xcode-select: note: no developer tools were found ...
```

这是 Mac 在要求安装"命令行开发者工具"。在弹出的窗口里点**安装**（不要点"获取 Xcode"），装完后重开终端，用 `git --version` 验证。弹窗没出现就运行 `xcode-select --install`。

## 2. 安装 Node.js

到 nodejs.org 下载 **LTS** 版本的安装包，装完重开终端：

```bash
node -v
npm -v
```

## 3. 全局安装 hexo-cli 遇到 EACCES

```
npm error code EACCES
npm error path /usr/local/lib/node_modules/hexo-cli
```

全局目录需要管理员权限，加 `sudo` 解决：

```bash
sudo npm install -g hexo-cli
```

## 4. npm 缓存目录权限错误

之后运行 `hexo init` 时，依赖安装失败：

```
Your cache folder contains root-owned files
```

这是因为用 `sudo` 装包时，`~/.npm` 里留下了 root 权限的文件。按提示修复即可：

```bash
sudo chown -R 501:20 "/Users/你的用户名/.npm"
```

之后的 `npm install` **不要再加 sudo**。

## 5. 创建博客

```bash
hexo init myblog
cd myblog
npm install
npm install hexo-deployer-git --save
hexo s
```

## 6. 安装 Butterfly 主题

用 npm 安装，主题目录里不会带 `.git`，之后备份源码不会冲突：

```bash
npm install hexo-theme-butterfly
npm install hexo-renderer-pug hexo-renderer-stylus
cp node_modules/hexo-theme-butterfly/_config.yml _config.butterfly.yml
```

然后在 `_config.yml` 里启用主题：

```yaml
theme: butterfly
```

以后改主题设置，都改根目录的 `_config.butterfly.yml`。

## 7. 页面一片空白：主题名拼错

终端提示：

```
WARN  No layout: index.html
```

这说明 Hexo 没找到主题的布局文件。检查配置：

```bash
grep "^theme" _config.yml
```

发现我写成了 `theme: lbutterfly`，多了一个字母 `l`。改成 `butterfly` 就好了。**遇到 `No layout`，先检查主题名拼写。**

## 8. 端口 4000 被占用

```
FATAL Port 4000 has been used.
```

说明上一次的 `hexo s` 还在后台运行。找到并关掉它：

```bash
lsof -i :4000
kill 进程号
```

或者直接换端口：`hexo s -p 4001`。

## 小结

| 问题 | 原因 | 解决 |
|---|---|---|
| xcode-select 提示 | 没装命令行工具 | 点安装 |
| EACCES 全局安装 | 目录权限 | `sudo npm install -g` |
| 缓存目录权限错误 | sudo 留下 root 文件 | `chown` 修复 |
| No layout | 主题名拼错 | 改成 `butterfly` |
| 端口被占用 | 旧进程未关 | `kill` 或换端口 |

报错信息里通常已经写明了原因和解决办法，先认真读一遍。