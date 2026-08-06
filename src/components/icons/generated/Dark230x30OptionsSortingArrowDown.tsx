import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../icon_dark_2/30x30/Options/Sorting-arrow-down.svg";
import lightIcon from "../icon_light_2/30x30/Options/Sorting-arrow-down.svg";

const Dark230x30OptionsSortingArrowDown = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="Sorting-arrow-down"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={30}
            defaultHeight={30}
        />
    );
};

export default Dark230x30OptionsSortingArrowDown;
