import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher.jsx';

export default function NavBar({ closeDetailClick, showDetailBar = false, detailTitle }) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-800 backdrop-blur-md shadow-md fixed w-full top-0 left-0 z-10">
      <div className="container mx-auto flex items-center justify-between p-4 text-white">
        {/* Logo */}
        <div className="flex items-center">
          <img src="./icons/logo.svg" alt="Logo" className="h-8 w-8 fill-black" />
          <span className="text-2xl font-extrabold text-white font-logo ml-2 ">{t('title')}</span>
        </div>

        {/* Menu Icon (Mobile) */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}
              />
            </svg>
          </button>
        </div>

        {/* Menu Links */}
        <ul
          className={`md:flex md:items-center space-y-4 md:space-y-0 md:space-x-6 font-body ${isOpen ? 'block' : 'hidden'} md:block font-bold uppercase`}>
          <li>
            <a
              href="https://wiki.grandgarage.eu"
              className="text-white hover:underline"
              target="_blank">
              Wiki
            </a>
          </li>
          <li>
            <a href="https://grandgarage.eu" className="text-white hover:underline" target="_blank">
              Makerspace
            </a>
          </li>
          <li>
            <LanguageSwitcher />
          </li>
        </ul>
      </div>
      {showDetailBar && (
        <div className="bg-black/80 text-white h-12 flex items-center p-2">
          <div className="flex-shrink-0">
            <img
              onClick={closeDetailClick}
              src="./icons/close_icon.svg"
              alt="close_icon"
              className="cursor-pointer w-5 h-5 hover:opacity-80 ml-2"
            />
          </div>
          <div className="flex-grow text-center">
            <h1 className="font-bold text-lg">{detailTitle}</h1>
          </div>
        </div>
      )}
    </nav>
  );
}
