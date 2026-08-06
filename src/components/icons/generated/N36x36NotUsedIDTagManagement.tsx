import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../svg/N36x36NotUsedIDTagManagement.dark.svg";
import lightIcon from "../svg/N36x36NotUsedIDTagManagement.light.svg";

const N36x36NotUsedIDTagManagement = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="ID tag management"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={36}
            defaultHeight={36}
        />
    );
};

export default N36x36NotUsedIDTagManagement;
