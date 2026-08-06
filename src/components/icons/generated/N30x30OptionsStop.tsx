import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../svg/N30x30OptionsStop.dark.svg";
import lightIcon from "../svg/N30x30OptionsStop.light.svg";

const N30x30OptionsStop = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="Stop"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={30}
            defaultHeight={30}
        />
    );
};

export default N30x30OptionsStop;
