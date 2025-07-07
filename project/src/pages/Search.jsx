import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Filter, Heart, X, MapPin, Calendar, GraduationCap, Briefcase } from 'lucide-react';
import { searchProfiles, setFilters } from '../features/search/searchSlice';
import { useAuth } from '../contexts/AuthContext';

const Search = () => {
  const dispatch = useDispatch();
  const { currentUser } = useAuth();
  const { profiles, filters, isLoading } = useSelector((state) => state.search);
  const [showFilters, setShowFilters] = useState(false);
  const [localFilters, setLocalFilters] = useState(filters);

  useEffect(() => {
    if (currentUser) {
      handleSearch();
    }
  }, [currentUser]);

  const handleSearch = () => {
    dispatch(setFilters(localFilters));
    dispatch(searchProfiles({ filters: localFilters, userId: currentUser.uid }));
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setLocalFilters({
      ...localFilters,
      [name]: value,
    });
  };

  const handleAgeRangeChange = (e) => {
    const values = e.target.value.split(',').map(Number);
    setLocalFilters({
      ...localFilters,
      ageRange: values,
    });
  };

  const calculateMatchPercentage = (profile) => {
    // Simple matching algorithm based on preferences
    let score = 0;
    let totalCriteria = 0;

    // Age matching
    if (profile.age >= localFilters.ageRange[0] && profile.age <= localFilters.ageRange[1]) {
      score += 25;
    }
    totalCriteria += 25;

    // Religion matching
    if (localFilters.religion && profile.religion === localFilters.religion) {
      score += 25;
    }
    totalCriteria += 25;

    // Location matching
    if (localFilters.location && profile.location.toLowerCase().includes(localFilters.location.toLowerCase())) {
      score += 25;
    }
    totalCriteria += 25;

    // Education matching
    if (localFilters.education && profile.education === localFilters.education) {
      score += 25;
    }
    totalCriteria += 25;

    return Math.round((score / totalCriteria) * 100);
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Find Your Match</h1>
            <p className="text-gray-600 mt-2">
              Discover compatible partners based on your preferences
            </p>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-colors flex items-center space-x-2"
          >
            <Filter className="h-5 w-5" />
            <span>Filters</span>
          </button>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Search Filters</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Age Range: {localFilters.ageRange[0]} - {localFilters.ageRange[1]}
                </label>
                <input
                  type="range"
                  min="18"
                  max="100"
                  step="1"
                  value={localFilters.ageRange.join(',')}
                  onChange={handleAgeRangeChange}
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Religion
                </label>
                <select
                  name="religion"
                  value={localFilters.religion}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
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
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={localFilters.location}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
                  placeholder="Enter location"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Education
                </label>
                <select
                  name="education"
                  value={localFilters.education}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
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
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleSearch}
                className="bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600 transition-colors"
              >
                Apply Filters
              </button>
            </div>
          </div>
        )}

        {/* Results */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {profiles.map((profile) => (
              <div
                key={profile.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="relative">
                  <div className="h-48 bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center">
                    {profile.profilePicture ? (
                      <img
                        src={profile.profilePicture}
                        alt={profile.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-gray-500 text-6xl">👤</div>
                    )}
                  </div>
                  <div className="absolute top-4 right-4 bg-green-500 text-white px-2 py-1 rounded-full text-sm font-semibold">
                    {calculateMatchPercentage(profile)}% Match
                  </div>
                  {profile.isVerified && (
                    <div className="absolute top-4 left-4 bg-blue-500 text-white p-1 rounded-full">
                      <span className="text-xs">✓</span>
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {profile.name}
                    </h3>
                    <span className="text-gray-600">{profile.age}</span>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-600 text-sm">
                      <MapPin className="h-4 w-4 mr-1" />
                      {profile.location}
                    </div>
                    <div className="flex items-center text-gray-600 text-sm">
                      <Briefcase className="h-4 w-4 mr-1" />
                      {profile.profession}
                    </div>
                    <div className="flex items-center text-gray-600 text-sm">
                      <GraduationCap className="h-4 w-4 mr-1" />
                      {profile.education?.replace('-', ' ')}
                    </div>
                  </div>
                  
                  <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                    {profile.bio}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <button className="flex items-center space-x-1 text-gray-500 hover:text-red-500 transition-colors">
                      <X className="h-5 w-5" />
                      <span className="text-sm">Pass</span>
                    </button>
                    <button className="flex items-center space-x-1 text-gray-500 hover:text-pink-500 transition-colors">
                      <Heart className="h-5 w-5" />
                      <span className="text-sm">Like</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {!isLoading && profiles.length === 0 && (
          <div className="text-center py-12">
            <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No matches found</h3>
            <p className="text-gray-600">Try adjusting your filters to find more compatible partners</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;