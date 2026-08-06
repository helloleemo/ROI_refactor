import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../svg/N30x30StatusNotAllowed.dark.svg";
import lightIcon from "../svg/N30x30StatusNotAllowed.light.svg";

const N30x30StatusNotAllowed = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="Not allowed"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={30}
            defaultHeight={30}
        />
    );
};

export default N30x30StatusNotAllowed;
