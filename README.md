# 🎓 GradeCalc: Smart Weighted Grade Tracker

A sleek, dark-themed grade management application designed for students to track weighted assignments across multiple subjects. Built with **Supabase** for real-time cloud synchronization and **Google OAuth** for secure access.

---

## 🚀 Key Features

* **Weighted Calculation Engine**: Automatically calculates subject totals based on custom weights (e.g., Score / Max × Weight).
* **Global Grade Averaging**: Computes an overall percentage across all subjects in real-time.
* **Auto-Sync**: Automatically saves your scores to the cloud using a debounced syncing logic (saves 1 second after you stop typing).
* **Google OAuth**: Secure, one-click login to keep your data private and accessible across devices.
* **Smart Defaults**: Automatically populates empty fields with maximum marks to show your "potential" grade.
* **Responsive UI**: Optimized for both desktop and mobile viewing with smooth CSS transitions.

---

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | Vanilla JavaScript (ES6+), CSS3 (Grid/Flexbox), HTML5 |
| **Backend** | [Supabase](https://supabase.com/) (PostgreSQL) |
| **Auth** | Supabase Auth (Google Provider) |
| **Design** | Inter Font System, Tailwind-inspired Dark Palette |

---

## 📂 Project Structure

```text
├── index.html       # Dashboard structure & Login UI
├── style.css        # Theme variables & Responsive layout
└── script.js        # Calculation engine, Sync logic & Auth state
