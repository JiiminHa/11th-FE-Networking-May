// 모달 레이아웃만 담당
type ModalLayoutProps = {
  children: React.ReactNode;
  onClose: () => void;
};

export default function ModalLayout({ children, onClose }: ModalLayoutProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-[#292E2E]/40" onClick={onClose} />
      {children}
    </div>
  );
}
