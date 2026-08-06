import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../svg/N36x36FirstMeunEnergyManagement.dark.svg";
import lightIcon from "../svg/N36x36FirstMeunEnergyManagement.light.svg";

const N36x36FirstMeunEnergyManagement = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="Energy Management"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={36}
            defaultHeight={36}
        />
    );
};

export default N36x36FirstMeunEnergyManagement;
