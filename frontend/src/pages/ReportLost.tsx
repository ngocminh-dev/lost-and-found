import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, MapPin, Calendar, FileText, User, Phone, CreditCard, ChevronLeft, ShieldCheck, X, AlertTriangle, Search, LayoutGrid, Clock, PhoneCall } from 'lucide-react';
import { Link } from 'react-router-dom';

const VIETNAM_DATA: Record<string, Record<string, string[]>> = {
  "Hà Nội": {
    "Quận Hoàn Kiếm": ["Phường Phúc Tân", "Phường Đồng Xuân", "Phường Hàng Bạc"],
    "Quận Cầu Giấy": ["Phường Dịch Vọng", "Phường Quan Hoa", "Phường Mai Dịch"]
  },
  "Hồ Chí Minh": {
    "Quận 1": ["Phường Bến Nghé", "Phường Bến Thành", "Phường Đa Kao"],
    "Quận 3": ["Phường Võ Thị Sáu", "Phường 14", "Phường 13"]
  },
  "Đà Nẵng": {
    "Quận Hải Châu": ["Phường Thạch Thang", "Phường Thuận Phước"],
    "Quận Sơn Trà": ["Phường An Hải Bắc", "Phường Thọ Quang"]
  }
};

const MOCK_RESULTS = [
  { id: 1, title: 'Ví da nam màu nâu', type: 'Giấy tờ tùy thân', time: '2 giờ trước', location: 'Q. Hoàn Kiếm, Hà Nội', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSCCvAX0A4Wq3LYhYxyrhhLvy8KNvbbV7ECw&s', phone: '0243111222', code: 'TS-88912' },
  { id: 2, title: 'Điện thoại iPhone 14', type: 'Đồ điện tử', time: '1 ngày trước', location: 'Q. 1, TP.HCM', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1OHcvoU87B91j2rV-aXtj9c972cl1JAdfFQ&s', phone: '0283555666', code: 'TS-99120' },
];

export default function ReportLost() {
  const navigate = useNavigate();
  const [step, setStep] = useState<'search' | 'results' | 'report'>('search');
  const [loading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState<typeof MOCK_RESULTS[0] | null>(null);

  // Search Form State
  const [searchCategory, setSearchCategory] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');

  // Report Form State
  const [identifiable, setIdentifiable] = useState<string>('');
  const [assetType, setAssetType] = useState('');
  const [province, setProvince] = useState('');
  const [district, setDistrict] = useState('');
  const [ward, setWard] = useState('');
  const [images, setImages] = useState<{file: File, url: string}[]>([]);

  const districts = useMemo(() => province ? Object.keys(VIETNAM_DATA[province]) : [], [province]);
  const wards = useMemo(() => district ? VIETNAM_DATA[province][district] : [], [province, district]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).map(file => ({
        file,
        url: URL.createObjectURL(file)
      }));
      setImages(prev => [...prev, ...filesArray]);
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('results');
    }, 1000);
  };

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/success', { 
        state: { 
          code: 'TM-' + Math.floor(Math.random() * 1000000).toString().padStart(6, '0') 
        } 
      });
    }, 1500);
  };

  return (
    <div className="flex flex-col py-4 animate-in fade-in duration-500 pb-20">
      <div className="flex items-center gap-3 mb-6">
        {step === 'search' ? (
          <Link to="/" className="p-2 -ml-2 text-gray-500 hover:text-gray-900 rounded-full hover:bg-gray-100 transition-colors">
            <ChevronLeft className="w-6 h-6" />
          </Link>
        ) : (
          <button onClick={() => setStep(step === 'results' ? 'search' : 'results')} className="p-2 -ml-2 text-gray-500 hover:text-gray-900 rounded-full hover:bg-gray-100 transition-colors">
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}
        <h2 className="text-xl font-bold text-gray-900">
          {step === 'search' ? 'Tìm tài sản thất lạc' : step === 'results' ? 'Kết quả tìm kiếm' : 'Khai báo mất tài sản'}
        </h2>
      </div>

      {step === 'search' && (
        <div className="animate-in slide-in-from-right-4 duration-300">
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 mb-6 flex gap-3">
            <Search className="w-6 h-6 text-blue-500 shrink-0" />
            <p className="text-sm text-blue-800 leading-relaxed">
              Hệ thống lưu trữ danh sách các tài sản đã được người dân giao nộp cho cơ quan Công an. Hãy thử tìm kiếm trước khi tạo hồ sơ báo mất nhé.
            </p>
          </div>

          <form onSubmit={handleSearch} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phân loại tài sản / giấy tờ *</label>
              <select required value={searchCategory} onChange={(e) => setSearchCategory(e.target.value)} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary-500 text-base">
                <option value="">Tất cả</option>
                <option value="id_card">Giấy tờ tùy thân (CCCD, BLX...)</option>
                <option value="vehicle">Phương tiện (Xe máy, Ô tô...)</option>
                <option value="electronic">Đồ điện tử (Điện thoại, Laptop...)</option>
                <option value="wallet">Ví tiền</option>
                <option value="other">Khác</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Từ khóa (Số định danh, Nhãn hiệu...)</label>
              <input type="text" value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)} placeholder="Nhập từ khóa..." className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary-500 transition-all text-base max-w-full box-border" />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full mt-4 bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary-500/30 transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
            >
              {loading ? <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : 'Tìm kiếm trong hệ thống'}
            </button>
            <div className="text-center mt-4">
              <button type="button" onClick={() => setStep('report')} className="text-sm font-medium text-primary-600 hover:text-primary-700 hover:underline">
                Bỏ qua tìm kiếm, đi tới Khai báo mất
              </button>
            </div>
          </form>
        </div>
      )}

      {step === 'results' && (
        <div className="animate-in slide-in-from-right-4 duration-300">
          <p className="text-sm font-medium text-gray-500 mb-4 flex items-center gap-2">
            <LayoutGrid className="w-4 h-4" /> 
            Tìm thấy <span className="font-bold text-gray-900">{MOCK_RESULTS.length}</span> kết quả nghi ngờ phù hợp
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
            {MOCK_RESULTS.map(item => (
              <div 
                key={item.id} 
                onClick={() => setSelectedItem(item)}
                className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col"
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
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 rounded-2xl p-6 text-center border border-gray-200">
            <h4 className="font-bold text-gray-800 mb-2">Không tìm thấy tài sản của bạn?</h4>
            <p className="text-sm text-gray-500 mb-4">Bạn có thể tạo hồ sơ báo mất để hệ thống tự động thông báo khi có người nhặt được.</p>
            <button 
              onClick={() => setStep('report')}
              className="bg-white text-primary-600 font-bold border border-primary-200 hover:bg-primary-50 py-3 px-6 rounded-xl transition-all shadow-sm active:scale-95"
            >
              Đăng tin khai báo mất
            </button>
          </div>
        </div>
      )}

      {step === 'report' && (
        <div className="animate-in slide-in-from-right-4 duration-300">
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-6 flex gap-3">
            <AlertTriangle className="w-6 h-6 text-amber-500 shrink-0" />
            <p className="text-sm text-amber-800 leading-relaxed">
              Thông tin của bạn sẽ được đăng lên bảng tin công cộng sau khi được cán bộ kiểm duyệt. Các thông tin nhạy cảm sẽ được tự động làm mờ.
            </p>
          </div>

          <form onSubmit={handleSubmitReport} className="space-y-6">
            {/* Hardcoded VNeID Block */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-green-200 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-bl-xl flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> Đã xác thực VNeID
              </div>
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-green-600" /> Thông tin người khai báo
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Họ và tên</label>
                  <div className="font-bold text-gray-900 bg-gray-50 p-3 rounded-xl border border-gray-100">NGUYỄN VĂN A</div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Số điện thoại</label>
                  <div className="font-bold text-gray-900 bg-gray-50 p-3 rounded-xl border border-gray-100">0987654321</div>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-gray-500 mb-1">Số Căn cước công dân</label>
                  <div className="font-bold text-gray-900 bg-gray-50 p-3 rounded-xl border border-gray-100">001099001234</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-primary-700 mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5" /> Thông tin tài sản thất lạc
              </h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phân loại *</label>
                    <select 
                      required 
                      value={identifiable}
                      onChange={(e) => { setIdentifiable(e.target.value); setAssetType(''); }}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary-500 transition-all text-base"
                    >
                      <option value="">-- Chọn phân loại --</option>
                      <option value="yes">Tài sản định danh được</option>
                      <option value="no">Tài sản KHÔNG định danh được</option>
                    </select>
                  </div>

                  {identifiable === 'yes' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Loại tài sản định danh *</label>
                      <select required value={assetType} onChange={(e) => setAssetType(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary-500 transition-all text-base">
                        <option value="">Chọn loại</option>
                        <option value="id_card">Giấy tờ tùy thân (CCCD, BLX...)</option>
                        <option value="vehicle">Phương tiện (Xe máy, Ô tô)</option>
                        <option value="bank_card">Thẻ ngân hàng</option>
                      </select>
                    </div>
                  )}

                  {identifiable === 'no' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Loại tài sản khác *</label>
                      <select required value={assetType} onChange={(e) => setAssetType(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary-500 transition-all text-base">
                        <option value="">Chọn loại</option>
                        <option value="electronic">Đồ điện tử (Điện thoại, Laptop...)</option>
                        <option value="keys">Chìa khóa</option>
                        <option value="valuable">Vật dụng có giá trị (Ví, Trang sức...)</option>
                        <option value="money">Tiền mặt</option>
                        <option value="pet">Vật nuôi (Chó, Mèo...)</option>
                        <option value="other">Khác</option>
                      </select>
                    </div>
                  )}
                </div>

                {identifiable === 'yes' && (
                  <div className="animate-in slide-in-from-top-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Số định danh (Số thẻ/Biển số) *</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <CreditCard className="h-5 w-5 text-gray-400" />
                      </div>
                      <input type="text" required placeholder="Nhập số định danh..." className="w-full bg-blue-50 border border-blue-200 rounded-xl pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all text-base max-w-full box-border" />
                    </div>
                    <p className="text-xs text-blue-600 mt-1">Số này sẽ được hệ thống làm mờ một phần trên bảng tin công cộng.</p>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nhãn hiệu / Thương hiệu</label>
                    <input type="text" placeholder="VD: Apple, Honda, Sony..." className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary-500 transition-all text-base max-w-full box-border" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Màu sắc chính</label>
                    <input type="text" placeholder="VD: Đen, Trắng, Đỏ..." className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary-500 transition-all text-base max-w-full box-border" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Đặc điểm nhận dạng / Mô tả chi tiết *</label>
                  <textarea required rows={3} placeholder="Mô tả chi tiết: tình trạng, số lượng, hoàn cảnh mất..." className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none text-base max-w-full box-border"></textarea>
                </div>

                <div className="grid grid-cols-1 gap-4 border-t border-gray-100 pt-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ngày mất *</label>
                    <div className="relative flex w-full overflow-hidden rounded-xl border border-gray-200 bg-gray-50 focus-within:ring-2 focus-within:ring-primary-500 transition-all">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                        <Calendar className="h-5 w-5 text-gray-400" />
                      </div>
                      <input type="date" required className="flex-1 w-full min-w-0 bg-transparent pl-10 pr-4 py-3 outline-none border-none text-base m-0 appearance-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Khoảng giờ mất *</label>
                    <div className="flex w-full overflow-hidden rounded-xl border border-gray-200 bg-gray-50 focus-within:ring-2 focus-within:ring-primary-500 transition-all">
                      <input type="time" required className="flex-1 w-full min-w-0 bg-transparent px-4 py-3 outline-none border-none text-base m-0 appearance-none" />
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-4 space-y-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1"><MapPin className="w-4 h-4"/> Khu vực mất *</label>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <select required value={province} onChange={(e) => { setProvince(e.target.value); setDistrict(''); setWard(''); }} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary-500 text-base">
                      <option value="">Tỉnh/Thành phố</option>
                      {Object.keys(VIETNAM_DATA).map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                    
                    <select required value={district} onChange={(e) => { setDistrict(e.target.value); setWard(''); }} disabled={!province} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50 text-base">
                      <option value="">Quận/Huyện</option>
                      {districts.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>

                    <select required value={ward} onChange={(e) => setWard(e.target.value)} disabled={!district} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50 text-base">
                      <option value="">Phường/Xã</option>
                      {wards.map(w => <option key={w} value={w}>{w}</option>)}
                    </select>
                  </div>
                  
                  <input type="text" required placeholder="Tuyến đường, công viên, nhà hàng..." className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary-500 transition-all text-base max-w-full box-border" />
                </div>

                <div className="border-t border-gray-100 pt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Hình ảnh tham khảo</label>
                  
                  {images.length > 0 && (
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-3">
                      {images.map((img, idx) => (
                        <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border border-gray-200 group">
                          <img src={img.url} alt="preview" className="w-full h-full object-cover" />
                          <button type="button" onClick={() => removeImage(idx)} className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1 hover:bg-red-500 transition-colors">
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl hover:bg-gray-50 transition-colors cursor-pointer group relative">
                    <div className="space-y-1 text-center">
                      <Camera className="mx-auto h-10 w-10 text-gray-400 group-hover:text-primary-500 transition-colors" />
                      <div className="flex text-sm text-gray-600 justify-center">
                        <span className="relative cursor-pointer bg-transparent font-medium text-primary-600 hover:text-primary-500">
                          <span>Tải ảnh lên</span>
                          <input id="file-upload" name="file-upload" type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" multiple accept="image/*" onChange={handleImageUpload} />
                        </span>
                        <p className="pl-1 hidden sm:block">hoặc kéo thả vào đây</p>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Hình minh họa tài sản bị mất (nếu có)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-start gap-3">
              <input 
                type="checkbox" 
                required 
                id="consent"
                className="mt-0.5 w-4 h-4 text-primary-600 bg-white border-gray-300 rounded focus:ring-primary-500 shrink-0" 
              />
              <label htmlFor="consent" className="text-sm text-gray-700 leading-snug">
                Tôi cam đoan thông tin khai báo là sự thật và đồng ý cho phép hệ thống sử dụng dữ liệu cá nhân (được bảo vệ) để phục vụ mục đích xác minh, đối sánh tài sản theo quy định pháp luật.
              </label>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary-500/30 transition-all active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100 flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                'Đăng tin khai báo mất'
              )}
            </button>
          </form>
        </div>
      )}

      {/* Claim Request Modal */}
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
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-3 left-4 right-4">
                <h3 className="text-xl font-bold text-white leading-tight">{selectedItem.title}</h3>
                <p className="text-xs text-gray-300 mt-1">{selectedItem.location}</p>
              </div>
            </div>
            
            <div className="p-5">
              <p className="text-sm text-gray-600 mb-5 text-center">
                Nếu bạn cho rằng đây là tài sản của mình, hãy gửi yêu cầu nhận lại. Hệ thống sẽ kết nối bạn với cơ quan công an đang bảo quản tài sản.
              </p>
              
              <button 
                onClick={() => {
                  setSelectedItem(null);
                  navigate('/success', { state: { code: 'YC-' + Math.floor(Math.random() * 1000000).toString().padStart(6, '0') } });
                }}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 rounded-xl shadow-md transition-all active:scale-95 mb-2"
              >
                Tôi nghĩ đây là tài sản của tôi
              </button>
              <button 
                onClick={() => setSelectedItem(null)}
                className="w-full py-3 text-gray-500 font-medium text-sm hover:text-gray-800 transition"
              >
                Hủy bỏ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
