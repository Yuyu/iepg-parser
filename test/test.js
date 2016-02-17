var assert = require('assert');
var fs = require('fs');
var iepgParser = require('../iepg-parser');

describe('#parse()', () => {
    it('parses iepg data', (done) => {
        fs.readFile('test/example.tvpid', (err, data) => {
            if (err) { throw err }

            iepgParser(data, (parsed) => {
                assert.equal(parsed.station, 'DFS00430')
                assert.equal(parsed.station_name, 'テレビ東京')
                assert.equal(parsed.year, '2016')
                assert.equal(parsed.month, '02')
                assert.equal(parsed.date, '17')
                assert.equal(parsed.start, '01:35')
                assert.equal(parsed.end, '02:05')
                assert.equal(parsed.program_title, 'トラの門スポーツ「世界卓球の前哨戦!?世界女子アナ卓球選手権」')
                assert.equal(parsed.program_id, '28555')
                assert.equal(parsed.genre_1, '1')
                assert.equal(parsed.subgenre_1, '0')
                assert.equal(parsed.genre_2, '5')
                assert.equal(parsed.subgenre_2, '15')
                assert.equal(parsed.Copycontrol_1, '1,2,0')
                assert.equal(parsed.Component_video_1, '179')
                assert.equal(parsed.subtitle, '▽女性アナウンサーが本気で卓球対決!▽秋元っちゃんチキータ炸裂!?▽こんな繁田アナ見たことない!▽厚切りジェイソン大絶叫!「ホワイ?ジャパニーズピンポン!?」')
                done()
            });
        });
    });
});
