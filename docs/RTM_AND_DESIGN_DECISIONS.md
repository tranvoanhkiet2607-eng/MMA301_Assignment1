# HỒ SƠ YÊU CẦU & QUYẾT ĐỊNH THIẾT KẾ (RTM & DDR)
**Môn học:** MMA301 - Multiplatform Mobile App Development  
**Bài tập:** Assignment 01 – Profile & Activity App (React Native Foundations)  
**Nền tảng:** React Native + Expo (JavaScript)  

---

## 1. BẢNG TRUY VẾT YÊU CẦU (Requirement Traceability Matrix - RTM)

Bảng đối chiếu 10 yêu cầu kỹ thuật cốt lõi (R01 - R10) theo tài liệu môn học:

| ID | Yêu cầu | Bằng chứng UI / Source Code | File thực thi | Test tối thiểu & Kết quả |
|:---|:---|:---|:---|:---|
| **R01** | Expo/React Native project chạy đúng quy ước | `package.json`, `app.json`, `App.js` | `App.js`, `package.json` | Cold start thành công, không crash (PASS) |
| **R02** | Navigation giữa ≥ 5 khu vực/màn hình | `Stack.Navigator` với 5 routes: Home, Profile, EditProfile, Activity, Settings | `App.js` | Điều hướng qua lại, back stack mượt mà (PASS) |
| **R03** | Profile hiển thị dữ liệu đầy đủ | Họ tên, email, SĐT, bio, vai trò, avatar | `src/screens/ProfileScreen.js`, `src/components/ProfileCard.js` | Hiển thị cả default và persisted data (PASS) |
| **R04** | Edit Profile + Validation chặt chẽ | Controlled Form, validation lỗi, Save / Cancel | `src/screens/EditProfileScreen.js` | Báo lỗi tên rỗng/email sai, không lưu khi có lỗi (PASS) |
| **R05** | Theme chia sẻ toàn ứng dụng bằng Context | `ThemeContext` cung cấp theme, `isDarkMode`, `toggleTheme` | `src/context/ThemeContext.js`, `src/components/ThemeToggle.js` | Toggle theme đổi màu toàn bộ 5 screens (PASS) |
| **R06** | FlatList cho dữ liệu collection | `FlatList`, `renderItem`, `keyExtractor`, Empty State | `src/screens/ActivityScreen.js`, `src/components/ActivityItem.js` | Render danh sách, filter, hiển thị Empty khi mảng rỗng (PASS) |
| **R07** | Persistence bằng AsyncStorage | `AsyncStorage` lưu trữ Profile, Theme, Activities | `src/utils/storage.js`, `src/context/*` | First-run fallback an toàn, restart app vẫn giữ nguyên dữ liệu (PASS) |
| **R08** | Reusable components | Các component dùng lại độc lập | `src/components/*` | Tái sử dụng `ProfileCard` ở Home & Profile, `CustomButton`, `ThemeToggle` (PASS) |
| **R09** | Responsive Flexbox & Clean Style | Sử dụng `StyleSheet.create` + Flexbox layout | Tất cả screens & components | Bố cục vừa vặn trên các kích thước màn hình (PASS) |
| **R10** | Error / Fallback state an toàn | Fallback khi dữ liệu rỗng, hỏng hoặc lỗi lưu trữ | `src/utils/storage.js`, `src/components/EmptyState.js` | Parse JSON lỗi không làm vỡ app, dùng safe default (PASS) |

---

## 2. STATE OWNERSHIP MAP (Bản đồ phân quyền State)

Theo nguyên tắc "đủ gần consumer và tránh re-render thừa":

| Loại State | Dữ liệu cụ thể | Nơi quản lý (Owner) | Lý do kỹ thuật |
|:---|:---|:---|:---|
| **Local State (UI)** | `errors`, `newTitle`, `isModalVisible`, `selectedCategory` | `EditProfileScreen`, `ActivityScreen` | Thuộc vòng đời nội bộ của màn hình/form, không màn hình nào khác cần biết. |
| **Form State** | `name`, `email`, `phone`, `bio` trong form sửa | `EditProfileScreen` (`useState`) | Tránh cập nhật trực tiếp vào global state khi người dùng chưa nhấn "Lưu". |
| **Shared State** | Dữ liệu profile (`profile`), hàm `updateProfile` | `ProfileContext` | HomeScreen và ProfileScreen đều cần đọc và hiển thị dữ liệu mới nhất. |
| **App-wide State**| Chế độ theme (`isDarkMode`, bảng màu `theme`) | `ThemeContext` | Toàn bộ các component, navigation header và 5 screens đều cần đổi màu đồng bộ. |
| **Persistent Data**| Key profile, theme mode, danh sách activities | `AsyncStorage` qua `storage.js` | Giữ nguyên trạng thái qua các lần đóng/mở và khởi động lại app. |

---

