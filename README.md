# Game Library — CSR Demo

Website demo dùng **Next.js 14 App Router**, **TypeScript** và **Client-Side Rendering (CSR)**.

## Chạy dự án

```bash
npm install
npm run dev
```

Mở `http://localhost:3000`.

## Những file nên đọc

- `src/app/page.tsx`: component client, tải dữ liệu bằng `useEffect` và `fetch`.
- `src/components/GameCard.tsx`: component hiển thị một trò chơi.
- `public/games.json`: dữ liệu game mẫu.
- `public/images/games`: ảnh bìa được lưu cục bộ và liên kết từ `games.json`.
- `public/fonts`: font DejaVu Sans hỗ trợ đầy đủ tiếng Việt.
- `src/app/globals.css`: toàn bộ CSS của giao diện.
- `src/app/layout.tsx`: layout và metadata chung.

## Dấu hiệu cho biết dự án dùng CSR

`page.tsx` có:

```tsx
"use client";
```

Dữ liệu được tải sau khi trang xuất hiện:

```tsx
useEffect(() => {
  fetch("/games.json");
}, []);
```

## Tính năng

- Hiển thị danh sách game từ file JSON.
- Tìm kiếm theo tên.
- Lọc theo thể loại.
- Cuộn ngang bằng nút điều hướng, touchpad hoặc thao tác vuốt trên điện thoại.
- Có trạng thái đang tải, lỗi và không tìm thấy kết quả.
- Responsive trên máy tính và điện thoại.
- Dùng font cục bộ và ảnh bìa cục bộ, không cần tải tài nguyên ngoài khi mở trang.

## Tài nguyên

- Font: DejaVu Sans, kèm giấy phép tại `public/fonts/LICENSE.txt`.
- Ảnh bìa: tải từ Steam CDN để phục vụ website demo học tập; bản quyền hình ảnh thuộc các nhà phát hành tương ứng.
