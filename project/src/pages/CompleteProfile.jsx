import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { User, MapPin, Calendar, GraduationCap, Briefcase, Heart } from 'lucide-react';
import { createProfile } from '../features/profile/profileSlice';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const CompleteProfile = () => {
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    location: '',
    religion: '',
    education: '',
    profession: '',
    bio: '',
    hobbies: '',
    lookingFor: '',
    partnerPreferences: {
      ageRange: [18, 50],
      religion: '',
      location: '',
      education: '',
    },
  });
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { isLoading } = useSelector((state) => state.profile);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.startsWith('preference_')) {
      const prefKey = name.replace('preference_', '');
      setFormData({
        ...formData,
        partnerPreferences: {
          ...formData.partnerPreferences,
          [prefKey]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleRangeChange = (e) => {
    const values = e.target.value.split(',').map(Number);
    setFormData({
      ...formData,
      partnerPreferences: {
        ...formData.partnerPreferences,
        ageRange: values,
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await dispatch(createProfile({
        uid: currentUser.uid,
        profileData: {
          ...formData,
          name: currentUser.displayName,
          email: currentUser.email,
          age: parseInt(formData.age),
          hobbies: formData.hobbies.split(',').map(h => h.trim()),
          isVerified: false,
          isPremium: false,
          profilePicture: null,
          pictures: [],
        },
      })).unwrap();
      
      toast.success('Profile created successfully!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error || 'Failed to create profile');
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <Heart className="h-12 w-12 text-pink-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-900">Complete Your Profile</h2>
          <p className="mt-2 text-gray-600">
            Help us find your perfect match by sharing more about yourself
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-xl shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-2">
                Age
              </label>
              <div className="relative">
                <input
                  type="number"
                  id="age"
                  name="age"
                  required
                  min="18"
                  max="100"
                  value={formData.age}
                  onChange={handleChange}
                  className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
                  placeholder="Enter your age"
                />
                <Calendar className="h-5 w-5 text-gray-400 absolute left-3 top-3.5" />
              </div>
            </div>
            
            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-2">
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                required
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="location"
                  name="location"
                  required
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
                  placeholder="e.g., New York, NY"
                />
                <MapPin className="h-5 w-5 text-gray-400 absolute left-3 top-3.5" />
              </div>
            </div>
            
            <div>
              <label htmlFor="religion" className="block text-sm font-medium text-gray-700 mb-2">
                Religion
              </label>
              <select
                id="religion"
                name="religion"
                required
                value={formData.religion}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
              >
                <option value="">Select Religion</option>
                <option value="christianity">Christianity</option>
                <option value="islam">Islam</option>
                <option value="hinduism">Hinduism</option>
                <option value="buddhism">Buddhism</option>
                <option value="judaism">Judaism</option>
                <option value="other">Other</option>
                <option value="none">No Religion</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="education" className="block text-sm font-medium text-gray-700 mb-2">
                Education
              </label>
              <div className="relative">
                <select
                  id="education"
                  name="education"
                  required
                  value={formData.education}
                  onChange={handleChange}
                  className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
                >
                  <option value="">Select Education</option>
                  <option value="high-school">High School</option>
                  <option value="bachelors">Bachelor's Degree</option>
                  <option value="masters">Master's Degree</option>
                  <option value="phd">PhD</option>
                  <option value="other">Other</option>
                </select>
                <GraduationCap className="h-5 w-5 text-gray-400 absolute left-3 top-3.5" />
              </div>
            </div>
            
            <div>
              <label htmlFor="profession" className="block text-sm font-medium text-gray-700 mb-2">
                Profession
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="profession"
                  name="profession"
                  required
                  value={formData.profession}
                  onChange={handleChange}
                  className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
                  placeholder="e.g., Software Engineer"
                />
                <Briefcase className="h-5 w-5 text-gray-400 absolute left-3 top-3.5" />
              </div>
            </div>
          </div>
          
          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-2">
              About Me
            </label>
            <textarea
              id="bio"
              name="bio"
              rows="4"
              required
              value={formData.bio}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
              placeholder="Tell us about yourself..."
            />
          </div>
          
          <div>
            <label htmlFor="hobbies" className="block text-sm font-medium text-gray-700 mb-2">
              Hobbies & Interests
            </label>
            <input
              type="text"
              id="hobbies"
              name="hobbies"
              required
              value={formData.hobbies}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
              placeholder="e.g., Reading, Travel, Cooking (comma separated)"
            />
          </div>
          
          <div>
            <label htmlFor="lookingFor" className="block text-sm font-medium text-gray-700 mb-2">
              What I'm Looking For
            </label>
            <select
              id="lookingFor"
              name="lookingFor"
              required
              value={formData.lookingFor}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
            >
              <option value="">Select</option>
              <option value="serious-relationship">Serious Relationship</option>
              <option value="marriage">Marriage</option>
              <option value="friendship">Friendship</option>
              <option value="casual-dating">Casual Dating</option>
            </select>
          </div>
          
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Partner Preferences</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Age Range: {formData.partnerPreferences.ageRange[0]} - {formData.partnerPreferences.ageRange[1]}
                </label>
                <input
                  type="range"
                  min="18"
                  max="100"
                  step="1"
                  value={formData.partnerPreferences.ageRange.join(',')}
                  onChange={handleRangeChange}
                  className="w-full"
                />
              </div>
              
              <div>
                <label htmlFor="preference_religion" className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Religion
                </label>
                <select
                  id="preference_religion"
                  name="preference_religion"
                  value={formData.partnerPreferences.religion}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
                >
                  <option value="">Any</option>
                  <option value="christianity">Christianity</option>
                  <option value="islam">Islam</option>
                  <option value="hinduism">Hinduism</option>
                  <option value="buddhism">Buddhism</option>
                  <option value="judaism">Judaism</option>
                  <option value="other">Other</option>
                  <option value="none">No Religion</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="preference_location" className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Location
                </label>
                <input
                  type="text"
                  id="preference_location"
                  name="preference_location"
                  value={formData.partnerPreferences.location}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
                  placeholder="Any location"
                />
              </div>
              
              <div>
                <label htmlFor="preference_education" className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Education
                </label>
                <select
                  id="preference_education"
                  name="preference_education"
                  value={formData.partnerPreferences.education}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
                >
                  <option value="">Any</option>
                  <option value="high-school">High School</option>
                  <option value="bachelors">Bachelor's Degree</option>
                  <option value="masters">Master's Degree</option>
                  <option value="phd">PhD</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </div>
          
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-pink-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {isLoading ? 'Creating Profile...' : 'Complete Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompleteProfile;