(function () {
'use strict';

function _$styleInject (id, css) {
  var s=document.getElementById(id)
  if(!s){
    s=document.createElement("style")
    s.id=id
    s.innerHTML=css
    document.head.appendChild(s)
  }
}

_$styleInject("jtaro_style_jroll_demo_pages_1", "\n[jtaro_jroll_demo_pages_1] .wrapper {\r\n    position: absolute;\r\n    top: 44px;\r\n    bottom: 0;\r\n    width: 100%;\r\n  }\n[jtaro_jroll_demo_pages_1] .scroller {\r\n    margin: 0;\r\n    padding: 0;\r\n  }\n[jtaro_jroll_demo_pages_1] .scroller li {\r\n    height: 60px;\r\n    line-height: 60px;\r\n    border-bottom: 1px solid #ddd;\r\n    text-indent: 1em;\r\n    background: #fff;\r\n  }\n[jtaro_jroll_demo_pages_1] .scroller li:nth-last-child(1) {\r\n    border-bottom: none;\r\n  }\n[jtaro_jroll_demo_pages_1] #menu {\r\n    position: absolute;\r\n    top: 44px;\r\n    right: 20px;\r\n    margin: 0;\r\n    padding: 0;\r\n  }\n[jtaro_jroll_demo_pages_1] #menu li {\r\n    width: 48px;\r\n    height: 48px;\r\n    line-height: 48px;\r\n    border-radius: 50px;\r\n    background: #fff;\r\n    color: #000;\r\n    border: 1px solid #fafafa;\r\n    text-align: center;\r\n    margin: 20px 0;\r\n    list-style-type: none;\r\n    -webkit-box-shadow: rgba(0, 0, 0, .4) 3px 3px 10px;\r\n    box-shadow: rgba(0, 0, 0, .4) 3px 3px 10px;\r\n  }\n[jtaro_jroll_demo_pages_1] #menu li.current {\r\n    background: #da020c;\r\n    color: #fff;\r\n    border-color: #da020c;\r\n  }\n[jtaro_jroll_demo_pages_1] #tips {\r\n    position: absolute;\r\n    top: 40%;\r\n    width: 80%;\r\n    height: 36px;\r\n    line-height: 36px;\r\n    background: rgba(0, 0, 0, .8);\r\n    border-radius: 5px;\r\n    text-align: center;\r\n    left: 50%;\r\n    -webkit-transform: translateX(-50%);\r\n    transform: translateX(-50%);\r\n    color: #fff;\r\n    z-index: 9;\r\n    display: none;\r\n  }\n");
var tpl = "<div jtaro_jroll_demo_pages_1 >\r\n  <my-header title=\"各种级别数据量测试\"></my-header>\r\n  <div class=\"wrapper\">\r\n    <ul class=\"scroller\"></ul>\r\n  </div>\r\n  <ul id=\"menu\">\r\n    <li class=\"current\">6</li>\r\n    <li>99</li>\r\n    <li>999</li>\r\n    <li>9999</li>\r\n  </ul>\r\n  <div id=\"tips\">渲染中，请稍候！</div>\r\n</div>";

var header = {
  props: ['title'],
  template: '<header><h1>{{title}}</h1><a onclick="javascript:history.back()">&lt;返回</a></header>'
};

/* global JRoll */
var p1 = {
  template: tpl,
  components: { myHeader: header },
  mounted: function () {
    var wrapper = this.$el.querySelector('.wrapper');
    var scroller = this.$el.querySelector('.scroller');
    var jroll = new JRoll(wrapper, {
      id: 'demo1',
      scrollBarY: true
    });
    var menu = document.getElementById('menu');
    var tips = document.getElementById('tips');

    function createLi (n) {
      var html = '';
      for (var i = 0; i < n; i++) {
        html += '<li>' + (i + 1) + '</li>';
      }
      scroller.innerHTML = html;
      jroll.scrollTo(0, 0).refresh();
    }

    menu.onclick = function (e) {
      var target = e.target;
      var num = Number(target.innerText);
      if (!isNaN(num)) {
        if (num === 9999) {
          tips.style.display = 'block';
        }
        setTimeout(function () {
          createLi(num);
          Array.prototype.forEach.call(menu.children, function (c) {
            c.classList.remove('current');
          });
          target.classList.add('current');
          tips.style.display = 'none';
        }, 10);
      }
    };

    createLi(6);
  }
};

_$styleInject("jtaro_style_jroll_demo_pages_2", "\n[jtaro_jroll_demo_pages_2] .wrapper {\r\n    position: absolute;\r\n    top: 44px;\r\n    bottom: 0;\r\n    width: 100%;\r\n  }\n[jtaro_jroll_demo_pages_2] .scroller {\r\n    margin: 0;\r\n    padding: 0;\r\n    background: #fff;\r\n  }\n[jtaro_jroll_demo_pages_2] h2 {\r\n    text-align: center;\r\n  }\n[jtaro_jroll_demo_pages_2] p {\r\n    padding: 10px;\r\n    margin: 0;\r\n    line-height: 1.5;\r\n  }\n[jtaro_jroll_demo_pages_2] .jroll-ybar {\r\n    position: absolute;\r\n    top: 0px;\r\n    right: 0px;\r\n    bottom: 0px;\r\n    width: 12px;\r\n    height: 100%;\r\n    overflow: hidden;\r\n    background: rgba(0, 0, 0, 0.3);\r\n    border-radius: 12px;\r\n    -webkit-transform: scale(.5, .5);\r\n    transform: scale(.5, .5);\r\n  }\n[jtaro_jroll_demo_pages_2] .jroll-ybtn {\r\n    position: absolute;\r\n    top: 0px;\r\n    left: 0px;\r\n    right: 0px;\r\n    background: #da020c;\r\n    border-radius: 12px;\r\n  }\n");
var tpl$1 = "<div jtaro_jroll_demo_pages_2 >\r\n  <my-header title=\"自定义滚动条\"></my-header>\r\n  <div class=\"wrapper\">\r\n    <div class=\"scroller\">\r\n      <p>　　滚动条对样式定位有些特殊要求，自定义滚动条大小、颜色时需要先将默认样式拷贝下来，再对 .jroll-ybar/.jroll-xbar 和 .jroll-ybtn/.jroll-xbtn 进行修改。</p>\r\n      <h2>劝学</h2>\r\n      <p style=\"text-align:right\">——荀子</p>\r\n      <p>　　君子曰：学不可以已。 </p>\r\n      <p>　　青，取之于蓝而青于蓝；冰，水为之而寒于水。木直中绳，輮（左应为“车”，原字已废除）以为轮，其曲中规。虽有槁暴，不复挺者，輮使之然也。故木受绳则直，金就砺则利，君子博学而日参省乎己，则知明而行无过矣。 </p>\r\n      <p>　　故不登高山，不知天之高也；不临深溪，不知地之厚也；不闻先王之遗言，不知学问之大也。干、越、夷、貉之子，生而同声，长而异俗，教使之然也。诗曰：“嗟尔君子，无恒安息。靖共尔位，好是正直。神之听之，介尔景福。”神莫大于化道，福莫长于无祸。\r\n      </p>\r\n      <p>　　吾尝终日而思矣，不如须臾之所学也；吾尝跂而望矣，不如登高之博见也。登高而招，臂非加长也，而见者远；顺风而呼，声非加疾也，而闻者彰。假舆马者，非利足也，而致千里；假舟楫者，非能水也，而绝江河。君子生非异也，善假于物也。 </p>\r\n      <p>　　南方有鸟焉，名曰蒙鸠，以羽为巢，而编之以发，系之苇苕，风至苕折，卵破子死。巢非不完也，所系者然也。西方有木焉，名曰射干，茎长四寸，生于高山之上，而临百仞之渊，木茎非能长也，所立者然也。蓬生麻中，不扶而直；白沙在涅，与之俱黑。兰槐之根是为芷，其渐之滫，君子不近，庶人不服。其质非不美也，所渐者然也。故君子居必择乡，游必就士，所以防邪辟而近中正也。\r\n      </p>\r\n      <p>　　物类之起，必有所始。荣辱之来，必象其德。肉腐出虫，鱼枯生蠹。怠慢忘身，祸灾乃作。强自取柱，柔自取束。邪秽在身，怨之所构。施薪若一，火就燥也，平地若一，水就湿也。草木畴生，禽兽群焉，物各从其类也。是故质的张，而弓矢至焉；林木茂，而斧斤至焉；树成荫，而众鸟息焉。醯酸，而蚋聚焉。故言有招祸也，行有招辱也，君子慎其所立乎！\r\n      </p>\r\n      <p>　　积土成山，风雨兴焉；积水成渊，蛟龙生焉；积善成德，而神明自得，圣心备焉。故不积跬步，无以至千里；不积小流，无以成江海。骐骥一跃，不能十步；驽马十驾，功在不舍。锲而舍之，朽木不折；锲而不舍，金石可镂。蚓无爪牙之利，筋骨之强，上食埃土，下饮黄泉，用心一也。蟹六跪而二螯，非蛇鳝之穴无可寄托者，用心躁也。\r\n      </p>\r\n      <p>　　是故无冥冥之志者，无昭昭之明；无惛惛之事者，无赫赫之功。行衢道者不至，事两君者不容。目不能两视而明，耳不能两听而聪。螣蛇无足而飞，鼫鼠五技而穷。《诗》曰：“尸鸠在桑，其子七兮。淑人君子，其仪一兮。其仪一兮，心如结兮！”故君子结于一也。\r\n      </p>\r\n      <p>　　昔者瓠巴鼓瑟，而流鱼出听；伯牙鼓琴，而六马仰秣。故声无小而不闻，行无隐而不形 。玉在山而草润，渊生珠而崖不枯。为善不积邪？安有不闻者乎？ </p>\r\n      <p>　　学恶乎始？恶乎终？曰：其数则始乎诵经，终乎读礼；其义则始乎为士，终乎为圣人， 真积力久则入，学至乎没而后止也。故学数有终，若其义则不可须臾舍也。为之，人也；舍 之，禽兽也。故书者，政事之纪也；诗者，中声之所止也；礼者，法之大分，类之纲纪也。\r\n        故学至乎礼而止矣。夫是之谓道德之极。礼之敬文也，乐之中和也，诗书之博也，春秋之微 也，在天地之间者毕矣。 君子之学也，入乎耳，着乎心，布乎四体，形乎动静。端而言，蝡而动，一可以为法则。小人之学也，入乎耳，出乎口；口耳之间，则四寸耳，曷足以美七尺之躯哉！古之学者为己，今之学者为人。君子之学也，以美其身；小人之学也，以为禽犊。故不问而告谓之傲，问一而告二谓之囋。傲、非也，囋、非也；君子如向矣。\r\n      </p>\r\n      <p>　　学莫便乎近其人。礼乐法而不说，诗书故而不切，春秋约而不速。方其人之习君子之说，则尊以遍矣，周于世矣。故曰：学莫便乎近其人。 </p>\r\n      <p>　　学之经莫速乎好其人，隆礼次之。上不能好其人，下不能隆礼，安特将学杂识志，顺诗书而已耳。则末世穷年，不免为陋儒而已。将原先王，本仁义，则礼正其经纬蹊径也。若挈裘领，诎五指而顿之，顺者不可胜数也。不道礼宪，以诗书为之，譬之犹以指测河也，以戈舂黍也，以锥餐壶也，不可以得之矣。故隆礼，虽未明，法士也；不隆礼，虽察辩，散儒也。\r\n      </p>\r\n      <p>　　问楛者，勿告也；告楛者，勿问也；说楛者，勿听也。有争气者，勿与辩也。故必由其道至，然后接之；非其道则避之。故礼恭，而后可与言道之方；辞顺，而后可与言道之理；色从而后可与言道之致。故未可与言而言，谓之傲；可与言而不言，谓之隐；不观气色而言，谓瞽。故君子不傲、不隐、不瞽，谨顺其身。诗曰：“匪交匪舒，天子所予。”此之谓也。\r\n      </p>\r\n      <p>　　百发失一，不足谓善射；千里蹞步不至，不足谓善御；伦类不通，仁义不一，不足谓善学。学也者，固学一之也。一出焉，一入焉，涂巷之人也；其善者少，不善者多，桀纣盗跖也；全之尽之，然后学者也。 </p>\r\n      <p>　　君子知夫不全不粹之不足以为美也，故诵数以贯之，思索以通之，为其人以处之，除其害者以持养之。使目非是无欲见也，使耳非是无欲闻也，使口非是无欲言也，使心非是无欲虑也。及至其致好之也，目好之五色，耳好之五声，口好之五味，心利之有天下。是故权利不能倾也，群众不能移也，天下不能荡也。生乎由是，死乎由是，夫是之谓德操。德操然后能定，能定然后能应。能定能应，夫是之谓成人。天见其明，地见其光，君子贵其全也。\r\n      </p>\r\n    </div>\r\n  </div>\r\n</div>";

/* global JRoll */
var p3 = {
  template: tpl$1,
  components: { myHeader: header },
  mounted: function () {
    new JRoll(this.$el.querySelector('.wrapper'), {
      id: 'demo2',
      scrollBarY: 'custom',
      scrollBarFade: true
    });
  }
};

_$styleInject("jtaro_style_jroll_demo_pages_3", "\n[jtaro_jroll_demo_pages_3] .wrapper {\r\n    position: absolute;\r\n    top: 44px;\r\n    bottom: 0;\r\n    width: 100%;\r\n  }\n[jtaro_jroll_demo_pages_3] .scroller {\r\n    margin: 0;\r\n    padding: 0;\r\n    background: #fff;\r\n  }\n[jtaro_jroll_demo_pages_3] .scroller li {\r\n    height: 60px;\r\n    line-height: 60px;\r\n    border-bottom: 1px solid #ddd;\r\n    text-indent: 1em;\r\n    background: #fff;\r\n  }\n[jtaro_jroll_demo_pages_3] .scroller li:nth-last-child(1) {\r\n    border-bottom: none;\r\n  }\n[jtaro_jroll_demo_pages_3] #info {\r\n    position: absolute;\r\n    top: 60px;\r\n    right: 20px;\r\n    background: rgba(0, 0, 0, .2);\r\n    line-height: 30px;\r\n    padding: 0 10px;\r\n    width: 140px;\r\n    font-size: 14px;\r\n  }\n[jtaro_jroll_demo_pages_3] #info>div {\r\n    height: 30px;\r\n    overflow: hidden;\r\n  }\n");
var tpl$2 = "<div jtaro_jroll_demo_pages_3 >\r\n  <my-header title=\"滚动事件\"></my-header>\r\n  <div class=\"wrapper\">\r\n    <div class=\"scroller\">\r\n    </div>\r\n  </div>\r\n  <div id=\"info\">\r\n    <div>事件：<span id=\"evt\">null</span></div>\r\n    <div>位置：<span id=\"pos\">(0, 0)</span></div>\r\n  </div>\r\n</div>";

/* global JRoll */
var p5 = {
  template: tpl$2,
  components: { myHeader: header },
  mounted: function () {
    var jroll = new JRoll(this.$el.querySelector('.wrapper'), {
      id: 'demo3'
    });
    var scroller = this.$el.querySelector('.scroller');
    var evt = document.getElementById('evt');
    var pos = document.getElementById('pos');

    function createLi (n) {
      var html = '';
      for (var i = 0; i < n; i++) {
        html += '<li>' + (i + 1) + '</li>';
      }
      scroller.innerHTML = html;
      jroll.scrollTo(0, 0).refresh();
    }

    createLi(40);

    jroll.on('scrollStart', function () {
      evt.innerText = 'scrollStart';
      pos.innerText = '(0, ' + this.y.toFixed(2) + ')';
    });

    jroll.on('scroll', function () {
      evt.innerText = 'scroll';
      pos.innerText = '(0, ' + this.y.toFixed(2) + ')';
    });

    jroll.on('scrollEnd', function () {
      evt.innerText = 'scrollEnd';
      pos.innerText = '(0, ' + this.y.toFixed(2) + ')';
    });

    jroll.on('touchEnd', function () {
      evt.innerText = 'touchEnd';
    });

    // 旋转屏幕会执行该事件
    jroll.on('refresh', function () {
      evt.innerText = 'refresh';
    });
  }
};

_$styleInject("jtaro_style_jroll_demo_pages_4", "\n[jtaro_jroll_demo_pages_4] .wrapper {\r\n    position: absolute;\r\n    top: 44px;\r\n    bottom: 0;\r\n    width: 100%;\r\n  }\n[jtaro_jroll_demo_pages_4] .scroller {\r\n    margin: 0;\r\n    padding: 0;\r\n    background: #fff;\r\n  }\n[jtaro_jroll_demo_pages_4] img {\r\n    display: block;\r\n  }\n");
var tpl$3 = "<div jtaro_jroll_demo_pages_4 >\r\n  <my-header title=\"缩放加自由滑动\"></my-header>\r\n  <div class=\"wrapper\">\r\n    <div class=\"scroller\">\r\n      <img src=\"http://www.chjtx.com/JRoll1/images/scrollfree.jpg\" width=\"100%\" height=\"auto\">\r\n    </div>\r\n  </div>\r\n</div>";

/* global JRoll */
var p7 = {
  template: tpl$3,
  components: {
    myHeader: header
  },
  mounted: function () {
    var jroll = new JRoll(this.$el.querySelector('.wrapper'), {
      id: 'demo4',
      zoom: true,
      scrollFree: true
    });

    var img = this.$el.querySelector('.scroller img');

    if (img) {
      // 图片加载完成后会改变scroller的高度，因此要refresh一下
      img.onload = function () {
        jroll.refresh();
      };
    }
  }
};

_$styleInject("jtaro_style_jroll_demo_pages_5", "\n[jtaro_jroll_demo_pages_5] .wrapper {\r\n    position: absolute;\r\n    top: 44px;\r\n    bottom: 0;\r\n    width: 100%;\r\n  }\n[jtaro_jroll_demo_pages_5] .scroller {\r\n    margin: 0;\r\n    padding: 0 10px;\r\n    background: #fff;\r\n  }\n[jtaro_jroll_demo_pages_5] .inner {\r\n    width: 196px;\r\n    float: left;\r\n    height: 222px;\r\n    border: 1px solid #DA020C;\r\n    color: #DA020C;\r\n    margin: 12px;\r\n    margin-left: 0;\r\n  }\n[jtaro_jroll_demo_pages_5] .inner>div {\r\n    padding: 10px;\r\n  }\n");
var tpl$4 = "<div jtaro_jroll_demo_pages_5 >\r\n  <my-header title=\"嵌套滑动\"></my-header>\r\n  <div class=\"wrapper\">\r\n    <div class=\"scroller\">\r\n      噫吁嚱，危乎高哉！蜀道之难，难于上青天！ 蚕丛及鱼凫，开国何茫然！ 尔来四万八千岁，不与秦塞通人烟。 西当太白有鸟道，可以横绝峨眉巅。 地崩山摧壮士死，然后天梯石栈相钩连。\r\n      <div class=\"inner\">\r\n        <div>唧唧复唧唧，木兰当户织。不闻机杼声，惟闻女叹息。 问女何所思，问女何所忆。女亦无所思，女亦无所忆。昨夜见军帖，可汗大点兵，军书十二卷，卷卷有爷名。阿爷无大儿，木兰无长兄，愿为市鞍马，从此替爷征。 东市买骏马，西市买鞍鞯，南市买辔头，北市买长鞭。旦辞爷娘去，暮宿黄河边，不闻爷娘唤女声，但闻黄河流水鸣溅溅。旦辞黄河去，暮至黑山头，不闻爷娘唤女声，但闻燕山胡骑鸣啾啾。\r\n          万里赴戎机，关山度若飞。朔气传金柝，寒光照铁衣。将军百战死，壮士十年归。 归来见天子，天子坐明堂。策勋十二转，赏赐百千强。可汗问所欲，木兰不用尚书郎，愿驰千里足，送儿还故乡。 爷娘闻女来，出郭相扶将；阿姊闻妹来，当户理红妆；小弟闻姊来，磨刀霍霍向猪羊。开我东阁门，坐我西阁床，脱我战时袍，著我旧时裳。当窗理云鬓，对镜贴花黄。出门看火伴，火伴皆惊忙：同行十二年，不知木兰是女郎。\r\n          雄兔脚扑朔，雌兔眼迷离；双兔傍地走，安能辨我是雄雌？\r\n        </div>\r\n      </div>\r\n      上有六龙回日之高标，下有冲波逆折之回川。 黄鹤之飞尚不得过，猿猱欲度愁攀援。 青泥何盘盘，百步九折萦岩峦。 扪参历井仰胁息，以手抚膺坐长叹。 问君西游何时还？畏途巉岩不可攀。 但见悲鸟号古木，雄飞雌从绕林间。 又闻子规啼夜月，愁空山。 蜀道之难,难于上青天，使人听此凋朱颜！\r\n      连峰去天不盈尺，枯松倒挂倚绝壁。 飞湍瀑流争喧豗，砯崖转石万壑雷。 其险也如此，嗟尔远道之人胡为乎来哉！ 剑阁峥嵘而崔嵬，一夫当关，万夫莫开。 所守或匪亲，化为狼与豺。 朝避猛虎，夕避长蛇；磨牙吮血，杀人如麻。 锦城虽云乐，不如早还家。\r\n      蜀道之难,难于上青天，侧身西望长咨嗟！\r\n    </div>\r\n  </div>\r\n</div>";

/* global JRoll */
var p9 = {
  template: tpl$4,
  components: {
    myHeader: header
  },
  mounted: function () {
    var pos;
    var jroll1 = new JRoll(this.$el.querySelector('.wrapper'), {
      id: 'demo5'
    });
    var jroll2 = new JRoll(this.$el.querySelector('.inner'));
    jroll2.on('scrollStart', function () {
      pos = this.y;
    });
    jroll2.on('scroll', function (e) {
      if ((this.y - pos > 0 && pos === 0) || (this.y - pos < 0 && pos === this.maxScrollY)) {
        jroll2.call(jroll1, e);
      }
    });
  }
};

_$styleInject("jtaro_style_jroll_demo_pages_7", "\n[jtaro_jroll_demo_pages_7] .wrapper {\r\n    position: absolute;\r\n    top: 44px;\r\n    bottom: 0;\r\n    width: 100%;\r\n  }\n[jtaro_jroll_demo_pages_7] .scroller {\r\n    margin: 0;\r\n    padding: 0;\r\n    background: #fff;\r\n  }\n[jtaro_jroll_demo_pages_7] p {\r\n    padding: 10px;\r\n    text-align: center;\r\n    margin: 0;\r\n  }\n");
var tpl$5 = "<div jtaro_jroll_demo_pages_7 >\r\n  <my-header title=\"带图片的内容\"></my-header>\r\n  <div class=\"wrapper\">\r\n    <div class=\"scroller\">\r\n      <img src=\"http://www.chjtx.com/JRoll1/images/1.jpg\" width=\"100%\" height=\"auto\" />\r\n      <p>纳米核心 图1</p>\r\n      <img src=\"http://www.chjtx.com/JRoll1/images/2.jpg\" width=\"100%\" height=\"auto\" />\r\n      <p>纳米核心 图2</p>\r\n      <img src=\"http://www.chjtx.com/JRoll1/images/3.jpg\" width=\"100%\" height=\"auto\" />\r\n      <p>纳米核心 图3</p>\r\n      <img src=\"http://www.chjtx.com/JRoll1/images/4.jpg\" width=\"100%\" height=\"auto\" />\r\n      <p>纳米核心 图4</p>\r\n      <img src=\"http://www.chjtx.com/JRoll1/images/5.jpg\" width=\"100%\" height=\"auto\" />\r\n      <p>纳米核心 图5</p>\r\n      <img src=\"http://www.chjtx.com/JRoll1/images/6.jpg\" width=\"100%\" height=\"auto\" />\r\n      <p>纳米核心 图6</p>\r\n    </div>\r\n  </div>\r\n</div>";

/* global JRoll */
var p11 = {
  template: tpl$5,
  components: {
    myHeader: header
  },
  mounted: function () {
    var jroll = new JRoll(this.$el.querySelector('.wrapper'), {
      id: 'demo7'
    });

    var imgs = this.$el.querySelectorAll('.scroller img');

    if (imgs) {
      // 图片加载完成后会改变scroller的高度，因此要refresh一下
      Array.prototype.forEach.call(imgs, function (i) {
        i.onload = function () {
          jroll.refresh();
        };
      });
    }
  }
};

_$styleInject("jtaro_style_jroll_demo_pages_8", "\n[jtaro_jroll_demo_pages_8] ul,\n[jtaro_jroll_demo_pages_8] li {\r\n    margin: 0;\r\n    padding: 0;\r\n  }\n[jtaro_jroll_demo_pages_8] img {\r\n    padding: 0;\r\n    margin: 0;\r\n    border: none;\r\n    display: block;\r\n  }\n[jtaro_jroll_demo_pages_8] .wrapper {\r\n    position: absolute;\r\n    width: 100%;\r\n    top: 44px;\r\n    left: 0;\r\n    bottom: 0;\r\n  }\n[jtaro_jroll_demo_pages_8] .wrapper li {\r\n    line-height: 32px;\r\n    height: 32px;\r\n    background: #DDD;\r\n    border-bottom: 1px solid #ccc;\r\n    border-top: 1px solid #eee;\r\n    padding-left: 1em;\r\n    list-style-type: none;\r\n    overflow: hidden;\r\n    display: block;\r\n  }\n[jtaro_jroll_demo_pages_8] .scroller {\r\n    width: 100%;\r\n  }\n[jtaro_jroll_demo_pages_8] #btns {\r\n    position: absolute;\r\n    top: 58px;\r\n    right: 10px;\r\n    background: rgba(0, 0, 0, .5);\r\n    color: #fff;\r\n  }\n[jtaro_jroll_demo_pages_8] #btns li {\r\n    list-style-type: none;\r\n    line-height: 32px;\r\n    padding: 0 10px;\r\n  }\n");
var tpl$6 = "<div jtaro_jroll_demo_pages_8 >\r\n  <my-header title=\"动态调整可选项\"></my-header>\r\n  <div class=\"wrapper\">\r\n    <ul class=\"scroller\"></ul>\r\n  </div>\r\n  <ul id=\"btns\">\r\n    <li>\r\n      <input type=\"checkbox\">\r\n      <span>scrollX</span>\r\n    </li>\r\n    <li>\r\n      <input type=\"checkbox\" checked>\r\n      <span>scrollY</span>\r\n    </li>\r\n    <li>\r\n      <input type=\"checkbox\">\r\n      <span>scrollFree</span>\r\n    </li>\r\n    <li>\r\n      <input type=\"checkbox\">\r\n      <span>zoom</span>\r\n    </li>\r\n    <li>\r\n      <input type=\"checkbox\" checked>\r\n      <span>bounce</span>\r\n    </li>\r\n    <li>\r\n      <input type=\"checkbox\" checked>\r\n      <span>momentum</span>\r\n    </li>\r\n  </ul>\r\n</div>";

/* global JRoll */
var p13 = {
  template: tpl$6,
  components: {
    myHeader: header
  },
  mounted: function () {
    var jroll = new JRoll(this.$el.querySelector('.wrapper'), {
      id: 'demo8',
      scrollBarY: true,
      scrollBarX: true
    });
    var scroller = this.$el.querySelector('.scroller');

    function createLi (num) {
      var str = '';
      for (var i = 1; i <= num; i++) {
        str += '<li>' + i + '</li>';
      }
      scroller.innerHTML = str;
      jroll.refresh().scrollTo(0, 0, 400);
    }

    createLi(100);

    // 绑定checkbox的change事件
    var checks = document.querySelectorAll('#btns input');
    for (var j = 0, l = checks.length; j < l; j++) {
      checks[j].onchange = function () {
        jroll.options[this.nextElementSibling.innerText] = this.checked;
      };
    }
  }
};

_$styleInject("jtaro_style_jroll_demo_pages_9", "\n[jtaro_jroll_demo_pages_9] .wrapper {\r\n    position: absolute;\r\n    top: 44px;\r\n    bottom: 0;\r\n    width: 100%;\r\n  }\n[jtaro_jroll_demo_pages_9] .scroller {\r\n    margin: 0;\r\n    padding: 0;\r\n    background: #fff;\r\n  }\n[jtaro_jroll_demo_pages_9] .item {\r\n    width: 100%;\r\n    height: 64px;\r\n    border-bottom: 1px solid #ddd;\r\n    line-height: 64px;\r\n  }\n[jtaro_jroll_demo_pages_9] .item-scroller {\r\n    width: 130%;\r\n    /* 添加absolute属性消除安卓机上滑动删除按钮时的文字重影 */\r\n    position: absolute;\r\n  }\n[jtaro_jroll_demo_pages_9] .content {\r\n    width: 77%;\r\n    height: 100%;\r\n    float: left;\r\n    padding-left: 20px;\r\n    box-sizing: border-box;\r\n  }\n[jtaro_jroll_demo_pages_9] .del {\r\n    width: 23%;\r\n    height: 100%;\r\n    float: right;\r\n    background: red;\r\n    color: #fff;\r\n    text-align: center;\r\n  }\n");
var tpl$7 = "<div jtaro_jroll_demo_pages_9 >\r\n  <my-header title=\"列表单例侧滑\"></my-header>\r\n  <div class=\"wrapper\">\r\n    <div class=\"scroller\">\r\n      <div class=\"item\">\r\n        <div class=\"item-scroller\">\r\n          <div class=\"content\">列表内容</div>\r\n          <div class=\"del\">删除</div>\r\n        </div>\r\n      </div>\r\n      <div class=\"item\">\r\n        <div class=\"item-scroller\">\r\n          <div class=\"content\">列表内容</div>\r\n          <div class=\"del\">删除</div>\r\n        </div>\r\n      </div>\r\n      <div class=\"item\">\r\n        <div class=\"item-scroller\">\r\n          <div class=\"content\">列表内容</div>\r\n          <div class=\"del\">删除</div>\r\n        </div>\r\n      </div>\r\n      <div class=\"item\">\r\n        <div class=\"item-scroller\">\r\n          <div class=\"content\">列表内容</div>\r\n          <div class=\"del\">删除</div>\r\n        </div>\r\n      </div>\r\n      <div class=\"item\">\r\n        <div class=\"item-scroller\">\r\n          <div class=\"content\">列表内容</div>\r\n          <div class=\"del\">删除</div>\r\n        </div>\r\n      </div>\r\n      <div class=\"item\">\r\n        <div class=\"item-scroller\">\r\n          <div class=\"content\">列表内容</div>\r\n          <div class=\"del\">删除</div>\r\n        </div>\r\n      </div>\r\n      <div class=\"item\">\r\n        <div class=\"item-scroller\">\r\n          <div class=\"content\">列表内容</div>\r\n          <div class=\"del\">删除</div>\r\n        </div>\r\n      </div>\r\n      <div class=\"item\">\r\n        <div class=\"item-scroller\">\r\n          <div class=\"content\">列表内容</div>\r\n          <div class=\"del\">删除</div>\r\n        </div>\r\n      </div>\r\n      <div class=\"item\">\r\n        <div class=\"item-scroller\">\r\n          <div class=\"content\">列表内容</div>\r\n          <div class=\"del\">删除</div>\r\n        </div>\r\n      </div>\r\n      <div class=\"item\">\r\n        <div class=\"item-scroller\">\r\n          <div class=\"content\">列表内容</div>\r\n          <div class=\"del\">删除</div>\r\n        </div>\r\n      </div>\r\n      <div class=\"item\">\r\n        <div class=\"item-scroller\">\r\n          <div class=\"content\">列表内容</div>\r\n          <div class=\"del\">删除</div>\r\n        </div>\r\n      </div>\r\n      <div class=\"item\">\r\n        <div class=\"item-scroller\">\r\n          <div class=\"content\">列表内容</div>\r\n          <div class=\"del\">删除</div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>";

/* global JRoll */
var p15 = {
  template: tpl$7,
  components: {
    myHeader: header
  },
  mounted: function () {
    var jroll = new JRoll(this.$el.querySelector('.wrapper'), {
      id: 'demo9',
      scrollBarY: true
    });

    var items = document.querySelectorAll('.item');
    var current = null; // 保存当前滑开的item

    for (var i = 0, l = items.length; i < l; i++) {
      var j = new JRoll(items[i], {
        scrollX: true,
        bounce: false
      });

      j.on('scrollStart', function () {
        if (current && current !== this) {
          current.scrollTo(0, 0, 100);
          current = null;
        }
      });

      j.on('scroll', function (e) {
        if (this.x === 0 && !current) {
          this.call(jroll, e);
        } else {
          current = this;
        }
      });

      j.on('scrollEnd', function () {
        if (this.x > -50) {
          this.scrollTo(0, 0, 100);
          current = null;
        } else {
          this.scrollTo(this.maxScrollX, 0, 100);
        }
      });
    }

    // 添加点击删除按钮的事件
    jroll.scroller.addEventListener('click', function (e) {
      if (e.target.className === 'del') {
        window.alert('点击删除');
      }
    }, false);
  }
};

_$styleInject("jtaro_style_jroll_demo_pages_home", "\n[jtaro_jroll_demo_pages_home] .wrapper {\r\n        height: 100%;\r\n    }\n[jtaro_jroll_demo_pages_home] h1,\n[jtaro_jroll_demo_pages_home] h2 {\r\n        margin: 0;\r\n        padding: 40px;\r\n        padding-bottom: 0;\r\n    }\n[jtaro_jroll_demo_pages_home] h2 {\r\n        padding-top: 0;\r\n    }\n[jtaro_jroll_demo_pages_home] ul {\r\n        margin: 0;\r\n        padding: 20px;\r\n    }\n[jtaro_jroll_demo_pages_home] li {\r\n        line-height: 44px;\r\n        margin-left: 40px;\r\n    }\n");
var tpl$8 = "<div jtaro_jroll_demo_pages_home  class=\"wrapper\">\r\n    <div>\r\n        <h1>目录</h1>\r\n        <ul>\r\n            <li><a v-on:click=\"goto('1')\">上万级数据测试</a></li>\r\n            <li><a v-on:click=\"goto('2')\">自定义滚动条</a></li>\r\n            <li><a v-on:click=\"goto('3')\">滑动事件</a></li>\r\n            <li><a v-on:click=\"goto('4')\">缩放加自由滑动</a></li>\r\n            <li><a v-on:click=\"goto('5')\">嵌套滑动</a></li>\r\n            <li><a v-on:click=\"goto('7')\">带图片的内容</a></li>\r\n            <li><a v-on:click=\"goto('8')\">动态调整可选项</a></li>\r\n            <li><a v-on:click=\"goto('9')\">仿QQ列表侧滑删除</a></li>\r\n        </ul>\r\n    </div>\r\n</div>";

/* global JRoll */
var p17 = {
  template: tpl$8,
  methods: {
    goto: function (p) {
      this.go('pages/' + p);
    }
  },
  mounted: function () {
    this.jroll = new JRoll(this.$el);
  }
};

Vue.component('pages__1', p1);
Vue.component('pages__2', p3);
Vue.component('pages__3', p5);
Vue.component('pages__4', p7);
Vue.component('pages__5', p9);
Vue.component('pages__7', p11);
Vue.component('pages__8', p13);
Vue.component('pages__9', p15);
Vue.component('pages__home', p17);

}());
