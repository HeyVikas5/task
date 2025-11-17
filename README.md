# Assignment – DSA • Frontend • Backend

This repository contains three parts of the assignment:  
- **/dsa** – Second Largest Unique Number Problem  
- **/frontend** – React User Directory Table  
- **/backend** – To-Do CRUD API  

---

## 📌 Part 1 – DSA Problem  
**Task:** Return the **second largest unique number** from an integer array.  
If not found, return **-1**.

### ✅ Example
Input:  
`[3, 5, 2, 5, 6, 6, 1]`  
Output:  
`5`

Input:  
`[7, 7, 7]`  
Output:  
`-1`

### 🧠 Approach  
- Use two variables (`largest`, `secondLargest`)  
- Track unique values  
- Single pass → **O(n)** time  
- Return `-1` if no second largest unique number exists

_Source references:_  
- C++ `unordered_set` (O(1) average operations): https://en.cppreference.com/w/cpp/container/unordered_set  
- INT_MIN definition: https://en.cppreference.com/w/cpp/header/climits  

---

## 🎨 Part 2 – Frontend (React User Directory)  
A simple React app that fetches users from:  
API: https://reqres.in/api/users  

### Features  
- Fetch and display users in a table  
- Search (name/email)  
- Sorting  
- Pagination  
- Basic filters  
- Loading state & responsive UI  
- Optional: deployed version

Setup instructions are provided inside `/frontend`.

_Source references:_  
- React official documentation: https://react.dev  
- ReqRes API docs: https://reqres.in  

---

## ⚙️ Part 3 – Backend (To-Do CRUD API)

A Node.js (Express) API implementing:
- `GET /todos`  
- `POST /todos`  
- `PUT /todos/:id`  
- `DELETE /todos/:id`

Data is stored either **in-memory** or in a simple **JSON file**.

Bonus:
- Input validation  
- `completed: true/false` field  
- Optional: deployed API link  

Setup instructions are provided inside `/backend`.

_Source references:_  
- Express.js documentation: https://expressjs.com  

---

## 📂 Repository Structure

