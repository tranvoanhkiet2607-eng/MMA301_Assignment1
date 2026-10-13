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
import { ProfileCard } from '../components/ProfileCard';
import { CustomButton } from '../components/CustomButton';

export const ProfileScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const { profile, resetProfile } = useProfile();

  const handleReset = () => {
    Alert.alert(
      'Khôi phục hồ sơ',
      'Bạn có chắc chắn muốn đặt lại hồ sơ về thông tin mặc định?',
      [
        { text: 'Hủy', style: 'cancel' },
        {
          text: 'Khôi phục',
          style: 'destructive',
          onPress: async () => {
            await resetProfile();
            Alert.alert('Thành công', 'Hồ sơ đã được đặt lại về mặc định.');
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
        <Text style={[styles.pageTitle, { color: theme.text }]}>
          Thông tin cá nhân
        </Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
          Dữ liệu được lưu trữ tự động trong bộ nhớ cục bộ (AsyncStorage).
        </Text>

        {/* Thẻ hiển thị đầy đủ Profile (Reusable Component) */}
        <ProfileCard
          profile={profile}
          isCompact={false}
          onEditPress={() => navigation.navigate('EditProfile')}
        />

        {/* Khối thông tin bổ sung cho sinh viên */}
        <View
          style={[
            styles.additionalCard,
            { backgroundColor: theme.surface, borderColor: theme.border },
          ]}
        >
          <Text style={[styles.cardTitle, { color: theme.text }]}>
            📌 Thông tin học tập
          </Text>

          <View style={styles.infoRow}>
            <Text style={[styles.label, { color: theme.textSecondary }]}>
              Sinh viên:
            </Text>
            <Text style={[styles.value, { color: theme.text, fontWeight: '700' }]}>
              Trần Võ Anh Kiệt
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={[styles.label, { color: theme.textSecondary }]}>
              Mã số sinh viên:
            </Text>
            <Text style={[styles.value, { color: theme.primary, fontWeight: '700' }]}>
              CE180795
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={[styles.label, { color: theme.textSecondary }]}>
              Cơ sở đào tạo:
            </Text>
            <Text style={[styles.value, { color: theme.text }]}>
              Đại học FPT (FPT University)
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={[styles.label, { color: theme.textSecondary }]}>
              Môn học:
            </Text>
            <Text style={[styles.value, { color: theme.text }]}>
              MMA301 - Multiplatform Mobile App
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={[styles.label, { color: theme.textSecondary }]}>
              Bài tập:
            </Text>
            <Text style={[styles.value, { color: theme.text }]}>
              Assignment 1 - Foundations
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={[styles.label, { color: theme.textSecondary }]}>
              Trạng thái State:
            </Text>
            <Text style={[styles.value, { color: theme.success }]}>
              ● Đã đồng bộ (Persisted)
            </Text>
          </View>
        </View>

        {/* Nút thao tác */}
        <View style={styles.actionButtons}>
          <CustomButton
            title="✏️ Chỉnh sửa hồ sơ"
            onPress={() => navigation.navigate('EditProfile')}
            variant="primary"
            style={styles.button}
          />

          <CustomButton
            title="🔄 Đặt lại về hồ sơ mặc định"
            onPress={handleReset}
            variant="outline"
            style={styles.button}
          />

          <CustomButton
            title="📋 Xem danh sách hoạt động"
            onPress={() => navigation.navigate('Activity')}
            variant="secondary"
            style={styles.button}
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
  pageTitle: {
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    marginBottom: 14,
  },
  additionalCard: {
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    marginVertical: 10,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  label: {
    fontSize: 13,
    fontWeight: '500',
  },
  value: {
    fontSize: 13,
    fontWeight: '600',
  },
  actionButtons: {
    marginTop: 10,
  },
  button: {
    marginVertical: 6,
    paddingVertical: 14,
  },
});
