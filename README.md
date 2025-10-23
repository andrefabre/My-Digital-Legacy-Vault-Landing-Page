# Digital Legacy Vault - Landing Page

A static landing page for the Digital Legacy Vault application, designed to capture user interest and track interactions for marketing insights.

## 🚀 Features

- **Modern, Responsive Design**: Clean, professional interface that works on all devices
- **Click Tracking**: Automatic tracking of user interactions with Google Sheets integration
- **Fast & Lightweight**: Static HTML/CSS/JS with no dependencies
- **GitHub Pages Ready**: Easy deployment to GitHub Pages
- **Comprehensive Analytics**: Track page views, clicks, and user behavior

## 📋 What's Included

- **index.html**: Main landing page with complete sections:
  - Hero section with compelling CTA
  - Features showcase (6 key features)
  - How it works (4-step process)
  - Pricing tiers (Free, Premium, Family)
  - Testimonials
  - Contact/CTA section
  - Footer

- **style.css**: Modern, light-themed styling with:
  - Custom CSS variables for easy theming
  - Responsive design (mobile, tablet, desktop)
  - Smooth animations and transitions
  - Professional color scheme

- **script.js**: Click tracking functionality:
  - Tracks all user interactions
  - Sends data to Google Apps Script
  - Session tracking
  - Debug mode for testing

- **assets/**: SVG illustrations and icons:
  - Logo and hero illustration
  - 6 feature icons
  - 4 step illustrations

## 🛠️ Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/andrefabre/My-Digital-Legacy-Vault-Landing-Page.git
cd My-Digital-Legacy-Vault-Landing-Page
```

### 2. Test Locally

Simply open `index.html` in your web browser:

```bash
# On Mac
open index.html

# On Windows
start index.html

# On Linux
xdg-open index.html
```

Or use a local server (recommended):

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (if you have npx)
npx serve

# Then visit: http://localhost:8000
```

### 3. Deploy to GitHub Pages

See [DEPLOYMENT.md](DEPLOYMENT.md) for complete deployment instructions.

Quick steps:
1. Push code to GitHub
2. Go to repository Settings → Pages
3. Select branch and folder
4. Your site will be live at: `https://YOUR_USERNAME.github.io/My-Digital-Legacy-Vault-Landing-Page/`

## 📊 Click Tracking Setup

The landing page includes built-in click tracking that sends data to Google Sheets.

### Setup Steps:

1. **Create a Google Sheet** for storing tracking data
2. **Create a Google Apps Script** web app (see DEPLOYMENT.md)
3. **Update script.js** with your Apps Script URL
4. **Deploy** and start collecting data!

For detailed instructions, see [DEPLOYMENT.md](DEPLOYMENT.md#setting-up-google-apps-script-for-click-tracking)

## 📁 Project Structure

```
My-Digital-Legacy-Vault-Landing-Page/
├── index.html              # Main landing page
├── style.css              # Styles and responsive design
├── script.js              # Click tracking functionality
├── assets/                # Images and icons
│   ├── logo.svg
│   ├── hero-illustration.svg
│   ├── icon-secure.svg
│   ├── icon-password.svg
│   ├── icon-documents.svg
│   ├── icon-beneficiaries.svg
│   ├── icon-deadman.svg
│   ├── icon-memories.svg
│   ├── step-1.svg
│   ├── step-2.svg
│   ├── step-3.svg
│   └── step-4.svg
├── DEPLOYMENT.md          # Detailed deployment guide
├── README.md             # This file
├── LICENSE              # MIT License
└── .gitignore           # Git ignore rules
```

## 🎨 Customization

### Colors

Edit CSS variables in `style.css`:

```css
:root {
    --primary-color: #4F46E5;      /* Main brand color */
    --secondary-color: #10B981;     /* Accent color */
    --text-primary: #1F2937;        /* Dark text */
    --text-secondary: #6B7280;      /* Light text */
    /* ... more variables ... */
}
```

### Content

Edit `index.html` to update:
- Headlines and copy
- Feature descriptions
- Pricing tiers
- Testimonials
- Contact information

### Tracking

Configure tracking in `script.js`:

```javascript
const CONFIG = {
    GOOGLE_SCRIPT_URL: 'YOUR_URL_HERE',
    TRACKING_ENABLED: true,
    DEBUG_MODE: true  // Set to false in production
};
```

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🧪 Testing

### Browser Compatibility

Tested and working on:
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

### Testing Checklist

- [ ] All images load correctly
- [ ] Navigation links work
- [ ] Click tracking is active (check console)
- [ ] Responsive design on mobile
- [ ] Responsive design on tablet
- [ ] All CTAs are trackable
- [ ] Google Sheet receives data

## 📈 Analytics

Track these key metrics:

- **Page Views**: Total visits to the landing page
- **Click-Through Rate**: CTA button clicks / page views
- **Most Popular Features**: Which feature cards get clicked most
- **Pricing Interest**: Which pricing tier gets most attention
- **Navigation Patterns**: User flow through the page

## 🔒 Privacy & Security

- No personal data is collected without user action
- All tracking is anonymous (session-based)
- HTTPS enabled via GitHub Pages
- No cookies or local storage (except session ID)

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

This is a smoke test landing page. For major changes, please open an issue first to discuss what you would like to change.

## 💡 Future Enhancements

- [ ] Add email capture form
- [ ] Integrate with MailChimp/SendGrid
- [ ] Add A/B testing capability
- [ ] Create variant landing pages
- [ ] Add video demo section
- [ ] Implement heatmap tracking
- [ ] Add live chat widget
- [ ] Create multi-language support

## 📞 Support

For issues or questions:
1. Check [DEPLOYMENT.md](DEPLOYMENT.md) for troubleshooting
2. Open an issue on GitHub
3. Review browser console for errors

## 🙏 Acknowledgments

- Inspired by modern SaaS landing pages
- Icons and illustrations created with SVG
- Fonts from Google Fonts (Inter)

---

**Built with ❤️ for Digital Legacy Vault**

Last Updated: 2025-10-23
