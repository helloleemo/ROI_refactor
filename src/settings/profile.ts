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
        value: headerTranslationKey.profile.profile,
        route: "/profile",
    },
    {
        icon: Comment,
        label: "Theme",
        value: headerTranslationKey.profile.theme,
        route: "/theme",
    },
    {
        icon: Comment,
        label: "About",
        value: headerTranslationKey.profile.about,
        route: "/about",
    },
    {
        icon: Comment,
        label: "Logout",
        value: headerTranslationKey.profile.logout,
        route: "/logout",
    },
    // {
    //     icon: Comment,
    //     label: "Languages",
    //     value: headerTranslationKey.profile.languages,
    //     route: "/language-settings",
    // }
];