## 3. DESIGN DECISION RECORD (DDR) - 5 QUYẾT ĐỊNH KỸ THUẬT

### Quyết định 1: Lựa chọn Navigation (React Navigation Native Stack)
- **Lựa chọn:** Sử dụng `@react-navigation/native-stack` (`createNativeStackNavigator`).
- **Lý do:**
  1. Hiệu năng mượt mà vì sử dụng native platform primitives của hệ điều hành.
  2. Dễ cấu hình, dễ hiểu cho bài tập nền tảng (không lạm dụng router file-system phức tạp).
  3. Hỗ trợ truyền headerStyle động theo `ThemeContext` cực kỳ đơn giản.
- **Tác động nếu đổi yêu cầu:** Nếu giảng viên yêu cầu đổi sang Tab Navigator (Bottom Tabs), chỉ cần thay `createNativeStackNavigator` bằng `createBottomTabNavigator` tại `App.js` mà không phải viết lại logic của bất kỳ màn hình nào.

### Quyết định 2: Quản lý State bằng Context API thay vì Redux
- **Lựa chọn:** Tách thành 2 context riêng biệt: `ThemeContext` và `ProfileContext`.
- **Lý do:**
  1. Quy mô Assignment 1 phù hợp tuyệt đối với React Context API có sẵn của React.
  2. Tránh cài đặt thêm các thư viện cồng kềnh như Redux/Zustand khiến code khó giải thích và dễ bị giảng viên đánh giá là "over-engineering".
  3. Tách riêng `ThemeContext` và `ProfileContext` để khi theme đổi màu không kích hoạt re-render logic tính toán profile không cần thiết.
- **Tác động nếu đổi yêu cầu:** Nếu app mở rộng thêm nhiều module (ví dụ Shopping Cart, Auth), có thể dễ dàng bổ sung `AuthContext` bao quanh mà không xung đột.

### Quyết định 3: Chiến lược Lưu trữ & Khởi tạo (Hydration Strategy)
- **Lựa chọn:** Đóng gói toàn bộ logic gọi `AsyncStorage` vào file helper `src/utils/storage.js` với `try/catch` và tham số `fallbackValue`.
- **Lý do:**
  1. Tránh code lặp lại `JSON.stringify` và `JSON.parse` ở nhiều màn hình.
  2. Xử lý triệt để lỗi crash app khi bộ nhớ máy trả về `null` (first-run) hoặc chuỗi JSON bị lỗi cấu trúc (corrupted JSON).
  3. Khi hydrate trong `useEffect`, nếu không tìm thấy key thì dùng ngay `DEFAULT_PROFILE` / `DEFAULT_ACTIVITIES`.
- **Tác động nếu đổi yêu cầu:** Nếu chuyển sang lưu bằng SQLite hoặc gọi API Cloud, chỉ cần thay đổi code bên trong `storage.js` mà các Screen vẫn giữ nguyên giao diện gọi hàm.

### Quyết định 4: Bố cục danh sách với FlatList và KeyExtractor
- **Lựa chọn:** Dùng `FlatList` với `keyExtractor={(item) => item.id.toString()}`, tách component con `ActivityItem` và component `EmptyState`.
- **Lý do:**
  1. `FlatList` chỉ render các item trong khung nhìn hiển thị (virtualization), tiết kiệm RAM vượt trội so với `ScrollView + map()`.
  2. `keyExtractor` ổn định giúp React Native xác định đúng phần tử khi toggle checkbox hoặc xóa item mà không re-render sai.
  3. Đảm bảo đáp ứng trọn vẹn rubric về empty state khi filter hoặc khi xóa hết dữ liệu.
- **Tác động nếu đổi yêu cầu:** Nếu giảng viên yêu cầu nhóm theo ngày/tháng (SectionList), chỉ cần chuyển đổi định dạng mảng dữ liệu sang dạng sections `[{ title: 'Hôm nay', data: [...] }]`.

### Quyết định 5: Tách Reusable Components và Đóng gói Styling
- **Lựa chọn:** Xây dựng thư mục `src/components/` gồm: `CustomButton`, `ProfileCard`, `ThemeToggle`, `ActivityItem`, `EmptyState`. Sử dụng `StyleSheet.create` cơ bản với Flexbox.
- **Lý do:**
  1. Code gọn gàng, tái sử dụng tối đa (ví dụ `ProfileCard` dùng cho cả Home và Profile).
  2. Tuân thủ chuẩn mực React Native chính thức, không phụ thuộc thư viện CSS bên ngoài (như Tailwind/NativeWind) để tránh lỗi tương thích phiên bản SDK 57.
  3. Dễ dàng giải thích từng thuộc tính Flexbox (`flexDirection`, `justifyContent`, `alignItems`) khi giảng viên vấn đáp.
- **Tác động nếu đổi yêu cầu:** Muốn đổi màu nhận diện thương hiệu hay kích thước font chữ chỉ cần cập nhật tại `src/constants/theme.js`.
