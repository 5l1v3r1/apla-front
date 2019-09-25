// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License
// as published by the Free Software Foundation; either version 2
// of the License, or (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with this program; if not, write to the Free Software
// Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.

import React from 'react';
import PageLink from 'containers/Routing/PageLink';
import themed from 'components/Theme/themed';
import { FormattedMessage } from 'react-intl';

interface Props {
    home?: boolean;
    active?: boolean;
    section: string;
    page: string;
    params: {
        [key: string]: string;
    };
}

const StyledBreadcrumb = themed.div`
    vertical-align: top;
    display: inline-block;

    &.breadcrumb_active {
        .breadcrumb__label, .breadcrumb__icon {
            color: ${props => props.theme.toolbarForegroundPrimary};
        }
    }

    .breadcrumb__icon {
        line-height: inherit;
        font-size: 20px;
        color: ${props => props.theme.toolbarForeground};
        opacity: 0.7;
    }

    .breadcrumb__label {
        line-height: inherit;
        font-size: 14px;
        color: ${props => props.theme.toolbarForeground};
    }
`;

const placeholder = (
    <FormattedMessage id="navigation.loaded_page" defaultMessage="Loaded page" />
);

const Breadcrumb: React.SFC<Props> = props => {
    const titleText = props.children || placeholder;
    const title = props.home ?
        (
            <em className="breadcrumb__icon fa fa-home" />
        )
        :
        (
            <span className="breadcrumb__label">{titleText}</span>
        );

    if (!props.active) {
        return (
            <StyledBreadcrumb>
                {title}
            </StyledBreadcrumb>
        );
    }

    return (
        <StyledBreadcrumb className="breadcrumb_active">
            <PageLink
                section={props.section}
                page={props.page}
                params={props.params}
            >
                {title}
            </PageLink>
        </StyledBreadcrumb>
    );
};

export default Breadcrumb;