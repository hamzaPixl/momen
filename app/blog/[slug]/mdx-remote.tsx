"use client";

import React from "react";

interface MDXRemoteProps {
  source: string;
}

/**
 * Simple Markdown renderer for blog post content.
 * Converts the raw markdown string (stripped of frontmatter by gray-matter)
 * into styled React elements. The prose container in the parent applies
 * typography styles via @tailwindcss/typography.
 */
export function MDXRemote({ source }: MDXRemoteProps) {
  const lines = source.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;
  let key = 0;

  function nextKey() {
    return key++;
  }

  function parseInline(text: string): React.ReactNode {
    const parts: React.ReactNode[] = [];
    const regex = /(\*\*(.+?)\*\*)|(\*(.+?)\*)|(`(.+?)`)/g;
    let last = 0;
    let match;
    while ((match = regex.exec(text)) !== null) {
      if (match.index > last) {
        parts.push(text.slice(last, match.index));
      }
      if (match[1]) {
        parts.push(<strong key={nextKey()}>{match[2]}</strong>);
      } else if (match[3]) {
        parts.push(<em key={nextKey()}>{match[4]}</em>);
      } else if (match[5]) {
        parts.push(<code key={nextKey()}>{match[6]}</code>);
      }
      last = regex.lastIndex;
    }
    if (last < text.length) {
      parts.push(text.slice(last));
    }
    return parts.length === 1 ? parts[0] : parts;
  }

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith("# ")) {
      elements.push(<h1 key={nextKey()}>{parseInline(line.slice(2))}</h1>);
      i++;
    } else if (line.startsWith("## ")) {
      elements.push(<h2 key={nextKey()}>{parseInline(line.slice(3))}</h2>);
      i++;
    } else if (line.startsWith("### ")) {
      elements.push(<h3 key={nextKey()}>{parseInline(line.slice(4))}</h3>);
      i++;
    } else if (line.startsWith("#### ")) {
      elements.push(<h4 key={nextKey()}>{parseInline(line.slice(5))}</h4>);
      i++;
    } else if (line.startsWith("> ")) {
      elements.push(
        <blockquote key={nextKey()}>{parseInline(line.slice(2))}</blockquote>,
      );
      i++;
    } else if (line.startsWith("- ") || line.startsWith("* ")) {
      const items: React.ReactNode[] = [];
      while (
        i < lines.length &&
        (lines[i].startsWith("- ") || lines[i].startsWith("* "))
      ) {
        items.push(
          <li key={nextKey()}>{parseInline(lines[i].slice(2))}</li>,
        );
        i++;
      }
      elements.push(<ul key={nextKey()}>{items}</ul>);
    } else if (/^\d+\. /.test(line)) {
      const items: React.ReactNode[] = [];
      while (i < lines.length && /^\d+\. /.test(lines[i])) {
        items.push(
          <li key={nextKey()}>
            {parseInline(lines[i].replace(/^\d+\. /, ""))}
          </li>,
        );
        i++;
      }
      elements.push(<ol key={nextKey()}>{items}</ol>);
    } else if (line.trim() === "---" || line.trim() === "***") {
      elements.push(<hr key={nextKey()} />);
      i++;
    } else if (line.trim() === "") {
      i++;
    } else {
      elements.push(<p key={nextKey()}>{parseInline(line)}</p>);
      i++;
    }
  }

  return <>{elements}</>;
}
