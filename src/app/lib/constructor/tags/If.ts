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

import { idGenerator } from 'lib/constructor';
import Tag from './Tag';

class If extends Tag {
    protected tagName: string = 'If';
    public logic: boolean = true;
    protected bodyInline = false;
    protected attr: any = {
        'condition': 'Condition'
    };
    protected newElementAttr: any = {
        condition: '#value#'
    };
    protected editProps: string[] = ['condition'];
    protected generateTextElement: boolean = false;

    renderCode(): string {
        let result: string = this.renderOffset();
        result += this.tagName + '(';

        let body = this.renderChildren(this.element.children, this.offset);
        result += this.renderParams(this.element, body) + ')';
        result += this.renderBody(body);

        let tail = this.renderChildren(this.element.tail, this.offset, '');

        result += tail;
        return result;
    }

    generateTreeJSON(text: string): any {
        return {
            ...this.generateBaseTreeJSON(text),
            children: [],
            tail: [
                {
                    tag: 'else',
                    id: idGenerator.generateId(),
                    children: []
                }
            ]
        };
    }
}

export default If;