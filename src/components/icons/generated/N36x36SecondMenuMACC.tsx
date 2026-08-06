import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../svg/N36x36SecondMenuMACC.dark.svg";
import lightIcon from "../svg/N36x36SecondMenuMACC.light.svg";

const N36x36SecondMenuMACC = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="MACC"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={36}
            defaultHeight={36}
        />
    );
};

export default N36x36SecondMenuMACC;
