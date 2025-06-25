import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, MapPin, Calendar, Users, Clock, Camera, Shield, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const TourDetails = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);

  // Mock tour data - in a real app, fetch from API
  const tour = {
    id: Number(id),
    title: 'Himalayan Adventure Trek',
    location: 'Nepal',
    price: 1299,
    rating: 4.9,
    reviews: 156,
    duration: '14 days',
    maxGroupSize: 12,
    difficulty: 'Moderate',
    images: [
      'https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2559941/pexels-photo-2559941.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1133957/pexels-photo-1133957.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2670898/pexels-photo-2670898.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    description: 'Embark on the adventure of a lifetime with our Himalayan Adventure Trek. This carefully crafted journey takes you through some of the most breathtaking landscapes on Earth, from lush valleys to snow-capped peaks.',
    highlights: [
      'Professional certified guides',
      'All meals and accommodation included',
      'Small group sizes for personalized experience',
      'Safety equipment provided',
      'Cultural immersion opportunities',
      '24/7 support during the trek'
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Kathmandu', description: 'Welcome dinner and trip briefing' },
      { day: 2, title: 'Fly to Lukla, Trek to Phakding', description: 'Scenic mountain flight and first day of trekking' },
      { day: 3, title: 'Trek to Namche Bazaar', description: 'Cross suspension bridges and climb to the Sherpa capital' },
      { day: 4, title: 'Acclimatization Day', description: 'Rest day with optional hikes for acclimatization' },
      { day: 5, title: 'Trek to Tengboche', description: 'Visit the famous monastery with Mt. Everest views' }
    ],
    included: [
      'Airport transfers',
      'All accommodation (hotels and tea houses)',
      'All meals during the trek',
      'Professional English-speaking guide',
      'Porter service',
      'All necessary permits',
      'First aid kit and safety equipment'
    ],
    notIncluded: [
      'International flights',
      'Travel insurance',
      'Personal trekking equipment',
      'Tips for guides and porters',
      'Personal expenses and souvenirs'
    ]
  };

  const reviews = [
    {
      id: 1,
      name: 'Sarah Johnson',
      rating: 5,
      date: '2024-01-15',
      comment: 'Absolutely incredible experience! The guides were knowledgeable and the views were breathtaking. Would definitely recommend this tour to anyone seeking adventure.',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100'
    },
    {
      id: 2,
      name: 'Mike Chen',
      rating: 5,
      date: '2024-01-10',
      comment: 'Well-organized trek with excellent support. The small group size made it feel personal and the accommodations were better than expected.',
      avatar: 'https://images.pexels.com/photos/2741701/pexels-photo-2741701.jpeg?auto=compress&cs=tinysrgb&w=100'
    },
    {
      id: 3,
      name: 'Emma Davis',
      rating: 4,
      date: '2024-01-05',
      comment: 'Great experience overall. The trek was challenging but rewarding. Guide was very helpful and safety was clearly a priority.',
      avatar: 'https://images.pexels.com/photos/3307758/pexels-photo-3307758.jpeg?auto=compress&cs=tinysrgb&w=100'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li><Link to="/" className="hover:text-blue-600">Home</Link></li>
            <li>/</li>
            <li><Link to="/tours" className="hover:text-blue-600">Tours</Link></li>
            <li>/</li>
            <li className="text-gray-900">{tour.title}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden mb-8"
            >
              <div className="h-96 bg-cover bg-center" style={{ backgroundImage: `url(${tour.images[selectedImage]})` }}>
                <div className="h-full bg-gradient-to-t from-black/50 to-transparent flex items-end">
                  <div className="p-6 text-white">
                    <div className="flex items-center space-x-2 mb-2">
                      <Camera className="h-5 w-5" />
                      <span className="text-sm">Photo {selectedImage + 1} of {tour.images.length}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex space-x-2 overflow-x-auto">
                  {tour.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === index ? 'border-blue-500' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <img src={image} alt={`Tour ${index + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Tour Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6 mb-8"
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{tour.title}</h1>
                  <div className="flex items-center space-x-4 text-gray-600">
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>{tour.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span>{tour.rating}</span>
                      <span>({tour.reviews} reviews)</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-blue-600">${tour.price}</div>
                  <div className="text-gray-500">per person</div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <Calendar className="h-6 w-6 text-blue-600 mx-auto mb-1" />
                  <div className="text-sm font-medium text-gray-900">{tour.duration}</div>
                  <div className="text-xs text-gray-500">Duration</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <Users className="h-6 w-6 text-blue-600 mx-auto mb-1" />
                  <div className="text-sm font-medium text-gray-900">{tour.maxGroupSize} people</div>
                  <div className="text-xs text-gray-500">Max Group</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <Award className="h-6 w-6 text-blue-600 mx-auto mb-1" />
                  <div className="text-sm font-medium text-gray-900">{tour.difficulty}</div>
                  <div className="text-xs text-gray-500">Difficulty</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <Shield className="h-6 w-6 text-blue-600 mx-auto mb-1" />
                  <div className="text-sm font-medium text-gray-900">Certified</div>
                  <div className="text-xs text-gray-500">Guide</div>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed">{tour.description}</p>
            </motion.div>

            {/* Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-xl shadow-lg p-6 mb-8"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">Tour Highlights</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {tour.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span className="text-gray-700">{highlight}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Itinerary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-xl shadow-lg p-6 mb-8"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-6">Itinerary</h3>
              <div className="space-y-4">
                {tour.itinerary.map((day, index) => (
                  <div key={index} className="flex space-x-4 p-4 border border-gray-200 rounded-lg">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
                      {day.day}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{day.title}</h4>
                      <p className="text-gray-600 text-sm">{day.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* What's Included */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-xl shadow-lg p-6 mb-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-bold text-green-600 mb-4">What's Included</h3>
                  <ul className="space-y-2">
                    {tour.included.map((item, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-gray-700 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-red-600 mb-4">Not Included</h3>
                  <ul className="space-y-2">
                    {tour.notIncluded.map((item, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <span className="text-gray-700 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Reviews */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Reviews</h3>
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                    <div className="flex items-start space-x-4">
                      <img
                        src={review.avatar}
                        alt={review.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-gray-900">{review.name}</h4>
                          <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-700 text-sm mb-2">{review.comment}</p>
                        <p className="text-gray-400 text-xs">{review.date}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Booking Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-blue-600 mb-1">${tour.price}</div>
                <div className="text-gray-500">per person</div>
              </div>

              <Link
                to={`/booking/${tour.id}`}
                className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-3 rounded-lg font-semibold transition-colors mb-4"
              >
                Book Now
              </Link>

              <div className="text-center text-sm text-gray-500 mb-6">
                Free cancellation up to 24 hours before departure
              </div>

              <div className="border-t pt-6">
                <h4 className="font-semibold text-gray-900 mb-4">Need Help?</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Response time:</span>
                    <span className="text-gray-900">Within 2 hours</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Phone:</span>
                    <span className="text-gray-900">+1 (555) 123-4567</span>
                  </div>
                  <button className="w-full mt-4 border border-blue-600 text-blue-600 hover:bg-blue-50 py-2 rounded-lg font-semibold transition-colors">
                    Contact Us
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TourDetails;