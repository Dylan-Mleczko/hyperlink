import './styles.css';
import { Tag } from '../../components/tag/Tag';
import { TagButton } from '../../components/tagButton/TagButton';

export const TagFilterBox = ({ tags, handleClick }) => {
  return (
    <div className="tag-filter-box">
      {tags?.map((tag) => (
        <Tag key={tag.name} tag={tag}></Tag>
      ))}
      <div className="tag-buttons">
        <TagButton text="Apply" func={handleClick}></TagButton>
        <TagButton text="Cancel" func={handleClick}></TagButton>
      </div>
    </div>
  );
};
