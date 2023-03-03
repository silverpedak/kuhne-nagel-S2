import { Link } from "react-router-dom";

import { Collapse, Nav, NavbarBrand } from "reactstrap";

// import { useAppSelector } from "@/redux/app";
// import { selectLoggedUserRole } from "@/redux/features";

import { IRoute } from "@/types/ui/router";

import { ISidebarLogo } from "..";

import { SidebarPanel, SidebarToggler, CollapseType } from ".";

interface Props {
  logo: ISidebarLogo;
  collapseState: CollapseType;
  setCollapseState: React.Dispatch<CollapseType>;
  routes: IRoute[];
  userPermissions: string[];
}

export const SidebarContent = ({
  logo,
  collapseState,
  setCollapseState,
  routes,
  userPermissions,
}: Props) => {
  let navbarBrandProps;

  if (logo && logo.innerLink) {
    navbarBrandProps = {
      to: logo.innerLink,
      tag: Link,
    };
  } else if (logo && logo.outerLink) {
    navbarBrandProps = {
      href: logo.outerLink,
      target: "_blank",
    };
  }

  return (
    <>
      <div className="sidenav-header d-flex align-items-center">
        {logo ? (
          <NavbarBrand {...navbarBrandProps}>
            <img alt={logo.imgAlt} className="navbar-brand-img" src={logo.imgSrc} />
          </NavbarBrand>
        ) : null}
        <SidebarToggler />
      </div>
      <div className="navbar-inner">
        <Collapse navbar isOpen={true}>
          <Nav navbar>
            <SidebarPanel
              routes={routes}
              userPermissions={userPermissions}
              collapseState={collapseState}
              setCollapseState={setCollapseState}
            />
          </Nav>
          <hr className="my-3" />

          <h6 className="navbar-heading p-0 text-muted">
            <span className="docs-normal">Support</span>
            <span className="docs-mini">S</span>
          </h6>
        </Collapse>
      </div>
    </>
  );
};
