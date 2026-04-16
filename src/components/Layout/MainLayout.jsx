import { Outlet } from "react-router-dom";
import Header from "../common/Header";
import Footer from "../common/Footer";

const MainLayout = () => {
  return (
    <>
      <Header />
      <main style={{ minHeight: "80vh" }}>
        <Outlet /> {/* Yahan Routes ke pages load honge */}
      </main>
      <Footer />
    </>
  );
};
export default MainLayout;
