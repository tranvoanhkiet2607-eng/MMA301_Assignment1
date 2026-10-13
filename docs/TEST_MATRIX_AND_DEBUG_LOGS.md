# MA TRẬN KIỂM THỬ VÀ NHẬT KÝ SỬA LỖI (TEST MATRIX & DEBUG LOGS)
**Môn học:** MMA301 - Multiplatform Mobile App Development  
**Bài tập:** Assignment 01 – Profile & Activity App  

---

## 1. MA TRẬN KIỂM THỬ CHI TIẾT (TEST MATRIX - 12 CASES)

Toàn bộ 12 ca kiểm thử theo đúng danh mục mục 5 trong tài liệu hướng dẫn môn học:

| # | Nhóm kiểm thử | Trường hợp (Case) | Thao tác thực hiện | Kết quả mong đợi | Kết quả thực tế (Actual) | Trạng thái |
|:---:|:---|:---|:---|:---|:---|:---:|
| **1** | **Startup** | First run | Cài đặt mới hoặc xóa sạch AsyncStorage, mở app | App tự động nạp dữ liệu mặc định (`DEFAULT_PROFILE`), không bị crash hay màn hình trắng. | App khởi động ngay, hiển thị tên "Nguyễn Văn A", 6 hoạt động mẫu, không lỗi. | **PASS** |
| **2** | **Profile** | Read Profile | Tại Home, bấm "Xem chi tiết Hồ sơ (Profile)" | Màn hình hiển thị đầy đủ avatar, tên, email, SĐT, bio, thông tin sinh viên. | Hiển thị chính xác tất cả các trường dữ liệu từ `ProfileContext`. | **PASS** |
| **3** | **Edit** | Invalid Input | Tại Edit Profile, xóa trắng tên và nhập email sai cú pháp `abc@` rồi bấm "Lưu" | Không cho phép lưu, hiển thị thông báo lỗi màu đỏ dưới từng ô nhập và hiện Alert cảnh báo. | Input báo đỏ "Họ và tên không được để trống", Alert chặn lưu, dữ liệu cũ giữ nguyên. | **PASS** |
| **4** | **Edit** | Valid Input | Nhập họ tên mới, SĐT hợp lệ và bấm "Lưu thay đổi" | Hiển thị thông báo thành công, quay về màn hình trước, Profile & Home cập nhật ngay. | Alert báo thành công, quay về màn hình Profile thấy tên mới ngay lập tức. | **PASS** |
| **5** | **Edit** | Cancel | Nhập sửa đổi lung tung trong các ô rồi bấm "Hủy bỏ" (hoặc nút Back) | Hủy toàn bộ thay đổi, không ghi bất kỳ dữ liệu nào vào Context hay Storage. | Dữ liệu cũ giữ nguyên 100%, không bị ảnh hưởng. | **PASS** |
| **6** | **Theme** | Toggle Theme | Gạt switch đổi theme tại Home hoặc Settings | Toàn bộ ứng dụng đổi màu ngay lập tức (nền, chữ, card, button, header navigation). | Đổi giữa Light Mode (trắng/xanh) và Dark Mode (đen/xám) đồng bộ toàn bộ 5 màn hình. | **PASS** |
| **7** | **Theme** | Theme Persistence | Đổi sang Dark Mode, tắt ứng dụng hoàn toàn (Kill App) rồi mở lại | Ứng dụng vẫn duy trì đúng chế độ Dark Mode như trước khi tắt. | Khi khởi động lại, `ThemeContext` hydrate từ AsyncStorage, giữ đúng Dark Mode. | **PASS** |
| **8** | **List** | Normal List | Mở màn hình "Hoạt động & Sở thích" | FlatList hiển thị danh sách các thẻ hoạt động mượt mà, đầy đủ thông tin badge. | Render danh sách các hoạt động rõ ràng, badge màu sắc theo từng danh mục. | **PASS** |
| **9** | **List** | Empty State | Bấm nút "Xóa hết (Test Empty State)" hoặc chọn tab không có mục nào | FlatList hiển thị giao diện thông báo rỗng (`EmptyState`), có nút khôi phục dữ liệu mẫu. | Xuất hiện card rỗng với icon 📭 và nút "Khôi phục dữ liệu mẫu", app hoạt động ổn định. | **PASS** |
| **10** | **List** | Interaction State | Bấm nút ❤️ (Favorite) hoặc ✅ (Hoàn thành) trên 1 hoạt động | State của item thay đổi ngay lập tức trên UI (tim đổi màu, chữ gạch ngang), dữ liệu được lưu. | Icon chuyển đổi ngay lập tức, số đếm thống kê tại Home cũng tự động cập nhật đúng. | **PASS** |
| **11** | **Storage** | Corrupt/Missing Data | Giả lập dữ liệu AsyncStorage bị chuỗi JSON sai định dạng `{bad_json` | App không bị crash, helper bắt exception và trả về fallback an toàn. | `getStoredItem` bắt `catch`, in console cảnh báo nhẹ và trả về object mặc định an toàn. | **PASS** |
| **12** | **Navigation**| Full Flow & Back Stack | Mở lần lượt từng màn hình Home -> Profile -> Edit -> Activity -> Settings rồi Back | Điều hướng mượt mà, không giật lag, không mất trạng thái state giữa chừng. | Native Stack xử lý chuyển cảnh êm ái, nút quay lại hoạt động chuẩn xác trên cả 5 màn hình. | **PASS** |

