
import { type IconProps } from "./types";


const Language = ({ width = 27, height = 27, accentColor = "#0087DC" }: IconProps) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 27 27" fill="none">
            <path
                d="M2.25098 13.5C2.25098 19.7134 7.2876 24.75 13.501 24.75C19.7143 24.75 24.751 19.7134 24.751 13.5C24.751 7.28662 19.7143 2.25 13.501 2.25C7.2876 2.25 2.25098 7.28662 2.25098 13.5Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M14.6262 2.30664C14.6262 2.30664 18.0012 6.75039 18.0012 13.5004C18.0012 20.2504 14.6262 24.6941 14.6262 24.6941M12.3762 24.6941C12.3762 24.6941 9.00121 20.2504 9.00121 13.5004C9.00121 6.75039 12.3762 2.30664 12.3762 2.30664M2.95996 17.4379H24.0425M2.95996 9.56289H24.0425"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M14.6279 2.30566C14.6279 2.30566 18.0029 6.74941 18.0029 13.4994C18.0029 20.2494 14.6279 24.6932 14.6279 24.6932"
                stroke={accentColor}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};


export default Language