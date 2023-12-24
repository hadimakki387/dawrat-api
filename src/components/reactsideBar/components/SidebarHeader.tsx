import styled from "@emotion/styled";
import React from "react";
import { Typography } from "./Typography";
import Institution from "@/components/SVGs/Institution";
import { useAppSelector } from "@/core/StoreWrapper";
import ProfileAvatar from "@/components/global/ProfileAvatar";

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

//i want to trim the first letter of the first name and put it in avatar
export const SidebarHeader: React.FC<SidebarHeaderProps> = ({
  children,
  rtl,
  ...rest
}) => {
  const { user } = useAppSelector((state) => state.global);
  return (
    <StyledSidebarHeader {...rest}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div className="flex items gap-4">
          <ProfileAvatar/>
          <div className="flex-col gap-4">
            <div className="text-subTitleText font-semibold">{`${user?.firstName} ${user?.lastName}`}</div>
            <div className="text-primary flex items-center text-sm font-semibold gap-1 ">
              <Institution fill="var(--primary)" size={12} />
              <p>{user?.university?.abr}</p>
            </div>
          </div>
        </div>
      </div>
    </StyledSidebarHeader>
  );
};
