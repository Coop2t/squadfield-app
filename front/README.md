# SQUADFIELD - Sports Card Creator

SQUADFIELD is a modern web application that allows users to create professional sports trading cards using AI-powered stats generation and beautiful design templates.

## Features

- **Photo Upload & Processing**: Upload sports photos and create stunning trading cards
- **AI-Powered Stats**: Generate realistic player statistics using advanced algorithms
- **Multiple Sports**: Support for Football, Basketball, and Soccer
- **Card Rarity System**: Cards are generated with different rarity levels (Common, Uncommon, Rare, Epic, Legendary)
- **User Authentication**: Secure user accounts with Firebase Auth
- **Cloud Storage**: Images and cards stored securely in Firebase Storage
- **Community Gallery**: Browse and discover cards created by other users
- **Responsive Design**: Works perfectly on desktop and mobile devices

## Technology Stack

- **Frontend**: Next.js 14 with React 18
- **Styling**: Tailwind CSS with custom design system
- **Authentication**: Firebase Auth
- **Database**: Firestore (NoSQL)
- **Storage**: Firebase Storage
- **Canvas API**: For card image generation
- **Deployment**: Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Firebase account

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd squadfield
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up Firebase:
   - Create a new Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
   - Enable Authentication (Email/Password)
   - Create a Firestore database
   - Set up Firebase Storage
   - Get your Firebase config

4. Create environment file:
   ```bash
   cp .env.local.example .env.local
   ```

5. Add your Firebase configuration to `.env.local`:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

6. Run the development server:
   ```bash
   npm run dev
   ```

7. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
squadfield/
├── public/
│   └── cards/
│       └── template.txt
├── src/
│   ├── components/
│   │   └── CardPreview.jsx
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── hooks/
│   │   └── useAuth.js
│   ├── lib/
│   │   └── generateCardImage.js
│   ├── pages/
│   │   ├── _app.js
│   │   ├── index.jsx
│   │   ├── login.jsx
│   │   ├── dashboard.jsx
│   │   ├── upload.jsx
│   │   └── galerie.jsx
│   ├── styles/
│   │   └── globals.css
│   └── utils/
│       ├── firebase.js
│       ├── generateCard.js
│       └── simulateAI.js
├── package.json
├── tailwind.config.js
├── next.config.js
└── README.md
```

## Key Components

### Card Generation System
- **generateCard.js**: Core logic for generating card data with stats and rarity
- **generateCardImage.js**: Canvas-based card image generation
- **simulateAI.js**: AI simulation for player descriptions and analysis

### Authentication System
- **AuthContext.jsx**: React context for authentication state
- **useAuth.js**: Custom hook with enhanced user profile management

### Firebase Integration
- **firebase.js**: Firebase configuration and initialization
- User authentication with email/password
- Firestore for card storage and user profiles
- Firebase Storage for image uploads

## Card Generation Process

1. **Photo Upload**: User uploads a sports photo
2. **Details Entry**: User provides player name, sport, and optional position
3. **AI Processing**: System generates stats, rarity, and position (if not provided)
4. **Card Creation**: Canvas API creates the visual card with all elements
5. **Storage**: Original photo and generated card are saved to Firebase
6. **Database**: Card metadata is stored in Firestore

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Google Cloud Platform
- Self-hosted with Docker

## Firebase Security Rules

### Firestore Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own profile
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Anyone can read public cards
    match /cards/{cardId} {
      allow read: if resource.data.isPublic == true;
      allow write: if request.auth != null && request.auth.uid == resource.data.userId;
    }
  }
}
```

### Storage Rules
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /cards/{userId}/{allPaths=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /generated-cards/{userId}/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Make your changes
4. Commit your changes: `git commit -am 'Add new feature'`
5. Push to the branch: `git push origin feature/new-feature`
6. Submit a pull request

## Future Enhancements

- [ ] Card trading system
- [ ] Advanced analytics dashboard
- [ ] Team creation and management
- [ ] Print-ready card exports
- [ ] Social sharing features
- [ ] Card collection management
- [ ] Tournament system
- [ ] NFT integration
- [ ] Mobile app development

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@squadfield.com or create an issue in the GitHub repository.

## Acknowledgments

- Firebase for backend services
- Tailwind CSS for styling
- Next.js for the React framework
- Canvas API for card generation
- The amazing sports card community for inspiration
