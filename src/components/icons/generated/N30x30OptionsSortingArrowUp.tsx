import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../svg/N30x30OptionsSortingArrowUp.dark.svg";
import lightIcon from "../svg/N30x30OptionsSortingArrowUp.light.svg";

const N30x30OptionsSortingArrowUp = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="Sorting-arrow-up"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={30}
            defaultHeight={30}
        />
    );
};

export default N30x30OptionsSortingArrowUp;
