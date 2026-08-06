import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../svg/N30x30OptionsNotification.dark.svg";
import lightIcon from "../svg/N30x30OptionsNotification.light.svg";

const N30x30OptionsNotification = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="Notification"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={30}
            defaultHeight={30}
        />
    );
};

export default N30x30OptionsNotification;
