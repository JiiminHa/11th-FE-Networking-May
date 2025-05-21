// 외부 import
import { useState } from "react";
import type { LocationItem } from "../types/location";
import LocationItemCard from "./LocationItemCard";
import AddLocationModal from "./modals/AddLocationModal";
import ConfirmModal from "./modals/ConfirmModal";

// 초기 위치 데이터
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
  // 상태 정의
  const [locations, setLocations] = useState<LocationItem[]>(initialLocations);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newLocationName, setNewLocationName] = useState("");
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);

  // 위치 고정 토글
  const handleClickPin = (id: number) => {
    setLocations((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isPinned: !item.isPinned } : item
      )
    );
  };

  // 삭제 대상 설정
  const handleClickDelete = (id: number) => {
    setDeleteTargetId(id);
  };

  // 삭제 확정 처리
  const confirmDelete = () => {
    if (deleteTargetId !== null) {
      setLocations((prev) => prev.filter((item) => item.id !== deleteTargetId));
      setDeleteTargetId(null);
    }
  };

  // 위치 추가 처리
  const handleAddLocation = () => {
    if (newLocationName.trim() === "") return;

    const newLocation: LocationItem = {
      id: Date.now(),
      name: newLocationName.trim(),
      isPinned: false,
    };

    setLocations((prev) => [...prev, newLocation]);
    setNewLocationName("");
    setIsAddModalOpen(false);
  };

  // 고정 여부 기준으로 정렬
  const sortedLocations = [...locations].sort((a, b) =>
    a.isPinned === b.isPinned ? 0 : a.isPinned ? -1 : 1
  );

  return (
    <>
      {/* 위치 목록 사이드바 */}
      <aside className="w-[248px] rounded-tr-[48px] rounded-br-[48px] border-[1px] border-[#F2F2F2] shadow-[0_0_8px_2px_rgba(0,0,0,0.1)] shrink-0 px-[16px] py-[48px]">
        <div className="flex flex-col gap-[40px]">
          {/* 헤더 */}
          <div className="flex items-center gap-[16px]">
            <img
              src="../icons/map-pin-front-color.svg"
              alt="지도 핀 아이콘"
              className="w-[40px] h-[40px]"
            />
            <span className="text-[20px] font-bold text-[#292E2E]">
              위치 목록
            </span>
          </div>

          {/* 위치 추가 버튼 */}
          <button
            className="flex items-center gap-[16px]"
            onClick={() => setIsAddModalOpen(true)}
          >
            <img
              src="../icons/plus-front-clay.svg"
              alt="추가하기"
              className="w-[40px] h-[40px]"
            />
            <span className="text-[20px] font-bold text-[#292E2E]">
              추가하기
            </span>
          </button>

          {/* 위치 목록 리스트 */}
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

      {/* 위치 추가 모달 */}
      {isAddModalOpen && (
        <AddLocationModal
          icon="../icons/Clouds.png"
          title="날씨 위치 추가"
          inputLabel="장소 이름"
          inputValue={newLocationName}
          setInputValue={setNewLocationName}
          onClose={() => setIsAddModalOpen(false)}
          onAdd={handleAddLocation}
        />
      )}

      {/* 삭제 확인 모달 */}
      {deleteTargetId !== null && (
        <ConfirmModal
          title="정말로 삭제하시겠습니까?"
          icon="../icons/MoonThunder.png"
          onCancel={() => setDeleteTargetId(null)}
          onConfirm={confirmDelete}
        />
      )}
    </>
  );
}
