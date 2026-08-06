import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../svg/N30x30OptionsDetail.dark.svg";
import lightIcon from "../svg/N30x30OptionsDetail.light.svg";

const N30x30OptionsDetail = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="Detail"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={30}
            defaultHeight={30}
        />
    );
};

export default N30x30OptionsDetail;
