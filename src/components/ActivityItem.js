import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';

/**
 * Reusable ActivityItem component hiển thị từng phần tử trong FlatList
 * @param {object} item - Phần tử hoạt động
 * @param {function} onToggleFavorite - Callback khi bấm nút Yêu thích
 * @param {function} onToggleCompleted - Callback khi bấm nút Hoàn thành
 * @param {function} onDelete - Callback khi bấm nút Xóa
 */
export const ActivityItem = ({
  item,
  onToggleFavorite,
  onToggleCompleted,
  onDelete,
}) => {
  const { theme } = useTheme();

  // Màu sắc badge theo category
  const getCategoryColor = (category) => {
    switch (category) {
      case 'Học tập':
        return { bg: '#E3F2FD', text: '#1976D2' };
      case 'Thể thao':
        return { bg: '#E8F5E9', text: '#388E3C' };
      case 'Giải trí':
        return { bg: '#FFF3E0', text: '#F57C00' };
      default:
        return { bg: theme.primaryLight, text: theme.primary };
    }
  };

  const categoryStyle = getCategoryColor(item.category);

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
      <View style={styles.topRow}>
        <View style={styles.badgeGroup}>
          {/* Badge phân loại */}
          <View style={[styles.badge, { backgroundColor: categoryStyle.bg }]}>
            <Text style={[styles.badgeText, { color: categoryStyle.text }]}>
              {item.category}
            </Text>
          </View>

          {/* Badge trạng thái */}
          <View
            style={[
              styles.badge,
              {
                backgroundColor: item.isCompleted
                  ? theme.successLight
                  : theme.primaryLight,
              },
            ]}
          >
            <Text
              style={[
                styles.badgeText,
                {
                  color: item.isCompleted ? theme.success : theme.primary,
                },
              ]}
            >
              {item.isCompleted ? '✓ Đã xong' : '⏳ Đang làm'}
            </Text>
          </View>
        </View>

        {/* Nút yêu thích (Favorite) */}
        <TouchableOpacity
          onPress={() => onToggleFavorite(item.id)}
          style={styles.actionIcon}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={styles.iconText}>{item.isFavorite ? '❤️' : '🤍'}</Text>
        </TouchableOpacity>
      </View>

      {/* Tiêu đề & mô tả */}
      <Text
        style={[
          styles.title,
          {
            color: theme.text,
            textDecorationLine: item.isCompleted ? 'line-through' : 'none',
            opacity: item.isCompleted ? 0.75 : 1,
          },
        ]}
      >
        {item.title}
      </Text>

      {item.description ? (
        <Text
          style={[styles.description, { color: theme.textSecondary }]}
          numberOfLines={2}
        >
          {item.description}
        </Text>
      ) : null}

      {/* Hàng nút hành động dưới cùng */}
      <View style={[styles.bottomRow, { borderTopColor: theme.border }]}>
        <TouchableOpacity
          style={[
            styles.statusButton,
            {
              backgroundColor: item.isCompleted
                ? theme.primaryLight
                : theme.successLight,
            },
          ]}
          onPress={() => onToggleCompleted(item.id)}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.statusButtonText,
              { color: item.isCompleted ? theme.primary : theme.success },
            ]}
          >
            {item.isCompleted ? '↩️ Đánh dấu chưa xong' : '✅ Hoàn thành'}
          </Text>
        </TouchableOpacity>

        {onDelete && (
          <TouchableOpacity
            style={[styles.deleteButton, { backgroundColor: theme.dangerLight }]}
            onPress={() => onDelete(item.id)}
            activeOpacity={0.7}
          >
            <Text style={[styles.deleteButtonText, { color: theme.danger }]}>
              🗑️ Xóa
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  badgeGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginRight: 6,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  actionIcon: {
    padding: 4,
  },
  iconText: {
    fontSize: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  description: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 10,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    borderTopWidth: 1,
    marginTop: 4,
  },
  statusButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  statusButtonText: {
    fontSize: 12,
    fontWeight: '600',
  },
  deleteButton: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  deleteButtonText: {
    fontSize: 12,
    fontWeight: '600',
  },
});
