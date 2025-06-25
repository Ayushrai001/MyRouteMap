import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, Tag, ArrowLeft, Share2, Heart, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const BlogPost = () => {
  const { id } = useParams();

  // Mock blog post data - in a real app, fetch from API
  const post = {
    id: Number(id),
    title: 'Ultimate Guide to Trekking in the Himalayas',
    content: `
      <p>The Himalayas represent one of the most spectacular mountain ranges on Earth, offering trekkers an unparalleled adventure through diverse landscapes, rich cultures, and breathtaking vistas. Whether you're a seasoned mountaineer or a passionate hiker looking for your next challenge, the Himalayas provide experiences that will stay with you for a lifetime.</p>

      <h2>Planning Your Himalayan Adventure</h2>
      <p>Proper planning is crucial for a successful Himalayan trek. The region's extreme altitude, unpredictable weather, and remote locations demand careful preparation and respect for the mountain environment.</p>

      <h3>Best Time to Trek</h3>
      <p>The optimal trekking seasons in the Himalayas are:</p>
      <ul>
        <li><strong>Pre-monsoon (March-May):</strong> Clear skies, blooming rhododendrons, but can be crowded</li>
        <li><strong>Post-monsoon (September-November):</strong> Excellent visibility, stable weather, ideal conditions</li>
        <li><strong>Winter (December-February):</strong> Clear views but extremely cold, suitable only for experienced trekkers</li>
      </ul>

      <h3>Essential Gear and Equipment</h3>
      <p>Your gear can make or break your Himalayan experience. Here's what you absolutely need:</p>
      <ul>
        <li>High-quality trekking boots with ankle support</li>
        <li>Layered clothing system for temperature regulation</li>
        <li>Sleeping bag rated for sub-zero temperatures</li>
        <li>Trekking poles for stability and joint protection</li>
        <li>Headlamp with extra batteries</li>
        <li>First aid kit and personal medications</li>
      </ul>

      <h2>Acclimatization and Altitude Sickness</h2>
      <p>Altitude sickness is a serious concern when trekking above 3,000 meters. Understanding the symptoms and prevention strategies is essential for your safety.</p>

      <h3>Symptoms to Watch For</h3>
      <ul>
        <li>Headaches and dizziness</li>
        <li>Nausea and loss of appetite</li>
        <li>Fatigue and weakness</li>
        <li>Difficulty sleeping</li>
      </ul>

      <h3>Prevention Strategies</h3>
      <p>Follow these guidelines to minimize your risk:</p>
      <ul>
        <li>Ascend gradually - don't gain more than 500m sleeping altitude per day above 3,000m</li>
        <li>Stay hydrated but avoid alcohol</li>
        <li>Listen to your body and don't ignore symptoms</li>
        <li>Consider altitude sickness medication (consult your doctor)</li>
      </ul>

      <h2>Cultural Considerations</h2>
      <p>The Himalayas are home to diverse cultures and communities. Respecting local customs and traditions enhances your experience and supports local communities.</p>

      <h3>Interacting with Local Communities</h3>
      <ul>
        <li>Learn basic greetings in the local language</li>
        <li>Dress modestly, especially when visiting monasteries</li>
        <li>Ask permission before photographing people</li>
        <li>Support local businesses and guides</li>
      </ul>

      <h2>Environmental Responsibility</h2>
      <p>The fragile Himalayan ecosystem requires our protection. Follow Leave No Trace principles:</p>
      <ul>
        <li>Pack out all trash, including biodegradable waste</li>
        <li>Use established campsites and trails</li>
        <li>Respect wildlife and maintain distance</li>
        <li>Use eco-friendly products when possible</li>
      </ul>

      <h2>Conclusion</h2>
      <p>Trekking in the Himalayas is more than just a physical challenge - it's a journey of personal discovery, cultural immersion, and natural wonder. With proper preparation, respect for the environment and local cultures, and a spirit of adventure, your Himalayan trek will become one of life's most treasured experiences.</p>

      <p>Remember, the mountains will always be there, but your safety should never be compromised. Take your time, enjoy the journey, and let the majesty of the Himalayas transform you.</p>
    `,
    author: 'Sarah Johnson',
    date: '2024-02-15',
    category: 'Adventure',
    image: 'https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg?auto=compress&cs=tinysrgb&w=1200',
    readTime: '8 min read',
    tags: ['Himalayas', 'Trekking', 'Adventure', 'Nepal', 'Mountain Climbing'],
    likes: 127,
    comments: 23
  };

  const relatedPosts = [
    {
      id: 2,
      title: 'Best Safari Destinations in Africa',
      image: 'https://images.pexels.com/photos/631317/pexels-photo-631317.jpeg?auto=compress&cs=tinysrgb&w=300',
      category: 'Wildlife'
    },
    {
      id: 3,
      title: 'European City Hopping: A Complete Itinerary',
      image: 'https://images.pexels.com/photos/2416653/pexels-photo-2416653.jpeg?auto=compress&cs=tinysrgb&w=300',
      category: 'Cultural'
    },
    {
      id: 4,
      title: 'Sustainable Travel: How to Minimize Your Impact',
      image: 'https://images.pexels.com/photos/1591373/pexels-photo-1591373.jpeg?auto=compress&cs=tinysrgb&w=300',
      category: 'Tips'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Link
            to="/blog"
            className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Blog</span>
          </Link>
        </motion.div>

        {/* Article Header */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden mb-8"
        >
          <div className="h-64 md:h-96 bg-cover bg-center" style={{ backgroundImage: `url(${post.image})` }}>
            <div className="h-full bg-gradient-to-t from-black/70 to-transparent flex items-end">
              <div className="p-8 text-white">
                <div className="flex items-center space-x-2 mb-4">
                  <span className="bg-blue-600 text-white text-sm px-3 py-1 rounded-full font-medium">
                    {post.category}
                  </span>
                  <span className="text-sm opacity-90">{post.readTime}</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
                <div className="flex items-center space-x-6 text-sm">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(post.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Article Actions */}
          <div className="px-8 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <button className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors">
                  <Heart className="h-5 w-5" />
                  <span>{post.likes}</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 transition-colors">
                  <MessageCircle className="h-5 w-5" />
                  <span>{post.comments}</span>
                </button>
              </div>
              <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 transition-colors">
                <Share2 className="h-5 w-5" />
                <span>Share</span>
              </button>
            </div>
          </div>

          {/* Article Content */}
          <div className="p-8">
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Tags */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="flex items-center space-x-2 mb-4">
                <Tag className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Tags:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.article>

        {/* Related Posts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((relatedPost) => (
              <Link
                key={relatedPost.id}
                to={`/blog/${relatedPost.id}`}
                className="group block"
              >
                <div className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                  <img
                    src={relatedPost.image}
                    alt={relatedPost.title}
                    className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="p-4">
                    <span className="text-xs text-blue-600 font-medium">{relatedPost.category}</span>
                    <h4 className="font-semibold text-gray-900 mt-1 group-hover:text-blue-600 transition-colors">
                      {relatedPost.title}
                    </h4>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BlogPost;