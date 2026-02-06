import React from 'react';
import { useNavigate } from 'react-router-dom';

const ActionButton = ({ text, path, onClick }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (path) {
      navigate(path);
    }
  };

  return (
    <button className="action-button" onClick={handleClick}>
      {text}
    </button>
  );
};

export default ActionButton;
