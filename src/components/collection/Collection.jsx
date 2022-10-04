import './styles.css';

export const Collection = ({ collection }) => {
  // const tagClicked = () => {
  //   if (selectedTagsStore.includes(tag)) {
  //     deselectTag(tag);
  //   } else {
  //     selectTag(tag);
  //   }
  //   console.log('tag', tag.name, 'clicked');
  // };

  return <button className="collection-box">{collection.name}</button>;

  // return <p>{collection.name}</p>;
};
