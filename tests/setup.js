import '@testing-library/jest-dom'

// jsdom does not reliably implement localStorage in this environment -- provide an in-memory stub
// so components that read/write theme + PWA-dismiss state (ThemeToggle, InstallPrompt) can render.
const __localStorageStore = new Map()
Object.defineProperty(window, 'localStorage', {
  writable: true,
  value: {
    getItem: (key) => (__localStorageStore.has(key) ? __localStorageStore.get(key) : null),
    setItem: (key, value) => { __localStorageStore.set(key, String(value)) },
    removeItem: (key) => { __localStorageStore.delete(key) },
    clear: () => { __localStorageStore.clear() },
    key: (i) => Array.from(__localStorageStore.keys())[i] ?? null,
    get length() { return __localStorageStore.size },
  },
})

// jsdom does not implement window.matchMedia -- stub it for components that check prefers-color-scheme
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
})
