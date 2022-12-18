import { useState } from "react";
import { NavLink } from "react-router-dom";
import { logo } from "../assets";
import { links } from "../assets/constants";

import { RiCloseLine } from "react-icons/ri";
import { HiOutlineMenu } from "react-icons/hi";

const Navlinks = ({ handleClick }) => (
  <div className="mt-10">
    {links.map((item) => (
      <NavLink
        key={item.name}
        to={item.to}
        className="flex flex-row justify-start items-center my-1 px-8 py-4 text-sm font-medium text-gray-100 hover:text-orange-400 hover:bg-[#161f33]"
        onClick={() => handleClick && handleClick()}
        style={({ isActive }) =>
          isActive
            ? { color: "#fb923c", backgroundColor: "#161f33" }
            : { color: "#f3f4f6" }
        }
      >
        <item.icon className="w-6 h-6 mr-2" />
        {item.name}
      </NavLink>
    ))}
  </div>
);
const Sidebar = () => {
  const [mobileMenuActive, setMobileMenuActive] = useState(false);

  return (
    <>
      <div className="md:flex hidden flex-col w-[240px] py-10  bg-gray-900">
        <NavLink to="/">
          <img
            src={logo}
            alt="Musicify Logo"
            className="w-full h-20 object-contain"
          />
        </NavLink>
        <Navlinks />
      </div>

      {/* Mobile Menu */}
      <div className="absolute md:hidden block top-6 right-3">
        {!mobileMenuActive ? (
          <HiOutlineMenu
            className="w-6 h-6 mr-2 text-white"
            onClick={() => setMobileMenuActive(true)}
          />
        ) : (
          <RiCloseLine
            className="w-6 h-6 mr-2 text-white"
            onClick={() => setMobileMenuActive(false)}
          />
        )}
      </div>

      <div
        className={` absolute top-0 h-screen w-2/3 bg-gradient-to-tl from-white/10 to-[#483d8b] backdrop-blur-lg z-10 p-6 md:hidden smooth-transition ${
          mobileMenuActive ? "left-0" : "-left-full"
        }`}
      >
        <NavLink to="/">
          <img
            src={logo}
            alt="Musicify Logo"
            className="w-full h-14 object-contain"
          />
        </NavLink>
        <Navlinks handleClick={() => setMobileMenuActive(false)} />
      </div>
    </>
  );
};

export default Sidebar;
