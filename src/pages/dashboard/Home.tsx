import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/SideBar/SideBar";
import { FiAlignLeft } from "react-icons/fi";
import ReportInfo from "../../sections/ReportInfo/ReportInfo";
import SalesLineChart from "../../sections/Chart/Chart";

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const hideElement =
    location.pathname === "/home" || location.pathname === "/home/";

  const [showSidebar, setShowSidebar] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/");

    const handleResize = () => {
      const mobile = window.innerWidth < 992;
      setIsMobile(mobile);
      if (mobile) setShowSidebar(false);
      else setShowSidebar(true);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div className="d-flex min-vh-100">
        {/* Sidebar */}
        {(showSidebar || !isMobile) && (
          <Sidebar show={showSidebar} onClose={() => setShowSidebar(false)} />
        )}

        <div className="flex-grow-1 bg-grey16 vh-100 px-64" style={{ marginLeft: isMobile ? "0" : "270px" }} >
          {/* btn for show side bar or hide in small device */}
          {isMobile && (
            <button
              className="btn bg-orange mx-lg-5 mx-3 my-4 text-white"
              onClick={() => setShowSidebar(true)}
            >
              <FiAlignLeft className="text-white" />
            </button>
          )}
          {/* elements for show in home page */}
          {hideElement && (
            <div className="container-lg pt-4">
              <ReportInfo />
              <SalesLineChart />
            </div>
          )}
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Home;
