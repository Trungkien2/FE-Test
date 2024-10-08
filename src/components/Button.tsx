import React from "react";

interface IProps {
  handleClick: () => void;
  filter: string;
  title: string;
}
const Button: React.FC<IProps> = ({ handleClick, filter, title }) => {
  return (
    <button
      onClick={handleClick}
      className={`px-3 py-2 rounded ${
        filter ? "bg-indigo-600 text-white" : "bg-indigo-700 text-gray-400"
      }`}
    >
      {title}
    </button>
  );
};

export default Button;
