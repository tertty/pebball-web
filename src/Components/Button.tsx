import { FunctionComponent } from 'react';
import { NavLink } from 'react-router-dom';

type ButtonProps = {
    href?: string,
    // handleClick?: Function,
    handleClick?: any,
    to?: string,
    disabled?: boolean,
    text?: string
    type?: "button" | "submit" | "reset" | undefined,
    light?: boolean
}

const Button: FunctionComponent<ButtonProps> = ({href, to, disabled = false, text, handleClick, type, light}) => {
    
    if(href){
        return(
            <a className="p-2 mr-2 border-2 border-[rgba(0,0,0,0)] cursor-pointer text-white hover-border-btn" href={href}>{text}</a>
        );
    }
    if(to){
        if ( light ) {
            return( 
                <NavLink className={(disabled ? 'disabled' : "") + " text-white p-2 mr-2 rounded-t-sm cursor-pointer bg-[#1368ce] inset-shadow-[0px_-4px_rgba(0,0,0,0.25)] hover-border-btn hover:inset-shadow-none"} to={to}>{text}</NavLink>
            );
        } else {
            return( 
                <NavLink className={(disabled ? 'disabled' : "") + " text-[#272F3F] p-2 mr-2 rounded-t-sm cursor-pointer bg-white inset-shadow-[0px_-4px_rgba(0,0,0,0.25)] hover-border-btn hover:inset-shadow-none"} to={to}>{text}</NavLink>
            );
        }
    }

    if(handleClick){
        return(
            <button className="p-2 border-2 border-highlightPink border-t-[rgba(0,0,0,0)] hover:bg-highlightPink hover:border-t-highlightPink hover:text-baseDark hover:font-bold duration-300" type={type ?? 'button'} onClick={handleClick}>{text}</button>
        );
    }
}
 
export default Button;