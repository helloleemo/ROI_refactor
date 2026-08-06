import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../svg/N30x30OptionsAdd.dark.svg";
import lightIcon from "../svg/N30x30OptionsAdd.light.svg";

const N30x30OptionsAdd = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="Add"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={30}
            defaultHeight={30}
        />
    );
};

export default N30x30OptionsAdd;
