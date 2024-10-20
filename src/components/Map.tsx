import React, { useEffect, useRef } from 'react';

interface MapProps {
  pickup: string;
  dropoff: string;
}

declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

const Map: React.FC<MapProps> = ({ pickup, dropoff }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const googleMapRef = useRef<google.maps.Map | null>(null);

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&callback=initMap`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    };

    window.initMap = () => {
      if (mapRef.current) {
        googleMapRef.current = new window.google.maps.Map(mapRef.current, {
          center: { lat: 16.994444, lng: 73.300003 }, // Ratnagiri coordinates
          zoom: 13,
        });
      }
    };

    if (!window.google) {
      loadGoogleMapsScript();
    } else {
      window.initMap();
    }
  }, []);

  useEffect(() => {
    if (googleMapRef.current && pickup && dropoff) {
      const directionsService = new window.google.maps.DirectionsService();
      const directionsRenderer = new window.google.maps.DirectionsRenderer();

      directionsRenderer.setMap(googleMapRef.current);

      directionsService.route(
        {
          origin: pickup,
          destination: dropoff,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result: any, status: any) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            directionsRenderer.setDirections(result);
          }
        }
      );
    }
  }, [pickup, dropoff]);

  return <div ref={mapRef} className="w-full h-96 rounded-lg shadow-md" />;
};

export default Map;