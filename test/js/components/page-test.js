module('Component - page', {
    setup: function () {
        var self = this;
        this.components = {
            'page-text': {
                init: function () {},
                preload: function () {},
                load: function () {},
                enable: function () {},
                disable: function () {},
                unload: function () {}
            },
            'page-links': {
                init: function () {},
            },
            'page-svg': {
                init: function () {},
                load: function () {},
                preload: function () {},
                unload: function () {},
                prepare: function () {}
            }, 
            'page-img': {
                init: function () {},
                load: function () {},
                preload: function () {},
                unload: function () {},
                prepare: function () {}
            }
        };
        this.utilities = {
            support: {
                svg: true
            }
        };
        this.scope = Crocodoc.getScopeForTest(this);
        this.component = Crocodoc.getComponentForTest('page', this.scope);
    }
});

test('init() should create and init PageText, PageSVG, and PageLinks components when called', function () {
    var mockScope = this.mock(this.scope),
        mockPageText = this.mock(this.components['page-text']),
        mockPageSVG = this.mock(this.components['page-svg']),
        mockPageLinks = this.mock(this.components['page-links']),
        config = { links: [{}], enableLinks: true, index: 3, useSVG: true};

    mockScope.expects('createComponent')
        .returns(this.components['page-text'])
        .withArgs('page-text');
    mockScope.expects('createComponent')
        .returns(this.components['page-svg'])
        .withArgs('page-svg');
    mockScope.expects('createComponent')
        .returns(this.components['page-links'])
        .withArgs('page-links');

    mockPageText.expects('init')
        .withArgs(sinon.match.object, config.index + 1);
    mockPageSVG.expects('init')
        .withArgs(sinon.match.object, config.index + 1);
    mockPageLinks.expects('init')
        .withArgs(sinon.match.object, config.links);

    this.component.init($(), config);
});

//SVGs are not supported
test('init() should create and init PageText, PageIMG, and PageLinks components when called', function () {
    this.utilities.support.svg = false;
    var mockScope = this.mock(this.scope),
        mockPageText = this.mock(this.components['page-text']),
        mockPageIMG = this.mock(this.components['page-img']),
        mockPageLinks = this.mock(this.components['page-links']),
        config = { links: [{}], enableLinks: true, index: 3, useSVG: true};


    mockScope.expects('createComponent')
        .returns(this.components['page-text'])
        .withArgs('page-text');
    mockScope.expects('createComponent')
        .returns(this.components['page-img'])
        .withArgs('page-img');
    mockScope.expects('createComponent')
        .returns(this.components['page-links'])
        .withArgs('page-links');

    mockPageText.expects('init')
        .withArgs(sinon.match.object, config.index + 1);
    mockPageIMG.expects('init')
        .withArgs(sinon.match.object, config.index + 1);
    mockPageLinks.expects('init')
        .withArgs(sinon.match.object, config.links);

    this.component.init($(), config);
});


//useSVG is false
test('  init() should create and init PageText, PageIMG, and PageLinks components when called', function () {
    var mockScope = this.mock(this.scope),
        mockPageText = this.mock(this.components['page-text']),
        mockPageIMG = this.mock(this.components['page-img']),
        mockPageLinks = this.mock(this.components['page-links']),
        config = { links: [{}], enableLinks: true, index: 3, useSVG: false};

    mockScope.expects('createComponent')
        .returns(this.components['page-text'])
        .withArgs('page-text');
    mockScope.expects('createComponent')
        .returns(this.components['page-img'])
        .withArgs('page-img');
    mockScope.expects('createComponent')
        .returns(this.components['page-links'])
        .withArgs('page-links');

    mockPageText.expects('init')
        .withArgs(sinon.match.object, config.index + 1);
    mockPageIMG.expects('init')
        .withArgs(sinon.match.object, config.index + 1);
    mockPageLinks.expects('init')
        .withArgs(sinon.match.object, config.links);

    this.component.init($(), config);
});

test('onmessage() should call enableTextSelection() when called with message "textenabledchange", {enabled:true}', function () {
    this.mock(this.component)
        .expects('enableTextSelection');
    this.component.onmessage('textenabledchange', { enabled: true });
});

test('onmessage() should call disableTextSelection() when called with message "textenabledchange", {enabled:false}', function () {
    this.mock(this.component)
        .expects('disableTextSelection');
    this.component.onmessage('textenabledchange', { enabled: false });
});

test('preload() should preload svg and text when status is PAGE_STATUS_NOT_LOADED', function () {
    this.component.init($(), {
        status: PAGE_STATUS_NOT_LOADED
    });

    this.mock(this.components['page-svg'])
        .expects('preload');
    this.mock(this.components['page-text'])
        .expects('preload');
    this.component.preload();
});

