import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useProfile } from '../context/ProfileContext';
import { CustomButton } from '../components/CustomButton';

export const EditProfileScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const { profile, updateProfile } = useProfile();

  // Controlled form state: sao chép giá trị ban đầu từ profile (không mutate trực tiếp)
  const [name, setName] = useState(profile.name || '');
  const [email, setEmail] = useState(profile.email || '');
  const [phone, setPhone] = useState(profile.phone || '');
  const [bio, setBio] = useState(profile.bio || '');

  // State lưu trữ lỗi validation cho từng trường
  const [errors, setErrors] = useState({});

  // Hàm validate form
  const validateForm = () => {
    const currentErrors = {};

    // 1. Kiểm tra Họ và tên
    if (!name.trim()) {
      currentErrors.name = 'Họ và tên không được để trống.';
    } else if (name.trim().length < 2) {
      currentErrors.name = 'Họ và tên phải có ít nhất 2 ký tự.';
    }

    // 2. Kiểm tra Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      currentErrors.email = 'Email không được để trống.';
    } else if (!emailRegex.test(email.trim())) {
      currentErrors.email = 'Định dạng email không hợp lệ (ví dụ: ten@domain.com).';
    }

    // 3. Kiểm tra Số điện thoại
    const phoneRegex = /^[0-9]{9,11}$/;
    if (!phone.trim()) {
      currentErrors.phone = 'Số điện thoại không được để trống.';
    } else if (!phoneRegex.test(phone.trim())) {
      currentErrors.phone = 'Số điện thoại phải từ 9 đến 11 chữ số.';
    }

    // 4. Kiểm tra Bio (giới hạn độ dài)
    if (bio.length > 200) {
      currentErrors.bio = 'Tiểu sử không được vượt quá 200 ký tự.';
    }

    setErrors(currentErrors);
    // Trả về true nếu không có lỗi nào
    return Object.keys(currentErrors).length === 0;
  };

  // Xử lý khi nhấn nút Lưu (Save)
  const handleSave = async () => {
    const isValid = validateForm();

    if (!isValid) {
      // Khi có lỗi validation, KHÔNG ghi dữ liệu vào context hay storage
      Alert.alert('Lỗi nhập liệu', 'Vui lòng kiểm tra và sửa các thông tin chưa hợp lệ.');
      return;
    }

    // Khi hợp lệ: Cập nhật qua ProfileContext (sẽ đồng thời lưu AsyncStorage)
    await updateProfile({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      bio: bio.trim(),
    });

    Alert.alert('Thành công', 'Hồ sơ cá nhân đã được lưu thành công!', [
      {
        text: 'OK',
        onPress: () => navigation.goBack(),
      },
    ]);
  };

  // Xử lý khi nhấn Hủy (Cancel)
  const handleCancel = () => {
    // Không lưu bất kỳ thay đổi nào, quay lại màn hình trước
    navigation.goBack();
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={[styles.title, { color: theme.text }]}>
            Chỉnh sửa thông tin
          </Text>
          <Text style={[styles.instruction, { color: theme.textSecondary }]}>
            Điền thông tin bên dưới và bấm Lưu để cập nhật.
          </Text>

          {/* Trường Họ và tên */}
          <View style={styles.formGroup}>
            <Text style={[styles.label, { color: theme.text }]}>
              Họ và tên <Text style={{ color: theme.danger }}>*</Text>
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: theme.surface,
                  borderColor: errors.name ? theme.danger : theme.border,
                  color: theme.text,
                },
              ]}
              placeholder="Nhập họ và tên..."
              placeholderTextColor={theme.textSecondary}
              value={name}
              onChangeText={(text) => {
                setName(text);
                if (errors.name) setErrors((prev) => ({ ...prev, name: null }));
              }}
            />
            {errors.name && (
              <Text style={[styles.errorText, { color: theme.danger }]}>
                ⚠️ {errors.name}
              </Text>
            )}
          </View>

          {/* Trường Email */}
          <View style={styles.formGroup}>
            <Text style={[styles.label, { color: theme.text }]}>
              Email <Text style={{ color: theme.danger }}>*</Text>
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: theme.surface,
                  borderColor: errors.email ? theme.danger : theme.border,
                  color: theme.text,
                },
              ]}
              placeholder="Nhập địa chỉ email..."
              placeholderTextColor={theme.textSecondary}
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (errors.email) setErrors((prev) => ({ ...prev, email: null }));
              }}
            />
            {errors.email && (
              <Text style={[styles.errorText, { color: theme.danger }]}>
                ⚠️ {errors.email}
              </Text>
            )}
          </View>

          {/* Trường Số điện thoại */}
          <View style={styles.formGroup}>
            <Text style={[styles.label, { color: theme.text }]}>
              Số điện thoại <Text style={{ color: theme.danger }}>*</Text>
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: theme.surface,
                  borderColor: errors.phone ? theme.danger : theme.border,
                  color: theme.text,
                },
              ]}
              placeholder="Nhập số điện thoại..."
              placeholderTextColor={theme.textSecondary}
              keyboardType="phone-pad"
              value={phone}
              onChangeText={(text) => {
                setPhone(text);
                if (errors.phone) setErrors((prev) => ({ ...prev, phone: null }));
              }}
            />
            {errors.phone && (
              <Text style={[styles.errorText, { color: theme.danger }]}>
                ⚠️ {errors.phone}
              </Text>
            )}
          </View>

          {/* Trường Tiểu sử (Bio) */}
          <View style={styles.formGroup}>
            <View style={styles.labelRow}>
              <Text style={[styles.label, { color: theme.text }]}>
                Tiểu sử ngắn (Bio)
              </Text>
              <Text style={[styles.charCount, { color: theme.textSecondary }]}>
                {bio.length}/200
              </Text>
            </View>
            <TextInput
              style={[
                styles.input,
                styles.textArea,
                {
                  backgroundColor: theme.surface,
                  borderColor: errors.bio ? theme.danger : theme.border,
                  color: theme.text,
                },
              ]}
              placeholder="Giới thiệu bản thân, sở thích hoặc định hướng nghề nghiệp..."
              placeholderTextColor={theme.textSecondary}
              multiline
              numberOfLines={4}
              maxLength={200}
              value={bio}
              onChangeText={(text) => {
                setBio(text);
                if (errors.bio) setErrors((prev) => ({ ...prev, bio: null }));
              }}
            />
            {errors.bio && (
              <Text style={[styles.errorText, { color: theme.danger }]}>
                ⚠️ {errors.bio}
              </Text>
            )}
          </View>

          {/* Nhóm nút Lưu / Hủy */}
          <View style={styles.buttonGroup}>
            <CustomButton
              title="💾 Lưu thay đổi"
              onPress={handleSave}
              variant="primary"
              style={styles.saveButton}
            />

            <CustomButton
              title="❌ Hủy bỏ"
              onPress={handleCancel}
              variant="outline"
              style={styles.cancelButton}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  container: {
    padding: 16,
    paddingBottom: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 4,
  },
  instruction: {
    fontSize: 13,
    marginBottom: 16,
  },
  formGroup: {
    marginBottom: 16,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
  },
  charCount: {
    fontSize: 12,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
  },
  textArea: {
    minHeight: 90,
    textAlignVertical: 'top',
  },
  errorText: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: '500',
  },
  buttonGroup: {
    marginTop: 10,
  },
  saveButton: {
    marginVertical: 6,
    paddingVertical: 14,
  },
  cancelButton: {
    marginVertical: 6,
    paddingVertical: 14,
  },
});
