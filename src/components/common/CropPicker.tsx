import React from 'react';
import { useApp } from '../../context/AppContext';
import { Wheat, CheckCircle2 } from 'lucide-react';

export interface CropData {
  id: string;
  nameEn: string;
  nameHi: string;
  nameMr: string;
  categoryEn: 'Cereals' | 'Pulses & Oilseeds' | 'Commercial' | 'Vegetables';
  categoryHi: 'खाद्यान्न' | 'दलहन एवं तिलहन' | 'व्यावसायिक' | 'सब्जियां';
  categoryMr: 'तृणधान्ये' | 'गहाण/तिलहन' | 'व्यावसायिक' | 'भाजीपाला';
  mspRate: string;
  color: string;
  bgGradient: string;
  borderColor: string;
  iconSymbol: string;
}

export const CROP_LIST: CropData[] = [
  {
    id: "Wheat",
    nameEn: "Wheat",
    nameHi: "गेहूं",
    nameMr: "गव्हा",
    categoryEn: "Cereals",
    categoryHi: "खाद्यान्न",
    categoryMr: "तृणधान्ये",
    mspRate: "₹2,275 / qtl",
    color: "text-amber-700",
    bgGradient: "from-amber-500/20 via-amber-400/10 to-amber-100/40",
    borderColor: "border-amber-400",
    iconSymbol: "🌾"
  },
  {
    id: "Rice",
    nameEn: "Rice (Paddy)",
    nameHi: "धान (चावल)",
    nameMr: "तांदूळ (धान)",
    categoryEn: "Cereals",
    categoryHi: "खाद्यान्न",
    categoryMr: "तृणधान्ये",
    mspRate: "₹2,183 / qtl",
    color: "text-emerald-700",
    bgGradient: "from-emerald-500/20 via-emerald-400/10 to-emerald-100/40",
    borderColor: "border-emerald-400",
    iconSymbol: "🍚"
  },
  {
    id: "Soybean",
    nameEn: "Soybean",
    nameHi: "सोयाबीन",
    nameMr: "सोयाबीन",
    categoryEn: "Pulses & Oilseeds",
    categoryHi: "दलहन एवं तिलहन",
    categoryMr: "गहाण/तिलहन",
    mspRate: "₹4,600 / qtl",
    color: "text-green-800",
    bgGradient: "from-green-600/20 via-green-400/10 to-green-100/40",
    borderColor: "border-green-400",
    iconSymbol: "🌱"
  },
  {
    id: "Cotton",
    nameEn: "Cotton",
    nameHi: "कपास",
    nameMr: "कापूस",
    categoryEn: "Commercial",
    categoryHi: "व्यावसायिक",
    categoryMr: "व्यावसायिक",
    mspRate: "₹6,620 / qtl",
    color: "text-slate-800",
    bgGradient: "from-slate-300/40 via-slate-200/20 to-slate-100/50",
    borderColor: "border-slate-300",
    iconSymbol: "☁️"
  },
  {
    id: "Maize",
    nameEn: "Maize (Corn)",
    nameHi: "मक्का",
    nameMr: "मका",
    categoryEn: "Cereals",
    categoryHi: "खाद्यान्न",
    categoryMr: "तृणधान्ये",
    mspRate: "₹2,090 / qtl",
    color: "text-yellow-800",
    bgGradient: "from-yellow-500/20 via-yellow-400/10 to-yellow-100/40",
    borderColor: "border-yellow-400",
    iconSymbol: "🌽"
  },
  {
    id: "Onion",
    nameEn: "Onion",
    nameHi: "प्याज़",
    nameMr: "कांदा",
    categoryEn: "Vegetables",
    categoryHi: "सब्जियां",
    categoryMr: "भाजीपाला",
    mspRate: "₹1,850 / qtl",
    color: "text-purple-800",
    bgGradient: "from-purple-500/20 via-purple-400/10 to-purple-100/40",
    borderColor: "border-purple-300",
    iconSymbol: "🧅"
  },
  {
    id: "Tomato",
    nameEn: "Tomato",
    nameHi: "टमाटर",
    nameMr: "टोमॅटो",
    categoryEn: "Vegetables",
    categoryHi: "सब्जियां",
    categoryMr: "भाजीपाला",
    mspRate: "₹2,100 / qtl",
    color: "text-red-700",
    bgGradient: "from-red-500/20 via-red-400/10 to-red-100/40",
    borderColor: "border-red-300",
    iconSymbol: "🍅"
  },
  {
    id: "Sugarcane",
    nameEn: "Sugarcane",
    nameHi: "गन्ना",
    nameMr: "ऊस",
    categoryEn: "Commercial",
    categoryHi: "व्यावसायिक",
    categoryMr: "व्यावसायिक",
    mspRate: "₹315 / qtl",
    color: "text-lime-800",
    bgGradient: "from-lime-500/20 via-lime-400/10 to-lime-100/40",
    borderColor: "border-lime-400",
    iconSymbol: "🎋"
  }
];

interface CropPickerProps {
  selectedCrop: string;
  onSelectCrop: (cropId: string) => void;
}

export const CropPicker: React.FC<CropPickerProps> = ({ selectedCrop, onSelectCrop }) => {
  const { language, t } = useApp();

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs font-black uppercase text-farm-dark tracking-wider flex items-center gap-1.5">
          <Wheat className="w-4 h-4 text-amber-500" />
          {t('selectCropTitle')}
        </label>
        <span className="text-[11px] text-emerald-800 font-bold bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300">
          {t('govtMspBadge')}
        </span>
      </div>

      {/* Visual Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {CROP_LIST.map((crop) => {
          const isSelected = selectedCrop === crop.id;
          const cropName = language === 'hi' ? crop.nameHi : language === 'mr' ? crop.nameMr : crop.nameEn;
          const categoryName = language === 'hi' ? crop.categoryHi : language === 'mr' ? crop.categoryMr : crop.categoryEn;

          return (
            <div
              key={crop.id}
              onClick={() => onSelectCrop(crop.id)}
              className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                isSelected
                  ? `bg-gradient-to-br ${crop.bgGradient} ${crop.borderColor} ring-2 ring-amber-400 shadow-md scale-[1.02]`
                  : 'bg-white border-gray-200 hover:border-emerald-300 hover:bg-emerald-50/30'
              }`}
            >
              {isSelected && (
                <div className="absolute top-2 right-2 bg-amber-400 text-slate-950 rounded-full p-0.5 shadow">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
              )}

              <div className="flex items-center gap-2">
                <span className="text-2xl drop-shadow">{crop.iconSymbol}</span>
                <div>
                  <h4 className="font-extrabold text-xs text-gray-900 leading-tight">{cropName}</h4>
                  <span className="text-[10px] text-gray-500 font-semibold">{categoryName}</span>
                </div>
              </div>

              <div className="mt-2 pt-2 border-t border-gray-200/60 flex items-center justify-between text-[11px]">
                <span className="text-gray-500 font-medium">MSP:</span>
                <span className={`font-black ${crop.color}`}>{crop.mspRate}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
