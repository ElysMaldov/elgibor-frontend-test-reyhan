# Elgibor Frontend Test Reyhan Submission

Proyek ini dibangun untuk tes rekrutmen posisi Front End Developer di PT Elgibor Solusi Digital.

Proyek ini dapat dijalankan melalui source code dengan mengikuti panduan di bawah, atau dapat diakses melalui link berikut:
<https://elgibor-frontend-test-reyhan.vercel.app/>.

Website yang saya bangun berfungsi sebagai katalog produk sederhana 100% offline dengan memanfaatkan React dan Redux bersama localStorage.

Spesifiknya, website ini memiliki fitur:

1. Menampilkan daftar produk dari [fakestoreapi.com](http://fakestoreapi.com/).
2. Search dan filter produk berdasarkan nama dan kategori, yang disimpan dalam query string URL sehingga dapat di-bookmark atau share oleh pengguna.
3. Menampilkan detail produk ketika diklik.
4. Menambah/menghapus produk dari wishlist ke localStorage
5. Membuat review produk yang disimpan di localStorage.

Daftar Isi:

- [Elgibor Frontend Test Reyhan Submission](#elgibor-frontend-test-reyhan-submission)
  - [Menjalankan Proyek](#menjalankan-proyek)
  - [Menjalankan Testing](#menjalankan-testing)
    - [Menjalankan Unit Testing](#menjalankan-unit-testing)
    - [Menjalankan e2e Testing](#menjalankan-e2e-testing)
  - [Penjelasan Teknis](#penjelasan-teknis)
  - [TypeScript](#typescript)
  - [UI \& Build Tool](#ui--build-tool)
    - [Styling](#styling)
    - [Form \& Validation](#form--validation)
  - [State Management \& Querying](#state-management--querying)
  - [Testing](#testing)
    - [Unit Tests](#unit-tests)
    - [e2e Tests](#e2e-tests)
  - [CI/CD](#cicd)

## Menjalankan Proyek

1. Clone repository

    ```bash
    git clone https://github.com/ElysMaldov/elgibor-frontend-test-reyhan.git
    ```

2. Install dependencies dengan perintah CLI:

   ```bash
   npm install
   ```

3. Jalankan proyek dengan perintah CLI:

   ```bash
   npm run dev
   ```

4. Jika ingin build, gunakan perintah CLI:

   ```bash
   npm run build
   ```

   Hasil akan tersimpan di folder `dist`.

## Menjalankan Testing

Proyek ini dilengkapi unit testing menggunakan Vitest dan e2e testing menggunakan Playwright.

### Menjalankan Unit Testing

1. Jika ingin menjalankan unit testing di CLI tanpa coverage, gunakan:

   ```bash
   npm run test
   ```

2. Jika ingin menjalankan unit testing di CLI dengan coverage, gunakan:

   ```bash
   npm run coverage
   ```

3. Jika ingin menjalankan unit testing di browser, gunakan:

   ```bash
   npm run test:ui
   ```

### Menjalankan e2e Testing

> ⚠️ Pastikan server lokal sudah berjalan dengan perintah `npm run dev` sebelum menjalankan e2e testing. Namun, jika menjalankan command e2e test di bawah seharusnya akan secara otomatis menjalankan server lokal.

1. Jika ingin menjalankan e2e testing di CLI, gunakan:

   ```bash
   npm run test:e2e
   ```

2. Jika ingin menjalankan e2e testing di browser, gunakan:

   ```bash
   npm run test:e2e:ui
   ```

## Penjelasan Teknis

## TypeScript

TypeScript digunakan untuk meningkatkan konsistensi kode dan mempermudah pemeliharaan kode sampai masa depan.

## UI & Build Tool

Website ini menggunakan React dan Vite untuk membangun UI. Vite digunakan karena dia lebih cepat dan lebih direkomendasikan daripada Create React App. Selain Vite, website ini dapat dibangun dengan Next.js, namun Vite dipilih untuk memastikan kode yang dibuat 100% menggunakan Client Component dan dapat di-host dengan sederhana.

### Styling

Shadcn/ui dan Tailwind CSS v4 digunakan untuk mempercepat membangun UI yang responsif, fungsional, dan tetap dapat dimodifikasi. Kedua library ini direkomendasikan untuk proyek-proyek React baru karena meringankan beban developer dari membangun UI dari awal.

### Form & Validation

Pembuatan form menggunakan `react-hook-form` dan validasi dengan `zod`. Kedua library ini termasuk ringan, mudah digunakan, fleksibel, dan menjadi pilihan `shadcn/ui`.

## State Management & Querying

Redux Toolkit (RTK) digunakan untuk memanajemen state global. RTK Query digunakan untuk mempermudah caching dan revalidasi data dari API.

Store redux yang digunakan di aplikasi ini adalah untuk:

1. Memanajemen data produk yang di-fetch menggunakan RTK Query.
2. Memanajemen wishlist produk yang disimpan di localStorage.
3. Memanajemen review produk yang disimpan di localStorage.

Untuk memastikan data tetap tersimpan ketika pengguna refresh/menutup browser, digunakan library [`redux-persist`](https://www.npmjs.com/package/redux-persist) untuk menyimpan state wishlist dan review ke localStorage.

## Testing

### Unit Tests

Beberapa logika penting diterapkan unit testing menggunakan Vitest. Vitest lebih dipilih daripada Jest karena dia menggunakan Vite, memiliki support TypeScript langsung, lebih cepat dijalankan, dan memiliki syntax yang sama dengan Jest.

Tidak semua logika ataupun komponen dapat diuji dengan waktu yang terbatas, sehingga logika-logika krusial saja yang lebih diprioritaskan untuk pengujian. Sebagai contoh fetching data dan penyimpanan state ke localStorage.

### e2e Tests

e2e test menggunuakan Playwright untuk memastikan fitur-fitur yang diperlukan berfungsi dengan benar ketika digunakan user. Untuk sekarang, e2e test hanya dapat menguji website yang dijalankan secara lokal. Jika ingin menguji di production atau environment lain, bisa ubah URL yang digunakan oleh metode-metode `page.goto`.

## CI/CD

Proyek disimpan dalam GitHub dan secara otomatis di-deploy ke Vercel setiap ada push baru di branch `main`. Selain itu, bisa ada tahap testing sebelum deployment menggunakan GitHub Actions.
