import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../svg/N30x30OptionsDelete.dark.svg";
import lightIcon from "../svg/N30x30OptionsDelete.light.svg";
import darkIconRaw from "../svg/N30x30OptionsDelete.dark.svg?raw";
import lightIconRaw from "../svg/N30x30OptionsDelete.light.svg?raw";

const N30x30OptionsDelete = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="Delete"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            lightRaw={lightIconRaw}
            darkRaw={darkIconRaw}
            defaultWidth={30}
            defaultHeight={30}
        />
    );
};

export default N30x30OptionsDelete;
