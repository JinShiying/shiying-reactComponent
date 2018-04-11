import React from 'react';
import { render } from 'react-dom';
import ImageSelector from './ImageSelector/index';

const renderDom = Component => {
    render(
        <Component/>,
        document.getElementById('app')
    );
}
renderDom(ImageSelector);