---

## 2. NHẬT KÝ SỬA LỖI THỰC TẾ (DEBUG LOGS - TỐI THIỂU 2 LỖI THẬT)

Dưới đây là 2 lỗi điển hình trong quá trình phát triển ứng dụng di động React Native và giải pháp đã thực hiện:

### Debug Log #1: Lưu hồ sơ thành công nhưng màn hình HomeScreen không cập nhật tên mới
- **Triệu chứng (Symptom):** Sau khi sửa tên ở `EditProfileScreen` và bấm "Lưu", quay lại `ProfileScreen` thì thấy tên mới, nhưng khi bấm nút Back quay về `HomeScreen` thì tên người dùng vẫn là tên cũ nếu chỉ đọc từ state local.
- **Giả thuyết (Hypothesis):** `HomeScreen` đang đọc dữ liệu từ local state riêng biệt hoặc `ProfileContext` chưa kích hoạt re-render đồng bộ cho component cha.
- **Cách kiểm tra (Inspection):** Đặt `console.log('HomeScreen profile:', profile.name)` tại `HomeScreen` và kiểm tra nguồn cung cấp dữ liệu của `ProfileCard`.
- **Nguyên nhân gốc (Root cause):** Ban đầu `HomeScreen` lưu một biến state cục bộ sao chép từ storage lúc mount (`useState`), nên khi `EditProfileScreen` thay đổi dữ liệu trong `ProfileContext`, state nội bộ của `HomeScreen` không nhận được sự thay đổi.
- **Cách sửa (Fix):** Chuyển `HomeScreen` sang sử dụng trực tiếp `const { profile } = useProfile()` từ `ProfileContext`. Khi `updateProfile` gọi `setProfile` trong Provider, toàn bộ các consumer (bao gồm cả `HomeScreen` và `ProfileScreen`) đều tự động re-render dữ liệu mới nhất.
- **Kiểm thử lại (Retest):** Sửa tên thành "Nguyễn Văn B" tại `EditProfileScreen`, bấm Lưu rồi quay lại `HomeScreen` -> Tên lập tức hiển thị "Nguyễn Văn B". **(Đã kiểm chứng thành công)**.

---

### Debug Log #2: Chuyển theme Sáng/Tối thì màn hình đổi màu nhưng thanh tiêu đề Header Navigation bị đứng màu cũ
- **Triệu chứng (Symptom):** Bấm switch chuyển sang Dark Mode, nền màn hình chuyển sang màu tối nhưng thanh tiêu đề phía trên (Header của React Navigation) vẫn giữ màu trắng ban đầu.
- **Giả thuyết (Hypothesis):** `Stack.Navigator` được khai báo bên ngoài `ThemeProvider`, hoặc `screenOptions` của Navigation không được liên kết với `useTheme()`.
- **Cách kiểm tra (Inspection):** Kiểm tra cấu trúc phân cấp component tại `App.js`.
- **Nguyên nhân gốc (Root cause):** Cấu trúc ban đầu đặt `<Stack.Navigator>` cùng cấp với `<ThemeProvider>` hoặc truyền `screenOptions` tĩnh (static object) ngay lúc khai báo thay vì truyền giá trị `theme` động từ context.
- **Cách sửa (Fix):** Tách một component con `AppNavigator` đặt bên trong `<ThemeProvider>`. Trong `AppNavigator`, gọi `const { theme, isDarkMode } = useTheme();` và gán trực tiếp `headerStyle: { backgroundColor: theme.surface }`, `headerTintColor: theme.text`, `StatusBar style={isDarkMode ? 'light' : 'dark'}`.
- **Kiểm thử lại (Retest):** Bấm nút chuyển theme -> Cả nội dung màn hình, thanh trạng thái StatusBar và thanh tiêu đề Header đều chuyển đổi màu đen/trắng đồng bộ 100%. **(Đã kiểm chứng thành công)**.

---

## 3. QUY TRÌNH 5 BƯỚC DEBUG DÙNG KHI GIẢNG VIÊN VẤN ĐÁP

Khi giảng viên đưa ra một lỗi bất kỳ trong buổi bảo vệ, sinh viên thực hiện và trình bày theo đúng 5 bước:

1. **Mô tả triệu chứng:** Quan sát kỹ giao diện hoặc thông báo đỏ trong terminal/console.
2. **Khoanh vùng:** Xác định lỗi nằm ở đâu (Screen, Component, Context, hay Storage Helper).
3. **Kiểm tra Input/State:** Dùng `console.log` để xem giá trị của state, props, hoặc dữ liệu AsyncStorage trước khi biến đổi.
4. **Kiểm tra điểm biến đổi:** Kiểm tra hàm `setState`, hàm `validateForm`, hoặc câu lệnh `await AsyncStorage...`.
5. **Sửa đổi nhỏ nhất & Retest:** Sửa chính xác chỗ sai mà không làm vỡ các chức năng khác, sau đó chạy lại test case để đối chiếu kết quả.
