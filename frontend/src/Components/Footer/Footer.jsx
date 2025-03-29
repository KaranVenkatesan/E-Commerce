import React from 'react';
import footer_logo from '../Assets/logo_big.png';
import instagram_icon from '../Assets/instagram_icon.png';
import pinterest_icon from '../Assets/pintester_icon.png';
import whatsapp_icon from '../Assets/whatsapp_icon.png';

const Footer = () => {
    return (
        <div className="flex flex-col justify-center items-center gap-4 sm:gap-6 mt-5 px-4 sm:px-6">
            {/* Footer Logo */}
            <div className="flex items-center gap-3">
                <img className="w-6 sm:w-8" src={footer_logo} alt="Shopper Logo" />
                <p className="text-[#383838] text-lg sm:text-xl font-bold">SHOPPER</p>
            </div>

            {/* Footer Links */}
            <ul className="flex flex-wrap justify-center gap-4 text-[#252525] text-xs sm:text-sm">
                <li className="cursor-pointer hover:text-gray-600">Company</li>
                <li className="cursor-pointer hover:text-gray-600">Products</li>
                <li className="cursor-pointer hover:text-gray-600">Offices</li>
                <li className="cursor-pointer hover:text-gray-600">About</li>
                <li className="cursor-pointer hover:text-gray-600">Contact</li>
            </ul>

            {/* Social Media Icons */}
            <div className="flex gap-3">
                {[
                    { src: instagram_icon, alt: 'Instagram' },
                    { src: pinterest_icon, alt: 'Pinterest' },
                    { src: whatsapp_icon, alt: 'WhatsApp' },
                ].map((icon, index) => (
                    <div key={index} className="p-2 bg-[#fbfbfb] border border-[#ebebeb] rounded-md transition-transform duration-300 hover:scale-105">
                        <img className="w-4 sm:w-5" src={icon.src} alt={icon.alt} />
                    </div>
                ))}
            </div>

            {/* Footer Copyright */}
            <div className="flex flex-col items-center gap-2 w-full text-xs sm:text-sm text-[#1a1a1a]">
                <hr className="w-[80%] h-[1.5px] bg-[#c7c7c7] border-none rounded-full" />
                <p>© 2025 Shopper. All Rights Reserved.</p>
            </div>
        </div>
    );
};

export default Footer;
