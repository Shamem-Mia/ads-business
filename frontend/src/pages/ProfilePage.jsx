import { Camera, Mail, User } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import LoadingStatus from "../components/loadingStatus.jsx";

const ProfilePage = () => {
  const { authUser } = useAuthStore();

  // Display a loading state if authUser is not yet available
  if (!authUser) {
    return <LoadingStatus />;
  }

  return (
    <>
      <div className="h-screen pt-20">
        <div className="max-w-2xl mx-auto p-4 py-8">
          <div className="bg-base-300 rounded-xl p-6 space-y-8">
            {/* Profile Header */}
            <div className="text-center">
              <h1 className="text-2xl font-semibold">Profile</h1>
              <p className="mt-2 text-zinc-400">Your profile information</p>
            </div>

            {/* Avatar Upload Section */}
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <img
                  src={authUser.profilePic || "/avatar.jpeg"}
                  alt={`Profile picture of ${authUser.fullName || "user"}`}
                  className="size-32 rounded-full object-cover border-4 border-base-100"
                />
                <label
                  htmlFor="avatar-upload"
                  className={`absolute bottom-0 right-0 bg-base-content hover:scale-105 p-2
                     rounded-full cursor-pointer transition-all duration-200 
                  }`}
                >
                  <Camera className="w-5 h-5 text-base-200" />
                  <input
                    type="file"
                    id="avatar-upload"
                    className="hidden"
                    accept="image/*"
                    // onChange={handleImageUpload}
                    // disabled={isUpdatingProfile}
                    aria-label="Upload profile picture"
                    key="avatar-upload"
                  />
                </label>
              </div>
              <div className="h-12 w-full rounded text-2xl font-serif flex items-center justify-center">
                <h1>"{authUser.fullName || "No name provided"}"</h1>
              </div>
            </div>

            {/* Profile Details */}
            <div className="space-y-6">
              {/* Full Name */}
              <div className="space-y-1.5">
                <div className="text-sm text-zinc-400 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Full Name
                </div>
                <p className="px-4 py-2.5 bg-base-200 rounded-lg border border-base-100">
                  {authUser.fullName || "Not provided"}
                </p>
              </div>

              {/* Email Address */}
              <div className="space-y-1.5">
                <div className="text-sm text-zinc-400 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email Address
                </div>
                <p className="px-4 py-2.5 bg-base-200 rounded-lg border border-base-100">
                  {authUser.email || "Not provided"}
                </p>
              </div>

              {/* User PIN */}
              <div className="space-y-1.5">
                <div className="text-sm text-zinc-400 flex items-center gap-2">
                  PIN Number
                </div>
                <p className="px-4 py-2.5 bg-base-200 rounded-lg border border-base-100">
                  {authUser.pin || "Not provided"}
                </p>
              </div>
            </div>

            {/* Account Information Section */}
            <div className="mt-6 bg-base-300 rounded-xl p-6">
              <h2 className="text-lg font-medium mb-4">Account Information</h2>
              <div className="space-y-3 text-sm">
                {/* Member Since */}
                <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                  <span>Member Since</span>
                  <span>
                    {authUser?.createdAt
                      ? authUser.createdAt.split("T")[0]
                      : "Not available"}
                  </span>
                </div>
                {/* Account Status */}
                <div className="flex items-center justify-between py-2">
                  <span>Account Status</span>
                  <span className="text-green-500">
                    {authUser.role || "Not available"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
