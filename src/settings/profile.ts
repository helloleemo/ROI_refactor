import type { ComponentType } from "react";
import { N30x30OptionsComment as Comment } from "@/components/icons";
import type { IconProps } from "@/components/icons/types";
import { headerTranslationKey } from "./languageTranslationKey";

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
        value: "header.profile.profile",
        route: "/profile",
    },
    {
        icon: Comment,
        label: "Theme",
        value: "header.profile.theme",
        route: "/theme",
    },
    {
        icon: Comment,
        label: "About",
        value: "header.profile.about",
        route: "/about",
    },
    {
        icon: Comment,
        label: "Logout",
        value: "header.profile.logout",
        route: "/logout",
    },
    // {
    //     icon: Comment,
    //     label: "Languages",
    //     value: headerTranslationKey.profile.languages,
    //     route: "/language-settings",
    // }
];