import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../icon_dark_2/30x30/Options/BykW_Increase.svg";
import lightIcon from "../icon_light_2/30x30/Options/BykW_Increase.svg";

const Dark230x30OptionsBykWIncrease = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="BykW_Increase"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={30}
            defaultHeight={30}
        />
    );
};

export default Dark230x30OptionsBykWIncrease;
