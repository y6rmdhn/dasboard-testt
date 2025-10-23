This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

### Prerequisites

- Node.js (versi yang direkomendasikan bisa dicek di `.nvmrc` atau `package.json` jika ada)
- npm, yarn, atau pnpm

### Installation

1.  Clone repositori ini:
    ```bash
    git clone <URL_REPOSITORI_ANDA>
    cd <NAMA_FOLDER_PROYEK>
    ```
2.  Install dependensi:
    ```bash
    npm install
    # atau
    yarn install
    # atau
    pnpm install
    ```

### Environment Variables

Proyek ini memerlukan beberapa environment variable untuk berjalan dengan benar. Variabel ini digunakan untuk konfigurasi Firebase dan URL API dasar.

1.  Buat file baru di root proyek bernama `.env.local`.
2.  Salin isi dari file `.env.example` (jika ada) atau tambahkan variabel berikut ke dalam `.env.local`:

    ```env
    NEXT_PUBLIC_FIREBASE_API_KEY=xxx
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=xxx
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=xxx
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=xxx
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=xxx
    NEXT_PUBLIC_FIREBASE_APP_ID=xxx
    BASE_URL=xxx # URL API Backend Anda
    ```

    **Penting**: Ganti `xxx` dengan nilai konfigurasi Firebase Anda dan URL API backend yang sesuai. File `.env.local` ini sudah dimasukkan ke dalam `.gitignore`, sehingga tidak akan terkirim ke repositori Git Anda.

### Running the Development Server

Setelah instalasi dan konfigurasi environment variable selesai, jalankan server pengembangan:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```
