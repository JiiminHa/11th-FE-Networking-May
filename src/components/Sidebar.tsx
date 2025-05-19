import { useState } from "react";
import type { LocationItem } from "../types/location";
import LocationItemCard from "./LocationItemCard";

const initialLocations: LocationItem[] = [
  { id: 1, name: "강남역 1번출구", isPinned: true },
  { id: 2, name: "RATTHAT", isPinned: false },
  { id: 3, name: "파이홀", isPinned: false },
  { id: 4, name: "청수당공명", isPinned: false },
  { id: 5, name: "롯데월드", isPinned: false },
  { id: 6, name: "구관", isPinned: false },
  { id: 7, name: "Osiu", isPinned: false },
];

export default function Sidebar() {
  const [locations, setLocations] = useState<LocationItem[]>(initialLocations);

  const handleClickPin = (id: number) => {
    setLocations((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isPinned: !item.isPinned } : item
      )
    );
  };

  const handleClickDelete = (id: number) => {
    setLocations((prev) => prev.filter((item) => item.id !== id));
  };

  // 고정된 위치가 위로 오도록 정렬
  const sortedLocations = [...locations].sort((a, b) =>
    a.isPinned === b.isPinned ? 0 : a.isPinned ? -1 : 1
  );

  return (
    <aside className="w-[248px] rounded-tr-[48px] rounded-br-[48px] border-[1px] border-[#F2F2F2] shadow-[0_0_8px_2px_rgba(0,0,0,0.1)] shrink-0 px-[16px] py-[48px]">
      <div className="flex flex-col gap-[40px]">
        <div className="flex items-center gap-[16px]">
          <img
            src="/icons/map-pin-front-color.svg"
            alt="지도 핀 아이콘"
            className="w-[40px] h-[40px]"
          />
          <span className="text-[20px] font-bold text-[#292E2E]">
            위치 목록
          </span>
        </div>

        <div className="flex items-center gap-[16px]">
          <img
            src="/icons/plus-front-clay.svg"
            alt="추가하기"
            className="w-[40px] h-[40px]"
          />
          <span className="text-[20px] font-bold text-[#292E2E]">추가하기</span>
        </div>

        <div className="flex flex-col gap-[8px] px-[8px]">
          {sortedLocations.map((item) => (
            <LocationItemCard
              key={item.id}
              item={item}
              onClickPin={handleClickPin}
              onClickDelete={handleClickDelete}
            />
          ))}
        </div>
      </div>
    </aside>
  );
}
