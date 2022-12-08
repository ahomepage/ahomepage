import { Editor, rootCtx, defaultValueCtx } from "@milkdown/core";
import { listener, listenerCtx } from "@milkdown/plugin-listener";
import { cursor } from "@milkdown/plugin-cursor";
import { gfm } from "@milkdown/preset-gfm";
import { nord } from "@milkdown/theme-nord";
import { ReactEditor, useEditor } from "@milkdown/react";
import type { WidgetProps } from "layer/grid";

import "widgets/note/index.css";

function Note({ storage = "", setStorage, id }: WidgetProps) {
  const { editor } = useEditor((root) => {
    let defaultValue = {};
    if (storage) {
      try {
        defaultValue = JSON.parse(storage);
      } catch (_) {
        console.error(`Parse storage error: key[${id}]`);
      }
    }
    return Editor.make()
      .config((ctx) => {
        ctx.set(rootCtx, root.parentElement);
        if (Object.keys(defaultValue).length) {
          ctx.set(defaultValueCtx, {
            type: "json",
            value: defaultValue,
          });
        }
        ctx.get(listenerCtx).updated((_, doc) => {
          if (setStorage) {
            let storage = "";
            try {
              storage = JSON.stringify(doc.toJSON());
            } catch (_) {
              console.error(`Stringify storage error: key[${id}]`);
            }
            setStorage(storage);
          }
        });
      })
      .use(listener)
      .use(nord)
      .use(cursor)
      // .use(diagram)
      .use(gfm);
  });

  return <ReactEditor editor={editor} />;
}
Note.minH = 3;
Note.minW = 3;
Note.title = '笔记';

export default Note;
