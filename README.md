 # 🚀 Next.js – Demo 4 Kiểu Rendering

Dự án (starter) dùng **Next.js 14 App Router** + **TypeScript** + **Tailwind CSS**.

---

## 📋 Yêu cầu môi trường

| Công cụ | Phiên bản tối thiểu | Kiểm tra |
|---------|-------------------|----------|
| **Node.js** | ≥ 18.17 | `node -v` |
| **npm** | ≥ 9 | `npm -v` |
| **Git** | bất kỳ | `git --version` |

> 💡 Tải Node.js tại: https://nodejs.org (chọn bản **LTS**)

---

## ⚡ Cài đặt & Chạy

### 1. Clone repository

```bash
git clone <URL-repo>
```

### 2. Vào thư mục project

```bash
cd demo
```

### 3. Cài dependencies

```bash
npm install
```


### 4. Chạy development server

```bash
npm run dev
```

### 5. Mở trình duyệt

```
http://localhost:3000
```

Server sẽ **tự reload** mỗi khi bạn lưu file. 🎉

---

## 📁 Cấu trúc thư mục

```
demo/
├── src/
│   ├── app/              # Tất cả các trang đặt ở đây (App Router)
│   │   ├── layout.tsx    # Layout chung
│   │   ├── page.tsx      # Trang chủ (/)
│   │   └── globals.css   # CSS toàn cục
│   └── components/       # Components dùng chung
├── package.json
├── tailwind.config.ts
└── next.config.mjs
```

---

## 📝 Yêu cầu bài tập

Xây dựng một trang web bất kỳ bằng Next.js 14 và **vận dụng ít nhất 1 trong 4 kiểu rendering** sau:

| Kiểu | Mô tả ngắn | Cách dùng trong Next.js 14 |
|------|-----------|---------------------------|
| **CSR** | Render trên trình duyệt | Thêm `"use client"` + dùng `useEffect` |
| **SSR** | Render trên server mỗi request | `fetch(..., { cache: "no-store" })` |
| **SSG** | Render lúc build, tĩnh hoàn toàn | `fetch(..., { cache: "force-cache" })` |
| **ISR** | Tĩnh nhưng tự làm mới theo chu kỳ | `fetch(..., { next: { revalidate: 60 } })` |

> Tham khảo thêm: [Next.js Rendering Docs](https://nextjs.org/docs/app/building-your-application/rendering)

---

## ❓ Xử lý lỗi thường gặp

**Lỗi `Cannot find module` hoặc lỗi sau khi clone:**
```bash
rmdir /s /q .next node_modules
npm install
npm run dev
```

**Port 3000 đã bị chiếm:**
```bash
npm run dev -- -p 3001
```

**`npm` không nhận lệnh:** Cài lại Node.js từ https://nodejs.org rồi mở lại terminal.
