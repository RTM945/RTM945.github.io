webpackJsonp([1],{

/***/ 139:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_Detail_vue__ = __webpack_require__(381);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_Detail_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__components_Detail_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_List_vue__ = __webpack_require__(383);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_List_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__components_List_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Error_vue__ = __webpack_require__(382);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Error_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__components_Error_vue__);




/* harmony default export */ __webpack_exports__["a"] = ([{
    path: '/label/:label',
    name: 'list',
    component: __WEBPACK_IMPORTED_MODULE_1__components_List_vue___default.a
}, {
    path: '/detail/:id',
    name: 'detail',
    component: __WEBPACK_IMPORTED_MODULE_0__components_Detail_vue___default.a
}, {
    path: '/',
    name: 'list',
    component: __WEBPACK_IMPORTED_MODULE_1__components_List_vue___default.a
}, {
    path: '/error',
    name: 'error',
    component: __WEBPACK_IMPORTED_MODULE_2__components_Error_vue___default.a
}, {
    path: '*',
    name: 'error',
    component: __WEBPACK_IMPORTED_MODULE_2__components_Error_vue___default.a
}]);

/***/ }),

/***/ 140:
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(43)(
  /* script */
  __webpack_require__(161),
  /* template */
  __webpack_require__(391),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 141:
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(43)(
  /* script */
  __webpack_require__(166),
  /* template */
  __webpack_require__(390),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 161:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_normalize_css__ = __webpack_require__(373);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_normalize_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_normalize_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__style_main_css__ = __webpack_require__(376);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__style_main_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__style_main_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__style_icomoon_style_css__ = __webpack_require__(375);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__style_icomoon_style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__style_icomoon_style_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__gitment_utils__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__config__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_header__ = __webpack_require__(384);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_header___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__components_header__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//










/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'app',
    components: {
        appHeader: __WEBPACK_IMPORTED_MODULE_5__components_header___default.a
    },
    data() {
        return {
            page: 1,
            label: '',
            issues: [],
            timer: 0,
            loading: false,
            isPause: false,
            labels: null,
            isNav: false
        };
    },
    watch: {
        '$route.path': {
            immediate: true,
            handler(path) {
                if (path === '/' || path.match(/^\/label\//)) {
                    let label = this.$route.params.label;

                    if (label === this.label && this.issues.length) return;

                    this.issues = [];
                    this.label = label;
                    this.page = 1;
                    this.getIssues();
                }
            }
        }
    },
    methods: {
        getIssues() {
            let params = {
                creator: __WEBPACK_IMPORTED_MODULE_4__config__["a" /* OWNER */],
                page: this.page,
                labels: this.label
            };

            this.loading = true;

            __WEBPACK_IMPORTED_MODULE_3__gitment_utils__["a" /* http */].get(`/repos/${__WEBPACK_IMPORTED_MODULE_4__config__["a" /* OWNER */]}/${__WEBPACK_IMPORTED_MODULE_4__config__["b" /* REPO */]}/issues`, params).then(issues => {
                if (params.labels != this.label) return;

                this.loading = false;

                if (issues && issues.length) {
                    this.issues = this.issues.concat(issues);
                    ++this.page;
                } else {
                    this.pauseUpdate();
                }
            }).catch(error => {
                this.loading = false;
            });
        },
        onScrolling(e) {
            const routeName = this.$route.name;
            const $app = this.$refs['app'];
            const scrollTop = $app.scrollTop;

            switch (routeName) {
                case 'list':
                    if (!this.isPause && routeName === 'list' && $app.scrollHeight === scrollTop + $app.clientHeight) {
                        clearTimeout(this.timer);
                        this.timer = setTimeout(() => {
                            this.getIssues();
                        }, 200);
                    }

                    break;
                case 'detail':
                    let $ids = $app.getElementsByClassName('nav-anchor'),
                        $hash;

                    for (let i = 0, len = $ids.length; i < len; ++i) {
                        let $i = $ids[i];

                        if (!$hash || Math.abs($hash.offsetTop - scrollTop) > Math.abs($i.offsetTop - scrollTop)) {
                            $hash = $i;
                        }
                    }
                    if ($hash) this.$refs['app-nav'].hash = $hash.id;
                    break;
            }
        },
        getLabels() {
            __WEBPACK_IMPORTED_MODULE_3__gitment_utils__["a" /* http */].get(`/repos/${__WEBPACK_IMPORTED_MODULE_4__config__["a" /* OWNER */]}/${__WEBPACK_IMPORTED_MODULE_4__config__["b" /* REPO */]}/labels`).then(labels => {
                this.labels = labels;
            }).catch(error => {
                console.log(error);
            });
        },
        pauseUpdate() {
            this.isPause = true;

            setTimeout(() => {
                this.isPause = false;
            }, 20000);
        },
        setLoading(val) {
            this.loading = val;
        }
    },
    mounted() {
        this.getLabels();
    }
});

/***/ }),

/***/ 162:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__gitment_default_css__ = __webpack_require__(374);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__gitment_default_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__gitment_default_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__gitment_gitment_js__ = __webpack_require__(168);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__bus__ = __webpack_require__(69);
//
//
//
//
//
//
//
//
//
//
//







/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'Detail',
    data() {
        return {
            detail: {},
            loading: false
        };
    },
    watch: {
        loading: {
            immediate: true,
            handler(val) {
                this.$emit('loading', val);
            }
        }
    },
    mounted() {
        document.title = __WEBPACK_IMPORTED_MODULE_0__config__["c" /* TITLE */] + " -- loading";

        this.loading = true;

        const gitment = new __WEBPACK_IMPORTED_MODULE_2__gitment_gitment_js__["a" /* default */]({
            id: this.$route.params.id,
            owner: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* OWNER */],
            repo: __WEBPACK_IMPORTED_MODULE_0__config__["b" /* REPO */],
            oauth: {
                client_id: __WEBPACK_IMPORTED_MODULE_0__config__["d" /* OAUTH */][0],
                client_secret: __WEBPACK_IMPORTED_MODULE_0__config__["d" /* OAUTH */][1]
            }
        });

        gitment.render(document.getElementById('comments'));

        gitment.getIssue().then(issue => {
            this.getDetail(issue);
            this.loading = false;
        }).catch(error => {
            this.$router.push('/error');
        });
    },
    methods: {
        getDetail(issue) {
            let paragraph = [],
                title = issue.title,
                p = {
                id: 'title',
                children: paragraph,
                label: '正文',
                level: 1,
                isExpand: true
            },
                c = {
                id: 'comments',
                label: '评论'
            },
                nav = [p, c],
                map = { 'title': p, 'comments': c },
                count = 0,
                html = issue.body_html || '';

            this.detail.title = document.title = title;

            this.detail.html = html.replace(/(\<h\d+\>)(.+)(?=\<\/h\d+\>)/ig, (str, key) => {
                let t = {
                    id: 'content_title_' + count++,
                    label: str.replace(/\<h\d\>/, ''),
                    level: str.match(/\d+(?=\>)/)[0],
                    isExpand: false
                };

                map[t.id] = t;

                addParagraph(t);

                return str.replace(/(\<h\d)/, `$1 id=${t.id} class="nav-anchor"`);
            });

            __WEBPACK_IMPORTED_MODULE_3__bus__["a" /* default */].$emit('sendToNav', { nav, map });

            function addParagraph(t) {
                let l = t.level - p.level;

                if (l == 1 || l < 1 && p.level == 1 || l > 1 && !p.children) {
                    t.parent = p;
                    !p.children && (p.children = []);
                    p.children.push(t);
                    return;
                } else if (l > 1) {
                    let children = p.children;

                    p = children[children.length - 1];
                } else {
                    p = p.parent;
                }

                addParagraph(t);
            }
        }
    }
});

