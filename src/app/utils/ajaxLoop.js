/**
 * Created by jiachenpan on 16/8/31.
 */
import reqwest from "reqwest";

function noop() {
}

export default class AjaxMgr {

    constructor(options = {}) {
        this.url = options.url;
        //this.data = options.data;
        this.dataType = options.dataType || 'jsonp';
        //this.ajaxOptins = options.ajaxOptins;
        this.options = options;
        this.cors = options.cors || 'false';
        this.success = options.success;
        this.error = options.error || noop;
        this.minInterval = options.minInterval || 5000;
        this.isLoop = options.isLoop || false;
        this.maxRetryTimes = options.maxRetryTimes || 5;
        this.retryTimes = 1;
    }

    setLoop(isLoop) {
        this.isLoop = isLoop;
        return this;
    }

    setUrl(url) {
        this.url = url;
        return this;
    }

    setDataType(dataType) {
        this.dataType = dataType;
        return this;
    }

    setCors(cors) {
        this.cors = cors;
        return this;
    }

    request() {
        this.time = Date.now();
        var that = this;
        reqwest({
            url: that.url
            , type: that.dataType
            // , crossOrigin: that.cors
            // , withCredentials: that.cors
            , success: function (e) {
                that.success(e);
                if (!that.isLoop)return;
                var now = Date.now();

                var diff = now - that.time;
                var remain = that.minInterval - diff;
                if (remain > 0) {
                    setTimeout(()=> {
                        that.request()
                    }, remain)
                } else {
                    that.request()
                }
            }
            , error: function (e) {
                that.error(e);
                if (!that.isLoop) {
                    return;
                }
                if (that.retryTimes > that.maxRetryTimes) {
                    return
                }
                that.retryTimes++;
                var now = Date.now();
                var diff = now - that.time;
                var remain = that.minInterval - diff;
                if (remain > 0) {
                    setTimeout(()=> {
                        that.request()
                    }, remain)
                } else {
                    that.request()
                }
            }
        });
        return this;
    }

}