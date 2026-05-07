import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import LiveDarshan from './pages/LiveDarshan';
import Events from './pages/Events';
import Gallery from './pages/Gallery';
import Donations from './pages/Donations';
import Volunteer from './pages/Volunteer';
import SocialInitiatives from './pages/SocialInitiatives';
import Contact from './pages/Contact';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';

function PageFrame({ children }) {
  return (
    <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }} transition={{ duration: 0.28 }}>
      {children}
    </motion.div>
  );
}

export default function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route element={<Layout />}>
          <Route index element={<PageFrame><Home /></PageFrame>} />
          <Route path="about" element={<PageFrame><About /></PageFrame>} />
          <Route path="live-darshan" element={<PageFrame><LiveDarshan /></PageFrame>} />
          <Route path="events" element={<PageFrame><Events /></PageFrame>} />
          <Route path="gallery" element={<PageFrame><Gallery /></PageFrame>} />
          <Route path="donations" element={<PageFrame><Donations /></PageFrame>} />
          <Route path="volunteer" element={<PageFrame><Volunteer /></PageFrame>} />
          <Route path="social-initiatives" element={<PageFrame><SocialInitiatives /></PageFrame>} />
          <Route path="contact" element={<PageFrame><Contact /></PageFrame>} />
          <Route path="admin" element={<PageFrame><AdminDashboard /></PageFrame>} />
          <Route path="login" element={<PageFrame><Login /></PageFrame>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}
