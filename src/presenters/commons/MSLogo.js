import React from 'react'
import {SvgIcon} from 'material-ui'
/**
 * Created by t-zikunfan
 * Date: 11:02 2017/7/21
 */
export default function MSLogo(props) {
    return (
        <SvgIcon
            {...props}
            viewBox="0 0 64 64"
            className="icon"
            style={{height: props.size, width: props.size, marginLeft: 0}}
        >
            <path className="st0" d="M0 0h30v30H0z"/>
            <path className="st1" d="M34 0h30v30H34z"/>
            <path className="st2" d="M34 34h30v30H34z"/>
            <path className="st3" d="M0 34h30v30H0z"/>
        </SvgIcon>
    );
}