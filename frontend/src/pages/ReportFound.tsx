import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, MapPin, Calendar, FileText, User, Phone, CreditCard, ChevronLeft, ShieldCheck, X } from 'lucide-react';
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

export default function ReportFound() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [identifiable, setIdentifiable] = useState<string>('');
  const [assetType, setAssetType] = useState('');

  const [province, setProvince] = useState('');
  const [district, setDistrict] = useState('');
  const [ward, setWard] = useState('');

  const [images, setImages] = useState<{ file: File, url: string }[]>([]);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/success', {
        state: {
          code: 'TS-' + Math.floor(Math.random() * 1000000).toString().padStart(6, '0')
        }
      });
    }, 1500);
  };

  return (
    <div className="flex flex-col py-4 animate-in fade-in duration-500 pb-20">
      <div className="flex items-center gap-3 mb-6">
        <Link to="/" className="p-2 -ml-2 text-gray-500 hover:text-gray-900 rounded-full hover:bg-gray-100 transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </Link>
        <h2 className="text-xl font-bold text-gray-900">Khai báo tài sản nhặt được</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">

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
            <FileText className="w-5 h-5" /> Thông tin tài sản
          </h3>

          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phân loại *</label>
                <select
                  required
                  value={identifiable}
                  onChange={(e) => { setIdentifiable(e.target.value); setAssetType(''); }}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                >
                  <option value="">-- Chọn phân loại --</option>
                  <option value="yes">Tài sản định danh được</option>
                  <option value="no">Tài sản KHÔNG định danh được</option>
                </select>
              </div>

              {identifiable === 'yes' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Loại tài sản định danh *</label>
                  <select required value={assetType} onChange={(e) => setAssetType(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary-500 transition-all">
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
                  <select required value={assetType} onChange={(e) => setAssetType(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary-500 transition-all">
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
                  <input type="text" required placeholder="Nhập số định danh..." className="w-full bg-blue-50 border border-blue-200 rounded-xl pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                </div>
                <p className="text-xs text-blue-600 mt-1">Số này sẽ được hệ thống làm mờ tự động (Ví dụ: 29H1-****) khi hiển thị công khai.</p>
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
              <textarea required rows={3} placeholder="Mô tả chi tiết: tình trạng, số lượng, hoàn cảnh nhặt được..." className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none text-base max-w-full box-border"></textarea>
            </div>

            <div className="grid grid-cols-1 gap-4 border-t border-gray-100 pt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" >Ngày nhặt được *</label>
                <div className="relative flex w-full overflow-hidden rounded-xl border border-gray-200 bg-gray-50 focus-within:ring-2 focus-within:ring-primary-500 transition-all">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <input type="date" required className="flex-1 w-full min-w-0 bg-transparent pl-10 pr-4 py-3 outline-none border-none text-base m-0 appearance-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Giờ nhặt được *</label>
                <div className="flex w-full overflow-hidden rounded-xl border border-gray-200 bg-gray-50 focus-within:ring-2 focus-within:ring-primary-500 transition-all">
                  <input type="time" required className="flex-1 w-full min-w-0 bg-transparent px-4 py-3 outline-none border-none text-base m-0 appearance-none" />
                </div>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-4 space-y-4">
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1"><MapPin className="w-4 h-4" /> Địa điểm nhặt được *</label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <select required value={province} onChange={(e) => { setProvince(e.target.value); setDistrict(''); setWard(''); }} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary-500">
                  <option value="">Tỉnh/Thành phố</option>
                  {Object.keys(VIETNAM_DATA).map(p => <option key={p} value={p}>{p}</option>)}
                </select>

                <select required value={district} onChange={(e) => { setDistrict(e.target.value); setWard(''); }} disabled={!province} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50">
                  <option value="">Quận/Huyện</option>
                  {districts.map(d => <option key={d} value={d}>{d}</option>)}
                </select>

                <select required value={ward} onChange={(e) => setWard(e.target.value)} disabled={!district} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50">
                  <option value="">Phường/Xã</option>
                  {wards.map(w => <option key={w} value={w}>{w}</option>)}
                </select>
              </div>

              <input type="text" required placeholder="Số nhà, tên đường, tòa nhà..." className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary-500 transition-all" />
            </div>

            <div className="border-t border-gray-100 pt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Hình ảnh đính kèm</label>

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
                  <p className="text-xs text-gray-500">PNG, JPG tối đa 10MB</p>
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
            'Gửi khai báo'
          )}
        </button>
      </form>
    </div>
  );
}
