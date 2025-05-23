export default function NoLocationSelected() {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-[24px]">
      <img
        src="/icons/Clouds.svg"
        alt="빈 상태"
        className="w-[320px] h-[320px]"
      />
      <p className="font-bold text-[36px] text-[#292E2E]">
        아직 선택된 위치가 없습니다!
      </p>
    </div>
  );
}
