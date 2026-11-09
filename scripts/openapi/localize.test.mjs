import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

import { localize } from './localize.mjs';

const CLI = resolve(dirname(fileURLToPath(import.meta.url)), 'localize.mjs');

const spec = {
  info: { title: 'API', description: '団体の API です。' },
  paths: {
    '/a': {
      get: { summary: '一覧する', description: 'OK', tags: ['下書き'], operationId: 'list' },
    },
  },
  components: {
    schemas: {
      Event: {
        required: ['description', 'tags'],
        properties: { description: { type: 'string' }, tags: { type: 'array' } },
      },
    },
  },
};

const texts = { '団体の API です。': 'The organization API.', 一覧する: 'List', 下書き: 'Drafts' };

function runCheck(specValue, textsValue) {
  const dir = mkdtempSync(join(tmpdir(), 'localize-'));
  const specPath = join(dir, 'spec.json');
  const textsPath = join(dir, 'texts.json');
  writeFileSync(specPath, JSON.stringify(specValue));
  writeFileSync(textsPath, JSON.stringify(textsValue));
  return spawnSync(process.execPath, [CLI, '--check', specPath, textsPath], { encoding: 'utf8' });
}

test('description・summary・tags を訳し、ほかは変えない', () => {
  const result = localize(spec, texts);

  assert.equal(result.spec.info.description, 'The organization API.');
  assert.equal(result.spec.paths['/a'].get.summary, 'List');
  assert.deepEqual(result.spec.paths['/a'].get.tags, ['Drafts']);
  assert.equal(result.spec.paths['/a'].get.description, 'OK');
  assert.deepEqual(result.spec.components, spec.components);
  assert.deepEqual(result.missing, []);
  assert.deepEqual(result.unused, []);
});

test('訳の無い文は ja のまま残して missing に載せる', () => {
  const { 一覧する: _omitted, ...partial } = texts;
  const result = localize(spec, partial);

  assert.equal(result.spec.paths['/a'].get.summary, '一覧する');
  assert.deepEqual(result.missing, [{ path: '/paths//a/get/summary', text: '一覧する' }]);
});

test('訳の対象でない項目の日本語も missing に載せる', () => {
  const withExample = { ...spec, example: { title: '見本' } };

  assert.deepEqual(localize(withExample, texts).missing, [{ path: '/example/title', text: '見本' }]);
});

test('使われなくなった訳は unused に載せ、失敗にしない', () => {
  const result = localize(spec, { ...texts, 古い文: 'Old text' });

  assert.deepEqual(result.unused, ['古い文']);
  assert.deepEqual(result.missing, []);
});

test('--check は訳が揃っていれば 0 を返す', () => {
  const result = runCheck(spec, texts);

  assert.equal(result.status, 0);
  assert.equal(result.stdout, '');
});

test('--check は足りない文を出して 1 を返す', () => {
  const result = runCheck(spec, { '団体の API です。': 'The organization API.', 下書き: 'Drafts' });

  assert.equal(result.status, 1);
  assert.equal(result.stdout, '一覧する\n');
});

test('--check は読めない引数で 2 を返す', () => {
  const result = spawnSync(process.execPath, [CLI], { encoding: 'utf8' });

  assert.equal(result.status, 2);
});