//When SVGs are not supported
test('preload() should preload img and text when status is PAGE_STATUS_NOT_LOADED and SVGs are not supported', function () {
    this.utilities.support.svg = false;
    this.component.init($(), {
        status: PAGE_STATUS_NOT_LOADED
    });
    this.mock(this.components['page-img'])
        .expects('preload');
    this.mock(this.components['page-text'])
        .expects('preload');
    this.component.preload();
});

//When useSVG is false
test('preload() should preload img and text when status is PAGE_STATUS_NOT_LOADED and useSVG is false', function () {
    this.component.init($(), {
        status: PAGE_STATUS_NOT_LOADED,
        useSVG: false
    });

    this.mock(this.components['page-img'])
        .expects('preload');
    this.mock(this.components['page-text'])
        .expects('preload');
    this.component.preload();
});


//When SVGs are not supported and useSVG is false
test('preload() should preload img and text when status is PAGE_STATUS_NOT_LOADED and SVGs are not supported and useSVG is false', function () {
    this.utilities.support.svg = false;
    this.component.init($(), {
        status: PAGE_STATUS_NOT_LOADED,
        useSVG: false
    });

    this.mock(this.components['page-img'])
        .expects('preload');
    this.mock(this.components['page-text'])
        .expects('preload');
    this.component.preload();
});

test('preload() should not preload svg and text when status is not PAGE_STATUS_CONVERTING', function () {
    this.component.init($(), {
        status: PAGE_STATUS_CONVERTING
    });

    this.mock(this.components['page-svg'])
        .expects('preload')
        .never();
    this.mock(this.components['page-text'])
        .expects('preload')
        .never();
    this.component.preload();
});

//SVGs not supported
test('preload() should not preload img and text when status is not PAGE_STATUS_CONVERTING and SVGs are not supported', function () {
    this.utilities.support.svg = false;
    this.component.init($(), {
        status: PAGE_STATUS_CONVERTING
    });

    this.mock(this.components['page-img'])
        .expects('preload')
        .never();
    this.mock(this.components['page-text'])
        .expects('preload')
        .never();
    this.component.preload();
});

//useSVG is false
test('preload() should not preload img and text when status is not PAGE_STATUS_CONVERTING and useSVG is false', function () {
    this.component.init($(), {
        status: PAGE_STATUS_CONVERTING,
        useSVG: false
    });

    this.mock(this.components['page-img'])
        .expects('preload')
        .never();
    this.mock(this.components['page-text'])
        .expects('preload')
        .never();
    this.component.preload();
});

//when SVGs are not supported and useSVG is false
test('preload() should not preload img and text when status is not PAGE_STATUS_CONVERTING and useSVG is false', function () {
    this.utilities.support.svg = false;
    this.component.init($(), {
        status: PAGE_STATUS_CONVERTING,
        useSVG: false
    });

    this.mock(this.components['page-img'])
        .expects('preload')
        .never();
    this.mock(this.components['page-text'])
        .expects('preload')
        .never();
    this.component.preload();
});

test('load() should not call pageSVG.load() when page is in an error state', function () {
    this.component.init($(), {
        status: PAGE_STATUS_ERROR
    });

    this.mock(this.components['page-svg'])
        .expects('load')
        .never();
    this.component.load();
});

//When SVGs are not supported
test('load() should not call pageIMG.load() when page is in an error state', function () {
    this.utilities.support.svg = false;
    this.component.init($(), {
        status: PAGE_STATUS_ERROR
    });

    this.mock(this.components['page-img'])
        .expects('load')
        .never();
    this.component.load();
});

//When useSVG is false
test('load() should not call pageIMG.load() when page is in an error state', function () {
    this.component.init($(), {
        status: PAGE_STATUS_ERROR,
        useSVG: false
    });

    this.mock(this.components['page-img'])
        .expects('load')
        .never();
    this.component.load();
});

//When SVGs are not supported and useSVG is false
test('load() should not call pageIMG.load() when page is in an error state', function () {
    this.utilities.support.svg = false;
    this.component.init($(), {
        status: PAGE_STATUS_ERROR,
        useSVG: false
    });

    this.mock(this.components['page-img'])
        .expects('load')
        .never();
    this.component.load();
});

test('load() should not call pageSVG.load() when page is converting', function () {
    this.component.init($(), {
        status: PAGE_STATUS_CONVERTING
    });

    this.mock(this.components['page-svg'])
        .expects('load')
        .never();
    this.component.load();
});

//when SVGs are not supported
test('load() should not call pageIMG.load() when page is converting', function () {
    this.utilities.support.svg = false;
    this.component.init($(), {
        status: PAGE_STATUS_CONVERTING
    });

    this.mock(this.components['page-img'])
        .expects('load')
        .never();
    this.component.load();
});

