import React, {Component} from 'react'
import './index.css'
import $ from 'jquery'

class FutureWeather extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: new Array(10).fill({
                'dt_txt': 'xxxx',
                'description': '多云',
                'temp': '0'
            }),
        }
    }


    fetch_data() {
        $.ajax({
            url: 'http://192.168.50.17:5001/api/future_weather',
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
                console.log([this.props.url, status, err.toString(), JSON.stringify(xhr)])
            }.bind(this)
        })
    }


    componentWillUnmount() {
        clearInterval(this.interval)
    }


    componentDidMount() {
        this.fetch_data()
        this.interval = setInterval(() => this.fetch_data(), 100 * 1000)
    }


    render() {
        const {data} = this.state

        return (
            <div style={{
                width: '35vw',
                position: 'absolute',
                top: '14rem',
                right: 0,
                padding: '1rem',
                transition: 'opacity 1s'
            }}>
                <table className="layui-table">
                    <tbody >
                    {
                        data.map((item, index) => {
                            if (index < 10) {
                                return (
                                    <tr key={index} style={{opacity: 1 - index * 0.0875}}>
                                        <td>{item['dt_txt']}</td>
                                        <td>{item['description']}</td>
                                        <td>{item['temp']}°</td>
                                    </tr>
                                )
                            }
                        })
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default FutureWeather
