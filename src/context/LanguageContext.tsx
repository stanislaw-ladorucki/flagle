import {createContext, ReactNode, useState} from "react";
import {Locale} from "../constants/locale.ts";

export const DEFAULT_LANGUAGE = Locale.en;

export const LanguageContext = createContext<{ language: Locale, setLanguage: (language: Locale) => void }>({
    language: DEFAULT_LANGUAGE,
    setLanguage: () => {
    },
});

export function LanguageProvider(props: { language?: Locale; children?: ReactNode}) {
    const [language, setLanguage] = useState<Locale>(props.language || DEFAULT_LANGUAGE);

    return <LanguageContext.Provider value={{language, setLanguage}}>
        {props.children}
    </LanguageContext.Provider>
}
