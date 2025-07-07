import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Camera,
  MapPin,
  Calendar,
  GraduationCap,
  Briefcase,
  Heart,
  Edit3,
  Check,
  X,
} from "lucide-react";
import toast from "react-hot-toast";
import { fetchProfile, updateProfile } from "../features/profile/profileSlice";
import { useAuth } from "../contexts/AuthContext";
import { uploadUserImage } from "../services/upload";

const Profile = () => {
  const dispatch = useDispatch();
  const { currentUser } = useAuth();
  const { profile, isLoading } = useSelector((state) => state.profile);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (currentUser) {
      dispatch(fetchProfile(currentUser.uid));
    }
  }, [dispatch, currentUser]);

  useEffect(() => {
    if (profile) {
      setEditData(profile);
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handleEdit = () => setIsEditing(true);

  const handleCancel = () => {
    setEditData(profile);
    setImages([]);
    setIsEditing(false);
  };

  const handleSave = async () => {
    try {
      let uploadedUrls = [];

      if (images.length > 0) {
        const uploadPromises = images.map((file) =>
          uploadUserImage(currentUser.uid, file)
        );
        uploadedUrls = await Promise.all(uploadPromises);
      }

      const updatedProfile = {
        ...editData,
      };

      if (uploadedUrls.length > 0) {
        updatedProfile.pictures = [
          ...(profile.pictures || []),
          ...uploadedUrls,
        ];

        if (!updatedProfile.profilePicture) {
          updatedProfile.profilePicture = uploadedUrls[0];
        }
      }

      await dispatch(
        updateProfile({
          uid: currentUser.uid,
          profileData: updatedProfile,
        })
      ).unwrap();

      toast.success("Profile updated successfully");
      setIsEditing(false);
      setImages([]);
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Failed to update profile");
    }
  };

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
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            No Profile Found
          </h2>
          <p className="text-gray-600">Please complete your profile setup</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-pink-500 to-purple-600 h-32"></div>
          <div className="relative px-6 pb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative -mt-16">
                  <div className="w-32 h-32 bg-gray-300 rounded-full border-4 border-white flex items-center justify-center overflow-hidden">
                    {profile.profilePicture ? (
                      <img
                        src={profile.profilePicture}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Camera className="h-8 w-8 text-gray-500" />
                    )}
                  </div>

                  {/* Image Upload */}
                  {isEditing && (
                    <>
                      <label className="block text-sm text-gray-700 mt-2">
                        Upload Profile Pictures
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) =>
                          setImages(Array.from(e.target.files))
                        }
                        className="block mt-1 text-sm"
                      />
                      {images.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {images.map((file, idx) => (
                            <img
                              key={idx}
                              src={URL.createObjectURL(file)}
                              alt={`preview-${idx}`}
                              className="w-16 h-16 object-cover rounded"
                            />
                          ))}
                        </div>
                      )}
                    </>
                  )}

                  {profile.pictures?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {profile.pictures.map((url, idx) => (
                        <img
                          key={idx}
                          src={url}
                          alt={`pic-${idx}`}
                          className="w-16 h-16 object-cover rounded border"
                        />
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-16">
                  <h1 className="text-2xl font-bold text-gray-900">
                    {profile.name}
                    {profile.isVerified && (
                      <span className="ml-2 text-blue-500">✓</span>
                    )}
                  </h1>
                  <p className="text-gray-600 flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {profile.location}
                  </p>
                </div>
              </div>

              <div className="flex space-x-2">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleSave}
                      className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600"
                    >
                      <Check className="h-5 w-5" />
                    </button>
                    <button
                      onClick={handleCancel}
                      className="bg-gray-500 text-white p-2 rounded-full hover:bg-gray-600"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleEdit}
                    className="bg-pink-500 text-white p-2 rounded-full hover:bg-pink-600"
                  >
                    <Edit3 className="h-5 w-5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Profile Body */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Personal Info */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Personal Information</h2>

            <div className="space-y-4">
              {/* Age */}
              <div>
                <label className="block text-gray-600">Age</label>
                {isEditing ? (
                  <input
                    type="number"
                    name="age"
                    value={editData.age || ""}
                    onChange={handleChange}
                    className="border rounded px-2 py-1 w-full"
                  />
                ) : (
                  <p>{profile.age} years old</p>
                )}
              </div>

              {/* Education */}
              <div>
                <label className="block text-gray-600">Education</label>
                {isEditing ? (
                  <select
                    name="education"
                    value={editData.education || ""}
                    onChange={handleChange}
                    className="border rounded px-2 py-1 w-full"
                  >
                    <option value="high-school">High School</option>
                    <option value="bachelors">Bachelor's</option>
                    <option value="masters">Master's</option>
                    <option value="phd">PhD</option>
                    <option value="other">Other</option>
                  </select>
                ) : (
                  <p>{profile.education?.replace("-", " ")}</p>
                )}
              </div>

              {/* Profession */}
              <div>
                <label className="block text-gray-600">Profession</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="profession"
                    value={editData.profession || ""}
                    onChange={handleChange}
                    className="border rounded px-2 py-1 w-full"
                  />
                ) : (
                  <p>{profile.profession}</p>
                )}
              </div>

              {/* Religion */}
              <div>
                <label className="block text-gray-600">Religion</label>
                {isEditing ? (
                  <select
                    name="religion"
                    value={editData.religion || ""}
                    onChange={handleChange}
                    className="border rounded px-2 py-1 w-full"
                  >
                    <option value="hinduism">Hinduism</option>
                    <option value="islam">Islam</option>
                    <option value="christianity">Christianity</option>
                    <option value="buddhism">Buddhism</option>
                    <option value="other">Other</option>
                    <option value="none">No Religion</option>
                  </select>
                ) : (
                  <p>{profile.religion}</p>
                )}
              </div>
            </div>
          </div>

          {/* About Me */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">About Me</h2>
            {isEditing ? (
              <textarea
                name="bio"
                rows={5}
                value={editData.bio || ""}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
            ) : (
              <p className="text-gray-700">{profile.bio}</p>
            )}
          </div>

          {/* Hobbies */}
          <div className="bg-white rounded-xl shadow-lg p-6 col-span-full">
            <h2 className="text-xl font-semibold mb-4">Hobbies & Interests</h2>
            <div className="flex flex-wrap gap-2">
              {profile.hobbies?.map((hobby, idx) => (
                <span
                  key={idx}
                  className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm"
                >
                  {hobby}
                </span>
              ))}
            </div>
          </div>

          {/* Looking For */}
          <div className="bg-white rounded-xl shadow-lg p-6 col-span-full">
            <h2 className="text-xl font-semibold mb-4">
              What I'm Looking For
            </h2>
            {isEditing ? (
              <select
                name="lookingFor"
                value={editData.lookingFor || ""}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              >
                <option value="serious-relationship">
                  Serious Relationship
                </option>
                <option value="marriage">Marriage</option>
                <option value="friendship">Friendship</option>
                <option value="casual-dating">Casual Dating</option>
              </select>
            ) : (
              <p>{profile.lookingFor?.replace("-", " ")}</p>
            )}
          </div>
        </div>

        {/* Premium Badge */}
        {profile.isPremium && (
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl p-6 text-white mt-8">
            <div className="flex items-center space-x-3">
              <div className="bg-white/20 p-3 rounded-full">
                <Heart className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Premium Member</h3>
                <p>You have access to all premium features</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
