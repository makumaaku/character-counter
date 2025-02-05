import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-center py-6 mt-10">
      <div className="w-24 h-24 bg-black rounded-full mx-auto flex items-center justify-center">
        <span className="text-white font-bold">Boring.</span>
      </div>
      <p className="text-gray-400 mt-2">&copy; Boring Inc</p>
    </footer>
  );
};

export default Footer;