/**
 * Created by jiachenpan on 16/8/31.
 */
import axios from 'axios';

function noop(err) {
    console.log(err);
}

export default class AjaxMgr {

    constructor(options = {}) {
        this.config = options.config;
        this.success = options.success;
        this.stateName = options.stateName || 'data';
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

    fetchData = () => {
        this.latestFetchAt = Date.now();
        axios(this.config)
            .then(response => {
                this.success(this.stateName, response.data);
                if (!this.isLoop) return;
                const now = Date.now();
                const diff = now - this.latestFetchAt;
                const remain = this.minInterval - diff;
                if (remain > 0) {
                    setTimeout(() => {
                        this.fetchData();
                    }, remain);
                } else {
                    this.fetchData();
                }
            })
            .catch(error => {
                this.error(error);
                if (!this.isLoop) {
                    return;
                }
                if (this.retryTimes > this.maxRetryTimes) {
                    return;
                }
                this.retryTimes++;
                const now = Date.now();
                const diff = now - this.latestFetchAt;
                const remain = this.minInterval - diff;
                if (remain > 0) {
                    setTimeout(() => {
                        this.fetchData();
                    }, remain);
                } else {
                    this.fetchData();
                }
            });
        return this;
    }

}
