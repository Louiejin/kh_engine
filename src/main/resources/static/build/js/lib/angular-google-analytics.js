/**
 * Angular Google Analytics - Easy tracking for your AngularJS application
 * @version v1.0.0 - 2015-08-26
 * @link http://github.com/revolunet/angular-google-analytics
 * @author Julien Bouquillon <julien@revolunet.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

!function(n,t,e,i){e.module("angular-google-analytics",[]).provider("Analytics",function(){var c,a,r,o,s,u,l=!1,d=!0,m="",f=!1,g="$routeChangeSuccess",p="auto",_=!1,h=!1,k=!1,y="USD",w=!1,v=!1,E=!1,b=!1,T=!1;this._logs=[],this.setAccount=function(n){return c=e.isUndefined(n)||n===!1?i:e.isArray(n)?n:e.isObject(n)?[n]:[{tracker:n,trackEvent:!0}],!0},this.trackPages=function(n){return d=n,!0},this.trackPrefix=function(n){return m=n,!0},this.setDomainName=function(n){return r=n,!0},this.useDisplayFeatures=function(n){return a=!!n,!0},this.useAnalytics=function(n){return f=!!n,!0},this.useEnhancedLinkAttribution=function(n){return k=!!n,!0},this.useCrossDomainLinker=function(n){return v=!!n,!0},this.setCrossLinkDomains=function(n){return u=n,!0},this.setPageEvent=function(n){return g=n,!0},this.setCookieConfig=function(n){return p=n,!0},this.useECommerce=function(n,t){return _=!!n,h=!!t,!0},this.setCurrency=function(n){return y=n,!0},this.setRemoveRegExp=function(n){return n instanceof RegExp?(o=n,!0):!1},this.setExperimentId=function(n){return s=n,!0},this.ignoreFirstPageLoad=function(n){return w=!!n,!0},this.trackUrlParams=function(n){return E=!!n,!0},this.delayScriptTag=function(n){return b=!!n,!0},this.logAllCalls=function(n){return T=!!n,!0},this.$get=["$document","$location","$log","$rootScope","$window",function(A,j,C,P,D){var I=this,L=function(n,t){return q("name",t)?t.name+"."+n:n},q=function(n,t){return e.isObject(t)&&e.isDefined(t[n])},S=function(){var n=E?j.url():j.path();return o?n.replace(o,""):n},x=function(){var n={utm_source:"campaignSource",utm_medium:"campaignMedium",utm_term:"campaignTerm",utm_content:"campaignContent",utm_campaign:"campaignName"},t={};return e.forEach(j.search(),function(i,c){var a=n[c];e.isDefined(a)&&(t[a]=i)}),t},O=function(n){!f&&D._gaq&&"function"==typeof n&&n()},N=function(){D._gaq||(D._gaq=[]),T===!0&&I._log.apply(I,arguments),D._gaq.push.apply(D._gaq,arguments)},$=function(n){f&&D.ga&&"function"==typeof n&&n()},F=function(){return"function"!=typeof D.ga?(I._log("warn","ga function not set on window"),void 0):(T===!0&&I._log.apply(I,arguments),D.ga.apply(null,arguments),void 0)},U=function(n){if("function"!=typeof D.ga)return I._log("warn","ga function not set on window"),void 0;var t=Array.prototype.slice.call(arguments,1),e=t[0];c.forEach(function(i){("function"!=typeof n||n(i))&&(t[0]=L(e,i),T===!0&&I._log.apply(I,t),D.ga.apply(null,t))})};return this._log=function(){if(arguments.length>0){if(arguments.length>1)switch(arguments[0]){case"warn":C.warn(Array.prototype.slice.call(arguments,1));break;case"error":C.error(Array.prototype.slice.call(arguments,1))}this._logs.push(Array.prototype.slice.call(arguments))}},this._createScriptTag=function(){if(!c||c.length<1)return this._log("warn","No account id set to create script tag"),void 0;if(c.length>1&&(this._log("warn","Multiple trackers are not supported with ga.js. Using first tracker only"),c=c.slice(0,1)),l===!0)return this._log("warn","ga.js or analytics.js script tag already created"),void 0;N(["_setAccount",c[0].tracker]),r&&N(["_setDomainName",r]),k&&N(["_require","inpage_linkid","//www.google-analytics.com/plugins/ga/inpage_linkid.js"]),d&&!w&&(o?N(["_trackPageview",S()]):N(["_trackPageview"]));var n;return n=a?("https:"===t.location.protocol?"https://":"http://")+"stats.g.doubleclick.net/dc.js":("https:"===t.location.protocol?"https://ssl":"http://www")+".google-analytics.com/ga.js",function(){var t=A[0],e=t.createElement("script");e.type="text/javascript",e.async=!0,e.src=n;var i=t.getElementsByTagName("script")[0];i.parentNode.insertBefore(e,i)}(n),l=!0,!0},this._createAnalyticsScriptTag=function(){if(!c)return this._log("warn","No account id set to create analytics script tag"),void 0;if(l===!0)return this._log("warn","ga.js or analytics.js script tag already created"),void 0;if(function(n,t,e,i,c,a,r){n.GoogleAnalyticsObject=c,n[c]=n[c]||function(){(n[c].q=n[c].q||[]).push(arguments)},n[c].l=1*new Date,a=t.createElement(e),r=t.getElementsByTagName(e)[0],a.async=1,a.src=i,r.parentNode.insertBefore(a,r)}(n,t,"script","//www.google-analytics.com/analytics.js","ga"),c.forEach(function(n){var t={};n.crossDomainLinker=q("crossDomainLinker",n)?n.crossDomainLinker:v,n.cookieConfig=q("cookieConfig",n)?n.cookieConfig:p,n.crossLinkDomains=q("crossLinkDomains",n)?n.crossLinkDomains:u,n.trackEvent=q("trackEvent",n)?n.trackEvent:!1,t.allowLinker=n.crossDomainLinker,q("name",n)&&(t.name=n.name),F("create",n.tracker,n.cookieConfig,t),n.crossDomainLinker===!0&&(F(L("require",n),"linker"),e.isDefined(n.crossLinkDomains)&&F(L("linker:autoLink",n),n.crossLinkDomains))}),a&&F("require","displayfeatures"),d&&!w&&F("send","pageview",S()),_&&(h?(F("require","ec","ec.js"),F("set","&cu",y)):F("require","ecommerce","ecommerce.js")),k&&F("require","linkid","linkid.js"),s){var i=t.createElement("script"),r=t.getElementsByTagName("script")[0];i.src="//www.google-analytics.com/cx/api.js?experiment="+s,r.parentNode.insertBefore(i,r)}return l=!0,!0},this._ecommerceEnabled=function(){return _&&!h},this._enhancedEcommerceEnabled=function(){return _&&h},this._trackPage=function(n,t,c){n=n?n:S(),t=t?t:A[0].title,O(function(){N(["_set","title",t]),N(["_trackPageview",m+n])}),$(function(){var a={page:m+n,title:t};e.extend(a,x()),e.isObject(c)&&e.extend(a,c),U(i,"send","pageview",a)})},this._trackEvent=function(n,t,i,c,a,r){O(function(){N(["_trackEvent",n,t,i,c,!!a])}),$(function(){var o={},s=function(n){return q("trackEvent",n)&&n.trackEvent===!0};e.isDefined(a)&&(o.nonInteraction=!!a),e.isObject(r)&&e.extend(o,r),U(s,"send","event",n,t,i,c,o)})},this._addTrans=function(n,t,e,i,c,a,r,o,s){O(function(){N(["_addTrans",n,t,e,i,c,a,r,o])}),$(function(){I._ecommerceEnabled()?F("ecommerce:addTransaction",{id:n,affiliation:t,revenue:e,tax:i,shipping:c,currency:s||"USD"}):I._log("warn","Ecommerce must be enabled to use addTrans with analytics.js")})},this._addItem=function(n,t,e,i,c,a){O(function(){N(["_addItem",n,t,e,i,c,a])}),$(function(){I._ecommerceEnabled()?F("ecommerce:addItem",{id:n,name:e,sku:t,category:i,price:c,quantity:a}):I._log("warn","Ecommerce must be enabled to use addItem with analytics.js")})},this._trackTrans=function(){O(function(){N(["_trackTrans"])}),$(function(){I._ecommerceEnabled()?F("ecommerce:send"):I._log("warn","Ecommerce must be enabled to use trackTrans with analytics.js")})},this._clearTrans=function(){$(function(){I._ecommerceEnabled()?F("ecommerce:clear"):I._log("warn","Ecommerce must be enabled to use clearTrans with analytics.js")})},this._addProduct=function(n,t,e,i,c,a,r,o,s){O(function(){N(["_addProduct",n,t,e,i,c,a,r,o,s])}),$(function(){I._enhancedEcommerceEnabled()?F("ec:addProduct",{id:n,name:t,category:e,brand:i,variant:c,price:a,quantity:r,coupon:o,position:s}):I._log("warn","Enhanced ecommerce must be enabled to use addProduct with analytics.js")})},this._addImpression=function(n,t,e,i,c,a,r,o){O(function(){N(["_addImpression",n,t,e,i,c,a,r,o])}),$(function(){I._enhancedEcommerceEnabled()?F("ec:addImpression",{id:n,name:t,category:c,brand:i,variant:a,list:e,position:r,price:o}):I._log("warn","Enhanced ecommerce must be enabled to use addImpression with analytics.js")})},this._addPromo=function(n,t,e,i){O(function(){N(["_addPromo",n,t,e,i])}),$(function(){I._enhancedEcommerceEnabled()?F("ec:addPromo",{id:n,name:t,creative:e,position:i}):I._log("warn","Enhanced ecommerce must be enabled to use addPromo with analytics.js")})},this._getActionFieldObject=function(n,t,e,i,c,a,r,o,s){var u={};return n&&(u.id=n),t&&(u.affiliation=t),e&&(u.revenue=e),i&&(u.tax=i),c&&(u.shipping=c),a&&(u.coupon=a),r&&(u.list=r),o&&(u.step=o),s&&(u.option=s),u},this._setAction=function(n,t){O(function(){N(["_setAction",n,t])}),$(function(){I._enhancedEcommerceEnabled()?F("ec:setAction",n,t):I._log("warn","Enhanced ecommerce must be enabled to use setAction with analytics.js")})},this._trackTransaction=function(n,t,e,i,c,a,r,o,s){this._setAction("purchase",this._getActionFieldObject(n,t,e,i,c,a,r,o,s))},this._trackRefund=function(n){this._setAction("refund",this._getActionFieldObject(n))},this._trackCheckOut=function(n,t){this._setAction("checkout",this._getActionFieldObject(null,null,null,null,null,null,null,n,t))},this._trackCart=function(n){-1!==["add","remove"].indexOf(n)&&(this._setAction(n),this._send("event","UX","click",n+" to cart"))},this._promoClick=function(n){this._setAction("promo_click"),this._send("event","Internal Promotions","click",n)},this._productClick=function(n){this._setAction("click",this._getActionFieldObject(null,null,null,null,null,null,n,null,null)),this._send("event","UX","click",n)},this._send=function(){var n=Array.prototype.slice.call(arguments);n.unshift("send"),$(function(){F.apply(I,n)})},this._pageView=function(){this._send("pageview")},this._set=function(n,t){$(function(){F("set",n,t)})},this._trackTimings=function(n,t,e,i){this._send("timing",n,t,e,i)},b||(f?this._createAnalyticsScriptTag():this._createScriptTag()),d&&P.$on(g,function(){I._trackPage()}),{_logs:I._logs,displayFeatures:a,ecommerce:_,enhancedEcommerce:h,enhancedLinkAttribution:k,getUrl:S,experimentId:s,ignoreFirstPageLoad:w,delayScriptTag:b,setCookieConfig:I._setCookieConfig,getCookieConfig:function(){return p},createAnalyticsScriptTag:function(n){return n&&(p=n),I._createAnalyticsScriptTag()},createScriptTag:function(n){return n&&(p=n),I._createScriptTag()},ecommerceEnabled:function(){return I._ecommerceEnabled()},enhancedEcommerceEnabled:function(){return I._enhancedEcommerceEnabled()},trackPage:function(n,t,e){I._trackPage(n,t,e)},trackEvent:function(n,t,e,i,c,a){I._trackEvent(n,t,e,i,c,a)},addTrans:function(n,t,e,i,c,a,r,o,s){I._addTrans(n,t,e,i,c,a,r,o,s)},addItem:function(n,t,e,i,c,a){I._addItem(n,t,e,i,c,a)},trackTrans:function(){I._trackTrans()},clearTrans:function(){I._clearTrans()},addProduct:function(n,t,e,i,c,a,r,o,s){I._addProduct(n,t,e,i,c,a,r,o,s)},addPromo:function(n,t,e,i){I._addPromo(n,t,e,i)},addImpression:function(n,t,e,i,c,a,r,o){I._addImpression(n,t,e,i,c,a,r,o)},productClick:function(n){I._productClick(n)},promoClick:function(n){I._promoClick(n)},trackDetail:function(){I._setAction("detail"),I._pageView()},trackCart:function(n){I._trackCart(n)},trackCheckout:function(n,t){I._trackCheckOut(n,t)},trackTimings:function(n,t,e,i){I._trackTimings(n,t,e,i)},trackTransaction:function(n,t,e,i,c,a,r,o,s){I._trackTransaction(n,t,e,i,c,a,r,o,s)},setAction:function(n,t){I._setAction(n,t)},send:function(n){I._send(n)},pageView:function(){I._pageView()},set:function(n,t){I._set(n,t)}}}]}).directive("gaTrackEvent",["Analytics","$parse",function(n,t){return{restrict:"A",link:function(e,i,c){var a=t(c.gaTrackEvent);i.bind("click",function(){(!c.gaTrackEventIf||e.$eval(c.gaTrackEventIf))&&a.length>1&&n.trackEvent.apply(n,a(e))})}}}])}(window,document,window.angular);