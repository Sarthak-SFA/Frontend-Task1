import "./index.css";

interface LoaderProps {
  text?: string;
}

export default function Loader(props: LoaderProps) {
  const { text = "Loading..." } = props;

  return (
    <div className="loader-wrapper">
      <div className="loader-spinner"></div>
      <div className="loader-text">{text}</div>
    </div>
  );
}