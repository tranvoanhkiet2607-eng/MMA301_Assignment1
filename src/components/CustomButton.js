import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

/**
 * Component Button dùng chung (Reusable Button)
 * @param {string} title - Tiêu đề hiển thị trên nút
 * @param {function} onPress - Hàm callback khi bấm nút
 * @param {string} variant - Loại nút: 'primary' | 'secondary' | 'danger' | 'outline'
 * @param {boolean} disabled - Trạng thái vô hiệu hóa
 * @param {object} style - Style ghi đè cho container
 * @param {object} textStyle - Style ghi đè cho text
 */
export const CustomButton = ({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  style,
  textStyle,
}) => {
  const { theme } = useTheme();

  // Xác định màu sắc theo variant
  const getButtonStyles = () => {
    switch (variant) {
      case 'secondary':
        return {
          backgroundColor: theme.primaryLight,
          borderColor: theme.primaryLight,
          textColor: theme.primary,
        };
      case 'danger':
        return {
          backgroundColor: theme.danger,
          borderColor: theme.danger,
          textColor: '#FFFFFF',
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          borderColor: theme.primary,
          borderWidth: 1.5,
          textColor: theme.primary,
        };
      case 'primary':
      default:
        return {
          backgroundColor: theme.primary,
          borderColor: theme.primary,
          textColor: '#FFFFFF',
        };
    }
  };

  const btnColor = getButtonStyles();

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: btnColor.backgroundColor,
          borderColor: btnColor.borderColor,
          borderWidth: btnColor.borderWidth || 0,
          opacity: disabled ? 0.6 : 1,
        },
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Text style={[styles.text, { color: btnColor.textColor }, textStyle]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  text: {
    fontSize: 15,
    fontWeight: '600',
  },
});
