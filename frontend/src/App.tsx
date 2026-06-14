import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import ReportFound from './pages/ReportFound';
import ReportLost from './pages/ReportLost';
import SuccessPage from './pages/SuccessPage';
import AllItems from './pages/AllItems';
import { ShieldAlert } from 'lucide-react';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col font-sans bg-gray-50">
        <header className="bg-primary-700 text-white shadow-md sticky top-0 z-50">
          <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <ShieldAlert className="w-8 h-8 text-yellow-400" />
              <div>
                <h1 className="font-bold text-lg leading-tight uppercase tracking-wide">Cổng Thông Tin</h1>
                <p className="text-xs text-primary-200">Khai báo tài sản & người thất lạc</p>
              </div>
            </Link>
            <div className="flex gap-4">
              <button className="text-sm font-medium hover:text-yellow-400 transition-colors hidden sm:block">Tra cứu hồ sơ</button>
              <button className="text-sm font-medium hover:text-yellow-400 transition-colors hidden sm:block">Đăng nhập</button>
            </div>
          </div>
        </header>

        <main className="flex-1 max-w-4xl w-full mx-auto p-4 flex flex-col relative">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/all-items" element={<AllItems />} />
            <Route path="/report-found" element={<ReportFound />} />
            <Route path="/report-lost" element={<ReportLost />} />
            <Route path="/success" element={<SuccessPage />} />
          </Routes>
        </main>

        <footer className="bg-primary-900 text-primary-100 py-6 mt-8">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <p className="text-sm mb-2">&copy; {new Date().getFullYear()} Cổng thông tin tiếp nhận khai báo.</p>
            <p className="text-xs text-primary-300">Phát triển phục vụ người dân. Mọi thông tin được bảo mật theo quy định pháp luật.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
