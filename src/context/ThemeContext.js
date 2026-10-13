import React, { createContext, useContext, useState, useEffect } from 'react';
import { lightColors, darkColors } from '../constants/theme';
import { getStoredItem, setStoredItem, STORAGE_KEYS } from '../utils/storage';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // State theme: false = Light Mode, true = Dark Mode
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isThemeLoaded, setIsThemeLoaded] = useState(false);

  // Đọc theme đã lưu khi app khởi động (Hydration)
  useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = await getStoredItem(STORAGE_KEYS.THEME, false);
      setIsDarkMode(Boolean(savedTheme));
      setIsThemeLoaded(true);
    };

    loadTheme();
  }, []);

  // Chuyển đổi theme và lưu ngay vào AsyncStorage
  const toggleTheme = async () => {
    const nextMode = !isDarkMode;
    setIsDarkMode(nextMode);
    await setStoredItem(STORAGE_KEYS.THEME, nextMode);
  };

  // Thiết lập theme cố định (cho nút reset)
  const setThemeMode = async (mode) => {
    setIsDarkMode(mode);
    await setStoredItem(STORAGE_KEYS.THEME, mode);
  };

  // Theme colors object hiện tại
  const theme = isDarkMode ? darkColors : lightColors;

  return (
    <ThemeContext.Provider
      value={{
        isDarkMode,
        theme,
        toggleTheme,
        setThemeMode,
        isThemeLoaded,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

// Custom Hook tiện lợi để sử dụng ThemeContext
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme phải được sử dụng bên trong ThemeProvider');
  }
  return context;
};
