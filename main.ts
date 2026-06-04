import { Plugin, TFile } from "obsidian";
import {
  Decoration,
  DecorationSet,
  EditorView,
  ViewPlugin,
  ViewUpdate,
  WidgetType,
} from "@codemirror/view";
import { RangeSetBuilder } from "@codemirror/state";

class ImageWidget extends WidgetType {
  constructor(
    private readonly src: string,
    private readonly width?: string,
    private readonly errorText?: string
  ) {
    super();
  }

  toDOM() {
    const wrapper = document.createElement("div");
    wrapper.addClass("source-mode-inline-image-wrapper");

    if (!this.src) {
      wrapper.setText(this.errorText ?? "图片路径为空");
      wrapper.addClass("source-mode-inline-image-error");
      return wrapper;
    }

    const img = document.createElement("img");
    img.addClass("source-mode-inline-image");
    img.src = this.src;

    if (this.width) {
      img.style.width = `${this.width}px`;
      img.style.maxWidth = `${this.width}px`;
    } else {
      img.style.maxWidth = "480px";
    }

    img.style.height = "auto";
    img.style.display = "block";
    img.style.margin = "8px 0";

    img.onerror = () => {
      wrapper.setText(`图片加载失败: ${this.src}`);
      wrapper.addClass("source-mode-inline-image-error");
    };

    wrapper.appendChild(img);
    return wrapper;
  }

  ignoreEvent() {
    return false;
  }
}

export default class SourceModeInlineImagesPlugin extends Plugin {
  async onload() {
    const plugin = this;

    this.registerEditorExtension([
      ViewPlugin.fromClass(
        class {
          decorations: DecorationSet;

          constructor(view: EditorView) {
            this.decorations = buildDecorations(view, plugin);
          }

          update(update: ViewUpdate) {
            if (
              update.docChanged ||
              update.viewportChanged ||
              update.selectionSet
            ) {
              this.decorations = buildDecorations(update.view, plugin);
            }
          }
        },
        {
          decorations: (value) => value.decorations,
        }
      ),
    ]);
  }
}

function buildDecorations(
  view: EditorView,
  plugin: SourceModeInlineImagesPlugin
): DecorationSet {
  const builder = new RangeSetBuilder<Decoration>();

  const activeLeaf = plugin.app.workspace.activeLeaf;
  if (!activeLeaf) return builder.finish();

  // 只在严格源码模式下生效，Live Preview 模式跳过（避免与 Obsidian 原生渲染重复）
  const viewState = (activeLeaf as any).getViewState?.();
  if (viewState?.state?.source !== true) return builder.finish();

  const activeFile = plugin.app.workspace.getActiveFile();
  if (!activeFile) return builder.finish();

  const sourcePath = activeFile.path;
  const wikiImageRegex = /!\[\[([^\]|]+)(?:\|(\d+))?\]\]/g;

  for (const { from, to } of view.visibleRanges) {
    const text = view.state.doc.sliceString(from, to);
    let match: RegExpExecArray | null;

    while ((match = wikiImageRegex.exec(text)) !== null) {
      const fullMatch = match[0];
      const imagePath = match[1].trim();
      const width = match[2];

      const start = from + match.index;
      const end = start + fullMatch.length;

      const file = plugin.app.metadataCache.getFirstLinkpathDest(
        imagePath,
        sourcePath
      );

      if (!(file instanceof TFile)) {
        builder.add(
          end,
          end,
          Decoration.widget({
            widget: new ImageWidget("", width, `找不到图片文件: ${imagePath}`),
            side: 1,
          })
        );
        continue;
      }

      const resourcePath = plugin.app.vault.getResourcePath(file);

      builder.add(
        end,
        end,
        Decoration.widget({
          widget: new ImageWidget(resourcePath, width),
          side: 1,
        })
      );
    }
  }

  return builder.finish();
}

