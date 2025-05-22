// 외부 import
import { useEffect, useState } from "react";
import type { LocationItem } from "../types/location";
import LocationItemCard from "./LocationItemCard";
import AddLocationModal from "./modals/AddLocationModal";
import ConfirmModal from "./modals/ConfirmModal";
import api from "../../src/api/axios";
import axios from "axios";

export default function Sidebar() {
  const [locations, setLocations] = useState<LocationItem[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newLocationName, setNewLocationName] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);

  const handleLogin = async () => {
    try {
      const res = await api.post("/users/login", {
        email: "testuser2@example.com",
        password: "Test1234!",
      });
      console.log("로그인 성공 응답:", res);
      alert("로그인 성공!");
      fetchLocations();
    } catch (err) {
      console.error("로그인 실패:", err);
      alert("로그인 실패");
    }
  };

  // 위치 목록을 가져오는 함수
  const fetchLocations = async () => {
    try {
      const res = await api.get("/locations");
      setLocations(res.data.results);
    } catch (err) {
      // 타입 좁히기: err가 AxiosError인지 확인
      if (axios.isAxiosError(err)) {
        if (err.response?.status !== 401) {
          console.error("목록 조회 실패", err);
          alert("위치 목록을 불러오는 데 실패했습니다.");
        }
      } else {
        console.error("예상치 못한 에러", err);
      }
    }
  };

  // 컴포넌트가 마운트될 때 위치 목록을 가져옴
  useEffect(() => {
    fetchLocations();
  }, []);

  // 위치 고정 토글
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

  // 삭제 확인 후 API 호출
  const confirmDelete = async () => {
    if (deleteTargetId === null) return;
    try {
      await api.delete(`/locations/${deleteTargetId}`);
      setDeleteTargetId(null);
      fetchLocations();
    } catch (error) {
      console.error("삭제 실패:", error);
      alert("삭제에 실패했습니다. 다시 시도해주세요");
    }
  };

  // 위치 추가
  const handleAddLocation = async () => {
    if (!newLocationName.trim() || !latitude || !longitude) return;
    try {
      await api.post("/locations", {
        placeName: newLocationName.trim(),
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        pinned: false,
      });

      alert("위치가 추가되었습니다!");
      setNewLocationName("");
      setLatitude("");
      setLongitude("");
      setIsAddModalOpen(false);
      fetchLocations();
    } catch (error) {
      console.error("위치 추가 실패:", error);
      alert("위치 추가에 실패했습니다. 다시 시도해주세요.");
    }
  };

  // 위치 목록을 고정된 순서로 정렬
  const sortedLocations = [...locations].sort((a, b) =>
    a.isPinned === b.isPinned ? 0 : a.isPinned ? -1 : 1
  );

  return (
    <>
      {/* 임시 로그인 버튼 */}
      <button
        onClick={handleLogin}
        className="bg-[#292E2E] text-white px-4 py-2 rounded-md text-sm"
      >
        임시 로그인
      </button>
      ;
      <aside className="w-[248px] rounded-tr-[48px] rounded-br-[48px] border-[1px] border-[#F2F2F2] shadow-[0_0_8px_2px_rgba(0,0,0,0.1)] shrink-0 px-[16px] py-[48px]">
        <div className="flex flex-col gap-[40px]">
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
          icon="../icons/Clouds.png"
          title="날씨 위치 추가"
          inputLabel="장소 이름"
          inputValue={newLocationName}
          setInputValue={setNewLocationName}
          latitude={latitude}
          setLatitude={setLatitude}
          longitude={longitude}
          setLongitude={setLongitude}
          onClose={() => setIsAddModalOpen(false)}
          onAdd={handleAddLocation}
        />
      )}
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
