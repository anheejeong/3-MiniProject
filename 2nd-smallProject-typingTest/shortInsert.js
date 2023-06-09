const shortExample = require('./db/shortExample.js');
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/typingTest')
    .then(() => {
        console.log("MONGO CONNECTION OPEN")
    })
    .catch(err => {
        console.log("MONGO CONNECTION ERROR");
        console.log(err);
    });

const shortInsert = [
    {
        ex: '가까운 데 집은 깎이고 먼 데 집은 비친다.'
    },
    {
        ex: '가꾸지 않는 곡식이 잘되는 법이 없다.'
    },
    {
        ex: '가난한 사람 걱정은 결국 돈 한 가지 없다는 걱정이다.'
    },
    {
        ex: '가는 말이 고와야 오는 말이 곱다.'
    },
    {
        ex: '꿈도 꾸기 전에 해몽'
    },
    {
        ex: '날이 밝기 직전에 항상 가장 어둡다.'
    },
    {
        ex: '낯은 알아도 마음은 모른다.'
    },
    {
        ex: '내 땅 까마귀는 검어도 귀엽다.'
    },
    {
        ex: '네 병이야 낫든 안 낫든 내 약값이나 내라.'
    },
    {
        ex: '다정하고 조용한 말은 힘이 있다.'
    },
    {
        ex: '닫는 사슴을 보고 얻은 토끼를 잃는다.'
    },
    {
        ex: '당신은 바로 자기 자신의 창조자이다.'
    },
    {
        ex: '두꺼비 싸움에 파리 치인다.'
    },
    {
        ex: '떡갈나무에 회초리 나고, 바늘 간 데 실이 따라간다.'
    },
    {
        ex: '마른나무를 태우면 생나무도 탄다.'
    },
    {
        ex: '마지막 고개를 넘기기가 가장 힘들다.'
    },
    {
        ex: '만약 급히 서두르려면 돌아가는 길로 가라.'
    },
    {
        ex: '말 한 마디가 세계를 지배한다.'
    },
    {
        ex: '모욕은 잊어버리고, 친절은 결코 잊지 말아라.'
    },
    {
        ex: '바늘 잃고 도끼 낚는다.'
    },
    {
        ex: '바닷가 개는 호랑이 무서운 줄 모른다.'
    },
    {
        ex: '바쁜 꿀벌은 슬퍼할 겨를이 없다.'
    },
    {
        ex: '배우라, 비교하라, 사실을 수입하라.'
    },
    {
        ex: '범도 제 새끼 사랑할 줄 안다.'
    },
    {
        ex: '사람은 돈지갑이 가난해도, 정신적으로는 긍지를 가질 수 있다.'
    },
    {
        ex: '사람은 책을 만들고, 책은 사람을 만든다.'
    },
    {
        ex: '사람은 자기 자신을 이겨낼 수 있어야만 비로소 자신을 완성할 수 있다.'
    },
    {
        ex: '새 도랑 내지 말고 옛 도랑 메우지 말라.'
    },
    {
        ex: '세 살 먹은 아이도 제 손의 것 안 내놓는다.'
    },
    {
        ex: '수박은 속을 봐야 알고 사람은 지내봐야 안다.'
    },
    {
        ex: '아름다운 것은 선하고 선한 자는 곧 아름다워진다.'
    },
    {
        ex: '아무것도 버릴 수 없는 자는 아무것도 느낄 수 없다.'
    },
    {
        ex: '아이 싸움이 어른 싸움된다.'
    },
    {
        ex: '양심은 어떠한 과학의 힘보다도 강하고 현명하다.'
    },
    {
        ex: '열 사람이 백 말을 하여도 들을 이 짐작한다.'
    },
    {
        ex: '자기 신뢰가 성공의 제 1의 비결이다.'
    },
    {
        ex: '자기 자신을 이겨낼 수 있는 힘을 가진 사람이 가장 강하다.'
    },
    {
        ex: '자기가 가지고 있는 곳을 모르는 사람은 결코 높이 향상하지 못한다.'
    },
    {
        ex: '자기의 잘못을 인정하는 것만큼이나 어려운 것은 없다.'
    },
    {
        ex: '저 하고 싶어서 하는 일은 힘든 줄 모른다.'
    },
    {
        ex: '참는 자에게 복이 있다.'
    },
    {
        ex: '참된 힘은 내 자신에서만 끄집어 낼 수 있다.'
    },
    {
        ex: '참새는 굴레 씌울 수 없지만 호랑이는 길들일 수 있다.'
    },
    {
        ex: '창조는 고민 속에서 나오고 발전은 고생 속에서 움튼다.'
    },
    {
        ex: '천재는 1 퍼센트의 영감이요. 99 퍼센트는 노력이다.'
    },
    {
        ex: '칼날 쥔 놈이 자루 쥔 놈을 당할까'
    },
    {
        ex: '큰 고기는 깊은 물 속에 있다.'
    },
    {
        ex: '큰 바람 뒤는 고요하다.'
    },
    {
        ex: '큰 시련은 큰 의무를 완수하게 만드는 것이다.'
    },
    {
        ex: '큰집 잔치에 작은집 돼지 잡는다.'
    },
]

shortExample.insertMany(shortInsert)
    .then(res => {
        console.log(res)
    })
    .catch(e => {
        console.log(e)
    })