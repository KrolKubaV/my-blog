// Expressive Code plugin: Jupyter-style cells.
//
//   ```python in        → "In [1]:"  (numbered automatically per page)
//   ```text out         → "Out [1]:" (takes the number of the last In cell)
//
// The older `title="In [3]"` / `title="Out [3]"` form still works and keeps
// its explicit number.

const PROMPT = /^(in|out)\s*(?:\[\s*(\d*)\s*\])?\s*:?$/i;

export function notebookCells() {
  const cells = new WeakMap(); // code block → { kind, label }
  const counters = new WeakMap(); // page → number of the last In cell

  return {
    name: 'notebook-cells',
    hooks: {
      preprocessMetadata({ codeBlock }) {
        const match = PROMPT.exec((codeBlock.props.title ?? '').trim());
        let kind = match?.[1].toLowerCase();
        const explicit = match?.[2];
        if (!kind) {
          if (codeBlock.metaOptions.getBoolean('in')) kind = 'in';
          else if (codeBlock.metaOptions.getBoolean('out')) kind = 'out';
          else return;
        }

        const page = codeBlock.parentDocument?.documentRoot ?? cells;
        let n = counters.get(page) ?? 0;
        if (kind === 'in') {
          n = explicit ? Number(explicit) : n + 1;
          counters.set(page, n);
        }
        const number = explicit || (n > 0 ? String(n) : ' ');
        cells.set(codeBlock, { kind, label: `${kind === 'in' ? 'In' : 'Out'} [${number}]:` });

        codeBlock.props.title = '';
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
