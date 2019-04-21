import React, {Component} from 'react'
import './index.css'
import $ from 'jquery';

const weather_list = {
    '晴': 'icon-qing',
    '多云': 'icon-duoyun',
    '阴': 'icon-yintian',
    '小雨': 'icon-xiaoyu',
    '中雨': 'icon-zhongyu',
    '大雨': 'icon-dayu',
    '阵雨': 'icon-zhenyu',
    '雷阵雨': 'icon-leizhenyu',
    '暴雨': 'icon-baoyu',
    '大暴雨': 'icon-dabaoyu',
    '特大暴雨': 'icon-tedabaoyu',
    '阵雪': 'icon-zhenxue',
    '小雪': 'icon-xiaoxue',
    '大雪': 'icon-daxue',
}

class Weather extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {},
        }
    }


    fetch_data() {
        // fetch('http://localhost:5001/api/weather')
        //     .then(res => res.json())
        //     .then(
        //         (result) => {
        //             console.log('result', result)
        //             this.setState({
        //                 data: result,
        //             })
        //         },
        //         (error) => {
        //             this.setState({
        //                 isLoaded: true,
        //                 error
        //             })
        //         }
        //     )
        $.ajax({
            url: 'http://192.168.50.17:5001/api/weather',
            type: 'get',
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            cache: false,
            crossDomain: true,
            success: function (data) {
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
        const weather = data['天气'] && data['天气'].split('转') || ''

        return (
            <div style={{width: '50vw', position: 'absolute', right: 0, top:0, padding: '15px', transition: 'opacity 1s'}}>
                <div id="weather_block">
                    <table className="layui-table">
                        <tbody>
                        <tr>
                            <td><i className="iconfont table-icon icon-kongqishidu"> </i></td>
                            <td>[<span id="val_hud" className="table-value">{data['湿度']}</span>]</td>
                            <td><i className="iconfont table-icon icon-richu"> </i></td>
                            <td>[<span id="val_sun_on" className="table-value">{data['日出时间']}</span>]</td>
                            <td><i className="iconfont table-icon icon-riluo"> </i></td>
                            <td>[<span id="val_sun_off" className="table-value">{data['日落时间']}</span>]</td>
                            <td><i className="iconfont table-icon icon-daqiyali"> </i></td>
                            <td>[<span id="val_press" className="table-value">{data['气压']}</span>]</td>
                            <td><i className="iconfont table-icon icon-ziwaixianzhishu"> </i></td>
                            <td>[<span id="val_uv" className="table-value">{data['紫外线']}</span>]</td>
                            <td><i className="wind iconfont table-icon icon-wind-1"> </i></td>
                            <td>[<span id="val_wind" className="table-value">{data['风级']}</span>]</td>
                        </tr>
                        </tbody>
                    </table>
                    <div style={{position: 'relative'}}>
                        <div style={{
                            'width': '17.5rem',
                            'position': 'absolute',
                            'padding': '0.875rem',
                            'left': 0,
                            'top': 0
                        }}>
                            <i className={`iconfont weather_1 ${weather_list[weather[0]]}`}
                               style={{'fontSize': '10rem'}}> </i>
                            {weather.length === 2 ? (
                                <>
                                <span className="weather_or" style={{'fontSize': '2rem'}}> </span>
                                <i className="iconfont weather_2" style={{'fontSize': '5rem'}}> </i>
                                </>
                            ) : ''}
                        </div>
                        <div >
                            <span style={{'fontSize': '1.1rem'}} id="val_weather">{data['天气']}</span>
                            <span style={{'fontSize': '1.1rem'}} id="val_tem_r">{data['气温']}</span>
                            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                            <br/>
                            <i className="iconfont weather_1" style={{'fontSize': '6rem'}}> </i>
                            <span style={{'fontSize': '6rem', 'letterSpacing': '-0.4rem'}}
                                  id="val_tem">{data['实时气温'] && data['实时气温'].replace('℃', '°')}</span>
                            <br/>
                            <span style={{'fontSize': '1.1rem'}} id="val_time">{data['发布时间']}</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Weather
