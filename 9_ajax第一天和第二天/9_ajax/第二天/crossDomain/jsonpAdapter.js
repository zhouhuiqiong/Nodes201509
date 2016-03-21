/**
 * Created by 银鹏 on 2016/3/6.
 */
(function () {
    var adapter = this.JSONPAdapter = {};

    /**
     * 调用jsonp
     * @param url {string} 请求的jsonp接口
     * @param data {object|string} 发送的数据
     * @param jsonpcallback {string} jsonpcallback
     * @param callback {Function} 回调函数
     */
    adapter.request = function (url, data, jsonpcallback, callback) {
        // 调用的次数 每次累加1
        var times = adapter.counter();
        // jsonpcallback后面跟的那个全局函数名
        var callbackName = 'jsonpAdapter_' + times;
        // 全局函数名 的 全部名称
        var callbackFullName = 'JSONPAdapter.request.' + callbackName;
        // 拼接data
        url = tool.hasSearch(url, tool.encodeObjectToURIParam(data));
        // 拼接jsonpcallback
        url = tool.hasSearch(url, jsonpcallback + '=' + callbackFullName);

        // 声明上面对应那个callbackFullName
        adapter.request[callbackName] = function (data) {
            try {
                callback(data);
            } finally {
                // 不管callback成功还是失败。都删除这个已经没有用处的script
                script.parentNode.removeChild(script);
                // 提高性能，防止给request方法增加过多无用的函数
                delete adapter.request[callbackName];
            }
        };
        var script = document.createElement('script');
        script.async = 'async';
        script.type = 'text/javascript';
        script.src = url;
        document.body.appendChild(script);
    };

    // 计数器
    adapter.counter = (function () {
        var times = 1;
        return function () {
            return times++;
        }
    })();

    var tool = {
        /**
         * 把data格式化成uri的格式
         * @param object {Object|string} data
         * @returns {*}
         */
        encodeObjectToURIParam: function (object) {
            if(!object){
                return '';
            }
            if (typeof object === 'string') {
                return object;
            }
            var arr = [];
            for (var n in object) {
                if (!object.hasOwnProperty(n)) {
                    continue;
                }
                arr.push(encodeURIComponent(n) + '=' + encodeURIComponent(object[n]));
            }
            return arr.join('&');
        },
        hasSearch: function (url, padstring) {
            return url + (/\?/.test(url) ? '&' : '?') + padstring
        }
    }
})();