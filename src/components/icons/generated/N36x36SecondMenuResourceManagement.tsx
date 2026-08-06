import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../svg/N36x36SecondMenuResourceManagement.dark.svg";
import lightIcon from "../svg/N36x36SecondMenuResourceManagement.light.svg";

const N36x36SecondMenuResourceManagement = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="Resource Management"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={36}
            defaultHeight={36}
        />
    );
};

export default N36x36SecondMenuResourceManagement;
