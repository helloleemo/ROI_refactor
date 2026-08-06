import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../svg/N36x36SecondMenuAccountManagement.dark.svg";
import lightIcon from "../svg/N36x36SecondMenuAccountManagement.light.svg";

const N36x36SecondMenuAccountManagement = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="Account Management"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={36}
            defaultHeight={36}
        />
    );
};

export default N36x36SecondMenuAccountManagement;
