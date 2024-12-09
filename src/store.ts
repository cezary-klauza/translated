import { create } from "zustand"

type State = {
    userLang: string,
    translationLang: string,
    toTranslate: string,
    translated: string,
    error: string,
}

type Actions = {
    setUserLang: (value: string) => void;
    setTranslationLang: (value: string) => void;
    setTranslated: (value: string) => void;
    setToTranslate: (value: string) => void;
    setError: (value: string) => void;
}

export const useStore = create<State & Actions>((set) => ({
    userLang: 'detect',
    translationLang: 'fr',
    toTranslate: 'Hello, how are you?',
    translated: 'Bonjour, comment vas-tu?',
    error: '',

    setUserLang: (value: string) => set({ userLang: value }),
    setTranslationLang: (value: string) => set({ translationLang: value }),
    setTranslated: (value: string) => set({ translated: value }),
    setToTranslate: (value: string) => set({ toTranslate: value }),
    setError: (value: string) => set({ error: value }),
}))