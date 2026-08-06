import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../svg/N36x36Information.dark.svg";
import lightIcon from "../svg/N36x36Information.light.svg";

const N36x36Information = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="information"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={36}
            defaultHeight={36}
        />
    );
};

export default N36x36Information;
