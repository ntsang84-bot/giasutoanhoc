import { GradeConfig, ThemeConfig, EducationLevel, DifficultyConfig } from './types';

export const LEVELS: Record<EducationLevel, string> = {
  primary: 'TIỂU HỌC 🌱',
  middle: 'THCS 📚',
  high: 'THPT 🎯',
};

export const THEMES: Record<EducationLevel, ThemeConfig> = {
  primary: {
    bg: 'bg-[#E8F5E9]', // Soft green
    primary: 'bg-[#4CAF50]',
    primaryHover: 'hover:bg-[#66BB6A]',
    text: 'text-green-800',
    border: 'border-green-200',
    badge: 'bg-green-100 text-green-700',
    gradient: 'from-[#4CAF50] to-[#81C784]',
  },
  middle: {
    bg: 'bg-[#E3F2FD]', // Blue
    primary: 'bg-[#2196F3]',
    primaryHover: 'hover:bg-[#42A5F5]',
    text: 'text-blue-800',
    border: 'border-blue-200',
    badge: 'bg-blue-100 text-blue-700',
    gradient: 'from-[#2196F3] to-[#03A9F4]',
  },
  high: {
    bg: 'bg-[#F3E5F5]', // Purple
    primary: 'bg-[#9C27B0]',
    primaryHover: 'hover:bg-[#AB47BC]',
    text: 'text-purple-800',
    border: 'border-purple-200',
    badge: 'bg-purple-100 text-purple-700',
    gradient: 'from-[#673AB7] to-[#9C27B0]',
  },
};

export const DIFFICULTY_CONFIG: Record<string, DifficultyConfig> = {
  recognition: { id: 'recognition', label: 'Nhận biết', color: 'bg-[#66BB6A]', textColor: 'text-white' },
  understanding: { id: 'understanding', label: 'Thông hiểu', color: 'bg-[#FFA726]', textColor: 'text-white' },
  application: { id: 'application', label: 'Vận dụng', color: 'bg-[#EF5350]', textColor: 'text-white' },
};