/***/ }),

/***/ 163:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'Error',
    data() {
        return {
            seconds: 5
        };
    },
    mounted() {
        this.$emit('loading', false);

        let timer = setInterval(() => {
            if (--this.seconds < 1) {
                if (!this._isDestroyed) this.$router.push('/');
                clearInterval(timer);
            }
        }, 1000);
    }
});

/***/ }),

/***/ 164:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config__ = __webpack_require__(52);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'List',
    props: ['issues'],
    data() {
        return {};
    },
    methods: {
        summary(html) {
            return html.replace(/<pre[\s\S]*>[\s\S]*<\/pre>/g, "[code]code[/code]").replace(/<h[1-7][\s\S]*?>[\s\S]*?<\/h[1-7]>/g, "").replace(/<(\/{0,1})code>/g, `[$1code]`).replace(/<[^>]+>/g, " ").replace(/\[(\/{0,1})code\]/g, `<$1code>`).replace(/\n/g, "");
        }
    },
    mounted() {
        window.document.title = __WEBPACK_IMPORTED_MODULE_0__config__["c" /* TITLE */];
    }
});

/***/ }),

/***/ 165:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__gitment_utils__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config__ = __webpack_require__(52);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
    data() {
        return {
            title: __WEBPACK_IMPORTED_MODULE_1__config__["c" /* TITLE */],
            user: {},
            labels: null
        };
    },
    methods: {
        getUser() {
            __WEBPACK_IMPORTED_MODULE_0__gitment_utils__["a" /* http */].get(`/users/${__WEBPACK_IMPORTED_MODULE_1__config__["a" /* OWNER */]}`).then(user => {
                if (user) {
                    this.user = user;
                }
            });
        }
    },
    mounted() {
        this.getUser();
    }
});

/***/ }),

/***/ 166:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__bus__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__navTree__ = __webpack_require__(385);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__navTree___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__navTree__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
    props: ['labels'],
    data() {
        return {
            label: '',
            timer: 0,
            paragraph: null,
            paragraphMap: {},
            hash: '',
            isLoad: false
        };
    },
    components: {
        navTree: __WEBPACK_IMPORTED_MODULE_1__navTree___default.a
    },
    watch: {
        '$route.path': {
            immediate: true,
            handler(path) {
                let hash = (window.location.hash || '').replace(/^#/, '');

                window.location.hash = '';

                this.hash = hash;
                this.isLoad = false;

                if (!path.match(/\/detail\//)) {
                    this.paragraph = null;

                    setTimeout(() => {
                        this.isLoad = true;
                    }, 500);
                }

                this.label = this.$route.params.label;
            }
        },
        hash: {
            immediate: true,
            handler(hash) {
                let p = this.paragraphMap[hash];

                p && p.parent && this.expand(p.parent);
            }
        }
    },
    methods: {
        getStyle(item) {
            let color = '#' + item.color;

            return {
                'backgroundColor': color,
                'borderColor': color,
                'color': color
            };
        },
        toggle(item) {
            if (this.label === this.$route.params.label) {
                this.$router.push('/');
            }
        },
        expand(p) {
            if (!p) return;

            p.isExpand = true;

            this.expand(p.parent);
        }
    },
    created() {
        __WEBPACK_IMPORTED_MODULE_0__bus__["a" /* default */].$on('sendToNav', data => {
            this.paragraph = data.nav;
            this.paragraphMap = data.map;

            setTimeout(() => {
                let hash = this.hash,
                    p = this.paragraphMap[hash];

                p && p.parent && this.expand(p.parent);

                window.location.hash = hash;
                this.isLoad = true;
            }, 0);
        }).$on('updateHash', hash => {
            this.hash = hash;
        });
    }
});

/***/ }),

/***/ 167:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__bus__ = __webpack_require__(69);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'navTree',
    props: ['data', 'hash'],
    data() {
        return {
            isExpand: false
        };
    },
    methods: {
        select(p) {
            __WEBPACK_IMPORTED_MODULE_0__bus__["a" /* default */].$emit('updateHash', p.id);
            if (p.children) p.isExpand = true;
        }
    }
});

/***/ }),

/***/ 168:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mobx__ = __webpack_require__(378);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__constants__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__theme_default__ = __webpack_require__(170);






const scope = 'public_repo';
const status = {
  load: false
};

function extendRenderer(instance, renderer) {
  instance[renderer] = container => {
    const targetContainer = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils__["b" /* getTargetContainer */])(container);
    const render = instance.theme[renderer] || instance.defaultTheme[renderer];

    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_mobx__["a" /* autorun */])(() => {
      const e = render(instance.state, instance);
      if (targetContainer.firstChild) {
        targetContainer.replaceChild(e, targetContainer.firstChild);
      } else {
        targetContainer.appendChild(e);
      }
    });

    return targetContainer;
  };
}

class Gitment {
  get accessToken() {
    return localStorage.getItem(__WEBPACK_IMPORTED_MODULE_1__constants__["a" /* LS_ACCESS_TOKEN_KEY */]);
  }
  set accessToken(token) {
    localStorage.setItem(__WEBPACK_IMPORTED_MODULE_1__constants__["a" /* LS_ACCESS_TOKEN_KEY */], token);
  }

  get loginLink() {
    const oauthUri = 'https://github.com/login/oauth/authorize';

    const oauthParams = Object.assign({
      scope
    }, this.oauth);

    return `${oauthUri}${__WEBPACK_IMPORTED_MODULE_2__utils__["c" /* Query */].stringify(oauthParams)}`;
  }

