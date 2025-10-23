# Digital Legacy Vault Landing Page - Deployment Guide

This guide provides step-by-step instructions for deploying the Digital Legacy Vault landing page with click tracking functionality.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Setting Up Google Apps Script for Click Tracking](#setting-up-google-apps-script)
3. [Deploying to GitHub Pages](#deploying-to-github-pages)
4. [Testing the Landing Page](#testing-the-landing-page)
5. [Viewing Analytics Data](#viewing-analytics-data)
6. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before you begin, ensure you have:
- A GitHub account
- A Google account (for Google Sheets and Apps Script)
- Basic knowledge of HTML, CSS, and JavaScript
- A web browser (Chrome, Firefox, Safari, or Edge)

---

## Setting Up Google Apps Script for Click Tracking

### Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Click on **+ Blank** to create a new spreadsheet
3. Name it "Digital Legacy Vault - Click Tracking"
4. Create the following column headers in the first row:
   - `Timestamp` (Column A)
   - `Event Type` (Column B)
   - `Session ID` (Column C)
   - `Tracking ID` (Column D)
   - `Element Type` (Column E)
   - `Element Text` (Column F)
   - `Page` (Column G)
   - `Referrer` (Column H)
   - `User Agent` (Column I)
   - `Screen Size` (Column J)
   - `Viewport Size` (Column K)

### Step 2: Create the Apps Script

1. In your Google Sheet, click **Extensions** → **Apps Script**
2. Delete any existing code in the editor
3. Copy and paste the following script:

```javascript
/**
 * Digital Legacy Vault Click Tracking Script
 * This script receives click tracking data and saves it to Google Sheets
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    // Prepare row data
    var rowData = [
      data.timestamp || new Date().toISOString(),
      data.eventType || '',
      data.sessionId || '',
      data.trackingId || '',
      data.elementType || '',
      data.elementText || '',
      data.page || '',
      data.referrer || '',
      data.userAgent || '',
      data.screenSize || '',
      data.viewportSize || ''
    ];
    
    // Append data to sheet
    sheet.appendRow(rowData);
    
    return ContentService.createTextOutput(JSON.stringify({
      'status': 'success',
      'message': 'Data recorded'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      'status': 'error',
      'message': error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    'status': 'active',
    'message': 'Click tracking endpoint is active'
  })).setMimeType(ContentService.MimeType.JSON);
}
```

4. Click **File** → **Save** (or press `Ctrl+S` / `Cmd+S`)
5. Name your project "DLV Click Tracker"

### Step 3: Deploy the Apps Script

1. Click the **Deploy** button (top right) → **New deployment**
2. Click the gear icon ⚙️ next to "Select type"
3. Choose **Web app**
4. Configure the deployment:
   - **Description**: "Click Tracking Endpoint v1"
   - **Execute as**: Me (your email)
   - **Who has access**: Anyone
5. Click **Deploy**
6. **Important**: Copy the **Web app URL** that appears (you'll need this later)
   - It will look like: `https://script.google.com/macros/s/ABCD1234.../exec`
7. Click **Done**

### Step 4: Configure the Landing Page

1. Open the `script.js` file in your repository
2. Find this line (near the top):
   ```javascript
   GOOGLE_SCRIPT_URL: 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec',
   ```
3. Replace `YOUR_SCRIPT_ID` with the Web app URL you copied in Step 3
4. Save the file

---

## Deploying to GitHub Pages

### Step 1: Push Your Code to GitHub

If you haven't already pushed your code to GitHub:

```bash
# Navigate to your project directory
cd /path/to/My-Digital-Legacy-Vault-Landing-Page

# Add all files
git add .

# Commit changes
git commit -m "Add landing page with click tracking"

# Push to GitHub
git push origin main
```

### Step 2: Enable GitHub Pages

1. Go to your repository on GitHub: `https://github.com/YOUR_USERNAME/My-Digital-Legacy-Vault-Landing-Page`
2. Click on **Settings** (top navigation)
3. Scroll down and click on **Pages** (left sidebar)
4. Under **Source**, select:
   - Branch: `main` (or your default branch)
   - Folder: `/ (root)`
5. Click **Save**
6. Wait 1-2 minutes for GitHub to deploy your site
7. Your site will be available at: `https://YOUR_USERNAME.github.io/My-Digital-Legacy-Vault-Landing-Page/`

### Step 3: Custom Domain (Optional)

If you want to use a custom domain:

1. In GitHub Pages settings, enter your custom domain under **Custom domain**
2. Click **Save**
3. In your domain registrar's DNS settings, add:
   - For apex domain (example.com): Add A records pointing to GitHub's IPs:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```
   - For subdomain (www.example.com): Add CNAME record pointing to `YOUR_USERNAME.github.io`
4. Wait for DNS propagation (can take up to 48 hours)

---

## Testing the Landing Page

### Step 1: Open the Landing Page

1. Navigate to your deployed site: `https://YOUR_USERNAME.github.io/My-Digital-Legacy-Vault-Landing-Page/`
2. The page should load with all styling and images

### Step 2: Test Click Tracking

1. Open your browser's **Developer Console**:
   - Chrome/Edge: Press `F12` or `Ctrl+Shift+I` (Windows) / `Cmd+Option+I` (Mac)
   - Firefox: Press `F12` or `Ctrl+Shift+K` (Windows) / `Cmd+Option+K` (Mac)
   - Safari: Enable Developer menu in Preferences, then `Cmd+Option+C`

2. Look for console messages:
   - You should see: `✅ Click tracking enabled for XX elements`
   - When you click any button or link, you should see: `📊 Tracking event:` followed by the event data

3. Click on various elements:
   - Navigation links
   - CTA buttons
   - Feature cards
   - Pricing cards

4. Check your Google Sheet:
   - Go to your "Digital Legacy Vault - Click Tracking" spreadsheet
   - You should see new rows appearing with click data

### Step 3: Test Responsive Design

1. Test on different screen sizes:
   - Desktop (1920x1080, 1366x768)
   - Tablet (768x1024)
   - Mobile (375x667, 414x896)

2. In Chrome DevTools:
   - Press `Ctrl+Shift+M` (Windows) / `Cmd+Shift+M` (Mac) to toggle device toolbar
   - Select different device presets
   - Verify layout adjusts properly

---

## Viewing Analytics Data

### Access Your Data

1. Open your Google Sheet: "Digital Legacy Vault - Click Tracking"
2. View all tracked events in chronological order

### Analyze Your Data

Create pivot tables or charts to visualize:

1. **Most Clicked Elements**:
   - Insert → Pivot table
   - Rows: Tracking ID
   - Values: Count of Tracking ID
   - Sort: Descending

2. **Conversion Funnel**:
   - Track progression: Page View → Feature Click → Pricing Click → CTA Click

3. **Traffic Sources**:
   - Analyze the Referrer column to see where visitors come from

4. **Session Analysis**:
   - Group by Session ID to see user journeys

### Export Data

1. File → Download → CSV or Excel
2. Use in other analytics tools (Google Analytics, Tableau, etc.)

---

## Troubleshooting

### Click Tracking Not Working

**Problem**: Clicks are not being recorded in Google Sheets

**Solutions**:
1. Check browser console for errors
2. Verify the `GOOGLE_SCRIPT_URL` is correct in `script.js`
3. Ensure the Apps Script is deployed as "Anyone" can access
4. Check if your browser is blocking cross-origin requests
5. Try opening the Web App URL directly to test if it's active

### Page Not Loading on GitHub Pages

**Problem**: Getting 404 error or blank page

**Solutions**:
1. Wait 2-3 minutes after enabling GitHub Pages
2. Ensure `index.html` is in the root directory
3. Check that the repository is public
4. Verify the branch and folder settings in GitHub Pages settings
5. Clear browser cache and try again

### Images Not Displaying

**Problem**: SVG images are not showing

**Solutions**:
1. Check that all SVG files are in the `/assets` folder
2. Verify file paths are correct (case-sensitive on Linux servers)
3. Check browser console for 404 errors
4. Ensure SVG files are properly formatted XML

### Mobile Layout Issues

**Problem**: Layout breaks on mobile devices

**Solutions**:
1. Test using browser DevTools device emulation
2. Verify viewport meta tag is present in HTML
3. Check CSS media queries are working
4. Test on actual mobile devices if possible

### Apps Script Quota Exceeded

**Problem**: Script stops working after many requests

**Solutions**:
1. Check [Apps Script quotas](https://developers.google.com/apps-script/guides/services/quotas)
2. Free accounts have limits on script executions per day
3. Consider upgrading to Google Workspace for higher limits
4. Implement rate limiting on the client side

---

## Best Practices

### Security

1. **Never expose sensitive data** in the Google Sheet
2. **Use HTTPS** for your landing page (GitHub Pages provides this automatically)
3. **Regularly review** the Apps Script access permissions
4. **Monitor** the Google Sheet for suspicious activity

### Performance

1. **Optimize images**: Use compressed SVGs
2. **Minimize HTTP requests**: Combine CSS/JS files if needed
3. **Use CDN** for external resources (fonts, etc.)
4. **Enable caching**: GitHub Pages does this automatically

### Analytics

1. **Review data weekly** to identify trends
2. **Set up automated reports** using Google Sheets formulas
3. **A/B test** different CTA button texts
4. **Track conversions** to measure success

---

## Next Steps

1. **Add A/B Testing**: Test different headlines, CTAs, and layouts
2. **Integrate Email Capture**: Add a newsletter signup form
3. **Set Up Google Analytics**: For more detailed analytics
4. **Create Landing Page Variants**: Test different value propositions
5. **Add Social Proof**: Include logos, ratings, or user counts
6. **Implement Heatmaps**: Use tools like Hotjar or Microsoft Clarity

---

## Support

If you encounter issues:
1. Check this documentation first
2. Review the browser console for errors
3. Check the Apps Script logs: Apps Script Editor → Executions
4. Consult GitHub Pages documentation: https://docs.github.com/pages
5. Review Google Apps Script documentation: https://developers.google.com/apps-script

---

## Resources

- [GitHub Pages Documentation](https://docs.github.com/pages)
- [Google Apps Script Guide](https://developers.google.com/apps-script)
- [Web Analytics Best Practices](https://support.google.com/analytics/topic/1008008)
- [SVG Optimization Guide](https://web.dev/optimize-svgs/)

---

**Last Updated**: 2025-10-23

**Version**: 1.0.0
