import styled from "@emotion/styled";
import React from "react";
import { Typography } from "./Typography";
import Institution from "@/components/SVGs/Institution";

interface SidebarHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  rtl: boolean;
}

const StyledSidebarHeader = styled.div`
  height: 64px;
  min-height: 64px;
  display: flex;
  align-items: center;
  padding: 0 20px;

  > div {
    width: 100%;
    overflow: hidden;
  }
`;

const StyledLogo = styled.div<{ rtl?: boolean }>`
  width: 35px;
  min-width: 35px;
  height: 35px;
  min-height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  color: white;
  font-size: 24px;
  font-weight: 700;
  background-color: #009fdb;
  background: linear-gradient(45deg, rgb(21 87 205) 0%, rgb(90 225 255) 100%);
  ${({ rtl }) =>
    rtl
      ? `
      margin-left: 10px;
      margin-right: 4px;
      `
      : `
      margin-right: 10px;
      margin-left: 4px;
      `}
`;

export const SidebarHeader: React.FC<SidebarHeaderProps> = ({
  children,
  rtl,
  ...rest
}) => {
  return (
    <StyledSidebarHeader {...rest}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div className="flex items gap-4">
          <div
            className="h-11 w-9 bg-yellow-800 flex justify-center items-center font-semibold text-2xl pb-1 text-white"
            style={{ borderRadius: "84% 16% 26% 69% / 31% 14% 85% 65%" }}
          >
            H
          </div>
          <div className="flex-col gap-4">
            <div className="text-subTitleText font-semibold">User Name</div>
            <div className="text-primary flex items-center text-sm font-semibold gap-1 ">
              <Institution fill="var(--primary)" width="12" height="12" />
              <p>UL</p>
            </div>
          </div>
        </div>
      </div>
    </StyledSidebarHeader>
  );
};
