import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../svg/N30x30StatusSaving.dark.svg";
import lightIcon from "../svg/N30x30StatusSaving.light.svg";

const N30x30StatusSaving = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="Saving"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={30}
            defaultHeight={30}
        />
    );
};

export default N30x30StatusSaving;
