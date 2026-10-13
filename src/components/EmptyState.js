import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { CustomButton } from './CustomButton';

/**
 * Reusable EmptyState component hiển thị khi danh sách rỗng (FlatList ListEmptyComponent)
 * @param {string} icon - Biểu tượng emoji
 * @param {string} title - Tiêu đề thông báo
 * @param {string} message - Nội dung chi tiết
 * @param {string} actionTitle - Tiêu đề nút hành động (nếu có)
 * @param {function} onAction - Hàm thực hiện khi bấm nút
 */
export const EmptyState = ({
  icon = '📭',
  title = 'Chưa có hoạt động nào',
  message = 'Danh sách hiện tại đang trống. Hãy thêm hoạt động mới hoặc khôi phục dữ liệu mẫu!',
  actionTitle,
  onAction,
}) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.surface, borderColor: theme.border }]}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
      <Text style={[styles.message, { color: theme.textSecondary }]}>{message}</Text>

      {actionTitle && onAction && (
        <CustomButton
          title={actionTitle}
          onPress={onAction}
          variant="secondary"
          style={styles.button}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    borderStyle: 'dashed',
  },
  icon: {
    fontSize: 48,
    marginBottom: 12,
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 6,
    textAlign: 'center',
  },
  message: {
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
});
