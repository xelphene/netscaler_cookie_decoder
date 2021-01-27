
# netscaler_cookie_decoder

Citrix Netscalers sometimes issue cookies to clients beginning with "NSC_"
which lead the internal back-end web server's IP address and port number.
This code decodes the cookie and extracts the internal IP address and port
number.

# Usage

Open netscaler_cookie_decoder.html in your browser. Alternately, run it
under node on the command line:

```
% node netscaler_cookie_decoder.js NSC_jefoujuztfswjdf.fybnqmf.dpn=ffffffffc3a06fb245525d5f4f58455e445a4a423c43
```

# Credits

Built based on information at
https://sra.io/blog/finding-and-decoding-big-ip-and-netscaler-cookies-with-burp-suite/
by Dan Herlihy

