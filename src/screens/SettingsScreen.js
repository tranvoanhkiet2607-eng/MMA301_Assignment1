import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useProfile } from '../context/ProfileContext';
import { ThemeToggle } from '../components/ThemeToggle';
import { CustomButton } from '../components/CustomButton';
import { clearAppStorage } from '../utils/storage';

export const SettingsScreen = ({ navigation }) => {
  const { theme, isDarkMode, setThemeMode } = useTheme();
  const { resetProfile } = useProfile();

  // Xử lý khôi phục toàn bộ cài đặt ứng dụng
  const handleFullReset = () => {
    Alert.alert(
      'Khôi phục cài đặt gốc',
      'Thao tác này sẽ xóa toàn bộ dữ liệu lưu trữ trong AsyncStorage và đưa ứng dụng về trạng thái ban đầu (First-run). Bạn có muốn tiếp tục?',
      [
        { text: 'Hủy', style: 'cancel' },
        {
          text: 'Đồng ý đặt lại',
          style: 'destructive',
          onPress: async () => {
            // Xóa bộ nhớ AsyncStorage
            await clearAppStorage();
            // Đặt lại state context
            await resetProfile();
            await setThemeMode(false);

            Alert.alert(
              'Thành công',
              'Dữ liệu đã được đặt lại về mặc định an toàn!',
              [{ text: 'Về trang chủ', onPress: () => navigation.navigate('Home') }]
            );
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.title, { color: theme.text }]}>
          Cài đặt hệ thống
        </Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
          Tùy chỉnh giao diện và quản lý dữ liệu lưu trữ trên thiết bị.
        </Text>

        {/* Khu vực Giao diện */}
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          🎨 Giao diện & Chủ đề (Theme)
        </Text>
        <ThemeToggle style={styles.toggleCard} />

        <View
          style={[
            styles.infoBox,
            { backgroundColor: theme.surface, borderColor: theme.border },
          ]}
        >
          <Text style={[styles.infoBoxTitle, { color: theme.text }]}>
            💡 Cơ chế hoạt động:
          </Text>
          <Text style={[styles.infoBoxText, { color: theme.textSecondary }]}>
            Trạng thái {isDarkMode ? '🌙 Dark Mode' : '☀️ Light Mode'} được chia sẻ
            thông qua Context API và tự động lưu vào bộ nhớ cục bộ (@react-native-async-storage).
            Khi khởi động lại ứng dụng, giao diện sẽ được khôi phục chính xác mà không bị mất.
          </Text>
        </View>

        {/* Khu vực Quản lý bộ nhớ & Dữ liệu */}
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          💾 Dữ liệu & Lưu trữ (Persistence)
        </Text>

        <View
          style={[
            styles.storageCard,
            { backgroundColor: theme.surface, borderColor: theme.border },
          ]}
        >
          <Text style={[styles.storageTitle, { color: theme.text }]}>
            Khôi phục trạng thái mặc định
          </Text>
          <Text style={[styles.storageDesc, { color: theme.textSecondary }]}>
            Dùng để mô phỏng lần đầu tiên mở ứng dụng (First-run scenario) hoặc xóa dữ liệu kiểm thử.
          </Text>

          <CustomButton
            title="⚠️ Khôi phục toàn bộ dữ liệu mặc định"
            onPress={handleFullReset}
            variant="danger"
            style={styles.resetButton}
          />
        </View>

        {/* Khu vực Thông tin sinh viên & Assignment */}
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          ℹ️ Thông tin môn học & Đề tài
        </Text>

        <View
          style={[
            styles.aboutCard,
            { backgroundColor: theme.surface, borderColor: theme.border },
          ]}
        >
          <View style={styles.aboutRow}>
            <Text style={[styles.aboutLabel, { color: theme.textSecondary }]}>
              Môn học:
            </Text>
            <Text style={[styles.aboutValue, { color: theme.text }]}>
              MMA301 - Multiplatform Mobile App Development
            </Text>
          </View>

          <View style={styles.aboutRow}>
            <Text style={[styles.aboutLabel, { color: theme.textSecondary }]}>
              Bài đánh giá:
            </Text>
            <Text style={[styles.aboutValue, { color: theme.text }]}>
              Assignment 01 - React Native Foundations
            </Text>
          </View>

          <View style={styles.aboutRow}>
            <Text style={[styles.aboutLabel, { color: theme.textSecondary }]}>
              Đề tài:
            </Text>
            <Text style={[styles.aboutValue, { color: theme.primary }]}>
              Personal Profile & Activity App
            </Text>
          </View>

          <View style={styles.aboutRow}>
            <Text style={[styles.aboutLabel, { color: theme.textSecondary }]}>
              Công nghệ:
            </Text>
            <Text style={[styles.aboutValue, { color: theme.text }]}>
              React Native, Expo, React Navigation, Context API, AsyncStorage
            </Text>
          </View>

          <View style={styles.aboutRow}>
            <Text style={[styles.aboutLabel, { color: theme.textSecondary }]}>
              Phiên bản:
            </Text>
            <Text style={[styles.aboutValue, { color: theme.text }]}>
              1.0.0 (Release Candidate)
            </Text>
          </View>
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
    paddingBottom: 36,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    marginTop: 14,
    marginBottom: 8,
  },
  toggleCard: {
    marginBottom: 10,
  },
  infoBox: {
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 10,
  },
  infoBoxTitle: {
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 4,
  },
  infoBoxText: {
    fontSize: 12,
    lineHeight: 18,
  },
  storageCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 10,
  },
  storageTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 4,
  },
  storageDesc: {
    fontSize: 12,
    lineHeight: 17,
    marginBottom: 12,
  },
  resetButton: {
    paddingVertical: 12,
  },
  aboutCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginTop: 4,
  },
  aboutRow: {
    paddingVertical: 6,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E0E0E0',
  },
  aboutLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 2,
  },
  aboutValue: {
    fontSize: 13,
    fontWeight: '600',
  },
});
