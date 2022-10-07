import './styles.css';

export const TagButton = ({ text, func }) => {
  return (
    <button className="tag-apply-box" onClick={() => func()}>
      {text}
    </button>
  );
};
