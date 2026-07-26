import { visit } from 'unist-util-visit';

export default function rehypeMathjaxRestore() {
  return (tree) => {
    // Convert display math: <pre><code class="language-math math-display">...</code></pre>
    // → <div class="math-display">$$...$$</div>
    visit(tree, 'element', (node, index, parent) => {
      if (node.tagName !== 'pre' || !parent || typeof index !== 'number') return;
      if (node.children.length !== 1) return;
      if (node.children[0].type !== 'element') return;

      const code = node.children[0];
      if (code.tagName !== 'code') return;
      if (!code.properties?.className?.some(c => c.includes('language-math') || c.includes('math-display'))) return;

      const latex = code.children[0]?.value;
      if (!latex) return;

      parent.children[index] = {
        type: 'element',
        tagName: 'div',
        properties: { className: ['math-display'] },
        children: [{ type: 'text', value: `$$${latex}$$` }],
      };
    });

    // Convert inline math: <code class="language-math math-inline">...</code>
    // → <span class="math-inline">$...$</span>
    visit(tree, 'element', (node) => {
      if (node.tagName !== 'code') return;
      if (!node.properties?.className?.some(c => c.includes('language-math') || c.includes('math-inline'))) return;

      const latex = node.children[0]?.value;
      if (!latex) return;

      node.tagName = 'span';
      node.properties = { className: ['math-inline'] };
      node.children = [{ type: 'text', value: `$${latex}$` }];
    });
  };
}
