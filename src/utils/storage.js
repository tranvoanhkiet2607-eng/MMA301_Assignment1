import AsyncStorage from '@react-native-async-storage/async-storage';

// Các key lưu trữ AsyncStorage dùng trong toàn bộ ứng dụng
export const STORAGE_KEYS = {
  PROFILE: '@mma301_profile_data',
  THEME: '@mma301_theme_mode',
  ACTIVITIES: '@mma301_activities_list',
};

/**
 * Đọc dữ liệu từ AsyncStorage an toàn.
 * Có fallback khi dữ liệu null hoặc chuỗi JSON bị lỗi (corrupted data).
 * @param {string} key - Khóa lưu trữ
 * @param {any} fallbackValue - Giá trị mặc định trả về nếu có lỗi hoặc không có dữ liệu
 * @returns {Promise<any>}
 */
export const getStoredItem = async (key, fallbackValue) => {
  try {
    const rawValue = await AsyncStorage.getItem(key);
    if (rawValue === null || rawValue === undefined) {
      // First-run: Chưa có dữ liệu lưu trữ
      return fallbackValue;
    }
    // Parse JSON
    return JSON.parse(rawValue);
  } catch (error) {
    // Tránh app crash khi JSON corrupted hoặc lỗi đọc bộ nhớ
    console.warn(`[Storage] Lỗi khi đọc key "${key}", dùng fallback:`, error);
    return fallbackValue;
  }
};

/**
 * Lưu trữ dữ liệu vào AsyncStorage
 * @param {string} key - Khóa lưu trữ
 * @param {any} value - Dữ liệu cần lưu
 * @returns {Promise<boolean>}
 */
export const setStoredItem = async (key, value) => {
  try {
    const serialized = JSON.stringify(value);
    await AsyncStorage.setItem(key, serialized);
    return true;
  } catch (error) {
    console.error(`[Storage] Lỗi khi lưu key "${key}":`, error);
    return false;
  }
};

/**
 * Xóa một mục trong AsyncStorage
 * @param {string} key - Khóa cần xóa
 */
export const removeStoredItem = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`[Storage] Lỗi khi xóa key "${key}":`, error);
    return false;
  }
};

/**
 * Xóa toàn bộ dữ liệu ứng dụng (để reset về mặc định)
 */
export const clearAppStorage = async () => {
  try {
    await AsyncStorage.multiRemove([
      STORAGE_KEYS.PROFILE,
      STORAGE_KEYS.THEME,
      STORAGE_KEYS.ACTIVITIES,
    ]);
    return true;
  } catch (error) {
    console.error('[Storage] Lỗi khi xóa dữ liệu ứng dụng:', error);
    return false;
  }
};
