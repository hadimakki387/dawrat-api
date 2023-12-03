import { MenuItemType } from "@/services/types";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Menu, MenuItem, PopoverProps } from "@mui/material";
import React from "react";

interface Props {
  open: boolean;
  handleClick?: () => any;
  // handleClose?: () => any;
  children?: React.ReactNode;
  menuItems: MenuItemType[];
  containerClassName?: string;
  className?: string;
  popoverProps?: Omit<
    PopoverProps,
    "children" | "open" | "anchorEl" | "onClose"
  >;
  offset?: {
    top?: any;
    left?: any;
  };
  closeOnClick?: boolean;
  hasCloseButton?: boolean;
}

function DaPopOver({
  menuItems = [],
  children,
  containerClassName,
  className,
  popoverProps,
  offset,
  closeOnClick = true,
  hasCloseButton = false,

}: Props) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const id = open ? "Popover-Menu" : undefined;
  return (
    <div className={containerClassName}>
      <div aria-describedby={id} onClick={handleClick} className={`${className} hover:cursor-pointer`}>
        {children}
      </div>
      <Menu
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        slotProps={{
          paper: {
            sx: {
              borderRadius: "8px",
              ml: offset?.left,
              mt: offset?.top,
            },
          },
          ...popoverProps?.slotProps,
        }}
        style={{
          marginTop:"0.5rem"
        }}
      >
        <div className="flex flex-col py-1">
          {menuItems.map((item, inex) => {
            return (
              <MenuItem key={inex} onClick={() => {
                item.onClick && item.onClick();
                closeOnClick && handleClose();
              }}>
                <div className="flex items-center ">
                  <div className="w-32">{item.name}</div>
                  <div>{item.icon&& item.icon}</div>
                </div>
              </MenuItem>
            );
          })}
           {hasCloseButton && (
            <>
              <div className="border-b border-gray-200 my-1" />
              <div
                className="flex flex-row items-center flex-grow py-2 px-3 cursor-pointer hover:bg-gray-100"
                onClick={handleClose}
              >
                <FontAwesomeIcon icon={faX} />
                <div className="flex-grow ml-2">Close</div>
              </div>
            </>
          )}
        </div>
      </Menu>
    </div>
  );
}

export default DaPopOver;
