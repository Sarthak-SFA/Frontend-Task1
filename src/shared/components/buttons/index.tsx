interface ButtonProps {
  caption: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
}

export default function Button(props: ButtonProps) {
  const {
    caption,
    type = "button",
    onClick,
    disabled = false,
  } = props;

  return (
    <button
      type={type}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-25"
      onClick={onClick}
      disabled={disabled}
    >
      {caption}
    </button>
  );
}