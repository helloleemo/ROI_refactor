import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../svg/Help.dark.svg";
import lightIcon from "../svg/Help.light.svg";

const Help = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="Help"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={36}
            defaultHeight={36}
        />
    );
};

export default Help;
