import React, {Component} from 'react'
import './index.css'
import $ from 'jquery'


class Datetime extends Component {
    constructor(props) {
        super(props)
        this.state = {
            day: '',
            time: '',
        }
    }


    fetch_data() {
        this.getDay()
        this.getTime()
    }


    componentWillUnmount() {
        clearInterval(this.interval)
    }


    componentDidMount() {
        this.fetch_data()
        this.interval = setInterval(() => this.fetch_data(), 60 * 1000)
    }

    getDay = () => {
        let time = new Date()
        let year = time.getYear()
        let month = time.getMonth()
        let date = time.getDate()
        let day = time.getDay()
        let weekday = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"][day]
        year = Number(year) + 1900
        month = Number(month) + 1
        month = month < 10 ? '0' + month : month
        this.setState({
            day: '[ ' + weekday + ' ]' + '  ' + year + ' 年 ' + month + ' 月 ' + date + ' 日 '
        })
    }

    getTime = () => {
        let time = new Date()
        let hour = time.getHours()
        let minutes = time.getMinutes()
        let second = time.getSeconds()
        hour = hour < 10 ? '0' + hour : hour
        minutes = minutes < 10 ? '0' + minutes : minutes
        second = second < 10 ? '0' + second : second
        this.setState({
            time: hour + ':' + minutes
        })
    }

    render() {
        const {day, time} = this.state

        return (
            <div style={{
                width: '40vw',
                position: 'absolute',
                top: 0,
                left: 0,
                padding: '1rem',
                transition: 'opacity 1s'
            }}>
                <div id="data_day" style={{fontSize:'1.125rem'}}>{day}</div>
                <div id="data_time" style={{fontSize:'8rem'}}>{time}</div>
            </div>
        )
    }
}

export default Datetime
