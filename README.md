# Source Mode Inline Images

Render image previews directly below image links in Obsidian Source mode.

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
