import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../svg/N30x30OptionsPoint.dark.svg";
import lightIcon from "../svg/N30x30OptionsPoint.light.svg";

const N30x30OptionsPoint = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="Point"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={30}
            defaultHeight={30}
        />
    );
};

export default N30x30OptionsPoint;
