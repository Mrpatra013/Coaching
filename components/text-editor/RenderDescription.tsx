"use client";

import { useState, useEffect, useMemo } from "react";
import { generateHTML } from "@tiptap/react";
import { type JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import parse from "html-react-parser";

export function RenderDescription({ json }: { json: JSONContent }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const output = useMemo(() => {
    if (!isMounted) return "";
    try {
      return generateHTML(json, [
        StarterKit,
        TextAlign.configure({
          types: ["heading", "paragraph"],
        }),
      ]);
    } catch (error) {
      console.error("Error generating HTML:", error);
      return "";
    }
  }, [json, isMounted]);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="prose dark:prose-invert prose-li:marker:text-primary">
      {parse(output)}
    </div>
  );
}