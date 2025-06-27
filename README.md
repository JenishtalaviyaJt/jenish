# Sai Sanskar Construction Website

## Overview
This is a modern, responsive website for the Sai Sanskar construction project. The website showcases available properties, project galleries, location information, and includes a client registration system.

## Features
- Responsive design that works on all devices
- Project showcase with image gallery
- Interactive location map
- Client registration form
- Modern UI with smooth animations
- Admin dashboard for managing inquiries

## Tech Stack
- Node.js
- Express.js
- Bootstrap 5.3.0
- Google Maps JavaScript API

## Installation
1. Clone or download this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   node server.js
   ```

## File Structure
```
├── index.html          # Main HTML file
├── styles.css          # CSS styles
├── script.js           # JavaScript functionality
├── server.js          # Express server setup
├── package.json       # Project dependencies
├── images/            # Image assets
│   ├── hero-bg.svg    # Hero section background
│   ├── project1.svg   # Project gallery image
│   └── project2.svg   # Project gallery image
└── README.md         # Project documentation
```

## Deployment on Render
1. Create a new account on Render.com
2. Click on "New Web Service"
3. Connect your GitHub repository
4. Configure the deployment:
   - Build Command: `npm install`
   - Start Command: `node server.js`
   - Environment Type: Node
   - Environment Variables (if needed):
     - PORT: Will be set automatically by Render
     - NODE_ENV: production

## Customization
- Update the content in `index.html` with actual project details
- Modify colors and styles in `styles.css`
- Add more gallery images and update the `galleryImages` array in `script.js`
- Configure the form submission handler in `script.js` to connect with your backend

## Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Notes
- Replace all placeholder content with actual project information
- Ensure to set up proper form handling and data storage
- The website will be automatically deployed when changes are pushed to the main branch