//when useSVG is false
test('load() should not call pageIMG.load() when page is converting', function () {
    this.component.init($(), {
        status: PAGE_STATUS_CONVERTING,
        useSVG: false
    });

    this.mock(this.components['page-img'])
        .expects('load')
        .never();
    this.component.load();
});

//when SVGs are not supported and useSVG is false
test('load() should not call pageIMG.load() when page is converting', function () {
    this.utilities.support.svg = false;
    this.component.init($(), {
        status: PAGE_STATUS_CONVERTING,
        useSVG: false
    });

    this.mock(this.components['page-img'])
        .expects('load')
        .never();
    this.component.load();
});

test('load() should call pageSVG.load() when page is not loaded', function () {
    this.component.init($(), {
        status: PAGE_STATUS_NOT_LOADED
    });

    this.mock(this.components['page-svg'])
        .expects('load');
    this.component.load();
});

//when SVGs are not supported 
test('load() should call pageSVG.load() when page is not loaded', function () {
    this.utilities.support.svg = false;
    this.component.init($(), {
        status: PAGE_STATUS_NOT_LOADED
    });

    this.mock(this.components['page-img'])
        .expects('load');

    //SVGs should not be loaded
    this.mock(this.components['page-svg'])
        .expects('load')
        .never();

    this.component.load();
});

//when useSVG is false
test('load() should call pageSVG.load() when page is not loaded', function () {
    this.component.init($(), {
        status: PAGE_STATUS_NOT_LOADED,
        useSVG: false
    });

    this.mock(this.components['page-img'])
        .expects('load');

    //SVGs should not be loaded
    this.mock(this.components['page-svg'])
        .expects('load')
        .never();

    this.component.load();
});

//when SVGs are not supported and useSVG is false
test('load() should call pageSVG.load() when page is not loaded', function () {
    this.utilities.support.svg = false;
    this.component.init($(), {
        status: PAGE_STATUS_NOT_LOADED,
        useSVG: false
    });

    this.mock(this.components['page-img'])
        .expects('load');

    //SVGs should not be loaded
    this.mock(this.components['page-svg'])
        .expects('load')
        .never();

    this.component.load();
});

test('load() should broadcast "pageload" message when page is loaded', function () {
    this.component.init($(), {
        status: PAGE_STATUS_NOT_LOADED,
        index: 0
    });

    this.mock(this.scope)
        .expects('broadcast')
        .withArgs('pageload', sinon.match.has('page', 1));
    this.component.load();
});

test('load() should call pageText.load() when called and the page should be loaded', function () {
    this.component.init($(), {
        status: PAGE_STATUS_NOT_LOADED,
        index: 0
    });

    this.mock(this.components['page-text'])
        .expects('load');
    this.component.load();
});

//pageText.load() should still be called if SVGs are not supported or useSVG is false
test('load() should call pageText.load() when called and the page should be loaded', function () {
    this.utilities.support.svg = false;
    this.component.init($(), {
        status: PAGE_STATUS_NOT_LOADED,
        index: 0,
        useSVG: false
    });

    this.mock(this.components['page-text'])
        .expects('load');
    this.component.load();
});

test('load() should broadcast pagefail when the page fails to load', function () {
    var error = { error: 'my error message' },
        index = 4;

    this.component.init($(), {
        index: index,
        status: PAGE_STATUS_NOT_LOADED
    });

    var $promise = $.Deferred().reject(error).promise();
    this.mock(this.scope)
        .expects('broadcast')
        .withArgs('pagefail', { page: index + 1, error: sinon.match(error) });

    this.mock(this.components['page-svg'])
        .expects('load')
        .returns($promise);

    this.component.load();
});

//Same behavior should occur with imgs when SVGs are not supported
test('load() should broadcast pagefail when the page fails to load', function () {
    this.utilities.support.svg = false;
    var error = { error: 'my error message' },
        index = 4;

    this.component.init($(), {
        index: index,
        status: PAGE_STATUS_NOT_LOADED,
    });

    var $promise = $.Deferred().reject(error).promise();
    this.mock(this.scope)
        .expects('broadcast')
        .withArgs('pagefail', { page: index + 1, error: sinon.match(error) });

    this.mock(this.components['page-img'])
        .expects('load')
        .returns($promise);

    this.component.load();
});

//Same behavior should occur with imgs when useSVG is false
test('load() should broadcast pagefail when the page fails to load', function () {
    var error = { error: 'my error message' },
        index = 4;

    this.component.init($(), {
        index: index,
        status: PAGE_STATUS_NOT_LOADED,
        useSVG: false
    });

    var $promise = $.Deferred().reject(error).promise();
    this.mock(this.scope)
        .expects('broadcast')
        .withArgs('pagefail', { page: index + 1, error: sinon.match(error) });

    this.mock(this.components['page-img'])
        .expects('load')
        .returns($promise);

    this.component.load();
});

