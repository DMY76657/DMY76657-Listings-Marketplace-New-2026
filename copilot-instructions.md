# Taskboard

Taskboard is a Trello-style task management app built with JS and Supabase. Users register / login, then create projects, the view taskboard for each project, and create / edit / delete tasks on the taskboard. Tasks can be dragged and dropped between columns on the taskboard, and reordered within a column.

## Architecture and Tech Stack

Classical client-server app:
  - Front-end: JS app, Bootstrap, HTML, CSS
  - Back-end: Supabase
  - Database: PostgreSQL
  - Authentication: Supabase Auth
  - Build tools: Vite, npm
  - API: Supabase REST API
  - Hosting: Netlify
  - Source code: GitHub

## Modular Design

Use modular code structure, with separate files for different components, pages and features. Use ES6 modules to organize the code.

## UI Guidelines
  - Use HTML, CSS, Bootstrap and Vanilla JS for the front-end.
  - Use Bootstrap components and utilities to create a responsive and user-friendly interface.
  - Implement modern, responsive UI design, with semantic HTML.
  - Use a consistent color scheme and typography throughout the app.
  - Use appropriate icons, effects and visual cues to enhance usability.

## Pages and Navigation
  - Split the app into multiple pages: login, registration, project list, taskboard, admin panel, etc.
  - Implement pages as reusable components (HTML, CSS and JS code).
  - Use routing to navigate between pages.
  - Use full URLs like: /, /login, /register, /projects, /projects/{id}/tasks, /admin, etc.

## Backend and Database
  - Use Supabase as the backend and database for the app.
  - Use PostgreSQL as the database, with tables for users, projects, tasks, etc.
  - Use Supabase Storage for file uploads (e.g. task attachments).
  - When changing the DB schema, always use migrations to keep track of changes.
  - After applying a migration in Supabase, keep a copy of the migration SQL file in the code.

## Authentication and Authorization
  - Use Supabase Auth for user authentication and authorization.
  - Implement RLS policies to restrict access to data based on user roles and permissions.
  - Implement user roles with a separate DB table `user_roles` + enum `roles` (e.g. admin, user).
  ## Routing (Full URLs) + File Structure (Single Source of Truth)

Use clean URLs without `.html` by using folders with `index.html`.

### Routes → Files

Public (guest):
- `/login` → `/login/index.html` (JS: `/src/pages/login.js`)
- `/register` → `/register/index.html` (JS: `/src/pages/register.js`)

Authenticated (user/admin):
- `/projects` → `/projects/index.html` (JS: `/src/pages/projects.js`)
- `/projects/new` → `/projects/new/index.html` (JS: `/src/pages/projectCreate.js`)
- `/profile` → `/profile/index.html` (JS: `/src/pages/profile.js`)

Admin only:
- `/admin` → `/admin/index.html` (JS: `/src/pages/admin.js`)
- `/admin/users` → `/admin/users/index.html` (JS: `/src/pages/adminUsers.js`)

Dynamic route (project taskboard):
- `/projects/{id}/tasks` → served by `/tasks/index.html` (JS: `/src/pages/tasks.js`) via Netlify rewrite

Root behavior:
- `/` → if NOT authenticated: redirect to `/login`
- `/` → if authenticated: redirect to `/projects`

### Required Folder Structure (root)

- `/login/index.html`
- `/register/index.html`
- `/projects/index.html`
- `/projects/new/index.html`
- `/profile/index.html`
- `/admin/index.html`
- `/admin/users/index.html`
- `/tasks/index.html`

### Page Bootstrapping Pattern (every page)

Each HTML page must include:
- `<header id="app-nav"></header>`
- `<script type="module" src="/src/pages/<page>.js"></script>`

Each page JS must:
1) Run guard (auth / admin)
2) Render navbar
3) Load page data

### Navbar (single component)

- Component: `/src/components/navbar.js`
- Usage in each page JS:
  - `renderNavbar(document.querySelector('#app-nav'))`

Navbar links:
- Guest: `/login`, `/register`
- User: `/projects`, `/profile`, Logout(action)
- Admin: `/projects`, `/admin`, `/profile`, Logout(action)

### Guards (single utility)

- Utility: `/src/utils/guard.js`
- Rules:
  - `/login`, `/register` are guest-only:
    - if authenticated → redirect `/projects`
  - `/projects*`, `/profile`, `/tasks` require authenticated:
    - if not authenticated → redirect `/login`
  - `/admin*` require admin role:
    - if not admin → redirect `/projects`

### Netlify Rewrite for Dynamic URL

Hosting: Netlify

Create file: `public/_redirects` with:
- `/projects/*/tasks   /tasks   200`

`/src/pages/tasks.js` must parse projectId from path:
- Example URL: `/projects/123/tasks` → projectId = `123`