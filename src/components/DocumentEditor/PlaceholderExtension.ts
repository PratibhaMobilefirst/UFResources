import { Node, mergeAttributes } from '@tiptap/core';

export interface PlaceholderOptions {
  HTMLAttributes: Record<string, any>;
}

const PlaceholderExtension = Node.create<PlaceholderOptions>({
  name: 'placeholder',

  group: 'inline',
  inline: true,
  atom: true,

  addAttributes() {
    return {
      value: {
        default: '',
        parseHTML: (element) => element.getAttribute('data-value'),
        renderHTML: (attributes) => {
          return {
            'data-value': attributes.value,
          };
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'span[data-placeholder]',
      },
    ];
  },

  renderHTML({ HTMLAttributes, node }) {
    return [
      'span',
      mergeAttributes(HTMLAttributes, {
        'data-placeholder': 'true',
        'data-value': node.attrs.value,
        class:
          'bg-yellow-100 text-yellow-800 px-1 rounded border border-yellow-300 cursor-pointer placeholder-node',
      }),
      node.attrs.value || 'Placeholder',
    ];
  },
});

export default PlaceholderExtension; 