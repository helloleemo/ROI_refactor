import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../svg/N30x30OptionsThunder.dark.svg";
import lightIcon from "../svg/N30x30OptionsThunder.light.svg";

const N30x30OptionsThunder = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="Thunder"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={30}
            defaultHeight={30}
        />
    );
};

export default N30x30OptionsThunder;
