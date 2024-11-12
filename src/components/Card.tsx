import React from 'react';

interface CardProps {
  title: string;
  body: string;
  closed_at: string;
}

const Card: React.FC<CardProps> = ({ title, body, closed_at }) => {
  return (
    <div className="card">
      <h2>{title}</h2>
      <p>{body}</p>
      <p>{closed_at}</p>
    </div>
  );
};

export default Card;