  constructor(options = {}) {
    this.defaultTheme = __WEBPACK_IMPORTED_MODULE_3__theme_default__["a" /* default */];
    this.useTheme(__WEBPACK_IMPORTED_MODULE_3__theme_default__["a" /* default */]);

    Object.assign(this, {
      id: window.location.href,
      title: window.document.title,
      link: window.location.href,
      desc: '',
      labels: [],
      theme: __WEBPACK_IMPORTED_MODULE_3__theme_default__["a" /* default */],
      oauth: {},
      perPage: 20,
      maxCommentHeight: 250
    }, options);

    if (!this.oauth.redirect_uri) this.oauth.redirect_uri = window.location.href;

    this.useTheme(this.theme);

    const user = {};
    try {
      const userInfo = localStorage.getItem(__WEBPACK_IMPORTED_MODULE_1__constants__["b" /* LS_USER_KEY */]);
      if (this.accessToken && userInfo) {
        Object.assign(user, JSON.parse(userInfo), {
          fromCache: true
        });
      }
    } catch (e) {
      localStorage.removeItem(__WEBPACK_IMPORTED_MODULE_1__constants__["b" /* LS_USER_KEY */]);
    }

    this.state = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_mobx__["b" /* observable */])({
      user,
      error: null,
      meta: {},
      comments: undefined,
      reactions: [],
      commentReactions: {},
      currentPage: 1
    });

    const query = __WEBPACK_IMPORTED_MODULE_2__utils__["c" /* Query */].parse();
    if (query.code) {
      const { client_id, client_secret, redirect_uri } = this.oauth;
      const code = query.code;
      delete query.code;
      const search = __WEBPACK_IMPORTED_MODULE_2__utils__["c" /* Query */].stringify(query);
      const replacedUrl = `${window.location.origin}${window.location.pathname}${search}${window.location.hash}`;
      history.replaceState({}, '', replacedUrl);

      Object.assign(this, {
        id: replacedUrl,
        link: replacedUrl
      }, options);

      this.state.user.isLoggingIn = true;
      // 'https://github.com/login/oauth/access_token'
      __WEBPACK_IMPORTED_MODULE_2__utils__["a" /* http */].post('https://gh-oauth.imsun.net', {
        code,
        client_id,
        client_secret,
        redirect_uri
      }, '').then(data => {
        this.accessToken = data.access_token;
        this.update();
      }).catch(e => {
        this.state.user.isLoggingIn = false;
        console.log(JSON.stringify({ code, client_id, client_secret }));
        console.log(e);
      });
    } else {
      this.update();
    }
  }

  init() {
    return this.createIssue().then(() => this.loadComments()).then(comments => {
      this.state.error = null;
      return comments;
    });
  }

  useTheme(theme = {}) {
    this.theme = theme;

    const renderers = Object.keys(this.theme);
    renderers.forEach(renderer => extendRenderer(this, renderer));
  }

  update() {
    return Promise.all([this.loadMeta(), this.loadUserInfo()]).then(() => Promise.all([this.loadComments().then(() => this.loadCommentReactions()), this.loadReactions()])).catch(e => this.state.error = e);
  }

  markdown(text) {
    return __WEBPACK_IMPORTED_MODULE_2__utils__["a" /* http */].post('/markdown', {
      text,
      mode: 'gfm'
    });
  }

  createIssue() {
    const { id, owner, repo, title, link, desc, labels } = this;

    return __WEBPACK_IMPORTED_MODULE_2__utils__["a" /* http */].post(`/repos/${owner}/${repo}/issues`, {
      title,
      labels: labels.concat(['gitment', id]),
      body: `${link}\n\n${desc}`
    }).then(meta => {
      this.state.meta = meta;
      return meta;
    });
  }

  getIssue() {
    if (this.state.meta.id) {
      return Promise.resolve(this.state.meta);
    } else if (status.load) {
      return new Promise((resolve, reject) => {
        const timer = setInterval(() => {
          if (this.state.meta.id) {
            resolve(this.state.meta);
            clearInterval(timer);
          } else if (!status.load) {
            reject();
            clearInterval(timer);
          }
        }, 100);
      });
    } else {
      return this.loadMeta();
    }
  }

  post(body) {
    return this.getIssue().then(issue => __WEBPACK_IMPORTED_MODULE_2__utils__["a" /* http */].post(issue.comments_url, { body }, '')).then(data => {
      this.state.meta.comments++;
      const pageCount = Math.ceil(this.state.meta.comments / this.perPage);
      if (this.state.currentPage === pageCount) {
        this.state.comments.push(data);
      }
      return data;
    });
  }

  loadMeta() {
    const { id, owner, repo } = this;
    status.load = true;
    return __WEBPACK_IMPORTED_MODULE_2__utils__["a" /* http */].get(`/repos/${owner}/${repo}/issues/${id}`).then(issues => {
      // if (!issues.length) return Promise.reject(NOT_INITIALIZED_ERROR)
      this.state.meta = issues;
      status.load = false;
      return issues;
    }).catch(error => {
      status.load = false;
      return error;
    });
  }

  loadComments(page = this.state.currentPage) {
    return this.getIssue().then(issue => __WEBPACK_IMPORTED_MODULE_2__utils__["a" /* http */].get(issue.comments_url, { page, per_page: this.perPage }, '')).then(comments => {
      this.state.comments = comments;
      return comments;
    });
  }

  loadUserInfo() {
    if (!this.accessToken) {
      this.logout();
      return Promise.resolve({});
    }

    return __WEBPACK_IMPORTED_MODULE_2__utils__["a" /* http */].get('/user').then(user => {
      this.state.user = user;
      localStorage.setItem(__WEBPACK_IMPORTED_MODULE_1__constants__["b" /* LS_USER_KEY */], JSON.stringify(user));
      return user;
    });
  }

  loadReactions() {
    if (!this.accessToken) {
      this.state.reactions = [];
      return Promise.resolve([]);
    }

    return this.getIssue().then(issue => {
      if (!issue.reactions.total_count) return [];
      return __WEBPACK_IMPORTED_MODULE_2__utils__["a" /* http */].get(issue.reactions.url, {}, '');
    }).then(reactions => {
      this.state.reactions = reactions;
      return reactions;
    });
  }

  loadCommentReactions() {
    if (!this.accessToken) {
      this.state.commentReactions = {};
      return Promise.resolve([]);
    }

    const comments = this.state.comments;
    const comentReactions = {};

    return Promise.all(comments.map(comment => {
      if (!comment.reactions.total_count) return [];

      const { owner, repo } = this;
      return __WEBPACK_IMPORTED_MODULE_2__utils__["a" /* http */].get(`/repos/${owner}/${repo}/issues/comments/${comment.id}/reactions`, {});
    })).then(reactionsArray => {
      comments.forEach((comment, index) => {
        comentReactions[comment.id] = reactionsArray[index];
      });
      this.state.commentReactions = comentReactions;

      return comentReactions;
    });
  }

  login() {
    window.location.href = this.loginLink;
  }

  logout() {
    localStorage.removeItem(__WEBPACK_IMPORTED_MODULE_1__constants__["a" /* LS_ACCESS_TOKEN_KEY */]);
    localStorage.removeItem(__WEBPACK_IMPORTED_MODULE_1__constants__["b" /* LS_USER_KEY */]);
    this.state.user = {};
  }

  goto(page) {
    this.state.currentPage = page;
    this.state.comments = undefined;
    return this.loadComments(page);
  }

  like() {
    if (!this.accessToken) {
      alert('Login to Like');
      return Promise.reject();
    }

    const { owner, repo } = this;

    return __WEBPACK_IMPORTED_MODULE_2__utils__["a" /* http */].post(`/repos/${owner}/${repo}/issues/${this.state.meta.number}/reactions`, {
      content: 'heart'
    }).then(reaction => {
      this.state.reactions.push(reaction);
      this.state.meta.reactions.heart++;
    });
  }

  unlike() {
    if (!this.accessToken) return Promise.reject();

    const { user, reactions } = this.state;
    const index = reactions.findIndex(reaction => reaction.user.login === user.login);
    return __WEBPACK_IMPORTED_MODULE_2__utils__["a" /* http */].delete(`/reactions/${reactions[index].id}`).then(() => {
      reactions.splice(index, 1);
      this.state.meta.reactions.heart--;
    });
  }

  likeAComment(commentId) {
    if (!this.accessToken) {
      alert('Login to Like');
      return Promise.reject();
    }

    const { owner, repo } = this;
    const comment = this.state.comments.find(comment => comment.id === commentId);

    return __WEBPACK_IMPORTED_MODULE_2__utils__["a" /* http */].post(`/repos/${owner}/${repo}/issues/comments/${commentId}/reactions`, {
      content: 'heart'
    }).then(reaction => {
      this.state.commentReactions[commentId].push(reaction);
      comment.reactions.heart++;
    });
  }

  unlikeAComment(commentId) {
    if (!this.accessToken) return Promise.reject();

    const reactions = this.state.commentReactions[commentId];
    const comment = this.state.comments.find(comment => comment.id === commentId);
    const { user } = this.state;
    const index = reactions.findIndex(reaction => reaction.user.login === user.login);

    return __WEBPACK_IMPORTED_MODULE_2__utils__["a" /* http */].delete(`/reactions/${reactions[index].id}`).then(() => {
      reactions.splice(index, 1);
      comment.reactions.heart--;
    });
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Gitment;


/***/ }),

