import { Route, Routes } from "react-router";
import VisitorLayout from "./layouts/VisitorLayout";
import AdminLayout from "./layouts/AdminLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Announcement from "./pages/Announcement";
import Gallery from "./pages/Gallery";
import Report from "./pages/Report";
import AdminAnnouncement from "./pages/AdminAnnouncement";
import AdminGallery from "./pages/AdminGallery";
import AdminReport from "./pages/AdminReport";
import AnnouncementDetail from "./pages/AnnouncementDetail";
import ReportDetail from "./pages/ReportDetail";
import Contacts from "./pages/Contacts";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./components/NotFound";

function App() {
  return (
    <Routes>
      {/* Public / visitor layout */}
      <Route element={<VisitorLayout />}>
        <Route index element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="pengumuman" element={<Announcement />} />
        <Route path="galeri" element={<Gallery />} />
        <Route path="laporan" element={<Report />} />
        <Route path="pengumuman/:id" element={<AnnouncementDetail />} />
        <Route path="laporan/:id" element={<ReportDetail />} />
        <Route path="kontak" element={<Contacts />} />
      </Route>

      {/* Admin layout routes */}
      <Route path="/admin/*" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="*" element={<NotFound />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="pengumuman" element={<AdminAnnouncement />} />
        <Route path="galeri" element={<AdminGallery />} />
        <Route path="laporan" element={<AdminReport />} />
      </Route>

      {/* Login route */}
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
