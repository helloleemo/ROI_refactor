import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../svg/N30x30OptionsComment.dark.svg";
import lightIcon from "../svg/N30x30OptionsComment.light.svg";

const N30x30OptionsComment = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="Comment"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={30}
            defaultHeight={30}
        />
    );
};

export default N30x30OptionsComment;
