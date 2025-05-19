import type { LocationItem } from "../types/location";

type Props = {
  item: LocationItem;
  onClickPin: (id: number) => void;
  onClickDelete: (id: number) => void;
};

export default function LocationItemCard({
  item,
  onClickPin,
  onClickDelete,
}: Props) {
  return (
    <div className="group flex items-center gap-[16px] p-[8px] rounded-[12px] hover:bg-[#F2F2F2] hover:shadow-[2px_2px_2px_1px_rgba(0,0,0,0.1)] transition-all">
      <img
        src={
          item.isPinned
            ? "/icons/pin-front-color.svg"
            : "/icons/pin-front-clay.svg"
        }
        alt="핀"
        className="w-[24px] h-[24px] cursor-pointer"
        onClick={() => onClickPin(item.id)}
      />

      <span className="text-[16px] font-semibold text-[#292E2E]">
        {item.name}
      </span>

      <img
        src="/icons/trash-can-front-color.svg"
        alt="삭제"
        className="ml-auto w-[24px] h-[24px] opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
        onClick={() => onClickDelete(item.id)}
      />
    </div>
  );
}
