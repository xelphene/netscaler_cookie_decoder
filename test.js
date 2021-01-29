
'use strict';

const d = require('./netscaler_cookie_decoder.js');

var cases = [
    {	
        cookie: 'Set-Cookie: NSC_jefoujuztfswjdf.fybnqmf.dpn=ffffffffc3a06ab145525d5f4f58455e445a4a423b43',
        addr: '192.168.116.160',
        port: 3443
    },{	
        cookie: 'Set-Cookie: NSC_jefoujuztfswjdf.fybnqmf.dpn=ffffffffc3a06ab145525d5f4f58455e445a4a423b43; secure',
        addr: '192.168.116.160',
        port: 3443
    },{	
        cookie: 'Set-Cookie: NSC_jefoujuztfswjdf.fybnqmf.dpn=ffffffffc3a06ab145525d5f4f58455e445a4a423b43; secure; httpOnly',
        addr: '192.168.116.160',
        port: 3443
    },{	
        cookie: 'NSC_jefoujuztfswjdf.fybnqmf.dpn=ffffffffc3a06ab145525d5f4f58455e445a4a423b43; secure; httpOnly',
        addr: '192.168.116.160',
        port: 3443
    },{	
        cookie: 'NSC_jefoujuztfswjdf.fybnqmf.dpn=ffffffffc3a06ab145525d5f4f58455e445a4a423b43',
        addr: '192.168.116.160',
        port: 3443
    }, {
        cookie: 'ffffffffc3a06ab145525d5f4f58455e445a4a423b43',
        addr: '192.168.116.160',
        port: 3443
    }, {
        cookie: 'ffff3ae93ddc',
        shouldThrow: true
    }, {
        cookie: 'NSC_qspe-xxx.tfdvsjuzsjtlbewjtpst.dpn=ffffffff68bc312c45525d5f4f58455e445a4a423660',
        addr: '107.180.47.61',
        port: 80
    }
];
        
cases.map( c => {

    if( c.shouldThrow ) {
        try {
            let dc = d.decodeCookie(c.cookie);
            console.error('fail:');
            console.error(' cookie: '+c.cookie);
            console.error(' expected exception, but it worked');
        } catch {
        }
    } else {
        let dc = d.decode(c.cookie);
            
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
    }
});

console.log('done');
