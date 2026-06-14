import { useState } from 'react';
import { Search, MapPin, Clock, PhoneCall, ChevronLeft, LayoutGrid } from 'lucide-react';
import { Link } from 'react-router-dom';

// Extended mock data for the list
const ALL_ITEMS = [
  { id: 1, title: 'Ví da nam màu nâu', type: 'Giấy tờ tùy thân', time: '2 giờ trước', location: 'Q. Hoàn Kiếm, Hà Nội', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSCCvAX0A4Wq3LYhYxyrhhLvy8KNvbbV7ECw&s', phone: '0243111222', code: 'TS-88912' },
  { id: 2, title: 'Xe Honda Vision', type: 'Phương tiện', time: '5 giờ trước', location: 'Q. Cầu Giấy, Hà Nội', image: 'https://fxbike.vn/wp-content/uploads/2026/05/gia-xe-vision-ban-tieu-chuan.jpg', phone: '0243333444', code: 'TS-55412' },
  { id: 3, title: 'Điện thoại iPhone 14', type: 'Đồ điện tử', time: '1 ngày trước', location: 'Q. 1, TP.HCM', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1OHcvoU87B91j2rV-aXtj9c972cl1JAdfFQ&s', phone: '0283555666', code: 'TS-99120' },
  { id: 4, title: 'Chùm chìa khóa ô tô', type: 'Chìa khóa', time: '2 ngày trước', location: 'Q. Hải Châu, Đà Nẵng', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvL6ytymm53CP86KQ1OtSRSHbW3tvcn9Tkig&s', phone: '0236777888', code: 'TS-11234' },
  { id: 5, title: 'Balo laptop màu đen', type: 'Vật dụng', time: '3 ngày trước', location: 'Q. Sơn Trà, Đà Nẵng', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREzPPlvO61PUi3kbDRK0KKAoKB0Q521Eg35w&s', phone: '0236999000', code: 'TS-77654' },
  { id: 6, title: 'Giấy tờ xe máy', type: 'Giấy tờ tùy thân', time: '4 ngày trước', location: 'Q. 3, TP.HCM', image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=400', phone: '0283777888', code: 'TS-22114' },
  { id: 7, title: 'Túi xách nữ màu đỏ', type: 'Vật dụng', time: '5 ngày trước', location: 'Q. Đống Đa, Hà Nội', image: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&q=80&w=400', phone: '0243555999', code: 'TS-66554' },
  { id: 8, title: 'Laptop Macbook Pro', type: 'Đồ điện tử', time: '1 tuần trước', location: 'Q. Ngũ Hành Sơn, Đà Nẵng', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=400', phone: '0236111222', code: 'TS-44321' },
];

export default function AllItems() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<typeof ALL_ITEMS[0] | null>(null);

  const filteredItems = ALL_ITEMS.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col py-4 animate-in fade-in duration-500 pb-20">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Link to="/" className="p-2 -ml-2 text-gray-500 hover:text-gray-900 rounded-full hover:bg-gray-100 transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </Link>
        <h2 className="text-xl font-bold text-gray-900">Danh sách tài sản</h2>
      </div>

      {/* Search Bar */}
      <div className="mb-6 relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input 
          type="text" 
          placeholder="Tìm theo tên, mã hồ sơ, loại tài sản..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white border border-gray-200 rounded-2xl pl-12 pr-4 py-4 outline-none focus:ring-2 focus:ring-primary-500 shadow-sm transition-all text-gray-900" 
        />
      </div>

      {/* Stats/Filters bar */}
      <div className="flex items-center justify-between mb-4 px-1">
        <p className="text-sm font-medium text-gray-500 flex items-center gap-2">
          <LayoutGrid className="w-4 h-4" /> 
          Tìm thấy <span className="font-bold text-gray-900">{filteredItems.length}</span> kết quả
        </p>
      </div>

      {/* Items Grid */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {filteredItems.map(item => (
            <div 
              key={item.id} 
              onClick={() => setSelectedItem(item)}
              className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col h-full"
            >
              <div className="relative aspect-square">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md text-white text-[10px] px-2 py-1 rounded-md font-medium z-10 shadow-sm">
                  {item.code}
                </div>
              </div>
              <div className="p-3 flex-1 flex flex-col">
                <span className="text-[10px] font-bold text-primary-600 uppercase tracking-wider mb-1 block">{item.type}</span>
                <h4 className="font-bold text-gray-900 text-sm line-clamp-2 leading-tight mb-2 flex-1">{item.title}</h4>
                <div className="space-y-1 pt-2 border-t border-gray-50">
                  <div className="flex items-center text-[11px] text-gray-500 gap-1.5">
                    <Clock className="w-3.5 h-3.5 shrink-0" /> <span className="truncate">{item.time}</span>
                  </div>
                  <div className="flex items-center text-[11px] text-gray-500 gap-1.5">
                    <MapPin className="w-3.5 h-3.5 shrink-0" /> <span className="truncate">{item.location}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-20 text-center flex flex-col items-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-400">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="font-bold text-gray-900 mb-1">Không tìm thấy kết quả</h3>
          <p className="text-sm text-gray-500">Thử thay đổi từ khóa tìm kiếm của bạn.</p>
        </div>
      )}

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
