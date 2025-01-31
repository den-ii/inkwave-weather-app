# Inkwave Weather App

[![Netlify Status](https://api.netlify.com/api/v1/badges/YOUR_BADGE_ID/deploy-status)](https://app.netlify.com/sites/inkwave-weather-app/deploys)

Inkwave Weather App is a modern weather forecasting application built using **Vite, TypeScript, and React**. It provides real-time weather updates, forecasts, and location-based weather insights in a sleek and responsive UI.

## 🌐 Live Demo
Check out the live version here: [Inkwave Weather App](https://inkwave-weather-app.netlify.app)

## 🚀 Features
- 🌦️ **Real-time weather updates** using a weather API
- 📍 **Location-based weather search** with autocomplete
- 📊 **Detailed weather forecast** including temperature, humidity, and wind speed
- 🎨 **Responsive design** for both desktop and mobile
- ⚡ **Optimized performance** with Vite & TypeScript

## 🛠️ Tech Stack
- **Frontend:** Vite, React, TypeScript
- **Styling:** Tailwind CSS (if applicable)
- **API Integration:** OpenWeatherMap / Google Places API (Specify if used)
- **Deployment:** Netlify

## 📦 Installation & Setup
To set up the project locally, follow these steps:

1. **Clone the repository:**
   ```sh
   git clone https://github.com/YOUR_GITHUB_USERNAME/inkwave-weather-app.git
   cd inkwave-weather-app
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory and add:
   ```ini
   VITE_GOOGLE_URL=your_google_api_url
   VITE_WEATHER_API_KEY=your_weather_api_key
   ```

4. **Run the development server:**
   ```sh
   npm run dev
   ```

5. **Build for production:**
   ```sh
   npm run build
   ```

## 📌 Deployment
The app is deployed on Netlify. To deploy your own version:
- Connect your GitHub repo to Netlify.
- Set environment variables in Netlify settings.
- Deploy automatically on push or use `netlify deploy` CLI.

## 🐛 Troubleshooting
If you encounter CORS issues when calling APIs:
- Ensure your API keys have the correct **allowed origins**.
- Use a **backend proxy** if needed.
- Check browser console logs for detailed errors.

## 🤝 Contributing
Feel free to submit issues and pull requests to improve the app!

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).

