"use client"
import {EditorContent, useEditor} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Menubar } from "./Menubar";
import TextAlign from "@tiptap/extension-text-align";


export function Editor({field}:{field:any}) {
  const editor = useEditor({
    extensions: [StarterKit, TextAlign.configure({ types: ["heading", "paragraph"] })],
    immediatelyRender: false,
    editorProps:{
      attributes:{
        class: 'min-h-[300px] p-4 prose prose-sm sm:prose lg:prose-lg xl:prose-xl dark:prose-invert !w-full !max-w-none'
      }
    },
    onUpdate: ({editor})=>{
      field.onChange(JSON.stringify(editor.getJSON()))  
    },

    content: field.value ? JSON.parse(field.value):'<p>hello</p>'
  })

  return (
    <div className="w-full border border-input rounded-lg overflow-hidden dark:bg-input/30">
      <Menubar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  )
}