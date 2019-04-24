import React, {Component} from 'react'
import './index.css'
import $ from 'jquery'


class MyBalance extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {
                total_result: [],
            },
        }
    }


    fetch_data() {
        $.ajax({
            url: 'http://192.168.50.17:5001/api/block_market',
            type: 'get',
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            cache: false,
            crossDomain: true,
            success: function (data) {
                console.log(data)
                this.setState({data: data})   // 注意这里
            }.bind(this),
            error: function (xhr, status, err) {
                alert(JSON.stringify(xhr))
                console.error(this.props.url, status, err.toString())
            }.bind(this)
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
        const result = data

        return (
            <div style={{
                width: '35vw',
                position: 'absolute',
                top: '14.5rem',
                left: 0,
                padding: '1rem',
                transition: 'opacity 1s'
            }}>
                <div >
                    <table  className="layui-table">
                        <tbody >
                        {result['total_result'].map((item) => {
                            let style
                            if (parseFloat(item['earnedPer']) > 0) {
                                style = {backgroundColor: 'white', color: '#282c34'}
                            } else {
                                style = {backgroundColor: '#282c34', color: 'white'}
                            }
                            return (
                                <tr>
                                    <td style={style}>{item['CurrencyName']}</td>
                                    <td style={style} align="right">
                                        ¥{item['currentPrice']}</td>
                                    <td style={style} align="right">{item['earnedPer']}%
                                    </td>
                                    <td style={style} align="right">{item['influence']}%
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
                <div >
                    <span id="total_earned">区块链总收益率: {(result['total_earned'] * 100 / result['total_cost']).toFixed(2)}%</span>
                    <button type="button"
                            style={{background: 'white', color: 'black', padding: '0.1rem', margin: '0.5rem'}}
                            onClick={this.fetch_data}>更新
                    </button>
                </div>
            </div>
        )
    }
}

export default MyBalance
