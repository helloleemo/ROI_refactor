import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../svg/N36x36NotUsedDeviceManagement.dark.svg";
import lightIcon from "../svg/N36x36NotUsedDeviceManagement.light.svg";

const N36x36NotUsedDeviceManagement = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="device management"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={36}
            defaultHeight={36}
        />
    );
};

export default N36x36NotUsedDeviceManagement;
