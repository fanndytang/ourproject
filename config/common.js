let branch = 'dev'    //  要推送的分支
let http_url = ''
let http_api = ''
let localhost = 'http://192.168.10.105'

switch(branch) {
  case 'dev':
    http_url = 'http://admindev.swisstimevip.com:8000'
    http_api = 'http://apidev.swisstimevip.com:8000'
    break;
  case 'master':
    http_url = 'http://admintest.swisstimevip.com:8080'
    http_api = 'http://apitest.swisstimevip.com:8080'
    break;
  case 'release':
    http_url = 'https://adminrelease.swisstimevip.com'
    http_api = 'https://apirelease.swisstimevip.com'
    break;
  case 'gz_online':
    http_url = 'https://admin.swisstimevip.cn'
    http_api = 'https://api.swisstimevip.cn'
    break;
  case 'hk_online':
    http_url = 'https://admin.swisstimevip.com'
    http_api = 'https://api.swisstimevip.com'
    break;
}

module.exports = {
  prov_url: {
    DICT: `"${http_url}/dict"`,
    FINANCE: `"${http_url}/finance"`,
    FRIENDS: `"${http_url}/friends"`,
    EXCHANGE: `"${http_url}/exchange"`,
    NEWS: `"${http_url}/news"`,
    SYSTEM: `"${http_url}/system"`,
    USER: `"${http_url}/user"`,
    VIP: `"${http_url}/vip"`,
    ADMIN: `"${http_url}/admin"`
  },
  dev_url: {
    DICT: `"${localhost}:8081"`,
    FINANCE: `"${localhost}:8081"`,
    FRIENDS: `"${localhost}:8081"`,
    EXCHANGE: `"${localhost}:8081"`,
    NEWS: `"${localhost}:8081"`,
    SYSTEM: `"${localhost}:8081"`,
    USER: `"${localhost}:8081"`,
    VIP: `"${localhost}:8081"`,
    ADMIN: `"${localhost}:8081"`
  },
  api: {
    //线上
    DICT: `"${http_api}/dict"`,
    FINANCE: `"${http_api}/finance"`,
    FRIENDS: `"${http_api}/friends"`,
    EXCHANGE: `"${http_api}/market"`,
    NEWS: `"${http_api}/news"`,
    SYSTEM: `"${http_api}/system"`,
    USER: `"${http_api}/user"`,
    VIP: `"${http_api}/vip"`,
    ADMIN: `"${http_api}/admin"`
  }
}
