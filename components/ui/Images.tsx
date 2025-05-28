import Image, { StaticImageData } from "next/image";
type ImageProps = {
  url: string | StaticImageData;
  addClass?: string;
  clas?: string;
};

function Images({ url, addClass, clas }: ImageProps) {
  return (
    <div
      className={` ${addClass}
    } " aspect-square relative overflow-hidden "`}
    >
      <Image
        fill
        alt={url.toString()}
        priority
        src={url}
        className={` ${clas} `}
        unoptimized
      />
    </div>
  );
}

export default Images;
