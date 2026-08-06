import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../svg/N36x36NotUsedSecurity.dark.svg";
import lightIcon from "../svg/N36x36NotUsedSecurity.light.svg";

const N36x36NotUsedSecurity = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="security"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={36}
            defaultHeight={36}
        />
    );
};

export default N36x36NotUsedSecurity;
