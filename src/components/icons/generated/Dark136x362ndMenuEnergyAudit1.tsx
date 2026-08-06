import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../icon_dark_1/36x36/2nd Menu/Energy Audit-1.svg";
import lightIcon from "../icon_light_1/36x36/2nd Menu/Energy Audit-1.svg";

const Dark136x362ndMenuEnergyAudit1 = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="Energy Audit-1"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={36}
            defaultHeight={36}
        />
    );
};

export default Dark136x362ndMenuEnergyAudit1;
