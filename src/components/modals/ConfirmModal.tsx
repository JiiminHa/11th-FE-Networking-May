import ModalLayout from "./Modal";
import { useScrollLock } from "../../hooks/useScrollLock";

type ConfirmModalProps = {
  title: string;
  icon: string;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function ConfirmModal({
  title,
  icon,
  onCancel,
  onConfirm,
}: ConfirmModalProps) {
  useScrollLock();

  return (
    <ModalLayout onClose={onCancel}>
      <div className="flex flex-col items-center justify-center bg-white rounded-[16px] px-[108px] py-[36px] shadow-[4px_4px_4px_3px_rgba(0,0,0,0.25)] gap-[24px] w-[480px]">
        <span className="text-[32px] font-bold text-[#292E2E] text-center">
          {title}
        </span>
        {icon && (
          <img src={icon} alt="삭제 아이콘" className="w-[160px] h-[160px]" />
        )}
        <div className="flex gap-[16px] mt-4">
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
    </ModalLayout>
  );
}
