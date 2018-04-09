// Copyright 2017 The genesis-front Authors
// This file is part of the genesis-front library.
// 
// The genesis-front library is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// 
// The genesis-front library is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU Lesser General Public License for more details.
// 
// You should have received a copy of the GNU Lesser General Public License
// along with the genesis-front library. If not, see <http://www.gnu.org/licenses/>.

import * as React from 'react';
import { OnPasteStripFormatting } from 'lib/constructor';
import StyledComponent from './StyledComponent';
import TagWrapper from '../components/TagWrapper';
import DnDComponent from './DnDComponent';
import * as classnames from 'classnames';
import { TProtypoElement } from 'genesis/protypo';
import { editorActions } from 'modules/editor/actions';
import Parser from 'html-react-parser';

export interface IDivProps {
    'className'?: string;
    'class'?: string;
    'childrenText'?: string;

    'editable'?: boolean;
    'changePage'?: typeof editorActions.changePage.started;
    'setTagCanDropPosition'?: typeof editorActions.setTagCanDropPosition.started;
    'addTag'?: typeof editorActions.addTag.started;
    'moveTag'?: typeof editorActions.moveTag.started;
    'copyTag'?: typeof editorActions.copyTag.started;
    'removeTag'?: typeof editorActions.removeTag.started;
    'selectTag'?: typeof editorActions.selectTag.started;
    'selected'?: boolean;
    'tag'?: TProtypoElement;

    'canDropPosition'?: string;

    connectDropTarget?: any;
    isOver?: boolean;

    connectDragSource?: any;
    connectDragPreview?: any;
    isDragging?: boolean;
}

interface IDivState {
}

class Div extends React.Component<IDivProps, IDivState> {
    constructor(props: IDivProps) {
        super(props);
    }

    onPaste(e: any) {
        OnPasteStripFormatting(this, e);
    }

    onClick(e: any) {
        e.stopPropagation();
        this.props.selectTag(this.props.tag);
    }

    onBlur(e: any) {
        e.stopPropagation();
        this.props.selectTag(null);
        this.props.changePage({ text: e.target.innerHTML, tagID: this.props.tag.id });
    }

    removeTag() {
        this.props.removeTag({ tag: this.props.tag });
    }

    renderChildrenText() {
        return Parser(this.props.childrenText || '');
    }

    render() {
        if (this.props.editable) {
            const { connectDropTarget, connectDragSource, connectDragPreview, isOver } = this.props;

            const classes = classnames({
                [this.props.class]: true,
                [this.props.className]: true,
                'b-selected': this.props.selected
            });

            return connectDragPreview(connectDropTarget(
                <span>
                    <TagWrapper
                        display="block"
                        selected={this.props.selected}
                        canDrop={isOver}
                        canDropPosition={this.props.canDropPosition}
                        onClick={this.onClick.bind(this)}
                        removeTag={this.removeTag.bind(this)}
                        connectDragSource={connectDragSource}
                        canMove={true}
                    >
                    {(this.props.selected && this.props.childrenText && this.props.childrenText.length >= 0) ? (
                        <div
                            className={classes}
                            contentEditable={this.props.selected}
                            onPaste={this.onPaste.bind(this)}
                            onBlur={this.onBlur.bind(this)}
                        >
                            {this.props.childrenText && this.props.childrenText.length >= 0 && Parser(this.props.childrenText || '')}
                        </div>
                    ) : (
                        <div
                            className={classes}
                        >
                            {this.props.children}
                        </div>
                    )}
                    </TagWrapper>
                </span>
            ));
        }
        return (
            <div
                className={[this.props.class, this.props.className].join(' ')}
            >
                {this.props.children}
            </div>
        );
    }
}

export default StyledComponent(Div);
export const DivDnD = DnDComponent(StyledComponent(Div));
