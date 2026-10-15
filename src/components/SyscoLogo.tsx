import Image from "next/image";

type Props = {
  className?: string;
  sizes: string;
  priority?: boolean;
  alt?: string;
};

export default function SyscoLogo({ className = "", sizes, priority, alt = "" }: Props) {
  return (
    <span className={`relative block shrink-0 overflow-hidden rounded-full ${className}`}>
      <Image
        src="/images/sysco.png"
        alt={alt}
        width={386}
        height={430}
        priority={priority}
        sizes={sizes}
        className="absolute max-w-none"
        style={{ width: "128.7%", height: "143.3%", left: "-16%", top: "-14.7%" }}
      />
    </span>
  );
}
