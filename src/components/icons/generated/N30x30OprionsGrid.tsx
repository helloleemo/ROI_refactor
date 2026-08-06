import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../svg/N30x30OprionsGrid.dark.svg";
import lightIcon from "../svg/N30x30OprionsGrid.light.svg";

const N30x30OprionsGrid = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="Grid"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={30}
            defaultHeight={30}
        />
    );
};

export default N30x30OprionsGrid;