export const CURRICULUM: Record<EducationLevel, GradeConfig[]> = {
  primary: [
    {
      grade: 1,
      label: 'Lớp 1',
      topics: [
        'Số tự nhiên từ 0 đến 10',
        'Số tự nhiên từ 11 đến 20',
        'Phép cộng trong phạm vi 20',
        'Phép trừ trong phạm vi 20',
        'Nhận biết hình: Hình tròn, hình vuông, hình tam giác, hình chữ nhật',
        'So sánh độ dài (dài hơn, ngắn hơn)',
        'So sánh khối lượng (nặng hơn, nhẹ hơn)'
      ]
    },
    {
      grade: 2,
      label: 'Lớp 2',
      topics: [
        'Số tự nhiên trong phạm vi 100',
        'Phép cộng trong phạm vi 100 (có nhớ và không nhớ)',
        'Phép trừ trong phạm vi 100 (có nhớ và không nhớ)',
        'Bảng nhân 2, 3, 4, 5',
        'Phép nhân với số có một chữ số',
        'Phép chia đơn giản (chia hết)',
        'Hình chữ nhật và hình vuông',
        'Đo độ dài: cm, dm, m'
      ]
    },
    {
      grade: 3,
      label: 'Lớp 3',
      topics: [
        'Số tự nhiên trong phạm vi 100 000',
        'Phép cộng, trừ trong phạm vi 100 000',
        'Phép nhân, chia với số có một chữ số',
        'Bảng nhân 6, 7, 8, 9',
        'Hình học: Đoạn thẳng, góc, tam giác, tứ giác',
        'Đo lường: Độ dài, khối lượng, thời gian',
        'Giải toán có lời văn (1-2 bước)'
      ]
    },
    {
      grade: 4,
      label: 'Lớp 4',
      topics: [
        'Số tự nhiên trong phạm vi 1 000 000',
        'Phép tính với số có hai chữ số',
        'Phân số đơn giản (tử số nhỏ)',
        'So sánh phân số cùng mẫu số',
        'Hình chữ nhật, hình vuông: Chu vi và diện tích',
        'Bài toán có lời văn (2-3 bước tính)',
        'Đơn vị đo diện tích (cm², dm², m²)'
      ]
    },
    {
      grade: 5,
      label: 'Lớp 5',
      topics: [
        'Số thập phân, tính toán với số thập phân',
        'Phép chia có số dư',
        'Phân số: So sánh, cộng, trừ phân số khác mẫu',
        'Rút gọn phân số, quy đồng mẫu số',
        'Hình học: Hình tam giác, hình thang - Diện tích',
        'Hình tròn: Chu vi và diện tích',
        'Bài toán về tỉ lệ, tỉ số phần trăm cơ bản'
      ]
    }
  ],
  middle: [
    {
      grade: 6,
      label: 'Lớp 6',
      topics: [
        'Số nguyên, phép toán với số nguyên',
        'Phân số, số thập phân nâng cao',
        'Tỉ lệ thức, chia tỉ lệ',
        'Hình học: Góc, đường thẳng song song, đường thẳng vuông góc',
        'Số học: Ước, bội, số nguyên tố',
        'Phân tích số ra thừa số nguyên tố'
      ]
    },
    {
      grade: 7,
      label: 'Lớp 7',
      topics: [
        'Số hữu tỉ, biểu thức đại số',
        'Đơn thức, đa thức một biến',
        'Phương trình bậc nhất một ẩn',
        'Thống kê: Bảng tần số, biểu đồ',
        'Hình học: Tam giác, các trường hợp bằng nhau của tam giác',
        'Quan hệ giữa các yếu tố trong tam giác',
        'Tam giác cân, tam giác đều'
      ]
    },
    {
      grade: 8,
      label: 'Lớp 8',
      topics: [
        'Phân thức đại số',
        'Phương trình bậc nhất hai ẩn, hệ phương trình',
        'Bất phương trình bậc nhất một ẩn',
        'Hình học: Tứ giác, đa giác, diện tích',
        'Hình thang, hình thang cân, hình bình hành',
        'Hình chữ nhật, hình thoi, hình vuông',
        'Định lý Pythagore và ứng dụng'
      ]
    },
    {
      grade: 9,
      label: 'Lớp 9',
      topics: [
        'Căn bậc hai, biểu thức chứa căn',
        'Hàm số bậc nhất, đồ thị hàm số y = ax + b',
        'Phương trình bậc hai một ẩn',
        'Công thức nghiệm, công thức nghiệm thu gọn',
        'Hệ thức Vi-et và ứng dụng',
        'Hệ thức lượng trong tam giác vuông',
        'Tỉ số lượng giác của góc nhọn',
        'Đường tròn, dây cung, góc ở tâm, góc nội tiếp'
      ]
    }
  ],
  high: [
    {
      grade: 10,
      label: 'Lớp 10',
      topics: [
       '§1. Mệnh đề',
  '§2. Tập hợp và các phép toán trên tập hợp',
  '§3. Bất phương trình bậc nhất hai ẩn',
  '§4. Hệ bất phương trình bậc nhất hai ẩn',

  '§5. Hàm số và đồ thị',
  '§6. Hàm số bậc nhất',
  '§7. Hàm số bậc hai',

  '§8. Hệ thức lượng trong tam giác',
  '§9. Vectơ',
  '§10. Tổng và hiệu của hai vectơ',
  '§11. Tích của một số với một vectơ',
  '§12. Tích vô hướng của hai vectơ',
  '§13. Phương trình đường thẳng trong mặt phẳng tọa độ',

  '§14. Quy tắc đếm',
  '§15. Hoán vị – Chỉnh hợp – Tổ hợp',
  '§16. Nhị thức Newton',

  '§17. Số gần đúng và sai số',
  '§18. Các số đặc trưng đo xu thế trung tâm',
  '§19. Các số đặc trưng đo mức độ phân tán'
      ]
    },
    {
      grade: 11,
      label: 'Lớp 11',
      topics: [
        '§1. Hàm số lượng giác',
  '§2. Phương trình lượng giác cơ bản',
  '§3. Một số phương trình lượng giác thường gặp',

  '§4. Dãy số',
  '§5. Cấp số cộng',
  '§6. Cấp số nhân',

  '§7. Giới hạn của dãy số',
  '§8. Giới hạn của hàm số',
  '§9. Hàm số liên tục',

  '§10. Định nghĩa và ý nghĩa của đạo hàm',
  '§11. Các quy tắc tính đạo hàm',
  '§12. Đạo hàm cấp hai',

  '§13. Đại cương về đường thẳng và mặt phẳng trong không gian',
  '§14. Hai đường thẳng song song trong không gian',
  '§15. Đường thẳng và mặt phẳng song song',
  '§16. Hai mặt phẳng song song',

  '§17. Đường thẳng vuông góc với mặt phẳng',
  '§18. Hai mặt phẳng vuông góc',
  '§19. Khoảng cách trong không gian',

  '§20. Vectơ trong không gian',
  '§21. Toạ độ của vectơ trong không gian'
      ]
    },
    {
      grade: 12,
      label: 'Lớp 12',
      topics: [
    '§1. Tính đơn điệu và cực trị của hàm số',
  '§2. Giá trị lớn nhất và giá trị nhỏ nhất của hàm số',
  '§3. Đường tiệm cận của đồ thị hàm số',
  '§4. Khảo sát và vẽ đồ thị một số hàm số cơ bản',
  'Bài tập cuối chương I',

  '§5. Vectơ và các phép toán trong không gian',
  '§6. Toạ độ của vectơ trong không gian',
  '§7. Biểu thức toạ độ của các phép toán vectơ',
  'Bài tập cuối chương II',

  '§8. Khoảng biến thiên và khoảng tứ phân vị của mẫu số liệu ghép nhóm',
  '§9. Phương sai và độ lệch chuẩn của mẫu số liệu ghép nhóm',
  'Bài tập cuối chương III',

  '§10. Nguyên hàm',
  '§11. Tích phân',
  '§12. Ứng dụng hình học của tích phân',
  'Bài tập cuối chương IV',

  '§13. Phương trình mặt phẳng',
  '§14. Phương trình đường thẳng trong không gian',
  '§15. Phương trình mặt cầu',
  'Bài tập cuối chương V',

  '§16. Xác suất có điều kiện',
  '§17. Công thức xác suất toàn phần và công thức Bayes',
  'Bài tập cuối chương VI'
      ]
    }
  ]
};
