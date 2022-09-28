import './styles.css';
import { Tag } from '../../components/tag/Tag';

export const TagFilterBox = ({ tagNames }) => {
  // const state = useBearStore()

  const selectTag = () => {
    console.log('dylannnnnn');
  };

  return (
    <div className="tag-filter-box">
      {tagNames.map((tag) => (
        <Tag onsubmit={selectTag} key={tag.name} tagName={tag.name}></Tag>
        // <button onclick="selectTag()">yahooooo</button>
      ))}
    </div>
  );
};
