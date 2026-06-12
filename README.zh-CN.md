# Source Mode Image Renderer

<p align="center">
  <img src="imgs/logo-github.avif" alt="Source Mode Image Renderer" width="280">
</p>

你用 Obsidian，你用实时预览模式，你光标往带标记的字上一放，那些隐藏的标记，Biu，弹出来了，把你后面的字挤得老远。光标一挪走，文本又缩回去了。就这来回哆嗦，你刚想好的那句文案，思路直接断在那儿。我管这叫**编辑器多动症**。

Markdown 这个东西，它本来就是为内容和标记共存而设计的。所见即所得，是后来硬加的，是花架子。我直接回到源码模式不就完了？源码模式里，敲的是什么就是什么，星号就是星号，不会消失，不会弹出来，不会挤你的字，不会打断你的思路。这才是写东西该有的样子。

但是源码模式有一个问题，你看不到图。写东西看不到图，这就跟开车没有后视镜一样，能开，但别扭。这个问题不解决，源码模式就不是完整的写作环境。所以 **Source Mode Image Renderer** 诞生了。干的事很简单，你输入图片连接，图片直接在下面渲染出来。

---

在 Obsidian **源码模式**下，自动在图片链接下方实时渲染预览图片。

---


## 功能

- 在源码模式中，`![[图片名.png]]` 语法下方直接显示图片
- 支持通过 `![[图片名.png|300]]` 指定图片显示宽度（单位：px）
- 找不到图片文件时显示友好的错误提示
- 不影响 Live Preview 模式和阅读模式的原生渲染

---

## 安装

### 从 Obsidian 社区插件安装

即将上线。

### 手动安装

1. 前往 [Releases](https://github.com/hiforrest/source-mode-inline-images/releases/latest) 页面，下载最新版本的 `main.js`、`manifest.json`、`styles.css`
2. 在你的 Obsidian 库中，进入 `.obsidian/plugins/` 目录
3. 新建文件夹 `source-mode-inline-images`，将上述三个文件放入其中
4. 在 Obsidian 设置 → 第三方插件 中，关闭「安全模式」，然后启用 **Source Mode Image Renderer**

### 从源码构建

```bash
git clone https://github.com/hiforrest/source-mode-inline-images.git
cd source-mode-inline-images
npm install
npm run build
```

将生成的 `main.js`、`manifest.json`、`styles.css` 复制到插件目录即可。

---

## 使用

切换到**源码模式**后，正常书写图片链接语法，图片会自动显示在链接下方。

```
![[screenshot.png]]
![[assets/photo.jpg|400]]
```

| 语法 | 效果 |
|------|------|
| `![[图片.png]]` | 以默认宽度（最大 480px）显示图片 |
| `![[图片.png\|300]]` | 以 300px 宽度显示图片 |

> **注意**：此插件仅在源码模式下生效。Live Preview 和阅读模式由 Obsidian 原生处理，不受影响。

---

## 限制

- 宽度必须是像素数值
- 暂不支持 `300x200` 等尺寸组合语法
- 仅在严格源码模式下生效，Live Preview 和阅读模式使用 Obsidian 原生渲染

---

## 隐私

此插件不收集遥测数据，不使用网络请求，不访问 Obsidian 库以外的文件。

---

## 开发

```bash
npm install
npm run dev
npm run build
```

---

## 许可证

MIT
