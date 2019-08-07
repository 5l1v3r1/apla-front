/*---------------------------------------------------------------------------------------------
*  Copyright (c) EGAAS S.A. All rights reserved.
*  See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import themed from 'components/Theme/themed';

export default themed.em`
    &:after {
        content: '|';
        display: inline-block;
        margin: 0 15px;
        color: ${props => props.theme.menubarForeground};
        line-height: ${props => props.theme.menubarSize}px;
    }
`;