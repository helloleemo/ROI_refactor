import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../svg/N30x30OptionsCalender.dark.svg";
import lightIcon from "../svg/N30x30OptionsCalender.light.svg";

const N30x30OptionsCalender = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="Calender"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={30}
            defaultHeight={30}
        />
    );
};

export default N30x30OptionsCalender;
