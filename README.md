# Zoku Calendar App

Zoku is a full-stack time tracking and calendar management application built with Next.js, Express, and PostgreSQL. It's MVP version is deployed on Railway (backend) and Netlify (frontend). 

The MVP is a web application with responsive design. For the MVP of this project I'm tried for the following features: 

## Features

- Calendar management with event scheduling
- Time tracking with customizable categories
- Todo list organization
- Goal setting and progress tracking
- Responsive design for all devices

## Inspiration

There are a lot of time and goal tracking apps out there. 

Here are a few I've researched: 

- [any.do](https://www.any.do/)
- [The Fabulous](https://www.thefabulous.co/)
- [Habitica](https://habitica.com/)
- [monday.com](https://monday.com/)
- [Oak-Meditation & Breathing](https://apps.apple.com/fr/app/oak-meditation-breathing/id1210209691)
- [Dawn - Minimal Calendar](https://apps.apple.com/us/app/dawn-minimal-calendar/id1509374383)

## Tech Stack

### Frontend
- Next.js 13+
- React
- TailwindCSS
- Material UI
- TypeScript
- date-fns


### Backend
- Express.js
- PostgreSQL
- Sequelize ORM
- JWT Authentication


## Database Diagram

![zoku app database diagram](./docs/db-diagrams.png)

## Initial wireframes
![zoku app wireframe v1](./docs/Version-One-wireframes.png)
![zoku app wireframes v2-1](./docs/Wireframes-V2-1.png)
![zoku app wireframes v2-2](./docs/Wireframes-V2-2.png)

## Running application
![deployed zoku app screen shot](./docs/Zoku-screenshot.png)


## Architecture

```mermaid
graph TD
    subgraph "Frontend - Next.js"
        A[Web Client] --> B[Next.js Pages]
        B --> C[React Components]
        C --> D[State Management]
        D --> E[API Client]
    end

    subgraph "Backend - Express"
        F[API Routes] --> G[Controllers]
        G --> H[Services]
        H --> I[Models]
        I --> J[(PostgreSQL Database)]
    end

    subgraph "Authentication"
        K[JWT Auth] --> F
        K --> A
    end

    subgraph "External Services"
        L[Railway PostgreSQL] --> J
    end

    E --> |HTTP/HTTPS| F
```

### Architecture Components

#### Frontend Layer
- **Web Client**: Browser-based interface
- **Next.js Pages**: Server-side rendered pages
- **React Components**: Reusable UI components
- **State Management**: Client-side data handling
- **API Client**: Axios/Fetch service for API calls

#### Backend Layer
- **API Routes**: Express endpoints
- **Controllers**: Request handling logic
- **Services**: Business logic
- **Models**: Sequelize ORM models
- **Database**: PostgreSQL data storage

#### Authentication
- JWT-based authentication
- Secure token management
- Protected routes

#### External Services
- Railway for PostgreSQL hosting


## API Documentation

### Authentication
- POST /auth/register
- POST /auth/login
- POST /auth/logout

### Events
- GET /events
- POST /events
- PUT /events/:id
- DELETE /events/:id


### Categories
- GET /categories
- POST /categories
- PUT /categories/:id
- DELETE /categories/:id

### Time Logs
- POST /time-logs/start
- POST /time-logs/:id/stop
- GET /time-logs/daily
- GET /time-logs/category/:id

## Local Development

1. Clone the repository:
```bash
git clone https://github.com/yourusername/zoku-calendar.git
```

2. Install dependencies:
```bash
cd zoku-calendar-backend
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Start the development server:
```bash
npm run dev
```

# Running the Next.js Frontend

1. Clone the frontend repository (if separate):
   ```bash
   git clone https://github.com/yourusername/zoku-next-frontend-app.git
   cd zoku-next-frontend-app
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file for environment variables (see `.env.example` if provided).

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

**Note:**  
- Make sure your backend server is running and the frontend `.env.local` is configured to point to the correct API URL.
- For production, use `npm run build` and `npm start`.

## Deployment

[Instructions to be added]


## Origin Story

Every project has a story. Here's some of the Zoku app's story. 

As someone who loves to do lists and time management in both her personal and professional life, I wanted to create an application that reflects my personal aesthetics and my personal approach to time tracking. The MVP does not fully capture all the nuances, but it's a start. As a programmer, an artist, a writer, someone who has had a previous career as a translator, editor and university language instructor, I have learned to be intentional about my time. 

I also wanted to build a project that I can have as a side project for awhile and that I can add features to over time. For example, I've built the backend with Express and know I can build I have ideas for customization. 

As part of Women Coding Community's 2025 Summer/Fall mentee cohort, I decided to use my time (3 hours a month) with my mentor developing a side project that was not yet another tutorial project. 


The backend deployment is [here].  

For the purposes of this project, I'm running the frontend locally. 

For a demo, you can use the `Demo Login` button and these user credentials: 

`demo.user@example.com
Password123!`


## License

This project is licensed under the MIT License - see the LICENSE file for details.