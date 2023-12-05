import { FaFacebookF, FaTwitter, FaYoutube } from "react-icons/fa";


const Footer = () => {
    return (
            <div className="bg-[#2a9d8f] mt-10">
            <footer className="footer justify-between p-10  text-neutral-content container mx-auto">
                <aside>
                    <img className="w-16 " src="/logo.png" alt="" />
                    <p className="text-white text-lg">Employee Management System<br/>Providing reliable service since 2020</p>
                </aside> 
                <nav>
                    <header className="footer-title text-white text-2xl">Follow <br />Us</header> 
                    <div className="grid grid-flow-col gap-4">
                    <a className="text-[#fb8500] text-3xl" href="https://twitter.com/home"><FaTwitter></FaTwitter></a> 
                    <a className="text-[#fb8500] text-3xl" href="https://www.youtube.com/"><FaYoutube></FaYoutube></a> 
                    <a className="text-[#fb8500] text-3xl" href="https://www.facebook.com/"><FaFacebookF></FaFacebookF></a>
                    </div>
                </nav>
                
            </footer>
            <div className="footer footer-center p-4 bg-base-300 text-base-content">
                <aside>
                    <p>Copyright © 2023 - All right reserved by EMS</p>
                </aside>
            </div>
        </div>
    );
};

export default Footer;