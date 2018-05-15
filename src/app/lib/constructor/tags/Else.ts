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

import { TProtypoElement } from 'genesis/protypo';
import constructorModule from 'lib/constructor';
import Tag from './Tag';

class Else extends Tag {
    constructor(element: TProtypoElement) {
        super(element);
        this.tagName = 'Else';
        this.canHaveChildren = true;
        this.canMove = false;
        this.canCopy = false;
        this.canChangePosition = false;
        this.logic = true;
        this.attr = {
        };
        this.editProps = [];
    }

    renderCode(): string {

        if (this.element.children && this.element.children.length === 0) {
            return '';
        }

        let result: string = '.' + this.tagName;
        result += '{\n';
        let body = this.renderChildren(this.element.children, this.offset);

        if (this.element.children && this.element.children.length) {
            result += body + '\n' + this.renderOffset();
        }
        result += '}';
        return result;
    }

    generateTreeJSON(text: string): any {
        return {
            tag: this.tagName.toLowerCase(),
            id: (constructorModule.IdGenerator.Instance).generateId()
        };
    }
}

export default Else;