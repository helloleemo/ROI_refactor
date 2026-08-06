import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../svg/N36x36FirstMeunBackend.dark.svg";
import lightIcon from "../svg/N36x36FirstMeunBackend.light.svg";

const N36x36FirstMeunBackend = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="Backend"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={36}
            defaultHeight={36}
        />
    );
};

export default N36x36FirstMeunBackend;
