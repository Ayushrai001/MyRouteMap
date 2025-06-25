import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Calendar, Search, Filter, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';

const Tours = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');

  const tours = [
    {
      id: 1,
      title: 'Himalayan Adventure Trek',
      location: 'Nepal',
      price: 1299,
      rating: 4.9,
      reviews: 156,
      image: 'https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg?auto=compress&cs=tinysrgb&w=500',
      duration: '14 days',
      category: 'adventure',
      description: 'Experience the majestic Himalayas with expert guides and breathtaking views.'
    },
    {
      id: 2,
      title: 'Safari Experience',
      location: 'Kenya',
      price: 2199,
      rating: 4.8,
      reviews: 89,
      image: 'https://images.pexels.com/photos/631317/pexels-photo-631317.jpeg?auto=compress&cs=tinysrgb&w=500',
      duration: '10 days',
      category: 'wildlife',
      description: 'Witness the Big Five in their natural habitat on this incredible safari adventure.'
    },
    {
      id: 3,
      title: 'European City Tour',
      location: 'Europe',
      price: 1899,
      rating: 4.7,
      reviews: 234,
      image: 'https://images.pexels.com/photos/2416653/pexels-photo-2416653.jpeg?auto=compress&cs=tinysrgb&w=500',
      duration: '12 days',
      category: 'cultural',
      description: 'Discover the rich history and culture of Europe\'s most beautiful cities.'
    },
    {
      id: 4,
      title: 'Tropical Paradise Escape',
      location: 'Maldives',
      price: 2599,
      rating: 4.9,
      reviews: 167,
      image: 'https://images.pexels.com/photos/1591373/pexels-photo-1591373.jpeg?auto=compress&cs=tinysrgb&w=500',
      duration: '7 days',
      category: 'beach',
      description: 'Relax in overwater bungalows and enjoy pristine beaches in paradise.'
    },
    {
      id: 5,
      title: 'Amazon Rainforest Expedition',
      location: 'Brazil',
      price: 1799,
      rating: 4.6,
      reviews: 98,
      image: 'https://images.pexels.com/photos/975771/pexels-photo-975771.jpeg?auto=compress&cs=tinysrgb&w=500',
      duration: '9 days',
      category: 'adventure',
      description: 'Explore the world\'s largest rainforest and discover incredible biodiversity.'
    },
    {
      id: 6,
      title: 'Japanese Cultural Journey',
      location: 'Japan',
      price: 2299,
      rating: 4.8,
      reviews: 145,
      image: 'https://images.pexels.com/photos/1604869/pexels-photo-1604869.jpeg?auto=compress&cs=tinysrgb&w=500',
      duration: '11 days',
      category: 'cultural',
      description: 'Immerse yourself in Japanese culture, from ancient temples to modern cities.'
    }
  ];

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'adventure', label: 'Adventure' },
    { value: 'cultural', label: 'Cultural' },
    { value: 'wildlife', label: 'Wildlife' },
    { value: 'beach', label: 'Beach' }
  ];

  const priceRanges = [
    { value: 'all', label: 'All Prices' },
    { value: '0-1000', label: 'Under $1,000' },
    { value: '1000-2000', label: '$1,000 - $2,000' },
    { value: '2000+', label: 'Over $2,000' }
  ];

  const filteredTours = tours.filter(tour => {
    const matchesSearch = tour.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tour.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || tour.category === selectedCategory;
    
    const matchesPrice = priceRange === 'all' ||
                        (priceRange === '0-1000' && tour.price < 1000) ||
                        (priceRange === '1000-2000' && tour.price >= 1000 && tour.price <= 2000) ||
                        (priceRange === '2000+' && tour.price > 2000);
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Discover Amazing Tours</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find your perfect adventure from our collection of carefully curated tour packages.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white rounded-lg shadow-sm p-6 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search tours..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Filter */}
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
              >
                {priceRanges.map(range => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Tours Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTours.map((tour, index) => (
            <motion.div
              key={tour.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all transform hover:-translate-y-1"
            >
              <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${tour.image})` }}>
                <div className="h-full bg-gradient-to-t from-black/50 to-transparent flex items-end">
                  <div className="p-4">
                    <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                      {tour.category.charAt(0).toUpperCase() + tour.category.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-500">{tour.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600">{tour.rating}</span>
                    <span className="text-sm text-gray-400">({tour.reviews})</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{tour.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{tour.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-500">{tour.duration}</span>
                  </div>
                  <span className="text-2xl font-bold text-blue-600">${tour.price}</span>
                </div>
                
                <Link
                  to={`/tours/${tour.id}`}
                  className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-3 rounded-lg font-semibold transition-colors"
                >
                  View Details
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredTours.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No tours match your search criteria.</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setPriceRange('all');
              }}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tours;