import './styles.css';
import { Tag } from '../../components/tag/Tag';

export const SelectedTags = ({ tagNames }) => {
  console.log(tagNames);
  return (
    <div className="selected-tags-box">
      {tagNames.map((tag) => (
        <Tag key={tag.name} tagName={tag.name}></Tag>
      ))}
    </div>
  );
};
