import create from 'zustand';
// import produce from 'immer';

const TagStore = create((set) => ({
  // counter: 0,
  // increase: () => set((state) => ({ counter: state.counter + 1 })),
  selectedTags: [],
  insertTag: (tag) => set((state) => ({ selectedTags: [...state.selectedTags, tag] })),
  // addTag: () => set((state) => ({ selectedTags: [...state.selectedTags, { id: '2', text: 'world' }] })),
  // setTags: (tags) => set((state) => ({ selectedTags: tags })),
  // selectTag: (tagName) => set((state) => ({ selectedTags: selectedTags.push(tagName) })),
  // might have to use index
  deselectTag: (tagName) => set((state) => ({ selectedTags: selectedTags.remove(tagName) })),
}));

export { TagStore };
