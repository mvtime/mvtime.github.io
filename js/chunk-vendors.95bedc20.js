(self["webpackChunkmvtime"]=self["webpackChunkmvtime"]||[]).push([[998],{9662:function(e,t,n){var r=n(614),i=n(6330),o=TypeError;e.exports=function(e){if(r(e))return e;throw o(i(e)+" is not a function")}},6077:function(e,t,n){var r=n(614),i=String,o=TypeError;e.exports=function(e){if("object"==typeof e||r(e))return e;throw o("Can't set "+i(e)+" as a prototype")}},5787:function(e,t,n){var r=n(7976),i=TypeError;e.exports=function(e,t){if(r(t,e))return e;throw i("Incorrect invocation")}},9670:function(e,t,n){var r=n(111),i=String,o=TypeError;e.exports=function(e){if(r(e))return e;throw o(i(e)+" is not an object")}},3013:function(e){e.exports="undefined"!=typeof ArrayBuffer&&"undefined"!=typeof DataView},260:function(e,t,n){"use strict";var r,i,o,s=n(3013),a=n(9781),c=n(7854),u=n(614),l=n(111),h=n(2597),f=n(648),d=n(6330),p=n(8880),g=n(8052),m=n(7045),y=n(7976),v=n(9518),w=n(7674),b=n(5112),E=n(9711),_=n(9909),T=_.enforce,I=_.get,S=c.Int8Array,k=S&&S.prototype,A=c.Uint8ClampedArray,C=A&&A.prototype,x=S&&v(S),O=k&&v(k),N=Object.prototype,R=c.TypeError,D=b("toStringTag"),P=E("TYPED_ARRAY_TAG"),L="TypedArrayConstructor",M=s&&!!w&&"Opera"!==f(c.opera),j=!1,F={Int8Array:1,Uint8Array:1,Uint8ClampedArray:1,Int16Array:2,Uint16Array:2,Int32Array:4,Uint32Array:4,Float32Array:4,Float64Array:8},U={BigInt64Array:8,BigUint64Array:8},V=function(e){if(!l(e))return!1;var t=f(e);return"DataView"===t||h(F,t)||h(U,t)},q=function(e){var t=v(e);if(l(t)){var n=I(t);return n&&h(n,L)?n[L]:q(t)}},$=function(e){if(!l(e))return!1;var t=f(e);return h(F,t)||h(U,t)},B=function(e){if($(e))return e;throw R("Target is not a typed array")},H=function(e){if(u(e)&&(!w||y(x,e)))return e;throw R(d(e)+" is not a typed array constructor")},z=function(e,t,n,r){if(a){if(n)for(var i in F){var o=c[i];if(o&&h(o.prototype,e))try{delete o.prototype[e]}catch(s){try{o.prototype[e]=t}catch(u){}}}O[e]&&!n||g(O,e,n?t:M&&k[e]||t,r)}},W=function(e,t,n){var r,i;if(a){if(w){if(n)for(r in F)if(i=c[r],i&&h(i,e))try{delete i[e]}catch(o){}if(x[e]&&!n)return;try{return g(x,e,n?t:M&&x[e]||t)}catch(o){}}for(r in F)i=c[r],!i||i[e]&&!n||g(i,e,t)}};for(r in F)i=c[r],o=i&&i.prototype,o?T(o)[L]=i:M=!1;for(r in U)i=c[r],o=i&&i.prototype,o&&(T(o)[L]=i);if((!M||!u(x)||x===Function.prototype)&&(x=function(){throw R("Incorrect invocation")},M))for(r in F)c[r]&&w(c[r],x);if((!M||!O||O===N)&&(O=x.prototype,M))for(r in F)c[r]&&w(c[r].prototype,O);if(M&&v(C)!==O&&w(C,O),a&&!h(O,D))for(r in j=!0,m(O,D,{configurable:!0,get:function(){return l(this)?this[P]:void 0}}),F)c[r]&&p(c[r],P,r);e.exports={NATIVE_ARRAY_BUFFER_VIEWS:M,TYPED_ARRAY_TAG:j&&P,aTypedArray:B,aTypedArrayConstructor:H,exportTypedArrayMethod:z,exportTypedArrayStaticMethod:W,getTypedArrayConstructor:q,isView:V,isTypedArray:$,TypedArray:x,TypedArrayPrototype:O}},7745:function(e,t,n){var r=n(6244);e.exports=function(e,t){var n=0,i=r(t),o=new e(i);while(i>n)o[n]=t[n++];return o}},1318:function(e,t,n){var r=n(5656),i=n(1400),o=n(6244),s=function(e){return function(t,n,s){var a,c=r(t),u=o(c),l=i(s,u);if(e&&n!=n){while(u>l)if(a=c[l++],a!=a)return!0}else for(;u>l;l++)if((e||l in c)&&c[l]===n)return e||l||0;return!e&&-1}};e.exports={includes:s(!0),indexOf:s(!1)}},3658:function(e,t,n){"use strict";var r=n(9781),i=n(3157),o=TypeError,s=Object.getOwnPropertyDescriptor,a=r&&!function(){if(void 0!==this)return!0;try{Object.defineProperty([],"length",{writable:!1}).length=1}catch(e){return e instanceof TypeError}}();e.exports=a?function(e,t){if(i(e)&&!s(e,"length").writable)throw o("Cannot set read only .length");return e.length=t}:function(e,t){return e.length=t}},1843:function(e,t,n){var r=n(6244);e.exports=function(e,t){for(var n=r(e),i=new t(n),o=0;o<n;o++)i[o]=e[n-o-1];return i}},1572:function(e,t,n){var r=n(6244),i=n(9303),o=RangeError;e.exports=function(e,t,n,s){var a=r(e),c=i(n),u=c<0?a+c:c;if(u>=a||u<0)throw o("Incorrect index");for(var l=new t(a),h=0;h<a;h++)l[h]=h===u?s:e[h];return l}},4326:function(e,t,n){var r=n(1702),i=r({}.toString),o=r("".slice);e.exports=function(e){return o(i(e),8,-1)}},648:function(e,t,n){var r=n(1694),i=n(614),o=n(4326),s=n(5112),a=s("toStringTag"),c=Object,u="Arguments"==o(function(){return arguments}()),l=function(e,t){try{return e[t]}catch(n){}};e.exports=r?o:function(e){var t,n,r;return void 0===e?"Undefined":null===e?"Null":"string"==typeof(n=l(t=c(e),a))?n:u?o(t):"Object"==(r=o(t))&&i(t.callee)?"Arguments":r}},9920:function(e,t,n){var r=n(2597),i=n(3887),o=n(1236),s=n(3070);e.exports=function(e,t,n){for(var a=i(t),c=s.f,u=o.f,l=0;l<a.length;l++){var h=a[l];r(e,h)||n&&r(n,h)||c(e,h,u(t,h))}}},8544:function(e,t,n){var r=n(7293);e.exports=!r((function(){function e(){}return e.prototype.constructor=null,Object.getPrototypeOf(new e)!==e.prototype}))},8880:function(e,t,n){var r=n(9781),i=n(3070),o=n(9114);e.exports=r?function(e,t,n){return i.f(e,t,o(1,n))}:function(e,t,n){return e[t]=n,e}},9114:function(e){e.exports=function(e,t){return{enumerable:!(1&e),configurable:!(2&e),writable:!(4&e),value:t}}},7045:function(e,t,n){var r=n(6339),i=n(3070);e.exports=function(e,t,n){return n.get&&r(n.get,t,{getter:!0}),n.set&&r(n.set,t,{setter:!0}),i.f(e,t,n)}},8052:function(e,t,n){var r=n(614),i=n(3070),o=n(6339),s=n(3072);e.exports=function(e,t,n,a){a||(a={});var c=a.enumerable,u=void 0!==a.name?a.name:t;if(r(n)&&o(n,u,a),a.global)c?e[t]=n:s(t,n);else{try{a.unsafe?e[t]&&(c=!0):delete e[t]}catch(l){}c?e[t]=n:i.f(e,t,{value:n,enumerable:!1,configurable:!a.nonConfigurable,writable:!a.nonWritable})}return e}},3072:function(e,t,n){var r=n(7854),i=Object.defineProperty;e.exports=function(e,t){try{i(r,e,{value:t,configurable:!0,writable:!0})}catch(n){r[e]=t}return t}},5117:function(e,t,n){"use strict";var r=n(6330),i=TypeError;e.exports=function(e,t){if(!delete e[t])throw i("Cannot delete property "+r(t)+" of "+r(e))}},9781:function(e,t,n){var r=n(7293);e.exports=!r((function(){return 7!=Object.defineProperty({},1,{get:function(){return 7}})[1]}))},4154:function(e){var t="object"==typeof document&&document.all,n="undefined"==typeof t&&void 0!==t;e.exports={all:t,IS_HTMLDDA:n}},317:function(e,t,n){var r=n(7854),i=n(111),o=r.document,s=i(o)&&i(o.createElement);e.exports=function(e){return s?o.createElement(e):{}}},7207:function(e){var t=TypeError,n=9007199254740991;e.exports=function(e){if(e>n)throw t("Maximum allowed index exceeded");return e}},3678:function(e){e.exports={IndexSizeError:{s:"INDEX_SIZE_ERR",c:1,m:1},DOMStringSizeError:{s:"DOMSTRING_SIZE_ERR",c:2,m:0},HierarchyRequestError:{s:"HIERARCHY_REQUEST_ERR",c:3,m:1},WrongDocumentError:{s:"WRONG_DOCUMENT_ERR",c:4,m:1},InvalidCharacterError:{s:"INVALID_CHARACTER_ERR",c:5,m:1},NoDataAllowedError:{s:"NO_DATA_ALLOWED_ERR",c:6,m:0},NoModificationAllowedError:{s:"NO_MODIFICATION_ALLOWED_ERR",c:7,m:1},NotFoundError:{s:"NOT_FOUND_ERR",c:8,m:1},NotSupportedError:{s:"NOT_SUPPORTED_ERR",c:9,m:1},InUseAttributeError:{s:"INUSE_ATTRIBUTE_ERR",c:10,m:1},InvalidStateError:{s:"INVALID_STATE_ERR",c:11,m:1},SyntaxError:{s:"SYNTAX_ERR",c:12,m:1},InvalidModificationError:{s:"INVALID_MODIFICATION_ERR",c:13,m:1},NamespaceError:{s:"NAMESPACE_ERR",c:14,m:1},InvalidAccessError:{s:"INVALID_ACCESS_ERR",c:15,m:1},ValidationError:{s:"VALIDATION_ERR",c:16,m:0},TypeMismatchError:{s:"TYPE_MISMATCH_ERR",c:17,m:1},SecurityError:{s:"SECURITY_ERR",c:18,m:1},NetworkError:{s:"NETWORK_ERR",c:19,m:1},AbortError:{s:"ABORT_ERR",c:20,m:1},URLMismatchError:{s:"URL_MISMATCH_ERR",c:21,m:1},QuotaExceededError:{s:"QUOTA_EXCEEDED_ERR",c:22,m:1},TimeoutError:{s:"TIMEOUT_ERR",c:23,m:1},InvalidNodeTypeError:{s:"INVALID_NODE_TYPE_ERR",c:24,m:1},DataCloneError:{s:"DATA_CLONE_ERR",c:25,m:1}}},8113:function(e){e.exports="undefined"!=typeof navigator&&String(navigator.userAgent)||""},7392:function(e,t,n){var r,i,o=n(7854),s=n(8113),a=o.process,c=o.Deno,u=a&&a.versions||c&&c.version,l=u&&u.v8;l&&(r=l.split("."),i=r[0]>0&&r[0]<4?1:+(r[0]+r[1])),!i&&s&&(r=s.match(/Edge\/(\d+)/),(!r||r[1]>=74)&&(r=s.match(/Chrome\/(\d+)/),r&&(i=+r[1]))),e.exports=i},748:function(e){e.exports=["constructor","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf"]},1060:function(e,t,n){var r=n(1702),i=Error,o=r("".replace),s=function(e){return String(i(e).stack)}("zxcasd"),a=/\n\s*at [^:]*:[^\n]*/,c=a.test(s);e.exports=function(e,t){if(c&&"string"==typeof e&&!i.prepareStackTrace)while(t--)e=o(e,a,"");return e}},2109:function(e,t,n){var r=n(7854),i=n(1236).f,o=n(8880),s=n(8052),a=n(3072),c=n(9920),u=n(4705);e.exports=function(e,t){var n,l,h,f,d,p,g=e.target,m=e.global,y=e.stat;if(l=m?r:y?r[g]||a(g,{}):(r[g]||{}).prototype,l)for(h in t){if(d=t[h],e.dontCallGetSet?(p=i(l,h),f=p&&p.value):f=l[h],n=u(m?h:g+(y?".":"#")+h,e.forced),!n&&void 0!==f){if(typeof d==typeof f)continue;c(d,f)}(e.sham||f&&f.sham)&&o(d,"sham",!0),s(l,h,d,e)}}},7293:function(e){e.exports=function(e){try{return!!e()}catch(t){return!0}}},4374:function(e,t,n){var r=n(7293);e.exports=!r((function(){var e=function(){}.bind();return"function"!=typeof e||e.hasOwnProperty("prototype")}))},6916:function(e,t,n){var r=n(4374),i=Function.prototype.call;e.exports=r?i.bind(i):function(){return i.apply(i,arguments)}},6530:function(e,t,n){var r=n(9781),i=n(2597),o=Function.prototype,s=r&&Object.getOwnPropertyDescriptor,a=i(o,"name"),c=a&&"something"===function(){}.name,u=a&&(!r||r&&s(o,"name").configurable);e.exports={EXISTS:a,PROPER:c,CONFIGURABLE:u}},5668:function(e,t,n){var r=n(1702),i=n(9662);e.exports=function(e,t,n){try{return r(i(Object.getOwnPropertyDescriptor(e,t)[n]))}catch(o){}}},1702:function(e,t,n){var r=n(4374),i=Function.prototype,o=i.call,s=r&&i.bind.bind(o,o);e.exports=r?s:function(e){return function(){return o.apply(e,arguments)}}},5005:function(e,t,n){var r=n(7854),i=n(614),o=function(e){return i(e)?e:void 0};e.exports=function(e,t){return arguments.length<2?o(r[e]):r[e]&&r[e][t]}},8173:function(e,t,n){var r=n(9662),i=n(8554);e.exports=function(e,t){var n=e[t];return i(n)?void 0:r(n)}},7854:function(e,t,n){var r=function(e){return e&&e.Math==Math&&e};e.exports=r("object"==typeof globalThis&&globalThis)||r("object"==typeof window&&window)||r("object"==typeof self&&self)||r("object"==typeof n.g&&n.g)||function(){return this}()||Function("return this")()},2597:function(e,t,n){var r=n(1702),i=n(7908),o=r({}.hasOwnProperty);e.exports=Object.hasOwn||function(e,t){return o(i(e),t)}},3501:function(e){e.exports={}},4664:function(e,t,n){var r=n(9781),i=n(7293),o=n(317);e.exports=!r&&!i((function(){return 7!=Object.defineProperty(o("div"),"a",{get:function(){return 7}}).a}))},8361:function(e,t,n){var r=n(1702),i=n(7293),o=n(4326),s=Object,a=r("".split);e.exports=i((function(){return!s("z").propertyIsEnumerable(0)}))?function(e){return"String"==o(e)?a(e,""):s(e)}:s},9587:function(e,t,n){var r=n(614),i=n(111),o=n(7674);e.exports=function(e,t,n){var s,a;return o&&r(s=t.constructor)&&s!==n&&i(a=s.prototype)&&a!==n.prototype&&o(e,a),e}},2788:function(e,t,n){var r=n(1702),i=n(614),o=n(5465),s=r(Function.toString);i(o.inspectSource)||(o.inspectSource=function(e){return s(e)}),e.exports=o.inspectSource},9909:function(e,t,n){var r,i,o,s=n(4811),a=n(7854),c=n(111),u=n(8880),l=n(2597),h=n(5465),f=n(6200),d=n(3501),p="Object already initialized",g=a.TypeError,m=a.WeakMap,y=function(e){return o(e)?i(e):r(e,{})},v=function(e){return function(t){var n;if(!c(t)||(n=i(t)).type!==e)throw g("Incompatible receiver, "+e+" required");return n}};if(s||h.state){var w=h.state||(h.state=new m);w.get=w.get,w.has=w.has,w.set=w.set,r=function(e,t){if(w.has(e))throw g(p);return t.facade=e,w.set(e,t),t},i=function(e){return w.get(e)||{}},o=function(e){return w.has(e)}}else{var b=f("state");d[b]=!0,r=function(e,t){if(l(e,b))throw g(p);return t.facade=e,u(e,b,t),t},i=function(e){return l(e,b)?e[b]:{}},o=function(e){return l(e,b)}}e.exports={set:r,get:i,has:o,enforce:y,getterFor:v}},3157:function(e,t,n){var r=n(4326);e.exports=Array.isArray||function(e){return"Array"==r(e)}},4067:function(e,t,n){var r=n(648);e.exports=function(e){var t=r(e);return"BigInt64Array"==t||"BigUint64Array"==t}},614:function(e,t,n){var r=n(4154),i=r.all;e.exports=r.IS_HTMLDDA?function(e){return"function"==typeof e||e===i}:function(e){return"function"==typeof e}},4705:function(e,t,n){var r=n(7293),i=n(614),o=/#|\.prototype\./,s=function(e,t){var n=c[a(e)];return n==l||n!=u&&(i(t)?r(t):!!t)},a=s.normalize=function(e){return String(e).replace(o,".").toLowerCase()},c=s.data={},u=s.NATIVE="N",l=s.POLYFILL="P";e.exports=s},8554:function(e){e.exports=function(e){return null===e||void 0===e}},111:function(e,t,n){var r=n(614),i=n(4154),o=i.all;e.exports=i.IS_HTMLDDA?function(e){return"object"==typeof e?null!==e:r(e)||e===o}:function(e){return"object"==typeof e?null!==e:r(e)}},1913:function(e){e.exports=!1},2190:function(e,t,n){var r=n(5005),i=n(614),o=n(7976),s=n(3307),a=Object;e.exports=s?function(e){return"symbol"==typeof e}:function(e){var t=r("Symbol");return i(t)&&o(t.prototype,a(e))}},6244:function(e,t,n){var r=n(7466);e.exports=function(e){return r(e.length)}},6339:function(e,t,n){var r=n(1702),i=n(7293),o=n(614),s=n(2597),a=n(9781),c=n(6530).CONFIGURABLE,u=n(2788),l=n(9909),h=l.enforce,f=l.get,d=String,p=Object.defineProperty,g=r("".slice),m=r("".replace),y=r([].join),v=a&&!i((function(){return 8!==p((function(){}),"length",{value:8}).length})),w=String(String).split("String"),b=e.exports=function(e,t,n){"Symbol("===g(d(t),0,7)&&(t="["+m(d(t),/^Symbol\(([^)]*)\)/,"$1")+"]"),n&&n.getter&&(t="get "+t),n&&n.setter&&(t="set "+t),(!s(e,"name")||c&&e.name!==t)&&(a?p(e,"name",{value:t,configurable:!0}):e.name=t),v&&n&&s(n,"arity")&&e.length!==n.arity&&p(e,"length",{value:n.arity});try{n&&s(n,"constructor")&&n.constructor?a&&p(e,"prototype",{writable:!1}):e.prototype&&(e.prototype=void 0)}catch(i){}var r=h(e);return s(r,"source")||(r.source=y(w,"string"==typeof t?t:"")),e};Function.prototype.toString=b((function(){return o(this)&&f(this).source||u(this)}),"toString")},4758:function(e){var t=Math.ceil,n=Math.floor;e.exports=Math.trunc||function(e){var r=+e;return(r>0?n:t)(r)}},6277:function(e,t,n){var r=n(1340);e.exports=function(e,t){return void 0===e?arguments.length<2?"":t:r(e)}},3070:function(e,t,n){var r=n(9781),i=n(4664),o=n(3353),s=n(9670),a=n(4948),c=TypeError,u=Object.defineProperty,l=Object.getOwnPropertyDescriptor,h="enumerable",f="configurable",d="writable";t.f=r?o?function(e,t,n){if(s(e),t=a(t),s(n),"function"===typeof e&&"prototype"===t&&"value"in n&&d in n&&!n[d]){var r=l(e,t);r&&r[d]&&(e[t]=n.value,n={configurable:f in n?n[f]:r[f],enumerable:h in n?n[h]:r[h],writable:!1})}return u(e,t,n)}:u:function(e,t,n){if(s(e),t=a(t),s(n),i)try{return u(e,t,n)}catch(r){}if("get"in n||"set"in n)throw c("Accessors not supported");return"value"in n&&(e[t]=n.value),e}},1236:function(e,t,n){var r=n(9781),i=n(6916),o=n(5296),s=n(9114),a=n(5656),c=n(4948),u=n(2597),l=n(4664),h=Object.getOwnPropertyDescriptor;t.f=r?h:function(e,t){if(e=a(e),t=c(t),l)try{return h(e,t)}catch(n){}if(u(e,t))return s(!i(o.f,e,t),e[t])}},8006:function(e,t,n){var r=n(6324),i=n(748),o=i.concat("length","prototype");t.f=Object.getOwnPropertyNames||function(e){return r(e,o)}},5181:function(e,t){t.f=Object.getOwnPropertySymbols},9518:function(e,t,n){var r=n(2597),i=n(614),o=n(7908),s=n(6200),a=n(8544),c=s("IE_PROTO"),u=Object,l=u.prototype;e.exports=a?u.getPrototypeOf:function(e){var t=o(e);if(r(t,c))return t[c];var n=t.constructor;return i(n)&&t instanceof n?n.prototype:t instanceof u?l:null}},7976:function(e,t,n){var r=n(1702);e.exports=r({}.isPrototypeOf)},6324:function(e,t,n){var r=n(1702),i=n(2597),o=n(5656),s=n(1318).indexOf,a=n(3501),c=r([].push);e.exports=function(e,t){var n,r=o(e),u=0,l=[];for(n in r)!i(a,n)&&i(r,n)&&c(l,n);while(t.length>u)i(r,n=t[u++])&&(~s(l,n)||c(l,n));return l}},5296:function(e,t){"use strict";var n={}.propertyIsEnumerable,r=Object.getOwnPropertyDescriptor,i=r&&!n.call({1:2},1);t.f=i?function(e){var t=r(this,e);return!!t&&t.enumerable}:n},7674:function(e,t,n){var r=n(5668),i=n(9670),o=n(6077);e.exports=Object.setPrototypeOf||("__proto__"in{}?function(){var e,t=!1,n={};try{e=r(Object.prototype,"__proto__","set"),e(n,[]),t=n instanceof Array}catch(s){}return function(n,r){return i(n),o(r),t?e(n,r):n.__proto__=r,n}}():void 0)},2140:function(e,t,n){var r=n(6916),i=n(614),o=n(111),s=TypeError;e.exports=function(e,t){var n,a;if("string"===t&&i(n=e.toString)&&!o(a=r(n,e)))return a;if(i(n=e.valueOf)&&!o(a=r(n,e)))return a;if("string"!==t&&i(n=e.toString)&&!o(a=r(n,e)))return a;throw s("Can't convert object to primitive value")}},3887:function(e,t,n){var r=n(5005),i=n(1702),o=n(8006),s=n(5181),a=n(9670),c=i([].concat);e.exports=r("Reflect","ownKeys")||function(e){var t=o.f(a(e)),n=s.f;return n?c(t,n(e)):t}},4488:function(e,t,n){var r=n(8554),i=TypeError;e.exports=function(e){if(r(e))throw i("Can't call method on "+e);return e}},6200:function(e,t,n){var r=n(2309),i=n(9711),o=r("keys");e.exports=function(e){return o[e]||(o[e]=i(e))}},5465:function(e,t,n){var r=n(7854),i=n(3072),o="__core-js_shared__",s=r[o]||i(o,{});e.exports=s},2309:function(e,t,n){var r=n(1913),i=n(5465);(e.exports=function(e,t){return i[e]||(i[e]=void 0!==t?t:{})})("versions",[]).push({version:"3.29.0",mode:r?"pure":"global",copyright:"© 2014-2023 Denis Pushkarev (zloirock.ru)",license:"https://github.com/zloirock/core-js/blob/v3.29.0/LICENSE",source:"https://github.com/zloirock/core-js"})},6293:function(e,t,n){var r=n(7392),i=n(7293);e.exports=!!Object.getOwnPropertySymbols&&!i((function(){var e=Symbol();return!String(e)||!(Object(e)instanceof Symbol)||!Symbol.sham&&r&&r<41}))},1400:function(e,t,n){var r=n(9303),i=Math.max,o=Math.min;e.exports=function(e,t){var n=r(e);return n<0?i(n+t,0):o(n,t)}},4599:function(e,t,n){var r=n(7593),i=TypeError;e.exports=function(e){var t=r(e,"number");if("number"==typeof t)throw i("Can't convert number to bigint");return BigInt(t)}},5656:function(e,t,n){var r=n(8361),i=n(4488);e.exports=function(e){return r(i(e))}},9303:function(e,t,n){var r=n(4758);e.exports=function(e){var t=+e;return t!==t||0===t?0:r(t)}},7466:function(e,t,n){var r=n(9303),i=Math.min;e.exports=function(e){return e>0?i(r(e),9007199254740991):0}},7908:function(e,t,n){var r=n(4488),i=Object;e.exports=function(e){return i(r(e))}},7593:function(e,t,n){var r=n(6916),i=n(111),o=n(2190),s=n(8173),a=n(2140),c=n(5112),u=TypeError,l=c("toPrimitive");e.exports=function(e,t){if(!i(e)||o(e))return e;var n,c=s(e,l);if(c){if(void 0===t&&(t="default"),n=r(c,e,t),!i(n)||o(n))return n;throw u("Can't convert object to primitive value")}return void 0===t&&(t="number"),a(e,t)}},4948:function(e,t,n){var r=n(7593),i=n(2190);e.exports=function(e){var t=r(e,"string");return i(t)?t:t+""}},1694:function(e,t,n){var r=n(5112),i=r("toStringTag"),o={};o[i]="z",e.exports="[object z]"===String(o)},1340:function(e,t,n){var r=n(648),i=String;e.exports=function(e){if("Symbol"===r(e))throw TypeError("Cannot convert a Symbol value to a string");return i(e)}},6330:function(e){var t=String;e.exports=function(e){try{return t(e)}catch(n){return"Object"}}},9711:function(e,t,n){var r=n(1702),i=0,o=Math.random(),s=r(1..toString);e.exports=function(e){return"Symbol("+(void 0===e?"":e)+")_"+s(++i+o,36)}},3307:function(e,t,n){var r=n(6293);e.exports=r&&!Symbol.sham&&"symbol"==typeof Symbol.iterator},3353:function(e,t,n){var r=n(9781),i=n(7293);e.exports=r&&i((function(){return 42!=Object.defineProperty((function(){}),"prototype",{value:42,writable:!1}).prototype}))},4811:function(e,t,n){var r=n(7854),i=n(614),o=r.WeakMap;e.exports=i(o)&&/native code/.test(String(o))},5112:function(e,t,n){var r=n(7854),i=n(2309),o=n(2597),s=n(9711),a=n(6293),c=n(3307),u=r.Symbol,l=i("wks"),h=c?u["for"]||u:u&&u.withoutSetter||s;e.exports=function(e){return o(l,e)||(l[e]=a&&o(u,e)?u[e]:h("Symbol."+e)),l[e]}},7658:function(e,t,n){"use strict";var r=n(2109),i=n(7908),o=n(6244),s=n(3658),a=n(7207),c=n(7293),u=c((function(){return 4294967297!==[].push.call({length:4294967296},1)})),l=function(){try{Object.defineProperty([],"length",{writable:!1}).push()}catch(e){return e instanceof TypeError}},h=u||!l();r({target:"Array",proto:!0,arity:1,forced:h},{push:function(e){var t=i(this),n=o(t),r=arguments.length;a(n+r);for(var c=0;c<r;c++)t[n]=arguments[c],n++;return s(t,n),n}})},541:function(e,t,n){"use strict";var r=n(2109),i=n(7908),o=n(6244),s=n(3658),a=n(5117),c=n(7207),u=1!==[].unshift(0),l=function(){try{Object.defineProperty([],"length",{writable:!1}).unshift()}catch(e){return e instanceof TypeError}},h=u||!l();r({target:"Array",proto:!0,arity:1,forced:h},{unshift:function(e){var t=i(this),n=o(t),r=arguments.length;if(r){c(n+r);var u=n;while(u--){var l=u+r;u in t?t[l]=t[u]:a(t,l)}for(var h=0;h<r;h++)t[h]=arguments[h]}return s(t,n+r)}})},1439:function(e,t,n){"use strict";var r=n(1843),i=n(260),o=i.aTypedArray,s=i.exportTypedArrayMethod,a=i.getTypedArrayConstructor;s("toReversed",(function(){return r(o(this),a(this))}))},7585:function(e,t,n){"use strict";var r=n(260),i=n(1702),o=n(9662),s=n(7745),a=r.aTypedArray,c=r.getTypedArrayConstructor,u=r.exportTypedArrayMethod,l=i(r.TypedArrayPrototype.sort);u("toSorted",(function(e){void 0!==e&&o(e);var t=a(this),n=s(c(t),t);return l(n,e)}))},5315:function(e,t,n){"use strict";var r=n(1572),i=n(260),o=n(4067),s=n(9303),a=n(4599),c=i.aTypedArray,u=i.getTypedArrayConstructor,l=i.exportTypedArrayMethod,h=!!function(){try{new Int8Array(1)["with"](2,{valueOf:function(){throw 8}})}catch(e){return 8===e}}();l("with",{with:function(e,t){var n=c(this),i=s(e),l=o(n)?a(t):+t;return r(n,u(n),i,l)}}["with"],!h)},3767:function(e,t,n){n(1439)},8585:function(e,t,n){n(7585)},8696:function(e,t,n){n(5315)},2801:function(e,t,n){"use strict";var r=n(2109),i=n(7854),o=n(5005),s=n(9114),a=n(3070).f,c=n(2597),u=n(5787),l=n(9587),h=n(6277),f=n(3678),d=n(1060),p=n(9781),g=n(1913),m="DOMException",y=o("Error"),v=o(m),w=function(){u(this,b);var e=arguments.length,t=h(e<1?void 0:arguments[0]),n=h(e<2?void 0:arguments[1],"Error"),r=new v(t,n),i=y(t);return i.name=m,a(r,"stack",s(1,d(i.stack,1))),l(r,this,w),r},b=w.prototype=v.prototype,E="stack"in y(m),_="stack"in new v(1,2),T=v&&p&&Object.getOwnPropertyDescriptor(i,m),I=!!T&&!(T.writable&&T.configurable),S=E&&!I&&!_;r({global:!0,constructor:!0,forced:g||S},{DOMException:S?w:v});var k=o(m),A=k.prototype;if(A.constructor!==k)for(var C in g||a(A,"constructor",s(1,k)),f)if(c(f,C)){var x=f[C],O=x.s;c(k,O)||a(k,O,s(6,x.c))}},223:function(e,t,n){"use strict";n.d(t,{$s:function(){return G},BH:function(){return w},L:function(){return c},LL:function(){return N},P0:function(){return m},Pz:function(){return v},Sg:function(){return b},ZR:function(){return O},aH:function(){return y},b$:function(){return I},eu:function(){return A},hl:function(){return k},m9:function(){return J},ne:function(){return V},pd:function(){return U},q4:function(){return g},ru:function(){return T},tV:function(){return u},uI:function(){return _},vZ:function(){return L},w1:function(){return S},xO:function(){return j},xb:function(){return P},z$:function(){return E},zI:function(){return C},zd:function(){return F}});n(2801),n(7658);
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const r=function(e){const t=[];let n=0;for(let r=0;r<e.length;r++){let i=e.charCodeAt(r);i<128?t[n++]=i:i<2048?(t[n++]=i>>6|192,t[n++]=63&i|128):55296===(64512&i)&&r+1<e.length&&56320===(64512&e.charCodeAt(r+1))?(i=65536+((1023&i)<<10)+(1023&e.charCodeAt(++r)),t[n++]=i>>18|240,t[n++]=i>>12&63|128,t[n++]=i>>6&63|128,t[n++]=63&i|128):(t[n++]=i>>12|224,t[n++]=i>>6&63|128,t[n++]=63&i|128)}return t},i=function(e){const t=[];let n=0,r=0;while(n<e.length){const i=e[n++];if(i<128)t[r++]=String.fromCharCode(i);else if(i>191&&i<224){const o=e[n++];t[r++]=String.fromCharCode((31&i)<<6|63&o)}else if(i>239&&i<365){const o=e[n++],s=e[n++],a=e[n++],c=((7&i)<<18|(63&o)<<12|(63&s)<<6|63&a)-65536;t[r++]=String.fromCharCode(55296+(c>>10)),t[r++]=String.fromCharCode(56320+(1023&c))}else{const o=e[n++],s=e[n++];t[r++]=String.fromCharCode((15&i)<<12|(63&o)<<6|63&s)}}return t.join("")},o={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:"function"===typeof atob,encodeByteArray(e,t){if(!Array.isArray(e))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<e.length;i+=3){const t=e[i],o=i+1<e.length,s=o?e[i+1]:0,a=i+2<e.length,c=a?e[i+2]:0,u=t>>2,l=(3&t)<<4|s>>4;let h=(15&s)<<2|c>>6,f=63&c;a||(f=64,o||(h=64)),r.push(n[u],n[l],n[h],n[f])}return r.join("")},encodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(e):this.encodeByteArray(r(e),t)},decodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(e):i(this.decodeStringToByteArray(e,t))},decodeStringToByteArray(e,t){this.init_();const n=t?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let i=0;i<e.length;){const t=n[e.charAt(i++)],o=i<e.length,a=o?n[e.charAt(i)]:0;++i;const c=i<e.length,u=c?n[e.charAt(i)]:64;++i;const l=i<e.length,h=l?n[e.charAt(i)]:64;if(++i,null==t||null==a||null==u||null==h)throw new s;const f=t<<2|a>>4;if(r.push(f),64!==u){const e=a<<4&240|u>>2;if(r.push(e),64!==h){const e=u<<6&192|h;r.push(e)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let e=0;e<this.ENCODED_VALS.length;e++)this.byteToCharMap_[e]=this.ENCODED_VALS.charAt(e),this.charToByteMap_[this.byteToCharMap_[e]]=e,this.byteToCharMapWebSafe_[e]=this.ENCODED_VALS_WEBSAFE.charAt(e),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]]=e,e>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)]=e,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)]=e)}}};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class s extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const a=function(e){const t=r(e);return o.encodeByteArray(t,!0)},c=function(e){return a(e).replace(/\./g,"")},u=function(e){try{return o.decodeString(e,!0)}catch(t){console.error("base64Decode failed: ",t)}return null};
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function l(){if("undefined"!==typeof self)return self;if("undefined"!==typeof window)return window;if("undefined"!==typeof n.g)return n.g;throw new Error("Unable to locate global object.")}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const h=()=>l().__FIREBASE_DEFAULTS__,f=()=>{if("undefined"===typeof process)return;const e={NODE_ENV:"production",BASE_URL:"/"}.__FIREBASE_DEFAULTS__;return e?JSON.parse(e):void 0},d=()=>{if("undefined"===typeof document)return;let e;try{e=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch(n){return}const t=e&&u(e[1]);return t&&JSON.parse(t)},p=()=>{try{return h()||f()||d()}catch(e){return void console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${e}`)}},g=e=>{var t,n;return null===(n=null===(t=p())||void 0===t?void 0:t.emulatorHosts)||void 0===n?void 0:n[e]},m=e=>{const t=g(e);if(!t)return;const n=t.lastIndexOf(":");if(n<=0||n+1===t.length)throw new Error(`Invalid host ${t} with no separate hostname and port!`);const r=parseInt(t.substring(n+1),10);return"["===t[0]?[t.substring(1,n-1),r]:[t.substring(0,n),r]},y=()=>{var e;return null===(e=p())||void 0===e?void 0:e.config},v=e=>{var t;return null===(t=p())||void 0===t?void 0:t[`_${e}`]};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class w{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}wrapCallback(e){return(t,n)=>{t?this.reject(t):this.resolve(n),"function"===typeof e&&(this.promise.catch((()=>{})),1===e.length?e(t):e(t,n))}}}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function b(e,t){if(e.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},r=t||"demo-project",i=e.iat||0,o=e.sub||e.user_id;if(!o)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const s=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:i,exp:i+3600,auth_time:i,sub:o,user_id:o,firebase:{sign_in_provider:"custom",identities:{}}},e),a="";return[c(JSON.stringify(n)),c(JSON.stringify(s)),a].join(".")}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function E(){return"undefined"!==typeof navigator&&"string"===typeof navigator["userAgent"]?navigator["userAgent"]:""}function _(){return"undefined"!==typeof window&&!!(window["cordova"]||window["phonegap"]||window["PhoneGap"])&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(E())}function T(){const e="object"===typeof chrome?chrome.runtime:"object"===typeof browser?browser.runtime:void 0;return"object"===typeof e&&void 0!==e.id}function I(){return"object"===typeof navigator&&"ReactNative"===navigator["product"]}function S(){const e=E();return e.indexOf("MSIE ")>=0||e.indexOf("Trident/")>=0}function k(){try{return"object"===typeof indexedDB}catch(e){return!1}}function A(){return new Promise(((e,t)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),n||self.indexedDB.deleteDatabase(r),e(!0)},i.onupgradeneeded=()=>{n=!1},i.onerror=()=>{var e;t((null===(e=i.error)||void 0===e?void 0:e.message)||"")}}catch(n){t(n)}}))}function C(){return!("undefined"===typeof navigator||!navigator.cookieEnabled)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const x="FirebaseError";class O extends Error{constructor(e,t,n){super(t),this.code=e,this.customData=n,this.name=x,Object.setPrototypeOf(this,O.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,N.prototype.create)}}class N{constructor(e,t,n){this.service=e,this.serviceName=t,this.errors=n}create(e,...t){const n=t[0]||{},r=`${this.service}/${e}`,i=this.errors[e],o=i?R(i,n):"Error",s=`${this.serviceName}: ${o} (${r}).`,a=new O(r,s,n);return a}}function R(e,t){return e.replace(D,((e,n)=>{const r=t[n];return null!=r?String(r):`<${n}?>`}))}const D=/\{\$([^}]+)}/g;
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function P(e){for(const t in e)if(Object.prototype.hasOwnProperty.call(e,t))return!1;return!0}function L(e,t){if(e===t)return!0;const n=Object.keys(e),r=Object.keys(t);for(const i of n){if(!r.includes(i))return!1;const n=e[i],o=t[i];if(M(n)&&M(o)){if(!L(n,o))return!1}else if(n!==o)return!1}for(const i of r)if(!n.includes(i))return!1;return!0}function M(e){return null!==e&&"object"===typeof e}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function j(e){const t=[];for(const[n,r]of Object.entries(e))Array.isArray(r)?r.forEach((e=>{t.push(encodeURIComponent(n)+"="+encodeURIComponent(e))})):t.push(encodeURIComponent(n)+"="+encodeURIComponent(r));return t.length?"&"+t.join("&"):""}function F(e){const t={},n=e.replace(/^\?/,"").split("&");return n.forEach((e=>{if(e){const[n,r]=e.split("=");t[decodeURIComponent(n)]=decodeURIComponent(r)}})),t}function U(e){const t=e.indexOf("?");if(!t)return"";const n=e.indexOf("#",t);return e.substring(t,n>0?n:void 0)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function V(e,t){const n=new q(e,t);return n.subscribe.bind(n)}class q{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then((()=>{e(this)})).catch((e=>{this.error(e)}))}next(e){this.forEachObserver((t=>{t.next(e)}))}error(e){this.forEachObserver((t=>{t.error(e)})),this.close(e)}complete(){this.forEachObserver((e=>{e.complete()})),this.close()}subscribe(e,t,n){let r;if(void 0===e&&void 0===t&&void 0===n)throw new Error("Missing Observer.");r=$(e,["next","error","complete"])?e:{next:e,error:t,complete:n},void 0===r.next&&(r.next=B),void 0===r.error&&(r.error=B),void 0===r.complete&&(r.complete=B);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then((()=>{try{this.finalError?r.error(this.finalError):r.complete()}catch(e){}})),this.observers.push(r),i}unsubscribeOne(e){void 0!==this.observers&&void 0!==this.observers[e]&&(delete this.observers[e],this.observerCount-=1,0===this.observerCount&&void 0!==this.onNoObservers&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then((()=>{if(void 0!==this.observers&&void 0!==this.observers[e])try{t(this.observers[e])}catch(n){"undefined"!==typeof console&&console.error&&console.error(n)}}))}close(e){this.finalized||(this.finalized=!0,void 0!==e&&(this.finalError=e),this.task.then((()=>{this.observers=void 0,this.onNoObservers=void 0})))}}function $(e,t){if("object"!==typeof e||null===e)return!1;for(const n of t)if(n in e&&"function"===typeof e[n])return!0;return!1}function B(){}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const H=1e3,z=2,W=144e5,K=.5;function G(e,t=H,n=z){const r=t*Math.pow(n,e),i=Math.round(K*r*(Math.random()-.5)*2);return Math.min(W,r+i)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function J(e){return e&&e._delegate?e._delegate:e}},1708:function(e,t,n){"use strict";n.d(t,{FN:function(){return o},GI:function(){return u},OO:function(){return a},PK:function(){return s},YY:function(){return f},bF:function(){return c},gy:function(){return h},hC:function(){return l}});var r=n(7387),i=n.n(r);class o{constructor(e,t,n,r="",i=""){this.message=e,this.type=t,this.duration=n,this.icon=r,this.action=i,this.showToast()}showToast(){i()(".toast").remove();let e=document.createElement("div"),t=document.createElement("div");t.classList.add("toast"),e.classList.add("toast-overlay"),t.classList.add(this.type),""!=this.icon&&(t.innerHTML+=`<img alt="icon" src="${this.icon}" class="toast-icon" alt="Toast Popup Icon">`),t.innerHTML+=this.message,""!=this.action&&document.body.appendChild(e),document.body.appendChild(t),setTimeout((()=>{i()(t).css({animation:"slideOut 0.5s forwards"})}),this.duration),setTimeout((()=>{e.remove(),t.remove(),""!=this.action&&""!=this.action&&(window.location.href=this.action)}),this.duration+500)}}class s extends o{constructor(e,t,r,i=""){e+=": "+t,super(e,"default",r,n(4024),i)}}class a extends o{constructor(e,t,r=""){super(e,"default",t,n(1250),r)}}class c extends o{constructor(e,t,r=""){super(e,"default",t,n(3653),r)}}class u{constructor(e,t,n,r="",i=""){"object"==typeof e?(this.title=e[0],this.message=e[1]):this.message=e,this.type=t,this.duration=n,this.icon=r,this.action=i,this.showPopup()}showPopup(){i()(".popup, .popup-overlay").remove();let e=i()("<div></div>",{class:"popup-overlay "+this.type}),t=i()("<div></div>",{class:"popup"}),n=i()("<div></div>",{id:"popup-buttons"});for(let r of this.action)i()("<button></button>",{class:"popup-button "+(r[2]?r[2]:""),onclick:r[0],text:r[1]}).appendTo(n);this.icon&&i()(`<img alt='Popup Icon' src="${this.icon}" class="popup-icon">`).appendTo(t),this.title&&i()("<div></div>",{text:this.title,class:"popup-title"}).appendTo(t),i()("<div></div>",{text:this.message,class:"popup-text"}).appendTo(t),n.appendTo(t),this.action&&e.appendTo(document.body),t.appendTo(document.body),setTimeout((()=>{i()(t).css({animation:"popupout 0.25s forwards"}),i()(e).css({animation:"fadeout 0.5s forwards"})}),this.duration),setTimeout((()=>{t.remove(),e.remove()}),this.duration+500)}}function l(){i()(".popup").css({animation:"popupout 0.25s forwards"}),i()(".popup-overlay").css({animation:"fadeout 0.5s forwards"}),setTimeout((()=>{i()(".popup").remove(),i()(".popup-overlay").remove()}),500)}function h(){return new o("This feature hasn't been implemented yet, sorry! 🤫","default",1500,n(6264))}
//! placeholder action
function f(e){switch(e.code){case"auth/invalid-email":return"Invalid email";case"auth/user-disabled":return"User disabled";case"auth/user-not-found":return"User not found";case"auth/wrong-password":return"Incorrect password";case"auth/email-already-in-use":return"Email already in use, try logging in";case"auth/weak-password":return"Password is too weak";case"auth/operation-not-allowed":return"Operation not allowed";case"auth/too-many-requests":return"Too many requests";case"auth/popup-closed-by-user":return"Popup closed by user";case"auth/popup-blocked":return"Popup blocked";case"auth/unauthorized-domain":return"Unauthorized domain";case"auth/cancelled-popup-request":return"New popup opened, cancelling previous request";default:return e.message.replace("Error ","")}}i()(document.body).on("click",".popup-overlay",(function(){l()})),i()("[placeholdaction]").click((function(){h()})),window.removePopup=l},4870:function(e,t,n){"use strict";n.d(t,{B:function(){return s},BK:function(){return Ke},Bj:function(){return o},EB:function(){return u},Fl:function(){return Ye},IU:function(){return De},Jd:function(){return k},PG:function(){return xe},SU:function(){return He},Um:function(){return ke},WL:function(){return We},X$:function(){return O},X3:function(){return Re},XI:function(){return qe},Xl:function(){return Pe},dq:function(){return Ue},iH:function(){return Ve},j:function(){return C},lk:function(){return A},nZ:function(){return c},qj:function(){return Se},qq:function(){return _},yT:function(){return Ne}});n(7658);var r=n(7139);let i;class o{constructor(e=!1){this.detached=e,this._active=!0,this.effects=[],this.cleanups=[],this.parent=i,!e&&i&&(this.index=(i.scopes||(i.scopes=[])).push(this)-1)}get active(){return this._active}run(e){if(this._active){const t=i;try{return i=this,e()}finally{i=t}}else 0}on(){i=this}off(){i=this.parent}stop(e){if(this._active){let t,n;for(t=0,n=this.effects.length;t<n;t++)this.effects[t].stop();for(t=0,n=this.cleanups.length;t<n;t++)this.cleanups[t]();if(this.scopes)for(t=0,n=this.scopes.length;t<n;t++)this.scopes[t].stop(!0);if(!this.detached&&this.parent&&!e){const e=this.parent.scopes.pop();e&&e!==this&&(this.parent.scopes[this.index]=e,e.index=this.index)}this.parent=void 0,this._active=!1}}}function s(e){return new o(e)}function a(e,t=i){t&&t.active&&t.effects.push(e)}function c(){return i}function u(e){i&&i.cleanups.push(e)}const l=e=>{const t=new Set(e);return t.w=0,t.n=0,t},h=e=>(e.w&y)>0,f=e=>(e.n&y)>0,d=({deps:e})=>{if(e.length)for(let t=0;t<e.length;t++)e[t].w|=y},p=e=>{const{deps:t}=e;if(t.length){let n=0;for(let r=0;r<t.length;r++){const i=t[r];h(i)&&!f(i)?i.delete(e):t[n++]=i,i.w&=~y,i.n&=~y}t.length=n}},g=new WeakMap;let m=0,y=1;const v=30;let w;const b=Symbol(""),E=Symbol("");class _{constructor(e,t=null,n){this.fn=e,this.scheduler=t,this.active=!0,this.deps=[],this.parent=void 0,a(this,n)}run(){if(!this.active)return this.fn();let e=w,t=I;while(e){if(e===this)return;e=e.parent}try{return this.parent=w,w=this,I=!0,y=1<<++m,m<=v?d(this):T(this),this.fn()}finally{m<=v&&p(this),y=1<<--m,w=this.parent,I=t,this.parent=void 0,this.deferStop&&this.stop()}}stop(){w===this?this.deferStop=!0:this.active&&(T(this),this.onStop&&this.onStop(),this.active=!1)}}function T(e){const{deps:t}=e;if(t.length){for(let n=0;n<t.length;n++)t[n].delete(e);t.length=0}}let I=!0;const S=[];function k(){S.push(I),I=!1}function A(){const e=S.pop();I=void 0===e||e}function C(e,t,n){if(I&&w){let t=g.get(e);t||g.set(e,t=new Map);let r=t.get(n);r||t.set(n,r=l());const i=void 0;x(r,i)}}function x(e,t){let n=!1;m<=v?f(e)||(e.n|=y,n=!h(e)):n=!e.has(w),n&&(e.add(w),w.deps.push(e))}function O(e,t,n,i,o,s){const a=g.get(e);if(!a)return;let c=[];if("clear"===t)c=[...a.values()];else if("length"===n&&(0,r.kJ)(e)){const e=Number(i);a.forEach(((t,n)=>{("length"===n||n>=e)&&c.push(t)}))}else switch(void 0!==n&&c.push(a.get(n)),t){case"add":(0,r.kJ)(e)?(0,r.S0)(n)&&c.push(a.get("length")):(c.push(a.get(b)),(0,r._N)(e)&&c.push(a.get(E)));break;case"delete":(0,r.kJ)(e)||(c.push(a.get(b)),(0,r._N)(e)&&c.push(a.get(E)));break;case"set":(0,r._N)(e)&&c.push(a.get(b));break}if(1===c.length)c[0]&&N(c[0]);else{const e=[];for(const t of c)t&&e.push(...t);N(l(e))}}function N(e,t){const n=(0,r.kJ)(e)?e:[...e];for(const r of n)r.computed&&R(r,t);for(const r of n)r.computed||R(r,t)}function R(e,t){(e!==w||e.allowRecurse)&&(e.scheduler?e.scheduler():e.run())}function D(e,t){var n;return null===(n=g.get(e))||void 0===n?void 0:n.get(t)}const P=(0,r.fY)("__proto__,__v_isRef,__isVue"),L=new Set(Object.getOwnPropertyNames(Symbol).filter((e=>"arguments"!==e&&"caller"!==e)).map((e=>Symbol[e])).filter(r.yk)),M=$(),j=$(!1,!0),F=$(!0),U=V();function V(){const e={};return["includes","indexOf","lastIndexOf"].forEach((t=>{e[t]=function(...e){const n=De(this);for(let t=0,i=this.length;t<i;t++)C(n,"get",t+"");const r=n[t](...e);return-1===r||!1===r?n[t](...e.map(De)):r}})),["push","pop","shift","unshift","splice"].forEach((t=>{e[t]=function(...e){k();const n=De(this)[t].apply(this,e);return A(),n}})),e}function q(e){const t=De(this);return C(t,"has",e),t.hasOwnProperty(e)}function $(e=!1,t=!1){return function(n,i,o){if("__v_isReactive"===i)return!e;if("__v_isReadonly"===i)return e;if("__v_isShallow"===i)return t;if("__v_raw"===i&&o===(e?t?_e:Ee:t?be:we).get(n))return n;const s=(0,r.kJ)(n);if(!e){if(s&&(0,r.RI)(U,i))return Reflect.get(U,i,o);if("hasOwnProperty"===i)return q}const a=Reflect.get(n,i,o);return((0,r.yk)(i)?L.has(i):P(i))?a:(e||C(n,"get",i),t?a:Ue(a)?s&&(0,r.S0)(i)?a:a.value:(0,r.Kn)(a)?e?Ae(a):Se(a):a)}}const B=z(),H=z(!0);function z(e=!1){return function(t,n,i,o){let s=t[n];if(Oe(s)&&Ue(s)&&!Ue(i))return!1;if(!e&&(Ne(i)||Oe(i)||(s=De(s),i=De(i)),!(0,r.kJ)(t)&&Ue(s)&&!Ue(i)))return s.value=i,!0;const a=(0,r.kJ)(t)&&(0,r.S0)(n)?Number(n)<t.length:(0,r.RI)(t,n),c=Reflect.set(t,n,i,o);return t===De(o)&&(a?(0,r.aU)(i,s)&&O(t,"set",n,i,s):O(t,"add",n,i)),c}}function W(e,t){const n=(0,r.RI)(e,t),i=e[t],o=Reflect.deleteProperty(e,t);return o&&n&&O(e,"delete",t,void 0,i),o}function K(e,t){const n=Reflect.has(e,t);return(0,r.yk)(t)&&L.has(t)||C(e,"has",t),n}function G(e){return C(e,"iterate",(0,r.kJ)(e)?"length":b),Reflect.ownKeys(e)}const J={get:M,set:B,deleteProperty:W,has:K,ownKeys:G},Q={get:F,set(e,t){return!0},deleteProperty(e,t){return!0}},X=(0,r.l7)({},J,{get:j,set:H}),Y=e=>e,Z=e=>Reflect.getPrototypeOf(e);function ee(e,t,n=!1,r=!1){e=e["__v_raw"];const i=De(e),o=De(t);n||(t!==o&&C(i,"get",t),C(i,"get",o));const{has:s}=Z(i),a=r?Y:n?Me:Le;return s.call(i,t)?a(e.get(t)):s.call(i,o)?a(e.get(o)):void(e!==i&&e.get(t))}function te(e,t=!1){const n=this["__v_raw"],r=De(n),i=De(e);return t||(e!==i&&C(r,"has",e),C(r,"has",i)),e===i?n.has(e):n.has(e)||n.has(i)}function ne(e,t=!1){return e=e["__v_raw"],!t&&C(De(e),"iterate",b),Reflect.get(e,"size",e)}function re(e){e=De(e);const t=De(this),n=Z(t),r=n.has.call(t,e);return r||(t.add(e),O(t,"add",e,e)),this}function ie(e,t){t=De(t);const n=De(this),{has:i,get:o}=Z(n);let s=i.call(n,e);s||(e=De(e),s=i.call(n,e));const a=o.call(n,e);return n.set(e,t),s?(0,r.aU)(t,a)&&O(n,"set",e,t,a):O(n,"add",e,t),this}function oe(e){const t=De(this),{has:n,get:r}=Z(t);let i=n.call(t,e);i||(e=De(e),i=n.call(t,e));const o=r?r.call(t,e):void 0,s=t.delete(e);return i&&O(t,"delete",e,void 0,o),s}function se(){const e=De(this),t=0!==e.size,n=void 0,r=e.clear();return t&&O(e,"clear",void 0,void 0,n),r}function ae(e,t){return function(n,r){const i=this,o=i["__v_raw"],s=De(o),a=t?Y:e?Me:Le;return!e&&C(s,"iterate",b),o.forEach(((e,t)=>n.call(r,a(e),a(t),i)))}}function ce(e,t,n){return function(...i){const o=this["__v_raw"],s=De(o),a=(0,r._N)(s),c="entries"===e||e===Symbol.iterator&&a,u="keys"===e&&a,l=o[e](...i),h=n?Y:t?Me:Le;return!t&&C(s,"iterate",u?E:b),{next(){const{value:e,done:t}=l.next();return t?{value:e,done:t}:{value:c?[h(e[0]),h(e[1])]:h(e),done:t}},[Symbol.iterator](){return this}}}}function ue(e){return function(...t){return"delete"!==e&&this}}function le(){const e={get(e){return ee(this,e)},get size(){return ne(this)},has:te,add:re,set:ie,delete:oe,clear:se,forEach:ae(!1,!1)},t={get(e){return ee(this,e,!1,!0)},get size(){return ne(this)},has:te,add:re,set:ie,delete:oe,clear:se,forEach:ae(!1,!0)},n={get(e){return ee(this,e,!0)},get size(){return ne(this,!0)},has(e){return te.call(this,e,!0)},add:ue("add"),set:ue("set"),delete:ue("delete"),clear:ue("clear"),forEach:ae(!0,!1)},r={get(e){return ee(this,e,!0,!0)},get size(){return ne(this,!0)},has(e){return te.call(this,e,!0)},add:ue("add"),set:ue("set"),delete:ue("delete"),clear:ue("clear"),forEach:ae(!0,!0)},i=["keys","values","entries",Symbol.iterator];return i.forEach((i=>{e[i]=ce(i,!1,!1),n[i]=ce(i,!0,!1),t[i]=ce(i,!1,!0),r[i]=ce(i,!0,!0)})),[e,n,t,r]}const[he,fe,de,pe]=le();function ge(e,t){const n=t?e?pe:de:e?fe:he;return(t,i,o)=>"__v_isReactive"===i?!e:"__v_isReadonly"===i?e:"__v_raw"===i?t:Reflect.get((0,r.RI)(n,i)&&i in t?n:t,i,o)}const me={get:ge(!1,!1)},ye={get:ge(!1,!0)},ve={get:ge(!0,!1)};const we=new WeakMap,be=new WeakMap,Ee=new WeakMap,_e=new WeakMap;function Te(e){switch(e){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function Ie(e){return e["__v_skip"]||!Object.isExtensible(e)?0:Te((0,r.W7)(e))}function Se(e){return Oe(e)?e:Ce(e,!1,J,me,we)}function ke(e){return Ce(e,!1,X,ye,be)}function Ae(e){return Ce(e,!0,Q,ve,Ee)}function Ce(e,t,n,i,o){if(!(0,r.Kn)(e))return e;if(e["__v_raw"]&&(!t||!e["__v_isReactive"]))return e;const s=o.get(e);if(s)return s;const a=Ie(e);if(0===a)return e;const c=new Proxy(e,2===a?i:n);return o.set(e,c),c}function xe(e){return Oe(e)?xe(e["__v_raw"]):!(!e||!e["__v_isReactive"])}function Oe(e){return!(!e||!e["__v_isReadonly"])}function Ne(e){return!(!e||!e["__v_isShallow"])}function Re(e){return xe(e)||Oe(e)}function De(e){const t=e&&e["__v_raw"];return t?De(t):e}function Pe(e){return(0,r.Nj)(e,"__v_skip",!0),e}const Le=e=>(0,r.Kn)(e)?Se(e):e,Me=e=>(0,r.Kn)(e)?Ae(e):e;function je(e){I&&w&&(e=De(e),x(e.dep||(e.dep=l())))}function Fe(e,t){e=De(e);const n=e.dep;n&&N(n)}function Ue(e){return!(!e||!0!==e.__v_isRef)}function Ve(e){return $e(e,!1)}function qe(e){return $e(e,!0)}function $e(e,t){return Ue(e)?e:new Be(e,t)}class Be{constructor(e,t){this.__v_isShallow=t,this.dep=void 0,this.__v_isRef=!0,this._rawValue=t?e:De(e),this._value=t?e:Le(e)}get value(){return je(this),this._value}set value(e){const t=this.__v_isShallow||Ne(e)||Oe(e);e=t?e:De(e),(0,r.aU)(e,this._rawValue)&&(this._rawValue=e,this._value=t?e:Le(e),Fe(this,e))}}function He(e){return Ue(e)?e.value:e}const ze={get:(e,t,n)=>He(Reflect.get(e,t,n)),set:(e,t,n,r)=>{const i=e[t];return Ue(i)&&!Ue(n)?(i.value=n,!0):Reflect.set(e,t,n,r)}};function We(e){return xe(e)?e:new Proxy(e,ze)}function Ke(e){const t=(0,r.kJ)(e)?new Array(e.length):{};for(const n in e)t[n]=Je(e,n);return t}class Ge{constructor(e,t,n){this._object=e,this._key=t,this._defaultValue=n,this.__v_isRef=!0}get value(){const e=this._object[this._key];return void 0===e?this._defaultValue:e}set value(e){this._object[this._key]=e}get dep(){return D(De(this._object),this._key)}}function Je(e,t,n){const r=e[t];return Ue(r)?r:new Ge(e,t,n)}var Qe;class Xe{constructor(e,t,n,r){this._setter=t,this.dep=void 0,this.__v_isRef=!0,this[Qe]=!1,this._dirty=!0,this.effect=new _(e,(()=>{this._dirty||(this._dirty=!0,Fe(this))})),this.effect.computed=this,this.effect.active=this._cacheable=!r,this["__v_isReadonly"]=n}get value(){const e=De(this);return je(e),!e._dirty&&e._cacheable||(e._dirty=!1,e._value=e.effect.run()),e._value}set value(e){this._setter(e)}}function Ye(e,t,n=!1){let i,o;const s=(0,r.mf)(e);s?(i=e,o=r.dG):(i=e.get,o=e.set);const a=new Xe(i,o,s||!o,n);return a}Qe="__v_isReadonly"},3396:function(e,t,n){"use strict";n.d(t,{$d:function(){return s},Cn:function(){return M},FN:function(){return mn},Fl:function(){return Rn},HY:function(){return Pt},JJ:function(){return W},Ko:function(){return Ue},P$:function(){return re},Q6:function(){return ue},U2:function(){return oe},Uk:function(){return rn},Us:function(){return Ct},WI:function(){return Ve},Wm:function(){return Zt},Y3:function(){return v},Y8:function(){return ee},YP:function(){return J},_:function(){return Yt},aZ:function(){return le},dD:function(){return L},f3:function(){return K},h:function(){return Dn},iD:function(){return zt},ic:function(){return Se},j4:function(){return Wt},kq:function(){return sn},nK:function(){return ce},uE:function(){return on},up:function(){return Le},w5:function(){return j},wg:function(){return Vt},wy:function(){return Re}});n(7658),n(541);var r=n(4870),i=n(7139);function o(e,t,n,r){let i;try{i=r?e(...r):e()}catch(o){a(o,t,n)}return i}function s(e,t,n,r){if((0,i.mf)(e)){const s=o(e,t,n,r);return s&&(0,i.tI)(s)&&s.catch((e=>{a(e,t,n)})),s}const c=[];for(let i=0;i<e.length;i++)c.push(s(e[i],t,n,r));return c}function a(e,t,n,r=!0){const i=t?t.vnode:null;if(t){let r=t.parent;const i=t.proxy,s=n;while(r){const t=r.ec;if(t)for(let n=0;n<t.length;n++)if(!1===t[n](e,i,s))return;r=r.parent}const a=t.appContext.config.errorHandler;if(a)return void o(a,null,10,[e,i,s])}c(e,n,i,r)}function c(e,t,n,r=!0){console.error(e)}let u=!1,l=!1;const h=[];let f=0;const d=[];let p=null,g=0;const m=Promise.resolve();let y=null;function v(e){const t=y||m;return e?t.then(this?e.bind(this):e):t}function w(e){let t=f+1,n=h.length;while(t<n){const r=t+n>>>1,i=k(h[r]);i<e?t=r+1:n=r}return t}function b(e){h.length&&h.includes(e,u&&e.allowRecurse?f+1:f)||(null==e.id?h.push(e):h.splice(w(e.id),0,e),E())}function E(){u||l||(l=!0,y=m.then(C))}function _(e){const t=h.indexOf(e);t>f&&h.splice(t,1)}function T(e){(0,i.kJ)(e)?d.push(...e):p&&p.includes(e,e.allowRecurse?g+1:g)||d.push(e),E()}function I(e,t=(u?f+1:0)){for(0;t<h.length;t++){const e=h[t];e&&e.pre&&(h.splice(t,1),t--,e())}}function S(e){if(d.length){const e=[...new Set(d)];if(d.length=0,p)return void p.push(...e);for(p=e,p.sort(((e,t)=>k(e)-k(t))),g=0;g<p.length;g++)p[g]();p=null,g=0}}const k=e=>null==e.id?1/0:e.id,A=(e,t)=>{const n=k(e)-k(t);if(0===n){if(e.pre&&!t.pre)return-1;if(t.pre&&!e.pre)return 1}return n};function C(e){l=!1,u=!0,h.sort(A);i.dG;try{for(f=0;f<h.length;f++){const e=h[f];e&&!1!==e.active&&o(e,null,14)}}finally{f=0,h.length=0,S(e),u=!1,y=null,(h.length||d.length)&&C(e)}}new Set;new Map;function x(e,t,...n){if(e.isUnmounted)return;const r=e.vnode.props||i.kT;let o=n;const a=t.startsWith("update:"),c=a&&t.slice(7);if(c&&c in r){const e=`${"modelValue"===c?"model":c}Modifiers`,{number:t,trim:s}=r[e]||i.kT;s&&(o=n.map((e=>(0,i.HD)(e)?e.trim():e))),t&&(o=n.map(i.h5))}let u;let l=r[u=(0,i.hR)(t)]||r[u=(0,i.hR)((0,i._A)(t))];!l&&a&&(l=r[u=(0,i.hR)((0,i.rs)(t))]),l&&s(l,e,6,o);const h=r[u+"Once"];if(h){if(e.emitted){if(e.emitted[u])return}else e.emitted={};e.emitted[u]=!0,s(h,e,6,o)}}function O(e,t,n=!1){const r=t.emitsCache,o=r.get(e);if(void 0!==o)return o;const s=e.emits;let a={},c=!1;if(!(0,i.mf)(e)){const r=e=>{const n=O(e,t,!0);n&&(c=!0,(0,i.l7)(a,n))};!n&&t.mixins.length&&t.mixins.forEach(r),e.extends&&r(e.extends),e.mixins&&e.mixins.forEach(r)}return s||c?((0,i.kJ)(s)?s.forEach((e=>a[e]=null)):(0,i.l7)(a,s),(0,i.Kn)(e)&&r.set(e,a),a):((0,i.Kn)(e)&&r.set(e,null),null)}function N(e,t){return!(!e||!(0,i.F7)(t))&&(t=t.slice(2).replace(/Once$/,""),(0,i.RI)(e,t[0].toLowerCase()+t.slice(1))||(0,i.RI)(e,(0,i.rs)(t))||(0,i.RI)(e,t))}let R=null,D=null;function P(e){const t=R;return R=e,D=e&&e.type.__scopeId||null,t}function L(e){D=e}function M(){D=null}function j(e,t=R,n){if(!t)return e;if(e._n)return e;const r=(...n)=>{r._d&&Bt(-1);const i=P(t);let o;try{o=e(...n)}finally{P(i),r._d&&Bt(1)}return o};return r._n=!0,r._c=!0,r._d=!0,r}function F(e){const{type:t,vnode:n,proxy:r,withProxy:o,props:s,propsOptions:[c],slots:u,attrs:l,emit:h,render:f,renderCache:d,data:p,setupState:g,ctx:m,inheritAttrs:y}=e;let v,w;const b=P(e);try{if(4&n.shapeFlag){const e=o||r;v=an(f.call(e,e,d,s,g,p,m)),w=l}else{const e=t;0,v=an(e.length>1?e(s,{attrs:l,slots:u,emit:h}):e(s,null)),w=t.props?l:U(l)}}catch(_){Ft.length=0,a(_,e,1),v=Zt(Mt)}let E=v;if(w&&!1!==y){const e=Object.keys(w),{shapeFlag:t}=E;e.length&&7&t&&(c&&e.some(i.tR)&&(w=V(w,c)),E=nn(E,w))}return n.dirs&&(E=nn(E),E.dirs=E.dirs?E.dirs.concat(n.dirs):n.dirs),n.transition&&(E.transition=n.transition),v=E,P(b),v}const U=e=>{let t;for(const n in e)("class"===n||"style"===n||(0,i.F7)(n))&&((t||(t={}))[n]=e[n]);return t},V=(e,t)=>{const n={};for(const r in e)(0,i.tR)(r)&&r.slice(9)in t||(n[r]=e[r]);return n};function q(e,t,n){const{props:r,children:i,component:o}=e,{props:s,children:a,patchFlag:c}=t,u=o.emitsOptions;if(t.dirs||t.transition)return!0;if(!(n&&c>=0))return!(!i&&!a||a&&a.$stable)||r!==s&&(r?!s||$(r,s,u):!!s);if(1024&c)return!0;if(16&c)return r?$(r,s,u):!!s;if(8&c){const e=t.dynamicProps;for(let t=0;t<e.length;t++){const n=e[t];if(s[n]!==r[n]&&!N(u,n))return!0}}return!1}function $(e,t,n){const r=Object.keys(t);if(r.length!==Object.keys(e).length)return!0;for(let i=0;i<r.length;i++){const o=r[i];if(t[o]!==e[o]&&!N(n,o))return!0}return!1}function B({vnode:e,parent:t},n){while(t&&t.subTree===e)(e=t.vnode).el=n,t=t.parent}const H=e=>e.__isSuspense;function z(e,t){t&&t.pendingBranch?(0,i.kJ)(e)?t.effects.push(...e):t.effects.push(e):T(e)}function W(e,t){if(gn){let n=gn.provides;const r=gn.parent&&gn.parent.provides;r===n&&(n=gn.provides=Object.create(r)),n[e]=t}else 0}function K(e,t,n=!1){const r=gn||R;if(r){const o=null==r.parent?r.vnode.appContext&&r.vnode.appContext.provides:r.parent.provides;if(o&&e in o)return o[e];if(arguments.length>1)return n&&(0,i.mf)(t)?t.call(r.proxy):t}else 0}const G={};function J(e,t,n){return Q(e,t,n)}function Q(e,t,{immediate:n,deep:a,flush:c,onTrack:u,onTrigger:l}=i.kT){const h=(0,r.nZ)()===(null===gn||void 0===gn?void 0:gn.scope)?gn:null;let f,d,p=!1,g=!1;if((0,r.dq)(e)?(f=()=>e.value,p=(0,r.yT)(e)):(0,r.PG)(e)?(f=()=>e,a=!0):(0,i.kJ)(e)?(g=!0,p=e.some((e=>(0,r.PG)(e)||(0,r.yT)(e))),f=()=>e.map((e=>(0,r.dq)(e)?e.value:(0,r.PG)(e)?Z(e):(0,i.mf)(e)?o(e,h,2):void 0))):f=(0,i.mf)(e)?t?()=>o(e,h,2):()=>{if(!h||!h.isUnmounted)return d&&d(),s(e,h,3,[y])}:i.dG,t&&a){const e=f;f=()=>Z(e())}let m,y=e=>{d=_.onStop=()=>{o(e,h,4)}};if(_n){if(y=i.dG,t?n&&s(t,h,3,[f(),g?[]:void 0,y]):f(),"sync"!==c)return i.dG;{const e=Ln();m=e.__watcherHandles||(e.__watcherHandles=[])}}let v=g?new Array(e.length).fill(G):G;const w=()=>{if(_.active)if(t){const e=_.run();(a||p||(g?e.some(((e,t)=>(0,i.aU)(e,v[t]))):(0,i.aU)(e,v)))&&(d&&d(),s(t,h,3,[e,v===G?void 0:g&&v[0]===G?[]:v,y]),v=e)}else _.run()};let E;w.allowRecurse=!!t,"sync"===c?E=w:"post"===c?E=()=>At(w,h&&h.suspense):(w.pre=!0,h&&(w.id=h.uid),E=()=>b(w));const _=new r.qq(f,E);t?n?w():v=_.run():"post"===c?At(_.run.bind(_),h&&h.suspense):_.run();const T=()=>{_.stop(),h&&h.scope&&(0,i.Od)(h.scope.effects,_)};return m&&m.push(T),T}function X(e,t,n){const r=this.proxy,o=(0,i.HD)(e)?e.includes(".")?Y(r,e):()=>r[e]:e.bind(r,r);let s;(0,i.mf)(t)?s=t:(s=t.handler,n=t);const a=gn;yn(this);const c=Q(o,s.bind(r),n);return a?yn(a):vn(),c}function Y(e,t){const n=t.split(".");return()=>{let t=e;for(let e=0;e<n.length&&t;e++)t=t[n[e]];return t}}function Z(e,t){if(!(0,i.Kn)(e)||e["__v_skip"])return e;if(t=t||new Set,t.has(e))return e;if(t.add(e),(0,r.dq)(e))Z(e.value,t);else if((0,i.kJ)(e))for(let n=0;n<e.length;n++)Z(e[n],t);else if((0,i.DM)(e)||(0,i._N)(e))e.forEach((e=>{Z(e,t)}));else if((0,i.PO)(e))for(const n in e)Z(e[n],t);return e}function ee(){const e={isMounted:!1,isLeaving:!1,isUnmounting:!1,leavingVNodes:new Map};return Te((()=>{e.isMounted=!0})),ke((()=>{e.isUnmounting=!0})),e}const te=[Function,Array],ne={name:"BaseTransition",props:{mode:String,appear:Boolean,persisted:Boolean,onBeforeEnter:te,onEnter:te,onAfterEnter:te,onEnterCancelled:te,onBeforeLeave:te,onLeave:te,onAfterLeave:te,onLeaveCancelled:te,onBeforeAppear:te,onAppear:te,onAfterAppear:te,onAppearCancelled:te},setup(e,{slots:t}){const n=mn(),i=ee();let o;return()=>{const s=t.default&&ue(t.default(),!0);if(!s||!s.length)return;let a=s[0];if(s.length>1){let e=!1;for(const t of s)if(t.type!==Mt){0,a=t,e=!0;break}}const c=(0,r.IU)(e),{mode:u}=c;if(i.isLeaving)return se(a);const l=ae(a);if(!l)return se(a);const h=oe(l,c,i,n);ce(l,h);const f=n.subTree,d=f&&ae(f);let p=!1;const{getTransitionKey:g}=l.type;if(g){const e=g();void 0===o?o=e:e!==o&&(o=e,p=!0)}if(d&&d.type!==Mt&&(!Gt(l,d)||p)){const e=oe(d,c,i,n);if(ce(d,e),"out-in"===u)return i.isLeaving=!0,e.afterLeave=()=>{i.isLeaving=!1,!1!==n.update.active&&n.update()},se(a);"in-out"===u&&l.type!==Mt&&(e.delayLeave=(e,t,n)=>{const r=ie(i,d);r[String(d.key)]=d,e._leaveCb=()=>{t(),e._leaveCb=void 0,delete h.delayedLeave},h.delayedLeave=n})}return a}}},re=ne;function ie(e,t){const{leavingVNodes:n}=e;let r=n.get(t.type);return r||(r=Object.create(null),n.set(t.type,r)),r}function oe(e,t,n,r){const{appear:o,mode:a,persisted:c=!1,onBeforeEnter:u,onEnter:l,onAfterEnter:h,onEnterCancelled:f,onBeforeLeave:d,onLeave:p,onAfterLeave:g,onLeaveCancelled:m,onBeforeAppear:y,onAppear:v,onAfterAppear:w,onAppearCancelled:b}=t,E=String(e.key),_=ie(n,e),T=(e,t)=>{e&&s(e,r,9,t)},I=(e,t)=>{const n=t[1];T(e,t),(0,i.kJ)(e)?e.every((e=>e.length<=1))&&n():e.length<=1&&n()},S={mode:a,persisted:c,beforeEnter(t){let r=u;if(!n.isMounted){if(!o)return;r=y||u}t._leaveCb&&t._leaveCb(!0);const i=_[E];i&&Gt(e,i)&&i.el._leaveCb&&i.el._leaveCb(),T(r,[t])},enter(e){let t=l,r=h,i=f;if(!n.isMounted){if(!o)return;t=v||l,r=w||h,i=b||f}let s=!1;const a=e._enterCb=t=>{s||(s=!0,T(t?i:r,[e]),S.delayedLeave&&S.delayedLeave(),e._enterCb=void 0)};t?I(t,[e,a]):a()},leave(t,r){const i=String(e.key);if(t._enterCb&&t._enterCb(!0),n.isUnmounting)return r();T(d,[t]);let o=!1;const s=t._leaveCb=n=>{o||(o=!0,r(),T(n?m:g,[t]),t._leaveCb=void 0,_[i]===e&&delete _[i])};_[i]=e,p?I(p,[t,s]):s()},clone(e){return oe(e,t,n,r)}};return S}function se(e){if(fe(e))return e=nn(e),e.children=null,e}function ae(e){return fe(e)?e.children?e.children[0]:void 0:e}function ce(e,t){6&e.shapeFlag&&e.component?ce(e.component.subTree,t):128&e.shapeFlag?(e.ssContent.transition=t.clone(e.ssContent),e.ssFallback.transition=t.clone(e.ssFallback)):e.transition=t}function ue(e,t=!1,n){let r=[],i=0;for(let o=0;o<e.length;o++){let s=e[o];const a=null==n?s.key:String(n)+String(null!=s.key?s.key:o);s.type===Pt?(128&s.patchFlag&&i++,r=r.concat(ue(s.children,t,a))):(t||s.type!==Mt)&&r.push(null!=a?nn(s,{key:a}):s)}if(i>1)for(let o=0;o<r.length;o++)r[o].patchFlag=-2;return r}function le(e){return(0,i.mf)(e)?{setup:e,name:e.name}:e}const he=e=>!!e.type.__asyncLoader;const fe=e=>e.type.__isKeepAlive;RegExp,RegExp;function de(e,t){return(0,i.kJ)(e)?e.some((e=>de(e,t))):(0,i.HD)(e)?e.split(",").includes(t):!!(0,i.Kj)(e)&&e.test(t)}function pe(e,t){me(e,"a",t)}function ge(e,t){me(e,"da",t)}function me(e,t,n=gn){const r=e.__wdc||(e.__wdc=()=>{let t=n;while(t){if(t.isDeactivated)return;t=t.parent}return e()});if(be(t,r,n),n){let e=n.parent;while(e&&e.parent)fe(e.parent.vnode)&&ye(r,t,n,e),e=e.parent}}function ye(e,t,n,r){const o=be(t,e,r,!0);Ae((()=>{(0,i.Od)(r[t],o)}),n)}function ve(e){e.shapeFlag&=-257,e.shapeFlag&=-513}function we(e){return 128&e.shapeFlag?e.ssContent:e}function be(e,t,n=gn,i=!1){if(n){const o=n[e]||(n[e]=[]),a=t.__weh||(t.__weh=(...i)=>{if(n.isUnmounted)return;(0,r.Jd)(),yn(n);const o=s(t,n,e,i);return vn(),(0,r.lk)(),o});return i?o.unshift(a):o.push(a),a}}const Ee=e=>(t,n=gn)=>(!_n||"sp"===e)&&be(e,((...e)=>t(...e)),n),_e=Ee("bm"),Te=Ee("m"),Ie=Ee("bu"),Se=Ee("u"),ke=Ee("bum"),Ae=Ee("um"),Ce=Ee("sp"),xe=Ee("rtg"),Oe=Ee("rtc");function Ne(e,t=gn){be("ec",e,t)}function Re(e,t){const n=R;if(null===n)return e;const r=xn(n)||n.proxy,o=e.dirs||(e.dirs=[]);for(let s=0;s<t.length;s++){let[e,n,a,c=i.kT]=t[s];e&&((0,i.mf)(e)&&(e={mounted:e,updated:e}),e.deep&&Z(n),o.push({dir:e,instance:r,value:n,oldValue:void 0,arg:a,modifiers:c}))}return e}function De(e,t,n,i){const o=e.dirs,a=t&&t.dirs;for(let c=0;c<o.length;c++){const u=o[c];a&&(u.oldValue=a[c].value);let l=u.dir[i];l&&((0,r.Jd)(),s(l,n,8,[e.el,u,e,t]),(0,r.lk)())}}const Pe="components";function Le(e,t){return je(Pe,e,!0,t)||e}const Me=Symbol();function je(e,t,n=!0,r=!1){const o=R||gn;if(o){const n=o.type;if(e===Pe){const e=On(n,!1);if(e&&(e===t||e===(0,i._A)(t)||e===(0,i.kC)((0,i._A)(t))))return n}const s=Fe(o[e]||n[e],t)||Fe(o.appContext[e],t);return!s&&r?n:s}}function Fe(e,t){return e&&(e[t]||e[(0,i._A)(t)]||e[(0,i.kC)((0,i._A)(t))])}function Ue(e,t,n,r){let o;const s=n&&n[r];if((0,i.kJ)(e)||(0,i.HD)(e)){o=new Array(e.length);for(let n=0,r=e.length;n<r;n++)o[n]=t(e[n],n,void 0,s&&s[n])}else if("number"===typeof e){0,o=new Array(e);for(let n=0;n<e;n++)o[n]=t(n+1,n,void 0,s&&s[n])}else if((0,i.Kn)(e))if(e[Symbol.iterator])o=Array.from(e,((e,n)=>t(e,n,void 0,s&&s[n])));else{const n=Object.keys(e);o=new Array(n.length);for(let r=0,i=n.length;r<i;r++){const i=n[r];o[r]=t(e[i],i,r,s&&s[r])}}else o=[];return n&&(n[r]=o),o}function Ve(e,t,n={},r,i){if(R.isCE||R.parent&&he(R.parent)&&R.parent.isCE)return"default"!==t&&(n.name=t),Zt("slot",n,r&&r());let o=e[t];o&&o._c&&(o._d=!1),Vt();const s=o&&qe(o(n)),a=Wt(Pt,{key:n.key||s&&s.key||`_${t}`},s||(r?r():[]),s&&1===e._?64:-2);return!i&&a.scopeId&&(a.slotScopeIds=[a.scopeId+"-s"]),o&&o._c&&(o._d=!0),a}function qe(e){return e.some((e=>!Kt(e)||e.type!==Mt&&!(e.type===Pt&&!qe(e.children))))?e:null}const $e=e=>e?wn(e)?xn(e)||e.proxy:$e(e.parent):null,Be=(0,i.l7)(Object.create(null),{$:e=>e,$el:e=>e.vnode.el,$data:e=>e.data,$props:e=>e.props,$attrs:e=>e.attrs,$slots:e=>e.slots,$refs:e=>e.refs,$parent:e=>$e(e.parent),$root:e=>$e(e.root),$emit:e=>e.emit,$options:e=>Xe(e),$forceUpdate:e=>e.f||(e.f=()=>b(e.update)),$nextTick:e=>e.n||(e.n=v.bind(e.proxy)),$watch:e=>X.bind(e)}),He=(e,t)=>e!==i.kT&&!e.__isScriptSetup&&(0,i.RI)(e,t),ze={get({_:e},t){const{ctx:n,setupState:o,data:s,props:a,accessCache:c,type:u,appContext:l}=e;let h;if("$"!==t[0]){const r=c[t];if(void 0!==r)switch(r){case 1:return o[t];case 2:return s[t];case 4:return n[t];case 3:return a[t]}else{if(He(o,t))return c[t]=1,o[t];if(s!==i.kT&&(0,i.RI)(s,t))return c[t]=2,s[t];if((h=e.propsOptions[0])&&(0,i.RI)(h,t))return c[t]=3,a[t];if(n!==i.kT&&(0,i.RI)(n,t))return c[t]=4,n[t];We&&(c[t]=0)}}const f=Be[t];let d,p;return f?("$attrs"===t&&(0,r.j)(e,"get",t),f(e)):(d=u.__cssModules)&&(d=d[t])?d:n!==i.kT&&(0,i.RI)(n,t)?(c[t]=4,n[t]):(p=l.config.globalProperties,(0,i.RI)(p,t)?p[t]:void 0)},set({_:e},t,n){const{data:r,setupState:o,ctx:s}=e;return He(o,t)?(o[t]=n,!0):r!==i.kT&&(0,i.RI)(r,t)?(r[t]=n,!0):!(0,i.RI)(e.props,t)&&(("$"!==t[0]||!(t.slice(1)in e))&&(s[t]=n,!0))},has({_:{data:e,setupState:t,accessCache:n,ctx:r,appContext:o,propsOptions:s}},a){let c;return!!n[a]||e!==i.kT&&(0,i.RI)(e,a)||He(t,a)||(c=s[0])&&(0,i.RI)(c,a)||(0,i.RI)(r,a)||(0,i.RI)(Be,a)||(0,i.RI)(o.config.globalProperties,a)},defineProperty(e,t,n){return null!=n.get?e._.accessCache[t]=0:(0,i.RI)(n,"value")&&this.set(e,t,n.value,null),Reflect.defineProperty(e,t,n)}};let We=!0;function Ke(e){const t=Xe(e),n=e.proxy,o=e.ctx;We=!1,t.beforeCreate&&Je(t.beforeCreate,e,"bc");const{data:s,computed:a,methods:c,watch:u,provide:l,inject:h,created:f,beforeMount:d,mounted:p,beforeUpdate:g,updated:m,activated:y,deactivated:v,beforeDestroy:w,beforeUnmount:b,destroyed:E,unmounted:_,render:T,renderTracked:I,renderTriggered:S,errorCaptured:k,serverPrefetch:A,expose:C,inheritAttrs:x,components:O,directives:N,filters:R}=t,D=null;if(h&&Ge(h,o,D,e.appContext.config.unwrapInjectedRef),c)for(const r in c){const e=c[r];(0,i.mf)(e)&&(o[r]=e.bind(n))}if(s){0;const t=s.call(n,n);0,(0,i.Kn)(t)&&(e.data=(0,r.qj)(t))}if(We=!0,a)for(const r in a){const e=a[r],t=(0,i.mf)(e)?e.bind(n,n):(0,i.mf)(e.get)?e.get.bind(n,n):i.dG;0;const s=!(0,i.mf)(e)&&(0,i.mf)(e.set)?e.set.bind(n):i.dG,c=Rn({get:t,set:s});Object.defineProperty(o,r,{enumerable:!0,configurable:!0,get:()=>c.value,set:e=>c.value=e})}if(u)for(const r in u)Qe(u[r],o,n,r);if(l){const e=(0,i.mf)(l)?l.call(n):l;Reflect.ownKeys(e).forEach((t=>{W(t,e[t])}))}function P(e,t){(0,i.kJ)(t)?t.forEach((t=>e(t.bind(n)))):t&&e(t.bind(n))}if(f&&Je(f,e,"c"),P(_e,d),P(Te,p),P(Ie,g),P(Se,m),P(pe,y),P(ge,v),P(Ne,k),P(Oe,I),P(xe,S),P(ke,b),P(Ae,_),P(Ce,A),(0,i.kJ)(C))if(C.length){const t=e.exposed||(e.exposed={});C.forEach((e=>{Object.defineProperty(t,e,{get:()=>n[e],set:t=>n[e]=t})}))}else e.exposed||(e.exposed={});T&&e.render===i.dG&&(e.render=T),null!=x&&(e.inheritAttrs=x),O&&(e.components=O),N&&(e.directives=N)}function Ge(e,t,n=i.dG,o=!1){(0,i.kJ)(e)&&(e=nt(e));for(const s in e){const n=e[s];let a;a=(0,i.Kn)(n)?"default"in n?K(n.from||s,n.default,!0):K(n.from||s):K(n),(0,r.dq)(a)&&o?Object.defineProperty(t,s,{enumerable:!0,configurable:!0,get:()=>a.value,set:e=>a.value=e}):t[s]=a}}function Je(e,t,n){s((0,i.kJ)(e)?e.map((e=>e.bind(t.proxy))):e.bind(t.proxy),t,n)}function Qe(e,t,n,r){const o=r.includes(".")?Y(n,r):()=>n[r];if((0,i.HD)(e)){const n=t[e];(0,i.mf)(n)&&J(o,n)}else if((0,i.mf)(e))J(o,e.bind(n));else if((0,i.Kn)(e))if((0,i.kJ)(e))e.forEach((e=>Qe(e,t,n,r)));else{const r=(0,i.mf)(e.handler)?e.handler.bind(n):t[e.handler];(0,i.mf)(r)&&J(o,r,e)}else 0}function Xe(e){const t=e.type,{mixins:n,extends:r}=t,{mixins:o,optionsCache:s,config:{optionMergeStrategies:a}}=e.appContext,c=s.get(t);let u;return c?u=c:o.length||n||r?(u={},o.length&&o.forEach((e=>Ye(u,e,a,!0))),Ye(u,t,a)):u=t,(0,i.Kn)(t)&&s.set(t,u),u}function Ye(e,t,n,r=!1){const{mixins:i,extends:o}=t;o&&Ye(e,o,n,!0),i&&i.forEach((t=>Ye(e,t,n,!0)));for(const s in t)if(r&&"expose"===s);else{const r=Ze[s]||n&&n[s];e[s]=r?r(e[s],t[s]):t[s]}return e}const Ze={data:et,props:it,emits:it,methods:it,computed:it,beforeCreate:rt,created:rt,beforeMount:rt,mounted:rt,beforeUpdate:rt,updated:rt,beforeDestroy:rt,beforeUnmount:rt,destroyed:rt,unmounted:rt,activated:rt,deactivated:rt,errorCaptured:rt,serverPrefetch:rt,components:it,directives:it,watch:ot,provide:et,inject:tt};function et(e,t){return t?e?function(){return(0,i.l7)((0,i.mf)(e)?e.call(this,this):e,(0,i.mf)(t)?t.call(this,this):t)}:t:e}function tt(e,t){return it(nt(e),nt(t))}function nt(e){if((0,i.kJ)(e)){const t={};for(let n=0;n<e.length;n++)t[e[n]]=e[n];return t}return e}function rt(e,t){return e?[...new Set([].concat(e,t))]:t}function it(e,t){return e?(0,i.l7)((0,i.l7)(Object.create(null),e),t):t}function ot(e,t){if(!e)return t;if(!t)return e;const n=(0,i.l7)(Object.create(null),e);for(const r in t)n[r]=rt(e[r],t[r]);return n}function st(e,t,n,o=!1){const s={},a={};(0,i.Nj)(a,Jt,1),e.propsDefaults=Object.create(null),ct(e,t,s,a);for(const r in e.propsOptions[0])r in s||(s[r]=void 0);n?e.props=o?s:(0,r.Um)(s):e.type.props?e.props=s:e.props=a,e.attrs=a}function at(e,t,n,o){const{props:s,attrs:a,vnode:{patchFlag:c}}=e,u=(0,r.IU)(s),[l]=e.propsOptions;let h=!1;if(!(o||c>0)||16&c){let r;ct(e,t,s,a)&&(h=!0);for(const o in u)t&&((0,i.RI)(t,o)||(r=(0,i.rs)(o))!==o&&(0,i.RI)(t,r))||(l?!n||void 0===n[o]&&void 0===n[r]||(s[o]=ut(l,u,o,void 0,e,!0)):delete s[o]);if(a!==u)for(const e in a)t&&(0,i.RI)(t,e)||(delete a[e],h=!0)}else if(8&c){const n=e.vnode.dynamicProps;for(let r=0;r<n.length;r++){let o=n[r];if(N(e.emitsOptions,o))continue;const c=t[o];if(l)if((0,i.RI)(a,o))c!==a[o]&&(a[o]=c,h=!0);else{const t=(0,i._A)(o);s[t]=ut(l,u,t,c,e,!1)}else c!==a[o]&&(a[o]=c,h=!0)}}h&&(0,r.X$)(e,"set","$attrs")}function ct(e,t,n,o){const[s,a]=e.propsOptions;let c,u=!1;if(t)for(let r in t){if((0,i.Gg)(r))continue;const l=t[r];let h;s&&(0,i.RI)(s,h=(0,i._A)(r))?a&&a.includes(h)?(c||(c={}))[h]=l:n[h]=l:N(e.emitsOptions,r)||r in o&&l===o[r]||(o[r]=l,u=!0)}if(a){const t=(0,r.IU)(n),o=c||i.kT;for(let r=0;r<a.length;r++){const c=a[r];n[c]=ut(s,t,c,o[c],e,!(0,i.RI)(o,c))}}return u}function ut(e,t,n,r,o,s){const a=e[n];if(null!=a){const e=(0,i.RI)(a,"default");if(e&&void 0===r){const e=a.default;if(a.type!==Function&&(0,i.mf)(e)){const{propsDefaults:i}=o;n in i?r=i[n]:(yn(o),r=i[n]=e.call(null,t),vn())}else r=e}a[0]&&(s&&!e?r=!1:!a[1]||""!==r&&r!==(0,i.rs)(n)||(r=!0))}return r}function lt(e,t,n=!1){const r=t.propsCache,o=r.get(e);if(o)return o;const s=e.props,a={},c=[];let u=!1;if(!(0,i.mf)(e)){const r=e=>{u=!0;const[n,r]=lt(e,t,!0);(0,i.l7)(a,n),r&&c.push(...r)};!n&&t.mixins.length&&t.mixins.forEach(r),e.extends&&r(e.extends),e.mixins&&e.mixins.forEach(r)}if(!s&&!u)return(0,i.Kn)(e)&&r.set(e,i.Z6),i.Z6;if((0,i.kJ)(s))for(let h=0;h<s.length;h++){0;const e=(0,i._A)(s[h]);ht(e)&&(a[e]=i.kT)}else if(s){0;for(const e in s){const t=(0,i._A)(e);if(ht(t)){const n=s[e],r=a[t]=(0,i.kJ)(n)||(0,i.mf)(n)?{type:n}:Object.assign({},n);if(r){const e=pt(Boolean,r.type),n=pt(String,r.type);r[0]=e>-1,r[1]=n<0||e<n,(e>-1||(0,i.RI)(r,"default"))&&c.push(t)}}}}const l=[a,c];return(0,i.Kn)(e)&&r.set(e,l),l}function ht(e){return"$"!==e[0]}function ft(e){const t=e&&e.toString().match(/^\s*(function|class) (\w+)/);return t?t[2]:null===e?"null":""}function dt(e,t){return ft(e)===ft(t)}function pt(e,t){return(0,i.kJ)(t)?t.findIndex((t=>dt(t,e))):(0,i.mf)(t)&&dt(t,e)?0:-1}const gt=e=>"_"===e[0]||"$stable"===e,mt=e=>(0,i.kJ)(e)?e.map(an):[an(e)],yt=(e,t,n)=>{if(t._n)return t;const r=j(((...e)=>mt(t(...e))),n);return r._c=!1,r},vt=(e,t,n)=>{const r=e._ctx;for(const o in e){if(gt(o))continue;const n=e[o];if((0,i.mf)(n))t[o]=yt(o,n,r);else if(null!=n){0;const e=mt(n);t[o]=()=>e}}},wt=(e,t)=>{const n=mt(t);e.slots.default=()=>n},bt=(e,t)=>{if(32&e.vnode.shapeFlag){const n=t._;n?(e.slots=(0,r.IU)(t),(0,i.Nj)(t,"_",n)):vt(t,e.slots={})}else e.slots={},t&&wt(e,t);(0,i.Nj)(e.slots,Jt,1)},Et=(e,t,n)=>{const{vnode:r,slots:o}=e;let s=!0,a=i.kT;if(32&r.shapeFlag){const e=t._;e?n&&1===e?s=!1:((0,i.l7)(o,t),n||1!==e||delete o._):(s=!t.$stable,vt(t,o)),a=t}else t&&(wt(e,t),a={default:1});if(s)for(const i in o)gt(i)||i in a||delete o[i]};function _t(){return{app:null,config:{isNativeTag:i.NO,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let Tt=0;function It(e,t){return function(n,r=null){(0,i.mf)(n)||(n=Object.assign({},n)),null==r||(0,i.Kn)(r)||(r=null);const o=_t(),s=new Set;let a=!1;const c=o.app={_uid:Tt++,_component:n,_props:r,_container:null,_context:o,_instance:null,version:Mn,get config(){return o.config},set config(e){0},use(e,...t){return s.has(e)||(e&&(0,i.mf)(e.install)?(s.add(e),e.install(c,...t)):(0,i.mf)(e)&&(s.add(e),e(c,...t))),c},mixin(e){return o.mixins.includes(e)||o.mixins.push(e),c},component(e,t){return t?(o.components[e]=t,c):o.components[e]},directive(e,t){return t?(o.directives[e]=t,c):o.directives[e]},mount(i,s,u){if(!a){0;const l=Zt(n,r);return l.appContext=o,s&&t?t(l,i):e(l,i,u),a=!0,c._container=i,i.__vue_app__=c,xn(l.component)||l.component.proxy}},unmount(){a&&(e(null,c._container),delete c._container.__vue_app__)},provide(e,t){return o.provides[e]=t,c}};return c}}function St(e,t,n,s,a=!1){if((0,i.kJ)(e))return void e.forEach(((e,r)=>St(e,t&&((0,i.kJ)(t)?t[r]:t),n,s,a)));if(he(s)&&!a)return;const c=4&s.shapeFlag?xn(s.component)||s.component.proxy:s.el,u=a?null:c,{i:l,r:h}=e;const f=t&&t.r,d=l.refs===i.kT?l.refs={}:l.refs,p=l.setupState;if(null!=f&&f!==h&&((0,i.HD)(f)?(d[f]=null,(0,i.RI)(p,f)&&(p[f]=null)):(0,r.dq)(f)&&(f.value=null)),(0,i.mf)(h))o(h,l,12,[u,d]);else{const t=(0,i.HD)(h),o=(0,r.dq)(h);if(t||o){const r=()=>{if(e.f){const n=t?(0,i.RI)(p,h)?p[h]:d[h]:h.value;a?(0,i.kJ)(n)&&(0,i.Od)(n,c):(0,i.kJ)(n)?n.includes(c)||n.push(c):t?(d[h]=[c],(0,i.RI)(p,h)&&(p[h]=d[h])):(h.value=[c],e.k&&(d[e.k]=h.value))}else t?(d[h]=u,(0,i.RI)(p,h)&&(p[h]=u)):o&&(h.value=u,e.k&&(d[e.k]=u))};u?(r.id=-1,At(r,n)):r()}else 0}}function kt(){}const At=z;function Ct(e){return xt(e)}function xt(e,t){kt();const n=(0,i.E9)();n.__VUE__=!0;const{insert:o,remove:s,patchProp:a,createElement:c,createText:u,createComment:l,setText:h,setElementText:f,parentNode:d,nextSibling:p,setScopeId:g=i.dG,insertStaticContent:m}=e,y=(e,t,n,r=null,i=null,o=null,s=!1,a=null,c=!!t.dynamicChildren)=>{if(e===t)return;e&&!Gt(e,t)&&(r=Y(e),K(e,i,o,!0),e=null),-2===t.patchFlag&&(c=!1,t.dynamicChildren=null);const{type:u,ref:l,shapeFlag:h}=t;switch(u){case Lt:v(e,t,n,r);break;case Mt:w(e,t,n,r);break;case jt:null==e&&E(t,n,r,s);break;case Pt:P(e,t,n,r,i,o,s,a,c);break;default:1&h?A(e,t,n,r,i,o,s,a,c):6&h?L(e,t,n,r,i,o,s,a,c):(64&h||128&h)&&u.process(e,t,n,r,i,o,s,a,c,ee)}null!=l&&i&&St(l,e&&e.ref,o,t||e,!t)},v=(e,t,n,r)=>{if(null==e)o(t.el=u(t.children),n,r);else{const n=t.el=e.el;t.children!==e.children&&h(n,t.children)}},w=(e,t,n,r)=>{null==e?o(t.el=l(t.children||""),n,r):t.el=e.el},E=(e,t,n,r)=>{[e.el,e.anchor]=m(e.children,t,n,r,e.el,e.anchor)},T=({el:e,anchor:t},n,r)=>{let i;while(e&&e!==t)i=p(e),o(e,n,r),e=i;o(t,n,r)},k=({el:e,anchor:t})=>{let n;while(e&&e!==t)n=p(e),s(e),e=n;s(t)},A=(e,t,n,r,i,o,s,a,c)=>{s=s||"svg"===t.type,null==e?C(t,n,r,i,o,s,a,c):N(e,t,i,o,s,a,c)},C=(e,t,n,r,s,u,l,h)=>{let d,p;const{type:g,props:m,shapeFlag:y,transition:v,dirs:w}=e;if(d=e.el=c(e.type,u,m&&m.is,m),8&y?f(d,e.children):16&y&&O(e.children,d,null,r,s,u&&"foreignObject"!==g,l,h),w&&De(e,null,r,"created"),x(d,e,e.scopeId,l,r),m){for(const t in m)"value"===t||(0,i.Gg)(t)||a(d,t,null,m[t],u,e.children,r,s,X);"value"in m&&a(d,"value",null,m.value),(p=m.onVnodeBeforeMount)&&hn(p,r,e)}w&&De(e,null,r,"beforeMount");const b=(!s||s&&!s.pendingBranch)&&v&&!v.persisted;b&&v.beforeEnter(d),o(d,t,n),((p=m&&m.onVnodeMounted)||b||w)&&At((()=>{p&&hn(p,r,e),b&&v.enter(d),w&&De(e,null,r,"mounted")}),s)},x=(e,t,n,r,i)=>{if(n&&g(e,n),r)for(let o=0;o<r.length;o++)g(e,r[o]);if(i){let n=i.subTree;if(t===n){const t=i.vnode;x(e,t,t.scopeId,t.slotScopeIds,i.parent)}}},O=(e,t,n,r,i,o,s,a,c=0)=>{for(let u=c;u<e.length;u++){const c=e[u]=a?cn(e[u]):an(e[u]);y(null,c,t,n,r,i,o,s,a)}},N=(e,t,n,r,o,s,c)=>{const u=t.el=e.el;let{patchFlag:l,dynamicChildren:h,dirs:d}=t;l|=16&e.patchFlag;const p=e.props||i.kT,g=t.props||i.kT;let m;n&&Ot(n,!1),(m=g.onVnodeBeforeUpdate)&&hn(m,n,t,e),d&&De(t,e,n,"beforeUpdate"),n&&Ot(n,!0);const y=o&&"foreignObject"!==t.type;if(h?R(e.dynamicChildren,h,u,n,r,y,s):c||$(e,t,u,null,n,r,y,s,!1),l>0){if(16&l)D(u,t,p,g,n,r,o);else if(2&l&&p.class!==g.class&&a(u,"class",null,g.class,o),4&l&&a(u,"style",p.style,g.style,o),8&l){const i=t.dynamicProps;for(let t=0;t<i.length;t++){const s=i[t],c=p[s],l=g[s];l===c&&"value"!==s||a(u,s,c,l,o,e.children,n,r,X)}}1&l&&e.children!==t.children&&f(u,t.children)}else c||null!=h||D(u,t,p,g,n,r,o);((m=g.onVnodeUpdated)||d)&&At((()=>{m&&hn(m,n,t,e),d&&De(t,e,n,"updated")}),r)},R=(e,t,n,r,i,o,s)=>{for(let a=0;a<t.length;a++){const c=e[a],u=t[a],l=c.el&&(c.type===Pt||!Gt(c,u)||70&c.shapeFlag)?d(c.el):n;y(c,u,l,null,r,i,o,s,!0)}},D=(e,t,n,r,o,s,c)=>{if(n!==r){if(n!==i.kT)for(const u in n)(0,i.Gg)(u)||u in r||a(e,u,n[u],null,c,t.children,o,s,X);for(const u in r){if((0,i.Gg)(u))continue;const l=r[u],h=n[u];l!==h&&"value"!==u&&a(e,u,h,l,c,t.children,o,s,X)}"value"in r&&a(e,"value",n.value,r.value)}},P=(e,t,n,r,i,s,a,c,l)=>{const h=t.el=e?e.el:u(""),f=t.anchor=e?e.anchor:u("");let{patchFlag:d,dynamicChildren:p,slotScopeIds:g}=t;g&&(c=c?c.concat(g):g),null==e?(o(h,n,r),o(f,n,r),O(t.children,n,f,i,s,a,c,l)):d>0&&64&d&&p&&e.dynamicChildren?(R(e.dynamicChildren,p,n,i,s,a,c),(null!=t.key||i&&t===i.subTree)&&Nt(e,t,!0)):$(e,t,n,f,i,s,a,c,l)},L=(e,t,n,r,i,o,s,a,c)=>{t.slotScopeIds=a,null==e?512&t.shapeFlag?i.ctx.activate(t,n,r,s,c):M(t,n,r,i,o,s,c):j(e,t,c)},M=(e,t,n,r,i,o,s)=>{const a=e.component=pn(e,r,i);if(fe(e)&&(a.ctx.renderer=ee),Tn(a),a.asyncDep){if(i&&i.registerDep(a,U),!e.el){const e=a.subTree=Zt(Mt);w(null,e,t,n)}}else U(a,e,t,n,i,o,s)},j=(e,t,n)=>{const r=t.component=e.component;if(q(e,t,n)){if(r.asyncDep&&!r.asyncResolved)return void V(r,t,n);r.next=t,_(r.update),r.update()}else t.el=e.el,r.vnode=t},U=(e,t,n,o,s,a,c)=>{const u=()=>{if(e.isMounted){let t,{next:n,bu:r,u:o,parent:u,vnode:l}=e,h=n;0,Ot(e,!1),n?(n.el=l.el,V(e,n,c)):n=l,r&&(0,i.ir)(r),(t=n.props&&n.props.onVnodeBeforeUpdate)&&hn(t,u,n,l),Ot(e,!0);const f=F(e);0;const p=e.subTree;e.subTree=f,y(p,f,d(p.el),Y(p),e,s,a),n.el=f.el,null===h&&B(e,f.el),o&&At(o,s),(t=n.props&&n.props.onVnodeUpdated)&&At((()=>hn(t,u,n,l)),s)}else{let r;const{el:c,props:u}=t,{bm:l,m:h,parent:f}=e,d=he(t);if(Ot(e,!1),l&&(0,i.ir)(l),!d&&(r=u&&u.onVnodeBeforeMount)&&hn(r,f,t),Ot(e,!0),c&&ne){const n=()=>{e.subTree=F(e),ne(c,e.subTree,e,s,null)};d?t.type.__asyncLoader().then((()=>!e.isUnmounted&&n())):n()}else{0;const r=e.subTree=F(e);0,y(null,r,n,o,e,s,a),t.el=r.el}if(h&&At(h,s),!d&&(r=u&&u.onVnodeMounted)){const e=t;At((()=>hn(r,f,e)),s)}(256&t.shapeFlag||f&&he(f.vnode)&&256&f.vnode.shapeFlag)&&e.a&&At(e.a,s),e.isMounted=!0,t=n=o=null}},l=e.effect=new r.qq(u,(()=>b(h)),e.scope),h=e.update=()=>l.run();h.id=e.uid,Ot(e,!0),h()},V=(e,t,n)=>{t.component=e;const i=e.vnode.props;e.vnode=t,e.next=null,at(e,t.props,i,n),Et(e,t.children,n),(0,r.Jd)(),I(),(0,r.lk)()},$=(e,t,n,r,i,o,s,a,c=!1)=>{const u=e&&e.children,l=e?e.shapeFlag:0,h=t.children,{patchFlag:d,shapeFlag:p}=t;if(d>0){if(128&d)return void z(u,h,n,r,i,o,s,a,c);if(256&d)return void H(u,h,n,r,i,o,s,a,c)}8&p?(16&l&&X(u,i,o),h!==u&&f(n,h)):16&l?16&p?z(u,h,n,r,i,o,s,a,c):X(u,i,o,!0):(8&l&&f(n,""),16&p&&O(h,n,r,i,o,s,a,c))},H=(e,t,n,r,o,s,a,c,u)=>{e=e||i.Z6,t=t||i.Z6;const l=e.length,h=t.length,f=Math.min(l,h);let d;for(d=0;d<f;d++){const r=t[d]=u?cn(t[d]):an(t[d]);y(e[d],r,n,null,o,s,a,c,u)}l>h?X(e,o,s,!0,!1,f):O(t,n,r,o,s,a,c,u,f)},z=(e,t,n,r,o,s,a,c,u)=>{let l=0;const h=t.length;let f=e.length-1,d=h-1;while(l<=f&&l<=d){const r=e[l],i=t[l]=u?cn(t[l]):an(t[l]);if(!Gt(r,i))break;y(r,i,n,null,o,s,a,c,u),l++}while(l<=f&&l<=d){const r=e[f],i=t[d]=u?cn(t[d]):an(t[d]);if(!Gt(r,i))break;y(r,i,n,null,o,s,a,c,u),f--,d--}if(l>f){if(l<=d){const e=d+1,i=e<h?t[e].el:r;while(l<=d)y(null,t[l]=u?cn(t[l]):an(t[l]),n,i,o,s,a,c,u),l++}}else if(l>d)while(l<=f)K(e[l],o,s,!0),l++;else{const p=l,g=l,m=new Map;for(l=g;l<=d;l++){const e=t[l]=u?cn(t[l]):an(t[l]);null!=e.key&&m.set(e.key,l)}let v,w=0;const b=d-g+1;let E=!1,_=0;const T=new Array(b);for(l=0;l<b;l++)T[l]=0;for(l=p;l<=f;l++){const r=e[l];if(w>=b){K(r,o,s,!0);continue}let i;if(null!=r.key)i=m.get(r.key);else for(v=g;v<=d;v++)if(0===T[v-g]&&Gt(r,t[v])){i=v;break}void 0===i?K(r,o,s,!0):(T[i-g]=l+1,i>=_?_=i:E=!0,y(r,t[i],n,null,o,s,a,c,u),w++)}const I=E?Rt(T):i.Z6;for(v=I.length-1,l=b-1;l>=0;l--){const e=g+l,i=t[e],f=e+1<h?t[e+1].el:r;0===T[l]?y(null,i,n,f,o,s,a,c,u):E&&(v<0||l!==I[v]?W(i,n,f,2):v--)}}},W=(e,t,n,r,i=null)=>{const{el:s,type:a,transition:c,children:u,shapeFlag:l}=e;if(6&l)return void W(e.component.subTree,t,n,r);if(128&l)return void e.suspense.move(t,n,r);if(64&l)return void a.move(e,t,n,ee);if(a===Pt){o(s,t,n);for(let e=0;e<u.length;e++)W(u[e],t,n,r);return void o(e.anchor,t,n)}if(a===jt)return void T(e,t,n);const h=2!==r&&1&l&&c;if(h)if(0===r)c.beforeEnter(s),o(s,t,n),At((()=>c.enter(s)),i);else{const{leave:e,delayLeave:r,afterLeave:i}=c,a=()=>o(s,t,n),u=()=>{e(s,(()=>{a(),i&&i()}))};r?r(s,a,u):u()}else o(s,t,n)},K=(e,t,n,r=!1,i=!1)=>{const{type:o,props:s,ref:a,children:c,dynamicChildren:u,shapeFlag:l,patchFlag:h,dirs:f}=e;if(null!=a&&St(a,null,n,e,!0),256&l)return void t.ctx.deactivate(e);const d=1&l&&f,p=!he(e);let g;if(p&&(g=s&&s.onVnodeBeforeUnmount)&&hn(g,t,e),6&l)Q(e.component,n,r);else{if(128&l)return void e.suspense.unmount(n,r);d&&De(e,null,t,"beforeUnmount"),64&l?e.type.remove(e,t,n,i,ee,r):u&&(o!==Pt||h>0&&64&h)?X(u,t,n,!1,!0):(o===Pt&&384&h||!i&&16&l)&&X(c,t,n),r&&G(e)}(p&&(g=s&&s.onVnodeUnmounted)||d)&&At((()=>{g&&hn(g,t,e),d&&De(e,null,t,"unmounted")}),n)},G=e=>{const{type:t,el:n,anchor:r,transition:i}=e;if(t===Pt)return void J(n,r);if(t===jt)return void k(e);const o=()=>{s(n),i&&!i.persisted&&i.afterLeave&&i.afterLeave()};if(1&e.shapeFlag&&i&&!i.persisted){const{leave:t,delayLeave:r}=i,s=()=>t(n,o);r?r(e.el,o,s):s()}else o()},J=(e,t)=>{let n;while(e!==t)n=p(e),s(e),e=n;s(t)},Q=(e,t,n)=>{const{bum:r,scope:o,update:s,subTree:a,um:c}=e;r&&(0,i.ir)(r),o.stop(),s&&(s.active=!1,K(a,e,t,n)),c&&At(c,t),At((()=>{e.isUnmounted=!0}),t),t&&t.pendingBranch&&!t.isUnmounted&&e.asyncDep&&!e.asyncResolved&&e.suspenseId===t.pendingId&&(t.deps--,0===t.deps&&t.resolve())},X=(e,t,n,r=!1,i=!1,o=0)=>{for(let s=o;s<e.length;s++)K(e[s],t,n,r,i)},Y=e=>6&e.shapeFlag?Y(e.component.subTree):128&e.shapeFlag?e.suspense.next():p(e.anchor||e.el),Z=(e,t,n)=>{null==e?t._vnode&&K(t._vnode,null,null,!0):y(t._vnode||null,e,t,null,null,null,n),I(),S(),t._vnode=e},ee={p:y,um:K,m:W,r:G,mt:M,mc:O,pc:$,pbc:R,n:Y,o:e};let te,ne;return t&&([te,ne]=t(ee)),{render:Z,hydrate:te,createApp:It(Z,te)}}function Ot({effect:e,update:t},n){e.allowRecurse=t.allowRecurse=n}function Nt(e,t,n=!1){const r=e.children,o=t.children;if((0,i.kJ)(r)&&(0,i.kJ)(o))for(let i=0;i<r.length;i++){const e=r[i];let t=o[i];1&t.shapeFlag&&!t.dynamicChildren&&((t.patchFlag<=0||32===t.patchFlag)&&(t=o[i]=cn(o[i]),t.el=e.el),n||Nt(e,t)),t.type===Lt&&(t.el=e.el)}}function Rt(e){const t=e.slice(),n=[0];let r,i,o,s,a;const c=e.length;for(r=0;r<c;r++){const c=e[r];if(0!==c){if(i=n[n.length-1],e[i]<c){t[r]=i,n.push(r);continue}o=0,s=n.length-1;while(o<s)a=o+s>>1,e[n[a]]<c?o=a+1:s=a;c<e[n[o]]&&(o>0&&(t[r]=n[o-1]),n[o]=r)}}o=n.length,s=n[o-1];while(o-- >0)n[o]=s,s=t[s];return n}const Dt=e=>e.__isTeleport;const Pt=Symbol(void 0),Lt=Symbol(void 0),Mt=Symbol(void 0),jt=Symbol(void 0),Ft=[];let Ut=null;function Vt(e=!1){Ft.push(Ut=e?null:[])}function qt(){Ft.pop(),Ut=Ft[Ft.length-1]||null}let $t=1;function Bt(e){$t+=e}function Ht(e){return e.dynamicChildren=$t>0?Ut||i.Z6:null,qt(),$t>0&&Ut&&Ut.push(e),e}function zt(e,t,n,r,i,o){return Ht(Yt(e,t,n,r,i,o,!0))}function Wt(e,t,n,r,i){return Ht(Zt(e,t,n,r,i,!0))}function Kt(e){return!!e&&!0===e.__v_isVNode}function Gt(e,t){return e.type===t.type&&e.key===t.key}const Jt="__vInternal",Qt=({key:e})=>null!=e?e:null,Xt=({ref:e,ref_key:t,ref_for:n})=>null!=e?(0,i.HD)(e)||(0,r.dq)(e)||(0,i.mf)(e)?{i:R,r:e,k:t,f:!!n}:e:null;function Yt(e,t=null,n=null,r=0,o=null,s=(e===Pt?0:1),a=!1,c=!1){const u={__v_isVNode:!0,__v_skip:!0,type:e,props:t,key:t&&Qt(t),ref:t&&Xt(t),scopeId:D,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetAnchor:null,staticCount:0,shapeFlag:s,patchFlag:r,dynamicProps:o,dynamicChildren:null,appContext:null,ctx:R};return c?(un(u,n),128&s&&e.normalize(u)):n&&(u.shapeFlag|=(0,i.HD)(n)?8:16),$t>0&&!a&&Ut&&(u.patchFlag>0||6&s)&&32!==u.patchFlag&&Ut.push(u),u}const Zt=en;function en(e,t=null,n=null,o=0,s=null,a=!1){if(e&&e!==Me||(e=Mt),Kt(e)){const r=nn(e,t,!0);return n&&un(r,n),$t>0&&!a&&Ut&&(6&r.shapeFlag?Ut[Ut.indexOf(e)]=r:Ut.push(r)),r.patchFlag|=-2,r}if(Nn(e)&&(e=e.__vccOpts),t){t=tn(t);let{class:e,style:n}=t;e&&!(0,i.HD)(e)&&(t.class=(0,i.C_)(e)),(0,i.Kn)(n)&&((0,r.X3)(n)&&!(0,i.kJ)(n)&&(n=(0,i.l7)({},n)),t.style=(0,i.j5)(n))}const c=(0,i.HD)(e)?1:H(e)?128:Dt(e)?64:(0,i.Kn)(e)?4:(0,i.mf)(e)?2:0;return Yt(e,t,n,o,s,c,a,!0)}function tn(e){return e?(0,r.X3)(e)||Jt in e?(0,i.l7)({},e):e:null}function nn(e,t,n=!1){const{props:r,ref:o,patchFlag:s,children:a}=e,c=t?ln(r||{},t):r,u={__v_isVNode:!0,__v_skip:!0,type:e.type,props:c,key:c&&Qt(c),ref:t&&t.ref?n&&o?(0,i.kJ)(o)?o.concat(Xt(t)):[o,Xt(t)]:Xt(t):o,scopeId:e.scopeId,slotScopeIds:e.slotScopeIds,children:a,target:e.target,targetAnchor:e.targetAnchor,staticCount:e.staticCount,shapeFlag:e.shapeFlag,patchFlag:t&&e.type!==Pt?-1===s?16:16|s:s,dynamicProps:e.dynamicProps,dynamicChildren:e.dynamicChildren,appContext:e.appContext,dirs:e.dirs,transition:e.transition,component:e.component,suspense:e.suspense,ssContent:e.ssContent&&nn(e.ssContent),ssFallback:e.ssFallback&&nn(e.ssFallback),el:e.el,anchor:e.anchor,ctx:e.ctx,ce:e.ce};return u}function rn(e=" ",t=0){return Zt(Lt,null,e,t)}function on(e,t){const n=Zt(jt,null,e);return n.staticCount=t,n}function sn(e="",t=!1){return t?(Vt(),Wt(Mt,null,e)):Zt(Mt,null,e)}function an(e){return null==e||"boolean"===typeof e?Zt(Mt):(0,i.kJ)(e)?Zt(Pt,null,e.slice()):"object"===typeof e?cn(e):Zt(Lt,null,String(e))}function cn(e){return null===e.el&&-1!==e.patchFlag||e.memo?e:nn(e)}function un(e,t){let n=0;const{shapeFlag:r}=e;if(null==t)t=null;else if((0,i.kJ)(t))n=16;else if("object"===typeof t){if(65&r){const n=t.default;return void(n&&(n._c&&(n._d=!1),un(e,n()),n._c&&(n._d=!0)))}{n=32;const r=t._;r||Jt in t?3===r&&R&&(1===R.slots._?t._=1:(t._=2,e.patchFlag|=1024)):t._ctx=R}}else(0,i.mf)(t)?(t={default:t,_ctx:R},n=32):(t=String(t),64&r?(n=16,t=[rn(t)]):n=8);e.children=t,e.shapeFlag|=n}function ln(...e){const t={};for(let n=0;n<e.length;n++){const r=e[n];for(const e in r)if("class"===e)t.class!==r.class&&(t.class=(0,i.C_)([t.class,r.class]));else if("style"===e)t.style=(0,i.j5)([t.style,r.style]);else if((0,i.F7)(e)){const n=t[e],o=r[e];!o||n===o||(0,i.kJ)(n)&&n.includes(o)||(t[e]=n?[].concat(n,o):o)}else""!==e&&(t[e]=r[e])}return t}function hn(e,t,n,r=null){s(e,t,7,[n,r])}const fn=_t();let dn=0;function pn(e,t,n){const o=e.type,s=(t?t.appContext:e.appContext)||fn,a={uid:dn++,vnode:e,type:o,parent:t,appContext:s,root:null,next:null,subTree:null,effect:null,update:null,scope:new r.Bj(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:t?t.provides:Object.create(s.provides),accessCache:null,renderCache:[],components:null,directives:null,propsOptions:lt(o,s),emitsOptions:O(o,s),emit:null,emitted:null,propsDefaults:i.kT,inheritAttrs:o.inheritAttrs,ctx:i.kT,data:i.kT,props:i.kT,attrs:i.kT,slots:i.kT,refs:i.kT,setupState:i.kT,setupContext:null,suspense:n,suspenseId:n?n.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return a.ctx={_:a},a.root=t?t.root:a,a.emit=x.bind(null,a),e.ce&&e.ce(a),a}let gn=null;const mn=()=>gn||R,yn=e=>{gn=e,e.scope.on()},vn=()=>{gn&&gn.scope.off(),gn=null};function wn(e){return 4&e.vnode.shapeFlag}let bn,En,_n=!1;function Tn(e,t=!1){_n=t;const{props:n,children:r}=e.vnode,i=wn(e);st(e,n,i,t),bt(e,r);const o=i?In(e,t):void 0;return _n=!1,o}function In(e,t){const n=e.type;e.accessCache=Object.create(null),e.proxy=(0,r.Xl)(new Proxy(e.ctx,ze));const{setup:s}=n;if(s){const n=e.setupContext=s.length>1?Cn(e):null;yn(e),(0,r.Jd)();const c=o(s,e,0,[e.props,n]);if((0,r.lk)(),vn(),(0,i.tI)(c)){if(c.then(vn,vn),t)return c.then((n=>{Sn(e,n,t)})).catch((t=>{a(t,e,0)}));e.asyncDep=c}else Sn(e,c,t)}else kn(e,t)}function Sn(e,t,n){(0,i.mf)(t)?e.type.__ssrInlineRender?e.ssrRender=t:e.render=t:(0,i.Kn)(t)&&(e.setupState=(0,r.WL)(t)),kn(e,n)}function kn(e,t,n){const o=e.type;if(!e.render){if(!t&&bn&&!o.render){const t=o.template||Xe(e).template;if(t){0;const{isCustomElement:n,compilerOptions:r}=e.appContext.config,{delimiters:s,compilerOptions:a}=o,c=(0,i.l7)((0,i.l7)({isCustomElement:n,delimiters:s},r),a);o.render=bn(t,c)}}e.render=o.render||i.dG,En&&En(e)}yn(e),(0,r.Jd)(),Ke(e),(0,r.lk)(),vn()}function An(e){return new Proxy(e.attrs,{get(t,n){return(0,r.j)(e,"get","$attrs"),t[n]}})}function Cn(e){const t=t=>{e.exposed=t||{}};let n;return{get attrs(){return n||(n=An(e))},slots:e.slots,emit:e.emit,expose:t}}function xn(e){if(e.exposed)return e.exposeProxy||(e.exposeProxy=new Proxy((0,r.WL)((0,r.Xl)(e.exposed)),{get(t,n){return n in t?t[n]:n in Be?Be[n](e):void 0},has(e,t){return t in e||t in Be}}))}function On(e,t=!0){return(0,i.mf)(e)?e.displayName||e.name:e.name||t&&e.__name}function Nn(e){return(0,i.mf)(e)&&"__vccOpts"in e}const Rn=(e,t)=>(0,r.Fl)(e,t,_n);function Dn(e,t,n){const r=arguments.length;return 2===r?(0,i.Kn)(t)&&!(0,i.kJ)(t)?Kt(t)?Zt(e,null,[t]):Zt(e,t):Zt(e,null,t):(r>3?n=Array.prototype.slice.call(arguments,2):3===r&&Kt(n)&&(n=[n]),Zt(e,t,n))}const Pn=Symbol(""),Ln=()=>{{const e=K(Pn);return e}};const Mn="3.2.47"},9242:function(e,t,n){"use strict";n.d(t,{bM:function(){return he},e8:function(){return ue},nr:function(){return ce},ri:function(){return ve}});n(7658);var r=n(7139),i=n(3396),o=n(4870);const s="http://www.w3.org/2000/svg",a="undefined"!==typeof document?document:null,c=a&&a.createElement("template"),u={insert:(e,t,n)=>{t.insertBefore(e,n||null)},remove:e=>{const t=e.parentNode;t&&t.removeChild(e)},createElement:(e,t,n,r)=>{const i=t?a.createElementNS(s,e):a.createElement(e,n?{is:n}:void 0);return"select"===e&&r&&null!=r.multiple&&i.setAttribute("multiple",r.multiple),i},createText:e=>a.createTextNode(e),createComment:e=>a.createComment(e),setText:(e,t)=>{e.nodeValue=t},setElementText:(e,t)=>{e.textContent=t},parentNode:e=>e.parentNode,nextSibling:e=>e.nextSibling,querySelector:e=>a.querySelector(e),setScopeId(e,t){e.setAttribute(t,"")},insertStaticContent(e,t,n,r,i,o){const s=n?n.previousSibling:t.lastChild;if(i&&(i===o||i.nextSibling)){while(1)if(t.insertBefore(i.cloneNode(!0),n),i===o||!(i=i.nextSibling))break}else{c.innerHTML=r?`<svg>${e}</svg>`:e;const i=c.content;if(r){const e=i.firstChild;while(e.firstChild)i.appendChild(e.firstChild);i.removeChild(e)}t.insertBefore(i,n)}return[s?s.nextSibling:t.firstChild,n?n.previousSibling:t.lastChild]}};function l(e,t,n){const r=e._vtc;r&&(t=(t?[t,...r]:[...r]).join(" ")),null==t?e.removeAttribute("class"):n?e.setAttribute("class",t):e.className=t}function h(e,t,n){const i=e.style,o=(0,r.HD)(n);if(n&&!o){if(t&&!(0,r.HD)(t))for(const e in t)null==n[e]&&d(i,e,"");for(const e in n)d(i,e,n[e])}else{const r=i.display;o?t!==n&&(i.cssText=n):t&&e.removeAttribute("style"),"_vod"in e&&(i.display=r)}}const f=/\s*!important$/;function d(e,t,n){if((0,r.kJ)(n))n.forEach((n=>d(e,t,n)));else if(null==n&&(n=""),t.startsWith("--"))e.setProperty(t,n);else{const i=m(e,t);f.test(n)?e.setProperty((0,r.rs)(i),n.replace(f,""),"important"):e[i]=n}}const p=["Webkit","Moz","ms"],g={};function m(e,t){const n=g[t];if(n)return n;let i=(0,r._A)(t);if("filter"!==i&&i in e)return g[t]=i;i=(0,r.kC)(i);for(let r=0;r<p.length;r++){const n=p[r]+i;if(n in e)return g[t]=n}return t}const y="http://www.w3.org/1999/xlink";function v(e,t,n,i,o){if(i&&t.startsWith("xlink:"))null==n?e.removeAttributeNS(y,t.slice(6,t.length)):e.setAttributeNS(y,t,n);else{const i=(0,r.Pq)(t);null==n||i&&!(0,r.yA)(n)?e.removeAttribute(t):e.setAttribute(t,i?"":n)}}function w(e,t,n,i,o,s,a){if("innerHTML"===t||"textContent"===t)return i&&a(i,o,s),void(e[t]=null==n?"":n);if("value"===t&&"PROGRESS"!==e.tagName&&!e.tagName.includes("-")){e._value=n;const r=null==n?"":n;return e.value===r&&"OPTION"!==e.tagName||(e.value=r),void(null==n&&e.removeAttribute(t))}let c=!1;if(""===n||null==n){const i=typeof e[t];"boolean"===i?n=(0,r.yA)(n):null==n&&"string"===i?(n="",c=!0):"number"===i&&(n=0,c=!0)}try{e[t]=n}catch(u){0}c&&e.removeAttribute(t)}function b(e,t,n,r){e.addEventListener(t,n,r)}function E(e,t,n,r){e.removeEventListener(t,n,r)}function _(e,t,n,r,i=null){const o=e._vei||(e._vei={}),s=o[t];if(r&&s)s.value=r;else{const[n,a]=I(t);if(r){const s=o[t]=C(r,i);b(e,n,s,a)}else s&&(E(e,n,s,a),o[t]=void 0)}}const T=/(?:Once|Passive|Capture)$/;function I(e){let t;if(T.test(e)){let n;t={};while(n=e.match(T))e=e.slice(0,e.length-n[0].length),t[n[0].toLowerCase()]=!0}const n=":"===e[2]?e.slice(3):(0,r.rs)(e.slice(2));return[n,t]}let S=0;const k=Promise.resolve(),A=()=>S||(k.then((()=>S=0)),S=Date.now());function C(e,t){const n=e=>{if(e._vts){if(e._vts<=n.attached)return}else e._vts=Date.now();(0,i.$d)(x(e,n.value),t,5,[e])};return n.value=e,n.attached=A(),n}function x(e,t){if((0,r.kJ)(t)){const n=e.stopImmediatePropagation;return e.stopImmediatePropagation=()=>{n.call(e),e._stopped=!0},t.map((e=>t=>!t._stopped&&e&&e(t)))}return t}const O=/^on[a-z]/,N=(e,t,n,i,o=!1,s,a,c,u)=>{"class"===t?l(e,i,o):"style"===t?h(e,n,i):(0,r.F7)(t)?(0,r.tR)(t)||_(e,t,n,i,a):("."===t[0]?(t=t.slice(1),1):"^"===t[0]?(t=t.slice(1),0):R(e,t,i,o))?w(e,t,i,s,a,c,u):("true-value"===t?e._trueValue=i:"false-value"===t&&(e._falseValue=i),v(e,t,i,o))};function R(e,t,n,i){return i?"innerHTML"===t||"textContent"===t||!!(t in e&&O.test(t)&&(0,r.mf)(n)):"spellcheck"!==t&&"draggable"!==t&&"translate"!==t&&("form"!==t&&(("list"!==t||"INPUT"!==e.tagName)&&(("type"!==t||"TEXTAREA"!==e.tagName)&&((!O.test(t)||!(0,r.HD)(n))&&t in e))))}"undefined"!==typeof HTMLElement&&HTMLElement;const D="transition",P="animation",L=(e,{slots:t})=>(0,i.h)(i.P$,V(e),t);L.displayName="Transition";const M={name:String,type:String,css:{type:Boolean,default:!0},duration:[String,Number,Object],enterFromClass:String,enterActiveClass:String,enterToClass:String,appearFromClass:String,appearActiveClass:String,appearToClass:String,leaveFromClass:String,leaveActiveClass:String,leaveToClass:String},j=L.props=(0,r.l7)({},i.P$.props,M),F=(e,t=[])=>{(0,r.kJ)(e)?e.forEach((e=>e(...t))):e&&e(...t)},U=e=>!!e&&((0,r.kJ)(e)?e.some((e=>e.length>1)):e.length>1);function V(e){const t={};for(const r in e)r in M||(t[r]=e[r]);if(!1===e.css)return t;const{name:n="v",type:i,duration:o,enterFromClass:s=`${n}-enter-from`,enterActiveClass:a=`${n}-enter-active`,enterToClass:c=`${n}-enter-to`,appearFromClass:u=s,appearActiveClass:l=a,appearToClass:h=c,leaveFromClass:f=`${n}-leave-from`,leaveActiveClass:d=`${n}-leave-active`,leaveToClass:p=`${n}-leave-to`}=e,g=q(o),m=g&&g[0],y=g&&g[1],{onBeforeEnter:v,onEnter:w,onEnterCancelled:b,onLeave:E,onLeaveCancelled:_,onBeforeAppear:T=v,onAppear:I=w,onAppearCancelled:S=b}=t,k=(e,t,n)=>{H(e,t?h:c),H(e,t?l:a),n&&n()},A=(e,t)=>{e._isLeaving=!1,H(e,f),H(e,p),H(e,d),t&&t()},C=e=>(t,n)=>{const r=e?I:w,o=()=>k(t,e,n);F(r,[t,o]),z((()=>{H(t,e?u:s),B(t,e?h:c),U(r)||K(t,i,m,o)}))};return(0,r.l7)(t,{onBeforeEnter(e){F(v,[e]),B(e,s),B(e,a)},onBeforeAppear(e){F(T,[e]),B(e,u),B(e,l)},onEnter:C(!1),onAppear:C(!0),onLeave(e,t){e._isLeaving=!0;const n=()=>A(e,t);B(e,f),X(),B(e,d),z((()=>{e._isLeaving&&(H(e,f),B(e,p),U(E)||K(e,i,y,n))})),F(E,[e,n])},onEnterCancelled(e){k(e,!1),F(b,[e])},onAppearCancelled(e){k(e,!0),F(S,[e])},onLeaveCancelled(e){A(e),F(_,[e])}})}function q(e){if(null==e)return null;if((0,r.Kn)(e))return[$(e.enter),$(e.leave)];{const t=$(e);return[t,t]}}function $(e){const t=(0,r.He)(e);return t}function B(e,t){t.split(/\s+/).forEach((t=>t&&e.classList.add(t))),(e._vtc||(e._vtc=new Set)).add(t)}function H(e,t){t.split(/\s+/).forEach((t=>t&&e.classList.remove(t)));const{_vtc:n}=e;n&&(n.delete(t),n.size||(e._vtc=void 0))}function z(e){requestAnimationFrame((()=>{requestAnimationFrame(e)}))}let W=0;function K(e,t,n,r){const i=e._endId=++W,o=()=>{i===e._endId&&r()};if(n)return setTimeout(o,n);const{type:s,timeout:a,propCount:c}=G(e,t);if(!s)return r();const u=s+"end";let l=0;const h=()=>{e.removeEventListener(u,f),o()},f=t=>{t.target===e&&++l>=c&&h()};setTimeout((()=>{l<c&&h()}),a+1),e.addEventListener(u,f)}function G(e,t){const n=window.getComputedStyle(e),r=e=>(n[e]||"").split(", "),i=r(`${D}Delay`),o=r(`${D}Duration`),s=J(i,o),a=r(`${P}Delay`),c=r(`${P}Duration`),u=J(a,c);let l=null,h=0,f=0;t===D?s>0&&(l=D,h=s,f=o.length):t===P?u>0&&(l=P,h=u,f=c.length):(h=Math.max(s,u),l=h>0?s>u?D:P:null,f=l?l===D?o.length:c.length:0);const d=l===D&&/\b(transform|all)(,|$)/.test(r(`${D}Property`).toString());return{type:l,timeout:h,propCount:f,hasTransform:d}}function J(e,t){while(e.length<t.length)e=e.concat(e);return Math.max(...t.map(((t,n)=>Q(t)+Q(e[n]))))}function Q(e){return 1e3*Number(e.slice(0,-1).replace(",","."))}function X(){return document.body.offsetHeight}const Y=new WeakMap,Z=new WeakMap,ee={name:"TransitionGroup",props:(0,r.l7)({},j,{tag:String,moveClass:String}),setup(e,{slots:t}){const n=(0,i.FN)(),r=(0,i.Y8)();let s,a;return(0,i.ic)((()=>{if(!s.length)return;const t=e.moveClass||`${e.name||"v"}-move`;if(!ie(s[0].el,n.vnode.el,t))return;s.forEach(te),s.forEach(ne);const r=s.filter(re);X(),r.forEach((e=>{const n=e.el,r=n.style;B(n,t),r.transform=r.webkitTransform=r.transitionDuration="";const i=n._moveCb=e=>{e&&e.target!==n||e&&!/transform$/.test(e.propertyName)||(n.removeEventListener("transitionend",i),n._moveCb=null,H(n,t))};n.addEventListener("transitionend",i)}))})),()=>{const c=(0,o.IU)(e),u=V(c);let l=c.tag||i.HY;s=a,a=t.default?(0,i.Q6)(t.default()):[];for(let e=0;e<a.length;e++){const t=a[e];null!=t.key&&(0,i.nK)(t,(0,i.U2)(t,u,r,n))}if(s)for(let e=0;e<s.length;e++){const t=s[e];(0,i.nK)(t,(0,i.U2)(t,u,r,n)),Y.set(t,t.el.getBoundingClientRect())}return(0,i.Wm)(l,null,a)}}};ee.props;function te(e){const t=e.el;t._moveCb&&t._moveCb(),t._enterCb&&t._enterCb()}function ne(e){Z.set(e,e.el.getBoundingClientRect())}function re(e){const t=Y.get(e),n=Z.get(e),r=t.left-n.left,i=t.top-n.top;if(r||i){const t=e.el.style;return t.transform=t.webkitTransform=`translate(${r}px,${i}px)`,t.transitionDuration="0s",e}}function ie(e,t,n){const r=e.cloneNode();e._vtc&&e._vtc.forEach((e=>{e.split(/\s+/).forEach((e=>e&&r.classList.remove(e)))})),n.split(/\s+/).forEach((e=>e&&r.classList.add(e))),r.style.display="none";const i=1===t.nodeType?t:t.parentNode;i.appendChild(r);const{hasTransform:o}=G(r);return i.removeChild(r),o}const oe=e=>{const t=e.props["onUpdate:modelValue"]||!1;return(0,r.kJ)(t)?e=>(0,r.ir)(t,e):t};function se(e){e.target.composing=!0}function ae(e){const t=e.target;t.composing&&(t.composing=!1,t.dispatchEvent(new Event("input")))}const ce={created(e,{modifiers:{lazy:t,trim:n,number:i}},o){e._assign=oe(o);const s=i||o.props&&"number"===o.props.type;b(e,t?"change":"input",(t=>{if(t.target.composing)return;let i=e.value;n&&(i=i.trim()),s&&(i=(0,r.h5)(i)),e._assign(i)})),n&&b(e,"change",(()=>{e.value=e.value.trim()})),t||(b(e,"compositionstart",se),b(e,"compositionend",ae),b(e,"change",ae))},mounted(e,{value:t}){e.value=null==t?"":t},beforeUpdate(e,{value:t,modifiers:{lazy:n,trim:i,number:o}},s){if(e._assign=oe(s),e.composing)return;if(document.activeElement===e&&"range"!==e.type){if(n)return;if(i&&e.value.trim()===t)return;if((o||"number"===e.type)&&(0,r.h5)(e.value)===t)return}const a=null==t?"":t;e.value!==a&&(e.value=a)}},ue={deep:!0,created(e,t,n){e._assign=oe(n),b(e,"change",(()=>{const t=e._modelValue,n=de(e),i=e.checked,o=e._assign;if((0,r.kJ)(t)){const e=(0,r.hq)(t,n),s=-1!==e;if(i&&!s)o(t.concat(n));else if(!i&&s){const n=[...t];n.splice(e,1),o(n)}}else if((0,r.DM)(t)){const e=new Set(t);i?e.add(n):e.delete(n),o(e)}else o(pe(e,i))}))},mounted:le,beforeUpdate(e,t,n){e._assign=oe(n),le(e,t,n)}};function le(e,{value:t,oldValue:n},i){e._modelValue=t,(0,r.kJ)(t)?e.checked=(0,r.hq)(t,i.props.value)>-1:(0,r.DM)(t)?e.checked=t.has(i.props.value):t!==n&&(e.checked=(0,r.WV)(t,pe(e,!0)))}const he={deep:!0,created(e,{value:t,modifiers:{number:n}},i){const o=(0,r.DM)(t);b(e,"change",(()=>{const t=Array.prototype.filter.call(e.options,(e=>e.selected)).map((e=>n?(0,r.h5)(de(e)):de(e)));e._assign(e.multiple?o?new Set(t):t:t[0])})),e._assign=oe(i)},mounted(e,{value:t}){fe(e,t)},beforeUpdate(e,t,n){e._assign=oe(n)},updated(e,{value:t}){fe(e,t)}};function fe(e,t){const n=e.multiple;if(!n||(0,r.kJ)(t)||(0,r.DM)(t)){for(let i=0,o=e.options.length;i<o;i++){const o=e.options[i],s=de(o);if(n)(0,r.kJ)(t)?o.selected=(0,r.hq)(t,s)>-1:o.selected=t.has(s);else if((0,r.WV)(de(o),t))return void(e.selectedIndex!==i&&(e.selectedIndex=i))}n||-1===e.selectedIndex||(e.selectedIndex=-1)}}function de(e){return"_value"in e?e._value:e.value}function pe(e,t){const n=t?"_trueValue":"_falseValue";return n in e?e[n]:t}const ge=(0,r.l7)({patchProp:N},u);let me;function ye(){return me||(me=(0,i.Us)(ge))}const ve=(...e)=>{const t=ye().createApp(...e);const{mount:n}=t;return t.mount=e=>{const i=we(e);if(!i)return;const o=t._component;(0,r.mf)(o)||o.render||o.template||(o.template=i.innerHTML),i.innerHTML="";const s=n(i,!1,i instanceof SVGElement);return i instanceof Element&&(i.removeAttribute("v-cloak"),i.setAttribute("data-v-app","")),s},t};function we(e){if((0,r.HD)(e)){const t=document.querySelector(e);return t}return e}},7139:function(e,t,n){"use strict";n.d(t,{C_:function(){return h},DM:function(){return D},E9:function(){return se},F7:function(){return S},Gg:function(){return W},HD:function(){return j},He:function(){return ie},Kj:function(){return L},Kn:function(){return U},NO:function(){return T},Nj:function(){return ne},Od:function(){return C},PO:function(){return H},Pq:function(){return d},RI:function(){return O},S0:function(){return z},W7:function(){return B},WV:function(){return m},Z6:function(){return E},_A:function(){return J},_N:function(){return R},aU:function(){return ee},dG:function(){return _},e1:function(){return o},fY:function(){return r},h5:function(){return re},hR:function(){return Z},hq:function(){return y},ir:function(){return te},j5:function(){return s},kC:function(){return Y},kJ:function(){return N},kT:function(){return b},l7:function(){return A},mf:function(){return M},rs:function(){return X},tI:function(){return V},tR:function(){return k},yA:function(){return p},yk:function(){return F},zw:function(){return v}});n(7658);function r(e,t){const n=Object.create(null),r=e.split(",");for(let i=0;i<r.length;i++)n[r[i]]=!0;return t?e=>!!n[e.toLowerCase()]:e=>!!n[e]}const i="Infinity,undefined,NaN,isFinite,isNaN,parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,BigInt",o=r(i);function s(e){if(N(e)){const t={};for(let n=0;n<e.length;n++){const r=e[n],i=j(r)?l(r):s(r);if(i)for(const e in i)t[e]=i[e]}return t}return j(e)||U(e)?e:void 0}const a=/;(?![^(]*\))/g,c=/:([^]+)/,u=/\/\*.*?\*\//gs;function l(e){const t={};return e.replace(u,"").split(a).forEach((e=>{if(e){const n=e.split(c);n.length>1&&(t[n[0].trim()]=n[1].trim())}})),t}function h(e){let t="";if(j(e))t=e;else if(N(e))for(let n=0;n<e.length;n++){const r=h(e[n]);r&&(t+=r+" ")}else if(U(e))for(const n in e)e[n]&&(t+=n+" ");return t.trim()}const f="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",d=r(f);function p(e){return!!e||""===e}function g(e,t){if(e.length!==t.length)return!1;let n=!0;for(let r=0;n&&r<e.length;r++)n=m(e[r],t[r]);return n}function m(e,t){if(e===t)return!0;let n=P(e),r=P(t);if(n||r)return!(!n||!r)&&e.getTime()===t.getTime();if(n=F(e),r=F(t),n||r)return e===t;if(n=N(e),r=N(t),n||r)return!(!n||!r)&&g(e,t);if(n=U(e),r=U(t),n||r){if(!n||!r)return!1;const i=Object.keys(e).length,o=Object.keys(t).length;if(i!==o)return!1;for(const n in e){const r=e.hasOwnProperty(n),i=t.hasOwnProperty(n);if(r&&!i||!r&&i||!m(e[n],t[n]))return!1}}return String(e)===String(t)}function y(e,t){return e.findIndex((e=>m(e,t)))}const v=e=>j(e)?e:null==e?"":N(e)||U(e)&&(e.toString===q||!M(e.toString))?JSON.stringify(e,w,2):String(e),w=(e,t)=>t&&t.__v_isRef?w(e,t.value):R(t)?{[`Map(${t.size})`]:[...t.entries()].reduce(((e,[t,n])=>(e[`${t} =>`]=n,e)),{})}:D(t)?{[`Set(${t.size})`]:[...t.values()]}:!U(t)||N(t)||H(t)?t:String(t),b={},E=[],_=()=>{},T=()=>!1,I=/^on[^a-z]/,S=e=>I.test(e),k=e=>e.startsWith("onUpdate:"),A=Object.assign,C=(e,t)=>{const n=e.indexOf(t);n>-1&&e.splice(n,1)},x=Object.prototype.hasOwnProperty,O=(e,t)=>x.call(e,t),N=Array.isArray,R=e=>"[object Map]"===$(e),D=e=>"[object Set]"===$(e),P=e=>"[object Date]"===$(e),L=e=>"[object RegExp]"===$(e),M=e=>"function"===typeof e,j=e=>"string"===typeof e,F=e=>"symbol"===typeof e,U=e=>null!==e&&"object"===typeof e,V=e=>U(e)&&M(e.then)&&M(e.catch),q=Object.prototype.toString,$=e=>q.call(e),B=e=>$(e).slice(8,-1),H=e=>"[object Object]"===$(e),z=e=>j(e)&&"NaN"!==e&&"-"!==e[0]&&""+parseInt(e,10)===e,W=r(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),K=e=>{const t=Object.create(null);return n=>{const r=t[n];return r||(t[n]=e(n))}},G=/-(\w)/g,J=K((e=>e.replace(G,((e,t)=>t?t.toUpperCase():"")))),Q=/\B([A-Z])/g,X=K((e=>e.replace(Q,"-$1").toLowerCase())),Y=K((e=>e.charAt(0).toUpperCase()+e.slice(1))),Z=K((e=>e?`on${Y(e)}`:"")),ee=(e,t)=>!Object.is(e,t),te=(e,t)=>{for(let n=0;n<e.length;n++)e[n](t)},ne=(e,t,n)=>{Object.defineProperty(e,t,{configurable:!0,enumerable:!1,value:n})},re=e=>{const t=parseFloat(e);return isNaN(t)?e:t},ie=e=>{const t=j(e)?Number(e):NaN;return isNaN(t)?e:t};let oe;const se=()=>oe||(oe="undefined"!==typeof globalThis?globalThis:"undefined"!==typeof self?self:"undefined"!==typeof window?window:"undefined"!==typeof n.g?n.g:{})},5477:function(e,t,n){"use strict";var r=n(8692),i=n(1542),o=i(r("String.prototype.indexOf"));e.exports=function(e,t){var n=r(e,!!t);return"function"===typeof n&&o(e,".prototype.")>-1?i(n):n}},1542:function(e,t,n){"use strict";var r=n(9148),i=n(8692),o=i("%Function.prototype.apply%"),s=i("%Function.prototype.call%"),a=i("%Reflect.apply%",!0)||r.call(s,o),c=i("%Object.getOwnPropertyDescriptor%",!0),u=i("%Object.defineProperty%",!0),l=i("%Math.max%");if(u)try{u({},"a",{value:1})}catch(f){u=null}e.exports=function(e){var t=a(r,s,arguments);if(c&&u){var n=c(t,"length");n.configurable&&u(t,"length",{value:1+l(0,e.length-(arguments.length-1))})}return t};var h=function(){return a(r,o,arguments)};u?u(e.exports,"apply",{value:h}):e.exports.apply=h},5847:function(e,t,n){"use strict";n(7658);var r="Function.prototype.bind called on incompatible ",i=Array.prototype.slice,o=Object.prototype.toString,s="[object Function]";e.exports=function(e){var t=this;if("function"!==typeof t||o.call(t)!==s)throw new TypeError(r+t);for(var n,a=i.call(arguments,1),c=function(){if(this instanceof n){var r=t.apply(this,a.concat(i.call(arguments)));return Object(r)===r?r:this}return t.apply(e,a.concat(i.call(arguments)))},u=Math.max(0,t.length-a.length),l=[],h=0;h<u;h++)l.push("$"+h);if(n=Function("binder","return function ("+l.join(",")+"){ return binder.apply(this,arguments); }")(c),t.prototype){var f=function(){};f.prototype=t.prototype,n.prototype=new f,f.prototype=null}return n}},9148:function(e,t,n){"use strict";var r=n(5847);e.exports=Function.prototype.bind||r},8692:function(e,t,n){"use strict";var r;n(3767),n(8585),n(8696);var i=SyntaxError,o=Function,s=TypeError,a=function(e){try{return o('"use strict"; return ('+e+").constructor;")()}catch(t){}},c=Object.getOwnPropertyDescriptor;if(c)try{c({},"")}catch(O){c=null}var u=function(){throw new s},l=c?function(){try{return u}catch(e){try{return c(arguments,"callee").get}catch(t){return u}}}():u,h=n(2763)(),f=Object.getPrototypeOf||function(e){return e.__proto__},d={},p="undefined"===typeof Uint8Array?r:f(Uint8Array),g={"%AggregateError%":"undefined"===typeof AggregateError?r:AggregateError,"%Array%":Array,"%ArrayBuffer%":"undefined"===typeof ArrayBuffer?r:ArrayBuffer,"%ArrayIteratorPrototype%":h?f([][Symbol.iterator]()):r,"%AsyncFromSyncIteratorPrototype%":r,"%AsyncFunction%":d,"%AsyncGenerator%":d,"%AsyncGeneratorFunction%":d,"%AsyncIteratorPrototype%":d,"%Atomics%":"undefined"===typeof Atomics?r:Atomics,"%BigInt%":"undefined"===typeof BigInt?r:BigInt,"%BigInt64Array%":"undefined"===typeof BigInt64Array?r:BigInt64Array,"%BigUint64Array%":"undefined"===typeof BigUint64Array?r:BigUint64Array,"%Boolean%":Boolean,"%DataView%":"undefined"===typeof DataView?r:DataView,"%Date%":Date,"%decodeURI%":decodeURI,"%decodeURIComponent%":decodeURIComponent,"%encodeURI%":encodeURI,"%encodeURIComponent%":encodeURIComponent,"%Error%":Error,"%eval%":eval,"%EvalError%":EvalError,"%Float32Array%":"undefined"===typeof Float32Array?r:Float32Array,"%Float64Array%":"undefined"===typeof Float64Array?r:Float64Array,"%FinalizationRegistry%":"undefined"===typeof FinalizationRegistry?r:FinalizationRegistry,"%Function%":o,"%GeneratorFunction%":d,"%Int8Array%":"undefined"===typeof Int8Array?r:Int8Array,"%Int16Array%":"undefined"===typeof Int16Array?r:Int16Array,"%Int32Array%":"undefined"===typeof Int32Array?r:Int32Array,"%isFinite%":isFinite,"%isNaN%":isNaN,"%IteratorPrototype%":h?f(f([][Symbol.iterator]())):r,"%JSON%":"object"===typeof JSON?JSON:r,"%Map%":"undefined"===typeof Map?r:Map,"%MapIteratorPrototype%":"undefined"!==typeof Map&&h?f((new Map)[Symbol.iterator]()):r,"%Math%":Math,"%Number%":Number,"%Object%":Object,"%parseFloat%":parseFloat,"%parseInt%":parseInt,"%Promise%":"undefined"===typeof Promise?r:Promise,"%Proxy%":"undefined"===typeof Proxy?r:Proxy,"%RangeError%":RangeError,"%ReferenceError%":ReferenceError,"%Reflect%":"undefined"===typeof Reflect?r:Reflect,"%RegExp%":RegExp,"%Set%":"undefined"===typeof Set?r:Set,"%SetIteratorPrototype%":"undefined"!==typeof Set&&h?f((new Set)[Symbol.iterator]()):r,"%SharedArrayBuffer%":"undefined"===typeof SharedArrayBuffer?r:SharedArrayBuffer,"%String%":String,"%StringIteratorPrototype%":h?f(""[Symbol.iterator]()):r,"%Symbol%":h?Symbol:r,"%SyntaxError%":i,"%ThrowTypeError%":l,"%TypedArray%":p,"%TypeError%":s,"%Uint8Array%":"undefined"===typeof Uint8Array?r:Uint8Array,"%Uint8ClampedArray%":"undefined"===typeof Uint8ClampedArray?r:Uint8ClampedArray,"%Uint16Array%":"undefined"===typeof Uint16Array?r:Uint16Array,"%Uint32Array%":"undefined"===typeof Uint32Array?r:Uint32Array,"%URIError%":URIError,"%WeakMap%":"undefined"===typeof WeakMap?r:WeakMap,"%WeakRef%":"undefined"===typeof WeakRef?r:WeakRef,"%WeakSet%":"undefined"===typeof WeakSet?r:WeakSet};try{null.error}catch(O){var m=f(f(O));g["%Error.prototype%"]=m}var y=function e(t){var n;if("%AsyncFunction%"===t)n=a("async function () {}");else if("%GeneratorFunction%"===t)n=a("function* () {}");else if("%AsyncGeneratorFunction%"===t)n=a("async function* () {}");else if("%AsyncGenerator%"===t){var r=e("%AsyncGeneratorFunction%");r&&(n=r.prototype)}else if("%AsyncIteratorPrototype%"===t){var i=e("%AsyncGenerator%");i&&(n=f(i.prototype))}return g[t]=n,n},v={"%ArrayBufferPrototype%":["ArrayBuffer","prototype"],"%ArrayPrototype%":["Array","prototype"],"%ArrayProto_entries%":["Array","prototype","entries"],"%ArrayProto_forEach%":["Array","prototype","forEach"],"%ArrayProto_keys%":["Array","prototype","keys"],"%ArrayProto_values%":["Array","prototype","values"],"%AsyncFunctionPrototype%":["AsyncFunction","prototype"],"%AsyncGenerator%":["AsyncGeneratorFunction","prototype"],"%AsyncGeneratorPrototype%":["AsyncGeneratorFunction","prototype","prototype"],"%BooleanPrototype%":["Boolean","prototype"],"%DataViewPrototype%":["DataView","prototype"],"%DatePrototype%":["Date","prototype"],"%ErrorPrototype%":["Error","prototype"],"%EvalErrorPrototype%":["EvalError","prototype"],"%Float32ArrayPrototype%":["Float32Array","prototype"],"%Float64ArrayPrototype%":["Float64Array","prototype"],"%FunctionPrototype%":["Function","prototype"],"%Generator%":["GeneratorFunction","prototype"],"%GeneratorPrototype%":["GeneratorFunction","prototype","prototype"],"%Int8ArrayPrototype%":["Int8Array","prototype"],"%Int16ArrayPrototype%":["Int16Array","prototype"],"%Int32ArrayPrototype%":["Int32Array","prototype"],"%JSONParse%":["JSON","parse"],"%JSONStringify%":["JSON","stringify"],"%MapPrototype%":["Map","prototype"],"%NumberPrototype%":["Number","prototype"],"%ObjectPrototype%":["Object","prototype"],"%ObjProto_toString%":["Object","prototype","toString"],"%ObjProto_valueOf%":["Object","prototype","valueOf"],"%PromisePrototype%":["Promise","prototype"],"%PromiseProto_then%":["Promise","prototype","then"],"%Promise_all%":["Promise","all"],"%Promise_reject%":["Promise","reject"],"%Promise_resolve%":["Promise","resolve"],"%RangeErrorPrototype%":["RangeError","prototype"],"%ReferenceErrorPrototype%":["ReferenceError","prototype"],"%RegExpPrototype%":["RegExp","prototype"],"%SetPrototype%":["Set","prototype"],"%SharedArrayBufferPrototype%":["SharedArrayBuffer","prototype"],"%StringPrototype%":["String","prototype"],"%SymbolPrototype%":["Symbol","prototype"],"%SyntaxErrorPrototype%":["SyntaxError","prototype"],"%TypedArrayPrototype%":["TypedArray","prototype"],"%TypeErrorPrototype%":["TypeError","prototype"],"%Uint8ArrayPrototype%":["Uint8Array","prototype"],"%Uint8ClampedArrayPrototype%":["Uint8ClampedArray","prototype"],"%Uint16ArrayPrototype%":["Uint16Array","prototype"],"%Uint32ArrayPrototype%":["Uint32Array","prototype"],"%URIErrorPrototype%":["URIError","prototype"],"%WeakMapPrototype%":["WeakMap","prototype"],"%WeakSetPrototype%":["WeakSet","prototype"]},w=n(9148),b=n(5769),E=w.call(Function.call,Array.prototype.concat),_=w.call(Function.apply,Array.prototype.splice),T=w.call(Function.call,String.prototype.replace),I=w.call(Function.call,String.prototype.slice),S=w.call(Function.call,RegExp.prototype.exec),k=/[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g,A=/\\(\\)?/g,C=function(e){var t=I(e,0,1),n=I(e,-1);if("%"===t&&"%"!==n)throw new i("invalid intrinsic syntax, expected closing `%`");if("%"===n&&"%"!==t)throw new i("invalid intrinsic syntax, expected opening `%`");var r=[];return T(e,k,(function(e,t,n,i){r[r.length]=n?T(i,A,"$1"):t||e})),r},x=function(e,t){var n,r=e;if(b(v,r)&&(n=v[r],r="%"+n[0]+"%"),b(g,r)){var o=g[r];if(o===d&&(o=y(r)),"undefined"===typeof o&&!t)throw new s("intrinsic "+e+" exists, but is not available. Please file an issue!");return{alias:n,name:r,value:o}}throw new i("intrinsic "+e+" does not exist!")};e.exports=function(e,t){if("string"!==typeof e||0===e.length)throw new s("intrinsic name must be a non-empty string");if(arguments.length>1&&"boolean"!==typeof t)throw new s('"allowMissing" argument must be a boolean');if(null===S(/^%?[^%]*%?$/,e))throw new i("`%` may not be present anywhere but at the beginning and end of the intrinsic name");var n=C(e),r=n.length>0?n[0]:"",o=x("%"+r+"%",t),a=o.name,u=o.value,l=!1,h=o.alias;h&&(r=h[0],_(n,E([0,1],h)));for(var f=1,d=!0;f<n.length;f+=1){var p=n[f],m=I(p,0,1),y=I(p,-1);if(('"'===m||"'"===m||"`"===m||'"'===y||"'"===y||"`"===y)&&m!==y)throw new i("property names with quotes must have matching quotes");if("constructor"!==p&&d||(l=!0),r+="."+p,a="%"+r+"%",b(g,a))u=g[a];else if(null!=u){if(!(p in u)){if(!t)throw new s("base intrinsic for "+e+" exists, but the property is not available.");return}if(c&&f+1>=n.length){var v=c(u,p);d=!!v,u=d&&"get"in v&&!("originalValue"in v.get)?v.get:u[p]}else d=b(u,p),u=u[p];d&&!l&&(g[a]=u)}}return u}},2763:function(e,t,n){"use strict";var r="undefined"!==typeof Symbol&&Symbol,i=n(3994);e.exports=function(){return"function"===typeof r&&("function"===typeof Symbol&&("symbol"===typeof r("foo")&&("symbol"===typeof Symbol("bar")&&i())))}},3994:function(e){"use strict";e.exports=function(){if("function"!==typeof Symbol||"function"!==typeof Object.getOwnPropertySymbols)return!1;if("symbol"===typeof Symbol.iterator)return!0;var e={},t=Symbol("test"),n=Object(t);if("string"===typeof t)return!1;if("[object Symbol]"!==Object.prototype.toString.call(t))return!1;if("[object Symbol]"!==Object.prototype.toString.call(n))return!1;var r=42;for(t in e[t]=r,e)return!1;if("function"===typeof Object.keys&&0!==Object.keys(e).length)return!1;if("function"===typeof Object.getOwnPropertyNames&&0!==Object.getOwnPropertyNames(e).length)return!1;var i=Object.getOwnPropertySymbols(e);if(1!==i.length||i[0]!==t)return!1;if(!Object.prototype.propertyIsEnumerable.call(e,t))return!1;if("function"===typeof Object.getOwnPropertyDescriptor){var o=Object.getOwnPropertyDescriptor(e,t);if(o.value!==r||!0!==o.enumerable)return!1}return!0}},5769:function(e,t,n){"use strict";var r=n(9148);e.exports=r.call(Function.call,Object.prototype.hasOwnProperty)},7387:function(e,t,n){var r,i;n(7658),n(541),
/*!
 * jQuery JavaScript Library v3.6.4
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2023-03-08T15:28Z
 */
function(t,n){"use strict";"object"===typeof e.exports?e.exports=t.document?n(t,!0):function(e){if(!e.document)throw new Error("jQuery requires a window with a document");return n(e)}:n(t)}("undefined"!==typeof window?window:this,(function(n,o){"use strict";var s=[],a=Object.getPrototypeOf,c=s.slice,u=s.flat?function(e){return s.flat.call(e)}:function(e){return s.concat.apply([],e)},l=s.push,h=s.indexOf,f={},d=f.toString,p=f.hasOwnProperty,g=p.toString,m=g.call(Object),y={},v=function(e){return"function"===typeof e&&"number"!==typeof e.nodeType&&"function"!==typeof e.item},w=function(e){return null!=e&&e===e.window},b=n.document,E={type:!0,src:!0,nonce:!0,noModule:!0};function _(e,t,n){n=n||b;var r,i,o=n.createElement("script");if(o.text=e,t)for(r in E)i=t[r]||t.getAttribute&&t.getAttribute(r),i&&o.setAttribute(r,i);n.head.appendChild(o).parentNode.removeChild(o)}function T(e){return null==e?e+"":"object"===typeof e||"function"===typeof e?f[d.call(e)]||"object":typeof e}var I="3.6.4",S=function(e,t){return new S.fn.init(e,t)};function k(e){var t=!!e&&"length"in e&&e.length,n=T(e);return!v(e)&&!w(e)&&("array"===n||0===t||"number"===typeof t&&t>0&&t-1 in e)}S.fn=S.prototype={jquery:I,constructor:S,length:0,toArray:function(){return c.call(this)},get:function(e){return null==e?c.call(this):e<0?this[e+this.length]:this[e]},pushStack:function(e){var t=S.merge(this.constructor(),e);return t.prevObject=this,t},each:function(e){return S.each(this,e)},map:function(e){return this.pushStack(S.map(this,(function(t,n){return e.call(t,n,t)})))},slice:function(){return this.pushStack(c.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},even:function(){return this.pushStack(S.grep(this,(function(e,t){return(t+1)%2})))},odd:function(){return this.pushStack(S.grep(this,(function(e,t){return t%2})))},eq:function(e){var t=this.length,n=+e+(e<0?t:0);return this.pushStack(n>=0&&n<t?[this[n]]:[])},end:function(){return this.prevObject||this.constructor()},push:l,sort:s.sort,splice:s.splice},S.extend=S.fn.extend=function(){var e,t,n,r,i,o,s=arguments[0]||{},a=1,c=arguments.length,u=!1;for("boolean"===typeof s&&(u=s,s=arguments[a]||{},a++),"object"===typeof s||v(s)||(s={}),a===c&&(s=this,a--);a<c;a++)if(null!=(e=arguments[a]))for(t in e)r=e[t],"__proto__"!==t&&s!==r&&(u&&r&&(S.isPlainObject(r)||(i=Array.isArray(r)))?(n=s[t],o=i&&!Array.isArray(n)?[]:i||S.isPlainObject(n)?n:{},i=!1,s[t]=S.extend(u,o,r)):void 0!==r&&(s[t]=r));return s},S.extend({expando:"jQuery"+(I+Math.random()).replace(/\D/g,""),isReady:!0,error:function(e){throw new Error(e)},noop:function(){},isPlainObject:function(e){var t,n;return!(!e||"[object Object]"!==d.call(e))&&(t=a(e),!t||(n=p.call(t,"constructor")&&t.constructor,"function"===typeof n&&g.call(n)===m))},isEmptyObject:function(e){var t;for(t in e)return!1;return!0},globalEval:function(e,t,n){_(e,{nonce:t&&t.nonce},n)},each:function(e,t){var n,r=0;if(k(e)){for(n=e.length;r<n;r++)if(!1===t.call(e[r],r,e[r]))break}else for(r in e)if(!1===t.call(e[r],r,e[r]))break;return e},makeArray:function(e,t){var n=t||[];return null!=e&&(k(Object(e))?S.merge(n,"string"===typeof e?[e]:e):l.call(n,e)),n},inArray:function(e,t,n){return null==t?-1:h.call(t,e,n)},merge:function(e,t){for(var n=+t.length,r=0,i=e.length;r<n;r++)e[i++]=t[r];return e.length=i,e},grep:function(e,t,n){for(var r,i=[],o=0,s=e.length,a=!n;o<s;o++)r=!t(e[o],o),r!==a&&i.push(e[o]);return i},map:function(e,t,n){var r,i,o=0,s=[];if(k(e))for(r=e.length;o<r;o++)i=t(e[o],o,n),null!=i&&s.push(i);else for(o in e)i=t(e[o],o,n),null!=i&&s.push(i);return u(s)},guid:1,support:y}),"function"===typeof Symbol&&(S.fn[Symbol.iterator]=s[Symbol.iterator]),S.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),(function(e,t){f["[object "+t+"]"]=t.toLowerCase()}));var A=
/*!
   * Sizzle CSS Selector Engine v2.3.10
   * https://sizzlejs.com/
   *
   * Copyright JS Foundation and other contributors
   * Released under the MIT license
   * https://js.foundation/
   *
   * Date: 2023-02-14
   */
function(e){var t,n,r,i,o,s,a,c,u,l,h,f,d,p,g,m,y,v,w,b="sizzle"+1*new Date,E=e.document,_=0,T=0,I=ce(),S=ce(),k=ce(),A=ce(),C=function(e,t){return e===t&&(h=!0),0},x={}.hasOwnProperty,O=[],N=O.pop,R=O.push,D=O.push,P=O.slice,L=function(e,t){for(var n=0,r=e.length;n<r;n++)if(e[n]===t)return n;return-1},M="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",j="[\\x20\\t\\r\\n\\f]",F="(?:\\\\[\\da-fA-F]{1,6}"+j+"?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+",U="\\["+j+"*("+F+")(?:"+j+"*([*^$|!~]?=)"+j+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+F+"))|)"+j+"*\\]",V=":("+F+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+U+")*)|.*)\\)|)",q=new RegExp(j+"+","g"),$=new RegExp("^"+j+"+|((?:^|[^\\\\])(?:\\\\.)*)"+j+"+$","g"),B=new RegExp("^"+j+"*,"+j+"*"),H=new RegExp("^"+j+"*([>+~]|"+j+")"+j+"*"),z=new RegExp(j+"|>"),W=new RegExp(V),K=new RegExp("^"+F+"$"),G={ID:new RegExp("^#("+F+")"),CLASS:new RegExp("^\\.("+F+")"),TAG:new RegExp("^("+F+"|[*])"),ATTR:new RegExp("^"+U),PSEUDO:new RegExp("^"+V),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+j+"*(even|odd|(([+-]|)(\\d*)n|)"+j+"*(?:([+-]|)"+j+"*(\\d+)|))"+j+"*\\)|)","i"),bool:new RegExp("^(?:"+M+")$","i"),needsContext:new RegExp("^"+j+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+j+"*((?:-\\d)?\\d*)"+j+"*\\)|)(?=[^-]|$)","i")},J=/HTML$/i,Q=/^(?:input|select|textarea|button)$/i,X=/^h\d$/i,Y=/^[^{]+\{\s*\[native \w/,Z=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,ee=/[+~]/,te=new RegExp("\\\\[\\da-fA-F]{1,6}"+j+"?|\\\\([^\\r\\n\\f])","g"),ne=function(e,t){var n="0x"+e.slice(1)-65536;return t||(n<0?String.fromCharCode(n+65536):String.fromCharCode(n>>10|55296,1023&n|56320))},re=/([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,ie=function(e,t){return t?"\0"===e?"�":e.slice(0,-1)+"\\"+e.charCodeAt(e.length-1).toString(16)+" ":"\\"+e},oe=function(){f()},se=be((function(e){return!0===e.disabled&&"fieldset"===e.nodeName.toLowerCase()}),{dir:"parentNode",next:"legend"});try{D.apply(O=P.call(E.childNodes),E.childNodes),O[E.childNodes.length].nodeType}catch(Ae){D={apply:O.length?function(e,t){R.apply(e,P.call(t))}:function(e,t){var n=e.length,r=0;while(e[n++]=t[r++]);e.length=n-1}}}function ae(e,t,r,i){var o,a,u,l,h,p,y,v=t&&t.ownerDocument,E=t?t.nodeType:9;if(r=r||[],"string"!==typeof e||!e||1!==E&&9!==E&&11!==E)return r;if(!i&&(f(t),t=t||d,g)){if(11!==E&&(h=Z.exec(e)))if(o=h[1]){if(9===E){if(!(u=t.getElementById(o)))return r;if(u.id===o)return r.push(u),r}else if(v&&(u=v.getElementById(o))&&w(t,u)&&u.id===o)return r.push(u),r}else{if(h[2])return D.apply(r,t.getElementsByTagName(e)),r;if((o=h[3])&&n.getElementsByClassName&&t.getElementsByClassName)return D.apply(r,t.getElementsByClassName(o)),r}if(n.qsa&&!A[e+" "]&&(!m||!m.test(e))&&(1!==E||"object"!==t.nodeName.toLowerCase())){if(y=e,v=t,1===E&&(z.test(e)||H.test(e))){v=ee.test(e)&&ye(t.parentNode)||t,v===t&&n.scope||((l=t.getAttribute("id"))?l=l.replace(re,ie):t.setAttribute("id",l=b)),p=s(e),a=p.length;while(a--)p[a]=(l?"#"+l:":scope")+" "+we(p[a]);y=p.join(",")}try{return D.apply(r,v.querySelectorAll(y)),r}catch(_){A(e,!0)}finally{l===b&&t.removeAttribute("id")}}}return c(e.replace($,"$1"),t,r,i)}function ce(){var e=[];function t(n,i){return e.push(n+" ")>r.cacheLength&&delete t[e.shift()],t[n+" "]=i}return t}function ue(e){return e[b]=!0,e}function le(e){var t=d.createElement("fieldset");try{return!!e(t)}catch(Ae){return!1}finally{t.parentNode&&t.parentNode.removeChild(t),t=null}}function he(e,t){var n=e.split("|"),i=n.length;while(i--)r.attrHandle[n[i]]=t}function fe(e,t){var n=t&&e,r=n&&1===e.nodeType&&1===t.nodeType&&e.sourceIndex-t.sourceIndex;if(r)return r;if(n)while(n=n.nextSibling)if(n===t)return-1;return e?1:-1}function de(e){return function(t){var n=t.nodeName.toLowerCase();return"input"===n&&t.type===e}}function pe(e){return function(t){var n=t.nodeName.toLowerCase();return("input"===n||"button"===n)&&t.type===e}}function ge(e){return function(t){return"form"in t?t.parentNode&&!1===t.disabled?"label"in t?"label"in t.parentNode?t.parentNode.disabled===e:t.disabled===e:t.isDisabled===e||t.isDisabled!==!e&&se(t)===e:t.disabled===e:"label"in t&&t.disabled===e}}function me(e){return ue((function(t){return t=+t,ue((function(n,r){var i,o=e([],n.length,t),s=o.length;while(s--)n[i=o[s]]&&(n[i]=!(r[i]=n[i]))}))}))}function ye(e){return e&&"undefined"!==typeof e.getElementsByTagName&&e}for(t in n=ae.support={},o=ae.isXML=function(e){var t=e&&e.namespaceURI,n=e&&(e.ownerDocument||e).documentElement;return!J.test(t||n&&n.nodeName||"HTML")},f=ae.setDocument=function(e){var t,i,s=e?e.ownerDocument||e:E;return s!=d&&9===s.nodeType&&s.documentElement?(d=s,p=d.documentElement,g=!o(d),E!=d&&(i=d.defaultView)&&i.top!==i&&(i.addEventListener?i.addEventListener("unload",oe,!1):i.attachEvent&&i.attachEvent("onunload",oe)),n.scope=le((function(e){return p.appendChild(e).appendChild(d.createElement("div")),"undefined"!==typeof e.querySelectorAll&&!e.querySelectorAll(":scope fieldset div").length})),n.cssHas=le((function(){try{return d.querySelector(":has(*,:jqfake)"),!1}catch(Ae){return!0}})),n.attributes=le((function(e){return e.className="i",!e.getAttribute("className")})),n.getElementsByTagName=le((function(e){return e.appendChild(d.createComment("")),!e.getElementsByTagName("*").length})),n.getElementsByClassName=Y.test(d.getElementsByClassName),n.getById=le((function(e){return p.appendChild(e).id=b,!d.getElementsByName||!d.getElementsByName(b).length})),n.getById?(r.filter["ID"]=function(e){var t=e.replace(te,ne);return function(e){return e.getAttribute("id")===t}},r.find["ID"]=function(e,t){if("undefined"!==typeof t.getElementById&&g){var n=t.getElementById(e);return n?[n]:[]}}):(r.filter["ID"]=function(e){var t=e.replace(te,ne);return function(e){var n="undefined"!==typeof e.getAttributeNode&&e.getAttributeNode("id");return n&&n.value===t}},r.find["ID"]=function(e,t){if("undefined"!==typeof t.getElementById&&g){var n,r,i,o=t.getElementById(e);if(o){if(n=o.getAttributeNode("id"),n&&n.value===e)return[o];i=t.getElementsByName(e),r=0;while(o=i[r++])if(n=o.getAttributeNode("id"),n&&n.value===e)return[o]}return[]}}),r.find["TAG"]=n.getElementsByTagName?function(e,t){return"undefined"!==typeof t.getElementsByTagName?t.getElementsByTagName(e):n.qsa?t.querySelectorAll(e):void 0}:function(e,t){var n,r=[],i=0,o=t.getElementsByTagName(e);if("*"===e){while(n=o[i++])1===n.nodeType&&r.push(n);return r}return o},r.find["CLASS"]=n.getElementsByClassName&&function(e,t){if("undefined"!==typeof t.getElementsByClassName&&g)return t.getElementsByClassName(e)},y=[],m=[],(n.qsa=Y.test(d.querySelectorAll))&&(le((function(e){var t;p.appendChild(e).innerHTML="<a id='"+b+"'></a><select id='"+b+"-\r\\' msallowcapture=''><option selected=''></option></select>",e.querySelectorAll("[msallowcapture^='']").length&&m.push("[*^$]="+j+"*(?:''|\"\")"),e.querySelectorAll("[selected]").length||m.push("\\["+j+"*(?:value|"+M+")"),e.querySelectorAll("[id~="+b+"-]").length||m.push("~="),t=d.createElement("input"),t.setAttribute("name",""),e.appendChild(t),e.querySelectorAll("[name='']").length||m.push("\\["+j+"*name"+j+"*="+j+"*(?:''|\"\")"),e.querySelectorAll(":checked").length||m.push(":checked"),e.querySelectorAll("a#"+b+"+*").length||m.push(".#.+[+~]"),e.querySelectorAll("\\\f"),m.push("[\\r\\n\\f]")})),le((function(e){e.innerHTML="<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";var t=d.createElement("input");t.setAttribute("type","hidden"),e.appendChild(t).setAttribute("name","D"),e.querySelectorAll("[name=d]").length&&m.push("name"+j+"*[*^$|!~]?="),2!==e.querySelectorAll(":enabled").length&&m.push(":enabled",":disabled"),p.appendChild(e).disabled=!0,2!==e.querySelectorAll(":disabled").length&&m.push(":enabled",":disabled"),e.querySelectorAll("*,:x"),m.push(",.*:")}))),(n.matchesSelector=Y.test(v=p.matches||p.webkitMatchesSelector||p.mozMatchesSelector||p.oMatchesSelector||p.msMatchesSelector))&&le((function(e){n.disconnectedMatch=v.call(e,"*"),v.call(e,"[s!='']:x"),y.push("!=",V)})),n.cssHas||m.push(":has"),m=m.length&&new RegExp(m.join("|")),y=y.length&&new RegExp(y.join("|")),t=Y.test(p.compareDocumentPosition),w=t||Y.test(p.contains)?function(e,t){var n=9===e.nodeType&&e.documentElement||e,r=t&&t.parentNode;return e===r||!(!r||1!==r.nodeType||!(n.contains?n.contains(r):e.compareDocumentPosition&&16&e.compareDocumentPosition(r)))}:function(e,t){if(t)while(t=t.parentNode)if(t===e)return!0;return!1},C=t?function(e,t){if(e===t)return h=!0,0;var r=!e.compareDocumentPosition-!t.compareDocumentPosition;return r||(r=(e.ownerDocument||e)==(t.ownerDocument||t)?e.compareDocumentPosition(t):1,1&r||!n.sortDetached&&t.compareDocumentPosition(e)===r?e==d||e.ownerDocument==E&&w(E,e)?-1:t==d||t.ownerDocument==E&&w(E,t)?1:l?L(l,e)-L(l,t):0:4&r?-1:1)}:function(e,t){if(e===t)return h=!0,0;var n,r=0,i=e.parentNode,o=t.parentNode,s=[e],a=[t];if(!i||!o)return e==d?-1:t==d?1:i?-1:o?1:l?L(l,e)-L(l,t):0;if(i===o)return fe(e,t);n=e;while(n=n.parentNode)s.unshift(n);n=t;while(n=n.parentNode)a.unshift(n);while(s[r]===a[r])r++;return r?fe(s[r],a[r]):s[r]==E?-1:a[r]==E?1:0},d):d},ae.matches=function(e,t){return ae(e,null,null,t)},ae.matchesSelector=function(e,t){if(f(e),n.matchesSelector&&g&&!A[t+" "]&&(!y||!y.test(t))&&(!m||!m.test(t)))try{var r=v.call(e,t);if(r||n.disconnectedMatch||e.document&&11!==e.document.nodeType)return r}catch(Ae){A(t,!0)}return ae(t,d,null,[e]).length>0},ae.contains=function(e,t){return(e.ownerDocument||e)!=d&&f(e),w(e,t)},ae.attr=function(e,t){(e.ownerDocument||e)!=d&&f(e);var i=r.attrHandle[t.toLowerCase()],o=i&&x.call(r.attrHandle,t.toLowerCase())?i(e,t,!g):void 0;return void 0!==o?o:n.attributes||!g?e.getAttribute(t):(o=e.getAttributeNode(t))&&o.specified?o.value:null},ae.escape=function(e){return(e+"").replace(re,ie)},ae.error=function(e){throw new Error("Syntax error, unrecognized expression: "+e)},ae.uniqueSort=function(e){var t,r=[],i=0,o=0;if(h=!n.detectDuplicates,l=!n.sortStable&&e.slice(0),e.sort(C),h){while(t=e[o++])t===e[o]&&(i=r.push(o));while(i--)e.splice(r[i],1)}return l=null,e},i=ae.getText=function(e){var t,n="",r=0,o=e.nodeType;if(o){if(1===o||9===o||11===o){if("string"===typeof e.textContent)return e.textContent;for(e=e.firstChild;e;e=e.nextSibling)n+=i(e)}else if(3===o||4===o)return e.nodeValue}else while(t=e[r++])n+=i(t);return n},r=ae.selectors={cacheLength:50,createPseudo:ue,match:G,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){return e[1]=e[1].replace(te,ne),e[3]=(e[3]||e[4]||e[5]||"").replace(te,ne),"~="===e[2]&&(e[3]=" "+e[3]+" "),e.slice(0,4)},CHILD:function(e){return e[1]=e[1].toLowerCase(),"nth"===e[1].slice(0,3)?(e[3]||ae.error(e[0]),e[4]=+(e[4]?e[5]+(e[6]||1):2*("even"===e[3]||"odd"===e[3])),e[5]=+(e[7]+e[8]||"odd"===e[3])):e[3]&&ae.error(e[0]),e},PSEUDO:function(e){var t,n=!e[6]&&e[2];return G["CHILD"].test(e[0])?null:(e[3]?e[2]=e[4]||e[5]||"":n&&W.test(n)&&(t=s(n,!0))&&(t=n.indexOf(")",n.length-t)-n.length)&&(e[0]=e[0].slice(0,t),e[2]=n.slice(0,t)),e.slice(0,3))}},filter:{TAG:function(e){var t=e.replace(te,ne).toLowerCase();return"*"===e?function(){return!0}:function(e){return e.nodeName&&e.nodeName.toLowerCase()===t}},CLASS:function(e){var t=I[e+" "];return t||(t=new RegExp("(^|"+j+")"+e+"("+j+"|$)"))&&I(e,(function(e){return t.test("string"===typeof e.className&&e.className||"undefined"!==typeof e.getAttribute&&e.getAttribute("class")||"")}))},ATTR:function(e,t,n){return function(r){var i=ae.attr(r,e);return null==i?"!="===t:!t||(i+="","="===t?i===n:"!="===t?i!==n:"^="===t?n&&0===i.indexOf(n):"*="===t?n&&i.indexOf(n)>-1:"$="===t?n&&i.slice(-n.length)===n:"~="===t?(" "+i.replace(q," ")+" ").indexOf(n)>-1:"|="===t&&(i===n||i.slice(0,n.length+1)===n+"-"))}},CHILD:function(e,t,n,r,i){var o="nth"!==e.slice(0,3),s="last"!==e.slice(-4),a="of-type"===t;return 1===r&&0===i?function(e){return!!e.parentNode}:function(t,n,c){var u,l,h,f,d,p,g=o!==s?"nextSibling":"previousSibling",m=t.parentNode,y=a&&t.nodeName.toLowerCase(),v=!c&&!a,w=!1;if(m){if(o){while(g){f=t;while(f=f[g])if(a?f.nodeName.toLowerCase()===y:1===f.nodeType)return!1;p=g="only"===e&&!p&&"nextSibling"}return!0}if(p=[s?m.firstChild:m.lastChild],s&&v){f=m,h=f[b]||(f[b]={}),l=h[f.uniqueID]||(h[f.uniqueID]={}),u=l[e]||[],d=u[0]===_&&u[1],w=d&&u[2],f=d&&m.childNodes[d];while(f=++d&&f&&f[g]||(w=d=0)||p.pop())if(1===f.nodeType&&++w&&f===t){l[e]=[_,d,w];break}}else if(v&&(f=t,h=f[b]||(f[b]={}),l=h[f.uniqueID]||(h[f.uniqueID]={}),u=l[e]||[],d=u[0]===_&&u[1],w=d),!1===w)while(f=++d&&f&&f[g]||(w=d=0)||p.pop())if((a?f.nodeName.toLowerCase()===y:1===f.nodeType)&&++w&&(v&&(h=f[b]||(f[b]={}),l=h[f.uniqueID]||(h[f.uniqueID]={}),l[e]=[_,w]),f===t))break;return w-=i,w===r||w%r===0&&w/r>=0}}},PSEUDO:function(e,t){var n,i=r.pseudos[e]||r.setFilters[e.toLowerCase()]||ae.error("unsupported pseudo: "+e);return i[b]?i(t):i.length>1?(n=[e,e,"",t],r.setFilters.hasOwnProperty(e.toLowerCase())?ue((function(e,n){var r,o=i(e,t),s=o.length;while(s--)r=L(e,o[s]),e[r]=!(n[r]=o[s])})):function(e){return i(e,0,n)}):i}},pseudos:{not:ue((function(e){var t=[],n=[],r=a(e.replace($,"$1"));return r[b]?ue((function(e,t,n,i){var o,s=r(e,null,i,[]),a=e.length;while(a--)(o=s[a])&&(e[a]=!(t[a]=o))})):function(e,i,o){return t[0]=e,r(t,null,o,n),t[0]=null,!n.pop()}})),has:ue((function(e){return function(t){return ae(e,t).length>0}})),contains:ue((function(e){return e=e.replace(te,ne),function(t){return(t.textContent||i(t)).indexOf(e)>-1}})),lang:ue((function(e){return K.test(e||"")||ae.error("unsupported lang: "+e),e=e.replace(te,ne).toLowerCase(),function(t){var n;do{if(n=g?t.lang:t.getAttribute("xml:lang")||t.getAttribute("lang"))return n=n.toLowerCase(),n===e||0===n.indexOf(e+"-")}while((t=t.parentNode)&&1===t.nodeType);return!1}})),target:function(t){var n=e.location&&e.location.hash;return n&&n.slice(1)===t.id},root:function(e){return e===p},focus:function(e){return e===d.activeElement&&(!d.hasFocus||d.hasFocus())&&!!(e.type||e.href||~e.tabIndex)},enabled:ge(!1),disabled:ge(!0),checked:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&!!e.checked||"option"===t&&!!e.selected},selected:function(e){return e.parentNode&&e.parentNode.selectedIndex,!0===e.selected},empty:function(e){for(e=e.firstChild;e;e=e.nextSibling)if(e.nodeType<6)return!1;return!0},parent:function(e){return!r.pseudos["empty"](e)},header:function(e){return X.test(e.nodeName)},input:function(e){return Q.test(e.nodeName)},button:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&"button"===e.type||"button"===t},text:function(e){var t;return"input"===e.nodeName.toLowerCase()&&"text"===e.type&&(null==(t=e.getAttribute("type"))||"text"===t.toLowerCase())},first:me((function(){return[0]})),last:me((function(e,t){return[t-1]})),eq:me((function(e,t,n){return[n<0?n+t:n]})),even:me((function(e,t){for(var n=0;n<t;n+=2)e.push(n);return e})),odd:me((function(e,t){for(var n=1;n<t;n+=2)e.push(n);return e})),lt:me((function(e,t,n){for(var r=n<0?n+t:n>t?t:n;--r>=0;)e.push(r);return e})),gt:me((function(e,t,n){for(var r=n<0?n+t:n;++r<t;)e.push(r);return e}))}},r.pseudos["nth"]=r.pseudos["eq"],{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})r.pseudos[t]=de(t);for(t in{submit:!0,reset:!0})r.pseudos[t]=pe(t);function ve(){}function we(e){for(var t=0,n=e.length,r="";t<n;t++)r+=e[t].value;return r}function be(e,t,n){var r=t.dir,i=t.next,o=i||r,s=n&&"parentNode"===o,a=T++;return t.first?function(t,n,i){while(t=t[r])if(1===t.nodeType||s)return e(t,n,i);return!1}:function(t,n,c){var u,l,h,f=[_,a];if(c){while(t=t[r])if((1===t.nodeType||s)&&e(t,n,c))return!0}else while(t=t[r])if(1===t.nodeType||s)if(h=t[b]||(t[b]={}),l=h[t.uniqueID]||(h[t.uniqueID]={}),i&&i===t.nodeName.toLowerCase())t=t[r]||t;else{if((u=l[o])&&u[0]===_&&u[1]===a)return f[2]=u[2];if(l[o]=f,f[2]=e(t,n,c))return!0}return!1}}function Ee(e){return e.length>1?function(t,n,r){var i=e.length;while(i--)if(!e[i](t,n,r))return!1;return!0}:e[0]}function _e(e,t,n){for(var r=0,i=t.length;r<i;r++)ae(e,t[r],n);return n}function Te(e,t,n,r,i){for(var o,s=[],a=0,c=e.length,u=null!=t;a<c;a++)(o=e[a])&&(n&&!n(o,r,i)||(s.push(o),u&&t.push(a)));return s}function Ie(e,t,n,r,i,o){return r&&!r[b]&&(r=Ie(r)),i&&!i[b]&&(i=Ie(i,o)),ue((function(o,s,a,c){var u,l,h,f=[],d=[],p=s.length,g=o||_e(t||"*",a.nodeType?[a]:a,[]),m=!e||!o&&t?g:Te(g,f,e,a,c),y=n?i||(o?e:p||r)?[]:s:m;if(n&&n(m,y,a,c),r){u=Te(y,d),r(u,[],a,c),l=u.length;while(l--)(h=u[l])&&(y[d[l]]=!(m[d[l]]=h))}if(o){if(i||e){if(i){u=[],l=y.length;while(l--)(h=y[l])&&u.push(m[l]=h);i(null,y=[],u,c)}l=y.length;while(l--)(h=y[l])&&(u=i?L(o,h):f[l])>-1&&(o[u]=!(s[u]=h))}}else y=Te(y===s?y.splice(p,y.length):y),i?i(null,s,y,c):D.apply(s,y)}))}function Se(e){for(var t,n,i,o=e.length,s=r.relative[e[0].type],a=s||r.relative[" "],c=s?1:0,l=be((function(e){return e===t}),a,!0),h=be((function(e){return L(t,e)>-1}),a,!0),f=[function(e,n,r){var i=!s&&(r||n!==u)||((t=n).nodeType?l(e,n,r):h(e,n,r));return t=null,i}];c<o;c++)if(n=r.relative[e[c].type])f=[be(Ee(f),n)];else{if(n=r.filter[e[c].type].apply(null,e[c].matches),n[b]){for(i=++c;i<o;i++)if(r.relative[e[i].type])break;return Ie(c>1&&Ee(f),c>1&&we(e.slice(0,c-1).concat({value:" "===e[c-2].type?"*":""})).replace($,"$1"),n,c<i&&Se(e.slice(c,i)),i<o&&Se(e=e.slice(i)),i<o&&we(e))}f.push(n)}return Ee(f)}function ke(e,t){var n=t.length>0,i=e.length>0,o=function(o,s,a,c,l){var h,p,m,y=0,v="0",w=o&&[],b=[],E=u,T=o||i&&r.find["TAG"]("*",l),I=_+=null==E?1:Math.random()||.1,S=T.length;for(l&&(u=s==d||s||l);v!==S&&null!=(h=T[v]);v++){if(i&&h){p=0,s||h.ownerDocument==d||(f(h),a=!g);while(m=e[p++])if(m(h,s||d,a)){c.push(h);break}l&&(_=I)}n&&((h=!m&&h)&&y--,o&&w.push(h))}if(y+=v,n&&v!==y){p=0;while(m=t[p++])m(w,b,s,a);if(o){if(y>0)while(v--)w[v]||b[v]||(b[v]=N.call(c));b=Te(b)}D.apply(c,b),l&&!o&&b.length>0&&y+t.length>1&&ae.uniqueSort(c)}return l&&(_=I,u=E),w};return n?ue(o):o}return ve.prototype=r.filters=r.pseudos,r.setFilters=new ve,s=ae.tokenize=function(e,t){var n,i,o,s,a,c,u,l=S[e+" "];if(l)return t?0:l.slice(0);a=e,c=[],u=r.preFilter;while(a){for(s in n&&!(i=B.exec(a))||(i&&(a=a.slice(i[0].length)||a),c.push(o=[])),n=!1,(i=H.exec(a))&&(n=i.shift(),o.push({value:n,type:i[0].replace($," ")}),a=a.slice(n.length)),r.filter)!(i=G[s].exec(a))||u[s]&&!(i=u[s](i))||(n=i.shift(),o.push({value:n,type:s,matches:i}),a=a.slice(n.length));if(!n)break}return t?a.length:a?ae.error(e):S(e,c).slice(0)},a=ae.compile=function(e,t){var n,r=[],i=[],o=k[e+" "];if(!o){t||(t=s(e)),n=t.length;while(n--)o=Se(t[n]),o[b]?r.push(o):i.push(o);o=k(e,ke(i,r)),o.selector=e}return o},c=ae.select=function(e,t,n,i){var o,c,u,l,h,f="function"===typeof e&&e,d=!i&&s(e=f.selector||e);if(n=n||[],1===d.length){if(c=d[0]=d[0].slice(0),c.length>2&&"ID"===(u=c[0]).type&&9===t.nodeType&&g&&r.relative[c[1].type]){if(t=(r.find["ID"](u.matches[0].replace(te,ne),t)||[])[0],!t)return n;f&&(t=t.parentNode),e=e.slice(c.shift().value.length)}o=G["needsContext"].test(e)?0:c.length;while(o--){if(u=c[o],r.relative[l=u.type])break;if((h=r.find[l])&&(i=h(u.matches[0].replace(te,ne),ee.test(c[0].type)&&ye(t.parentNode)||t))){if(c.splice(o,1),e=i.length&&we(c),!e)return D.apply(n,i),n;break}}}return(f||a(e,d))(i,t,!g,n,!t||ee.test(e)&&ye(t.parentNode)||t),n},n.sortStable=b.split("").sort(C).join("")===b,n.detectDuplicates=!!h,f(),n.sortDetached=le((function(e){return 1&e.compareDocumentPosition(d.createElement("fieldset"))})),le((function(e){return e.innerHTML="<a href='#'></a>","#"===e.firstChild.getAttribute("href")}))||he("type|href|height|width",(function(e,t,n){if(!n)return e.getAttribute(t,"type"===t.toLowerCase()?1:2)})),n.attributes&&le((function(e){return e.innerHTML="<input/>",e.firstChild.setAttribute("value",""),""===e.firstChild.getAttribute("value")}))||he("value",(function(e,t,n){if(!n&&"input"===e.nodeName.toLowerCase())return e.defaultValue})),le((function(e){return null==e.getAttribute("disabled")}))||he(M,(function(e,t,n){var r;if(!n)return!0===e[t]?t.toLowerCase():(r=e.getAttributeNode(t))&&r.specified?r.value:null})),ae}(n);S.find=A,S.expr=A.selectors,S.expr[":"]=S.expr.pseudos,S.uniqueSort=S.unique=A.uniqueSort,S.text=A.getText,S.isXMLDoc=A.isXML,S.contains=A.contains,S.escapeSelector=A.escape;var C=function(e,t,n){var r=[],i=void 0!==n;while((e=e[t])&&9!==e.nodeType)if(1===e.nodeType){if(i&&S(e).is(n))break;r.push(e)}return r},x=function(e,t){for(var n=[];e;e=e.nextSibling)1===e.nodeType&&e!==t&&n.push(e);return n},O=S.expr.match.needsContext;function N(e,t){return e.nodeName&&e.nodeName.toLowerCase()===t.toLowerCase()}var R=/^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;function D(e,t,n){return v(t)?S.grep(e,(function(e,r){return!!t.call(e,r,e)!==n})):t.nodeType?S.grep(e,(function(e){return e===t!==n})):"string"!==typeof t?S.grep(e,(function(e){return h.call(t,e)>-1!==n})):S.filter(t,e,n)}S.filter=function(e,t,n){var r=t[0];return n&&(e=":not("+e+")"),1===t.length&&1===r.nodeType?S.find.matchesSelector(r,e)?[r]:[]:S.find.matches(e,S.grep(t,(function(e){return 1===e.nodeType})))},S.fn.extend({find:function(e){var t,n,r=this.length,i=this;if("string"!==typeof e)return this.pushStack(S(e).filter((function(){for(t=0;t<r;t++)if(S.contains(i[t],this))return!0})));for(n=this.pushStack([]),t=0;t<r;t++)S.find(e,i[t],n);return r>1?S.uniqueSort(n):n},filter:function(e){return this.pushStack(D(this,e||[],!1))},not:function(e){return this.pushStack(D(this,e||[],!0))},is:function(e){return!!D(this,"string"===typeof e&&O.test(e)?S(e):e||[],!1).length}});var P,L=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,M=S.fn.init=function(e,t,n){var r,i;if(!e)return this;if(n=n||P,"string"===typeof e){if(r="<"===e[0]&&">"===e[e.length-1]&&e.length>=3?[null,e,null]:L.exec(e),!r||!r[1]&&t)return!t||t.jquery?(t||n).find(e):this.constructor(t).find(e);if(r[1]){if(t=t instanceof S?t[0]:t,S.merge(this,S.parseHTML(r[1],t&&t.nodeType?t.ownerDocument||t:b,!0)),R.test(r[1])&&S.isPlainObject(t))for(r in t)v(this[r])?this[r](t[r]):this.attr(r,t[r]);return this}return i=b.getElementById(r[2]),i&&(this[0]=i,this.length=1),this}return e.nodeType?(this[0]=e,this.length=1,this):v(e)?void 0!==n.ready?n.ready(e):e(S):S.makeArray(e,this)};M.prototype=S.fn,P=S(b);var j=/^(?:parents|prev(?:Until|All))/,F={children:!0,contents:!0,next:!0,prev:!0};function U(e,t){while((e=e[t])&&1!==e.nodeType);return e}S.fn.extend({has:function(e){var t=S(e,this),n=t.length;return this.filter((function(){for(var e=0;e<n;e++)if(S.contains(this,t[e]))return!0}))},closest:function(e,t){var n,r=0,i=this.length,o=[],s="string"!==typeof e&&S(e);if(!O.test(e))for(;r<i;r++)for(n=this[r];n&&n!==t;n=n.parentNode)if(n.nodeType<11&&(s?s.index(n)>-1:1===n.nodeType&&S.find.matchesSelector(n,e))){o.push(n);break}return this.pushStack(o.length>1?S.uniqueSort(o):o)},index:function(e){return e?"string"===typeof e?h.call(S(e),this[0]):h.call(this,e.jquery?e[0]:e):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(e,t){return this.pushStack(S.uniqueSort(S.merge(this.get(),S(e,t))))},addBack:function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}}),S.each({parent:function(e){var t=e.parentNode;return t&&11!==t.nodeType?t:null},parents:function(e){return C(e,"parentNode")},parentsUntil:function(e,t,n){return C(e,"parentNode",n)},next:function(e){return U(e,"nextSibling")},prev:function(e){return U(e,"previousSibling")},nextAll:function(e){return C(e,"nextSibling")},prevAll:function(e){return C(e,"previousSibling")},nextUntil:function(e,t,n){return C(e,"nextSibling",n)},prevUntil:function(e,t,n){return C(e,"previousSibling",n)},siblings:function(e){return x((e.parentNode||{}).firstChild,e)},children:function(e){return x(e.firstChild)},contents:function(e){return null!=e.contentDocument&&a(e.contentDocument)?e.contentDocument:(N(e,"template")&&(e=e.content||e),S.merge([],e.childNodes))}},(function(e,t){S.fn[e]=function(n,r){var i=S.map(this,t,n);return"Until"!==e.slice(-5)&&(r=n),r&&"string"===typeof r&&(i=S.filter(r,i)),this.length>1&&(F[e]||S.uniqueSort(i),j.test(e)&&i.reverse()),this.pushStack(i)}}));var V=/[^\x20\t\r\n\f]+/g;function q(e){var t={};return S.each(e.match(V)||[],(function(e,n){t[n]=!0})),t}function $(e){return e}function B(e){throw e}function H(e,t,n,r){var i;try{e&&v(i=e.promise)?i.call(e).done(t).fail(n):e&&v(i=e.then)?i.call(e,t,n):t.apply(void 0,[e].slice(r))}catch(e){n.apply(void 0,[e])}}S.Callbacks=function(e){e="string"===typeof e?q(e):S.extend({},e);var t,n,r,i,o=[],s=[],a=-1,c=function(){for(i=i||e.once,r=t=!0;s.length;a=-1){n=s.shift();while(++a<o.length)!1===o[a].apply(n[0],n[1])&&e.stopOnFalse&&(a=o.length,n=!1)}e.memory||(n=!1),t=!1,i&&(o=n?[]:"")},u={add:function(){return o&&(n&&!t&&(a=o.length-1,s.push(n)),function t(n){S.each(n,(function(n,r){v(r)?e.unique&&u.has(r)||o.push(r):r&&r.length&&"string"!==T(r)&&t(r)}))}(arguments),n&&!t&&c()),this},remove:function(){return S.each(arguments,(function(e,t){var n;while((n=S.inArray(t,o,n))>-1)o.splice(n,1),n<=a&&a--})),this},has:function(e){return e?S.inArray(e,o)>-1:o.length>0},empty:function(){return o&&(o=[]),this},disable:function(){return i=s=[],o=n="",this},disabled:function(){return!o},lock:function(){return i=s=[],n||t||(o=n=""),this},locked:function(){return!!i},fireWith:function(e,n){return i||(n=n||[],n=[e,n.slice?n.slice():n],s.push(n),t||c()),this},fire:function(){return u.fireWith(this,arguments),this},fired:function(){return!!r}};return u},S.extend({Deferred:function(e){var t=[["notify","progress",S.Callbacks("memory"),S.Callbacks("memory"),2],["resolve","done",S.Callbacks("once memory"),S.Callbacks("once memory"),0,"resolved"],["reject","fail",S.Callbacks("once memory"),S.Callbacks("once memory"),1,"rejected"]],r="pending",i={state:function(){return r},always:function(){return o.done(arguments).fail(arguments),this},catch:function(e){return i.then(null,e)},pipe:function(){var e=arguments;return S.Deferred((function(n){S.each(t,(function(t,r){var i=v(e[r[4]])&&e[r[4]];o[r[1]]((function(){var e=i&&i.apply(this,arguments);e&&v(e.promise)?e.promise().progress(n.notify).done(n.resolve).fail(n.reject):n[r[0]+"With"](this,i?[e]:arguments)}))})),e=null})).promise()},then:function(e,r,i){var o=0;function s(e,t,r,i){return function(){var a=this,c=arguments,u=function(){var n,u;if(!(e<o)){if(n=r.apply(a,c),n===t.promise())throw new TypeError("Thenable self-resolution");u=n&&("object"===typeof n||"function"===typeof n)&&n.then,v(u)?i?u.call(n,s(o,t,$,i),s(o,t,B,i)):(o++,u.call(n,s(o,t,$,i),s(o,t,B,i),s(o,t,$,t.notifyWith))):(r!==$&&(a=void 0,c=[n]),(i||t.resolveWith)(a,c))}},l=i?u:function(){try{u()}catch(n){S.Deferred.exceptionHook&&S.Deferred.exceptionHook(n,l.stackTrace),e+1>=o&&(r!==B&&(a=void 0,c=[n]),t.rejectWith(a,c))}};e?l():(S.Deferred.getStackHook&&(l.stackTrace=S.Deferred.getStackHook()),n.setTimeout(l))}}return S.Deferred((function(n){t[0][3].add(s(0,n,v(i)?i:$,n.notifyWith)),t[1][3].add(s(0,n,v(e)?e:$)),t[2][3].add(s(0,n,v(r)?r:B))})).promise()},promise:function(e){return null!=e?S.extend(e,i):i}},o={};return S.each(t,(function(e,n){var s=n[2],a=n[5];i[n[1]]=s.add,a&&s.add((function(){r=a}),t[3-e][2].disable,t[3-e][3].disable,t[0][2].lock,t[0][3].lock),s.add(n[3].fire),o[n[0]]=function(){return o[n[0]+"With"](this===o?void 0:this,arguments),this},o[n[0]+"With"]=s.fireWith})),i.promise(o),e&&e.call(o,o),o},when:function(e){var t=arguments.length,n=t,r=Array(n),i=c.call(arguments),o=S.Deferred(),s=function(e){return function(n){r[e]=this,i[e]=arguments.length>1?c.call(arguments):n,--t||o.resolveWith(r,i)}};if(t<=1&&(H(e,o.done(s(n)).resolve,o.reject,!t),"pending"===o.state()||v(i[n]&&i[n].then)))return o.then();while(n--)H(i[n],s(n),o.reject);return o.promise()}});var z=/^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;S.Deferred.exceptionHook=function(e,t){n.console&&n.console.warn&&e&&z.test(e.name)&&n.console.warn("jQuery.Deferred exception: "+e.message,e.stack,t)},S.readyException=function(e){n.setTimeout((function(){throw e}))};var W=S.Deferred();function K(){b.removeEventListener("DOMContentLoaded",K),n.removeEventListener("load",K),S.ready()}S.fn.ready=function(e){return W.then(e).catch((function(e){S.readyException(e)})),this},S.extend({isReady:!1,readyWait:1,ready:function(e){(!0===e?--S.readyWait:S.isReady)||(S.isReady=!0,!0!==e&&--S.readyWait>0||W.resolveWith(b,[S]))}}),S.ready.then=W.then,"complete"===b.readyState||"loading"!==b.readyState&&!b.documentElement.doScroll?n.setTimeout(S.ready):(b.addEventListener("DOMContentLoaded",K),n.addEventListener("load",K));var G=function(e,t,n,r,i,o,s){var a=0,c=e.length,u=null==n;if("object"===T(n))for(a in i=!0,n)G(e,t,a,n[a],!0,o,s);else if(void 0!==r&&(i=!0,v(r)||(s=!0),u&&(s?(t.call(e,r),t=null):(u=t,t=function(e,t,n){return u.call(S(e),n)})),t))for(;a<c;a++)t(e[a],n,s?r:r.call(e[a],a,t(e[a],n)));return i?e:u?t.call(e):c?t(e[0],n):o},J=/^-ms-/,Q=/-([a-z])/g;function X(e,t){return t.toUpperCase()}function Y(e){return e.replace(J,"ms-").replace(Q,X)}var Z=function(e){return 1===e.nodeType||9===e.nodeType||!+e.nodeType};function ee(){this.expando=S.expando+ee.uid++}ee.uid=1,ee.prototype={cache:function(e){var t=e[this.expando];return t||(t={},Z(e)&&(e.nodeType?e[this.expando]=t:Object.defineProperty(e,this.expando,{value:t,configurable:!0}))),t},set:function(e,t,n){var r,i=this.cache(e);if("string"===typeof t)i[Y(t)]=n;else for(r in t)i[Y(r)]=t[r];return i},get:function(e,t){return void 0===t?this.cache(e):e[this.expando]&&e[this.expando][Y(t)]},access:function(e,t,n){return void 0===t||t&&"string"===typeof t&&void 0===n?this.get(e,t):(this.set(e,t,n),void 0!==n?n:t)},remove:function(e,t){var n,r=e[this.expando];if(void 0!==r){if(void 0!==t){Array.isArray(t)?t=t.map(Y):(t=Y(t),t=t in r?[t]:t.match(V)||[]),n=t.length;while(n--)delete r[t[n]]}(void 0===t||S.isEmptyObject(r))&&(e.nodeType?e[this.expando]=void 0:delete e[this.expando])}},hasData:function(e){var t=e[this.expando];return void 0!==t&&!S.isEmptyObject(t)}};var te=new ee,ne=new ee,re=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,ie=/[A-Z]/g;function oe(e){return"true"===e||"false"!==e&&("null"===e?null:e===+e+""?+e:re.test(e)?JSON.parse(e):e)}function se(e,t,n){var r;if(void 0===n&&1===e.nodeType)if(r="data-"+t.replace(ie,"-$&").toLowerCase(),n=e.getAttribute(r),"string"===typeof n){try{n=oe(n)}catch(i){}ne.set(e,t,n)}else n=void 0;return n}S.extend({hasData:function(e){return ne.hasData(e)||te.hasData(e)},data:function(e,t,n){return ne.access(e,t,n)},removeData:function(e,t){ne.remove(e,t)},_data:function(e,t,n){return te.access(e,t,n)},_removeData:function(e,t){te.remove(e,t)}}),S.fn.extend({data:function(e,t){var n,r,i,o=this[0],s=o&&o.attributes;if(void 0===e){if(this.length&&(i=ne.get(o),1===o.nodeType&&!te.get(o,"hasDataAttrs"))){n=s.length;while(n--)s[n]&&(r=s[n].name,0===r.indexOf("data-")&&(r=Y(r.slice(5)),se(o,r,i[r])));te.set(o,"hasDataAttrs",!0)}return i}return"object"===typeof e?this.each((function(){ne.set(this,e)})):G(this,(function(t){var n;if(o&&void 0===t)return n=ne.get(o,e),void 0!==n?n:(n=se(o,e),void 0!==n?n:void 0);this.each((function(){ne.set(this,e,t)}))}),null,t,arguments.length>1,null,!0)},removeData:function(e){return this.each((function(){ne.remove(this,e)}))}}),S.extend({queue:function(e,t,n){var r;if(e)return t=(t||"fx")+"queue",r=te.get(e,t),n&&(!r||Array.isArray(n)?r=te.access(e,t,S.makeArray(n)):r.push(n)),r||[]},dequeue:function(e,t){t=t||"fx";var n=S.queue(e,t),r=n.length,i=n.shift(),o=S._queueHooks(e,t),s=function(){S.dequeue(e,t)};"inprogress"===i&&(i=n.shift(),r--),i&&("fx"===t&&n.unshift("inprogress"),delete o.stop,i.call(e,s,o)),!r&&o&&o.empty.fire()},_queueHooks:function(e,t){var n=t+"queueHooks";return te.get(e,n)||te.access(e,n,{empty:S.Callbacks("once memory").add((function(){te.remove(e,[t+"queue",n])}))})}}),S.fn.extend({queue:function(e,t){var n=2;return"string"!==typeof e&&(t=e,e="fx",n--),arguments.length<n?S.queue(this[0],e):void 0===t?this:this.each((function(){var n=S.queue(this,e,t);S._queueHooks(this,e),"fx"===e&&"inprogress"!==n[0]&&S.dequeue(this,e)}))},dequeue:function(e){return this.each((function(){S.dequeue(this,e)}))},clearQueue:function(e){return this.queue(e||"fx",[])},promise:function(e,t){var n,r=1,i=S.Deferred(),o=this,s=this.length,a=function(){--r||i.resolveWith(o,[o])};"string"!==typeof e&&(t=e,e=void 0),e=e||"fx";while(s--)n=te.get(o[s],e+"queueHooks"),n&&n.empty&&(r++,n.empty.add(a));return a(),i.promise(t)}});var ae=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,ce=new RegExp("^(?:([+-])=|)("+ae+")([a-z%]*)$","i"),ue=["Top","Right","Bottom","Left"],le=b.documentElement,he=function(e){return S.contains(e.ownerDocument,e)},fe={composed:!0};le.getRootNode&&(he=function(e){return S.contains(e.ownerDocument,e)||e.getRootNode(fe)===e.ownerDocument});var de=function(e,t){return e=t||e,"none"===e.style.display||""===e.style.display&&he(e)&&"none"===S.css(e,"display")};function pe(e,t,n,r){var i,o,s=20,a=r?function(){return r.cur()}:function(){return S.css(e,t,"")},c=a(),u=n&&n[3]||(S.cssNumber[t]?"":"px"),l=e.nodeType&&(S.cssNumber[t]||"px"!==u&&+c)&&ce.exec(S.css(e,t));if(l&&l[3]!==u){c/=2,u=u||l[3],l=+c||1;while(s--)S.style(e,t,l+u),(1-o)*(1-(o=a()/c||.5))<=0&&(s=0),l/=o;l*=2,S.style(e,t,l+u),n=n||[]}return n&&(l=+l||+c||0,i=n[1]?l+(n[1]+1)*n[2]:+n[2],r&&(r.unit=u,r.start=l,r.end=i)),i}var ge={};function me(e){var t,n=e.ownerDocument,r=e.nodeName,i=ge[r];return i||(t=n.body.appendChild(n.createElement(r)),i=S.css(t,"display"),t.parentNode.removeChild(t),"none"===i&&(i="block"),ge[r]=i,i)}function ye(e,t){for(var n,r,i=[],o=0,s=e.length;o<s;o++)r=e[o],r.style&&(n=r.style.display,t?("none"===n&&(i[o]=te.get(r,"display")||null,i[o]||(r.style.display="")),""===r.style.display&&de(r)&&(i[o]=me(r))):"none"!==n&&(i[o]="none",te.set(r,"display",n)));for(o=0;o<s;o++)null!=i[o]&&(e[o].style.display=i[o]);return e}S.fn.extend({show:function(){return ye(this,!0)},hide:function(){return ye(this)},toggle:function(e){return"boolean"===typeof e?e?this.show():this.hide():this.each((function(){de(this)?S(this).show():S(this).hide()}))}});var ve=/^(?:checkbox|radio)$/i,we=/<([a-z][^\/\0>\x20\t\r\n\f]*)/i,be=/^$|^module$|\/(?:java|ecma)script/i;(function(){var e=b.createDocumentFragment(),t=e.appendChild(b.createElement("div")),n=b.createElement("input");n.setAttribute("type","radio"),n.setAttribute("checked","checked"),n.setAttribute("name","t"),t.appendChild(n),y.checkClone=t.cloneNode(!0).cloneNode(!0).lastChild.checked,t.innerHTML="<textarea>x</textarea>",y.noCloneChecked=!!t.cloneNode(!0).lastChild.defaultValue,t.innerHTML="<option></option>",y.option=!!t.lastChild})();var Ee={thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};function _e(e,t){var n;return n="undefined"!==typeof e.getElementsByTagName?e.getElementsByTagName(t||"*"):"undefined"!==typeof e.querySelectorAll?e.querySelectorAll(t||"*"):[],void 0===t||t&&N(e,t)?S.merge([e],n):n}function Te(e,t){for(var n=0,r=e.length;n<r;n++)te.set(e[n],"globalEval",!t||te.get(t[n],"globalEval"))}Ee.tbody=Ee.tfoot=Ee.colgroup=Ee.caption=Ee.thead,Ee.th=Ee.td,y.option||(Ee.optgroup=Ee.option=[1,"<select multiple='multiple'>","</select>"]);var Ie=/<|&#?\w+;/;function Se(e,t,n,r,i){for(var o,s,a,c,u,l,h=t.createDocumentFragment(),f=[],d=0,p=e.length;d<p;d++)if(o=e[d],o||0===o)if("object"===T(o))S.merge(f,o.nodeType?[o]:o);else if(Ie.test(o)){s=s||h.appendChild(t.createElement("div")),a=(we.exec(o)||["",""])[1].toLowerCase(),c=Ee[a]||Ee._default,s.innerHTML=c[1]+S.htmlPrefilter(o)+c[2],l=c[0];while(l--)s=s.lastChild;S.merge(f,s.childNodes),s=h.firstChild,s.textContent=""}else f.push(t.createTextNode(o));h.textContent="",d=0;while(o=f[d++])if(r&&S.inArray(o,r)>-1)i&&i.push(o);else if(u=he(o),s=_e(h.appendChild(o),"script"),u&&Te(s),n){l=0;while(o=s[l++])be.test(o.type||"")&&n.push(o)}return h}var ke=/^([^.]*)(?:\.(.+)|)/;function Ae(){return!0}function Ce(){return!1}function xe(e,t){return e===Oe()===("focus"===t)}function Oe(){try{return b.activeElement}catch(e){}}function Ne(e,t,n,r,i,o){var s,a;if("object"===typeof t){for(a in"string"!==typeof n&&(r=r||n,n=void 0),t)Ne(e,a,n,r,t[a],o);return e}if(null==r&&null==i?(i=n,r=n=void 0):null==i&&("string"===typeof n?(i=r,r=void 0):(i=r,r=n,n=void 0)),!1===i)i=Ce;else if(!i)return e;return 1===o&&(s=i,i=function(e){return S().off(e),s.apply(this,arguments)},i.guid=s.guid||(s.guid=S.guid++)),e.each((function(){S.event.add(this,t,i,r,n)}))}function Re(e,t,n){n?(te.set(e,t,!1),S.event.add(e,t,{namespace:!1,handler:function(e){var r,i,o=te.get(this,t);if(1&e.isTrigger&&this[t]){if(o.length)(S.event.special[t]||{}).delegateType&&e.stopPropagation();else if(o=c.call(arguments),te.set(this,t,o),r=n(this,t),this[t](),i=te.get(this,t),o!==i||r?te.set(this,t,!1):i={},o!==i)return e.stopImmediatePropagation(),e.preventDefault(),i&&i.value}else o.length&&(te.set(this,t,{value:S.event.trigger(S.extend(o[0],S.Event.prototype),o.slice(1),this)}),e.stopImmediatePropagation())}})):void 0===te.get(e,t)&&S.event.add(e,t,Ae)}S.event={global:{},add:function(e,t,n,r,i){var o,s,a,c,u,l,h,f,d,p,g,m=te.get(e);if(Z(e)){n.handler&&(o=n,n=o.handler,i=o.selector),i&&S.find.matchesSelector(le,i),n.guid||(n.guid=S.guid++),(c=m.events)||(c=m.events=Object.create(null)),(s=m.handle)||(s=m.handle=function(t){return"undefined"!==typeof S&&S.event.triggered!==t.type?S.event.dispatch.apply(e,arguments):void 0}),t=(t||"").match(V)||[""],u=t.length;while(u--)a=ke.exec(t[u])||[],d=g=a[1],p=(a[2]||"").split(".").sort(),d&&(h=S.event.special[d]||{},d=(i?h.delegateType:h.bindType)||d,h=S.event.special[d]||{},l=S.extend({type:d,origType:g,data:r,handler:n,guid:n.guid,selector:i,needsContext:i&&S.expr.match.needsContext.test(i),namespace:p.join(".")},o),(f=c[d])||(f=c[d]=[],f.delegateCount=0,h.setup&&!1!==h.setup.call(e,r,p,s)||e.addEventListener&&e.addEventListener(d,s)),h.add&&(h.add.call(e,l),l.handler.guid||(l.handler.guid=n.guid)),i?f.splice(f.delegateCount++,0,l):f.push(l),S.event.global[d]=!0)}},remove:function(e,t,n,r,i){var o,s,a,c,u,l,h,f,d,p,g,m=te.hasData(e)&&te.get(e);if(m&&(c=m.events)){t=(t||"").match(V)||[""],u=t.length;while(u--)if(a=ke.exec(t[u])||[],d=g=a[1],p=(a[2]||"").split(".").sort(),d){h=S.event.special[d]||{},d=(r?h.delegateType:h.bindType)||d,f=c[d]||[],a=a[2]&&new RegExp("(^|\\.)"+p.join("\\.(?:.*\\.|)")+"(\\.|$)"),s=o=f.length;while(o--)l=f[o],!i&&g!==l.origType||n&&n.guid!==l.guid||a&&!a.test(l.namespace)||r&&r!==l.selector&&("**"!==r||!l.selector)||(f.splice(o,1),l.selector&&f.delegateCount--,h.remove&&h.remove.call(e,l));s&&!f.length&&(h.teardown&&!1!==h.teardown.call(e,p,m.handle)||S.removeEvent(e,d,m.handle),delete c[d])}else for(d in c)S.event.remove(e,d+t[u],n,r,!0);S.isEmptyObject(c)&&te.remove(e,"handle events")}},dispatch:function(e){var t,n,r,i,o,s,a=new Array(arguments.length),c=S.event.fix(e),u=(te.get(this,"events")||Object.create(null))[c.type]||[],l=S.event.special[c.type]||{};for(a[0]=c,t=1;t<arguments.length;t++)a[t]=arguments[t];if(c.delegateTarget=this,!l.preDispatch||!1!==l.preDispatch.call(this,c)){s=S.event.handlers.call(this,c,u),t=0;while((i=s[t++])&&!c.isPropagationStopped()){c.currentTarget=i.elem,n=0;while((o=i.handlers[n++])&&!c.isImmediatePropagationStopped())c.rnamespace&&!1!==o.namespace&&!c.rnamespace.test(o.namespace)||(c.handleObj=o,c.data=o.data,r=((S.event.special[o.origType]||{}).handle||o.handler).apply(i.elem,a),void 0!==r&&!1===(c.result=r)&&(c.preventDefault(),c.stopPropagation()))}return l.postDispatch&&l.postDispatch.call(this,c),c.result}},handlers:function(e,t){var n,r,i,o,s,a=[],c=t.delegateCount,u=e.target;if(c&&u.nodeType&&!("click"===e.type&&e.button>=1))for(;u!==this;u=u.parentNode||this)if(1===u.nodeType&&("click"!==e.type||!0!==u.disabled)){for(o=[],s={},n=0;n<c;n++)r=t[n],i=r.selector+" ",void 0===s[i]&&(s[i]=r.needsContext?S(i,this).index(u)>-1:S.find(i,this,null,[u]).length),s[i]&&o.push(r);o.length&&a.push({elem:u,handlers:o})}return u=this,c<t.length&&a.push({elem:u,handlers:t.slice(c)}),a},addProp:function(e,t){Object.defineProperty(S.Event.prototype,e,{enumerable:!0,configurable:!0,get:v(t)?function(){if(this.originalEvent)return t(this.originalEvent)}:function(){if(this.originalEvent)return this.originalEvent[e]},set:function(t){Object.defineProperty(this,e,{enumerable:!0,configurable:!0,writable:!0,value:t})}})},fix:function(e){return e[S.expando]?e:new S.Event(e)},special:{load:{noBubble:!0},click:{setup:function(e){var t=this||e;return ve.test(t.type)&&t.click&&N(t,"input")&&Re(t,"click",Ae),!1},trigger:function(e){var t=this||e;return ve.test(t.type)&&t.click&&N(t,"input")&&Re(t,"click"),!0},_default:function(e){var t=e.target;return ve.test(t.type)&&t.click&&N(t,"input")&&te.get(t,"click")||N(t,"a")}},beforeunload:{postDispatch:function(e){void 0!==e.result&&e.originalEvent&&(e.originalEvent.returnValue=e.result)}}}},S.removeEvent=function(e,t,n){e.removeEventListener&&e.removeEventListener(t,n)},S.Event=function(e,t){if(!(this instanceof S.Event))return new S.Event(e,t);e&&e.type?(this.originalEvent=e,this.type=e.type,this.isDefaultPrevented=e.defaultPrevented||void 0===e.defaultPrevented&&!1===e.returnValue?Ae:Ce,this.target=e.target&&3===e.target.nodeType?e.target.parentNode:e.target,this.currentTarget=e.currentTarget,this.relatedTarget=e.relatedTarget):this.type=e,t&&S.extend(this,t),this.timeStamp=e&&e.timeStamp||Date.now(),this[S.expando]=!0},S.Event.prototype={constructor:S.Event,isDefaultPrevented:Ce,isPropagationStopped:Ce,isImmediatePropagationStopped:Ce,isSimulated:!1,preventDefault:function(){var e=this.originalEvent;this.isDefaultPrevented=Ae,e&&!this.isSimulated&&e.preventDefault()},stopPropagation:function(){var e=this.originalEvent;this.isPropagationStopped=Ae,e&&!this.isSimulated&&e.stopPropagation()},stopImmediatePropagation:function(){var e=this.originalEvent;this.isImmediatePropagationStopped=Ae,e&&!this.isSimulated&&e.stopImmediatePropagation(),this.stopPropagation()}},S.each({altKey:!0,bubbles:!0,cancelable:!0,changedTouches:!0,ctrlKey:!0,detail:!0,eventPhase:!0,metaKey:!0,pageX:!0,pageY:!0,shiftKey:!0,view:!0,char:!0,code:!0,charCode:!0,key:!0,keyCode:!0,button:!0,buttons:!0,clientX:!0,clientY:!0,offsetX:!0,offsetY:!0,pointerId:!0,pointerType:!0,screenX:!0,screenY:!0,targetTouches:!0,toElement:!0,touches:!0,which:!0},S.event.addProp),S.each({focus:"focusin",blur:"focusout"},(function(e,t){S.event.special[e]={setup:function(){return Re(this,e,xe),!1},trigger:function(){return Re(this,e),!0},_default:function(t){return te.get(t.target,e)},delegateType:t}})),S.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},(function(e,t){S.event.special[e]={delegateType:t,bindType:t,handle:function(e){var n,r=this,i=e.relatedTarget,o=e.handleObj;return i&&(i===r||S.contains(r,i))||(e.type=o.origType,n=o.handler.apply(this,arguments),e.type=t),n}}})),S.fn.extend({on:function(e,t,n,r){return Ne(this,e,t,n,r)},one:function(e,t,n,r){return Ne(this,e,t,n,r,1)},off:function(e,t,n){var r,i;if(e&&e.preventDefault&&e.handleObj)return r=e.handleObj,S(e.delegateTarget).off(r.namespace?r.origType+"."+r.namespace:r.origType,r.selector,r.handler),this;if("object"===typeof e){for(i in e)this.off(i,t,e[i]);return this}return!1!==t&&"function"!==typeof t||(n=t,t=void 0),!1===n&&(n=Ce),this.each((function(){S.event.remove(this,e,n,t)}))}});var De=/<script|<style|<link/i,Pe=/checked\s*(?:[^=]|=\s*.checked.)/i,Le=/^\s*<!\[CDATA\[|\]\]>\s*$/g;function Me(e,t){return N(e,"table")&&N(11!==t.nodeType?t:t.firstChild,"tr")&&S(e).children("tbody")[0]||e}function je(e){return e.type=(null!==e.getAttribute("type"))+"/"+e.type,e}function Fe(e){return"true/"===(e.type||"").slice(0,5)?e.type=e.type.slice(5):e.removeAttribute("type"),e}function Ue(e,t){var n,r,i,o,s,a,c;if(1===t.nodeType){if(te.hasData(e)&&(o=te.get(e),c=o.events,c))for(i in te.remove(t,"handle events"),c)for(n=0,r=c[i].length;n<r;n++)S.event.add(t,i,c[i][n]);ne.hasData(e)&&(s=ne.access(e),a=S.extend({},s),ne.set(t,a))}}function Ve(e,t){var n=t.nodeName.toLowerCase();"input"===n&&ve.test(e.type)?t.checked=e.checked:"input"!==n&&"textarea"!==n||(t.defaultValue=e.defaultValue)}function qe(e,t,n,r){t=u(t);var i,o,s,a,c,l,h=0,f=e.length,d=f-1,p=t[0],g=v(p);if(g||f>1&&"string"===typeof p&&!y.checkClone&&Pe.test(p))return e.each((function(i){var o=e.eq(i);g&&(t[0]=p.call(this,i,o.html())),qe(o,t,n,r)}));if(f&&(i=Se(t,e[0].ownerDocument,!1,e,r),o=i.firstChild,1===i.childNodes.length&&(i=o),o||r)){for(s=S.map(_e(i,"script"),je),a=s.length;h<f;h++)c=i,h!==d&&(c=S.clone(c,!0,!0),a&&S.merge(s,_e(c,"script"))),n.call(e[h],c,h);if(a)for(l=s[s.length-1].ownerDocument,S.map(s,Fe),h=0;h<a;h++)c=s[h],be.test(c.type||"")&&!te.access(c,"globalEval")&&S.contains(l,c)&&(c.src&&"module"!==(c.type||"").toLowerCase()?S._evalUrl&&!c.noModule&&S._evalUrl(c.src,{nonce:c.nonce||c.getAttribute("nonce")},l):_(c.textContent.replace(Le,""),c,l))}return e}function $e(e,t,n){for(var r,i=t?S.filter(t,e):e,o=0;null!=(r=i[o]);o++)n||1!==r.nodeType||S.cleanData(_e(r)),r.parentNode&&(n&&he(r)&&Te(_e(r,"script")),r.parentNode.removeChild(r));return e}S.extend({htmlPrefilter:function(e){return e},clone:function(e,t,n){var r,i,o,s,a=e.cloneNode(!0),c=he(e);if(!y.noCloneChecked&&(1===e.nodeType||11===e.nodeType)&&!S.isXMLDoc(e))for(s=_e(a),o=_e(e),r=0,i=o.length;r<i;r++)Ve(o[r],s[r]);if(t)if(n)for(o=o||_e(e),s=s||_e(a),r=0,i=o.length;r<i;r++)Ue(o[r],s[r]);else Ue(e,a);return s=_e(a,"script"),s.length>0&&Te(s,!c&&_e(e,"script")),a},cleanData:function(e){for(var t,n,r,i=S.event.special,o=0;void 0!==(n=e[o]);o++)if(Z(n)){if(t=n[te.expando]){if(t.events)for(r in t.events)i[r]?S.event.remove(n,r):S.removeEvent(n,r,t.handle);n[te.expando]=void 0}n[ne.expando]&&(n[ne.expando]=void 0)}}}),S.fn.extend({detach:function(e){return $e(this,e,!0)},remove:function(e){return $e(this,e)},text:function(e){return G(this,(function(e){return void 0===e?S.text(this):this.empty().each((function(){1!==this.nodeType&&11!==this.nodeType&&9!==this.nodeType||(this.textContent=e)}))}),null,e,arguments.length)},append:function(){return qe(this,arguments,(function(e){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var t=Me(this,e);t.appendChild(e)}}))},prepend:function(){return qe(this,arguments,(function(e){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var t=Me(this,e);t.insertBefore(e,t.firstChild)}}))},before:function(){return qe(this,arguments,(function(e){this.parentNode&&this.parentNode.insertBefore(e,this)}))},after:function(){return qe(this,arguments,(function(e){this.parentNode&&this.parentNode.insertBefore(e,this.nextSibling)}))},empty:function(){for(var e,t=0;null!=(e=this[t]);t++)1===e.nodeType&&(S.cleanData(_e(e,!1)),e.textContent="");return this},clone:function(e,t){return e=null!=e&&e,t=null==t?e:t,this.map((function(){return S.clone(this,e,t)}))},html:function(e){return G(this,(function(e){var t=this[0]||{},n=0,r=this.length;if(void 0===e&&1===t.nodeType)return t.innerHTML;if("string"===typeof e&&!De.test(e)&&!Ee[(we.exec(e)||["",""])[1].toLowerCase()]){e=S.htmlPrefilter(e);try{for(;n<r;n++)t=this[n]||{},1===t.nodeType&&(S.cleanData(_e(t,!1)),t.innerHTML=e);t=0}catch(i){}}t&&this.empty().append(e)}),null,e,arguments.length)},replaceWith:function(){var e=[];return qe(this,arguments,(function(t){var n=this.parentNode;S.inArray(this,e)<0&&(S.cleanData(_e(this)),n&&n.replaceChild(t,this))}),e)}}),S.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},(function(e,t){S.fn[e]=function(e){for(var n,r=[],i=S(e),o=i.length-1,s=0;s<=o;s++)n=s===o?this:this.clone(!0),S(i[s])[t](n),l.apply(r,n.get());return this.pushStack(r)}}));var Be=new RegExp("^("+ae+")(?!px)[a-z%]+$","i"),He=/^--/,ze=function(e){var t=e.ownerDocument.defaultView;return t&&t.opener||(t=n),t.getComputedStyle(e)},We=function(e,t,n){var r,i,o={};for(i in t)o[i]=e.style[i],e.style[i]=t[i];for(i in r=n.call(e),t)e.style[i]=o[i];return r},Ke=new RegExp(ue.join("|"),"i"),Ge="[\\x20\\t\\r\\n\\f]",Je=new RegExp("^"+Ge+"+|((?:^|[^\\\\])(?:\\\\.)*)"+Ge+"+$","g");function Qe(e,t,n){var r,i,o,s,a=He.test(t),c=e.style;return n=n||ze(e),n&&(s=n.getPropertyValue(t)||n[t],a&&s&&(s=s.replace(Je,"$1")||void 0),""!==s||he(e)||(s=S.style(e,t)),!y.pixelBoxStyles()&&Be.test(s)&&Ke.test(t)&&(r=c.width,i=c.minWidth,o=c.maxWidth,c.minWidth=c.maxWidth=c.width=s,s=n.width,c.width=r,c.minWidth=i,c.maxWidth=o)),void 0!==s?s+"":s}function Xe(e,t){return{get:function(){if(!e())return(this.get=t).apply(this,arguments);delete this.get}}}(function(){function e(){if(l){u.style.cssText="position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0",l.style.cssText="position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%",le.appendChild(u).appendChild(l);var e=n.getComputedStyle(l);r="1%"!==e.top,c=12===t(e.marginLeft),l.style.right="60%",s=36===t(e.right),i=36===t(e.width),l.style.position="absolute",o=12===t(l.offsetWidth/3),le.removeChild(u),l=null}}function t(e){return Math.round(parseFloat(e))}var r,i,o,s,a,c,u=b.createElement("div"),l=b.createElement("div");l.style&&(l.style.backgroundClip="content-box",l.cloneNode(!0).style.backgroundClip="",y.clearCloneStyle="content-box"===l.style.backgroundClip,S.extend(y,{boxSizingReliable:function(){return e(),i},pixelBoxStyles:function(){return e(),s},pixelPosition:function(){return e(),r},reliableMarginLeft:function(){return e(),c},scrollboxSize:function(){return e(),o},reliableTrDimensions:function(){var e,t,r,i;return null==a&&(e=b.createElement("table"),t=b.createElement("tr"),r=b.createElement("div"),e.style.cssText="position:absolute;left:-11111px;border-collapse:separate",t.style.cssText="border:1px solid",t.style.height="1px",r.style.height="9px",r.style.display="block",le.appendChild(e).appendChild(t).appendChild(r),i=n.getComputedStyle(t),a=parseInt(i.height,10)+parseInt(i.borderTopWidth,10)+parseInt(i.borderBottomWidth,10)===t.offsetHeight,le.removeChild(e)),a}}))})();var Ye=["Webkit","Moz","ms"],Ze=b.createElement("div").style,et={};function tt(e){var t=e[0].toUpperCase()+e.slice(1),n=Ye.length;while(n--)if(e=Ye[n]+t,e in Ze)return e}function nt(e){var t=S.cssProps[e]||et[e];return t||(e in Ze?e:et[e]=tt(e)||e)}var rt=/^(none|table(?!-c[ea]).+)/,it={position:"absolute",visibility:"hidden",display:"block"},ot={letterSpacing:"0",fontWeight:"400"};function st(e,t,n){var r=ce.exec(t);return r?Math.max(0,r[2]-(n||0))+(r[3]||"px"):t}function at(e,t,n,r,i,o){var s="width"===t?1:0,a=0,c=0;if(n===(r?"border":"content"))return 0;for(;s<4;s+=2)"margin"===n&&(c+=S.css(e,n+ue[s],!0,i)),r?("content"===n&&(c-=S.css(e,"padding"+ue[s],!0,i)),"margin"!==n&&(c-=S.css(e,"border"+ue[s]+"Width",!0,i))):(c+=S.css(e,"padding"+ue[s],!0,i),"padding"!==n?c+=S.css(e,"border"+ue[s]+"Width",!0,i):a+=S.css(e,"border"+ue[s]+"Width",!0,i));return!r&&o>=0&&(c+=Math.max(0,Math.ceil(e["offset"+t[0].toUpperCase()+t.slice(1)]-o-c-a-.5))||0),c}function ct(e,t,n){var r=ze(e),i=!y.boxSizingReliable()||n,o=i&&"border-box"===S.css(e,"boxSizing",!1,r),s=o,a=Qe(e,t,r),c="offset"+t[0].toUpperCase()+t.slice(1);if(Be.test(a)){if(!n)return a;a="auto"}return(!y.boxSizingReliable()&&o||!y.reliableTrDimensions()&&N(e,"tr")||"auto"===a||!parseFloat(a)&&"inline"===S.css(e,"display",!1,r))&&e.getClientRects().length&&(o="border-box"===S.css(e,"boxSizing",!1,r),s=c in e,s&&(a=e[c])),a=parseFloat(a)||0,a+at(e,t,n||(o?"border":"content"),s,r,a)+"px"}function ut(e,t,n,r,i){return new ut.prototype.init(e,t,n,r,i)}S.extend({cssHooks:{opacity:{get:function(e,t){if(t){var n=Qe(e,"opacity");return""===n?"1":n}}}},cssNumber:{animationIterationCount:!0,columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,gridArea:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnStart:!0,gridRow:!0,gridRowEnd:!0,gridRowStart:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{},style:function(e,t,n,r){if(e&&3!==e.nodeType&&8!==e.nodeType&&e.style){var i,o,s,a=Y(t),c=He.test(t),u=e.style;if(c||(t=nt(a)),s=S.cssHooks[t]||S.cssHooks[a],void 0===n)return s&&"get"in s&&void 0!==(i=s.get(e,!1,r))?i:u[t];o=typeof n,"string"===o&&(i=ce.exec(n))&&i[1]&&(n=pe(e,t,i),o="number"),null!=n&&n===n&&("number"!==o||c||(n+=i&&i[3]||(S.cssNumber[a]?"":"px")),y.clearCloneStyle||""!==n||0!==t.indexOf("background")||(u[t]="inherit"),s&&"set"in s&&void 0===(n=s.set(e,n,r))||(c?u.setProperty(t,n):u[t]=n))}},css:function(e,t,n,r){var i,o,s,a=Y(t),c=He.test(t);return c||(t=nt(a)),s=S.cssHooks[t]||S.cssHooks[a],s&&"get"in s&&(i=s.get(e,!0,n)),void 0===i&&(i=Qe(e,t,r)),"normal"===i&&t in ot&&(i=ot[t]),""===n||n?(o=parseFloat(i),!0===n||isFinite(o)?o||0:i):i}}),S.each(["height","width"],(function(e,t){S.cssHooks[t]={get:function(e,n,r){if(n)return!rt.test(S.css(e,"display"))||e.getClientRects().length&&e.getBoundingClientRect().width?ct(e,t,r):We(e,it,(function(){return ct(e,t,r)}))},set:function(e,n,r){var i,o=ze(e),s=!y.scrollboxSize()&&"absolute"===o.position,a=s||r,c=a&&"border-box"===S.css(e,"boxSizing",!1,o),u=r?at(e,t,r,c,o):0;return c&&s&&(u-=Math.ceil(e["offset"+t[0].toUpperCase()+t.slice(1)]-parseFloat(o[t])-at(e,t,"border",!1,o)-.5)),u&&(i=ce.exec(n))&&"px"!==(i[3]||"px")&&(e.style[t]=n,n=S.css(e,t)),st(e,n,u)}}})),S.cssHooks.marginLeft=Xe(y.reliableMarginLeft,(function(e,t){if(t)return(parseFloat(Qe(e,"marginLeft"))||e.getBoundingClientRect().left-We(e,{marginLeft:0},(function(){return e.getBoundingClientRect().left})))+"px"})),S.each({margin:"",padding:"",border:"Width"},(function(e,t){S.cssHooks[e+t]={expand:function(n){for(var r=0,i={},o="string"===typeof n?n.split(" "):[n];r<4;r++)i[e+ue[r]+t]=o[r]||o[r-2]||o[0];return i}},"margin"!==e&&(S.cssHooks[e+t].set=st)})),S.fn.extend({css:function(e,t){return G(this,(function(e,t,n){var r,i,o={},s=0;if(Array.isArray(t)){for(r=ze(e),i=t.length;s<i;s++)o[t[s]]=S.css(e,t[s],!1,r);return o}return void 0!==n?S.style(e,t,n):S.css(e,t)}),e,t,arguments.length>1)}}),S.Tween=ut,ut.prototype={constructor:ut,init:function(e,t,n,r,i,o){this.elem=e,this.prop=n,this.easing=i||S.easing._default,this.options=t,this.start=this.now=this.cur(),this.end=r,this.unit=o||(S.cssNumber[n]?"":"px")},cur:function(){var e=ut.propHooks[this.prop];return e&&e.get?e.get(this):ut.propHooks._default.get(this)},run:function(e){var t,n=ut.propHooks[this.prop];return this.options.duration?this.pos=t=S.easing[this.easing](e,this.options.duration*e,0,1,this.options.duration):this.pos=t=e,this.now=(this.end-this.start)*t+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),n&&n.set?n.set(this):ut.propHooks._default.set(this),this}},ut.prototype.init.prototype=ut.prototype,ut.propHooks={_default:{get:function(e){var t;return 1!==e.elem.nodeType||null!=e.elem[e.prop]&&null==e.elem.style[e.prop]?e.elem[e.prop]:(t=S.css(e.elem,e.prop,""),t&&"auto"!==t?t:0)},set:function(e){S.fx.step[e.prop]?S.fx.step[e.prop](e):1!==e.elem.nodeType||!S.cssHooks[e.prop]&&null==e.elem.style[nt(e.prop)]?e.elem[e.prop]=e.now:S.style(e.elem,e.prop,e.now+e.unit)}}},ut.propHooks.scrollTop=ut.propHooks.scrollLeft={set:function(e){e.elem.nodeType&&e.elem.parentNode&&(e.elem[e.prop]=e.now)}},S.easing={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2},_default:"swing"},S.fx=ut.prototype.init,S.fx.step={};var lt,ht,ft=/^(?:toggle|show|hide)$/,dt=/queueHooks$/;function pt(){ht&&(!1===b.hidden&&n.requestAnimationFrame?n.requestAnimationFrame(pt):n.setTimeout(pt,S.fx.interval),S.fx.tick())}function gt(){return n.setTimeout((function(){lt=void 0})),lt=Date.now()}function mt(e,t){var n,r=0,i={height:e};for(t=t?1:0;r<4;r+=2-t)n=ue[r],i["margin"+n]=i["padding"+n]=e;return t&&(i.opacity=i.width=e),i}function yt(e,t,n){for(var r,i=(bt.tweeners[t]||[]).concat(bt.tweeners["*"]),o=0,s=i.length;o<s;o++)if(r=i[o].call(n,t,e))return r}function vt(e,t,n){var r,i,o,s,a,c,u,l,h="width"in t||"height"in t,f=this,d={},p=e.style,g=e.nodeType&&de(e),m=te.get(e,"fxshow");for(r in n.queue||(s=S._queueHooks(e,"fx"),null==s.unqueued&&(s.unqueued=0,a=s.empty.fire,s.empty.fire=function(){s.unqueued||a()}),s.unqueued++,f.always((function(){f.always((function(){s.unqueued--,S.queue(e,"fx").length||s.empty.fire()}))}))),t)if(i=t[r],ft.test(i)){if(delete t[r],o=o||"toggle"===i,i===(g?"hide":"show")){if("show"!==i||!m||void 0===m[r])continue;g=!0}d[r]=m&&m[r]||S.style(e,r)}if(c=!S.isEmptyObject(t),c||!S.isEmptyObject(d))for(r in h&&1===e.nodeType&&(n.overflow=[p.overflow,p.overflowX,p.overflowY],u=m&&m.display,null==u&&(u=te.get(e,"display")),l=S.css(e,"display"),"none"===l&&(u?l=u:(ye([e],!0),u=e.style.display||u,l=S.css(e,"display"),ye([e]))),("inline"===l||"inline-block"===l&&null!=u)&&"none"===S.css(e,"float")&&(c||(f.done((function(){p.display=u})),null==u&&(l=p.display,u="none"===l?"":l)),p.display="inline-block")),n.overflow&&(p.overflow="hidden",f.always((function(){p.overflow=n.overflow[0],p.overflowX=n.overflow[1],p.overflowY=n.overflow[2]}))),c=!1,d)c||(m?"hidden"in m&&(g=m.hidden):m=te.access(e,"fxshow",{display:u}),o&&(m.hidden=!g),g&&ye([e],!0),f.done((function(){for(r in g||ye([e]),te.remove(e,"fxshow"),d)S.style(e,r,d[r])}))),c=yt(g?m[r]:0,r,f),r in m||(m[r]=c.start,g&&(c.end=c.start,c.start=0))}function wt(e,t){var n,r,i,o,s;for(n in e)if(r=Y(n),i=t[r],o=e[n],Array.isArray(o)&&(i=o[1],o=e[n]=o[0]),n!==r&&(e[r]=o,delete e[n]),s=S.cssHooks[r],s&&"expand"in s)for(n in o=s.expand(o),delete e[r],o)n in e||(e[n]=o[n],t[n]=i);else t[r]=i}function bt(e,t,n){var r,i,o=0,s=bt.prefilters.length,a=S.Deferred().always((function(){delete c.elem})),c=function(){if(i)return!1;for(var t=lt||gt(),n=Math.max(0,u.startTime+u.duration-t),r=n/u.duration||0,o=1-r,s=0,c=u.tweens.length;s<c;s++)u.tweens[s].run(o);return a.notifyWith(e,[u,o,n]),o<1&&c?n:(c||a.notifyWith(e,[u,1,0]),a.resolveWith(e,[u]),!1)},u=a.promise({elem:e,props:S.extend({},t),opts:S.extend(!0,{specialEasing:{},easing:S.easing._default},n),originalProperties:t,originalOptions:n,startTime:lt||gt(),duration:n.duration,tweens:[],createTween:function(t,n){var r=S.Tween(e,u.opts,t,n,u.opts.specialEasing[t]||u.opts.easing);return u.tweens.push(r),r},stop:function(t){var n=0,r=t?u.tweens.length:0;if(i)return this;for(i=!0;n<r;n++)u.tweens[n].run(1);return t?(a.notifyWith(e,[u,1,0]),a.resolveWith(e,[u,t])):a.rejectWith(e,[u,t]),this}}),l=u.props;for(wt(l,u.opts.specialEasing);o<s;o++)if(r=bt.prefilters[o].call(u,e,l,u.opts),r)return v(r.stop)&&(S._queueHooks(u.elem,u.opts.queue).stop=r.stop.bind(r)),r;return S.map(l,yt,u),v(u.opts.start)&&u.opts.start.call(e,u),u.progress(u.opts.progress).done(u.opts.done,u.opts.complete).fail(u.opts.fail).always(u.opts.always),S.fx.timer(S.extend(c,{elem:e,anim:u,queue:u.opts.queue})),u}S.Animation=S.extend(bt,{tweeners:{"*":[function(e,t){var n=this.createTween(e,t);return pe(n.elem,e,ce.exec(t),n),n}]},tweener:function(e,t){v(e)?(t=e,e=["*"]):e=e.match(V);for(var n,r=0,i=e.length;r<i;r++)n=e[r],bt.tweeners[n]=bt.tweeners[n]||[],bt.tweeners[n].unshift(t)},prefilters:[vt],prefilter:function(e,t){t?bt.prefilters.unshift(e):bt.prefilters.push(e)}}),S.speed=function(e,t,n){var r=e&&"object"===typeof e?S.extend({},e):{complete:n||!n&&t||v(e)&&e,duration:e,easing:n&&t||t&&!v(t)&&t};return S.fx.off?r.duration=0:"number"!==typeof r.duration&&(r.duration in S.fx.speeds?r.duration=S.fx.speeds[r.duration]:r.duration=S.fx.speeds._default),null!=r.queue&&!0!==r.queue||(r.queue="fx"),r.old=r.complete,r.complete=function(){v(r.old)&&r.old.call(this),r.queue&&S.dequeue(this,r.queue)},r},S.fn.extend({fadeTo:function(e,t,n,r){return this.filter(de).css("opacity",0).show().end().animate({opacity:t},e,n,r)},animate:function(e,t,n,r){var i=S.isEmptyObject(e),o=S.speed(t,n,r),s=function(){var t=bt(this,S.extend({},e),o);(i||te.get(this,"finish"))&&t.stop(!0)};return s.finish=s,i||!1===o.queue?this.each(s):this.queue(o.queue,s)},stop:function(e,t,n){var r=function(e){var t=e.stop;delete e.stop,t(n)};return"string"!==typeof e&&(n=t,t=e,e=void 0),t&&this.queue(e||"fx",[]),this.each((function(){var t=!0,i=null!=e&&e+"queueHooks",o=S.timers,s=te.get(this);if(i)s[i]&&s[i].stop&&r(s[i]);else for(i in s)s[i]&&s[i].stop&&dt.test(i)&&r(s[i]);for(i=o.length;i--;)o[i].elem!==this||null!=e&&o[i].queue!==e||(o[i].anim.stop(n),t=!1,o.splice(i,1));!t&&n||S.dequeue(this,e)}))},finish:function(e){return!1!==e&&(e=e||"fx"),this.each((function(){var t,n=te.get(this),r=n[e+"queue"],i=n[e+"queueHooks"],o=S.timers,s=r?r.length:0;for(n.finish=!0,S.queue(this,e,[]),i&&i.stop&&i.stop.call(this,!0),t=o.length;t--;)o[t].elem===this&&o[t].queue===e&&(o[t].anim.stop(!0),o.splice(t,1));for(t=0;t<s;t++)r[t]&&r[t].finish&&r[t].finish.call(this);delete n.finish}))}}),S.each(["toggle","show","hide"],(function(e,t){var n=S.fn[t];S.fn[t]=function(e,r,i){return null==e||"boolean"===typeof e?n.apply(this,arguments):this.animate(mt(t,!0),e,r,i)}})),S.each({slideDown:mt("show"),slideUp:mt("hide"),slideToggle:mt("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},(function(e,t){S.fn[e]=function(e,n,r){return this.animate(t,e,n,r)}})),S.timers=[],S.fx.tick=function(){var e,t=0,n=S.timers;for(lt=Date.now();t<n.length;t++)e=n[t],e()||n[t]!==e||n.splice(t--,1);n.length||S.fx.stop(),lt=void 0},S.fx.timer=function(e){S.timers.push(e),S.fx.start()},S.fx.interval=13,S.fx.start=function(){ht||(ht=!0,pt())},S.fx.stop=function(){ht=null},S.fx.speeds={slow:600,fast:200,_default:400},S.fn.delay=function(e,t){return e=S.fx&&S.fx.speeds[e]||e,t=t||"fx",this.queue(t,(function(t,r){var i=n.setTimeout(t,e);r.stop=function(){n.clearTimeout(i)}}))},function(){var e=b.createElement("input"),t=b.createElement("select"),n=t.appendChild(b.createElement("option"));e.type="checkbox",y.checkOn=""!==e.value,y.optSelected=n.selected,e=b.createElement("input"),e.value="t",e.type="radio",y.radioValue="t"===e.value}();var Et,_t=S.expr.attrHandle;S.fn.extend({attr:function(e,t){return G(this,S.attr,e,t,arguments.length>1)},removeAttr:function(e){return this.each((function(){S.removeAttr(this,e)}))}}),S.extend({attr:function(e,t,n){var r,i,o=e.nodeType;if(3!==o&&8!==o&&2!==o)return"undefined"===typeof e.getAttribute?S.prop(e,t,n):(1===o&&S.isXMLDoc(e)||(i=S.attrHooks[t.toLowerCase()]||(S.expr.match.bool.test(t)?Et:void 0)),void 0!==n?null===n?void S.removeAttr(e,t):i&&"set"in i&&void 0!==(r=i.set(e,n,t))?r:(e.setAttribute(t,n+""),n):i&&"get"in i&&null!==(r=i.get(e,t))?r:(r=S.find.attr(e,t),null==r?void 0:r))},attrHooks:{type:{set:function(e,t){if(!y.radioValue&&"radio"===t&&N(e,"input")){var n=e.value;return e.setAttribute("type",t),n&&(e.value=n),t}}}},removeAttr:function(e,t){var n,r=0,i=t&&t.match(V);if(i&&1===e.nodeType)while(n=i[r++])e.removeAttribute(n)}}),Et={set:function(e,t,n){return!1===t?S.removeAttr(e,n):e.setAttribute(n,n),n}},S.each(S.expr.match.bool.source.match(/\w+/g),(function(e,t){var n=_t[t]||S.find.attr;_t[t]=function(e,t,r){var i,o,s=t.toLowerCase();return r||(o=_t[s],_t[s]=i,i=null!=n(e,t,r)?s:null,_t[s]=o),i}}));var Tt=/^(?:input|select|textarea|button)$/i,It=/^(?:a|area)$/i;function St(e){var t=e.match(V)||[];return t.join(" ")}function kt(e){return e.getAttribute&&e.getAttribute("class")||""}function At(e){return Array.isArray(e)?e:"string"===typeof e&&e.match(V)||[]}S.fn.extend({prop:function(e,t){return G(this,S.prop,e,t,arguments.length>1)},removeProp:function(e){return this.each((function(){delete this[S.propFix[e]||e]}))}}),S.extend({prop:function(e,t,n){var r,i,o=e.nodeType;if(3!==o&&8!==o&&2!==o)return 1===o&&S.isXMLDoc(e)||(t=S.propFix[t]||t,i=S.propHooks[t]),void 0!==n?i&&"set"in i&&void 0!==(r=i.set(e,n,t))?r:e[t]=n:i&&"get"in i&&null!==(r=i.get(e,t))?r:e[t]},propHooks:{tabIndex:{get:function(e){var t=S.find.attr(e,"tabindex");return t?parseInt(t,10):Tt.test(e.nodeName)||It.test(e.nodeName)&&e.href?0:-1}}},propFix:{for:"htmlFor",class:"className"}}),y.optSelected||(S.propHooks.selected={get:function(e){var t=e.parentNode;return t&&t.parentNode&&t.parentNode.selectedIndex,null},set:function(e){var t=e.parentNode;t&&(t.selectedIndex,t.parentNode&&t.parentNode.selectedIndex)}}),S.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],(function(){S.propFix[this.toLowerCase()]=this})),S.fn.extend({addClass:function(e){var t,n,r,i,o,s;return v(e)?this.each((function(t){S(this).addClass(e.call(this,t,kt(this)))})):(t=At(e),t.length?this.each((function(){if(r=kt(this),n=1===this.nodeType&&" "+St(r)+" ",n){for(o=0;o<t.length;o++)i=t[o],n.indexOf(" "+i+" ")<0&&(n+=i+" ");s=St(n),r!==s&&this.setAttribute("class",s)}})):this)},removeClass:function(e){var t,n,r,i,o,s;return v(e)?this.each((function(t){S(this).removeClass(e.call(this,t,kt(this)))})):arguments.length?(t=At(e),t.length?this.each((function(){if(r=kt(this),n=1===this.nodeType&&" "+St(r)+" ",n){for(o=0;o<t.length;o++){i=t[o];while(n.indexOf(" "+i+" ")>-1)n=n.replace(" "+i+" "," ")}s=St(n),r!==s&&this.setAttribute("class",s)}})):this):this.attr("class","")},toggleClass:function(e,t){var n,r,i,o,s=typeof e,a="string"===s||Array.isArray(e);return v(e)?this.each((function(n){S(this).toggleClass(e.call(this,n,kt(this),t),t)})):"boolean"===typeof t&&a?t?this.addClass(e):this.removeClass(e):(n=At(e),this.each((function(){if(a)for(o=S(this),i=0;i<n.length;i++)r=n[i],o.hasClass(r)?o.removeClass(r):o.addClass(r);else void 0!==e&&"boolean"!==s||(r=kt(this),r&&te.set(this,"__className__",r),this.setAttribute&&this.setAttribute("class",r||!1===e?"":te.get(this,"__className__")||""))})))},hasClass:function(e){var t,n,r=0;t=" "+e+" ";while(n=this[r++])if(1===n.nodeType&&(" "+St(kt(n))+" ").indexOf(t)>-1)return!0;return!1}});var Ct=/\r/g;S.fn.extend({val:function(e){var t,n,r,i=this[0];return arguments.length?(r=v(e),this.each((function(n){var i;1===this.nodeType&&(i=r?e.call(this,n,S(this).val()):e,null==i?i="":"number"===typeof i?i+="":Array.isArray(i)&&(i=S.map(i,(function(e){return null==e?"":e+""}))),t=S.valHooks[this.type]||S.valHooks[this.nodeName.toLowerCase()],t&&"set"in t&&void 0!==t.set(this,i,"value")||(this.value=i))}))):i?(t=S.valHooks[i.type]||S.valHooks[i.nodeName.toLowerCase()],t&&"get"in t&&void 0!==(n=t.get(i,"value"))?n:(n=i.value,"string"===typeof n?n.replace(Ct,""):null==n?"":n)):void 0}}),S.extend({valHooks:{option:{get:function(e){var t=S.find.attr(e,"value");return null!=t?t:St(S.text(e))}},select:{get:function(e){var t,n,r,i=e.options,o=e.selectedIndex,s="select-one"===e.type,a=s?null:[],c=s?o+1:i.length;for(r=o<0?c:s?o:0;r<c;r++)if(n=i[r],(n.selected||r===o)&&!n.disabled&&(!n.parentNode.disabled||!N(n.parentNode,"optgroup"))){if(t=S(n).val(),s)return t;a.push(t)}return a},set:function(e,t){var n,r,i=e.options,o=S.makeArray(t),s=i.length;while(s--)r=i[s],(r.selected=S.inArray(S.valHooks.option.get(r),o)>-1)&&(n=!0);return n||(e.selectedIndex=-1),o}}}}),S.each(["radio","checkbox"],(function(){S.valHooks[this]={set:function(e,t){if(Array.isArray(t))return e.checked=S.inArray(S(e).val(),t)>-1}},y.checkOn||(S.valHooks[this].get=function(e){return null===e.getAttribute("value")?"on":e.value})})),y.focusin="onfocusin"in n;var xt=/^(?:focusinfocus|focusoutblur)$/,Ot=function(e){e.stopPropagation()};S.extend(S.event,{trigger:function(e,t,r,i){var o,s,a,c,u,l,h,f,d=[r||b],g=p.call(e,"type")?e.type:e,m=p.call(e,"namespace")?e.namespace.split("."):[];if(s=f=a=r=r||b,3!==r.nodeType&&8!==r.nodeType&&!xt.test(g+S.event.triggered)&&(g.indexOf(".")>-1&&(m=g.split("."),g=m.shift(),m.sort()),u=g.indexOf(":")<0&&"on"+g,e=e[S.expando]?e:new S.Event(g,"object"===typeof e&&e),e.isTrigger=i?2:3,e.namespace=m.join("."),e.rnamespace=e.namespace?new RegExp("(^|\\.)"+m.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,e.result=void 0,e.target||(e.target=r),t=null==t?[e]:S.makeArray(t,[e]),h=S.event.special[g]||{},i||!h.trigger||!1!==h.trigger.apply(r,t))){if(!i&&!h.noBubble&&!w(r)){for(c=h.delegateType||g,xt.test(c+g)||(s=s.parentNode);s;s=s.parentNode)d.push(s),a=s;a===(r.ownerDocument||b)&&d.push(a.defaultView||a.parentWindow||n)}o=0;while((s=d[o++])&&!e.isPropagationStopped())f=s,e.type=o>1?c:h.bindType||g,l=(te.get(s,"events")||Object.create(null))[e.type]&&te.get(s,"handle"),l&&l.apply(s,t),l=u&&s[u],l&&l.apply&&Z(s)&&(e.result=l.apply(s,t),!1===e.result&&e.preventDefault());return e.type=g,i||e.isDefaultPrevented()||h._default&&!1!==h._default.apply(d.pop(),t)||!Z(r)||u&&v(r[g])&&!w(r)&&(a=r[u],a&&(r[u]=null),S.event.triggered=g,e.isPropagationStopped()&&f.addEventListener(g,Ot),r[g](),e.isPropagationStopped()&&f.removeEventListener(g,Ot),S.event.triggered=void 0,a&&(r[u]=a)),e.result}},simulate:function(e,t,n){var r=S.extend(new S.Event,n,{type:e,isSimulated:!0});S.event.trigger(r,null,t)}}),S.fn.extend({trigger:function(e,t){return this.each((function(){S.event.trigger(e,t,this)}))},triggerHandler:function(e,t){var n=this[0];if(n)return S.event.trigger(e,t,n,!0)}}),y.focusin||S.each({focus:"focusin",blur:"focusout"},(function(e,t){var n=function(e){S.event.simulate(t,e.target,S.event.fix(e))};S.event.special[t]={setup:function(){var r=this.ownerDocument||this.document||this,i=te.access(r,t);i||r.addEventListener(e,n,!0),te.access(r,t,(i||0)+1)},teardown:function(){var r=this.ownerDocument||this.document||this,i=te.access(r,t)-1;i?te.access(r,t,i):(r.removeEventListener(e,n,!0),te.remove(r,t))}}}));var Nt=n.location,Rt={guid:Date.now()},Dt=/\?/;S.parseXML=function(e){var t,r;if(!e||"string"!==typeof e)return null;try{t=(new n.DOMParser).parseFromString(e,"text/xml")}catch(i){}return r=t&&t.getElementsByTagName("parsererror")[0],t&&!r||S.error("Invalid XML: "+(r?S.map(r.childNodes,(function(e){return e.textContent})).join("\n"):e)),t};var Pt=/\[\]$/,Lt=/\r?\n/g,Mt=/^(?:submit|button|image|reset|file)$/i,jt=/^(?:input|select|textarea|keygen)/i;function Ft(e,t,n,r){var i;if(Array.isArray(t))S.each(t,(function(t,i){n||Pt.test(e)?r(e,i):Ft(e+"["+("object"===typeof i&&null!=i?t:"")+"]",i,n,r)}));else if(n||"object"!==T(t))r(e,t);else for(i in t)Ft(e+"["+i+"]",t[i],n,r)}S.param=function(e,t){var n,r=[],i=function(e,t){var n=v(t)?t():t;r[r.length]=encodeURIComponent(e)+"="+encodeURIComponent(null==n?"":n)};if(null==e)return"";if(Array.isArray(e)||e.jquery&&!S.isPlainObject(e))S.each(e,(function(){i(this.name,this.value)}));else for(n in e)Ft(n,e[n],t,i);return r.join("&")},S.fn.extend({serialize:function(){return S.param(this.serializeArray())},serializeArray:function(){return this.map((function(){var e=S.prop(this,"elements");return e?S.makeArray(e):this})).filter((function(){var e=this.type;return this.name&&!S(this).is(":disabled")&&jt.test(this.nodeName)&&!Mt.test(e)&&(this.checked||!ve.test(e))})).map((function(e,t){var n=S(this).val();return null==n?null:Array.isArray(n)?S.map(n,(function(e){return{name:t.name,value:e.replace(Lt,"\r\n")}})):{name:t.name,value:n.replace(Lt,"\r\n")}})).get()}});var Ut=/%20/g,Vt=/#.*$/,qt=/([?&])_=[^&]*/,$t=/^(.*?):[ \t]*([^\r\n]*)$/gm,Bt=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,Ht=/^(?:GET|HEAD)$/,zt=/^\/\//,Wt={},Kt={},Gt="*/".concat("*"),Jt=b.createElement("a");function Qt(e){return function(t,n){"string"!==typeof t&&(n=t,t="*");var r,i=0,o=t.toLowerCase().match(V)||[];if(v(n))while(r=o[i++])"+"===r[0]?(r=r.slice(1)||"*",(e[r]=e[r]||[]).unshift(n)):(e[r]=e[r]||[]).push(n)}}function Xt(e,t,n,r){var i={},o=e===Kt;function s(a){var c;return i[a]=!0,S.each(e[a]||[],(function(e,a){var u=a(t,n,r);return"string"!==typeof u||o||i[u]?o?!(c=u):void 0:(t.dataTypes.unshift(u),s(u),!1)})),c}return s(t.dataTypes[0])||!i["*"]&&s("*")}function Yt(e,t){var n,r,i=S.ajaxSettings.flatOptions||{};for(n in t)void 0!==t[n]&&((i[n]?e:r||(r={}))[n]=t[n]);return r&&S.extend(!0,e,r),e}function Zt(e,t,n){var r,i,o,s,a=e.contents,c=e.dataTypes;while("*"===c[0])c.shift(),void 0===r&&(r=e.mimeType||t.getResponseHeader("Content-Type"));if(r)for(i in a)if(a[i]&&a[i].test(r)){c.unshift(i);break}if(c[0]in n)o=c[0];else{for(i in n){if(!c[0]||e.converters[i+" "+c[0]]){o=i;break}s||(s=i)}o=o||s}if(o)return o!==c[0]&&c.unshift(o),n[o]}function en(e,t,n,r){var i,o,s,a,c,u={},l=e.dataTypes.slice();if(l[1])for(s in e.converters)u[s.toLowerCase()]=e.converters[s];o=l.shift();while(o)if(e.responseFields[o]&&(n[e.responseFields[o]]=t),!c&&r&&e.dataFilter&&(t=e.dataFilter(t,e.dataType)),c=o,o=l.shift(),o)if("*"===o)o=c;else if("*"!==c&&c!==o){if(s=u[c+" "+o]||u["* "+o],!s)for(i in u)if(a=i.split(" "),a[1]===o&&(s=u[c+" "+a[0]]||u["* "+a[0]],s)){!0===s?s=u[i]:!0!==u[i]&&(o=a[0],l.unshift(a[1]));break}if(!0!==s)if(s&&e.throws)t=s(t);else try{t=s(t)}catch(h){return{state:"parsererror",error:s?h:"No conversion from "+c+" to "+o}}}return{state:"success",data:t}}Jt.href=Nt.href,S.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:Nt.href,type:"GET",isLocal:Bt.test(Nt.protocol),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":Gt,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/\bxml\b/,html:/\bhtml/,json:/\bjson\b/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":JSON.parse,"text xml":S.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(e,t){return t?Yt(Yt(e,S.ajaxSettings),t):Yt(S.ajaxSettings,e)},ajaxPrefilter:Qt(Wt),ajaxTransport:Qt(Kt),ajax:function(e,t){"object"===typeof e&&(t=e,e=void 0),t=t||{};var r,i,o,s,a,c,u,l,h,f,d=S.ajaxSetup({},t),p=d.context||d,g=d.context&&(p.nodeType||p.jquery)?S(p):S.event,m=S.Deferred(),y=S.Callbacks("once memory"),v=d.statusCode||{},w={},E={},_="canceled",T={readyState:0,getResponseHeader:function(e){var t;if(u){if(!s){s={};while(t=$t.exec(o))s[t[1].toLowerCase()+" "]=(s[t[1].toLowerCase()+" "]||[]).concat(t[2])}t=s[e.toLowerCase()+" "]}return null==t?null:t.join(", ")},getAllResponseHeaders:function(){return u?o:null},setRequestHeader:function(e,t){return null==u&&(e=E[e.toLowerCase()]=E[e.toLowerCase()]||e,w[e]=t),this},overrideMimeType:function(e){return null==u&&(d.mimeType=e),this},statusCode:function(e){var t;if(e)if(u)T.always(e[T.status]);else for(t in e)v[t]=[v[t],e[t]];return this},abort:function(e){var t=e||_;return r&&r.abort(t),I(0,t),this}};if(m.promise(T),d.url=((e||d.url||Nt.href)+"").replace(zt,Nt.protocol+"//"),d.type=t.method||t.type||d.method||d.type,d.dataTypes=(d.dataType||"*").toLowerCase().match(V)||[""],null==d.crossDomain){c=b.createElement("a");try{c.href=d.url,c.href=c.href,d.crossDomain=Jt.protocol+"//"+Jt.host!==c.protocol+"//"+c.host}catch(k){d.crossDomain=!0}}if(d.data&&d.processData&&"string"!==typeof d.data&&(d.data=S.param(d.data,d.traditional)),Xt(Wt,d,t,T),u)return T;for(h in l=S.event&&d.global,l&&0===S.active++&&S.event.trigger("ajaxStart"),d.type=d.type.toUpperCase(),d.hasContent=!Ht.test(d.type),i=d.url.replace(Vt,""),d.hasContent?d.data&&d.processData&&0===(d.contentType||"").indexOf("application/x-www-form-urlencoded")&&(d.data=d.data.replace(Ut,"+")):(f=d.url.slice(i.length),d.data&&(d.processData||"string"===typeof d.data)&&(i+=(Dt.test(i)?"&":"?")+d.data,delete d.data),!1===d.cache&&(i=i.replace(qt,"$1"),f=(Dt.test(i)?"&":"?")+"_="+Rt.guid+++f),d.url=i+f),d.ifModified&&(S.lastModified[i]&&T.setRequestHeader("If-Modified-Since",S.lastModified[i]),S.etag[i]&&T.setRequestHeader("If-None-Match",S.etag[i])),(d.data&&d.hasContent&&!1!==d.contentType||t.contentType)&&T.setRequestHeader("Content-Type",d.contentType),T.setRequestHeader("Accept",d.dataTypes[0]&&d.accepts[d.dataTypes[0]]?d.accepts[d.dataTypes[0]]+("*"!==d.dataTypes[0]?", "+Gt+"; q=0.01":""):d.accepts["*"]),d.headers)T.setRequestHeader(h,d.headers[h]);if(d.beforeSend&&(!1===d.beforeSend.call(p,T,d)||u))return T.abort();if(_="abort",y.add(d.complete),T.done(d.success),T.fail(d.error),r=Xt(Kt,d,t,T),r){if(T.readyState=1,l&&g.trigger("ajaxSend",[T,d]),u)return T;d.async&&d.timeout>0&&(a=n.setTimeout((function(){T.abort("timeout")}),d.timeout));try{u=!1,r.send(w,I)}catch(k){if(u)throw k;I(-1,k)}}else I(-1,"No Transport");function I(e,t,s,c){var h,f,w,b,E,_=t;u||(u=!0,a&&n.clearTimeout(a),r=void 0,o=c||"",T.readyState=e>0?4:0,h=e>=200&&e<300||304===e,s&&(b=Zt(d,T,s)),!h&&S.inArray("script",d.dataTypes)>-1&&S.inArray("json",d.dataTypes)<0&&(d.converters["text script"]=function(){}),b=en(d,b,T,h),h?(d.ifModified&&(E=T.getResponseHeader("Last-Modified"),E&&(S.lastModified[i]=E),E=T.getResponseHeader("etag"),E&&(S.etag[i]=E)),204===e||"HEAD"===d.type?_="nocontent":304===e?_="notmodified":(_=b.state,f=b.data,w=b.error,h=!w)):(w=_,!e&&_||(_="error",e<0&&(e=0))),T.status=e,T.statusText=(t||_)+"",h?m.resolveWith(p,[f,_,T]):m.rejectWith(p,[T,_,w]),T.statusCode(v),v=void 0,l&&g.trigger(h?"ajaxSuccess":"ajaxError",[T,d,h?f:w]),y.fireWith(p,[T,_]),l&&(g.trigger("ajaxComplete",[T,d]),--S.active||S.event.trigger("ajaxStop")))}return T},getJSON:function(e,t,n){return S.get(e,t,n,"json")},getScript:function(e,t){return S.get(e,void 0,t,"script")}}),S.each(["get","post"],(function(e,t){S[t]=function(e,n,r,i){return v(n)&&(i=i||r,r=n,n=void 0),S.ajax(S.extend({url:e,type:t,dataType:i,data:n,success:r},S.isPlainObject(e)&&e))}})),S.ajaxPrefilter((function(e){var t;for(t in e.headers)"content-type"===t.toLowerCase()&&(e.contentType=e.headers[t]||"")})),S._evalUrl=function(e,t,n){return S.ajax({url:e,type:"GET",dataType:"script",cache:!0,async:!1,global:!1,converters:{"text script":function(){}},dataFilter:function(e){S.globalEval(e,t,n)}})},S.fn.extend({wrapAll:function(e){var t;return this[0]&&(v(e)&&(e=e.call(this[0])),t=S(e,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&t.insertBefore(this[0]),t.map((function(){var e=this;while(e.firstElementChild)e=e.firstElementChild;return e})).append(this)),this},wrapInner:function(e){return v(e)?this.each((function(t){S(this).wrapInner(e.call(this,t))})):this.each((function(){var t=S(this),n=t.contents();n.length?n.wrapAll(e):t.append(e)}))},wrap:function(e){var t=v(e);return this.each((function(n){S(this).wrapAll(t?e.call(this,n):e)}))},unwrap:function(e){return this.parent(e).not("body").each((function(){S(this).replaceWith(this.childNodes)})),this}}),S.expr.pseudos.hidden=function(e){return!S.expr.pseudos.visible(e)},S.expr.pseudos.visible=function(e){return!!(e.offsetWidth||e.offsetHeight||e.getClientRects().length)},S.ajaxSettings.xhr=function(){try{return new n.XMLHttpRequest}catch(e){}};var tn={0:200,1223:204},nn=S.ajaxSettings.xhr();y.cors=!!nn&&"withCredentials"in nn,y.ajax=nn=!!nn,S.ajaxTransport((function(e){var t,r;if(y.cors||nn&&!e.crossDomain)return{send:function(i,o){var s,a=e.xhr();if(a.open(e.type,e.url,e.async,e.username,e.password),e.xhrFields)for(s in e.xhrFields)a[s]=e.xhrFields[s];for(s in e.mimeType&&a.overrideMimeType&&a.overrideMimeType(e.mimeType),e.crossDomain||i["X-Requested-With"]||(i["X-Requested-With"]="XMLHttpRequest"),i)a.setRequestHeader(s,i[s]);t=function(e){return function(){t&&(t=r=a.onload=a.onerror=a.onabort=a.ontimeout=a.onreadystatechange=null,"abort"===e?a.abort():"error"===e?"number"!==typeof a.status?o(0,"error"):o(a.status,a.statusText):o(tn[a.status]||a.status,a.statusText,"text"!==(a.responseType||"text")||"string"!==typeof a.responseText?{binary:a.response}:{text:a.responseText},a.getAllResponseHeaders()))}},a.onload=t(),r=a.onerror=a.ontimeout=t("error"),void 0!==a.onabort?a.onabort=r:a.onreadystatechange=function(){4===a.readyState&&n.setTimeout((function(){t&&r()}))},t=t("abort");try{a.send(e.hasContent&&e.data||null)}catch(c){if(t)throw c}},abort:function(){t&&t()}}})),S.ajaxPrefilter((function(e){e.crossDomain&&(e.contents.script=!1)})),S.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/\b(?:java|ecma)script\b/},converters:{"text script":function(e){return S.globalEval(e),e}}}),S.ajaxPrefilter("script",(function(e){void 0===e.cache&&(e.cache=!1),e.crossDomain&&(e.type="GET")})),S.ajaxTransport("script",(function(e){var t,n;if(e.crossDomain||e.scriptAttrs)return{send:function(r,i){t=S("<script>").attr(e.scriptAttrs||{}).prop({charset:e.scriptCharset,src:e.url}).on("load error",n=function(e){t.remove(),n=null,e&&i("error"===e.type?404:200,e.type)}),b.head.appendChild(t[0])},abort:function(){n&&n()}}}));var rn=[],on=/(=)\?(?=&|$)|\?\?/;S.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var e=rn.pop()||S.expando+"_"+Rt.guid++;return this[e]=!0,e}}),S.ajaxPrefilter("json jsonp",(function(e,t,r){var i,o,s,a=!1!==e.jsonp&&(on.test(e.url)?"url":"string"===typeof e.data&&0===(e.contentType||"").indexOf("application/x-www-form-urlencoded")&&on.test(e.data)&&"data");if(a||"jsonp"===e.dataTypes[0])return i=e.jsonpCallback=v(e.jsonpCallback)?e.jsonpCallback():e.jsonpCallback,a?e[a]=e[a].replace(on,"$1"+i):!1!==e.jsonp&&(e.url+=(Dt.test(e.url)?"&":"?")+e.jsonp+"="+i),e.converters["script json"]=function(){return s||S.error(i+" was not called"),s[0]},e.dataTypes[0]="json",o=n[i],n[i]=function(){s=arguments},r.always((function(){void 0===o?S(n).removeProp(i):n[i]=o,e[i]&&(e.jsonpCallback=t.jsonpCallback,rn.push(i)),s&&v(o)&&o(s[0]),s=o=void 0})),"script"})),y.createHTMLDocument=function(){var e=b.implementation.createHTMLDocument("").body;return e.innerHTML="<form></form><form></form>",2===e.childNodes.length}(),S.parseHTML=function(e,t,n){return"string"!==typeof e?[]:("boolean"===typeof t&&(n=t,t=!1),t||(y.createHTMLDocument?(t=b.implementation.createHTMLDocument(""),r=t.createElement("base"),r.href=b.location.href,t.head.appendChild(r)):t=b),i=R.exec(e),o=!n&&[],i?[t.createElement(i[1])]:(i=Se([e],t,o),o&&o.length&&S(o).remove(),S.merge([],i.childNodes)));var r,i,o},S.fn.load=function(e,t,n){var r,i,o,s=this,a=e.indexOf(" ");return a>-1&&(r=St(e.slice(a)),e=e.slice(0,a)),v(t)?(n=t,t=void 0):t&&"object"===typeof t&&(i="POST"),s.length>0&&S.ajax({url:e,type:i||"GET",dataType:"html",data:t}).done((function(e){o=arguments,s.html(r?S("<div>").append(S.parseHTML(e)).find(r):e)})).always(n&&function(e,t){s.each((function(){n.apply(this,o||[e.responseText,t,e])}))}),this},S.expr.pseudos.animated=function(e){return S.grep(S.timers,(function(t){return e===t.elem})).length},S.offset={setOffset:function(e,t,n){var r,i,o,s,a,c,u,l=S.css(e,"position"),h=S(e),f={};"static"===l&&(e.style.position="relative"),a=h.offset(),o=S.css(e,"top"),c=S.css(e,"left"),u=("absolute"===l||"fixed"===l)&&(o+c).indexOf("auto")>-1,u?(r=h.position(),s=r.top,i=r.left):(s=parseFloat(o)||0,i=parseFloat(c)||0),v(t)&&(t=t.call(e,n,S.extend({},a))),null!=t.top&&(f.top=t.top-a.top+s),null!=t.left&&(f.left=t.left-a.left+i),"using"in t?t.using.call(e,f):h.css(f)}},S.fn.extend({offset:function(e){if(arguments.length)return void 0===e?this:this.each((function(t){S.offset.setOffset(this,e,t)}));var t,n,r=this[0];return r?r.getClientRects().length?(t=r.getBoundingClientRect(),n=r.ownerDocument.defaultView,{top:t.top+n.pageYOffset,left:t.left+n.pageXOffset}):{top:0,left:0}:void 0},position:function(){if(this[0]){var e,t,n,r=this[0],i={top:0,left:0};if("fixed"===S.css(r,"position"))t=r.getBoundingClientRect();else{t=this.offset(),n=r.ownerDocument,e=r.offsetParent||n.documentElement;while(e&&(e===n.body||e===n.documentElement)&&"static"===S.css(e,"position"))e=e.parentNode;e&&e!==r&&1===e.nodeType&&(i=S(e).offset(),i.top+=S.css(e,"borderTopWidth",!0),i.left+=S.css(e,"borderLeftWidth",!0))}return{top:t.top-i.top-S.css(r,"marginTop",!0),left:t.left-i.left-S.css(r,"marginLeft",!0)}}},offsetParent:function(){return this.map((function(){var e=this.offsetParent;while(e&&"static"===S.css(e,"position"))e=e.offsetParent;return e||le}))}}),S.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},(function(e,t){var n="pageYOffset"===t;S.fn[e]=function(r){return G(this,(function(e,r,i){var o;if(w(e)?o=e:9===e.nodeType&&(o=e.defaultView),void 0===i)return o?o[t]:e[r];o?o.scrollTo(n?o.pageXOffset:i,n?i:o.pageYOffset):e[r]=i}),e,r,arguments.length)}})),S.each(["top","left"],(function(e,t){S.cssHooks[t]=Xe(y.pixelPosition,(function(e,n){if(n)return n=Qe(e,t),Be.test(n)?S(e).position()[t]+"px":n}))})),S.each({Height:"height",Width:"width"},(function(e,t){S.each({padding:"inner"+e,content:t,"":"outer"+e},(function(n,r){S.fn[r]=function(i,o){var s=arguments.length&&(n||"boolean"!==typeof i),a=n||(!0===i||!0===o?"margin":"border");return G(this,(function(t,n,i){var o;return w(t)?0===r.indexOf("outer")?t["inner"+e]:t.document.documentElement["client"+e]:9===t.nodeType?(o=t.documentElement,Math.max(t.body["scroll"+e],o["scroll"+e],t.body["offset"+e],o["offset"+e],o["client"+e])):void 0===i?S.css(t,n,a):S.style(t,n,i,a)}),t,s?i:void 0,s)}}))})),S.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],(function(e,t){S.fn[t]=function(e){return this.on(t,e)}})),S.fn.extend({bind:function(e,t,n){return this.on(e,null,t,n)},unbind:function(e,t){return this.off(e,null,t)},delegate:function(e,t,n,r){return this.on(t,e,n,r)},undelegate:function(e,t,n){return 1===arguments.length?this.off(e,"**"):this.off(t,e||"**",n)},hover:function(e,t){return this.mouseenter(e).mouseleave(t||e)}}),S.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "),(function(e,t){S.fn[t]=function(e,n){return arguments.length>0?this.on(t,null,e,n):this.trigger(t)}}));var sn=/^[\s\uFEFF\xA0]+|([^\s\uFEFF\xA0])[\s\uFEFF\xA0]+$/g;S.proxy=function(e,t){var n,r,i;if("string"===typeof t&&(n=e[t],t=e,e=n),v(e))return r=c.call(arguments,2),i=function(){return e.apply(t||this,r.concat(c.call(arguments)))},i.guid=e.guid=e.guid||S.guid++,i},S.holdReady=function(e){e?S.readyWait++:S.ready(!0)},S.isArray=Array.isArray,S.parseJSON=JSON.parse,S.nodeName=N,S.isFunction=v,S.isWindow=w,S.camelCase=Y,S.type=T,S.now=Date.now,S.isNumeric=function(e){var t=S.type(e);return("number"===t||"string"===t)&&!isNaN(e-parseFloat(e))},S.trim=function(e){return null==e?"":(e+"").replace(sn,"$1")},r=[],i=function(){return S}.apply(t,r),void 0===i||(e.exports=i);var an=n.jQuery,cn=n.$;return S.noConflict=function(e){return n.$===S&&(n.$=cn),e&&n.jQuery===S&&(n.jQuery=an),S},"undefined"===typeof o&&(n.jQuery=n.$=S),S}))},5812:function(e,t,n){n(7658);var r="function"===typeof Map&&Map.prototype,i=Object.getOwnPropertyDescriptor&&r?Object.getOwnPropertyDescriptor(Map.prototype,"size"):null,o=r&&i&&"function"===typeof i.get?i.get:null,s=r&&Map.prototype.forEach,a="function"===typeof Set&&Set.prototype,c=Object.getOwnPropertyDescriptor&&a?Object.getOwnPropertyDescriptor(Set.prototype,"size"):null,u=a&&c&&"function"===typeof c.get?c.get:null,l=a&&Set.prototype.forEach,h="function"===typeof WeakMap&&WeakMap.prototype,f=h?WeakMap.prototype.has:null,d="function"===typeof WeakSet&&WeakSet.prototype,p=d?WeakSet.prototype.has:null,g="function"===typeof WeakRef&&WeakRef.prototype,m=g?WeakRef.prototype.deref:null,y=Boolean.prototype.valueOf,v=Object.prototype.toString,w=Function.prototype.toString,b=String.prototype.match,E=String.prototype.slice,_=String.prototype.replace,T=String.prototype.toUpperCase,I=String.prototype.toLowerCase,S=RegExp.prototype.test,k=Array.prototype.concat,A=Array.prototype.join,C=Array.prototype.slice,x=Math.floor,O="function"===typeof BigInt?BigInt.prototype.valueOf:null,N=Object.getOwnPropertySymbols,R="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?Symbol.prototype.toString:null,D="function"===typeof Symbol&&"object"===typeof Symbol.iterator,P="function"===typeof Symbol&&Symbol.toStringTag&&(typeof Symbol.toStringTag===D||"symbol")?Symbol.toStringTag:null,L=Object.prototype.propertyIsEnumerable,M=("function"===typeof Reflect?Reflect.getPrototypeOf:Object.getPrototypeOf)||([].__proto__===Array.prototype?function(e){return e.__proto__}:null);function j(e,t){if(e===1/0||e===-1/0||e!==e||e&&e>-1e3&&e<1e3||S.call(/e/,t))return t;var n=/[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;if("number"===typeof e){var r=e<0?-x(-e):x(e);if(r!==e){var i=String(r),o=E.call(t,i.length+1);return _.call(i,n,"$&_")+"."+_.call(_.call(o,/([0-9]{3})/g,"$&_"),/_$/,"")}}return _.call(t,n,"$&_")}var F=n(4654),U=F.custom,V=Q(U)?U:null;function q(e,t,n){var r="double"===(n.quoteStyle||t)?'"':"'";return r+e+r}function $(e){return _.call(String(e),/"/g,"&quot;")}function B(e){return"[object Array]"===ee(e)&&(!P||!("object"===typeof e&&P in e))}function H(e){return"[object Date]"===ee(e)&&(!P||!("object"===typeof e&&P in e))}function z(e){return"[object RegExp]"===ee(e)&&(!P||!("object"===typeof e&&P in e))}function W(e){return"[object Error]"===ee(e)&&(!P||!("object"===typeof e&&P in e))}function K(e){return"[object String]"===ee(e)&&(!P||!("object"===typeof e&&P in e))}function G(e){return"[object Number]"===ee(e)&&(!P||!("object"===typeof e&&P in e))}function J(e){return"[object Boolean]"===ee(e)&&(!P||!("object"===typeof e&&P in e))}function Q(e){if(D)return e&&"object"===typeof e&&e instanceof Symbol;if("symbol"===typeof e)return!0;if(!e||"object"!==typeof e||!R)return!1;try{return R.call(e),!0}catch(t){}return!1}function X(e){if(!e||"object"!==typeof e||!O)return!1;try{return O.call(e),!0}catch(t){}return!1}e.exports=function e(t,n,r,i){var a=n||{};if(Z(a,"quoteStyle")&&"single"!==a.quoteStyle&&"double"!==a.quoteStyle)throw new TypeError('option "quoteStyle" must be "single" or "double"');if(Z(a,"maxStringLength")&&("number"===typeof a.maxStringLength?a.maxStringLength<0&&a.maxStringLength!==1/0:null!==a.maxStringLength))throw new TypeError('option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`');var c=!Z(a,"customInspect")||a.customInspect;if("boolean"!==typeof c&&"symbol"!==c)throw new TypeError("option \"customInspect\", if provided, must be `true`, `false`, or `'symbol'`");if(Z(a,"indent")&&null!==a.indent&&"\t"!==a.indent&&!(parseInt(a.indent,10)===a.indent&&a.indent>0))throw new TypeError('option "indent" must be "\\t", an integer > 0, or `null`');if(Z(a,"numericSeparator")&&"boolean"!==typeof a.numericSeparator)throw new TypeError('option "numericSeparator", if provided, must be `true` or `false`');var h=a.numericSeparator;if("undefined"===typeof t)return"undefined";if(null===t)return"null";if("boolean"===typeof t)return t?"true":"false";if("string"===typeof t)return ue(t,a);if("number"===typeof t){if(0===t)return 1/0/t>0?"0":"-0";var f=String(t);return h?j(t,f):f}if("bigint"===typeof t){var d=String(t)+"n";return h?j(t,d):d}var p="undefined"===typeof a.depth?5:a.depth;if("undefined"===typeof r&&(r=0),r>=p&&p>0&&"object"===typeof t)return B(t)?"[Array]":"[Object]";var g=ge(a,r);if("undefined"===typeof i)i=[];else if(ne(i,t)>=0)return"[Circular]";function m(t,n,o){if(n&&(i=C.call(i),i.push(n)),o){var s={depth:a.depth};return Z(a,"quoteStyle")&&(s.quoteStyle=a.quoteStyle),e(t,s,r+1,i)}return e(t,a,r+1,i)}if("function"===typeof t&&!z(t)){var v=te(t),w=ye(t,m);return"[Function"+(v?": "+v:" (anonymous)")+"]"+(w.length>0?" { "+A.call(w,", ")+" }":"")}if(Q(t)){var b=D?_.call(String(t),/^(Symbol\(.*\))_[^)]*$/,"$1"):R.call(t);return"object"!==typeof t||D?b:he(b)}if(ce(t)){for(var T="<"+I.call(String(t.nodeName)),S=t.attributes||[],x=0;x<S.length;x++)T+=" "+S[x].name+"="+q($(S[x].value),"double",a);return T+=">",t.childNodes&&t.childNodes.length&&(T+="..."),T+="</"+I.call(String(t.nodeName))+">",T}if(B(t)){if(0===t.length)return"[]";var N=ye(t,m);return g&&!pe(N)?"["+me(N,g)+"]":"[ "+A.call(N,", ")+" ]"}if(W(t)){var U=ye(t,m);return"cause"in Error.prototype||!("cause"in t)||L.call(t,"cause")?0===U.length?"["+String(t)+"]":"{ ["+String(t)+"] "+A.call(U,", ")+" }":"{ ["+String(t)+"] "+A.call(k.call("[cause]: "+m(t.cause),U),", ")+" }"}if("object"===typeof t&&c){if(V&&"function"===typeof t[V]&&F)return F(t,{depth:p-r});if("symbol"!==c&&"function"===typeof t.inspect)return t.inspect()}if(re(t)){var Y=[];return s&&s.call(t,(function(e,n){Y.push(m(n,t,!0)+" => "+m(e,t))})),de("Map",o.call(t),Y,g)}if(se(t)){var le=[];return l&&l.call(t,(function(e){le.push(m(e,t))})),de("Set",u.call(t),le,g)}if(ie(t))return fe("WeakMap");if(ae(t))return fe("WeakSet");if(oe(t))return fe("WeakRef");if(G(t))return he(m(Number(t)));if(X(t))return he(m(O.call(t)));if(J(t))return he(y.call(t));if(K(t))return he(m(String(t)));if(!H(t)&&!z(t)){var ve=ye(t,m),we=M?M(t)===Object.prototype:t instanceof Object||t.constructor===Object,be=t instanceof Object?"":"null prototype",Ee=!we&&P&&Object(t)===t&&P in t?E.call(ee(t),8,-1):be?"Object":"",_e=we||"function"!==typeof t.constructor?"":t.constructor.name?t.constructor.name+" ":"",Te=_e+(Ee||be?"["+A.call(k.call([],Ee||[],be||[]),": ")+"] ":"");return 0===ve.length?Te+"{}":g?Te+"{"+me(ve,g)+"}":Te+"{ "+A.call(ve,", ")+" }"}return String(t)};var Y=Object.prototype.hasOwnProperty||function(e){return e in this};function Z(e,t){return Y.call(e,t)}function ee(e){return v.call(e)}function te(e){if(e.name)return e.name;var t=b.call(w.call(e),/^function\s*([\w$]+)/);return t?t[1]:null}function ne(e,t){if(e.indexOf)return e.indexOf(t);for(var n=0,r=e.length;n<r;n++)if(e[n]===t)return n;return-1}function re(e){if(!o||!e||"object"!==typeof e)return!1;try{o.call(e);try{u.call(e)}catch(t){return!0}return e instanceof Map}catch(n){}return!1}function ie(e){if(!f||!e||"object"!==typeof e)return!1;try{f.call(e,f);try{p.call(e,p)}catch(t){return!0}return e instanceof WeakMap}catch(n){}return!1}function oe(e){if(!m||!e||"object"!==typeof e)return!1;try{return m.call(e),!0}catch(t){}return!1}function se(e){if(!u||!e||"object"!==typeof e)return!1;try{u.call(e);try{o.call(e)}catch(t){return!0}return e instanceof Set}catch(n){}return!1}function ae(e){if(!p||!e||"object"!==typeof e)return!1;try{p.call(e,p);try{f.call(e,f)}catch(t){return!0}return e instanceof WeakSet}catch(n){}return!1}function ce(e){return!(!e||"object"!==typeof e)&&("undefined"!==typeof HTMLElement&&e instanceof HTMLElement||"string"===typeof e.nodeName&&"function"===typeof e.getAttribute)}function ue(e,t){if(e.length>t.maxStringLength){var n=e.length-t.maxStringLength,r="... "+n+" more character"+(n>1?"s":"");return ue(E.call(e,0,t.maxStringLength),t)+r}var i=_.call(_.call(e,/(['\\])/g,"\\$1"),/[\x00-\x1f]/g,le);return q(i,"single",t)}function le(e){var t=e.charCodeAt(0),n={8:"b",9:"t",10:"n",12:"f",13:"r"}[t];return n?"\\"+n:"\\x"+(t<16?"0":"")+T.call(t.toString(16))}function he(e){return"Object("+e+")"}function fe(e){return e+" { ? }"}function de(e,t,n,r){var i=r?me(n,r):A.call(n,", ");return e+" ("+t+") {"+i+"}"}function pe(e){for(var t=0;t<e.length;t++)if(ne(e[t],"\n")>=0)return!1;return!0}function ge(e,t){var n;if("\t"===e.indent)n="\t";else{if(!("number"===typeof e.indent&&e.indent>0))return null;n=A.call(Array(e.indent+1)," ")}return{base:n,prev:A.call(Array(t+1),n)}}function me(e,t){if(0===e.length)return"";var n="\n"+t.prev+t.base;return n+A.call(e,","+n)+"\n"+t.prev}function ye(e,t){var n=B(e),r=[];if(n){r.length=e.length;for(var i=0;i<e.length;i++)r[i]=Z(e,i)?t(e[i],e):""}var o,s="function"===typeof N?N(e):[];if(D){o={};for(var a=0;a<s.length;a++)o["$"+s[a]]=s[a]}for(var c in e)Z(e,c)&&(n&&String(Number(c))===c&&c<e.length||D&&o["$"+c]instanceof Symbol||(S.call(/[^\w$]/,c)?r.push(t(c,e)+": "+t(e[c],e)):r.push(c+": "+t(e[c],e))));if("function"===typeof N)for(var u=0;u<s.length;u++)L.call(e,s[u])&&r.push("["+t(s[u])+"]: "+t(e[s[u]],e));return r}},9734:function(e){"use strict";var t=String.prototype.replace,n=/%20/g,r={RFC1738:"RFC1738",RFC3986:"RFC3986"};e.exports={default:r.RFC3986,formatters:{RFC1738:function(e){return t.call(e,n,"+")},RFC3986:function(e){return String(e)}},RFC1738:r.RFC1738,RFC3986:r.RFC3986}},5410:function(e,t,n){"use strict";var r=n(6383),i=n(5730),o=n(9734);e.exports={formats:o,parse:i,stringify:r}},5730:function(e,t,n){"use strict";n(7658);var r=n(2898),i=Object.prototype.hasOwnProperty,o=Array.isArray,s={allowDots:!1,allowPrototypes:!1,allowSparse:!1,arrayLimit:20,charset:"utf-8",charsetSentinel:!1,comma:!1,decoder:r.decode,delimiter:"&",depth:5,ignoreQueryPrefix:!1,interpretNumericEntities:!1,parameterLimit:1e3,parseArrays:!0,plainObjects:!1,strictNullHandling:!1},a=function(e){return e.replace(/&#(\d+);/g,(function(e,t){return String.fromCharCode(parseInt(t,10))}))},c=function(e,t){return e&&"string"===typeof e&&t.comma&&e.indexOf(",")>-1?e.split(","):e},u="utf8=%26%2310003%3B",l="utf8=%E2%9C%93",h=function(e,t){var n,h={},f=t.ignoreQueryPrefix?e.replace(/^\?/,""):e,d=t.parameterLimit===1/0?void 0:t.parameterLimit,p=f.split(t.delimiter,d),g=-1,m=t.charset;if(t.charsetSentinel)for(n=0;n<p.length;++n)0===p[n].indexOf("utf8=")&&(p[n]===l?m="utf-8":p[n]===u&&(m="iso-8859-1"),g=n,n=p.length);for(n=0;n<p.length;++n)if(n!==g){var y,v,w=p[n],b=w.indexOf("]="),E=-1===b?w.indexOf("="):b+1;-1===E?(y=t.decoder(w,s.decoder,m,"key"),v=t.strictNullHandling?null:""):(y=t.decoder(w.slice(0,E),s.decoder,m,"key"),v=r.maybeMap(c(w.slice(E+1),t),(function(e){return t.decoder(e,s.decoder,m,"value")}))),v&&t.interpretNumericEntities&&"iso-8859-1"===m&&(v=a(v)),w.indexOf("[]=")>-1&&(v=o(v)?[v]:v),i.call(h,y)?h[y]=r.combine(h[y],v):h[y]=v}return h},f=function(e,t,n,r){for(var i=r?t:c(t,n),o=e.length-1;o>=0;--o){var s,a=e[o];if("[]"===a&&n.parseArrays)s=[].concat(i);else{s=n.plainObjects?Object.create(null):{};var u="["===a.charAt(0)&&"]"===a.charAt(a.length-1)?a.slice(1,-1):a,l=parseInt(u,10);n.parseArrays||""!==u?!isNaN(l)&&a!==u&&String(l)===u&&l>=0&&n.parseArrays&&l<=n.arrayLimit?(s=[],s[l]=i):"__proto__"!==u&&(s[u]=i):s={0:i}}i=s}return i},d=function(e,t,n,r){if(e){var o=n.allowDots?e.replace(/\.([^.[]+)/g,"[$1]"):e,s=/(\[[^[\]]*])/,a=/(\[[^[\]]*])/g,c=n.depth>0&&s.exec(o),u=c?o.slice(0,c.index):o,l=[];if(u){if(!n.plainObjects&&i.call(Object.prototype,u)&&!n.allowPrototypes)return;l.push(u)}var h=0;while(n.depth>0&&null!==(c=a.exec(o))&&h<n.depth){if(h+=1,!n.plainObjects&&i.call(Object.prototype,c[1].slice(1,-1))&&!n.allowPrototypes)return;l.push(c[1])}return c&&l.push("["+o.slice(c.index)+"]"),f(l,t,n,r)}},p=function(e){if(!e)return s;if(null!==e.decoder&&void 0!==e.decoder&&"function"!==typeof e.decoder)throw new TypeError("Decoder has to be a function.");if("undefined"!==typeof e.charset&&"utf-8"!==e.charset&&"iso-8859-1"!==e.charset)throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");var t="undefined"===typeof e.charset?s.charset:e.charset;return{allowDots:"undefined"===typeof e.allowDots?s.allowDots:!!e.allowDots,allowPrototypes:"boolean"===typeof e.allowPrototypes?e.allowPrototypes:s.allowPrototypes,allowSparse:"boolean"===typeof e.allowSparse?e.allowSparse:s.allowSparse,arrayLimit:"number"===typeof e.arrayLimit?e.arrayLimit:s.arrayLimit,charset:t,charsetSentinel:"boolean"===typeof e.charsetSentinel?e.charsetSentinel:s.charsetSentinel,comma:"boolean"===typeof e.comma?e.comma:s.comma,decoder:"function"===typeof e.decoder?e.decoder:s.decoder,delimiter:"string"===typeof e.delimiter||r.isRegExp(e.delimiter)?e.delimiter:s.delimiter,depth:"number"===typeof e.depth||!1===e.depth?+e.depth:s.depth,ignoreQueryPrefix:!0===e.ignoreQueryPrefix,interpretNumericEntities:"boolean"===typeof e.interpretNumericEntities?e.interpretNumericEntities:s.interpretNumericEntities,parameterLimit:"number"===typeof e.parameterLimit?e.parameterLimit:s.parameterLimit,parseArrays:!1!==e.parseArrays,plainObjects:"boolean"===typeof e.plainObjects?e.plainObjects:s.plainObjects,strictNullHandling:"boolean"===typeof e.strictNullHandling?e.strictNullHandling:s.strictNullHandling}};e.exports=function(e,t){var n=p(t);if(""===e||null===e||"undefined"===typeof e)return n.plainObjects?Object.create(null):{};for(var i="string"===typeof e?h(e,n):e,o=n.plainObjects?Object.create(null):{},s=Object.keys(i),a=0;a<s.length;++a){var c=s[a],u=d(c,i[c],n,"string"===typeof e);o=r.merge(o,u,n)}return!0===n.allowSparse?o:r.compact(o)}},6383:function(e,t,n){"use strict";n(7658);var r=n(4525),i=n(2898),o=n(9734),s=Object.prototype.hasOwnProperty,a={brackets:function(e){return e+"[]"},comma:"comma",indices:function(e,t){return e+"["+t+"]"},repeat:function(e){return e}},c=Array.isArray,u=Array.prototype.push,l=function(e,t){u.apply(e,c(t)?t:[t])},h=Date.prototype.toISOString,f=o["default"],d={addQueryPrefix:!1,allowDots:!1,charset:"utf-8",charsetSentinel:!1,delimiter:"&",encode:!0,encoder:i.encode,encodeValuesOnly:!1,format:f,formatter:o.formatters[f],indices:!1,serializeDate:function(e){return h.call(e)},skipNulls:!1,strictNullHandling:!1},p=function(e){return"string"===typeof e||"number"===typeof e||"boolean"===typeof e||"symbol"===typeof e||"bigint"===typeof e},g={},m=function e(t,n,o,s,a,u,h,f,m,y,v,w,b,E,_,T){var I=t,S=T,k=0,A=!1;while(void 0!==(S=S.get(g))&&!A){var C=S.get(t);if(k+=1,"undefined"!==typeof C){if(C===k)throw new RangeError("Cyclic object value");A=!0}"undefined"===typeof S.get(g)&&(k=0)}if("function"===typeof f?I=f(n,I):I instanceof Date?I=v(I):"comma"===o&&c(I)&&(I=i.maybeMap(I,(function(e){return e instanceof Date?v(e):e}))),null===I){if(a)return h&&!E?h(n,d.encoder,_,"key",w):n;I=""}if(p(I)||i.isBuffer(I)){if(h){var x=E?n:h(n,d.encoder,_,"key",w);return[b(x)+"="+b(h(I,d.encoder,_,"value",w))]}return[b(n)+"="+b(String(I))]}var O,N=[];if("undefined"===typeof I)return N;if("comma"===o&&c(I))E&&h&&(I=i.maybeMap(I,h)),O=[{value:I.length>0?I.join(",")||null:void 0}];else if(c(f))O=f;else{var R=Object.keys(I);O=m?R.sort(m):R}for(var D=s&&c(I)&&1===I.length?n+"[]":n,P=0;P<O.length;++P){var L=O[P],M="object"===typeof L&&"undefined"!==typeof L.value?L.value:I[L];if(!u||null!==M){var j=c(I)?"function"===typeof o?o(D,L):D:D+(y?"."+L:"["+L+"]");T.set(t,k);var F=r();F.set(g,T),l(N,e(M,j,o,s,a,u,"comma"===o&&E&&c(I)?null:h,f,m,y,v,w,b,E,_,F))}}return N},y=function(e){if(!e)return d;if(null!==e.encoder&&"undefined"!==typeof e.encoder&&"function"!==typeof e.encoder)throw new TypeError("Encoder has to be a function.");var t=e.charset||d.charset;if("undefined"!==typeof e.charset&&"utf-8"!==e.charset&&"iso-8859-1"!==e.charset)throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");var n=o["default"];if("undefined"!==typeof e.format){if(!s.call(o.formatters,e.format))throw new TypeError("Unknown format option provided.");n=e.format}var r=o.formatters[n],i=d.filter;return("function"===typeof e.filter||c(e.filter))&&(i=e.filter),{addQueryPrefix:"boolean"===typeof e.addQueryPrefix?e.addQueryPrefix:d.addQueryPrefix,allowDots:"undefined"===typeof e.allowDots?d.allowDots:!!e.allowDots,charset:t,charsetSentinel:"boolean"===typeof e.charsetSentinel?e.charsetSentinel:d.charsetSentinel,delimiter:"undefined"===typeof e.delimiter?d.delimiter:e.delimiter,encode:"boolean"===typeof e.encode?e.encode:d.encode,encoder:"function"===typeof e.encoder?e.encoder:d.encoder,encodeValuesOnly:"boolean"===typeof e.encodeValuesOnly?e.encodeValuesOnly:d.encodeValuesOnly,filter:i,format:n,formatter:r,serializeDate:"function"===typeof e.serializeDate?e.serializeDate:d.serializeDate,skipNulls:"boolean"===typeof e.skipNulls?e.skipNulls:d.skipNulls,sort:"function"===typeof e.sort?e.sort:null,strictNullHandling:"boolean"===typeof e.strictNullHandling?e.strictNullHandling:d.strictNullHandling}};e.exports=function(e,t){var n,i,o=e,s=y(t);"function"===typeof s.filter?(i=s.filter,o=i("",o)):c(s.filter)&&(i=s.filter,n=i);var u,h=[];if("object"!==typeof o||null===o)return"";u=t&&t.arrayFormat in a?t.arrayFormat:t&&"indices"in t?t.indices?"indices":"repeat":"indices";var f=a[u];if(t&&"commaRoundTrip"in t&&"boolean"!==typeof t.commaRoundTrip)throw new TypeError("`commaRoundTrip` must be a boolean, or absent");var d="comma"===f&&t&&t.commaRoundTrip;n||(n=Object.keys(o)),s.sort&&n.sort(s.sort);for(var p=r(),g=0;g<n.length;++g){var v=n[g];s.skipNulls&&null===o[v]||l(h,m(o[v],v,f,d,s.strictNullHandling,s.skipNulls,s.encode?s.encoder:null,s.filter,s.sort,s.allowDots,s.serializeDate,s.format,s.formatter,s.encodeValuesOnly,s.charset,p))}var w=h.join(s.delimiter),b=!0===s.addQueryPrefix?"?":"";return s.charsetSentinel&&("iso-8859-1"===s.charset?b+="utf8=%26%2310003%3B&":b+="utf8=%E2%9C%93&"),w.length>0?b+w:""}},2898:function(e,t,n){"use strict";n(7658);var r=n(9734),i=Object.prototype.hasOwnProperty,o=Array.isArray,s=function(){for(var e=[],t=0;t<256;++t)e.push("%"+((t<16?"0":"")+t.toString(16)).toUpperCase());return e}(),a=function(e){while(e.length>1){var t=e.pop(),n=t.obj[t.prop];if(o(n)){for(var r=[],i=0;i<n.length;++i)"undefined"!==typeof n[i]&&r.push(n[i]);t.obj[t.prop]=r}}},c=function(e,t){for(var n=t&&t.plainObjects?Object.create(null):{},r=0;r<e.length;++r)"undefined"!==typeof e[r]&&(n[r]=e[r]);return n},u=function e(t,n,r){if(!n)return t;if("object"!==typeof n){if(o(t))t.push(n);else{if(!t||"object"!==typeof t)return[t,n];(r&&(r.plainObjects||r.allowPrototypes)||!i.call(Object.prototype,n))&&(t[n]=!0)}return t}if(!t||"object"!==typeof t)return[t].concat(n);var s=t;return o(t)&&!o(n)&&(s=c(t,r)),o(t)&&o(n)?(n.forEach((function(n,o){if(i.call(t,o)){var s=t[o];s&&"object"===typeof s&&n&&"object"===typeof n?t[o]=e(s,n,r):t.push(n)}else t[o]=n})),t):Object.keys(n).reduce((function(t,o){var s=n[o];return i.call(t,o)?t[o]=e(t[o],s,r):t[o]=s,t}),s)},l=function(e,t){return Object.keys(t).reduce((function(e,n){return e[n]=t[n],e}),e)},h=function(e,t,n){var r=e.replace(/\+/g," ");if("iso-8859-1"===n)return r.replace(/%[0-9a-f]{2}/gi,unescape);try{return decodeURIComponent(r)}catch(i){return r}},f=function(e,t,n,i,o){if(0===e.length)return e;var a=e;if("symbol"===typeof e?a=Symbol.prototype.toString.call(e):"string"!==typeof e&&(a=String(e)),"iso-8859-1"===n)return escape(a).replace(/%u[0-9a-f]{4}/gi,(function(e){return"%26%23"+parseInt(e.slice(2),16)+"%3B"}));for(var c="",u=0;u<a.length;++u){var l=a.charCodeAt(u);45===l||46===l||95===l||126===l||l>=48&&l<=57||l>=65&&l<=90||l>=97&&l<=122||o===r.RFC1738&&(40===l||41===l)?c+=a.charAt(u):l<128?c+=s[l]:l<2048?c+=s[192|l>>6]+s[128|63&l]:l<55296||l>=57344?c+=s[224|l>>12]+s[128|l>>6&63]+s[128|63&l]:(u+=1,l=65536+((1023&l)<<10|1023&a.charCodeAt(u)),c+=s[240|l>>18]+s[128|l>>12&63]+s[128|l>>6&63]+s[128|63&l])}return c},d=function(e){for(var t=[{obj:{o:e},prop:"o"}],n=[],r=0;r<t.length;++r)for(var i=t[r],o=i.obj[i.prop],s=Object.keys(o),c=0;c<s.length;++c){var u=s[c],l=o[u];"object"===typeof l&&null!==l&&-1===n.indexOf(l)&&(t.push({obj:o,prop:u}),n.push(l))}return a(t),e},p=function(e){return"[object RegExp]"===Object.prototype.toString.call(e)},g=function(e){return!(!e||"object"!==typeof e)&&!!(e.constructor&&e.constructor.isBuffer&&e.constructor.isBuffer(e))},m=function(e,t){return[].concat(e,t)},y=function(e,t){if(o(e)){for(var n=[],r=0;r<e.length;r+=1)n.push(t(e[r]));return n}return t(e)};e.exports={arrayToObject:c,assign:l,combine:m,compact:d,decode:h,encode:f,isBuffer:g,isRegExp:p,maybeMap:y,merge:u}},5431:function(e,t,n){"use strict";n.d(t,{z:function(){return o}});var r,i=function(){return Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/))};function o(e,t){void 0===t&&(t={});var n=t.registrationOptions;void 0===n&&(n={}),delete t.registrationOptions;var o=function(e){var n=[],r=arguments.length-1;while(r-- >0)n[r]=arguments[r+1];t&&t[e]&&t[e].apply(t,n)};"serviceWorker"in navigator&&r.then((function(){i()?(c(e,o,n),navigator.serviceWorker.ready.then((function(e){o("ready",e)})).catch((function(e){return s(o,e)}))):(a(e,o,n),navigator.serviceWorker.ready.then((function(e){o("ready",e)})).catch((function(e){return s(o,e)})))}))}function s(e,t){navigator.onLine||e("offline"),e("error",t)}function a(e,t,n){navigator.serviceWorker.register(e,n).then((function(e){t("registered",e),e.waiting?t("updated",e):e.onupdatefound=function(){t("updatefound",e);var n=e.installing;n.onstatechange=function(){"installed"===n.state&&(navigator.serviceWorker.controller?t("updated",e):t("cached",e))}}})).catch((function(e){return s(t,e)}))}function c(e,t,n){fetch(e).then((function(r){404===r.status?(t("error",new Error("Service worker not found at "+e)),u()):-1===r.headers.get("content-type").indexOf("javascript")?(t("error",new Error("Expected "+e+" to have javascript content-type, but received "+r.headers.get("content-type"))),u()):a(e,t,n)})).catch((function(e){return s(t,e)}))}function u(){"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){return s(emit,e)}))}"undefined"!==typeof window&&(r="undefined"!==typeof Promise?new Promise((function(e){return window.addEventListener("load",e)})):{then:function(e){return window.addEventListener("load",e)}})},4525:function(e,t,n){"use strict";var r=n(8692),i=n(5477),o=n(5812),s=r("%TypeError%"),a=r("%WeakMap%",!0),c=r("%Map%",!0),u=i("WeakMap.prototype.get",!0),l=i("WeakMap.prototype.set",!0),h=i("WeakMap.prototype.has",!0),f=i("Map.prototype.get",!0),d=i("Map.prototype.set",!0),p=i("Map.prototype.has",!0),g=function(e,t){for(var n,r=e;null!==(n=r.next);r=n)if(n.key===t)return r.next=n.next,n.next=e.next,e.next=n,n},m=function(e,t){var n=g(e,t);return n&&n.value},y=function(e,t,n){var r=g(e,t);r?r.value=n:e.next={key:t,next:e.next,value:n}},v=function(e,t){return!!g(e,t)};e.exports=function(){var e,t,n,r={assert:function(e){if(!r.has(e))throw new s("Side channel does not contain "+o(e))},get:function(r){if(a&&r&&("object"===typeof r||"function"===typeof r)){if(e)return u(e,r)}else if(c){if(t)return f(t,r)}else if(n)return m(n,r)},has:function(r){if(a&&r&&("object"===typeof r||"function"===typeof r)){if(e)return h(e,r)}else if(c){if(t)return p(t,r)}else if(n)return v(n,r);return!1},set:function(r,i){a&&r&&("object"===typeof r||"function"===typeof r)?(e||(e=new a),l(e,r,i)):c?(t||(t=new c),d(t,r,i)):(n||(n={key:{},next:null}),y(n,r,i))}};return r}},89:function(e,t){"use strict";t.Z=(e,t)=>{const n=e.__vccOpts||e;for(const[r,i]of t)n[r]=i;return n}},4024:function(e,t,n){"use strict";e.exports=n.p+"img/error-icon.c5bc41dd.svg"},1121:function(e,t,n){"use strict";e.exports=n.p+"img/info-locked-icon.0b9144cc.svg"},8311:function(e,t,n){"use strict";e.exports=n.p+"img/info-unlocked-icon.1ea710d7.svg"},4856:function(e,t,n){"use strict";e.exports=n.p+"img/popup-out.733b7d2b.svg"},3653:function(e,t,n){"use strict";e.exports=n.p+"img/success-icon.53e866c5.svg"},6264:function(e,t,n){"use strict";e.exports=n.p+"img/unimplemented-icon.5a21c0ed.svg"},1250:function(e,t,n){"use strict";e.exports=n.p+"img/warning-icon.5869cd08.svg"},9684:function(e,t,n){"use strict";n.d(t,{Jn:function(){return K},KN:function(){return Q},Mq:function(){return J},Xd:function(){return $},ZF:function(){return G},qX:function(){return B}});n(7658);var r=n(7142),i=n(5168),o=n(223),s=n(3831);
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class a{constructor(e){this.container=e}getPlatformInfoString(){const e=this.container.getProviders();return e.map((e=>{if(c(e)){const t=e.getImmediate();return`${t.library}/${t.version}`}return null})).filter((e=>e)).join(" ")}}function c(e){const t=e.getComponent();return"VERSION"===(null===t||void 0===t?void 0:t.type)}const u="@firebase/app",l="0.9.4",h=new i.Yd("@firebase/app"),f="@firebase/app-compat",d="@firebase/analytics-compat",p="@firebase/analytics",g="@firebase/app-check-compat",m="@firebase/app-check",y="@firebase/auth",v="@firebase/auth-compat",w="@firebase/database",b="@firebase/database-compat",E="@firebase/functions",_="@firebase/functions-compat",T="@firebase/installations",I="@firebase/installations-compat",S="@firebase/messaging",k="@firebase/messaging-compat",A="@firebase/performance",C="@firebase/performance-compat",x="@firebase/remote-config",O="@firebase/remote-config-compat",N="@firebase/storage",R="@firebase/storage-compat",D="@firebase/firestore",P="@firebase/firestore-compat",L="firebase",M="9.17.2",j="[DEFAULT]",F={[u]:"fire-core",[f]:"fire-core-compat",[p]:"fire-analytics",[d]:"fire-analytics-compat",[m]:"fire-app-check",[g]:"fire-app-check-compat",[y]:"fire-auth",[v]:"fire-auth-compat",[w]:"fire-rtdb",[b]:"fire-rtdb-compat",[E]:"fire-fn",[_]:"fire-fn-compat",[T]:"fire-iid",[I]:"fire-iid-compat",[S]:"fire-fcm",[k]:"fire-fcm-compat",[A]:"fire-perf",[C]:"fire-perf-compat",[x]:"fire-rc",[O]:"fire-rc-compat",[N]:"fire-gcs",[R]:"fire-gcs-compat",[D]:"fire-fst",[P]:"fire-fst-compat","fire-js":"fire-js",[L]:"fire-js-all"},U=new Map,V=new Map;function q(e,t){try{e.container.addComponent(t)}catch(n){h.debug(`Component ${t.name} failed to register with FirebaseApp ${e.name}`,n)}}function $(e){const t=e.name;if(V.has(t))return h.debug(`There were multiple attempts to register component ${t}.`),!1;V.set(t,e);for(const n of U.values())q(n,e);return!0}function B(e,t){const n=e.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),e.container.getProvider(t)}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const H={["no-app"]:"No Firebase App '{$appName}' has been created - call Firebase App.initializeApp()",["bad-app-name"]:"Illegal App name: '{$appName}",["duplicate-app"]:"Firebase App named '{$appName}' already exists with different options or config",["app-deleted"]:"Firebase App named '{$appName}' already deleted",["no-options"]:"Need to provide options, when not being deployed to hosting via source.",["invalid-app-argument"]:"firebase.{$appName}() takes either no argument or a Firebase App instance.",["invalid-log-argument"]:"First argument to `onLog` must be null or a function.",["idb-open"]:"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.",["idb-get"]:"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.",["idb-set"]:"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.",["idb-delete"]:"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}."},z=new o.LL("app","Firebase",H);
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class W{constructor(e,t,n){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=n,this.container.addComponent(new r.wA("app",(()=>this),"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw z.create("app-deleted",{appName:this._name})}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const K=M;function G(e,t={}){let n=e;if("object"!==typeof t){const e=t;t={name:e}}const i=Object.assign({name:j,automaticDataCollectionEnabled:!1},t),s=i.name;if("string"!==typeof s||!s)throw z.create("bad-app-name",{appName:String(s)});if(n||(n=(0,o.aH)()),!n)throw z.create("no-options");const a=U.get(s);if(a){if((0,o.vZ)(n,a.options)&&(0,o.vZ)(i,a.config))return a;throw z.create("duplicate-app",{appName:s})}const c=new r.H0(s);for(const r of V.values())c.addComponent(r);const u=new W(n,i,c);return U.set(s,u),u}function J(e=j){const t=U.get(e);if(!t&&e===j)return G();if(!t)throw z.create("no-app",{appName:e});return t}function Q(e,t,n){var i;let o=null!==(i=F[e])&&void 0!==i?i:e;n&&(o+=`-${n}`);const s=o.match(/\s|\//),a=t.match(/\s|\//);if(s||a){const e=[`Unable to register library "${o}" with version "${t}":`];return s&&e.push(`library name "${o}" contains illegal characters (whitespace or "/")`),s&&a&&e.push("and"),a&&e.push(`version name "${t}" contains illegal characters (whitespace or "/")`),void h.warn(e.join(" "))}$(new r.wA(`${o}-version`,(()=>({library:o,version:t})),"VERSION"))}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const X="firebase-heartbeat-database",Y=1,Z="firebase-heartbeat-store";let ee=null;function te(){return ee||(ee=(0,s.X3)(X,Y,{upgrade:(e,t)=>{switch(t){case 0:e.createObjectStore(Z)}}}).catch((e=>{throw z.create("idb-open",{originalErrorMessage:e.message})}))),ee}async function ne(e){try{const t=await te();return t.transaction(Z).objectStore(Z).get(ie(e))}catch(t){if(t instanceof o.ZR)h.warn(t.message);else{const e=z.create("idb-get",{originalErrorMessage:null===t||void 0===t?void 0:t.message});h.warn(e.message)}}}async function re(e,t){try{const n=await te(),r=n.transaction(Z,"readwrite"),i=r.objectStore(Z);return await i.put(t,ie(e)),r.done}catch(n){if(n instanceof o.ZR)h.warn(n.message);else{const e=z.create("idb-set",{originalErrorMessage:null===n||void 0===n?void 0:n.message});h.warn(e.message)}}}function ie(e){return`${e.name}!${e.options.appId}`}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const oe=1024,se=2592e6;class ae{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new le(t),this._heartbeatsCachePromise=this._storage.read().then((e=>(this._heartbeatsCache=e,e)))}async triggerHeartbeat(){const e=this.container.getProvider("platform-logger").getImmediate(),t=e.getPlatformInfoString(),n=ce();if(null===this._heartbeatsCache&&(this._heartbeatsCache=await this._heartbeatsCachePromise),this._heartbeatsCache.lastSentHeartbeatDate!==n&&!this._heartbeatsCache.heartbeats.some((e=>e.date===n)))return this._heartbeatsCache.heartbeats.push({date:n,agent:t}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter((e=>{const t=new Date(e.date).valueOf(),n=Date.now();return n-t<=se})),this._storage.overwrite(this._heartbeatsCache)}async getHeartbeatsHeader(){if(null===this._heartbeatsCache&&await this._heartbeatsCachePromise,null===this._heartbeatsCache||0===this._heartbeatsCache.heartbeats.length)return"";const e=ce(),{heartbeatsToSend:t,unsentEntries:n}=ue(this._heartbeatsCache.heartbeats),r=(0,o.L)(JSON.stringify({version:2,heartbeats:t}));return this._heartbeatsCache.lastSentHeartbeatDate=e,n.length>0?(this._heartbeatsCache.heartbeats=n,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),r}}function ce(){const e=new Date;return e.toISOString().substring(0,10)}function ue(e,t=oe){const n=[];let r=e.slice();for(const i of e){const e=n.find((e=>e.agent===i.agent));if(e){if(e.dates.push(i.date),he(n)>t){e.dates.pop();break}}else if(n.push({agent:i.agent,dates:[i.date]}),he(n)>t){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}class le{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return!!(0,o.hl)()&&(0,o.eu)().then((()=>!0)).catch((()=>!1))}async read(){const e=await this._canUseIndexedDBPromise;if(e){const e=await ne(this.app);return e||{heartbeats:[]}}return{heartbeats:[]}}async overwrite(e){var t;const n=await this._canUseIndexedDBPromise;if(n){const n=await this.read();return re(this.app,{lastSentHeartbeatDate:null!==(t=e.lastSentHeartbeatDate)&&void 0!==t?t:n.lastSentHeartbeatDate,heartbeats:e.heartbeats})}}async add(e){var t;const n=await this._canUseIndexedDBPromise;if(n){const n=await this.read();return re(this.app,{lastSentHeartbeatDate:null!==(t=e.lastSentHeartbeatDate)&&void 0!==t?t:n.lastSentHeartbeatDate,heartbeats:[...n.heartbeats,...e.heartbeats]})}}}function he(e){return(0,o.L)(JSON.stringify({version:2,heartbeats:e})).length}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fe(e){$(new r.wA("platform-logger",(e=>new a(e)),"PRIVATE")),$(new r.wA("heartbeat",(e=>new ae(e)),"PRIVATE")),Q(u,l,e),Q(u,l,"esm2017"),Q("fire-js","")}fe("")},7142:function(e,t,n){"use strict";n.d(t,{H0:function(){return u},wA:function(){return i}});var r=n(223);class i{constructor(e,t,n){this.name=e,this.instanceFactory=t,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const o="[DEFAULT]";
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class s{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const e=new r.BH;if(this.instancesDeferred.set(t,e),this.isInitialized(t)||this.shouldAutoInitialize())try{const n=this.getOrInitializeService({instanceIdentifier:t});n&&e.resolve(n)}catch(n){}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;const n=this.normalizeInstanceIdentifier(null===e||void 0===e?void 0:e.identifier),r=null!==(t=null===e||void 0===e?void 0:e.optional)&&void 0!==t&&t;if(!this.isInitialized(n)&&!this.shouldAutoInitialize()){if(r)return null;throw Error(`Service ${this.name} is not available`)}try{return this.getOrInitializeService({instanceIdentifier:n})}catch(i){if(r)return null;throw i}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,this.shouldAutoInitialize()){if(c(e))try{this.getOrInitializeService({instanceIdentifier:o})}catch(t){}for(const[e,n]of this.instancesDeferred.entries()){const r=this.normalizeInstanceIdentifier(e);try{const e=this.getOrInitializeService({instanceIdentifier:r});n.resolve(e)}catch(t){}}}}clearInstance(e=o){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter((e=>"INTERNAL"in e)).map((e=>e.INTERNAL.delete())),...e.filter((e=>"_delete"in e)).map((e=>e._delete()))])}isComponentSet(){return null!=this.component}isInitialized(e=o){return this.instances.has(e)}getOptions(e=o){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,n=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(n))throw Error(`${this.name}(${n}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const r=this.getOrInitializeService({instanceIdentifier:n,options:t});for(const[i,o]of this.instancesDeferred.entries()){const e=this.normalizeInstanceIdentifier(i);n===e&&o.resolve(r)}return r}onInit(e,t){var n;const r=this.normalizeInstanceIdentifier(t),i=null!==(n=this.onInitCallbacks.get(r))&&void 0!==n?n:new Set;i.add(e),this.onInitCallbacks.set(r,i);const o=this.instances.get(r);return o&&e(o,r),()=>{i.delete(e)}}invokeOnInitCallbacks(e,t){const n=this.onInitCallbacks.get(t);if(n)for(const i of n)try{i(e,t)}catch(r){}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let n=this.instances.get(e);if(!n&&this.component&&(n=this.component.instanceFactory(this.container,{instanceIdentifier:a(e),options:t}),this.instances.set(e,n),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(n,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,n)}catch(r){}return n||null}normalizeInstanceIdentifier(e=o){return this.component?this.component.multipleInstances?e:o:e}shouldAutoInitialize(){return!!this.component&&"EXPLICIT"!==this.component.instantiationMode}}function a(e){return e===o?void 0:e}function c(e){return"EAGER"===e.instantiationMode}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class u{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){const t=this.getProvider(e.name);t.isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new s(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}},5168:function(e,t,n){"use strict";n.d(t,{Yd:function(){return u},in:function(){return i}});n(7658);
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const r=[];var i;(function(e){e[e["DEBUG"]=0]="DEBUG",e[e["VERBOSE"]=1]="VERBOSE",e[e["INFO"]=2]="INFO",e[e["WARN"]=3]="WARN",e[e["ERROR"]=4]="ERROR",e[e["SILENT"]=5]="SILENT"})(i||(i={}));const o={debug:i.DEBUG,verbose:i.VERBOSE,info:i.INFO,warn:i.WARN,error:i.ERROR,silent:i.SILENT},s=i.INFO,a={[i.DEBUG]:"log",[i.VERBOSE]:"log",[i.INFO]:"info",[i.WARN]:"warn",[i.ERROR]:"error"},c=(e,t,...n)=>{if(t<e.logLevel)return;const r=(new Date).toISOString(),i=a[t];if(!i)throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`);console[i](`[${r}]  ${e.name}:`,...n)};class u{constructor(e){this.name=e,this._logLevel=s,this._logHandler=c,this._userLogHandler=null,r.push(this)}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in i))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel="string"===typeof e?o[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if("function"!==typeof e)throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,i.DEBUG,...e),this._logHandler(this,i.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,i.VERBOSE,...e),this._logHandler(this,i.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,i.INFO,...e),this._logHandler(this,i.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,i.WARN,...e),this._logHandler(this,i.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,i.ERROR,...e),this._logHandler(this,i.ERROR,...e)}}},4466:function(e,t,n){"use strict";n.d(t,{IH:function(){return vt}});n(7658);var r=n(9684),i=n(5168),o=n(223),s=n(7142),a=(n(2801),n(3767),n(8585),n(8696),n(3831));const c="@firebase/installations",u="0.6.4",l=1e4,h=`w:${u}`,f="FIS_v2",d="https://firebaseinstallations.googleapis.com/v1",p=36e5,g="installations",m="Installations",y={["missing-app-config-values"]:'Missing App configuration value: "{$valueName}"',["not-registered"]:"Firebase Installation is not registered.",["installation-not-found"]:"Firebase Installation not found.",["request-failed"]:'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',["app-offline"]:"Could not process request. Application offline.",["delete-pending-registration"]:"Can't delete installation while there is a pending registration request."},v=new o.LL(g,m,y);function w(e){return e instanceof o.ZR&&e.code.includes("request-failed")}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function b({projectId:e}){return`${d}/projects/${e}/installations`}function E(e){return{token:e.token,requestStatus:2,expiresIn:k(e.expiresIn),creationTime:Date.now()}}async function _(e,t){const n=await t.json(),r=n.error;return v.create("request-failed",{requestName:e,serverCode:r.code,serverMessage:r.message,serverStatus:r.status})}function T({apiKey:e}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":e})}function I(e,{refreshToken:t}){const n=T(e);return n.append("Authorization",A(t)),n}async function S(e){const t=await e();return t.status>=500&&t.status<600?e():t}function k(e){return Number(e.replace("s","000"))}function A(e){return`${f} ${e}`}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function C({appConfig:e,heartbeatServiceProvider:t},{fid:n}){const r=b(e),i=T(e),o=t.getImmediate({optional:!0});if(o){const e=await o.getHeartbeatsHeader();e&&i.append("x-firebase-client",e)}const s={fid:n,authVersion:f,appId:e.appId,sdkVersion:h},a={method:"POST",headers:i,body:JSON.stringify(s)},c=await S((()=>fetch(r,a)));if(c.ok){const e=await c.json(),t={fid:e.fid||n,registrationStatus:2,refreshToken:e.refreshToken,authToken:E(e.authToken)};return t}throw await _("Create Installation",c)}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function x(e){return new Promise((t=>{setTimeout(t,e)}))}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function O(e){const t=btoa(String.fromCharCode(...e));return t.replace(/\+/g,"-").replace(/\//g,"_")}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const N=/^[cdef][\w-]{21}$/,R="";function D(){try{const e=new Uint8Array(17),t=self.crypto||self.msCrypto;t.getRandomValues(e),e[0]=112+e[0]%16;const n=P(e);return N.test(n)?n:R}catch(e){return R}}function P(e){const t=O(e);return t.substr(0,22)}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function L(e){return`${e.appName}!${e.appId}`}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const M=new Map;function j(e,t){const n=L(e);F(n,t),U(n,t)}function F(e,t){const n=M.get(e);if(n)for(const r of n)r(t)}function U(e,t){const n=q();n&&n.postMessage({key:e,fid:t}),$()}let V=null;function q(){return!V&&"BroadcastChannel"in self&&(V=new BroadcastChannel("[Firebase] FID Change"),V.onmessage=e=>{F(e.data.key,e.data.fid)}),V}function $(){0===M.size&&V&&(V.close(),V=null)}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const B="firebase-installations-database",H=1,z="firebase-installations-store";let W=null;function K(){return W||(W=(0,a.X3)(B,H,{upgrade:(e,t)=>{switch(t){case 0:e.createObjectStore(z)}}})),W}async function G(e,t){const n=L(e),r=await K(),i=r.transaction(z,"readwrite"),o=i.objectStore(z),s=await o.get(n);return await o.put(t,n),await i.done,s&&s.fid===t.fid||j(e,t.fid),t}async function J(e){const t=L(e),n=await K(),r=n.transaction(z,"readwrite");await r.objectStore(z).delete(t),await r.done}async function Q(e,t){const n=L(e),r=await K(),i=r.transaction(z,"readwrite"),o=i.objectStore(z),s=await o.get(n),a=t(s);return void 0===a?await o.delete(n):await o.put(a,n),await i.done,!a||s&&s.fid===a.fid||j(e,a.fid),a}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function X(e){let t;const n=await Q(e.appConfig,(n=>{const r=Y(n),i=Z(e,r);return t=i.registrationPromise,i.installationEntry}));return n.fid===R?{installationEntry:await t}:{installationEntry:n,registrationPromise:t}}function Y(e){const t=e||{fid:D(),registrationStatus:0};return re(t)}function Z(e,t){if(0===t.registrationStatus){if(!navigator.onLine){const e=Promise.reject(v.create("app-offline"));return{installationEntry:t,registrationPromise:e}}const n={fid:t.fid,registrationStatus:1,registrationTime:Date.now()},r=ee(e,n);return{installationEntry:n,registrationPromise:r}}return 1===t.registrationStatus?{installationEntry:t,registrationPromise:te(e)}:{installationEntry:t}}async function ee(e,t){try{const n=await C(e,t);return G(e.appConfig,n)}catch(n){throw w(n)&&409===n.customData.serverCode?await J(e.appConfig):await G(e.appConfig,{fid:t.fid,registrationStatus:0}),n}}async function te(e){let t=await ne(e.appConfig);while(1===t.registrationStatus)await x(100),t=await ne(e.appConfig);if(0===t.registrationStatus){const{installationEntry:t,registrationPromise:n}=await X(e);return n||t}return t}function ne(e){return Q(e,(e=>{if(!e)throw v.create("installation-not-found");return re(e)}))}function re(e){return ie(e)?{fid:e.fid,registrationStatus:0}:e}function ie(e){return 1===e.registrationStatus&&e.registrationTime+l<Date.now()}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function oe({appConfig:e,heartbeatServiceProvider:t},n){const r=se(e,n),i=I(e,n),o=t.getImmediate({optional:!0});if(o){const e=await o.getHeartbeatsHeader();e&&i.append("x-firebase-client",e)}const s={installation:{sdkVersion:h,appId:e.appId}},a={method:"POST",headers:i,body:JSON.stringify(s)},c=await S((()=>fetch(r,a)));if(c.ok){const e=await c.json(),t=E(e);return t}throw await _("Generate Auth Token",c)}function se(e,{fid:t}){return`${b(e)}/${t}/authTokens:generate`}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ae(e,t=!1){let n;const r=await Q(e.appConfig,(r=>{if(!he(r))throw v.create("not-registered");const i=r.authToken;if(!t&&fe(i))return r;if(1===i.requestStatus)return n=ce(e,t),r;{if(!navigator.onLine)throw v.create("app-offline");const t=pe(r);return n=le(e,t),t}})),i=n?await n:r.authToken;return i}async function ce(e,t){let n=await ue(e.appConfig);while(1===n.authToken.requestStatus)await x(100),n=await ue(e.appConfig);const r=n.authToken;return 0===r.requestStatus?ae(e,t):r}function ue(e){return Q(e,(e=>{if(!he(e))throw v.create("not-registered");const t=e.authToken;return ge(t)?Object.assign(Object.assign({},e),{authToken:{requestStatus:0}}):e}))}async function le(e,t){try{const n=await oe(e,t),r=Object.assign(Object.assign({},t),{authToken:n});return await G(e.appConfig,r),n}catch(n){if(!w(n)||401!==n.customData.serverCode&&404!==n.customData.serverCode){const n=Object.assign(Object.assign({},t),{authToken:{requestStatus:0}});await G(e.appConfig,n)}else await J(e.appConfig);throw n}}function he(e){return void 0!==e&&2===e.registrationStatus}function fe(e){return 2===e.requestStatus&&!de(e)}function de(e){const t=Date.now();return t<e.creationTime||e.creationTime+e.expiresIn<t+p}function pe(e){const t={requestStatus:1,requestTime:Date.now()};return Object.assign(Object.assign({},e),{authToken:t})}function ge(e){return 1===e.requestStatus&&e.requestTime+l<Date.now()}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function me(e){const t=e,{installationEntry:n,registrationPromise:r}=await X(t);return r?r.catch(console.error):ae(t).catch(console.error),n.fid}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ye(e,t=!1){const n=e;await ve(n);const r=await ae(n,t);return r.token}async function ve(e){const{registrationPromise:t}=await X(e);t&&await t}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function we(e){if(!e||!e.options)throw be("App Configuration");if(!e.name)throw be("App Name");const t=["projectId","apiKey","appId"];for(const n of t)if(!e.options[n])throw be(n);return{appName:e.name,projectId:e.options.projectId,apiKey:e.options.apiKey,appId:e.options.appId}}function be(e){return v.create("missing-app-config-values",{valueName:e})}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ee="installations",_e="installations-internal",Te=e=>{const t=e.getProvider("app").getImmediate(),n=we(t),i=(0,r.qX)(t,"heartbeat"),o={app:t,appConfig:n,heartbeatServiceProvider:i,_delete:()=>Promise.resolve()};return o},Ie=e=>{const t=e.getProvider("app").getImmediate(),n=(0,r.qX)(t,Ee).getImmediate(),i={getId:()=>me(n),getToken:e=>ye(n,e)};return i};function Se(){(0,r.Xd)(new s.wA(Ee,Te,"PUBLIC")),(0,r.Xd)(new s.wA(_e,Ie,"PRIVATE"))}Se(),(0,r.KN)(c,u),(0,r.KN)(c,u,"esm2017");
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const ke="analytics",Ae="firebase_id",Ce="origin",xe=6e4,Oe="https://firebase.googleapis.com/v1alpha/projects/-/apps/{app-id}/webConfig",Ne="https://www.googletagmanager.com/gtag/js",Re=new i.Yd("@firebase/analytics");
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function De(e){return Promise.all(e.map((e=>e.catch((e=>e)))))}function Pe(e,t){const n=document.createElement("script");n.src=`${Ne}?l=${e}&id=${t}`,n.async=!0,document.head.appendChild(n)}function Le(e){let t=[];return Array.isArray(window[e])?t=window[e]:window[e]=t,t}async function Me(e,t,n,r,i,o){const s=r[i];try{if(s)await t[s];else{const e=await De(n),r=e.find((e=>e.measurementId===i));r&&await t[r.appId]}}catch(a){Re.error(a)}e("config",i,o)}async function je(e,t,n,r,i){try{let o=[];if(i&&i["send_to"]){let e=i["send_to"];Array.isArray(e)||(e=[e]);const r=await De(n);for(const n of e){const e=r.find((e=>e.measurementId===n)),i=e&&t[e.appId];if(!i){o=[];break}o.push(i)}}0===o.length&&(o=Object.values(t)),await Promise.all(o),e("event",r,i||{})}catch(o){Re.error(o)}}function Fe(e,t,n,r){async function i(i,o,s){try{"event"===i?await je(e,t,n,o,s):"config"===i?await Me(e,t,n,r,o,s):"consent"===i?e("consent","update",s):e("set",o)}catch(a){Re.error(a)}}return i}function Ue(e,t,n,r,i){let o=function(...e){window[r].push(arguments)};return window[i]&&"function"===typeof window[i]&&(o=window[i]),window[i]=Fe(o,e,t,n),{gtagCore:o,wrappedGtag:window[i]}}function Ve(e){const t=window.document.getElementsByTagName("script");for(const n of Object.values(t))if(n.src&&n.src.includes(Ne)&&n.src.includes(e))return n;return null}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qe={["already-exists"]:"A Firebase Analytics instance with the appId {$id}  already exists. Only one Firebase Analytics instance can be created for each appId.",["already-initialized"]:"initializeAnalytics() cannot be called again with different options than those it was initially called with. It can be called again with the same options to return the existing instance, or getAnalytics() can be used to get a reference to the already-intialized instance.",["already-initialized-settings"]:"Firebase Analytics has already been initialized.settings() must be called before initializing any Analytics instanceor it will have no effect.",["interop-component-reg-failed"]:"Firebase Analytics Interop Component failed to instantiate: {$reason}",["invalid-analytics-context"]:"Firebase Analytics is not supported in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}",["indexeddb-unavailable"]:"IndexedDB unavailable or restricted in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}",["fetch-throttle"]:"The config fetch request timed out while in an exponential backoff state. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.",["config-fetch-failed"]:"Dynamic config fetch failed: [{$httpStatus}] {$responseMessage}",["no-api-key"]:'The "apiKey" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid API key.',["no-app-id"]:'The "appId" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid app ID.'},$e=new o.LL("analytics","Analytics",qe),Be=30,He=1e3;class ze{constructor(e={},t=He){this.throttleMetadata=e,this.intervalMillis=t}getThrottleMetadata(e){return this.throttleMetadata[e]}setThrottleMetadata(e,t){this.throttleMetadata[e]=t}deleteThrottleMetadata(e){delete this.throttleMetadata[e]}}const We=new ze;function Ke(e){return new Headers({Accept:"application/json","x-goog-api-key":e})}async function Ge(e){var t;const{appId:n,apiKey:r}=e,i={method:"GET",headers:Ke(r)},o=Oe.replace("{app-id}",n),s=await fetch(o,i);if(200!==s.status&&304!==s.status){let e="";try{const n=await s.json();(null===(t=n.error)||void 0===t?void 0:t.message)&&(e=n.error.message)}catch(a){}throw $e.create("config-fetch-failed",{httpStatus:s.status,responseMessage:e})}return s.json()}async function Je(e,t=We,n){const{appId:r,apiKey:i,measurementId:o}=e.options;if(!r)throw $e.create("no-app-id");if(!i){if(o)return{measurementId:o,appId:r};throw $e.create("no-api-key")}const s=t.getThrottleMetadata(r)||{backoffCount:0,throttleEndTimeMillis:Date.now()},a=new Ze;return setTimeout((async()=>{a.abort()}),void 0!==n?n:xe),Qe({appId:r,apiKey:i,measurementId:o},s,a,t)}async function Qe(e,{throttleEndTimeMillis:t,backoffCount:n},r,i=We){var s;const{appId:a,measurementId:c}=e;try{await Xe(r,t)}catch(u){if(c)return Re.warn(`Timed out fetching this Firebase app's measurement ID from the server. Falling back to the measurement ID ${c} provided in the "measurementId" field in the local Firebase config. [${null===u||void 0===u?void 0:u.message}]`),{appId:a,measurementId:c};throw u}try{const t=await Ge(e);return i.deleteThrottleMetadata(a),t}catch(u){const t=u;if(!Ye(t)){if(i.deleteThrottleMetadata(a),c)return Re.warn(`Failed to fetch this Firebase app's measurement ID from the server. Falling back to the measurement ID ${c} provided in the "measurementId" field in the local Firebase config. [${null===t||void 0===t?void 0:t.message}]`),{appId:a,measurementId:c};throw u}const l=503===Number(null===(s=null===t||void 0===t?void 0:t.customData)||void 0===s?void 0:s.httpStatus)?(0,o.$s)(n,i.intervalMillis,Be):(0,o.$s)(n,i.intervalMillis),h={throttleEndTimeMillis:Date.now()+l,backoffCount:n+1};return i.setThrottleMetadata(a,h),Re.debug(`Calling attemptFetch again in ${l} millis`),Qe(e,h,r,i)}}function Xe(e,t){return new Promise(((n,r)=>{const i=Math.max(t-Date.now(),0),o=setTimeout(n,i);e.addEventListener((()=>{clearTimeout(o),r($e.create("fetch-throttle",{throttleEndTimeMillis:t}))}))}))}function Ye(e){if(!(e instanceof o.ZR)||!e.customData)return!1;const t=Number(e.customData["httpStatus"]);return 429===t||500===t||503===t||504===t}class Ze{constructor(){this.listeners=[]}addEventListener(e){this.listeners.push(e)}abort(){this.listeners.forEach((e=>e()))}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let et,tt;async function nt(e,t,n,r,i){if(i&&i.global)e("event",n,r);else{const i=await t,o=Object.assign(Object.assign({},r),{send_to:i});e("event",n,o)}}function rt(e){tt=e}function it(e){et=e}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ot(){if(!(0,o.hl)())return Re.warn($e.create("indexeddb-unavailable",{errorInfo:"IndexedDB is not available in this environment."}).message),!1;try{await(0,o.eu)()}catch(e){return Re.warn($e.create("indexeddb-unavailable",{errorInfo:null===e||void 0===e?void 0:e.toString()}).message),!1}return!0}async function st(e,t,n,r,i,o,s){var a;const c=Je(e);c.then((t=>{n[t.measurementId]=t.appId,e.options.measurementId&&t.measurementId!==e.options.measurementId&&Re.warn(`The measurement ID in the local Firebase config (${e.options.measurementId}) does not match the measurement ID fetched from the server (${t.measurementId}). To ensure analytics events are always sent to the correct Analytics property, update the measurement ID field in the local config or remove it from the local config.`)})).catch((e=>Re.error(e))),t.push(c);const u=ot().then((e=>e?r.getId():void 0)),[l,h]=await Promise.all([c,u]);Ve(o)||Pe(o,l.measurementId),tt&&(i("consent","default",tt),rt(void 0)),i("js",new Date);const f=null!==(a=null===s||void 0===s?void 0:s.config)&&void 0!==a?a:{};return f[Ce]="firebase",f.update=!0,null!=h&&(f[Ae]=h),i("config",l.measurementId,f),et&&(i("set",et),it(void 0)),l.measurementId}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class at{constructor(e){this.app=e}_delete(){return delete ct[this.app.options.appId],Promise.resolve()}}let ct={},ut=[];const lt={};let ht,ft,dt="dataLayer",pt="gtag",gt=!1;function mt(){const e=[];if((0,o.ru)()&&e.push("This is a browser extension environment."),(0,o.zI)()||e.push("Cookies are not available."),e.length>0){const t=e.map(((e,t)=>`(${t+1}) ${e}`)).join(" "),n=$e.create("invalid-analytics-context",{errorInfo:t});Re.warn(n.message)}}function yt(e,t,n){mt();const r=e.options.appId;if(!r)throw $e.create("no-app-id");if(!e.options.apiKey){if(!e.options.measurementId)throw $e.create("no-api-key");Re.warn(`The "apiKey" field is empty in the local Firebase config. This is needed to fetch the latest measurement ID for this Firebase app. Falling back to the measurement ID ${e.options.measurementId} provided in the "measurementId" field in the local Firebase config.`)}if(null!=ct[r])throw $e.create("already-exists",{id:r});if(!gt){Le(dt);const{wrappedGtag:e,gtagCore:t}=Ue(ct,ut,lt,dt,pt);ft=e,ht=t,gt=!0}ct[r]=st(e,ut,lt,t,ht,dt,n);const i=new at(e);return i}function vt(e=(0,r.Mq)()){e=(0,o.m9)(e);const t=(0,r.qX)(e,ke);return t.isInitialized()?t.getImmediate():wt(e)}function wt(e,t={}){const n=(0,r.qX)(e,ke);if(n.isInitialized()){const e=n.getImmediate();if((0,o.vZ)(t,n.getOptions()))return e;throw $e.create("already-initialized")}const i=n.initialize({options:t});return i}function bt(e,t,n,r){e=(0,o.m9)(e),nt(ft,ct[e.app.options.appId],t,n,r).catch((e=>Re.error(e)))}const Et="@firebase/analytics",_t="0.9.4";function Tt(){function e(e){try{const t=e.getProvider(ke).getImmediate();return{logEvent:(e,n,r)=>bt(t,e,n,r)}}catch(t){throw $e.create("interop-component-reg-failed",{reason:t})}}(0,r.Xd)(new s.wA(ke,((e,{options:t})=>{const n=e.getProvider("app").getImmediate(),r=e.getProvider("installations-internal").getImmediate();return yt(n,r,t)}),"PUBLIC")),(0,r.Xd)(new s.wA("analytics-internal",e,"PRIVATE")),(0,r.KN)(Et,_t),(0,r.KN)(Et,_t,"esm2017")}Tt()},7795:function(e,t,n){"use strict";n.d(t,{ZF:function(){return r.ZF}});var r=n(9684),i="firebase",o="9.17.2";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
(0,r.KN)(i,o,"app")},7851:function(e,t,n){"use strict";n.d(t,{hJ:function(){return nt},v0:function(){return br},rh:function(){return fn},F6:function(){return _n}});n(7658);var r=n(223),i=n(9684),o=n(5168);function s(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var i=0;for(r=Object.getOwnPropertySymbols(e);i<r.length;i++)t.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(e,r[i])&&(n[r[i]]=e[r[i]])}return n}Object.create;Object.create;var a=n(7142);function c(){return{["dependent-sdk-initialized-before-auth"]:"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const u=c,l=new r.LL("auth","Firebase",c()),h=new o.Yd("@firebase/auth");function f(e,...t){h.logLevel<=o["in"].ERROR&&h.error(`Auth (${i.Jn}): ${e}`,...t)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function d(e,...t){throw y(e,...t)}function p(e,...t){return y(e,...t)}function g(e,t,n){const i=Object.assign(Object.assign({},u()),{[t]:n}),o=new r.LL("auth","Firebase",i);return o.create(t,{appName:e.name})}function m(e,t,n){const r=n;if(!(t instanceof r))throw r.name!==t.constructor.name&&d(e,"argument-error"),g(e,"argument-error",`Type of ${t.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function y(e,...t){if("string"!==typeof e){const n=t[0],r=[...t.slice(1)];return r[0]&&(r[0].appName=e.name),e._errorFactory.create(n,...r)}return l.create(e,...t)}function v(e,t,...n){if(!e)throw y(t,...n)}function w(e){const t="INTERNAL ASSERTION FAILED: "+e;throw f(t),new Error(t)}function b(e,t){e||w(t)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const E=new Map;function _(e){b(e instanceof Function,"Expected a class definition");let t=E.get(e);return t?(b(t instanceof e,"Instance stored in cache mismatched with class"),t):(t=new e,E.set(e,t),t)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function T(e,t){const n=(0,i.qX)(e,"auth");if(n.isInitialized()){const e=n.getImmediate(),i=n.getOptions();if((0,r.vZ)(i,null!==t&&void 0!==t?t:{}))return e;d(e,"already-initialized")}const o=n.initialize({options:t});return o}function I(e,t){const n=(null===t||void 0===t?void 0:t.persistence)||[],r=(Array.isArray(n)?n:[n]).map(_);(null===t||void 0===t?void 0:t.errorMap)&&e._updateErrorMap(t.errorMap),e._initializeWithPersistence(r,null===t||void 0===t?void 0:t.popupRedirectResolver)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function S(){var e;return"undefined"!==typeof self&&(null===(e=self.location)||void 0===e?void 0:e.href)||""}function k(){return"http:"===A()||"https:"===A()}function A(){var e;return"undefined"!==typeof self&&(null===(e=self.location)||void 0===e?void 0:e.protocol)||null}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function C(){return!("undefined"!==typeof navigator&&navigator&&"onLine"in navigator&&"boolean"===typeof navigator.onLine&&(k()||(0,r.ru)()||"connection"in navigator))||navigator.onLine}function x(){if("undefined"===typeof navigator)return null;const e=navigator;return e.languages&&e.languages[0]||e.language||null}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class O{constructor(e,t){this.shortDelay=e,this.longDelay=t,b(t>e,"Short delay should be less than long delay!"),this.isMobile=(0,r.uI)()||(0,r.b$)()}get(){return C()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function N(e,t){b(e.emulator,"Emulator should always be set here");const{url:n}=e.emulator;return t?`${n}${t.startsWith("/")?t.slice(1):t}`:n}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class R{static initialize(e,t,n){this.fetchImpl=e,t&&(this.headersImpl=t),n&&(this.responseImpl=n)}static fetch(){return this.fetchImpl?this.fetchImpl:"undefined"!==typeof self&&"fetch"in self?self.fetch:void w("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){return this.headersImpl?this.headersImpl:"undefined"!==typeof self&&"Headers"in self?self.Headers:void w("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){return this.responseImpl?this.responseImpl:"undefined"!==typeof self&&"Response"in self?self.Response:void w("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const D={["CREDENTIAL_MISMATCH"]:"custom-token-mismatch",["MISSING_CUSTOM_TOKEN"]:"internal-error",["INVALID_IDENTIFIER"]:"invalid-email",["MISSING_CONTINUE_URI"]:"internal-error",["INVALID_PASSWORD"]:"wrong-password",["MISSING_PASSWORD"]:"internal-error",["EMAIL_EXISTS"]:"email-already-in-use",["PASSWORD_LOGIN_DISABLED"]:"operation-not-allowed",["INVALID_IDP_RESPONSE"]:"invalid-credential",["INVALID_PENDING_TOKEN"]:"invalid-credential",["FEDERATED_USER_ID_ALREADY_LINKED"]:"credential-already-in-use",["MISSING_REQ_TYPE"]:"internal-error",["EMAIL_NOT_FOUND"]:"user-not-found",["RESET_PASSWORD_EXCEED_LIMIT"]:"too-many-requests",["EXPIRED_OOB_CODE"]:"expired-action-code",["INVALID_OOB_CODE"]:"invalid-action-code",["MISSING_OOB_CODE"]:"internal-error",["CREDENTIAL_TOO_OLD_LOGIN_AGAIN"]:"requires-recent-login",["INVALID_ID_TOKEN"]:"invalid-user-token",["TOKEN_EXPIRED"]:"user-token-expired",["USER_NOT_FOUND"]:"user-token-expired",["TOO_MANY_ATTEMPTS_TRY_LATER"]:"too-many-requests",["INVALID_CODE"]:"invalid-verification-code",["INVALID_SESSION_INFO"]:"invalid-verification-id",["INVALID_TEMPORARY_PROOF"]:"invalid-credential",["MISSING_SESSION_INFO"]:"missing-verification-id",["SESSION_EXPIRED"]:"code-expired",["MISSING_ANDROID_PACKAGE_NAME"]:"missing-android-pkg-name",["UNAUTHORIZED_DOMAIN"]:"unauthorized-continue-uri",["INVALID_OAUTH_CLIENT_ID"]:"invalid-oauth-client-id",["ADMIN_ONLY_OPERATION"]:"admin-restricted-operation",["INVALID_MFA_PENDING_CREDENTIAL"]:"invalid-multi-factor-session",["MFA_ENROLLMENT_NOT_FOUND"]:"multi-factor-info-not-found",["MISSING_MFA_ENROLLMENT_ID"]:"missing-multi-factor-info",["MISSING_MFA_PENDING_CREDENTIAL"]:"missing-multi-factor-session",["SECOND_FACTOR_EXISTS"]:"second-factor-already-in-use",["SECOND_FACTOR_LIMIT_EXCEEDED"]:"maximum-second-factor-count-exceeded",["BLOCKING_FUNCTION_ERROR_RESPONSE"]:"internal-error"},P=new O(3e4,6e4);
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function L(e,t){return e.tenantId&&!t.tenantId?Object.assign(Object.assign({},t),{tenantId:e.tenantId}):t}async function M(e,t,n,i,o={}){return j(e,o,(async()=>{let o={},s={};i&&("GET"===t?s=i:o={body:JSON.stringify(i)});const a=(0,r.xO)(Object.assign({key:e.config.apiKey},s)).slice(1),c=await e._getAdditionalHeaders();return c["Content-Type"]="application/json",e.languageCode&&(c["X-Firebase-Locale"]=e.languageCode),R.fetch()(U(e,e.config.apiHost,n,a),Object.assign({method:t,headers:c,referrerPolicy:"no-referrer"},o))}))}async function j(e,t,n){e._canInitEmulator=!1;const i=Object.assign(Object.assign({},D),t);try{const t=new V(e),r=await Promise.race([n(),t.promise]);t.clearNetworkTimeout();const o=await r.json();if("needConfirmation"in o)throw q(e,"account-exists-with-different-credential",o);if(r.ok&&!("errorMessage"in o))return o;{const t=r.ok?o.errorMessage:o.error.message,[n,s]=t.split(" : ");if("FEDERATED_USER_ID_ALREADY_LINKED"===n)throw q(e,"credential-already-in-use",o);if("EMAIL_EXISTS"===n)throw q(e,"email-already-in-use",o);if("USER_DISABLED"===n)throw q(e,"user-disabled",o);const a=i[n]||n.toLowerCase().replace(/[_\s]+/g,"-");if(s)throw g(e,a,s);d(e,a)}}catch(o){if(o instanceof r.ZR)throw o;d(e,"internal-error",{message:String(o)})}}async function F(e,t,n,r,i={}){const o=await M(e,t,n,r,i);return"mfaPendingCredential"in o&&d(e,"multi-factor-auth-required",{_serverResponse:o}),o}function U(e,t,n,r){const i=`${t}${n}?${r}`;return e.config.emulator?N(e.config,i):`${e.config.apiScheme}://${i}`}class V{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise(((e,t)=>{this.timer=setTimeout((()=>t(p(this.auth,"network-request-failed"))),P.get())}))}clearNetworkTimeout(){clearTimeout(this.timer)}}function q(e,t,n){const r={appName:e.name};n.email&&(r.email=n.email),n.phoneNumber&&(r.phoneNumber=n.phoneNumber);const i=p(e,t,r);return i.customData._tokenResponse=n,i}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function $(e,t){return M(e,"POST","/v1/accounts:delete",t)}async function B(e,t){return M(e,"POST","/v1/accounts:lookup",t)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function H(e){if(e)try{const t=new Date(Number(e));if(!isNaN(t.getTime()))return t.toUTCString()}catch(t){}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function z(e,t=!1){const n=(0,r.m9)(e),i=await n.getIdToken(t),o=K(i);v(o&&o.exp&&o.auth_time&&o.iat,n.auth,"internal-error");const s="object"===typeof o.firebase?o.firebase:void 0,a=null===s||void 0===s?void 0:s["sign_in_provider"];return{claims:o,token:i,authTime:H(W(o.auth_time)),issuedAtTime:H(W(o.iat)),expirationTime:H(W(o.exp)),signInProvider:a||null,signInSecondFactor:(null===s||void 0===s?void 0:s["sign_in_second_factor"])||null}}function W(e){return 1e3*Number(e)}function K(e){const[t,n,i]=e.split(".");if(void 0===t||void 0===n||void 0===i)return f("JWT malformed, contained fewer than 3 sections"),null;try{const e=(0,r.tV)(n);return e?JSON.parse(e):(f("Failed to decode base64 JWT payload"),null)}catch(o){return f("Caught error parsing JWT payload as JSON",null===o||void 0===o?void 0:o.toString()),null}}function G(e){const t=K(e);return v(t,"internal-error"),v("undefined"!==typeof t.exp,"internal-error"),v("undefined"!==typeof t.iat,"internal-error"),Number(t.exp)-Number(t.iat)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function J(e,t,n=!1){if(n)return t;try{return await t}catch(i){throw i instanceof r.ZR&&Q(i)&&e.auth.currentUser===e&&await e.auth.signOut(),i}}function Q({code:e}){return"auth/user-disabled"===e||"auth/user-token-expired"===e}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class X{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,null!==this.timerId&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){const e=this.errorBackoff;return this.errorBackoff=Math.min(2*this.errorBackoff,96e4),e}{this.errorBackoff=3e4;const e=null!==(t=this.user.stsTokenManager.expirationTime)&&void 0!==t?t:0,n=e-Date.now()-3e5;return Math.max(0,n)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout((async()=>{await this.iteration()}),t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){return void("auth/network-request-failed"===(null===e||void 0===e?void 0:e.code)&&this.schedule(!0))}this.schedule()}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Y{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=H(this.lastLoginAt),this.creationTime=H(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Z(e){var t;const n=e.auth,r=await e.getIdToken(),i=await J(e,B(n,{idToken:r}));v(null===i||void 0===i?void 0:i.users.length,n,"internal-error");const o=i.users[0];e._notifyReloadListener(o);const s=(null===(t=o.providerUserInfo)||void 0===t?void 0:t.length)?ne(o.providerUserInfo):[],a=te(e.providerData,s),c=e.isAnonymous,u=!(e.email&&o.passwordHash)&&!(null===a||void 0===a?void 0:a.length),l=!!c&&u,h={uid:o.localId,displayName:o.displayName||null,photoURL:o.photoUrl||null,email:o.email||null,emailVerified:o.emailVerified||!1,phoneNumber:o.phoneNumber||null,tenantId:o.tenantId||null,providerData:a,metadata:new Y(o.createdAt,o.lastLoginAt),isAnonymous:l};Object.assign(e,h)}async function ee(e){const t=(0,r.m9)(e);await Z(t),await t.auth._persistUserIfCurrent(t),t.auth._notifyListenersIfCurrent(t)}function te(e,t){const n=e.filter((e=>!t.some((t=>t.providerId===e.providerId))));return[...n,...t]}function ne(e){return e.map((e=>{var{providerId:t}=e,n=s(e,["providerId"]);return{providerId:t,uid:n.rawId||"",displayName:n.displayName||null,email:n.email||null,phoneNumber:n.phoneNumber||null,photoURL:n.photoUrl||null}}))}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function re(e,t){const n=await j(e,{},(async()=>{const n=(0,r.xO)({grant_type:"refresh_token",refresh_token:t}).slice(1),{tokenApiHost:i,apiKey:o}=e.config,s=U(e,i,"/v1/token",`key=${o}`),a=await e._getAdditionalHeaders();return a["Content-Type"]="application/x-www-form-urlencoded",R.fetch()(s,{method:"POST",headers:a,body:n})}));return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ie{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){v(e.idToken,"internal-error"),v("undefined"!==typeof e.idToken,"internal-error"),v("undefined"!==typeof e.refreshToken,"internal-error");const t="expiresIn"in e&&"undefined"!==typeof e.expiresIn?Number(e.expiresIn):G(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}async getToken(e,t=!1){return v(!this.accessToken||this.refreshToken,e,"user-token-expired"),t||!this.accessToken||this.isExpired?this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null:this.accessToken}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:n,refreshToken:r,expiresIn:i}=await re(e,t);this.updateTokensAndExpiration(n,r,Number(i))}updateTokensAndExpiration(e,t,n){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+1e3*n}static fromJSON(e,t){const{refreshToken:n,accessToken:r,expirationTime:i}=t,o=new ie;return n&&(v("string"===typeof n,"internal-error",{appName:e}),o.refreshToken=n),r&&(v("string"===typeof r,"internal-error",{appName:e}),o.accessToken=r),i&&(v("number"===typeof i,"internal-error",{appName:e}),o.expirationTime=i),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new ie,this.toJSON())}_performRefresh(){return w("not implemented")}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function oe(e,t){v("string"===typeof e||"undefined"===typeof e,"internal-error",{appName:t})}class se{constructor(e){var{uid:t,auth:n,stsTokenManager:r}=e,i=s(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new X(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=n,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=i.displayName||null,this.email=i.email||null,this.emailVerified=i.emailVerified||!1,this.phoneNumber=i.phoneNumber||null,this.photoURL=i.photoURL||null,this.isAnonymous=i.isAnonymous||!1,this.tenantId=i.tenantId||null,this.providerData=i.providerData?[...i.providerData]:[],this.metadata=new Y(i.createdAt||void 0,i.lastLoginAt||void 0)}async getIdToken(e){const t=await J(this,this.stsTokenManager.getToken(this.auth,e));return v(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return z(this,e)}reload(){return ee(this)}_assign(e){this!==e&&(v(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map((e=>Object.assign({},e))),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){return new se(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}))}_onReload(e){v(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let n=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),n=!0),t&&await Z(this),await this.auth._persistUserIfCurrent(this),n&&this.auth._notifyListenersIfCurrent(this)}async delete(){const e=await this.getIdToken();return await J(this,$(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map((e=>Object.assign({},e))),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var n,r,i,o,s,a,c,u;const l=null!==(n=t.displayName)&&void 0!==n?n:void 0,h=null!==(r=t.email)&&void 0!==r?r:void 0,f=null!==(i=t.phoneNumber)&&void 0!==i?i:void 0,d=null!==(o=t.photoURL)&&void 0!==o?o:void 0,p=null!==(s=t.tenantId)&&void 0!==s?s:void 0,g=null!==(a=t._redirectEventId)&&void 0!==a?a:void 0,m=null!==(c=t.createdAt)&&void 0!==c?c:void 0,y=null!==(u=t.lastLoginAt)&&void 0!==u?u:void 0,{uid:w,emailVerified:b,isAnonymous:E,providerData:_,stsTokenManager:T}=t;v(w&&T,e,"internal-error");const I=ie.fromJSON(this.name,T);v("string"===typeof w,e,"internal-error"),oe(l,e.name),oe(h,e.name),v("boolean"===typeof b,e,"internal-error"),v("boolean"===typeof E,e,"internal-error"),oe(f,e.name),oe(d,e.name),oe(p,e.name),oe(g,e.name),oe(m,e.name),oe(y,e.name);const S=new se({uid:w,auth:e,email:h,emailVerified:b,displayName:l,isAnonymous:E,photoURL:d,phoneNumber:f,tenantId:p,stsTokenManager:I,createdAt:m,lastLoginAt:y});return _&&Array.isArray(_)&&(S.providerData=_.map((e=>Object.assign({},e)))),g&&(S._redirectEventId=g),S}static async _fromIdTokenResponse(e,t,n=!1){const r=new ie;r.updateFromServerResponse(t);const i=new se({uid:t.localId,auth:e,stsTokenManager:r,isAnonymous:n});return await Z(i),i}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ae{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return void 0===t?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}ae.type="NONE";const ce=ae;
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ue(e,t,n){return`firebase:${e}:${t}:${n}`}class le{constructor(e,t,n){this.persistence=e,this.auth=t,this.userKey=n;const{config:r,name:i}=this.auth;this.fullUserKey=ue(this.userKey,r.apiKey,i),this.fullPersistenceKey=ue("persistence",r.apiKey,i),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?se._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();return await this.removeCurrentUser(),this.persistence=e,t?this.setCurrentUser(t):void 0}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,n="authUser"){if(!t.length)return new le(_(ce),e,n);const r=(await Promise.all(t.map((async e=>{if(await e._isAvailable())return e})))).filter((e=>e));let i=r[0]||_(ce);const o=ue(n,e.config.apiKey,e.name);let s=null;for(const u of t)try{const t=await u._get(o);if(t){const n=se._fromJSON(e,t);u!==i&&(s=n),i=u;break}}catch(c){}const a=r.filter((e=>e._shouldAllowMigration));return i._shouldAllowMigration&&a.length?(i=a[0],s&&await i._set(o,s.toJSON()),await Promise.all(t.map((async e=>{if(e!==i)try{await e._remove(o)}catch(c){}}))),new le(i,e,n)):new le(i,e,n)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function he(e){const t=e.toLowerCase();if(t.includes("opera/")||t.includes("opr/")||t.includes("opios/"))return"Opera";if(ge(t))return"IEMobile";if(t.includes("msie")||t.includes("trident/"))return"IE";if(t.includes("edge/"))return"Edge";if(fe(t))return"Firefox";if(t.includes("silk/"))return"Silk";if(ye(t))return"Blackberry";if(ve(t))return"Webos";if(de(t))return"Safari";if((t.includes("chrome/")||pe(t))&&!t.includes("edge/"))return"Chrome";if(me(t))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,n=e.match(t);if(2===(null===n||void 0===n?void 0:n.length))return n[1]}return"Other"}function fe(e=(0,r.z$)()){return/firefox\//i.test(e)}function de(e=(0,r.z$)()){const t=e.toLowerCase();return t.includes("safari/")&&!t.includes("chrome/")&&!t.includes("crios/")&&!t.includes("android")}function pe(e=(0,r.z$)()){return/crios\//i.test(e)}function ge(e=(0,r.z$)()){return/iemobile/i.test(e)}function me(e=(0,r.z$)()){return/android/i.test(e)}function ye(e=(0,r.z$)()){return/blackberry/i.test(e)}function ve(e=(0,r.z$)()){return/webos/i.test(e)}function we(e=(0,r.z$)()){return/iphone|ipad|ipod/i.test(e)||/macintosh/i.test(e)&&/mobile/i.test(e)}function be(e=(0,r.z$)()){var t;return we(e)&&!!(null===(t=window.navigator)||void 0===t?void 0:t.standalone)}function Ee(){return(0,r.w1)()&&10===document.documentMode}function _e(e=(0,r.z$)()){return we(e)||me(e)||ve(e)||ye(e)||/windows phone/i.test(e)||ge(e)}function Te(){try{return!(!window||window===window.top)}catch(e){return!1}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ie(e,t=[]){let n;switch(e){case"Browser":n=he((0,r.z$)());break;case"Worker":n=`${he((0,r.z$)())}-${e}`;break;default:n=e}const o=t.length?t.join(","):"FirebaseCore-web";return`${n}/JsCore/${i.Jn}/${o}`}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Se{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const n=t=>new Promise(((n,r)=>{try{const r=e(t);n(r)}catch(i){r(i)}}));n.onAbort=t,this.queue.push(n);const r=this.queue.length-1;return()=>{this.queue[r]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const n of this.queue)await n(e),n.onAbort&&t.push(n.onAbort)}catch(n){t.reverse();for(const e of t)try{e()}catch(r){}throw this.auth._errorFactory.create("login-blocked",{originalMessage:null===n||void 0===n?void 0:n.message})}}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ke{constructor(e,t,n){this.app=e,this.heartbeatServiceProvider=t,this.config=n,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Ce(this),this.idTokenSubscription=new Ce(this),this.beforeStateQueue=new Se(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=l,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=n.sdkClientVersion}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=_(t)),this._initializationPromise=this.queue((async()=>{var n,r;if(!this._deleted&&(this.persistenceManager=await le.create(this,e),!this._deleted)){if(null===(n=this._popupRedirectResolver)||void 0===n?void 0:n._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch(i){}await this.initializeCurrentUser(t),this.lastNotifiedUid=(null===(r=this.currentUser)||void 0===r?void 0:r.uid)||null,this._deleted||(this._isInitialized=!0)}})),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();return this.currentUser||e?this.currentUser&&e&&this.currentUser.uid===e.uid?(this._currentUser._assign(e),void await this.currentUser.getIdToken()):void await this._updateCurrentUser(e,!0):void 0}async initializeCurrentUser(e){var t;const n=await this.assertedPersistence.getCurrentUser();let r=n,i=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const n=null===(t=this.redirectUser)||void 0===t?void 0:t._redirectEventId,o=null===r||void 0===r?void 0:r._redirectEventId,s=await this.tryRedirectSignIn(e);n&&n!==o||!(null===s||void 0===s?void 0:s.user)||(r=s.user,i=!0)}if(!r)return this.directlySetCurrentUser(null);if(!r._redirectEventId){if(i)try{await this.beforeStateQueue.runMiddleware(r)}catch(o){r=n,this._popupRedirectResolver._overrideRedirectResult(this,(()=>Promise.reject(o)))}return r?this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}return v(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch(n){await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await Z(e)}catch(t){if("auth/network-request-failed"!==(null===t||void 0===t?void 0:t.code))return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=x()}async _delete(){this._deleted=!0}async updateCurrentUser(e){const t=e?(0,r.m9)(e):null;return t&&v(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&v(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue((async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()}))}async signOut(){return await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0)}setPersistence(e){return this.queue((async()=>{await this.assertedPersistence.setPersistence(_(e))}))}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new r.LL("auth","Firebase",e())}onAuthStateChanged(e,t,n){return this.registerStateListener(this.authStateSubscription,e,t,n)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,n){return this.registerStateListener(this.idTokenSubscription,e,t,n)}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:null===(e=this._currentUser)||void 0===e?void 0:e.toJSON()}}async _setRedirectUser(e,t){const n=await this.getOrInitRedirectPersistenceManager(t);return null===e?n.removeCurrentUser():n.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&_(e)||this._popupRedirectResolver;v(t,this,"argument-error"),this.redirectPersistenceManager=await le.create(this,[_(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,n;return this._isInitialized&&await this.queue((async()=>{})),(null===(t=this._currentUser)||void 0===t?void 0:t._redirectEventId)===e?this._currentUser:(null===(n=this.redirectUser)||void 0===n?void 0:n._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue((async()=>this.directlySetCurrentUser(e)))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const n=null!==(t=null===(e=this.currentUser)||void 0===e?void 0:e.uid)&&void 0!==t?t:null;this.lastNotifiedUid!==n&&(this.lastNotifiedUid=n,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,n,r){if(this._deleted)return()=>{};const i="function"===typeof t?t:t.next.bind(t),o=this._isInitialized?Promise.resolve():this._initializationPromise;return v(o,this,"internal-error"),o.then((()=>i(this.currentUser))),"function"===typeof t?e.addObserver(t,n,r):e.addObserver(t)}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return v(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){e&&!this.frameworks.includes(e)&&(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Ie(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const t={["X-Client-Version"]:this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);const n=await(null===(e=this.heartbeatServiceProvider.getImmediate({optional:!0}))||void 0===e?void 0:e.getHeartbeatsHeader());return n&&(t["X-Firebase-Client"]=n),t}}function Ae(e){return(0,r.m9)(e)}class Ce{constructor(e){this.auth=e,this.observer=null,this.addObserver=(0,r.ne)((e=>this.observer=e))}get next(){return v(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}function xe(e,t,n){const r=Ae(e);v(r._canInitEmulator,r,"emulator-config-failed"),v(/^https?:\/\//.test(t),r,"invalid-emulator-scheme");const i=!!(null===n||void 0===n?void 0:n.disableWarnings),o=Oe(t),{host:s,port:a}=Ne(t),c=null===a?"":`:${a}`;r.config.emulator={url:`${o}//${s}${c}/`},r.settings.appVerificationDisabledForTesting=!0,r.emulatorConfig=Object.freeze({host:s,port:a,protocol:o.replace(":",""),options:Object.freeze({disableWarnings:i})}),i||De()}function Oe(e){const t=e.indexOf(":");return t<0?"":e.substr(0,t+1)}function Ne(e){const t=Oe(e),n=/(\/\/)?([^?#/]+)/.exec(e.substr(t.length));if(!n)return{host:"",port:null};const r=n[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(r);if(i){const e=i[1];return{host:e,port:Re(r.substr(e.length+1))}}{const[e,t]=r.split(":");return{host:e,port:Re(t)}}}function Re(e){if(!e)return null;const t=Number(e);return isNaN(t)?null:t}function De(){function e(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}"undefined"!==typeof console&&"function"===typeof console.info&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),"undefined"!==typeof window&&"undefined"!==typeof document&&("loading"===document.readyState?window.addEventListener("DOMContentLoaded",e):e())}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pe{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return w("not implemented")}_getIdTokenResponse(e){return w("not implemented")}_linkToIdToken(e,t){return w("not implemented")}_getReauthenticationResolver(e){return w("not implemented")}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Le(e,t){return M(e,"POST","/v1/accounts:update",t)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function Me(e,t){return F(e,"POST","/v1/accounts:signInWithPassword",L(e,t))}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function je(e,t){return F(e,"POST","/v1/accounts:signInWithEmailLink",L(e,t))}async function Fe(e,t){return F(e,"POST","/v1/accounts:signInWithEmailLink",L(e,t))}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ue extends Pe{constructor(e,t,n,r=null){super("password",n),this._email=e,this._password=t,this._tenantId=r}static _fromEmailAndPassword(e,t){return new Ue(e,t,"password")}static _fromEmailAndCode(e,t,n=null){return new Ue(e,t,"emailLink",n)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t="string"===typeof e?JSON.parse(e):e;if((null===t||void 0===t?void 0:t.email)&&(null===t||void 0===t?void 0:t.password)){if("password"===t.signInMethod)return this._fromEmailAndPassword(t.email,t.password);if("emailLink"===t.signInMethod)return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":return Me(e,{returnSecureToken:!0,email:this._email,password:this._password});case"emailLink":return je(e,{email:this._email,oobCode:this._password});default:d(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":return Le(e,{idToken:t,returnSecureToken:!0,email:this._email,password:this._password});case"emailLink":return Fe(e,{idToken:t,email:this._email,oobCode:this._password});default:d(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ve(e,t){return F(e,"POST","/v1/accounts:signInWithIdp",L(e,t))}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qe="http://localhost";class $e extends Pe{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new $e(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):d("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t="string"===typeof e?JSON.parse(e):e,{providerId:n,signInMethod:r}=t,i=s(t,["providerId","signInMethod"]);if(!n||!r)return null;const o=new $e(n,r);return o.idToken=i.idToken||void 0,o.accessToken=i.accessToken||void 0,o.secret=i.secret,o.nonce=i.nonce,o.pendingToken=i.pendingToken||null,o}_getIdTokenResponse(e){const t=this.buildRequest();return Ve(e,t)}_linkToIdToken(e,t){const n=this.buildRequest();return n.idToken=t,Ve(e,n)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,Ve(e,t)}buildRequest(){const e={requestUri:qe,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t["id_token"]=this.idToken),this.accessToken&&(t["access_token"]=this.accessToken),this.secret&&(t["oauth_token_secret"]=this.secret),t["providerId"]=this.providerId,this.nonce&&!this.pendingToken&&(t["nonce"]=this.nonce),e.postBody=(0,r.xO)(t)}return e}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Be(e,t){return M(e,"POST","/v1/accounts:sendVerificationCode",L(e,t))}async function He(e,t){return F(e,"POST","/v1/accounts:signInWithPhoneNumber",L(e,t))}async function ze(e,t){const n=await F(e,"POST","/v1/accounts:signInWithPhoneNumber",L(e,t));if(n.temporaryProof)throw q(e,"account-exists-with-different-credential",n);return n}const We={["USER_NOT_FOUND"]:"user-not-found"};async function Ke(e,t){const n=Object.assign(Object.assign({},t),{operation:"REAUTH"});return F(e,"POST","/v1/accounts:signInWithPhoneNumber",L(e,n),We)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ge extends Pe{constructor(e){super("phone","phone"),this.params=e}static _fromVerification(e,t){return new Ge({verificationId:e,verificationCode:t})}static _fromTokenResponse(e,t){return new Ge({phoneNumber:e,temporaryProof:t})}_getIdTokenResponse(e){return He(e,this._makeVerificationRequest())}_linkToIdToken(e,t){return ze(e,Object.assign({idToken:t},this._makeVerificationRequest()))}_getReauthenticationResolver(e){return Ke(e,this._makeVerificationRequest())}_makeVerificationRequest(){const{temporaryProof:e,phoneNumber:t,verificationId:n,verificationCode:r}=this.params;return e&&t?{temporaryProof:e,phoneNumber:t}:{sessionInfo:n,code:r}}toJSON(){const e={providerId:this.providerId};return this.params.phoneNumber&&(e.phoneNumber=this.params.phoneNumber),this.params.temporaryProof&&(e.temporaryProof=this.params.temporaryProof),this.params.verificationCode&&(e.verificationCode=this.params.verificationCode),this.params.verificationId&&(e.verificationId=this.params.verificationId),e}static fromJSON(e){"string"===typeof e&&(e=JSON.parse(e));const{verificationId:t,verificationCode:n,phoneNumber:r,temporaryProof:i}=e;return n||t||r||i?new Ge({verificationId:t,verificationCode:n,phoneNumber:r,temporaryProof:i}):null}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Je(e){switch(e){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function Qe(e){const t=(0,r.zd)((0,r.pd)(e))["link"],n=t?(0,r.zd)((0,r.pd)(t))["deep_link_id"]:null,i=(0,r.zd)((0,r.pd)(e))["deep_link_id"],o=i?(0,r.zd)((0,r.pd)(i))["link"]:null;return o||i||n||t||e}class Xe{constructor(e){var t,n,i,o,s,a;const c=(0,r.zd)((0,r.pd)(e)),u=null!==(t=c["apiKey"])&&void 0!==t?t:null,l=null!==(n=c["oobCode"])&&void 0!==n?n:null,h=Je(null!==(i=c["mode"])&&void 0!==i?i:null);v(u&&l&&h,"argument-error"),this.apiKey=u,this.operation=h,this.code=l,this.continueUrl=null!==(o=c["continueUrl"])&&void 0!==o?o:null,this.languageCode=null!==(s=c["languageCode"])&&void 0!==s?s:null,this.tenantId=null!==(a=c["tenantId"])&&void 0!==a?a:null}static parseLink(e){const t=Qe(e);try{return new Xe(t)}catch(n){return null}}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Ye{constructor(){this.providerId=Ye.PROVIDER_ID}static credential(e,t){return Ue._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const n=Xe.parseLink(t);return v(n,"argument-error"),Ue._fromEmailAndCode(e,n.code,n.tenantId)}}Ye.PROVIDER_ID="password",Ye.EMAIL_PASSWORD_SIGN_IN_METHOD="password",Ye.EMAIL_LINK_SIGN_IN_METHOD="emailLink";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Ze{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class et extends Ze{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class tt extends et{constructor(){super("facebook.com")}static credential(e){return $e._fromParams({providerId:tt.PROVIDER_ID,signInMethod:tt.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return tt.credentialFromTaggedObject(e)}static credentialFromError(e){return tt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e))return null;if(!e.oauthAccessToken)return null;try{return tt.credential(e.oauthAccessToken)}catch(t){return null}}}tt.FACEBOOK_SIGN_IN_METHOD="facebook.com",tt.PROVIDER_ID="facebook.com";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class nt extends et{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return $e._fromParams({providerId:nt.PROVIDER_ID,signInMethod:nt.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return nt.credentialFromTaggedObject(e)}static credentialFromError(e){return nt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:n}=e;if(!t&&!n)return null;try{return nt.credential(t,n)}catch(r){return null}}}nt.GOOGLE_SIGN_IN_METHOD="google.com",nt.PROVIDER_ID="google.com";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class rt extends et{constructor(){super("github.com")}static credential(e){return $e._fromParams({providerId:rt.PROVIDER_ID,signInMethod:rt.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return rt.credentialFromTaggedObject(e)}static credentialFromError(e){return rt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e))return null;if(!e.oauthAccessToken)return null;try{return rt.credential(e.oauthAccessToken)}catch(t){return null}}}rt.GITHUB_SIGN_IN_METHOD="github.com",rt.PROVIDER_ID="github.com";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class it extends et{constructor(){super("twitter.com")}static credential(e,t){return $e._fromParams({providerId:it.PROVIDER_ID,signInMethod:it.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return it.credentialFromTaggedObject(e)}static credentialFromError(e){return it.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:n}=e;if(!t||!n)return null;try{return it.credential(t,n)}catch(r){return null}}}it.TWITTER_SIGN_IN_METHOD="twitter.com",it.PROVIDER_ID="twitter.com";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class ot{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,n,r=!1){const i=await se._fromIdTokenResponse(e,n,r),o=st(n),s=new ot({user:i,providerId:o,_tokenResponse:n,operationType:t});return s}static async _forOperation(e,t,n){await e._updateTokensIfNecessary(n,!0);const r=st(n);return new ot({user:e,providerId:r,_tokenResponse:n,operationType:t})}}function st(e){return e.providerId?e.providerId:"phoneNumber"in e?"phone":null}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class at extends r.ZR{constructor(e,t,n,r){var i;super(t.code,t.message),this.operationType=n,this.user=r,Object.setPrototypeOf(this,at.prototype),this.customData={appName:e.name,tenantId:null!==(i=e.tenantId)&&void 0!==i?i:void 0,_serverResponse:t.customData._serverResponse,operationType:n}}static _fromErrorAndOperation(e,t,n,r){return new at(e,t,n,r)}}function ct(e,t,n,r){const i="reauthenticate"===t?n._getReauthenticationResolver(e):n._getIdTokenResponse(e);return i.catch((n=>{if("auth/multi-factor-auth-required"===n.code)throw at._fromErrorAndOperation(e,n,t,r);throw n}))}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ut(e,t,n=!1){const r=await J(e,t._linkToIdToken(e.auth,await e.getIdToken()),n);return ot._forOperation(e,"link",r)}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function lt(e,t,n=!1){const{auth:r}=e,i="reauthenticate";try{const o=await J(e,ct(r,i,t,e),n);v(o.idToken,r,"internal-error");const s=K(o.idToken);v(s,r,"internal-error");const{sub:a}=s;return v(e.uid===a,r,"user-mismatch"),ot._forOperation(e,i,o)}catch(o){throw"auth/user-not-found"===(null===o||void 0===o?void 0:o.code)&&d(r,"user-mismatch"),o}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ht(e,t,n=!1){const r="signIn",i=await ct(e,r,t),o=await ot._fromIdTokenResponse(e,r,i);return n||await e._updateCurrentUser(o.user),o}function ft(e,t,n,i){return(0,r.m9)(e).onIdTokenChanged(t,n,i)}function dt(e,t,n){return(0,r.m9)(e).beforeAuthStateChanged(t,n)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function pt(e,t){return M(e,"POST","/v2/accounts/mfaEnrollment:start",L(e,t))}function gt(e,t){return M(e,"POST","/v2/accounts/mfaEnrollment:finalize",L(e,t))}new WeakMap;const mt="__sak";
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yt{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(mt,"1"),this.storage.removeItem(mt),Promise.resolve(!0)):Promise.resolve(!1)}catch(e){return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vt(){const e=(0,r.z$)();return de(e)||we(e)}const wt=1e3,bt=10;class Et extends yt{constructor(){super((()=>window.localStorage),"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.safariLocalStorageNotSynced=vt()&&Te(),this.fallbackToPolling=_e(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const n=this.storage.getItem(t),r=this.localCache[t];n!==r&&e(t,r,n)}}onStorageEvent(e,t=!1){if(!e.key)return void this.forAllChangedKeys(((e,t,n)=>{this.notifyListeners(e,n)}));const n=e.key;if(t?this.detachListener():this.stopPolling(),this.safariLocalStorageNotSynced){const r=this.storage.getItem(n);if(e.newValue!==r)null!==e.newValue?this.storage.setItem(n,e.newValue):this.storage.removeItem(n);else if(this.localCache[n]===e.newValue&&!t)return}const r=()=>{const e=this.storage.getItem(n);(t||this.localCache[n]!==e)&&this.notifyListeners(n,e)},i=this.storage.getItem(n);Ee()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(r,bt):r()}notifyListeners(e,t){this.localCache[e]=t;const n=this.listeners[e];if(n)for(const r of Array.from(n))r(t?JSON.parse(t):t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval((()=>{this.forAllChangedKeys(((e,t,n)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:n}),!0)}))}),wt)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){0===Object.keys(this.listeners).length&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),0===this.listeners[e].size&&delete this.listeners[e]),0===Object.keys(this.listeners).length&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}Et.type="LOCAL";const _t=Et;
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tt extends yt{constructor(){super((()=>window.sessionStorage),"SESSION")}_addListener(e,t){}_removeListener(e,t){}}Tt.type="SESSION";const It=Tt;
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function St(e){return Promise.all(e.map((async e=>{try{const t=await e;return{fulfilled:!0,value:t}}catch(t){return{fulfilled:!1,reason:t}}})))}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kt{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find((t=>t.isListeningto(e)));if(t)return t;const n=new kt(e);return this.receivers.push(n),n}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:n,eventType:r,data:i}=t.data,o=this.handlersMap[r];if(!(null===o||void 0===o?void 0:o.size))return;t.ports[0].postMessage({status:"ack",eventId:n,eventType:r});const s=Array.from(o).map((async e=>e(t.origin,i))),a=await St(s);t.ports[0].postMessage({status:"done",eventId:n,eventType:r,response:a})}_subscribe(e,t){0===Object.keys(this.handlersMap).length&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),t&&0!==this.handlersMap[e].size||delete this.handlersMap[e],0===Object.keys(this.handlersMap).length&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function At(e="",t=10){let n="";for(let r=0;r<t;r++)n+=Math.floor(10*Math.random());return e+n}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */kt.receivers=[];class Ct{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,n=50){const r="undefined"!==typeof MessageChannel?new MessageChannel:null;if(!r)throw new Error("connection_unavailable");let i,o;return new Promise(((s,a)=>{const c=At("",20);r.port1.start();const u=setTimeout((()=>{a(new Error("unsupported_event"))}),n);o={messageChannel:r,onMessage(e){const t=e;if(t.data.eventId===c)switch(t.data.status){case"ack":clearTimeout(u),i=setTimeout((()=>{a(new Error("timeout"))}),3e3);break;case"done":clearTimeout(i),s(t.data.response);break;default:clearTimeout(u),clearTimeout(i),a(new Error("invalid_response"));break}}},this.handlers.add(o),r.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:c,data:t},[r.port2])})).finally((()=>{o&&this.removeMessageHandler(o)}))}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xt(){return window}function Ot(e){xt().location.href=e}
/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Nt(){return"undefined"!==typeof xt()["WorkerGlobalScope"]&&"function"===typeof xt()["importScripts"]}async function Rt(){if(!(null===navigator||void 0===navigator?void 0:navigator.serviceWorker))return null;try{const e=await navigator.serviceWorker.ready;return e.active}catch(e){return null}}function Dt(){var e;return(null===(e=null===navigator||void 0===navigator?void 0:navigator.serviceWorker)||void 0===e?void 0:e.controller)||null}function Pt(){return Nt()?self:null}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lt="firebaseLocalStorageDb",Mt=1,jt="firebaseLocalStorage",Ft="fbase_key";class Ut{constructor(e){this.request=e}toPromise(){return new Promise(((e,t)=>{this.request.addEventListener("success",(()=>{e(this.request.result)})),this.request.addEventListener("error",(()=>{t(this.request.error)}))}))}}function Vt(e,t){return e.transaction([jt],t?"readwrite":"readonly").objectStore(jt)}function qt(){const e=indexedDB.deleteDatabase(Lt);return new Ut(e).toPromise()}function $t(){const e=indexedDB.open(Lt,Mt);return new Promise(((t,n)=>{e.addEventListener("error",(()=>{n(e.error)})),e.addEventListener("upgradeneeded",(()=>{const t=e.result;try{t.createObjectStore(jt,{keyPath:Ft})}catch(r){n(r)}})),e.addEventListener("success",(async()=>{const n=e.result;n.objectStoreNames.contains(jt)?t(n):(n.close(),await qt(),t(await $t()))}))}))}async function Bt(e,t,n){const r=Vt(e,!0).put({[Ft]:t,value:n});return new Ut(r).toPromise()}async function Ht(e,t){const n=Vt(e,!1).get(t),r=await new Ut(n).toPromise();return void 0===r?null:r.value}function zt(e,t){const n=Vt(e,!0).delete(t);return new Ut(n).toPromise()}const Wt=800,Kt=3;class Gt{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then((()=>{}),(()=>{}))}async _openDb(){return this.db||(this.db=await $t()),this.db}async _withRetries(e){let t=0;while(1)try{const t=await this._openDb();return await e(t)}catch(n){if(t++>Kt)throw n;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Nt()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=kt._getInstance(Pt()),this.receiver._subscribe("keyChanged",(async(e,t)=>{const n=await this._poll();return{keyProcessed:n.includes(t.key)}})),this.receiver._subscribe("ping",(async(e,t)=>["keyChanged"]))}async initializeSender(){var e,t;if(this.activeServiceWorker=await Rt(),!this.activeServiceWorker)return;this.sender=new Ct(this.activeServiceWorker);const n=await this.sender._send("ping",{},800);n&&(null===(e=n[0])||void 0===e?void 0:e.fulfilled)&&(null===(t=n[0])||void 0===t?void 0:t.value.includes("keyChanged"))&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(this.sender&&this.activeServiceWorker&&Dt()===this.activeServiceWorker)try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch(t){}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await $t();return await Bt(e,mt,"1"),await zt(e,mt),!0}catch(e){}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite((async()=>(await this._withRetries((n=>Bt(n,e,t))),this.localCache[e]=t,this.notifyServiceWorker(e))))}async _get(e){const t=await this._withRetries((t=>Ht(t,e)));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite((async()=>(await this._withRetries((t=>zt(t,e))),delete this.localCache[e],this.notifyServiceWorker(e))))}async _poll(){const e=await this._withRetries((e=>{const t=Vt(e,!1).getAll();return new Ut(t).toPromise()}));if(!e)return[];if(0!==this.pendingWrites)return[];const t=[],n=new Set;for(const{fbase_key:r,value:i}of e)n.add(r),JSON.stringify(this.localCache[r])!==JSON.stringify(i)&&(this.notifyListeners(r,i),t.push(r));for(const r of Object.keys(this.localCache))this.localCache[r]&&!n.has(r)&&(this.notifyListeners(r,null),t.push(r));return t}notifyListeners(e,t){this.localCache[e]=t;const n=this.listeners[e];if(n)for(const r of Array.from(n))r(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval((async()=>this._poll()),Wt)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){0===Object.keys(this.listeners).length&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),0===this.listeners[e].size&&delete this.listeners[e]),0===Object.keys(this.listeners).length&&this.stopPolling()}}Gt.type="LOCAL";const Jt=Gt;
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qt(e,t){return M(e,"POST","/v2/accounts/mfaSignIn:start",L(e,t))}function Xt(e,t){return M(e,"POST","/v2/accounts/mfaSignIn:finalize",L(e,t))}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Yt(){var e,t;return null!==(t=null===(e=document.getElementsByTagName("head"))||void 0===e?void 0:e[0])&&void 0!==t?t:document}function Zt(e){return new Promise(((t,n)=>{const r=document.createElement("script");r.setAttribute("src",e),r.onload=t,r.onerror=e=>{const t=p("internal-error");t.customData=e,n(t)},r.type="text/javascript",r.charset="UTF-8",Yt().appendChild(r)}))}function en(e){return`__${e}${Math.floor(1e6*Math.random())}`}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
en("rcb"),new O(3e4,6e4);
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const tn="recaptcha";async function nn(e,t,n){var r;const i=await n.verify();try{let o;if(v("string"===typeof i,e,"argument-error"),v(n.type===tn,e,"argument-error"),o="string"===typeof t?{phoneNumber:t}:t,"session"in o){const t=o.session;if("phoneNumber"in o){v("enroll"===t.type,e,"internal-error");const n=await pt(e,{idToken:t.credential,phoneEnrollmentInfo:{phoneNumber:o.phoneNumber,recaptchaToken:i}});return n.phoneSessionInfo.sessionInfo}{v("signin"===t.type,e,"internal-error");const n=(null===(r=o.multiFactorHint)||void 0===r?void 0:r.uid)||o.multiFactorUid;v(n,e,"missing-multi-factor-info");const s=await Qt(e,{mfaPendingCredential:t.credential,mfaEnrollmentId:n,phoneSignInInfo:{recaptchaToken:i}});return s.phoneResponseInfo.sessionInfo}}{const{sessionInfo:t}=await Be(e,{phoneNumber:o.phoneNumber,recaptchaToken:i});return t}}finally{n._reset()}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class rn{constructor(e){this.providerId=rn.PROVIDER_ID,this.auth=Ae(e)}verifyPhoneNumber(e,t){return nn(this.auth,e,(0,r.m9)(t))}static credential(e,t){return Ge._fromVerification(e,t)}static credentialFromResult(e){const t=e;return rn.credentialFromTaggedObject(t)}static credentialFromError(e){return rn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{phoneNumber:t,temporaryProof:n}=e;return t&&n?Ge._fromTokenResponse(t,n):null}}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function on(e,t){return t?_(t):(v(e._popupRedirectResolver,e,"argument-error"),e._popupRedirectResolver)}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */rn.PROVIDER_ID="phone",rn.PHONE_SIGN_IN_METHOD="phone";class sn extends Pe{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Ve(e,this._buildIdpRequest())}_linkToIdToken(e,t){return Ve(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return Ve(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function an(e){return ht(e.auth,new sn(e),e.bypassAuthState)}function cn(e){const{auth:t,user:n}=e;return v(n,t,"internal-error"),lt(n,new sn(e),e.bypassAuthState)}async function un(e){const{auth:t,user:n}=e;return v(n,t,"internal-error"),ut(n,new sn(e),e.bypassAuthState)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ln{constructor(e,t,n,r,i=!1){this.auth=e,this.resolver=n,this.user=r,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise((async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(n){this.reject(n)}}))}async onAuthEvent(e){const{urlResponse:t,sessionId:n,postBody:r,tenantId:i,error:o,type:s}=e;if(o)return void this.reject(o);const a={auth:this.auth,requestUri:t,sessionId:n,tenantId:i||void 0,postBody:r||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(s)(a))}catch(c){this.reject(c)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return an;case"linkViaPopup":case"linkViaRedirect":return un;case"reauthViaPopup":case"reauthViaRedirect":return cn;default:d(this.auth,"internal-error")}}resolve(e){b(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){b(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hn=new O(2e3,1e4);async function fn(e,t,n){const r=Ae(e);m(e,t,Ze);const i=on(r,n),o=new dn(r,"signInViaPopup",t,i);return o.executeNotNull()}class dn extends ln{constructor(e,t,n,r,i){super(e,t,r,i),this.provider=n,this.authWindow=null,this.pollId=null,dn.currentPopupAction&&dn.currentPopupAction.cancel(),dn.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return v(e,this.auth,"internal-error"),e}async onExecution(){b(1===this.filter.length,"Popup operations only handle one event");const e=At();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch((e=>{this.reject(e)})),this.resolver._isIframeWebStorageSupported(this.auth,(e=>{e||this.reject(p(this.auth,"web-storage-unsupported"))})),this.pollUserCancellation()}get eventId(){var e;return(null===(e=this.authWindow)||void 0===e?void 0:e.associatedEvent)||null}cancel(){this.reject(p(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,dn.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,n;(null===(n=null===(t=this.authWindow)||void 0===t?void 0:t.window)||void 0===n?void 0:n.closed)?this.pollId=window.setTimeout((()=>{this.pollId=null,this.reject(p(this.auth,"popup-closed-by-user"))}),2e3):this.pollId=window.setTimeout(e,hn.get())};e()}}dn.currentPopupAction=null;
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const pn="pendingRedirect",gn=new Map;class mn extends ln{constructor(e,t,n=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,n),this.eventId=null}async execute(){let e=gn.get(this.auth._key());if(!e){try{const t=await yn(this.resolver,this.auth),n=t?await super.execute():null;e=()=>Promise.resolve(n)}catch(t){e=()=>Promise.reject(t)}gn.set(this.auth._key(),e)}return this.bypassAuthState||gn.set(this.auth._key(),(()=>Promise.resolve(null))),e()}async onAuthEvent(e){if("signInViaRedirect"===e.type)return super.onAuthEvent(e);if("unknown"!==e.type){if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}else this.resolve(null)}async onExecution(){}cleanUp(){}}async function yn(e,t){const n=En(t),r=bn(e);if(!await r._isAvailable())return!1;const i="true"===await r._get(n);return await r._remove(n),i}async function vn(e,t){return bn(e)._set(En(t),"true")}function wn(e,t){gn.set(e._key(),t)}function bn(e){return _(e._redirectPersistence)}function En(e){return ue(pn,e.config.apiKey,e.name)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _n(e,t,n){return Tn(e,t,n)}async function Tn(e,t,n){const r=Ae(e);m(e,t,Ze),await r._initializationPromise;const i=on(r,n);return await vn(i,r),i._openRedirect(r,t,"signInViaRedirect")}async function In(e,t,n=!1){const r=Ae(e),i=on(r,t),o=new mn(r,i,n),s=await o.execute();return s&&!n&&(delete s.user._redirectEventId,await r._persistUserIfCurrent(s.user),await r._setRedirectUser(null,t)),s}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Sn=6e5;class kn{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach((n=>{this.isEventForConsumer(e,n)&&(t=!0,this.sendToConsumer(e,n),this.saveEventToCache(e))})),this.hasHandledPotentialRedirect||!xn(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var n;if(e.error&&!Cn(e)){const r=(null===(n=e.error.code)||void 0===n?void 0:n.split("auth/")[1])||"internal-error";t.onError(p(this.auth,r))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const n=null===t.eventId||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&n}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=Sn&&this.cachedEventUids.clear(),this.cachedEventUids.has(An(e))}saveEventToCache(e){this.cachedEventUids.add(An(e)),this.lastProcessedEventTime=Date.now()}}function An(e){return[e.type,e.eventId,e.sessionId,e.tenantId].filter((e=>e)).join("-")}function Cn({type:e,error:t}){return"unknown"===e&&"auth/no-auth-event"===(null===t||void 0===t?void 0:t.code)}function xn(e){switch(e.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Cn(e);default:return!1}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function On(e,t={}){return M(e,"GET","/v1/projects",t)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nn=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,Rn=/^https?/;async function Dn(e){if(e.config.emulator)return;const{authorizedDomains:t}=await On(e);for(const r of t)try{if(Pn(r))return}catch(n){}d(e,"unauthorized-domain")}function Pn(e){const t=S(),{protocol:n,hostname:r}=new URL(t);if(e.startsWith("chrome-extension://")){const i=new URL(e);return""===i.hostname&&""===r?"chrome-extension:"===n&&e.replace("chrome-extension://","")===t.replace("chrome-extension://",""):"chrome-extension:"===n&&i.hostname===r}if(!Rn.test(n))return!1;if(Nn.test(e))return r===e;const i=e.replace(/\./g,"\\."),o=new RegExp("^(.+\\."+i+"|"+i+")$","i");return o.test(r)}
/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ln=new O(3e4,6e4);function Mn(){const e=xt().___jsl;if(null===e||void 0===e?void 0:e.H)for(const t of Object.keys(e.H))if(e.H[t].r=e.H[t].r||[],e.H[t].L=e.H[t].L||[],e.H[t].r=[...e.H[t].L],e.CP)for(let n=0;n<e.CP.length;n++)e.CP[n]=null}function jn(e){return new Promise(((t,n)=>{var r,i,o;function s(){Mn(),gapi.load("gapi.iframes",{callback:()=>{t(gapi.iframes.getContext())},ontimeout:()=>{Mn(),n(p(e,"network-request-failed"))},timeout:Ln.get()})}if(null===(i=null===(r=xt().gapi)||void 0===r?void 0:r.iframes)||void 0===i?void 0:i.Iframe)t(gapi.iframes.getContext());else{if(!(null===(o=xt().gapi)||void 0===o?void 0:o.load)){const t=en("iframefcb");return xt()[t]=()=>{gapi.load?s():n(p(e,"network-request-failed"))},Zt(`https://apis.google.com/js/api.js?onload=${t}`).catch((e=>n(e)))}s()}})).catch((e=>{throw Fn=null,e}))}let Fn=null;function Un(e){return Fn=Fn||jn(e),Fn}
/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vn=new O(5e3,15e3),qn="__/auth/iframe",$n="emulator/auth/iframe",Bn={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},Hn=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function zn(e){const t=e.config;v(t.authDomain,e,"auth-domain-config-required");const n=t.emulator?N(t,$n):`https://${e.config.authDomain}/${qn}`,o={apiKey:t.apiKey,appName:e.name,v:i.Jn},s=Hn.get(e.config.apiHost);s&&(o.eid=s);const a=e._getFrameworks();return a.length&&(o.fw=a.join(",")),`${n}?${(0,r.xO)(o).slice(1)}`}async function Wn(e){const t=await Un(e),n=xt().gapi;return v(n,e,"internal-error"),t.open({where:document.body,url:zn(e),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:Bn,dontclear:!0},(t=>new Promise((async(n,r)=>{await t.restyle({setHideOnLeave:!1});const i=p(e,"network-request-failed"),o=xt().setTimeout((()=>{r(i)}),Vn.get());function s(){xt().clearTimeout(o),n(t)}t.ping(s).then(s,(()=>{r(i)}))}))))}
/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Kn={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},Gn=500,Jn=600,Qn="_blank",Xn="http://localhost";class Yn{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch(e){}}}function Zn(e,t,n,i=Gn,o=Jn){const s=Math.max((window.screen.availHeight-o)/2,0).toString(),a=Math.max((window.screen.availWidth-i)/2,0).toString();let c="";const u=Object.assign(Object.assign({},Kn),{width:i.toString(),height:o.toString(),top:s,left:a}),l=(0,r.z$)().toLowerCase();n&&(c=pe(l)?Qn:n),fe(l)&&(t=t||Xn,u.scrollbars="yes");const h=Object.entries(u).reduce(((e,[t,n])=>`${e}${t}=${n},`),"");if(be(l)&&"_self"!==c)return er(t||"",c),new Yn(null);const f=window.open(t||"",c,h);v(f,e,"popup-blocked");try{f.focus()}catch(d){}return new Yn(f)}function er(e,t){const n=document.createElement("a");n.href=e,n.target=t;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(r)}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tr="__/auth/handler",nr="emulator/auth/handler";function rr(e,t,n,o,s,a){v(e.config.authDomain,e,"auth-domain-config-required"),v(e.config.apiKey,e,"invalid-api-key");const c={apiKey:e.config.apiKey,appName:e.name,authType:n,redirectUrl:o,v:i.Jn,eventId:s};if(t instanceof Ze){t.setDefaultLanguage(e.languageCode),c.providerId=t.providerId||"",(0,r.xb)(t.getCustomParameters())||(c.customParameters=JSON.stringify(t.getCustomParameters()));for(const[e,t]of Object.entries(a||{}))c[e]=t}if(t instanceof et){const e=t.getScopes().filter((e=>""!==e));e.length>0&&(c.scopes=e.join(","))}e.tenantId&&(c.tid=e.tenantId);const u=c;for(const r of Object.keys(u))void 0===u[r]&&delete u[r];return`${ir(e)}?${(0,r.xO)(u).slice(1)}`}function ir({config:e}){return e.emulator?N(e,nr):`https://${e.authDomain}/${tr}`}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const or="webStorageSupport";class sr{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=It,this._completeRedirectFn=In,this._overrideRedirectResult=wn}async _openPopup(e,t,n,r){var i;b(null===(i=this.eventManagers[e._key()])||void 0===i?void 0:i.manager,"_initialize() not called before _openPopup()");const o=rr(e,t,n,S(),r);return Zn(e,o,At())}async _openRedirect(e,t,n,r){return await this._originValidation(e),Ot(rr(e,t,n,S(),r)),new Promise((()=>{}))}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:e,promise:n}=this.eventManagers[t];return e?Promise.resolve(e):(b(n,"If manager is not set, promise should be"),n)}const n=this.initAndGetManager(e);return this.eventManagers[t]={promise:n},n.catch((()=>{delete this.eventManagers[t]})),n}async initAndGetManager(e){const t=await Wn(e),n=new kn(e);return t.register("authEvent",(t=>{v(null===t||void 0===t?void 0:t.authEvent,e,"invalid-auth-event");const r=n.onEvent(t.authEvent);return{status:r?"ACK":"ERROR"}}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:n},this.iframes[e._key()]=t,n}_isIframeWebStorageSupported(e,t){const n=this.iframes[e._key()];n.send(or,{type:or},(n=>{var r;const i=null===(r=null===n||void 0===n?void 0:n[0])||void 0===r?void 0:r[or];void 0!==i&&t(!!i),d(e,"internal-error")}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=Dn(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return _e()||de()||we()}}const ar=sr;class cr{constructor(e){this.factorId=e}_process(e,t,n){switch(t.type){case"enroll":return this._finalizeEnroll(e,t.credential,n);case"signin":return this._finalizeSignIn(e,t.credential);default:return w("unexpected MultiFactorSessionType")}}}class ur extends cr{constructor(e){super("phone"),this.credential=e}static _fromCredential(e){return new ur(e)}_finalizeEnroll(e,t,n){return gt(e,{idToken:t,displayName:n,phoneVerificationInfo:this.credential._makeVerificationRequest()})}_finalizeSignIn(e,t){return Xt(e,{mfaPendingCredential:t,phoneVerificationInfo:this.credential._makeVerificationRequest()})}}class lr{constructor(){}static assertion(e){return ur._fromCredential(e)}}lr.FACTOR_ID="phone";var hr="@firebase/auth",fr="0.21.4";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class dr{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),(null===(e=this.auth.currentUser)||void 0===e?void 0:e.uid)||null}async getToken(e){if(this.assertAuthConfigured(),await this.auth._initializationPromise,!this.auth.currentUser)return null;const t=await this.auth.currentUser.getIdToken(e);return{accessToken:t}}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged((t=>{e((null===t||void 0===t?void 0:t.stsTokenManager.accessToken)||null)}));this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){v(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pr(e){switch(e){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";default:return}}function gr(e){(0,i.Xd)(new a.wA("auth",((t,{options:n})=>{const r=t.getProvider("app").getImmediate(),i=t.getProvider("heartbeat"),{apiKey:o,authDomain:s}=r.options;return((t,r)=>{v(o&&!o.includes(":"),"invalid-api-key",{appName:t.name}),v(!(null===s||void 0===s?void 0:s.includes(":")),"argument-error",{appName:t.name});const i={apiKey:o,authDomain:s,clientPlatform:e,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Ie(e)},a=new ke(t,r,i);return I(a,n),a})(r,i)}),"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback(((e,t,n)=>{const r=e.getProvider("auth-internal");r.initialize()}))),(0,i.Xd)(new a.wA("auth-internal",(e=>{const t=Ae(e.getProvider("auth").getImmediate());return(e=>new dr(e))(t)}),"PRIVATE").setInstantiationMode("EXPLICIT")),(0,i.KN)(hr,fr,pr(e)),(0,i.KN)(hr,fr,"esm2017")}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mr=300,yr=(0,r.Pz)("authIdTokenMaxAge")||mr;let vr=null;const wr=e=>async t=>{const n=t&&await t.getIdTokenResult(),r=n&&((new Date).getTime()-Date.parse(n.issuedAtTime))/1e3;if(r&&r>yr)return;const i=null===n||void 0===n?void 0:n.token;vr!==i&&(vr=i,await fetch(e,{method:i?"POST":"DELETE",headers:i?{Authorization:`Bearer ${i}`}:{}}))};function br(e=(0,i.Mq)()){const t=(0,i.qX)(e,"auth");if(t.isInitialized())return t.getImmediate();const n=T(e,{popupRedirectResolver:ar,persistence:[Jt,_t,It]}),o=(0,r.Pz)("authTokenSyncURL");if(o){const e=wr(o);dt(n,e,(()=>e(n.currentUser))),ft(n,(t=>e(t)))}const s=(0,r.q4)("auth");return s&&xe(n,`http://${s}`),n}gr("Browser")},36:function(e,t,n){"use strict";n.d(t,{ET:function(){return Ph},Ab:function(){return qh},vr:function(){return Vh},hJ:function(){return Al},JU:function(){return Cl},QT:function(){return xh},PL:function(){return Nh},ad:function(){return Rl},cf:function(){return Lh},IO:function(){return gh},pl:function(){return Rh},r7:function(){return Dh},qs:function(){return $h}});n(3767),n(8585),n(8696),n(7658),n(2801);var r,i=n(9684),o=n(7142),s=n(5168),a=n(223),c=(n(541),"undefined"!==typeof globalThis?globalThis:"undefined"!==typeof window?window:"undefined"!==typeof n.g?n.g:"undefined"!==typeof self?self:{}),u={},l=l||{},h=c||self;function f(){}function d(e){var t=typeof e;return t="object"!=t?t:e?Array.isArray(e)?"array":t:"null","array"==t||"object"==t&&"number"==typeof e.length}function p(e){var t=typeof e;return"object"==t&&null!=e||"function"==t}function g(e){return Object.prototype.hasOwnProperty.call(e,m)&&e[m]||(e[m]=++y)}var m="closure_uid_"+(1e9*Math.random()>>>0),y=0;function v(e,t,n){return e.call.apply(e.bind,arguments)}function w(e,t,n){if(!e)throw Error();if(2<arguments.length){var r=Array.prototype.slice.call(arguments,2);return function(){var n=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(n,r),e.apply(t,n)}}return function(){return e.apply(t,arguments)}}function b(e,t,n){return b=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?v:w,b.apply(null,arguments)}function E(e,t){var n=Array.prototype.slice.call(arguments,1);return function(){var t=n.slice();return t.push.apply(t,arguments),e.apply(this,t)}}function _(e,t){function n(){}n.prototype=t.prototype,e.X=t.prototype,e.prototype=new n,e.prototype.constructor=e,e.Wb=function(e,n,r){for(var i=Array(arguments.length-2),o=2;o<arguments.length;o++)i[o-2]=arguments[o];return t.prototype[n].apply(e,i)}}function T(){this.s=this.s,this.o=this.o}var I=0;T.prototype.s=!1,T.prototype.na=function(){this.s||(this.s=!0,this.M(),0==I)||g(this)},T.prototype.M=function(){if(this.o)for(;this.o.length;)this.o.shift()()};const S=Array.prototype.indexOf?function(e,t){return Array.prototype.indexOf.call(e,t,void 0)}:function(e,t){if("string"===typeof e)return"string"!==typeof t||1!=t.length?-1:e.indexOf(t,0);for(let n=0;n<e.length;n++)if(n in e&&e[n]===t)return n;return-1};function k(e){const t=e.length;if(0<t){const n=Array(t);for(let r=0;r<t;r++)n[r]=e[r];return n}return[]}function A(e,t){for(let n=1;n<arguments.length;n++){const t=arguments[n];if(d(t)){const n=e.length||0,r=t.length||0;e.length=n+r;for(let i=0;i<r;i++)e[n+i]=t[i]}else e.push(t)}}function C(e,t){this.type=e,this.g=this.target=t,this.defaultPrevented=!1}C.prototype.h=function(){this.defaultPrevented=!0};var x=function(){if(!h.addEventListener||!Object.defineProperty)return!1;var e=!1,t=Object.defineProperty({},"passive",{get:function(){e=!0}});try{h.addEventListener("test",f,t),h.removeEventListener("test",f,t)}catch(n){}return e}();function O(e){return/^[\s\xa0]*$/.test(e)}var N=String.prototype.trim?function(e){return e.trim()}:function(e){return/^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(e)[1]};function R(e,t){return e<t?-1:e>t?1:0}function D(){var e=h.navigator;return e&&(e=e.userAgent)?e:""}function P(e){return-1!=D().indexOf(e)}function L(e){return L[" "](e),e}function M(e){var t=J;return Object.prototype.hasOwnProperty.call(t,9)?t[9]:t[9]=e(9)}L[" "]=f;var j,F=P("Opera"),U=P("Trident")||P("MSIE"),V=P("Edge"),q=V||U,$=P("Gecko")&&!(-1!=D().toLowerCase().indexOf("webkit")&&!P("Edge"))&&!(P("Trident")||P("MSIE"))&&!P("Edge"),B=-1!=D().toLowerCase().indexOf("webkit")&&!P("Edge");function H(){var e=h.document;return e?e.documentMode:void 0}e:{var z="",W=function(){var e=D();return $?/rv:([^\);]+)(\)|;)/.exec(e):V?/Edge\/([\d\.]+)/.exec(e):U?/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(e):B?/WebKit\/(\S+)/.exec(e):F?/(?:Version)[ \/]?(\S+)/.exec(e):void 0}();if(W&&(z=W?W[1]:""),U){var K=H();if(null!=K&&K>parseFloat(z)){j=String(K);break e}}j=z}var G,J={};function Q(){return M((function(){let e=0;const t=N(String(j)).split("."),n=N("9").split("."),r=Math.max(t.length,n.length);for(let s=0;0==e&&s<r;s++){var i=t[s]||"",o=n[s]||"";do{if(i=/(\d*)(\D*)(.*)/.exec(i)||["","","",""],o=/(\d*)(\D*)(.*)/.exec(o)||["","","",""],0==i[0].length&&0==o[0].length)break;e=R(0==i[1].length?0:parseInt(i[1],10),0==o[1].length?0:parseInt(o[1],10))||R(0==i[2].length,0==o[2].length)||R(i[2],o[2]),i=i[3],o=o[3]}while(0==e)}return 0<=e}))}if(h.document&&U){var X=H();G=X||(parseInt(j,10)||void 0)}else G=void 0;var Y=G;function Z(e,t){if(C.call(this,e?e.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,e){var n=this.type=e.type,r=e.changedTouches&&e.changedTouches.length?e.changedTouches[0]:null;if(this.target=e.target||e.srcElement,this.g=t,t=e.relatedTarget){if($){e:{try{L(t.nodeName);var i=!0;break e}catch(o){}i=!1}i||(t=null)}}else"mouseover"==n?t=e.fromElement:"mouseout"==n&&(t=e.toElement);this.relatedTarget=t,r?(this.clientX=void 0!==r.clientX?r.clientX:r.pageX,this.clientY=void 0!==r.clientY?r.clientY:r.pageY,this.screenX=r.screenX||0,this.screenY=r.screenY||0):(this.clientX=void 0!==e.clientX?e.clientX:e.pageX,this.clientY=void 0!==e.clientY?e.clientY:e.pageY,this.screenX=e.screenX||0,this.screenY=e.screenY||0),this.button=e.button,this.key=e.key||"",this.ctrlKey=e.ctrlKey,this.altKey=e.altKey,this.shiftKey=e.shiftKey,this.metaKey=e.metaKey,this.pointerId=e.pointerId||0,this.pointerType="string"===typeof e.pointerType?e.pointerType:ee[e.pointerType]||"",this.state=e.state,this.i=e,e.defaultPrevented&&Z.X.h.call(this)}}_(Z,C);var ee={2:"touch",3:"pen",4:"mouse"};Z.prototype.h=function(){Z.X.h.call(this);var e=this.i;e.preventDefault?e.preventDefault():e.returnValue=!1};var te="closure_listenable_"+(1e6*Math.random()|0),ne=0;function re(e,t,n,r,i){this.listener=e,this.proxy=null,this.src=t,this.type=n,this.capture=!!r,this.ha=i,this.key=++ne,this.ba=this.ea=!1}function ie(e){e.ba=!0,e.listener=null,e.proxy=null,e.src=null,e.ha=null}function oe(e,t,n){for(const r in e)t.call(n,e[r],r,e)}function se(e){const t={};for(const n in e)t[n]=e[n];return t}const ae="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function ce(e,t){let n,r;for(let i=1;i<arguments.length;i++){for(n in r=arguments[i],r)e[n]=r[n];for(let t=0;t<ae.length;t++)n=ae[t],Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}}function ue(e){this.src=e,this.g={},this.h=0}function le(e,t){var n=t.type;if(n in e.g){var r,i=e.g[n],o=S(i,t);(r=0<=o)&&Array.prototype.splice.call(i,o,1),r&&(ie(t),0==e.g[n].length&&(delete e.g[n],e.h--))}}function he(e,t,n,r){for(var i=0;i<e.length;++i){var o=e[i];if(!o.ba&&o.listener==t&&o.capture==!!n&&o.ha==r)return i}return-1}ue.prototype.add=function(e,t,n,r,i){var o=e.toString();e=this.g[o],e||(e=this.g[o]=[],this.h++);var s=he(e,t,r,i);return-1<s?(t=e[s],n||(t.ea=!1)):(t=new re(t,this.src,o,!!r,i),t.ea=n,e.push(t)),t};var fe="closure_lm_"+(1e6*Math.random()|0),de={};function pe(e,t,n,r,i){if(r&&r.once)return ye(e,t,n,r,i);if(Array.isArray(t)){for(var o=0;o<t.length;o++)pe(e,t[o],n,r,i);return null}return n=Ie(n),e&&e[te]?e.N(t,n,p(r)?!!r.capture:!!r,i):ge(e,t,n,!1,r,i)}function ge(e,t,n,r,i,o){if(!t)throw Error("Invalid event type");var s=p(i)?!!i.capture:!!i,a=_e(e);if(a||(e[fe]=a=new ue(e)),n=a.add(t,n,r,s,o),n.proxy)return n;if(r=me(),n.proxy=r,r.src=e,r.listener=n,e.addEventListener)x||(i=s),void 0===i&&(i=!1),e.addEventListener(t.toString(),r,i);else if(e.attachEvent)e.attachEvent(be(t.toString()),r);else{if(!e.addListener||!e.removeListener)throw Error("addEventListener and attachEvent are unavailable.");e.addListener(r)}return n}function me(){function e(n){return t.call(e.src,e.listener,n)}const t=Ee;return e}function ye(e,t,n,r,i){if(Array.isArray(t)){for(var o=0;o<t.length;o++)ye(e,t[o],n,r,i);return null}return n=Ie(n),e&&e[te]?e.O(t,n,p(r)?!!r.capture:!!r,i):ge(e,t,n,!0,r,i)}function ve(e,t,n,r,i){if(Array.isArray(t))for(var o=0;o<t.length;o++)ve(e,t[o],n,r,i);else r=p(r)?!!r.capture:!!r,n=Ie(n),e&&e[te]?(e=e.i,t=String(t).toString(),t in e.g&&(o=e.g[t],n=he(o,n,r,i),-1<n&&(ie(o[n]),Array.prototype.splice.call(o,n,1),0==o.length&&(delete e.g[t],e.h--)))):e&&(e=_e(e))&&(t=e.g[t.toString()],e=-1,t&&(e=he(t,n,r,i)),(n=-1<e?t[e]:null)&&we(n))}function we(e){if("number"!==typeof e&&e&&!e.ba){var t=e.src;if(t&&t[te])le(t.i,e);else{var n=e.type,r=e.proxy;t.removeEventListener?t.removeEventListener(n,r,e.capture):t.detachEvent?t.detachEvent(be(n),r):t.addListener&&t.removeListener&&t.removeListener(r),(n=_e(t))?(le(n,e),0==n.h&&(n.src=null,t[fe]=null)):ie(e)}}}function be(e){return e in de?de[e]:de[e]="on"+e}function Ee(e,t){if(e.ba)e=!0;else{t=new Z(t,this);var n=e.listener,r=e.ha||e.src;e.ea&&we(e),e=n.call(r,t)}return e}function _e(e){return e=e[fe],e instanceof ue?e:null}var Te="__closure_events_fn_"+(1e9*Math.random()>>>0);function Ie(e){return"function"===typeof e?e:(e[Te]||(e[Te]=function(t){return e.handleEvent(t)}),e[Te])}function Se(){T.call(this),this.i=new ue(this),this.P=this,this.I=null}function ke(e,t){var n,r=e.I;if(r)for(n=[];r;r=r.I)n.push(r);if(e=e.P,r=t.type||t,"string"===typeof t)t=new C(t,e);else if(t instanceof C)t.target=t.target||e;else{var i=t;t=new C(r,e),ce(t,i)}if(i=!0,n)for(var o=n.length-1;0<=o;o--){var s=t.g=n[o];i=Ae(s,r,!0,t)&&i}if(s=t.g=e,i=Ae(s,r,!0,t)&&i,i=Ae(s,r,!1,t)&&i,n)for(o=0;o<n.length;o++)s=t.g=n[o],i=Ae(s,r,!1,t)&&i}function Ae(e,t,n,r){if(t=e.i.g[String(t)],!t)return!0;t=t.concat();for(var i=!0,o=0;o<t.length;++o){var s=t[o];if(s&&!s.ba&&s.capture==n){var a=s.listener,c=s.ha||s.src;s.ea&&le(e.i,s),i=!1!==a.call(c,r)&&i}}return i&&!r.defaultPrevented}_(Se,T),Se.prototype[te]=!0,Se.prototype.removeEventListener=function(e,t,n,r){ve(this,e,t,n,r)},Se.prototype.M=function(){if(Se.X.M.call(this),this.i){var e,t=this.i;for(e in t.g){for(var n=t.g[e],r=0;r<n.length;r++)ie(n[r]);delete t.g[e],t.h--}}this.I=null},Se.prototype.N=function(e,t,n,r){return this.i.add(String(e),t,!1,n,r)},Se.prototype.O=function(e,t,n,r){return this.i.add(String(e),t,!0,n,r)};var Ce=h.JSON.stringify;function xe(){var e=Fe;let t=null;return e.g&&(t=e.g,e.g=e.g.next,e.g||(e.h=null),t.next=null),t}class Oe{constructor(){this.h=this.g=null}add(e,t){const n=Re.get();n.set(e,t),this.h?this.h.next=n:this.g=n,this.h=n}}var Ne,Re=new class{constructor(e,t){this.i=e,this.j=t,this.h=0,this.g=null}get(){let e;return 0<this.h?(this.h--,e=this.g,this.g=e.next,e.next=null):e=this.i(),e}}((()=>new De),(e=>e.reset()));class De{constructor(){this.next=this.g=this.h=null}set(e,t){this.h=e,this.g=t,this.next=null}reset(){this.next=this.g=this.h=null}}function Pe(e){h.setTimeout((()=>{throw e}),0)}function Le(e,t){Ne||Me(),je||(Ne(),je=!0),Fe.add(e,t)}function Me(){var e=h.Promise.resolve(void 0);Ne=function(){e.then(Ue)}}var je=!1,Fe=new Oe;function Ue(){for(var e;e=xe();){try{e.h.call(e.g)}catch(n){Pe(n)}var t=Re;t.j(e),100>t.h&&(t.h++,e.next=t.g,t.g=e)}je=!1}function Ve(e,t){Se.call(this),this.h=e||1,this.g=t||h,this.j=b(this.lb,this),this.l=Date.now()}function qe(e){e.ca=!1,e.R&&(e.g.clearTimeout(e.R),e.R=null)}function $e(e,t,n){if("function"===typeof e)n&&(e=b(e,n));else{if(!e||"function"!=typeof e.handleEvent)throw Error("Invalid listener argument");e=b(e.handleEvent,e)}return 2147483647<Number(t)?-1:h.setTimeout(e,t||0)}function Be(e){e.g=$e((()=>{e.g=null,e.i&&(e.i=!1,Be(e))}),e.j);const t=e.h;e.h=null,e.m.apply(null,t)}_(Ve,Se),r=Ve.prototype,r.ca=!1,r.R=null,r.lb=function(){if(this.ca){var e=Date.now()-this.l;0<e&&e<.8*this.h?this.R=this.g.setTimeout(this.j,this.h-e):(this.R&&(this.g.clearTimeout(this.R),this.R=null),ke(this,"tick"),this.ca&&(qe(this),this.start()))}},r.start=function(){this.ca=!0,this.R||(this.R=this.g.setTimeout(this.j,this.h),this.l=Date.now())},r.M=function(){Ve.X.M.call(this),qe(this),delete this.g};class He extends T{constructor(e,t){super(),this.m=e,this.j=t,this.h=null,this.i=!1,this.g=null}l(e){this.h=arguments,this.g?this.i=!0:Be(this)}M(){super.M(),this.g&&(h.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function ze(e){T.call(this),this.h=e,this.g={}}_(ze,T);var We=[];function Ke(e,t,n,r){Array.isArray(n)||(n&&(We[0]=n.toString()),n=We);for(var i=0;i<n.length;i++){var o=pe(t,n[i],r||e.handleEvent,!1,e.h||e);if(!o)break;e.g[o.key]=o}}function Ge(e){oe(e.g,(function(e,t){this.g.hasOwnProperty(t)&&we(e)}),e),e.g={}}function Je(){this.g=!0}function Qe(e,t,n,r,i,o){e.info((function(){if(e.g)if(o)for(var s="",a=o.split("&"),c=0;c<a.length;c++){var u=a[c].split("=");if(1<u.length){var l=u[0];u=u[1];var h=l.split("_");s=2<=h.length&&"type"==h[1]?s+(l+"=")+u+"&":s+(l+"=redacted&")}}else s=null;else s=o;return"XMLHTTP REQ ("+r+") [attempt "+i+"]: "+t+"\n"+n+"\n"+s}))}function Xe(e,t,n,r,i,o,s){e.info((function(){return"XMLHTTP RESP ("+r+") [ attempt "+i+"]: "+t+"\n"+n+"\n"+o+" "+s}))}function Ye(e,t,n,r){e.info((function(){return"XMLHTTP TEXT ("+t+"): "+et(e,n)+(r?" "+r:"")}))}function Ze(e,t){e.info((function(){return"TIMEOUT: "+t}))}function et(e,t){if(!e.g)return t;if(!t)return null;try{var n=JSON.parse(t);if(n)for(e=0;e<n.length;e++)if(Array.isArray(n[e])){var r=n[e];if(!(2>r.length)){var i=r[1];if(Array.isArray(i)&&!(1>i.length)){var o=i[0];if("noop"!=o&&"stop"!=o&&"close"!=o)for(var s=1;s<i.length;s++)i[s]=""}}}return Ce(n)}catch(a){return t}}ze.prototype.M=function(){ze.X.M.call(this),Ge(this)},ze.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")},Je.prototype.Aa=function(){this.g=!1},Je.prototype.info=function(){};var tt={},nt=null;function rt(){return nt=nt||new Se}function it(e){C.call(this,tt.Pa,e)}function ot(e){const t=rt();ke(t,new it(t))}function st(e,t){C.call(this,tt.STAT_EVENT,e),this.stat=t}function at(e){const t=rt();ke(t,new st(t,e))}function ct(e,t){C.call(this,tt.Qa,e),this.size=t}function ut(e,t){if("function"!==typeof e)throw Error("Fn must not be null and must be a function");return h.setTimeout((function(){e()}),t)}tt.Pa="serverreachability",_(it,C),tt.STAT_EVENT="statevent",_(st,C),tt.Qa="timingevent",_(ct,C);var lt={NO_ERROR:0,mb:1,zb:2,yb:3,tb:4,xb:5,Ab:6,Ma:7,TIMEOUT:8,Db:9},ht={rb:"complete",Nb:"success",Na:"error",Ma:"abort",Fb:"ready",Gb:"readystatechange",TIMEOUT:"timeout",Bb:"incrementaldata",Eb:"progress",ub:"downloadprogress",Vb:"uploadprogress"};function ft(){}function dt(e){return e.h||(e.h=e.i())}function pt(){}ft.prototype.h=null;var gt,mt={OPEN:"a",qb:"b",Na:"c",Cb:"d"};function yt(){C.call(this,"d")}function vt(){C.call(this,"c")}function wt(){}function bt(e,t,n,r){this.l=e,this.j=t,this.m=n,this.U=r||1,this.S=new ze(this),this.O=_t,e=q?125:void 0,this.T=new Ve(e),this.H=null,this.i=!1,this.s=this.A=this.v=this.K=this.F=this.V=this.B=null,this.D=[],this.g=null,this.C=0,this.o=this.u=null,this.Y=-1,this.I=!1,this.N=0,this.L=null,this.$=this.J=this.Z=this.P=!1,this.h=new Et}function Et(){this.i=null,this.g="",this.h=!1}_(yt,C),_(vt,C),_(wt,ft),wt.prototype.g=function(){return new XMLHttpRequest},wt.prototype.i=function(){return{}},gt=new wt;var _t=45e3,Tt={},It={};function St(e,t,n){e.K=1,e.v=Kt($t(t)),e.s=n,e.P=!0,kt(e,null)}function kt(e,t){e.F=Date.now(),Ot(e),e.A=$t(e.v);var n=e.A,r=e.U;Array.isArray(r)||(r=[String(r)]),an(n.i,"t",r),e.C=0,n=e.l.H,e.h=new Et,e.g=hr(e.l,n?t:null,!e.s),0<e.N&&(e.L=new He(b(e.La,e,e.g),e.N)),Ke(e.S,e.g,"readystatechange",e.ib),t=e.H?se(e.H):{},e.s?(e.u||(e.u="POST"),t["Content-Type"]="application/x-www-form-urlencoded",e.g.da(e.A,e.u,e.s,t)):(e.u="GET",e.g.da(e.A,e.u,null,t)),ot(),Qe(e.j,e.u,e.A,e.m,e.U,e.s)}function At(e){return!!e.g&&("GET"==e.u&&2!=e.K&&e.l.Da)}function Ct(e,t,n){let r,i=!0;for(;!e.I&&e.C<n.length;){if(r=xt(e,n),r==It){4==t&&(e.o=4,at(14),i=!1),Ye(e.j,e.m,null,"[Incomplete Response]");break}if(r==Tt){e.o=4,at(15),Ye(e.j,e.m,n,"[Invalid Chunk]"),i=!1;break}Ye(e.j,e.m,r,null),Lt(e,r)}At(e)&&r!=It&&r!=Tt&&(e.h.g="",e.C=0),4!=t||0!=n.length||e.h.h||(e.o=1,at(16),i=!1),e.i=e.i&&i,i?0<n.length&&!e.$&&(e.$=!0,t=e.l,t.g==e&&t.$&&!t.K&&(t.j.info("Great, no buffering proxy detected. Bytes received: "+n.length),rr(t),t.K=!0,at(11))):(Ye(e.j,e.m,n,"[Invalid Chunked Response]"),Pt(e),Dt(e))}function xt(e,t){var n=e.C,r=t.indexOf("\n",n);return-1==r?It:(n=Number(t.substring(n,r)),isNaN(n)?Tt:(r+=1,r+n>t.length?It:(t=t.substr(r,n),e.C=r+n,t)))}function Ot(e){e.V=Date.now()+e.O,Nt(e,e.O)}function Nt(e,t){if(null!=e.B)throw Error("WatchDog timer not null");e.B=ut(b(e.gb,e),t)}function Rt(e){e.B&&(h.clearTimeout(e.B),e.B=null)}function Dt(e){0==e.l.G||e.I||sr(e.l,e)}function Pt(e){Rt(e);var t=e.L;t&&"function"==typeof t.na&&t.na(),e.L=null,qe(e.T),Ge(e.S),e.g&&(t=e.g,e.g=null,t.abort(),t.na())}function Lt(e,t){try{var n=e.l;if(0!=n.G&&(n.g==e||gn(n.h,e)))if(!e.J&&gn(n.h,e)&&3==n.G){try{var r=n.Fa.g.parse(t)}catch(u){r=null}if(Array.isArray(r)&&3==r.length){var i=r;if(0==i[0]){e:if(!n.u){if(n.g){if(!(n.g.F+3e3<e.F))break e;or(n),Gn(n)}nr(n),at(18)}}else n.Ba=i[1],0<n.Ba-n.T&&37500>i[2]&&n.L&&0==n.A&&!n.v&&(n.v=ut(b(n.cb,n),6e3));if(1>=pn(n.h)&&n.ja){try{n.ja()}catch(u){}n.ja=void 0}}else cr(n,11)}else if((e.J||n.g==e)&&or(n),!O(t))for(i=n.Fa.g.parse(t),t=0;t<i.length;t++){let u=i[t];if(n.T=u[0],u=u[1],2==n.G)if("c"==u[0]){n.I=u[1],n.ka=u[2];const t=u[3];null!=t&&(n.ma=t,n.j.info("VER="+n.ma));const i=u[4];null!=i&&(n.Ca=i,n.j.info("SVER="+n.Ca));const l=u[5];null!=l&&"number"===typeof l&&0<l&&(r=1.5*l,n.J=r,n.j.info("backChannelRequestTimeoutMs_="+r)),r=n;const h=e.g;if(h){const e=h.g?h.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(e){var o=r.h;o.g||-1==e.indexOf("spdy")&&-1==e.indexOf("quic")&&-1==e.indexOf("h2")||(o.j=o.l,o.g=new Set,o.h&&(mn(o,o.h),o.h=null))}if(r.D){const e=h.g?h.g.getResponseHeader("X-HTTP-Session-Id"):null;e&&(r.za=e,Wt(r.F,r.D,e))}}n.G=3,n.l&&n.l.xa(),n.$&&(n.P=Date.now()-e.F,n.j.info("Handshake RTT: "+n.P+"ms")),r=n;var s=e;if(r.sa=lr(r,r.H?r.ka:null,r.V),s.J){yn(r.h,s);var a=s,c=r.J;c&&a.setTimeout(c),a.B&&(Rt(a),Ot(a)),r.g=s}else tr(r);0<n.i.length&&Qn(n)}else"stop"!=u[0]&&"close"!=u[0]||cr(n,7);else 3==n.G&&("stop"==u[0]||"close"==u[0]?"stop"==u[0]?cr(n,7):Kn(n):"noop"!=u[0]&&n.l&&n.l.wa(u),n.A=0)}ot(4)}catch(u){}}function Mt(e){if(e.W&&"function"==typeof e.W)return e.W();if("undefined"!==typeof Map&&e instanceof Map||"undefined"!==typeof Set&&e instanceof Set)return Array.from(e.values());if("string"===typeof e)return e.split("");if(d(e)){for(var t=[],n=e.length,r=0;r<n;r++)t.push(e[r]);return t}for(r in t=[],n=0,e)t[n++]=e[r];return t}function jt(e){if(e.oa&&"function"==typeof e.oa)return e.oa();if(!e.W||"function"!=typeof e.W){if("undefined"!==typeof Map&&e instanceof Map)return Array.from(e.keys());if(!("undefined"!==typeof Set&&e instanceof Set)){if(d(e)||"string"===typeof e){var t=[];e=e.length;for(var n=0;n<e;n++)t.push(n);return t}t=[],n=0;for(const r in e)t[n++]=r;return t}}}function Ft(e,t){if(e.forEach&&"function"==typeof e.forEach)e.forEach(t,void 0);else if(d(e)||"string"===typeof e)Array.prototype.forEach.call(e,t,void 0);else for(var n=jt(e),r=Mt(e),i=r.length,o=0;o<i;o++)t.call(void 0,r[o],n&&n[o],e)}r=bt.prototype,r.setTimeout=function(e){this.O=e},r.ib=function(e){e=e.target;const t=this.L;t&&3==qn(e)?t.l():this.La(e)},r.La=function(e){try{if(e==this.g)e:{const l=qn(this.g);var t=this.g.Ea();const f=this.g.aa();if(!(3>l)&&(3!=l||q||this.g&&(this.h.h||this.g.fa()||$n(this.g)))){this.I||4!=l||7==t||ot(8==t||0>=f?3:2),Rt(this);var n=this.g.aa();this.Y=n;t:if(At(this)){var r=$n(this.g);e="";var i=r.length,o=4==qn(this.g);if(!this.h.i){if("undefined"===typeof TextDecoder){Pt(this),Dt(this);var s="";break t}this.h.i=new h.TextDecoder}for(t=0;t<i;t++)this.h.h=!0,e+=this.h.i.decode(r[t],{stream:o&&t==i-1});r.splice(0,i),this.h.g+=e,this.C=0,s=this.h.g}else s=this.g.fa();if(this.i=200==n,Xe(this.j,this.u,this.A,this.m,this.U,l,n),this.i){if(this.Z&&!this.J){t:{if(this.g){var a,c=this.g;if((a=c.g?c.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!O(a)){var u=a;break t}}u=null}if(!(n=u)){this.i=!1,this.o=3,at(12),Pt(this),Dt(this);break e}Ye(this.j,this.m,n,"Initial handshake response via X-HTTP-Initial-Response"),this.J=!0,Lt(this,n)}this.P?(Ct(this,l,s),q&&this.i&&3==l&&(Ke(this.S,this.T,"tick",this.hb),this.T.start())):(Ye(this.j,this.m,s,null),Lt(this,s)),4==l&&Pt(this),this.i&&!this.I&&(4==l?sr(this.l,this):(this.i=!1,Ot(this)))}else 400==n&&0<s.indexOf("Unknown SID")?(this.o=3,at(12)):(this.o=0,at(13)),Pt(this),Dt(this)}}}catch(l){}},r.hb=function(){if(this.g){var e=qn(this.g),t=this.g.fa();this.C<t.length&&(Rt(this),Ct(this,e,t),this.i&&4!=e&&Ot(this))}},r.cancel=function(){this.I=!0,Pt(this)},r.gb=function(){this.B=null;const e=Date.now();0<=e-this.V?(Ze(this.j,this.A),2!=this.K&&(ot(),at(17)),Pt(this),this.o=2,Dt(this)):Nt(this,this.V-e)};var Ut=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Vt(e,t){if(e){e=e.split("&");for(var n=0;n<e.length;n++){var r=e[n].indexOf("="),i=null;if(0<=r){var o=e[n].substring(0,r);i=e[n].substring(r+1)}else o=e[n];t(o,i?decodeURIComponent(i.replace(/\+/g," ")):"")}}}function qt(e,t){if(this.g=this.s=this.j="",this.m=null,this.o=this.l="",this.h=!1,e instanceof qt){this.h=void 0!==t?t:e.h,Bt(this,e.j),this.s=e.s,this.g=e.g,Ht(this,e.m),this.l=e.l,t=e.i;var n=new nn;n.i=t.i,t.g&&(n.g=new Map(t.g),n.h=t.h),zt(this,n),this.o=e.o}else e&&(n=String(e).match(Ut))?(this.h=!!t,Bt(this,n[1]||"",!0),this.s=Gt(n[2]||""),this.g=Gt(n[3]||"",!0),Ht(this,n[4]),this.l=Gt(n[5]||"",!0),zt(this,n[6]||"",!0),this.o=Gt(n[7]||"")):(this.h=!!t,this.i=new nn(null,this.h))}function $t(e){return new qt(e)}function Bt(e,t,n){e.j=n?Gt(t,!0):t,e.j&&(e.j=e.j.replace(/:$/,""))}function Ht(e,t){if(t){if(t=Number(t),isNaN(t)||0>t)throw Error("Bad port number "+t);e.m=t}else e.m=null}function zt(e,t,n){t instanceof nn?(e.i=t,un(e.i,e.h)):(n||(t=Jt(t,en)),e.i=new nn(t,e.h))}function Wt(e,t,n){e.i.set(t,n)}function Kt(e){return Wt(e,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),e}function Gt(e,t){return e?t?decodeURI(e.replace(/%25/g,"%2525")):decodeURIComponent(e):""}function Jt(e,t,n){return"string"===typeof e?(e=encodeURI(e).replace(t,Qt),n&&(e=e.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),e):null}function Qt(e){return e=e.charCodeAt(0),"%"+(e>>4&15).toString(16)+(15&e).toString(16)}qt.prototype.toString=function(){var e=[],t=this.j;t&&e.push(Jt(t,Xt,!0),":");var n=this.g;return(n||"file"==t)&&(e.push("//"),(t=this.s)&&e.push(Jt(t,Xt,!0),"@"),e.push(encodeURIComponent(String(n)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),n=this.m,null!=n&&e.push(":",String(n))),(n=this.l)&&(this.g&&"/"!=n.charAt(0)&&e.push("/"),e.push(Jt(n,"/"==n.charAt(0)?Zt:Yt,!0))),(n=this.i.toString())&&e.push("?",n),(n=this.o)&&e.push("#",Jt(n,tn)),e.join("")};var Xt=/[#\/\?@]/g,Yt=/[#\?:]/g,Zt=/[#\?]/g,en=/[#\?@]/g,tn=/#/g;function nn(e,t){this.h=this.g=null,this.i=e||null,this.j=!!t}function rn(e){e.g||(e.g=new Map,e.h=0,e.i&&Vt(e.i,(function(t,n){e.add(decodeURIComponent(t.replace(/\+/g," ")),n)})))}function on(e,t){rn(e),t=cn(e,t),e.g.has(t)&&(e.i=null,e.h-=e.g.get(t).length,e.g.delete(t))}function sn(e,t){return rn(e),t=cn(e,t),e.g.has(t)}function an(e,t,n){on(e,t),0<n.length&&(e.i=null,e.g.set(cn(e,t),k(n)),e.h+=n.length)}function cn(e,t){return t=String(t),e.j&&(t=t.toLowerCase()),t}function un(e,t){t&&!e.j&&(rn(e),e.i=null,e.g.forEach((function(e,t){var n=t.toLowerCase();t!=n&&(on(this,t),an(this,n,e))}),e)),e.j=t}r=nn.prototype,r.add=function(e,t){rn(this),this.i=null,e=cn(this,e);var n=this.g.get(e);return n||this.g.set(e,n=[]),n.push(t),this.h+=1,this},r.forEach=function(e,t){rn(this),this.g.forEach((function(n,r){n.forEach((function(n){e.call(t,n,r,this)}),this)}),this)},r.oa=function(){rn(this);const e=Array.from(this.g.values()),t=Array.from(this.g.keys()),n=[];for(let r=0;r<t.length;r++){const i=e[r];for(let e=0;e<i.length;e++)n.push(t[r])}return n},r.W=function(e){rn(this);let t=[];if("string"===typeof e)sn(this,e)&&(t=t.concat(this.g.get(cn(this,e))));else{e=Array.from(this.g.values());for(let n=0;n<e.length;n++)t=t.concat(e[n])}return t},r.set=function(e,t){return rn(this),this.i=null,e=cn(this,e),sn(this,e)&&(this.h-=this.g.get(e).length),this.g.set(e,[t]),this.h+=1,this},r.get=function(e,t){return e?(e=this.W(e),0<e.length?String(e[0]):t):t},r.toString=function(){if(this.i)return this.i;if(!this.g)return"";const e=[],t=Array.from(this.g.keys());for(var n=0;n<t.length;n++){var r=t[n];const o=encodeURIComponent(String(r)),s=this.W(r);for(r=0;r<s.length;r++){var i=o;""!==s[r]&&(i+="="+encodeURIComponent(String(s[r]))),e.push(i)}}return this.i=e.join("&")};var ln=class{constructor(e,t){this.h=e,this.g=t}};function hn(e){this.l=e||fn,h.PerformanceNavigationTiming?(e=h.performance.getEntriesByType("navigation"),e=0<e.length&&("hq"==e[0].nextHopProtocol||"h2"==e[0].nextHopProtocol)):e=!!(h.g&&h.g.Ga&&h.g.Ga()&&h.g.Ga().$b),this.j=e?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}var fn=10;function dn(e){return!!e.h||!!e.g&&e.g.size>=e.j}function pn(e){return e.h?1:e.g?e.g.size:0}function gn(e,t){return e.h?e.h==t:!!e.g&&e.g.has(t)}function mn(e,t){e.g?e.g.add(t):e.h=t}function yn(e,t){e.h&&e.h==t?e.h=null:e.g&&e.g.has(t)&&e.g.delete(t)}function vn(e){if(null!=e.h)return e.i.concat(e.h.D);if(null!=e.g&&0!==e.g.size){let t=e.i;for(const n of e.g.values())t=t.concat(n.D);return t}return k(e.i)}function wn(){}function bn(){this.g=new wn}function En(e,t,n){const r=n||"";try{Ft(e,(function(e,n){let i=e;p(e)&&(i=Ce(e)),t.push(r+n+"="+encodeURIComponent(i))}))}catch(i){throw t.push(r+"type="+encodeURIComponent("_badmap")),i}}function _n(e,t){const n=new Je;if(h.Image){const r=new Image;r.onload=E(Tn,n,r,"TestLoadImage: loaded",!0,t),r.onerror=E(Tn,n,r,"TestLoadImage: error",!1,t),r.onabort=E(Tn,n,r,"TestLoadImage: abort",!1,t),r.ontimeout=E(Tn,n,r,"TestLoadImage: timeout",!1,t),h.setTimeout((function(){r.ontimeout&&r.ontimeout()}),1e4),r.src=e}else t(!1)}function Tn(e,t,n,r,i){try{t.onload=null,t.onerror=null,t.onabort=null,t.ontimeout=null,i(r)}catch(o){}}function In(e){this.l=e.ac||null,this.j=e.jb||!1}function Sn(e,t){Se.call(this),this.D=e,this.u=t,this.m=void 0,this.readyState=kn,this.status=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.v=new Headers,this.h=null,this.C="GET",this.B="",this.g=!1,this.A=this.j=this.l=null}hn.prototype.cancel=function(){if(this.i=vn(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&0!==this.g.size){for(const e of this.g.values())e.cancel();this.g.clear()}},wn.prototype.stringify=function(e){return h.JSON.stringify(e,void 0)},wn.prototype.parse=function(e){return h.JSON.parse(e,void 0)},_(In,ft),In.prototype.g=function(){return new Sn(this.l,this.j)},In.prototype.i=function(e){return function(){return e}}({}),_(Sn,Se);var kn=0;function An(e){e.j.read().then(e.Ta.bind(e)).catch(e.ga.bind(e))}function Cn(e){e.readyState=4,e.l=null,e.j=null,e.A=null,xn(e)}function xn(e){e.onreadystatechange&&e.onreadystatechange.call(e)}r=Sn.prototype,r.open=function(e,t){if(this.readyState!=kn)throw this.abort(),Error("Error reopening a connection");this.C=e,this.B=t,this.readyState=1,xn(this)},r.send=function(e){if(1!=this.readyState)throw this.abort(),Error("need to call open() first. ");this.g=!0;const t={headers:this.v,method:this.C,credentials:this.m,cache:void 0};e&&(t.body=e),(this.D||h).fetch(new Request(this.B,t)).then(this.Wa.bind(this),this.ga.bind(this))},r.abort=function(){this.response=this.responseText="",this.v=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch((()=>{})),1<=this.readyState&&this.g&&4!=this.readyState&&(this.g=!1,Cn(this)),this.readyState=kn},r.Wa=function(e){if(this.g&&(this.l=e,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=e.headers,this.readyState=2,xn(this)),this.g&&(this.readyState=3,xn(this),this.g)))if("arraybuffer"===this.responseType)e.arrayBuffer().then(this.Ua.bind(this),this.ga.bind(this));else if("undefined"!==typeof h.ReadableStream&&"body"in e){if(this.j=e.body.getReader(),this.u){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.A=new TextDecoder;An(this)}else e.text().then(this.Va.bind(this),this.ga.bind(this))},r.Ta=function(e){if(this.g){if(this.u&&e.value)this.response.push(e.value);else if(!this.u){var t=e.value?e.value:new Uint8Array(0);(t=this.A.decode(t,{stream:!e.done}))&&(this.response=this.responseText+=t)}e.done?Cn(this):xn(this),3==this.readyState&&An(this)}},r.Va=function(e){this.g&&(this.response=this.responseText=e,Cn(this))},r.Ua=function(e){this.g&&(this.response=e,Cn(this))},r.ga=function(){this.g&&Cn(this)},r.setRequestHeader=function(e,t){this.v.append(e,t)},r.getResponseHeader=function(e){return this.h&&this.h.get(e.toLowerCase())||""},r.getAllResponseHeaders=function(){if(!this.h)return"";const e=[],t=this.h.entries();for(var n=t.next();!n.done;)n=n.value,e.push(n[0]+": "+n[1]),n=t.next();return e.join("\r\n")},Object.defineProperty(Sn.prototype,"withCredentials",{get:function(){return"include"===this.m},set:function(e){this.m=e?"include":"same-origin"}});var On=h.JSON.parse;function Nn(e){Se.call(this),this.headers=new Map,this.u=e||null,this.h=!1,this.C=this.g=null,this.H="",this.m=0,this.j="",this.l=this.F=this.v=this.D=!1,this.B=0,this.A=null,this.J=Rn,this.K=this.L=!1}_(Nn,Se);var Rn="",Dn=/^https?$/i,Pn=["POST","PUT"];function Ln(e){return U&&Q()&&"number"===typeof e.timeout&&void 0!==e.ontimeout}function Mn(e,t){e.h=!1,e.g&&(e.l=!0,e.g.abort(),e.l=!1),e.j=t,e.m=5,jn(e),Un(e)}function jn(e){e.D||(e.D=!0,ke(e,"complete"),ke(e,"error"))}function Fn(e){if(e.h&&"undefined"!=typeof l&&(!e.C[1]||4!=qn(e)||2!=e.aa()))if(e.v&&4==qn(e))$e(e.Ha,0,e);else if(ke(e,"readystatechange"),4==qn(e)){e.h=!1;try{const c=e.aa();e:switch(c){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var t=!0;break e;default:t=!1}var n;if(!(n=t)){var r;if(r=0===c){var i=String(e.H).match(Ut)[1]||null;if(!i&&h.self&&h.self.location){var o=h.self.location.protocol;i=o.substr(0,o.length-1)}r=!Dn.test(i?i.toLowerCase():"")}n=r}if(n)ke(e,"complete"),ke(e,"success");else{e.m=6;try{var s=2<qn(e)?e.g.statusText:""}catch(a){s=""}e.j=s+" ["+e.aa()+"]",jn(e)}}finally{Un(e)}}}function Un(e,t){if(e.g){Vn(e);const r=e.g,i=e.C[0]?f:null;e.g=null,e.C=null,t||ke(e,"ready");try{r.onreadystatechange=i}catch(n){}}}function Vn(e){e.g&&e.K&&(e.g.ontimeout=null),e.A&&(h.clearTimeout(e.A),e.A=null)}function qn(e){return e.g?e.g.readyState:0}function $n(e){try{if(!e.g)return null;if("response"in e.g)return e.g.response;switch(e.J){case Rn:case"text":return e.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in e.g)return e.g.mozResponseArrayBuffer}return null}catch(Ar){return null}}function Bn(e){let t="";return oe(e,(function(e,n){t+=n,t+=":",t+=e,t+="\r\n"})),t}function Hn(e,t,n){e:{for(r in n){var r=!1;break e}r=!0}r||(n=Bn(n),"string"===typeof e?null!=n&&encodeURIComponent(String(n)):Wt(e,t,n))}function zn(e,t,n){return n&&n.internalChannelParams&&n.internalChannelParams[e]||t}function Wn(e){this.Ca=0,this.i=[],this.j=new Je,this.ka=this.sa=this.F=this.V=this.g=this.za=this.D=this.ia=this.o=this.S=this.s=null,this.ab=this.U=0,this.Za=zn("failFast",!1,e),this.L=this.v=this.u=this.m=this.l=null,this.Y=!0,this.pa=this.Ba=this.T=-1,this.Z=this.A=this.C=0,this.Xa=zn("baseRetryDelayMs",5e3,e),this.bb=zn("retryDelaySeedMs",1e4,e),this.$a=zn("forwardChannelMaxRetries",2,e),this.ta=zn("forwardChannelRequestTimeoutMs",2e4,e),this.ra=e&&e.xmlHttpFactory||void 0,this.Da=e&&e.Zb||!1,this.J=void 0,this.H=e&&e.supportsCrossDomainXhr||!1,this.I="",this.h=new hn(e&&e.concurrentRequestLimit),this.Fa=new bn,this.O=e&&e.fastHandshake||!1,this.N=e&&e.encodeInitMessageHeaders||!1,this.O&&this.N&&(this.N=!1),this.Ya=e&&e.Xb||!1,e&&e.Aa&&this.j.Aa(),e&&e.forceLongPolling&&(this.Y=!1),this.$=!this.O&&this.Y&&e&&e.detectBufferingProxy||!1,this.ja=void 0,this.P=0,this.K=!1,this.la=this.B=null}function Kn(e){if(Jn(e),3==e.G){var t=e.U++,n=$t(e.F);Wt(n,"SID",e.I),Wt(n,"RID",t),Wt(n,"TYPE","terminate"),Zn(e,n),t=new bt(e,e.j,t,void 0),t.K=2,t.v=Kt($t(n)),n=!1,h.navigator&&h.navigator.sendBeacon&&(n=h.navigator.sendBeacon(t.v.toString(),"")),!n&&h.Image&&((new Image).src=t.v,n=!0),n||(t.g=hr(t.l,null),t.g.da(t.v)),t.F=Date.now(),Ot(t)}ur(e)}function Gn(e){e.g&&(rr(e),e.g.cancel(),e.g=null)}function Jn(e){Gn(e),e.u&&(h.clearTimeout(e.u),e.u=null),or(e),e.h.cancel(),e.m&&("number"===typeof e.m&&h.clearTimeout(e.m),e.m=null)}function Qn(e){dn(e.h)||e.m||(e.m=!0,Le(e.Ja,e),e.C=0)}function Xn(e,t){return!(pn(e.h)>=e.h.j-(e.m?1:0))&&(e.m?(e.i=t.D.concat(e.i),!0):!(1==e.G||2==e.G||e.C>=(e.Za?0:e.$a))&&(e.m=ut(b(e.Ja,e,t),ar(e,e.C)),e.C++,!0))}function Yn(e,t){var n;n=t?t.m:e.U++;const r=$t(e.F);Wt(r,"SID",e.I),Wt(r,"RID",n),Wt(r,"AID",e.T),Zn(e,r),e.o&&e.s&&Hn(r,e.o,e.s),n=new bt(e,e.j,n,e.C+1),null===e.o&&(n.H=e.s),t&&(e.i=t.D.concat(e.i)),t=er(e,n,1e3),n.setTimeout(Math.round(.5*e.ta)+Math.round(.5*e.ta*Math.random())),mn(e.h,n),St(n,r,t)}function Zn(e,t){e.ia&&oe(e.ia,(function(e,n){Wt(t,n,e)})),e.l&&Ft({},(function(e,n){Wt(t,n,e)}))}function er(e,t,n){n=Math.min(e.i.length,n);var r=e.l?b(e.l.Ra,e.l,e):null;e:{var i=e.i;let t=-1;for(;;){const e=["count="+n];-1==t?0<n?(t=i[0].h,e.push("ofs="+t)):t=0:e.push("ofs="+t);let s=!0;for(let a=0;a<n;a++){let n=i[a].h;const c=i[a].g;if(n-=t,0>n)t=Math.max(0,i[a].h-100),s=!1;else try{En(c,e,"req"+n+"_")}catch(o){r&&r(c)}}if(s){r=e.join("&");break e}}}return e=e.i.splice(0,n),t.D=e,r}function tr(e){e.g||e.u||(e.Z=1,Le(e.Ia,e),e.A=0)}function nr(e){return!(e.g||e.u||3<=e.A)&&(e.Z++,e.u=ut(b(e.Ia,e),ar(e,e.A)),e.A++,!0)}function rr(e){null!=e.B&&(h.clearTimeout(e.B),e.B=null)}function ir(e){e.g=new bt(e,e.j,"rpc",e.Z),null===e.o&&(e.g.H=e.s),e.g.N=0;var t=$t(e.sa);Wt(t,"RID","rpc"),Wt(t,"SID",e.I),Wt(t,"CI",e.L?"0":"1"),Wt(t,"AID",e.T),Wt(t,"TYPE","xmlhttp"),Zn(e,t),e.o&&e.s&&Hn(t,e.o,e.s),e.J&&e.g.setTimeout(e.J);var n=e.g;e=e.ka,n.K=1,n.v=Kt($t(t)),n.s=null,n.P=!0,kt(n,e)}function or(e){null!=e.v&&(h.clearTimeout(e.v),e.v=null)}function sr(e,t){var n=null;if(e.g==t){or(e),rr(e),e.g=null;var r=2}else{if(!gn(e.h,t))return;n=t.D,yn(e.h,t),r=1}if(0!=e.G)if(e.pa=t.Y,t.i)if(1==r){n=t.s?t.s.length:0,t=Date.now()-t.F;var i=e.C;r=rt(),ke(r,new ct(r,n)),Qn(e)}else tr(e);else if(i=t.o,3==i||0==i&&0<e.pa||!(1==r&&Xn(e,t)||2==r&&nr(e)))switch(n&&0<n.length&&(t=e.h,t.i=t.i.concat(n)),i){case 1:cr(e,5);break;case 4:cr(e,10);break;case 3:cr(e,6);break;default:cr(e,2)}}function ar(e,t){let n=e.Xa+Math.floor(Math.random()*e.bb);return e.l||(n*=2),n*t}function cr(e,t){if(e.j.info("Error code "+t),2==t){var n=null;e.l&&(n=null);var r=b(e.kb,e);n||(n=new qt("//www.google.com/images/cleardot.gif"),h.location&&"http"==h.location.protocol||Bt(n,"https"),Kt(n)),_n(n.toString(),r)}else at(2);e.G=0,e.l&&e.l.va(t),ur(e),Jn(e)}function ur(e){if(e.G=0,e.la=[],e.l){const t=vn(e.h);0==t.length&&0==e.i.length||(A(e.la,t),A(e.la,e.i),e.h.i.length=0,k(e.i),e.i.length=0),e.l.ua()}}function lr(e,t,n){var r=n instanceof qt?$t(n):new qt(n,void 0);if(""!=r.g)t&&(r.g=t+"."+r.g),Ht(r,r.m);else{var i=h.location;r=i.protocol,t=t?t+"."+i.hostname:i.hostname,i=+i.port;var o=new qt(null,void 0);r&&Bt(o,r),t&&(o.g=t),i&&Ht(o,i),n&&(o.l=n),r=o}return n=e.D,t=e.za,n&&t&&Wt(r,n,t),Wt(r,"VER",e.ma),Zn(e,r),r}function hr(e,t,n){if(t&&!e.H)throw Error("Can't create secondary domain capable XhrIo object.");return t=n&&e.Da&&!e.ra?new Nn(new In({jb:!0})):new Nn(e.ra),t.Ka(e.H),t}function fr(){}function dr(){if(U&&!(10<=Number(Y)))throw Error("Environmental error: no available transport.")}function pr(e,t){Se.call(this),this.g=new Wn(t),this.l=e,this.h=t&&t.messageUrlParams||null,e=t&&t.messageHeaders||null,t&&t.clientProtocolHeaderRequired&&(e?e["X-Client-Protocol"]="webchannel":e={"X-Client-Protocol":"webchannel"}),this.g.s=e,e=t&&t.initMessageHeaders||null,t&&t.messageContentType&&(e?e["X-WebChannel-Content-Type"]=t.messageContentType:e={"X-WebChannel-Content-Type":t.messageContentType}),t&&t.ya&&(e?e["X-WebChannel-Client-Profile"]=t.ya:e={"X-WebChannel-Client-Profile":t.ya}),this.g.S=e,(e=t&&t.Yb)&&!O(e)&&(this.g.o=e),this.A=t&&t.supportsCrossDomainXhr||!1,this.v=t&&t.sendRawJson||!1,(t=t&&t.httpSessionIdParam)&&!O(t)&&(this.g.D=t,e=this.h,null!==e&&t in e&&(e=this.h,t in e&&delete e[t])),this.j=new yr(this)}function gr(e){yt.call(this);var t=e.__sm__;if(t){e:{for(const n in t){e=n;break e}e=void 0}(this.i=e)&&(e=this.i,t=null!==t&&e in t?t[e]:void 0),this.data=t}else this.data=e}function mr(){vt.call(this),this.status=1}function yr(e){this.g=e}r=Nn.prototype,r.Ka=function(e){this.L=e},r.da=function(e,t,n,r){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.H+"; newUri="+e);t=t?t.toUpperCase():"GET",this.H=e,this.j="",this.m=0,this.D=!1,this.h=!0,this.g=this.u?this.u.g():gt.g(),this.C=this.u?dt(this.u):dt(gt),this.g.onreadystatechange=b(this.Ha,this);try{this.F=!0,this.g.open(t,String(e),!0),this.F=!1}catch(o){return void Mn(this,o)}if(e=n||"",n=new Map(this.headers),r)if(Object.getPrototypeOf(r)===Object.prototype)for(var i in r)n.set(i,r[i]);else{if("function"!==typeof r.keys||"function"!==typeof r.get)throw Error("Unknown input type for opt_headers: "+String(r));for(const e of r.keys())n.set(e,r.get(e))}r=Array.from(n.keys()).find((e=>"content-type"==e.toLowerCase())),i=h.FormData&&e instanceof h.FormData,!(0<=S(Pn,t))||r||i||n.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[s,a]of n)this.g.setRequestHeader(s,a);this.J&&(this.g.responseType=this.J),"withCredentials"in this.g&&this.g.withCredentials!==this.L&&(this.g.withCredentials=this.L);try{Vn(this),0<this.B&&((this.K=Ln(this.g))?(this.g.timeout=this.B,this.g.ontimeout=b(this.qa,this)):this.A=$e(this.qa,this.B,this)),this.v=!0,this.g.send(e),this.v=!1}catch(o){Mn(this,o)}},r.qa=function(){"undefined"!=typeof l&&this.g&&(this.j="Timed out after "+this.B+"ms, aborting",this.m=8,ke(this,"timeout"),this.abort(8))},r.abort=function(e){this.g&&this.h&&(this.h=!1,this.l=!0,this.g.abort(),this.l=!1,this.m=e||7,ke(this,"complete"),ke(this,"abort"),Un(this))},r.M=function(){this.g&&(this.h&&(this.h=!1,this.l=!0,this.g.abort(),this.l=!1),Un(this,!0)),Nn.X.M.call(this)},r.Ha=function(){this.s||(this.F||this.v||this.l?Fn(this):this.fb())},r.fb=function(){Fn(this)},r.aa=function(){try{return 2<qn(this)?this.g.status:-1}catch(e){return-1}},r.fa=function(){try{return this.g?this.g.responseText:""}catch(e){return""}},r.Sa=function(e){if(this.g){var t=this.g.responseText;return e&&0==t.indexOf(e)&&(t=t.substring(e.length)),On(t)}},r.Ea=function(){return this.m},r.Oa=function(){return"string"===typeof this.j?this.j:String(this.j)},r=Wn.prototype,r.ma=8,r.G=1,r.Ja=function(e){if(this.m)if(this.m=null,1==this.G){if(!e){this.U=Math.floor(1e5*Math.random()),e=this.U++;const i=new bt(this,this.j,e,void 0);let o=this.s;if(this.S&&(o?(o=se(o),ce(o,this.S)):o=this.S),null!==this.o||this.N||(i.H=o,o=null),this.O)e:{for(var t=0,n=0;n<this.i.length;n++){var r=this.i[n];if(r="__data__"in r.g&&(r=r.g.__data__,"string"===typeof r)?r.length:void 0,void 0===r)break;if(t+=r,4096<t){t=n;break e}if(4096===t||n===this.i.length-1){t=n+1;break e}}t=1e3}else t=1e3;t=er(this,i,t),n=$t(this.F),Wt(n,"RID",e),Wt(n,"CVER",22),this.D&&Wt(n,"X-HTTP-Session-Id",this.D),Zn(this,n),o&&(this.N?t="headers="+encodeURIComponent(String(Bn(o)))+"&"+t:this.o&&Hn(n,this.o,o)),mn(this.h,i),this.Ya&&Wt(n,"TYPE","init"),this.O?(Wt(n,"$req",t),Wt(n,"SID","null"),i.Z=!0,St(i,n,null)):St(i,n,t),this.G=2}}else 3==this.G&&(e?Yn(this,e):0==this.i.length||dn(this.h)||Yn(this))},r.Ia=function(){if(this.u=null,ir(this),this.$&&!(this.K||null==this.g||0>=this.P)){var e=2*this.P;this.j.info("BP detection timer enabled: "+e),this.B=ut(b(this.eb,this),e)}},r.eb=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.L=!1,this.K=!0,at(10),Gn(this),ir(this))},r.cb=function(){null!=this.v&&(this.v=null,Gn(this),nr(this),at(19))},r.kb=function(e){e?(this.j.info("Successfully pinged google.com"),at(2)):(this.j.info("Failed to ping google.com"),at(1))},r=fr.prototype,r.xa=function(){},r.wa=function(){},r.va=function(){},r.ua=function(){},r.Ra=function(){},dr.prototype.g=function(e,t){return new pr(e,t)},_(pr,Se),pr.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.H=!0);var e=this.g,t=this.l,n=this.h||void 0;at(0),e.V=t,e.ia=n||{},e.L=e.Y,e.F=lr(e,null,e.V),Qn(e)},pr.prototype.close=function(){Kn(this.g)},pr.prototype.u=function(e){var t=this.g;if("string"===typeof e){var n={};n.__data__=e,e=n}else this.v&&(n={},n.__data__=Ce(e),e=n);t.i.push(new ln(t.ab++,e)),3==t.G&&Qn(t)},pr.prototype.M=function(){this.g.l=null,delete this.j,Kn(this.g),delete this.g,pr.X.M.call(this)},_(gr,yt),_(mr,vt),_(yr,fr),yr.prototype.xa=function(){ke(this.g,"a")},yr.prototype.wa=function(e){ke(this.g,new gr(e))},yr.prototype.va=function(e){ke(this.g,new mr)},yr.prototype.ua=function(){ke(this.g,"b")},dr.prototype.createWebChannel=dr.prototype.g,pr.prototype.send=pr.prototype.u,pr.prototype.open=pr.prototype.m,pr.prototype.close=pr.prototype.close,lt.NO_ERROR=0,lt.TIMEOUT=8,lt.HTTP_ERROR=6,ht.COMPLETE="complete",pt.EventType=mt,mt.OPEN="a",mt.CLOSE="b",mt.ERROR="c",mt.MESSAGE="d",Se.prototype.listen=Se.prototype.N,Nn.prototype.listenOnce=Nn.prototype.O,Nn.prototype.getLastError=Nn.prototype.Oa,Nn.prototype.getLastErrorCode=Nn.prototype.Ea,Nn.prototype.getStatus=Nn.prototype.aa,Nn.prototype.getResponseJson=Nn.prototype.Sa,Nn.prototype.getResponseText=Nn.prototype.fa,Nn.prototype.send=Nn.prototype.da,Nn.prototype.setWithCredentials=Nn.prototype.Ka;var vr=u.createWebChannelTransport=function(){return new dr},wr=u.getStatEventTarget=function(){return rt()},br=u.ErrorCode=lt,Er=u.EventType=ht,_r=u.Event=tt,Tr=u.Stat={sb:0,vb:1,wb:2,Pb:3,Ub:4,Rb:5,Sb:6,Qb:7,Ob:8,Tb:9,PROXY:10,NOPROXY:11,Mb:12,Ib:13,Jb:14,Hb:15,Kb:16,Lb:17,ob:18,nb:19,pb:20},Ir=u.FetchXmlHttpFactory=In,Sr=u.WebChannel=pt,kr=u.XhrIo=Nn;const Ar="@firebase/firestore";
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cr{constructor(e){this.uid=e}isAuthenticated(){return null!=this.uid}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}Cr.UNAUTHENTICATED=new Cr(null),Cr.GOOGLE_CREDENTIALS=new Cr("google-credentials-uid"),Cr.FIRST_PARTY=new Cr("first-party-uid"),Cr.MOCK_USER=new Cr("mock-user");
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
let xr="9.17.2";
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Or=new s.Yd("@firebase/firestore");function Nr(){return Or.logLevel}function Rr(e,...t){if(Or.logLevel<=s["in"].DEBUG){const n=t.map(Lr);Or.debug(`Firestore (${xr}): ${e}`,...n)}}function Dr(e,...t){if(Or.logLevel<=s["in"].ERROR){const n=t.map(Lr);Or.error(`Firestore (${xr}): ${e}`,...n)}}function Pr(e,...t){if(Or.logLevel<=s["in"].WARN){const n=t.map(Lr);Or.warn(`Firestore (${xr}): ${e}`,...n)}}function Lr(e){if("string"==typeof e)return e;try{return t=e,JSON.stringify(t)}catch(t){return e}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var t}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Mr(e="Unexpected state"){const t=`FIRESTORE (${xr}) INTERNAL ASSERTION FAILED: `+e;throw Dr(t),new Error(t)}function jr(e,t){e||Mr()}function Fr(e,t){return e}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ur={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class Vr extends a.ZR{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qr{constructor(){this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $r{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class Br{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable((()=>t(Cr.UNAUTHENTICATED)))}shutdown(){}}class Hr{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable((()=>t(this.token.user)))}shutdown(){this.changeListener=null}}class zr{constructor(e){this.t=e,this.currentUser=Cr.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){let n=this.i;const r=e=>this.i!==n?(n=this.i,t(e)):Promise.resolve();let i=new qr;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new qr,e.enqueueRetryable((()=>r(this.currentUser)))};const o=()=>{const t=i;e.enqueueRetryable((async()=>{await t.promise,await r(this.currentUser)}))},s=e=>{Rr("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=e,this.auth.addAuthTokenListener(this.o),o()};this.t.onInit((e=>s(e))),setTimeout((()=>{if(!this.auth){const e=this.t.getImmediate({optional:!0});e?s(e):(Rr("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new qr)}}),0),o()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then((t=>this.i!==e?(Rr("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):t?(jr("string"==typeof t.accessToken),new $r(t.accessToken,this.currentUser)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.auth.removeAuthTokenListener(this.o)}u(){const e=this.auth&&this.auth.getUid();return jr(null===e||"string"==typeof e),new Cr(e)}}class Wr{constructor(e,t,n,r){this.h=e,this.l=t,this.m=n,this.g=r,this.type="FirstParty",this.user=Cr.FIRST_PARTY,this.p=new Map}I(){return this.g?this.g():(jr(!("object"!=typeof this.h||null===this.h||!this.h.auth||!this.h.auth.getAuthHeaderValueForFirstParty)),this.h.auth.getAuthHeaderValueForFirstParty([]))}get headers(){this.p.set("X-Goog-AuthUser",this.l);const e=this.I();return e&&this.p.set("Authorization",e),this.m&&this.p.set("X-Goog-Iam-Authorization-Token",this.m),this.p}}class Kr{constructor(e,t,n,r){this.h=e,this.l=t,this.m=n,this.g=r}getToken(){return Promise.resolve(new Wr(this.h,this.l,this.m,this.g))}start(e,t){e.enqueueRetryable((()=>t(Cr.FIRST_PARTY)))}shutdown(){}invalidateToken(){}}class Gr{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class Jr{constructor(e){this.T=e,this.forceRefresh=!1,this.appCheck=null,this.A=null}start(e,t){const n=e=>{null!=e.error&&Rr("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${e.error.message}`);const n=e.token!==this.A;return this.A=e.token,Rr("FirebaseAppCheckTokenProvider",`Received ${n?"new":"existing"} token.`),n?t(e.token):Promise.resolve()};this.o=t=>{e.enqueueRetryable((()=>n(t)))};const r=e=>{Rr("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=e,this.appCheck.addTokenListener(this.o)};this.T.onInit((e=>r(e))),setTimeout((()=>{if(!this.appCheck){const e=this.T.getImmediate({optional:!0});e?r(e):Rr("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}}),0)}getToken(){const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then((e=>e?(jr("string"==typeof e.token),this.A=e.token,new Gr(e.token)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.appCheck.removeTokenListener(this.o)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Qr(e){const t="undefined"!=typeof self&&(self.crypto||self.msCrypto),n=new Uint8Array(e);if(t&&"function"==typeof t.getRandomValues)t.getRandomValues(n);else for(let r=0;r<e;r++)n[r]=Math.floor(256*Math.random());return n}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xr{static R(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=Math.floor(256/e.length)*e.length;let n="";for(;n.length<20;){const r=Qr(40);for(let i=0;i<r.length;++i)n.length<20&&r[i]<t&&(n+=e.charAt(r[i]%e.length))}return n}}function Yr(e,t){return e<t?-1:e>t?1:0}function Zr(e,t,n){return e.length===t.length&&e.every(((e,r)=>n(e,t[r])))}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class ei{constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new Vr(Ur.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new Vr(Ur.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<-62135596800)throw new Vr(Ur.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new Vr(Ur.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}static now(){return ei.fromMillis(Date.now())}static fromDate(e){return ei.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),n=Math.floor(1e6*(e-1e3*t));return new ei(t,n)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(e){return this.seconds===e.seconds?Yr(this.nanoseconds,e.nanoseconds):Yr(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const e=this.seconds- -62135596800;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ti{constructor(e){this.timestamp=e}static fromTimestamp(e){return new ti(e)}static min(){return new ti(new ei(0,0))}static max(){return new ti(new ei(253402300799,999999999))}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ni{constructor(e,t,n){void 0===t?t=0:t>e.length&&Mr(),void 0===n?n=e.length-t:n>e.length-t&&Mr(),this.segments=e,this.offset=t,this.len=n}get length(){return this.len}isEqual(e){return 0===ni.comparator(this,e)}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof ni?e.forEach((e=>{t.push(e)})):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=void 0===e?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return 0===this.length}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,n=this.limit();t<n;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const n=Math.min(e.length,t.length);for(let r=0;r<n;r++){const n=e.get(r),i=t.get(r);if(n<i)return-1;if(n>i)return 1}return e.length<t.length?-1:e.length>t.length?1:0}}class ri extends ni{construct(e,t,n){return new ri(e,t,n)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}static fromString(...e){const t=[];for(const n of e){if(n.indexOf("//")>=0)throw new Vr(Ur.INVALID_ARGUMENT,`Invalid segment (${n}). Paths must not contain // in them.`);t.push(...n.split("/").filter((e=>e.length>0)))}return new ri(t)}static emptyPath(){return new ri([])}}const ii=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class oi extends ni{construct(e,t,n){return new oi(e,t,n)}static isValidIdentifier(e){return ii.test(e)}canonicalString(){return this.toArray().map((e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),oi.isValidIdentifier(e)||(e="`"+e+"`"),e))).join(".")}toString(){return this.canonicalString()}isKeyField(){return 1===this.length&&"__name__"===this.get(0)}static keyField(){return new oi(["__name__"])}static fromServerFormat(e){const t=[];let n="",r=0;const i=()=>{if(0===n.length)throw new Vr(Ur.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(n),n=""};let o=!1;for(;r<e.length;){const t=e[r];if("\\"===t){if(r+1===e.length)throw new Vr(Ur.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const t=e[r+1];if("\\"!==t&&"."!==t&&"`"!==t)throw new Vr(Ur.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);n+=t,r+=2}else"`"===t?(o=!o,r++):"."!==t||o?(n+=t,r++):(i(),r++)}if(i(),o)throw new Vr(Ur.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new oi(t)}static emptyPath(){return new oi([])}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class si{constructor(e){this.path=e}static fromPath(e){return new si(ri.fromString(e))}static fromName(e){return new si(ri.fromString(e).popFirst(5))}static empty(){return new si(ri.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return null!==e&&0===ri.comparator(this.path,e.path)}toString(){return this.path.toString()}static comparator(e,t){return ri.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new si(new ri(e.slice()))}}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ai{constructor(e,t,n,r){this.indexId=e,this.collectionGroup=t,this.fields=n,this.indexState=r}}ai.UNKNOWN_ID=-1;function ci(e,t){const n=e.toTimestamp().seconds,r=e.toTimestamp().nanoseconds+1,i=ti.fromTimestamp(1e9===r?new ei(n+1,0):new ei(n,r));return new li(i,si.empty(),t)}function ui(e){return new li(e.readTime,e.key,-1)}class li{constructor(e,t,n){this.readTime=e,this.documentKey=t,this.largestBatchId=n}static min(){return new li(ti.min(),si.empty(),-1)}static max(){return new li(ti.max(),si.empty(),-1)}}function hi(e,t){let n=e.readTime.compareTo(t.readTime);return 0!==n?n:(n=si.comparator(e.documentKey,t.documentKey),0!==n?n:Yr(e.largestBatchId,t.largestBatchId))}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fi="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class di{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach((e=>e()))}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function pi(e){if(e.code!==Ur.FAILED_PRECONDITION||e.message!==fi)throw e;Rr("LocalStore","Unexpectedly lost primary lease")}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gi{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e((e=>{this.isDone=!0,this.result=e,this.nextCallback&&this.nextCallback(e)}),(e=>{this.isDone=!0,this.error=e,this.catchCallback&&this.catchCallback(e)}))}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&Mr(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new gi(((n,r)=>{this.nextCallback=t=>{this.wrapSuccess(e,t).next(n,r)},this.catchCallback=e=>{this.wrapFailure(t,e).next(n,r)}}))}toPromise(){return new Promise(((e,t)=>{this.next(e,t)}))}wrapUserFunction(e){try{const t=e();return t instanceof gi?t:gi.resolve(t)}catch(e){return gi.reject(e)}}wrapSuccess(e,t){return e?this.wrapUserFunction((()=>e(t))):gi.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction((()=>e(t))):gi.reject(t)}static resolve(e){return new gi(((t,n)=>{t(e)}))}static reject(e){return new gi(((t,n)=>{n(e)}))}static waitFor(e){return new gi(((t,n)=>{let r=0,i=0,o=!1;e.forEach((e=>{++r,e.next((()=>{++i,o&&i===r&&t()}),(e=>n(e)))})),o=!0,i===r&&t()}))}static or(e){let t=gi.resolve(!1);for(const n of e)t=t.next((e=>e?gi.resolve(e):n()));return t}static forEach(e,t){const n=[];return e.forEach(((e,r)=>{n.push(t.call(this,e,r))})),this.waitFor(n)}static mapArray(e,t){return new gi(((n,r)=>{const i=e.length,o=new Array(i);let s=0;for(let a=0;a<i;a++){const c=a;t(e[c]).next((e=>{o[c]=e,++s,s===i&&n(o)}),(e=>r(e)))}}))}static doWhile(e,t){return new gi(((n,r)=>{const i=()=>{!0===e()?t().next((()=>{i()}),r):n()};i()}))}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mi(e){return"IndexedDbTransactionError"===e.name}
/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class yi{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=e=>this.ut(e),this.ct=e=>t.writeSequenceNumber(e))}ut(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ct&&this.ct(e),e}}yi.at=-1;
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class vi{constructor(e,t,n,r,i,o,s,a){this.databaseId=e,this.appId=t,this.persistenceKey=n,this.host=r,this.ssl=i,this.forceLongPolling=o,this.autoDetectLongPolling=s,this.useFetchStreams=a}}class wi{constructor(e,t){this.projectId=e,this.database=t||"(default)"}static empty(){return new wi("","")}get isDefaultDatabase(){return"(default)"===this.database}isEqual(e){return e instanceof wi&&e.projectId===this.projectId&&e.database===this.database}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bi(e){let t=0;for(const n in e)Object.prototype.hasOwnProperty.call(e,n)&&t++;return t}function Ei(e,t){for(const n in e)Object.prototype.hasOwnProperty.call(e,n)&&t(n,e[n])}function _i(e){for(const t in e)if(Object.prototype.hasOwnProperty.call(e,t))return!1;return!0}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ti(e){return null==e}function Ii(e){return 0===e&&1/e==-1/0}function Si(e){return"number"==typeof e&&Number.isInteger(e)&&!Ii(e)&&e<=Number.MAX_SAFE_INTEGER&&e>=Number.MIN_SAFE_INTEGER}
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ki extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Ai{constructor(e){this.binaryString=e}static fromBase64String(e){const t=function(e){try{return atob(e)}catch(e){throw e instanceof DOMException?new ki("Invalid base64 string: "+e):e}}(e);return new Ai(t)}static fromUint8Array(e){const t=function(e){let t="";for(let n=0;n<e.length;++n)t+=String.fromCharCode(e[n]);return t}(e);return new Ai(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return e=this.binaryString,btoa(e);var e}toUint8Array(){return function(e){const t=new Uint8Array(e.length);for(let n=0;n<e.length;n++)t[n]=e.charCodeAt(n);return t}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return Yr(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}Ai.EMPTY_BYTE_STRING=new Ai("");const Ci=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function xi(e){if(jr(!!e),"string"==typeof e){let t=0;const n=Ci.exec(e);if(jr(!!n),n[1]){let e=n[1];e=(e+"000000000").substr(0,9),t=Number(e)}const r=new Date(e);return{seconds:Math.floor(r.getTime()/1e3),nanos:t}}return{seconds:Oi(e.seconds),nanos:Oi(e.nanos)}}function Oi(e){return"number"==typeof e?e:"string"==typeof e?Number(e):0}function Ni(e){return"string"==typeof e?Ai.fromBase64String(e):Ai.fromUint8Array(e)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ri(e){var t,n;return"server_timestamp"===(null===(n=((null===(t=null==e?void 0:e.mapValue)||void 0===t?void 0:t.fields)||{}).__type__)||void 0===n?void 0:n.stringValue)}function Di(e){const t=e.mapValue.fields.__previous_value__;return Ri(t)?Di(t):t}function Pi(e){const t=xi(e.mapValue.fields.__local_write_time__.timestampValue);return new ei(t.seconds,t.nanos)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Li={mapValue:{fields:{__type__:{stringValue:"__max__"}}}};function Mi(e){return"nullValue"in e?0:"booleanValue"in e?1:"integerValue"in e||"doubleValue"in e?2:"timestampValue"in e?3:"stringValue"in e?5:"bytesValue"in e?6:"referenceValue"in e?7:"geoPointValue"in e?8:"arrayValue"in e?9:"mapValue"in e?Ri(e)?4:Qi(e)?9007199254740991:10:Mr()}function ji(e,t){if(e===t)return!0;const n=Mi(e);if(n!==Mi(t))return!1;switch(n){case 0:case 9007199254740991:return!0;case 1:return e.booleanValue===t.booleanValue;case 4:return Pi(e).isEqual(Pi(t));case 3:return function(e,t){if("string"==typeof e.timestampValue&&"string"==typeof t.timestampValue&&e.timestampValue.length===t.timestampValue.length)return e.timestampValue===t.timestampValue;const n=xi(e.timestampValue),r=xi(t.timestampValue);return n.seconds===r.seconds&&n.nanos===r.nanos}(e,t);case 5:return e.stringValue===t.stringValue;case 6:return function(e,t){return Ni(e.bytesValue).isEqual(Ni(t.bytesValue))}(e,t);case 7:return e.referenceValue===t.referenceValue;case 8:return function(e,t){return Oi(e.geoPointValue.latitude)===Oi(t.geoPointValue.latitude)&&Oi(e.geoPointValue.longitude)===Oi(t.geoPointValue.longitude)}(e,t);case 2:return function(e,t){if("integerValue"in e&&"integerValue"in t)return Oi(e.integerValue)===Oi(t.integerValue);if("doubleValue"in e&&"doubleValue"in t){const n=Oi(e.doubleValue),r=Oi(t.doubleValue);return n===r?Ii(n)===Ii(r):isNaN(n)&&isNaN(r)}return!1}(e,t);case 9:return Zr(e.arrayValue.values||[],t.arrayValue.values||[],ji);case 10:return function(e,t){const n=e.mapValue.fields||{},r=t.mapValue.fields||{};if(bi(n)!==bi(r))return!1;for(const i in n)if(n.hasOwnProperty(i)&&(void 0===r[i]||!ji(n[i],r[i])))return!1;return!0}(e,t);default:return Mr()}}function Fi(e,t){return void 0!==(e.values||[]).find((e=>ji(e,t)))}function Ui(e,t){if(e===t)return 0;const n=Mi(e),r=Mi(t);if(n!==r)return Yr(n,r);switch(n){case 0:case 9007199254740991:return 0;case 1:return Yr(e.booleanValue,t.booleanValue);case 2:return function(e,t){const n=Oi(e.integerValue||e.doubleValue),r=Oi(t.integerValue||t.doubleValue);return n<r?-1:n>r?1:n===r?0:isNaN(n)?isNaN(r)?0:-1:1}(e,t);case 3:return Vi(e.timestampValue,t.timestampValue);case 4:return Vi(Pi(e),Pi(t));case 5:return Yr(e.stringValue,t.stringValue);case 6:return function(e,t){const n=Ni(e),r=Ni(t);return n.compareTo(r)}(e.bytesValue,t.bytesValue);case 7:return function(e,t){const n=e.split("/"),r=t.split("/");for(let i=0;i<n.length&&i<r.length;i++){const e=Yr(n[i],r[i]);if(0!==e)return e}return Yr(n.length,r.length)}(e.referenceValue,t.referenceValue);case 8:return function(e,t){const n=Yr(Oi(e.latitude),Oi(t.latitude));return 0!==n?n:Yr(Oi(e.longitude),Oi(t.longitude))}(e.geoPointValue,t.geoPointValue);case 9:return function(e,t){const n=e.values||[],r=t.values||[];for(let i=0;i<n.length&&i<r.length;++i){const e=Ui(n[i],r[i]);if(e)return e}return Yr(n.length,r.length)}(e.arrayValue,t.arrayValue);case 10:return function(e,t){if(e===Li.mapValue&&t===Li.mapValue)return 0;if(e===Li.mapValue)return 1;if(t===Li.mapValue)return-1;const n=e.fields||{},r=Object.keys(n),i=t.fields||{},o=Object.keys(i);r.sort(),o.sort();for(let s=0;s<r.length&&s<o.length;++s){const e=Yr(r[s],o[s]);if(0!==e)return e;const t=Ui(n[r[s]],i[o[s]]);if(0!==t)return t}return Yr(r.length,o.length)}(e.mapValue,t.mapValue);default:throw Mr()}}function Vi(e,t){if("string"==typeof e&&"string"==typeof t&&e.length===t.length)return Yr(e,t);const n=xi(e),r=xi(t),i=Yr(n.seconds,r.seconds);return 0!==i?i:Yr(n.nanos,r.nanos)}function qi(e){return $i(e)}function $i(e){return"nullValue"in e?"null":"booleanValue"in e?""+e.booleanValue:"integerValue"in e?""+e.integerValue:"doubleValue"in e?""+e.doubleValue:"timestampValue"in e?function(e){const t=xi(e);return`time(${t.seconds},${t.nanos})`}(e.timestampValue):"stringValue"in e?e.stringValue:"bytesValue"in e?Ni(e.bytesValue).toBase64():"referenceValue"in e?(n=e.referenceValue,si.fromName(n).toString()):"geoPointValue"in e?`geo(${(t=e.geoPointValue).latitude},${t.longitude})`:"arrayValue"in e?function(e){let t="[",n=!0;for(const r of e.values||[])n?n=!1:t+=",",t+=$i(r);return t+"]"}(e.arrayValue):"mapValue"in e?function(e){const t=Object.keys(e.fields||{}).sort();let n="{",r=!0;for(const i of t)r?r=!1:n+=",",n+=`${i}:${$i(e.fields[i])}`;return n+"}"}(e.mapValue):Mr();var t,n}function Bi(e,t){return{referenceValue:`projects/${e.projectId}/databases/${e.database}/documents/${t.path.canonicalString()}`}}function Hi(e){return!!e&&"integerValue"in e}function zi(e){return!!e&&"arrayValue"in e}function Wi(e){return!!e&&"nullValue"in e}function Ki(e){return!!e&&"doubleValue"in e&&isNaN(Number(e.doubleValue))}function Gi(e){return!!e&&"mapValue"in e}function Ji(e){if(e.geoPointValue)return{geoPointValue:Object.assign({},e.geoPointValue)};if(e.timestampValue&&"object"==typeof e.timestampValue)return{timestampValue:Object.assign({},e.timestampValue)};if(e.mapValue){const t={mapValue:{fields:{}}};return Ei(e.mapValue.fields,((e,n)=>t.mapValue.fields[e]=Ji(n))),t}if(e.arrayValue){const t={arrayValue:{values:[]}};for(let n=0;n<(e.arrayValue.values||[]).length;++n)t.arrayValue.values[n]=Ji(e.arrayValue.values[n]);return t}return Object.assign({},e)}function Qi(e){return"__max__"===(((e.mapValue||{}).fields||{}).__type__||{}).stringValue}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Xi{constructor(e,t){this.position=e,this.inclusive=t}}function Yi(e,t,n){let r=0;for(let i=0;i<e.position.length;i++){const o=t[i],s=e.position[i];if(r=o.field.isKeyField()?si.comparator(si.fromName(s.referenceValue),n.key):Ui(s,n.data.field(o.field)),"desc"===o.dir&&(r*=-1),0!==r)break}return r}function Zi(e,t){if(null===e)return null===t;if(null===t)return!1;if(e.inclusive!==t.inclusive||e.position.length!==t.position.length)return!1;for(let n=0;n<e.position.length;n++)if(!ji(e.position[n],t.position[n]))return!1;return!0}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eo{}class to extends eo{constructor(e,t,n){super(),this.field=e,this.op=t,this.value=n}static create(e,t,n){return e.isKeyField()?"in"===t||"not-in"===t?this.createKeyFieldInFilter(e,t,n):new uo(e,t,n):"array-contains"===t?new po(e,n):"in"===t?new go(e,n):"not-in"===t?new mo(e,n):"array-contains-any"===t?new yo(e,n):new to(e,t,n)}static createKeyFieldInFilter(e,t,n){return"in"===t?new lo(e,n):new ho(e,n)}matches(e){const t=e.data.field(this.field);return"!="===this.op?null!==t&&this.matchesComparison(Ui(t,this.value)):null!==t&&Mi(this.value)===Mi(t)&&this.matchesComparison(Ui(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return 0===e;case"!=":return 0!==e;case">":return e>0;case">=":return e>=0;default:return Mr()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}getFirstInequalityField(){return this.isInequality()?this.field:null}}class no extends eo{constructor(e,t){super(),this.filters=e,this.op=t,this.ft=null}static create(e,t){return new no(e,t)}matches(e){return ro(this)?void 0===this.filters.find((t=>!t.matches(e))):void 0!==this.filters.find((t=>t.matches(e)))}getFlattenedFilters(){return null!==this.ft||(this.ft=this.filters.reduce(((e,t)=>e.concat(t.getFlattenedFilters())),[])),this.ft}getFilters(){return Object.assign([],this.filters)}getFirstInequalityField(){const e=this.dt((e=>e.isInequality()));return null!==e?e.field:null}dt(e){for(const t of this.getFlattenedFilters())if(e(t))return t;return null}}function ro(e){return"and"===e.op}function io(e){return oo(e)&&ro(e)}function oo(e){for(const t of e.filters)if(t instanceof no)return!1;return!0}function so(e){if(e instanceof to)return e.field.canonicalString()+e.op.toString()+qi(e.value);if(io(e))return e.filters.map((e=>so(e))).join(",");{const t=e.filters.map((e=>so(e))).join(",");return`${e.op}(${t})`}}function ao(e,t){return e instanceof to?function(e,t){return t instanceof to&&e.op===t.op&&e.field.isEqual(t.field)&&ji(e.value,t.value)}(e,t):e instanceof no?function(e,t){return t instanceof no&&e.op===t.op&&e.filters.length===t.filters.length&&e.filters.reduce(((e,n,r)=>e&&ao(n,t.filters[r])),!0)}(e,t):void Mr()}function co(e){return e instanceof to?function(e){return`${e.field.canonicalString()} ${e.op} ${qi(e.value)}`}(e):e instanceof no?function(e){return e.op.toString()+" {"+e.getFilters().map(co).join(" ,")+"}"}(e):"Filter"}class uo extends to{constructor(e,t,n){super(e,t,n),this.key=si.fromName(n.referenceValue)}matches(e){const t=si.comparator(e.key,this.key);return this.matchesComparison(t)}}class lo extends to{constructor(e,t){super(e,"in",t),this.keys=fo("in",t)}matches(e){return this.keys.some((t=>t.isEqual(e.key)))}}class ho extends to{constructor(e,t){super(e,"not-in",t),this.keys=fo("not-in",t)}matches(e){return!this.keys.some((t=>t.isEqual(e.key)))}}function fo(e,t){var n;return((null===(n=t.arrayValue)||void 0===n?void 0:n.values)||[]).map((e=>si.fromName(e.referenceValue)))}class po extends to{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return zi(t)&&Fi(t.arrayValue,this.value)}}class go extends to{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return null!==t&&Fi(this.value.arrayValue,t)}}class mo extends to{constructor(e,t){super(e,"not-in",t)}matches(e){if(Fi(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return null!==t&&!Fi(this.value.arrayValue,t)}}class yo extends to{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!zi(t)||!t.arrayValue.values)&&t.arrayValue.values.some((e=>Fi(this.value.arrayValue,e)))}}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vo{constructor(e,t="asc"){this.field=e,this.dir=t}}function wo(e,t){return e.dir===t.dir&&e.field.isEqual(t.field)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bo{constructor(e,t){this.comparator=e,this.root=t||_o.EMPTY}insert(e,t){return new bo(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,_o.BLACK,null,null))}remove(e){return new bo(this.comparator,this.root.remove(e,this.comparator).copy(null,null,_o.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const n=this.comparator(e,t.key);if(0===n)return t.value;n<0?t=t.left:n>0&&(t=t.right)}return null}indexOf(e){let t=0,n=this.root;for(;!n.isEmpty();){const r=this.comparator(e,n.key);if(0===r)return t+n.left.size;r<0?n=n.left:(t+=n.left.size+1,n=n.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal(((t,n)=>(e(t,n),!1)))}toString(){const e=[];return this.inorderTraversal(((t,n)=>(e.push(`${t}:${n}`),!1))),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new Eo(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new Eo(this.root,e,this.comparator,!1)}getReverseIterator(){return new Eo(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new Eo(this.root,e,this.comparator,!0)}}class Eo{constructor(e,t,n,r){this.isReverse=r,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=t?n(e.key,t):1,t&&r&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(0===i){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(0===this.nodeStack.length)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class _o{constructor(e,t,n,r,i){this.key=e,this.value=t,this.color=null!=n?n:_o.RED,this.left=null!=r?r:_o.EMPTY,this.right=null!=i?i:_o.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,n,r,i){return new _o(null!=e?e:this.key,null!=t?t:this.value,null!=n?n:this.color,null!=r?r:this.left,null!=i?i:this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,n){let r=this;const i=n(e,r.key);return r=i<0?r.copy(null,null,null,r.left.insert(e,t,n),null):0===i?r.copy(null,t,null,null,null):r.copy(null,null,null,null,r.right.insert(e,t,n)),r.fixUp()}removeMin(){if(this.left.isEmpty())return _o.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let n,r=this;if(t(e,r.key)<0)r.left.isEmpty()||r.left.isRed()||r.left.left.isRed()||(r=r.moveRedLeft()),r=r.copy(null,null,null,r.left.remove(e,t),null);else{if(r.left.isRed()&&(r=r.rotateRight()),r.right.isEmpty()||r.right.isRed()||r.right.left.isRed()||(r=r.moveRedRight()),0===t(e,r.key)){if(r.right.isEmpty())return _o.EMPTY;n=r.right.min(),r=r.copy(n.key,n.value,null,null,r.right.removeMin())}r=r.copy(null,null,null,null,r.right.remove(e,t))}return r.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,_o.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,_o.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw Mr();if(this.right.isRed())throw Mr();const e=this.left.check();if(e!==this.right.check())throw Mr();return e+(this.isRed()?0:1)}}_o.EMPTY=null,_o.RED=!0,_o.BLACK=!1,_o.EMPTY=new class{constructor(){this.size=0}get key(){throw Mr()}get value(){throw Mr()}get color(){throw Mr()}get left(){throw Mr()}get right(){throw Mr()}copy(e,t,n,r,i){return this}insert(e,t,n){return new _o(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class To{constructor(e){this.comparator=e,this.data=new bo(this.comparator)}has(e){return null!==this.data.get(e)}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal(((t,n)=>(e(t),!1)))}forEachInRange(e,t){const n=this.data.getIteratorFrom(e[0]);for(;n.hasNext();){const r=n.getNext();if(this.comparator(r.key,e[1])>=0)return;t(r.key)}}forEachWhile(e,t){let n;for(n=void 0!==t?this.data.getIteratorFrom(t):this.data.getIterator();n.hasNext();)if(!e(n.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new Io(this.data.getIterator())}getIteratorFrom(e){return new Io(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach((e=>{t=t.add(e)})),t}isEqual(e){if(!(e instanceof To))return!1;if(this.size!==e.size)return!1;const t=this.data.getIterator(),n=e.data.getIterator();for(;t.hasNext();){const e=t.getNext().key,r=n.getNext().key;if(0!==this.comparator(e,r))return!1}return!0}toArray(){const e=[];return this.forEach((t=>{e.push(t)})),e}toString(){const e=[];return this.forEach((t=>e.push(t))),"SortedSet("+e.toString()+")"}copy(e){const t=new To(this.comparator);return t.data=e,t}}class Io{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class So{constructor(e){this.fields=e,e.sort(oi.comparator)}static empty(){return new So([])}unionWith(e){let t=new To(oi.comparator);for(const n of this.fields)t=t.add(n);for(const n of e)t=t.add(n);return new So(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return Zr(this.fields,e.fields,((e,t)=>e.isEqual(t)))}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ko{constructor(e){this.value=e}static empty(){return new ko({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let n=0;n<e.length-1;++n)if(t=(t.mapValue.fields||{})[e.get(n)],!Gi(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=Ji(t)}setAll(e){let t=oi.emptyPath(),n={},r=[];e.forEach(((e,i)=>{if(!t.isImmediateParentOf(i)){const e=this.getFieldsMap(t);this.applyChanges(e,n,r),n={},r=[],t=i.popLast()}e?n[i.lastSegment()]=Ji(e):r.push(i.lastSegment())}));const i=this.getFieldsMap(t);this.applyChanges(i,n,r)}delete(e){const t=this.field(e.popLast());Gi(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return ji(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let n=0;n<e.length;++n){let r=t.mapValue.fields[e.get(n)];Gi(r)&&r.mapValue.fields||(r={mapValue:{fields:{}}},t.mapValue.fields[e.get(n)]=r),t=r}return t.mapValue.fields}applyChanges(e,t,n){Ei(t,((t,n)=>e[t]=n));for(const r of n)delete e[r]}clone(){return new ko(Ji(this.value))}}function Ao(e){const t=[];return Ei(e.fields,((e,n)=>{const r=new oi([e]);if(Gi(n)){const e=Ao(n.mapValue).fields;if(0===e.length)t.push(r);else for(const n of e)t.push(r.child(n))}else t.push(r)})),new So(t)
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */}class Co{constructor(e,t,n,r,i,o,s){this.key=e,this.documentType=t,this.version=n,this.readTime=r,this.createTime=i,this.data=o,this.documentState=s}static newInvalidDocument(e){return new Co(e,0,ti.min(),ti.min(),ti.min(),ko.empty(),0)}static newFoundDocument(e,t,n,r){return new Co(e,1,t,ti.min(),n,r,0)}static newNoDocument(e,t){return new Co(e,2,t,ti.min(),ti.min(),ko.empty(),0)}static newUnknownDocument(e,t){return new Co(e,3,t,ti.min(),ti.min(),ko.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(ti.min())||2!==this.documentType&&0!==this.documentType||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=ko.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=ko.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=ti.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return 1===this.documentState}get hasCommittedMutations(){return 2===this.documentState}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return 0!==this.documentType}isFoundDocument(){return 1===this.documentType}isNoDocument(){return 2===this.documentType}isUnknownDocument(){return 3===this.documentType}isEqual(e){return e instanceof Co&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new Co(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xo{constructor(e,t=null,n=[],r=[],i=null,o=null,s=null){this.path=e,this.collectionGroup=t,this.orderBy=n,this.filters=r,this.limit=i,this.startAt=o,this.endAt=s,this._t=null}}function Oo(e,t=null,n=[],r=[],i=null,o=null,s=null){return new xo(e,t,n,r,i,o,s)}function No(e){const t=Fr(e);if(null===t._t){let e=t.path.canonicalString();null!==t.collectionGroup&&(e+="|cg:"+t.collectionGroup),e+="|f:",e+=t.filters.map((e=>so(e))).join(","),e+="|ob:",e+=t.orderBy.map((e=>function(e){return e.field.canonicalString()+e.dir}(e))).join(","),Ti(t.limit)||(e+="|l:",e+=t.limit),t.startAt&&(e+="|lb:",e+=t.startAt.inclusive?"b:":"a:",e+=t.startAt.position.map((e=>qi(e))).join(",")),t.endAt&&(e+="|ub:",e+=t.endAt.inclusive?"a:":"b:",e+=t.endAt.position.map((e=>qi(e))).join(",")),t._t=e}return t._t}function Ro(e,t){if(e.limit!==t.limit)return!1;if(e.orderBy.length!==t.orderBy.length)return!1;for(let n=0;n<e.orderBy.length;n++)if(!wo(e.orderBy[n],t.orderBy[n]))return!1;if(e.filters.length!==t.filters.length)return!1;for(let n=0;n<e.filters.length;n++)if(!ao(e.filters[n],t.filters[n]))return!1;return e.collectionGroup===t.collectionGroup&&!!e.path.isEqual(t.path)&&!!Zi(e.startAt,t.startAt)&&Zi(e.endAt,t.endAt)}function Do(e){return si.isDocumentKey(e.path)&&null===e.collectionGroup&&0===e.filters.length}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Po{constructor(e,t=null,n=[],r=[],i=null,o="F",s=null,a=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=n,this.filters=r,this.limit=i,this.limitType=o,this.startAt=s,this.endAt=a,this.wt=null,this.gt=null,this.startAt,this.endAt}}function Lo(e,t,n,r,i,o,s,a){return new Po(e,t,n,r,i,o,s,a)}function Mo(e){return new Po(e)}function jo(e){return 0===e.filters.length&&null===e.limit&&null==e.startAt&&null==e.endAt&&(0===e.explicitOrderBy.length||1===e.explicitOrderBy.length&&e.explicitOrderBy[0].field.isKeyField())}function Fo(e){return e.explicitOrderBy.length>0?e.explicitOrderBy[0].field:null}function Uo(e){for(const t of e.filters){const e=t.getFirstInequalityField();if(null!==e)return e}return null}function Vo(e){return null!==e.collectionGroup}function qo(e){const t=Fr(e);if(null===t.wt){t.wt=[];const e=Uo(t),n=Fo(t);if(null!==e&&null===n)e.isKeyField()||t.wt.push(new vo(e)),t.wt.push(new vo(oi.keyField(),"asc"));else{let e=!1;for(const n of t.explicitOrderBy)t.wt.push(n),n.field.isKeyField()&&(e=!0);if(!e){const e=t.explicitOrderBy.length>0?t.explicitOrderBy[t.explicitOrderBy.length-1].dir:"asc";t.wt.push(new vo(oi.keyField(),e))}}}return t.wt}function $o(e){const t=Fr(e);if(!t.gt)if("F"===t.limitType)t.gt=Oo(t.path,t.collectionGroup,qo(t),t.filters,t.limit,t.startAt,t.endAt);else{const e=[];for(const i of qo(t)){const t="desc"===i.dir?"asc":"desc";e.push(new vo(i.field,t))}const n=t.endAt?new Xi(t.endAt.position,t.endAt.inclusive):null,r=t.startAt?new Xi(t.startAt.position,t.startAt.inclusive):null;t.gt=Oo(t.path,t.collectionGroup,e,t.filters,t.limit,n,r)}return t.gt}function Bo(e,t){t.getFirstInequalityField(),Uo(e);const n=e.filters.concat([t]);return new Po(e.path,e.collectionGroup,e.explicitOrderBy.slice(),n,e.limit,e.limitType,e.startAt,e.endAt)}function Ho(e,t,n){return new Po(e.path,e.collectionGroup,e.explicitOrderBy.slice(),e.filters.slice(),t,n,e.startAt,e.endAt)}function zo(e,t){return Ro($o(e),$o(t))&&e.limitType===t.limitType}function Wo(e){return`${No($o(e))}|lt:${e.limitType}`}function Ko(e){return`Query(target=${function(e){let t=e.path.canonicalString();return null!==e.collectionGroup&&(t+=" collectionGroup="+e.collectionGroup),e.filters.length>0&&(t+=`, filters: [${e.filters.map((e=>co(e))).join(", ")}]`),Ti(e.limit)||(t+=", limit: "+e.limit),e.orderBy.length>0&&(t+=`, orderBy: [${e.orderBy.map((e=>function(e){return`${e.field.canonicalString()} (${e.dir})`}(e))).join(", ")}]`),e.startAt&&(t+=", startAt: ",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map((e=>qi(e))).join(",")),e.endAt&&(t+=", endAt: ",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map((e=>qi(e))).join(",")),`Target(${t})`}($o(e))}; limitType=${e.limitType})`}function Go(e,t){return t.isFoundDocument()&&function(e,t){const n=t.key.path;return null!==e.collectionGroup?t.key.hasCollectionId(e.collectionGroup)&&e.path.isPrefixOf(n):si.isDocumentKey(e.path)?e.path.isEqual(n):e.path.isImmediateParentOf(n)}(e,t)&&function(e,t){for(const n of qo(e))if(!n.field.isKeyField()&&null===t.data.field(n.field))return!1;return!0}(e,t)&&function(e,t){for(const n of e.filters)if(!n.matches(t))return!1;return!0}(e,t)&&function(e,t){return!(e.startAt&&!function(e,t,n){const r=Yi(e,t,n);return e.inclusive?r<=0:r<0}(e.startAt,qo(e),t))&&!(e.endAt&&!function(e,t,n){const r=Yi(e,t,n);return e.inclusive?r>=0:r>0}(e.endAt,qo(e),t))}(e,t)}function Jo(e){return e.collectionGroup||(e.path.length%2==1?e.path.lastSegment():e.path.get(e.path.length-2))}function Qo(e){return(t,n)=>{let r=!1;for(const i of qo(e)){const e=Xo(i,t,n);if(0!==e)return e;r=r||i.field.isKeyField()}return 0}}function Xo(e,t,n){const r=e.field.isKeyField()?si.comparator(t.key,n.key):function(e,t,n){const r=t.data.field(e),i=n.data.field(e);return null!==r&&null!==i?Ui(r,i):Mr()}(e.field,t,n);switch(e.dir){case"asc":return r;case"desc":return-1*r;default:return Mr()}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Yo(e,t){if(e.yt){if(isNaN(t))return{doubleValue:"NaN"};if(t===1/0)return{doubleValue:"Infinity"};if(t===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Ii(t)?"-0":t}}function Zo(e){return{integerValue:""+e}}function es(e,t){return Si(t)?Zo(t):Yo(e,t)}
/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ts{constructor(){this._=void 0}}function ns(e,t,n){return e instanceof os?function(e,t){const n={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:e.seconds,nanos:e.nanoseconds}}}};return t&&(n.fields.__previous_value__=t),{mapValue:n}}(n,t):e instanceof ss?as(e,t):e instanceof cs?us(e,t):function(e,t){const n=is(e,t),r=hs(n)+hs(e.It);return Hi(n)&&Hi(e.It)?Zo(r):Yo(e.Tt,r)}(e,t)}function rs(e,t,n){return e instanceof ss?as(e,t):e instanceof cs?us(e,t):n}function is(e,t){return e instanceof ls?Hi(n=t)||function(e){return!!e&&"doubleValue"in e}(n)?t:{integerValue:0}:null;var n}class os extends ts{}class ss extends ts{constructor(e){super(),this.elements=e}}function as(e,t){const n=fs(t);for(const r of e.elements)n.some((e=>ji(e,r)))||n.push(r);return{arrayValue:{values:n}}}class cs extends ts{constructor(e){super(),this.elements=e}}function us(e,t){let n=fs(t);for(const r of e.elements)n=n.filter((e=>!ji(e,r)));return{arrayValue:{values:n}}}class ls extends ts{constructor(e,t){super(),this.Tt=e,this.It=t}}function hs(e){return Oi(e.integerValue||e.doubleValue)}function fs(e){return zi(e)&&e.arrayValue.values?e.arrayValue.values.slice():[]}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ds{constructor(e,t){this.field=e,this.transform=t}}function ps(e,t){return e.field.isEqual(t.field)&&function(e,t){return e instanceof ss&&t instanceof ss||e instanceof cs&&t instanceof cs?Zr(e.elements,t.elements,ji):e instanceof ls&&t instanceof ls?ji(e.It,t.It):e instanceof os&&t instanceof os}(e.transform,t.transform)}class gs{constructor(e,t){this.version=e,this.transformResults=t}}class ms{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new ms}static exists(e){return new ms(void 0,e)}static updateTime(e){return new ms(e)}get isNone(){return void 0===this.updateTime&&void 0===this.exists}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function ys(e,t){return void 0!==e.updateTime?t.isFoundDocument()&&t.version.isEqual(e.updateTime):void 0===e.exists||e.exists===t.isFoundDocument()}class vs{}function ws(e,t){if(!e.hasLocalMutations||t&&0===t.fields.length)return null;if(null===t)return e.isNoDocument()?new xs(e.key,ms.none()):new Is(e.key,e.data,ms.none());{const n=e.data,r=ko.empty();let i=new To(oi.comparator);for(let e of t.fields)if(!i.has(e)){let t=n.field(e);null===t&&e.length>1&&(e=e.popLast(),t=n.field(e)),null===t?r.delete(e):r.set(e,t),i=i.add(e)}return new Ss(e.key,r,new So(i.toArray()),ms.none())}}function bs(e,t,n){e instanceof Is?function(e,t,n){const r=e.value.clone(),i=As(e.fieldTransforms,t,n.transformResults);r.setAll(i),t.convertToFoundDocument(n.version,r).setHasCommittedMutations()}(e,t,n):e instanceof Ss?function(e,t,n){if(!ys(e.precondition,t))return void t.convertToUnknownDocument(n.version);const r=As(e.fieldTransforms,t,n.transformResults),i=t.data;i.setAll(ks(e)),i.setAll(r),t.convertToFoundDocument(n.version,i).setHasCommittedMutations()}(e,t,n):function(e,t,n){t.convertToNoDocument(n.version).setHasCommittedMutations()}(0,t,n)}function Es(e,t,n,r){return e instanceof Is?function(e,t,n,r){if(!ys(e.precondition,t))return n;const i=e.value.clone(),o=Cs(e.fieldTransforms,r,t);return i.setAll(o),t.convertToFoundDocument(t.version,i).setHasLocalMutations(),null}(e,t,n,r):e instanceof Ss?function(e,t,n,r){if(!ys(e.precondition,t))return n;const i=Cs(e.fieldTransforms,r,t),o=t.data;return o.setAll(ks(e)),o.setAll(i),t.convertToFoundDocument(t.version,o).setHasLocalMutations(),null===n?null:n.unionWith(e.fieldMask.fields).unionWith(e.fieldTransforms.map((e=>e.field)))}(e,t,n,r):function(e,t,n){return ys(e.precondition,t)?(t.convertToNoDocument(t.version).setHasLocalMutations(),null):n}(e,t,n)}function _s(e,t){let n=null;for(const r of e.fieldTransforms){const e=t.data.field(r.field),i=is(r.transform,e||null);null!=i&&(null===n&&(n=ko.empty()),n.set(r.field,i))}return n||null}function Ts(e,t){return e.type===t.type&&!!e.key.isEqual(t.key)&&!!e.precondition.isEqual(t.precondition)&&!!function(e,t){return void 0===e&&void 0===t||!(!e||!t)&&Zr(e,t,((e,t)=>ps(e,t)))}(e.fieldTransforms,t.fieldTransforms)&&(0===e.type?e.value.isEqual(t.value):1!==e.type||e.data.isEqual(t.data)&&e.fieldMask.isEqual(t.fieldMask))}class Is extends vs{constructor(e,t,n,r=[]){super(),this.key=e,this.value=t,this.precondition=n,this.fieldTransforms=r,this.type=0}getFieldMask(){return null}}class Ss extends vs{constructor(e,t,n,r,i=[]){super(),this.key=e,this.data=t,this.fieldMask=n,this.precondition=r,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function ks(e){const t=new Map;return e.fieldMask.fields.forEach((n=>{if(!n.isEmpty()){const r=e.data.field(n);t.set(n,r)}})),t}function As(e,t,n){const r=new Map;jr(e.length===n.length);for(let i=0;i<n.length;i++){const o=e[i],s=o.transform,a=t.data.field(o.field);r.set(o.field,rs(s,a,n[i]))}return r}function Cs(e,t,n){const r=new Map;for(const i of e){const e=i.transform,o=n.data.field(i.field);r.set(i.field,ns(e,o,t))}return r}class xs extends vs{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class Os extends vs{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ns{constructor(e){this.count=e}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Rs,Ds;function Ps(e){switch(e){default:return Mr();case Ur.CANCELLED:case Ur.UNKNOWN:case Ur.DEADLINE_EXCEEDED:case Ur.RESOURCE_EXHAUSTED:case Ur.INTERNAL:case Ur.UNAVAILABLE:case Ur.UNAUTHENTICATED:return!1;case Ur.INVALID_ARGUMENT:case Ur.NOT_FOUND:case Ur.ALREADY_EXISTS:case Ur.PERMISSION_DENIED:case Ur.FAILED_PRECONDITION:case Ur.ABORTED:case Ur.OUT_OF_RANGE:case Ur.UNIMPLEMENTED:case Ur.DATA_LOSS:return!0}}function Ls(e){if(void 0===e)return Dr("GRPC error has no .code"),Ur.UNKNOWN;switch(e){case Rs.OK:return Ur.OK;case Rs.CANCELLED:return Ur.CANCELLED;case Rs.UNKNOWN:return Ur.UNKNOWN;case Rs.DEADLINE_EXCEEDED:return Ur.DEADLINE_EXCEEDED;case Rs.RESOURCE_EXHAUSTED:return Ur.RESOURCE_EXHAUSTED;case Rs.INTERNAL:return Ur.INTERNAL;case Rs.UNAVAILABLE:return Ur.UNAVAILABLE;case Rs.UNAUTHENTICATED:return Ur.UNAUTHENTICATED;case Rs.INVALID_ARGUMENT:return Ur.INVALID_ARGUMENT;case Rs.NOT_FOUND:return Ur.NOT_FOUND;case Rs.ALREADY_EXISTS:return Ur.ALREADY_EXISTS;case Rs.PERMISSION_DENIED:return Ur.PERMISSION_DENIED;case Rs.FAILED_PRECONDITION:return Ur.FAILED_PRECONDITION;case Rs.ABORTED:return Ur.ABORTED;case Rs.OUT_OF_RANGE:return Ur.OUT_OF_RANGE;case Rs.UNIMPLEMENTED:return Ur.UNIMPLEMENTED;case Rs.DATA_LOSS:return Ur.DATA_LOSS;default:return Mr()}}(Ds=Rs||(Rs={}))[Ds.OK=0]="OK",Ds[Ds.CANCELLED=1]="CANCELLED",Ds[Ds.UNKNOWN=2]="UNKNOWN",Ds[Ds.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",Ds[Ds.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",Ds[Ds.NOT_FOUND=5]="NOT_FOUND",Ds[Ds.ALREADY_EXISTS=6]="ALREADY_EXISTS",Ds[Ds.PERMISSION_DENIED=7]="PERMISSION_DENIED",Ds[Ds.UNAUTHENTICATED=16]="UNAUTHENTICATED",Ds[Ds.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",Ds[Ds.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",Ds[Ds.ABORTED=10]="ABORTED",Ds[Ds.OUT_OF_RANGE=11]="OUT_OF_RANGE",Ds[Ds.UNIMPLEMENTED=12]="UNIMPLEMENTED",Ds[Ds.INTERNAL=13]="INTERNAL",Ds[Ds.UNAVAILABLE=14]="UNAVAILABLE",Ds[Ds.DATA_LOSS=15]="DATA_LOSS";
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Ms{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),n=this.inner[t];if(void 0!==n)for(const[r,i]of n)if(this.equalsFn(r,e))return i}has(e){return void 0!==this.get(e)}set(e,t){const n=this.mapKeyFn(e),r=this.inner[n];if(void 0===r)return this.inner[n]=[[e,t]],void this.innerSize++;for(let i=0;i<r.length;i++)if(this.equalsFn(r[i][0],e))return void(r[i]=[e,t]);r.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),n=this.inner[t];if(void 0===n)return!1;for(let r=0;r<n.length;r++)if(this.equalsFn(n[r][0],e))return 1===n.length?delete this.inner[t]:n.splice(r,1),this.innerSize--,!0;return!1}forEach(e){Ei(this.inner,((t,n)=>{for(const[r,i]of n)e(r,i)}))}isEmpty(){return _i(this.inner)}size(){return this.innerSize}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const js=new bo(si.comparator);function Fs(){return js}const Us=new bo(si.comparator);function Vs(...e){let t=Us;for(const n of e)t=t.insert(n.key,n);return t}function qs(e){let t=Us;return e.forEach(((e,n)=>t=t.insert(e,n.overlayedDocument))),t}function $s(){return Hs()}function Bs(){return Hs()}function Hs(){return new Ms((e=>e.toString()),((e,t)=>e.isEqual(t)))}const zs=new bo(si.comparator),Ws=new To(si.comparator);function Ks(...e){let t=Ws;for(const n of e)t=t.add(n);return t}const Gs=new To(Yr);function Js(){return Gs}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qs{constructor(e,t,n,r,i){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=n,this.documentUpdates=r,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,t,n){const r=new Map;return r.set(e,Xs.createSynthesizedTargetChangeForCurrentChange(e,t,n)),new Qs(ti.min(),r,Js(),Fs(),Ks())}}class Xs{constructor(e,t,n,r,i){this.resumeToken=e,this.current=t,this.addedDocuments=n,this.modifiedDocuments=r,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,t,n){return new Xs(n,t,Ks(),Ks(),Ks())}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ys{constructor(e,t,n,r){this.Et=e,this.removedTargetIds=t,this.key=n,this.At=r}}class Zs{constructor(e,t){this.targetId=e,this.Rt=t}}class ea{constructor(e,t,n=Ai.EMPTY_BYTE_STRING,r=null){this.state=e,this.targetIds=t,this.resumeToken=n,this.cause=r}}class ta{constructor(){this.bt=0,this.vt=ia(),this.Pt=Ai.EMPTY_BYTE_STRING,this.Vt=!1,this.St=!0}get current(){return this.Vt}get resumeToken(){return this.Pt}get Dt(){return 0!==this.bt}get Ct(){return this.St}xt(e){e.approximateByteSize()>0&&(this.St=!0,this.Pt=e)}Nt(){let e=Ks(),t=Ks(),n=Ks();return this.vt.forEach(((r,i)=>{switch(i){case 0:e=e.add(r);break;case 2:t=t.add(r);break;case 1:n=n.add(r);break;default:Mr()}})),new Xs(this.Pt,this.Vt,e,t,n)}kt(){this.St=!1,this.vt=ia()}Ot(e,t){this.St=!0,this.vt=this.vt.insert(e,t)}Mt(e){this.St=!0,this.vt=this.vt.remove(e)}Ft(){this.bt+=1}$t(){this.bt-=1}Bt(){this.St=!0,this.Vt=!0}}class na{constructor(e){this.Lt=e,this.qt=new Map,this.Ut=Fs(),this.Kt=ra(),this.Gt=new To(Yr)}Qt(e){for(const t of e.Et)e.At&&e.At.isFoundDocument()?this.jt(t,e.At):this.zt(t,e.key,e.At);for(const t of e.removedTargetIds)this.zt(t,e.key,e.At)}Wt(e){this.forEachTarget(e,(t=>{const n=this.Ht(t);switch(e.state){case 0:this.Jt(t)&&n.xt(e.resumeToken);break;case 1:n.$t(),n.Dt||n.kt(),n.xt(e.resumeToken);break;case 2:n.$t(),n.Dt||this.removeTarget(t);break;case 3:this.Jt(t)&&(n.Bt(),n.xt(e.resumeToken));break;case 4:this.Jt(t)&&(this.Yt(t),n.xt(e.resumeToken));break;default:Mr()}}))}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.qt.forEach(((e,n)=>{this.Jt(n)&&t(n)}))}Zt(e){const t=e.targetId,n=e.Rt.count,r=this.Xt(t);if(r){const e=r.target;if(Do(e))if(0===n){const n=new si(e.path);this.zt(t,n,Co.newNoDocument(n,ti.min()))}else jr(1===n);else this.te(t)!==n&&(this.Yt(t),this.Gt=this.Gt.add(t))}}ee(e){const t=new Map;this.qt.forEach(((n,r)=>{const i=this.Xt(r);if(i){if(n.current&&Do(i.target)){const t=new si(i.target.path);null!==this.Ut.get(t)||this.ne(r,t)||this.zt(r,t,Co.newNoDocument(t,e))}n.Ct&&(t.set(r,n.Nt()),n.kt())}}));let n=Ks();this.Kt.forEach(((e,t)=>{let r=!0;t.forEachWhile((e=>{const t=this.Xt(e);return!t||2===t.purpose||(r=!1,!1)})),r&&(n=n.add(e))})),this.Ut.forEach(((t,n)=>n.setReadTime(e)));const r=new Qs(e,t,this.Gt,this.Ut,n);return this.Ut=Fs(),this.Kt=ra(),this.Gt=new To(Yr),r}jt(e,t){if(!this.Jt(e))return;const n=this.ne(e,t.key)?2:0;this.Ht(e).Ot(t.key,n),this.Ut=this.Ut.insert(t.key,t),this.Kt=this.Kt.insert(t.key,this.se(t.key).add(e))}zt(e,t,n){if(!this.Jt(e))return;const r=this.Ht(e);this.ne(e,t)?r.Ot(t,1):r.Mt(t),this.Kt=this.Kt.insert(t,this.se(t).delete(e)),n&&(this.Ut=this.Ut.insert(t,n))}removeTarget(e){this.qt.delete(e)}te(e){const t=this.Ht(e).Nt();return this.Lt.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}Ft(e){this.Ht(e).Ft()}Ht(e){let t=this.qt.get(e);return t||(t=new ta,this.qt.set(e,t)),t}se(e){let t=this.Kt.get(e);return t||(t=new To(Yr),this.Kt=this.Kt.insert(e,t)),t}Jt(e){const t=null!==this.Xt(e);return t||Rr("WatchChangeAggregator","Detected inactive target",e),t}Xt(e){const t=this.qt.get(e);return t&&t.Dt?null:this.Lt.ie(e)}Yt(e){this.qt.set(e,new ta),this.Lt.getRemoteKeysForTarget(e).forEach((t=>{this.zt(e,t,null)}))}ne(e,t){return this.Lt.getRemoteKeysForTarget(e).has(t)}}function ra(){return new bo(si.comparator)}function ia(){return new bo(si.comparator)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const oa=(()=>{const e={asc:"ASCENDING",desc:"DESCENDING"};return e})(),sa=(()=>{const e={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"};return e})(),aa=(()=>{const e={and:"AND",or:"OR"};return e})();class ca{constructor(e,t){this.databaseId=e,this.yt=t}}function ua(e,t){return e.yt?`${new Date(1e3*t.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+t.nanoseconds).slice(-9)}Z`:{seconds:""+t.seconds,nanos:t.nanoseconds}}function la(e,t){return e.yt?t.toBase64():t.toUint8Array()}function ha(e,t){return ua(e,t.toTimestamp())}function fa(e){return jr(!!e),ti.fromTimestamp(function(e){const t=xi(e);return new ei(t.seconds,t.nanos)}(e))}function da(e,t){return function(e){return new ri(["projects",e.projectId,"databases",e.database])}(e).child("documents").child(t).canonicalString()}function pa(e){const t=ri.fromString(e);return jr(ja(t)),t}function ga(e,t){return da(e.databaseId,t.path)}function ma(e,t){const n=pa(t);if(n.get(1)!==e.databaseId.projectId)throw new Vr(Ur.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+n.get(1)+" vs "+e.databaseId.projectId);if(n.get(3)!==e.databaseId.database)throw new Vr(Ur.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+n.get(3)+" vs "+e.databaseId.database);return new si(ba(n))}function ya(e,t){return da(e.databaseId,t)}function va(e){const t=pa(e);return 4===t.length?ri.emptyPath():ba(t)}function wa(e){return new ri(["projects",e.databaseId.projectId,"databases",e.databaseId.database]).canonicalString()}function ba(e){return jr(e.length>4&&"documents"===e.get(4)),e.popFirst(5)}function Ea(e,t,n){return{name:ga(e,t),fields:n.value.mapValue.fields}}function _a(e,t){let n;if("targetChange"in t){t.targetChange;const r=function(e){return"NO_CHANGE"===e?0:"ADD"===e?1:"REMOVE"===e?2:"CURRENT"===e?3:"RESET"===e?4:Mr()}(t.targetChange.targetChangeType||"NO_CHANGE"),i=t.targetChange.targetIds||[],o=function(e,t){return e.yt?(jr(void 0===t||"string"==typeof t),Ai.fromBase64String(t||"")):(jr(void 0===t||t instanceof Uint8Array),Ai.fromUint8Array(t||new Uint8Array))}(e,t.targetChange.resumeToken),s=t.targetChange.cause,a=s&&function(e){const t=void 0===e.code?Ur.UNKNOWN:Ls(e.code);return new Vr(t,e.message||"")}(s);n=new ea(r,i,o,a||null)}else if("documentChange"in t){t.documentChange;const r=t.documentChange;r.document,r.document.name,r.document.updateTime;const i=ma(e,r.document.name),o=fa(r.document.updateTime),s=r.document.createTime?fa(r.document.createTime):ti.min(),a=new ko({mapValue:{fields:r.document.fields}}),c=Co.newFoundDocument(i,o,s,a),u=r.targetIds||[],l=r.removedTargetIds||[];n=new Ys(u,l,c.key,c)}else if("documentDelete"in t){t.documentDelete;const r=t.documentDelete;r.document;const i=ma(e,r.document),o=r.readTime?fa(r.readTime):ti.min(),s=Co.newNoDocument(i,o),a=r.removedTargetIds||[];n=new Ys([],a,s.key,s)}else if("documentRemove"in t){t.documentRemove;const r=t.documentRemove;r.document;const i=ma(e,r.document),o=r.removedTargetIds||[];n=new Ys([],o,i,null)}else{if(!("filter"in t))return Mr();{t.filter;const e=t.filter;e.targetId;const r=e.count||0,i=new Ns(r),o=e.targetId;n=new Zs(o,i)}}return n}function Ta(e,t){let n;if(t instanceof Is)n={update:Ea(e,t.key,t.value)};else if(t instanceof xs)n={delete:ga(e,t.key)};else if(t instanceof Ss)n={update:Ea(e,t.key,t.data),updateMask:Ma(t.fieldMask)};else{if(!(t instanceof Os))return Mr();n={verify:ga(e,t.key)}}return t.fieldTransforms.length>0&&(n.updateTransforms=t.fieldTransforms.map((e=>function(e,t){const n=t.transform;if(n instanceof os)return{fieldPath:t.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(n instanceof ss)return{fieldPath:t.field.canonicalString(),appendMissingElements:{values:n.elements}};if(n instanceof cs)return{fieldPath:t.field.canonicalString(),removeAllFromArray:{values:n.elements}};if(n instanceof ls)return{fieldPath:t.field.canonicalString(),increment:n.It};throw Mr()}(0,e)))),t.precondition.isNone||(n.currentDocument=function(e,t){return void 0!==t.updateTime?{updateTime:ha(e,t.updateTime)}:void 0!==t.exists?{exists:t.exists}:Mr()}(e,t.precondition)),n}function Ia(e,t){return e&&e.length>0?(jr(void 0!==t),e.map((e=>function(e,t){let n=e.updateTime?fa(e.updateTime):fa(t);return n.isEqual(ti.min())&&(n=fa(t)),new gs(n,e.transformResults||[])}(e,t)))):[]}function Sa(e,t){return{documents:[ya(e,t.path)]}}function ka(e,t){const n={structuredQuery:{}},r=t.path;null!==t.collectionGroup?(n.parent=ya(e,r),n.structuredQuery.from=[{collectionId:t.collectionGroup,allDescendants:!0}]):(n.parent=ya(e,r.popLast()),n.structuredQuery.from=[{collectionId:r.lastSegment()}]);const i=function(e){if(0!==e.length)return La(no.create(e,"and"))}(t.filters);i&&(n.structuredQuery.where=i);const o=function(e){if(0!==e.length)return e.map((e=>function(e){return{field:Da(e.field),direction:Oa(e.dir)}}(e)))}(t.orderBy);o&&(n.structuredQuery.orderBy=o);const s=function(e,t){return e.yt||Ti(t)?t:{value:t}}(e,t.limit);var a;return null!==s&&(n.structuredQuery.limit=s),t.startAt&&(n.structuredQuery.startAt={before:(a=t.startAt).inclusive,values:a.position}),t.endAt&&(n.structuredQuery.endAt=function(e){return{before:!e.inclusive,values:e.position}}(t.endAt)),n}function Aa(e){let t=va(e.parent);const n=e.structuredQuery,r=n.from?n.from.length:0;let i=null;if(r>0){jr(1===r);const e=n.from[0];e.allDescendants?i=e.collectionId:t=t.child(e.collectionId)}let o=[];n.where&&(o=function(e){const t=xa(e);return t instanceof no&&io(t)?t.getFilters():[t]}(n.where));let s=[];n.orderBy&&(s=n.orderBy.map((e=>function(e){return new vo(Pa(e.field),function(e){switch(e){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(e.direction))}(e))));let a=null;n.limit&&(a=function(e){let t;return t="object"==typeof e?e.value:e,Ti(t)?null:t}(n.limit));let c=null;n.startAt&&(c=function(e){const t=!!e.before,n=e.values||[];return new Xi(n,t)}(n.startAt));let u=null;return n.endAt&&(u=function(e){const t=!e.before,n=e.values||[];return new Xi(n,t)}(n.endAt)),Lo(t,i,s,o,a,"F",c,u)}function Ca(e,t){const n=function(e,t){switch(t){case 0:return null;case 1:return"existence-filter-mismatch";case 2:return"limbo-document";default:return Mr()}}(0,t.purpose);return null==n?null:{"goog-listen-tags":n}}function xa(e){return void 0!==e.unaryFilter?function(e){switch(e.unaryFilter.op){case"IS_NAN":const t=Pa(e.unaryFilter.field);return to.create(t,"==",{doubleValue:NaN});case"IS_NULL":const n=Pa(e.unaryFilter.field);return to.create(n,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const r=Pa(e.unaryFilter.field);return to.create(r,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const i=Pa(e.unaryFilter.field);return to.create(i,"!=",{nullValue:"NULL_VALUE"});default:return Mr()}}(e):void 0!==e.fieldFilter?function(e){return to.create(Pa(e.fieldFilter.field),function(e){switch(e){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return Mr()}}(e.fieldFilter.op),e.fieldFilter.value)}(e):void 0!==e.compositeFilter?function(e){return no.create(e.compositeFilter.filters.map((e=>xa(e))),function(e){switch(e){case"AND":return"and";case"OR":return"or";default:return Mr()}}(e.compositeFilter.op))}(e):Mr()}function Oa(e){return oa[e]}function Na(e){return sa[e]}function Ra(e){return aa[e]}function Da(e){return{fieldPath:e.canonicalString()}}function Pa(e){return oi.fromServerFormat(e.fieldPath)}function La(e){return e instanceof to?function(e){if("=="===e.op){if(Ki(e.value))return{unaryFilter:{field:Da(e.field),op:"IS_NAN"}};if(Wi(e.value))return{unaryFilter:{field:Da(e.field),op:"IS_NULL"}}}else if("!="===e.op){if(Ki(e.value))return{unaryFilter:{field:Da(e.field),op:"IS_NOT_NAN"}};if(Wi(e.value))return{unaryFilter:{field:Da(e.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Da(e.field),op:Na(e.op),value:e.value}}}(e):e instanceof no?function(e){const t=e.getFilters().map((e=>La(e)));return 1===t.length?t[0]:{compositeFilter:{op:Ra(e.op),filters:t}}}(e):Mr()}function Ma(e){const t=[];return e.fields.forEach((e=>t.push(e.canonicalString()))),{fieldPaths:t}}function ja(e){return e.length>=4&&"projects"===e.get(0)&&"databases"===e.get(2)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fa=["mutationQueues","mutations","documentMutations","remoteDocuments","targets","owner","targetGlobal","targetDocuments","clientMetadata","remoteDocumentGlobal","collectionParents","bundles","namedQueries"],Ua=["mutationQueues","mutations","documentMutations","remoteDocumentsV14","targets","owner","targetGlobal","targetDocuments","clientMetadata","remoteDocumentGlobal","collectionParents","bundles","namedQueries","documentOverlays"],Va=Ua;
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class qa{constructor(e,t,n,r){this.batchId=e,this.localWriteTime=t,this.baseMutations=n,this.mutations=r}applyToRemoteDocument(e,t){const n=t.mutationResults;for(let r=0;r<this.mutations.length;r++){const t=this.mutations[r];t.key.isEqual(e.key)&&bs(t,e,n[r])}}applyToLocalView(e,t){for(const n of this.baseMutations)n.key.isEqual(e.key)&&(t=Es(n,e,t,this.localWriteTime));for(const n of this.mutations)n.key.isEqual(e.key)&&(t=Es(n,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const n=Bs();return this.mutations.forEach((r=>{const i=e.get(r.key),o=i.overlayedDocument;let s=this.applyToLocalView(o,i.mutatedFields);s=t.has(r.key)?null:s;const a=ws(o,s);null!==a&&n.set(r.key,a),o.isValidDocument()||o.convertToNoDocument(ti.min())})),n}keys(){return this.mutations.reduce(((e,t)=>e.add(t.key)),Ks())}isEqual(e){return this.batchId===e.batchId&&Zr(this.mutations,e.mutations,((e,t)=>Ts(e,t)))&&Zr(this.baseMutations,e.baseMutations,((e,t)=>Ts(e,t)))}}class $a{constructor(e,t,n,r){this.batch=e,this.commitVersion=t,this.mutationResults=n,this.docVersions=r}static from(e,t,n){jr(e.mutations.length===n.length);let r=zs;const i=e.mutations;for(let o=0;o<i.length;o++)r=r.insert(i[o].key,n[o].version);return new $a(e,t,n,r)}}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ba{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return null!==e&&this.mutation===e.mutation}toString(){return`Overlay{\n      largestBatchId: ${this.largestBatchId},\n      mutation: ${this.mutation.toString()}\n    }`}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ha{constructor(e,t,n,r,i=ti.min(),o=ti.min(),s=Ai.EMPTY_BYTE_STRING){this.target=e,this.targetId=t,this.purpose=n,this.sequenceNumber=r,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=s}withSequenceNumber(e){return new Ha(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken)}withResumeToken(e,t){return new Ha(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e)}withLastLimboFreeSnapshotVersion(e){return new Ha(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class za{constructor(e){this.oe=e}}function Wa(e){const t=Aa({parent:e.parent,structuredQuery:e.structuredQuery});return"LAST"===e.limitType?Ho(t,t.limit,"L"):t}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ka{constructor(){}ae(e,t){this.he(e,t),t.le()}he(e,t){if("nullValue"in e)this.fe(t,5);else if("booleanValue"in e)this.fe(t,10),t.de(e.booleanValue?1:0);else if("integerValue"in e)this.fe(t,15),t.de(Oi(e.integerValue));else if("doubleValue"in e){const n=Oi(e.doubleValue);isNaN(n)?this.fe(t,13):(this.fe(t,15),Ii(n)?t.de(0):t.de(n))}else if("timestampValue"in e){const n=e.timestampValue;this.fe(t,20),"string"==typeof n?t._e(n):(t._e(`${n.seconds||""}`),t.de(n.nanos||0))}else if("stringValue"in e)this.we(e.stringValue,t),this.me(t);else if("bytesValue"in e)this.fe(t,30),t.ge(Ni(e.bytesValue)),this.me(t);else if("referenceValue"in e)this.ye(e.referenceValue,t);else if("geoPointValue"in e){const n=e.geoPointValue;this.fe(t,45),t.de(n.latitude||0),t.de(n.longitude||0)}else"mapValue"in e?Qi(e)?this.fe(t,Number.MAX_SAFE_INTEGER):(this.pe(e.mapValue,t),this.me(t)):"arrayValue"in e?(this.Ie(e.arrayValue,t),this.me(t)):Mr()}we(e,t){this.fe(t,25),this.Te(e,t)}Te(e,t){t._e(e)}pe(e,t){const n=e.fields||{};this.fe(t,55);for(const r of Object.keys(n))this.we(r,t),this.he(n[r],t)}Ie(e,t){const n=e.values||[];this.fe(t,50);for(const r of n)this.he(r,t)}ye(e,t){this.fe(t,37),si.fromName(e).path.forEach((e=>{this.fe(t,60),this.Te(e,t)}))}fe(e,t){e.de(t)}me(e){e.de(2)}}Ka.Ee=new Ka;
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Ga{constructor(){this.Ze=new Ja}addToCollectionParentIndex(e,t){return this.Ze.add(t),gi.resolve()}getCollectionParents(e,t){return gi.resolve(this.Ze.getEntries(t))}addFieldIndex(e,t){return gi.resolve()}deleteFieldIndex(e,t){return gi.resolve()}getDocumentsMatchingTarget(e,t){return gi.resolve(null)}getIndexType(e,t){return gi.resolve(0)}getFieldIndexes(e,t){return gi.resolve([])}getNextCollectionGroupToUpdate(e){return gi.resolve(null)}getMinOffset(e,t){return gi.resolve(li.min())}getMinOffsetFromCollectionGroup(e,t){return gi.resolve(li.min())}updateCollectionGroup(e,t,n){return gi.resolve()}updateIndexEntries(e,t){return gi.resolve()}}class Ja{constructor(){this.index={}}add(e){const t=e.lastSegment(),n=e.popLast(),r=this.index[t]||new To(ri.comparator),i=!r.has(n);return this.index[t]=r.add(n),i}has(e){const t=e.lastSegment(),n=e.popLast(),r=this.index[t];return r&&r.has(n)}getEntries(e){return(this.index[e]||new To(ri.comparator)).toArray()}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */new Uint8Array(0);class Qa{constructor(e,t,n){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=n}static withCacheSize(e){return new Qa(e,Qa.DEFAULT_COLLECTION_PERCENTILE,Qa.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Qa.DEFAULT_COLLECTION_PERCENTILE=10,Qa.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,Qa.DEFAULT=new Qa(41943040,Qa.DEFAULT_COLLECTION_PERCENTILE,Qa.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),Qa.DISABLED=new Qa(-1,0,0);
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Xa{constructor(e){this.Pn=e}next(){return this.Pn+=2,this.Pn}static Vn(){return new Xa(0)}static Sn(){return new Xa(-1)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Ya{constructor(){this.changes=new Ms((e=>e.toString()),((e,t)=>e.isEqual(t))),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,Co.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const n=this.changes.get(t);return void 0!==n?gi.resolve(n):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Za{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ec{constructor(e,t,n,r){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=n,this.indexManager=r}getDocument(e,t){let n=null;return this.documentOverlayCache.getOverlay(e,t).next((r=>(n=r,this.remoteDocumentCache.getEntry(e,t)))).next((e=>(null!==n&&Es(n.mutation,e,So.empty(),ei.now()),e)))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next((t=>this.getLocalViewOfDocuments(e,t,Ks()).next((()=>t))))}getLocalViewOfDocuments(e,t,n=Ks()){const r=$s();return this.populateOverlays(e,r,t).next((()=>this.computeViews(e,t,r,n).next((e=>{let t=Vs();return e.forEach(((e,n)=>{t=t.insert(e,n.overlayedDocument)})),t}))))}getOverlayedDocuments(e,t){const n=$s();return this.populateOverlays(e,n,t).next((()=>this.computeViews(e,t,n,Ks())))}populateOverlays(e,t,n){const r=[];return n.forEach((e=>{t.has(e)||r.push(e)})),this.documentOverlayCache.getOverlays(e,r).next((e=>{e.forEach(((e,n)=>{t.set(e,n)}))}))}computeViews(e,t,n,r){let i=Fs();const o=Hs(),s=Hs();return t.forEach(((e,t)=>{const s=n.get(t.key);r.has(t.key)&&(void 0===s||s.mutation instanceof Ss)?i=i.insert(t.key,t):void 0!==s?(o.set(t.key,s.mutation.getFieldMask()),Es(s.mutation,t,s.mutation.getFieldMask(),ei.now())):o.set(t.key,So.empty())})),this.recalculateAndSaveOverlays(e,i).next((e=>(e.forEach(((e,t)=>o.set(e,t))),t.forEach(((e,t)=>{var n;return s.set(e,new Za(t,null!==(n=o.get(e))&&void 0!==n?n:null))})),s)))}recalculateAndSaveOverlays(e,t){const n=Hs();let r=new bo(((e,t)=>e-t)),i=Ks();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next((e=>{for(const i of e)i.keys().forEach((e=>{const o=t.get(e);if(null===o)return;let s=n.get(e)||So.empty();s=i.applyToLocalView(o,s),n.set(e,s);const a=(r.get(i.batchId)||Ks()).add(e);r=r.insert(i.batchId,a)}))})).next((()=>{const o=[],s=r.getReverseIterator();for(;s.hasNext();){const r=s.getNext(),a=r.key,c=r.value,u=Bs();c.forEach((e=>{if(!i.has(e)){const r=ws(t.get(e),n.get(e));null!==r&&u.set(e,r),i=i.add(e)}})),o.push(this.documentOverlayCache.saveOverlays(e,a,u))}return gi.waitFor(o)})).next((()=>n))}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next((t=>this.recalculateAndSaveOverlays(e,t)))}getDocumentsMatchingQuery(e,t,n){return function(e){return si.isDocumentKey(e.path)&&null===e.collectionGroup&&0===e.filters.length}(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):Vo(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,n):this.getDocumentsMatchingCollectionQuery(e,t,n)}getNextDocuments(e,t,n,r){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,n,r).next((i=>{const o=r-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,n.largestBatchId,r-i.size):gi.resolve($s());let s=-1,a=i;return o.next((t=>gi.forEach(t,((t,n)=>(s<n.largestBatchId&&(s=n.largestBatchId),i.get(t)?gi.resolve():this.remoteDocumentCache.getEntry(e,t).next((e=>{a=a.insert(t,e)}))))).next((()=>this.populateOverlays(e,t,i))).next((()=>this.computeViews(e,a,t,Ks()))).next((e=>({batchId:s,changes:qs(e)})))))}))}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new si(t)).next((e=>{let t=Vs();return e.isFoundDocument()&&(t=t.insert(e.key,e)),t}))}getDocumentsMatchingCollectionGroupQuery(e,t,n){const r=t.collectionGroup;let i=Vs();return this.indexManager.getCollectionParents(e,r).next((o=>gi.forEach(o,(o=>{const s=function(e,t){return new Po(t,null,e.explicitOrderBy.slice(),e.filters.slice(),e.limit,e.limitType,e.startAt,e.endAt)}(t,o.child(r));return this.getDocumentsMatchingCollectionQuery(e,s,n).next((e=>{e.forEach(((e,t)=>{i=i.insert(e,t)}))}))})).next((()=>i))))}getDocumentsMatchingCollectionQuery(e,t,n){let r;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,n.largestBatchId).next((i=>(r=i,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,n,r)))).next((e=>{r.forEach(((t,n)=>{const r=n.getKey();null===e.get(r)&&(e=e.insert(r,Co.newInvalidDocument(r)))}));let n=Vs();return e.forEach(((e,i)=>{const o=r.get(e);void 0!==o&&Es(o.mutation,i,So.empty(),ei.now()),Go(t,i)&&(n=n.insert(e,i))})),n}))}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tc{constructor(e){this.Tt=e,this.es=new Map,this.ns=new Map}getBundleMetadata(e,t){return gi.resolve(this.es.get(t))}saveBundleMetadata(e,t){var n;return this.es.set(t.id,{id:(n=t).id,version:n.version,createTime:fa(n.createTime)}),gi.resolve()}getNamedQuery(e,t){return gi.resolve(this.ns.get(t))}saveNamedQuery(e,t){return this.ns.set(t.name,function(e){return{name:e.name,query:Wa(e.bundledQuery),readTime:fa(e.readTime)}}(t)),gi.resolve()}}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nc{constructor(){this.overlays=new bo(si.comparator),this.ss=new Map}getOverlay(e,t){return gi.resolve(this.overlays.get(t))}getOverlays(e,t){const n=$s();return gi.forEach(t,(t=>this.getOverlay(e,t).next((e=>{null!==e&&n.set(t,e)})))).next((()=>n))}saveOverlays(e,t,n){return n.forEach(((n,r)=>{this.ce(e,t,r)})),gi.resolve()}removeOverlaysForBatchId(e,t,n){const r=this.ss.get(n);return void 0!==r&&(r.forEach((e=>this.overlays=this.overlays.remove(e))),this.ss.delete(n)),gi.resolve()}getOverlaysForCollection(e,t,n){const r=$s(),i=t.length+1,o=new si(t.child("")),s=this.overlays.getIteratorFrom(o);for(;s.hasNext();){const e=s.getNext().value,o=e.getKey();if(!t.isPrefixOf(o.path))break;o.path.length===i&&e.largestBatchId>n&&r.set(e.getKey(),e)}return gi.resolve(r)}getOverlaysForCollectionGroup(e,t,n,r){let i=new bo(((e,t)=>e-t));const o=this.overlays.getIterator();for(;o.hasNext();){const e=o.getNext().value;if(e.getKey().getCollectionGroup()===t&&e.largestBatchId>n){let t=i.get(e.largestBatchId);null===t&&(t=$s(),i=i.insert(e.largestBatchId,t)),t.set(e.getKey(),e)}}const s=$s(),a=i.getIterator();for(;a.hasNext();)if(a.getNext().value.forEach(((e,t)=>s.set(e,t))),s.size()>=r)break;return gi.resolve(s)}ce(e,t,n){const r=this.overlays.get(n.key);if(null!==r){const e=this.ss.get(r.largestBatchId).delete(n.key);this.ss.set(r.largestBatchId,e)}this.overlays=this.overlays.insert(n.key,new Ba(t,n));let i=this.ss.get(t);void 0===i&&(i=Ks(),this.ss.set(t,i)),this.ss.set(t,i.add(n.key))}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rc{constructor(){this.rs=new To(ic.os),this.us=new To(ic.cs)}isEmpty(){return this.rs.isEmpty()}addReference(e,t){const n=new ic(e,t);this.rs=this.rs.add(n),this.us=this.us.add(n)}hs(e,t){e.forEach((e=>this.addReference(e,t)))}removeReference(e,t){this.ls(new ic(e,t))}fs(e,t){e.forEach((e=>this.removeReference(e,t)))}ds(e){const t=new si(new ri([])),n=new ic(t,e),r=new ic(t,e+1),i=[];return this.us.forEachInRange([n,r],(e=>{this.ls(e),i.push(e.key)})),i}_s(){this.rs.forEach((e=>this.ls(e)))}ls(e){this.rs=this.rs.delete(e),this.us=this.us.delete(e)}ws(e){const t=new si(new ri([])),n=new ic(t,e),r=new ic(t,e+1);let i=Ks();return this.us.forEachInRange([n,r],(e=>{i=i.add(e.key)})),i}containsKey(e){const t=new ic(e,0),n=this.rs.firstAfterOrEqual(t);return null!==n&&e.isEqual(n.key)}}class ic{constructor(e,t){this.key=e,this.gs=t}static os(e,t){return si.comparator(e.key,t.key)||Yr(e.gs,t.gs)}static cs(e,t){return Yr(e.gs,t.gs)||si.comparator(e.key,t.key)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oc{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.ys=1,this.ps=new To(ic.os)}checkEmpty(e){return gi.resolve(0===this.mutationQueue.length)}addMutationBatch(e,t,n,r){const i=this.ys;this.ys++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new qa(i,t,n,r);this.mutationQueue.push(o);for(const s of r)this.ps=this.ps.add(new ic(s.key,i)),this.indexManager.addToCollectionParentIndex(e,s.key.path.popLast());return gi.resolve(o)}lookupMutationBatch(e,t){return gi.resolve(this.Is(t))}getNextMutationBatchAfterBatchId(e,t){const n=t+1,r=this.Ts(n),i=r<0?0:r;return gi.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return gi.resolve(0===this.mutationQueue.length?-1:this.ys-1)}getAllMutationBatches(e){return gi.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const n=new ic(t,0),r=new ic(t,Number.POSITIVE_INFINITY),i=[];return this.ps.forEachInRange([n,r],(e=>{const t=this.Is(e.gs);i.push(t)})),gi.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let n=new To(Yr);return t.forEach((e=>{const t=new ic(e,0),r=new ic(e,Number.POSITIVE_INFINITY);this.ps.forEachInRange([t,r],(e=>{n=n.add(e.gs)}))})),gi.resolve(this.Es(n))}getAllMutationBatchesAffectingQuery(e,t){const n=t.path,r=n.length+1;let i=n;si.isDocumentKey(i)||(i=i.child(""));const o=new ic(new si(i),0);let s=new To(Yr);return this.ps.forEachWhile((e=>{const t=e.key.path;return!!n.isPrefixOf(t)&&(t.length===r&&(s=s.add(e.gs)),!0)}),o),gi.resolve(this.Es(s))}Es(e){const t=[];return e.forEach((e=>{const n=this.Is(e);null!==n&&t.push(n)})),t}removeMutationBatch(e,t){jr(0===this.As(t.batchId,"removed")),this.mutationQueue.shift();let n=this.ps;return gi.forEach(t.mutations,(r=>{const i=new ic(r.key,t.batchId);return n=n.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,r.key)})).next((()=>{this.ps=n}))}bn(e){}containsKey(e,t){const n=new ic(t,0),r=this.ps.firstAfterOrEqual(n);return gi.resolve(t.isEqual(r&&r.key))}performConsistencyCheck(e){return this.mutationQueue.length,gi.resolve()}As(e,t){return this.Ts(e)}Ts(e){return 0===this.mutationQueue.length?0:e-this.mutationQueue[0].batchId}Is(e){const t=this.Ts(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sc{constructor(e){this.Rs=e,this.docs=new bo(si.comparator),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const n=t.key,r=this.docs.get(n),i=r?r.size:0,o=this.Rs(t);return this.docs=this.docs.insert(n,{document:t.mutableCopy(),size:o}),this.size+=o-i,this.indexManager.addToCollectionParentIndex(e,n.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const n=this.docs.get(t);return gi.resolve(n?n.document.mutableCopy():Co.newInvalidDocument(t))}getEntries(e,t){let n=Fs();return t.forEach((e=>{const t=this.docs.get(e);n=n.insert(e,t?t.document.mutableCopy():Co.newInvalidDocument(e))})),gi.resolve(n)}getDocumentsMatchingQuery(e,t,n,r){let i=Fs();const o=t.path,s=new si(o.child("")),a=this.docs.getIteratorFrom(s);for(;a.hasNext();){const{key:e,value:{document:s}}=a.getNext();if(!o.isPrefixOf(e.path))break;e.path.length>o.length+1||hi(ui(s),n)<=0||(r.has(s.key)||Go(t,s))&&(i=i.insert(s.key,s.mutableCopy()))}return gi.resolve(i)}getAllFromCollectionGroup(e,t,n,r){Mr()}bs(e,t){return gi.forEach(this.docs,(e=>t(e)))}newChangeBuffer(e){return new ac(this)}getSize(e){return gi.resolve(this.size)}}class ac extends Ya{constructor(e){super(),this.Xn=e}applyChanges(e){const t=[];return this.changes.forEach(((n,r)=>{r.isValidDocument()?t.push(this.Xn.addEntry(e,r)):this.Xn.removeEntry(n)})),gi.waitFor(t)}getFromCache(e,t){return this.Xn.getEntry(e,t)}getAllFromCache(e,t){return this.Xn.getEntries(e,t)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cc{constructor(e){this.persistence=e,this.vs=new Ms((e=>No(e)),Ro),this.lastRemoteSnapshotVersion=ti.min(),this.highestTargetId=0,this.Ps=0,this.Vs=new rc,this.targetCount=0,this.Ss=Xa.Vn()}forEachTarget(e,t){return this.vs.forEach(((e,n)=>t(n))),gi.resolve()}getLastRemoteSnapshotVersion(e){return gi.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return gi.resolve(this.Ps)}allocateTargetId(e){return this.highestTargetId=this.Ss.next(),gi.resolve(this.highestTargetId)}setTargetsMetadata(e,t,n){return n&&(this.lastRemoteSnapshotVersion=n),t>this.Ps&&(this.Ps=t),gi.resolve()}xn(e){this.vs.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.Ss=new Xa(t),this.highestTargetId=t),e.sequenceNumber>this.Ps&&(this.Ps=e.sequenceNumber)}addTargetData(e,t){return this.xn(t),this.targetCount+=1,gi.resolve()}updateTargetData(e,t){return this.xn(t),gi.resolve()}removeTargetData(e,t){return this.vs.delete(t.target),this.Vs.ds(t.targetId),this.targetCount-=1,gi.resolve()}removeTargets(e,t,n){let r=0;const i=[];return this.vs.forEach(((o,s)=>{s.sequenceNumber<=t&&null===n.get(s.targetId)&&(this.vs.delete(o),i.push(this.removeMatchingKeysForTargetId(e,s.targetId)),r++)})),gi.waitFor(i).next((()=>r))}getTargetCount(e){return gi.resolve(this.targetCount)}getTargetData(e,t){const n=this.vs.get(t)||null;return gi.resolve(n)}addMatchingKeys(e,t,n){return this.Vs.hs(t,n),gi.resolve()}removeMatchingKeys(e,t,n){this.Vs.fs(t,n);const r=this.persistence.referenceDelegate,i=[];return r&&t.forEach((t=>{i.push(r.markPotentiallyOrphaned(e,t))})),gi.waitFor(i)}removeMatchingKeysForTargetId(e,t){return this.Vs.ds(t),gi.resolve()}getMatchingKeysForTargetId(e,t){const n=this.Vs.ws(t);return gi.resolve(n)}containsKey(e,t){return gi.resolve(this.Vs.containsKey(t))}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uc{constructor(e,t){this.Ds={},this.overlays={},this.Cs=new yi(0),this.xs=!1,this.xs=!0,this.referenceDelegate=e(this),this.Ns=new cc(this),this.indexManager=new Ga,this.remoteDocumentCache=function(e){return new sc(e)}((e=>this.referenceDelegate.ks(e))),this.Tt=new za(t),this.Os=new tc(this.Tt)}start(){return Promise.resolve()}shutdown(){return this.xs=!1,Promise.resolve()}get started(){return this.xs}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new nc,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let n=this.Ds[e.toKey()];return n||(n=new oc(t,this.referenceDelegate),this.Ds[e.toKey()]=n),n}getTargetCache(){return this.Ns}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Os}runTransaction(e,t,n){Rr("MemoryPersistence","Starting transaction:",e);const r=new lc(this.Cs.next());return this.referenceDelegate.Ms(),n(r).next((e=>this.referenceDelegate.Fs(r).next((()=>e)))).toPromise().then((e=>(r.raiseOnCommittedEvent(),e)))}$s(e,t){return gi.or(Object.values(this.Ds).map((n=>()=>n.containsKey(e,t))))}}class lc extends di{constructor(e){super(),this.currentSequenceNumber=e}}class hc{constructor(e){this.persistence=e,this.Bs=new rc,this.Ls=null}static qs(e){return new hc(e)}get Us(){if(this.Ls)return this.Ls;throw Mr()}addReference(e,t,n){return this.Bs.addReference(n,t),this.Us.delete(n.toString()),gi.resolve()}removeReference(e,t,n){return this.Bs.removeReference(n,t),this.Us.add(n.toString()),gi.resolve()}markPotentiallyOrphaned(e,t){return this.Us.add(t.toString()),gi.resolve()}removeTarget(e,t){this.Bs.ds(t.targetId).forEach((e=>this.Us.add(e.toString())));const n=this.persistence.getTargetCache();return n.getMatchingKeysForTargetId(e,t.targetId).next((e=>{e.forEach((e=>this.Us.add(e.toString())))})).next((()=>n.removeTargetData(e,t)))}Ms(){this.Ls=new Set}Fs(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return gi.forEach(this.Us,(n=>{const r=si.fromPath(n);return this.Ks(e,r).next((e=>{e||t.removeEntry(r,ti.min())}))})).next((()=>(this.Ls=null,t.apply(e))))}updateLimboDocument(e,t){return this.Ks(e,t).next((e=>{e?this.Us.delete(t.toString()):this.Us.add(t.toString())}))}ks(e){return 0}Ks(e,t){return gi.or([()=>gi.resolve(this.Bs.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.$s(e,t)])}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class fc{constructor(e,t,n,r){this.targetId=e,this.fromCache=t,this.Ci=n,this.xi=r}static Ni(e,t){let n=Ks(),r=Ks();for(const i of t.docChanges)switch(i.type){case 0:n=n.add(i.doc.key);break;case 1:r=r.add(i.doc.key)}return new fc(e,t.fromCache,n,r)}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dc{constructor(){this.ki=!1}initialize(e,t){this.Oi=e,this.indexManager=t,this.ki=!0}getDocumentsMatchingQuery(e,t,n,r){return this.Mi(e,t).next((i=>i||this.Fi(e,t,r,n))).next((n=>n||this.$i(e,t)))}Mi(e,t){if(jo(t))return gi.resolve(null);let n=$o(t);return this.indexManager.getIndexType(e,n).next((r=>0===r?null:(null!==t.limit&&1===r&&(t=Ho(t,null,"F"),n=$o(t)),this.indexManager.getDocumentsMatchingTarget(e,n).next((r=>{const i=Ks(...r);return this.Oi.getDocuments(e,i).next((r=>this.indexManager.getMinOffset(e,n).next((n=>{const o=this.Bi(t,r);return this.Li(t,o,i,n.readTime)?this.Mi(e,Ho(t,null,"F")):this.qi(e,o,t,n)}))))})))))}Fi(e,t,n,r){return jo(t)||r.isEqual(ti.min())?this.$i(e,t):this.Oi.getDocuments(e,n).next((i=>{const o=this.Bi(t,i);return this.Li(t,o,n,r)?this.$i(e,t):(Nr()<=s["in"].DEBUG&&Rr("QueryEngine","Re-using previous result from %s to execute query: %s",r.toString(),Ko(t)),this.qi(e,o,t,ci(r,-1)))}))}Bi(e,t){let n=new To(Qo(e));return t.forEach(((t,r)=>{Go(e,r)&&(n=n.add(r))})),n}Li(e,t,n,r){if(null===e.limit)return!1;if(n.size!==t.size)return!0;const i="F"===e.limitType?t.last():t.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(r)>0)}$i(e,t){return Nr()<=s["in"].DEBUG&&Rr("QueryEngine","Using full collection scan to execute query:",Ko(t)),this.Oi.getDocumentsMatchingQuery(e,t,li.min())}qi(e,t,n,r){return this.Oi.getDocumentsMatchingQuery(e,n,r).next((e=>(t.forEach((t=>{e=e.insert(t.key,t)})),e)))}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pc{constructor(e,t,n,r){this.persistence=e,this.Ui=t,this.Tt=r,this.Ki=new bo(Yr),this.Gi=new Ms((e=>No(e)),Ro),this.Qi=new Map,this.ji=e.getRemoteDocumentCache(),this.Ns=e.getTargetCache(),this.Os=e.getBundleCache(),this.zi(n)}zi(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new ec(this.ji,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.ji.setIndexManager(this.indexManager),this.Ui.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",(t=>e.collect(t,this.Ki)))}}function gc(e,t,n,r){return new pc(e,t,n,r)}async function mc(e,t){const n=Fr(e);return await n.persistence.runTransaction("Handle user change","readonly",(e=>{let r;return n.mutationQueue.getAllMutationBatches(e).next((i=>(r=i,n.zi(t),n.mutationQueue.getAllMutationBatches(e)))).next((t=>{const i=[],o=[];let s=Ks();for(const e of r){i.push(e.batchId);for(const t of e.mutations)s=s.add(t.key)}for(const e of t){o.push(e.batchId);for(const t of e.mutations)s=s.add(t.key)}return n.localDocuments.getDocuments(e,s).next((e=>({Wi:e,removedBatchIds:i,addedBatchIds:o})))}))}))}function yc(e,t){const n=Fr(e);return n.persistence.runTransaction("Acknowledge batch","readwrite-primary",(e=>{const r=t.batch.keys(),i=n.ji.newChangeBuffer({trackRemovals:!0});return function(e,t,n,r){const i=n.batch,o=i.keys();let s=gi.resolve();return o.forEach((e=>{s=s.next((()=>r.getEntry(t,e))).next((t=>{const o=n.docVersions.get(e);jr(null!==o),t.version.compareTo(o)<0&&(i.applyToRemoteDocument(t,n),t.isValidDocument()&&(t.setReadTime(n.commitVersion),r.addEntry(t)))}))})),s.next((()=>e.mutationQueue.removeMutationBatch(t,i)))}(n,e,t,i).next((()=>i.apply(e))).next((()=>n.mutationQueue.performConsistencyCheck(e))).next((()=>n.documentOverlayCache.removeOverlaysForBatchId(e,r,t.batch.batchId))).next((()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(e,function(e){let t=Ks();for(let n=0;n<e.mutationResults.length;++n)e.mutationResults[n].transformResults.length>0&&(t=t.add(e.batch.mutations[n].key));return t}(t)))).next((()=>n.localDocuments.getDocuments(e,r)))}))}function vc(e){const t=Fr(e);return t.persistence.runTransaction("Get last remote snapshot version","readonly",(e=>t.Ns.getLastRemoteSnapshotVersion(e)))}function wc(e,t){const n=Fr(e),r=t.snapshotVersion;let i=n.Ki;return n.persistence.runTransaction("Apply remote event","readwrite-primary",(e=>{const o=n.ji.newChangeBuffer({trackRemovals:!0});i=n.Ki;const s=[];t.targetChanges.forEach(((o,a)=>{const c=i.get(a);if(!c)return;s.push(n.Ns.removeMatchingKeys(e,o.removedDocuments,a).next((()=>n.Ns.addMatchingKeys(e,o.addedDocuments,a))));let u=c.withSequenceNumber(e.currentSequenceNumber);t.targetMismatches.has(a)?u=u.withResumeToken(Ai.EMPTY_BYTE_STRING,ti.min()).withLastLimboFreeSnapshotVersion(ti.min()):o.resumeToken.approximateByteSize()>0&&(u=u.withResumeToken(o.resumeToken,r)),i=i.insert(a,u),function(e,t,n){return 0===e.resumeToken.approximateByteSize()||(t.snapshotVersion.toMicroseconds()-e.snapshotVersion.toMicroseconds()>=3e8||n.addedDocuments.size+n.modifiedDocuments.size+n.removedDocuments.size>0)}(c,u,o)&&s.push(n.Ns.updateTargetData(e,u))}));let a=Fs(),c=Ks();if(t.documentUpdates.forEach((r=>{t.resolvedLimboDocuments.has(r)&&s.push(n.persistence.referenceDelegate.updateLimboDocument(e,r))})),s.push(bc(e,o,t.documentUpdates).next((e=>{a=e.Hi,c=e.Ji}))),!r.isEqual(ti.min())){const t=n.Ns.getLastRemoteSnapshotVersion(e).next((t=>n.Ns.setTargetsMetadata(e,e.currentSequenceNumber,r)));s.push(t)}return gi.waitFor(s).next((()=>o.apply(e))).next((()=>n.localDocuments.getLocalViewOfDocuments(e,a,c))).next((()=>a))})).then((e=>(n.Ki=i,e)))}function bc(e,t,n){let r=Ks(),i=Ks();return n.forEach((e=>r=r.add(e))),t.getEntries(e,r).next((e=>{let r=Fs();return n.forEach(((n,o)=>{const s=e.get(n);o.isFoundDocument()!==s.isFoundDocument()&&(i=i.add(n)),o.isNoDocument()&&o.version.isEqual(ti.min())?(t.removeEntry(n,o.readTime),r=r.insert(n,o)):!s.isValidDocument()||o.version.compareTo(s.version)>0||0===o.version.compareTo(s.version)&&s.hasPendingWrites?(t.addEntry(o),r=r.insert(n,o)):Rr("LocalStore","Ignoring outdated watch update for ",n,". Current version:",s.version," Watch version:",o.version)})),{Hi:r,Ji:i}}))}function Ec(e,t){const n=Fr(e);return n.persistence.runTransaction("Get next mutation batch","readonly",(e=>(void 0===t&&(t=-1),n.mutationQueue.getNextMutationBatchAfterBatchId(e,t))))}function _c(e,t){const n=Fr(e);return n.persistence.runTransaction("Allocate target","readwrite",(e=>{let r;return n.Ns.getTargetData(e,t).next((i=>i?(r=i,gi.resolve(r)):n.Ns.allocateTargetId(e).next((i=>(r=new Ha(t,i,0,e.currentSequenceNumber),n.Ns.addTargetData(e,r).next((()=>r)))))))})).then((e=>{const r=n.Ki.get(e.targetId);return(null===r||e.snapshotVersion.compareTo(r.snapshotVersion)>0)&&(n.Ki=n.Ki.insert(e.targetId,e),n.Gi.set(t,e.targetId)),e}))}async function Tc(e,t,n){const r=Fr(e),i=r.Ki.get(t),o=n?"readwrite":"readwrite-primary";try{n||await r.persistence.runTransaction("Release target",o,(e=>r.persistence.referenceDelegate.removeTarget(e,i)))}catch(e){if(!mi(e))throw e;Rr("LocalStore",`Failed to update sequence numbers for target ${t}: ${e}`)}r.Ki=r.Ki.remove(t),r.Gi.delete(i.target)}function Ic(e,t,n){const r=Fr(e);let i=ti.min(),o=Ks();return r.persistence.runTransaction("Execute query","readonly",(e=>function(e,t,n){const r=Fr(e),i=r.Gi.get(n);return void 0!==i?gi.resolve(r.Ki.get(i)):r.Ns.getTargetData(t,n)}(r,e,$o(t)).next((t=>{if(t)return i=t.lastLimboFreeSnapshotVersion,r.Ns.getMatchingKeysForTargetId(e,t.targetId).next((e=>{o=e}))})).next((()=>r.Ui.getDocumentsMatchingQuery(e,t,n?i:ti.min(),n?o:Ks()))).next((e=>(Sc(r,Jo(t),e),{documents:e,Yi:o})))))}function Sc(e,t,n){let r=e.Qi.get(t)||ti.min();n.forEach(((e,t)=>{t.readTime.compareTo(r)>0&&(r=t.readTime)})),e.Qi.set(t,r)}class kc{constructor(){this.activeTargetIds=Js()}sr(e){this.activeTargetIds=this.activeTargetIds.add(e)}ir(e){this.activeTargetIds=this.activeTargetIds.delete(e)}nr(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class Ac{constructor(){this.Ur=new kc,this.Kr={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,n){}addLocalQueryTarget(e){return this.Ur.sr(e),this.Kr[e]||"not-current"}updateQueryState(e,t,n){this.Kr[e]=t}removeLocalQueryTarget(e){this.Ur.ir(e)}isLocalQueryTarget(e){return this.Ur.activeTargetIds.has(e)}clearQueryState(e){delete this.Kr[e]}getAllActiveQueryTargets(){return this.Ur.activeTargetIds}isActiveQueryTarget(e){return this.Ur.activeTargetIds.has(e)}start(){return this.Ur=new kc,Promise.resolve()}handleUserChange(e,t,n){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cc{Gr(e){}shutdown(){}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xc{constructor(){this.Qr=()=>this.jr(),this.zr=()=>this.Wr(),this.Hr=[],this.Jr()}Gr(e){this.Hr.push(e)}shutdown(){window.removeEventListener("online",this.Qr),window.removeEventListener("offline",this.zr)}Jr(){window.addEventListener("online",this.Qr),window.addEventListener("offline",this.zr)}jr(){Rr("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(const e of this.Hr)e(0)}Wr(){Rr("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(const e of this.Hr)e(1)}static C(){return"undefined"!=typeof window&&void 0!==window.addEventListener&&void 0!==window.removeEventListener}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Oc={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nc{constructor(e){this.Yr=e.Yr,this.Zr=e.Zr}Xr(e){this.eo=e}no(e){this.so=e}onMessage(e){this.io=e}close(){this.Zr()}send(e){this.Yr(e)}ro(){this.eo()}oo(e){this.so(e)}uo(e){this.io(e)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rc extends class{constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http";this.co=t+"://"+e.host,this.ao="projects/"+this.databaseId.projectId+"/databases/"+this.databaseId.database+"/documents"}get ho(){return!1}lo(e,t,n,r,i){const o=this.fo(e,t);Rr("RestConnection","Sending: ",o,n);const s={};return this._o(s,r,i),this.wo(e,o,s,n).then((e=>(Rr("RestConnection","Received: ",e),e)),(t=>{throw Pr("RestConnection",`${e} failed with error: `,t,"url: ",o,"request:",n),t}))}mo(e,t,n,r,i,o){return this.lo(e,t,n,r,i)}_o(e,t,n){e["X-Goog-Api-Client"]="gl-js/ fire/"+xr,e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach(((t,n)=>e[n]=t)),n&&n.headers.forEach(((t,n)=>e[n]=t))}fo(e,t){const n=Oc[e];return`${this.co}/v1/${t}:${n}`}}{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams}wo(e,t,n,r){return new Promise(((i,o)=>{const s=new kr;s.setWithCredentials(!0),s.listenOnce(Er.COMPLETE,(()=>{try{switch(s.getLastErrorCode()){case br.NO_ERROR:const t=s.getResponseJson();Rr("Connection","XHR received:",JSON.stringify(t)),i(t);break;case br.TIMEOUT:Rr("Connection",'RPC "'+e+'" timed out'),o(new Vr(Ur.DEADLINE_EXCEEDED,"Request time out"));break;case br.HTTP_ERROR:const n=s.getStatus();if(Rr("Connection",'RPC "'+e+'" failed with status:',n,"response text:",s.getResponseText()),n>0){let e=s.getResponseJson();Array.isArray(e)&&(e=e[0]);const t=null==e?void 0:e.error;if(t&&t.status&&t.message){const e=function(e){const t=e.toLowerCase().replace(/_/g,"-");return Object.values(Ur).indexOf(t)>=0?t:Ur.UNKNOWN}(t.status);o(new Vr(e,t.message))}else o(new Vr(Ur.UNKNOWN,"Server responded with status "+s.getStatus()))}else o(new Vr(Ur.UNAVAILABLE,"Connection failed."));break;default:Mr()}}finally{Rr("Connection",'RPC "'+e+'" completed.')}}));const a=JSON.stringify(r);s.send(t,"POST",a,n,15)}))}yo(e,t,n){const r=[this.co,"/","google.firestore.v1.Firestore","/",e,"/channel"],i=vr(),o=wr(),s={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling};this.useFetchStreams&&(s.xmlHttpFactory=new Ir({})),this._o(s.initMessageHeaders,t,n),s.encodeInitMessageHeaders=!0;const a=r.join("");Rr("Connection","Creating WebChannel: "+a,s);const c=i.createWebChannel(a,s);let u=!1,l=!1;const h=new Nc({Yr:e=>{l?Rr("Connection","Not sending because WebChannel is closed:",e):(u||(Rr("Connection","Opening WebChannel transport."),c.open(),u=!0),Rr("Connection","WebChannel sending:",e),c.send(e))},Zr:()=>c.close()}),f=(e,t,n)=>{e.listen(t,(e=>{try{n(e)}catch(e){setTimeout((()=>{throw e}),0)}}))};return f(c,Sr.EventType.OPEN,(()=>{l||Rr("Connection","WebChannel transport opened.")})),f(c,Sr.EventType.CLOSE,(()=>{l||(l=!0,Rr("Connection","WebChannel transport closed"),h.oo())})),f(c,Sr.EventType.ERROR,(e=>{l||(l=!0,Pr("Connection","WebChannel transport errored:",e),h.oo(new Vr(Ur.UNAVAILABLE,"The operation could not be completed")))})),f(c,Sr.EventType.MESSAGE,(e=>{var t;if(!l){const n=e.data[0];jr(!!n);const r=n,i=r.error||(null===(t=r[0])||void 0===t?void 0:t.error);if(i){Rr("Connection","WebChannel received error:",i);const e=i.status;let t=function(e){const t=Rs[e];if(void 0!==t)return Ls(t)}(e),n=i.message;void 0===t&&(t=Ur.INTERNAL,n="Unknown error status: "+e+" with message "+i.message),l=!0,h.oo(new Vr(t,n)),c.close()}else Rr("Connection","WebChannel received:",n),h.uo(n)}})),f(o,_r.STAT_EVENT,(e=>{e.stat===Tr.PROXY?Rr("Connection","Detected buffering proxy"):e.stat===Tr.NOPROXY&&Rr("Connection","Detected no buffering proxy")})),setTimeout((()=>{h.ro()}),0),h}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Dc(){return"undefined"!=typeof document?document:null}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pc(e){return new ca(e,!0)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lc{constructor(e,t,n=1e3,r=1.5,i=6e4){this.Ys=e,this.timerId=t,this.po=n,this.Io=r,this.To=i,this.Eo=0,this.Ao=null,this.Ro=Date.now(),this.reset()}reset(){this.Eo=0}bo(){this.Eo=this.To}vo(e){this.cancel();const t=Math.floor(this.Eo+this.Po()),n=Math.max(0,Date.now()-this.Ro),r=Math.max(0,t-n);r>0&&Rr("ExponentialBackoff",`Backing off for ${r} ms (base delay: ${this.Eo} ms, delay with jitter: ${t} ms, last attempt: ${n} ms ago)`),this.Ao=this.Ys.enqueueAfterDelay(this.timerId,r,(()=>(this.Ro=Date.now(),e()))),this.Eo*=this.Io,this.Eo<this.po&&(this.Eo=this.po),this.Eo>this.To&&(this.Eo=this.To)}Vo(){null!==this.Ao&&(this.Ao.skipDelay(),this.Ao=null)}cancel(){null!==this.Ao&&(this.Ao.cancel(),this.Ao=null)}Po(){return(Math.random()-.5)*this.Eo}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mc{constructor(e,t,n,r,i,o,s,a){this.Ys=e,this.So=n,this.Do=r,this.connection=i,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=s,this.listener=a,this.state=0,this.Co=0,this.xo=null,this.No=null,this.stream=null,this.ko=new Lc(e,t)}Oo(){return 1===this.state||5===this.state||this.Mo()}Mo(){return 2===this.state||3===this.state}start(){4!==this.state?this.auth():this.Fo()}async stop(){this.Oo()&&await this.close(0)}$o(){this.state=0,this.ko.reset()}Bo(){this.Mo()&&null===this.xo&&(this.xo=this.Ys.enqueueAfterDelay(this.So,6e4,(()=>this.Lo())))}qo(e){this.Uo(),this.stream.send(e)}async Lo(){if(this.Mo())return this.close(0)}Uo(){this.xo&&(this.xo.cancel(),this.xo=null)}Ko(){this.No&&(this.No.cancel(),this.No=null)}async close(e,t){this.Uo(),this.Ko(),this.ko.cancel(),this.Co++,4!==e?this.ko.reset():t&&t.code===Ur.RESOURCE_EXHAUSTED?(Dr(t.toString()),Dr("Using maximum backoff delay to prevent overloading the backend."),this.ko.bo()):t&&t.code===Ur.UNAUTHENTICATED&&3!==this.state&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),null!==this.stream&&(this.Go(),this.stream.close(),this.stream=null),this.state=e,await this.listener.no(t)}Go(){}auth(){this.state=1;const e=this.Qo(this.Co),t=this.Co;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then((([e,n])=>{this.Co===t&&this.jo(e,n)}),(t=>{e((()=>{const e=new Vr(Ur.UNKNOWN,"Fetching auth token failed: "+t.message);return this.zo(e)}))}))}jo(e,t){const n=this.Qo(this.Co);this.stream=this.Wo(e,t),this.stream.Xr((()=>{n((()=>(this.state=2,this.No=this.Ys.enqueueAfterDelay(this.Do,1e4,(()=>(this.Mo()&&(this.state=3),Promise.resolve()))),this.listener.Xr())))})),this.stream.no((e=>{n((()=>this.zo(e)))})),this.stream.onMessage((e=>{n((()=>this.onMessage(e)))}))}Fo(){this.state=5,this.ko.vo((async()=>{this.state=0,this.start()}))}zo(e){return Rr("PersistentStream",`close with error: ${e}`),this.stream=null,this.close(4,e)}Qo(e){return t=>{this.Ys.enqueueAndForget((()=>this.Co===e?t():(Rr("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve())))}}}class jc extends Mc{constructor(e,t,n,r,i,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,n,r,o),this.Tt=i}Wo(e,t){return this.connection.yo("Listen",e,t)}onMessage(e){this.ko.reset();const t=_a(this.Tt,e),n=function(e){if(!("targetChange"in e))return ti.min();const t=e.targetChange;return t.targetIds&&t.targetIds.length?ti.min():t.readTime?fa(t.readTime):ti.min()}(e);return this.listener.Ho(t,n)}Jo(e){const t={};t.database=wa(this.Tt),t.addTarget=function(e,t){let n;const r=t.target;return n=Do(r)?{documents:Sa(e,r)}:{query:ka(e,r)},n.targetId=t.targetId,t.resumeToken.approximateByteSize()>0?n.resumeToken=la(e,t.resumeToken):t.snapshotVersion.compareTo(ti.min())>0&&(n.readTime=ua(e,t.snapshotVersion.toTimestamp())),n}(this.Tt,e);const n=Ca(this.Tt,e);n&&(t.labels=n),this.qo(t)}Yo(e){const t={};t.database=wa(this.Tt),t.removeTarget=e,this.qo(t)}}class Fc extends Mc{constructor(e,t,n,r,i,o){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,n,r,o),this.Tt=i,this.Zo=!1}get Xo(){return this.Zo}start(){this.Zo=!1,this.lastStreamToken=void 0,super.start()}Go(){this.Zo&&this.tu([])}Wo(e,t){return this.connection.yo("Write",e,t)}onMessage(e){if(jr(!!e.streamToken),this.lastStreamToken=e.streamToken,this.Zo){this.ko.reset();const t=Ia(e.writeResults,e.commitTime),n=fa(e.commitTime);return this.listener.eu(n,t)}return jr(!e.writeResults||0===e.writeResults.length),this.Zo=!0,this.listener.nu()}su(){const e={};e.database=wa(this.Tt),this.qo(e)}tu(e){const t={streamToken:this.lastStreamToken,writes:e.map((e=>Ta(this.Tt,e)))};this.qo(t)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Uc extends class{}{constructor(e,t,n,r){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=n,this.Tt=r,this.iu=!1}ru(){if(this.iu)throw new Vr(Ur.FAILED_PRECONDITION,"The client has already been terminated.")}lo(e,t,n){return this.ru(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([r,i])=>this.connection.lo(e,t,n,r,i))).catch((e=>{throw"FirebaseError"===e.name?(e.code===Ur.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),e):new Vr(Ur.UNKNOWN,e.toString())}))}mo(e,t,n,r){return this.ru(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([i,o])=>this.connection.mo(e,t,n,i,o,r))).catch((e=>{throw"FirebaseError"===e.name?(e.code===Ur.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),e):new Vr(Ur.UNKNOWN,e.toString())}))}terminate(){this.iu=!0}}class Vc{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.ou=0,this.uu=null,this.cu=!0}au(){0===this.ou&&(this.hu("Unknown"),this.uu=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,(()=>(this.uu=null,this.lu("Backend didn't respond within 10 seconds."),this.hu("Offline"),Promise.resolve()))))}fu(e){"Online"===this.state?this.hu("Unknown"):(this.ou++,this.ou>=1&&(this.du(),this.lu(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.hu("Offline")))}set(e){this.du(),this.ou=0,"Online"===e&&(this.cu=!1),this.hu(e)}hu(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}lu(e){const t=`Could not reach Cloud Firestore backend. ${e}\nThis typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.cu?(Dr(t),this.cu=!1):Rr("OnlineStateTracker",t)}du(){null!==this.uu&&(this.uu.cancel(),this.uu=null)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qc{constructor(e,t,n,r,i){this.localStore=e,this.datastore=t,this.asyncQueue=n,this.remoteSyncer={},this._u=[],this.wu=new Map,this.mu=new Set,this.gu=[],this.yu=i,this.yu.Gr((e=>{n.enqueueAndForget((async()=>{Qc(this)&&(Rr("RemoteStore","Restarting streams for network reachability change."),await async function(e){const t=Fr(e);t.mu.add(4),await Bc(t),t.pu.set("Unknown"),t.mu.delete(4),await $c(t)}(this))}))})),this.pu=new Vc(n,r)}}async function $c(e){if(Qc(e))for(const t of e.gu)await t(!0)}async function Bc(e){for(const t of e.gu)await t(!1)}function Hc(e,t){const n=Fr(e);n.wu.has(t.targetId)||(n.wu.set(t.targetId,t),Jc(n)?Gc(n):pu(n).Mo()&&Wc(n,t))}function zc(e,t){const n=Fr(e),r=pu(n);n.wu.delete(t),r.Mo()&&Kc(n,t),0===n.wu.size&&(r.Mo()?r.Bo():Qc(n)&&n.pu.set("Unknown"))}function Wc(e,t){e.Iu.Ft(t.targetId),pu(e).Jo(t)}function Kc(e,t){e.Iu.Ft(t),pu(e).Yo(t)}function Gc(e){e.Iu=new na({getRemoteKeysForTarget:t=>e.remoteSyncer.getRemoteKeysForTarget(t),ie:t=>e.wu.get(t)||null}),pu(e).start(),e.pu.au()}function Jc(e){return Qc(e)&&!pu(e).Oo()&&e.wu.size>0}function Qc(e){return 0===Fr(e).mu.size}function Xc(e){e.Iu=void 0}async function Yc(e){e.wu.forEach(((t,n)=>{Wc(e,t)}))}async function Zc(e,t){Xc(e),Jc(e)?(e.pu.fu(t),Gc(e)):e.pu.set("Unknown")}async function eu(e,t,n){if(e.pu.set("Online"),t instanceof ea&&2===t.state&&t.cause)try{await async function(e,t){const n=t.cause;for(const r of t.targetIds)e.wu.has(r)&&(await e.remoteSyncer.rejectListen(r,n),e.wu.delete(r),e.Iu.removeTarget(r))}(e,t)}catch(n){Rr("RemoteStore","Failed to remove targets %s: %s ",t.targetIds.join(","),n),await tu(e,n)}else if(t instanceof Ys?e.Iu.Qt(t):t instanceof Zs?e.Iu.Zt(t):e.Iu.Wt(t),!n.isEqual(ti.min()))try{const t=await vc(e.localStore);n.compareTo(t)>=0&&await function(e,t){const n=e.Iu.ee(t);return n.targetChanges.forEach(((n,r)=>{if(n.resumeToken.approximateByteSize()>0){const i=e.wu.get(r);i&&e.wu.set(r,i.withResumeToken(n.resumeToken,t))}})),n.targetMismatches.forEach((t=>{const n=e.wu.get(t);if(!n)return;e.wu.set(t,n.withResumeToken(Ai.EMPTY_BYTE_STRING,n.snapshotVersion)),Kc(e,t);const r=new Ha(n.target,t,1,n.sequenceNumber);Wc(e,r)})),e.remoteSyncer.applyRemoteEvent(n)}(e,n)}catch(t){Rr("RemoteStore","Failed to raise snapshot:",t),await tu(e,t)}}async function tu(e,t,n){if(!mi(t))throw t;e.mu.add(1),await Bc(e),e.pu.set("Offline"),n||(n=()=>vc(e.localStore)),e.asyncQueue.enqueueRetryable((async()=>{Rr("RemoteStore","Retrying IndexedDB access"),await n(),e.mu.delete(1),await $c(e)}))}function nu(e,t){return t().catch((n=>tu(e,n,t)))}async function ru(e){const t=Fr(e),n=gu(t);let r=t._u.length>0?t._u[t._u.length-1].batchId:-1;for(;iu(t);)try{const e=await Ec(t.localStore,r);if(null===e){0===t._u.length&&n.Bo();break}r=e.batchId,ou(t,e)}catch(e){await tu(t,e)}su(t)&&au(t)}function iu(e){return Qc(e)&&e._u.length<10}function ou(e,t){e._u.push(t);const n=gu(e);n.Mo()&&n.Xo&&n.tu(t.mutations)}function su(e){return Qc(e)&&!gu(e).Oo()&&e._u.length>0}function au(e){gu(e).start()}async function cu(e){gu(e).su()}async function uu(e){const t=gu(e);for(const n of e._u)t.tu(n.mutations)}async function lu(e,t,n){const r=e._u.shift(),i=$a.from(r,t,n);await nu(e,(()=>e.remoteSyncer.applySuccessfulWrite(i))),await ru(e)}async function hu(e,t){t&&gu(e).Xo&&await async function(e,t){if(n=t.code,Ps(n)&&n!==Ur.ABORTED){const n=e._u.shift();gu(e).$o(),await nu(e,(()=>e.remoteSyncer.rejectFailedWrite(n.batchId,t))),await ru(e)}var n}(e,t),su(e)&&au(e)}async function fu(e,t){const n=Fr(e);n.asyncQueue.verifyOperationInProgress(),Rr("RemoteStore","RemoteStore received new credentials");const r=Qc(n);n.mu.add(3),await Bc(n),r&&n.pu.set("Unknown"),await n.remoteSyncer.handleCredentialChange(t),n.mu.delete(3),await $c(n)}async function du(e,t){const n=Fr(e);t?(n.mu.delete(2),await $c(n)):t||(n.mu.add(2),await Bc(n),n.pu.set("Unknown"))}function pu(e){return e.Tu||(e.Tu=function(e,t,n){const r=Fr(e);return r.ru(),new jc(t,r.connection,r.authCredentials,r.appCheckCredentials,r.Tt,n)
/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */}(e.datastore,e.asyncQueue,{Xr:Yc.bind(null,e),no:Zc.bind(null,e),Ho:eu.bind(null,e)}),e.gu.push((async t=>{t?(e.Tu.$o(),Jc(e)?Gc(e):e.pu.set("Unknown")):(await e.Tu.stop(),Xc(e))}))),e.Tu}function gu(e){return e.Eu||(e.Eu=function(e,t,n){const r=Fr(e);return r.ru(),new Fc(t,r.connection,r.authCredentials,r.appCheckCredentials,r.Tt,n)}(e.datastore,e.asyncQueue,{Xr:cu.bind(null,e),no:hu.bind(null,e),nu:uu.bind(null,e),eu:lu.bind(null,e)}),e.gu.push((async t=>{t?(e.Eu.$o(),await ru(e)):(await e.Eu.stop(),e._u.length>0&&(Rr("RemoteStore",`Stopping write stream with ${e._u.length} pending writes`),e._u=[]))}))),e.Eu
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */}class mu{constructor(e,t,n,r,i){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=n,this.op=r,this.removalCallback=i,this.deferred=new qr,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch((e=>{}))}static createAndSchedule(e,t,n,r,i){const o=Date.now()+n,s=new mu(e,t,o,r,i);return s.start(n),s}start(e){this.timerHandle=setTimeout((()=>this.handleDelayElapsed()),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){null!==this.timerHandle&&(this.clearTimeout(),this.deferred.reject(new Vr(Ur.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget((()=>null!==this.timerHandle?(this.clearTimeout(),this.op().then((e=>this.deferred.resolve(e)))):Promise.resolve()))}clearTimeout(){null!==this.timerHandle&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function yu(e,t){if(Dr("AsyncQueue",`${t}: ${e}`),mi(e))return new Vr(Ur.UNAVAILABLE,`${t}: ${e}`);throw e}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vu{constructor(e){this.comparator=e?(t,n)=>e(t,n)||si.comparator(t.key,n.key):(e,t)=>si.comparator(e.key,t.key),this.keyedMap=Vs(),this.sortedSet=new bo(this.comparator)}static emptySet(e){return new vu(e.comparator)}has(e){return null!=this.keyedMap.get(e)}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal(((t,n)=>(e(t),!1)))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof vu))return!1;if(this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),n=e.sortedSet.getIterator();for(;t.hasNext();){const e=t.getNext().key,r=n.getNext().key;if(!e.isEqual(r))return!1}return!0}toString(){const e=[];return this.forEach((t=>{e.push(t.toString())})),0===e.length?"DocumentSet ()":"DocumentSet (\n  "+e.join("  \n")+"\n)"}copy(e,t){const n=new vu;return n.comparator=this.comparator,n.keyedMap=e,n.sortedSet=t,n}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wu{constructor(){this.Au=new bo(si.comparator)}track(e){const t=e.doc.key,n=this.Au.get(t);n?0!==e.type&&3===n.type?this.Au=this.Au.insert(t,e):3===e.type&&1!==n.type?this.Au=this.Au.insert(t,{type:n.type,doc:e.doc}):2===e.type&&2===n.type?this.Au=this.Au.insert(t,{type:2,doc:e.doc}):2===e.type&&0===n.type?this.Au=this.Au.insert(t,{type:0,doc:e.doc}):1===e.type&&0===n.type?this.Au=this.Au.remove(t):1===e.type&&2===n.type?this.Au=this.Au.insert(t,{type:1,doc:n.doc}):0===e.type&&1===n.type?this.Au=this.Au.insert(t,{type:2,doc:e.doc}):Mr():this.Au=this.Au.insert(t,e)}Ru(){const e=[];return this.Au.inorderTraversal(((t,n)=>{e.push(n)})),e}}class bu{constructor(e,t,n,r,i,o,s,a,c){this.query=e,this.docs=t,this.oldDocs=n,this.docChanges=r,this.mutatedKeys=i,this.fromCache=o,this.syncStateChanged=s,this.excludesMetadataChanges=a,this.hasCachedResults=c}static fromInitialDocuments(e,t,n,r,i){const o=[];return t.forEach((e=>{o.push({type:0,doc:e})})),new bu(e,t,vu.emptySet(t),o,n,r,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&zo(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,n=e.docChanges;if(t.length!==n.length)return!1;for(let r=0;r<t.length;r++)if(t[r].type!==n[r].type||!t[r].doc.isEqual(n[r].doc))return!1;return!0}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Eu{constructor(){this.bu=void 0,this.listeners=[]}}class _u{constructor(){this.queries=new Ms((e=>Wo(e)),zo),this.onlineState="Unknown",this.vu=new Set}}async function Tu(e,t){const n=Fr(e),r=t.query;let i=!1,o=n.queries.get(r);if(o||(i=!0,o=new Eu),i)try{o.bu=await n.onListen(r)}catch(e){const n=yu(e,`Initialization of query '${Ko(t.query)}' failed`);return void t.onError(n)}n.queries.set(r,o),o.listeners.push(t),t.Pu(n.onlineState),o.bu&&t.Vu(o.bu)&&Au(n)}async function Iu(e,t){const n=Fr(e),r=t.query;let i=!1;const o=n.queries.get(r);if(o){const e=o.listeners.indexOf(t);e>=0&&(o.listeners.splice(e,1),i=0===o.listeners.length)}if(i)return n.queries.delete(r),n.onUnlisten(r)}function Su(e,t){const n=Fr(e);let r=!1;for(const i of t){const e=i.query,t=n.queries.get(e);if(t){for(const e of t.listeners)e.Vu(i)&&(r=!0);t.bu=i}}r&&Au(n)}function ku(e,t,n){const r=Fr(e),i=r.queries.get(t);if(i)for(const o of i.listeners)o.onError(n);r.queries.delete(t)}function Au(e){e.vu.forEach((e=>{e.next()}))}class Cu{constructor(e,t,n){this.query=e,this.Su=t,this.Du=!1,this.Cu=null,this.onlineState="Unknown",this.options=n||{}}Vu(e){if(!this.options.includeMetadataChanges){const t=[];for(const n of e.docChanges)3!==n.type&&t.push(n);e=new bu(e.query,e.docs,e.oldDocs,t,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.Du?this.xu(e)&&(this.Su.next(e),t=!0):this.Nu(e,this.onlineState)&&(this.ku(e),t=!0),this.Cu=e,t}onError(e){this.Su.error(e)}Pu(e){this.onlineState=e;let t=!1;return this.Cu&&!this.Du&&this.Nu(this.Cu,e)&&(this.ku(this.Cu),t=!0),t}Nu(e,t){if(!e.fromCache)return!0;const n="Offline"!==t;return(!this.options.Ou||!n)&&(!e.docs.isEmpty()||e.hasCachedResults||"Offline"===t)}xu(e){if(e.docChanges.length>0)return!0;const t=this.Cu&&this.Cu.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&!0===this.options.includeMetadataChanges}ku(e){e=bu.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Du=!0,this.Su.next(e)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class xu{constructor(e){this.key=e}}class Ou{constructor(e){this.key=e}}class Nu{constructor(e,t){this.query=e,this.Ku=t,this.Gu=null,this.hasCachedResults=!1,this.current=!1,this.Qu=Ks(),this.mutatedKeys=Ks(),this.ju=Qo(e),this.zu=new vu(this.ju)}get Wu(){return this.Ku}Hu(e,t){const n=t?t.Ju:new wu,r=t?t.zu:this.zu;let i=t?t.mutatedKeys:this.mutatedKeys,o=r,s=!1;const a="F"===this.query.limitType&&r.size===this.query.limit?r.last():null,c="L"===this.query.limitType&&r.size===this.query.limit?r.first():null;if(e.inorderTraversal(((e,t)=>{const u=r.get(e),l=Go(this.query,t)?t:null,h=!!u&&this.mutatedKeys.has(u.key),f=!!l&&(l.hasLocalMutations||this.mutatedKeys.has(l.key)&&l.hasCommittedMutations);let d=!1;u&&l?u.data.isEqual(l.data)?h!==f&&(n.track({type:3,doc:l}),d=!0):this.Yu(u,l)||(n.track({type:2,doc:l}),d=!0,(a&&this.ju(l,a)>0||c&&this.ju(l,c)<0)&&(s=!0)):!u&&l?(n.track({type:0,doc:l}),d=!0):u&&!l&&(n.track({type:1,doc:u}),d=!0,(a||c)&&(s=!0)),d&&(l?(o=o.add(l),i=f?i.add(e):i.delete(e)):(o=o.delete(e),i=i.delete(e)))})),null!==this.query.limit)for(;o.size>this.query.limit;){const e="F"===this.query.limitType?o.last():o.first();o=o.delete(e.key),i=i.delete(e.key),n.track({type:1,doc:e})}return{zu:o,Ju:n,Li:s,mutatedKeys:i}}Yu(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,n){const r=this.zu;this.zu=e.zu,this.mutatedKeys=e.mutatedKeys;const i=e.Ju.Ru();i.sort(((e,t)=>function(e,t){const n=e=>{switch(e){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return Mr()}};return n(e)-n(t)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(e.type,t.type)||this.ju(e.doc,t.doc))),this.Zu(n);const o=t?this.Xu():[],s=0===this.Qu.size&&this.current?1:0,a=s!==this.Gu;return this.Gu=s,0!==i.length||a?{snapshot:new bu(this.query,e.zu,r,i,e.mutatedKeys,0===s,a,!1,!!n&&n.resumeToken.approximateByteSize()>0),tc:o}:{tc:o}}Pu(e){return this.current&&"Offline"===e?(this.current=!1,this.applyChanges({zu:this.zu,Ju:new wu,mutatedKeys:this.mutatedKeys,Li:!1},!1)):{tc:[]}}ec(e){return!this.Ku.has(e)&&!!this.zu.has(e)&&!this.zu.get(e).hasLocalMutations}Zu(e){e&&(e.addedDocuments.forEach((e=>this.Ku=this.Ku.add(e))),e.modifiedDocuments.forEach((e=>{})),e.removedDocuments.forEach((e=>this.Ku=this.Ku.delete(e))),this.current=e.current)}Xu(){if(!this.current)return[];const e=this.Qu;this.Qu=Ks(),this.zu.forEach((e=>{this.ec(e.key)&&(this.Qu=this.Qu.add(e.key))}));const t=[];return e.forEach((e=>{this.Qu.has(e)||t.push(new Ou(e))})),this.Qu.forEach((n=>{e.has(n)||t.push(new xu(n))})),t}nc(e){this.Ku=e.Yi,this.Qu=Ks();const t=this.Hu(e.documents);return this.applyChanges(t,!0)}sc(){return bu.fromInitialDocuments(this.query,this.zu,this.mutatedKeys,0===this.Gu,this.hasCachedResults)}}class Ru{constructor(e,t,n){this.query=e,this.targetId=t,this.view=n}}class Du{constructor(e){this.key=e,this.ic=!1}}class Pu{constructor(e,t,n,r,i,o){this.localStore=e,this.remoteStore=t,this.eventManager=n,this.sharedClientState=r,this.currentUser=i,this.maxConcurrentLimboResolutions=o,this.rc={},this.oc=new Ms((e=>Wo(e)),zo),this.uc=new Map,this.cc=new Set,this.ac=new bo(si.comparator),this.hc=new Map,this.lc=new rc,this.fc={},this.dc=new Map,this._c=Xa.Sn(),this.onlineState="Unknown",this.wc=void 0}get isPrimaryClient(){return!0===this.wc}}async function Lu(e,t){const n=el(e);let r,i;const o=n.oc.get(t);if(o)r=o.targetId,n.sharedClientState.addLocalQueryTarget(r),i=o.view.sc();else{const e=await _c(n.localStore,$o(t));n.isPrimaryClient&&Hc(n.remoteStore,e);const o=n.sharedClientState.addLocalQueryTarget(e.targetId);r=e.targetId,i=await Mu(n,t,r,"current"===o,e.resumeToken)}return i}async function Mu(e,t,n,r,i){e.mc=(t,n,r)=>async function(e,t,n,r){let i=t.view.Hu(n);i.Li&&(i=await Ic(e.localStore,t.query,!1).then((({documents:e})=>t.view.Hu(e,i))));const o=r&&r.targetChanges.get(t.targetId),s=t.view.applyChanges(i,e.isPrimaryClient,o);return Gu(e,t.targetId,s.tc),s.snapshot}(e,t,n,r);const o=await Ic(e.localStore,t,!0),s=new Nu(t,o.Yi),a=s.Hu(o.documents),c=Xs.createSynthesizedTargetChangeForCurrentChange(n,r&&"Offline"!==e.onlineState,i),u=s.applyChanges(a,e.isPrimaryClient,c);Gu(e,n,u.tc);const l=new Ru(t,n,s);return e.oc.set(t,l),e.uc.has(n)?e.uc.get(n).push(t):e.uc.set(n,[t]),u.snapshot}async function ju(e,t){const n=Fr(e),r=n.oc.get(t),i=n.uc.get(r.targetId);if(i.length>1)return n.uc.set(r.targetId,i.filter((e=>!zo(e,t)))),void n.oc.delete(t);n.isPrimaryClient?(n.sharedClientState.removeLocalQueryTarget(r.targetId),n.sharedClientState.isActiveQueryTarget(r.targetId)||await Tc(n.localStore,r.targetId,!1).then((()=>{n.sharedClientState.clearQueryState(r.targetId),zc(n.remoteStore,r.targetId),Wu(n,r.targetId)})).catch(pi)):(Wu(n,r.targetId),await Tc(n.localStore,r.targetId,!0))}async function Fu(e,t,n){const r=tl(e);try{const e=await function(e,t){const n=Fr(e),r=ei.now(),i=t.reduce(((e,t)=>e.add(t.key)),Ks());let o,s;return n.persistence.runTransaction("Locally write mutations","readwrite",(e=>{let a=Fs(),c=Ks();return n.ji.getEntries(e,i).next((e=>{a=e,a.forEach(((e,t)=>{t.isValidDocument()||(c=c.add(e))}))})).next((()=>n.localDocuments.getOverlayedDocuments(e,a))).next((i=>{o=i;const s=[];for(const e of t){const t=_s(e,o.get(e.key).overlayedDocument);null!=t&&s.push(new Ss(e.key,t,Ao(t.value.mapValue),ms.exists(!0)))}return n.mutationQueue.addMutationBatch(e,r,s,t)})).next((t=>{s=t;const r=t.applyToLocalDocumentSet(o,c);return n.documentOverlayCache.saveOverlays(e,t.batchId,r)}))})).then((()=>({batchId:s.batchId,changes:qs(o)})))}(r.localStore,t);r.sharedClientState.addPendingMutation(e.batchId),function(e,t,n){let r=e.fc[e.currentUser.toKey()];r||(r=new bo(Yr)),r=r.insert(t,n),e.fc[e.currentUser.toKey()]=r}(r,e.batchId,n),await Xu(r,e.changes),await ru(r.remoteStore)}catch(e){const t=yu(e,"Failed to persist write");n.reject(t)}}async function Uu(e,t){const n=Fr(e);try{const e=await wc(n.localStore,t);t.targetChanges.forEach(((e,t)=>{const r=n.hc.get(t);r&&(jr(e.addedDocuments.size+e.modifiedDocuments.size+e.removedDocuments.size<=1),e.addedDocuments.size>0?r.ic=!0:e.modifiedDocuments.size>0?jr(r.ic):e.removedDocuments.size>0&&(jr(r.ic),r.ic=!1))})),await Xu(n,e,t)}catch(e){await pi(e)}}function Vu(e,t,n){const r=Fr(e);if(r.isPrimaryClient&&0===n||!r.isPrimaryClient&&1===n){const e=[];r.oc.forEach(((n,r)=>{const i=r.view.Pu(t);i.snapshot&&e.push(i.snapshot)})),function(e,t){const n=Fr(e);n.onlineState=t;let r=!1;n.queries.forEach(((e,n)=>{for(const i of n.listeners)i.Pu(t)&&(r=!0)})),r&&Au(n)}(r.eventManager,t),e.length&&r.rc.Ho(e),r.onlineState=t,r.isPrimaryClient&&r.sharedClientState.setOnlineState(t)}}async function qu(e,t,n){const r=Fr(e);r.sharedClientState.updateQueryState(t,"rejected",n);const i=r.hc.get(t),o=i&&i.key;if(o){let e=new bo(si.comparator);e=e.insert(o,Co.newNoDocument(o,ti.min()));const n=Ks().add(o),i=new Qs(ti.min(),new Map,new To(Yr),e,n);await Uu(r,i),r.ac=r.ac.remove(o),r.hc.delete(t),Qu(r)}else await Tc(r.localStore,t,!1).then((()=>Wu(r,t,n))).catch(pi)}async function $u(e,t){const n=Fr(e),r=t.batch.batchId;try{const e=await yc(n.localStore,t);zu(n,r,null),Hu(n,r),n.sharedClientState.updateMutationState(r,"acknowledged"),await Xu(n,e)}catch(e){await pi(e)}}async function Bu(e,t,n){const r=Fr(e);try{const e=await function(e,t){const n=Fr(e);return n.persistence.runTransaction("Reject batch","readwrite-primary",(e=>{let r;return n.mutationQueue.lookupMutationBatch(e,t).next((t=>(jr(null!==t),r=t.keys(),n.mutationQueue.removeMutationBatch(e,t)))).next((()=>n.mutationQueue.performConsistencyCheck(e))).next((()=>n.documentOverlayCache.removeOverlaysForBatchId(e,r,t))).next((()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(e,r))).next((()=>n.localDocuments.getDocuments(e,r)))}))}(r.localStore,t);zu(r,t,n),Hu(r,t),r.sharedClientState.updateMutationState(t,"rejected",n),await Xu(r,e)}catch(n){await pi(n)}}function Hu(e,t){(e.dc.get(t)||[]).forEach((e=>{e.resolve()})),e.dc.delete(t)}function zu(e,t,n){const r=Fr(e);let i=r.fc[r.currentUser.toKey()];if(i){const e=i.get(t);e&&(n?e.reject(n):e.resolve(),i=i.remove(t)),r.fc[r.currentUser.toKey()]=i}}function Wu(e,t,n=null){e.sharedClientState.removeLocalQueryTarget(t);for(const r of e.uc.get(t))e.oc.delete(r),n&&e.rc.gc(r,n);e.uc.delete(t),e.isPrimaryClient&&e.lc.ds(t).forEach((t=>{e.lc.containsKey(t)||Ku(e,t)}))}function Ku(e,t){e.cc.delete(t.path.canonicalString());const n=e.ac.get(t);null!==n&&(zc(e.remoteStore,n),e.ac=e.ac.remove(t),e.hc.delete(n),Qu(e))}function Gu(e,t,n){for(const r of n)r instanceof xu?(e.lc.addReference(r.key,t),Ju(e,r)):r instanceof Ou?(Rr("SyncEngine","Document no longer in limbo: "+r.key),e.lc.removeReference(r.key,t),e.lc.containsKey(r.key)||Ku(e,r.key)):Mr()}function Ju(e,t){const n=t.key,r=n.path.canonicalString();e.ac.get(n)||e.cc.has(r)||(Rr("SyncEngine","New document in limbo: "+n),e.cc.add(r),Qu(e))}function Qu(e){for(;e.cc.size>0&&e.ac.size<e.maxConcurrentLimboResolutions;){const t=e.cc.values().next().value;e.cc.delete(t);const n=new si(ri.fromString(t)),r=e._c.next();e.hc.set(r,new Du(n)),e.ac=e.ac.insert(n,r),Hc(e.remoteStore,new Ha($o(Mo(n.path)),r,2,yi.at))}}async function Xu(e,t,n){const r=Fr(e),i=[],o=[],s=[];r.oc.isEmpty()||(r.oc.forEach(((e,a)=>{s.push(r.mc(a,t,n).then((e=>{if((e||n)&&r.isPrimaryClient&&r.sharedClientState.updateQueryState(a.targetId,(null==e?void 0:e.fromCache)?"not-current":"current"),e){i.push(e);const t=fc.Ni(a.targetId,e);o.push(t)}})))})),await Promise.all(s),r.rc.Ho(i),await async function(e,t){const n=Fr(e);try{await n.persistence.runTransaction("notifyLocalViewChanges","readwrite",(e=>gi.forEach(t,(t=>gi.forEach(t.Ci,(r=>n.persistence.referenceDelegate.addReference(e,t.targetId,r))).next((()=>gi.forEach(t.xi,(r=>n.persistence.referenceDelegate.removeReference(e,t.targetId,r)))))))))}catch(e){if(!mi(e))throw e;Rr("LocalStore","Failed to update sequence numbers: "+e)}for(const r of t){const e=r.targetId;if(!r.fromCache){const t=n.Ki.get(e),r=t.snapshotVersion,i=t.withLastLimboFreeSnapshotVersion(r);n.Ki=n.Ki.insert(e,i)}}}(r.localStore,o))}async function Yu(e,t){const n=Fr(e);if(!n.currentUser.isEqual(t)){Rr("SyncEngine","User change. New user:",t.toKey());const e=await mc(n.localStore,t);n.currentUser=t,function(e,t){e.dc.forEach((e=>{e.forEach((e=>{e.reject(new Vr(Ur.CANCELLED,t))}))})),e.dc.clear()}(n,"'waitForPendingWrites' promise is rejected due to a user change."),n.sharedClientState.handleUserChange(t,e.removedBatchIds,e.addedBatchIds),await Xu(n,e.Wi)}}function Zu(e,t){const n=Fr(e),r=n.hc.get(t);if(r&&r.ic)return Ks().add(r.key);{let e=Ks();const r=n.uc.get(t);if(!r)return e;for(const t of r){const r=n.oc.get(t);e=e.unionWith(r.view.Wu)}return e}}function el(e){const t=Fr(e);return t.remoteStore.remoteSyncer.applyRemoteEvent=Uu.bind(null,t),t.remoteStore.remoteSyncer.getRemoteKeysForTarget=Zu.bind(null,t),t.remoteStore.remoteSyncer.rejectListen=qu.bind(null,t),t.rc.Ho=Su.bind(null,t.eventManager),t.rc.gc=ku.bind(null,t.eventManager),t}function tl(e){const t=Fr(e);return t.remoteStore.remoteSyncer.applySuccessfulWrite=$u.bind(null,t),t.remoteStore.remoteSyncer.rejectFailedWrite=Bu.bind(null,t),t}class nl{constructor(){this.synchronizeTabs=!1}async initialize(e){this.Tt=Pc(e.databaseInfo.databaseId),this.sharedClientState=this.Ic(e),this.persistence=this.Tc(e),await this.persistence.start(),this.localStore=this.Ec(e),this.gcScheduler=this.Ac(e,this.localStore),this.indexBackfillerScheduler=this.Rc(e,this.localStore)}Ac(e,t){return null}Rc(e,t){return null}Ec(e){return gc(this.persistence,new dc,e.initialUser,this.Tt)}Tc(e){return new uc(hc.qs,this.Tt)}Ic(e){return new Ac}async terminate(){this.gcScheduler&&this.gcScheduler.stop(),await this.sharedClientState.shutdown(),await this.persistence.shutdown()}}class rl{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=e=>Vu(this.syncEngine,e,1),this.remoteStore.remoteSyncer.handleCredentialChange=Yu.bind(null,this.syncEngine),await du(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return new _u}createDatastore(e){const t=Pc(e.databaseInfo.databaseId),n=(r=e.databaseInfo,new Rc(r));var r;return function(e,t,n,r){return new Uc(e,t,n,r)}(e.authCredentials,e.appCheckCredentials,n,t)}createRemoteStore(e){return t=this.localStore,n=this.datastore,r=e.asyncQueue,i=e=>Vu(this.syncEngine,e,0),o=xc.C()?new xc:new Cc,new qc(t,n,r,i,o);var t,n,r,i,o}createSyncEngine(e,t){return function(e,t,n,r,i,o,s){const a=new Pu(e,t,n,r,i,o);return s&&(a.wc=!0),a}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}terminate(){return async function(e){const t=Fr(e);Rr("RemoteStore","RemoteStore shutting down."),t.mu.add(5),await Bc(t),t.yu.shutdown(),t.pu.set("Unknown")}(this.remoteStore)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class il{constructor(e){this.observer=e,this.muted=!1}next(e){this.observer.next&&this.vc(this.observer.next,e)}error(e){this.observer.error?this.vc(this.observer.error,e):Dr("Uncaught Error in snapshot listener:",e.toString())}Pc(){this.muted=!0}vc(e,t){this.muted||setTimeout((()=>{this.muted||e(t)}),0)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class ol{constructor(e,t,n,r){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=n,this.databaseInfo=r,this.user=Cr.UNAUTHENTICATED,this.clientId=Xr.R(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this.authCredentials.start(n,(async e=>{Rr("FirestoreClient","Received user=",e.uid),await this.authCredentialListener(e),this.user=e})),this.appCheckCredentials.start(n,(e=>(Rr("FirestoreClient","Received new app check token=",e),this.appCheckCredentialListener(e,this.user))))}async getConfiguration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}verifyNotTerminated(){if(this.asyncQueue.isShuttingDown)throw new Vr(Ur.FAILED_PRECONDITION,"The client has already been terminated.")}terminate(){this.asyncQueue.enterRestrictedMode();const e=new qr;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted((async()=>{try{this.onlineComponents&&await this.onlineComponents.terminate(),this.offlineComponents&&await this.offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const n=yu(t,"Failed to shutdown persistence");e.reject(n)}})),e.promise}}async function sl(e,t){e.asyncQueue.verifyOperationInProgress(),Rr("FirestoreClient","Initializing OfflineComponentProvider");const n=await e.getConfiguration();await t.initialize(n);let r=n.initialUser;e.setCredentialChangeListener((async e=>{r.isEqual(e)||(await mc(t.localStore,e),r=e)})),t.persistence.setDatabaseDeletedListener((()=>e.terminate())),e.offlineComponents=t}async function al(e,t){e.asyncQueue.verifyOperationInProgress();const n=await cl(e);Rr("FirestoreClient","Initializing OnlineComponentProvider");const r=await e.getConfiguration();await t.initialize(n,r),e.setCredentialChangeListener((e=>fu(t.remoteStore,e))),e.setAppCheckTokenChangeListener(((e,n)=>fu(t.remoteStore,n))),e.onlineComponents=t}async function cl(e){return e.offlineComponents||(Rr("FirestoreClient","Using default OfflineComponentProvider"),await sl(e,new nl)),e.offlineComponents}async function ul(e){return e.onlineComponents||(Rr("FirestoreClient","Using default OnlineComponentProvider"),await al(e,new rl)),e.onlineComponents}function ll(e){return ul(e).then((e=>e.syncEngine))}async function hl(e){const t=await ul(e),n=t.eventManager;return n.onListen=Lu.bind(null,t.syncEngine),n.onUnlisten=ju.bind(null,t.syncEngine),n}function fl(e,t,n={}){const r=new qr;return e.asyncQueue.enqueueAndForget((async()=>function(e,t,n,r,i){const o=new il({next:o=>{t.enqueueAndForget((()=>Iu(e,s)));const a=o.docs.has(n);!a&&o.fromCache?i.reject(new Vr(Ur.UNAVAILABLE,"Failed to get document because the client is offline.")):a&&o.fromCache&&r&&"server"===r.source?i.reject(new Vr(Ur.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):i.resolve(o)},error:e=>i.reject(e)}),s=new Cu(Mo(n.path),o,{includeMetadataChanges:!0,Ou:!0});return Tu(e,s)}(await hl(e),e.asyncQueue,t,n,r))),r.promise}function dl(e,t,n={}){const r=new qr;return e.asyncQueue.enqueueAndForget((async()=>function(e,t,n,r,i){const o=new il({next:n=>{t.enqueueAndForget((()=>Iu(e,s))),n.fromCache&&"server"===r.source?i.reject(new Vr(Ur.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):i.resolve(n)},error:e=>i.reject(e)}),s=new Cu(n,o,{includeMetadataChanges:!0,Ou:!0});return Tu(e,s)}(await hl(e),e.asyncQueue,t,n,r))),r.promise}const pl=new Map;
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gl(e,t,n){if(!n)throw new Vr(Ur.INVALID_ARGUMENT,`Function ${e}() cannot be called with an empty ${t}.`)}function ml(e,t,n,r){if(!0===t&&!0===r)throw new Vr(Ur.INVALID_ARGUMENT,`${e} and ${n} cannot be used together.`)}function yl(e){if(!si.isDocumentKey(e))throw new Vr(Ur.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${e} has ${e.length}.`)}function vl(e){if(si.isDocumentKey(e))throw new Vr(Ur.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${e} has ${e.length}.`)}function wl(e){if(void 0===e)return"undefined";if(null===e)return"null";if("string"==typeof e)return e.length>20&&(e=`${e.substring(0,20)}...`),JSON.stringify(e);if("number"==typeof e||"boolean"==typeof e)return""+e;if("object"==typeof e){if(e instanceof Array)return"an array";{const t=function(e){return e.constructor?e.constructor.name:null}(e);return t?`a custom ${t} object`:"an object"}}return"function"==typeof e?"a function":Mr()}function bl(e,t){if("_delegate"in e&&(e=e._delegate),!(e instanceof t)){if(t.name===e.constructor.name)throw new Vr(Ur.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=wl(e);throw new Vr(Ur.INVALID_ARGUMENT,`Expected type '${t.name}', but it was: ${n}`)}}return e}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class El{constructor(e){var t;if(void 0===e.host){if(void 0!==e.ssl)throw new Vr(Ur.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=null===(t=e.ssl)||void 0===t||t;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,void 0===e.cacheSizeBytes)this.cacheSizeBytes=41943040;else{if(-1!==e.cacheSizeBytes&&e.cacheSizeBytes<1048576)throw new Vr(Ur.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.useFetchStreams=!!e.useFetchStreams,ml("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling)}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _l{constructor(e,t,n,r){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=n,this._app=r,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new El({}),this._settingsFrozen=!1}get app(){if(!this._app)throw new Vr(Ur.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return void 0!==this._terminateTask}_setSettings(e){if(this._settingsFrozen)throw new Vr(Ur.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new El(e),void 0!==e.credentials&&(this._authCredentials=function(e){if(!e)return new Br;switch(e.type){case"gapi":const t=e.client;return new Kr(t,e.sessionIndex||"0",e.iamToken||null,e.authTokenFactory||null);case"provider":return e.client;default:throw new Vr(Ur.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask||(this._terminateTask=this._terminate()),this._terminateTask}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(e){const t=pl.get(e);t&&(Rr("ComponentProvider","Removing Datastore"),pl.delete(e),t.terminate())}(this),Promise.resolve()}}function Tl(e,t,n,r={}){var i;const o=(e=bl(e,_l))._getSettings();if("firestore.googleapis.com"!==o.host&&o.host!==t&&Pr("Host has been set in both settings() and useEmulator(), emulator host will be used"),e._setSettings(Object.assign(Object.assign({},o),{host:`${t}:${n}`,ssl:!1})),r.mockUserToken){let t,n;if("string"==typeof r.mockUserToken)t=r.mockUserToken,n=Cr.MOCK_USER;else{t=(0,a.Sg)(r.mockUserToken,null===(i=e._app)||void 0===i?void 0:i.options.projectId);const o=r.mockUserToken.sub||r.mockUserToken.user_id;if(!o)throw new Vr(Ur.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");n=new Cr(o)}e._authCredentials=new Hr(new $r(t,n))}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Il{constructor(e,t,n){this.converter=t,this._key=n,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new kl(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new Il(this.firestore,e,this._key)}}class Sl{constructor(e,t,n){this.converter=t,this._query=n,this.type="query",this.firestore=e}withConverter(e){return new Sl(this.firestore,e,this._query)}}class kl extends Sl{constructor(e,t,n){super(e,t,Mo(n)),this._path=n,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new Il(this.firestore,null,new si(e))}withConverter(e){return new kl(this.firestore,e,this._path)}}function Al(e,t,...n){if(e=(0,a.m9)(e),gl("collection","path",t),e instanceof _l){const r=ri.fromString(t,...n);return vl(r),new kl(e,null,r)}{if(!(e instanceof Il||e instanceof kl))throw new Vr(Ur.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=e._path.child(ri.fromString(t,...n));return vl(r),new kl(e.firestore,null,r)}}function Cl(e,t,...n){if(e=(0,a.m9)(e),1===arguments.length&&(t=Xr.R()),gl("doc","path",t),e instanceof _l){const r=ri.fromString(t,...n);return yl(r),new Il(e,null,new si(r))}{if(!(e instanceof Il||e instanceof kl))throw new Vr(Ur.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=e._path.child(ri.fromString(t,...n));return yl(r),new Il(e.firestore,e instanceof kl?e.converter:null,new si(r))}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class xl{constructor(){this.qc=Promise.resolve(),this.Uc=[],this.Kc=!1,this.Gc=[],this.Qc=null,this.jc=!1,this.zc=!1,this.Wc=[],this.ko=new Lc(this,"async_queue_retry"),this.Hc=()=>{const e=Dc();e&&Rr("AsyncQueue","Visibility state changed to "+e.visibilityState),this.ko.Vo()};const e=Dc();e&&"function"==typeof e.addEventListener&&e.addEventListener("visibilitychange",this.Hc)}get isShuttingDown(){return this.Kc}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.Jc(),this.Yc(e)}enterRestrictedMode(e){if(!this.Kc){this.Kc=!0,this.zc=e||!1;const t=Dc();t&&"function"==typeof t.removeEventListener&&t.removeEventListener("visibilitychange",this.Hc)}}enqueue(e){if(this.Jc(),this.Kc)return new Promise((()=>{}));const t=new qr;return this.Yc((()=>this.Kc&&this.zc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise))).then((()=>t.promise))}enqueueRetryable(e){this.enqueueAndForget((()=>(this.Uc.push(e),this.Zc())))}async Zc(){if(0!==this.Uc.length){try{await this.Uc[0](),this.Uc.shift(),this.ko.reset()}catch(_){if(!mi(_))throw _;Rr("AsyncQueue","Operation failed with retryable error: "+_)}this.Uc.length>0&&this.ko.vo((()=>this.Zc()))}}Yc(e){const t=this.qc.then((()=>(this.jc=!0,e().catch((e=>{this.Qc=e,this.jc=!1;const t=function(e){let t=e.message||"";return e.stack&&(t=e.stack.includes(e.message)?e.stack:e.message+"\n"+e.stack),t}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(e);throw Dr("INTERNAL UNHANDLED ERROR: ",t),e})).then((e=>(this.jc=!1,e))))));return this.qc=t,t}enqueueAfterDelay(e,t,n){this.Jc(),this.Wc.indexOf(e)>-1&&(t=0);const r=mu.createAndSchedule(this,e,t,n,(e=>this.Xc(e)));return this.Gc.push(r),r}Jc(){this.Qc&&Mr()}verifyOperationInProgress(){}async ta(){let e;do{e=this.qc,await e}while(e!==this.qc)}ea(e){for(const t of this.Gc)if(t.timerId===e)return!0;return!1}na(e){return this.ta().then((()=>{this.Gc.sort(((e,t)=>e.targetTimeMs-t.targetTimeMs));for(const t of this.Gc)if(t.skipDelay(),"all"!==e&&t.timerId===e)break;return this.ta()}))}sa(e){this.Wc.push(e)}Xc(e){const t=this.Gc.indexOf(e);this.Gc.splice(t,1)}}function Ol(e){return function(e,t){if("object"!=typeof e||null===e)return!1;const n=e;for(const r of t)if(r in n&&"function"==typeof n[r])return!0;return!1}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(e,["next","error","complete"])}class Nl extends _l{constructor(e,t,n,r){super(e,t,n,r),this.type="firestore",this._queue=new xl,this._persistenceKey=(null==r?void 0:r.name)||"[DEFAULT]"}_terminate(){return this._firestoreClient||Pl(this),this._firestoreClient.terminate()}}function Rl(e,t){const n="object"==typeof e?e:(0,i.Mq)(),r="string"==typeof e?e:t||"(default)",o=(0,i.qX)(n,"firestore").getImmediate({identifier:r});if(!o._initialized){const e=(0,a.P0)("firestore");e&&Tl(o,...e)}return o}function Dl(e){return e._firestoreClient||Pl(e),e._firestoreClient.verifyNotTerminated(),e._firestoreClient}function Pl(e){var t;const n=e._freezeSettings(),r=function(e,t,n,r){return new vi(e,t,n,r.host,r.ssl,r.experimentalForceLongPolling,r.experimentalAutoDetectLongPolling,r.useFetchStreams)}(e._databaseId,(null===(t=e._app)||void 0===t?void 0:t.options.appId)||"",e._persistenceKey,n);e._firestoreClient=new ol(e._authCredentials,e._appCheckCredentials,e._queue,r)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Ll{constructor(e){this._byteString=e}static fromBase64String(e){try{return new Ll(Ai.fromBase64String(e))}catch(e){throw new Vr(Ur.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+e)}}static fromUint8Array(e){return new Ll(Ai.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ml{constructor(...e){for(let t=0;t<e.length;++t)if(0===e[t].length)throw new Vr(Ur.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new oi(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class jl{constructor(e){this._methodName=e}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fl{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new Vr(Ur.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new Vr(Ur.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return Yr(this._lat,e._lat)||Yr(this._long,e._long)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ul=/^__.*__$/;class Vl{constructor(e,t,n){this.data=e,this.fieldMask=t,this.fieldTransforms=n}toMutation(e,t){return null!==this.fieldMask?new Ss(e,this.data,this.fieldMask,t,this.fieldTransforms):new Is(e,this.data,t,this.fieldTransforms)}}class ql{constructor(e,t,n){this.data=e,this.fieldMask=t,this.fieldTransforms=n}toMutation(e,t){return new Ss(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function $l(e){switch(e){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw Mr()}}class Bl{constructor(e,t,n,r,i,o){this.settings=e,this.databaseId=t,this.Tt=n,this.ignoreUndefinedProperties=r,void 0===i&&this.ia(),this.fieldTransforms=i||[],this.fieldMask=o||[]}get path(){return this.settings.path}get ra(){return this.settings.ra}oa(e){return new Bl(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.Tt,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}ua(e){var t;const n=null===(t=this.path)||void 0===t?void 0:t.child(e),r=this.oa({path:n,ca:!1});return r.aa(e),r}ha(e){var t;const n=null===(t=this.path)||void 0===t?void 0:t.child(e),r=this.oa({path:n,ca:!1});return r.ia(),r}la(e){return this.oa({path:void 0,ca:!0})}fa(e){return ah(e,this.settings.methodName,this.settings.da||!1,this.path,this.settings._a)}contains(e){return void 0!==this.fieldMask.find((t=>e.isPrefixOf(t)))||void 0!==this.fieldTransforms.find((t=>e.isPrefixOf(t.field)))}ia(){if(this.path)for(let e=0;e<this.path.length;e++)this.aa(this.path.get(e))}aa(e){if(0===e.length)throw this.fa("Document fields must not be empty");if($l(this.ra)&&Ul.test(e))throw this.fa('Document fields cannot begin and end with "__"')}}class Hl{constructor(e,t,n){this.databaseId=e,this.ignoreUndefinedProperties=t,this.Tt=n||Pc(e)}wa(e,t,n,r=!1){return new Bl({ra:e,methodName:t,_a:n,path:oi.emptyPath(),ca:!1,da:r},this.databaseId,this.Tt,this.ignoreUndefinedProperties)}}function zl(e){const t=e._freezeSettings(),n=Pc(e._databaseId);return new Hl(e._databaseId,!!t.ignoreUndefinedProperties,n)}function Wl(e,t,n,r,i,o={}){const s=e.wa(o.merge||o.mergeFields?2:0,t,n,i);rh("Data must be an object, but it was:",s,r);const a=th(r,s);let c,u;if(o.merge)c=new So(s.fieldMask),u=s.fieldTransforms;else if(o.mergeFields){const e=[];for(const r of o.mergeFields){const i=ih(t,r,n);if(!s.contains(i))throw new Vr(Ur.INVALID_ARGUMENT,`Field '${i}' is specified in your field mask but missing from your input data.`);ch(e,i)||e.push(i)}c=new So(e),u=s.fieldTransforms.filter((e=>c.covers(e.field)))}else c=null,u=s.fieldTransforms;return new Vl(new ko(a),c,u)}class Kl extends jl{_toFieldTransform(e){if(2!==e.ra)throw 1===e.ra?e.fa(`${this._methodName}() can only appear at the top level of your update data`):e.fa(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof Kl}}function Gl(e,t,n){return new Bl({ra:3,_a:t.settings._a,methodName:e._methodName,ca:n},t.databaseId,t.Tt,t.ignoreUndefinedProperties)}class Jl extends jl{constructor(e,t){super(e),this.ma=t}_toFieldTransform(e){const t=Gl(this,e,!0),n=this.ma.map((e=>eh(e,t))),r=new ss(n);return new ds(e.path,r)}isEqual(e){return this===e}}class Ql extends jl{constructor(e,t){super(e),this.ma=t}_toFieldTransform(e){const t=Gl(this,e,!0),n=this.ma.map((e=>eh(e,t))),r=new cs(n);return new ds(e.path,r)}isEqual(e){return this===e}}function Xl(e,t,n,r){const i=e.wa(1,t,n);rh("Data must be an object, but it was:",i,r);const o=[],s=ko.empty();Ei(r,((e,r)=>{const c=sh(t,e,n);r=(0,a.m9)(r);const u=i.ha(c);if(r instanceof Kl)o.push(c);else{const e=eh(r,u);null!=e&&(o.push(c),s.set(c,e))}}));const c=new So(o);return new ql(s,c,i.fieldTransforms)}function Yl(e,t,n,r,i,o){const s=e.wa(1,t,n),c=[ih(t,r,n)],u=[i];if(o.length%2!=0)throw new Vr(Ur.INVALID_ARGUMENT,`Function ${t}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let a=0;a<o.length;a+=2)c.push(ih(t,o[a])),u.push(o[a+1]);const l=[],h=ko.empty();for(let d=c.length-1;d>=0;--d)if(!ch(l,c[d])){const e=c[d];let t=u[d];t=(0,a.m9)(t);const n=s.ha(e);if(t instanceof Kl)l.push(e);else{const r=eh(t,n);null!=r&&(l.push(e),h.set(e,r))}}const f=new So(l);return new ql(h,f,s.fieldTransforms)}function Zl(e,t,n,r=!1){return eh(n,e.wa(r?4:3,t))}function eh(e,t){if(nh(e=(0,a.m9)(e)))return rh("Unsupported field value:",t,e),th(e,t);if(e instanceof jl)return function(e,t){if(!$l(t.ra))throw t.fa(`${e._methodName}() can only be used with update() and set()`);if(!t.path)throw t.fa(`${e._methodName}() is not currently supported inside arrays`);const n=e._toFieldTransform(t);n&&t.fieldTransforms.push(n)}(e,t),null;if(void 0===e&&t.ignoreUndefinedProperties)return null;if(t.path&&t.fieldMask.push(t.path),e instanceof Array){if(t.settings.ca&&4!==t.ra)throw t.fa("Nested arrays are not supported");return function(e,t){const n=[];let r=0;for(const i of e){let e=eh(i,t.la(r));null==e&&(e={nullValue:"NULL_VALUE"}),n.push(e),r++}return{arrayValue:{values:n}}}(e,t)}return function(e,t){if(null===(e=(0,a.m9)(e)))return{nullValue:"NULL_VALUE"};if("number"==typeof e)return es(t.Tt,e);if("boolean"==typeof e)return{booleanValue:e};if("string"==typeof e)return{stringValue:e};if(e instanceof Date){const n=ei.fromDate(e);return{timestampValue:ua(t.Tt,n)}}if(e instanceof ei){const n=new ei(e.seconds,1e3*Math.floor(e.nanoseconds/1e3));return{timestampValue:ua(t.Tt,n)}}if(e instanceof Fl)return{geoPointValue:{latitude:e.latitude,longitude:e.longitude}};if(e instanceof Ll)return{bytesValue:la(t.Tt,e._byteString)};if(e instanceof Il){const n=t.databaseId,r=e.firestore._databaseId;if(!r.isEqual(n))throw t.fa(`Document reference is for database ${r.projectId}/${r.database} but should be for database ${n.projectId}/${n.database}`);return{referenceValue:da(e.firestore._databaseId||t.databaseId,e._key.path)}}throw t.fa(`Unsupported field value: ${wl(e)}`)}(e,t)}function th(e,t){const n={};return _i(e)?t.path&&t.path.length>0&&t.fieldMask.push(t.path):Ei(e,((e,r)=>{const i=eh(r,t.ua(e));null!=i&&(n[e]=i)})),{mapValue:{fields:n}}}function nh(e){return!("object"!=typeof e||null===e||e instanceof Array||e instanceof Date||e instanceof ei||e instanceof Fl||e instanceof Ll||e instanceof Il||e instanceof jl)}function rh(e,t,n){if(!nh(n)||!function(e){return"object"==typeof e&&null!==e&&(Object.getPrototypeOf(e)===Object.prototype||null===Object.getPrototypeOf(e))}(n)){const r=wl(n);throw"an object"===r?t.fa(e+" a custom object"):t.fa(e+" "+r)}}function ih(e,t,n){if((t=(0,a.m9)(t))instanceof Ml)return t._internalPath;if("string"==typeof t)return sh(e,t);throw ah("Field path arguments must be of type string or ",e,!1,void 0,n)}const oh=new RegExp("[~\\*/\\[\\]]");function sh(e,t,n){if(t.search(oh)>=0)throw ah(`Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`,e,!1,void 0,n);try{return new Ml(...t.split("."))._internalPath}catch(r){throw ah(`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,e,!1,void 0,n)}}function ah(e,t,n,r,i){const o=r&&!r.isEmpty(),s=void 0!==i;let a=`Function ${t}() called with invalid data`;n&&(a+=" (via `toFirestore()`)"),a+=". ";let c="";return(o||s)&&(c+=" (found",o&&(c+=` in field ${r}`),s&&(c+=` in document ${i}`),c+=")"),new Vr(Ur.INVALID_ARGUMENT,a+e+c)}function ch(e,t){return e.some((e=>e.isEqual(t)))}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uh{constructor(e,t,n,r,i){this._firestore=e,this._userDataWriter=t,this._key=n,this._document=r,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new Il(this._firestore,this._converter,this._key)}exists(){return null!==this._document}data(){if(this._document){if(this._converter){const e=new lh(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const t=this._document.data.field(hh("DocumentSnapshot.get",e));if(null!==t)return this._userDataWriter.convertValue(t)}}}class lh extends uh{data(){return super.data()}}function hh(e,t){return"string"==typeof t?sh(e,t):t instanceof Ml?t._internalPath:t._delegate._internalPath}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fh(e){if("L"===e.limitType&&0===e.explicitOrderBy.length)throw new Vr(Ur.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class dh{}class ph extends dh{}function gh(e,t,...n){let r=[];t instanceof dh&&r.push(t),r=r.concat(n),function(e){const t=e.filter((e=>e instanceof yh)).length,n=e.filter((e=>e instanceof mh)).length;if(t>1||t>0&&n>0)throw new Vr(Ur.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(r);for(const i of r)e=i._apply(e);return e}class mh extends ph{constructor(e,t,n){super(),this._field=e,this._op=t,this._value=n,this.type="where"}static _create(e,t,n){return new mh(e,t,n)}_apply(e){const t=this._parse(e);return bh(e._query,t),new Sl(e.firestore,e.converter,Bo(e._query,t))}_parse(e){const t=zl(e.firestore),n=function(e,t,n,r,i,o,s){let a;if(i.isKeyField()){if("array-contains"===o||"array-contains-any"===o)throw new Vr(Ur.INVALID_ARGUMENT,`Invalid Query. You can't perform '${o}' queries on documentId().`);if("in"===o||"not-in"===o){wh(s,o);const t=[];for(const n of s)t.push(vh(r,e,n));a={arrayValue:{values:t}}}else a=vh(r,e,s)}else"in"!==o&&"not-in"!==o&&"array-contains-any"!==o||wh(s,o),a=Zl(n,t,s,"in"===o||"not-in"===o);return to.create(i,o,a)}(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value);return n}}class yh extends dh{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new yh(e,t)}_parse(e){const t=this._queryConstraints.map((t=>t._parse(e))).filter((e=>e.getFilters().length>0));return 1===t.length?t[0]:no.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return 0===t.getFilters().length?e:(function(e,t){let n=e;const r=t.getFlattenedFilters();for(const i of r)bh(n,i),n=Bo(n,i)}(e._query,t),new Sl(e.firestore,e.converter,Bo(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return"and"===this.type?"and":"or"}}function vh(e,t,n){if("string"==typeof(n=(0,a.m9)(n))){if(""===n)throw new Vr(Ur.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!Vo(t)&&-1!==n.indexOf("/"))throw new Vr(Ur.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${n}' contains a '/' character.`);const r=t.path.child(ri.fromString(n));if(!si.isDocumentKey(r))throw new Vr(Ur.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return Bi(e,new si(r))}if(n instanceof Il)return Bi(e,n._key);throw new Vr(Ur.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${wl(n)}.`)}function wh(e,t){if(!Array.isArray(e)||0===e.length)throw new Vr(Ur.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${t.toString()}' filters.`)}function bh(e,t){if(t.isInequality()){const n=Uo(e),r=t.field;if(null!==n&&!n.isEqual(r))throw new Vr(Ur.INVALID_ARGUMENT,`Invalid query. All where filters with an inequality (<, <=, !=, not-in, >, or >=) must be on the same field. But you have inequality filters on '${n.toString()}' and '${r.toString()}'`);const i=Fo(e);null!==i&&Eh(e,r,i)}const n=function(e,t){for(const n of e)for(const e of n.getFlattenedFilters())if(t.indexOf(e.op)>=0)return e.op;return null}(e.filters,function(e){switch(e){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(t.op));if(null!==n)throw n===t.op?new Vr(Ur.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${t.op.toString()}' filter.`):new Vr(Ur.INVALID_ARGUMENT,`Invalid query. You cannot use '${t.op.toString()}' filters with '${n.toString()}' filters.`)}function Eh(e,t,n){if(!n.isEqual(t))throw new Vr(Ur.INVALID_ARGUMENT,`Invalid query. You have a where filter with an inequality (<, <=, !=, not-in, >, or >=) on field '${t.toString()}' and so you must also use '${t.toString()}' as your first argument to orderBy(), but your first orderBy() is on field '${n.toString()}' instead.`)}class _h{convertValue(e,t="none"){switch(Mi(e)){case 0:return null;case 1:return e.booleanValue;case 2:return Oi(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(Ni(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 10:return this.convertObject(e.mapValue,t);default:throw Mr()}}convertObject(e,t){const n={};return Ei(e.fields,((e,r)=>{n[e]=this.convertValue(r,t)})),n}convertGeoPoint(e){return new Fl(Oi(e.latitude),Oi(e.longitude))}convertArray(e,t){return(e.values||[]).map((e=>this.convertValue(e,t)))}convertServerTimestamp(e,t){switch(t){case"previous":const n=Di(e);return null==n?null:this.convertValue(n,t);case"estimate":return this.convertTimestamp(Pi(e));default:return null}}convertTimestamp(e){const t=xi(e);return new ei(t.seconds,t.nanos)}convertDocumentKey(e,t){const n=ri.fromString(e);jr(ja(n));const r=new wi(n.get(1),n.get(3)),i=new si(n.popFirst(5));return r.isEqual(t)||Dr(`Document ${i} contains a document reference within a different database (${r.projectId}/${r.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),i}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Th(e,t,n){let r;return r=e?n&&(n.merge||n.mergeFields)?e.toFirestore(t,n):e.toFirestore(t):t,r}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Ih{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class Sh extends uh{constructor(e,t,n,r,i,o){super(e,t,n,r,o),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new kh(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const n=this._document.data.field(hh("DocumentSnapshot.get",e));if(null!==n)return this._userDataWriter.convertValue(n,t.serverTimestamps)}}}class kh extends Sh{data(e={}){return super.data(e)}}class Ah{constructor(e,t,n,r){this._firestore=e,this._userDataWriter=t,this._snapshot=r,this.metadata=new Ih(r.hasPendingWrites,r.fromCache),this.query=n}get docs(){const e=[];return this.forEach((t=>e.push(t))),e}get size(){return this._snapshot.docs.size}get empty(){return 0===this.size}forEach(e,t){this._snapshot.docs.forEach((n=>{e.call(t,new kh(this._firestore,this._userDataWriter,n.key,n,new Ih(this._snapshot.mutatedKeys.has(n.key),this._snapshot.fromCache),this.query.converter))}))}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new Vr(Ur.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(e,t){if(e._snapshot.oldDocs.isEmpty()){let t=0;return e._snapshot.docChanges.map((n=>{const r=new kh(e._firestore,e._userDataWriter,n.doc.key,n.doc,new Ih(e._snapshot.mutatedKeys.has(n.doc.key),e._snapshot.fromCache),e.query.converter);return n.doc,{type:"added",doc:r,oldIndex:-1,newIndex:t++}}))}{let n=e._snapshot.oldDocs;return e._snapshot.docChanges.filter((e=>t||3!==e.type)).map((t=>{const r=new kh(e._firestore,e._userDataWriter,t.doc.key,t.doc,new Ih(e._snapshot.mutatedKeys.has(t.doc.key),e._snapshot.fromCache),e.query.converter);let i=-1,o=-1;return 0!==t.type&&(i=n.indexOf(t.doc.key),n=n.delete(t.doc.key)),1!==t.type&&(n=n.add(t.doc),o=n.indexOf(t.doc.key)),{type:Ch(t.type),doc:r,oldIndex:i,newIndex:o}}))}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}}function Ch(e){switch(e){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return Mr()}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function xh(e){e=bl(e,Il);const t=bl(e.firestore,Nl);return fl(Dl(t),e._key).then((n=>jh(t,e,n)))}class Oh extends _h{constructor(e){super(),this.firestore=e}convertBytes(e){return new Ll(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new Il(this.firestore,null,t)}}function Nh(e){e=bl(e,Sl);const t=bl(e.firestore,Nl),n=Dl(t),r=new Oh(t);return fh(e._query),dl(n,e._query).then((n=>new Ah(t,r,e,n)))}function Rh(e,t,n){e=bl(e,Il);const r=bl(e.firestore,Nl),i=Th(e.converter,t,n);return Mh(r,[Wl(zl(r),"setDoc",e._key,i,null!==e.converter,n).toMutation(e._key,ms.none())])}function Dh(e,t,n,...r){e=bl(e,Il);const i=bl(e.firestore,Nl),o=zl(i);let s;return s="string"==typeof(t=(0,a.m9)(t))||t instanceof Ml?Yl(o,"updateDoc",e._key,t,n,r):Xl(o,"updateDoc",e._key,t),Mh(i,[s.toMutation(e._key,ms.exists(!0))])}function Ph(e,t){const n=bl(e.firestore,Nl),r=Cl(e),i=Th(e.converter,t);return Mh(n,[Wl(zl(e.firestore),"addDoc",r._key,i,null!==e.converter,{}).toMutation(r._key,ms.exists(!1))]).then((()=>r))}function Lh(e,...t){var n,r,i;e=(0,a.m9)(e);let o={includeMetadataChanges:!1},s=0;"object"!=typeof t[s]||Ol(t[s])||(o=t[s],s++);const c={includeMetadataChanges:o.includeMetadataChanges};if(Ol(t[s])){const e=t[s];t[s]=null===(n=e.next)||void 0===n?void 0:n.bind(e),t[s+1]=null===(r=e.error)||void 0===r?void 0:r.bind(e),t[s+2]=null===(i=e.complete)||void 0===i?void 0:i.bind(e)}let u,l,h;if(e instanceof Il)l=bl(e.firestore,Nl),h=Mo(e._key.path),u={next:n=>{t[s]&&t[s](jh(l,e,n))},error:t[s+1],complete:t[s+2]};else{const n=bl(e,Sl);l=bl(n.firestore,Nl),h=n._query;const r=new Oh(l);u={next:e=>{t[s]&&t[s](new Ah(l,r,n,e))},error:t[s+1],complete:t[s+2]},fh(e._query)}return function(e,t,n,r){const i=new il(r),o=new Cu(t,i,n);return e.asyncQueue.enqueueAndForget((async()=>Tu(await hl(e),o))),()=>{i.Pc(),e.asyncQueue.enqueueAndForget((async()=>Iu(await hl(e),o)))}}(Dl(l),h,c,u)}function Mh(e,t){return function(e,t){const n=new qr;return e.asyncQueue.enqueueAndForget((async()=>Fu(await ll(e),t,n))),n.promise}(Dl(e),t)}function jh(e,t,n){const r=n.docs.get(t._key),i=new Oh(e);return new Sh(e,i,t._key,r,new Ih(n.hasPendingWrites,n.fromCache),t.converter)}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Fh{constructor(e,t){this._firestore=e,this._commitHandler=t,this._mutations=[],this._committed=!1,this._dataReader=zl(e)}set(e,t,n){this._verifyNotCommitted();const r=Uh(e,this._firestore),i=Th(r.converter,t,n),o=Wl(this._dataReader,"WriteBatch.set",r._key,i,null!==r.converter,n);return this._mutations.push(o.toMutation(r._key,ms.none())),this}update(e,t,n,...r){this._verifyNotCommitted();const i=Uh(e,this._firestore);let o;return o="string"==typeof(t=(0,a.m9)(t))||t instanceof Ml?Yl(this._dataReader,"WriteBatch.update",i._key,t,n,r):Xl(this._dataReader,"WriteBatch.update",i._key,t),this._mutations.push(o.toMutation(i._key,ms.exists(!0))),this}delete(e){this._verifyNotCommitted();const t=Uh(e,this._firestore);return this._mutations=this._mutations.concat(new xs(t._key,ms.none())),this}commit(){return this._verifyNotCommitted(),this._committed=!0,this._mutations.length>0?this._commitHandler(this._mutations):Promise.resolve()}_verifyNotCommitted(){if(this._committed)throw new Vr(Ur.FAILED_PRECONDITION,"A write batch can no longer be used after commit() has been called.")}}function Uh(e,t){if((e=(0,a.m9)(e)).firestore!==t)throw new Vr(Ur.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return e}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vh(...e){return new Jl("arrayUnion",e)}function qh(...e){return new Ql("arrayRemove",e)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function $h(e){return Dl(e=bl(e,Nl)),new Fh(e,(t=>Mh(e,t)))
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */}!function(e,t=!0){!function(e){xr=e}(i.Jn),(0,i.Xd)(new o.wA("firestore",((e,{instanceIdentifier:n,options:r})=>{const i=e.getProvider("app").getImmediate(),o=new Nl(new zr(e.getProvider("auth-internal")),new Jr(e.getProvider("app-check-internal")),function(e,t){if(!Object.prototype.hasOwnProperty.apply(e.options,["projectId"]))throw new Vr(Ur.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new wi(e.options.projectId,t)}(i,n),i);return r=Object.assign({useFetchStreams:t},r),o._setSettings(r),o}),"PUBLIC").setMultipleInstances(!0)),(0,i.KN)(Ar,"3.8.4",e),(0,i.KN)(Ar,"3.8.4","esm2017")}()},3831:function(e,t,n){"use strict";n.d(t,{X3:function(){return E}});n(2801);const r=(e,t)=>t.some((t=>e instanceof t));let i,o;function s(){return i||(i=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function a(){return o||(o=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const c=new WeakMap,u=new WeakMap,l=new WeakMap,h=new WeakMap,f=new WeakMap;function d(e){const t=new Promise(((t,n)=>{const r=()=>{e.removeEventListener("success",i),e.removeEventListener("error",o)},i=()=>{t(w(e.result)),r()},o=()=>{n(e.error),r()};e.addEventListener("success",i),e.addEventListener("error",o)}));return t.then((t=>{t instanceof IDBCursor&&c.set(t,e)})).catch((()=>{})),f.set(t,e),t}function p(e){if(u.has(e))return;const t=new Promise(((t,n)=>{const r=()=>{e.removeEventListener("complete",i),e.removeEventListener("error",o),e.removeEventListener("abort",o)},i=()=>{t(),r()},o=()=>{n(e.error||new DOMException("AbortError","AbortError")),r()};e.addEventListener("complete",i),e.addEventListener("error",o),e.addEventListener("abort",o)}));u.set(e,t)}let g={get(e,t,n){if(e instanceof IDBTransaction){if("done"===t)return u.get(e);if("objectStoreNames"===t)return e.objectStoreNames||l.get(e);if("store"===t)return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return w(e[t])},set(e,t,n){return e[t]=n,!0},has(e,t){return e instanceof IDBTransaction&&("done"===t||"store"===t)||t in e}};function m(e){g=e(g)}function y(e){return e!==IDBDatabase.prototype.transaction||"objectStoreNames"in IDBTransaction.prototype?a().includes(e)?function(...t){return e.apply(b(this),t),w(c.get(this))}:function(...t){return w(e.apply(b(this),t))}:function(t,...n){const r=e.call(b(this),t,...n);return l.set(r,t.sort?t.sort():[t]),w(r)}}function v(e){return"function"===typeof e?y(e):(e instanceof IDBTransaction&&p(e),r(e,s())?new Proxy(e,g):e)}function w(e){if(e instanceof IDBRequest)return d(e);if(h.has(e))return h.get(e);const t=v(e);return t!==e&&(h.set(e,t),f.set(t,e)),t}const b=e=>f.get(e);function E(e,t,{blocked:n,upgrade:r,blocking:i,terminated:o}={}){const s=indexedDB.open(e,t),a=w(s);return r&&s.addEventListener("upgradeneeded",(e=>{r(w(s.result),e.oldVersion,e.newVersion,w(s.transaction))})),n&&s.addEventListener("blocked",(()=>n())),a.then((e=>{o&&e.addEventListener("close",(()=>o())),i&&e.addEventListener("versionchange",(()=>i()))})).catch((()=>{})),a}const _=["get","getKey","getAll","getAllKeys","count"],T=["put","add","delete","clear"],I=new Map;function S(e,t){if(!(e instanceof IDBDatabase)||t in e||"string"!==typeof t)return;if(I.get(t))return I.get(t);const n=t.replace(/FromIndex$/,""),r=t!==n,i=T.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!i&&!_.includes(n))return;const o=async function(e,...t){const o=this.transaction(e,i?"readwrite":"readonly");let s=o.store;return r&&(s=s.index(t.shift())),(await Promise.all([s[n](...t),i&&o.done]))[0]};return I.set(t,o),o}m((e=>({...e,get:(t,n,r)=>S(t,n)||e.get(t,n,r),has:(t,n)=>!!S(t,n)||e.has(t,n)})))},1020:function(e,t,n){"use strict";n.d(t,{WB:function(){return he},Q_:function(){return Te}});n(7658),n(541);var r=n(4870),i=n(3396),o=!1;function s(e,t,n){return Array.isArray(e)?(e.length=Math.max(e.length,t),e.splice(t,1,n),n):(e[t]=n,n)}function a(){return c().__VUE_DEVTOOLS_GLOBAL_HOOK__}function c(){return"undefined"!==typeof navigator&&"undefined"!==typeof window?window:"undefined"!==typeof n.g?n.g:{}}const u="function"===typeof Proxy,l="devtools-plugin:setup",h="plugin:settings:set";let f,d,p;function g(){var e;return void 0!==f||("undefined"!==typeof window&&window.performance?(f=!0,d=window.performance):"undefined"!==typeof n.g&&(null===(e=n.g.perf_hooks)||void 0===e?void 0:e.performance)?(f=!0,d=n.g.perf_hooks.performance):f=!1),f}function m(){return g()?d.now():Date.now()}class y{constructor(e,t){this.target=null,this.targetQueue=[],this.onQueue=[],this.plugin=e,this.hook=t;const n={};if(e.settings)for(const s in e.settings){const t=e.settings[s];n[s]=t.defaultValue}const r=`__vue-devtools-plugin-settings__${e.id}`;let i=Object.assign({},n);try{const e=localStorage.getItem(r),t=JSON.parse(e);Object.assign(i,t)}catch(o){}this.fallbacks={getSettings(){return i},setSettings(e){try{localStorage.setItem(r,JSON.stringify(e))}catch(o){}i=e},now(){return m()}},t&&t.on(h,((e,t)=>{e===this.plugin.id&&this.fallbacks.setSettings(t)})),this.proxiedOn=new Proxy({},{get:(e,t)=>this.target?this.target.on[t]:(...e)=>{this.onQueue.push({method:t,args:e})}}),this.proxiedTarget=new Proxy({},{get:(e,t)=>this.target?this.target[t]:"on"===t?this.proxiedOn:Object.keys(this.fallbacks).includes(t)?(...e)=>(this.targetQueue.push({method:t,args:e,resolve:()=>{}}),this.fallbacks[t](...e)):(...e)=>new Promise((n=>{this.targetQueue.push({method:t,args:e,resolve:n})}))})}async setRealTarget(e){this.target=e;for(const t of this.onQueue)this.target.on[t.method](...t.args);for(const t of this.targetQueue)t.resolve(await this.target[t.method](...t.args))}}function v(e,t){const n=e,r=c(),i=a(),o=u&&n.enableEarlyProxy;if(!i||!r.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__&&o){const e=o?new y(n,i):null,s=r.__VUE_DEVTOOLS_PLUGINS__=r.__VUE_DEVTOOLS_PLUGINS__||[];s.push({pluginDescriptor:n,setupFn:t,proxy:e}),e&&t(e.proxiedTarget)}else i.emit(l,e,t)}const w=e=>p=e,b=Symbol();function E(e){return e&&"object"===typeof e&&"[object Object]"===Object.prototype.toString.call(e)&&"function"!==typeof e.toJSON}var _;(function(e){e["direct"]="direct",e["patchObject"]="patch object",e["patchFunction"]="patch function"})(_||(_={}));const T="undefined"!==typeof window,I=!1,S=(()=>"object"===typeof window&&window.window===window?window:"object"===typeof self&&self.self===self?self:"object"===typeof global&&global.global===global?global:"object"===typeof globalThis?globalThis:{HTMLElement:null})();function k(e,{autoBom:t=!1}={}){return t&&/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type)?new Blob([String.fromCharCode(65279),e],{type:e.type}):e}function A(e,t,n){const r=new XMLHttpRequest;r.open("GET",e),r.responseType="blob",r.onload=function(){R(r.response,t,n)},r.onerror=function(){console.error("could not download file")},r.send()}function C(e){const t=new XMLHttpRequest;t.open("HEAD",e,!1);try{t.send()}catch(n){}return t.status>=200&&t.status<=299}function x(e){try{e.dispatchEvent(new MouseEvent("click"))}catch(t){const n=document.createEvent("MouseEvents");n.initMouseEvent("click",!0,!0,window,0,0,0,80,20,!1,!1,!1,!1,0,null),e.dispatchEvent(n)}}const O="object"===typeof navigator?navigator:{userAgent:""},N=(()=>/Macintosh/.test(O.userAgent)&&/AppleWebKit/.test(O.userAgent)&&!/Safari/.test(O.userAgent))(),R=T?"undefined"!==typeof HTMLAnchorElement&&"download"in HTMLAnchorElement.prototype&&!N?D:"msSaveOrOpenBlob"in O?P:L:()=>{};function D(e,t="download",n){const r=document.createElement("a");r.download=t,r.rel="noopener","string"===typeof e?(r.href=e,r.origin!==location.origin?C(r.href)?A(e,t,n):(r.target="_blank",x(r)):x(r)):(r.href=URL.createObjectURL(e),setTimeout((function(){URL.revokeObjectURL(r.href)}),4e4),setTimeout((function(){x(r)}),0))}function P(e,t="download",n){if("string"===typeof e)if(C(e))A(e,t,n);else{const t=document.createElement("a");t.href=e,t.target="_blank",setTimeout((function(){x(t)}))}else navigator.msSaveOrOpenBlob(k(e,n),t)}function L(e,t,n,r){if(r=r||open("","_blank"),r&&(r.document.title=r.document.body.innerText="downloading..."),"string"===typeof e)return A(e,t,n);const i="application/octet-stream"===e.type,o=/constructor/i.test(String(S.HTMLElement))||"safari"in S,s=/CriOS\/[\d]+/.test(navigator.userAgent);if((s||i&&o||N)&&"undefined"!==typeof FileReader){const t=new FileReader;t.onloadend=function(){let e=t.result;if("string"!==typeof e)throw r=null,new Error("Wrong reader.result type");e=s?e:e.replace(/^data:[^;]*;/,"data:attachment/file;"),r?r.location.href=e:location.assign(e),r=null},t.readAsDataURL(e)}else{const t=URL.createObjectURL(e);r?r.location.assign(t):location.href=t,r=null,setTimeout((function(){URL.revokeObjectURL(t)}),4e4)}}function M(e,t){const n="🍍 "+e;"function"===typeof __VUE_DEVTOOLS_TOAST__?__VUE_DEVTOOLS_TOAST__(n,t):"error"===t?console.error(n):"warn"===t?console.warn(n):console.log(n)}function j(e){return"_a"in e&&"install"in e}function F(){if(!("clipboard"in navigator))return M("Your browser doesn't support the Clipboard API","error"),!0}function U(e){return!!(e instanceof Error&&e.message.toLowerCase().includes("document is not focused"))&&(M('You need to activate the "Emulate a focused page" setting in the "Rendering" panel of devtools.',"warn"),!0)}async function V(e){if(!F())try{await navigator.clipboard.writeText(JSON.stringify(e.state.value)),M("Global state copied to clipboard.")}catch(t){if(U(t))return;M("Failed to serialize the state. Check the console for more details.","error"),console.error(t)}}async function q(e){if(!F())try{e.state.value=JSON.parse(await navigator.clipboard.readText()),M("Global state pasted from clipboard.")}catch(t){if(U(t))return;M("Failed to deserialize the state from clipboard. Check the console for more details.","error"),console.error(t)}}async function $(e){try{R(new Blob([JSON.stringify(e.state.value)],{type:"text/plain;charset=utf-8"}),"pinia-state.json")}catch(t){M("Failed to export the state as JSON. Check the console for more details.","error"),console.error(t)}}let B;function H(){function e(){return new Promise(((e,t)=>{B.onchange=async()=>{const t=B.files;if(!t)return e(null);const n=t.item(0);return e(n?{text:await n.text(),file:n}:null)},B.oncancel=()=>e(null),B.onerror=t,B.click()}))}return B||(B=document.createElement("input"),B.type="file",B.accept=".json"),e}async function z(e){try{const t=await H(),n=await t();if(!n)return;const{text:r,file:i}=n;e.state.value=JSON.parse(r),M(`Global state imported from "${i.name}".`)}catch(t){M("Failed to export the state as JSON. Check the console for more details.","error"),console.error(t)}}function W(e){return{_custom:{display:e}}}const K="🍍 Pinia (root)",G="_root";function J(e){return j(e)?{id:G,label:K}:{id:e.$id,label:e.$id}}function Q(e){if(j(e)){const t=Array.from(e._s.keys()),n=e._s,r={state:t.map((t=>({editable:!0,key:t,value:e.state.value[t]}))),getters:t.filter((e=>n.get(e)._getters)).map((e=>{const t=n.get(e);return{editable:!1,key:e,value:t._getters.reduce(((e,n)=>(e[n]=t[n],e)),{})}}))};return r}const t={state:Object.keys(e.$state).map((t=>({editable:!0,key:t,value:e.$state[t]})))};return e._getters&&e._getters.length&&(t.getters=e._getters.map((t=>({editable:!1,key:t,value:e[t]})))),e._customProperties.size&&(t.customProperties=Array.from(e._customProperties).map((t=>({editable:!0,key:t,value:e[t]})))),t}function X(e){return e?Array.isArray(e)?e.reduce(((e,t)=>(e.keys.push(t.key),e.operations.push(t.type),e.oldValue[t.key]=t.oldValue,e.newValue[t.key]=t.newValue,e)),{oldValue:{},keys:[],operations:[],newValue:{}}):{operation:W(e.type),key:W(e.key),oldValue:e.oldValue,newValue:e.newValue}:{}}function Y(e){switch(e){case _.direct:return"mutation";case _.patchFunction:return"$patch";case _.patchObject:return"$patch";default:return"unknown"}}let Z=!0;const ee=[],te="pinia:mutations",ne="pinia",{assign:re}=Object,ie=e=>"🍍 "+e;function oe(e,t){v({id:"dev.esm.pinia",label:"Pinia 🍍",logo:"https://pinia.vuejs.org/logo.svg",packageName:"pinia",homepage:"https://pinia.vuejs.org",componentStateTypes:ee,app:e},(n=>{"function"!==typeof n.now&&M("You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html."),n.addTimelineLayer({id:te,label:"Pinia 🍍",color:15064968}),n.addInspector({id:ne,label:"Pinia 🍍",icon:"storage",treeFilterPlaceholder:"Search stores",actions:[{icon:"content_copy",action:()=>{V(t)},tooltip:"Serialize and copy the state"},{icon:"content_paste",action:async()=>{await q(t),n.sendInspectorTree(ne),n.sendInspectorState(ne)},tooltip:"Replace the state with the content of your clipboard"},{icon:"save",action:()=>{$(t)},tooltip:"Save the state as a JSON file"},{icon:"folder_open",action:async()=>{await z(t),n.sendInspectorTree(ne),n.sendInspectorState(ne)},tooltip:"Import the state from a JSON file"}],nodeActions:[{icon:"restore",tooltip:"Reset the state (option store only)",action:e=>{const n=t._s.get(e);n?n._isOptionsAPI?(n.$reset(),M(`Store "${e}" reset.`)):M(`Cannot reset "${e}" store because it's a setup store.`,"warn"):M(`Cannot reset "${e}" store because it wasn't found.`,"warn")}}]}),n.on.inspectComponent(((e,t)=>{const n=e.componentInstance&&e.componentInstance.proxy;if(n&&n._pStores){const t=e.componentInstance.proxy._pStores;Object.values(t).forEach((t=>{e.instanceData.state.push({type:ie(t.$id),key:"state",editable:!0,value:t._isOptionsAPI?{_custom:{value:(0,r.IU)(t.$state),actions:[{icon:"restore",tooltip:"Reset the state of this store",action:()=>t.$reset()}]}}:Object.keys(t.$state).reduce(((e,n)=>(e[n]=t.$state[n],e)),{})}),t._getters&&t._getters.length&&e.instanceData.state.push({type:ie(t.$id),key:"getters",editable:!1,value:t._getters.reduce(((e,n)=>{try{e[n]=t[n]}catch(r){e[n]=r}return e}),{})})}))}})),n.on.getInspectorTree((n=>{if(n.app===e&&n.inspectorId===ne){let e=[t];e=e.concat(Array.from(t._s.values())),n.rootNodes=(n.filter?e.filter((e=>"$id"in e?e.$id.toLowerCase().includes(n.filter.toLowerCase()):K.toLowerCase().includes(n.filter.toLowerCase()))):e).map(J)}})),n.on.getInspectorState((n=>{if(n.app===e&&n.inspectorId===ne){const e=n.nodeId===G?t:t._s.get(n.nodeId);if(!e)return;e&&(n.state=Q(e))}})),n.on.editInspectorState(((n,r)=>{if(n.app===e&&n.inspectorId===ne){const e=n.nodeId===G?t:t._s.get(n.nodeId);if(!e)return M(`store "${n.nodeId}" not found`,"error");const{path:r}=n;j(e)?r.unshift("state"):1===r.length&&e._customProperties.has(r[0])&&!(r[0]in e.$state)||r.unshift("$state"),Z=!1,n.set(e,r,n.state.value),Z=!0}})),n.on.editComponentState((e=>{if(e.type.startsWith("🍍")){const n=e.type.replace(/^🍍\s*/,""),r=t._s.get(n);if(!r)return M(`store "${n}" not found`,"error");const{path:i}=e;if("state"!==i[0])return M(`Invalid path for store "${n}":\n${i}\nOnly state can be modified.`);i[0]="$state",Z=!1,e.set(r,i,e.state.value),Z=!0}}))}))}function se(e,t){ee.includes(ie(t.$id))||ee.push(ie(t.$id)),v({id:"dev.esm.pinia",label:"Pinia 🍍",logo:"https://pinia.vuejs.org/logo.svg",packageName:"pinia",homepage:"https://pinia.vuejs.org",componentStateTypes:ee,app:e,settings:{logStoreChanges:{label:"Notify about new/deleted stores",type:"boolean",defaultValue:!0}}},(e=>{const n="function"===typeof e.now?e.now.bind(e):Date.now;t.$onAction((({after:r,onError:i,name:o,args:s})=>{const a=ce++;e.addTimelineEvent({layerId:te,event:{time:n(),title:"🛫 "+o,subtitle:"start",data:{store:W(t.$id),action:W(o),args:s},groupId:a}}),r((r=>{ae=void 0,e.addTimelineEvent({layerId:te,event:{time:n(),title:"🛬 "+o,subtitle:"end",data:{store:W(t.$id),action:W(o),args:s,result:r},groupId:a}})})),i((r=>{ae=void 0,e.addTimelineEvent({layerId:te,event:{time:n(),logType:"error",title:"💥 "+o,subtitle:"end",data:{store:W(t.$id),action:W(o),args:s,error:r},groupId:a}})}))}),!0),t._customProperties.forEach((o=>{(0,i.YP)((()=>(0,r.SU)(t[o])),((t,r)=>{e.notifyComponentUpdate(),e.sendInspectorState(ne),Z&&e.addTimelineEvent({layerId:te,event:{time:n(),title:"Change",subtitle:o,data:{newValue:t,oldValue:r},groupId:ae}})}),{deep:!0})})),t.$subscribe((({events:r,type:i},o)=>{if(e.notifyComponentUpdate(),e.sendInspectorState(ne),!Z)return;const s={time:n(),title:Y(i),data:re({store:W(t.$id)},X(r)),groupId:ae};ae=void 0,i===_.patchFunction?s.subtitle="⤵️":i===_.patchObject?s.subtitle="🧩":r&&!Array.isArray(r)&&(s.subtitle=r.type),r&&(s.data["rawEvent(s)"]={_custom:{display:"DebuggerEvent",type:"object",tooltip:"raw DebuggerEvent[]",value:r}}),e.addTimelineEvent({layerId:te,event:s})}),{detached:!0,flush:"sync"});const o=t._hotUpdate;t._hotUpdate=(0,r.Xl)((r=>{o(r),e.addTimelineEvent({layerId:te,event:{time:n(),title:"🔥 "+t.$id,subtitle:"HMR update",data:{store:W(t.$id),info:W("HMR update")}}}),e.notifyComponentUpdate(),e.sendInspectorTree(ne),e.sendInspectorState(ne)}));const{$dispose:s}=t;t.$dispose=()=>{s(),e.notifyComponentUpdate(),e.sendInspectorTree(ne),e.sendInspectorState(ne),e.getSettings().logStoreChanges&&M(`Disposed "${t.$id}" store 🗑`)},e.notifyComponentUpdate(),e.sendInspectorTree(ne),e.sendInspectorState(ne),e.getSettings().logStoreChanges&&M(`"${t.$id}" store installed 🆕`)}))}let ae,ce=0;function ue(e,t){const n=t.reduce(((t,n)=>(t[n]=(0,r.IU)(e)[n],t)),{});for(const r in n)e[r]=function(){const t=ce,i=new Proxy(e,{get(...e){return ae=t,Reflect.get(...e)},set(...e){return ae=t,Reflect.set(...e)}});return n[r].apply(i,arguments)}}function le({app:e,store:t,options:n}){if(!t.$id.startsWith("__hot:")){if(n.state&&(t._isOptionsAPI=!0),"function"===typeof n.state){ue(t,Object.keys(n.actions));const e=t._hotUpdate;(0,r.IU)(t)._hotUpdate=function(n){e.apply(this,arguments),ue(t,Object.keys(n._hmrPayload.actions))}}se(e,t)}}function he(){const e=(0,r.B)(!0),t=e.run((()=>(0,r.iH)({})));let n=[],i=[];const s=(0,r.Xl)({install(e){w(s),o||(s._a=e,e.provide(b,s),e.config.globalProperties.$pinia=s,I&&oe(e,s),i.forEach((e=>n.push(e))),i=[])},use(e){return this._a||o?n.push(e):i.push(e),this},_p:n,_a:null,_e:e,_s:new Map,state:t});return I&&"undefined"!==typeof Proxy&&s.use(le),s}const fe=()=>{};function de(e,t,n,i=fe){e.push(t);const o=()=>{const n=e.indexOf(t);n>-1&&(e.splice(n,1),i())};return!n&&(0,r.nZ)()&&(0,r.EB)(o),o}function pe(e,...t){e.slice().forEach((e=>{e(...t)}))}function ge(e,t){e instanceof Map&&t instanceof Map&&t.forEach(((t,n)=>e.set(n,t))),e instanceof Set&&t instanceof Set&&t.forEach(e.add,e);for(const n in t){if(!t.hasOwnProperty(n))continue;const i=t[n],o=e[n];E(o)&&E(i)&&e.hasOwnProperty(n)&&!(0,r.dq)(i)&&!(0,r.PG)(i)?e[n]=ge(o,i):e[n]=i}return e}const me=Symbol(),ye=new WeakMap;function ve(e){return o?!ye.has(e):!E(e)||!e.hasOwnProperty(me)}const{assign:we}=Object;function be(e){return!(!(0,r.dq)(e)||!e.effect)}function Ee(e,t,n,a){const{state:c,actions:u,getters:l}=t,h=n.state.value[e];let f;function d(){h||(o?s(n.state.value,e,c?c():{}):n.state.value[e]=c?c():{});const t=(0,r.BK)(n.state.value[e]);return we(t,u,Object.keys(l||{}).reduce(((t,s)=>(t[s]=(0,r.Xl)((0,i.Fl)((()=>{w(n);const t=n._s.get(e);if(!o||t._r)return l[s].call(t,t)}))),t)),{}))}return f=_e(e,d,t,n,a,!0),f}function _e(e,t,n={},a,c,u){let l;const h=we({actions:{}},n);const f={deep:!0};let d,p;let g,m=(0,r.Xl)([]),y=(0,r.Xl)([]);const v=a.state.value[e];u||v||(o?s(a.state.value,e,{}):a.state.value[e]={});const b=(0,r.iH)({});let E;function T(t){let n;d=p=!1,"function"===typeof t?(t(a.state.value[e]),n={type:_.patchFunction,storeId:e,events:g}):(ge(a.state.value[e],t),n={type:_.patchObject,payload:t,storeId:e,events:g});const r=E=Symbol();(0,i.Y3)().then((()=>{E===r&&(d=!0)})),p=!0,pe(m,n,a.state.value[e])}const S=u?function(){const{state:e}=n,t=e?e():{};this.$patch((e=>{we(e,t)}))}:fe;function k(){l.stop(),m=[],y=[],a._s.delete(e)}function A(t,n){return function(){w(a);const r=Array.from(arguments),i=[],o=[];function s(e){i.push(e)}function c(e){o.push(e)}let u;pe(y,{args:r,name:t,store:O,after:s,onError:c});try{u=n.apply(this&&this.$id===e?this:O,r)}catch(l){throw pe(o,l),l}return u instanceof Promise?u.then((e=>(pe(i,e),e))).catch((e=>(pe(o,e),Promise.reject(e)))):(pe(i,u),u)}}const C=(0,r.Xl)({actions:{},getters:{},state:[],hotState:b}),x={_p:a,$id:e,$onAction:de.bind(null,y),$patch:T,$reset:S,$subscribe(t,n={}){const r=de(m,t,n.detached,(()=>o())),o=l.run((()=>(0,i.YP)((()=>a.state.value[e]),(r=>{("sync"===n.flush?p:d)&&t({storeId:e,type:_.direct,events:g},r)}),we({},f,n))));return r},$dispose:k};o&&(x._r=!1);const O=(0,r.qj)(I?we({_hmrPayload:C,_customProperties:(0,r.Xl)(new Set)},x):x);a._s.set(e,O);const N=a._e.run((()=>(l=(0,r.B)(),l.run((()=>t())))));for(const i in N){const t=N[i];if((0,r.dq)(t)&&!be(t)||(0,r.PG)(t))u||(v&&ve(t)&&((0,r.dq)(t)?t.value=v[i]:ge(t,v[i])),o?s(a.state.value[e],i,t):a.state.value[e][i]=t);else if("function"===typeof t){const e=A(i,t);o?s(N,i,e):N[i]=e,h.actions[i]=t}else 0}if(o?Object.keys(N).forEach((e=>{s(O,e,N[e])})):(we(O,N),we((0,r.IU)(O),N)),Object.defineProperty(O,"$state",{get:()=>a.state.value[e],set:e=>{T((t=>{we(t,e)}))}}),I){const e={writable:!0,configurable:!0,enumerable:!1};["_p","_hmrPayload","_getters","_customProperties"].forEach((t=>{Object.defineProperty(O,t,we({value:O[t]},e))}))}return o&&(O._r=!0),a._p.forEach((e=>{if(I){const t=l.run((()=>e({store:O,app:a._a,pinia:a,options:h})));Object.keys(t||{}).forEach((e=>O._customProperties.add(e))),we(O,t)}else we(O,l.run((()=>e({store:O,app:a._a,pinia:a,options:h}))))})),v&&u&&n.hydrate&&n.hydrate(O.$state,v),d=!0,p=!0,O}function Te(e,t,n){let r,o;const s="function"===typeof t;function a(e,n){const a=(0,i.FN)();e=e||a&&(0,i.f3)(b,null),e&&w(e),e=p,e._s.has(r)||(s?_e(r,t,o,e):Ee(r,o,e));const c=e._s.get(r);return c}return"string"===typeof e?(r=e,o=s?n:t):(o=e,r=e.id),a.$id=r,a}},2483:function(e,t,n){"use strict";n.d(t,{PO:function(){return U},p7:function(){return tt}});n(7658),n(541);var r=n(3396),i=n(4870);
/*!
  * vue-router v4.1.6
  * (c) 2022 Eduardo San Martin Morote
  * @license MIT
  */
const o="undefined"!==typeof window;function s(e){return e.__esModule||"Module"===e[Symbol.toStringTag]}const a=Object.assign;function c(e,t){const n={};for(const r in t){const i=t[r];n[r]=l(i)?i.map(e):e(i)}return n}const u=()=>{},l=Array.isArray;const h=/\/$/,f=e=>e.replace(h,"");function d(e,t,n="/"){let r,i={},o="",s="";const a=t.indexOf("#");let c=t.indexOf("?");return a<c&&a>=0&&(c=-1),c>-1&&(r=t.slice(0,c),o=t.slice(c+1,a>-1?a:t.length),i=e(o)),a>-1&&(r=r||t.slice(0,a),s=t.slice(a,t.length)),r=E(null!=r?r:t,n),{fullPath:r+(o&&"?")+o+s,path:r,query:i,hash:s}}function p(e,t){const n=t.query?e(t.query):"";return t.path+(n&&"?")+n+(t.hash||"")}function g(e,t){return t&&e.toLowerCase().startsWith(t.toLowerCase())?e.slice(t.length)||"/":e}function m(e,t,n){const r=t.matched.length-1,i=n.matched.length-1;return r>-1&&r===i&&y(t.matched[r],n.matched[i])&&v(t.params,n.params)&&e(t.query)===e(n.query)&&t.hash===n.hash}function y(e,t){return(e.aliasOf||e)===(t.aliasOf||t)}function v(e,t){if(Object.keys(e).length!==Object.keys(t).length)return!1;for(const n in e)if(!w(e[n],t[n]))return!1;return!0}function w(e,t){return l(e)?b(e,t):l(t)?b(t,e):e===t}function b(e,t){return l(t)?e.length===t.length&&e.every(((e,n)=>e===t[n])):1===e.length&&e[0]===t}function E(e,t){if(e.startsWith("/"))return e;if(!e)return t;const n=t.split("/"),r=e.split("/");let i,o,s=n.length-1;for(i=0;i<r.length;i++)if(o=r[i],"."!==o){if(".."!==o)break;s>1&&s--}return n.slice(0,s).join("/")+"/"+r.slice(i-(i===r.length?1:0)).join("/")}var _,T;(function(e){e["pop"]="pop",e["push"]="push"})(_||(_={})),function(e){e["back"]="back",e["forward"]="forward",e["unknown"]=""}(T||(T={}));function I(e){if(!e)if(o){const t=document.querySelector("base");e=t&&t.getAttribute("href")||"/",e=e.replace(/^\w+:\/\/[^\/]+/,"")}else e="/";return"/"!==e[0]&&"#"!==e[0]&&(e="/"+e),f(e)}const S=/^[^#]+#/;function k(e,t){return e.replace(S,"#")+t}function A(e,t){const n=document.documentElement.getBoundingClientRect(),r=e.getBoundingClientRect();return{behavior:t.behavior,left:r.left-n.left-(t.left||0),top:r.top-n.top-(t.top||0)}}const C=()=>({left:window.pageXOffset,top:window.pageYOffset});function x(e){let t;if("el"in e){const n=e.el,r="string"===typeof n&&n.startsWith("#");0;const i="string"===typeof n?r?document.getElementById(n.slice(1)):document.querySelector(n):n;if(!i)return;t=A(i,e)}else t=e;"scrollBehavior"in document.documentElement.style?window.scrollTo(t):window.scrollTo(null!=t.left?t.left:window.pageXOffset,null!=t.top?t.top:window.pageYOffset)}function O(e,t){const n=history.state?history.state.position-t:-1;return n+e}const N=new Map;function R(e,t){N.set(e,t)}function D(e){const t=N.get(e);return N.delete(e),t}let P=()=>location.protocol+"//"+location.host;function L(e,t){const{pathname:n,search:r,hash:i}=t,o=e.indexOf("#");if(o>-1){let t=i.includes(e.slice(o))?e.slice(o).length:1,n=i.slice(t);return"/"!==n[0]&&(n="/"+n),g(n,"")}const s=g(n,e);return s+r+i}function M(e,t,n,r){let i=[],o=[],s=null;const c=({state:o})=>{const a=L(e,location),c=n.value,u=t.value;let l=0;if(o){if(n.value=a,t.value=o,s&&s===c)return void(s=null);l=u?o.position-u.position:0}else r(a);i.forEach((e=>{e(n.value,c,{delta:l,type:_.pop,direction:l?l>0?T.forward:T.back:T.unknown})}))};function u(){s=n.value}function l(e){i.push(e);const t=()=>{const t=i.indexOf(e);t>-1&&i.splice(t,1)};return o.push(t),t}function h(){const{history:e}=window;e.state&&e.replaceState(a({},e.state,{scroll:C()}),"")}function f(){for(const e of o)e();o=[],window.removeEventListener("popstate",c),window.removeEventListener("beforeunload",h)}return window.addEventListener("popstate",c),window.addEventListener("beforeunload",h),{pauseListeners:u,listen:l,destroy:f}}function j(e,t,n,r=!1,i=!1){return{back:e,current:t,forward:n,replaced:r,position:window.history.length,scroll:i?C():null}}function F(e){const{history:t,location:n}=window,r={value:L(e,n)},i={value:t.state};function o(r,o,s){const a=e.indexOf("#"),c=a>-1?(n.host&&document.querySelector("base")?e:e.slice(a))+r:P()+e+r;try{t[s?"replaceState":"pushState"](o,"",c),i.value=o}catch(u){console.error(u),n[s?"replace":"assign"](c)}}function s(e,n){const s=a({},t.state,j(i.value.back,e,i.value.forward,!0),n,{position:i.value.position});o(e,s,!0),r.value=e}function c(e,n){const s=a({},i.value,t.state,{forward:e,scroll:C()});o(s.current,s,!0);const c=a({},j(r.value,e,null),{position:s.position+1},n);o(e,c,!1),r.value=e}return i.value||o(r.value,{back:null,current:r.value,forward:null,position:t.length-1,replaced:!0,scroll:null},!0),{location:r,state:i,push:c,replace:s}}function U(e){e=I(e);const t=F(e),n=M(e,t.state,t.location,t.replace);function r(e,t=!0){t||n.pauseListeners(),history.go(e)}const i=a({location:"",base:e,go:r,createHref:k.bind(null,e)},t,n);return Object.defineProperty(i,"location",{enumerable:!0,get:()=>t.location.value}),Object.defineProperty(i,"state",{enumerable:!0,get:()=>t.state.value}),i}function V(e){return"string"===typeof e||e&&"object"===typeof e}function q(e){return"string"===typeof e||"symbol"===typeof e}const $={path:"/",name:void 0,params:{},query:{},hash:"",fullPath:"/",matched:[],meta:{},redirectedFrom:void 0},B=Symbol("");var H;(function(e){e[e["aborted"]=4]="aborted",e[e["cancelled"]=8]="cancelled",e[e["duplicated"]=16]="duplicated"})(H||(H={}));function z(e,t){return a(new Error,{type:e,[B]:!0},t)}function W(e,t){return e instanceof Error&&B in e&&(null==t||!!(e.type&t))}const K="[^/]+?",G={sensitive:!1,strict:!1,start:!0,end:!0},J=/[.+*?^${}()[\]/\\]/g;function Q(e,t){const n=a({},G,t),r=[];let i=n.start?"^":"";const o=[];for(const a of e){const e=a.length?[]:[90];n.strict&&!a.length&&(i+="/");for(let t=0;t<a.length;t++){const r=a[t];let s=40+(n.sensitive?.25:0);if(0===r.type)t||(i+="/"),i+=r.value.replace(J,"\\$&"),s+=40;else if(1===r.type){const{value:e,repeatable:n,optional:c,regexp:u}=r;o.push({name:e,repeatable:n,optional:c});const l=u||K;if(l!==K){s+=10;try{new RegExp(`(${l})`)}catch(h){throw new Error(`Invalid custom RegExp for param "${e}" (${l}): `+h.message)}}let f=n?`((?:${l})(?:/(?:${l}))*)`:`(${l})`;t||(f=c&&a.length<2?`(?:/${f})`:"/"+f),c&&(f+="?"),i+=f,s+=20,c&&(s+=-8),n&&(s+=-20),".*"===l&&(s+=-50)}e.push(s)}r.push(e)}if(n.strict&&n.end){const e=r.length-1;r[e][r[e].length-1]+=.7000000000000001}n.strict||(i+="/?"),n.end?i+="$":n.strict&&(i+="(?:/|$)");const s=new RegExp(i,n.sensitive?"":"i");function c(e){const t=e.match(s),n={};if(!t)return null;for(let r=1;r<t.length;r++){const e=t[r]||"",i=o[r-1];n[i.name]=e&&i.repeatable?e.split("/"):e}return n}function u(t){let n="",r=!1;for(const i of e){r&&n.endsWith("/")||(n+="/"),r=!1;for(const e of i)if(0===e.type)n+=e.value;else if(1===e.type){const{value:o,repeatable:s,optional:a}=e,c=o in t?t[o]:"";if(l(c)&&!s)throw new Error(`Provided param "${o}" is an array but it is not repeatable (* or + modifiers)`);const u=l(c)?c.join("/"):c;if(!u){if(!a)throw new Error(`Missing required param "${o}"`);i.length<2&&(n.endsWith("/")?n=n.slice(0,-1):r=!0)}n+=u}}return n||"/"}return{re:s,score:r,keys:o,parse:c,stringify:u}}function X(e,t){let n=0;while(n<e.length&&n<t.length){const r=t[n]-e[n];if(r)return r;n++}return e.length<t.length?1===e.length&&80===e[0]?-1:1:e.length>t.length?1===t.length&&80===t[0]?1:-1:0}function Y(e,t){let n=0;const r=e.score,i=t.score;while(n<r.length&&n<i.length){const e=X(r[n],i[n]);if(e)return e;n++}if(1===Math.abs(i.length-r.length)){if(Z(r))return 1;if(Z(i))return-1}return i.length-r.length}function Z(e){const t=e[e.length-1];return e.length>0&&t[t.length-1]<0}const ee={type:0,value:""},te=/[a-zA-Z0-9_]/;function ne(e){if(!e)return[[]];if("/"===e)return[[ee]];if(!e.startsWith("/"))throw new Error(`Invalid path "${e}"`);function t(e){throw new Error(`ERR (${n})/"${u}": ${e}`)}let n=0,r=n;const i=[];let o;function s(){o&&i.push(o),o=[]}let a,c=0,u="",l="";function h(){u&&(0===n?o.push({type:0,value:u}):1===n||2===n||3===n?(o.length>1&&("*"===a||"+"===a)&&t(`A repeatable param (${u}) must be alone in its segment. eg: '/:ids+.`),o.push({type:1,value:u,regexp:l,repeatable:"*"===a||"+"===a,optional:"*"===a||"?"===a})):t("Invalid state to consume buffer"),u="")}function f(){u+=a}while(c<e.length)if(a=e[c++],"\\"!==a||2===n)switch(n){case 0:"/"===a?(u&&h(),s()):":"===a?(h(),n=1):f();break;case 4:f(),n=r;break;case 1:"("===a?n=2:te.test(a)?f():(h(),n=0,"*"!==a&&"?"!==a&&"+"!==a&&c--);break;case 2:")"===a?"\\"==l[l.length-1]?l=l.slice(0,-1)+a:n=3:l+=a;break;case 3:h(),n=0,"*"!==a&&"?"!==a&&"+"!==a&&c--,l="";break;default:t("Unknown state");break}else r=n,n=4;return 2===n&&t(`Unfinished custom RegExp for param "${u}"`),h(),s(),i}function re(e,t,n){const r=Q(ne(e.path),n);const i=a(r,{record:e,parent:t,children:[],alias:[]});return t&&!i.record.aliasOf===!t.record.aliasOf&&t.children.push(i),i}function ie(e,t){const n=[],r=new Map;function i(e){return r.get(e)}function o(e,n,r){const i=!r,c=se(e);c.aliasOf=r&&r.record;const h=le(t,e),f=[c];if("alias"in e){const t="string"===typeof e.alias?[e.alias]:e.alias;for(const e of t)f.push(a({},c,{components:r?r.record.components:c.components,path:e,aliasOf:r?r.record:c}))}let d,p;for(const t of f){const{path:a}=t;if(n&&"/"!==a[0]){const e=n.record.path,r="/"===e[e.length-1]?"":"/";t.path=n.record.path+(a&&r+a)}if(d=re(t,n,h),r?r.alias.push(d):(p=p||d,p!==d&&p.alias.push(d),i&&e.name&&!ce(d)&&s(e.name)),c.children){const e=c.children;for(let t=0;t<e.length;t++)o(e[t],d,r&&r.children[t])}r=r||d,(d.record.components&&Object.keys(d.record.components).length||d.record.name||d.record.redirect)&&l(d)}return p?()=>{s(p)}:u}function s(e){if(q(e)){const t=r.get(e);t&&(r.delete(e),n.splice(n.indexOf(t),1),t.children.forEach(s),t.alias.forEach(s))}else{const t=n.indexOf(e);t>-1&&(n.splice(t,1),e.record.name&&r.delete(e.record.name),e.children.forEach(s),e.alias.forEach(s))}}function c(){return n}function l(e){let t=0;while(t<n.length&&Y(e,n[t])>=0&&(e.record.path!==n[t].record.path||!he(e,n[t])))t++;n.splice(t,0,e),e.record.name&&!ce(e)&&r.set(e.record.name,e)}function h(e,t){let i,o,s,c={};if("name"in e&&e.name){if(i=r.get(e.name),!i)throw z(1,{location:e});0,s=i.record.name,c=a(oe(t.params,i.keys.filter((e=>!e.optional)).map((e=>e.name))),e.params&&oe(e.params,i.keys.map((e=>e.name)))),o=i.stringify(c)}else if("path"in e)o=e.path,i=n.find((e=>e.re.test(o))),i&&(c=i.parse(o),s=i.record.name);else{if(i=t.name?r.get(t.name):n.find((e=>e.re.test(t.path))),!i)throw z(1,{location:e,currentLocation:t});s=i.record.name,c=a({},t.params,e.params),o=i.stringify(c)}const u=[];let l=i;while(l)u.unshift(l.record),l=l.parent;return{name:s,path:o,params:c,matched:u,meta:ue(u)}}return t=le({strict:!1,end:!0,sensitive:!1},t),e.forEach((e=>o(e))),{addRoute:o,resolve:h,removeRoute:s,getRoutes:c,getRecordMatcher:i}}function oe(e,t){const n={};for(const r of t)r in e&&(n[r]=e[r]);return n}function se(e){return{path:e.path,redirect:e.redirect,name:e.name,meta:e.meta||{},aliasOf:void 0,beforeEnter:e.beforeEnter,props:ae(e),children:e.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:"components"in e?e.components||null:e.component&&{default:e.component}}}function ae(e){const t={},n=e.props||!1;if("component"in e)t.default=n;else for(const r in e.components)t[r]="boolean"===typeof n?n:n[r];return t}function ce(e){while(e){if(e.record.aliasOf)return!0;e=e.parent}return!1}function ue(e){return e.reduce(((e,t)=>a(e,t.meta)),{})}function le(e,t){const n={};for(const r in e)n[r]=r in t?t[r]:e[r];return n}function he(e,t){return t.children.some((t=>t===e||he(e,t)))}const fe=/#/g,de=/&/g,pe=/\//g,ge=/=/g,me=/\?/g,ye=/\+/g,ve=/%5B/g,we=/%5D/g,be=/%5E/g,Ee=/%60/g,_e=/%7B/g,Te=/%7C/g,Ie=/%7D/g,Se=/%20/g;function ke(e){return encodeURI(""+e).replace(Te,"|").replace(ve,"[").replace(we,"]")}function Ae(e){return ke(e).replace(_e,"{").replace(Ie,"}").replace(be,"^")}function Ce(e){return ke(e).replace(ye,"%2B").replace(Se,"+").replace(fe,"%23").replace(de,"%26").replace(Ee,"`").replace(_e,"{").replace(Ie,"}").replace(be,"^")}function xe(e){return Ce(e).replace(ge,"%3D")}function Oe(e){return ke(e).replace(fe,"%23").replace(me,"%3F")}function Ne(e){return null==e?"":Oe(e).replace(pe,"%2F")}function Re(e){try{return decodeURIComponent(""+e)}catch(t){}return""+e}function De(e){const t={};if(""===e||"?"===e)return t;const n="?"===e[0],r=(n?e.slice(1):e).split("&");for(let i=0;i<r.length;++i){const e=r[i].replace(ye," "),n=e.indexOf("="),o=Re(n<0?e:e.slice(0,n)),s=n<0?null:Re(e.slice(n+1));if(o in t){let e=t[o];l(e)||(e=t[o]=[e]),e.push(s)}else t[o]=s}return t}function Pe(e){let t="";for(let n in e){const r=e[n];if(n=xe(n),null==r){void 0!==r&&(t+=(t.length?"&":"")+n);continue}const i=l(r)?r.map((e=>e&&Ce(e))):[r&&Ce(r)];i.forEach((e=>{void 0!==e&&(t+=(t.length?"&":"")+n,null!=e&&(t+="="+e))}))}return t}function Le(e){const t={};for(const n in e){const r=e[n];void 0!==r&&(t[n]=l(r)?r.map((e=>null==e?null:""+e)):null==r?r:""+r)}return t}const Me=Symbol(""),je=Symbol(""),Fe=Symbol(""),Ue=Symbol(""),Ve=Symbol("");function qe(){let e=[];function t(t){return e.push(t),()=>{const n=e.indexOf(t);n>-1&&e.splice(n,1)}}function n(){e=[]}return{add:t,list:()=>e,reset:n}}function $e(e,t,n,r,i){const o=r&&(r.enterCallbacks[i]=r.enterCallbacks[i]||[]);return()=>new Promise(((s,a)=>{const c=e=>{!1===e?a(z(4,{from:n,to:t})):e instanceof Error?a(e):V(e)?a(z(2,{from:t,to:e})):(o&&r.enterCallbacks[i]===o&&"function"===typeof e&&o.push(e),s())},u=e.call(r&&r.instances[i],t,n,c);let l=Promise.resolve(u);e.length<3&&(l=l.then(c)),l.catch((e=>a(e)))}))}function Be(e,t,n,r){const i=[];for(const o of e){0;for(const e in o.components){let a=o.components[e];if("beforeRouteEnter"===t||o.instances[e])if(He(a)){const s=a.__vccOpts||a,c=s[t];c&&i.push($e(c,n,r,o,e))}else{let c=a();0,i.push((()=>c.then((i=>{if(!i)return Promise.reject(new Error(`Couldn't resolve component "${e}" at "${o.path}"`));const a=s(i)?i.default:i;o.components[e]=a;const c=a.__vccOpts||a,u=c[t];return u&&$e(u,n,r,o,e)()}))))}}}return i}function He(e){return"object"===typeof e||"displayName"in e||"props"in e||"__vccOpts"in e}function ze(e){const t=(0,r.f3)(Fe),n=(0,r.f3)(Ue),o=(0,r.Fl)((()=>t.resolve((0,i.SU)(e.to)))),s=(0,r.Fl)((()=>{const{matched:e}=o.value,{length:t}=e,r=e[t-1],i=n.matched;if(!r||!i.length)return-1;const s=i.findIndex(y.bind(null,r));if(s>-1)return s;const a=Qe(e[t-2]);return t>1&&Qe(r)===a&&i[i.length-1].path!==a?i.findIndex(y.bind(null,e[t-2])):s})),a=(0,r.Fl)((()=>s.value>-1&&Je(n.params,o.value.params))),c=(0,r.Fl)((()=>s.value>-1&&s.value===n.matched.length-1&&v(n.params,o.value.params)));function l(n={}){return Ge(n)?t[(0,i.SU)(e.replace)?"replace":"push"]((0,i.SU)(e.to)).catch(u):Promise.resolve()}return{route:o,href:(0,r.Fl)((()=>o.value.href)),isActive:a,isExactActive:c,navigate:l}}const We=(0,r.aZ)({name:"RouterLink",compatConfig:{MODE:3},props:{to:{type:[String,Object],required:!0},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:"page"}},useLink:ze,setup(e,{slots:t}){const n=(0,i.qj)(ze(e)),{options:o}=(0,r.f3)(Fe),s=(0,r.Fl)((()=>({[Xe(e.activeClass,o.linkActiveClass,"router-link-active")]:n.isActive,[Xe(e.exactActiveClass,o.linkExactActiveClass,"router-link-exact-active")]:n.isExactActive})));return()=>{const i=t.default&&t.default(n);return e.custom?i:(0,r.h)("a",{"aria-current":n.isExactActive?e.ariaCurrentValue:null,href:n.href,onClick:n.navigate,class:s.value},i)}}}),Ke=We;function Ge(e){if(!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)&&!e.defaultPrevented&&(void 0===e.button||0===e.button)){if(e.currentTarget&&e.currentTarget.getAttribute){const t=e.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(t))return}return e.preventDefault&&e.preventDefault(),!0}}function Je(e,t){for(const n in t){const r=t[n],i=e[n];if("string"===typeof r){if(r!==i)return!1}else if(!l(i)||i.length!==r.length||r.some(((e,t)=>e!==i[t])))return!1}return!0}function Qe(e){return e?e.aliasOf?e.aliasOf.path:e.path:""}const Xe=(e,t,n)=>null!=e?e:null!=t?t:n,Ye=(0,r.aZ)({name:"RouterView",inheritAttrs:!1,props:{name:{type:String,default:"default"},route:Object},compatConfig:{MODE:3},setup(e,{attrs:t,slots:n}){const o=(0,r.f3)(Ve),s=(0,r.Fl)((()=>e.route||o.value)),c=(0,r.f3)(je,0),u=(0,r.Fl)((()=>{let e=(0,i.SU)(c);const{matched:t}=s.value;let n;while((n=t[e])&&!n.components)e++;return e})),l=(0,r.Fl)((()=>s.value.matched[u.value]));(0,r.JJ)(je,(0,r.Fl)((()=>u.value+1))),(0,r.JJ)(Me,l),(0,r.JJ)(Ve,s);const h=(0,i.iH)();return(0,r.YP)((()=>[h.value,l.value,e.name]),(([e,t,n],[r,i,o])=>{t&&(t.instances[n]=e,i&&i!==t&&e&&e===r&&(t.leaveGuards.size||(t.leaveGuards=i.leaveGuards),t.updateGuards.size||(t.updateGuards=i.updateGuards))),!e||!t||i&&y(t,i)&&r||(t.enterCallbacks[n]||[]).forEach((t=>t(e)))}),{flush:"post"}),()=>{const i=s.value,o=e.name,c=l.value,u=c&&c.components[o];if(!u)return Ze(n.default,{Component:u,route:i});const f=c.props[o],d=f?!0===f?i.params:"function"===typeof f?f(i):f:null,p=e=>{e.component.isUnmounted&&(c.instances[o]=null)},g=(0,r.h)(u,a({},d,t,{onVnodeUnmounted:p,ref:h}));return Ze(n.default,{Component:g,route:i})||g}}});function Ze(e,t){if(!e)return null;const n=e(t);return 1===n.length?n[0]:n}const et=Ye;function tt(e){const t=ie(e.routes,e),n=e.parseQuery||De,s=e.stringifyQuery||Pe,h=e.history;const f=qe(),g=qe(),y=qe(),v=(0,i.XI)($);let w=$;o&&e.scrollBehavior&&"scrollRestoration"in history&&(history.scrollRestoration="manual");const b=c.bind(null,(e=>""+e)),E=c.bind(null,Ne),T=c.bind(null,Re);function I(e,n){let r,i;return q(e)?(r=t.getRecordMatcher(e),i=n):i=e,t.addRoute(i,r)}function S(e){const n=t.getRecordMatcher(e);n&&t.removeRoute(n)}function k(){return t.getRoutes().map((e=>e.record))}function A(e){return!!t.getRecordMatcher(e)}function N(e,r){if(r=a({},r||v.value),"string"===typeof e){const i=d(n,e,r.path),o=t.resolve({path:i.path},r),s=h.createHref(i.fullPath);return a(i,o,{params:T(o.params),hash:Re(i.hash),redirectedFrom:void 0,href:s})}let i;if("path"in e)i=a({},e,{path:d(n,e.path,r.path).path});else{const t=a({},e.params);for(const e in t)null==t[e]&&delete t[e];i=a({},e,{params:E(e.params)}),r.params=E(r.params)}const o=t.resolve(i,r),c=e.hash||"";o.params=b(T(o.params));const u=p(s,a({},e,{hash:Ae(c),path:o.path})),l=h.createHref(u);return a({fullPath:u,hash:c,query:s===Pe?Le(e.query):e.query||{}},o,{redirectedFrom:void 0,href:l})}function P(e){return"string"===typeof e?d(n,e,v.value.path):a({},e)}function L(e,t){if(w!==e)return z(8,{from:t,to:e})}function M(e){return U(e)}function j(e){return M(a(P(e),{replace:!0}))}function F(e){const t=e.matched[e.matched.length-1];if(t&&t.redirect){const{redirect:n}=t;let r="function"===typeof n?n(e):n;return"string"===typeof r&&(r=r.includes("?")||r.includes("#")?r=P(r):{path:r},r.params={}),a({query:e.query,hash:e.hash,params:"path"in r?{}:e.params},r)}}function U(e,t){const n=w=N(e),r=v.value,i=e.state,o=e.force,c=!0===e.replace,u=F(n);if(u)return U(a(P(u),{state:"object"===typeof u?a({},i,u.state):i,force:o,replace:c}),t||n);const l=n;let h;return l.redirectedFrom=t,!o&&m(s,r,n)&&(h=z(16,{to:l,from:r}),ne(r,r,!0,!1)),(h?Promise.resolve(h):B(l,r)).catch((e=>W(e)?W(e,2)?e:te(e):Z(e,l,r))).then((e=>{if(e){if(W(e,2))return U(a({replace:c},P(e.to),{state:"object"===typeof e.to?a({},i,e.to.state):i,force:o}),t||l)}else e=K(l,r,!0,c,i);return H(l,r,e),e}))}function V(e,t){const n=L(e,t);return n?Promise.reject(n):Promise.resolve()}function B(e,t){let n;const[r,i,o]=rt(e,t);n=Be(r.reverse(),"beforeRouteLeave",e,t);for(const a of r)a.leaveGuards.forEach((r=>{n.push($e(r,e,t))}));const s=V.bind(null,e,t);return n.push(s),nt(n).then((()=>{n=[];for(const r of f.list())n.push($e(r,e,t));return n.push(s),nt(n)})).then((()=>{n=Be(i,"beforeRouteUpdate",e,t);for(const r of i)r.updateGuards.forEach((r=>{n.push($e(r,e,t))}));return n.push(s),nt(n)})).then((()=>{n=[];for(const r of e.matched)if(r.beforeEnter&&!t.matched.includes(r))if(l(r.beforeEnter))for(const i of r.beforeEnter)n.push($e(i,e,t));else n.push($e(r.beforeEnter,e,t));return n.push(s),nt(n)})).then((()=>(e.matched.forEach((e=>e.enterCallbacks={})),n=Be(o,"beforeRouteEnter",e,t),n.push(s),nt(n)))).then((()=>{n=[];for(const r of g.list())n.push($e(r,e,t));return n.push(s),nt(n)})).catch((e=>W(e,8)?e:Promise.reject(e)))}function H(e,t,n){for(const r of y.list())r(e,t,n)}function K(e,t,n,r,i){const s=L(e,t);if(s)return s;const c=t===$,u=o?history.state:{};n&&(r||c?h.replace(e.fullPath,a({scroll:c&&u&&u.scroll},i)):h.push(e.fullPath,i)),v.value=e,ne(e,t,n,c),te()}let G;function J(){G||(G=h.listen(((e,t,n)=>{if(!ae.listening)return;const r=N(e),i=F(r);if(i)return void U(a(i,{replace:!0}),r).catch(u);w=r;const s=v.value;o&&R(O(s.fullPath,n.delta),C()),B(r,s).catch((e=>W(e,12)?e:W(e,2)?(U(e.to,r).then((e=>{W(e,20)&&!n.delta&&n.type===_.pop&&h.go(-1,!1)})).catch(u),Promise.reject()):(n.delta&&h.go(-n.delta,!1),Z(e,r,s)))).then((e=>{e=e||K(r,s,!1),e&&(n.delta&&!W(e,8)?h.go(-n.delta,!1):n.type===_.pop&&W(e,20)&&h.go(-1,!1)),H(r,s,e)})).catch(u)})))}let Q,X=qe(),Y=qe();function Z(e,t,n){te(e);const r=Y.list();return r.length?r.forEach((r=>r(e,t,n))):console.error(e),Promise.reject(e)}function ee(){return Q&&v.value!==$?Promise.resolve():new Promise(((e,t)=>{X.add([e,t])}))}function te(e){return Q||(Q=!e,J(),X.list().forEach((([t,n])=>e?n(e):t())),X.reset()),e}function ne(t,n,i,s){const{scrollBehavior:a}=e;if(!o||!a)return Promise.resolve();const c=!i&&D(O(t.fullPath,0))||(s||!i)&&history.state&&history.state.scroll||null;return(0,r.Y3)().then((()=>a(t,n,c))).then((e=>e&&x(e))).catch((e=>Z(e,t,n)))}const re=e=>h.go(e);let oe;const se=new Set,ae={currentRoute:v,listening:!0,addRoute:I,removeRoute:S,hasRoute:A,getRoutes:k,resolve:N,options:e,push:M,replace:j,go:re,back:()=>re(-1),forward:()=>re(1),beforeEach:f.add,beforeResolve:g.add,afterEach:y.add,onError:Y.add,isReady:ee,install(e){const t=this;e.component("RouterLink",Ke),e.component("RouterView",et),e.config.globalProperties.$router=t,Object.defineProperty(e.config.globalProperties,"$route",{enumerable:!0,get:()=>(0,i.SU)(v)}),o&&!oe&&v.value===$&&(oe=!0,M(h.location).catch((e=>{0})));const n={};for(const i in $)n[i]=(0,r.Fl)((()=>v.value[i]));e.provide(Fe,t),e.provide(Ue,(0,i.qj)(n)),e.provide(Ve,v);const s=e.unmount;se.add(e),e.unmount=function(){se.delete(e),se.size<1&&(w=$,G&&G(),G=null,v.value=$,oe=!1,Q=!1),s()}}};return ae}function nt(e){return e.reduce(((e,t)=>e.then((()=>t()))),Promise.resolve())}function rt(e,t){const n=[],r=[],i=[],o=Math.max(t.matched.length,e.matched.length);for(let s=0;s<o;s++){const o=t.matched[s];o&&(e.matched.find((e=>y(e,o)))?r.push(o):n.push(o));const a=e.matched[s];a&&(t.matched.find((e=>y(e,a)))||i.push(a))}return[n,r,i]}}}]);
//# sourceMappingURL=chunk-vendors.95bedc20.js.map