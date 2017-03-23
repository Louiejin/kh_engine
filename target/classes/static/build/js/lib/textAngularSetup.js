/*
@license textAngular
Author : Austin Anderson
License : 2013 MIT
Version 1.3.7

See README.md or https://github.com/fraywing/textAngular/wiki for requirements and use.
*/

angular.module("textAngularSetup",[]).value("taOptions",{forceTextAngularSanitize:!0,keyMappings:[],toolbar:[["h1","h2","h3","h4","h5","h6","p","pre","quote"],["bold","italics","underline","strikeThrough","ul","ol","redo","undo","clear"],["justifyLeft","justifyCenter","justifyRight","justifyFull","indent","outdent"],["html","insertImage","insertLink","insertVideo","wordcount","charcount"]],classes:{focussed:"focussed",toolbar:"btn-toolbar",toolbarGroup:"btn-group",toolbarButton:"btn btn-default",toolbarButtonActive:"active",disabled:"disabled",textEditor:"form-control",htmlEditor:"form-control"},defaultTagAttributes:{a:{target:""}},setup:{textEditorSetup:function(){},htmlEditorSetup:function(){}},defaultFileDropHandler:function(t,e){var n=new FileReader;return"image"===t.type.substring(0,5)?(n.onload=function(){""!==n.result&&e("insertImage",n.result,!0)},n.readAsDataURL(t),!0):!1}}).value("taSelectableElements",["a","img"]).value("taCustomRenderers",[{selector:"img",customAttribute:"ta-insert-video",renderLogic:function(t){var e=angular.element("<iframe></iframe>"),n=t.prop("attributes");angular.forEach(n,function(t){e.attr(t.name,t.value)}),e.attr("src",e.attr("ta-insert-video")),t.replaceWith(e)}}]).value("taTranslations",{html:{tooltip:"Toggle html / Rich Text"},heading:{tooltip:"Heading "},p:{tooltip:"Paragraph"},pre:{tooltip:"Preformatted text"},ul:{tooltip:"Unordered List"},ol:{tooltip:"Ordered List"},quote:{tooltip:"Quote/unquote selection or paragraph"},undo:{tooltip:"Undo"},redo:{tooltip:"Redo"},bold:{tooltip:"Bold"},italic:{tooltip:"Italic"},underline:{tooltip:"Underline"},strikeThrough:{tooltip:"Strikethrough"},justifyLeft:{tooltip:"Align text left"},justifyRight:{tooltip:"Align text right"},justifyFull:{tooltip:"Justify text"},justifyCenter:{tooltip:"Center"},indent:{tooltip:"Increase indent"},outdent:{tooltip:"Decrease indent"},clear:{tooltip:"Clear formatting"},insertImage:{dialogPrompt:"Please enter an image URL to insert",tooltip:"Insert image",hotkey:"the - possibly language dependent hotkey ... for some future implementation"},insertVideo:{tooltip:"Insert video",dialogPrompt:"Please enter a youtube URL to embed"},insertLink:{tooltip:"Insert / edit link",dialogPrompt:"Please enter a URL to insert"},editLink:{reLinkButton:{tooltip:"Relink"},unLinkButton:{tooltip:"Unlink"},targetToggle:{buttontext:"Open in New Window"}},wordcount:{tooltip:"Display words Count"},charcount:{tooltip:"Display characters Count"}}).factory("taToolFunctions",["$window","taTranslations",function(t,e){return{imgOnSelectAction:function(t,e,n){var o=function(){n.updateTaBindtaTextElement(),n.hidePopover()};t.preventDefault(),n.displayElements.popover.css("width","375px");var i=n.displayElements.popoverContainer;i.empty();var a=angular.element('<div class="btn-group" style="padding-right: 6px;">'),l=angular.element('<button type="button" class="btn btn-default btn-sm btn-small" unselectable="on" tabindex="-1">100% </button>');l.on("click",function(t){t.preventDefault(),e.css({width:"100%",height:""}),o()});var r=angular.element('<button type="button" class="btn btn-default btn-sm btn-small" unselectable="on" tabindex="-1">50% </button>');r.on("click",function(t){t.preventDefault(),e.css({width:"50%",height:""}),o()});var u=angular.element('<button type="button" class="btn btn-default btn-sm btn-small" unselectable="on" tabindex="-1">25% </button>');u.on("click",function(t){t.preventDefault(),e.css({width:"25%",height:""}),o()});var s=angular.element('<button type="button" class="btn btn-default btn-sm btn-small" unselectable="on" tabindex="-1">Reset</button>');s.on("click",function(t){t.preventDefault(),e.css({width:"",height:""}),o()}),a.append(l),a.append(r),a.append(u),a.append(s),i.append(a),a=angular.element('<div class="btn-group" style="padding-right: 6px;">');var c=angular.element('<button type="button" class="btn btn-default btn-sm btn-small" unselectable="on" tabindex="-1"><i class="fa fa-align-left"></i></button>');c.on("click",function(t){t.preventDefault(),e.css("float","left"),e.css("cssFloat","left"),e.css("styleFloat","left"),o()});var d=angular.element('<button type="button" class="btn btn-default btn-sm btn-small" unselectable="on" tabindex="-1"><i class="fa fa-align-right"></i></button>');d.on("click",function(t){t.preventDefault(),e.css("float","right"),e.css("cssFloat","right"),e.css("styleFloat","right"),o()});var p=angular.element('<button type="button" class="btn btn-default btn-sm btn-small" unselectable="on" tabindex="-1"><i class="fa fa-align-justify"></i></button>');p.on("click",function(t){t.preventDefault(),e.css("float",""),e.css("cssFloat",""),e.css("styleFloat",""),o()}),a.append(c),a.append(p),a.append(d),i.append(a),a=angular.element('<div class="btn-group">');var f=angular.element('<button type="button" class="btn btn-default btn-sm btn-small" unselectable="on" tabindex="-1"><i class="fa fa-trash-o"></i></button>');f.on("click",function(t){t.preventDefault(),e.remove(),o()}),a.append(f),i.append(a),n.showPopover(e),n.showResizeOverlay(e)},aOnSelectAction:function(n,o,i){n.preventDefault(),i.displayElements.popover.css("width","436px");var a=i.displayElements.popoverContainer;a.empty(),a.css("line-height","28px");var l=angular.element('<a href="'+o.attr("href")+'" target="_blank">'+o.attr("href")+"</a>");l.css({display:"inline-block","max-width":"200px",overflow:"hidden","text-overflow":"ellipsis","white-space":"nowrap","vertical-align":"middle"}),a.append(l);var r=angular.element('<div class="btn-group pull-right">'),u=angular.element('<button type="button" class="btn btn-default btn-sm btn-small" tabindex="-1" unselectable="on" title="'+e.editLink.reLinkButton.tooltip+'"><i class="fa fa-edit icon-edit"></i></button>');u.on("click",function(n){n.preventDefault();var a=t.prompt(e.insertLink.dialogPrompt,o.attr("href"));a&&""!==a&&"http://"!==a&&(o.attr("href",a),i.updateTaBindtaTextElement()),i.hidePopover()}),r.append(u);var s=angular.element('<button type="button" class="btn btn-default btn-sm btn-small" tabindex="-1" unselectable="on" title="'+e.editLink.unLinkButton.tooltip+'"><i class="fa fa-unlink icon-unlink"></i></button>');s.on("click",function(t){t.preventDefault(),o.replaceWith(o.contents()),i.updateTaBindtaTextElement(),i.hidePopover()}),r.append(s);var c=angular.element('<button type="button" class="btn btn-default btn-sm btn-small" tabindex="-1" unselectable="on">'+e.editLink.targetToggle.buttontext+"</button>");"_blank"===o.attr("target")&&c.addClass("active"),c.on("click",function(t){t.preventDefault(),o.attr("target","_blank"===o.attr("target")?"":"_blank"),c.toggleClass("active"),i.updateTaBindtaTextElement()}),r.append(c),a.append(r),i.showPopover(o)},extractYoutubeVideoId:function(t){var e=/(?:youtube(?:-nocookie)?\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/i,n=t.match(e);return n&&n[1]||null}}}]).run(["taRegisterTool","$window","taTranslations","taSelection","taToolFunctions","$sanitize","taOptions",function(t,e,n,o,i,a,l){var r={};if(a("",r),l.forceTextAngularSanitize===!0&&"taSanitize"!==r.version)throw angular.$$minErr("textAngular")("textAngularSetup","The textAngular-sanitize provider has been replaced by another -- have you included angular-sanitize by mistake?");t("html",{iconclass:"fa fa-code",tooltiptext:n.html.tooltip,action:function(){this.$editor().switchView()},activeState:function(){return this.$editor().showHtml}});var u=function(t){return function(){return this.$editor().queryFormatBlockState(t)}},s=function(){return this.$editor().wrapSelection("formatBlock","<"+this.name.toUpperCase()+">")};angular.forEach(["h1","h2","h3","h4","h5","h6"],function(e){t(e.toLowerCase(),{buttontext:e.toUpperCase(),tooltiptext:n.heading.tooltip+e.charAt(1),action:s,activeState:u(e.toLowerCase())})}),t("p",{buttontext:"P",tooltiptext:n.p.tooltip,action:function(){return this.$editor().wrapSelection("formatBlock","<P>")},activeState:function(){return this.$editor().queryFormatBlockState("p")}}),t("pre",{buttontext:"pre",tooltiptext:n.pre.tooltip,action:function(){return this.$editor().wrapSelection("formatBlock","<PRE>")},activeState:function(){return this.$editor().queryFormatBlockState("pre")}}),t("ul",{iconclass:"fa fa-list-ul",tooltiptext:n.ul.tooltip,action:function(){return this.$editor().wrapSelection("insertUnorderedList",null)},activeState:function(){return this.$editor().queryCommandState("insertUnorderedList")}}),t("ol",{iconclass:"fa fa-list-ol",tooltiptext:n.ol.tooltip,action:function(){return this.$editor().wrapSelection("insertOrderedList",null)},activeState:function(){return this.$editor().queryCommandState("insertOrderedList")}}),t("quote",{iconclass:"fa fa-quote-right",tooltiptext:n.quote.tooltip,action:function(){return this.$editor().wrapSelection("formatBlock","<BLOCKQUOTE>")},activeState:function(){return this.$editor().queryFormatBlockState("blockquote")}}),t("undo",{iconclass:"fa fa-undo",tooltiptext:n.undo.tooltip,action:function(){return this.$editor().wrapSelection("undo",null)}}),t("redo",{iconclass:"fa fa-repeat",tooltiptext:n.redo.tooltip,action:function(){return this.$editor().wrapSelection("redo",null)}}),t("bold",{iconclass:"fa fa-bold",tooltiptext:n.bold.tooltip,action:function(){return this.$editor().wrapSelection("bold",null)},activeState:function(){return this.$editor().queryCommandState("bold")},commandKeyCode:98}),t("justifyLeft",{iconclass:"fa fa-align-left",tooltiptext:n.justifyLeft.tooltip,action:function(){return this.$editor().wrapSelection("justifyLeft",null)},activeState:function(t){if(t&&"#document"===t.nodeName)return!1;var e=!1;return t&&(e="left"===t.css("text-align")||"left"===t.attr("align")||"right"!==t.css("text-align")&&"center"!==t.css("text-align")&&"justify"!==t.css("text-align")&&!this.$editor().queryCommandState("justifyRight")&&!this.$editor().queryCommandState("justifyCenter")&&!this.$editor().queryCommandState("justifyFull")),e=e||this.$editor().queryCommandState("justifyLeft")}}),t("justifyRight",{iconclass:"fa fa-align-right",tooltiptext:n.justifyRight.tooltip,action:function(){return this.$editor().wrapSelection("justifyRight",null)},activeState:function(t){if(t&&"#document"===t.nodeName)return!1;var e=!1;return t&&(e="right"===t.css("text-align")),e=e||this.$editor().queryCommandState("justifyRight")}}),t("justifyFull",{iconclass:"fa fa-align-justify",tooltiptext:n.justifyFull.tooltip,action:function(){return this.$editor().wrapSelection("justifyFull",null)},activeState:function(t){var e=!1;return t&&(e="justify"===t.css("text-align")),e=e||this.$editor().queryCommandState("justifyFull")}}),t("justifyCenter",{iconclass:"fa fa-align-center",tooltiptext:n.justifyCenter.tooltip,action:function(){return this.$editor().wrapSelection("justifyCenter",null)},activeState:function(t){if(t&&"#document"===t.nodeName)return!1;var e=!1;return t&&(e="center"===t.css("text-align")),e=e||this.$editor().queryCommandState("justifyCenter")}}),t("indent",{iconclass:"fa fa-indent",tooltiptext:n.indent.tooltip,action:function(){return this.$editor().wrapSelection("indent",null)},activeState:function(){return this.$editor().queryFormatBlockState("blockquote")},commandKeyCode:"TabKey"}),t("outdent",{iconclass:"fa fa-outdent",tooltiptext:n.outdent.tooltip,action:function(){return this.$editor().wrapSelection("outdent",null)},activeState:function(){return!1},commandKeyCode:"ShiftTabKey"}),t("italics",{iconclass:"fa fa-italic",tooltiptext:n.italic.tooltip,action:function(){return this.$editor().wrapSelection("italic",null)},activeState:function(){return this.$editor().queryCommandState("italic")},commandKeyCode:105}),t("underline",{iconclass:"fa fa-underline",tooltiptext:n.underline.tooltip,action:function(){return this.$editor().wrapSelection("underline",null)},activeState:function(){return this.$editor().queryCommandState("underline")},commandKeyCode:117}),t("strikeThrough",{iconclass:"fa fa-strikethrough",tooltiptext:n.strikeThrough.tooltip,action:function(){return this.$editor().wrapSelection("strikeThrough",null)},activeState:function(){return document.queryCommandState("strikeThrough")}}),t("clear",{iconclass:"fa fa-ban",tooltiptext:n.clear.tooltip,action:function(t,e){var n;this.$editor().wrapSelection("removeFormat",null);var i=angular.element(o.getSelectionElement()),a=function(t){t=angular.element(t);var e=t;angular.forEach(t.children(),function(t){var n=angular.element("<p></p>");n.html(angular.element(t).html()),e.after(n),e=n}),t.remove()};if(angular.forEach(i.find("ul"),a),angular.forEach(i.find("ol"),a),"li"===i[0].tagName.toLowerCase()){var l=i[0].parentNode.childNodes,r=[],u=[],s=!1;for(n=0;n<l.length;n++)l[n]===i[0]?s=!0:s?u.push(l[n]):r.push(l[n]);var c=angular.element(i[0].parentNode),d=angular.element("<p></p>");if(d.html(angular.element(i[0]).html()),0===r.length||0===u.length)0===u.length?c.after(d):c[0].parentNode.insertBefore(d[0],c[0]),0===r.length&&0===u.length?c.remove():angular.element(i[0]).remove();else{var p=angular.element("<"+c[0].tagName+"></"+c[0].tagName+">"),f=angular.element("<"+c[0].tagName+"></"+c[0].tagName+">");for(n=0;n<r.length;n++)p.append(angular.element(r[n]));for(n=0;n<u.length;n++)f.append(angular.element(u[n]));c.after(f),c.after(d),c.after(p),c.remove()}o.setSelectionToElementEnd(d[0])}var m=this.$editor(),h=function(t){t=angular.element(t),t[0]!==m.displayElements.text[0]&&t.removeAttr("class"),angular.forEach(t.children(),h)};angular.forEach(i,h),"li"!==i[0].tagName.toLowerCase()&&"ol"!==i[0].tagName.toLowerCase()&&"ul"!==i[0].tagName.toLowerCase()&&this.$editor().wrapSelection("formatBlock","default"),e()}}),t("insertImage",{iconclass:"fa fa-picture-o",tooltiptext:n.insertImage.tooltip,action:function(){var t;return t=e.prompt(n.insertImage.dialogPrompt,"http://"),t&&""!==t&&"http://"!==t?this.$editor().wrapSelection("insertImage",t,!0):void 0},onElementSelect:{element:"img",action:i.imgOnSelectAction}}),t("insertVideo",{iconclass:"fa fa-youtube-play",tooltiptext:n.insertVideo.tooltip,action:function(){var t;if(t=e.prompt(n.insertVideo.dialogPrompt,"https://"),t&&""!==t&&"https://"!==t&&(videoId=i.extractYoutubeVideoId(t))){var o="https://www.youtube.com/embed/"+videoId,a='<img class="ta-insert-video" src="https://img.youtube.com/vi/'+videoId+'/hqdefault.jpg" ta-insert-video="'+o+'" contenteditable="false" allowfullscreen="true" frameborder="0" />';return this.$editor().wrapSelection("insertHTML",a,!0)}},onElementSelect:{element:"img",onlyWithAttrs:["ta-insert-video"],action:i.imgOnSelectAction}}),t("insertLink",{tooltiptext:n.insertLink.tooltip,iconclass:"fa fa-link",action:function(){var t;return t=e.prompt(n.insertLink.dialogPrompt,"http://"),t&&""!==t&&"http://"!==t?this.$editor().wrapSelection("createLink",t,!0):void 0},activeState:function(t){return t?"A"===t[0].tagName:!1},onElementSelect:{element:"a",action:i.aOnSelectAction}}),t("wordcount",{display:'<div id="toolbarWC" style="display:block; min-width:100px;">Words: <span ng-bind="wordcount"></span></div>',disabled:!0,wordcount:0,activeState:function(){var t=this.$editor().displayElements.text,e=t[0].innerHTML||"",n=0;return""!==e.replace(/\s*<[^>]*?>\s*/g,"")&&(n=e.replace(/<\/?(b|i|em|strong|span|u|strikethrough|a|img|small|sub|sup|label)( [^>*?])?>/gi,"").replace(/(<[^>]*?>\s*<[^>]*?>)/gi," ").replace(/(<[^>]*?>)/gi,"").replace(/\s+/gi," ").match(/\S+/g).length),this.wordcount=n,this.$editor().wordcount=n,!1}}),t("charcount",{display:'<div id="toolbarCC" style="display:block; min-width:120px;">Characters: <span ng-bind="charcount"></span></div>',disabled:!0,charcount:0,activeState:function(){var t=this.$editor().displayElements.text,e=t[0].innerText||t[0].textContent,n=e.replace(/(\r\n|\n|\r)/gm,"").replace(/^\s+/g," ").replace(/\s+$/g," ").length;return this.charcount=n,this.$editor().charcount=n,!1}})}]);