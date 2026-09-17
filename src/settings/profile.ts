import type { ComponentType } from "react";
import { N30x30OptionsComment as Comment } from "@/components/icons";
import type { IconProps } from "@/components/icons/types";

export interface ProfileMenuItem {
    icon: ComponentType<IconProps>;
    label: string;
    value: string;
    route: string;
}

export const profile: ProfileMenuItem[] = [
    {
        icon: Comment,
        label: "Profile",
        value: "profile",
        route: "/profile",
    },
    {
        icon: Comment,
        label: "Theme",
        value: "theme",
        route: "/theme",
    },
    {
        icon: Comment,
        label: "About",
        value: "about",
        route: "/about",
    },
    {
        icon: Comment,
        label: "Logout",
        value: "logout",
        route: "/logout",
    },
    {
        icon: Comment,
        label: "Languages",
        value: "languages",
        route: "/language-settings",
    }
];