import { useEffect, useState } from "react";

import { APP_ORIGIN } from "@/config/app-identity";
import type { ExtensionSettings, PhraseEntry, WordEntry } from "@/types";
import { TRANSLATORS } from "@/types";
import { TRANSLATOR_LABELS } from "@/utils/translate";

const defaultSettings: ExtensionSettings = {
  translator: TRANSLATORS.CHROME,
  apiKey: "",
  captionLanguage: "en",
  hideNativeCc: true,
};

export default function Popup() {
  const [stats, setStats] = useState({ words: 0, phrases: 0 });
  const [lastSync, setLastSync] = useState<string | null>(null);
  const [settings, setSettings] = useState<ExtensionSettings>(defaultSettings);
  const [showApiKey, setShowApiKey] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState<string | null>(null);

  useEffect(() => {
    loadAll().catch((error) => {
      console.error("[LingText Popup] Failed to load initial data:", error);
    });
  }, []);

  const loadAll = async () => {
    const [words, phrases, currentSettings, syncInfo] = await Promise.all([
      chrome.runtime.sendMessage({ type: "LT2_GET_WORDS" }) as Promise<WordEntry[]>,
      chrome.runtime.sendMessage({ type: "LT2_GET_PHRASES" }) as Promise<PhraseEntry[]>,
      chrome.runtime.sendMessage({ type: "LT2_GET_SETTINGS" }) as Promise<ExtensionSettings>,
      chrome.storage.local.get("ltde_last_sync"),
    ]);

    setStats({ words: words.length, phrases: phrases.length });
    setSettings({ ...defaultSettings, ...currentSettings, captionLanguage: "en" });

    const syncTs = syncInfo.ltde_last_sync as number | undefined;
    setLastSync(syncTs ? new Date(syncTs).toLocaleString("de-DE") : null);
  };

  const updateSettings = async (patch: Partial<ExtensionSettings>) => {
    const next = (await chrome.runtime.sendMessage({
      type: "LT2_SET_SETTINGS",
      payload: patch,
    })) as ExtensionSettings;

    setSettings({ ...defaultSettings, ...next, captionLanguage: "en" });
  };

  const openLingText = () => {
    chrome.tabs.create({ url: APP_ORIGIN });
  };

  const handleSync = async () => {
    setSyncing(true);
    setSyncStatus(null);

    try {
      const beforeResult = await chrome.storage.local.get("ltde_last_sync");
      const before =
        typeof beforeResult.ltde_last_sync === "number"
          ? (beforeResult.ltde_last_sync as number)
          : 0;

      const tabs = await chrome.tabs.query({
        url: [`${APP_ORIGIN}/*`, "http://localhost:*/*"],
      });

      if (tabs.length === 0 || !tabs[0].id) {
        setSyncStatus("LingText wird geöffnet...");
        await chrome.tabs.create({ url: APP_ORIGIN });
        setSyncStatus("Öffne LingText und synchronisiere erneut");
        setSyncing(false);
        return;
      }

      await chrome.tabs.sendMessage(tabs[0].id, { type: "TRIGGER_SYNC" });
      setSyncStatus("Synchronisierung läuft...");

      const updatedTs = await new Promise<number>((resolve, reject) => {
        let timeoutId: ReturnType<typeof setTimeout> | null = null;

        const cleanup = (
          listener: (
            changes: { [key: string]: chrome.storage.StorageChange },
            areaName: string
          ) => void
        ) => {
          chrome.storage.onChanged.removeListener(listener);
          if (timeoutId) {
            clearTimeout(timeoutId);
          }
        };

        const listener = (
          changes: { [key: string]: chrome.storage.StorageChange },
          areaName: string
        ) => {
          if (areaName !== "local" || !changes.ltde_last_sync) {
            return;
          }

          const ts = changes.ltde_last_sync.newValue;
          if (typeof ts === "number" && ts > before) {
            cleanup(listener);
            resolve(ts);
          }
        };

        chrome.storage.onChanged.addListener(listener);

        timeoutId = setTimeout(() => {
          cleanup(listener);
          reject(new Error("SYNC_TIMEOUT"));
        }, 30000);

        chrome.storage.local.get("ltde_last_sync").then((result) => {
          const ts = result.ltde_last_sync;
          if (typeof ts === "number" && ts > before) {
            cleanup(listener);
            resolve(ts);
          }
        });
      });

      await loadAll();
      setLastSync(new Date(updatedTs).toLocaleString("de-DE"));
      setSyncStatus("✓ Synchronisiert");
      setSyncing(false);
    } catch (error) {
      console.error("[LingText Popup] Sync failed:", error);
      setSyncStatus("Synchronisierung fehlgeschlagen");
      setSyncing(false);
    }
  };

  return (
    <div className="popup">
      <header className="popup-header">
        <div className="logo">
          <span className="logo-icon">📚</span>
          <span className="logo-text">LingText</span>
        </div>
        <span className="version">v0.2.0</span>
      </header>

      <main className="popup-body">
        <section className="stats">
          <h2>Dein Vokabular</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <span className="stat-value">{stats.words}</span>
              <span className="stat-label">Wörter</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">{stats.phrases}</span>
              <span className="stat-label">Phrasen</span>
            </div>
          </div>
        </section>

        <section className="translator-section">
          <h2>Übersetzer</h2>
          <select
            className="translator-select"
            value={settings.translator}
            onChange={(event) =>
              updateSettings({ translator: event.target.value as TRANSLATORS })
            }
          >
            {Object.entries(TRANSLATOR_LABELS).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>

          {settings.translator !== TRANSLATORS.CHROME && (
            <div className="api-key-section">
              <label className="api-key-label">
                OpenRouter API Key
                <button
                  className="toggle-visibility"
                  onClick={() => setShowApiKey((prev) => !prev)}
                >
                  {showApiKey ? "🙈" : "👁️"}
                </button>
              </label>
              <input
                type={showApiKey ? "text" : "password"}
                className="api-key-input"
                placeholder="sk-or-..."
                value={settings.apiKey}
                onChange={(event) => updateSettings({ apiKey: event.target.value })}
              />
              <a
                href="https://openrouter.ai/keys"
                target="_blank"
                rel="noopener"
                className="api-key-link"
              >
                API-Schlüssel holen →
              </a>
            </div>
          )}
        </section>

        <section className="sync-section">
          <h2>Synchronisierung</h2>
          {lastSync && <p className="last-sync">Letzte Sync: {lastSync}</p>}
          {syncStatus && <p className="sync-status">{syncStatus}</p>}
          <div className="sync-buttons">
            <button className="btn btn-primary" onClick={handleSync} disabled={syncing}>
              {syncing ? "Synchronisiere..." : "🔄 Synchronisieren"}
            </button>
            <button className="btn btn-secondary" onClick={openLingText}>
              LingText öffnen
            </button>
          </div>
          <p className="sync-hint">
            Die Web-App ist die Quelle der Wahrheit. Bei der Synchronisierung
            wird die Erweiterung auf den finalen Zustand aktualisiert.
          </p>
        </section>

        <section className="help-section">
          <h2>So funktioniert es</h2>
          <ol>
            <li>Aktiviere englische Untertitel auf YouTube</li>
            <li>Klicke auf Wörter, um sie zu übersetzen</li>
            <li>Speichere Wörter und Phrasen zum Wiederholen</li>
          </ol>
        </section>
      </main>

      <footer className="popup-footer">
        <a href={APP_ORIGIN} target="_blank" rel="noopener">
          lingtext.de
        </a>
      </footer>
    </div>
  );
}
