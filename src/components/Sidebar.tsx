import { useState } from "react";
import type { LocationItem } from "../types/location";
import LocationItemCard from "./LocationItemCard";
import AddLocationModal from "./AddLocationModal";
import { useScrollLock } from "../hooks/useScrollLock";

const initialLocations: LocationItem[] = [
  { id: 1, name: "강남역 1번출구", isPinned: true },
  { id: 2, name: "RATTHAT", isPinned: false },
  { id: 3, name: "파이홀", isPinned: false },
  { id: 4, name: "청수당공명", isPinned: false },
  { id: 5, name: "롯데월드", isPinned: false },
  { id: 6, name: "구관", isPinned: false },
  { id: 7, name: "Osiu", isPinned: false },
];

type ConfirmModalProps = {
  title: string;
  icon: string;
  onCancel: () => void;
  onConfirm: () => void;
};

const ConfirmModal = ({
  title,
  icon,
  onCancel,
  onConfirm,
}: ConfirmModalProps) => {
  useScrollLock();
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#292E2E]/40 z-50">
      <div className="flex flex-col items-center justify-center bg-white rounded-[16px] px-[108px] py-[36px] shadow-[4px_4px_4px_3px_rgba(0,0,0,0.25)] gap-[24px]">
        <span className="text-[32px] font-bold text-[#292E2E] text-center">
          {title}
        </span>
        {icon && (
          <img src={icon} alt="삭제 아이콘" className="w-[160px] h-[160px]" />
        )}
        <div className="flex gap-[16px]">
          <button
            onClick={onCancel}
            className="px-[24px] py-[6px] rounded-[6px] border-[1px] border-[#292E2E] text-[#292E2E] text-[20px] font-semibold"
          >
            취소하기
          </button>
          <button
            onClick={onConfirm}
            className="px-[24px] py-[6px] rounded-[6px] bg-[#292E2E] border-[1px] border-[#292E2E] text-white text-[20px] font-semibold"
          >
            삭제하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Sidebar() {
  const [locations, setLocations] = useState<LocationItem[]>(initialLocations);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newLocationName, setNewLocationName] = useState("");
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);

  const handleClickPin = (id: number) => {
    setLocations((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isPinned: !item.isPinned } : item
      )
    );
  };

  const handleClickDelete = (id: number) => {
    setDeleteTargetId(id);
  };

  const confirmDelete = () => {
    if (deleteTargetId !== null) {
      setLocations((prev) => prev.filter((item) => item.id !== deleteTargetId));
      setDeleteTargetId(null);
    }
  };

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

  const sortedLocations = [...locations].sort((a, b) =>
    a.isPinned === b.isPinned ? 0 : a.isPinned ? -1 : 1
  );

  return (
    <>
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

          <button
            className="flex items-center gap-[16px]"
            onClick={() => setIsAddModalOpen(true)}
          >
            <img
              src="/icons/plus-front-clay.svg"
              alt="추가하기"
              className="w-[40px] h-[40px]"
            />
            <span className="text-[20px] font-bold text-[#292E2E]">
              추가하기
            </span>
          </button>

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

      {isAddModalOpen && (
        <AddLocationModal
          icon="/icons/Clouds.png"
          title="날씨 위치 추가"
          inputLabel="장소 이름"
          inputValue={newLocationName}
          setInputValue={setNewLocationName}
          onClose={() => setIsAddModalOpen(false)}
          onAdd={handleAddLocation}
        />
      )}

      {deleteTargetId !== null && (
        <ConfirmModal
          title="정말로 삭제하시겠습니까?"
          icon="/icons/MoonThunder.png"
          onCancel={() => setDeleteTargetId(null)}
          onConfirm={confirmDelete}
        />
      )}
    </>
  );
}
