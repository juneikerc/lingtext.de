import { FILE_HANDLES_DB_NAME } from "~/config/app-identity";

const DB_NAME = FILE_HANDLES_DB_NAME;
const STORE_NAME = "handles";
const DB_VERSION = 1;

/**
 * Opens (or creates) the IndexedDB database used to store file handles.
 */
function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };

    request.onsuccess = (event) => {
      resolve((event.target as IDBOpenDBRequest).result);
    };

    request.onerror = (event) => {
      reject((event.target as IDBOpenDBRequest).error);
    };
  });
}

/**
 * Stores a FileSystemFileHandle associated with a text ID.
 */
export async function saveFileHandle(
  textId: string,
  handle: FileSystemFileHandle
): Promise<void> {
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    await new Promise<void>((resolve, reject) => {
      const request = store.put(handle, textId);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.warn("Error saving file handle:", error);
  }
}

/**
 * Retrieves a FileSystemFileHandle associated with a text ID.
 */
export async function getFileHandle(
  textId: string
): Promise<FileSystemFileHandle | undefined> {
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);
    const handle = await new Promise<FileSystemFileHandle | undefined>(
      (resolve, reject) => {
        const request = store.get(textId);
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      }
    );
    return handle;
  } catch (error) {
    console.warn("Error getting file handle:", error);
    return undefined;
  }
}

/**
 * Deletes a saved handle (for example when deleting the text).
 */
export async function deleteFileHandle(textId: string): Promise<void> {
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    await new Promise<void>((resolve, reject) => {
      const request = store.delete(textId);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.warn("Error deleting file handle:", error);
  }
}
