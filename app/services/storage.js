import Store from 'electron-store';

const store = new Store();

export const setItem = (key, value) => store.set(key, value);

export const getItem = key => store.get(key);

export const removeItem = key => store.delete(key);