/***/ 169:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Modified from https://github.com/evil-icons/evil-icons
 */

const close = '<svg class="gitment-close-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><path d="M37.304 11.282l1.414 1.414-26.022 26.02-1.414-1.413z"/><path d="M12.696 11.282l26.022 26.02-1.414 1.415-26.022-26.02z"/></svg>';
/* unused harmony export close */

const github = '<svg class="gitment-github-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><path d="M25 10c-8.3 0-15 6.7-15 15 0 6.6 4.3 12.2 10.3 14.2.8.1 1-.3 1-.7v-2.6c-4.2.9-5.1-2-5.1-2-.7-1.7-1.7-2.2-1.7-2.2-1.4-.9.1-.9.1-.9 1.5.1 2.3 1.5 2.3 1.5 1.3 2.3 3.5 1.6 4.4 1.2.1-1 .5-1.6 1-2-3.3-.4-6.8-1.7-6.8-7.4 0-1.6.6-3 1.5-4-.2-.4-.7-1.9.1-4 0 0 1.3-.4 4.1 1.5 1.2-.3 2.5-.5 3.8-.5 1.3 0 2.6.2 3.8.5 2.9-1.9 4.1-1.5 4.1-1.5.8 2.1.3 3.6.1 4 1 1 1.5 2.4 1.5 4 0 5.8-3.5 7-6.8 7.4.5.5 1 1.4 1 2.8v4.1c0 .4.3.9 1 .7 6-2 10.2-7.6 10.2-14.2C40 16.7 33.3 10 25 10z"/></svg>';
/* harmony export (immutable) */ __webpack_exports__["c"] = github;

const heart = '<svg class="gitment-heart-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><path d="M25 39.7l-.6-.5C11.5 28.7 8 25 8 19c0-5 4-9 9-9 4.1 0 6.4 2.3 8 4.1 1.6-1.8 3.9-4.1 8-4.1 5 0 9 4 9 9 0 6-3.5 9.7-16.4 20.2l-.6.5zM17 12c-3.9 0-7 3.1-7 7 0 5.1 3.2 8.5 15 18.1 11.8-9.6 15-13 15-18.1 0-3.9-3.1-7-7-7-3.5 0-5.4 2.1-6.9 3.8L25 17.1l-1.1-1.3C22.4 14.1 20.5 12 17 12z"/></svg>';
/* harmony export (immutable) */ __webpack_exports__["a"] = heart;

