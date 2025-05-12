import {MMKV} from 'react-native-mmkv';

const storage = new MMKV();

const MMKVStorage = {
  getItem: key => {
    const value = storage.getString(key);
    return Promise.resolve(value !== undefined ? value : null);
  },
  setItem: (key, value) => {
    storage.set(key, value);
    return Promise.resolve();
  },
  removeItem: key => {
    storage.delete(key);
    return Promise.resolve();
  },
};

export default MMKVStorage;
