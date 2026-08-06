import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../svg/N30x30OptionsHistory.dark.svg";
import lightIcon from "../svg/N30x30OptionsHistory.light.svg";

const N30x30OptionsHistory = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="History"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={30}
            defaultHeight={30}
        />
    );
};

export default N30x30OptionsHistory;
