# Source Mode Inline Images

<p align="center">
  <img src="imgs/logo-github.avif" alt="Source Mode Inline Images" width="280">
</p>

So you're using Obsidian in Live Preview mode. You move your cursor over a formatted word and boom, the hidden markdown syntax pops out and shoves your text halfway across the screen. This constant jumping is a total flow-killer. I call it **Editor ADHD**.

Markdown was originally built for the content and the syntax to live together. Why not just go back to Source Mode? In Source Mode, what you see is exactly what you typed. Asterisks stay asterisks. Nothing disappears, nothing jumps out, and nothing breaks your focus. That's how writing is supposed to feel.

But Source Mode has one big catch: you can't see your images. Trying to write without visuals is like driving a car without a rearview mirror. That's where the **Source Mode Inline Images** plugin comes in. It does one simple thing: you type the image link, and the image renders right there below it.

---

Render image previews directly below image links in Obsidian Source mode.

---

## Features

- Shows previews below `![[image.png]]` links in Source mode.
- Supports width syntax such as `![[image.png|300]]`.
- Shows a friendly message when the image file cannot be found.
- Does not affect Live Preview or Reading View.

## Installation

### From Obsidian Community Plugins

Search for "Source Mode Inline Images" in Obsidian's Community Plugins browser.

### Manual installation

1. Download `main.js`, `manifest.json`, and `styles.css` from the [latest release](https://github.com/hiforrest/source-mode-inline-images/releases/latest).
2. Copy them to your vault's `.obsidian/plugins/source-mode-inline-images/` folder.
3. Reload Obsidian and enable the plugin in Settings → Community plugins.

## Usage

Add an image embed in Source mode:

```md
![[example.png]]
![[example.png|300]]
```

| Syntax | Result |
|--------|--------|
| `![[image.png]]` | Displays image with default max width (480px) |
| `![[image.png\|300]]` | Displays image with 300px width |

## Limitations

- Width must be a number in pixels.
- Caption and size combinations such as `300x200` are not supported yet.
- Only works in strict Source mode. Live Preview and Reading View use Obsidian's native rendering.

## Privacy

This plugin does not collect telemetry, does not use network requests, and does not access files outside your Obsidian vault.

## Development

```bash
npm install
npm run dev
npm run build
```

## License

MIT

---

中文说明：[README.zh-CN.md](README.zh-CN.md)
