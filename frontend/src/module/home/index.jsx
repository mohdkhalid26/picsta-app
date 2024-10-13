import { Route, Routes } from "react-router";
import Navbar from "../../components/Layout/Navbar/index";
import SidebarLeft from "../../components/Layout/SidebarLeft/index";
import SidebarRight from "../../components/Layout/SidebarRight/index";
import FeedBar from "../../components/Layout/FeedBar/index";
import Profile from "../../components/Profile";
import usePathname from "../../hooks/usePathname";
import UpdatePassword from "../../components/Layout/UpdatePassowrd";
import EditProfile from "../../components/Profile/edit";
function Home() {
  const path = usePathname();

  return (
    <div className=" flex items-center justify-start flex-wrap w-full h-screen relative overflow-hidden">
      <Navbar />
      <SidebarLeft />
      <Routes>
        <Route path="/" element={<FeedBar />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/edit" element={<EditProfile />} />
        <Route path="/updatepassword" element={<UpdatePassword />} />
      </Routes>
      {path === "/" ? <SidebarRight /> : null}
    </div>
  );
}

export default Home;
