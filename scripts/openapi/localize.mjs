#!/usr/bin/env node
// ja の仕様と対応表から en の仕様を作る。仕様は同期で ja だけが進むので、en は持たずに毎回作る。
//
// 使い方: localize.mjs --check [仕様] [対応表]
// 訳が足りない文があれば一覧を出して終了コード 1 を返す。無ければ 0。
import { mkdirSync, readFileSync, realpathSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const SPEC = resolve(ROOT, 'openapi/org-api.json');
const TEXTS = resolve(ROOT, 'openapi/org-api.en-text.json');
const OUTPUT = resolve(ROOT, 'openapi/generated/org-api.en.json');

const JAPANESE = /[\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}]/u;
const TEXT_KEYS = new Set(['description', 'summary']);

/**
 * description・summary と操作の tags を訳す。スキーマの項目名の description は値がオブジェクトなので当たらない。
 * 訳の無い文は ja のまま残し、missing に載せる。
 */
export function localize(spec, texts) {
  const used = new Set();
  const missing = [];

  const translate = (text) => {
    if (Object.hasOwn(texts, text)) {
      used.add(text);
      return texts[text];
    }
    return text;
  };

  const walk = (value, translatable, path) => {
    if (typeof value === 'string') {
      const result = translatable ? translate(value) : value;
      if (JAPANESE.test(result)) {
        missing.push({ path, text: value });
      }
      return result;
    }
    if (Array.isArray(value)) {
      return value.map((item, index) => walk(item, translatable, `${path}/${index}`));
    }
    if (value !== null && typeof value === 'object') {
      return Object.fromEntries(
        Object.entries(value).map(([key, child]) => {
          const isText = TEXT_KEYS.has(key) && typeof child === 'string';
          const isTagList = key === 'tags' && Array.isArray(child);
          return [key, walk(child, isText || isTagList, `${path}/${key}`)];
        }),
      );
    }
    return value;
  };

  const localized = walk(spec, false, '');
  const unused = Object.keys(texts).filter((text) => !used.has(text));
  return { spec: localized, missing, unused };
}

function load(specPath, textsPath) {
  return localize(JSON.parse(readFileSync(specPath, 'utf8')), JSON.parse(readFileSync(textsPath, 'utf8')));
}

/** en の仕様を書き出す。訳が足りなくてもビルドは止めない（その文だけ ja で出る）。 */
export function writeEnglishSpec() {
  const { spec, missing, unused } = load(SPEC, TEXTS);
  mkdirSync(dirname(OUTPUT), { recursive: true });
  writeFileSync(OUTPUT, `${JSON.stringify(spec, null, 2)}\n`);
  for (const { text } of missing) {
    console.warn(`[openapi] English text is missing: ${text}`);
  }
  for (const text of unused) {
    console.warn(`[openapi] Translation is not used by the specification: ${text}`);
  }
}

// import.meta.url は symlink を解決した値なので、起動のパスも解決して比べる
if (process.argv[1] && import.meta.url === pathToFileURL(realpathSync(process.argv[1])).href) {
  const [flag, specPath = SPEC, textsPath = TEXTS] = process.argv.slice(2);
  if (flag !== '--check') {
    console.error('usage: localize.mjs --check [spec] [texts]');
    process.exit(2);
  }
  const { missing } = load(specPath, textsPath);
  const texts = [...new Set(missing.map(({ text }) => text))];
  for (const text of texts) {
    console.log(text);
  }
  process.exit(texts.length > 0 ? 1 : 0);
}
