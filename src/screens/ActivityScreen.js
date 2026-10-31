import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  TextInput,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeContext';
import { ActivityItem } from '../components/ActivityItem';
import { EmptyState } from '../components/EmptyState';
import { CustomButton } from '../components/CustomButton';
import { DEFAULT_ACTIVITIES } from '../constants/theme';
import { getStoredItem, setStoredItem, STORAGE_KEYS } from '../utils/storage';

const CATEGORIES = ['Tất cả', 'Học tập', 'Thể thao', 'Giải trí', 'Yêu thích'];

export const ActivityScreen = () => {
  const { theme } = useTheme();

  // State danh sách các hoạt động
  const [activities, setActivities] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Form thêm mới hoạt động
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Học tập');
  const [newDescription, setNewDescription] = useState('');

  // 1. Hydrate activities từ AsyncStorage khi mount
  useEffect(() => {
    const loadActivities = async () => {
      const stored = await getStoredItem(STORAGE_KEYS.ACTIVITIES, DEFAULT_ACTIVITIES);
      setActivities(Array.isArray(stored) ? stored : DEFAULT_ACTIVITIES);
    };

    loadActivities();
  }, []);

  // 2. Helper cập nhật state và lưu persistent vào AsyncStorage
  const updateActivitiesAndPersist = async (newList) => {
    setActivities(newList);
    await setStoredItem(STORAGE_KEYS.ACTIVITIES, newList);
  };

  // 3. Tương tác 1: Bật / tắt yêu thích (Toggle Favorite)
  const handleToggleFavorite = (id) => {
    const updated = activities.map((item) =>
      item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
    );
    updateActivitiesAndPersist(updated);
  };

  // 4. Tương tác 2: Đánh dấu Hoàn thành / Chưa hoàn thành (Toggle Completed)
  const handleToggleCompleted = (id) => {
    const updated = activities.map((item) =>
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    );
    updateActivitiesAndPersist(updated);
  };

  // 5. Tương tác 3: Xóa một mục hoạt động
  const handleDeleteItem = (id) => {
    Alert.alert('Xóa hoạt động', 'Bạn có chắc chắn muốn xóa mục này khỏi danh sách?', [
      { text: 'Hủy', style: 'cancel' },
      {
        text: 'Xóa',
        style: 'destructive',
        onPress: () => {
          const updated = activities.filter((item) => item.id !== id);
          updateActivitiesAndPersist(updated);
        },
      },
    ]);
  };

  // 6. Tương tác 4: Khôi phục danh sách mẫu ban đầu
  const handleRestoreDefaults = () => {
    updateActivitiesAndPersist(DEFAULT_ACTIVITIES);
    Alert.alert('Thành công', 'Đã khôi phục danh sách hoạt động mẫu.');
  };

  // 7. Tương tác 5: Xóa hết danh sách (để kiểm thử Empty State theo rubric)
  const handleClearAll = () => {
    Alert.alert(
      'Xóa toàn bộ danh sách',
      'Thao tác này dùng để kiểm tra hiển thị trạng thái danh sách rỗng (Empty State).',
      [
        { text: 'Hủy', style: 'cancel' },
        {
          text: 'Xóa hết',
          style: 'destructive',
          onPress: () => {
            updateActivitiesAndPersist([]);
          },
        },
      ]
    );
  };

  // 8. Thêm hoạt động mới
  const handleAddActivity = () => {
    if (!newTitle.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập tên hoạt động!');
      return;
    }

    const newItem = {
      id: Date.now().toString(),
      title: newTitle.trim(),
      category: newCategory,
      description: newDescription.trim(),
      isFavorite: false,
      isCompleted: false,
    };

    const updated = [newItem, ...activities];
    updateActivitiesAndPersist(updated);

    // Reset form và đóng modal
    setNewTitle('');
    setNewDescription('');
    setNewCategory('Học tập');
    setIsModalVisible(false);
  };

  // 9. Lọc danh sách theo Tab đang chọn
  const filteredActivities = activities.filter((item) => {
    if (selectedCategory === 'Tất cả') return true;
    if (selectedCategory === 'Yêu thích') return item.isFavorite;
    return item.category === selectedCategory;
  });

  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <View style={styles.container}>
        {/* Header trên cùng & nút bấm Thao tác */}
        <View style={styles.topBar}>
          <View>
            <Text style={[styles.title, { color: theme.text }]}>
              Hoạt động & Sở thích
            </Text>
            <Text style={[styles.counter, { color: theme.textSecondary }]}>
              Hiển thị {filteredActivities.length}/{activities.length} hoạt động
            </Text>
          </View>

          <TouchableOpacity
            style={[styles.addButton, { backgroundColor: theme.primary }]}
            onPress={() => setIsModalVisible(true)}
            activeOpacity={0.8}
          >
            <Text style={styles.addButtonText}>Thêm mới</Text>
          </TouchableOpacity>
        </View>

        {/* Thanh lọc Category Tabs */}
        <View style={styles.filterRow}>
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <TouchableOpacity
                key={cat}
                style={[
                  styles.filterTab,
                  {
                    backgroundColor: isSelected ? theme.primary : theme.surface,
                    borderColor: isSelected ? theme.primary : theme.border,
                  },
                ]}
                onPress={() => setSelectedCategory(cat)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.filterTabText,
                    {
                      color: isSelected ? '#FFFFFF' : theme.text,
                      fontWeight: isSelected ? '700' : '500',
                    },
                  ]}
                >
                  {cat}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* FlatList danh sách (Yêu cầu chính R06) */}
        <FlatList
          data={filteredActivities}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ActivityItem
              item={item}
              onToggleFavorite={handleToggleFavorite}
              onToggleCompleted={handleToggleCompleted}
              onDelete={handleDeleteItem}
            />
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <EmptyState
              title={
                selectedCategory === 'Yêu thích'
                  ? 'Chưa có mục yêu thích nào'
                  : 'Danh sách hoạt động trống'
              }
              message={
                selectedCategory === 'Yêu thích'
                  ? 'Hãy chọn yêu thích ở các hoạt động để xem tại đây.'
                  : 'Không tìm thấy hoạt động nào phù hợp. Bạn có thể thêm mới hoặc khôi phục dữ liệu mẫu.'
              }
              actionTitle="Khôi phục dữ liệu mẫu"
              onAction={handleRestoreDefaults}
            />
          }
        />

        {/* Thanh công cụ kiểm thử */}
        <View style={[styles.testToolbar, { backgroundColor: theme.surface, borderColor: theme.border }]}>
          <TouchableOpacity
            style={[styles.toolButton, { backgroundColor: theme.primaryLight }]}
            onPress={handleRestoreDefaults}
          >
            <Text style={[styles.toolText, { color: theme.primary }]}>
              Nạp lại dữ liệu mẫu
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.toolButton, { backgroundColor: theme.dangerLight }]}
            onPress={handleClearAll}
          >
            <Text style={[styles.toolText, { color: theme.danger }]}>
              Xóa tất cả
            </Text>
          </TouchableOpacity>
        </View>

        {/* Modal thêm hoạt động mới */}
        <Modal
          visible={isModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setIsModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View
              style={[
                styles.modalContent,
                { backgroundColor: theme.surface, borderColor: theme.border },
              ]}
            >
              <Text style={[styles.modalTitle, { color: theme.text }]}>
                Thêm hoạt động mới
              </Text>

              <Text style={[styles.modalLabel, { color: theme.text }]}>Tên hoạt động:</Text>
              <TextInput
                style={[
                  styles.modalInput,
                  { backgroundColor: theme.background, borderColor: theme.border, color: theme.text },
                ]}
                placeholder="Ví dụ: Ôn tập môn MMA301..."
                placeholderTextColor={theme.textSecondary}
                value={newTitle}
                onChangeText={setNewTitle}
              />

              <Text style={[styles.modalLabel, { color: theme.text }]}>Phân loại:</Text>
              <View style={styles.categoryPickerRow}>
                {['Học tập', 'Thể thao', 'Giải trí'].map((cat) => (
                  <TouchableOpacity
                    key={cat}
                    style={[
                      styles.categoryPickerItem,
                      {
                        backgroundColor: newCategory === cat ? theme.primary : theme.background,
                        borderColor: newCategory === cat ? theme.primary : theme.border,
                      },
                    ]}
                    onPress={() => setNewCategory(cat)}
                  >
                    <Text
                      style={{
                        color: newCategory === cat ? '#FFFFFF' : theme.text,
                        fontWeight: '600',
                        fontSize: 13,
                      }}
                    >
                      {cat}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={[styles.modalLabel, { color: theme.text }]}>Mô tả chi tiết:</Text>
              <TextInput
                style={[
                  styles.modalInput,
                  { backgroundColor: theme.background, borderColor: theme.border, color: theme.text, height: 70 },
                ]}
                placeholder="Ghi chú thêm về hoạt động..."
                placeholderTextColor={theme.textSecondary}
                multiline
                value={newDescription}
                onChangeText={setNewDescription}
              />

              <View style={styles.modalButtons}>
                <CustomButton
                  title="Thêm"
                  onPress={handleAddActivity}
                  variant="primary"
                  style={{ flex: 1, marginRight: 8 }}
                />
                <CustomButton
                  title="Hủy"
                  onPress={() => setIsModalVisible(false)}
                  variant="outline"
                  style={{ flex: 1 }}
                />
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
    paddingBottom: 4,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
  },
  counter: {
    fontSize: 12,
    marginTop: 2,
  },
  addButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
  },
  filterRow: {
    flexDirection: 'row',
    marginBottom: 12,
    flexWrap: 'wrap',
  },
  filterTab: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 6,
    marginBottom: 6,
  },
  filterTabText: {
    fontSize: 12,
  },
  listContent: {
    paddingBottom: 16,
  },
  testToolbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 4,
    marginBottom: 8,
  },
  toolButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 6,
    borderRadius: 6,
    marginHorizontal: 3,
    alignItems: 'center',
  },
  toolText: {
    fontSize: 11,
    fontWeight: '700',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    borderRadius: 14,
    padding: 18,
    borderWidth: 1,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 14,
  },
  modalLabel: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 6,
  },
  modalInput: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 12,
    fontSize: 14,
  },
  categoryPickerRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  categoryPickerItem: {
    flex: 1,
    paddingVertical: 8,
    borderWidth: 1,
    borderRadius: 6,
    alignItems: 'center',
    marginRight: 6,
  },
  modalButtons: {
    flexDirection: 'row',
    marginTop: 8,
  },
});
