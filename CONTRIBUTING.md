# Contributing Guidelines

Welcome to our project! We're excited you're interested in contributing. Before you get started, please take a moment to read over the [README](README.md), and review these guidelines.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How to Contribute](#how-to-contribute)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Features](#suggesting-features)
- [Improving Documentation](#improving-documentation)
- [Pull Requests](#pull-requests)
- [Getting Started for Newcomers](#getting-started-for-newcomers)
- [Setting up the Environment](#setting-up-the-environment)
- [Testing](#testing)
- [Project Vision and Roadmap](#project-vision-and-roadmap)
- [Design and Architecture](#design-and-architecture)
- [Communication](#communication)

## Code of Conduct

We are committed to fostering a welcoming and inclusive community. Before you begin contributing, please read and adhere to our [Code of Conduct](CODE_OF_CONDUCT.md).

## How to Contribute

We welcome contributions in various forms. Here are the main ways you can help improve our project:

- Reporting bugs
- Suggesting features
- Improving documentation
- Submitting pull requests

## Reporting Bugs

If you encounter a bug, please create an issue in our GitHub repository using our provided [bug report template](https://github.com/SOFTENG310-Team4/SMARTJ/blob/main/.github/ISSUE_TEMPLATE/bug-report.md)<br />
As a general rundown though, when filing a bug report, please include in the issue:

- A clear, descriptive title
- A detailed description of the issue
- Steps to reproduce the problem
- Expected behavior
- Actual behavior
- Any relevant logs or screenshots

## Improving Documentation

We are open to any improvements to our current documentation. To do so, please create an issue using our [documentation template](https://github.com/SOFTENG310-Team4/SMARTJ/blob/main/.github/ISSUE_TEMPLATE/documentation.md)

## Suggesting Features

We're always looking for ways to improve our project. If you have an idea for a feature you can open an issue using our [feature request template](https://github.com/SOFTENG310-Team4/SMARTJ/blob/main/.github/ISSUE_TEMPLATE/feature-request.md)

_Note: Before you suggest the feature, please ensure that the feature hasn't already been suggested or implemented_

## Pull Requests

We appreciate all pull requests. To submit a pull request:

1. Fork the repository and create your branch from `main`.<br /> Please make sure that the branch name is descriptive, and describes the intention
2. If you've added code, add tests that cover your changes
3. Ensure the test suite passes
4. Make sure to rebase and update your code from our main repository
5. Submit the pull request using our provided [pull request template](https://github.com/SOFTENG310-Team4/SMARTJ/blob/main/.github/pull_request_template.md)

After submission, your pull request will be reviewed by maintainers. We may suggest changes, improvements, or alternatives.

## Getting Started for Newcomers

If you're new to the project, look for issues labeled `good first issue`. These are typically easier tasks that are suitable for newcomers.

## Setting up the Environment

To set up the development environment for SMARTJ:

1. Ensure you have the following prerequisites installed:
   - [Node.js](https://nodejs.org/) (v21.7.3 or higher recommended)
   - npm (comes with Node.js installation)
2. Fork the SMARTJ repository on GitHub.

3. Clone your forked repository:

   ```
   git clone https://github.com/YOUR-USERNAME/SMARTJ.git
   ```

4. Navigate to the project directory:

   ```
   cd SMARTJ
   ```

5. Install the project dependencies:

   ```
   npm install
   ```

6. Start the development server:

   ```
   npm start
   ```

7. Open your browser and navigate to `http://localhost:3000` (or the port specified in the console output) to view the application.

Now you're ready to start contributing to SMARTJ! If you want a more detailed overview of running the SMARTJ application, check out our [README](README.md)

## Testing Guidelines

At SMARTJ, we use Jest as our testing framework along with React Testing Library for testing React components. Following these guidelines will help ensure consistent and effective testing across our project.

### Writing Tests

- Navigate to the `src/__tests__`, and create a test file using the naming convention: `<filename>.test.js`
- Tests are written using Jest framework alongside the React Testing Library.
  For more information on [Jest](https://jestjs.io/docs/getting-started), and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

### Running the Tests

1. **Run All Tests**:

   ```
   npm test
   ```

   This will start Jest in watch mode, re-running tests related to changed files.

2. **Run All Tests Once**:

   ```
   npm test -- --watchAll=false
   ```

3. **Check Code Coverage**:
   ```
   npm test -- --coverage
   ```
   This generates a coverage report in the `coverage` directory.

### Continuous Integration

Ensure all tests pass locally before pushing your changes. Please ensure that the pull request include associated tests, and they pass accordingly.

Remember, tests are a crucial part of our development process. They help catch bugs early, serve as documentation, and make refactoring easier. If you're unsure about how to test a particular feature, don't hesitate to ask for help!

## Project Vision and Roadmap

### Vision

SMARTJ aims to be a comprehensive platform that empowers job seekers in the software engineering field by providing tools for interview practice and streamlined job searching. Our goal is to enhance the job-seeking experience and improve candidates' chances of success in their career pursuits.

### Roadmap

#### Current Release (A1)

Our initial release focuses on establishing the core functionality of SMARTJ:

1. Interactive interview practice sessions

   - Customizable formats
   - Access to a diverse question bank
   - Video recording and written response options

2. Job Finder feature

   - Curated links to software engineering job listings
   - Pre-filtered results from various job-seeking websites

3. Basic user interface and navigation

#### Future Plans (A2 and beyond)

In upcoming releases, we plan to expand SMARTJ's capabilities:

1. User Accounts and Profiles

   - Personalized user profiles
   - Progress tracking and performance analytics

2. Video Storage

   - Ability to save recorded video responses to user accounts

3. Feedback System
   - Self-Reflection Tool: Leave personal feedback after watching video replays, including written notes and Likert scale ratings.
   - Feedback Review: Functionality to read feedback left for each interview question
   - Performance Sorting: Option to sort responses based on self-assigned ratings

We welcome contributions that align with these goals and any innovative ideas that can further enhance the SMARTJ platform for our users.

## Design and Architecture

SMARTJ is a web application designed to help job seekers practice interview skills and find job opportunities. Here's a high-level overview of its architecture and design:

### Overall Architecture

SMARTJ follows a client-side rendering architecture using React.js. The application is structured as a single-page application (SPA) with client-side routing.

### Key Components

1. **Interview Practice Module**

   - Question Bank: Stores and manages interview questions
   - Practice Session: Handles the flow of an interview practice session
   - Video Recording: Manages video capture for responses (planned feature)

2. **Job Finder Module**

   - Job Listing: Curates links to job postings

3. **User Interface Components**
   - Navigation: Handles routing between different sections of the app
   - Forms: Manages user inputs for various features
   - Results Display: Presents job listings and practice session results

### Data Flow

1. User interacts with the UI components
2. React components manage local state and trigger actions
3. Actions update the application state
4. UI re-renders based on the new state

### State Management

- Currently using React's built-in state management (useState, useContext)

### Routing

- Uses React Router for client-side routing
- Main routes include Home, InterviewSettings, InterviewPractice, JobFinder, ContactUs, MyProfile, SummaryPage

### Future Scalability Considerations

1. **Backend Integration**

   - Plan to introduce a backend API such as SUPABASE for data persistence and more complex operations

2. **Database**

   - Future implementation of a database to store user data, question banks, and job listings
   - Considering options like MongoDB for flexibility or PostgreSQL for structured data

3. **Authentication**
   - Planning to implement user authentication for personalized experiences

### Testing Strategy

- Jest and React Testing Library for unit and integration tests
- Emphasis on unit testing.

## Communication

For questions or to get in touch with the maintainers:

- Contact us at: team4smartj@gmail.com

Please avoid direct emails to maintainers unless absolutely necessary.

Thank you for contributing to our project!
