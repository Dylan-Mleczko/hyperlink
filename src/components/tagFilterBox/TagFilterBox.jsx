import './styles.css';
import { Tag } from '../../components/tag/Tag';
import { TagButton } from '../../components/tagButton/TagButton';

export const TagFilterBox = ({ tags, handleApplyClick, handleCancelClick }) => {
  return (
    <div className="tag-filter-box">
      <div className="tags">
        {tags?.map((tag) => (
          <div padding="5px">
            <Tag key={`${tag._id}_${Math.random()}`} tag={tag.name} clickable={true}></Tag>
          </div>
        ))}
      </div>
      <div className="tag-buttons">
        <TagButton text="Apply" func={handleApplyClick}></TagButton>
        <TagButton text="Cancel" func={handleCancelClick}></TagButton>
      </div>
    </div>
  );
};
