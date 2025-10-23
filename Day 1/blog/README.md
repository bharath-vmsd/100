# Getting Started with Create React App

This project was bootstrapped with [Create React App].

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.


### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!



# Project: Blog

This project is a simple blog application built with React. It allows users to view a list of articles, read individual articles, and navigate between different pages.

## Tech Stack

*   **React:** A JavaScript library for building user interfaces.
*   **React Router:** For handling client-side routing.
*   **Create React App:** The project was bootstrapped with Create React App.

## Low-Level Design

The application is structured into several components:

*   **`App.js`:** The main component that sets up the routing for the application.
*   **`NavBar.js`:** A navigation bar that is displayed on all pages.
*   **`HomePage.js`:** The landing page of the application.
*   **`AboutPage.js`:** A page that provides information about the blog.
*   **`ArticleListPage.js`:** A page that displays a list of all articles.
*   **`ArticlePage.js`:** A page that displays a single article.
*   **`NotFoundPage.js`:** A page that is displayed when a user navigates to a non-existent route.

The application uses `react-router-dom` to handle routing. The routes are defined in `App.js`, and each route is mapped to a specific component.

## Code Practices

*   **Component-Based Architecture:** The application is built using a component-based architecture, which makes it easy to reuse and maintain code.
*   **File Organization:** The code is organized into different folders based on functionality. For example, all the pages are in the `src/pages` directory, and all the reusable components are in the `src/components` directory.
*   **CSS Modules:** The application uses CSS Modules to scope CSS to individual components, which helps to avoid CSS conflicts.

## File Overview

*   **`public/`:** This directory contains the public assets of the application, such as `index.html` and `favicon.ico`.
*   **`src/`:** This directory contains the source code of the application.
    *   **`components/`:** This directory contains reusable components.
    *   **`pages/`:** This directory contains the different pages of the application.
    *   **`App.js`:** The main component of the application.
    *   **`index.js`:** The entry point of the application.
    *   **`NavBar.js`:** The navigation bar component.
*   **`package.json`:** This file contains the project's dependencies and scripts.
