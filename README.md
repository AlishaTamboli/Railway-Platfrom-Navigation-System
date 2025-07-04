# 🚉 Railway Navigation System - Solapur Station

A smart, interactive indoor navigation web application for **Solapur Railway Station**, built using **Leaflet.js**, **HTML**, **CSS**, and **JavaScript**.  
It allows users to view facilities, enable location, get real-time walking routes with estimated time, and navigate easily through the station premises.

---

## 📌 Features

- ✅ Facility Search (Enquiry Office, Booking Office, Water, Toilets, Food Court, etc.)
- ✅ Use My Location – get real-time position with marker
- ✅ Dynamic Route Drawing using Leaflet polylines
- ✅ Auto distance and estimated time display
- ✅ Mobile and Desktop Responsive UI
- ✅ Manual Location Input fallback (when geolocation fails)
- ✅ Route completion auto-stops navigation on arrival

---

## 📷 Screenshots

| Homepage with Map | Facility List | Route Navigation |
|------------------|----------------|------------------|
| ![map](assets/screenshots/home.png) | ![facilities](assets/screenshots/facilities.png) | ![route](assets/screenshots/route.png) |

---

## 🧠 Tech Stack

| Frontend | Mapping Library | Geolocation |
|----------|-----------------|-------------|
| HTML5, CSS3, JavaScript | [Leaflet.js](https://leafletjs.com) | HTML5 Geolocation API |

---

## 🗂️ Project Structure
📁 Railway-Navigation-System-Solapur
├── index.html # Main web page
├── styles.css # All custom styles
├── script.js # All core JavaScript logic
├── .gitignore # Ignore temp/dev files
├── README.md # This file
├── assets/
│ ├── icons/ # Marker icons (water, toilet, enquiry etc.)
│ └── screenshots/ # Images for README preview

---

## 🚀 Getting Started

You can view the app live by simply opening `index.html` in any browser.

### Option 1: Run Locally

```bash
git clone https://github.com/your-username/Railway-Navigation-System-Solapur.git
cd Railway-Navigation-System-Solapur
open index.html

Option 2: Deploy to GitHub Pages
Go to Settings > Pages

Set the source as the main branch and folder as /root

Visit your public URL

##🛠 How It Works
The user enables location (navigator.geolocation)

User selects a facility (like Booking Office)

The app calculates the shortest route with Haversine formula

Leaflet draws a dashed polyline between the points

Distance & time are displayed

Navigation stops automatically on reaching destination

##🧪 Future Enhancements##
✅ Real-time route recalculations

✅ Turn-by-turn voice navigation

✅ Admin panel to add/update facilities

✅ Firebase or backend integration for live updates

✅ AR integration for indoor tracking
---
🙏 Acknowledgements
Leaflet.js

OpenStreetMap

Flaticon for icons

