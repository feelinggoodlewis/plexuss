import React from 'react';
import { mainHeading } from './constants';

export function Header(props){
    const { handleSubComponentChange, title } = props;

    return(
        <li className="research_head row" onClick={handleSubComponentChange.bind(this, title)}>
            <div className="large-2 medium-2 small-3 columns sliding_menu_back_btn_parent">
                <i className="fa fa-angle-left left_angle"></i>
                <div className="sliding_menu_back_btn cursor">back</div>
            </div>
            <div className="larger-10 medium-10 small-9 columns cursor">
                { title }
            </div>
        </li>
    )
}
