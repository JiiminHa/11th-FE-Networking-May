import ModalLayout from "./Modal";
import { useState } from "react";
import { useScrollLock } from "../../hooks/useScrollLock";

type LocationResult = {
  name: string;
  address: string;
};

type AddLocationModalProps = {
  icon: string;
  title: string;
  inputLabel: string;
  inputValue: string;
  setInputValue: (val: string) => void;
  onClose: () => void;
  onAdd: () => void;
};

export default function AddLocationModal({
  icon,
  title,
  inputLabel,
  inputValue,
  setInputValue,
  onClose,
  onAdd,
}: AddLocationModalProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  useScrollLock();
  // Dummy 검색 결과 - 나중에 API로 교체
  const locationResults: LocationResult[] = [
    { name: "KFC 광화문점", address: "서울 종로구 세종로 161-1" },
    { name: "KFC 부산서면점", address: "부산 부산진구 부전동 241-17" },
    { name: "KFC 홍익대점", address: "서울 마포구 동교동 165-8" },
  ];

  return (
    <ModalLayout onClose={onClose}>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="fixed inset-0 bg-[#292E2E]/40" onClick={onClose} />

        <div className="z-50 relative flex flex-col items-start bg-white rounded-[16px] px-[72px] py-[36px] shadow-[4px_4px_4px_3px_rgba(0,0,0,0.25)] gap-[24px] w-[480px]">
          <img
            src="/icons/multiply.svg"
            alt="닫기"
            className="absolute top-4 right-4 w-[24px] h-[24px] cursor-pointer"
            onClick={onClose}
          />

          {/* 상단 아이콘 + 제목 */}
          <div className="flex items-center gap-4 w-full">
            <img
              src={icon}
              alt="아이콘"
              className="w-[80px] h-[80px] self-center"
            />
            <h2 className="text-[32px] font-bold text-[#292E2E] leading-tight">
              {title}
            </h2>
          </div>

          {/* 입력 라벨 + 검색창 */}
          <div className="w-full text-left gap-[8px] flex flex-col">
            <label className="text-[24px] font-semibold text-[#292E2E] block">
              {inputLabel}
            </label>

            <div className="relative w-full">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="border-b-[1px] border-[#292E2E]  px-[8px] py-[4px] w-full"
                placeholder="장소를 입력하세요"
              />
              <img
                src="/icons/zoom-front-color.svg"
                alt="검색"
                className="absolute top-1/2 right-4 transform -translate-y-1/2 w-5 h-5"
              />
            </div>
          </div>

          {/* 검색 결과 리스트 */}
          <ul className="w-full flex flex-col gap-[16px] border border-[#A4A4A4] rounded-[8px] px-[16px] py-[8px] overflow-hidden">
            {locationResults.map((loc, idx) => (
              <li
                key={idx}
                onClick={() => {
                  setSelectedIndex(idx);
                  setInputValue(loc.name);
                }}
                className={`relative cursor-pointer`}
              >
                <div className="border-b border-[#A4A4A4] px-[12px] py-[8px] flex flex-col gap-[4px]">
                  <div className="text-base font-semibold text-[#292E2E]">
                    {loc.name}
                  </div>
                  <div className="text-sm text-[#A4A4A4]">{loc.address}</div>
                </div>

                {selectedIndex === idx && (
                  <img
                    src="/icons/tick-front-color.svg"
                    alt="선택됨"
                    className="absolute top-[12px] right-[12px] w-[36px] h-[36px]"
                  />
                )}
              </li>
            ))}
          </ul>

          {/* 확인 버튼 */}
          <div className="w-full flex justify-end mt-2">
            <button
              onClick={onAdd}
              className="bg-[#292E2E] text-white px-6 py-2 rounded-[6px] text-[16px] font-semibold"
            >
              확인
            </button>
          </div>
        </div>
      </div>
    </ModalLayout>
  );
}
