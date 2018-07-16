const request = require('request');

request({
  url: 'https://api.foursquare.com/v2/venues/explore',
  method: 'GET',
  qs: {
    client_id: 'SFPQ1TLV3BNAUYGPQ50H00SEU1IXGITTHPY55VV1BPNMVTHH',
    client_secret: 'V1ZI00PWQNKGEAJE0FPYFENHTLD3SPCLXN5GSE32EJG1CSNO',
    ll: '40.7243,-74.0018',
    query: 'coffee',
    v: '20180323',
    limit: 1
  }
}, function(err, res, body) {
  if (err) {
    console.error(err);
  } else {
    console.log(body);
  }
});

console.log(request[1]);