import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, Tag, ArrowRight, Search } from 'lucide-react';
import { motion } from 'framer-motion';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const blogPosts = [
    {
      id: 1,
      title: 'Ultimate Guide to Trekking in the Himalayas',
      excerpt: 'Everything you need to know about preparing for and completing a Himalayan trek, from gear selection to altitude acclimatization.',
      author: 'Sarah Johnson',
      date: '2024-02-15',
      category: 'Adventure',
      image: 'https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg?auto=compress&cs=tinysrgb&w=600',
      readTime: '8 min read',
      featured: true
    },
    {
      id: 2,
      title: 'Best Safari Destinations in Africa',
      excerpt: 'Discover the top safari destinations across Africa and learn what makes each location unique for wildlife viewing.',
      author: 'Mike Chen',
      date: '2024-02-10',
      category: 'Wildlife',
      image: 'https://images.pexels.com/photos/631317/pexels-photo-631317.jpeg?auto=compress&cs=tinysrgb&w=600',
      readTime: '6 min read',
      featured: false
    },
    {
      id: 3,
      title: 'European City Hopping: A Complete Itinerary',
      excerpt: 'Plan the perfect European adventure with our comprehensive guide to the must-visit cities and hidden gems.',
      author: 'Emma Davis',
      date: '2024-02-05',
      category: 'Cultural',
      image: 'https://images.pexels.com/photos/2416653/pexels-photo-2416653.jpeg?auto=compress&cs=tinysrgb&w=600',
      readTime: '10 min read',
      featured: false
    },
    {
      id: 4,
      title: 'Sustainable Travel: How to Minimize Your Impact',
      excerpt: 'Learn practical tips for traveling responsibly and reducing your environmental footprint while exploring the world.',
      author: 'David Wilson',
      date: '2024-01-30',
      category: 'Tips',
      image: 'https://images.pexels.com/photos/1591373/pexels-photo-1591373.jpeg?auto=compress&cs=tinysrgb&w=600',
      readTime: '7 min read',
      featured: false
    },
    {
      id: 5,
      title: 'Photography Tips for Travel Enthusiasts',
      excerpt: 'Capture stunning travel photos with these professional tips and techniques for landscape and portrait photography.',
      author: 'Lisa Anderson',
      date: '2024-01-25',
      category: 'Photography',
      image: 'https://images.pexels.com/photos/1604869/pexels-photo-1604869.jpeg?auto=compress&cs=tinysrgb&w=600',
      readTime: '9 min read',
      featured: false
    },
    {
      id: 6,
      title: 'Budget Travel: Exploring the World on a Shoestring',
      excerpt: 'Discover how to travel the world without breaking the bank with these money-saving tips and budget-friendly destinations.',
      author: 'Tom Rodriguez',
      date: '2024-01-20',
      category: 'Tips',
      image: 'https://images.pexels.com/photos/975771/pexels-photo-975771.jpeg?auto=compress&cs=tinysrgb&w=600',
      readTime: '5 min read',
      featured: false
    }
  ];

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'Adventure', label: 'Adventure' },
    { value: 'Cultural', label: 'Cultural' },
    { value: 'Wildlife', label: 'Wildlife' },
    { value: 'Tips', label: 'Travel Tips' },
    { value: 'Photography', label: 'Photography' }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Adventure': return 'bg-red-100 text-red-800';
      case 'Wildlife': return 'bg-green-100 text-green-800';
      case 'Cultural': return 'bg-purple-100 text-purple-800';
      case 'Tips': return 'bg-blue-100 text-blue-800';
      case 'Photography': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Travel Blog</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover travel tips, destination guides, and inspiring stories from fellow adventurers.
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white rounded-lg shadow-sm p-6 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Featured Post */}
        {featuredPost && selectedCategory === 'all' && !searchTerm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-64 md:h-full object-cover"
                  />
                </div>
                <div className="md:w-1/2 p-8">
                  <div className="flex items-center space-x-2 mb-4">
                    <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full font-medium">
                      Featured
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${getCategoryColor(featuredPost.category)}`}>
                      {featuredPost.category}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">{featuredPost.title}</h2>
                  <p className="text-gray-600 mb-4">{featuredPost.excerpt}</p>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <User className="h-4 w-4" />
                        <span>{featuredPost.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(featuredPost.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">{featuredPost.readTime}</span>
                  </div>
                  <Link
                    to={`/blog/${featuredPost.id}`}
                    className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-semibold"
                  >
                    <span>Read More</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all transform hover:-translate-y-1"
            >
              <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${post.image})` }}>
                <div className="h-full bg-gradient-to-t from-black/50 to-transparent flex items-end">
                  <div className="p-4">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${getCategoryColor(post.category)}`}>
                      {post.category}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">{post.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                
                <div className="flex items-center justify-between mb-4 text-xs text-gray-500">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1">
                      <User className="h-3 w-3" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <span>{post.readTime}</span>
                </div>
                
                <Link
                  to={`/blog/${post.id}`}
                  className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-semibold text-sm"
                >
                  <span>Read More</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No articles match your search criteria.</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
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

export default Blog;