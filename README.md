# Luis Reinoso Angular Showcase

## Table of Contents
- [Installation](#installation)
- [Folder Structure](#folder-structure)
- [Tools Used](#tools-used)
- [Backend Requirements](#backend-requirements)

## Installation

1. Start the backend server `npm run start:dev` (this repo don't include it) you will see an error due angular proxy
2. Run the next actions

| **Action**                | **npm**      | **pnpm (best option)**     |
|---------------------------|------------------------|------------------------|
| Install Dependencies       | `npm install`          | `pnpm install`         |
| Start Project              | `npm run start`        | `pnpm start`           |
| Run Storybook              | `npm run storybook`    | `pnpm storybook`       |
| Run Tests                  | `npm run test`         | `pnpm test`            |

## Folder Structure

The project follows a structured folder layout, organized as follows:

```
./src/
├── app
│   ├── core
│   │   └── services
│   ├── models
│   ├── pages
│   │   ├── list-product-page
│   │   └── register-product-page
│   │       └── components
│   │           └── register-product-form
│   └── shared
│       ├── alert
│       ├── button
│       ├── context-menu
│       ├── dialog
│       ├── header
│       ├── pipes
│       ├── search
│       ├── select
│       └── table
├── assets
├── styles
│   ├── abstracts
│   └── components
└── styles.scss
```
- **app**: Contains the primary application components, services, and routing configurations.
- **core**: Contains core services that provide data and methods throughout the app.
- **models**: Data models used across the application.
- **pages**: Contains page components including their respective services.
- **shared**: Contains reusable components, directives, and pipes.
- **assets**: Contains images and other static assets.
- **styles**: Contains global styles and component-specific styles.

## Tools Used

- **Angular** : Framework for building the application.
- **Storybook**: Tool for developing UI components in isolation.
- **Jest**: JavaScript testing framework used for running unit tests.
- **Wallaby.js**: Continuous test runner for real-time test feedback.
- **pnpm**: Fast node package manager

## Backend Requirements

This application uses Angular proxy configurations to connect to a backend server. Ensure that you start the provided backend before running the application for end-to-end functionality.
