# The Chrono-Botanist: Web Hub 🌿⏱️
  
  A React-based web application and companion hub for The Chrono-Botanist, a cozy temporal-puzzle game. This frontend application serves as the player's external interface for managing their Temporal Greenhouse, viewing their botanical compendium, and handling secure account authentication.
# 🌟 Key Features
 * The Garden Dashboard: A dedicated interface (/garden) for viewing cultivated alien flora, tracking seed crossbreeding progress, and managing temporal puzzle strategies.
 * Comprehensive Authentication: A complete, secure user flow supporting sign-ups, password resets, email verification, and third-party provider OAuth.
 * Role-Based Access Control (RBAC): Protected routes governed by ProfileGuard.jsx and distinct UI layouts (OwnerLayout.jsx vs. PublicLayout.jsx) based on user permissions.
 * Minimalist, Adaptive UI: Built with a highly accessible design system using shadcn/ui and Tailwind CSS, including seamless Light/Dark theme toggling to match the sterile station vs. organic flora aesthetic.
 * Global State Management: Centralized handling of user profiles and application state via Redux Toolkit.
# 🛠️ Tech Stack
 * Core: React, Vite
 * Styling & UI: Tailwind CSS, shadcn/ui, Radix UI (Primitives)
 * State Management: Redux (userSlice.js)
 * Routing: React Router (Client-side routing with nested layouts)
 * Services: Modular API/SDK integration (sdk.js, permissions.js)

# 🚀 Getting Started
Prerequisites
Ensure you have Node.js (v18 or higher) and npm or yarn installed on your local machine.
Installation
 * Clone the repository:
  ` git clone https://github.com/your-org/chrono-botanist-cast.git
cd chrono-botanist-cast`

 * Install dependencies:
   ` npm install`

 * Configure Environment Variables:
   Duplicate the .env.example file (if provided) or edit the existing .env file in the root directory to include your backend SDK keys and API endpoints:
  `` VITE_APP_API_ENDPOINT=your_backend_url_here``
  ``VITE_APP_PROJECT_ID=your_project_id_here``

 * Start the Development Server:
   `npm run dev`

   The application will be available at http://localhost:5173.
🛠️ Building for Production
To create an optimized production build, run:
npm run build

This will output the minified static files into the dist/ directory, ready to be deployed to Vercel, Netlify, or your preferred hosting provider.
# 🤝 Contributing
When contributing to this project, please ensure any new UI elements utilize the existing shadcn/ui architecture in src/components/ui/ to maintain aesthetic consistency. For new state requirements, add the relevant logic to src/store/ rather than relying heavily on prop-drilling.

