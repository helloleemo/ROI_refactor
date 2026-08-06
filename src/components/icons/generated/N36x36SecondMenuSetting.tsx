import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../svg/N36x36SecondMenuSetting.dark.svg";
import lightIcon from "../svg/N36x36SecondMenuSetting.light.svg";

const N36x36SecondMenuSetting = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="Setting"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={36}
            defaultHeight={36}
        />
    );
};

export default N36x36SecondMenuSetting;
