import React from "react";
import Link from "next/link";
import { SiGithub, SiLinkedin, SiX } from "react-icons/si";
import { FiMail } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="bg-neutral-900 text-neutral-300 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <h1 className="font-tankulture text-white text-5xl mb-2">
              Alwin Mathew.
            </h1>
          </div>

          <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h3 className="text-sm font-semibold tracking-wider text-neutral-400 uppercase">
                Navigation
              </h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link
                    href="/about"
                    className="text-base hover:text-white transition-colors"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/projects"
                    className="text-base hover:text-white transition-colors"
                  >
                    Projects
                  </Link>
                </li>
                <li>
                  <Link
                    href="/skills"
                    className="text-base hover:text-white transition-colors"
                  >
                    Skills
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-base hover:text-white transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2: Socials */}
            <div>
              <h3 className="text-sm font-semibold tracking-wider text-neutral-400 uppercase">
                Socials
              </h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-base hover:text-white transition-colors"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-base hover:text-white transition-colors"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-base hover:text-white transition-colors"
                  >
                    Twitter
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Get in Touch */}
            <div>
              <h3 className="text-sm font-semibold tracking-wider text-neutral-400 uppercase">
                Get in Touch
              </h3>
              <a
                href="mailto:your.email@example.com"
                className="mt-4 flex items-center space-x-3 group"
              >
                <FiMail
                  size={20}
                  className="text-neutral-400 group-hover:text-white transition-colors"
                />
                <span className="text-base group-hover:text-white transition-colors">
                  your.email@example.com
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright and Social Icons */}
        <div className="mt-12 pt-8 border-t border-neutral-800 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-neutral-400">
            &copy; {new Date().getFullYear()} Alwin Mathew. All Rights Reserved.
          </p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <a href="#" className="text-neutral-400 hover:text-white">
              <SiGithub size={20} />
            </a>
            <a href="#" className="text-neutral-400 hover:text-white">
              <SiX size={20} />
            </a>
            <a href="#" className="text-neutral-400 hover:text-white">
              <SiLinkedin size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