//Same behavior should occur with imgs when SVGs are not supported and useSVG is false
test('load() should broadcast pagefail when the page fails to load', function () {
    this.utilities.support.svg = false;
    var error = { error: 'my error message' },
        index = 4;

    this.component.init($(), {
        index: index,
        status: PAGE_STATUS_NOT_LOADED,
        useSVG: false
    });

    var $promise = $.Deferred().reject(error).promise();
    this.mock(this.scope)
        .expects('broadcast')
        .withArgs('pagefail', { page: index + 1, error: sinon.match(error) });

    this.mock(this.components['page-img'])
        .expects('load')
        .returns($promise);

    this.component.load();
});

test('unload() should unload svg and text layers only when called when status is PAGE_STATUS_LOADED', function () {
    var mock = this.mock(this.components['page-svg']);
    this.component.init($(), {
        status: PAGE_STATUS_LOADED,
        index: 0
    });

    this.mock(this.components['page-svg'])
        .expects('unload');
    this.mock(this.components['page-text'])
        .expects('unload');

    this.component.unload();
});

//unload() should unload the img and text layers when SVGs are not supported
test('unload() should unload img and text layers only when called when status is PAGE_STATUS_LOADED', function () {
    this.utilities.support.svg = false;
    var mock = this.mock(this.components['page-img']);
    this.component.init($(), {
        status: PAGE_STATUS_LOADED,
        index: 0
    });

    this.mock(this.components['page-img'])
        .expects('unload');
    this.mock(this.components['page-text'])
        .expects('unload');

    this.component.unload();
});

//unload() should unload the img and text layers when useSVG is false
test('unload() should unload img and text layers only when called when status is PAGE_STATUS_LOADED', function () {
    var mock = this.mock(this.components['page-img']);
    this.component.init($(), {
        status: PAGE_STATUS_LOADED,
        index: 0,
        useSVG: false
    });

    this.mock(this.components['page-img'])
        .expects('unload');
    this.mock(this.components['page-text'])
        .expects('unload');

    this.component.unload();
});

//unload() should unload the img and text layers when useSVG is false and SVGs are not supported
test('unload() should unload img and text layers only when called when status is PAGE_STATUS_LOADED', function () {
    this.utilities.support.svg = false;
    var mock = this.mock(this.components['page-img']);
    this.component.init($(), {
        status: PAGE_STATUS_LOADED,
        index: 0,
        useSVG: false
    });

    this.mock(this.components['page-img'])
        .expects('unload');
    this.mock(this.components['page-text'])
        .expects('unload');

    this.component.unload();
});

test('unload() should broadcast "pageunload" only when called when status is PAGE_STATUS_LOADED', function () {
    var mock = this.mock(this.scope);
    this.component.init($(), {
        status: PAGE_STATUS_LOADED,
        index: 0
    });

    mock.expects('broadcast')
        .withArgs('pageunload', sinon.match.has('page', 1));

    this.component.unload();

    // status should now be PAGE_STATUS_NOT_LOADED

    mock.expects('broadcast')
        .never();

    this.component.unload();
});

//same behavior should occur when SVGs are not supported
test('unload() should broadcast "pageunload" only when called when status is PAGE_STATUS_LOADED', function () {
    this.utilities.support.svg = false;
    var mock = this.mock(this.scope);
    this.component.init($(), {
        status: PAGE_STATUS_LOADED,
        index: 0
    });

    mock.expects('broadcast')
        .withArgs('pageunload', sinon.match.has('page', 1));

    this.component.unload();

    // status should now be PAGE_STATUS_NOT_LOADED

    mock.expects('broadcast')
        .never();

    this.component.unload();
});

//same behavior should occur when useSVG if false
test('unload() should broadcast "pageunload" only when called when status is PAGE_STATUS_LOADED', function () {
    var mock = this.mock(this.scope);
    this.component.init($(), {
        status: PAGE_STATUS_LOADED,
        index: 0,
        useSVG: false
    });

    mock.expects('broadcast')
        .withArgs('pageunload', sinon.match.has('page', 1));

    this.component.unload();

    // status should now be PAGE_STATUS_NOT_LOADED

    mock.expects('broadcast')
        .never();

    this.component.unload();
});

test('enableTextSelection() should call pageText.enable() when called', function () {
    this.component.init($(), {});
    this.mock(this.components['page-text'])
        .expects('enable');
    this.component.enableTextSelection();
});

test('enableTextSelection() should call pageText.load() when called and the page is visible', function () {
    this.component.init($(), { index: 0 });
    this.component.onmessage('pagefocus', { page: 1 });
    this.mock(this.components['page-text'])
        .expects('load');
    this.component.enableTextSelection();
});

test('disableTextSelection() should call pageText.disable() when called', function () {
    this.component.init($(), {});
    this.mock(this.components['page-text'])
        .expects('disable');
    this.component.disableTextSelection();
});
