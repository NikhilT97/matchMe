import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Heart, Users, MessageCircle, Search, Star, TrendingUp } from 'lucide-react';
import { fetchProfile } from '../features/profile/profileSlice';
import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { currentUser } = useAuth();
  const { profile, isLoading } = useSelector((state) => state.profile);
  
  useEffect(() => {
    if (currentUser) {
      dispatch(fetchProfile(currentUser.uid));
    }
  }, [dispatch, currentUser]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Heart className="h-16 w-16 text-pink-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Complete Your Profile</h2>
          <p className="text-gray-600 mb-4">
            Please complete your profile to start finding matches
          </p>
          <Link
            to="/complete-profile"
            className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
          >
            Complete Profile
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl p-8 text-white mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Welcome back, {profile.name}! 👋
              </h1>
              <p className="text-pink-100">
                Ready to find your perfect match today?
              </p>
            </div>
            <div className="hidden md:block">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold">95%</div>
                <div className="text-sm text-pink-100">Profile Complete</div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Profile Views</p>
                <p className="text-2xl font-bold text-gray-900">127</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <p className="text-sm text-green-600 mt-2">+12% this week</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">New Matches</p>
                <p className="text-2xl font-bold text-gray-900">8</p>
              </div>
              <div className="bg-pink-100 p-3 rounded-full">
                <Heart className="h-6 w-6 text-pink-600" />
              </div>
            </div>
            <p className="text-sm text-green-600 mt-2">+3 today</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Messages</p>
                <p className="text-2xl font-bold text-gray-900">24</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <MessageCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <p className="text-sm text-green-600 mt-2">5 unread</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Likes Received</p>
                <p className="text-2xl font-bold text-gray-900">156</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <Star className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <p className="text-sm text-green-600 mt-2">+18 this week</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Link
            to="/search"
            className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-1 group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-3 rounded-full">
                <Search className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl">🔍</div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Find Matches</h3>
            <p className="text-gray-600">
              Discover compatible partners based on your preferences
            </p>
          </Link>
          
          <Link
            to="/chat"
            className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-1 group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="bg-gradient-to-r from-green-500 to-teal-600 p-3 rounded-full">
                <MessageCircle className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl">💬</div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Chat</h3>
            <p className="text-gray-600">
              Connect with your matches through secure messaging
            </p>
          </Link>
          
          <Link
            to="/premium"
            className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-1 group text-white"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full">
                <Star className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl">✨</div>
            </div>
            <h3 className="text-xl font-semibold mb-2">Go Premium</h3>
            <p className="text-orange-100">
              Unlock advanced features and boost your profile
            </p>
          </Link>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
              <div className="bg-pink-100 p-2 rounded-full">
                <Heart className="h-5 w-5 text-pink-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  Sarah liked your profile
                </p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
              <div className="bg-green-100 p-2 rounded-full">
                <MessageCircle className="h-5 w-5 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  New message from Emma
                </p>
                <p className="text-xs text-gray-500">4 hours ago</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
              <div className="bg-blue-100 p-2 rounded-full">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  3 new profile views
                </p>
                <p className="text-xs text-gray-500">Yesterday</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;