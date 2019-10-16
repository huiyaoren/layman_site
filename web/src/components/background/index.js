import React, {Component} from 'react'
// import './index.css'


class Background extends Component {




    componentDidMount() {
    }



    render() {
        return (
            <div style={{
                width: '100vw',
                height: '100vh',
                position: 'absolute',
                top: 0,
                left: 0,
                overflow: 'hidden',
                zIndex: -100
            }}>
                <img
                    src="https://www.bing.com/th?id=OHR.AcadiaBlueberries_ZH-CN6014510748_1920x1080.jpg"
                    alt="阿卡迪亚国家公园的高丛蓝莓植物，缅因州 (© Danita Delimont/Gallo Images/Getty Images Plus)"
                    style={{minWidth: '100vw', minHeight: '100vh', filter: 'blur(1rem)', zIndex: -100, opacity:0.8}}
                />
            </div>
        )
    }
}

export default Background