const spinner = '<svg class="gitment-spinner-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><path d="M25 18c-.6 0-1-.4-1-1V9c0-.6.4-1 1-1s1 .4 1 1v8c0 .6-.4 1-1 1z"/><path opacity=".3" d="M25 42c-.6 0-1-.4-1-1v-8c0-.6.4-1 1-1s1 .4 1 1v8c0 .6-.4 1-1 1z"/><path opacity=".3" d="M29 19c-.2 0-.3 0-.5-.1-.4-.3-.6-.8-.3-1.3l4-6.9c.3-.4.8-.6 1.3-.3.4.3.6.8.3 1.3l-4 6.9c-.2.2-.5.4-.8.4z"/><path opacity=".3" d="M17 39.8c-.2 0-.3 0-.5-.1-.4-.3-.6-.8-.3-1.3l4-6.9c.3-.4.8-.6 1.3-.3.4.3.6.8.3 1.3l-4 6.9c-.2.2-.5.4-.8.4z"/><path opacity=".93" d="M21 19c-.3 0-.6-.2-.8-.5l-4-6.9c-.3-.4-.1-1 .3-1.3.4-.3 1-.1 1.3.3l4 6.9c.3.4.1 1-.3 1.3-.2.2-.3.2-.5.2z"/><path opacity=".3" d="M33 39.8c-.3 0-.6-.2-.8-.5l-4-6.9c-.3-.4-.1-1 .3-1.3.4-.3 1-.1 1.3.3l4 6.9c.3.4.1 1-.3 1.3-.2.1-.3.2-.5.2z"/><path opacity=".65" d="M17 26H9c-.6 0-1-.4-1-1s.4-1 1-1h8c.6 0 1 .4 1 1s-.4 1-1 1z"/><path opacity=".3" d="M41 26h-8c-.6 0-1-.4-1-1s.4-1 1-1h8c.6 0 1 .4 1 1s-.4 1-1 1z"/><path opacity=".86" d="M18.1 21.9c-.2 0-.3 0-.5-.1l-6.9-4c-.4-.3-.6-.8-.3-1.3.3-.4.8-.6 1.3-.3l6.9 4c.4.3.6.8.3 1.3-.2.3-.5.4-.8.4z"/><path opacity=".3" d="M38.9 33.9c-.2 0-.3 0-.5-.1l-6.9-4c-.4-.3-.6-.8-.3-1.3.3-.4.8-.6 1.3-.3l6.9 4c.4.3.6.8.3 1.3-.2.3-.5.4-.8.4z"/><path opacity=".44" d="M11.1 33.9c-.3 0-.6-.2-.8-.5-.3-.4-.1-1 .3-1.3l6.9-4c.4-.3 1-.1 1.3.3.3.4.1 1-.3 1.3l-6.9 4c-.1.2-.3.2-.5.2z"/><path opacity=".3" d="M31.9 21.9c-.3 0-.6-.2-.8-.5-.3-.4-.1-1 .3-1.3l6.9-4c.4-.3 1-.1 1.3.3.3.4.1 1-.3 1.3l-6.9 4c-.2.2-.3.2-.5.2z"/></svg>';
/* harmony export (immutable) */ __webpack_exports__["b"] = spinner;


/***/ }),

/***/ 170:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__icons__ = __webpack_require__(169);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__constants__ = __webpack_require__(70);



function renderHeader({ meta, user, reactions }, instance) {
  const container = document.createElement('div');
  container.lang = "en-US";
  container.className = 'gitment-container gitment-header-container';

  const likeButton = document.createElement('span');
  const likedReaction = reactions.find(reaction => reaction.content === 'heart' && reaction.user.login === user.login);
  likeButton.className = 'gitment-header-like-btn';
  likeButton.innerHTML = `
    ${__WEBPACK_IMPORTED_MODULE_0__icons__["a" /* heart */]}
    ${likedReaction ? 'Unlike' : 'Like'}
    ${meta.reactions && meta.reactions.heart ? ` • <strong>${meta.reactions.heart}</strong> Liked` : ''}
  `;

  if (likedReaction) {
    likeButton.classList.add('liked');
    likeButton.onclick = () => instance.unlike();
  } else {
    likeButton.classList.remove('liked');
    likeButton.onclick = () => instance.like();
  }
  container.appendChild(likeButton);

  const commentsCount = document.createElement('span');
  commentsCount.innerHTML = `
    ${meta.comments ? ` • <strong>${meta.comments}</strong> Comments` : ''}
  `;
  container.appendChild(commentsCount);

  const issueLink = document.createElement('a');
  issueLink.className = 'gitment-header-issue-link';
  issueLink.href = meta.html_url;
  issueLink.target = '_blank';
  issueLink.innerText = 'Issue Page';
  container.appendChild(issueLink);

  return container;
}

function renderComments({ meta, comments, commentReactions, currentPage, user, error }, instance) {
  const container = document.createElement('div');
  container.lang = "en-US";
  container.className = 'gitment-container gitment-comments-container';

  if (error) {
    const errorBlock = document.createElement('div');
    errorBlock.className = 'gitment-comments-error';

    if (error === __WEBPACK_IMPORTED_MODULE_1__constants__["c" /* NOT_INITIALIZED_ERROR */] && user.login && user.login.toLowerCase() === instance.owner.toLowerCase()) {
      const initHint = document.createElement('div');
      const initButton = document.createElement('button');
      initButton.className = 'gitment-comments-init-btn';
      initButton.onclick = () => {
        initButton.setAttribute('disabled', true);
        instance.init().catch(e => {
          initButton.removeAttribute('disabled');
          alert(e);
        });
      };
      initButton.innerText = 'Initialize Comments';
      initHint.appendChild(initButton);
      errorBlock.appendChild(initHint);
    } else {
      errorBlock.innerText = error;
    }
    container.appendChild(errorBlock);
    return container;
  } else if (comments === undefined) {
    const loading = document.createElement('div');
    loading.innerText = 'Loading comments...';
    loading.className = 'gitment-comments-loading';
    container.appendChild(loading);
    return container;
  } else if (!comments.length) {
    const emptyBlock = document.createElement('div');
    emptyBlock.className = 'gitment-comments-empty';
    emptyBlock.innerText = 'No Comment Yet';
    container.appendChild(emptyBlock);
    return container;
  }

  const commentsList = document.createElement('ul');
  commentsList.className = 'gitment-comments-list';

  comments.forEach(comment => {
    const createDate = new Date(comment.created_at);
    const updateDate = new Date(comment.updated_at);
    const commentItem = document.createElement('li');
    commentItem.className = 'gitment-comment';
    commentItem.innerHTML = `
      <a class="gitment-comment-avatar" href="${comment.user.html_url}" target="_blank">
        <img class="gitment-comment-avatar-img" src="${comment.user.avatar_url}"/>
      </a>
      <div class="gitment-comment-main">
        <div class="gitment-comment-header">
          <a class="gitment-comment-name" href="${comment.user.html_url}" target="_blank">
            ${comment.user.login}
          </a>
          commented on
          <span title="${createDate}">${createDate.toDateString()}</span>
          ${createDate.toString() !== updateDate.toString() ? ` • <span title="comment was edited at ${updateDate}">edited</span>` : ''}
          <div class="gitment-comment-like-btn">${__WEBPACK_IMPORTED_MODULE_0__icons__["a" /* heart */]} ${comment.reactions.heart || ''}</div>
        </div>
        <div class="gitment-comment-body gitment-markdown">${comment.body_html}</div>
      </div>
    `;
    const likeButton = commentItem.querySelector('.gitment-comment-like-btn');
    const likedReaction = commentReactions[comment.id] && commentReactions[comment.id].find(reaction => reaction.content === 'heart' && reaction.user.login === user.login);
    if (likedReaction) {
      likeButton.classList.add('liked');
      likeButton.onclick = () => instance.unlikeAComment(comment.id);
    } else {
      likeButton.classList.remove('liked');
      likeButton.onclick = () => instance.likeAComment(comment.id);
    }

    // dirty
    // use a blank image to trigger height calculating when element rendered
    const imgTrigger = document.createElement('img');
    const markdownBody = commentItem.querySelector('.gitment-comment-body');
    imgTrigger.className = 'gitment-hidden';
    imgTrigger.src = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
    imgTrigger.onload = () => {
      if (markdownBody.clientHeight > instance.maxCommentHeight) {
        markdownBody.classList.add('gitment-comment-body-folded');
        markdownBody.style.maxHeight = instance.maxCommentHeight + 'px';
        markdownBody.title = 'Click to Expand';
        markdownBody.onclick = () => {
          markdownBody.classList.remove('gitment-comment-body-folded');
          markdownBody.style.maxHeight = '';
          markdownBody.title = '';
          markdownBody.onclick = null;
        };
      }
    };
    commentItem.appendChild(imgTrigger);

    commentsList.appendChild(commentItem);
  });

  container.appendChild(commentsList);

  if (meta) {
    const pageCount = Math.ceil(meta.comments / instance.perPage);
    if (pageCount > 1) {
      const pagination = document.createElement('ul');
      pagination.className = 'gitment-comments-pagination';

      if (currentPage > 1) {
        const previousButton = document.createElement('li');
        previousButton.className = 'gitment-comments-page-item';
        previousButton.innerText = 'Previous';
        previousButton.onclick = () => instance.goto(currentPage - 1);
        pagination.appendChild(previousButton);
      }

      for (let i = 1; i <= pageCount; i++) {
        const pageItem = document.createElement('li');
        pageItem.className = 'gitment-comments-page-item';
        pageItem.innerText = i;
        pageItem.onclick = () => instance.goto(i);
        if (currentPage === i) pageItem.classList.add('gitment-selected');
        pagination.appendChild(pageItem);
      }

      if (currentPage < pageCount) {
        const nextButton = document.createElement('li');
        nextButton.className = 'gitment-comments-page-item';
        nextButton.innerText = 'Next';
        nextButton.onclick = () => instance.goto(currentPage + 1);
        pagination.appendChild(nextButton);
      }

      container.appendChild(pagination);
    }
  }

  return container;
}

