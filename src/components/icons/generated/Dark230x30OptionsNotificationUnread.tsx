import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../icon_dark_2/30x30/Options/Notification unread.svg";
import lightIcon from "../icon_light_2/30x30/Options/Notification unread.svg";

const Dark230x30OptionsNotificationUnread = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="Notification unread"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={30}
            defaultHeight={30}
        />
    );
};

export default Dark230x30OptionsNotificationUnread;
