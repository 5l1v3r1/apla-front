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

import Tag from './Tag';

class ImageInput extends Tag {

    protected tagName: string = 'ImageInput';
    public canHaveChildren: boolean = false;
    protected attr: any = {
        'class': 'Class',
        'format': 'Format',
        'name': 'Name',
        'ratio': 'Ratio',
        'width': 'Width'
    };
    protected newElementAttr: any = {
        format: 'jpg',
        name: 'sample image',
        ratio: '2/1',
        width: '100'
    };
    protected editProps = ['class', 'name', 'format', 'ratio', 'width'];
    protected generateTextElement: boolean = false;
}

export default ImageInput;