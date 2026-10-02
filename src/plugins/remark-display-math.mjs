// remark-math treats `$$x$$` written on a single line as *inline* math, so
// a formula on its own line ends up small and squeezed into the text. This
// plugin turns such a paragraph (nothing but one `$$...$$`) into display math,
// exactly as if it had been written across three lines.

export default function remarkDisplayMath() {
  return (tree, file) => {
    const source = String(file.value);
    walk(tree, (node, index, parent) => {
      if (node.type !== 'paragraph') return;
      const kids = node.children.filter(c => !(c.type === 'text' && !c.value.trim()));
      if (kids.length !== 1 || kids[0].type !== 'inlineMath') return;
      const math = kids[0];
      const start = math.position?.start.offset;
      if (start === undefined || !source.startsWith('$$', start)) return;
      parent.children[index] = {
        type: 'math',
        meta: null,
        value: math.value,
        position: node.position,
        // Same shape remark-math gives a multi-line `$$` block.
        data: {
          hName: 'pre',
          hChildren: [
            {
              type: 'element',
              tagName: 'code',
              properties: { className: ['language-math', 'math-display'] },
              children: [{ type: 'text', value: math.value }],
            },
          ],
        },
      };
    });
  };
}

function walk(node, visit, index, parent) {
  visit(node, index, parent);
  node.children?.forEach((child, i) => walk(child, visit, i, node));
}
