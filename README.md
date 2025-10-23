This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Bagian ini akan memandu Anda untuk menyiapkan dan menjalankan proyek ini di lingkungan lokal Anda.

### Prerequisites (Persyaratan Sistem) 📋

Pastikan sistem Anda memenuhi persyaratan berikut:

- **Node.js**: Versi `18.17.0` atau yang lebih baru. Proyek ini menggunakan Next.js 14 yang memerlukan versi Node.js ini. Anda dapat memeriksa versi Node.js Anda dengan menjalankan `node -v` di terminal.
- **Package Manager**: Anda memerlukan salah satu dari manajer paket berikut:
  - **npm**: Versi `6.14.17` atau yang lebih baru direkomendasikan. Versi Anda saat ini (`11.6.2`) sudah memenuhi syarat. Anda dapat memeriksa versi npm Anda dengan `npm -v`.
  - **yarn**: Versi `1.22.19` atau yang lebih baru. Anda dapat memeriksa versi yarn Anda dengan `yarn -v`.
  - **pnpm**: Versi `8.6.10` atau yang lebih baru. Anda dapat memeriksa versi pnpm Anda dengan `pnpm -v`.

### Installation (Instalasi) ⚙️

1.  **Clone Repositori**: Unduh kode proyek dari repositori Git.

    ```bash
    git clone <URL_REPOSITORI_ANDA>
    cd <NAMA_FOLDER_PROYEK>
    ```

    Ganti `<URL_REPOSITORI_ANDA>` dengan URL repositori Git Anda dan `<NAMA_FOLDER_PROYEK>` dengan nama direktori tempat Anda mengkloning proyek.

2.  **Install Dependensi**: Pasang semua paket yang diperlukan oleh proyek. Pilih salah satu perintah berikut sesuai dengan manajer paket yang Anda gunakan:
    ```bash
    npm install
    ```
    _atau_
    ```bash
    yarn install
    ```
    _atau_
    ```bash
    pnpm install
    ```
    Perintah ini akan mengunduh dan memasang semua dependensi yang tercantum dalam file `package.json`.

### Environment Variables (Variabel Lingkungan) 🔑

Proyek ini memerlukan beberapa environment variable untuk berjalan dengan benar, terutama untuk konfigurasi Firebase dan URL API dasar.

1.  Buat file baru di _root_ (direktori utama) proyek bernama `.env.local`.
2.  Salin isi dari file `.env.example` (jika ada) atau tambahkan variabel berikut ke dalam `.env.local`:

    ```env
    NEXT_PUBLIC_FIREBASE_API_KEY=xxx
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=xxx
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=xxx
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=xxx
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=xxx
    NEXT_PUBLIC_FIREBASE_APP_ID=xxx
    BASE_URL=xxx # Ganti dengan URL API Backend Anda
    ```

    **Penting**: Ganti `xxx` dengan nilai konfigurasi Firebase Anda yang sebenarnya dan URL API backend yang sesuai. File `.env.local` ini _tidak_ akan terlacak oleh Git karena sudah tercantum di `.gitignore`, menjaga kerahasiaan kredensial Anda. Konfigurasi ini dibaca oleh file seperti `environment.ts` dan `firebase.ts`.

### Running the Development Server (Menjalankan Server Pengembangan) ▶️

Setelah instalasi dan konfigurasi environment variable selesai, jalankan server pengembangan lokal:

```bash
npm run dev
```
