import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../icon_dark_2/30x30/Options/Alarm.svg";
import lightIcon from "../icon_light_2/30x30/Options/Alarm.svg";

const Dark230x30OptionsAlarm = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="Alarm"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={30}
            defaultHeight={30}
        />
    );
};

export default Dark230x30OptionsAlarm;
