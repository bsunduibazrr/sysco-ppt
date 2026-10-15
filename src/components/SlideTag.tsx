type Props = {
  no: number;
  label: string;
  className?: string;
};

export default function SlideTag({ no, label, className = "" }: Props) {
  return (
    <div className={`flex items-center gap-3 font-body text-[11px] font-bold uppercase tracking-[0.3em] ${className}`}>
      <span className="font-display text-base tracking-normal">{String(no).padStart(2, "0")}</span>
      <span className="h-px w-10 bg-current opacity-60" />
      <span>{label}</span>
    </div>
  );
}
