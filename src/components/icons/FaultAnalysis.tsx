

import { type IconProps } from "./types";
const FaultAnalysis = ({ width = 27, height = 27, accentColor = "#0087DC" }: IconProps) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 40 40" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M23.0047 24.7609C26.4957 22.2399 27.282 17.3664 24.761 13.8755C22.24 10.3846 17.3664 9.59829 13.8754 12.1192C10.3845 14.6402 9.59815 19.5137 12.1191 23.0046C14.6401 26.4955 19.5138 27.2818 23.0047 24.7609ZM24.4952 26.8248C29.1261 23.4807 30.1692 17.0158 26.825 12.385C23.4808 7.75422 17.0158 6.71118 12.3849 10.0553C7.75405 13.3994 6.71099 19.8643 10.0552 24.4951C13.3993 29.1259 19.8644 30.1689 24.4952 26.8248Z" fill={accentColor} />
            <path d="M32.9998 31.1107L31.1108 32.9996L24.2422 26.1311L26.1312 24.2422L32.9998 31.1107Z" fill={accentColor} />
            <path fillRule="evenodd" clipRule="evenodd" d="M17.2783 20.5984V13.959H19.4915V20.5984H17.2783Z" fill={accentColor} />
            <path fillRule="evenodd" clipRule="evenodd" d="M17.2783 23.9182V21.7051H19.4915V23.9182H17.2783Z" fill={accentColor} />
        </svg>
    )
}

export default FaultAnalysis