import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../svg/N30x30OptionsMinus.dark.svg";
import lightIcon from "../svg/N30x30OptionsMinus.light.svg";

const N30x30OptionsMinus = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="Minus"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={30}
            defaultHeight={30}
        />
    );
};

export default N30x30OptionsMinus;
