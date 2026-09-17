#!/usr/bin/env node
// Достаёт фото меню из источников (data/menusources.json) и собирает site/data/menus.js.
// Использование: node tools/fetch-menus.mjs [путь-к-sources.json] [путь-к-site]
// Токен VK: переменная окружения VK_TOKEN или строка в .env (не коммитится).
import { existsSync } from 'node:fs';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SOURCES_PATH = path.resolve(ROOT, process.argv[2] ?? 'data/menusources.json');
const SITE_DIR = path.resolve(ROOT, process.argv[3] ?? 'site');
const UA = 'mainpage-status/1.0 (+https://github.com/molfly/mainpage-status)';

const envPath = path.join(ROOT, '.env');
if (existsSync(envPath)) {
  for (const line of (await fs.readFile(envPath, 'utf8')).split('\n')) {
    if (line.trim().startsWith('#')) continue;
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
    if (m && process.env[m[1]] === undefined) {
      process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
    }
  }
}
const VK_TOKEN = process.env.VK_TOKEN;

async function fetchBuf(url) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 30000);
  try {
    const res = await fetch(url, { signal: ctrl.signal, headers: { 'User-Agent': UA } });
    if (!res.ok) throw new Error(`HTTP ${res.status} для ${url}`);
    return Buffer.from(await res.arrayBuffer());
  } finally {
    clearTimeout(timer);
  }
}

const fetchJson = async (url) => JSON.parse((await fetchBuf(url)).toString('utf8'));

function parseAlbumUrl(u) {
  const m = String(u).match(/album(-?\d+)_(\d+)/);
  if (!m) throw new Error(`Не распознал ссылку на альбом ВК: ${u}`);
  return { ownerId: m[1], albumId: m[2] };
}

async function vkApi(method, params) {
  const q = new URLSearchParams({ ...params, access_token: VK_TOKEN, v: '5.199' });
  const data = await fetchJson(`https://api.vk.com/method/${method}?${q}`);
  if (data.error) throw new Error(`VK ${data.error.error_code}: ${data.error.error_msg}`);
  return data.response;
}

async function fetchVkAlbum(source) {
  if (!VK_TOKEN) throw new Error('VK_TOKEN не задан — добавьте его в .env (локально) или в секреты CI');
  const { ownerId, albumId } = parseAlbumUrl(source.vk_album);
  let name = source.id;
  try {
    const albums = await vkApi('photos.getAlbums', { owner_id: ownerId, album_ids: albumId });
    if (albums.items?.length && albums.items[0].title) name = albums.items[0].title;
  } catch {
    // название альбома — опционально
  }
  const data = await vkApi('photos.get', { owner_id: ownerId, album_id: albumId, photo_sizes: 1 });
  const photos = (data.items ?? [])
    .map((it) => (it.sizes ? it.sizes.reduce((a, b) => (b.width > a.width ? b : a)).src : null))
    .filter(Boolean);
  return { name, photos };
}

async function main() {
  const sources = JSON.parse(await fs.readFile(SOURCES_PATH, 'utf8'));
  const places = [];
  let failed = 0;

  for (const source of sources) {
    try {
      const { name, photos } = source.photos
        ? { name: source.name ?? source.id, photos: source.photos }
        : await fetchVkAlbum(source);
      if (!photos.length) throw new Error('в источнике нет фото');

      const dir = path.join(SITE_DIR, 'assets', 'menus', source.id);
      await fs.rm(dir, { recursive: true, force: true });
      await fs.mkdir(dir, { recursive: true });

      const files = [];
      for (const [i, url] of photos.entries()) {
        const ext = (path.extname(new URL(url).pathname) || '.jpg').slice(0, 5);
        const file = `${String(i + 1).padStart(2, '0')}${ext}`;
        await fs.writeFile(path.join(dir, file), await fetchBuf(url));
        files.push(`assets/menus/${source.id}/${file}`);
      }
      places.push({ id: source.id, name, photos: files });
      console.log(`OK ${source.id}: «${name}» — ${files.length} фото`);
    } catch (e) {
      failed++;
      console.error(`SKIP ${source.id}: ${e.message}`);
    }
  }

  await fs.mkdir(path.join(SITE_DIR, 'data'), { recursive: true });
  const payload = { updated: new Date().toISOString(), places };
  await fs.writeFile(
    path.join(SITE_DIR, 'data', 'menus.js'),
    `window.MENUS = ${JSON.stringify(payload, null, 2)};\n`
  );
  console.log(`data/menus.js: ${places.length} мест`);

  if (!places.length) process.exit(1);
  if (failed) process.exitCode = 2;
}

main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
