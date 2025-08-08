import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const handleChangeLanguage = (event) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <div>
      <select
        id="language-select"
        onChange={handleChangeLanguage}
        defaultValue={i18n.language}
        className="text-white bg-inherit uppercase">
        <option value="en">English</option>
        <option value="de">Deutsch</option>
      </select>
    </div>
  );
}
