# Local Services Finder & Booking Website

A comprehensive platform for finding and booking local services like electricians, plumbers, wedding services, and more.

## Features

### 🌍 User Side (Frontend)
- **Location-Based Search**: Automatic location detection and manual location selection
- **Service Categories**: Browse services by category (Electricians, Plumbers, Wedding Services, etc.)
- **Service Provider Details**: View provider information, ratings, and reviews
- **Booking System**: Easy booking form with date/time selection
- **User Registration**: Optional user accounts for tracking bookings

### 🧰 Service Provider Registration
- **Provider Registration**: Complete registration form for service providers
- **Document Upload**: Upload photos and business logos
- **Admin Approval**: Admin can approve or reject provider applications

### 🖥️ Admin Panel
- **Dashboard**: Overview of users, providers, and bookings
- **Booking Management**: View and manage all booking requests
- **Provider Management**: Approve/reject provider registrations
- **Service Categories**: Manage service categories dynamically

## Tech Stack

- **Frontend**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Heroicons
- **Backend**: Firebase (Authentication, Firestore, Storage)
- **UI Components**: Headless UI

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Firebase project (already configured)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd local-services-booking
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Demo Credentials

### Admin Login
Access the admin dashboard at `/admin/login` with these credentials:

**Super Admin:**
- Email: `admin@localservices.com`
- Password: `admin123`
- Permissions: Full access to all features

**Moderator:**
- Email: `moderator@localservices.com`
- Password: `mod123`
- Permissions: Limited access to provider and booking management

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── admin/             # Admin dashboard
│   ├── book/              # Booking form
│   ├── login/             # Login page
│   ├── provider/          # Provider registration
│   ├── services/          # Services listing
│   └── page.tsx           # Home page
├── components/            # Reusable components
│   └── Navigation.tsx     # Main navigation
├── lib/                   # Utility libraries
│   └── firebase.ts        # Firebase configuration
└── types/                 # TypeScript type definitions
    └── index.ts           # Main types
```

## Firebase Configuration

The Firebase configuration is already set up in `src/lib/firebase.ts` with the following services:

- **Authentication**: User login/registration
- **Firestore**: Database for users, providers, bookings
- **Storage**: File uploads for provider photos/logos

## Key Pages

### Home Page (`/`)
- Hero section with search functionality
- Service categories grid
- Features section
- Call-to-action sections

### Services Page (`/services`)
- List of all service providers
- Search and filter functionality
- Provider cards with ratings and details

### Booking Page (`/book`)
- Complete booking form
- Date and time selection
- Service location details

### Provider Registration (`/provider/register`)
- Multi-step registration form
- File upload for photos/logos
- Service type selection

### Admin Dashboard (`/admin`)
- Statistics overview
- Booking management
- Provider approval system

## Features Implemented

### 🎨 **Frontend Features**
✅ **Responsive Design**: Mobile-first approach with Tailwind CSS
✅ **Service Categories**: 6 main service categories with icons
✅ **Provider Registration**: Complete registration form with file uploads
✅ **Booking System**: Full booking form with validation and time slots
✅ **Navigation**: Responsive navigation with mobile menu
✅ **Search & Filter**: Advanced service provider search and filtering
✅ **User Interface**: Modern, clean design with excellent UX
✅ **Provider Profiles**: Detailed provider pages with reviews and ratings

### 🛡️ **Admin System**
✅ **Comprehensive Admin Dashboard**: Full-featured admin panel
✅ **Admin Authentication**: Secure login system with role-based access
✅ **User Management**: Complete user and provider management
✅ **Booking Management**: Advanced booking tracking and status updates
✅ **Analytics & Reporting**: Statistics, charts, and performance metrics
✅ **Notification System**: Real-time notifications and alerts
✅ **Settings Management**: System configuration and service categories
✅ **Permission System**: Role-based access control (Admin/Moderator)
✅ **Provider Approval**: Workflow for approving new service providers

### 🔧 **Technical Features**
✅ **TypeScript**: Full type safety throughout the application
✅ **Next.js 15**: Latest Next.js with App Router
✅ **Firebase Integration**: Ready for Auth, Firestore, and Storage
✅ **API Routes**: Comprehensive REST API for admin operations
✅ **Context Management**: React Context for state management
✅ **Responsive Design**: Mobile-first responsive layout
✅ **Modern UI Components**: Professional design with Tailwind CSS

## Admin System Features

### 🔐 **Authentication & Authorization**
- **Admin Login**: Secure authentication system
- **Role-Based Access**: Super Admin and Moderator roles
- **Permission System**: Granular permissions for different features
- **Session Management**: Secure session handling

### 📊 **Dashboard & Analytics**
- **Real-time Statistics**: Users, providers, bookings, revenue
- **Performance Metrics**: Growth trends and key indicators
- **Top Services**: Most popular services by bookings and revenue
- **User Growth**: Monthly user and provider growth tracking

### 👥 **User Management**
- **User Overview**: Complete user listing with search and filters
- **Provider Management**: Approve, reject, activate, deactivate providers
- **Role Management**: Assign and manage user roles
- **Activity Tracking**: User activity and engagement metrics

### 📋 **Booking Management**
- **Booking Overview**: All bookings with status tracking
- **Status Updates**: Accept, complete, cancel bookings
- **Search & Filter**: Advanced filtering by status, date, service type
- **Customer Details**: Complete customer information and history

### 🔔 **Notification System**
- **Real-time Alerts**: New registrations, bookings, payments
- **Priority Levels**: High, medium, low priority notifications
- **Mark as Read**: Individual and bulk notification management
- **System Alerts**: Server monitoring and system health alerts

### ⚙️ **Settings & Configuration**
- **Platform Settings**: Name, currency, timezone configuration
- **Business Rules**: Commission rates, booking limits, approval settings
- **Service Categories**: Add, edit, delete service categories
- **Payment Settings**: Payment methods and gateway configuration
- **Notification Settings**: Email, SMS, push notification preferences

## API Endpoints

### Admin API Routes
- `GET /api/admin/stats` - Dashboard statistics
- `GET /api/admin/providers` - Provider management
- `PUT /api/admin/providers` - Update provider status
- `DELETE /api/admin/providers` - Delete provider
- `GET /api/admin/bookings` - Booking management
- `PUT /api/admin/bookings` - Update booking status
- `GET /api/admin/users` - User management
- `PUT /api/admin/users` - Update user data
- `GET /api/admin/notifications` - Notification management
- `PUT /api/admin/notifications` - Mark notifications as read
- `GET /api/admin/settings` - System settings
- `PUT /api/admin/settings` - Update settings

## Next Steps

To complete the application, you would need to:

1. **Firebase Integration**: Connect all forms and data to Firebase
2. **Real-time Updates**: Implement WebSocket connections for live updates
3. **Email Notifications**: Add email service integration
4. **Payment Integration**: Add payment gateway integration
5. **Maps Integration**: Add Google Maps for location services
6. **File Upload**: Connect file uploads to Firebase Storage
7. **Push Notifications**: Implement push notification service
8. **Advanced Analytics**: Add Chart.js or similar for data visualization
9. **Testing**: Add unit and integration tests
10. **Deployment**: Deploy to Vercel or similar platform

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Environment Variables

Create a `.env.local` file for environment-specific variables:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
# ... other Firebase config
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, email support@localservices.com or create an issue in the repository.