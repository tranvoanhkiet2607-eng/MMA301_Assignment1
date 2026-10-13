import React, { createContext, useContext, useState, useEffect } from 'react';
import { DEFAULT_PROFILE } from '../constants/theme';
import { getStoredItem, setStoredItem, STORAGE_KEYS } from '../utils/storage';

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(DEFAULT_PROFILE);
  const [isProfileLoaded, setIsProfileLoaded] = useState(false);

  // Đọc dữ liệu profile từ AsyncStorage khi app khởi động
  useEffect(() => {
    const loadProfile = async () => {
      const savedProfile = await getStoredItem(STORAGE_KEYS.PROFILE, DEFAULT_PROFILE);
      setProfile(savedProfile || DEFAULT_PROFILE);
      setIsProfileLoaded(true);
    };

    loadProfile();
  }, []);

  // Cập nhật thông tin profile và lưu persistent
  const updateProfile = async (newProfileData) => {
    const updated = { ...profile, ...newProfileData };
    setProfile(updated); // Cập nhật state để UI phản hồi ngay lập tức
    await setStoredItem(STORAGE_KEYS.PROFILE, updated); // Lưu trữ persistent
    return true;
  };

  // Khôi phục dữ liệu profile về mặc định
  const resetProfile = async () => {
    setProfile(DEFAULT_PROFILE);
    await setStoredItem(STORAGE_KEYS.PROFILE, DEFAULT_PROFILE);
    return true;
  };

  return (
    <ProfileContext.Provider
      value={{
        profile,
        updateProfile,
        resetProfile,
        isProfileLoaded,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

// Custom Hook tiện lợi để sử dụng ProfileContext
export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile phải được sử dụng bên trong ProfileProvider');
  }
  return context;
};
