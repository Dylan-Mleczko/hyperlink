import './styles.css';
import { Tag } from '../../components/tag/Tag';
import { TagButton } from '../../components/tagButton/TagButton';

export const TagFilterBox = ({ tags, handleClick }) => {
  return (
    <div className="tag-filter-box">
      {tags?.map((tag) => (
        <div padding="5px">
          <Tag key={tag.name} tag={tag.name} clickable={true}></Tag>
        </div>
      ))}
      <div className="tag-buttons">
        <TagButton text="Apply" func={handleClick}></TagButton>
        <TagButton text="Cancel" func={handleClick}></TagButton>
      </div>
    </div>
  );
};
