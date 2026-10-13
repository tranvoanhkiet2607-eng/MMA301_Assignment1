# HƯỚNG DẪN ÔN TẬP PHỎNG VẤN & XỬ LÝ YÊU CẦU THAY ĐỔI (TRANSFER TASKS)
**Môn học:** MMA301 - Multiplatform Mobile App Development  
**Mục tiêu:** Giúp sinh viên nắm vững 100% mã nguồn để tự tin trả lời vấn đáp và thực hiện các yêu cầu sửa code trực tiếp của giảng viên.

---

## 1. CHECKLIST "MỞ FILE VÀ CHỈ CODE TRONG DƯỚI 30 GIÂY"

Khi giảng viên chỉ định mở bất kỳ phần nào, bạn có thể định vị ngay lập tức:

| Yêu cầu của Giảng viên | Tệp tin (File) | Vị trí / Đoạn mã cụ thể |
|:---|:---|:---|
| **1. Cấu hình Navigation & danh sách Routes** | `App.js` | Dòng `const Stack = createNativeStackNavigator();` và khối `<Stack.Navigator>` chứa 5 `<Stack.Screen>`. |
| **2. Theme/Profile Context & Provider** | `src/context/ThemeContext.js`<br>`src/context/ProfileContext.js` | Tìm hàm `export const ThemeProvider = ...` và đoạn `ThemeContext.Provider value={{...}}`. |
| **3. Logic Validation & Form trong Edit Profile** | `src/screens/EditProfileScreen.js` | Hàm `validateForm()` kiểm tra `name.trim()`, `emailRegex.test()`, `phoneRegex.test()`. |
| **4. Lưu và Đọc AsyncStorage (Storage Helper)** | `src/utils/storage.js` | Hàm `getStoredItem` (có try/catch và JSON.parse) và hàm `setStoredItem` (JSON.stringify). |
| **5. FlatList, renderItem & keyExtractor** | `src/screens/ActivityScreen.js` | Thẻ `<FlatList data={filteredActivities} keyExtractor={(item) => item.id.toString()} renderItem={...} ListEmptyComponent={...} />`. |
| **6. Component tái sử dụng (Reusable)** | `src/components/ProfileCard.js`<br>`src/components/CustomButton.js` | Component `ProfileCard` nhận `props: { profile, isCompact, onEditPress }`, dùng chung cho cả Home và Profile. |

---

## 2. NGUYÊN TẮC GIẢI THÍCH CODE THEO 5 TẦNG (CODE EXPLANATION)

Khi giảng viên yêu cầu: *"Giải thích cho thầy/cô màn hình EditProfile hoặc Context hoạt động thế nào?"*, hãy trả lời theo 5 bước:

1. **Purpose (Mục đích):** Màn hình/Component này giải quyết việc gì?  
   *Ví dụ:* `EditProfileScreen` cho phép người dùng chỉnh sửa họ tên, email, SĐT với kiểm tra hợp lệ trước khi lưu.
2. **Input (Dữ liệu đầu vào):** Props hoặc dữ liệu nào đi vào?  
   *Ví dụ:* Nhận `profile` từ `ProfileContext` và `navigation` prop để điều hướng.
3. **Trigger (Sự kiện kích hoạt):** Hành động nào bắt đầu luồng?  
   *Ví dụ:* Người dùng gõ text vào ô nhập (`onChangeText`) hoặc bấm nút "Lưu thay đổi" (`onPress={handleSave}`).
4. **Transform (Logic biến đổi):** Quá trình xử lý diễn ra ra sao?  
   *Ví dụ:* Chạy hàm `validateForm()`. Nếu có trường không hợp lệ, gom vào object `errors` và báo đỏ; nếu tất cả hợp lệ, gọi `updateProfile(formData)`.
5. **Output / Failure path (Kết quả & xử lý lỗi):** Điều gì xảy ra tiếp theo?  
   *Ví dụ:* Nếu thành công, Context cập nhật, `AsyncStorage` lưu trữ, hiển thị Alert và `navigation.goBack()`. Nếu lỗi, chặn lại và không ghi đè dữ liệu.

---

## 3. CÂU HỎI VẤN ĐÁP CỐT LÕI (REACT NATIVE FUNDAMENTALS)

### Câu 1: Sự khác nhau giữa Component, Props và State là gì?
- **Component:** Là khối xây dựng giao diện độc lập (UI block), có thể tái sử dụng (ví dụ: `ProfileCard`, `CustomButton`).
- **Props (Properties):** Là dữ liệu truyền từ component cha xuống component con theo một chiều (read-only), component con không được tự ý sửa đổi props.
- **State:** Là dữ liệu nội bộ của component, có thể thay đổi theo thời gian thông qua các hàm `setState`. Khi state thay đổi, component sẽ tự động re-render để cập nhật giao diện.

