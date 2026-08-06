import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../svg/N36x36SecondMenuGHG.dark.svg";
import lightIcon from "../svg/N36x36SecondMenuGHG.light.svg";

const N36x36SecondMenuGHG = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="GHG"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={36}
            defaultHeight={36}
        />
    );
};

export default N36x36SecondMenuGHG;
