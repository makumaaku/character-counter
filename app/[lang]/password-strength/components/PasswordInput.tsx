'use client';

import { useState } from 'react';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';

type Props = {
  password: string;
  setPassword: (password: string) => void;
  placeholder: string;
  visibleText: string;
  hiddenText: string;
};

export default function PasswordInput({
  password,
  setPassword,
  placeholder,
  visibleText,
  hiddenText,
}: Props) {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="relative w-full mt-2">
      <input
        type={isVisible ? 'text' : 'password'}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 text-xl text-gray-100"
        autoComplete="new-password"
      />
      <button
        type="button"
        onClick={toggleVisibility}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300 focus:outline-none"
        aria-label={isVisible ? hiddenText : visibleText}
      >
        {isVisible ? (
          <BsEyeFill className="text-2xl" />
        ) : (
          <BsEyeSlashFill className="text-2xl" />
        )}
      </button>
    </div>
  );
} 