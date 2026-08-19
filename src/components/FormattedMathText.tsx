import React, { useMemo } from 'react';
import katex from 'katex';

interface FormattedMathTextProps {
  text: string;
  className?: string;
  paragraphClassName?: string;
}

/**
 * Helper to render inline text with LaTeX math support.
 * Replaces $...$ or \(...\) or standard mathematical tokens with KaTeX rendered HTML.
 */
function renderInlineMath(text: string): string {
  if (!text) return '';

  // First replace $$...$$ display math blocks
  const displayMathRegex = /\$\$([\s\S]+?)\$\$/g;
  let processed = text.replace(displayMathRegex, (_, rawLatex) => {
    try {
      return katex.renderToString(rawLatex.trim(), {
        displayMode: true,
        throwOnError: false,
        output: 'htmlAndMathml',
      });
    } catch {
      return rawLatex;
    }
  });

  // Then replace inline math $...$ or \(...\)
  const mathRegex = /(\$[^$]+\$|\\\([^\)]+\\\))/g;
  return processed.replace(mathRegex, (match) => {
    const rawLatex = match.startsWith('$')
      ? match.slice(1, -1)
      : match.slice(2, -2);
    try {
      return katex.renderToString(rawLatex.trim(), {
        displayMode: false,
        throwOnError: false,
        output: 'htmlAndMathml',
      });
    } catch {
      return match;
    }
  });
}

export const FormattedMathText: React.FC<FormattedMathTextProps> = ({
  text,
  className = '',
  paragraphClassName = 'text-base text-slate-700 dark:text-slate-300 leading-relaxed',
}) => {
  const blocks = useMemo(() => {
    if (!text) return [];

    // Split by double newline to identify paragraphs and lists
    const rawParagraphs = text.split(/\n\s*\n/);

    return rawParagraphs.map((para) => {
      const trimmed = para.trim();
      const lines = trimmed.split('\n').map((l) => l.trim()).filter(Boolean);

      // Check if this block is an unordered list (lines start with - or * or •)
      const isBulletList = lines.length > 1 && lines.every((l) => /^[-*•]\s+/.test(l));

      // Check if this block is an ordered list (lines start with 1., 2., a), etc.)
      const isNumberedList = lines.length > 1 && lines.every((l) => /^(\d+[\.\)]|[a-zA-Z][\.\)])\s+/.test(l));

      if (isBulletList) {
        return {
          type: 'bullet-list' as const,
          items: lines.map((l) => l.replace(/^[-*•]\s+/, '')),
        };
      }

      if (isNumberedList) {
        return {
          type: 'numbered-list' as const,
          items: lines.map((l) => l.replace(/^(\d+[\.\)]|[a-zA-Z][\.\)])\s+/, '')),
        };
      }

      return {
        type: 'paragraph' as const,
        text: trimmed,
      };
    });
  }, [text]);

  if (!text) return null;

  return (
    <div className={`space-y-3 ${className}`}>
      {blocks.map((block, idx) => {
        if (block.type === 'bullet-list') {
          return (
            <ul key={idx} className="list-disc pl-5 space-y-1.5 text-base text-slate-700 dark:text-slate-300 leading-relaxed">
              {block.items.map((item, itemIdx) => (
                <li
                  key={itemIdx}
                  dangerouslySetInnerHTML={{ __html: renderInlineMath(item) }}
                />
              ))}
            </ul>
          );
        }

        if (block.type === 'numbered-list') {
          return (
            <ol key={idx} className="list-decimal pl-5 space-y-1.5 text-base text-slate-700 dark:text-slate-300 leading-relaxed">
              {block.items.map((item, itemIdx) => (
                <li
                  key={itemIdx}
                  dangerouslySetInnerHTML={{ __html: renderInlineMath(item) }}
                />
              ))}
            </ol>
          );
        }

        return (
          <p
            key={idx}
            className={paragraphClassName}
            dangerouslySetInnerHTML={{ __html: renderInlineMath(block.text) }}
          />
        );
      })}
    </div>
  );
};
