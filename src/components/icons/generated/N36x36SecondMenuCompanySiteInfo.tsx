import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../svg/N36x36SecondMenuCompanySiteInfo.dark.svg";
import lightIcon from "../svg/N36x36SecondMenuCompanySiteInfo.light.svg";

const N36x36SecondMenuCompanySiteInfo = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="Company & Site Info"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={36}
            defaultHeight={36}
        />
    );
};

export default N36x36SecondMenuCompanySiteInfo;
