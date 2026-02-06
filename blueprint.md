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
    *   The application uses the `wttr.in` API to fetch real-time weather data in Russian, which does not require an API key.
    *   The `GetWeather.jsx` component fetches and displays the current weather for a given city.
    *   The background of the weather page dynamically changes based on the weather (sunny, rainy, cloudy, etc.).
*   **Improved Weather Page:**
    *   The weather page now has a more modern and spacious design.
    *   It displays more weather details: feels like temperature, wind speed, humidity, and UV index.
    *   All weather descriptions and UI elements are in Russian.
    *   When weather is displayed, two buttons appear:
        *   A "✏️ Изменить город" button to quickly search for a different city.
        *   A "Изменить погоду" button in the top-right corner that also returns to the search page.

## Current Plan

1.  **Add 'Edit' button to Home Page:** Add a new button on the home page to navigate directly to the edit weather page.
2.  **Contextual Navigation:**
    *   The edit weather page will understand the user's navigation source (from Home, Get Weather, or AI Agent) using URL parameters.
    *   The "Back" button on the edit page will return the user to the correct previous page.
    *   When returning to the home page from the agent context, the page will automatically scroll down to the agent section.
3.  **AI Agent Chat Enhancements:**
    *   Add a "New Chat" button to the agent's chat interface.
    *   Implement local storage to persist the chat history.
