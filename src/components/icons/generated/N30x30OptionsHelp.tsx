import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../svg/N30x30OptionsHelp.dark.svg";
import lightIcon from "../svg/N30x30OptionsHelp.light.svg";

const N30x30OptionsHelp = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="Help"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={30}
            defaultHeight={30}
        />
    );
};

export default N30x30OptionsHelp;
