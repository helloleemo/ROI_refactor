import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../svg/N30x30OptionsRecovered.dark.svg";
import lightIcon from "../svg/N30x30OptionsRecovered.light.svg";

const N30x30OptionsRecovered = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="Recovered"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={30}
            defaultHeight={30}
        />
    );
};

export default N30x30OptionsRecovered;
