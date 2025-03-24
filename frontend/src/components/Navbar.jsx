import { Link } from "react-router-dom";
import {
  LogOut,
  Settings,
  User,
  RefreshCcw,
  Menu,
  Mail,
  TrendingUp,
  ArrowDownToLine,
  LayoutDashboard,
  LayoutDashboardIcon,
} from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useState } from "react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  const [menuOpen, setMenuOpen] = useState(false);

  const refreshPage = () => {
    window.location.reload();
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white sticky top-0 z-50 shadow-md border-b border-gray-700 backdrop-blur-lg bg-opacity-90">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Left Side - Logo and Sidebar Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden focus:outline-none"
          >
            <Menu className="w-6 h-6" />
          </button>
          <Link
            to="/"
            className="flex items-center gap-3 hover:opacity-80 transition-all"
          >
            <div className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-lg font-bold">Click and Earn</h1>
          </Link>
        </div>

        {/* Right Side - Buttons */}
        <div className="flex items-center gap-4">
          <button
            className="flex items-center gap-2 hover:text-green-400 transition-all md:hidden"
            onClick={refreshPage}
          >
            <RefreshCcw className="w-5 h-5" />
          </button>
          <Link
            to="/contact"
            className="btn btn-sm bg-white/20 text-white flex gap-2 transition-all md:hidden"
          >
            <Mail className="w-5 h-5" />
          </Link>

          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/settings"
              className="btn btn-sm bg-white/20 text-white flex gap-2 transition-all"
            >
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </Link>

            <Link
              to="/contact"
              className="btn btn-sm bg-white/20 text-white flex gap-2 transition-all"
            >
              <Mail className="w-4 h-4" />
              <span>Contact</span>
            </Link>

            {authUser && (
              <>
                <Link
                  to="/withdraw"
                  className="btn btn-sm bg-white/20 text-white flex gap-2"
                >
                  <ArrowDownToLine className="w-5 h-5" />
                  <span>Withdraw</span>
                </Link>
                {authUser.role === "admin" ? (
                  <Link
                    to="/admin-dashboard"
                    className="btn btn-sm bg-white/20 text-white flex gap-2"
                  >
                    <LayoutDashboardIcon className="w-5 h-5" />
                    <span>Admin</span>
                  </Link>
                ) : (
                  ""
                )}

                {/* <button
                  className="flex items-center gap-2 hover:text-red-400 transition-all"
                  onClick={logout}
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button> */}
              </>
            )}

            <button
              className="flex items-center gap-2 hover:text-green-400 transition-all"
              onClick={refreshPage}
            >
              <RefreshCcw className="w-5 h-5" />
              <span>Refresh</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-black transform ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out lg:hidden`}
      >
        <button
          onClick={() => setMenuOpen(false)}
          className="absolute top-4 right-4 text-white"
        >
          ✖
        </button>
        <nav className="p-6 space-y-4">
          <Link
            to="/settings"
            className=" py-2 text-white flex items-center 0 gap-2 hover:bg-slate-700 p-2 rounded"
            onClick={closeMenu}
          >
            <Settings className="w-5 h-5" /> Settings
          </Link>
          <Link
            to="/contact"
            className=" py-2 text-white flex items-center  bg-slate-500 gap-2 hover:bg-slate-700 p-2 rounded"
            onClick={closeMenu}
          >
            <Mail className="w-5 h-5" /> Contact
          </Link>

          {authUser && (
            <>
              <Link
                to="/profile"
                className=" py-2 text-white flex items-center bg-slate-500 gap-2 hover:bg-slate-700 p-2 rounded"
                onClick={closeMenu}
              >
                <User className="w-5 h-5" /> Profile
              </Link>
              <Link
                to="/withdraw"
                className=" py-2 text-white flex items-center bg-slate-500 gap-2 hover:bg-slate-700 p-2 rounded"
                onClick={closeMenu}
              >
                <ArrowDownToLine className="w-5 h-5" /> Withdraw Money
              </Link>
              {authUser.role === "admin" ? (
                <Link
                  to="/admin-dashboard"
                  className=" py-2 text-white flex items-center bg-slate-500 gap-2 hover:bg-slate-700 p-2 rounded"
                  onClick={closeMenu}
                >
                  <LayoutDashboard className="w-5 h-5" /> Admin Dashboard
                </Link>
              ) : (
                ""
              )}

              <button
                onClick={() => {
                  logout();
                  closeMenu();
                }}
                className=" py-2 text-red-300 flex items-center bg-slate-500 gap-2 hover:bg-red-600 p-2 rounded"
              >
                <LogOut className="w-5 h-5" /> Logout
              </button>
            </>
          )}
          <button
            onClick={() => {
              refreshPage();
              closeMenu();
            }}
            className=" py-2 text-green-300 flex items-center gap-2 hover:bg-green-600 p-2 rounded"
          >
            <RefreshCcw className="w-5 h-5" /> Refresh
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
