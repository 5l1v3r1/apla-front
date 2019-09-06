/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { IThemeDefinition } from 'apla/theme';
import platform from 'lib/platform';

const baseTheme: IThemeDefinition = {
    windowBorder: '#4c7dbd',

    headerBackground: '#354a69',
    headerForeground: '#fff',
    headerHeight: platform.select({ desktop: 28, web: 0 }),

    menubarBackground: '#3873A6',
    menubarBackgroundActive: '#9CB9D2',
    menubarBackgroundFocused: 'rgba(255,255,255,0.09)',
    menubarBackgroundSecondary: '#ffa500',
    menubarForeground: '#9CB9D3',
    menubarForegroundActive: '#fff',

    toolbarBackground: '#f1f1f1',
    toolbarBackgroundActive: 'rgba(0,0,0,0.1)',
    toolbarBackgroundFocused: 'rgba(0,0,0,0.05)',
    toolbarForeground: '#333',
    toolbarForegroundActive: '#5d5d5d',
    toolbarForegroundPrimary: '#4688ff',
    toolbarForegroundDisabled: '#ccc',
    toolbarSpacerForeground: '#C6C6C6',

    menuBackground: '#fff',
    menuForeground: '#0a1d33',
    menuBackgroundActive: '#f6f7f9',
    menuBorder: '#35abff',
    menuOutline: '#eff2f5',
    menuIconColor: '#3577cc',
    menuPrimaryForeground: '#2886ff',
    menuPrimaryActive: '#7bb0f5',
    menuSize: 230,
    menuSizeFolded: 55,

    contentForeground: '#515253',
    contentBackground: '#fff',

    editorBackground: '#c3c7ce',

    modalHeaderBackground: '#6d7696',
    modalHeaderForeground: '#fff',
    modalOutline: '#979eb7',

    notificationBackground: 'rgba(62, 72, 111, 0.9)',
    notificationForeground: 'rgba(255, 255, 255, 0.6)',
    notificationIconColor: '#fff',
    notificationPrimaryForeground: '#fff',

    sectionButtonOutline: '#9eb4d0',
    sectionButtonBackground: '#e9eef5',
    sectionButtonForeground: '#194a8a',
    sectionButtonActive: '#9eb4d1',
    sectionButtonPrimary: '#fff',

    dropdownMenuBackground: '#fff',
    dropdownMenuForeground: '#464646',
    dropdownMenuDisabled: '#ccc',
    dropdownMenuActive: 'rgba(0,0,0,0.06)',
    dropdownMenuSeparator: '#efefef',
    dropdownMenuPrimary: '#4b7dbd',
    dropdownMenuSecondary: '#999',

    securityWarningBackground: '#ff5555',
    securityWarningForeground: '#ffffff',

    uiBorderLight: '#e8eaf1'
};

export default baseTheme;