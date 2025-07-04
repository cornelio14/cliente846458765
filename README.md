# VideosPlus - Video Content Sales Platform

A modern web application for selling and streaming video content, built with React, TypeScript, and Appwrite.

## Features

- **User Authentication**: Secure login system with session management
- **Video Catalog**: Browse available videos with thumbnails and descriptions
- **Purchase System**: Buy videos securely
  - **PayPal**: Integrated PayPal payments
  - **Stripe**: Credit card payments via Stripe
  - **Crypto**: Cryptocurrency payment option
- **Video Player**: Stream purchased videos
- **Admin Area**: Protected admin dashboard
- **Responsive Design**: Works on desktop and mobile devices
- **Theme Support**: Toggle between light and dark themes

### VideoPlayer Component

The VideoPlayer component is the main page for viewing video content. It includes:

- Video player with thumbnail preview for unpurchased videos
- Title, price, views, and duration information
- Full video description
- Purchase options:
  - Direct purchase through the platform
  - PayPal integration (when PayPal Client ID is configured)
  - Telegram contact button (when Telegram username is configured)
- Up to 8 suggested videos displayed below the main content

## Tech Stack

- **Frontend**: React, TypeScript, Material-UI
- **Backend**: Appwrite (BaaS)
- **Authentication**: Custom authentication with session tokens
- **State Management**: React Context API
- **Routing**: React Router
- **Styling**: Material-UI components and theming
- **Payments**: PayPal and Stripe integration

## Project Structure

```
src/
├── assets/         # Static assets like images
├── components/     # Reusable UI components
├── context/        # React context providers
├── pages/          # Page components
├── scripts/        # Utility scripts for setup
├── services/       # API and service functions
└── main.tsx        # Application entry point
```

## Getting Started

### Prerequisites

- Node.js (v14+)
- npm or yarn
- Appwrite instance

### Setup

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/videosplus.git
   cd videosplus
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up Appwrite:
   - Create an Appwrite project
   - Set up the required collections (Users, Videos, Sessions, Purchases)
   - Create storage buckets for videos and thumbnails
   - Update the Appwrite configuration in `src/services/node_appwrite.ts`

4. Run the development server:
   ```
   npm run dev
   ```

### Appwrite Collections Setup

Run the setup scripts in the Appwrite console or via the SDK:

- `src/scripts/create-sessions-collection.js`: Creates the user_sessions collection
- `src/scripts/create-purchases-collection.js`: Creates the purchases collection
- `src/scripts/create-sample-videos.js`: Adds sample videos to the database

## Site Configuration in Appwrite

The site configuration is managed through the Appwrite database in the "site_config" collection:

- `site_name`: The name of the site
- `paypal_client_id`: PayPal Client ID for payment integration
- `stripe_publishable_key`: Stripe Publishable Key for payment integration
- `telegram_username`: Telegram username for contact button
- `video_list_title`: Custom title for the video list page
- `crypto`: List of cryptocurrency wallets for payments

All these settings can be managed through the admin panel.

## Payment Configuration

### PayPal Setup
1. Create a developer account at [PayPal Developer](https://developer.paypal.com/)
2. Get your Client ID from the PayPal dashboard
3. Add the Client ID in the site configuration through the admin panel
4. For confirmation emails, configure email settings in your `.env` file:
   ```
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_SECURE=false
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   EMAIL_FROM=your-name@your-domain.com
   ```
   Note: If using Gmail, you'll need to create an App Password

### Stripe Setup
1. Create an account at [Stripe](https://stripe.com/)
2. Get your Publishable Key from the Stripe dashboard
3. Add the Publishable Key in the site configuration through the admin panel
4. Configure the Secret Key as an environment variable for the serverless functions

### Payment Security
For both payment methods (PayPal and Stripe), real product names are not displayed at checkout. Instead, random generic names are used, such as "Personal Development Ebook", "Financial Freedom Guide", etc. This enhances privacy during the checkout process.

## Deployment

Build the production version:

```"# Videos-plus-" 
#   V i d e o - T e m p l a t e 
 
 #   V i d e o - T e m p l a t e 
 
 #   V i d e o - T e m p l a t e 
 
 "# site" 
