import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';

/**
 * Reusable ProfileCard component
 * Hiển thị thẻ tóm tắt hoặc chi tiết hồ sơ người dùng
 * @param {object} profile - Dữ liệu profile (name, email, phone, bio, avatar, role)
 * @param {boolean} isCompact - Chế độ thu gọn (dùng ở Home) hoặc chi tiết (dùng ở Profile)
 * @param {function} onEditPress - Callback khi bấm nút Chỉnh sửa
 */
export const ProfileCard = ({ profile, isCompact = false, onEditPress }) => {
  const { theme } = useTheme();
  const [imageError, setImageError] = useState(false);

  // Lấy chữ cái đầu của tên để làm avatar dự phòng nếu ảnh lỗi
  const initialLetter = profile?.name ? profile.name.trim().charAt(0).toUpperCase() : 'U';

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.surface,
          borderColor: theme.border,
        },
      ]}
    >
      <View style={styles.headerRow}>
        {/* Avatar hiển thị ảnh hoặc chữ cái dự phòng */}
        <View
          style={[
            styles.avatarContainer,
            { backgroundColor: theme.primaryLight, borderColor: theme.primary },
          ]}
        >
          {profile?.avatar && !imageError ? (
            <Image
              source={{ uri: profile.avatar }}
              style={styles.avatar}
              onError={() => setImageError(true)}
            />
          ) : (
            <Text style={[styles.avatarInitial, { color: theme.primary }]}>
              {initialLetter}
            </Text>
          )}
        </View>

        <View style={styles.nameContainer}>
          <Text style={[styles.name, { color: theme.text }]} numberOfLines={1}>
            {profile?.name || 'Chưa cập nhật tên'}
          </Text>
          <Text style={[styles.role, { color: theme.primary }]}>
            {profile?.role || 'Sinh viên MMA301'}
          </Text>
          <Text style={[styles.email, { color: theme.textSecondary }]} numberOfLines={1}>
            ✉️ {profile?.email || 'Chưa có email'}
          </Text>
        </View>
      </View>

      {/* Hiển thị chi tiết khi không phải là compact */}
      {!isCompact && (
        <View style={[styles.detailsSection, { borderTopColor: theme.border }]}>
          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>
              📞 Điện thoại:
            </Text>
            <Text style={[styles.infoValue, { color: theme.text }]}>
              {profile?.phone || 'Chưa cập nhật'}
            </Text>
          </View>

          <View style={styles.bioContainer}>
            <Text style={[styles.infoLabel, { color: theme.textSecondary, marginBottom: 4 }]}>
              📝 Giới thiệu (Bio):
            </Text>
            <Text style={[styles.bioText, { color: theme.text }]}>
              {profile?.bio || 'Chưa có tiểu sử giới thiệu.'}
            </Text>
          </View>
        </View>
      )}

      {/* Nút hành động chỉnh sửa nếu có callback */}
      {onEditPress && (
        <TouchableOpacity
          style={[
            styles.editButton,
            {
              backgroundColor: theme.primaryLight,
              borderColor: theme.primary,
            },
          ]}
          onPress={onEditPress}
          activeOpacity={0.7}
        >
          <Text style={[styles.editButtonText, { color: theme.primary }]}>
            ✏️ Chỉnh sửa hồ sơ
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 68,
    height: 68,
    borderRadius: 34,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    marginRight: 14,
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  avatarInitial: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  nameContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 2,
  },
  role: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 4,
  },
  email: {
    fontSize: 13,
  },
  detailsSection: {
    marginTop: 14,
    paddingTop: 12,
    borderTopWidth: 1,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 13,
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 13,
    fontWeight: '600',
  },
  bioContainer: {
    marginTop: 4,
  },
  bioText: {
    fontSize: 13,
    lineHeight: 18,
    fontStyle: 'italic',
  },
  editButton: {
    marginTop: 14,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
