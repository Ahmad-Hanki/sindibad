import { cn } from "@/lib/utils";
import Image, { StaticImageData } from "next/image";
type ImageProps = {
  url: string | StaticImageData;
  addClass?: string;
  clas?: string;
};

function Images({ url, addClass, clas }: ImageProps) {
  return (
    <div className={cn("aspect-square relative overflow-hidden", addClass)}>
      <Image
        fill
        alt={url.toString()}
        priority
        src={url}
        className={clas}
        unoptimized
      />
    </div>
  );
}

export default Images;
