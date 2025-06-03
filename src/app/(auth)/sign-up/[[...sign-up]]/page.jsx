import { SignUp } from "@clerk/nextjs";

export default function SingUpPage() {
  return (
    <div className="flex items-center justify-center h-screen mt-14 bg-[url('/images/hero-bg.png')]">
      <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />;
    </div>
  );
}
