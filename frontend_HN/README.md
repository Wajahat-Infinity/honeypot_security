# Cybersecurity Dashboard Frontend

A modern, responsive frontend for the Cybersecurity Dashboard application built with Next.js, providing real-time threat monitoring and security analytics visualization.

## Features

- Real-time threat monitoring
- Interactive threat map
- Security analytics dashboard
- User authentication and authorization
- Responsive design
- Dark/Light mode
- Real-time alerts and notifications
- Interactive charts and graphs

## Tech Stack

- Next.js 14
- TypeScript
- React 18
- Tailwind CSS
- Shadcn UI
- React Query
- JWT Authentication
- Chart.js
- React Map GL

## Prerequisites

- Node.js 18.0 or higher
- npm or yarn
- Backend API server (see backend README)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd frontend_HN
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
Create a `.env.local` file in the project root with the following variables:
```
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_WS_URL=ws://localhost:8000/ws
```

## Running the Development Server

1. Start the development server:
```bash
npm run dev
# or
yarn dev
```

2. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
frontend_HN/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── cockpit/           # Cockpit section
│   ├── dashboard/         # Dashboard section
│   └── layout.tsx         # Root layout
├── components/            # Reusable components
│   ├── ui/               # UI components
│   ├── dashboard/        # Dashboard components
│   └── cockpit/          # Cockpit components
├── lib/                  # Utility functions
├── services/             # API services
├── styles/              # Global styles
└── types/               # TypeScript types
```

## Available Pages

### Authentication
- `/auth/login` - User login
- `/auth/register` - User registration
- `/auth/forgot-password` - Password recovery

### Dashboard
- `/dashboard` - Main dashboard
- `/dashboard/threats` - Threat monitoring
- `/dashboard/vulnerabilities` - Vulnerability management
- `/dashboard/alerts` - Alert system

### Cockpit
- `/cockpit` - Control center
- `/cockpit/honeypots` - Honeypot management
- `/cockpit/analytics` - Security analytics
- `/cockpit/reports` - Report generation

## API Integration

The frontend communicates with the backend through the following services:

- `services/api.ts` - REST API calls
- `services/websocket.ts` - WebSocket connections
- `services/auth.ts` - Authentication handling

## Styling

The project uses:
- Tailwind CSS for utility-first styling
- Shadcn UI for component library
- Custom CSS modules for specific components

## Building for Production

1. Build the application:
```bash
npm run build
# or
yarn build
```

2. Start the production server:
```bash
npm start
# or
yarn start
```

## Testing

Run tests using:
```bash
npm test
# or
yarn test
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@example.com or create an issue in the repository. 