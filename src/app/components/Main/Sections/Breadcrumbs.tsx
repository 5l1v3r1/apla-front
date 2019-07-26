/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import React from 'react';
import { IBreadcrumb } from 'apla/content';

import themed from 'components/Theme/themed';
import PageLink from 'components/Routing/PageLink';

export interface IBreadcrumbsProps {
    values: IBreadcrumb[];
}

const StyledBreadcrumbs = themed.ul`
    border-bottom: solid 1px ${props => props.theme.uiBorderLight};
    height: 45px;
    line-height: 45px;
    padding: 0 15px;
    margin: 0;
    font-size: 0;
    
    > li {
        display: inline-block;
        font-size: 15px;
        font-weight: 400;
        height: 45px;
        margin-right: 10px;

        &:first-child:before {
            content: none;
        }

        &:before {
            content: '>';
            font-size: 15px;
            color: #c1ccd6;
            display: inline-block;
            margin-right: 8px;
        }
    }
`;

const Breadcrumbs: React.SFC<IBreadcrumbsProps> = (props) => (
    <StyledBreadcrumbs>
        {props.values.map((breadcrumb, i) => (
            <li key={i}>
                {i === props.values.length - 1 ?
                    (
                        <span>{breadcrumb.title || breadcrumb.page}</span>
                    ) : (
                        <PageLink
                            section={breadcrumb.section}
                            page={breadcrumb.page}
                            params={breadcrumb.params}
                        >
                            {breadcrumb.title || breadcrumb.page}
                        </PageLink>
                    )
                }
            </li>
        ))}
    </StyledBreadcrumbs>
);

export default Breadcrumbs;