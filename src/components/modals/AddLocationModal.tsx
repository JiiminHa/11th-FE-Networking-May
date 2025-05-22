import { useEffect, useState } from "react";
import ModalLayout from "./Modal";
import { useScrollLock } from "../../hooks/useScrollLock";
import { useKakaoLoader } from "../../hooks/useKakaoLoader";

// props 타입 정의
type AddLocationModalProps = {
  icon: string;
  title: string;
  inputLabel: string;
  inputValue: string;
  setInputValue: (val: string) => void;
  latitude: string;
  setLatitude: (val: string) => void;
  longitude: string;
  setLongitude: (val: string) => void;
  onClose: () => void;
  onAdd: () => void;
};

type SearchResult = {
  name: string;
  address: string;
  x: string;
  y: string;
};

export default function AddLocationModal({
  icon,
  title,
  inputValue,
  setInputValue,
  latitude,
  setLatitude,
  longitude,
  setLongitude,
  onClose,
  onAdd,
}: AddLocationModalProps) {
  useScrollLock();
  useKakaoLoader();

  const [locationResults, setLocationResults] = useState<SearchResult[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<string>("");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // 모달 열릴 때 초기화
  useEffect(() => {
    setSelectedIndex(null);
    setLocationResults([]);
    setSelectedAddress("");
  }, []);

  const handleSearch = () => {
    if (
      !window.kakao ||
      !window.kakao.maps ||
      !window.kakao.maps.services ||
      !window.kakao.maps.services.Places
    ) {
      alert("카카오맵 로딩 실패");
      return;
    }

    const ps = new window.kakao.maps.services.Places();
    ps.keywordSearch(inputValue, (data, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        const results = data.map((item: any) => ({
          name: item.place_name,
          address: item.address_name,
          x: item.x,
          y: item.y,
        }));
        setLocationResults(results);
      } else {
        alert("장소 검색 실패");
      }
    });
  };

  const handleSelectLocation = (loc: SearchResult, idx: number) => {
    setInputValue(loc.name);
    setLatitude(loc.y);
    setLongitude(loc.x);
    setSelectedIndex(idx);

    const geocoder = new window.kakao.maps.services.Geocoder();
    geocoder.coord2Address(Number(loc.x), Number(loc.y), (result, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        setSelectedAddress(result[0].address.address_name);
      }
    });
  };

  return (
    <ModalLayout onClose={onClose}>
      <div className="z-50 relative flex flex-col items-start bg-white rounded-[16px] px-[72px] py-[36px] shadow-[4px_4px_4px_3px_rgba(0,0,0,0.25)] gap-[24px] w-[480px]">
        <img
          src="/icons/multiply.svg"
          alt="닫기"
          className="absolute top-4 right-4 w-[24px] h-[24px] cursor-pointer"
          onClick={onClose}
        />

        <div className="flex items-center gap-4 w-full">
          <img src={icon} alt="아이콘" className="w-[80px] h-[80px]" />
          <h2 className="text-[32px] font-bold text-[#292E2E]">{title}</h2>
        </div>

        <div className="relative w-full">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="border-b-[1px] border-[#292E2E] px-[8px] py-[4px] w-full"
            placeholder="장소를 입력하세요"
          />
          <button
            type="button"
            onClick={handleSearch}
            className="absolute top-1/2 right-4 transform -translate-y-1/2"
          >
            <img
              src="/icons/zoom-front-color.svg"
              alt="검색"
              className="w-5 h-5"
            />
          </button>
        </div>

        {locationResults.length > 0 && (
          <ul className="w-full flex flex-col gap-[8px] border border-[#A4A4A4] rounded-[8px] px-[12px] py-[8px] max-h-[200px] overflow-y-scroll custom-scroll">
            {locationResults.map((loc, idx) => (
              <li
                key={idx}
                onClick={() => handleSelectLocation(loc, idx)}
                className="relative border-b last:border-0 border-[#D9D9D9] cursor-pointer px-2 py-1 hover:bg-[#f5f5f5]"
              >
                <div className="text-base font-semibold text-[#292E2E]">
                  {loc.name}
                </div>
                <div className="text-sm text-[#A4A4A4]">{loc.address}</div>
                {selectedIndex === idx && (
                  <img
                    src="/icons/tick-front-color.svg"
                    alt="선택됨"
                    className="absolute top-[12px] right-[12px] w-[24px] h-[24px]"
                  />
                )}
              </li>
            ))}
          </ul>
        )}

        <div className="w-full flex justify-end mt-2">
          <button
            onClick={onAdd}
            className="bg-[#292E2E] text-white px-6 py-2 rounded-[6px] text-[16px] font-semibold"
          >
            확인
          </button>
        </div>
      </div>
    </ModalLayout>
  );
}
