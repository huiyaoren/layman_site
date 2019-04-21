import React, {Component} from 'react'
import './index.css'
import $ from 'jquery'


class FutureWeather extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
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
        this.interval = setInterval(() => this.fetch_data(), 100 * 1000)
    }


    render() {
        const {data} = this.state

        return (
            <div style={{
                width: '30vw',
                position: 'absolute',
                right: 0,
                top: 0,
                padding: '15px',
                transition: 'opacity 1s'
            }}>
                <table className="layui-table">
                    <tbody >
                    {data.map((item, index) => {
                        if (index < 10) {
                            return (
                                <tr style={{opacity: 1 - index * 0.0875}}>
                                    <td style={{fontSize: '1.125rem'}}>{item['dt_txt']}</td>
                                    <td style={{fontSize: '1.125rem'}}>{item['description']}</td>
                                    <td style={{fontSize: '1.125rem'}}>{item['temp']}°</td>
                                </tr>
                            )
                        }
                    })}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default FutureWeather