### Câu 2: Điều gì làm cho một Component trong React Native re-render?
Component sẽ re-render khi:
1. `State` nội bộ của chính component đó thay đổi (khi gọi `useState` setter).
2. `Props` truyền từ component cha vào bị thay đổi giá trị.
3. Dữ liệu trong `Context` mà component đang lắng nghe (`useContext`) thay đổi giá trị.
4. Component cha trực tiếp bị re-render (kéo theo con re-render, trừ khi dùng `React.memo`).

### Câu 3: Vì sao `FlatList` cần `keyExtractor`?
`keyExtractor` cung cấp một định danh duy nhất (unique key) cho từng phần tử trong danh sách. Nhờ đó, React Native Virtual DOM có thể biết chính xác phần tử nào bị thêm, sửa, hoặc xóa để tái sử dụng view và render lại đúng phần tử đó mà không phải vẽ lại toàn bộ danh sách, giúp tăng hiệu năng bộ nhớ đáng kể.

### Câu 4: Vì sao tuyệt đối không được mutate state trực tiếp (ví dụ `profile.name = 'ABC'`)?
Vì React nhận biết sự thay đổi thông qua cơ chế so sánh nông (Shallow comparison) của tham chiếu bộ nhớ (reference). Nếu thay đổi trực tiếp thuộc tính của object/array mà không tạo ra một bản sao mới (bằng cách dùng spread operator `{ ...profile, name: 'ABC' }`), tham chiếu con trỏ bộ nhớ không đổi, React sẽ không phát hiện được sự thay đổi và giao diện sẽ **không re-render**.

### Câu 5: Khi khởi động lại ứng dụng, quá trình Hydration diễn ra ở đâu?
Quá trình Hydration diễn ra trong hook `useEffect` với dependency array rỗng `[]` tại các Context (`ThemeProvider` và `ProfileProvider`). Khi Provider vừa mount, hàm bất đồng bộ sẽ gọi `getStoredItem` từ `AsyncStorage`, nạp dữ liệu cũ vào state để giao diện hiển thị đúng trạng thái trước khi tắt.

### Câu 6: Nếu `AsyncStorage` trả về `null` hoặc chuỗi JSON bị lỗi thì ứng dụng xử lý thế nào?
File `src/utils/storage.js` đã bọc toàn bộ trong khối `try...catch`. Nếu trả về `null` (lần đầu chạy app) hoặc `JSON.parse` bị văng lỗi (corrupted data), helper sẽ bắt lỗi và trả về ngay giá trị `fallbackValue` an toàn (`DEFAULT_PROFILE`, `false`, `DEFAULT_ACTIVITIES`). Nhờ đó app không bao giờ bị crash.

---

## 4. HƯỚNG DẪN XỬ LÝ YÊU CẦU THAY ĐỔI CỦA GIẢNG VIÊN (TRANSFER TASKS)

Nếu giảng viên yêu cầu chỉnh sửa code ngay tại chỗ trong buổi chấm:

### Task 1: Thêm trường Địa chỉ (Location) vào Profile
- **Bước 1:** Trong `src/constants/theme.js`, bổ sung `location: 'TP. Hồ Chí Minh'` vào `DEFAULT_PROFILE`.
- **Bước 2:** Trong `src/screens/ProfileScreen.js`, thêm dòng hiển thị:
  ```jsx
  <Text style={styles.infoLabel}>📍 Địa chỉ: {profile.location || 'Chưa cập nhật'}</Text>
  ```
- **Bước 3:** Trong `src/screens/EditProfileScreen.js`:
  - Khai báo state: `const [location, setLocation] = useState(profile.location || '');`
  - Thêm một thẻ `<TextInput value={location} onChangeText={setLocation} ... />`
  - Trong hàm `handleSave`, truyền thêm `location: location.trim()` vào `updateProfile(...)`.

### Task 2: Đổi quy tắc Validation của Họ và Tên (phải từ 5 ký tự trở lên)
- **Vị trí sửa:** `src/screens/EditProfileScreen.js` -> hàm `validateForm()`.
- **Thay đổi:**
  ```javascript
  if (!name.trim()) {
    currentErrors.name = 'Họ và tên không được để trống.';
  } else if (name.trim().length < 5) { // Đổi từ 2 thành 5
    currentErrors.name = 'Họ và tên phải có tối thiểu 5 ký tự.';
  }
  ```

### Task 3: Thêm nút Đặt lại Form (Reset Form) trong EditProfileScreen
- **Vị trí sửa:** `src/screens/EditProfileScreen.js`.
- **Cách làm:** Thêm một hàm `handleResetForm`:
  ```javascript
  const handleResetForm = () => {
    setName(profile.name || '');
    setEmail(profile.email || '');
    setPhone(profile.phone || '');
    setBio(profile.bio || '');
    setErrors({});
  };
  ```
  Và đặt thêm nút bấm: `<CustomButton title="Làm mới form" onPress={handleResetForm} variant="outline" />`.
