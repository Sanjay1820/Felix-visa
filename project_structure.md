# Filix by Sagar - Project Structure

This project is a premium international visa and immigration website built with React, Tailwind CSS, GSAP, and Framer Motion.

## 📂 Directory Structure

### `src/`
- **`main.jsx`**: Entry point of the application.
- **`App.jsx`**: Main application component with routing.
- **`index.css`**: Global styles and Tailwind directives.

### `src/components/`
- **`Navbar.jsx`**: Responsive navigation bar.
- **`Footer.jsx`**: Detailed footer with links and social icons.
- **`Preloader.jsx`**: GSAP-animated logo preloader.
- **`Hero.jsx`**: Stunning hero section with 3D Globe background.
- **`Globe3D.jsx`**: Three.js component for the rotating globe.
- **`Features.jsx`**: Grid of visa services (used on Home).
- **`Countries.jsx`**: Interactive world map section (used on Home).
- **`WhyChooseUs.jsx`**: Trust indicators and features section.
- **`Testimonials.jsx`**: Client testimonials carousel.
- **`Cta.jsx`**: Call to action section.

### `src/pages/`
- **`Home.jsx`**: Landing page assembling all home components.
- **`About.jsx`**: Detailed "About Us" page with vision, mission, and story.
- **`Services.jsx`**: Main "Visa Services" page listing all categories.
- **`ServiceDetail.jsx`**: Dynamic page template for specific services (Study, Work, Tourist, etc.).
- **`CountriesPage.jsx`**: Detailed page with interactive map and list of destinations.
- **`ProcessPage.jsx`**: Step-by-step visa process timeline.
- **`WhyUsPage.jsx`**: Detailed "Why Choose Us" page.
- **`TestimonialsPage.jsx`**: Dedicated page with more client success stories.
- **`BlogPage.jsx`**: Knowledge center with articles.
- **`Contact.jsx`**: Contact form and office details.
- **`GenericPage.jsx`**: Fallback component for 404 pages.

### `src/layouts/`
- **`Layout.jsx`**: Main layout wrapper handling Navbar, Footer, and Preloader logic.

### `src/utils/`
- **`serviceData.js`**: Data source for the dynamic ServiceDetail pages.

## 🚀 Key Features

1.  **Dynamic Routing**: `/services/:type` automatically renders the correct content for Study, Work, Tourist, Business, and PR visas.
2.  **Animations**:
    *   **GSAP**: Scroll-triggered animations for elements fading in/up (used extensively).
    *   **Preloader**: Custom GSAP animation for the initial load.
3.  **3D Elements**: `Globe3D.jsx` adds a subtle premium tech feel to the Hero section.
4.  **Responsive Design**: Fully mobile-responsive Navbar and layouts using Tailwind CSS.
5.  **Data-Driven UI**: Components like `ServiceDetail` and `TestimonialsPage` are driven by data objects for easy updates.

## 🛠️ Tech Stack

-   **React**: UI Library
-   **Vite**: Build Tool
-   **Tailwind CSS**: Styling
-   **GSAP**: Advanced Animations
-   **Three.js / React Three Fiber**: 3D Graphics
-   **Lucide React**: Icons
-   **React Router DOM**: Navigation

## 🏃‍♂️ Running the Project

1.  `npm install`
2.  `npm run dev`

Enjoy building your global future with Filix!
