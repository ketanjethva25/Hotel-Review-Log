# 🏨 Hotel Review Log

A modern web-based application for travelers to document, manage, and organize their hotel stays with comprehensive tracking of ratings, pricing, and travel experiences.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-19.2.4-blue.svg)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8.0+-green.svg)](https://vitejs.dev)

## Live Demo : https://hotelreviewlog.netlify.app/ 

## ✨ Features

### Core Functionality
- **Review Management** - Create, edit, view, and delete hotel reviews
- **Hotel Information Tracking** - Capture hotel details including name, location, ratings, room types, and pricing
- **Trip Classification** - Categorize trips (Business, Friend, Honeymoon, Family, Solo, Adventure, or custom)
- **Advanced Filtering** - Search and filter by hotel name, location, rating, trip type, and room type
- **Smart Sorting** - Sort by date, rating, or hotel name in ascending or descending order
- **Statistics Dashboard** - View comprehensive statistics about your travel history
- **Data Persistence** - All data is saved to browser local storage - no backend needed
- **Theme Support** - Toggle between light and dark themes
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices

## 🛠️ Tech Stack

- **Frontend Framework**: React 19.2.4
- **Build Tool**: Vite 8.0+
- **Styling**: CSS3 with CSS Variables for theming
- **Data Storage**: Browser Local Storage
- **Linting**: ESLint
- **Language**: JavaScript

## 📋 Project Structure

```
hotel-review-log/
├── src/
│   ├── components/
│   │   ├── DeleteConfirmModal.jsx      # Confirmation dialog for deletion
│   │   ├── EmptyState.jsx              # Empty state UI
│   │   ├── FilterBar.jsx               # Search and filter controls
│   │   ├── Footer.jsx                  # Footer component
│   │   ├── HeroSection.jsx             # Hero banner
│   │   ├── Navbar.jsx                  # Navigation bar
│   │   ├── ReviewCard.jsx              # Review card display
│   │   ├── ReviewFormModal.jsx         # Form for adding/editing reviews
│   │   ├── ToastNotification.jsx       # Toast notifications
│   │   └── ViewReviewModal.jsx         # Review detail view
│   ├── App.jsx                         # Main application component
│   ├── data.js                         # Data management logic
│   ├── main.jsx                        # Application entry point
│   ├── App.css                         # Application styles
│   └── index.css                       # Global styles
├── public/                             # Static assets
├── package.json                        # Project dependencies
├── vite.config.js                      # Vite configuration
├── eslint.config.js                    # ESLint configuration
└── README.md                           # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ketanjethva25/hotel-review-log.git
   cd hotel-review-log
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   - Navigate to `http://localhost:5173` (or the URL shown in terminal)

## 📖 Usage

### Adding a Review
1. Click the **"Add Hotel Review"** button
2. Fill in the hotel details:
   - Hotel name and location
   - Star rating (1-5)
   - Room type
   - Trip type
   - Check-in and check-out dates
   - Price per night
   - Personal notes (optional)
3. Click **"Add Review"** to save

### Searching & Filtering
- Use the search bar to find hotels by name, location, notes, or room type
- Filter by rating using the star rating dropdown
- Filter by trip type using the trip type selector
- Filters are applied in real-time

### Sorting Reviews
- Choose sort order: Newest, Oldest, Rating (High to Low), Rating (Low to High), or Hotel Name (A-Z/Z-A)

### Theme Switching
- Click the theme toggle icon in the navbar to switch between light and dark modes
- Your preference is saved automatically

### Managing Reviews
- Click on a review card to view full details
- Click **"Edit"** to modify a review
- Click **"Delete"** to remove a review (confirmation required)

## 🧠 Data Management

The application uses browser **Local Storage** for data persistence:
- All reviews are automatically saved to local storage
- Data persists across browser sessions
- Data is stored locally on your device (no server required)
- Clear browser storage to reset the application

## 📦 Available Scripts

```bash
# Start development server with hot module replacement
npm run dev

# Build for production
npm run build

# Run ESLint to check code quality
npm run lint

# Preview production build locally
npm run preview
```

## 🎨 Customization

### Theming
The application uses CSS variables for easy customization. Modify the theme colors in `src/App.css` by updating the `--color-*` variables.

### Room Types
Edit the room type options in `src/data.js` to match your preferences.

### Trip Types
Add or remove trip type categories in the data configuration.

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🐛 Troubleshooting

**Q: My reviews are not saving**
- A: Check if local storage is enabled in your browser settings
- A: Try clearing browser cache and reloading the application

**Q: The app looks broken in dark mode**
- A: Click the theme toggle to switch themes
- A: Clear browser cache and hard refresh (Ctrl+Shift+R or Cmd+Shift+R)

**Q: I accidentally deleted a review**
- A: Unfortunately, local storage doesn't support undo. Use your browser's local storage backup if available.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 About

Built as part of the M.Sc. IT Web Development using MERN coursework. This application demonstrates frontend development best practices including component architecture, state management, data persistence, and responsive design.

## 🤝 Contributing

Contributions are welcome! Feel free to fork this repository and submit pull requests with improvements.

---

**Happy Traveling! 🌍✈️**
