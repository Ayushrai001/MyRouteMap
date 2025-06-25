import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import { MapPin, Navigation, Compass } from 'lucide-react';
import { motion } from 'framer-motion';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
const customIcon = new Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const MapPage = () => {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [selectedDestination, setSelectedDestination] = useState<any>(null);

  const destinations = [
    {
      id: 1,
      name: 'Mount Everest Base Camp',
      country: 'Nepal',
      coordinates: [28.0026, 86.8528] as [number, number],
      type: 'Adventure',
      description: 'Experience the ultimate trekking adventure to the base of the world\'s highest peak.',
      image: 'https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: 2,
      name: 'Masai Mara National Reserve',
      country: 'Kenya',
      coordinates: [-1.4061, 35.0022] as [number, number],
      type: 'Wildlife',
      description: 'Witness the great migration and spot the Big Five in this iconic safari destination.',
      image: 'https://images.pexels.com/photos/631317/pexels-photo-631317.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: 3,
      name: 'Santorini',
      country: 'Greece',
      coordinates: [36.3932, 25.4615] as [number, number],
      type: 'Beach',
      description: 'Stunning sunsets, white-washed buildings, and crystal-clear waters.',
      image: 'https://images.pexels.com/photos/2416653/pexels-photo-2416653.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: 4,
      name: 'Machu Picchu',
      country: 'Peru',
      coordinates: [-13.1631, -72.5450] as [number, number],
      type: 'Cultural',
      description: 'Ancient Incan citadel set high in the Andes Mountains.',
      image: 'https://images.pexels.com/photos/2356045/pexels-photo-2356045.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: 5,
      name: 'Bora Bora',
      country: 'French Polynesia',
      coordinates: [-16.5004, -151.7415] as [number, number],
      type: 'Beach',
      description: 'Paradise on earth with overwater bungalows and turquoise lagoons.',
      image: 'https://images.pexels.com/photos/1591373/pexels-photo-1591373.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: 6,
      name: 'Kyoto',
      country: 'Japan',
      coordinates: [35.0116, 135.7681] as [number, number],
      type: 'Cultural',
      description: 'Ancient temples, traditional gardens, and rich cultural heritage.',
      image: 'https://images.pexels.com/photos/1604869/pexels-photo-1604869.jpeg?auto=compress&cs=tinysrgb&w=300'
    }
  ];

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          console.log('Error getting location:', error);
          // Default to New York if location access is denied
          setUserLocation([40.7128, -74.0060]);
        }
      );
    } else {
      // Default to New York if geolocation is not supported
      setUserLocation([40.7128, -74.0060]);
    }
  }, []);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Adventure': return 'bg-red-100 text-red-800';
      case 'Wildlife': return 'bg-green-100 text-green-800';
      case 'Beach': return 'bg-blue-100 text-blue-800';
      case 'Cultural': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!userLocation) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Compass className="h-12 w-12 text-blue-600 mx-auto mb-4 animate-spin" />
          <p className="text-gray-600">Loading map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Explore Destinations</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover amazing travel destinations around the world and plan your next adventure.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Destination List */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-xl shadow-lg p-6 h-[600px] overflow-y-auto">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-blue-600" />
                Destinations
              </h3>
              <div className="space-y-4">
                {destinations.map((destination) => (
                  <div
                    key={destination.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                      selectedDestination?.id === destination.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedDestination(destination)}
                  >
                    <div className="flex items-start space-x-3">
                      <img
                        src={destination.image}
                        alt={destination.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 text-sm">{destination.name}</h4>
                        <p className="text-gray-500 text-xs">{destination.country}</p>
                        <span className={`inline-block mt-1 px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(destination.type)}`}>
                          {destination.type}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="h-[600px]">
                <MapContainer
                  center={userLocation}
                  zoom={2}
                  className="h-full w-full"
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  
                  {/* User location marker */}
                  <Marker position={userLocation} icon={customIcon}>
                    <Popup>
                      <div className="text-center">
                        <Navigation className="h-4 w-4 mx-auto mb-1 text-blue-600" />
                        <p className="font-medium">Your Location</p>
                      </div>
                    </Popup>
                  </Marker>

                  {/* Destination markers */}
                  {destinations.map((destination) => (
                    <Marker
                      key={destination.id}
                      position={destination.coordinates}
                      icon={customIcon}
                      eventHandlers={{
                        click: () => setSelectedDestination(destination)
                      }}
                    >
                      <Popup>
                        <div className="w-64">
                          <img
                            src={destination.image}
                            alt={destination.name}
                            className="w-full h-32 object-cover rounded-lg mb-2"
                          />
                          <h4 className="font-semibold text-gray-900">{destination.name}</h4>
                          <p className="text-gray-600 text-sm mb-2">{destination.country}</p>
                          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(destination.type)}`}>
                            {destination.type}
                          </span>
                          <p className="text-gray-600 text-sm mt-2">{destination.description}</p>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Selected Destination Details */}
        {selectedDestination && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-8 bg-white rounded-xl shadow-lg p-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <img
                  src={selectedDestination.image}
                  alt={selectedDestination.name}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{selectedDestination.name}</h3>
                    <p className="text-gray-600">{selectedDestination.country}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(selectedDestination.type)}`}>
                    {selectedDestination.type}
                  </span>
                </div>
                <p className="text-gray-700 mb-6">{selectedDestination.description}</p>
                <div className="flex space-x-4">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
                    View Tours
                  </button>
                  <button className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-2 rounded-lg font-semibold transition-colors">
                    Get Directions
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MapPage;