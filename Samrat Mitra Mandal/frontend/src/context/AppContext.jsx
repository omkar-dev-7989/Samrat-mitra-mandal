import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AppContext = createContext(null);

const dictionary = {
  en: {
    donate: 'Donate',
    volunteer: 'Volunteer',
    darshan: 'Live Darshan',
    aarti: 'Daily Aarti',
    countdown: 'Festival Countdown',
    quote: 'May every home glow with wisdom, courage and seva.'
  },
  mr: {
    donate: 'देणगी',
    volunteer: 'स्वयंसेवक',
    darshan: 'लाईव्ह दर्शन',
    aarti: 'दैनिक आरती',
    countdown: 'उत्सवाची उलटी गणना',
    quote: 'ज्ञान, धैर्य आणि सेवेचा प्रकाश प्रत्येक घरी नांदो.'
  }
};

export function AppProvider({ children }) {
  const [language, setLanguage] = useState('mr');
  const [festiveMode, setFestiveMode] = useState(() => localStorage.getItem('smm_theme') !== 'light');
  const [soundOn, setSoundOn] = useState(false);

  useEffect(() => {
    localStorage.setItem('smm_lang', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('smm_theme', festiveMode ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', festiveMode);
  }, [festiveMode]);

  const value = useMemo(() => ({
    language,
    setLanguage,
    festiveMode,
    setFestiveMode,
    soundOn,
    setSoundOn,
    t: dictionary[language]
  }), [language, festiveMode, soundOn]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  return useContext(AppContext);
}
