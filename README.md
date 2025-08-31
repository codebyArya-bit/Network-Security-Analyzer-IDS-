# 🛡️ SecureNet Analyzer

**AI-Powered Network Security Monitoring & Threat Intelligence Platform**

A modern, real-time network security monitoring tool built with React, TypeScript, and cutting-edge web technologies. SecureNet Analyzer provides comprehensive threat detection, network analysis, and security insights through an intuitive dashboard interface.

![SecureNet Analyzer Dashboard](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![React](https://img.shields.io/badge/React-18.3.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue)
![Vite](https://img.shields.io/badge/Vite-5.4.19-purple)

## 🚀 Features

### 🔍 **Real-Time Threat Detection**
- Live security event monitoring
- AI-powered threat analysis and insights
- Behavioral anomaly detection
- Geographic threat mapping

### 📊 **Advanced Analytics Dashboard**
- Interactive data visualizations with Recharts
- Network performance metrics
- Protocol distribution analysis
- Vulnerability heatmaps
- Traffic overview graphs

### 🌐 **Threat Intelligence**
- Integration with AbuseIPDB API
- Global threat source tracking
- IP reputation analysis
- Malicious activity detection

### 🎯 **Security Monitoring**
- Real-time packet analysis
- Attack timeline visualization
- System health monitoring
- Security metrics tracking

### 🔐 **User Management**
- Secure authentication system
- Role-based access control
- Admin dashboard
- User session management

## 🛠️ Tech Stack

### **Frontend**
- **React 18.3.1** - Modern UI library
- **TypeScript 5.8.3** - Type-safe development
- **Vite 5.4.19** - Lightning-fast build tool
- **Tailwind CSS 3.4.17** - Utility-first styling
- **shadcn/ui** - Beautiful component library

### **Data Visualization**
- **Recharts** - Interactive charts and graphs
- **React Leaflet** - Interactive maps
- **Lucide React** - Modern icon library

### **State Management & Forms**
- **@tanstack/react-query** - Server state management
- **React Hook Form** - Performant forms
- **Zod** - Schema validation

### **Real-Time Features**
- **WebSocket** - Live data streaming
- **Sonner** - Toast notifications

### **Development Tools**
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **SWC** - Fast compilation

## 📦 Installation

### Prerequisites
- Node.js 18+ or Bun
- npm, yarn, or bun package manager

### Quick Start

```bash
# Clone the repository
git clone https://github.com/codebyArya-bit/Network-Security-Analyzer-IDS-.git
cd Network-Security-Analyzer-IDS-

# Install dependencies
npm install
# or
bun install

# Set up environment variables
cp .env.example .env

# Start development server
npm run dev
# or
bun dev
```

The application will be available at `http://localhost:8082`

## 🌐 Live Demo

**🚀 Production Application:**
- **Frontend:** [https://network-security-analyzer-m35mleueh-aryas-projects-6676c3c7.vercel.app](https://network-security-analyzer-m35mleueh-aryas-projects-6676c3c7.vercel.app)
- **Backend API:** [https://network-security-analyzer-backend.onrender.com](https://network-security-analyzer-backend.onrender.com)

*Experience the full-featured network security monitoring platform in action!*

## 🔧 Environment Setup

Create a `.env` file in the root directory:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:8000
VITE_WEBSOCKET_URL=ws://localhost:8000/ws

# External APIs
VITE_ABUSEIPDB_API_KEY=your_abuseipdb_key
VITE_GEOLOCATION_API_KEY=your_geolocation_key

# Authentication
VITE_JWT_SECRET=your_jwt_secret

# Development
VITE_NODE_ENV=development
```

## 🎮 Demo Credentials

**Admin Access:**
- Username: `admin`
- Password: `admin`

## 📱 Application Structure

```
src/
├── components/          # Reusable UI components
│   ├── dashboard/      # Dashboard-specific components
│   ├── layout/         # Layout components
│   ├── theme/          # Theme provider
│   └── ui/             # shadcn/ui components
├── pages/              # Application pages
│   ├── Home.tsx        # Landing page
│   ├── Dashboard.tsx   # Main dashboard
│   ├── Login.tsx       # Authentication
│   └── ...
├── services/           # API and external services
│   ├── websocketService.ts
│   ├── threatIntelligence.ts
│   └── notificationService.ts
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
└── App.tsx             # Main application component
```

## 🔗 API Integration

The application is designed to integrate with:

- **Backend API** - RESTful endpoints for data management
- **WebSocket Server** - Real-time event streaming
- **AbuseIPDB** - Threat intelligence data
- **Geolocation Services** - IP location mapping

## 🚀 Deployment

### Current Architecture
- **Frontend:** Deployed on Vercel (Static Site)
- **Backend:** Deployed on Render (FastAPI)
- **Database:** PostgreSQL on Render
- **Cache:** Redis on Render

### Frontend Deployment (Vercel)
```bash
# Build for production
npm run build

# Deploy to Vercel
vercel --prod
```

### Backend Integration
This frontend connects to a FastAPI backend hosted on Render:
- **API Endpoint:** `https://network-security-analyzer-backend.onrender.com`
- **WebSocket:** `wss://network-security-analyzer-backend.onrender.com/ws`
- **Health Check:** `https://network-security-analyzer-backend.onrender.com/health`

For detailed deployment guides, see:
- [`VERCEL_DEPLOYMENT_GUIDE.md`](./VERCEL_DEPLOYMENT_GUIDE.md) - Frontend deployment
- [`deploy-vercel.md`](./deploy-vercel.md) - Step-by-step Vercel setup

## 🧪 Available Scripts

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
npm run type-check   # TypeScript checking
```

## 🔒 Security Features

- **Input Validation** - Zod schema validation
- **XSS Protection** - Sanitized inputs
- **CSRF Protection** - Token-based authentication
- **Secure Headers** - Security-first configuration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **shadcn/ui** - Beautiful component library
- **Recharts** - Powerful charting library
- **Tailwind CSS** - Utility-first CSS framework
- **React Team** - Amazing framework

## 📞 Support

For support, email [your-email@example.com] or create an issue in this repository.

---

**Built with ❤️ by [Your Name]**

*SecureNet Analyzer - Securing networks, one threat at a time.*
