import React from 'react';

export default class ImageSelector extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isSelected: false
        }
        this._fileChange = this._fileChange.bind(this);
    }

    render() {
        return (
            <div style={Style.container}>
                <canvas ref="canvas" style={Style.canvas} width={this.props.width || 200} height={this.props.height || 200} /> 
                <a href="" style={Style.file}>
                    {this.state.isSelected ? '重新上传' : '上传'}
                    <input style={Style.input} ref="fileInput" type="file" accept="image/jpeg, image/jpg" onChange={this._fileChange}/> 
                </a>                  
            </div>
        )
    }

    _fileChange(evt) {
        const file = evt.target.files[0];
        const fileReader = new FileReader;
        fileReader.onload = (evt) => {
            this.drawToCanvas(evt.target.result);
        };
        fileReader.readAsDataURL(file);
    }

    drawToCanvas(imgData) {
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext("2d");
        const img = new Image;
        img.src = imgData;
        img.onload = () => {
            this.setState({isSelected : true})
            const imgWidth = img.naturalWidth;
            const imgHeight = img.naturalHeight;
            let canvasHeight;
            let canvasWidth;
            if (imgHeight < imgWidth) {
                canvasHeight = canvas.width;
                canvasWidth = Math.ceil(canvasHeight*imgWidth/imgHeight);
            } else {
                canvasWidth = canvas.height;
                canvasHeight = Math.ceil(canvasWidth*imgHeight/imgWidth);
            }
            let sx;
            let sy;
            if (imgWidth>imgHeight) {
                sx=(imgWidth-imgHeight)/2;
                sy=0;
            } else {
                sx=0;
                sy=(imgHeight-imgWidth)/2;
            }
            ctx.drawImage(img,sx,sy,imgWidth,imgHeight,0,0,canvasWidth,canvasHeight);
        }
    }
}
const Style = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: 250,
    },
    canvas: {
        marginTop: 10,
        marginBottom: 10,
        border: '1px gray dotted',
        borderRadius: 4,
    },
    file: {
        position: 'relative',
        display: 'inline-block',
        borderradius: 4,
        padding: '4px 12px',
        overflow: 'hidden',
        color: 'white',
        textDecoration: 'none',
        textIndent: 0,
        lineHeight: '20px',
        backgroundColor: 'gray',
    },
    input: {
        position: 'absolute',
        fontSize: 100,
        right: 0,
        top: 0,
        opacity: 0,
    }     
}