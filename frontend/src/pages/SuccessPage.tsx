import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle2, Copy, MapPin, ShieldCheck } from 'lucide-react';
import { useState } from 'react';

export default function SuccessPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const code = location.state?.code || 'TS-000000';
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center pt-8 pb-12 animate-in zoom-in-95 duration-500">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
        <CheckCircle2 className="w-12 h-12 text-green-500" />
      </div>
      
      <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">Gửi khai báo thành công!</h2>
      <p className="text-gray-500 text-center max-w-sm mb-8">
        Hệ thống đã ghi nhận thông tin khai báo của bạn. Cảm ơn hành động đẹp của bạn vì cộng đồng!
      </p>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 w-full max-w-md mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-primary-50 rounded-bl-full -mr-12 -mt-12"></div>
        <p className="text-sm text-gray-500 mb-2 font-medium">Mã hồ sơ của bạn</p>
        <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-xl p-4">
          <span className="text-3xl font-black text-primary-700 tracking-wider">{code}</span>
          <button 
            onClick={copyToClipboard}
            className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors flex flex-col items-center gap-1"
          >
            <Copy className="w-5 h-5" />
            <span className="text-[10px] uppercase font-bold">{copied ? 'Đã copy' : 'Copy'}</span>
          </button>
        </div>
        <p className="text-xs text-amber-600 mt-3 flex items-center gap-1 bg-amber-50 p-2 rounded-lg border border-amber-100">
          <ShieldCheck className="w-4 h-4 shrink-0" /> Hãy lưu lại mã hồ sơ để tra cứu tiến trình xử lý.
        </p>
      </div>

      <div className="bg-blue-50 rounded-2xl p-6 w-full max-w-md mb-8 border border-blue-100">
        <h3 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
          <MapPin className="w-5 h-5" /> Hướng dẫn tiếp theo
        </h3>
        <p className="text-sm text-blue-800 leading-relaxed mb-4">
          Để tài sản sớm được hoàn trả, bạn vui lòng mang tài sản vừa nhặt được đến bàn giao tại:
        </p>
        <ul className="text-sm text-blue-900 font-semibold space-y-3">
          <li className="flex items-start gap-2 bg-white/60 p-3 rounded-lg">
            <span className="w-6 h-6 rounded-full bg-blue-200 flex items-center justify-center shrink-0 text-blue-700">1</span>
            Công an phường/xã gần nhất
          </li>
          <li className="flex items-start gap-2 bg-white/60 p-3 rounded-lg">
            <span className="w-6 h-6 rounded-full bg-blue-200 flex items-center justify-center shrink-0 text-blue-700">2</span>
            Trụ sở UBND phường/xã
          </li>
        </ul>
        <p className="text-xs text-blue-600 mt-4 italic">
          Khi đi vui lòng mang theo Căn cước công dân và cung cấp mã hồ sơ <b>{code}</b> cho cán bộ tiếp nhận.
        </p>
      </div>

      <div className="w-full max-w-md flex flex-col gap-3">
        <button 
          onClick={() => navigate('/')}
          className="w-full bg-gray-900 hover:bg-gray-800 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-gray-900/20"
        >
          Trở về trang chủ
        </button>
        <button 
          className="w-full bg-white hover:bg-gray-50 text-gray-700 font-bold py-4 rounded-xl transition-all border border-gray-200"
        >
          Theo dõi hồ sơ
        </button>
      </div>
    </div>
  );
}
