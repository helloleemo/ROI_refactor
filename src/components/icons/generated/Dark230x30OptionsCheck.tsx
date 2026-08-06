import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../icon_dark_2/30x30/Options/Check.svg";
import lightIcon from "../icon_light_2/30x30/Options/Check.svg";

const Dark230x30OptionsCheck = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="Check"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={30}
            defaultHeight={30}
        />
    );
};

export default Dark230x30OptionsCheck;
