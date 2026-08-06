import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../icon_dark_2/30x30/Options/BykW_Decrease.svg";
import lightIcon from "../icon_light_2/30x30/Options/BykW_Decrease.svg";

const Dark230x30OptionsBykWDecrease = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="BykW_Decrease"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={30}
            defaultHeight={30}
        />
    );
};

export default Dark230x30OptionsBykWDecrease;
