import Link from "next/link";
import { BiMessageDetail } from "react-icons/bi";
import { BsFillSendFill, BsTelephoneOutbound } from "react-icons/bs";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-500 mt-16 pt-5">
      <div className=" container mx-auto px-4 ">
        <Link
          href={"/"}
          className="font-black text-amber-500 text-3xl tracking-widest flex justify-center "
        >
          Hilaac
        </Link>

        <h4 className="font-semibold text-[40px]">Contact</h4>

        <div className="flex  px-3 flex-wrap gap-16 items-center justify-between md:text-start">
          <div className="flex-1">
            <p>150 Road</p>
            <div className="flex items-center py-4">
              <BsFillSendFill />
              <p className="ml-2">Hilaac Hotel</p>
            </div>
            <div className="flex items-center py-4">
              <BsTelephoneOutbound />
              <p className="ml-2">252-63-4363578</p>
            </div>
            <div className="flex items-center pt-2.5">
              <BiMessageDetail />
              <p className="ml-2 font-black ">HILAAC HOTEL</p>
            </div>
          </div>

          <div className="flex-1 md:text-center">
            <p className="pb-4 font-semibold">Our Links</p>
            <Link href="/about" className="block pb-2">
              About Us
            </Link>
            <Link href="/contact" className="block pb-2">
              Get in Touch
            </Link>
            <Link href="/privacy" className="block pb-2">
              Privacy Policy
            </Link>
            <Link href="/terms" className="block pb-2">
              Terms of Service
            </Link>
            <Link href="/support" className="block">
              Customer Assistance
            </Link>
          </div>

          <div className="flex-1 md:text-center">
            <div className="our-services">
              {" "}
              {/* Apply styling to this div */}
              <a href="/FAQ" className="block pb-2">
                FAQ
              </a>
              <a href="/Our-Services" className="block pb-2">
                Our Services
              </a>
              <a href="/Support" className="block pb-2">
                Support
              </a>
              <a href="/Privacy" className="block pb-2">
                Privacy
              </a>
              <a href="/Terms-Conditions" className="block pb-2">
                Terms & Conditions
              </a>
              <a href="/Events" className="block">
                Events
              </a>
            </div>
          </div>

          <div className="flex-1 md:text-center">
            <h1 className="font-black flex justify-center">Social Media</h1>
            <div className="flex flex-col items-center justify-center gap-5 py-4">
              <Link
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-2"
              >
                <FaFacebook className="text-2xl hover:text-blue-500 transition-colors duration-300" />
                facebook
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-2"
              >
                <FaTwitter className="text-2xl hover:text-blue-400 transition-colors duration-300 mr-3.5" />
                twitter
              </Link>
              <Link
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-2 items-start justify-auto"
              >
                <FaInstagram className="text-2xl hover:text-pink-500 transition-colors duration-300" />
                instagram
              </Link>
              <Link
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-2"
              >
                <FaLinkedin className="text-2xl hover:text-blue-700 transition-colors duration-300 mr-2" />
                linkedin
              </Link>
            </div>
          </div>
        </div>
        <div className="header-copyright text-center mt-10">
          &copy;{" "}
          <span className="font-extrabold">{new Date().getFullYear()} </span>
          Hilaac Hotel
        </div>
      </div>
      <p className="font-black text-xl flex justify-center mt-10 ">
        Designed with ❤️ by Hilaac Team.
      </p>
      <div className="bg-gray-700 h-10 md:h[70px] mt-8 w-full bottom-0 left-0"></div>
    </footer>
  );
};

export default Footer;
