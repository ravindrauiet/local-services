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

✅ **Responsive Design**: Mobile-first approach with Tailwind CSS
✅ **Service Categories**: 6 main service categories with icons
✅ **Provider Registration**: Complete registration form
✅ **Booking System**: Full booking form with validation
✅ **Admin Panel**: Dashboard with booking and provider management
✅ **Navigation**: Responsive navigation with mobile menu
✅ **Search & Filter**: Service provider search and filtering
✅ **User Interface**: Modern, clean design with proper UX

## Next Steps

To complete the application, you would need to:

1. **Firebase Integration**: Connect forms to Firebase Firestore
2. **Authentication**: Implement user authentication
3. **File Uploads**: Connect file uploads to Firebase Storage
4. **Email Notifications**: Add email notifications for bookings
5. **Payment Integration**: Add payment processing
6. **Real-time Updates**: Add real-time booking updates
7. **Maps Integration**: Add Google Maps for location services

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