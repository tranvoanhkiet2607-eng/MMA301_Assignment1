// Theme colors và dữ liệu khởi tạo mặc định cho ứng dụng MMA301 Assignment 1

export const lightColors = {
  background: '#F5F7FB',
  surface: '#FFFFFF',
  card: '#FFFFFF',
  text: '#1C1E21',
  textSecondary: '#65676B',
  primary: '#0066CC',
  primaryLight: '#E7F3FF',
  border: '#E4E6EB',
  danger: '#DC3545',
  dangerLight: '#FFEAEA',
  success: '#28A745',
  successLight: '#E8F5E9',
  accent: '#FF9800',
  statusBar: 'dark',
};

export const darkColors = {
  background: '#121212',
  surface: '#1E1E1E',
  card: '#242526',
  text: '#E4E6EB',
  textSecondary: '#B0B3B8',
  primary: '#3399FF',
  primaryLight: '#183350',
  border: '#3A3B3C',
  danger: '#FF6B6B',
  dangerLight: '#3D1E1E',
  success: '#4CAF50',
  successLight: '#1E3D24',
  accent: '#FFA726',
  statusBar: 'light',
};

// Dữ liệu Profile mặc định (Safe default khi first-run hoặc lỗi storage)
export const DEFAULT_PROFILE = {
  name: 'Nguyễn Văn A',
  email: 'nguyenvana@fpt.edu.vn',
  phone: '0901234567',
  bio: 'Sinh viên ngành Lập trình Di động (MMA301). Yêu thích React Native và xây dựng ứng dụng di động đa nền tảng.',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80',
  role: 'Mobile App Developer Student',
};

// Dữ liệu danh sách hoạt động / sở thích mặc định
export const DEFAULT_ACTIVITIES = [
  {
    id: '1',
    title: 'Học React Native Foundations',
    category: 'Học tập',
    description: 'Nắm vững Props, State, Context API và AsyncStorage trong React Native.',
    isFavorite: true,
    isCompleted: true,
  },
  {
    id: '2',
    title: 'Xây dựng UI với Flexbox',
    category: 'Học tập',
    description: 'Thực hành bố cục màn hình với StyleSheet và Responsive Flexbox.',
    isFavorite: false,
    isCompleted: true,
  },
  {
    id: '3',
    title: 'Chạy bộ thể dục buổi sáng',
    category: 'Thể thao',
    description: 'Chạy bộ 3km quanh công viên để rèn luyện sức khỏe.',
    isFavorite: true,
    isCompleted: false,
  },
  {
    id: '4',
    title: 'Đọc sách Clean Code',
    category: 'Học tập',
    description: 'Đọc chương 3 về cách đặt tên biến và tách hàm ngắn gọn.',
    isFavorite: false,
    isCompleted: false,
  },
  {
    id: '5',
    title: 'Chơi cầu lông cuối tuần',
    category: 'Thể thao',
    description: 'Tham gia câu lạc bộ cầu lông cùng các bạn sinh viên trong lớp.',
    isFavorite: true,
    isCompleted: false,
  },
  {
    id: '6',
    title: 'Xem phim tài liệu công nghệ',
    category: 'Giải trí',
    description: 'Xem tập mới về lịch sử phát triển của hệ điều hành di động.',
    isFavorite: false,
    isCompleted: false,
  },
];
