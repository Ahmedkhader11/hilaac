import { SignUp } from "@clerk/nextjs";

export default function SingUpPage() {
  return (
    <div className="flex justify-center ">
      <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />;
    </div>
  );
}
