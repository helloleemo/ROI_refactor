import { type IconProps } from './types';

const User = ({ width = 27, height = 27 }: IconProps) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 40 40" fill="none">
            <circle opacity="0.7" cx="20" cy="20" r="19.5" stroke="#515151" />
            <circle cx="19.9996" cy="12.7999" r="6.4" fill="#CCCCCC" />
            <path d="M19.5996 20.7998C27.8748 20.7998 32.4282 27.2434 32.7754 35.3867C29.3104 38.2669 24.8579 40 20 40C14.777 40 10.0221 37.9974 6.45996 34.7188C7.02234 26.8939 11.5522 20.8 19.5996 20.7998Z" fill="#CCCCCC" />
        </svg>
    );
};

export default User