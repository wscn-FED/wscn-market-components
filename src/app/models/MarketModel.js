import AjaxMgr from "../utils/ajaxLoop";


export default  {
    loadPriceDataAjax(config) {
        const countAjax = new AjaxMgr({
            url: config.url,
            dataType: config.dataType,
            success: config.successFn,
            minInterval: config.minInterval
        })
        countAjax.setLoop(true).request();
        console.log('price ajax')
    },

    loadKlineDataAjax(config) {
        const countAjax = new AjaxMgr({
            url: config.url,
            dataType: config.dataType,
            success: config.successFn,
            minInterval: config.minInterval
        })
        countAjax.setLoop(false).request();
        console.log('kline ajax')
    }


}
