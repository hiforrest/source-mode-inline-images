var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// main.ts
var main_exports = {};
__export(main_exports, {
  default: () => SourceModeInlineImagesPlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian = require("obsidian");
var import_view = require("@codemirror/view");
var import_state = require("@codemirror/state");
var ImageWidget = class extends import_view.WidgetType {
  constructor(src, width, errorText) {
    super();
    this.src = src;
    this.width = width;
    this.errorText = errorText;
  }
  toDOM() {
    var _a;
    const wrapper = document.createElement("div");
    wrapper.addClass("source-mode-inline-image-wrapper");
    if (!this.src) {
      wrapper.setText((_a = this.errorText) != null ? _a : "\u56FE\u7247\u8DEF\u5F84\u4E3A\u7A7A");
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
      wrapper.setText(`\u56FE\u7247\u52A0\u8F7D\u5931\u8D25: ${this.src}`);
      wrapper.addClass("source-mode-inline-image-error");
    };
    wrapper.appendChild(img);
    return wrapper;
  }
  ignoreEvent() {
    return false;
  }
};
var SourceModeInlineImagesPlugin = class extends import_obsidian.Plugin {
  async onload() {
    const plugin = this;
    this.registerEditorExtension([
      import_view.ViewPlugin.fromClass(
        class {
          constructor(view) {
            this.decorations = buildDecorations(view, plugin);
          }
          update(update) {
            if (update.docChanged || update.viewportChanged || update.selectionSet) {
              this.decorations = buildDecorations(update.view, plugin);
            }
          }
        },
        {
          decorations: (value) => value.decorations
        }
      )
    ]);
  }
};
function buildDecorations(view, plugin) {
  var _a, _b;
  const builder = new import_state.RangeSetBuilder();
  const activeLeaf = plugin.app.workspace.activeLeaf;
  if (!activeLeaf) return builder.finish();
  const viewState = (_a = activeLeaf.getViewState) == null ? void 0 : _a.call(activeLeaf);
  if (((_b = viewState == null ? void 0 : viewState.state) == null ? void 0 : _b.source) !== true) return builder.finish();
  const activeFile = plugin.app.workspace.getActiveFile();
  if (!activeFile) return builder.finish();
  const sourcePath = activeFile.path;
  const wikiImageRegex = /!\[\[([^\]|]+)(?:\|(\d+))?\]\]/g;
  for (const { from, to } of view.visibleRanges) {
    const text = view.state.doc.sliceString(from, to);
    let match;
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
      if (!(file instanceof import_obsidian.TFile)) {
        builder.add(
          end,
          end,
          import_view.Decoration.widget({
            widget: new ImageWidget("", width, `\u627E\u4E0D\u5230\u56FE\u7247\u6587\u4EF6: ${imagePath}`),
            side: 1
          })
        );
        continue;
      }
      const resourcePath = plugin.app.vault.getResourcePath(file);
      builder.add(
        end,
        end,
        import_view.Decoration.widget({
          widget: new ImageWidget(resourcePath, width),
          side: 1
        })
      );
    }
  }
  return builder.finish();
}
