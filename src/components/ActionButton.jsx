import React from 'react';
import { useNavigate } from 'react-router-dom';

const ActionButton = ({ text, path }) => {
  const navigate = useNavigate();
  return (
    <button className="action-button" onClick={() => navigate(path)}>
      {text}
    </button>
  );
};

export default ActionButton;
