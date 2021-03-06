import React, {Component} from 'react'
import './index.css'
import helper from '../../utils/index'


class Gold extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {'账户黄金(人民币)': '2XX'},
        }
    }


    fetch_data() {
        helper.request({
            uri: '/api/gold',
            type: 'get',
            success: function (data) {
                this.setState({data: data})   // 注意这里
            }.bind(this),
        })
    }


    componentWillUnmount() {
        clearInterval(this.interval)
    }


    componentDidMount() {
        this.fetch_data()
        this.interval = setInterval(() => this.fetch_data(), 600 * 1000)
    }


    render() {
        const {data} = this.state

        return (
            <div style={{
                width: '40vw',
                position: 'absolute',
                top: '10.5rem',
                left: 0,
                padding: '1rem',
                transition: 'opacity 1s'
            }}>
                <table className="layui-table">
                    <tbody>
                    <tr>
                        <td>账户黄金(人民币):</td>
                        <td><span id="val_gold" style={{fontSize: '2.5rem'}}> {'¥ ' + data['账户黄金(人民币)']} </span></td>
                        <td> </td>
                        <td> </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Gold