function renderEditor({ user, error }, instance) {
  const container = document.createElement('div');
  container.lang = "en-US";
  container.className = 'gitment-container gitment-editor-container';

  const shouldDisable = user.login && !error ? '' : 'disabled';
  const disabledTip = user.login ? '' : 'Login to Comment';
  container.innerHTML = `
      ${user.login ? `<a class="gitment-editor-avatar" href="${user.html_url}" target="_blank">
            <img class="gitment-editor-avatar-img" src="${user.avatar_url}"/>
          </a>` : user.isLoggingIn ? `<div class="gitment-editor-avatar">${__WEBPACK_IMPORTED_MODULE_0__icons__["b" /* spinner */]}</div>` : `<a class="gitment-editor-avatar" href="${instance.loginLink}" title="login with GitHub">
              ${__WEBPACK_IMPORTED_MODULE_0__icons__["c" /* github */]}
            </a>`}
    </a>
    <div class="gitment-editor-main">
      <div class="gitment-editor-header">
        <nav class="gitment-editor-tabs">
          <button class="gitment-editor-tab gitment-selected">Write</button>
          <button class="gitment-editor-tab">Preview</button>
        </nav>
        <div class="gitment-editor-login">
          ${user.login ? '<a class="gitment-editor-logout-link">Logout</a>' : user.isLoggingIn ? 'Logging in...' : `<a class="gitment-editor-login-link" href="${instance.loginLink}">Login</a> with GitHub`}
        </div>
      </div>
      <div class="gitment-editor-body">
        <div class="gitment-editor-write-field">
          <textarea placeholder="Leave a comment" title="${disabledTip}" ${shouldDisable}></textarea>
        </div>
        <div class="gitment-editor-preview-field gitment-hidden">
          <div class="gitment-editor-preview gitment-markdown"></div>
        </div>
      </div>
    </div>
    <div class="gitment-editor-footer">
      <a class="gitment-editor-footer-tip" href="https://guides.github.com/features/mastering-markdown/" target="_blank">
        Styling with Markdown is supported
      </a>
      <button class="gitment-editor-submit" title="${disabledTip}" ${shouldDisable}>Comment</button>
    </div>
  `;
  if (user.login) {
    container.querySelector('.gitment-editor-logout-link').onclick = () => instance.logout();
  }

  const writeField = container.querySelector('.gitment-editor-write-field');
  const previewField = container.querySelector('.gitment-editor-preview-field');

  const textarea = writeField.querySelector('textarea');
  textarea.oninput = () => {
    textarea.style.height = 'auto';
    const style = window.getComputedStyle(textarea, null);
    const height = parseInt(style.height, 10);
    const clientHeight = textarea.clientHeight;
    const scrollHeight = textarea.scrollHeight;
    if (clientHeight < scrollHeight) {
      textarea.style.height = height + scrollHeight - clientHeight + 'px';
    }
  };

  const [writeTab, previewTab] = container.querySelectorAll('.gitment-editor-tab');
  writeTab.onclick = () => {
    writeTab.classList.add('gitment-selected');
    previewTab.classList.remove('gitment-selected');
    writeField.classList.remove('gitment-hidden');
    previewField.classList.add('gitment-hidden');

    textarea.focus();
  };
  previewTab.onclick = () => {
    previewTab.classList.add('gitment-selected');
    writeTab.classList.remove('gitment-selected');
    previewField.classList.remove('gitment-hidden');
    writeField.classList.add('gitment-hidden');

    const preview = previewField.querySelector('.gitment-editor-preview');
    const content = textarea.value.trim();
    if (!content) {
      preview.innerText = 'Nothing to preview';
      return;
    }

    preview.innerText = 'Loading preview...';
    instance.markdown(content).then(html => preview.innerHTML = html);
  };

  const submitButton = container.querySelector('.gitment-editor-submit');
  submitButton.onclick = () => {
    submitButton.innerText = 'Submitting...';
    submitButton.setAttribute('disabled', true);
    instance.post(textarea.value.trim()).then(data => {
      textarea.value = '';
      textarea.style.height = 'auto';
      submitButton.removeAttribute('disabled');
      submitButton.innerText = 'Comment';
    }).catch(e => {
      alert(e);
      submitButton.removeAttribute('disabled');
      submitButton.innerText = 'Comment';
    });
  };

  return container;
}

function renderFooter() {
  const container = document.createElement('div');
  container.lang = "en-US";
  container.className = 'gitment-container gitment-footer-container';
  container.innerHTML = `
    Powered by
    <a class="gitment-footer-project-link" href="https://github.com/imsun/gitment" target="_blank">
      Gitment
    </a>
  `;
  return container;
}

