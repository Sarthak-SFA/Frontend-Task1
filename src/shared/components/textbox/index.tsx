import "./index.css";

interface TextBoxProps {
  value: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
  type?: "text" | "number";
}

export default function TextBox(props: TextBoxProps) {
  const {
    value,
    placeholder = "",
    onChange,
    readOnly = false,
    type = "text",
  } = props;

  return (
    <input
      className={`app-textbox ${readOnly ? "app-textbox-readonly" : ""}`}
      type={type}
      value={value}
      placeholder={placeholder}
      readOnly={readOnly}
      onChange={(event) => {
        if (onChange) {
          onChange(event.target.value);
        }
      }}
    />
  );
}