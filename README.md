# MMA301 - ASSIGNMENT 1: PROFILE & ACTIVITY APP
**Môn học:** MMA301 – Multiplatform Mobile App Development  
**Trường:** Đại học FPT (FPT University)  
**Sinh viên thực hiện:** Trần Võ Anh Kiệt (Tran Vo Anh Kiet)  
**Mã số sinh viên (MSSV):** CE180795  
**Email:** KietTVACE180795@fpt.edu.vn  
**Chủ đề:** Assignment 01 – React Native Foundations  
**Nền tảng:** React Native + Expo (Ngôn ngữ JavaScript)  

---

## 1. TỔNG QUAN DỰ ÁN (OVERVIEW)

Ứng dụng **Personal Profile & Activity App** được xây dựng nhằm đáp ứng toàn diện các chuẩn đầu ra (CLO1 - CLO7, CLO9) của môn học MMA301. Ứng dụng cung cấp một quy trình khép kín kết nối 5 màn hình chính:
- **HomeScreen:** Màn hình tổng quan, hiển thị chào mừng, thẻ tóm tắt hồ sơ sinh viên, số liệu hoạt động, chuyển đổi giao diện nhanh và các nút điều hướng chính.
- **ProfileScreen:** Hiển thị chi tiết hồ sơ cá nhân (ảnh đại diện, họ tên, vai trò, email, số điện thoại, tiểu sử, thông tin môn học) cùng nút mở form chỉnh sửa.
- **EditProfileScreen:** Biểu mẫu nhập liệu (Controlled Form) với cơ chế kiểm tra hợp lệ chặt chẽ (Validation), hỗ trợ Lưu (Save) hoặc Hủy bỏ (Cancel). Chặn ghi đè dữ liệu khi có lỗi nhập liệu.
- **ActivityScreen:** Hiển thị danh sách các hoạt động & sở thích bằng `FlatList`, hỗ trợ chuyển đổi trạng thái (Yêu thích ❤️, Hoàn thành ✅, Xóa 🗑️), lọc theo danh mục và xử lý giao diện khi danh sách trống (Empty State).
- **SettingsScreen:** Quản lý giao diện Sáng / Tối (Light / Dark Mode) toàn hệ thống và lưu trữ lâu dài; cung cấp nút khôi phục cài đặt gốc an toàn và thông tin đề tài.

---

## 2. HƯỚNG DẪN CÀI ĐẶT VÀ CHẠY ỨNG DỤNG (HOW TO RUN)

### Yêu cầu môi trường
- Đã cài đặt **Node.js** (phiên bản khuyến nghị LTS v18 trở lên hoặc v20+).
- Thiết bị di động đã cài ứng dụng **Expo Go** (trên iOS hoặc Android) hoặc sử dụng trình duyệt Web/máy ảo.

### Các bước khởi chạy
1. **Cài đặt các gói phụ thuộc (Dependencies):**
   ```bash
   npm install
   ```

2. **Khởi chạy máy chủ phát triển (Expo Metro Bundler):**
   ```bash
   npx expo start
   ```

3. **Mở ứng dụng:**
   - **Trên điện thoại thật:** Mở ứng dụng Expo Go và quét mã QR hiển thị trên màn hình terminal.
   - **Trên trình duyệt Web:** Nhấn phím `w` trong terminal (nếu cần xem nhanh).
   - **Trên máy ảo Android:** Nhấn phím `a`.

---

## 3. SƠ ĐỒ ĐIỀU HƯỚNG VÀ LUỒNG DỮ LIỆU (SCREEN & WORKFLOW MAP)

```text
               ┌───────────────────────────────┐
               │          HomeScreen           │
               │  - Thẻ tóm tắt Profile        │
               │  - Thống kê & Chuyển Theme    │
               └───────┬──────────────┬────────┘
                       │              │
        Điều hướng     │              │     Điều hướng
        vào Hồ sơ      │              │     vào Hoạt động
                       ▼              ▼
       ┌─────────────────────┐   ┌──────────────────────┐
       │    ProfileScreen    │   │    ActivityScreen    │
       │ - Chi tiết cá nhân  │   │ - FlatList hoạt động │
       │ - Nút Sửa hồ sơ     │   │ - Filter & Favorite  │
       └──────────┬──────────┘   │ - Empty State        │
                  │              └──────────────────────┘
                  │ Bấm "Sửa"
                  ▼
       ┌─────────────────────┐   ┌──────────────────────┐
       │  EditProfileScreen  │   │    SettingsScreen    │
       │ - Form có validation│   │ - Chuyển Sáng / Tối  │
       │ - Lưu (Cập nhật)    │   │ - Khôi phục mặc định │
       │ - Hủy (Không lưu)   │   └──────────────────────┘
       └─────────────────────┘
```

---

## 4. CHIẾN LƯỢC QUẢN LÝ STATE VÀ LƯU TRỮ (STATE & PERSISTENCE STRATEGY)

