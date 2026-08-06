import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../svg/N36x36SecondMenuDocManagement.dark.svg";
import lightIcon from "../svg/N36x36SecondMenuDocManagement.light.svg";

const N36x36SecondMenuDocManagement = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="Doc. Management"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={36}
            defaultHeight={36}
        />
    );
};

export default N36x36SecondMenuDocManagement;
