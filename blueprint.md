# Project Blueprint

## Overview

This application allows users to trigger a rain effect in a chosen city. The interface provides a beautiful and engaging experience, with dynamic backgrounds and weather information.

## Implemented Features

*   **Home Page:**
    *   A visually appealing landing page with a persistent rain effect.
    *   Cards explaining the purpose and functionality of the application.
    *   A "Начать" button to navigate to the weather page.
*   **Routing:**
    *   The app uses `react-router-dom` for navigation.
    *   The home page is available at the root path (`/`).
    *   A new page for getting weather information is available at `/getweather`.
*   **Styling:**
    *   The application uses a dark, rainy theme on the home page with a custom rain animation.
    *   The weather page has a dynamic background that will change based on the weather conditions.
*   **Weather API Integration:**
    *   The application uses the OpenWeatherMap API to fetch real-time weather data.
    *   The `GetWeather.jsx` component fetches and displays the current weather for a given city.
    *   The background of the weather page dynamically changes based on the weather (sunny, rainy, cloudy, etc.).

## Current Plan

*   **Secure API Key:**
    *   The OpenWeatherMap API key is currently hardcoded in the `GetWeather.jsx` component. This is not secure and should be moved to an environment variable.
