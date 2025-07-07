import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Heart, Search, MessageCircle, User, Crown, LogOut } from 'lucide-react';
import { logoutUser } from '../features/auth/authSlice';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const Navbar = () => {
  const { currentUser } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      toast.success('Logged out successfully');
      navigate('/');
    } catch (error) {
      toast.error('Error logging out');
    }
  };

  const isActive = (path) => location.pathname === path;

  if (!currentUser) {
    return (
      <nav className="bg-white/90 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-pink-500" />
              <span className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                MatchMe
              </span>
            </Link>
            
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="text-gray-700 hover:text-pink-500 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-200"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-white/90 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/dashboard" className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-pink-500" />
            <span className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              MatchMe
            </span>
          </Link>
          
          <div className="flex items-center space-x-6">
            <Link
              to="/search"
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all ${
                isActive('/search') 
                  ? 'bg-pink-100 text-pink-600' 
                  : 'text-gray-700 hover:text-pink-500'
              }`}
            >
              <Search className="h-5 w-5" />
              <span className="hidden sm:inline">Search</span>
            </Link>
            
            <Link
              to="/chat"
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all ${
                isActive('/chat') 
                  ? 'bg-pink-100 text-pink-600' 
                  : 'text-gray-700 hover:text-pink-500'
              }`}
            >
              <MessageCircle className="h-5 w-5" />
              <span className="hidden sm:inline">Chat</span>
            </Link>
            
            <Link
              to="/premium"
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all ${
                isActive('/premium') 
                  ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white' 
                  : 'text-gray-700 hover:text-orange-500'
              }`}
            >
              <Crown className="h-5 w-5" />
              <span className="hidden sm:inline">Premium</span>
            </Link>
            
            <Link
              to="/profile"
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all ${
                isActive('/profile') 
                  ? 'bg-pink-100 text-pink-600' 
                  : 'text-gray-700 hover:text-pink-500'
              }`}
            >
              <User className="h-5 w-5" />
              <span className="hidden sm:inline">Profile</span>
            </Link>
            
            <button
              onClick={handleLogout}
              className="flex items-center space-x-1 px-3 py-2 rounded-lg text-gray-700 hover:text-red-500 transition-all"
            >
              <LogOut className="h-5 w-5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;