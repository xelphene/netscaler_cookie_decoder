
'use strict';

const d = require('./netscaler_cookie_decoder.js');

var cases = [
    {	
        cookie: 'NSC_jefoujuztfswjdf.fybnqmf.dpn=ffffffffc3a06ab145525d5f4f58455e445a4a423b43',
        addr: '192.168.116.160',
        port: 3443
    }, {
        cookie: 'NSC_qspe-xxx.tfdvsjuzsjtlbewjtpst.dpn=ffffffff68bc312c45525d5f4f58455e445a4a423660',
        addr: '107.180.47.61',
        port: 80
    }
];
        
cases.map( c => {

    let dc = d.decodeCookie(c.cookie);
        
    if( dc.addr != c.addr ) {
        console.error('fail:');
        console.error(' cookie: '+c.cookie);
        console.error(' decoded addr: '+dc.addr);
        console.error(' expected addr: '+c.addr);
    }
    if( dc.port != c.port ) {
        console.error('fail:');
        console.error(' cookie: '+c.cookie);
        console.error(' decoded port: '+dc.port);
        console.error(' expected port: '+c.port);
    }
});

console.log('done');
