import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../svg/N36x36SecondMenuRealtime.dark.svg";
import lightIcon from "../svg/N36x36SecondMenuRealtime.light.svg";

const N36x36SecondMenuRealtime = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="Realtime"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={36}
            defaultHeight={36}
        />
    );
};

export default N36x36SecondMenuRealtime;
