import './styles.css';
import { TagStore } from '../../store/TagStore';

export const Tag = ({ tag }) => {
  const selectedTagsStore = TagStore((state) => state.selectedTags);
  const selectTag = TagStore((state) => state.selectTag);

  return (
    <div className="tag-box" onClick={() => selectTag(tag)}>
      {tag.name}
      {console.log(selectedTagsStore)}
    </div>
  );
};
