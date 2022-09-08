import './title.css';

export const Title = ({ text }) => {
  return (
    <div className="title-box">
      <h1 className="title">{text}</h1>
    </div>
  );
};
