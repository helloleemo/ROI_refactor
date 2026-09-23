
import type { ReactNode, SyntheticEvent } from "react";
import { Tab, Tabs as MuiTabs, type TabsProps as MuiTabsProps } from "@mui/material";

export interface TabItem {
    value: string;
    label: ReactNode;
}

export interface TabsProps {
    items: TabItem[];
    value: string;
    onChange: (event: SyntheticEvent, value: string) => void;
    variant?: MuiTabsProps["variant"];
    scrollButtons?: MuiTabsProps["scrollButtons"];
    sx?: MuiTabsProps["sx"];
}

const Tabs = ({
    items,
    value,
    onChange,
    variant = "scrollable",
    scrollButtons = "auto",
    sx,
}: TabsProps) => {
    return (
        <MuiTabs
            value={value}
            onChange={onChange}
            variant={variant}
            scrollButtons={scrollButtons}
            sx={{ borderBottom: 1, borderColor: "divider", mb: 2, ...sx }}
        >
            {items.map((item) => (
                <Tab key={item.value} value={item.value} label={item.label} />
            ))}
        </MuiTabs>
    );
};

export default Tabs;