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
    const wrapper = activeDocument.createElement("div");
    wrapper.addClass("source-mode-inline-image-wrapper");
    if (!this.src) {
      wrapper.setText((_a = this.errorText) != null ? _a : "Image path is empty");
      wrapper.addClass("source-mode-inline-image-error");
      return wrapper;
    }
    if (this.width) {
      wrapper.style.setProperty("--source-mode-inline-image-width", `${this.width}px`);
      wrapper.addClass("source-mode-inline-image-wrapper--custom-width");
    }
    const img = activeDocument.createElement("img");
    img.addClass("source-mode-inline-image");
    img.src = this.src;
    img.onerror = () => {
      wrapper.setText(`Failed to load image: ${this.src}`);
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
    const { app } = this;
    this.registerEditorExtension([
      import_view.ViewPlugin.fromClass(
        class {
          constructor(view) {
            this.decorations = buildDecorations(view, app);
          }
          update(update) {
            if (update.docChanged || update.viewportChanged || update.selectionSet) {
              this.decorations = buildDecorations(update.view, app);
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
function isStrictSourceMode(app) {
  var _a;
  const markdownView = app.workspace.getActiveViewOfType(import_obsidian.MarkdownView);
  if (!markdownView) return false;
  const state = (_a = markdownView.getState) == null ? void 0 : _a.call(markdownView);
  return (state == null ? void 0 : state.source) === true;
}
function buildDecorations(view, app) {
  const builder = new import_state.RangeSetBuilder();
  if (!isStrictSourceMode(app)) return builder.finish();
  const activeFile = app.workspace.getActiveFile();
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
      const file = app.metadataCache.getFirstLinkpathDest(
        imagePath,
        sourcePath
      );
      if (!(file instanceof import_obsidian.TFile)) {
        builder.add(
          end,
          end,
          import_view.Decoration.widget({
            widget: new ImageWidget("", width, `Image not found: ${imagePath}`),
            side: 1
          })
        );
        continue;
      }
      const resourcePath = app.vault.getResourcePath(file);
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
