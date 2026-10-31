import test from 'node:test';
import assert from 'node:assert/strict';
import { TRANSLATIONS, type Language } from '../i18n/translations.ts';

test('all supported languages have complete translations without missing keys', () => {
  const languages: Language[] = ['en', 'de', 'fr', 'es', 'it', 'ja', 'hi'];
  const englishKeys = Object.keys(TRANSLATIONS.en) as (keyof typeof TRANSLATIONS.en)[];

  for (const lang of languages) {
    const translation = TRANSLATIONS[lang];
    assert.ok(translation, `Translation object for ${lang} must exist`);

    for (const key of englishKeys) {
      assert.ok(
        translation[key] !== undefined && translation[key] !== '',
        `Language ${lang} is missing translation for key: ${key}`
      );
    }
  }
});
