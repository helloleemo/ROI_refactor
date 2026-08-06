import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../icon_dark_1/36x36/1st Meun/Energy Procurement.svg";
import lightIcon from "../icon_light_1/36x36/1st Meun/Energy Procurement.svg";

const Dark136x361stMeunEnergyProcurement = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="Energy Procurement"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={36}
            defaultHeight={36}
        />
    );
};

export default Dark136x361stMeunEnergyProcurement;
