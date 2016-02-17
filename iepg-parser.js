var validUrl = require('valid-url')
var http = require('http')
var jconv = require('jconv')
var BufferList = require('bufferlist').BufferList
var moment = require('moment-timezone')


var RE_IEPG_ENTRY = /([^:]+):\s*(.+)\r\n/g
var RE_IEPG_SUBTITLE = /\r\n\r\n(.*)/

function parse(data, callback) {
    data = jconv.decode(data, 'SJIS')

    var dict = {}
    while (RE_IEPG_ENTRY.exec(data)) {
        var key = RegExp.$1, val = RegExp.$2
        if (key.toLowerCase() === 'content-type') { continue }
        dict[key.replace(/-/g, '_')] = val
    }

    RE_IEPG_SUBTITLE.exec(data)
    dict.subtitle = RegExp.$1

    dict.start_time = moment.tz([
        dict.year,
        dict.month,
        dict.date,
        ...dict.start.split(':'),
    ], 'Asia/Tokyo')

    dict.end_time = moment.tz([
        dict.year,
        dict.month,
        dict.date,
        ...dict.end.split(':'),
    ], 'Asia/Tokyo')

    callback(dict)
}

function wrapper(data, callback) {
    if (validUrl.isUri(data)) {
        http.get(data, res => {
            var body = new BufferList()

            res.on('data', (d) => {
                body.push(d)
            })

            res.on('end', () => {
                parse(body.join(), callback)
            })
        })
    } else {
        parse(data, callback)
    }
}

module.exports = wrapper
