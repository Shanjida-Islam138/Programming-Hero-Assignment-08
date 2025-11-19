const STORAGE_KEY = 'hero-io-installed-apps-v1';

const hasWindow = typeof window !== 'undefined';

const readStorage = () => {
    if (!hasWindow) {
        return [];
    }
    try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (!raw) {
            return [];
        }
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
            return parsed;
        }
        window.localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
        console.error('Failed to parse installed apps from storage', error);
        window.localStorage.removeItem(STORAGE_KEY);
    }
    return [];
};

const writeStorage = (data) => {
    if (!hasWindow) {
        return;
    }
    try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
        console.error('Failed to persist installed apps', error);
    }
};

export const getInstalledApps = () => readStorage();

export const getInstalledAppIds = () => readStorage().map((entry) => entry.id);

export const isAppInstalled = (id) => getInstalledAppIds().includes(Number(id));

export const installApp = (app) => {
    const existing = readStorage();
    const alreadyInstalled = existing.some((entry) => entry.id === app.id);

    if (alreadyInstalled) {
        return existing;
    }

    const payload = {
        ...app,
        installedAt: new Date().toISOString(),
    };

    const next = [...existing, payload];
    writeStorage(next);
    return next;
};

export const uninstallApp = (id) => {
    const existing = readStorage();
    const next = existing.filter((entry) => entry.id !== Number(id));
    writeStorage(next);
    return next;
};

export const syncInstalledWithApps = (apps) => {
    const existing = readStorage();
    const availableIds = new Set(apps.map((app) => app.id));
    const filtered = existing.filter((entry) => availableIds.has(entry.id));
    if (filtered.length !== existing.length) {
        writeStorage(filtered);
    }
    return filtered;
};
