# Real Estate Hub

Real Estate Hub is a full-stack real estate platform built with Next.js and Tailwind CSS. It offers a comprehensive set of features for users to buy, sell, and manage properties, leveraging various services for authentication, image storage, geolocation, and more. Below is a detailed description of the project, outlining its core features and functionality.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

### Authentication
- **Next Auth Google**: Users can sign in using their Google accounts, ensuring secure and easy authentication.

### Property Management
- **Add Property**: Authenticated users can add new properties through a comprehensive form.
- **View Property**: Detailed property pages display all relevant information including images, descriptions, location, and amenities.
- **Edit and Delete Property**: Users can edit or delete properties they have posted.
- **Bookmark Properties**: Users can bookmark properties to view later.

### Image Management
- **Cloudinary**: Used to store property images securely.
- **Photoswap Gallery**: Users can view property images in gallery mode for a better experience.

### Messaging and Notifications
- **Messaging**: Users can send messages to property owners directly from the property details page.
- **Notifications**: Property owners receive notifications for new messages and can mark them as read or new.

### User Profiles
- **My Profile**: Users can view all properties they have posted on their profile page.
- **Saved Properties**: A dedicated page for users to view all bookmarked properties.

### Property Search and Display
- **Search Functionality**: Users can search for properties on the home page.
- **Featured and Recent Properties**: The home page showcases featured and recently added properties.

### Geolocation
- **React Geo Code and Mapbox**: Display property locations on a map for easy reference.

### User Interface
- **React Icons**: Used for various icons across the site.
- **React Spinner**: Shows loading spinners during data fetches and form submissions.

## Technologies Used

- **Next.js**: React framework for server-side rendering and generating static websites.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
- **MongoDB**: NoSQL database for storing property data.
- **Next Auth**: Authentication library for Next.js applications.
- **Cloudinary**: Image and video management service.
- **React Share**: Component for sharing pages on social media.
- **React Icons**: Icons library for React.
- **Photoswap Gallery**: React component for viewing images in gallery mode.
- **React Geo Code**: Geocoding library for converting addresses to coordinates.
- **Mapbox**: Maps and location services.
- **React Spinner**: Loading spinner components for React.

## Setup and Installation

### Prerequisites
- Node.js (v14.x or later)
- MongoDB
- Cloudinary account
- Mapbox account
- Google Cloud Platform account for authentication

### Installation
1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/real-estate-hub.git
   cd real-estate-hub
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Setup environment variables:**
   Create a `.env.local` file in the root directory and add the following variables:
   ```env
NEXT_PUBLIC_DOMAIN=http://localhost:3000
NEXT_PUBLIC_API_DOMAIN=http://localhost:3000/api
MONGODB_URL=paste-your-mongodb-url
GOOGLE_CLIENT_ID=put google client Id here
GOOGLE_CLIENT_SECRET=put Google client secret here
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_URL_INTERNAL=http://localhost:3000
NEXTAUTH_SECRET= generate secret key using openssl and paste here
CLOUDINARY_CLOUD_NAME=your cloudinary cloud name here
CLOUDINARY_API_KEY=api key here
CLOUDINARY_API_SECRET=api secret here
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `pages/`: Contains all the Next.js pages.
- `components/`: Reusable React components.
- `styles/`: Tailwind CSS and other style files.
- `lib/`: Utility functions and custom hooks.
- `models/`: Mongoose models for MongoDB.
- `public/`: Static assets.
- `middleware/`: Middleware for authentication and other purposes.

## Usage

### Adding a Property
- Navigate to the add property page after signing in.
- Fill out the form with property details and submit.

### Viewing Property Details
- Click on any property to view its detailed page.

### Messaging Property Owners
- Use the form on the property details page to send a message to the owner.

### Managing Properties
- Go to your profile to edit or delete properties you've posted.
- Bookmark properties for later viewing and manage them from the saved properties page.

### Notifications
- View and manage notifications for messages on your properties.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Open a pull request.

Please ensure your changes adhere to the project's coding standards and include appropriate tests.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Real Estate Hub aims to provide a seamless and feature-rich experience for both property owners and potential buyers or renters. Thank you for checking out the project, and we welcome any feedback or contributions to make it even better!
