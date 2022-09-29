import create from 'zustand';
// import produce from 'immer';

const TagStore = create((set) => ({
  selectedTags: [],
  selectTag: (tag) => set((state) => ({ selectedTags: [...state.selectedTags, tag] })),
  deselectTag: (tag) =>
    set((state) => ({
      selectedTags: state.selectedTags.filter(function (removeTag) {
        return tag != removeTag;
      }),
    })),
}));

export { TagStore };
