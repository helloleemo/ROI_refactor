import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../svg/N36x36SecondMenuEnergyAudit.dark.svg";
import lightIcon from "../svg/N36x36SecondMenuEnergyAudit.light.svg";

const N36x36SecondMenuEnergyAudit = (props: IconProps) => {
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

export default N36x36SecondMenuEnergyAudit;
