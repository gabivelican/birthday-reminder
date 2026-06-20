# Birthday Reminder App

A sleek, modern Angular application designed to help you manage and remember the birthdays of your friends, family, and colleagues. Built with Angular's latest features (Signals, standalone components) and the NgZorro UI library.

## Key Features

* **User Authentication:** Login and Register forms with custom validation, connected to a mock API (`reqres.in`).
* **Route Protection:** Implemented `authGuard` and `guestGuard` to protect private routes and redirect logged-in users.
* **Lazy Loading:** Fully lazy-loaded routing architecture for optimal performance.
* **Interactive Dashboard:** * View contacts in a structured table.
  * Sort data by any column (Name, Birth Date, Phone, Relationship).
  * Real-time search filtering using Angular Signals.
* **Manage Contacts:** Add, Edit, and Delete contacts through a reusable Modal component powered by Reactive Forms.
* **Fun Animations:** Triggers a confetti animation when you log in if a saved contact has their birthday today.

## Tech Stack

* **Framework:** Angular (v17+) using Standalone Components
* **UI Library:** NgZorro Ant Design
* **State Management:** Angular Signals & RxJS
* **Animations:** Canvas-Confetti

## Prerequisites & Installation

To run this project locally, you need to have Node.js and Angular CLI installed on your machine.

1. Clone the repository:
   git clone <your-repository-url>

2. Navigate to the project directory:
   cd birthday-reminder

3. Install the dependencies:
   npm install

4. Start the development server:
   ng serve
   The application will automatically open or be available at http://localhost:4200.

## How to test the app

Because the app uses `reqres.in` as a fake backend API for authentication, you need to use specific mock credentials to log in successfully.

**Test Account:**
* **Email:** eve.holt@reqres.in
* **Password:** Any valid password that passes the frontend validation (e.g., Password123!)

Once logged in, you can add new contacts using the "+ Add Person" button and explore the table sorting, searching, and editing functionalities.