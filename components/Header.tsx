
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-surface shadow-sm">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold leading-tight text-text">
          Employee Management Dashboard
        </h1>
      </div>
    </header>
  );
};

export default Header;
