// AddLocationModal.tsx
import ModalLayout from "./Modal";
import { useScrollLock } from "../../hooks/useScrollLock";
import { useEffect } from "react";

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

  useEffect(() => {
    const interval = setInterval(() => {
      if (
        window.kakao &&
        window.kakao.maps &&
        window.kakao.maps.services &&
        window.kakao.maps.services.Places
      ) {
        console.log("✅ Kakao Maps SDK 로딩 완료");
        clearInterval(interval);
      } else {
        console.log("⏳ Kakao Maps SDK 로딩 중...");
      }
    }, 500);

    return () => clearInterval(interval);
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

    // handleSearch
    const ps = new window.kakao.maps.services.Places();
    ps.keywordSearch(inputValue, (data, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        const result = data[0];
        setLatitude(result.y);
        setLongitude(result.x);
      } else {
        alert("장소 검색 실패");
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
          <img
            src={icon}
            alt="아이콘"
            className="w-[80px] h-[80px] self-center"
          />
          <h2 className="text-[32px] font-bold text-[#292E2E] leading-tight">
            {title}
          </h2>
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

        <div className="text-sm text-gray-500 mt-2">
          위도: {latitude} / 경도: {longitude}
        </div>

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
