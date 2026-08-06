import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../svg/N36x36FirstMeunWorkshop.dark.svg";
import lightIcon from "../svg/N36x36FirstMeunWorkshop.light.svg";

const N36x36FirstMeunWorkshop = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="workshop"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={36}
            defaultHeight={36}
        />
    );
};

export default N36x36FirstMeunWorkshop;
