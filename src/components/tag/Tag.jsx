import './styles.css';
import { TagStore } from '../../store/TagStore';

export const Tag = ({ tag, clickable }) => {
  const selectedTagsStore = TagStore((state) => state.selectedTags);
  const selectTag = TagStore((state) => state.selectTag);
  const deselectTag = TagStore((state) => state.deselectTag);
  // console.log(tag);

  const tagClicked = () => {
    if (selectedTagsStore.includes(tag)) {
      deselectTag(tag);
    } else {
      selectTag(tag);
    }
    console.log('tag', tag, 'clicked');
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
