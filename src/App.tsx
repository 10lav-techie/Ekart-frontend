

import Navbar from "./components/layout/Navbar";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  return (
    <>
      <Navbar />
      <AppRoutes />
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


