export function transformLanguageShortCodeToFlagCountryCode(languageShortCode: string | undefined) {
  switch (languageShortCode?.toUpperCase()) {
    case 'EN': {
      return 'GB'
    }
    case 'VI': {
      return 'VN'
    }
    default: {
      return languageShortCode
    }
  }
}
