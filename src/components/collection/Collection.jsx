import './styles.css';
import { Tag } from '../../components/tag/Tag';

export const Collection = ({ collection }) => {
  // const tagClicked = () => {
  //   if (selectedTagsStore.includes(tag)) {
  //     deselectTag(tag);
  //   } else {
  //     selectTag(tag);
  //   }
  //   console.log('tag', tag.name, 'clicked');
  // };

  // return <p>{collection.name}</p>;

  return (
    <div>
      <button className="collection-box">
        <hr></hr>
        <p>{collection.name}</p>
        {collection.tags.map((tag) => (
          <Tag key={tag.name} tag={tag.name} clickable={false}></Tag>
        ))}
      </button>
    </div>
  );
};
