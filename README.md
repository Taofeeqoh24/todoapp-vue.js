# Vue.js Todo App

A modern, responsive todo application built with Vue 3, TypeScript, and Supabase. This project features real-time data synchronization, pagination, search, filtering, and a clean user interface.

## ✨ Features

- **Create, Read, Update, Delete (CRUD)** todos
- **Real-time updates** with Supabase
- **Search functionality** to find todos quickly
- **Filter todos** by status (All, Completed, Pending)
- **Pagination** for better performance with large datasets
- **Toggle completion status** with checkboxes
- **Detailed todo view** with routing
- **Responsive design** optimized for desktop and mobile
- **Modal interfaces** for editing and deleting todos
- **TypeScript support** for better development experience
- **Modern Vue 3 Composition API**

## 🚀 Tech Stack

- **Frontend Framework:** Vue 3 with TypeScript
- **Routing:** Vue Router 4
- **State Management:** TanStack Vue Query (for server state)
- **Database:** Supabase (PostgreSQL)
- **Styling:** Tailwind CSS
- **Build Tool:** Vite
- **Package Manager:** npm

## 📦 Prerequisites

Before running this project, make sure you have:

- Node.js (v18 or higher)
- npm (v9 or higher)
- A Supabase account and project

## 🛠️ Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd vue-todo-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   
   Create a `.env.local` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Set up Supabase database:**
   
   Run this SQL in your Supabase SQL editor:
   ```sql
   CREATE TABLE todos (
     id BIGSERIAL PRIMARY KEY,
     title TEXT NOT NULL,
     completed BOOLEAN DEFAULT FALSE,
     user_id TEXT DEFAULT 'guest',
     created_at TIMESTAMPTZ DEFAULT NOW()
   );

5. **Start the development server:**
   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173`

## 📱 Usage

### Adding Todos
1. Use the "Add Todo" button or form
2. Enter your task title
3. Click "Save" to add the todo

### Managing Todos
- **Toggle completion:** Click the checkbox next to any todo
- **Edit todo:** Click the "Edit" button and modify the title
- **Delete todo:** Click the "Delete" button and confirm
- **View details:** Click on the todo title to see detailed view

### Navigation & Filtering
- **Search:** Use the search bar to find specific todos
- **Filter:** Toggle between All, Completed, and Pending todos
- **Pagination:** Navigate between pages using Previous/Next buttons
- **Detailed view:** Click on todo titles to see individual todo pages


## 🎨 Styling

This project uses **Tailwind CSS** for styling with a purple and yellow color scheme:

- **Primary colors:** Purple-800, Purple-300
- **Accent colors:** Yellow-600, Green-600 (for status)
- **Background:** Slate-200
- **Interactive elements:** Hover effects and shadows

## 🚀 Deployment

### Using PipeOps

1. **Connect your repository** to PipeOps
2. **Set environment variables** in PipeOps dashboard
3. **Configure build settings:**
   - Build Command: `npm run build`
   - Start Command: `npm run preview` or serve the `dist` folder
   - Node.js Version: 18+