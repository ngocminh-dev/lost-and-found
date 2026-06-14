import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { PackagePlus, Search, UserPlus, Users, ChevronRight, MapPin, Clock, PhoneCall, ShieldCheck } from 'lucide-react';

const cards = [
  { title: 'Tôi nhặt được đồ', description: 'Khai báo tài sản bạn vừa nhặt được để trả lại người mất.', icon: PackagePlus, to: '/report-found', color: 'bg-emerald-500' },
  { title: 'Tôi muốn tìm đồ', description: 'Đăng tin tìm kiếm tài sản bạn bị thất lạc.', icon: Search, to: '/report-lost', color: 'bg-primary-600' },
  { title: 'Tôi gặp người thất lạc', description: 'Báo cáo thông tin trẻ em/người già đi lạc.', icon: UserPlus, to: '/report-found', color: 'bg-amber-500' },
  { title: 'Tôi muốn tìm người thân', description: 'Đăng tin tìm kiếm người thân đi lạc hoặc mất tích.', icon: Users, to: '/report-lost', color: 'bg-blue-600' }
];

const FEATURED_ITEMS = [
  { id: 1, title: 'Ví da nam màu nâu', type: 'Giấy tờ tùy thân', time: '2 giờ trước', location: 'Q. Hoàn Kiếm, Hà Nội', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSCCvAX0A4Wq3LYhYxyrhhLvy8KNvbbV7ECw&s', phone: '0243111222', code: 'TS-88912' },
  { id: 2, title: 'Xe Honda Vision', type: 'Phương tiện', time: '5 giờ trước', location: 'Q. Cầu Giấy, Hà Nội', image: 'https://fxbike.vn/wp-content/uploads/2026/05/gia-xe-vision-ban-tieu-chuan.jpg', phone: '0243333444', code: 'TS-55412' },
  { id: 3, title: 'Điện thoại iPhone 14', type: 'Đồ điện tử', time: '1 ngày trước', location: 'Q. 1, TP.HCM', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1OHcvoU87B91j2rV-aXtj9c972cl1JAdfFQ&s', phone: '0283555666', code: 'TS-99120' },
  { id: 4, title: 'Chùm chìa khóa ô tô', type: 'Chìa khóa', time: '2 ngày trước', location: 'Q. Hải Châu, Đà Nẵng', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvL6ytymm53CP86KQ1OtSRSHbW3tvcn9Tkig&s', phone: '0236777888', code: 'TS-11234' },
  { id: 5, title: 'Balo laptop màu đen', type: 'Vật dụng', time: '3 ngày trước', location: 'Q. Sơn Trà, Đà Nẵng', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREzPPlvO61PUi3kbDRK0KKAoKB0Q521Eg35w&s', phone: '0236999000', code: 'TS-77654' }
];

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(1);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [selectedItem, setSelectedItem] = useState<typeof FEATURED_ITEMS[0] | null>(null);

  // Auto scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % FEATURED_ITEMS.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const handleItemClick = (item: typeof FEATURED_ITEMS[0], index: number) => {
    if (activeIndex === index) {
      // If clicking the center active item, show the call modal
      setSelectedItem(item);
    } else {
      // If clicking a side item, bring it to center
      setActiveIndex(index);
    }
  };

  return (
    <div className="flex flex-col pt-4 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-500 overflow-hidden">

      {/* Welcome Banner */}
      <div className="px-1 mb-6 flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">Chào mừng bạn,</h2>
          <p className="text-sm text-gray-500 mt-1">Hôm nay bạn cần hỗ trợ gì?</p>
        </div>
        <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-sm">
          <ShieldCheck className="w-3 h-3" /> VNeID
        </div>
      </div>

      {/* Featured Items Carousel (Movie App Style) */}
      <div className="mb-10 relative -mx-4 sm:mx-0">
        <div className="flex justify-between items-center px-5 sm:px-1 mb-4">
          <h3 className="font-bold text-lg text-gray-800">Tài sản mới tiếp nhận</h3>
          <Link to="/all-items" className="text-primary-600 text-sm font-semibold flex items-center hover:text-primary-800 transition-colors">
            Xem tất cả <ChevronRight className="w-4 h-4 ml-0.5" />
          </Link>
        </div>

        {/* Carousel Container */}
        <div
          ref={carouselRef}
          className="relative h-[320px] w-full flex items-center justify-center [perspective:1000px]"
        >
          {FEATURED_ITEMS.map((item, index) => {
            // Calculate relative position for the 3D-like effect
            let offset = index - activeIndex;
            // Handle wrap around for infinite feel (optional, but simplified here)
            if (offset < -2) offset += FEATURED_ITEMS.length;
            if (offset > 2) offset -= FEATURED_ITEMS.length;

            const isActive = offset === 0;
            const isLeft = offset === -1;
            const isRight = offset === 1;
            const isHidden = Math.abs(offset) > 1;

            // Styles for the movie-cover effect
            let transform = 'translateX(0) scale(1) rotateY(0deg)';
            let zIndex = 0;
            let opacity = 0;

            if (isActive) {
              transform = 'translateX(0) scale(1.1) rotateY(0deg)';
              zIndex = 30;
              opacity = 1;
            } else if (isLeft) {
              transform = 'translateX(-65%) scale(0.85) rotateY(15deg)';
              zIndex = 20;
              opacity = 0.7;
            } else if (isRight) {
              transform = 'translateX(65%) scale(0.85) rotateY(-15deg)';
              zIndex = 20;
              opacity = 0.7;
            }

            return (
              <div
                key={item.id}
                onClick={() => handleItemClick(item, index)}
                className="absolute w-[200px] h-[280px] transition-all duration-500 ease-out cursor-pointer rounded-2xl shadow-xl bg-white overflow-hidden"
                style={{
                  transform,
                  zIndex,
                  opacity,
                  visibility: isHidden ? 'hidden' : 'visible',
                  boxShadow: isActive ? '0 20px 25px -5px rgba(0, 0, 0, 0.2)' : '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              >
                <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md text-white text-[10px] px-2 py-1 rounded-md font-medium z-10">
                  {item.code}
                </div>
                <img src={item.image} alt={item.title} className="w-full h-3/5 object-cover" />

                {/* Gradient overlay on image */}
                <div className="absolute inset-0 h-3/5 bg-gradient-to-t from-black/60 to-transparent"></div>

                <div className="h-2/5 p-3 flex flex-col justify-between bg-white">
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm line-clamp-1 leading-tight">{item.title}</h4>
                    <span className="text-[10px] font-semibold text-primary-600 uppercase tracking-wider">{item.type}</span>
                  </div>

                  <div className="space-y-1 mt-1">
                    <div className="flex items-center text-xs text-gray-500 gap-1">
                      <Clock className="w-3 h-3 shrink-0" /> <span className="truncate">{item.time}</span>
                    </div>
                    <div className="flex items-center text-xs text-gray-500 gap-1">
                      <MapPin className="w-3 h-3 shrink-0" /> <span className="truncate">{item.location}</span>
                    </div>
                  </div>
                </div>

                {/* Highlight ring for active item */}
                {isActive && <div className="absolute inset-0 border-2 border-primary-500 rounded-2xl pointer-events-none"></div>}
              </div>
            );
          })}
        </div>
      </div>

      <h3 className="font-bold text-lg text-gray-800 mb-4 px-1">Dịch vụ khai báo</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {cards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <Link
              key={idx}
              to={card.to}
              className="group relative bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 flex items-start gap-4 overflow-hidden transform hover:-translate-y-1 active:translate-y-0 active:scale-95"
            >
              <div className={`shrink-0 p-3 rounded-xl text-white shadow-inner ${card.color}`}>
                <Icon className="w-7 h-7" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-900 mb-1 group-hover:text-primary-700 transition-colors">{card.title}</h4>
                <p className="text-sm text-gray-500 line-clamp-2">{card.description}</p>
              </div>
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary-100 rounded-2xl pointer-events-none transition-colors"></div>
            </Link>
          );
        })}
      </div>

      {/* Security Rule Banner */}
      <div className="mt-8 bg-blue-50 border border-blue-100 rounded-2xl p-5 flex gap-4">
        <div className="text-blue-500 shrink-0">
          <ShieldCheck className="h-6 w-6" />
        </div>
        <div>
          <h4 className="font-semibold text-blue-900 mb-1">Cổng thông tin chính thức</h4>
          <p className="text-sm text-blue-800 leading-relaxed">
            Hệ thống hỗ trợ kết nối tài sản đánh rơi với chủ nhân. Dữ liệu cá nhân được bảo vệ theo chuẩn quốc gia.
          </p>
        </div>
      </div>

      {/* Call Action Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="relative h-40">
              <img src={selectedItem.image} alt={selectedItem.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-3 right-3 bg-black/40 text-white p-1.5 rounded-full hover:bg-black/60 transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              <div className="absolute bottom-3 left-4 right-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary-400 bg-black/50 px-2 py-0.5 rounded backdrop-blur-md mb-1 inline-block">
                  {selectedItem.type}
                </span>
                <h3 className="text-xl font-bold text-white leading-tight">{selectedItem.title}</h3>
              </div>
            </div>

            <div className="p-5">
              <p className="text-sm text-gray-600 mb-4 text-center">
                Tài sản này đang được bảo quản tại cơ quan công an địa phương. Bạn có thể gọi điện ngay để xác minh và nhận lại.
              </p>

              <div className="bg-gray-50 rounded-2xl p-4 mb-5 border border-gray-100 flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 font-medium mb-1">Cơ quan tiếp nhận</p>
                  <p className="text-sm font-bold text-gray-900">{selectedItem.location}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500 font-medium mb-1">Mã hồ sơ</p>
                  <p className="text-sm font-bold text-primary-700">{selectedItem.code}</p>
                </div>
              </div>

              <a
                href={`tel:${selectedItem.phone}`}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-green-500/30 transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <PhoneCall className="w-5 h-5 animate-pulse" />
                Gọi ngay {selectedItem.phone}
              </a>
              <button
                onClick={() => setSelectedItem(null)}
                className="w-full mt-3 py-3 text-gray-500 font-medium text-sm hover:text-gray-800 transition"
              >
                Để sau
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
