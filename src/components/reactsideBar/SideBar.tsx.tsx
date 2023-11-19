import React from "react";
import {
  Menu,
  MenuItem,
  MenuItemStyles,
  Sidebar,
  SubMenu,
  menuClasses,
} from "react-pro-sidebar";
import { SidebarHeader } from "./components/SidebarHeader";
import { Typography } from "./components/Typography";
import { NavItems } from "@/services/NavItems";
import { usePathname, useRouter } from "next/navigation";

type Theme = "light" | "dark";

const themes = {
  light: {
    sidebar: {
      backgroundColor: "#ffffff",
      color: "#607489",
    },
    menu: {
      menuContent: "#fbfcfd",
      icon: "#0098e5",
      hover: {
        backgroundColor: "#c5e4ff",
        color: "#44596e",
      },
      disabled: {
        color: "#9fb6cf",
      },
    },
  },
  dark: {
    sidebar: {
      backgroundColor: "#0b2948",
      color: "#8ba1b7",
    },
    menu: {
      menuContent: "#082440",
      icon: "#59d0ff",
      hover: {
        backgroundColor: "#00458b",
        color: "#b6c8d9",
      },
      disabled: {
        color: "#3e5e7e",
      },
    },
  },
};

// hex to rgba converter
const hexToRgba = (hex: string, alpha: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const SideBar: React.FC = () => {
  const Items = NavItems();
  const path = usePathname();

  const [collapsed, setCollapsed] = React.useState(false);
  const [toggled, setToggled] = React.useState(false);
  const [broken, setBroken] = React.useState(false);
  const [rtl, setRtl] = React.useState(false);
  const [hasImage, setHasImage] = React.useState(false);
  const [theme, setTheme] = React.useState<Theme>("light");
  const router = useRouter();

  // handle on RTL change event
  const handleRTLChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRtl(e.target.checked);
  };

  // handle on theme change event
  const handleThemeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTheme(e.target.checked ? "dark" : "light");
  };

  // handle on image change event
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasImage(e.target.checked);
  };

  const menuItemStyles: MenuItemStyles = {
    root: {
      fontSize: "13px",
      fontWeight: 400,
    },
    icon: {
      color: themes[theme].menu.icon,
      [`&.${menuClasses.disabled}`]: {
        color: themes[theme].menu.disabled.color,
      },
    },
    SubMenuExpandIcon: {
      color: "#b6b7b9",
    },
    subMenuContent: ({ level }) => ({
      backgroundColor:
        level === 0
          ? hexToRgba(
              themes[theme].menu.menuContent,
              hasImage && !collapsed ? 0.4 : 1
            )
          : "transparent",
    }),
    button: {
      margin: "0.5rem 1rem",
      borderRadius: "8px",
      [`&.${menuClasses.disabled}`]: {
        color: themes[theme].menu.disabled.color,
      },
      "&:hover": {
        backgroundColor: hexToRgba(
          themes[theme].menu.hover.backgroundColor,
          hasImage ? 0.8 : 1
        ),
        color: themes[theme].menu.hover.color,
        transition: "all 0.2s ease",
      },
      // "&:focus": {
      //   backgroundColor: hexToRgba(
      //     themes[theme].menu.hover.backgroundColor,
      //     hasImage ? 0.8 : 1
      //   ),
      //   color: "var(--primary)",
      // },
    },
    label: ({ open }) => ({
      fontWeight: open ? 600 : undefined,
    }),
  };

  return (
    <div
      style={{
        display: "flex",
        height: "90vh",
        direction: rtl ? "rtl" : "ltr",
        position: "fixed",
      }}
      className="mt-[10vh]"
    >
      <Sidebar
        collapsed={collapsed}
        toggled={toggled}
        onBackdropClick={() => setToggled(false)}
        onBreakPoint={setBroken}
        rtl={rtl}
        breakPoint="md"
        backgroundColor={hexToRgba(
          themes[theme].sidebar.backgroundColor,
          hasImage ? 0.9 : 1
        )}
        rootStyles={{
          color: themes[theme].sidebar.color,
          width: "15vw",
          borderRight: "2px solid #e0e0e0",
        }}
      >
        <div
          style={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          <SidebarHeader
            rtl={rtl}
            style={{ marginBottom: "24px", marginTop: "16px" }}
          />
          <div style={{ flex: 1, marginBottom: "32px" }}>
            {Items.map((item, index) => {
              return (
                <div key={index}>
                  {item.title && (
                    <div
                      style={{
                        padding: "0 24px",
                        marginBottom: "8px",
                        marginTop: "32px",
                      }}
                    >
                      <Typography
                        variant="body2"
                        fontWeight={600}
                        style={{
                          opacity: collapsed ? 0 : 0.7,
                          letterSpacing: "0.5px",
                        }}
                      >
                        {item.title}
                      </Typography>
                    </div>
                  )}
                  {item.links.map((link, index) => {
                    if (!link.hasSubItems) {
                      return (
                        <Menu menuItemStyles={menuItemStyles} key={index}>
                          <MenuItem
                            icon={link.icon({
                              width: "24",
                              height: "24",
                              fill:
                                path === `${link.path}`
                                  ? "var(--primary)"
                                  : "var(--title-text)",
                            })}
                            onClick={() => router.push(`${link.path}`)}
                            style={{
                              fontWeight: 500,
                              color:
                                path === `${link.path}` ? "var(--primary)" : "",
                              backgroundColor:
                                path === `${link.path}`
                                  ? themes[theme].menu.hover.backgroundColor
                                  : "",
                            }}
                          >
                            {link.label}
                          </MenuItem>
                        </Menu>
                      );
                    }
                    if (link.hasSubItems) {
                      return (
                        <Menu menuItemStyles={menuItemStyles} key={index}>
                          <SubMenu
                            label={link.label}
                            icon={link.icon({ width: "24", height: "24" })}
                            //this is for some notifications
                            // suffix={
                            //   <Badge variant="danger" shape="circle">
                            //     6
                            //   </Badge>
                            // }
                          >
                            {link.subItems.length > 0 ? (
                              link.subItems.map((subItem, index) => (
                                <MenuItem
                                  key={index}
                                  onClick={() =>
                                    router.push(`${link.path}/${subItem.id}`)
                                  }
                                  style={{
                                    fontWeight: 500,
                                    color:
                                      path === `${link.path}/${subItem.id}`
                                        ? "var(--primary)"
                                        : "",
                                    backgroundColor:
                                      path === `${link.path}/${subItem.id}`
                                        ? themes[theme].menu.hover
                                            .backgroundColor
                                        : "",
                                  }}
                                >
                                  {subItem.title}
                                </MenuItem>
                              ))
                            ) : (
                              <MenuItem>no Items</MenuItem>
                            )}
                          </SubMenu>
                        </Menu>
                      );
                    }
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </Sidebar>
    </div>
  );
};
