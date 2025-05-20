import SignUpClient from "../_components/sign-up-client";

const Page = async ({ params }: { params: { locale: string } }) => {
  return (
    <div className="w-full max-w-sm mx-auto space-y-6 py-5">
      <SignUpClient locale={params.locale} />
    </div>
  );
};

export default Page;