function render(state, instance) {
  const container = document.createElement('div');
  container.lang = "en-US";
  container.className = 'gitment-container gitment-root-container';
  container.appendChild(instance.renderHeader(state, instance));
  container.appendChild(instance.renderComments(state, instance));
  container.appendChild(instance.renderEditor(state, instance));
  container.appendChild(instance.renderFooter(state, instance));
  return container;
}

/* harmony default export */ __webpack_exports__["a"] = ({ render, renderHeader, renderComments, renderEditor, renderFooter });

/***/ }),

/***/ 171:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_router__ = __webpack_require__(142);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__routes__ = __webpack_require__(139);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__App_vue__ = __webpack_require__(140);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__App_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__App_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_nav_vue__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_nav_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__components_nav_vue__);







// 路由
__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].use(__WEBPACK_IMPORTED_MODULE_1_vue_router__["a" /* default */]);

const router = new __WEBPACK_IMPORTED_MODULE_1_vue_router__["a" /* default */]({
    base: "",
    routes: __WEBPACK_IMPORTED_MODULE_2__routes__["a" /* default */],
    mode: 'history'
});

// 导航栏
__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].use(Vue => {
    Vue.component("app-nav", __WEBPACK_IMPORTED_MODULE_4__components_nav_vue___default.a);
});

const app = new __WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */]({
    router,
    render: h => h(__WEBPACK_IMPORTED_MODULE_3__App_vue___default.a)
}).$mount('#app');

/***/ }),

/***/ 373:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 374:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 375:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 376:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 377:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 381:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(377)
}
var Component = __webpack_require__(43)(
  /* script */
  __webpack_require__(162),
  /* template */
  __webpack_require__(388),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-4a32f5fe",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 382:
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(43)(
  /* script */
  __webpack_require__(163),
  /* template */
  __webpack_require__(387),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 383:
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(43)(
  /* script */
  __webpack_require__(164),
  /* template */
  __webpack_require__(386),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 384:
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(43)(
  /* script */
  __webpack_require__(165),
  /* template */
  __webpack_require__(392),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 385:
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(43)(
  /* script */
  __webpack_require__(167),
  /* template */
  __webpack_require__(389),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 386:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "issue-list"
  }, _vm._l((_vm.issues), function(item) {
    return _c('div', {
      staticClass: "issue-item"
    }, [_c('router-link', {
      attrs: {
        "to": '/detail/' + item.number
      }
    }, [_c('div', {
      staticClass: "issue-text"
    }, [_c('h2', [_vm._v(_vm._s(item.title))]), _vm._v(" "), _c('p', {
      domProps: {
        "innerHTML": _vm._s(_vm.summary(item.body_html))
      }
    })])]), _vm._v(" "), _vm._l((item.labels), function(l) {
      return _c('router-link', {
        staticClass: "issue-label",
        style: ({
          'backgroundColor': '#' + l.color
        }),
        attrs: {
          "to": '/label/' + l.name
        }
      }, [_vm._v("\n            " + _vm._s(l.name) + "\n        ")])
    })], 2)
  }))
},staticRenderFns: []}

/***/ }),

/***/ 387:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "error-page"
  }, [_c('div', {
    staticClass: "icon-github"
  }, [_vm._v("页面不存在，" + _vm._s(_vm.seconds) + "秒后回到首页")])])
},staticRenderFns: []}

/***/ }),

/***/ 388:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('section', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (!_vm.loading),
      expression: "!loading"
    }]
  }, [_c('div', {
    staticClass: "content"
  }, [_c('article', {
    staticClass: "gitment-comment-body gitment-markdown"
  }, [_c('h1', {
    staticClass: "nav-anchor",
    attrs: {
      "id": "title"
    }
  }, [_vm._v(_vm._s(_vm.detail.title))]), _vm._v(" "), _c('div', {
    domProps: {
      "innerHTML": _vm._s(_vm.detail.html)
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "nav-anchor",
    attrs: {
      "id": "comments"
    }
  })])
},staticRenderFns: []}

/***/ }),

/***/ 389:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "nav-tree"
  }, _vm._l((_vm.data), function(p) {
    return _c('div', {
      staticClass: "nav-tree-item",
      class: {
        'active': _vm.hash === p.id
      }
    }, [_c('a', {
      attrs: {
        "href": '#' + p.id
      },
      domProps: {
        "innerHTML": _vm._s(p.label)
      },
      on: {
        "click": function($event) {
          _vm.select(p)
        }
      }
    }), _vm._v(" "), (p.children && p.children.length) ? _c('nav-tree', {
      class: {
        'expand': p.isExpand
      },
      attrs: {
        "data": p.children,
        "hash": _vm.hash
      }
    }) : _vm._e(), _vm._v(" "), _c('i', {
      staticClass: "icon-circle-down",
      on: {
        "click": function($event) {
          p.isExpand = !p.isExpand
        }
      }
    })], 1)
  }))
},staticRenderFns: []}

/***/ }),

/***/ 390:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('nav', {
    class: {
      'active': _vm.isLoad
    }
  }, [_c('div', {
    staticClass: "label-nav"
  }, [_c('p', [_vm._v("标签")]), _vm._v(" "), _vm._l((_vm.labels), function(item) {
    return _c('router-link', {
      style: (_vm.getStyle(item)),
      attrs: {
        "to": '/label/' + item.name
      },
      nativeOn: {
        "click": function($event) {
          _vm.toggle(item)
        }
      }
    }, [_vm._v("\n                " + _vm._s(item.name) + "\n            ")])
  })], 2), _vm._v(" "), (_vm.paragraph && _vm.paragraph.length) ? _c('div', {
    staticClass: "content-nav"
  }, [_c('p', [_vm._v("文章目录")]), _vm._v(" "), _c('nav-tree', {
    attrs: {
      "data": _vm.paragraph,
      "hash": _vm.hash
    }
  })], 1) : _vm._e()])
},staticRenderFns: []}

/***/ }),

