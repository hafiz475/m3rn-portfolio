import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Compass, RefreshCw, AlertTriangle } from 'lucide-react';

interface CompassModalProps {
  onClose: () => void;
}

const TARGET_LAT = 13.055121;
const TARGET_LON = 80.270040;

const MOCK_CITIES = [
  { name: 'London, UK', lat: 51.5074, lon: -0.1278 },
  { name: 'New York, USA', lat: 40.7128, lon: -74.0060 },
  { name: 'Tokyo, Japan', lat: 35.6762, lon: 139.6503 },
  { name: 'Sydney, Australia', lat: -33.8688, lon: 151.2093 },
];

// Haversine formula to calculate distance in km
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

// Calculate bearing (angle) to target in degrees
function calculateBearing(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const lat1Rad = (lat1 * Math.PI) / 180;
  const lat2Rad = (lat2 * Math.PI) / 180;

  const y = Math.sin(dLon) * Math.cos(lat2Rad);
  const x =
    Math.cos(lat1Rad) * Math.sin(lat2Rad) -
    Math.sin(lat1Rad) * Math.cos(lat2Rad) * Math.cos(dLon);

  const brng = (Math.atan2(y, x) * 180) / Math.PI;
  return (brng + 360) % 360;
}

export const CompassModal: React.FC<CompassModalProps> = ({ onClose }) => {
  const [status, setStatus] = useState<'checking' | 'active' | 'error'>('checking');
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const [bearing, setBearing] = useState<number | null>(null);
  const [heading, setHeading] = useState<number>(0);
  const [hasGyro, setHasGyro] = useState<boolean>(false);
  const [gyroRequested, setGyroRequested] = useState<boolean>(false);
  const [mockName, setMockName] = useState<string | null>(null);

  // 3D Card Hover Tilt state
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  // Request user location
  const requestLocation = () => {
    setStatus('checking');
    setMockName(null);
    if (!navigator.geolocation) {
      setStatus('error');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCoords({ lat: latitude, lon: longitude });
        setDistance(calculateDistance(latitude, longitude, TARGET_LAT, TARGET_LON));
        setBearing(calculateBearing(latitude, longitude, TARGET_LAT, TARGET_LON));
        setStatus('active');
      },
      () => {
        setStatus('error');
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  useEffect(() => {
    requestLocation();
  }, []);

  // Request Gyroscope/DeviceOrientation permission for iOS
  const requestGyroPermission = async () => {
    setGyroRequested(true);
    // @ts-ignore
    if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
      try {
        // @ts-ignore
        const permissionState = await DeviceOrientationEvent.requestPermission();
        if (permissionState === 'granted') {
          startOrientationListener();
        }
      } catch (e) {
        console.error('Error requesting orientation permission:', e);
      }
    } else {
      // Non-iOS device or browser that doesn't require explicit orientation permission
      startOrientationListener();
    }
  };

  const startOrientationListener = () => {
    setHasGyro(true);
    const handleOrientation = (e: DeviceOrientationEvent) => {
      // webkitCompassHeading is the direct compass heading in degrees (Safari/iOS)
      // @ts-ignore
      if (e.webkitCompassHeading !== undefined) {
        // @ts-ignore
        setHeading(e.webkitCompassHeading);
      } else if (e.alpha !== null) {
        // Fallback for Android (0 to 360)
        // Usually, e.alpha behaves as counter-clockwise rotation, so we do 360 - e.alpha
        setHeading(360 - e.alpha);
      }
    };

    window.addEventListener('deviceorientation', handleOrientation, true);
    // Use absolute orientation event if available for maximum compass precision
    window.addEventListener('deviceorientationabsolute', handleOrientation as any, true);

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation, true);
      window.removeEventListener('deviceorientationabsolute', handleOrientation as any, true);
    };
  };

  // Detect if browser supports orientation at all
  useEffect(() => {
    // Check if device orientation event is supported on load
    if (window.DeviceOrientationEvent) {
      // Just check if we can start it directly (non-iOS)
      // @ts-ignore
      if (typeof DeviceOrientationEvent.requestPermission !== 'function') {
        startOrientationListener();
      }
    }
  }, []);

  // Desktop Mouse Tilt Effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    
    // Max 12 degrees tilt
    const rX = -(mouseY / (height / 2)) * 12;
    const rY = (mouseX / (width / 2)) * 12;
    setTilt({ x: rX, y: rY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  // Apply mock location
  const handleUseMock = (city: typeof MOCK_CITIES[0]) => {
    setMockName(city.name);
    setCoords({ lat: city.lat, lon: city.lon });
    setDistance(calculateDistance(city.lat, city.lon, TARGET_LAT, TARGET_LON));
    setBearing(calculateBearing(city.lat, city.lon, TARGET_LAT, TARGET_LON));
    setStatus('active');
  };

  // Rotation value for needle: bearing (relative to North) minus user's phone heading
  // If user rotates phone, the needle must spin in the opposite direction to keep pointing to Chennai
  const needleRotation = bearing !== null ? (bearing - heading + 360) % 360 : 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-xl p-4 sm:p-6 md:p-8"
    >
      <div 
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: tilt.x === 0 && tilt.y === 0 ? 'all 0.5s ease' : 'none',
        }}
        className="relative bg-surface/40 border border-stroke rounded-[32px] p-8 max-w-md w-full shadow-2xl overflow-hidden text-center flex flex-col items-center gap-6 select-none"
      >
        {/* Glow accent ring behind */}
        <div className="absolute -inset-10 bg-radial-gradient from-accent/5 via-transparent to-transparent opacity-60 pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full border border-stroke bg-surface/50 flex items-center justify-center text-text-primary/70 hover:text-text-primary hover:border-white/20 transition-all hover:rotate-90 duration-300 focus:outline-none"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex flex-col items-center gap-2 mt-4">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-accent animate-spin-slow" />
            <span className="text-[10px] text-muted uppercase tracking-[0.25em] font-mono font-bold">Hafiz Finder</span>
          </div>
          <h3 className="text-xl md:text-2xl text-text-primary font-display font-medium">
            Compass Node
          </h3>
        </div>

        {/* Dynamic States */}
        <AnimatePresence mode="wait">
          {/* LOADING/CHECKING STATE */}
          {status === 'checking' && (
            <motion.div
              key="checking"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center justify-center py-8 gap-6 w-full"
            >
              {/* Pulsing Radar Animation */}
              <div className="relative w-36 h-36 flex items-center justify-center">
                <span className="absolute inset-0 rounded-full border border-white/5 animate-ping opacity-75" />
                <span className="absolute inset-4 rounded-full border border-white/10 animate-ping opacity-50" />
                <span className="absolute inset-10 rounded-full border border-accent/20 animate-pulse" />
                <div className="w-16 h-16 rounded-full bg-surface border border-stroke flex items-center justify-center">
                  <Compass className="w-6 h-6 text-muted animate-spin" />
                </div>
              </div>
              
              <div className="flex flex-col gap-1.5 max-w-[280px]">
                <p className="text-sm font-semibold text-text-primary/90 animate-pulse">Requesting Satellite Sync...</p>
                <p className="text-xs text-muted leading-relaxed font-body">Determining coordinates to calculate exact distance and bearing to Chennai, India.</p>
              </div>
            </motion.div>
          )}

          {/* ACTIVE STATE (SUCCESS) */}
          {status === 'active' && (
            <motion.div
              key="active"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="flex flex-col items-center gap-6 w-full py-2"
            >
              {/* Compass UI */}
              <div className="relative w-44 h-44 rounded-full bg-black/40 border border-stroke flex items-center justify-center shadow-inner">
                {/* Compass Dial face */}
                <div 
                  className="absolute inset-2 rounded-full border border-white/5 flex items-center justify-center text-[10px] text-muted font-mono font-bold transition-transform duration-300"
                  style={{ transform: `rotate(${-heading}deg)` }}
                >
                  <span className="absolute top-1 font-bold text-accent">N</span>
                  <span className="absolute right-1">E</span>
                  <span className="absolute bottom-1">S</span>
                  <span className="absolute left-1">W</span>

                  {/* Circular Degree Marks */}
                  <div className="absolute inset-4 rounded-full border border-dashed border-white/5 opacity-50" />
                </div>

                {/* Center Core Needle pointing directly to Hafiz */}
                <motion.div
                  animate={{ rotate: needleRotation }}
                  transition={{ type: 'spring', stiffness: 80, damping: 15 }}
                  className="absolute w-full h-full flex items-center justify-center pointer-events-none"
                >
                  {/* Glowing Arrow needle */}
                  <div className="relative w-2 h-36 flex flex-col items-center justify-between">
                    {/* North (Points to Hafiz) */}
                    <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[20px] border-b-accent filter drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]" />
                    
                    {/* Pivot point */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-surface border-2 border-accent z-10" />

                    {/* South (Opposite direction) */}
                    <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[14px] border-t-stroke" />
                  </div>
                </motion.div>
              </div>

              {/* Distance Display */}
              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-muted uppercase tracking-[0.2em] font-mono">Radial Range</span>
                <span className="text-3xl sm:text-4xl font-mono font-bold text-text-primary tracking-tight">
                  {distance?.toLocaleString()} <span className="text-lg text-muted">KM</span>
                </span>
                <span className="text-xs text-accent font-body mt-1 italic">
                  {mockName ? `Simulated from ${mockName}` : 'Live location synced'}
                </span>
              </div>

              {/* iOS Gyro Activation Prompt */}
              {!hasGyro && !gyroRequested && (
                <button
                  onClick={requestGyroPermission}
                  className="text-xs font-semibold px-4 py-2 border border-accent/20 bg-accent/5 hover:bg-accent/10 text-accent rounded-full transition-colors focus:outline-none"
                >
                  Enable Real-Time Gyro
                </button>
              )}

              {hasGyro && (
                <p className="text-[10px] text-muted/60 font-mono">
                  Orientation Active • Heading: {Math.round(heading)}° • Bearing: {bearing ? Math.round(bearing) : 0}°
                </p>
              )}

              <button
                onClick={requestLocation}
                className="flex items-center gap-1.5 text-xs text-muted hover:text-text-primary font-body border border-stroke rounded-full px-3 py-1 bg-surface/30 hover:bg-surface transition-all focus:outline-none mt-2"
              >
                <RefreshCw className="w-3 h-3" />
                Resync Satellite
              </button>
            </motion.div>
          )}

          {/* ERROR STATE (CONNECTION LOST) */}
          {status === 'error' && (
            <motion.div
              key="error"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center gap-5 w-full py-2"
            >
              {/* CRT Static Radar Glitch Screen */}
              <div className="relative w-40 h-40 rounded-2xl bg-red-950/20 border border-red-500/20 overflow-hidden flex flex-col items-center justify-center shadow-[inset_0_0_20px_rgba(239,68,68,0.2)]">
                {/* CRT Scanline Overlay */}
                <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,3px_100%] z-20" />
                
                {/* CRT Glitch scan effect */}
                <div className="absolute w-full h-8 bg-red-500/10 top-0 left-0 animate-bounce pointer-events-none" />

                {/* Glitchy Static Red Radar Ring */}
                <div className="w-20 h-20 rounded-full border-2 border-red-500/30 border-dashed animate-spin flex items-center justify-center">
                  <AlertTriangle className="w-8 h-8 text-red-500 animate-pulse" />
                </div>
                
                {/* CRT Warning */}
                <div className="text-[10px] text-red-400 font-mono font-bold tracking-widest uppercase mt-4 animate-pulse">
                  Signal Mismatch
                </div>
              </div>

              <div className="flex flex-col gap-1 max-w-[280px]">
                <p className="text-sm font-semibold text-red-500/90 font-mono uppercase">CONNECTION LOST</p>
                <p className="text-xs text-muted leading-relaxed font-body">
                  Geolocation telemetry failed. Signal denied, blocked, or unavailable.
                </p>
              </div>

              {/* Mock Locations Fallback Selection */}
              <div className="flex flex-col gap-3 w-full border-t border-stroke pt-4 mt-2">
                <span className="text-[10px] text-muted uppercase tracking-[0.15em] font-mono">Select Override Telemetry</span>
                <div className="grid grid-cols-2 gap-2">
                  {MOCK_CITIES.map((city) => (
                    <button
                      key={city.name}
                      onClick={() => handleUseMock(city)}
                      className="text-xs font-semibold px-3 py-2 bg-surface/30 hover:bg-surface border border-stroke rounded-xl text-text-primary/80 hover:text-text-primary transition-all focus:outline-none"
                    >
                      {city.name.split(',')[0]}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={requestLocation}
                className="flex items-center gap-1.5 text-xs text-accent font-body border border-accent/20 bg-accent/5 hover:bg-accent/15 rounded-full px-4.5 py-2 transition-all focus:outline-none mt-2"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Attempt Re-connection
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
