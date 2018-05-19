/**
 * 视图渲染对象
 */
class View {

    constructor(ajaxPath, method, data, page, pageSize) {
        this.pageData = {
            page: page || location.hash.replace('#!page=', '') || 1,
            pageSize: pageSize || localStorage['pageSize_' + ajaxPath] || 10,
        };
        this.pageData = Object.assign({}, this.pageData, data);
        this.ajaxPath = ajaxPath;
        this.method = method || 'POST';
        this.ajaxPath && this._init(this.ajaxPath, '.ajax-data', this.pageData);
    }

    _init(path, query, pageData, scrollTop = true) {
        this.pageData = pageData;
        fetchList(path, pageData, this.method, query, result => {
            /* 页面滚至顶部　*/
            scrollTop && window.scrollTo(0, 0);
            /* 缓存分页数据 */
            localStorage['pageSize_' + path] = pageData.pageSize || 20;
            /* 渲染分页组件　*/
            let count = qs('#count') === null ? null : qs('#count').value;
            count && this._loadPager(count, pageData.pageSize, pageData => {
                pageData = Object.assign({}, this.pageData, pageData);
                this._init(path, query, pageData)
            });
            this.afterInitPage()
        });
    }

    afterInitPage(result) {
    };

    /**
     * 重置页面
     * @param scrollTop　是否回到页面顶部
     */
    initPage(scrollTop = false) {
        /* FormData 格式转换 */
        if (this.pageData instanceof FormData) {
            let _ = {};
            this.pageData.forEach((x, k) => _[k] = x);
            this.pageData = _;
            log(this.pageData);
        }
        /* 获取分页数据缓存 */
        this.pageData.pageSize = this.pageData.pageSize || localStorage['pageSize_' + this.ajaxPath];

        this._init(this.ajaxPath, '.ajax-data', this.pageData, scrollTop)
    }

    /**
     * 载入分页控件
     * @param count
     * @param limit
     * @param callback
     * @private
     */
    _loadPager(count, limit, callback) {
        layui.use(['page'], function () {
            layui.page.load({
                count: count,
                limit: limit || 10,
                f: (pageData, first) => {
                    first || callback(pageData)
                }
            });
        });
    }

    /**
     * ajax 响应处理
     * @param result
     * @param data
     * @returns {boolean}
     * @private
     */
    _dealResult(result, data) {
        data = Object.assign({}, {
            refresh_type: 'init',
            reload_time: 500,
            msg: '操作成功',
        }, data);

        result = JSON.parse(result);

        if (result['errcode'] == 0) {
            layui.layer.msg(data.msg);
            data.refresh_type === 'reload' && reload(data.reload_time);
            data.refresh_type === 'init' && sleep(500).then(() => {
                this.initPage();
                layui.layer.closeAll();
            });
            return true;
        } else {
            layui.layer.msg(typeof result['errmsg'] === 'string' ? result['errmsg'] : result['errmsg'][0]);
            return false;
        }
    }

    /**
     * ajax 请求
     * @param url
     * @param init
     * @param successBack
     * @param errorBack
     * @private
     */
    _fetchWith(url, init, successBack, errorBack) {
        successBack = successBack || this._dealResult;
        fetchWith(url, init, successBack, errorBack)
    }

    open(obj) {
        return layui.layer.open(obj);
    }

    openFrame(obj) {
        obj = Object.assign({}, {
            type: 2,
            area: ['30%', '40%'],
            title: '',
            btn: ['确定', '关闭'],
            icon: 2,
            content: '/',
            yes: null,
        }, obj);
        return this.open(obj);
    }

    openMsg(obj) {
        obj = Object.assign({}, {
            type: 1,
            title: '',
            btn: ['确定', '关闭'],
        }, obj);
        obj.content = '<div class="layui-colla-content layui-show">' + obj.content + '</div>';
        return this.open(obj);
    }
}

/**
 * 读取缓存
 * @param key
 * @returns {null}
 */
function get_cache(key) {

    cached = window.localStorage[key];
    if (typeof cached === 'undefined') {
        return null;
    }
    cached = JSON.parse(cached);
    if (cached.time === null) {
        return cached.value;
    } else {
        date = Date.now();
        log('Date.now()', date);
        log('cached.time', cached.time);
        log('date > cached.time', date > cached.time);
        if (date > cached.time) {
            delete localStorage[key];
            return null;
        } else {
            return cached.value;
        }
    }
}

/**
 * 写入缓存
 * @param key
 * @param value
 * @param time
 */
function set_cache(key, value, time = null) {

    if (time !== null && time !== true) {
        time = Date.now() + time * 1000
    } else {
        time = Date.now() + 600 * 1000
    }

    /* 顺便清理 localStorage　过期数据 */
    clean_cache();

    window.localStorage[key] = JSON.stringify({
        time: time,
        value: value,
    })
}

/**
 * 清理缓存
 */
function clean_cache() {
    date = Date.now();
    for (let key in window.localStorage) {
        cached = window.localStorage[key];
        try {
            cached = JSON.parse(cached);
            if (cached.time !== null && date > cached.time) {
                delete localStorage[key];
            }
        } catch (error) {

        }
    }
}

/* 默认 false，请勿改动！ */
window.debug = true;

let log = (...n) => {
    if (window.debug) {
        console.log(...n);
    }
    return null;
};

let qs = sel => document.querySelector(sel);
let qsa = sel => document.querySelectorAll(sel);

function fetchList(url, form, method, selector, successBack, errorBack) {
    let myInit = {
        method: method || 'POST',
        body: form
    };
    selector = selector || '.ajax-data';
    successBackNeo = function (result) {
        //log(result);
        if (form.json) {

            result = JSON.parse(result);
            qs(selector).innerHTML = result['view'] || '';
        } else {
            qs(selector).innerHTML = result;
        }
        successBack && successBack(result);
    };
    fetchWith(url, myInit, successBackNeo, errorBack)
}

//log(layer);
function fetchWith(url, init, successBack, errorBack) {
    //layui.use('layer', function () {
        // let layer = layui.layer;
        // layer.load(0);
        fetchBase(url, init, successBack, errorBack)
    //})
}

function fetchBase(url, init, successBack, errorBack) {
    log('init.cache', init.cache);

    /* 读取缓存 */
    let key = '';
    if (init.cache) {
        key = url + '_' + JSON.stringify(init);
        cached = get_cache(key);
        log('cached', cached);
        if (cached) {
            // log('cached', cached);
            typeof layer !== 'undefined' && layer.closeAll('loading');
            successBack && successBack(cached);
            return null;
        }
    }

    /* 设置请求头部 */
    let myHeaders = new Headers();
    // myHeaders.append('X-CSRF-TOKEN', CT.TOKEN);
    if (init.form) {
    } else {
        myHeaders.append('Accept', 'application/json');
        myHeaders.append('Content-Type', 'application/json');
    }
    init.headers = myHeaders;

    /*　带入 cookie */
    init.credentials = init.credentials || 'include';

    if (init.method !== 'GET') {
        init.body = JSON.stringify(init.body);
    }
    if (init.form) {
        init.body = init.form;
    }

    // fetch(CT.DOMAIN + url, init).then(function (response) {
    fetch(url, init).then(function (response) {
        typeof layer !== 'undefined' && layer.closeAll('loading');
        return response.text()
    }).then(function (result) {
        /* 写入缓存　*/
        log('result', result);
        if (init.cache) {
            set_cache(key, result, init.cache)
        }
        successBack && successBack(result);
    })
    //     .catch(function (error) {
    //     log('There has been a problem with your fetch operation: ' + error.message);
    //     errorBack && errorBack();
    // });
}