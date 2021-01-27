
'use strict';

// based on info from
// https://sra.io/blog/finding-and-decoding-big-ip-and-netscaler-cookies-with-burp-suite/

(function () {

    var d = {
        valueRE: /^NSC_([-.a-z]+)=([a-f0-9]{20,})$/,
        portXorKey: 13872,          // 0x3630
        addrXorKey: [3, 8, 30, 17], // 0x03081e11
        decodePort: function (p) {
            return parseInt(p,16) ^ this.portXorKey;
        },
        decodeAddr: function (a) {
            return [0,1,2,3]
                .map( i => a.slice(i*2, i*2+2) ) // every 2 chars
                .map( hex => parseInt(hex,16) ) 
                .map( (d,i) => d ^ this.addrXorKey[i] )
                .join('.')
        },
        decodeCookie: function (c) {
            let m = this.valueRE.exec(c);
            
            if( ! m ) {
                throw new Error(`cookie ${JSON.stringify(c)} does not match regex ${this.valueRE}`);
            }
            
            let addr = m[2].slice(8,16);
            let port = m[2].slice(-4);

            addr = this.decodeAddr(addr);
            port = this.decodePort(port);
            
            return {
                addr: addr,
                port: port
            }
        }
    };

    function cliMain()
    {
        const process = require('process');
        if( process.argv.length != 3 ) {
            console.log(`usage: ${process.argv.join(' ')} <netscaler cookie value>`);
        } else {
            let dc = d.decodeCookie(process.argv[2]);
            console.log(`address: ${dc.addr} port: ${dc.port}`);
        }
    }

    if( typeof require !== 'undefined' && typeof module !== 'undefined' ) {
        // running under node
        if( require.main === module ) {
            // as a command line program
            cliMain();
        } else {
            // require'd as a module
            module.exports = d;
        }
    } else {
        // in the browser?
        if( typeof window !== 'undefined' ) {
            window.netscalerCookieDecoder = d;
        } else {
            console.error('Neither "window" nor "require" and "module" are defined. Not sure what to do with myself.');
        }
    }

})();
