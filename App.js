import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Context Providers
import { ThemeProvider, useTheme } from './src/context/ThemeContext';
import { ProfileProvider } from './src/context/ProfileContext';

// Màn hình (5 screens bắt buộc)
import { HomeScreen } from './src/screens/HomeScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';
import { EditProfileScreen } from './src/screens/EditProfileScreen';
import { ActivityScreen } from './src/screens/ActivityScreen';
import { SettingsScreen } from './src/screens/SettingsScreen';

const Stack = createNativeStackNavigator();

/**
 * Component điều hướng chính bên trong ThemeProvider
 * Giúp Header navigation tự động ăn theo theme sáng/tối
 */
const AppNavigator = () => {
  const { theme, isDarkMode } = useTheme();

  return (
    <>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: theme.surface,
            },
            headerTintColor: theme.text,
            headerTitleStyle: {
              fontWeight: '700',
              fontSize: 18,
            },
            headerShadowVisible: false,
            contentStyle: {
              backgroundColor: theme.background,
            },
          }}
        >
          {/* Màn hình 1: Trang chủ / Tổng quan */}
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: 'Trang Chủ' }}
          />

          {/* Màn hình 2: Xem chi tiết hồ sơ cá nhân */}
          <Stack.Screen
            name="Profile"
            component={ProfileScreen}
            options={{ title: 'Hồ Sơ Cá Nhân' }}
          />

          {/* Màn hình 3: Chỉnh sửa hồ sơ (Form validation) */}
          <Stack.Screen
            name="EditProfile"
            component={EditProfileScreen}
            options={{ title: 'Chỉnh Sửa Hồ Sơ' }}
          />

          {/* Màn hình 4: Danh sách hoạt động & sở thích (FlatList) */}
          <Stack.Screen
            name="Activity"
            component={ActivityScreen}
            options={{ title: 'Hoạt Động & Sở Thích' }}
          />

          {/* Màn hình 5: Cài đặt hệ thống & Theme */}
          <Stack.Screen
            name="Settings"
            component={SettingsScreen}
            options={{ title: 'Cài Đặt Hệ Thống' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <ProfileProvider>
          <AppNavigator />
        </ProfileProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
