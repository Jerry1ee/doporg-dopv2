/* eslint no-undef:0, no-unused-expressions:0, array-callback-return:0 */
import React, { Component } from 'react';
import Menu, { Item as MenuItem } from '@icedesign/menu';
import { withRouter, Link } from 'react-router-dom';
import FoundationSymbol from 'foundation-symbol';
import { permissionAsideMenuConfig as asideMenuConfig } from './permissionMenuConfig';
import { Icon } from '@icedesign/base';

import './index.scss';
import PermissionLayout from "../../layouts/PermissionLayout";

// @withRouter

class PermissionAside extends Component {
    static propTypes = {};

    static defaultProps = {};

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { location } = this.props;
        const { pathname } = location;

        return (
            <Menu mode="inline" selectedKeys={[pathname]} className="ice-menu-custom">
                {Array.isArray(asideMenuConfig) &&
                asideMenuConfig.length > 0 &&
                asideMenuConfig.map((nav) => {
                    return (
                        <MenuItem key={nav.path}>
                            <Link to={nav.path} className="ice-menu-link">
                                {nav.icon ? (
                                    <FoundationSymbol size="small" type={nav.icon} >
                                        <Icon size="small" type={nav.icon} />
                                    </FoundationSymbol>
                                ) : null}
                                <span className="ice-menu-item-text">{nav.name}</span>
                            </Link>
                        </MenuItem>
                    );
                })}
            </Menu>
        );
    }
}

export default withRouter(PermissionAside)
