# Zoku Calendar App

Zoku is a full-stack time tracking and calendar management application built with Next.js, Express, and PostgreSQL. It's MVP version is deployed on Railway (backend) and Netlify (frontend). 

## Features

- Calendar management with event scheduling
- Time tracking with customizable categories
- Todo list organization
- Goal setting and progress tracking
- Responsive design for all devices

## Future Features


## Tech Stack

### Frontend
- Next.js 13+
- React
- TailwindCSS
- TypeScript

### Backend
- Express.js
- PostgreSQL
- Sequelize ORM
- JWT Authentication

## Database Schema

```mermaid
erDiagram
    Users ||--o{ Events : creates
    Users ||--o{ TodoLists : owns
    Users ||--o{ Categories : customizes
    TodoLists ||--o{ Todos : contains
    Categories ||--o{ TimeLogs : tracks
    Events ||--o{ TimeLogs : tracks
    Todos ||--o{ TimeLogs : tracks
```

## Database Diagram

![zoku app database diagram](./docs/db-diagrams.png)

## Initial wireframes
![zoku app wireframes v1](./docs/Wireframes-V2-1.png)
![zoku app wireframes v2](./docs/Wireframes-V2-2.png)

## Deployed application
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



## Wireframes

### Desktop Views
- [ ] Calendar View
- [ ] Time Tracking Dashboard
- [ ] Category Management
- [ ] Todo Lists

### Mobile Views
- [ ] Mobile Calendar
- [ ] Time Entry
- [ ] Task Management

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

## Testing

```bash
# Run unit tests
npm test

# Run integration tests
npm run test:integration
```

## Deployment

[Add deployment instructions]


## Origin Story

Every project has a story. Here's some of the Zoku app's story. 

As someone who loves to do lists and time management in both her personal and professional life, I wanted to create an application that initially reflects my personal aesthetics and my personal approach to time tracking. As a programmer, an artist, a writer, someone who has had a previous career as a translator, editor and university language instructor, I have learned to be intentional about my time. 

I also wanted to build a project that I can have as a side project for awhile and that I can add features to over time. For example, I've built the backend with Express and know I can build I have ideas for customization. 

As part of Women Coding Community's 2025 Summer/Fall mentee cohort, I decided to use my time (3 hours a month) with my mentor developing a side project that was not yet another tutorial project. 


The backend deployment is [here].  

The frontend deployment can be found here. 

For a demo, you can use the `Demo Login` button and these user credentials: 


## License

This project is licensed under the MIT License - see the LICENSE file for details.