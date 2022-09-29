import './styles.css';
import { Tag } from '../../components/tag/Tag';

export const TagFilterBox = ({ tags }) => {
  return (
    <div className="tag-filter-box">
      {tags.map((tag) => (
        <Tag key={tag.name} tag={tag}></Tag>
      ))}
    </div>
  );
};