/***/ 391:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    ref: "app",
    attrs: {
      "id": "app"
    },
    on: {
      "scroll": _vm.onScrolling,
      "click": function($event) {
        _vm.isNav = false
      }
    }
  }, [_c('app-header'), _vm._v(" "), _c('section', {
    staticClass: "context"
  }, [_c('router-view', {
    ref: "context-view",
    attrs: {
      "issues": _vm.issues
    },
    on: {
      "loading": _vm.setLoading
    }
  }), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.loading),
      expression: "loading"
    }],
    staticClass: "loading-tips"
  }, [_c('div', {
    staticClass: "icon-spinner"
  }), _vm._v(" "), _c('p', [_vm._v("loading")])])], 1), _vm._v(" "), _c('div', {
    staticClass: "hidden-btns icon-circle-down",
    class: {
      'active': _vm.isNav
    },
    on: {
      "click": function($event) {
        $event.stopPropagation();
        _vm.isNav = !_vm.isNav
      }
    }
  }), _vm._v(" "), _c('app-nav', {
    ref: "app-nav",
    attrs: {
      "labels": _vm.labels
    }
  }), _vm._v(" "), _vm._m(0)], 1)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('footer', {
    staticClass: "main"
  }, [_c('p', [_vm._v("Powered By "), _c('a', {
    attrs: {
      "href": "http://github.com"
    }
  }, [_vm._v("Github")])])])
}]}

/***/ }),

/***/ 392:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('header', {
    staticClass: "main"
  }, [_c('div', {
    staticClass: "main-info"
  }, [_c('a', {
    attrs: {
      "href": _vm.user.html_url,
      "target": "_blank"
    }
  }, [_c('div', {
    staticClass: "main-avatar"
  }, [_c('img', {
    attrs: {
      "src": _vm.user.avatar_url
    }
  })]), _vm._v(" "), _c('font', [_vm._v(_vm._s(_vm.user.name || _vm.user.login))])], 1)]), _vm._v(" "), _c('div', {
    staticClass: "main-title"
  }, [_c('router-link', {
    attrs: {
      "to": '/'
    }
  }, [_vm._v(_vm._s(_vm.title))])], 1)])
},staticRenderFns: []}

/***/ }),

/***/ 52:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OWNER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return REPO; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return OAUTH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return TITLE; });
const OWNER = "RTM945";
const REPO = "RTM945.github.io";
const OAUTH = ['7acb793130f861037526', // client_id
'cfc65044375fcd5f9d30b1099f4938f84d0d2e3f'];

const TITLE = "RTM's Blog";



/***/ }),

/***/ 69:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(98);


/* harmony default export */ __webpack_exports__["a"] = (new __WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */]());

/***/ }),

/***/ 70:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const LS_ACCESS_TOKEN_KEY = 'gitment-comments-token';
/* harmony export (immutable) */ __webpack_exports__["a"] = LS_ACCESS_TOKEN_KEY;

const LS_USER_KEY = 'gitment-user-info';
/* harmony export (immutable) */ __webpack_exports__["b"] = LS_USER_KEY;


const NOT_INITIALIZED_ERROR = new Error('Comments Not Initialized');
/* harmony export (immutable) */ __webpack_exports__["c"] = NOT_INITIALIZED_ERROR;


/***/ }),

/***/ 71:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = getTargetContainer;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios__ = __webpack_require__(143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__constants__ = __webpack_require__(70);



const isString = s => toString.call(s) === '[object String]';
/* unused harmony export isString */


function getTargetContainer(container) {
    let targetContainer;
    if (container instanceof Element) {
        targetContainer = container;
    } else if (isString(container)) {
        targetContainer = document.getElementById(container);
    } else {
        targetContainer = document.createElement('div');
    }

    return targetContainer;
}

const Query = {
    parse(search = window.location.search) {
        if (!search) return {};
        const queryString = search[0] === '?' ? search.substring(1) : search;
        const query = {};
        queryString.split('&').forEach(queryStr => {
            const [key, value] = queryStr.split('=');
            if (key) query[key] = value;
        });

        return query;
    },
    stringify(query, prefix = '?') {
        const queryString = Object.keys(query).map(key => `${key}=${encodeURIComponent(query[key] || '')}`).join('&');
        return queryString ? prefix + queryString : '';
    }
};
/* harmony export (immutable) */ __webpack_exports__["c"] = Query;


function ajaxFactory(method) {
    return function (apiPath, data = {}, base = 'https://api.github.com') {
        const req = new XMLHttpRequest();
        const token = localStorage.getItem(__WEBPACK_IMPORTED_MODULE_1__constants__["a" /* LS_ACCESS_TOKEN_KEY */]);

        let url = `${base}${apiPath}`;
        let body = null;
        if (method === 'GET' || method === 'DELETE') {
            url += Query.stringify(data);
        }

        const p = new Promise((resolve, reject) => {
            req.addEventListener('load', () => {
                const contentType = req.getResponseHeader('content-type');
                const res = req.responseText;
                if (!/json/.test(contentType)) {
                    resolve(res);
                    return;
                }
                const data = req.responseText ? JSON.parse(res) : {};
                if (data.message) {
                    reject(new Error(data.message));
                } else {
                    resolve(data);
                }
            });
            req.addEventListener('error', error => reject(error));
        });

        req.open(method, url, true);

        req.setRequestHeader('Accept', 'application/vnd.github.squirrel-girl-preview, application/vnd.github.html+json');
        if (token) {
            req.setRequestHeader('Authorization', `token ${token}`);
        }
        if (method !== 'GET' && method !== 'DELETE') {
            body = JSON.stringify(data);
            req.setRequestHeader('Content-Type', 'application/json');
        }

        req.send(body);
        return p;
    };
}

function ajax(method) {
    return function (apiPath, data = {}, base = 'https://api.github.com') {
        const token = localStorage.getItem(__WEBPACK_IMPORTED_MODULE_1__constants__["a" /* LS_ACCESS_TOKEN_KEY */]);

        const axiosSettings = {
            url: apiPath,
            method: method,
            baseURL: base,
            responseType: "json",
            headers: {
                'Accept': 'application/vnd.github.squirrel-girl-preview, application/vnd.github.html+json'
            }
        };

        if (token) {
            axiosSettings.headers['Authorization'] = `token ${token}`;
        }

        if (data && method === 'get' || method === 'delete') {
            axiosSettings.url += Query.stringify(data);
        } else if (method === "post" || method === "put" || method === "patch") {
            axiosSettings.data = JSON.stringify(data);
            axiosSettings.headers['Content-Type'] = "application/json";
        }

        return __WEBPACK_IMPORTED_MODULE_0_axios___default()(axiosSettings).then(response => {
            // 只返回data，其他不返回
            return response.data;
        });
    };
}

/*export const http = {
    get: ajaxFactory('GET'),
    post: ajaxFactory('POST'),
    delete: ajaxFactory('DELETE'),
    put: ajaxFactory('PUT')
}*/

const http = {
    get: ajax('get'),
    post: ajax('post'),
    delete: ajax('delete'),
    put: ajax('put')
};
/* harmony export (immutable) */ __webpack_exports__["a"] = http;


/***/ })

},[171]);
//# sourceMappingURL=app.js.map?t=07fd74bf770176a664e4