1. **Local State (useState):** Sử dụng cho dữ liệu nội bộ trong từng màn hình (dữ liệu nhập tạm thời trong form, biến lưu lỗi validation, tab danh mục đang lọc, trạng thái modal thêm mới).
2. **Shared State (Context API):**
   - `ProfileContext`: Lưu trữ thông tin hồ sơ của người dùng. Cả `HomeScreen`, `ProfileScreen` và `EditProfileScreen` cùng chia sẻ một nguồn dữ liệu duy nhất, giúp giao diện tự động cập nhật ngay sau khi Lưu mà không cần reload.
   - `ThemeContext`: Lưu trữ trạng thái giao diện (`isDarkMode`, bảng mã màu `theme`), tác động đồng bộ lên toàn bộ màn hình, thẻ component và thanh tiêu đề Navigation.
3. **Persistent Storage (AsyncStorage):**
   - Đóng gói logic tại `src/utils/storage.js` với cơ chế bọc lỗi `try...catch`.
   - Lưu trữ tự động các khóa: `@mma301_profile_data`, `@mma301_theme_mode`, `@mma301_activities_list`.
   - **Cơ chế Fallback an toàn:** Khi mở app lần đầu (First-run) hoặc khi dữ liệu bị lỗi cú pháp JSON, helper tự động trả về giá trị mặc định (`DEFAULT_PROFILE`, `DEFAULT_ACTIVITIES`), tuyệt đối không làm crash ứng dụng.

---

## 5. CẤU TRÚC THƯ MỤC NGUỒN (PROJECT STRUCTURE)

```text
assignment1/
├── src/
│   ├── constants/
│   │   └── theme.js          # Bảng màu Light/Dark và dữ liệu mặc định ban đầu
│   ├── context/
│   │   ├── ProfileContext.js # Context quản lý thông tin người dùng
│   │   └── ThemeContext.js   # Context quản lý chủ đề sáng/tối
│   ├── components/
│   │   ├── CustomButton.js   # Nút bấm tái sử dụng đa dạng kiểu dáng
│   │   ├── ProfileCard.js    # Thẻ thông tin hồ sơ (dùng tại Home & Profile)
│   │   ├── ThemeToggle.js    # Nút gạt chuyển đổi giao diện sáng/tối
│   │   ├── ActivityItem.js   # Phần tử render trong FlatList
│   │   └── EmptyState.js     # Giao diện thông báo khi danh sách rỗng
│   ├── screens/
│   │   ├── HomeScreen.js         # Màn hình trang chủ tổng quan
│   │   ├── ProfileScreen.js      # Màn hình chi tiết hồ sơ
│   │   ├── EditProfileScreen.js  # Màn hình biểu mẫu chỉnh sửa hồ sơ
│   │   ├── ActivityScreen.js     # Màn hình danh sách hoạt động (FlatList)
│   │   └── SettingsScreen.js     # Màn hình cài đặt & khôi phục mặc định
│   └── utils/
│       └── storage.js        # Helper giao tiếp an toàn với AsyncStorage
├── docs/
│   ├── RTM_AND_DESIGN_DECISIONS.md   # Bảng truy vết yêu cầu & 5 quyết định thiết kế
│   ├── TEST_MATRIX_AND_DEBUG_LOGS.md # Ma trận 12 ca kiểm thử & 2 nhật ký sửa lỗi
│   ├── INTERVIEW_AND_TRANSFER_GUIDE.md # Hướng dẫn vấn đáp & xử lý yêu cầu sửa code
│   └── AI_USAGE_LOG.md               # Nhật ký sử dụng AI minh bạch theo tiêu chí môn
├── App.js                    # Khởi tạo Navigation Container và Stack Navigator
├── app.json                  # Cấu hình dự án Expo
└── package.json              # Khai báo thư viện và script thực thi
```

---

## 6. HỒ SƠ TÀI LIỆU NỘP BÀI KÈM THEO

Trong thư mục `docs/`, toàn bộ tài liệu theo đúng chuẩn rubric môn MMA301 đã được chuẩn bị đầy đủ:
- 📑 [Bảng RTM & Quyết định kỹ thuật (RTM & DDR)](docs/RTM_AND_DESIGN_DECISIONS.md)
- 🧪 [Ma trận kiểm thử (12 Cases) & Nhật ký Debug](docs/TEST_MATRIX_AND_DEBUG_LOGS.md)
- 🎯 [Hướng dẫn trả lời vấn đáp & Transfer Tasks](docs/INTERVIEW_AND_TRANSFER_GUIDE.md)
- 🤖 [Nhật ký sử dụng AI minh bạch (AI Usage Log)](docs/AI_USAGE_LOG.md)

---

## 7. GIỚI HẠN & HƯỚNG PHÁT TRIỂN (LIMITATIONS)

- Dự án tập trung vào nền tảng cơ bản của React Native (Navigation, State, Controlled Form, FlatList, AsyncStorage) theo đúng phạm vi Assignment 1, chưa tích hợp backend server hoặc xác thực tài khoản Firebase (nằm ở phạm vi Assignment sau).
- Ảnh đại diện đang dùng URL tĩnh kèm chữ cái ký tự dự phòng; ở các bài sau có thể bổ sung thư viện chọn ảnh từ bộ sưu tập thiết bị (`expo-image-picker`).
