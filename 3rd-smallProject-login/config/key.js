// Local일 때와 Deploy 했을 때 처리를 달리 해줘야 함
// Deploy 시 HEROKU 사이트의 Config Vars에 해당 mongoURI를 넣어줘야 함

if (process.env.NODE_ENV == 'production') { // 배포 후일 경우 prod 파일에서 가져옴
    module.exports = require('./prod')
} else { // local 환경일 시 dev 파일에서 가져옴
    module.exports = require('./dev')
}