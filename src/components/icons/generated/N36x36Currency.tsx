import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../svg/N36x36Currency.dark.svg";
import lightIcon from "../svg/N36x36Currency.light.svg";

const N36x36Currency = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="Currency"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={36}
            defaultHeight={36}
        />
    );
};

export default N36x36Currency;
