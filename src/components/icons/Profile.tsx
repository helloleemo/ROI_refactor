import type { IconProps } from "./types";
import ThemedAssetIcon from "./ThemedAssetIcon";
import darkIcon from "./icon_dark_1/36x36/Account.svg";
import lightIcon from "./icon_light_1/36x36/Account.svg";

const Profile = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="Profile"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={27}
            defaultHeight={27}
        />
    );
};

export default Profile;