import React, { useState } from "react";
import clsx from "clsx";
import { Link, useStaticQuery, graphql } from "gatsby";
import { Button } from "..";
import { useAuth } from "../../lib/hooks/useAuth";
import { AuthModal } from "../auth";

const MENU_QUERY = graphql`
  query {
    primaryMenuData: allWpMenuItem(filter: { locations: { eq: PRIMARY } }) {
      nodes {
        ...MenuItem
      }
    }
    primaryLogguedMenuData: allWpMenuItem(
      filter: { locations: { eq: PRIMARYLOG } }
    ) {
      nodes {
        ...MenuItem
      }
    }
  }
`;

const MenuItem = ({ item, setIsOpen }) => {
  const { label, path, cssClasses, id } = item;

  return (
    <>
      {cssClasses.includes("sign") ? (
        <Button
          className={`h-10 text-f-14`}
          onClick={() => {
            setIsOpen(true);
          }}
        >
          {label}
        </Button>
      ) : (
        <Link
          key={id}
          to={path}
          className={`${
            cssClasses?.includes("button")
              ? "btn h-10 text-f-14"
              : "text-white text-f-14 uppercase tracking-[1px] hover:text-gold hover:no-underline"
          }`}
        >
          {label}
        </Link>
      )}
    </>
  );
};

export const Menu = ({ className, ...props }) => {
  const data = useStaticQuery(MENU_QUERY);

  const { primaryMenuData, primaryLogguedMenuData } = data;
  const { nodes: items } = primaryMenuData || [];
  const { nodes: logguedItems } = primaryLogguedMenuData || [];
  const [isOpen, setIsOpen] = useState(false);

  const { loggedIn } = useAuth();

  const menuItems = loggedIn ? logguedItems : items;

  return (
    <>
      <nav
        className={clsx("flex items-center space-x-5", className)}
        {...props}
      >
        {menuItems?.map((item) => (
          <MenuItem item={item} key={item.id} setIsOpen={setIsOpen} />
        ))}
      </nav>

      <AuthModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};
