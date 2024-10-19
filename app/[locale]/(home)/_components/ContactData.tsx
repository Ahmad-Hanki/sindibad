import Container from "@/components/Container";
import { Card } from "@/components/ui/card";
import { Phone, Map, Mail } from "lucide-react";
interface ContactDataProps {
  contactData: string;
  address: string;
  phone: string;
  email: string;
}

const ContactData = ({
  address,
  contactData,
  email,
  phone,
}: ContactDataProps) => {
  const data = [
    {
      icon: <Map size={30} />,
      text: address,
      info: "25 Aralık, Tüfekçi Yusuf Blv. No:86, 27100 Şahinbey/Gaziantep",
    },
    {
      icon: <Phone size={30} />,
      text: phone,
      info: "+90 534 927 77 44",
    },
    {
      icon: <Mail size={30} />,
      text: email,
      info: "sindibad_Lokntasi@hotmail.com",
    },
  ];
  return (
    <div className="py-20">
      <h3 className="text-center text-5xl font-semibold">
        {contactData}
      </h3>
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-10">
          {data.map((item, index) => (
            <Card key={index} className="w-full h-full min-h-[40px] py-3 px-4 border-primary border-4">
              <div className="flex justify-between gap-7 items-start h-full">
                <div className="flex flex-col justify-between">
                  <h4 className="text-2xl font-semibold">{item.text}</h4>

                  <p className="text-muted-foreground">{item.info}</p>
                </div>

                <div className="my-10">{item.icon}</div>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default ContactData;
