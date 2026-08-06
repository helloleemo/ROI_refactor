import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../svg/N30x30OptionsZoomOut.dark.svg";
import lightIcon from "../svg/N30x30OptionsZoomOut.light.svg";

const N30x30OptionsZoomOut = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="Zoom out"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={30}
            defaultHeight={30}
        />
    );
};

export default N30x30OptionsZoomOut;
