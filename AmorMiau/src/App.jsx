import { useEffect, useState } from 'react';
import HomeDesktop from './pages/HomeDesktop';
import PetDetails from './pages/PetDetails';

export default function App() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <>{isMobile ? <PetDetails /> : <HomeDesktop />}</>;
}