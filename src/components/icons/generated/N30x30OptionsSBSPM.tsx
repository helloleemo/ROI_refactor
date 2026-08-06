import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../svg/N30x30OptionsSBSPM.dark.svg";
import lightIcon from "../svg/N30x30OptionsSBSPM.light.svg";

const N30x30OptionsSBSPM = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="SBSPM"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={30}
            defaultHeight={30}
        />
    );
};

export default N30x30OptionsSBSPM;
