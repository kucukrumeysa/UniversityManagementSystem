
# University Management System

.NET Web API ve React ile geliştirilmiş full stack üniversite yönetim uygulaması.

## Teknolojiler

* **Backend:** .NET 10 Web API, Entity Framework Core, SQL Server, JWT Authentication
* **Frontend:** React, Vite, Axios, React Router DOM

---

## Kurulum

### Gereksinimler

* .NET 10 SDK
* SQL Server (Express veya üzeri)
* Node.js v18+

### Backend

1. `UniversityApi` klasörünü Visual Studio ile aç.
2. `appsettings.json` içindeki bağlantı adresini güncelle:

```json
"ConnectionStrings": {
  "DefaultConnection": "Server=SUNUCU_ADIN\\SQLEXPRESS;Database=UniversityDb;Trusted_Connection=True;TrustServerCertificate=True"
}
```

3. Migration uygula:

```
Add-Migration InitialCreate
Update-Database
```

4. Projeyi çalıştır (`F5`). Backend `https://localhost:7248` adresinde çalışır.
5. API dokümantasyonu: `https://localhost:7248/scalar`

### Frontend

1. `UniversityApi-Frontend/university-client` klasörüne gir.
2. Bağımlılıkları yükle:

```bash
npm install
```

3. Geliştirme sunucusunu başlat:

```bash
npm run dev
```

4. Tarayıcıda aç: `http://localhost:5173`

---

## Kullanım

### Giriş Bilgileri

| Kullanıcı | Şifre   | Rol   |
| ----------- | -------- | ----- |
| admin       | admin123 | Admin |
| user        | user123  | User  |

> Yalnızca geliştirme ortamı içindir.

### Roller

* **Admin:** Listeleme, ekleme, güncelleme, silme
* **User:** Yalnızca listeleme

---

## API Endpoint'leri

### Auth

| Method | URL                 | Açıklama   |
| ------ | ------------------- | ------------ |
| POST   | `/api/auth/login` | JWT token al |

### Departments

| Method | URL                                | Açıklama                |
| ------ | ---------------------------------- | ------------------------- |
| GET    | `/api/departments`               | Tüm bölümler           |
| GET    | `/api/departments/{id}`          | Bölüm detayı           |
| GET    | `/api/departments/{id}/teachers` | Bölüm öğretmenleri    |
| GET    | `/api/departments/{id}/students` | Bölüm öğrencileri     |
| POST   | `/api/departments`               | Bölüm ekle (Admin)      |
| PUT    | `/api/departments/{id}`          | Bölüm güncelle (Admin) |
| DELETE | `/api/departments/{id}`          | Bölüm sil (Admin)       |

### Teachers

| Method | URL                             | Açıklama                   |
| ------ | ------------------------------- | ---------------------------- |
| GET    | `/api/teachers`               | Tüm öğretmenler           |
| GET    | `/api/teachers/{id}`          | Öğretmen detayı           |
| GET    | `/api/teachers/{id}/students` | Öğretmen öğrencileri     |
| POST   | `/api/teachers`               | Öğretmen ekle (Admin)      |
| PUT    | `/api/teachers/{id}`          | Öğretmen güncelle (Admin) |
| DELETE | `/api/teachers/{id}`          | Öğretmen sil (Admin)       |

### Students

| Method | URL                             | Açıklama                  |
| ------ | ------------------------------- | --------------------------- |
| GET    | `/api/students`               | Tüm öğrenciler           |
| GET    | `/api/students/{id}`          | Öğrenci detayı           |
| GET    | `/api/students/{id}/teachers` | Öğrenci öğretmenleri    |
| POST   | `/api/students`               | Öğrenci ekle (Admin)      |
| PUT    | `/api/students/{id}`          | Öğrenci güncelle (Admin) |
| DELETE | `/api/students/{id}`          | Öğrenci sil (Admin)       |

---

## Proje Yapısı

```
├── UniversityApi/
│   ├── Controllers/
│   ├── Data/
│   ├── Models/
│   ├── appsettings.json
│   └── Program.cs
│
└── UniversityApi-Frontend/
    └── university-client/
        └── src/
            ├── pages/
            ├── components/
            └── services/
```

---

*Geliştirici: Rumeysa Küçük*
