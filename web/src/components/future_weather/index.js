import React, {Component} from 'react'
import './index.css'
import helper from '../../utils/index'

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
        helper.request({
            uri: '/api/future_weather',
            type: 'get',
            success: function (data) {
                helper.log(data)
                this.setState({data: data})
            }.bind(this),
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
                            return null
                        })
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default FutureWeather
