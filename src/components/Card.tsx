import React from 'react';

interface CardProps {
  title: string;
  body: string;
  closed_at: string;
}

const Card: React.FC<CardProps> = ({ title, body, closed_at }) => {
  return (
    <div className="card">
      <header>
        <h2>{title}</h2>
      </header>
      <main>
        <p>{body}</p>
      </main>
      <footer>
        <p>{closed_at}</p>
      </footer>
    </div>
  );
};

export default Card;