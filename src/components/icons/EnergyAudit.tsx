import type { IconProps } from "./types";
import ThemedAssetIcon from "./ThemedAssetIcon";
import darkIcon from "./icon_dark_1/36x36/2nd Menu/Energy Audit.svg";
import lightIcon from "./icon_light_1/36x36/2nd Menu/Energy Audit.svg";

const EnergyAudit = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="Energy Audit"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={36}
            defaultHeight={36}
        />
    );
};

export default EnergyAudit;
