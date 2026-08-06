import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../svg/N36x36SecondMenuEventCenter.dark.svg";
import lightIcon from "../svg/N36x36SecondMenuEventCenter.light.svg";

const N36x36SecondMenuEventCenter = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="Event Center"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={36}
            defaultHeight={36}
        />
    );
};

export default N36x36SecondMenuEventCenter;
