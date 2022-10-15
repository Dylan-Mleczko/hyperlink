import './styles.css';
import { TagStore } from '../../store/TagStore';

import { React } from 'react';

export const Tag = ({ tag, clickable }) => {
  const selectedTagsStore = TagStore((state) => state.selectedTags);
  const selectTag = TagStore((state) => state.selectTag);
  const deselectTag = TagStore((state) => state.deselectTag);

  const tagClicked = () => {
    if (selectedTagsStore.includes(tag)) {
      deselectTag(tag);
    } else {
      selectTag(tag);
    }
  };

  return (
    <button
      style={{ background: selectedTagsStore.includes(tag) && clickable ? '#A6B9FF' : null }}
      className="tag-box"
      onClick={clickable ? () => tagClicked() : null}
    >
      {tag}
    </button>
  );
};
