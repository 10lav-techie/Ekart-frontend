

import Navbar from "./components/layout/Navbar";
import AppRoutes from "./routes/AppRoutes";
import Footer from "./components/layout/Footer";
const App = () => {
  return (
    <>
      <Navbar />
      <AppRoutes />
      <Footer />
    </>
  );
};

export default App;

/**
 * App.tsx
 * ----------
 * This is the root component of the application.
 * Responsibilities:
 * - Mount global providers (later: Auth, Theme, Query, etc.)
 * - Render application routes
 * - Handle global loading fallback
 */


