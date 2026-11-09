import React from 'react';
import { Certificate } from '../../types';
import { VeloraLogo } from '../brand/VeloraLogo';
import { X, Download, Printer, Award, ShieldCheck, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CertificateModalProps {
  certificate: Certificate | null;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  certificate,
  onClose,
}) => {
  if (!certificate) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCelebrate = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-in fade-in duration-300">
      <div 
        className="relative w-full max-w-3xl rounded-3xl glass-panel-elevated p-6 sm:p-8 shadow-[0_0_80px_rgba(139,92,246,0.35)] border border-purple-500/40 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Controls Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6 print:hidden">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Rasmiy VELORA Raqamli Sertifikati
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCelebrate}
              className="px-3 py-1.5 rounded-xl bg-purple-900/60 hover:bg-purple-800 text-purple-200 text-xs font-semibold flex items-center gap-1.5 transition-all"
            >
              🎉 Qayta nishonlash
            </button>
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>Chop etish / PDF saqlash</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* The Printable Certificate Canvas */}
        <div 
          id="certificate-print-area"
          className="relative bg-gradient-to-br from-[#0c0c1b] via-[#080813] to-[#0d0a20] rounded-2xl p-8 sm:p-12 border-2 border-amber-500/30 shadow-2xl overflow-hidden text-center select-none"
        >
          {/* Ornamental Luxury Border Frames */}
          <div className="absolute inset-2 border border-purple-500/20 rounded-xl pointer-events-none" />
          <div className="absolute inset-4 border border-cyan-500/20 rounded-lg pointer-events-none" />

          {/* Hologram Watermark in background */}
          <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-12 -top-12 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Official VELORA Brand Logo Header */}
          <div className="flex justify-center mb-6">
            <VeloraLogo size="lg" showSlogan={true} />
          </div>

          <p className="text-xs font-mono uppercase tracking-[0.3em] text-cyan-400 font-bold mb-2">
            XALQARO DASTURLASH AKADEMIYASI
          </p>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-wide mb-1 font-serif">
            SERTIFIKAT
          </h2>

          <p className="text-xs text-slate-400 uppercase tracking-widest mb-6">
            MUVAFFAQIYATLI TAMOMLANGANLIK TO‘G‘RISIDA
          </p>

          <p className="text-xs text-slate-400 italic mb-2">
            Ushbu hujjat tasdiqlaydiki:
          </p>

          {/* Student Name */}
          <h1 className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-purple-300 to-amber-300 py-1 mb-3">
            {certificate.studentName}
          </h1>

          <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed mb-4">
            VELORA platformasida quyidagi professional dasturlash kursini barcha amaliy topshiriqlar, 
            laboratoriya ishlari va test sinovlarini <span className="font-bold text-amber-400">{certificate.grade}</span> natija 
            bilan to‘liq tamomladi:
          </p>

          {/* Course Name */}
          <div className="inline-block px-6 py-2 rounded-xl bg-purple-950/80 border border-purple-500/40 text-purple-200 text-base sm:text-lg font-bold mb-8 shadow-[0_0_20px_rgba(139,92,246,0.3)]">
            {certificate.courseTitle}
          </div>

          {/* Certificate Verification Footer */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-white/10 items-center text-xs">
            {/* Left: Issue Date */}
            <div className="text-left sm:text-left">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Berilgan Sana</span>
              <span className="font-semibold text-slate-200 font-mono">{certificate.issuedDate}</span>
              <span className="text-[10px] text-slate-400 block mt-0.5">Davomiylik: {certificate.hoursSpent} soat</span>
            </div>

            {/* Center: Gold Stamp / Hologram Badge */}
            <div className="flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-600 via-yellow-400 to-amber-200 p-0.5 shadow-[0_0_25px_rgba(245,158,11,0.4)]">
                <div className="w-full h-full rounded-full bg-[#090914] flex flex-col items-center justify-center text-amber-300">
                  <ShieldCheck className="w-6 h-6 text-yellow-400" />
                  <span className="text-[7px] font-black tracking-widest uppercase">TASDIQLANGAN</span>
                </div>
              </div>
            </div>

            {/* Right: Verification Serial Code & QR */}
            <div className="text-right sm:text-right">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Tekshiruv Raqami</span>
              <span className="font-bold text-cyan-400 font-mono tracking-wider">{certificate.verificationCode}</span>
              <div className="flex items-center justify-end gap-1 text-[10px] text-emerald-400 mt-0.5">
                <CheckCircle2 className="w-3 h-3" />
                <span>velora.uz/verify</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
