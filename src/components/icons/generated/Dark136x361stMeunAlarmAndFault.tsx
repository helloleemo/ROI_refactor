import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../icon_dark_1/36x36/1st Meun/Alarm and Fault.svg";
import lightIcon from "../icon_light_1/36x36/1st Meun/Alarm and Fault.svg";

const Dark136x361stMeunAlarmAndFault = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="Alarm and Fault"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={36}
            defaultHeight={36}
        />
    );
};

export default Dark136x361stMeunAlarmAndFault;
