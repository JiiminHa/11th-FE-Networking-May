import type { LocationItem } from "../types/location";

type LocationItemCardProps = {
  item: LocationItem;
  onClickPin: (id: number) => void;
  onClickDelete: (id: number) => void;
  onClick?: () => void;
};

export default function LocationItemCard({
  item,
  onClickPin,
  onClickDelete,
  onClick,
}: LocationItemCardProps) {
  return (
    <div
      onClick={onClick}
      className="group flex items-center gap-[16px] p-[8px] rounded-[12px] hover:bg-[#F2F2F2] hover:shadow-[2px_2px_2px_1px_rgba(0,0,0,0.1)] transition-all cursor-pointer"
    >
      {/* 핀 버튼 */}
      <img
        src={
          item.isPinned
            ? "/icons/pin-front-color.svg"
            : "/icons/pin-front-clay.svg"
        }
        alt="핀"
        className="w-[24px] h-[24px]"
        onClick={(e) => {
          e.stopPropagation(); // 상위 onClick 방지
          onClickPin(item.id);
        }}
      />

      {/* 장소명 */}
      <span className="text-[16px] font-semibold text-[#292E2E]">
        {item.placeName}
      </span>

      {/* 삭제 버튼 */}
      <img
        src="/icons/trash-can-front-color.svg"
        alt="삭제"
        className="ml-auto w-[24px] h-[24px] opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={(e) => {
          e.stopPropagation(); // 상위 onClick 방지
          onClickDelete(item.id);
        }}
      />
    </div>
  );
}
