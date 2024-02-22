import { NavLink } from "react-router-dom";

export const NavList = ({ toggleOpen }) => {
  const getNavLinkClassName = (isActive) =>
    isActive
      ? "py-4 md:py-2 w-full md:w-fit border-b border-gray md:border-0 text-sec-color hover:bg-white/10 transition duration-150 ease-linear group"
      : "py-4  md:py-2 w-full md:w-fit border-b border-gray md:border-0 hover:text-sec-light-color transition duration-150 ease-linear  group";

  return (
    <>
      <ul className="w-full text-base lg:text-lg font-medium md:max-w-3xl flex flex-col gap-2 items-start py-4 md:py-0 md:flex-row justify-between md:justify-start md:items-center ">
        {[
          { to: "/phones", label: "Phones" },
          { to: "/laptop", label: "Laptops" },
          { to: "/gaming", label: "Gaming" },
          { to: "/workspace", label: "WorkSpace" },
          { to: "/products", label: "All Products" },
          { to: "/accessories", label: "Accessories" },
        ].map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            onClick={toggleOpen}
            className={({ isActive }) =>
              ` px-4 hover:border-2  border-sec-color ${getNavLinkClassName(
                isActive
              )}`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </ul>
    </>
  );
};
