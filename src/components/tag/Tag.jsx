import './styles.css';
import { TagStore } from '../../store/TagStore';

export const Tag = ({ tag }) => {
  const selectedTagsStore = TagStore((state) => state.selectedTags);
  const selectTag = TagStore((state) => state.selectTag);
  const deselectTag = TagStore((state) => state.deselectTag);

  const tagClicked = () => {
    if (selectedTagsStore.includes(tag)) {
      deselectTag(tag);
    } else {
      selectTag(tag);
    }
    console.log('tag', tag.name, 'clicked');
  };

  return (
    <button
      style={{ background: selectedTagsStore.includes(tag) ? '#A6B9FF' : null }}
      className="tag-box"
      onClick={() => tagClicked()}
    >
      {tag.name}
      {console.log(selectedTagsStore)}
    </button>
  );
};
