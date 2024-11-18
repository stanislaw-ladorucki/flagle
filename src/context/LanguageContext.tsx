import {createContext, useState} from "react";
import {Locale} from "../constants/locale.ts";

export const DEFAULT_LANGUAGE = Locale.en;

export const LanguageContext = createContext<{ language: Locale, setLanguage: (language: Locale) => void }>({
    language: DEFAULT_LANGUAGE,
    setLanguage: () => {
    },
});

export function LanguageProvider({children}) {
    const [language, setLanguage] = useState(DEFAULT_LANGUAGE);

    return <LanguageContext.Provider value={{language, setLanguage}}>
        {children}
    </LanguageContext.Provider>
}
