import create from 'zustand';

const TagStore = create((set) => ({
  selectedTags: [],
  selectTag: (tag) => set((state) => ({ selectedTags: [...state.selectedTags, tag] })),
  deselectTag: (tag) =>
    set((state) => ({
      selectedTags: state.selectedTags.filter(function (removeTag) {
        return tag != removeTag;
      }),
    })),
  clearTags: () => set(() => ({ selectedTags: [] })),
}));

export { TagStore };
