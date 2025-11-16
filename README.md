![Hono Logo](https://raw.githubusercontent.com/honojs/hono/main/docs/images/hono-title.png)

# Project Setup

## 🏗️ Install Bun

### Windows (PowerShell)
```powershell
powershell -c "irm bun.sh/install.ps1 | iex"
```

### macOS / Linux
```bash
curl -fsSL https://bun.com/install | bash
```
---


## 📦 Install Dependencies
Project ini menggunakan beberapa dependensi utama:

- hono
- zod
- @prisma/client
- prisma (dev)
- @types/bun (dev)

Untuk meng-install semua dependency, jalankan:
``` bash
bun install
```
---

## ⚙️ Setup Environment Variables
Duplikat file `.env.example` menjadi `.env`:
```
cp .env.example .env
```
### 🔐 Generate JWT Secret
Generate JWT secret menggunakan Bun:
```bash
bun -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```
Masukkan hasilnya ke dalam file `.env`:

JWT_SECRET=hasil_generate_tadi

---

## 🚀 Run Development Server
Menjalankan aplikasi dalam mode development:
``` bash
bun run dev
```
Aplikasi akan berjalan pada:

http://localhost:3000

---

# 📚 API Documentation

Berikut adalah dokumentasi endpoint API berdasarkan router dan controller yang digunakan.

---

## 🔑 Auth API

### **POST /register**
Membuat akun baru.

Body:
- name (string)
- username (string)
- email (string)
- password (string)

Validasi: `registerSchema`

Response:
- 201 → User berhasil dibuat  
- 409 → Email atau username sudah digunakan

---

### **POST /login**
Login user dan mendapatkan JWT token.

Body:
- email (string)
- password (string)

Validasi: `loginSchema`

Response:
- 200 → Berhasil login (return token)
- 401 → Email/password salah

---

## 👤 User API (Protected — membutuhkan JWT)

Semua endpoint berikut membutuhkan header:

Authorization: Bearer {token}

---

### **GET /users**
Mengambil daftar semua user.

Response:
- 200 → List user

---

### **POST /users**
Membuat user baru.

Validasi: `createUserSchema`

Body:
- name
- username
- email
- password

Response:
- 201 → User berhasil dibuat
- 409 → Email / username sudah digunakan

---

### **GET /users/:id**
Mengambil detail user berdasarkan ID.

Response:
- 200 → Detail user
- 404 → User tidak ditemukan

---

### **PUT /users/:id**
Meng-update user berdasarkan ID.

Validasi: `updateUserSchema`

Body:
- name
- username
- email
- password (opsional)

Response:
- 200 → User berhasil diupdate
- 404 → User tidak ditemukan
- 409 → Email/username bentrok dengan user lain

---

### **DELETE /users/:id**
Menghapus user berdasarkan ID.

Response:
- 200 → User berhasil dihapus
- 404 → User tidak ditemukan

---

# 🗂️ Summary Endpoint

| Method | Endpoint       | Auth | Description                |
|--------|----------------|------|----------------------------|
| POST   | /register      | ❌   | Register akun baru         |
| POST   | /login         | ❌   | Login & mendapatkan token  |
| GET    | /users         | ✅   | Ambil semua user           |
| POST   | /users         | ✅   | Buat user baru             |
| GET    | /users/:id     | ✅   | Ambil user by ID           |
| PUT    | /users/:id     | ✅   | Update user by ID          |
| DELETE | /users/:id     | ✅   | Hapus user by ID           |
