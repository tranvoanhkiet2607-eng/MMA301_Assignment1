# NHẬT KÝ SỬ DỤNG AI CÓ KIỂM SOÁT (AI USAGE LOG)
**Môn học:** MMA301 - Multiplatform Mobile App Development  
**Trường:** Đại học FPT (FPT University)  
**Sinh viên:** Trần Võ Anh Kiệt (MSSV: CE180795)  
**Email:** KietTVACE180795@fpt.edu.vn  
**Bài tập:** Assignment 01 – Profile & Activity App  
**Chính sách:** Tuân thủ mục 9 & 10 của Student Guide về Sử dụng AI minh bạch và có trách nhiệm.

---

## 1. BẢNG NHẬT KÝ SỬ DỤNG AI (AI USAGE LOG TỐI THIỂU)

| # | Task / Mục đích | Yêu cầu / Tham chiếu | Output từ AI | Tôi đã sửa & Tinh chỉnh gì? | Tôi kiểm chứng thế nào? |
|:---:|:---|:---|:---|:---|:---|
| **1** | Thiết lập cấu trúc thư mục & Theme Tokens | Gợi ý cấu trúc dự án chuẩn sinh viên học React Native và bảng mã màu Dark/Light Mode. | Danh sách mã màu HEX và cấu trúc thư mục `src/{constants, context, components, screens, utils}`. | Tối giản hóa bảng màu, loại bỏ các mã màu phức tạp không cần thiết, chọn tone màu xanh thương hiệu công nghệ quen thuộc. | Chạy thử nghiệm trên cả màn hình sáng và tối, kiểm tra độ tương phản văn bản đạt chuẩn dễ đọc. |
| **2** | Xây dựng Storage Helper bọc try/catch | Tìm giải pháp chống crash app khi AsyncStorage trả về `null` hoặc chuỗi JSON bị lỗi cấu trúc. | Hàm `getStoredItem` cơ bản dùng `JSON.parse`. | Bổ sung thêm tham số `fallbackValue`, thêm `console.warn` để log khi có lỗi mà không làm sập ứng dụng. | Tạo thử nghiệm đọc một key không tồn tại và một key chứa chuỗi lỗi `{corrupt_data` -> App vẫn chạy ổn định với dữ liệu mặc định. |
| **3** | Viết biểu thức Regex kiểm tra Email & Phone | Cung cấp biểu thức Regex kiểm tra định dạng email và số điện thoại Việt Nam (9-11 số). | `emailRegex` và `phoneRegex`. | Tích hợp vào hàm `validateForm` tại `EditProfileScreen`, bổ sung thông báo lỗi tiếng Việt thân thiện, rõ ràng. | Nhập thử `test@`, `test@domain`, `1234` -> Form chặn lưu và báo lỗi đỏ chính xác. |
| **4** | Lập danh mục Test Matrix & Debug Log | Sinh các trường hợp kiểm thử biên (edge case) và kịch bản lỗi state/persistence thường gặp. | Gợi ý 12 test cases và 2 kịch bản lỗi về re-render và navigation header. | Đối chiếu khớp 100% với bảng tiêu chí trong PDF đề bài môn MMA301 và tự thực hiện kiểm thử thực tế trên máy. | Thực hiện từng bước bằng tay trên Expo, chụp ảnh/ghi nhận kết quả PASS cho cả 12 ca kiểm thử. |

---

## 2. CAM KẾT TRUNG THỰC HỌC THUẬT (FINAL SELF-DECLARATION)

> *"Tôi đã tự kiểm tra assignment, có thể giải thích các phần chính, có thể phân tích/sửa một thay đổi nhỏ và chịu trách nhiệm với mọi code, tài nguyên và AI output tôi sử dụng."*
