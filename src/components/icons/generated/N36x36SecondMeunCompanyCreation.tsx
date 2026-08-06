import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../svg/N36x36SecondMeunCompanyCreation.dark.svg";
import lightIcon from "../svg/N36x36SecondMeunCompanyCreation.light.svg";

const N36x36SecondMeunCompanyCreation = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="Company Creation"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={36}
            defaultHeight={36}
        />
    );
};

export default N36x36SecondMeunCompanyCreation;
