import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../svg/N30x30StatusAllowed.dark.svg";
import lightIcon from "../svg/N30x30StatusAllowed.light.svg";

const N30x30StatusAllowed = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="Allowed"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={30}
            defaultHeight={30}
        />
    );
};

export default N30x30StatusAllowed;
