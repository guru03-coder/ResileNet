import React, { useEffect, useRef, useState } from 'react';
import { Compass, Info, Plus, Minus, Activity, Locate } from 'lucide-react';

// Access Leaflet from window global
declare global {
  interface Window {
    L: any;
  }
}

interface MapEntity {
  id: string;
  type: 'static' | 'mobile';
  lat: number;
  lng: number;
  label: string;
  bgColor: string;
  iconSvg: string;
  heading?: number; // For rotation if needed
}

export const MapGodViewPanel: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<{ [key: string]: any }>({});
  const userMarkerRef = useRef<any>(null);
  const [isLive, setIsLive] = useState(true);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const stormLayerRef = useRef<any>(null);

  // Initial Data - VIT Chennai Context (Mambakkam)
  // Center approx: 12.8406, 80.1534
  const initialEntities: MapEntity[] = [
    {
      id: 'sos-1',
      type: 'static',
      lat: 12.8390,
      lng: 80.1550,
      label: 'SOS: Hostel Block A',
      bgColor: 'bg-red-500 animate-bounce',
      iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>`
    },
    {
      id: 'camp-1',
      type: 'static',
      lat: 12.8420,
      lng: 80.1520,
      label: 'Safe Zone: Sports Complex',
      bgColor: 'bg-green-500',
      iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3.5 21 14 3"/><path d="M20.5 21 10 3"/><path d="M15.5 21 12 15l-3.5 6"/><path d="M2 21h20"/></svg>`
    },
    {
      id: 'gateway-1',
      type: 'mobile',
      lat: 12.8440,
      lng: 80.1540,
      label: 'Patrol: Main Gate',
      bgColor: 'bg-blue-500',
      iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/></svg>`
    },
    {
      id: 'drone-1',
      type: 'mobile',
      lat: 12.8410,
      lng: 80.1530,
      label: 'Drone: Academic Block',
      bgColor: 'bg-slate-700',
      iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="2"/><path d="M12 10V5"/><path d="M12 14v5"/><path d="M14 12h5"/><path d="M10 12H5"/><path d="M5 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2"/><path d="M19 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2"/><path d="M5 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2"/><path d="M19 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2"/></svg>`
    },
    {
      id: 'amb-1',
      type: 'mobile',
      lat: 12.8400,
      lng: 80.1540,
      label: 'Amb: Health Center',
      bgColor: 'bg-[#0EA5E9]',
      iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 10h4"/><path d="M12 8v4"/><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M7 3v18"/><path d="M17 3v18"/></svg>`
    }
  ];

  // Store entity state in a Ref for the animation loop to access without triggering re-renders
  const entitiesRef = useRef<MapEntity[]>(initialEntities);

  const handleZoomIn = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.zoomIn();
    }
  };

  const handleZoomOut = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.zoomOut();
    }
  };

  const handleLocateMe = () => {
    if (userLocation && mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(userLocation, 16, {
        animate: true,
        duration: 1.5
      });
    } else if (locationError) {
      alert(`Could not get location: ${locationError}`);
    } else {
      alert("Fetching location... please wait.");
    }
  };

  const handleMapFlyTo = (event: Event) => {
    const e = event as CustomEvent;
    if (mapInstanceRef.current && e.detail) {
      mapInstanceRef.current.flyTo(e.detail.coords, e.detail.zoom, {
        animate: true,
        duration: 1.5
      });
    }
  };

  const handleLayerToggle = (event: Event) => {
    const e = event as CustomEvent;
    if (!mapInstanceRef.current || !window.L) return;

    if (e.detail.layer === 'weather') {
      if (e.detail.active) {
         // Add Storm Layer (Simulating storm over open area near campus)
         const L = window.L;
         const stormCoords = [
            [12.8450, 80.1510],
            [12.8470, 80.1560],
            [12.8430, 80.1600],
            [12.8410, 80.1550]
         ];
         
         if (!stormLayerRef.current) {
            stormLayerRef.current = L.polygon(stormCoords, {
                color: 'transparent',
                fillColor: '#1e3a8a', // Dark blue
                fillOpacity: 0.2,
                weight: 0
            }).addTo(mapInstanceRef.current);
         }
      } else {
         // Remove Storm Layer
         if (stormLayerRef.current) {
             mapInstanceRef.current.removeLayer(stormLayerRef.current);
             stormLayerRef.current = null;
         }
      }
    }
  };

  // Listen for sidebar events
  useEffect(() => {
    window.addEventListener('map-fly-to', handleMapFlyTo);
    window.addEventListener('map-layer-toggle', handleLayerToggle);
    return () => {
      window.removeEventListener('map-fly-to', handleMapFlyTo);
      window.removeEventListener('map-layer-toggle', handleLayerToggle);
    };
  }, []);

  // User Location Tracking Effect
  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation not supported");
      return;
    }

    const success = (position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords;
      setUserLocation([latitude, longitude]);
      setLocationError(null);

      const L = window.L;
      if (!L || !mapInstanceRef.current) return;

      if (!userMarkerRef.current) {
        // Create User Marker (Blue Dot Pulse)
        const userIcon = L.divIcon({
          className: 'user-pin',
          html: `
            <div class="relative w-6 h-6 flex items-center justify-center">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-4 w-4 bg-blue-600 border-2 border-white shadow-md"></span>
            </div>
          `,
          iconSize: [24, 24],
          iconAnchor: [12, 12],
        });

        userMarkerRef.current = L.marker([latitude, longitude], { 
          icon: userIcon,
          zIndexOffset: 1000 // Ensure user is always on top
        }).addTo(mapInstanceRef.current);
        
        userMarkerRef.current.bindPopup("You are here").openPopup();
      } else {
        // Update existing marker
        userMarkerRef.current.setLatLng([latitude, longitude]);
      }
    };

    const error = (err: GeolocationPositionError) => {
      console.warn(`ERROR(${err.code}): ${err.message}`);
      setLocationError(err.message);
    };

    const id = navigator.geolocation.watchPosition(success, error, {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    });

    return () => navigator.geolocation.clearWatch(id);
  }, []);


  // Map Initialization Effect
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const L = window.L;
    if (!L) return;

    // 1. Initialize Map
    // VIT Chennai Coordinates
    const map = L.map(mapContainerRef.current, {
      zoomControl: false,
      attributionControl: false,
      center: [12.8406, 80.1534], 
      zoom: 16
    });

    mapInstanceRef.current = map;

    // 2. Add Geoapify Tiles
    const apiKey = 'af51ef33cca34e3fa7120199c42c2f5c';
    L.tileLayer(`https://maps.geoapify.com/v1/tile/osm-bright-grey/{z}/{x}/{y}.png?apiKey=${apiKey}`, {
      maxZoom: 20,
    }).addTo(map);

    // 3. Define Custom Marker Logic
    const createCustomIcon = (bgColor: string, iconSvg: string, label: string) => {
      return L.divIcon({
        className: 'custom-pin-container',
        html: `
          <div class="relative group cursor-pointer" style="width: 40px; height: 40px;">
             <div class="w-8 h-8 ${bgColor} rounded-full flex items-center justify-center border-2 border-white shadow-lg z-10 absolute top-0 left-1/2 transform -translate-x-1/2 transition-transform hover:scale-110">
                ${iconSvg}
             </div>
             <div class="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-4 h-1 bg-black/20 blur-sm rounded-full"></div>
             <div class="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 bg-white px-2 py-1 rounded shadow text-[10px] font-bold text-gray-700 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-20 pointer-events-none">
                ${label}
             </div>
          </div>
        `,
        iconSize: [40, 40],
        iconAnchor: [20, 20],
      });
    };

    // 4. Initialize Markers
    entitiesRef.current.forEach(entity => {
      const marker = L.marker([entity.lat, entity.lng], { 
        icon: createCustomIcon(entity.bgColor, entity.iconSvg, entity.label) 
      }).addTo(map);
      markersRef.current[entity.id] = marker;
    });

    // 5. Add Static Layers (Flood, Heatmap) - Adjusted for VIT Chennai
    const floodCoords = [
      [12.8450, 80.1520],
      [12.8460, 80.1550],
      [12.8440, 80.1530],
      [12.8445, 80.1510]
    ];
    L.polygon(floodCoords, { 
      color: '#0EA5E9', 
      fillColor: '#0EA5E9', 
      fillOpacity: 0.3, 
      weight: 1,
      dashArray: '5, 5'
    }).addTo(map);

    // Heatmap near Hostel A
    L.circle([12.8390, 80.1550], {
      color: 'transparent',
      fillColor: '#EF4444',
      fillOpacity: 0.3,
      radius: 150
    }).addTo(map);

    // 6. Simulation Loop
    const intervalId = setInterval(() => {
      if (!isLive) return;

      entitiesRef.current = entitiesRef.current.map(entity => {
        if (entity.type === 'mobile') {
          // Calculate random movement
          // Roughly 0.0002 deg is about 20 meters
          const deltaLat = (Math.random() - 0.5) * 0.0002; 
          const deltaLng = (Math.random() - 0.5) * 0.0002;
          
          const newLat = entity.lat + deltaLat;
          const newLng = entity.lng + deltaLng;

          // Update Leaflet Marker directly
          if (markersRef.current[entity.id]) {
            markersRef.current[entity.id].setLatLng([newLat, newLng]);
          }

          return { ...entity, lat: newLat, lng: newLng };
        }
        return entity;
      });
    }, 1500); // Update every 1.5 seconds

    return () => {
      clearInterval(intervalId);
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [isLive]);

  return (
    <div className="w-[70%] h-full relative overflow-hidden rounded-br-[40px] bg-[#F1F5F9]">
      
      {/* Interactive Map Container */}
      <div id="map" ref={mapContainerRef} className="w-full h-full z-0" />

      {/* Live Indicator */}
      <div className="absolute top-6 left-6 z-[400] bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-md flex items-center gap-2 border border-gray-100">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span>
          <span className="text-[10px] font-bold text-gray-700 tracking-wider">LIVE VIEW</span>
      </div>

      {/* Overlay UI: Compass & Scale */}
      <div className="absolute top-6 right-6 flex flex-col items-center gap-2 z-[400] pointer-events-none">
         <div className="bg-white p-2 rounded-full shadow-lg border border-gray-100">
             <Compass size={24} className="text-gray-400" />
         </div>
         <div className="flex flex-col items-center">
             <div className="h-2 w-[1px] bg-gray-400" />
             <div className="w-12 h-1 bg-gray-400" />
             <div className="h-2 w-[1px] bg-gray-400" />
             <span className="text-[10px] font-bold text-gray-500 mt-1">500m</span>
         </div>
      </div>

      {/* Overlay UI: Legend */}
      <div className="absolute bottom-6 left-6 bg-white/80 backdrop-blur-md border border-white/50 rounded-2xl p-4 shadow-lg w-48 z-[400]">
          <div className="flex items-center gap-2 mb-2 border-b border-gray-200 pb-2">
             <Info size={14} className="text-gray-500" />
             <span className="text-xs font-bold text-gray-700">Map Legend</span>
          </div>
          <div className="space-y-2">
              <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/30 border border-red-500" />
                  <span className="text-[10px] font-medium text-gray-600">High Distress</span>
              </div>
              <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-sm bg-[#0EA5E9]/30 border border-[#0EA5E9] border-dashed" />
                  <span className="text-[10px] font-medium text-gray-600">Flood Extent</span>
              </div>
          </div>
      </div>

      {/* Zoom & Location Controls */}
      <div className="absolute bottom-6 right-6 flex flex-col gap-2 z-[400]">
        <button 
          onClick={handleLocateMe}
          title="Locate Me"
          className="bg-white p-2.5 rounded-xl shadow-lg hover:bg-gray-50 cursor-pointer transition active:scale-95 mb-2 group text-blue-500"
        >
            <Locate size={18} className={`${userLocation ? 'text-blue-500' : 'text-gray-400'}`} />
        </button>

        <button 
          onClick={handleZoomIn}
          className="bg-white p-2.5 rounded-xl shadow-lg hover:bg-gray-50 cursor-pointer transition active:scale-95"
        >
            <Plus size={18} className="text-gray-600" />
        </button>
        <button 
          onClick={handleZoomOut}
          className="bg-white p-2.5 rounded-xl shadow-lg hover:bg-gray-50 cursor-pointer transition active:scale-95"
        >
            <Minus size={18} className="text-gray-600" />
        </button>
      </div>

    </div>
  );
};