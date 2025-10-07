# 🔐 SecureSeed — Password Generator + Secure Vault

SecureSeed is a **simple, privacy-first web app** that allows users to **generate strong passwords**, **store them securely** in an encrypted vault, and **manage (search, edit, delete)** them with ease.

All vault items are **encrypted on the client side using AES** before being stored in the database — ensuring the server never sees plaintext data.

---

## 🧩 Tech Stack

| Layer | Technology |
|--------|-------------|
| Frontend | **Next.js + TypeScript + Tailwind CSS** |
| Backend | **Node.js + Express.js** |
| Database | **MongoDB (Mongoose)** |
| Encryption | **CryptoJS (AES)** — client-side encryption |
| Auth | **JWT (JSON Web Token)** |

---

## ✨ Features

- 🔑 Generate strong passwords (adjustable length, symbols, numbers, letters)  
- 🧱 Save passwords in your personal encrypted vault  
- 🔒 **Client-side AES encryption** — no plaintext stored or transmitted  
- 🧾 View, Edit, and Delete vault entries easily  
- 🔍 Search or filter vault items  
- 📋 Copy password to clipboard (auto-clears after 10 seconds)  
- 🌑 Optional dark mode for better UX  
- ⚡ Fast, minimal UI built with Tailwind CSS  

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Adityashekhawat225/secure-Seed.git
cd SecureSeed
