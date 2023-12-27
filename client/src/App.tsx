import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home.tsx";
import { AnimatePresence } from "framer-motion";
import { ThemeProvider } from "@material-tailwind/react";

function App() {
  return (
    <ThemeProvider>
      <AnimatePresence>
        <Routes>
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </AnimatePresence>
    </ThemeProvider>
  );
}

export default App;
