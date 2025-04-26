import Container from "@/components/Container";

import DashboardClient from "./dashboard-client";

const page = ({ params: { locale } }: { params: { locale: string } }) => {
  return (
    <div className="w-full py-3">
      <Container>
        <DashboardClient locale={locale} />
      </Container>
    </div>
  );
};

export default page;
