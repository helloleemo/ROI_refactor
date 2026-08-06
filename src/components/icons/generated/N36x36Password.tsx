import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../svg/N36x36Password.dark.svg";
import lightIcon from "../svg/N36x36Password.light.svg";

const N36x36Password = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="password"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={36}
            defaultHeight={36}
        />
    );
};

export default N36x36Password;
