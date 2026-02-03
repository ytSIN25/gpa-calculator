# 🎓 GradeTracker Pro

A sleek, dark-themed grade management dashboard designed for students to track weighted assignments. Built with **Supabase** for real-time cloud synchronization and **Google OAuth** for secure access.

![License](https://img.shields.io/badge/license-MIT-blue.svg)

---

## 🚀 Key Features

*   **Weighted Calculation Engine**: Automatically computes subject totals based on custom weights (e.g., Score / Max × Weight).
*   **Global Foundation Mark**: Real-time calculation of your overall percentage across all enrolled subjects.
*   **Cloud Sync**: Changes are automatically saved to Supabase (PostgreSQL) with valid session persistence.
*   **Secure Auth**: Google OAuth integration via Supabase Auth.
*   **Accordion UI**: Expandable subject cards using a "One-Active" accordion logic for a clean interface.
*   **Smart Defauts**: Auto-populates max scores if fields are empty to project potential grades.
*   **Responsive Design**: Fully responsive layout optimized for mobile and desktop using CSS Grid/Flexbox and glassmorphism effects.

---

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | Vanilla JavaScript (ES6+), HTML5, CSS3 (Variables, Grid) |
| **Backend** | [Supabase](https://supabase.com/) (PostgreSQL Database) |
| **Auth** | Supabase Auth (Google Provider) |
| **Styling** | Custom CSS (Dark Theme, Inter Font, Glassmorphism) |

---

## 📂 Project Structure

```text
├── index.html       # Main Dashboard & Login Logic
├── style.css        # Dark Theme, Responsive Utilities & Animations
└── script.js        # Calculation Engine, Sync Logic, & State Management
```

## ⚡ Usage

1.  **Login**: Click "Login with Google" to authenticate and load your saved data.
2.  **Edit Scores**: Open a subject card (e.g., "Math A") and enter your scores.
3.  **Real-Time Ops**: The app calculates totals instantly and syncs to the cloud after you stop typing (debounced save).
4.  **Logout**: Securely sign out to clear session data.

> **Note**: This project requires a valid Supabase project URL and anon key configured in `script.js`.
