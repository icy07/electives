(() => {
    var __webpack_modules__ = {
        124: (module, __unused_webpack_exports, __webpack_require__) => {
            var root = __webpack_require__(325);
            var now = function() {
                return root.Date.now();
            };
            module.exports = now;
        },
        128: (module, __unused_webpack_exports, __webpack_require__) => {
            var trimmedEndIndex = __webpack_require__(800);
            var reTrimStart = /^\s+/;
            function baseTrim(string) {
                return string ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, "") : string;
            }
            module.exports = baseTrim;
        },
        221: (module, __unused_webpack_exports, __webpack_require__) => {
            var isObject = __webpack_require__(805), now = __webpack_require__(124), toNumber = __webpack_require__(374);
            var FUNC_ERROR_TEXT = "Expected a function";
            var nativeMax = Math.max, nativeMin = Math.min;
            function debounce(func, wait, options) {
                var lastArgs, lastThis, maxWait, result, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
                if (typeof func != "function") throw new TypeError(FUNC_ERROR_TEXT);
                wait = toNumber(wait) || 0;
                if (isObject(options)) {
                    leading = !!options.leading;
                    maxing = "maxWait" in options;
                    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
                    trailing = "trailing" in options ? !!options.trailing : trailing;
                }
                function invokeFunc(time) {
                    var args = lastArgs, thisArg = lastThis;
                    lastArgs = lastThis = void 0;
                    lastInvokeTime = time;
                    result = func.apply(thisArg, args);
                    return result;
                }
                function leadingEdge(time) {
                    lastInvokeTime = time;
                    timerId = setTimeout(timerExpired, wait);
                    return leading ? invokeFunc(time) : result;
                }
                function remainingWait(time) {
                    var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, timeWaiting = wait - timeSinceLastCall;
                    return maxing ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
                }
                function shouldInvoke(time) {
                    var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
                    return lastCallTime === void 0 || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
                }
                function timerExpired() {
                    var time = now();
                    if (shouldInvoke(time)) return trailingEdge(time);
                    timerId = setTimeout(timerExpired, remainingWait(time));
                }
                function trailingEdge(time) {
                    timerId = void 0;
                    if (trailing && lastArgs) return invokeFunc(time);
                    lastArgs = lastThis = void 0;
                    return result;
                }
                function cancel() {
                    if (timerId !== void 0) clearTimeout(timerId);
                    lastInvokeTime = 0;
                    lastArgs = lastCallTime = lastThis = timerId = void 0;
                }
                function flush() {
                    return timerId === void 0 ? result : trailingEdge(now());
                }
                function debounced() {
                    var time = now(), isInvoking = shouldInvoke(time);
                    lastArgs = arguments;
                    lastThis = this;
                    lastCallTime = time;
                    if (isInvoking) {
                        if (timerId === void 0) return leadingEdge(lastCallTime);
                        if (maxing) {
                            clearTimeout(timerId);
                            timerId = setTimeout(timerExpired, wait);
                            return invokeFunc(lastCallTime);
                        }
                    }
                    if (timerId === void 0) timerId = setTimeout(timerExpired, wait);
                    return result;
                }
                debounced.cancel = cancel;
                debounced.flush = flush;
                return debounced;
            }
            module.exports = debounce;
        },
        325: (module, __unused_webpack_exports, __webpack_require__) => {
            var freeGlobal = __webpack_require__(840);
            var freeSelf = typeof self == "object" && self && self.Object === Object && self;
            var root = freeGlobal || freeSelf || Function("return this")();
            module.exports = root;
        },
        346: module => {
            function isObjectLike(value) {
                return value != null && typeof value == "object";
            }
            module.exports = isObjectLike;
        },
        350: module => {
            var objectProto = Object.prototype;
            var nativeObjectToString = objectProto.toString;
            function objectToString(value) {
                return nativeObjectToString.call(value);
            }
            module.exports = objectToString;
        },
        374: (module, __unused_webpack_exports, __webpack_require__) => {
            var baseTrim = __webpack_require__(128), isObject = __webpack_require__(805), isSymbol = __webpack_require__(394);
            var NAN = 0 / 0;
            var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
            var reIsBinary = /^0b[01]+$/i;
            var reIsOctal = /^0o[0-7]+$/i;
            var freeParseInt = parseInt;
            function toNumber(value) {
                if (typeof value == "number") return value;
                if (isSymbol(value)) return NAN;
                if (isObject(value)) {
                    var other = typeof value.valueOf == "function" ? value.valueOf() : value;
                    value = isObject(other) ? other + "" : other;
                }
                if (typeof value != "string") return value === 0 ? value : +value;
                value = baseTrim(value);
                var isBinary = reIsBinary.test(value);
                return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
            }
            module.exports = toNumber;
        },
        394: (module, __unused_webpack_exports, __webpack_require__) => {
            var baseGetTag = __webpack_require__(552), isObjectLike = __webpack_require__(346);
            var symbolTag = "[object Symbol]";
            function isSymbol(value) {
                return typeof value == "symbol" || isObjectLike(value) && baseGetTag(value) == symbolTag;
            }
            module.exports = isSymbol;
        },
        552: (module, __unused_webpack_exports, __webpack_require__) => {
            var Symbol = __webpack_require__(873), getRawTag = __webpack_require__(659), objectToString = __webpack_require__(350);
            var nullTag = "[object Null]", undefinedTag = "[object Undefined]";
            var symToStringTag = Symbol ? Symbol.toStringTag : void 0;
            function baseGetTag(value) {
                if (value == null) return value === void 0 ? undefinedTag : nullTag;
                return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
            }
            module.exports = baseGetTag;
        },
        659: (module, __unused_webpack_exports, __webpack_require__) => {
            var Symbol = __webpack_require__(873);
            var objectProto = Object.prototype;
            var hasOwnProperty = objectProto.hasOwnProperty;
            var nativeObjectToString = objectProto.toString;
            var symToStringTag = Symbol ? Symbol.toStringTag : void 0;
            function getRawTag(value) {
                var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
                try {
                    value[symToStringTag] = void 0;
                    var unmasked = true;
                } catch (e) {}
                var result = nativeObjectToString.call(value);
                if (unmasked) if (isOwn) value[symToStringTag] = tag; else delete value[symToStringTag];
                return result;
            }
            module.exports = getRawTag;
        },
        800: module => {
            var reWhitespace = /\s/;
            function trimmedEndIndex(string) {
                var index = string.length;
                while (index-- && reWhitespace.test(string.charAt(index))) ;
                return index;
            }
            module.exports = trimmedEndIndex;
        },
        805: module => {
            function isObject(value) {
                var type = typeof value;
                return value != null && (type == "object" || type == "function");
            }
            module.exports = isObject;
        },
        840: (module, __unused_webpack_exports, __webpack_require__) => {
            var freeGlobal = typeof __webpack_require__.g == "object" && __webpack_require__.g && __webpack_require__.g.Object === Object && __webpack_require__.g;
            module.exports = freeGlobal;
        },
        873: (module, __unused_webpack_exports, __webpack_require__) => {
            var root = __webpack_require__(325);
            var Symbol = root.Symbol;
            module.exports = Symbol;
        },
        969: (module, __unused_webpack_exports, __webpack_require__) => {
            var debounce = __webpack_require__(221), isObject = __webpack_require__(805);
            var FUNC_ERROR_TEXT = "Expected a function";
            function throttle(func, wait, options) {
                var leading = true, trailing = true;
                if (typeof func != "function") throw new TypeError(FUNC_ERROR_TEXT);
                if (isObject(options)) {
                    leading = "leading" in options ? !!options.leading : leading;
                    trailing = "trailing" in options ? !!options.trailing : trailing;
                }
                return debounce(func, wait, {
                    leading,
                    maxWait: wait,
                    trailing
                });
            }
            module.exports = throttle;
        }
    };
    var __webpack_module_cache__ = {};
    function __webpack_require__(moduleId) {
        var cachedModule = __webpack_module_cache__[moduleId];
        if (cachedModule !== void 0) return cachedModule.exports;
        var module = __webpack_module_cache__[moduleId] = {
            exports: {}
        };
        __webpack_modules__[moduleId](module, module.exports, __webpack_require__);
        return module.exports;
    }
    (() => {
        __webpack_require__.g = function() {
            if (typeof globalThis === "object") return globalThis;
            try {
                return this || new Function("return this")();
            } catch (e) {
                if (typeof window === "object") return window;
            }
        }();
    })();
    (() => {
        "use strict";
        const modules_flsModules = {};
        function isWebp() {
            function testWebP(callback) {
                let webP = new Image;
                webP.onload = webP.onerror = function() {
                    callback(webP.height == 2);
                };
                webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
            }
            testWebP((function(support) {
                let className = support === true ? "webp" : "no-webp";
                document.documentElement.classList.add(className);
            }));
        }
        function getHash() {
            if (location.hash) return location.hash.replace("#", "");
        }
        let _slideUp = (target, duration = 500, showmore = 0) => {
            if (!target.classList.contains("_slide")) {
                target.classList.add("_slide");
                target.style.transitionProperty = "height, margin, padding";
                target.style.transitionDuration = duration + "ms";
                target.style.height = `${target.offsetHeight}px`;
                target.offsetHeight;
                target.style.overflow = "hidden";
                target.style.height = showmore ? `${showmore}px` : `0px`;
                target.style.paddingTop = 0;
                target.style.paddingBottom = 0;
                target.style.marginTop = 0;
                target.style.marginBottom = 0;
                window.setTimeout((() => {
                    target.hidden = !showmore ? true : false;
                    !showmore ? target.style.removeProperty("height") : null;
                    target.style.removeProperty("padding-top");
                    target.style.removeProperty("padding-bottom");
                    target.style.removeProperty("margin-top");
                    target.style.removeProperty("margin-bottom");
                    !showmore ? target.style.removeProperty("overflow") : null;
                    target.style.removeProperty("transition-duration");
                    target.style.removeProperty("transition-property");
                    target.classList.remove("_slide");
                    document.dispatchEvent(new CustomEvent("slideUpDone", {
                        detail: {
                            target
                        }
                    }));
                }), duration);
            }
        };
        let _slideDown = (target, duration = 500, showmore = 0) => {
            if (!target.classList.contains("_slide")) {
                target.classList.add("_slide");
                target.hidden = target.hidden ? false : null;
                showmore ? target.style.removeProperty("height") : null;
                let height = target.offsetHeight;
                target.style.overflow = "hidden";
                target.style.height = showmore ? `${showmore}px` : `0px`;
                target.style.paddingTop = 0;
                target.style.paddingBottom = 0;
                target.style.marginTop = 0;
                target.style.marginBottom = 0;
                target.offsetHeight;
                target.style.transitionProperty = "height, margin, padding";
                target.style.transitionDuration = duration + "ms";
                target.style.height = height + "px";
                target.style.removeProperty("padding-top");
                target.style.removeProperty("padding-bottom");
                target.style.removeProperty("margin-top");
                target.style.removeProperty("margin-bottom");
                window.setTimeout((() => {
                    target.style.removeProperty("height");
                    target.style.removeProperty("overflow");
                    target.style.removeProperty("transition-duration");
                    target.style.removeProperty("transition-property");
                    target.classList.remove("_slide");
                    document.dispatchEvent(new CustomEvent("slideDownDone", {
                        detail: {
                            target
                        }
                    }));
                }), duration);
            }
        };
        let _slideToggle = (target, duration = 500) => {
            if (target.hidden) return _slideDown(target, duration); else return _slideUp(target, duration);
        };
        let bodyLockStatus = true;
        let bodyLockToggle = (delay = 0) => {
            if (document.documentElement.classList.contains("lock")) bodyUnlock(delay); else bodyLock(delay);
        };
        let bodyUnlock = (delay = 0) => {
            let body = document.querySelector("body");
            if (bodyLockStatus) {
                let lock_padding = document.querySelectorAll("[data-lp]");
                setTimeout((() => {
                    for (let index = 0; index < lock_padding.length; index++) {
                        const el = lock_padding[index];
                        el.style.paddingRight = "0px";
                    }
                    body.style.paddingRight = "0px";
                    document.documentElement.classList.remove("lock");
                }), delay);
                bodyLockStatus = false;
                setTimeout((function() {
                    bodyLockStatus = true;
                }), delay);
            }
        };
        let bodyLock = (delay = 0) => {
            let body = document.querySelector("body");
            if (bodyLockStatus) {
                let lock_padding = document.querySelectorAll("[data-lp]");
                for (let index = 0; index < lock_padding.length; index++) {
                    const el = lock_padding[index];
                    el.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
                }
                body.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
                document.documentElement.classList.add("lock");
                bodyLockStatus = false;
                setTimeout((function() {
                    bodyLockStatus = true;
                }), delay);
            }
        };
        function spollers() {
            const spollersArray = document.querySelectorAll("[data-spollers]");
            if (spollersArray.length > 0) {
                const spollersRegular = Array.from(spollersArray).filter((function(item, index, self) {
                    return !item.dataset.spollers.split(",")[0];
                }));
                if (spollersRegular.length) initSpollers(spollersRegular);
                let mdQueriesArray = dataMediaQueries(spollersArray, "spollers");
                if (mdQueriesArray && mdQueriesArray.length) mdQueriesArray.forEach((mdQueriesItem => {
                    mdQueriesItem.matchMedia.addEventListener("change", (function() {
                        initSpollers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
                    }));
                    initSpollers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
                }));
                function initSpollers(spollersArray, matchMedia = false) {
                    spollersArray.forEach((spollersBlock => {
                        spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
                        if (matchMedia.matches || !matchMedia) {
                            spollersBlock.classList.add("_spoller-init");
                            initSpollerBody(spollersBlock);
                            spollersBlock.addEventListener("click", setSpollerAction);
                        } else {
                            spollersBlock.classList.remove("_spoller-init");
                            initSpollerBody(spollersBlock, false);
                            spollersBlock.removeEventListener("click", setSpollerAction);
                        }
                    }));
                }
                function initSpollerBody(spollersBlock, hideSpollerBody = true) {
                    let spollerTitles = spollersBlock.querySelectorAll("[data-spoller]");
                    if (spollerTitles.length) {
                        spollerTitles = Array.from(spollerTitles).filter((item => item.closest("[data-spollers]") === spollersBlock));
                        spollerTitles.forEach((spollerTitle => {
                            if (hideSpollerBody) {
                                spollerTitle.removeAttribute("tabindex");
                                if (!spollerTitle.classList.contains("_spoller-active")) spollerTitle.nextElementSibling.hidden = true;
                            } else {
                                spollerTitle.setAttribute("tabindex", "-1");
                                spollerTitle.nextElementSibling.hidden = false;
                            }
                        }));
                    }
                }
                function setSpollerAction(e) {
                    const el = e.target;
                    if (el.closest("[data-spoller]")) {
                        const spollerTitle = el.closest("[data-spoller]");
                        const spollersBlock = spollerTitle.closest("[data-spollers]");
                        const oneSpoller = spollersBlock.hasAttribute("data-one-spoller");
                        const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
                        if (!spollersBlock.querySelectorAll("._slide").length) {
                            if (oneSpoller && !spollerTitle.classList.contains("_spoller-active")) hideSpollersBody(spollersBlock);
                            spollerTitle.classList.toggle("_spoller-active");
                            _slideToggle(spollerTitle.nextElementSibling, spollerSpeed);
                        }
                        e.preventDefault();
                    }
                }
                function hideSpollersBody(spollersBlock) {
                    const spollerActiveTitle = spollersBlock.querySelector("[data-spoller]._spoller-active");
                    const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
                    if (spollerActiveTitle && !spollersBlock.querySelectorAll("._slide").length) {
                        spollerActiveTitle.classList.remove("_spoller-active");
                        _slideUp(spollerActiveTitle.nextElementSibling, spollerSpeed);
                    }
                }
                const spollersClose = document.querySelectorAll("[data-spoller-close]");
                if (spollersClose.length) document.addEventListener("click", (function(e) {
                    const el = e.target;
                    if (!el.closest("[data-spollers]")) spollersClose.forEach((spollerClose => {
                        const spollersBlock = spollerClose.closest("[data-spollers]");
                        const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
                        if (!spollersBlock.querySelectorAll("._slide").length) {
                            spollerClose.classList.remove("_spoller-active");
                            _slideUp(spollerClose.nextElementSibling, spollerSpeed);
                        }
                    }));
                }));
            }
        }
        function menuInit() {
            let iconMenu = document.querySelector(".icon-menu");
            let menuBody = document.querySelector(".menu__body");
            if (iconMenu) document.addEventListener("click", (function(e) {
                if (bodyLockStatus && e.target.closest(".icon-menu")) {
                    document.documentElement.classList.toggle("menu-open");
                    bodyLockToggle();
                }
                if (document.documentElement.classList.contains("menu-open")) if (!iconMenu.contains(e.target) && !menuBody.contains(e.target)) {
                    document.documentElement.classList.remove("menu-open");
                    bodyUnlock();
                }
            }));
        }
        function menuClose() {
            bodyUnlock();
            document.documentElement.classList.remove("menu-open");
        }
        function functions_FLS(message) {
            setTimeout((() => {
                if (window.FLS) console.log(message);
            }), 0);
        }
        function uniqArray(array) {
            return array.filter((function(item, index, self) {
                return self.indexOf(item) === index;
            }));
        }
        function dataMediaQueries(array, dataSetValue) {
            const media = Array.from(array).filter((function(item, index, self) {
                if (item.dataset[dataSetValue]) return item.dataset[dataSetValue].split(",")[0];
            }));
            if (media.length) {
                const breakpointsArray = [];
                media.forEach((item => {
                    const params = item.dataset[dataSetValue];
                    const breakpoint = {};
                    const paramsArray = params.split(",");
                    breakpoint.value = paramsArray[0];
                    breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
                    breakpoint.item = item;
                    breakpointsArray.push(breakpoint);
                }));
                let mdQueries = breakpointsArray.map((function(item) {
                    return "(" + item.type + "-width: " + item.value + "px)," + item.value + "," + item.type;
                }));
                mdQueries = uniqArray(mdQueries);
                const mdQueriesArray = [];
                if (mdQueries.length) {
                    mdQueries.forEach((breakpoint => {
                        const paramsArray = breakpoint.split(",");
                        const mediaBreakpoint = paramsArray[1];
                        const mediaType = paramsArray[2];
                        const matchMedia = window.matchMedia(paramsArray[0]);
                        const itemsArray = breakpointsArray.filter((function(item) {
                            if (item.value === mediaBreakpoint && item.type === mediaType) return true;
                        }));
                        mdQueriesArray.push({
                            itemsArray,
                            matchMedia
                        });
                    }));
                    return mdQueriesArray;
                }
            }
        }
        class Popup {
            constructor(options) {
                let config = {
                    logging: true,
                    init: true,
                    attributeOpenButton: "data-popup",
                    attributeCloseButton: "data-close",
                    fixElementSelector: "[data-lp]",
                    youtubeAttribute: "data-popup-youtube",
                    youtubePlaceAttribute: "data-popup-youtube-place",
                    setAutoplayYoutube: true,
                    classes: {
                        popup: "popup",
                        popupContent: "popup__content",
                        popupActive: "popup_show",
                        bodyActive: "popup-show"
                    },
                    focusCatch: true,
                    closeEsc: true,
                    bodyLock: true,
                    hashSettings: {
                        location: true,
                        goHash: true
                    },
                    on: {
                        beforeOpen: function() {},
                        afterOpen: function() {},
                        beforeClose: function() {},
                        afterClose: function() {}
                    }
                };
                this.youTubeCode;
                this.isOpen = false;
                this.targetOpen = {
                    selector: false,
                    element: false
                };
                this.previousOpen = {
                    selector: false,
                    element: false
                };
                this.lastClosed = {
                    selector: false,
                    element: false
                };
                this._dataValue = false;
                this.hash = false;
                this._reopen = false;
                this._selectorOpen = false;
                this.lastFocusEl = false;
                this._focusEl = [ "a[href]", 'input:not([disabled]):not([type="hidden"]):not([aria-hidden])', "button:not([disabled]):not([aria-hidden])", "select:not([disabled]):not([aria-hidden])", "textarea:not([disabled]):not([aria-hidden])", "area[href]", "iframe", "object", "embed", "[contenteditable]", '[tabindex]:not([tabindex^="-"])' ];
                this.options = {
                    ...config,
                    ...options,
                    classes: {
                        ...config.classes,
                        ...options?.classes
                    },
                    hashSettings: {
                        ...config.hashSettings,
                        ...options?.hashSettings
                    },
                    on: {
                        ...config.on,
                        ...options?.on
                    }
                };
                this.bodyLock = false;
                this.options.init ? this.initPopups() : null;
            }
            initPopups() {
                this.popupLogging(`Проснулся`);
                this.eventsPopup();
            }
            eventsPopup() {
                document.addEventListener("click", function(e) {
                    const buttonOpen = e.target.closest(`[${this.options.attributeOpenButton}]`);
                    if (buttonOpen) {
                        e.preventDefault();
                        this._dataValue = buttonOpen.getAttribute(this.options.attributeOpenButton) ? buttonOpen.getAttribute(this.options.attributeOpenButton) : "error";
                        this.youTubeCode = buttonOpen.getAttribute(this.options.youtubeAttribute) ? buttonOpen.getAttribute(this.options.youtubeAttribute) : null;
                        if (this._dataValue !== "error") {
                            if (!this.isOpen) this.lastFocusEl = buttonOpen;
                            this.targetOpen.selector = `${this._dataValue}`;
                            this._selectorOpen = true;
                            this.open();
                            return;
                        } else this.popupLogging(`Ой ой, не заполнен атрибут у ${buttonOpen.classList}`);
                        return;
                    }
                    const buttonClose = e.target.closest(`[${this.options.attributeCloseButton}]`);
                    if (buttonClose || !e.target.closest(`.${this.options.classes.popupContent}`) && this.isOpen) {
                        e.preventDefault();
                        this.close();
                        return;
                    }
                }.bind(this));
                document.addEventListener("keydown", function(e) {
                    if (this.options.closeEsc && e.which == 27 && e.code === "Escape" && this.isOpen) {
                        e.preventDefault();
                        this.close();
                        return;
                    }
                    if (this.options.focusCatch && e.which == 9 && this.isOpen) {
                        this._focusCatch(e);
                        return;
                    }
                }.bind(this));
                if (this.options.hashSettings.goHash) {
                    window.addEventListener("hashchange", function() {
                        if (window.location.hash) this._openToHash(); else this.close(this.targetOpen.selector);
                    }.bind(this));
                    window.addEventListener("load", function() {
                        if (window.location.hash) this._openToHash();
                    }.bind(this));
                }
            }
            open(selectorValue) {
                if (bodyLockStatus) {
                    this.bodyLock = document.documentElement.classList.contains("lock") ? true : false;
                    if (selectorValue && typeof selectorValue === "string" && selectorValue.trim() !== "") {
                        this.targetOpen.selector = selectorValue;
                        this._selectorOpen = true;
                    }
                    if (this.isOpen) {
                        this._reopen = true;
                        this.close();
                    }
                    if (!this._selectorOpen) this.targetOpen.selector = this.lastClosed.selector;
                    if (!this._reopen) this.previousActiveElement = document.activeElement;
                    this.targetOpen.element = document.querySelector(this.targetOpen.selector);
                    if (this.targetOpen.element) {
                        if (this.options.hashSettings.location) {
                            this._getHash();
                            this._setHash();
                        }
                        this.options.on.beforeOpen(this);
                        document.dispatchEvent(new CustomEvent("beforePopupOpen", {
                            detail: {
                                popup: this
                            }
                        }));
                        this.targetOpen.element.classList.add(this.options.classes.popupActive);
                        document.documentElement.classList.add(this.options.classes.bodyActive);
                        if (!this._reopen) !this.bodyLock ? bodyLock() : null; else this._reopen = false;
                        this.targetOpen.element.setAttribute("aria-hidden", "false");
                        this.previousOpen.selector = this.targetOpen.selector;
                        this.previousOpen.element = this.targetOpen.element;
                        this._selectorOpen = false;
                        this.isOpen = true;
                        setTimeout((() => {
                            this._focusTrap();
                        }), 50);
                        this.options.on.afterOpen(this);
                        document.dispatchEvent(new CustomEvent("afterPopupOpen", {
                            detail: {
                                popup: this
                            }
                        }));
                        this.popupLogging(`Открыл попап`);
                    } else this.popupLogging(`Ой ой, такого попапа нет.Проверьте корректность ввода. `);
                }
            }
            close(selectorValue) {
                if (selectorValue && typeof selectorValue === "string" && selectorValue.trim() !== "") this.previousOpen.selector = selectorValue;
                if (!this.isOpen || !bodyLockStatus) return;
                this.options.on.beforeClose(this);
                document.dispatchEvent(new CustomEvent("beforePopupClose", {
                    detail: {
                        popup: this
                    }
                }));
                if (this.youTubeCode) if (this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`)) this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`).innerHTML = "";
                this.previousOpen.element.classList.remove(this.options.classes.popupActive);
                this.previousOpen.element.setAttribute("aria-hidden", "true");
                if (!this._reopen) {
                    document.documentElement.classList.remove(this.options.classes.bodyActive);
                    !this.bodyLock ? bodyUnlock() : null;
                    this.isOpen = false;
                }
                this._removeHash();
                if (this._selectorOpen) {
                    this.lastClosed.selector = this.previousOpen.selector;
                    this.lastClosed.element = this.previousOpen.element;
                }
                this.options.on.afterClose(this);
                document.dispatchEvent(new CustomEvent("afterPopupClose", {
                    detail: {
                        popup: this
                    }
                }));
                setTimeout((() => {
                    this._focusTrap();
                }), 50);
                this.popupLogging(`Закрыл попап`);
            }
            _getHash() {
                if (this.options.hashSettings.location) this.hash = this.targetOpen.selector.includes("#") ? this.targetOpen.selector : this.targetOpen.selector.replace(".", "#");
            }
            _openToHash() {
                let classInHash = document.querySelector(`.${window.location.hash.replace("#", "")}`) ? `.${window.location.hash.replace("#", "")}` : document.querySelector(`${window.location.hash}`) ? `${window.location.hash}` : null;
                const buttons = document.querySelector(`[${this.options.attributeOpenButton} = "${classInHash}"]`) ? document.querySelector(`[${this.options.attributeOpenButton} = "${classInHash}"]`) : document.querySelector(`[${this.options.attributeOpenButton} = "${classInHash.replace(".", "#")}"]`);
                if (buttons && classInHash) this.open(classInHash);
            }
            _setHash() {
                history.pushState("", "", this.hash);
            }
            _removeHash() {
                history.pushState("", "", window.location.href.split("#")[0]);
            }
            _focusCatch(e) {
                const focusable = this.targetOpen.element.querySelectorAll(this._focusEl);
                const focusArray = Array.prototype.slice.call(focusable);
                const focusedIndex = focusArray.indexOf(document.activeElement);
                if (e.shiftKey && focusedIndex === 0) {
                    focusArray[focusArray.length - 1].focus();
                    e.preventDefault();
                }
                if (!e.shiftKey && focusedIndex === focusArray.length - 1) {
                    focusArray[0].focus();
                    e.preventDefault();
                }
            }
            _focusTrap() {
                const focusable = this.previousOpen.element.querySelectorAll(this._focusEl);
                if (!this.isOpen && this.lastFocusEl) this.lastFocusEl.focus(); else focusable[0].focus();
            }
            popupLogging(message) {
                this.options.logging ? functions_FLS(`[Попапос]: ${message}`) : null;
            }
        }
        modules_flsModules.popup = new Popup({});
        let gotoblock_gotoBlock = (targetBlock, noHeader = false, speed = 500, offsetTop = 0) => {
            const targetBlockElement = document.querySelector(targetBlock);
            if (targetBlockElement) {
                let headerItem = "";
                let headerItemHeight = 0;
                if (noHeader) {
                    headerItem = "header.header";
                    headerItemHeight = document.querySelector(headerItem).offsetHeight;
                }
                let options = {
                    speedAsDuration: true,
                    speed,
                    header: headerItem,
                    offset: offsetTop,
                    easing: "easeOutQuad"
                };
                document.documentElement.classList.contains("menu-open") ? menuClose() : null;
                if (typeof SmoothScroll !== "undefined") (new SmoothScroll).animateScroll(targetBlockElement, "", options); else {
                    let targetBlockElementPosition = targetBlockElement.getBoundingClientRect().top + scrollY;
                    targetBlockElementPosition = headerItemHeight ? targetBlockElementPosition - headerItemHeight : targetBlockElementPosition;
                    targetBlockElementPosition = offsetTop ? targetBlockElementPosition - offsetTop : targetBlockElementPosition;
                    window.scrollTo({
                        top: targetBlockElementPosition,
                        behavior: "smooth"
                    });
                }
                functions_FLS(`[gotoBlock]: Юхуу...едем к ${targetBlock}`);
            } else functions_FLS(`[gotoBlock]: Ой ой..Такого блока нет на странице: ${targetBlock}`);
        };
        function formFieldsInit(options = {
            viewPass: false
        }) {
            const formFields = document.querySelectorAll("input[placeholder],textarea[placeholder]");
            if (formFields.length) formFields.forEach((formField => {
                if (!formField.hasAttribute("data-placeholder-nohide")) formField.dataset.placeholder = formField.placeholder;
            }));
            document.body.addEventListener("focusin", (function(e) {
                const targetElement = e.target;
                if (targetElement.tagName === "INPUT" || targetElement.tagName === "TEXTAREA") {
                    if (targetElement.dataset.placeholder) targetElement.placeholder = "";
                    if (!targetElement.hasAttribute("data-no-focus-classes")) {
                        targetElement.classList.add("_form-focus");
                        targetElement.parentElement.classList.add("_form-focus");
                    }
                    formValidate.removeError(targetElement);
                }
            }));
            document.body.addEventListener("focusout", (function(e) {
                const targetElement = e.target;
                if (targetElement.tagName === "INPUT" || targetElement.tagName === "TEXTAREA") {
                    if (targetElement.dataset.placeholder) targetElement.placeholder = targetElement.dataset.placeholder;
                    if (!targetElement.hasAttribute("data-no-focus-classes")) {
                        targetElement.classList.remove("_form-focus");
                        targetElement.parentElement.classList.remove("_form-focus");
                    }
                    if (targetElement.hasAttribute("data-validate")) formValidate.validateInput(targetElement);
                }
            }));
            if (options.viewPass) document.addEventListener("click", (function(e) {
                let targetElement = e.target;
                if (targetElement.closest('[class*="__viewpass"]')) {
                    let inputType = targetElement.classList.contains("_viewpass-active") ? "password" : "text";
                    targetElement.parentElement.querySelector("input").setAttribute("type", inputType);
                    targetElement.classList.toggle("_viewpass-active");
                }
            }));
        }
        let formValidate = {
            getErrors(form) {
                let error = 0;
                let formRequiredItems = form.querySelectorAll("*[data-required]");
                if (formRequiredItems.length) formRequiredItems.forEach((formRequiredItem => {
                    if ((formRequiredItem.offsetParent !== null || formRequiredItem.tagName === "SELECT") && !formRequiredItem.disabled) error += this.validateInput(formRequiredItem);
                }));
                return error;
            },
            validateInput(formRequiredItem) {
                let error = 0;
                if (formRequiredItem.dataset.required === "email") {
                    formRequiredItem.value = formRequiredItem.value.replace(" ", "");
                    if (this.emailTest(formRequiredItem)) {
                        this.addError(formRequiredItem);
                        error++;
                    } else this.removeError(formRequiredItem);
                } else if (formRequiredItem.type === "checkbox" && !formRequiredItem.checked) {
                    this.addError(formRequiredItem);
                    error++;
                } else if (!formRequiredItem.value) {
                    this.addError(formRequiredItem);
                    error++;
                } else this.removeError(formRequiredItem);
                return error;
            },
            addError(formRequiredItem) {
                formRequiredItem.classList.add("_form-error");
                formRequiredItem.parentElement.classList.add("_form-error");
                let inputError = formRequiredItem.parentElement.querySelector(".form__error");
                if (inputError) formRequiredItem.parentElement.removeChild(inputError);
                if (formRequiredItem.dataset.error) formRequiredItem.parentElement.insertAdjacentHTML("beforeend", `<div class="form__error">${formRequiredItem.dataset.error}</div>`);
            },
            removeError(formRequiredItem) {
                formRequiredItem.classList.remove("_form-error");
                formRequiredItem.parentElement.classList.remove("_form-error");
                if (formRequiredItem.parentElement.querySelector(".form__error")) formRequiredItem.parentElement.removeChild(formRequiredItem.parentElement.querySelector(".form__error"));
            },
            formClean(form) {
                form.reset();
                setTimeout((() => {
                    let inputs = form.querySelectorAll("input,textarea");
                    for (let index = 0; index < inputs.length; index++) {
                        const el = inputs[index];
                        el.parentElement.classList.remove("_form-focus");
                        el.classList.remove("_form-focus");
                        formValidate.removeError(el);
                    }
                    let checkboxes = form.querySelectorAll(".checkbox__input");
                    if (checkboxes.length > 0) for (let index = 0; index < checkboxes.length; index++) {
                        const checkbox = checkboxes[index];
                        checkbox.checked = false;
                    }
                    if (modules_flsModules.select) {
                        let selects = form.querySelectorAll(".select");
                        if (selects.length) for (let index = 0; index < selects.length; index++) {
                            const select = selects[index].querySelector("select");
                            modules_flsModules.select.selectBuild(select);
                        }
                    }
                }), 0);
            },
            emailTest(formRequiredItem) {
                return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(formRequiredItem.value);
            }
        };
        var debounce = __webpack_require__(221);
        var throttle = __webpack_require__(969);
        var __assign = function() {
            __assign = Object.assign || function __assign(t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                    s = arguments[i];
                    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                }
                return t;
            };
            return __assign.apply(this, arguments);
        };
        function getElementWindow$1(element) {
            if (!element || !element.ownerDocument || !element.ownerDocument.defaultView) return window;
            return element.ownerDocument.defaultView;
        }
        function getElementDocument$1(element) {
            if (!element || !element.ownerDocument) return document;
            return element.ownerDocument;
        }
        var getOptions$1 = function(obj) {
            var initialObj = {};
            var options = Array.prototype.reduce.call(obj, (function(acc, attribute) {
                var option = attribute.name.match(/data-simplebar-(.+)/);
                if (option) {
                    var key = option[1].replace(/\W+(.)/g, (function(_, chr) {
                        return chr.toUpperCase();
                    }));
                    switch (attribute.value) {
                      case "true":
                        acc[key] = true;
                        break;

                      case "false":
                        acc[key] = false;
                        break;

                      case void 0:
                        acc[key] = true;
                        break;

                      default:
                        acc[key] = attribute.value;
                    }
                }
                return acc;
            }), initialObj);
            return options;
        };
        function addClasses$1(el, classes) {
            var _a;
            if (!el) return;
            (_a = el.classList).add.apply(_a, classes.split(" "));
        }
        function removeClasses$1(el, classes) {
            if (!el) return;
            classes.split(" ").forEach((function(className) {
                el.classList.remove(className);
            }));
        }
        function classNamesToQuery$1(classNames) {
            return ".".concat(classNames.split(" ").join("."));
        }
        var canUseDOM = !!(typeof window !== "undefined" && window.document && window.document.createElement);
        var helpers = Object.freeze({
            __proto__: null,
            addClasses: addClasses$1,
            canUseDOM,
            classNamesToQuery: classNamesToQuery$1,
            getElementDocument: getElementDocument$1,
            getElementWindow: getElementWindow$1,
            getOptions: getOptions$1,
            removeClasses: removeClasses$1
        });
        var cachedScrollbarWidth = null;
        var cachedDevicePixelRatio = null;
        if (canUseDOM) window.addEventListener("resize", (function() {
            if (cachedDevicePixelRatio !== window.devicePixelRatio) {
                cachedDevicePixelRatio = window.devicePixelRatio;
                cachedScrollbarWidth = null;
            }
        }));
        function scrollbarWidth() {
            if (cachedScrollbarWidth === null) {
                if (typeof document === "undefined") {
                    cachedScrollbarWidth = 0;
                    return cachedScrollbarWidth;
                }
                var body = document.body;
                var box = document.createElement("div");
                box.classList.add("simplebar-hide-scrollbar");
                body.appendChild(box);
                var width = box.getBoundingClientRect().right;
                body.removeChild(box);
                cachedScrollbarWidth = width;
            }
            return cachedScrollbarWidth;
        }
        var getElementWindow = getElementWindow$1, getElementDocument = getElementDocument$1, getOptions = getOptions$1, addClasses = addClasses$1, dist_removeClasses = removeClasses$1, classNamesToQuery = classNamesToQuery$1;
        var SimpleBarCore = function() {
            function SimpleBarCore(element, options) {
                if (options === void 0) options = {};
                var _this = this;
                this.removePreventClickId = null;
                this.minScrollbarWidth = 20;
                this.stopScrollDelay = 175;
                this.isScrolling = false;
                this.isMouseEntering = false;
                this.isDragging = false;
                this.scrollXTicking = false;
                this.scrollYTicking = false;
                this.wrapperEl = null;
                this.contentWrapperEl = null;
                this.contentEl = null;
                this.offsetEl = null;
                this.maskEl = null;
                this.placeholderEl = null;
                this.heightAutoObserverWrapperEl = null;
                this.heightAutoObserverEl = null;
                this.rtlHelpers = null;
                this.scrollbarWidth = 0;
                this.resizeObserver = null;
                this.mutationObserver = null;
                this.elStyles = null;
                this.isRtl = null;
                this.mouseX = 0;
                this.mouseY = 0;
                this.onMouseMove = function() {};
                this.onWindowResize = function() {};
                this.onStopScrolling = function() {};
                this.onMouseEntered = function() {};
                this.onScroll = function() {
                    var elWindow = getElementWindow(_this.el);
                    if (!_this.scrollXTicking) {
                        elWindow.requestAnimationFrame(_this.scrollX);
                        _this.scrollXTicking = true;
                    }
                    if (!_this.scrollYTicking) {
                        elWindow.requestAnimationFrame(_this.scrollY);
                        _this.scrollYTicking = true;
                    }
                    if (!_this.isScrolling) {
                        _this.isScrolling = true;
                        addClasses(_this.el, _this.classNames.scrolling);
                    }
                    _this.showScrollbar("x");
                    _this.showScrollbar("y");
                    _this.onStopScrolling();
                };
                this.scrollX = function() {
                    if (_this.axis.x.isOverflowing) _this.positionScrollbar("x");
                    _this.scrollXTicking = false;
                };
                this.scrollY = function() {
                    if (_this.axis.y.isOverflowing) _this.positionScrollbar("y");
                    _this.scrollYTicking = false;
                };
                this._onStopScrolling = function() {
                    dist_removeClasses(_this.el, _this.classNames.scrolling);
                    if (_this.options.autoHide) {
                        _this.hideScrollbar("x");
                        _this.hideScrollbar("y");
                    }
                    _this.isScrolling = false;
                };
                this.onMouseEnter = function() {
                    if (!_this.isMouseEntering) {
                        addClasses(_this.el, _this.classNames.mouseEntered);
                        _this.showScrollbar("x");
                        _this.showScrollbar("y");
                        _this.isMouseEntering = true;
                    }
                    _this.onMouseEntered();
                };
                this._onMouseEntered = function() {
                    dist_removeClasses(_this.el, _this.classNames.mouseEntered);
                    if (_this.options.autoHide) {
                        _this.hideScrollbar("x");
                        _this.hideScrollbar("y");
                    }
                    _this.isMouseEntering = false;
                };
                this._onMouseMove = function(e) {
                    _this.mouseX = e.clientX;
                    _this.mouseY = e.clientY;
                    if (_this.axis.x.isOverflowing || _this.axis.x.forceVisible) _this.onMouseMoveForAxis("x");
                    if (_this.axis.y.isOverflowing || _this.axis.y.forceVisible) _this.onMouseMoveForAxis("y");
                };
                this.onMouseLeave = function() {
                    _this.onMouseMove.cancel();
                    if (_this.axis.x.isOverflowing || _this.axis.x.forceVisible) _this.onMouseLeaveForAxis("x");
                    if (_this.axis.y.isOverflowing || _this.axis.y.forceVisible) _this.onMouseLeaveForAxis("y");
                    _this.mouseX = -1;
                    _this.mouseY = -1;
                };
                this._onWindowResize = function() {
                    _this.scrollbarWidth = _this.getScrollbarWidth();
                    _this.hideNativeScrollbar();
                };
                this.onPointerEvent = function(e) {
                    if (!_this.axis.x.track.el || !_this.axis.y.track.el || !_this.axis.x.scrollbar.el || !_this.axis.y.scrollbar.el) return;
                    var isWithinTrackXBounds, isWithinTrackYBounds;
                    _this.axis.x.track.rect = _this.axis.x.track.el.getBoundingClientRect();
                    _this.axis.y.track.rect = _this.axis.y.track.el.getBoundingClientRect();
                    if (_this.axis.x.isOverflowing || _this.axis.x.forceVisible) isWithinTrackXBounds = _this.isWithinBounds(_this.axis.x.track.rect);
                    if (_this.axis.y.isOverflowing || _this.axis.y.forceVisible) isWithinTrackYBounds = _this.isWithinBounds(_this.axis.y.track.rect);
                    if (isWithinTrackXBounds || isWithinTrackYBounds) {
                        e.stopPropagation();
                        if (e.type === "pointerdown" && e.pointerType !== "touch") {
                            if (isWithinTrackXBounds) {
                                _this.axis.x.scrollbar.rect = _this.axis.x.scrollbar.el.getBoundingClientRect();
                                if (_this.isWithinBounds(_this.axis.x.scrollbar.rect)) _this.onDragStart(e, "x"); else _this.onTrackClick(e, "x");
                            }
                            if (isWithinTrackYBounds) {
                                _this.axis.y.scrollbar.rect = _this.axis.y.scrollbar.el.getBoundingClientRect();
                                if (_this.isWithinBounds(_this.axis.y.scrollbar.rect)) _this.onDragStart(e, "y"); else _this.onTrackClick(e, "y");
                            }
                        }
                    }
                };
                this.drag = function(e) {
                    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
                    if (!_this.draggedAxis || !_this.contentWrapperEl) return;
                    var eventOffset;
                    var track = _this.axis[_this.draggedAxis].track;
                    var trackSize = (_b = (_a = track.rect) === null || _a === void 0 ? void 0 : _a[_this.axis[_this.draggedAxis].sizeAttr]) !== null && _b !== void 0 ? _b : 0;
                    var scrollbar = _this.axis[_this.draggedAxis].scrollbar;
                    var contentSize = (_d = (_c = _this.contentWrapperEl) === null || _c === void 0 ? void 0 : _c[_this.axis[_this.draggedAxis].scrollSizeAttr]) !== null && _d !== void 0 ? _d : 0;
                    var hostSize = parseInt((_f = (_e = _this.elStyles) === null || _e === void 0 ? void 0 : _e[_this.axis[_this.draggedAxis].sizeAttr]) !== null && _f !== void 0 ? _f : "0px", 10);
                    e.preventDefault();
                    e.stopPropagation();
                    if (_this.draggedAxis === "y") eventOffset = e.pageY; else eventOffset = e.pageX;
                    var dragPos = eventOffset - ((_h = (_g = track.rect) === null || _g === void 0 ? void 0 : _g[_this.axis[_this.draggedAxis].offsetAttr]) !== null && _h !== void 0 ? _h : 0) - _this.axis[_this.draggedAxis].dragOffset;
                    dragPos = _this.draggedAxis === "x" && _this.isRtl ? ((_k = (_j = track.rect) === null || _j === void 0 ? void 0 : _j[_this.axis[_this.draggedAxis].sizeAttr]) !== null && _k !== void 0 ? _k : 0) - scrollbar.size - dragPos : dragPos;
                    var dragPerc = dragPos / (trackSize - scrollbar.size);
                    var scrollPos = dragPerc * (contentSize - hostSize);
                    if (_this.draggedAxis === "x" && _this.isRtl) scrollPos = ((_l = SimpleBarCore.getRtlHelpers()) === null || _l === void 0 ? void 0 : _l.isScrollingToNegative) ? -scrollPos : scrollPos;
                    _this.contentWrapperEl[_this.axis[_this.draggedAxis].scrollOffsetAttr] = scrollPos;
                };
                this.onEndDrag = function(e) {
                    _this.isDragging = false;
                    var elDocument = getElementDocument(_this.el);
                    var elWindow = getElementWindow(_this.el);
                    e.preventDefault();
                    e.stopPropagation();
                    dist_removeClasses(_this.el, _this.classNames.dragging);
                    _this.onStopScrolling();
                    elDocument.removeEventListener("mousemove", _this.drag, true);
                    elDocument.removeEventListener("mouseup", _this.onEndDrag, true);
                    _this.removePreventClickId = elWindow.setTimeout((function() {
                        elDocument.removeEventListener("click", _this.preventClick, true);
                        elDocument.removeEventListener("dblclick", _this.preventClick, true);
                        _this.removePreventClickId = null;
                    }));
                };
                this.preventClick = function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                };
                this.el = element;
                this.options = __assign(__assign({}, SimpleBarCore.defaultOptions), options);
                this.classNames = __assign(__assign({}, SimpleBarCore.defaultOptions.classNames), options.classNames);
                this.axis = {
                    x: {
                        scrollOffsetAttr: "scrollLeft",
                        sizeAttr: "width",
                        scrollSizeAttr: "scrollWidth",
                        offsetSizeAttr: "offsetWidth",
                        offsetAttr: "left",
                        overflowAttr: "overflowX",
                        dragOffset: 0,
                        isOverflowing: true,
                        forceVisible: false,
                        track: {
                            size: null,
                            el: null,
                            rect: null,
                            isVisible: false
                        },
                        scrollbar: {
                            size: null,
                            el: null,
                            rect: null,
                            isVisible: false
                        }
                    },
                    y: {
                        scrollOffsetAttr: "scrollTop",
                        sizeAttr: "height",
                        scrollSizeAttr: "scrollHeight",
                        offsetSizeAttr: "offsetHeight",
                        offsetAttr: "top",
                        overflowAttr: "overflowY",
                        dragOffset: 0,
                        isOverflowing: true,
                        forceVisible: false,
                        track: {
                            size: null,
                            el: null,
                            rect: null,
                            isVisible: false
                        },
                        scrollbar: {
                            size: null,
                            el: null,
                            rect: null,
                            isVisible: false
                        }
                    }
                };
                if (typeof this.el !== "object" || !this.el.nodeName) throw new Error("Argument passed to SimpleBar must be an HTML element instead of ".concat(this.el));
                this.onMouseMove = throttle(this._onMouseMove, 64);
                this.onWindowResize = debounce(this._onWindowResize, 64, {
                    leading: true
                });
                this.onStopScrolling = debounce(this._onStopScrolling, this.stopScrollDelay);
                this.onMouseEntered = debounce(this._onMouseEntered, this.stopScrollDelay);
                this.init();
            }
            SimpleBarCore.getRtlHelpers = function() {
                if (SimpleBarCore.rtlHelpers) return SimpleBarCore.rtlHelpers;
                var dummyDiv = document.createElement("div");
                dummyDiv.innerHTML = '<div class="simplebar-dummy-scrollbar-size"><div></div></div>';
                var scrollbarDummyEl = dummyDiv.firstElementChild;
                var dummyChild = scrollbarDummyEl === null || scrollbarDummyEl === void 0 ? void 0 : scrollbarDummyEl.firstElementChild;
                if (!dummyChild) return null;
                document.body.appendChild(scrollbarDummyEl);
                scrollbarDummyEl.scrollLeft = 0;
                var dummyContainerOffset = SimpleBarCore.getOffset(scrollbarDummyEl);
                var dummyChildOffset = SimpleBarCore.getOffset(dummyChild);
                scrollbarDummyEl.scrollLeft = -999;
                var dummyChildOffsetAfterScroll = SimpleBarCore.getOffset(dummyChild);
                document.body.removeChild(scrollbarDummyEl);
                SimpleBarCore.rtlHelpers = {
                    isScrollOriginAtZero: dummyContainerOffset.left !== dummyChildOffset.left,
                    isScrollingToNegative: dummyChildOffset.left !== dummyChildOffsetAfterScroll.left
                };
                return SimpleBarCore.rtlHelpers;
            };
            SimpleBarCore.prototype.getScrollbarWidth = function() {
                try {
                    if (this.contentWrapperEl && getComputedStyle(this.contentWrapperEl, "::-webkit-scrollbar").display === "none" || "scrollbarWidth" in document.documentElement.style || "-ms-overflow-style" in document.documentElement.style) return 0; else return scrollbarWidth();
                } catch (e) {
                    return scrollbarWidth();
                }
            };
            SimpleBarCore.getOffset = function(el) {
                var rect = el.getBoundingClientRect();
                var elDocument = getElementDocument(el);
                var elWindow = getElementWindow(el);
                return {
                    top: rect.top + (elWindow.pageYOffset || elDocument.documentElement.scrollTop),
                    left: rect.left + (elWindow.pageXOffset || elDocument.documentElement.scrollLeft)
                };
            };
            SimpleBarCore.prototype.init = function() {
                if (canUseDOM) {
                    this.initDOM();
                    this.rtlHelpers = SimpleBarCore.getRtlHelpers();
                    this.scrollbarWidth = this.getScrollbarWidth();
                    this.recalculate();
                    this.initListeners();
                }
            };
            SimpleBarCore.prototype.initDOM = function() {
                var _a, _b;
                this.wrapperEl = this.el.querySelector(classNamesToQuery(this.classNames.wrapper));
                this.contentWrapperEl = this.options.scrollableNode || this.el.querySelector(classNamesToQuery(this.classNames.contentWrapper));
                this.contentEl = this.options.contentNode || this.el.querySelector(classNamesToQuery(this.classNames.contentEl));
                this.offsetEl = this.el.querySelector(classNamesToQuery(this.classNames.offset));
                this.maskEl = this.el.querySelector(classNamesToQuery(this.classNames.mask));
                this.placeholderEl = this.findChild(this.wrapperEl, classNamesToQuery(this.classNames.placeholder));
                this.heightAutoObserverWrapperEl = this.el.querySelector(classNamesToQuery(this.classNames.heightAutoObserverWrapperEl));
                this.heightAutoObserverEl = this.el.querySelector(classNamesToQuery(this.classNames.heightAutoObserverEl));
                this.axis.x.track.el = this.findChild(this.el, "".concat(classNamesToQuery(this.classNames.track)).concat(classNamesToQuery(this.classNames.horizontal)));
                this.axis.y.track.el = this.findChild(this.el, "".concat(classNamesToQuery(this.classNames.track)).concat(classNamesToQuery(this.classNames.vertical)));
                this.axis.x.scrollbar.el = ((_a = this.axis.x.track.el) === null || _a === void 0 ? void 0 : _a.querySelector(classNamesToQuery(this.classNames.scrollbar))) || null;
                this.axis.y.scrollbar.el = ((_b = this.axis.y.track.el) === null || _b === void 0 ? void 0 : _b.querySelector(classNamesToQuery(this.classNames.scrollbar))) || null;
                if (!this.options.autoHide) {
                    addClasses(this.axis.x.scrollbar.el, this.classNames.visible);
                    addClasses(this.axis.y.scrollbar.el, this.classNames.visible);
                }
            };
            SimpleBarCore.prototype.initListeners = function() {
                var _this = this;
                var _a;
                var elWindow = getElementWindow(this.el);
                this.el.addEventListener("mouseenter", this.onMouseEnter);
                this.el.addEventListener("pointerdown", this.onPointerEvent, true);
                this.el.addEventListener("mousemove", this.onMouseMove);
                this.el.addEventListener("mouseleave", this.onMouseLeave);
                (_a = this.contentWrapperEl) === null || _a === void 0 ? void 0 : _a.addEventListener("scroll", this.onScroll);
                elWindow.addEventListener("resize", this.onWindowResize);
                if (!this.contentEl) return;
                if (window.ResizeObserver) {
                    var resizeObserverStarted_1 = false;
                    var resizeObserver = elWindow.ResizeObserver || ResizeObserver;
                    this.resizeObserver = new resizeObserver((function() {
                        if (!resizeObserverStarted_1) return;
                        elWindow.requestAnimationFrame((function() {
                            _this.recalculate();
                        }));
                    }));
                    this.resizeObserver.observe(this.el);
                    this.resizeObserver.observe(this.contentEl);
                    elWindow.requestAnimationFrame((function() {
                        resizeObserverStarted_1 = true;
                    }));
                }
                this.mutationObserver = new elWindow.MutationObserver((function() {
                    elWindow.requestAnimationFrame((function() {
                        _this.recalculate();
                    }));
                }));
                this.mutationObserver.observe(this.contentEl, {
                    childList: true,
                    subtree: true,
                    characterData: true
                });
            };
            SimpleBarCore.prototype.recalculate = function() {
                if (!this.heightAutoObserverEl || !this.contentEl || !this.contentWrapperEl || !this.wrapperEl || !this.placeholderEl) return;
                var elWindow = getElementWindow(this.el);
                this.elStyles = elWindow.getComputedStyle(this.el);
                this.isRtl = this.elStyles.direction === "rtl";
                var contentElOffsetWidth = this.contentEl.offsetWidth;
                var isHeightAuto = this.heightAutoObserverEl.offsetHeight <= 1;
                var isWidthAuto = this.heightAutoObserverEl.offsetWidth <= 1 || contentElOffsetWidth > 0;
                var contentWrapperElOffsetWidth = this.contentWrapperEl.offsetWidth;
                var elOverflowX = this.elStyles.overflowX;
                var elOverflowY = this.elStyles.overflowY;
                this.contentEl.style.padding = "".concat(this.elStyles.paddingTop, " ").concat(this.elStyles.paddingRight, " ").concat(this.elStyles.paddingBottom, " ").concat(this.elStyles.paddingLeft);
                this.wrapperEl.style.margin = "-".concat(this.elStyles.paddingTop, " -").concat(this.elStyles.paddingRight, " -").concat(this.elStyles.paddingBottom, " -").concat(this.elStyles.paddingLeft);
                var contentElScrollHeight = this.contentEl.scrollHeight;
                var contentElScrollWidth = this.contentEl.scrollWidth;
                this.contentWrapperEl.style.height = isHeightAuto ? "auto" : "100%";
                this.placeholderEl.style.width = isWidthAuto ? "".concat(contentElOffsetWidth || contentElScrollWidth, "px") : "auto";
                this.placeholderEl.style.height = "".concat(contentElScrollHeight, "px");
                var contentWrapperElOffsetHeight = this.contentWrapperEl.offsetHeight;
                this.axis.x.isOverflowing = contentElOffsetWidth !== 0 && contentElScrollWidth > contentElOffsetWidth;
                this.axis.y.isOverflowing = contentElScrollHeight > contentWrapperElOffsetHeight;
                this.axis.x.isOverflowing = elOverflowX === "hidden" ? false : this.axis.x.isOverflowing;
                this.axis.y.isOverflowing = elOverflowY === "hidden" ? false : this.axis.y.isOverflowing;
                this.axis.x.forceVisible = this.options.forceVisible === "x" || this.options.forceVisible === true;
                this.axis.y.forceVisible = this.options.forceVisible === "y" || this.options.forceVisible === true;
                this.hideNativeScrollbar();
                var offsetForXScrollbar = this.axis.x.isOverflowing ? this.scrollbarWidth : 0;
                var offsetForYScrollbar = this.axis.y.isOverflowing ? this.scrollbarWidth : 0;
                this.axis.x.isOverflowing = this.axis.x.isOverflowing && contentElScrollWidth > contentWrapperElOffsetWidth - offsetForYScrollbar;
                this.axis.y.isOverflowing = this.axis.y.isOverflowing && contentElScrollHeight > contentWrapperElOffsetHeight - offsetForXScrollbar;
                this.axis.x.scrollbar.size = this.getScrollbarSize("x");
                this.axis.y.scrollbar.size = this.getScrollbarSize("y");
                if (this.axis.x.scrollbar.el) this.axis.x.scrollbar.el.style.width = "".concat(this.axis.x.scrollbar.size, "px");
                if (this.axis.y.scrollbar.el) this.axis.y.scrollbar.el.style.height = "".concat(this.axis.y.scrollbar.size, "px");
                this.positionScrollbar("x");
                this.positionScrollbar("y");
                this.toggleTrackVisibility("x");
                this.toggleTrackVisibility("y");
            };
            SimpleBarCore.prototype.getScrollbarSize = function(axis) {
                var _a, _b;
                if (axis === void 0) axis = "y";
                if (!this.axis[axis].isOverflowing || !this.contentEl) return 0;
                var contentSize = this.contentEl[this.axis[axis].scrollSizeAttr];
                var trackSize = (_b = (_a = this.axis[axis].track.el) === null || _a === void 0 ? void 0 : _a[this.axis[axis].offsetSizeAttr]) !== null && _b !== void 0 ? _b : 0;
                var scrollbarRatio = trackSize / contentSize;
                var scrollbarSize;
                scrollbarSize = Math.max(~~(scrollbarRatio * trackSize), this.options.scrollbarMinSize);
                if (this.options.scrollbarMaxSize) scrollbarSize = Math.min(scrollbarSize, this.options.scrollbarMaxSize);
                return scrollbarSize;
            };
            SimpleBarCore.prototype.positionScrollbar = function(axis) {
                var _a, _b, _c;
                if (axis === void 0) axis = "y";
                var scrollbar = this.axis[axis].scrollbar;
                if (!this.axis[axis].isOverflowing || !this.contentWrapperEl || !scrollbar.el || !this.elStyles) return;
                var contentSize = this.contentWrapperEl[this.axis[axis].scrollSizeAttr];
                var trackSize = ((_a = this.axis[axis].track.el) === null || _a === void 0 ? void 0 : _a[this.axis[axis].offsetSizeAttr]) || 0;
                var hostSize = parseInt(this.elStyles[this.axis[axis].sizeAttr], 10);
                var scrollOffset = this.contentWrapperEl[this.axis[axis].scrollOffsetAttr];
                scrollOffset = axis === "x" && this.isRtl && ((_b = SimpleBarCore.getRtlHelpers()) === null || _b === void 0 ? void 0 : _b.isScrollOriginAtZero) ? -scrollOffset : scrollOffset;
                if (axis === "x" && this.isRtl) scrollOffset = ((_c = SimpleBarCore.getRtlHelpers()) === null || _c === void 0 ? void 0 : _c.isScrollingToNegative) ? scrollOffset : -scrollOffset;
                var scrollPourcent = scrollOffset / (contentSize - hostSize);
                var handleOffset = ~~((trackSize - scrollbar.size) * scrollPourcent);
                handleOffset = axis === "x" && this.isRtl ? -handleOffset + (trackSize - scrollbar.size) : handleOffset;
                scrollbar.el.style.transform = axis === "x" ? "translate3d(".concat(handleOffset, "px, 0, 0)") : "translate3d(0, ".concat(handleOffset, "px, 0)");
            };
            SimpleBarCore.prototype.toggleTrackVisibility = function(axis) {
                if (axis === void 0) axis = "y";
                var track = this.axis[axis].track.el;
                var scrollbar = this.axis[axis].scrollbar.el;
                if (!track || !scrollbar || !this.contentWrapperEl) return;
                if (this.axis[axis].isOverflowing || this.axis[axis].forceVisible) {
                    track.style.visibility = "visible";
                    this.contentWrapperEl.style[this.axis[axis].overflowAttr] = "scroll";
                    this.el.classList.add("".concat(this.classNames.scrollable, "-").concat(axis));
                } else {
                    track.style.visibility = "hidden";
                    this.contentWrapperEl.style[this.axis[axis].overflowAttr] = "hidden";
                    this.el.classList.remove("".concat(this.classNames.scrollable, "-").concat(axis));
                }
                if (this.axis[axis].isOverflowing) scrollbar.style.display = "block"; else scrollbar.style.display = "none";
            };
            SimpleBarCore.prototype.showScrollbar = function(axis) {
                if (axis === void 0) axis = "y";
                if (this.axis[axis].isOverflowing && !this.axis[axis].scrollbar.isVisible) {
                    addClasses(this.axis[axis].scrollbar.el, this.classNames.visible);
                    this.axis[axis].scrollbar.isVisible = true;
                }
            };
            SimpleBarCore.prototype.hideScrollbar = function(axis) {
                if (axis === void 0) axis = "y";
                if (this.isDragging) return;
                if (this.axis[axis].isOverflowing && this.axis[axis].scrollbar.isVisible) {
                    dist_removeClasses(this.axis[axis].scrollbar.el, this.classNames.visible);
                    this.axis[axis].scrollbar.isVisible = false;
                }
            };
            SimpleBarCore.prototype.hideNativeScrollbar = function() {
                if (!this.offsetEl) return;
                this.offsetEl.style[this.isRtl ? "left" : "right"] = this.axis.y.isOverflowing || this.axis.y.forceVisible ? "-".concat(this.scrollbarWidth, "px") : "0px";
                this.offsetEl.style.bottom = this.axis.x.isOverflowing || this.axis.x.forceVisible ? "-".concat(this.scrollbarWidth, "px") : "0px";
            };
            SimpleBarCore.prototype.onMouseMoveForAxis = function(axis) {
                if (axis === void 0) axis = "y";
                var currentAxis = this.axis[axis];
                if (!currentAxis.track.el || !currentAxis.scrollbar.el) return;
                currentAxis.track.rect = currentAxis.track.el.getBoundingClientRect();
                currentAxis.scrollbar.rect = currentAxis.scrollbar.el.getBoundingClientRect();
                if (this.isWithinBounds(currentAxis.track.rect)) {
                    this.showScrollbar(axis);
                    addClasses(currentAxis.track.el, this.classNames.hover);
                    if (this.isWithinBounds(currentAxis.scrollbar.rect)) addClasses(currentAxis.scrollbar.el, this.classNames.hover); else dist_removeClasses(currentAxis.scrollbar.el, this.classNames.hover);
                } else {
                    dist_removeClasses(currentAxis.track.el, this.classNames.hover);
                    if (this.options.autoHide) this.hideScrollbar(axis);
                }
            };
            SimpleBarCore.prototype.onMouseLeaveForAxis = function(axis) {
                if (axis === void 0) axis = "y";
                dist_removeClasses(this.axis[axis].track.el, this.classNames.hover);
                dist_removeClasses(this.axis[axis].scrollbar.el, this.classNames.hover);
                if (this.options.autoHide) this.hideScrollbar(axis);
            };
            SimpleBarCore.prototype.onDragStart = function(e, axis) {
                var _a;
                if (axis === void 0) axis = "y";
                this.isDragging = true;
                var elDocument = getElementDocument(this.el);
                var elWindow = getElementWindow(this.el);
                var scrollbar = this.axis[axis].scrollbar;
                var eventOffset = axis === "y" ? e.pageY : e.pageX;
                this.axis[axis].dragOffset = eventOffset - (((_a = scrollbar.rect) === null || _a === void 0 ? void 0 : _a[this.axis[axis].offsetAttr]) || 0);
                this.draggedAxis = axis;
                addClasses(this.el, this.classNames.dragging);
                elDocument.addEventListener("mousemove", this.drag, true);
                elDocument.addEventListener("mouseup", this.onEndDrag, true);
                if (this.removePreventClickId === null) {
                    elDocument.addEventListener("click", this.preventClick, true);
                    elDocument.addEventListener("dblclick", this.preventClick, true);
                } else {
                    elWindow.clearTimeout(this.removePreventClickId);
                    this.removePreventClickId = null;
                }
            };
            SimpleBarCore.prototype.onTrackClick = function(e, axis) {
                var _this = this;
                var _a, _b, _c, _d;
                if (axis === void 0) axis = "y";
                var currentAxis = this.axis[axis];
                if (!this.options.clickOnTrack || !currentAxis.scrollbar.el || !this.contentWrapperEl) return;
                e.preventDefault();
                var elWindow = getElementWindow(this.el);
                this.axis[axis].scrollbar.rect = currentAxis.scrollbar.el.getBoundingClientRect();
                var scrollbar = this.axis[axis].scrollbar;
                var scrollbarOffset = (_b = (_a = scrollbar.rect) === null || _a === void 0 ? void 0 : _a[this.axis[axis].offsetAttr]) !== null && _b !== void 0 ? _b : 0;
                var hostSize = parseInt((_d = (_c = this.elStyles) === null || _c === void 0 ? void 0 : _c[this.axis[axis].sizeAttr]) !== null && _d !== void 0 ? _d : "0px", 10);
                var scrolled = this.contentWrapperEl[this.axis[axis].scrollOffsetAttr];
                var t = axis === "y" ? this.mouseY - scrollbarOffset : this.mouseX - scrollbarOffset;
                var dir = t < 0 ? -1 : 1;
                var scrollSize = dir === -1 ? scrolled - hostSize : scrolled + hostSize;
                var speed = 40;
                var scrollTo = function() {
                    if (!_this.contentWrapperEl) return;
                    if (dir === -1) {
                        if (scrolled > scrollSize) {
                            scrolled -= speed;
                            _this.contentWrapperEl[_this.axis[axis].scrollOffsetAttr] = scrolled;
                            elWindow.requestAnimationFrame(scrollTo);
                        }
                    } else if (scrolled < scrollSize) {
                        scrolled += speed;
                        _this.contentWrapperEl[_this.axis[axis].scrollOffsetAttr] = scrolled;
                        elWindow.requestAnimationFrame(scrollTo);
                    }
                };
                scrollTo();
            };
            SimpleBarCore.prototype.getContentElement = function() {
                return this.contentEl;
            };
            SimpleBarCore.prototype.getScrollElement = function() {
                return this.contentWrapperEl;
            };
            SimpleBarCore.prototype.removeListeners = function() {
                var elWindow = getElementWindow(this.el);
                this.el.removeEventListener("mouseenter", this.onMouseEnter);
                this.el.removeEventListener("pointerdown", this.onPointerEvent, true);
                this.el.removeEventListener("mousemove", this.onMouseMove);
                this.el.removeEventListener("mouseleave", this.onMouseLeave);
                if (this.contentWrapperEl) this.contentWrapperEl.removeEventListener("scroll", this.onScroll);
                elWindow.removeEventListener("resize", this.onWindowResize);
                if (this.mutationObserver) this.mutationObserver.disconnect();
                if (this.resizeObserver) this.resizeObserver.disconnect();
                this.onMouseMove.cancel();
                this.onWindowResize.cancel();
                this.onStopScrolling.cancel();
                this.onMouseEntered.cancel();
            };
            SimpleBarCore.prototype.unMount = function() {
                this.removeListeners();
            };
            SimpleBarCore.prototype.isWithinBounds = function(bbox) {
                return this.mouseX >= bbox.left && this.mouseX <= bbox.left + bbox.width && this.mouseY >= bbox.top && this.mouseY <= bbox.top + bbox.height;
            };
            SimpleBarCore.prototype.findChild = function(el, query) {
                var matches = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
                return Array.prototype.filter.call(el.children, (function(child) {
                    return matches.call(child, query);
                }))[0];
            };
            SimpleBarCore.rtlHelpers = null;
            SimpleBarCore.defaultOptions = {
                forceVisible: false,
                clickOnTrack: true,
                scrollbarMinSize: 25,
                scrollbarMaxSize: 0,
                ariaLabel: "scrollable content",
                tabIndex: 0,
                classNames: {
                    contentEl: "simplebar-content",
                    contentWrapper: "simplebar-content-wrapper",
                    offset: "simplebar-offset",
                    mask: "simplebar-mask",
                    wrapper: "simplebar-wrapper",
                    placeholder: "simplebar-placeholder",
                    scrollbar: "simplebar-scrollbar",
                    track: "simplebar-track",
                    heightAutoObserverWrapperEl: "simplebar-height-auto-observer-wrapper",
                    heightAutoObserverEl: "simplebar-height-auto-observer",
                    visible: "simplebar-visible",
                    horizontal: "simplebar-horizontal",
                    vertical: "simplebar-vertical",
                    hover: "simplebar-hover",
                    dragging: "simplebar-dragging",
                    scrolling: "simplebar-scrolling",
                    scrollable: "simplebar-scrollable",
                    mouseEntered: "simplebar-mouse-entered"
                },
                scrollableNode: null,
                contentNode: null,
                autoHide: true
            };
            SimpleBarCore.getOptions = getOptions;
            SimpleBarCore.helpers = helpers;
            return SimpleBarCore;
        }();
        var extendStatics = function(d, b) {
            extendStatics = Object.setPrototypeOf || {
                __proto__: []
            } instanceof Array && function(d, b) {
                d.__proto__ = b;
            } || function(d, b) {
                for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
            };
            return extendStatics(d, b);
        };
        function __extends(d, b) {
            if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
            extendStatics(d, b);
            function __() {
                this.constructor = d;
            }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __);
        }
        var _a = SimpleBarCore.helpers, dist_getOptions = _a.getOptions, dist_addClasses = _a.addClasses, dist_canUseDOM = _a.canUseDOM;
        var SimpleBar = function(_super) {
            __extends(SimpleBar, _super);
            function SimpleBar() {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
                var _this = _super.apply(this, args) || this;
                SimpleBar.instances.set(args[0], _this);
                return _this;
            }
            SimpleBar.initDOMLoadedElements = function() {
                document.removeEventListener("DOMContentLoaded", this.initDOMLoadedElements);
                window.removeEventListener("load", this.initDOMLoadedElements);
                Array.prototype.forEach.call(document.querySelectorAll("[data-simplebar]"), (function(el) {
                    if (el.getAttribute("data-simplebar") !== "init" && !SimpleBar.instances.has(el)) new SimpleBar(el, dist_getOptions(el.attributes));
                }));
            };
            SimpleBar.removeObserver = function() {
                var _a;
                (_a = SimpleBar.globalObserver) === null || _a === void 0 ? void 0 : _a.disconnect();
            };
            SimpleBar.prototype.initDOM = function() {
                var _this = this;
                var _a, _b, _c;
                if (!Array.prototype.filter.call(this.el.children, (function(child) {
                    return child.classList.contains(_this.classNames.wrapper);
                })).length) {
                    this.wrapperEl = document.createElement("div");
                    this.contentWrapperEl = document.createElement("div");
                    this.offsetEl = document.createElement("div");
                    this.maskEl = document.createElement("div");
                    this.contentEl = document.createElement("div");
                    this.placeholderEl = document.createElement("div");
                    this.heightAutoObserverWrapperEl = document.createElement("div");
                    this.heightAutoObserverEl = document.createElement("div");
                    dist_addClasses(this.wrapperEl, this.classNames.wrapper);
                    dist_addClasses(this.contentWrapperEl, this.classNames.contentWrapper);
                    dist_addClasses(this.offsetEl, this.classNames.offset);
                    dist_addClasses(this.maskEl, this.classNames.mask);
                    dist_addClasses(this.contentEl, this.classNames.contentEl);
                    dist_addClasses(this.placeholderEl, this.classNames.placeholder);
                    dist_addClasses(this.heightAutoObserverWrapperEl, this.classNames.heightAutoObserverWrapperEl);
                    dist_addClasses(this.heightAutoObserverEl, this.classNames.heightAutoObserverEl);
                    while (this.el.firstChild) this.contentEl.appendChild(this.el.firstChild);
                    this.contentWrapperEl.appendChild(this.contentEl);
                    this.offsetEl.appendChild(this.contentWrapperEl);
                    this.maskEl.appendChild(this.offsetEl);
                    this.heightAutoObserverWrapperEl.appendChild(this.heightAutoObserverEl);
                    this.wrapperEl.appendChild(this.heightAutoObserverWrapperEl);
                    this.wrapperEl.appendChild(this.maskEl);
                    this.wrapperEl.appendChild(this.placeholderEl);
                    this.el.appendChild(this.wrapperEl);
                    (_a = this.contentWrapperEl) === null || _a === void 0 ? void 0 : _a.setAttribute("tabindex", this.options.tabIndex.toString());
                    (_b = this.contentWrapperEl) === null || _b === void 0 ? void 0 : _b.setAttribute("role", "region");
                    (_c = this.contentWrapperEl) === null || _c === void 0 ? void 0 : _c.setAttribute("aria-label", this.options.ariaLabel);
                }
                if (!this.axis.x.track.el || !this.axis.y.track.el) {
                    var track = document.createElement("div");
                    var scrollbar = document.createElement("div");
                    dist_addClasses(track, this.classNames.track);
                    dist_addClasses(scrollbar, this.classNames.scrollbar);
                    track.appendChild(scrollbar);
                    this.axis.x.track.el = track.cloneNode(true);
                    dist_addClasses(this.axis.x.track.el, this.classNames.horizontal);
                    this.axis.y.track.el = track.cloneNode(true);
                    dist_addClasses(this.axis.y.track.el, this.classNames.vertical);
                    this.el.appendChild(this.axis.x.track.el);
                    this.el.appendChild(this.axis.y.track.el);
                }
                SimpleBarCore.prototype.initDOM.call(this);
                this.el.setAttribute("data-simplebar", "init");
            };
            SimpleBar.prototype.unMount = function() {
                SimpleBarCore.prototype.unMount.call(this);
                SimpleBar.instances["delete"](this.el);
            };
            SimpleBar.initHtmlApi = function() {
                this.initDOMLoadedElements = this.initDOMLoadedElements.bind(this);
                if (typeof MutationObserver !== "undefined") {
                    this.globalObserver = new MutationObserver(SimpleBar.handleMutations);
                    this.globalObserver.observe(document, {
                        childList: true,
                        subtree: true
                    });
                }
                if (document.readyState === "complete" || document.readyState !== "loading" && !document.documentElement.doScroll) window.setTimeout(this.initDOMLoadedElements); else {
                    document.addEventListener("DOMContentLoaded", this.initDOMLoadedElements);
                    window.addEventListener("load", this.initDOMLoadedElements);
                }
            };
            SimpleBar.handleMutations = function(mutations) {
                mutations.forEach((function(mutation) {
                    mutation.addedNodes.forEach((function(addedNode) {
                        if (addedNode.nodeType === 1) if (addedNode.hasAttribute("data-simplebar")) !SimpleBar.instances.has(addedNode) && document.documentElement.contains(addedNode) && new SimpleBar(addedNode, dist_getOptions(addedNode.attributes)); else addedNode.querySelectorAll("[data-simplebar]").forEach((function(el) {
                            if (el.getAttribute("data-simplebar") !== "init" && !SimpleBar.instances.has(el) && document.documentElement.contains(el)) new SimpleBar(el, dist_getOptions(el.attributes));
                        }));
                    }));
                    mutation.removedNodes.forEach((function(removedNode) {
                        var _a;
                        if (removedNode.nodeType === 1) if (removedNode.getAttribute("data-simplebar") === "init") !document.documentElement.contains(removedNode) && ((_a = SimpleBar.instances.get(removedNode)) === null || _a === void 0 ? void 0 : _a.unMount()); else Array.prototype.forEach.call(removedNode.querySelectorAll('[data-simplebar="init"]'), (function(el) {
                            var _a;
                            !document.documentElement.contains(el) && ((_a = SimpleBar.instances.get(el)) === null || _a === void 0 ? void 0 : _a.unMount());
                        }));
                    }));
                }));
            };
            SimpleBar.instances = new WeakMap;
            return SimpleBar;
        }(SimpleBarCore);
        if (dist_canUseDOM) SimpleBar.initHtmlApi();
        if (document.querySelectorAll("[data-simplebar]").length) document.querySelectorAll("[data-simplebar]").forEach((scrollBlock => {
            new SimpleBar(scrollBlock, {
                autoHide: false
            });
        }));
        let addWindowScrollEvent = false;
        function pageNavigation() {
            document.addEventListener("click", pageNavigationAction);
            document.addEventListener("watcherCallback", pageNavigationAction);
            function pageNavigationAction(e) {
                if (e.type === "click") {
                    const targetElement = e.target;
                    if (targetElement.closest("[data-goto]")) {
                        const gotoLink = targetElement.closest("[data-goto]");
                        const gotoLinkSelector = gotoLink.dataset.goto ? gotoLink.dataset.goto : "";
                        const noHeader = gotoLink.hasAttribute("data-goto-header") ? true : false;
                        const gotoSpeed = gotoLink.dataset.gotoSpeed ? gotoLink.dataset.gotoSpeed : 500;
                        const offsetTop = gotoLink.dataset.gotoTop ? parseInt(gotoLink.dataset.gotoTop) : 0;
                        gotoblock_gotoBlock(gotoLinkSelector, noHeader, gotoSpeed, offsetTop);
                        e.preventDefault();
                    }
                } else if (e.type === "watcherCallback" && e.detail) {
                    const entry = e.detail.entry;
                    const targetElement = entry.target;
                    if (targetElement.dataset.watch === "navigator") {
                        document.querySelector(`[data-goto]._navigator-active`);
                        let navigatorCurrentItem;
                        if (targetElement.id && document.querySelector(`[data-goto="#${targetElement.id}"]`)) navigatorCurrentItem = document.querySelector(`[data-goto="#${targetElement.id}"]`); else if (targetElement.classList.length) for (let index = 0; index < targetElement.classList.length; index++) {
                            const element = targetElement.classList[index];
                            if (document.querySelector(`[data-goto=".${element}"]`)) {
                                navigatorCurrentItem = document.querySelector(`[data-goto=".${element}"]`);
                                break;
                            }
                        }
                        if (entry.isIntersecting) navigatorCurrentItem ? navigatorCurrentItem.classList.add("_navigator-active") : null; else navigatorCurrentItem ? navigatorCurrentItem.classList.remove("_navigator-active") : null;
                    }
                }
            }
            if (getHash()) {
                let goToHash;
                if (document.querySelector(`#${getHash()}`)) goToHash = `#${getHash()}`; else if (document.querySelector(`.${getHash()}`)) goToHash = `.${getHash()}`;
                goToHash ? gotoblock_gotoBlock(goToHash, true, 500, 20) : null;
            }
        }
        setTimeout((() => {
            if (addWindowScrollEvent) {
                let windowScroll = new Event("windowScroll");
                window.addEventListener("scroll", (function(e) {
                    document.dispatchEvent(windowScroll);
                }));
            }
        }), 0);
        document.addEventListener("DOMContentLoaded", (() => {
            const teacherInput = document.querySelector('input[name="teacherName"]');
            const electiveInput = document.querySelector('input[name="electiveName"]');
            const resetButton = document.querySelector(".electives__btn");
            const loadMoreButton = document.querySelector(".electives__more-btn");
            const allItems = Array.from(document.querySelectorAll(".electives__block"));
            let filteredItems = [ ...allItems ];
            let visibleItems = 6;
            if (teacherInput && electiveInput) {
                function updateVisibility() {
                    allItems.forEach((item => item.classList.remove("visible")));
                    filteredItems.slice(0, visibleItems).forEach((item => item.classList.add("visible")));
                    loadMoreButton.style.display = visibleItems >= filteredItems.length ? "none" : "block";
                }
                function filterCards() {
                    const teacherValue = teacherInput.value.trim().toLowerCase();
                    const electiveValue = electiveInput.value.trim().toLowerCase();
                    filteredItems = allItems.filter((item => {
                        const authorElement = item.querySelector(".elective-block__author-name");
                        const titleElement = item.querySelector(".elective-block__title");
                        const authorName = authorElement?.textContent?.toLowerCase() || "";
                        const title = titleElement?.textContent?.toLowerCase() || "";
                        return authorName.includes(teacherValue) && title.includes(electiveValue);
                    }));
                    visibleItems = 6;
                    updateVisibility();
                }
                function resetFilters() {
                    teacherInput.value = "";
                    electiveInput.value = "";
                    filteredItems = [ ...allItems ];
                    visibleItems = 6;
                    updateVisibility();
                }
                function loadMore() {
                    visibleItems += 3;
                    updateVisibility();
                }
                updateVisibility();
                teacherInput?.addEventListener("input", filterCards);
                electiveInput?.addEventListener("input", filterCards);
                resetButton?.addEventListener("click", resetFilters);
                loadMoreButton?.addEventListener("click", loadMore);
            }
        }));
        window.addEventListener("DOMContentLoaded", (() => {
            const textElement = document.querySelectorAll(".elective-block__description-wrapper");
            const maxLength = 600;
            if (textElement) textElement.forEach((el => {
                let content = el.innerHTML;
                if (content.length > maxLength) el.innerHTML = content.substr(0, content.lastIndexOf(" ", maxLength)) + "...";
            }));
        }));
        isWebp();
        menuInit();
        spollers();
        formFieldsInit({
            viewPass: false
        });
        pageNavigation();
    })();
})();