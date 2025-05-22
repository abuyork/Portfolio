# Project Overview

This project is a modern web application built using **React** and **TypeScript**. It leverages **Vite** as its build tool and development server, offering a fast development experience.

## Key Technologies:

*   **Frontend Framework:** React
*   **Language:** TypeScript (configured via `tsconfig.json`, `tsconfig.app.json`, and `tsconfig.node.json`)
*   **Build Tool:** Vite (`vite.config.ts`)
*   **Styling:**
    *   **Tailwind CSS:** Utility-first CSS framework (`tailwind.config.js`, `postcss.config.js`).
    *   **Styled Components:** CSS-in-JS library for component-level styling (`package.json`).
    *   Base styles and Tailwind directives are likely in `src/index.css`.
*   **Linting:** ESLint (`eslint.config.js`) is used for code quality and consistency.
*   **Animation:** Framer Motion (`package.json`) is included for animations.
*   **Icons:** Lucide Icons (`lucide-react`) and React Icons (`react-icons`) are used for UI icons.
*   **Polyfills:** `smoothscroll-polyfill` is included to ensure smooth scrolling behavior across browsers, particularly Safari.

## Project Structure:

*   **`src/`**: Contains the main application code.
    *   **`main.tsx`**: The application's entry point, responsible for rendering the root `App` component into the DOM (`index.html`). It also initializes the smoothscroll polyfill.
    *   **`App.tsx`**: The main application component. It structures the different sections of the website (likely a portfolio or personal site) including `Navbar`, `Hero`, `About`, `Projects`, `Experience`, `Contact`, and `Footer`. It implements several dynamic UI features:
        *   A custom cursor (`./components/common/CustomCursor`).
        *   A dynamic background gradient that changes based on scroll progress.
        *   A navbar that hides upon scrolling down and reappears at the top.
        *   A scroll-to-top button that appears after scrolling down.
        *   Intersection Observer API is used to trigger animations (e.g., slide-up) as elements enter the viewport.
    *   **`components/`**: Likely contains reusable UI components used throughout the application (Navbar, Hero, About, etc.).
    *   **`contexts/`**: Might contain React Context providers/consumers for state management.
    *   **`utils/`**: Probably holds utility functions.
    *   **`index.css`**: Contains base styles and Tailwind CSS directives.
*   **`public/`**: (Implicitly used by Vite) For static assets.
*   **`index.html`**: The main HTML file where the React application is mounted.
*   **Configuration Files:** `vite.config.ts`, `tailwind.config.js`, `postcss.config.js`, `tsconfig.*.json`, `eslint.config.js`.
*   **Package Management:** `package.json` and `package-lock.json` manage project dependencies and scripts (`dev`, `build`, `lint`, `preview`).

## Functionality:

The application appears to be a single-page portfolio website showcasing different sections like About Me, Projects, and Work Experience. It features a sophisticated UI with scroll-based animations, a dynamic background, a custom cursor, and smooth navigation elements.
