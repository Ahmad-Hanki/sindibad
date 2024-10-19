import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import bg from "@/public/images/bg.png";
import Image from "next/image";
import Link from "next/link";

interface HeroProps {
  title: string;
  description: string;
  buttonText: string;
}

const Hero = ({ buttonText, description, title }: HeroProps) => {
  // get the image from the backend
  return (
    <div className="absolute inset-0 w-full -z-10">
      <div className="w-full min-h-screen aspect-auto relative">
        <div>
          <Image
            src={bg}
            alt="bg"
            fill
            className="object-cover object-center"
          />
        </div>

        <div className="absolute w-full h-full flex items-center">
          <div className="w-full">
            <Container>
              <div className="space-y-5">
                <h1 className="text-5xl text-white font-semibold">{title}</h1>
                <p className="text-gray-300 max-w-2xl text-xl">{description}</p>
                <div className="pt-3">
                  <Link href={"/menu"}>
                    <Button className="px-3 rounded-md text-lg">
                      {buttonText}
                    </Button>
                  </Link>
                </div>
              </div>
            </Container>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
