import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../svg/N30x30OptionsList.dark.svg";
import lightIcon from "../svg/N30x30OptionsList.light.svg";

const N30x30OptionsList = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="List"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={30}
            defaultHeight={30}
        />
    );
};

export default N30x30OptionsList;
