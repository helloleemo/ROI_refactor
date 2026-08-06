import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../svg/N30x30OptionsDownload.dark.svg";
import lightIcon from "../svg/N30x30OptionsDownload.light.svg";

const N30x30OptionsDownload = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="Download"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={30}
            defaultHeight={30}
        />
    );
};

export default N30x30OptionsDownload;
