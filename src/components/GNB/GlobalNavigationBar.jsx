import React from 'react';
import AsideMenu from './AsideMenu';
import Logo from './LogoMenu';
import Menu from './Menu';
import {GNB} from './style'

const GlobalNavigationBar = () => {
    return (
        <GNB>
            <Logo/>
            <Menu/>
            <AsideMenu/>
        </GNB>
    );
};

export default React.memo(GlobalNavigationBar);