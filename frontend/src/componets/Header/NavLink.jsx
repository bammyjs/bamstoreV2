import { Link } from "react-router-dom";
import laptop from "../../assets/PngItem_3368757.png";
import { links } from "./Links";
import { useState } from "react";

function NavLink() {
  const [headings, setHeadings] = useState("");
  const [subHeadings, setSubHeadings] = useState("");

  return (
    <>
      {links.map((link, i) => (
        <div key={i}>
          <div className="px-1  text-left cursor-pointer group">
            <p
              className="py-3  flex justify-center font-medium text-base-100 md:text-sm lg:text-lg items-center group md:pr-0 pr-5"
              onClick={() => {
                headings !== link.item
                  ? setHeadings(link.item)
                  : setHeadings("");
                setSubHeadings("");
              }}
            >
              {link.item}
              <span className="text-xl md:hidden inline ">
                <ion-icon
                  name={`${
                    headings === link.item ? "chevron-up" : "chevron-down"
                  }`}
                ></ion-icon>
              </span>
              <span className="text-xl md:mt-1 md:ml-2 md:block hidden group-hover:rotate-180 group-hover:-mt-2">
                <ion-icon name="chevron-down"></ion-icon>
              </span>
            </p>
            {link.submenu && (
              <div className="">
                {/* <div className="absolute w-full  md:left-1/2 -translate-x-1/2 m-auto md:top-16 md:pt-8 lg:top-[64px] hidden md:group-hover:flex md:group-hover:items-center justify-between  hover:block bg-light box-shadow"></div> */}
                <div className=" absolute w-full  md:left-1/2 -translate-x-1/2 m-auto md:top-16 md:pt-8 lg:top-16 hidden md:group-hover:flex md:group-hover:items-center justify-between  hover:block bg-light box-shadow">
                  {/* <div className="py-3">
                    <div className="w-4 h-4 left-3 absolute mt-1 bg-gray-500 rotate-45"></div>
                  </div> */}
                  <div className="  p-3.5 flex flex-col gap-8 md:flex-row  w-full md:justify-center">
                    {link.sublinks.map((mysublinks, i) => (
                      <div key={i}>
                        <p className="font-semibold">{mysublinks.Head} </p>
                        {mysublinks.sublink.map((slink, i) => (
                          <li key={i} className="text-sm text-gray-500 my-2.5">
                            {/* <a
                              href={slink.link}
                              className="hover:text-blue-600 "
                            >
                              {slink.item}
                            </a> */}
                            <Link
                              to={slink.link}
                              className="hover:text-blue-600 "
                            >
                              {slink.item}
                            </Link>
                          </li>
                        ))}
                      </div>
                    ))}
                    <div className="w-3/12 block">
                      <img
                        src={laptop}
                        alt=""
                        className="w-full object-contain h-auto"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Mobile menu display*/}
          <div
            className={`
          ${headings === link.item ? "md:hidden" : "hidden"}
          `}
          >
            {/* Sub-link display*/}
            {link.sublinks.map((slinks, i) => (
              <div key={i}>
                <div className="items-start">
                  <p
                    onClick={() =>
                      subHeadings !== slinks.Head
                        ? setSubHeadings(slinks.Head)
                        : setSubHeadings("")
                    }
                    className="text-left py-2 pl-2  font-medium cursor-pointer flex justify-between items-center md:pr-0 pr-5"
                  >
                    {slinks.Head}

                    <span className="text-xl md:hidden md:mt-1 md:ml-2 inline">
                      <ion-icon
                        name={`${
                          subHeadings === slinks.Head
                            ? "chevron-up"
                            : "chevron-down"
                        }`}
                      ></ion-icon>
                    </span>
                  </p>
                  <div
                    className={`
                  ${subHeadings === slinks.Head ? "md:hidden" : "hidden"}`}
                  >
                    {slinks.sublink.map((slink, i) => (
                      <li
                        key={i}
                        className="py-3 pl-14  font-medium text-left "
                      >
                        <Link to={slink.link} className="hover:text-blue-600">
                          {slink.item}
                        </Link>
                      </li>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}

export default NavLink;
