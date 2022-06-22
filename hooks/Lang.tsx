import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react"
import EngLang from "@/utils/EngLang"
import AmhLang from "@/utils/AmhLang"

const Lang = {
  AM: AmhLang,
  EN: EngLang,
}

export const LangContext = createContext({} as TLangContext)

function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<keyof typeof Lang>("EN")

  return (
    <LangContext.Provider
      value={{
        setLang,
        selectedLang: lang,
        lang: Lang[lang],
      }}
    >
      {children}
    </LangContext.Provider>
  )
}

export default LangProvider

type TLangContext = {
  lang: typeof EngLang
  setLang: Dispatch<SetStateAction<keyof typeof Lang>>
  selectedLang: keyof typeof Lang
}
