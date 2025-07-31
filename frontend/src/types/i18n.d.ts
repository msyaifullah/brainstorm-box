interface TranslationObject {
  [key: string]: string | TranslationObject;
}

declare module '*.json' {
  const value: TranslationObject;
  export default value;
} 