import React, {Component} from 'react'
import './index.css'
import $ from 'jquery'
import QRCode from 'qrcode'


class ZhihuDaily extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
        }
    }

    fetch_data = ()=> {
        $.ajax({
            url: 'http://192.168.50.17:5001/api/zhihu_daily',
            type: 'get',
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            cache: false,
            crossDomain: true,
            success: function (data) {
                console.log(data)
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
            error: function (xhr, status, err) {
                alert(JSON.stringify(xhr))
                console.error(this.props.url, status, err.toString())
            }.bind(this)
        })
    }

    componentWillUnmount() {
        clearInterval(this.interval_data)
        clearInterval(this.interval_scroll)
    }

    componentDidMount() {
        this.fetch_data()
        this.interval_data = setInterval(() => this.fetch_data(), 1800 * 1000)
        this.interval_scroll = setInterval(() => {
            let table = document.querySelector('.zhihu-table')
            let t = Number(table.style.top.replace('rem', ''))
            if (t + 6 * document.querySelectorAll('.zhihu-table-tr').length <= 20) {
                table.style.top = '0rem'
            } else {
                table.style.top = (t - 6) + 'rem'
            }
        }, 30 * 1000)
    }

    renderItem = (data) => {
        let _ = []
        for (let i = 0; i < 30; i++) {
            _.push(
                <tr key={i} className="zhihu-table-tr">
                    {i % 2 === 0 ? (
                        <td><img src={data['image'][i]} alt=""/></td>
                    ) : (
                        <td className="qrcode"><img src={data['qrcode_url'][i]} alt=""/></td>
                    )}
                    <td className="zhihu-table-title" style={{fontSize: '1.875rem'}}>
                        <a href={data['page'][i]}> </a>{data['title'][i]}
                    </td>
                    {i % 2 === 0 ? (
                        <td className="qrcode"><img src={data['qrcode_url'][i]} alt=""/></td>
                    ) : (
                        <td><img src={data['image'][i]} alt=""/></td>
                    )}
                </tr>
            )
        }
        return _
    }

    render() {
        const {data} = this.state

        return (
            <div style={{width: '100vw',position: 'absolute', bottom: 0, right: 0, padding: '0', transition: 'opacity 1s'}}>
                <div style={{width: '100vw',height: '16.5rem', overflow: 'hidden', position: 'relative'}}>
                    <table id="" className="zhihu-table"
                           style={{position: 'absolute', top: '0rem', transition: 'top 2s', padding:'1rem'}}>
                        <tbody id="">
                        {data.image && this.renderItem(data)}
                        </tbody>
                    </table>
                    <div className="zhihu-mask"></div>
                </div>
            </div>
        )
    }
}

export default ZhihuDaily
