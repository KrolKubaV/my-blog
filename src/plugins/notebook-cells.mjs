// Expressive Code plugin: Jupyter-style cells.
//
//   ```python in        → "In [1]:"  (numbered automatically per page)
//   ```text out         → "Out [1]:" (takes the number of the last In cell)

export function notebookCells() {
  const cells = new WeakMap(); // code block → { kind, label }
  const counters = new WeakMap(); // page → number of the last In cell

  return {
    name: 'notebook-cells',
    hooks: {
      preprocessMetadata({ codeBlock }) {
        const kind = ['in', 'out'].find(k => codeBlock.metaOptions.getBoolean(k));
        if (!kind) return;

        const page = codeBlock.parentDocument?.documentRoot ?? cells; // (no page: one shared count)
        let n = counters.get(page) ?? 0;
        if (kind === 'in') counters.set(page, ++n);
        cells.set(codeBlock, { kind, label: `${kind === 'in' ? 'In' : 'Out'} [${n || ' '}]:` });
        codeBlock.props.frame = 'none';
      },

      postprocessRenderedBlock({ codeBlock, renderData }) {
        const cell = cells.get(codeBlock);
        if (!cell) return;
        const figure = renderData.blockAst;
        const classes = figure.properties.className ?? [];
        figure.properties.className = [...classes, 'nb-cell', `nb-${cell.kind}`];
        if (cell.kind === 'out') {
          // Output isn't something you'd copy; drop the copy button.
          figure.children = figure.children.filter(
            child => !child.properties?.className?.includes?.('copy')
          );
        }
        figure.children.unshift({
          type: 'element',
          tagName: 'div',
          properties: { className: ['nb-prompt'], ariaHidden: 'true' },
          children: [{ type: 'text', value: cell.label }],
        });
      },
    },
  };
}
