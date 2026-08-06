import type { IconProps } from "./types";
import ThemedAssetIcon from "./ThemedAssetIcon";
import darkIcon from "./icon_dark_1/36x36/Notification.svg";
import lightIcon from "./icon_light_1/36x36/Notification.svg";

const Notification = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="Notification"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={36}
            defaultHeight={36}
        />
    );
};

export default Notification;