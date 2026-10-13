import React from 'react';
import { View, Text, Switch, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';

/**
 * Reusable Component chuyển đổi theme sáng/tối
 * Có thể dùng dạng Switch hoặc nút bấm nhanh
 */
export const ThemeToggle = ({ showLabel = true, style }) => {
  const { isDarkMode, theme, toggleTheme } = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: theme.surface,
          borderColor: theme.border,
        },
        style,
      ]}
      onPress={toggleTheme}
      activeOpacity={0.8}
    >
      <View style={styles.leftContent}>
        {showLabel && (
          <View style={styles.labelContainer}>
            <Text style={[styles.title, { color: theme.text }]}>
              {isDarkMode ? 'Chế độ tối (Dark Mode)' : 'Chế độ sáng (Light Mode)'}
            </Text>
            <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
              {isDarkMode ? 'Đang bật nền tối' : 'Đang bật nền sáng'}
            </Text>
          </View>
        )}
      </View>

      <Switch
        value={isDarkMode}
        onValueChange={toggleTheme}
        trackColor={{ false: '#D1D5DB', true: theme.primary }}
        thumbColor={isDarkMode ? '#FFFFFF' : '#F4F3F4'}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginVertical: 6,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  icon: {
    fontSize: 22,
    marginRight: 12,
  },
  labelContainer: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 12,
    marginTop: 2,
  },
});
