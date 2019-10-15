import $ from 'jquery'
import config from '../common/config'

const helper = {
    log: (contents) => {
        console.log(...contents)
    },
    request: (obj) => {
        obj = Object.assign({
            url: `${config.server_host}${obj.uri}`,
            type: 'get',
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            cache: false,
            crossDomain: true,
            error: function (xhr, status, err) {
                console.error(obj.url, status, err.toString())
            }
        }, obj)
        $.ajax(obj)
    },
}

export default helper