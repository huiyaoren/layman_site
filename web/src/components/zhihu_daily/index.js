import React, {Component} from 'react'
import './index.css'
import QRCode from 'qrcode'
import {Carousel} from 'antd-mobile';
import helper from '../../utils/index'

class ZhihuDaily extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {
                image: new Array(30).fill('https://picsum.photos/100/100'),
                qrcode_url: new Array(30).fill('https://picsum.photos/100/100'),
                title: new Array(30).fill('XXXXXX-XXXXXXXXXXXXXXXXXX'),
                page: new Array(30).fill('X'),
            },
        }
    }

    fetch_data = () => {
        helper.request({
            uri: '/api/zhihu_daily',
            success: function (data) {
                data['qrcode_url'] = []
                this.setState({data: data}, () => {
                    for (let i = 0; i < 30; i++) {
                        QRCode.toDataURL(data['page'][i]).then(url => {
                            let data = this.state.data
                            data['qrcode_url'][i] = url
                            this.setState({data})
                        })
                    }
                })
            }.bind(this),
        })
    }

    componentWillUnmount() {
        clearInterval(this.interval_data)
    }

    componentDidMount() {
        this.fetch_data()
        this.interval_data = setInterval(() => this.fetch_data(), 1800 * 1000)
    }


    renderItem = (data) => {
        const range = new Array(30).fill(null)
        return range.map((val, index) => {
            return (
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <img
                        src={data['image'][index]}
                        alt=""
                        style={{width: '15%'}}
                    />
                    <span style={{
                        width: '70%',
                        display: 'inline-block',
                        fontSize: '1.875rem',
                        textAlign: 'center'
                    }}>{data['title'][index]}</span>
                    <img
                        src={data['qrcode_url'][index]}
                        alt=""
                        style={{width: '15%'}}
                    />
                </div>
            )
        })
    }

    render() {
        const {data} = this.state
        return (
            <div style={{
                width: '100vw',
                position: 'absolute',
                bottom: '1rem',
                right: 0,
                overflow: 'hidden',
            }}>

                <Carousel autoplay infinite
                          frameOverflow="visible"
                          cellSpacing={30}
                          slideWidth={0.95}
                          autoplayInterval={60000}
                >
                    {this.renderItem(data)}
                </Carousel>
            </div>

        )
    }
}

export default ZhihuDaily
