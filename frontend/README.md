# 🌐 User Directory App  
A clean, responsive, and fast user directory built with **React + Vite + Tailwind CSS** — featuring search, sorting, filtering, and pagination.

🔗 **Live Demo:**  
👉 https://user-directory-tool.netlify.app/

---

## ✨ Features

✔ **Fetches users from ReqRes API** (`https://reqres.in/api/users`)  
✔ **Search** by name or email  
✔ **Sort** by first name, last name, or email  
✔ **Filters**  
  - By email domain  
  - By first letter of name  
✔ **Client-side pagination**  
✔ **Beautiful responsive design**  
✔ **Loading spinner**  
✔ **Runs fast with Vite**  
✔ **Deployed on Netlify**

---

## 🚀 Live Preview

Try the app here:

👉 **https://user-directory-tool.netlify.app/**

---

## 🛠️ Tech Stack

- **React 18**
- **Vite**
- **Tailwind CSS**
- **Fetch API / Axios**
- **Netlify Deployment**

---

## 📁 Project Structure

```
user-directory/
├── src/
│   ├── components/
│   │   ├── UserTable.jsx
│   │   ├── Spinner.jsx
│   │   └── Pagination.jsx
│   ├── api.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── tailwind.config.cjs
├── postcss.config.cjs
└── README.md
```

---

## 🧭 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/HeyVikas5/user-directory-tool.git
cd user-directory-tool
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run development server

```bash
npm run dev
```

Then open:  
**http://localhost:5173**

### 4. Build for production

```bash
npm run build
npm run preview
```

---

## 🌍 Deployment (Netlify)

This project is deployed on **Netlify**.

### Deploy Steps

1. Push your code to GitHub
2. Go to **Netlify** → Add New Site → Import from GitHub
3. Use these settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
4. Click **Deploy**

---

## 🧩 Notes

- **API used:** [ReqRes](https://reqres.in) — Public Mock API
- **No API key required**
- All features run on the client-side

---

## 👨‍💻 Author

**HeyVikas5**  
- GitHub: [@HeyVikas5](https://github.com/HeyVikas5)
- Live Demo: [user-directory-tool.netlify.app](https://user-directory-tool.netlify.app/)

---
