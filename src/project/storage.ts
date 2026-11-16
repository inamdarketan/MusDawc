export type SavedClip = {
  id: string; assetId: string; bytes: number; name: string; start: number; sourceStart: number; sourceEnd: number;
  color: string; reversed: boolean; gainDb: number; fadeIn: number; fadeOut: number; pan: number;
  muted: boolean; solo: boolean;
};
export type SavedEffects = { warmth: number; room: number; air: number; compression: number };
export type SavedSession = { schemaVersion: 1; savedAt: number; clips: SavedClip[]; effects?: SavedEffects };
type SavedAsset = { id: string; name: string; type: string; blob: Blob };
type StoredSession = SavedSession & { id: 'active' };

let database: Promise<IDBDatabase> | undefined;
function openDatabase(): Promise<IDBDatabase> {
  if (database) return database;
  database = new Promise((resolve, reject) => {
    const request = indexedDB.open('musdawc-local', 1);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains('assets')) db.createObjectStore('assets', { keyPath: 'id' });
      if (!db.objectStoreNames.contains('sessions')) db.createObjectStore('sessions', { keyPath: 'id' });
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error ?? new Error('Could not open local project storage.'));
    request.onblocked = () => reject(new Error('Local project storage is blocked by another MusDawc tab.'));
  });
  return database;
}
function complete(tx: IDBTransaction): Promise<void> {
  return new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error ?? new Error('Local save failed.'));
    tx.onabort = () => reject(tx.error ?? new Error('Local save was cancelled.'));
  });
}
function read<T>(request: IDBRequest<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error ?? new Error('Could not read local project data.'));
  });
}

export async function saveAudioAsset(id: string, file: File): Promise<void> {
  const db = await openDatabase();
  const tx = db.transaction('assets', 'readwrite');
  tx.objectStore('assets').put({ id, name: file.name, type: file.type, blob: file } satisfies SavedAsset);
  await complete(tx);
}
export async function loadAudioAsset(id: string): Promise<SavedAsset | undefined> {
  const db = await openDatabase();
  return read(db.transaction('assets', 'readonly').objectStore('assets').get(id)) as Promise<SavedAsset | undefined>;
}
export async function getStoredAudioBytes(): Promise<number> {
  const db = await openDatabase();
  const records = await read(db.transaction('assets', 'readonly').objectStore('assets').getAll()) as SavedAsset[];
  return records.reduce((total, asset) => total + (asset.blob instanceof Blob ? asset.blob.size : 0), 0);
}
export async function saveSession(session: SavedSession, retainAssetIds: readonly string[] = []): Promise<void> {
  const db = await openDatabase();
  const assetRead = db.transaction('assets', 'readonly');
  const assetKeys = await read(assetRead.objectStore('assets').getAllKeys());
  const referenced = new Set([...session.clips.map(clip => clip.assetId), ...retainAssetIds]);
  const tx = db.transaction(['sessions', 'assets'], 'readwrite');
  for (const key of assetKeys) if (typeof key === 'string' && !referenced.has(key)) tx.objectStore('assets').delete(key);
  tx.objectStore('sessions').put({ id: 'active', ...session } satisfies StoredSession);
  await complete(tx);
}
export async function loadSession(): Promise<SavedSession | undefined> {
  const db = await openDatabase();
  const value = await read(db.transaction('sessions', 'readonly').objectStore('sessions').get('active')) as StoredSession | undefined;
  if (!value || value.id !== 'active' || value.schemaVersion !== 1 || !Number.isFinite(value.savedAt) ||
    !Array.isArray(value.clips) || value.clips.length > 32) return undefined;
  if (value.effects && (![value.effects.warmth,value.effects.room,value.effects.air,value.effects.compression].every(Number.isFinite) ||
    value.effects.warmth < -12 || value.effects.warmth > 12 || value.effects.room < 0 || value.effects.room > 50 ||
    value.effects.air < -12 || value.effects.air > 12 || value.effects.compression < 0 || value.effects.compression > 100)) return undefined;
  const valid = value.clips.every(clip => clip && typeof clip.id === 'string' && typeof clip.assetId === 'string' &&
    typeof clip.name === 'string' && clip.name.length <= 80 && Number.isSafeInteger(clip.bytes) && clip.bytes >= 0 && clip.bytes <= 200*1024*1024 && Number.isFinite(clip.start) && clip.start >= 0 &&
    Number.isFinite(clip.sourceStart) && clip.sourceStart >= 0 && Number.isFinite(clip.sourceEnd) &&
    clip.sourceEnd > clip.sourceStart && clip.start + clip.sourceEnd - clip.sourceStart <= 3600 &&
    Number.isFinite(clip.gainDb) && clip.gainDb >= -80 && clip.gainDb <= 6 && typeof clip.reversed === 'boolean' &&
    Number.isFinite(clip.fadeIn) && clip.fadeIn >= 0 && clip.fadeIn <= (clip.sourceEnd-clip.sourceStart)/2 &&
    Number.isFinite(clip.fadeOut) && clip.fadeOut >= 0 && clip.fadeOut <= (clip.sourceEnd-clip.sourceStart)/2 &&
    Number.isFinite(clip.pan) && clip.pan >= -1 && clip.pan <= 1 && /^#[0-9a-f]{6}$/i.test(clip.color) &&
    typeof clip.muted === 'boolean' && typeof clip.solo === 'boolean');
  if (!valid) return undefined;
  const uniqueAssets=new Map(value.clips.map(clip=>[clip.assetId,clip.bytes]));
  return [...uniqueAssets.values()].reduce((total,bytes)=>total+bytes,0)<=2*1024*1024*1024?value:undefined;
}
export async function deleteSavedSession(retainAssetIds: readonly string[] = []): Promise<void> {
  const db = await openDatabase();
  const keys = await read(db.transaction('assets', 'readonly').objectStore('assets').getAllKeys());
  const retained = new Set(retainAssetIds);
  const tx = db.transaction(['sessions', 'assets'], 'readwrite');
  for (const key of keys) if (typeof key === 'string' && !retained.has(key)) tx.objectStore('assets').delete(key);
  tx.objectStore('sessions').delete('active');
  await complete(tx);
}
