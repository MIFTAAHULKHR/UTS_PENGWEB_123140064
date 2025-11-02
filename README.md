# 📰 Digit 4 News Portal

Sebuah aplikasi portal berita modern yang dibangun dengan React.js dan Tailwind CSS, menyediakan akses ke berita terkini dari berbagai kategori dengan antarmuka yang responsif dan user-friendly.

## 🚀 Fitur Utama

- **📊 Berita Terkini** - Akses berita terbaru dari berbagai kategori
- **🔍 Pencarian Cerdas** - Cari berita berdasarkan kata kunci
- **📅 Filter Tanggal** - Filter berita berdasarkan rentang tanggal
- **🎯 Kategori Berita** - Technology, Business, Sports

## 🛠 Teknologi yang Digunakan

- **Frontend:** React.js 18, Tailwind CSS
- **Icons:** Lucide React
- **API:** NewsAPI.org
- **Deployment:** Vercel
- **Version Control:** Git & GitHub

## 🌐 Link Deployment

**Live Demo:** [https://uts-pwd-123140064.vercel.app](https://uts-pengweb-123140064-1symboqnl-miftahul-khoiriyahs-projects.vercel.app/)
**Notes** Pada halaman vercel, developer telah menambahkan sebanyak 50 data berita, namun data keseluruhan tidak muncul di dashboard tapi ketika dilakukan pencarian data akan muncul. 


## 📸 Screenshot Aplikasi

![News Portal Dashboard](/Tampilan1.png)
*Halaman utama dengan grid berita*

![Date Functionality](/Tampilan2.png)
*Fitur pencarian dan filter*

## 💻 Cara Instalasi dan Menjalankan

### Prerequisites
- Node.js (versi 14 atau lebih tinggi)
- npm atau yarn

### Langkah-langkah Instalasi

1. **Clone repository**
   ```bash
   git clone https://github.com/MIFTAAHULKHR/percobaanUTS.git
   cd percobaanUTS
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables** (opsional)
   Buat file `.env` dan tambahkan:
   ```env
   REACT_APP_NEWS_API_KEY=your_newsapi_key_here
   ```

4. **Jalankan aplikasi**
   ```bash
   npm start
   ```

5. **Buka browser**
   ```
   http://localhost:3000
   ```

### Build untuk Production
```bash
npm run build
```

## 📁 Struktur Project

```
src/
├── components/
│   ├── DataTable.jsx      # Komponen tabel berita
│   ├── DetailCard.jsx     # Kartu detail berita
│   ├── Header.jsx         # Header dengan navigasi
│   └── SearchForm.jsx     # Form pencarian & filter
├── App.jsx               # Komponen utama
├── App.css              # Stylesheet
└── index.js             # Entry point
```

## 🎯 Cara Penggunaan

1. **Melihat Berita Berdasarkan Kategori**
   - Pilih kategori dari header (Technology, Business, Sports, dll.)
   - Berita akan otomatis ter-filter berdasarkan kategori

2. **Mencari Berita**
   - Ketik kata kunci di kolom pencarian
   - Tekan "Search" atau Enter

3. **Filter Berdasarkan Tanggal**
   - Pilih tanggal mulai (From Date)
   - Pilih tanggal akhir (To Date)
   - Tekan "Filter"

4. **Navigasi Halaman**
   - Gunakan tombol "Previous" dan "Next"
   - Lihat informasi halaman saat ini

## 📝 Notes

- Aplikasi menggunakan **NewsAPI** sebagai sumber data berita
- Untuk development, API key sudah disediakan dalam fallback
- Untuk production, disarankan menggunakan environment variables
- Fallback data tersedia jika API tidak dapat diakses

## 👨‍💻 Developer

**Miftahul Khoriyah**
- GitHub: [@MIFTAAHULKHR](https://github.com/MIFTAAHULKHR)
- Project: [percobaanUTS](https://github.com/MIFTAAHULKHR/percobaanUTS)

---

**© 2024 Digit 4 News Portal - Powered by NewsAPI**