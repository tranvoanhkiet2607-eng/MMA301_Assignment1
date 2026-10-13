import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useProfile } from '../context/ProfileContext';
import { ProfileCard } from '../components/ProfileCard';
import { ThemeToggle } from '../components/ThemeToggle';
import { CustomButton } from '../components/CustomButton';
import { getStoredItem, STORAGE_KEYS } from '../utils/storage';
import { DEFAULT_ACTIVITIES } from '../constants/theme';

export const HomeScreen = ({ navigation }) => {
  const { theme, isDarkMode } = useTheme();
  const { profile } = useProfile();
  const [activityStats, setActivityStats] = useState({ total: 0, favorites: 0 });

  // Đọc danh sách hoạt động để thống kê số lượng trên Home
  useEffect(() => {
    const fetchStats = async () => {
      const list = await getStoredItem(STORAGE_KEYS.ACTIVITIES, DEFAULT_ACTIVITIES);
      const safeList = Array.isArray(list) ? list : DEFAULT_ACTIVITIES;
      const favoritesCount = safeList.filter((item) => item.isFavorite).length;
      setActivityStats({
        total: safeList.length,
        favorites: favoritesCount,
      });
    };

    // Lắng nghe khi màn hình được focus lại (từ Activity quay về)
    const unsubscribe = navigation.addListener('focus', () => {
      fetchStats();
    });

    fetchStats();
    return unsubscribe;
  }, [navigation]);

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Banner chào mừng */}
        <View style={styles.header}>
          <View>
            <Text style={[styles.greeting, { color: theme.textSecondary }]}>
              Xin chào sinh viên 👋
            </Text>
            <Text style={[styles.userName, { color: theme.text }]}>
              {profile.name}
            </Text>
          </View>
          <View
            style={[
              styles.badgeApp,
              { backgroundColor: theme.primaryLight, borderColor: theme.primary },
            ]}
          >
            <Text style={[styles.badgeAppText, { color: theme.primary }]}>
              MMA301 - Lab 1
            </Text>
          </View>
        </View>

        {/* Profile Card tóm tắt (Reusable Component) */}
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          👤 Hồ sơ cá nhân
        </Text>
        <ProfileCard
          profile={profile}
          isCompact={true}
          onEditPress={() => navigation.navigate('EditProfile')}
        />

        {/* Khối thống kê nhanh */}
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          📊 Tổng quan hoạt động
        </Text>
        <View style={styles.statsRow}>
          <TouchableOpacity
            style={[
              styles.statBox,
              { backgroundColor: theme.surface, borderColor: theme.border },
            ]}
            onPress={() => navigation.navigate('Activity')}
            activeOpacity={0.8}
          >
            <Text style={styles.statIcon}>📋</Text>
            <Text style={[styles.statNumber, { color: theme.primary }]}>
              {activityStats.total}
            </Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
              Tổng hoạt động
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.statBox,
              { backgroundColor: theme.surface, borderColor: theme.border },
            ]}
            onPress={() => navigation.navigate('Activity')}
            activeOpacity={0.8}
          >
            <Text style={styles.statIcon}>❤️</Text>
            <Text style={[styles.statNumber, { color: '#E91E63' }]}>
              {activityStats.favorites}
            </Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
              Mục yêu thích
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.statBox,
              { backgroundColor: theme.surface, borderColor: theme.border },
            ]}
            onPress={() => navigation.navigate('Settings')}
            activeOpacity={0.8}
          >
            <Text style={styles.statIcon}>{isDarkMode ? '🌙' : '☀️'}</Text>
            <Text style={[styles.statNumber, { color: theme.accent }]}>
              {isDarkMode ? 'Dark' : 'Light'}
            </Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
              Chế độ nền
            </Text>
          </TouchableOpacity>
        </View>

        {/* Điều khiển nhanh Theme */}
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          🎨 Giao diện ứng dụng
        </Text>
        <ThemeToggle />

        {/* Menu Điều hướng chính (Navigation giữa các khu vực) */}
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          🧭 Điều hướng chính
        </Text>

        <View style={styles.buttonList}>
          <CustomButton
            title="🔍 Xem chi tiết Hồ sơ (Profile)"
            onPress={() => navigation.navigate('Profile')}
            variant="outline"
            style={styles.navButton}
          />

          <CustomButton
            title="📝 Quản lý Hoạt động & Sở thích"
            onPress={() => navigation.navigate('Activity')}
            variant="primary"
            style={styles.navButton}
          />

          <CustomButton
            title="⚙️ Cài đặt & Tùy chọn hệ thống"
            onPress={() => navigation.navigate('Settings')}
            variant="secondary"
            style={styles.navButton}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    padding: 16,
    paddingBottom: 32,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  greeting: {
    fontSize: 14,
    fontWeight: '500',
  },
  userName: {
    fontSize: 22,
    fontWeight: '800',
    marginTop: 2,
  },
  badgeApp: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
  },
  badgeAppText: {
    fontSize: 12,
    fontWeight: '700',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginTop: 14,
    marginBottom: 6,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  statBox: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  statIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: '800',
  },
  statLabel: {
    fontSize: 11,
    marginTop: 2,
    textAlign: 'center',
  },
  buttonList: {
    marginTop: 6,
  },
  navButton: {
    marginVertical: 6,
    paddingVertical: 14,
  },
});
