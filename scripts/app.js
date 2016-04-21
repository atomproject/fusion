var dragAndDropSetup=function(){function e(){$("#saveState")[0].disabled=r.disabled=!n.isDirty}var t=localStorage.getItem("atom-refresh"),n=document.querySelector("t-stage"),a=new Firebase("https://atom-builder.firebaseio.com/states"),o=window.location.search.match(/id=([^&]+)/),r=document.querySelector("code-preview");n.addEventListener("builder-name-changed",function(e){$(".headerText").text(e.detail.name)}),n.addEventListener("component-panel-changed",function(e){var t=e.detail.name,n=document.getElementById("panelSettings");n.disabled="t-page"===t||"t-form"===t}),e(),n.addEventListener("is-dirty-changed",e),$(".control").draggable({addClasses:!1,scroll:!1,appendTo:"body",helper:"clone",cursor:"move",revert:"invalid"}),$("#uploadJson").on("click",function(){document.querySelector("#uploadInput").click()}),$("#saveState").on("click",function(){var e,t;n&&(e=n.builderState,t=n._elementSateList,Promise.resolve(n.getStateFile(e,t)).then(function(e){return e?a.push(e):void 0}).then(function(e){var t=e.key(),a=window.location.origin;a+=window.location.pathname,a+="?id="+t,window.history.pushState({},"",a),n.resetDirty()}))}),$("#canvasRefresh").on("click",function(){var e,t,a;if(n){t=n.builderState,a=n._elementSateList;try{e=n.getStateFile(t,a),localStorage.setItem("atom-refresh",e)}catch(o){}finally{window.location.reload()}}}),$("#uploadInput").on("change",function(){var e,t=this.files,a=new FileReader,o="Builder restored to the state.json successfully.";return t=Array.prototype.slice.call(t),(e=t.find(function(e){return e.name.match(/^[^\.]+\.json/i)}))?(a.addEventListener("load",function(e){n.reset();try{n.recreateBuilder(e.target.result)}catch(t){o="The syntax of state file is not valid."}app.$.toast.text=o,app.$.toast.open()}),void a.readAsText(e)):(app.$.toast.text="Not a json file. You can only upload a json file.",void app.$.toast.open())}),$("#downloadZip").on("click",function(){var e=new JSZip;n&&n.getDownloadFiles().then(function(t){var n;e.file(t.name,t.builderFile),e.file("state.json",t.stateFile),e.file("bower.json",t.bowerFile),t.demoFile&&e.folder("demo").file("index.html",t.demoFile),n=e.generate({type:"blob"}),saveAs(n,t.name.replace(".html",".zip"))})["catch"](function(e){app.$.toast.text=e.toString(),app.$.toast.open()})}),$("#downloadJson").on("click",function(){var e,t,a,o;if(n){a=n.builderState,o=n._elementSateList;try{e=n.getStateFile(a,o),t=new Blob([e],{type:"text/plain;charset=utf-8"}),saveAs(t,"state.json")}catch(r){app.$.toast.text=r.toString(),app.$.toast.open()}}}),$("#panelSettings").on("click",function(){n.showPanelForBuilder()}),$("body").on("click",".control",function(e){var t=e.currentTarget.getAttribute("data-category"),a=e.currentTarget.getAttribute("data-component");n.addToBuilder(a,t)}),$(".component-list").on("click","paper-item.menu-item",function(){$(".component-list").toggleClass("active")}),$(".headerText").on("keydown",function(e){13===e.which&&($(this).blur(),window.getSelection().removeAllRanges())}),$(".headerText").on("focus",function(){function e(e){var t=document.createRange();t.selectNodeContents(e);var n=window.getSelection();n.removeAllRanges(),n.addRange(t)}var t=this;$(this).removeClass("inactive"),requestAnimationFrame(function(){e(t)})}),$(".headerText").on("blur",function(){var e=$(this).text().trim(),t=e.toLowerCase().replace(/\s+/g,"-"),a=$(this);0===e.length?a.hasClass("form-header")?a.text("Untitled Form"):a.text("Untitled Page"):(n.updatePath({path:"heading",value:e,useBuilder:!0}),n.updatePath({path:"name",value:t,useBuilder:!0})),this.scrollLeft=0,a.addClass("inactive")}),r.stage=n,localStorage.removeItem("atom-refresh"),t?(n.reset(),n.recreateBuilder(t)):o&&o[1]?(o=o[1],a.child(o).once("value").then(function(e){n.reset(),n.recreateBuilder(e.val())})):localStorage.getItem("atom-preview")&&(t=localStorage.getItem("atom-preview"),n.reset(),n.recreateBuilder(t),localStorage.removeItem("atom-preview")),window.onbeforeunload=function(){return!n.isDirty||localStorage.getItem("atom-refresh")||localStorage.getItem("atom-preview")?void 0:"All changes will be lost!"}.bind(this)};!function(e){"use strict";var t=e.querySelector("#app"),n=window.location.pathname.replace("/create","");t.baseUrl="",t.menu=null,""===window.location.port&&(t.baseUrl="/create"),"/page"===n?(t.builderType="t-page",t.isPage=!0,t.builderUrl="page-manifest.json",t.canvasName="Untitled Page",t.tab="page",t.route="canvas"):"/form"===n?(t.builderType="t-form",t.isPage=!1,t.builderUrl="form-manifest.json",t.canvasName="Untitled Form",t.tab="form",t.route="canvas"):"/"===n&&(t.tab="form",t.route="browser"),t._getElementsInCategory=function(e){var n=t.menu.elements.filter(function(t){return t.category===e.name});return n},t.filterComponents=function(e,n){var a;return e?($(".component-list").hasClass("active")||($(".component-list").addClass("active"),$("#allElements").addClass("active")),a=n?t.menu.elements.filter(function(e){return e.category===n}):t.menu.elements,e=e.toLowerCase(),function(t){var n=t.displayName.toLowerCase();return-1!==n.indexOf(e)}):null},t._getIcon=function(e){return e?"fusion:"+e:"fusion-b:atom-logo"},t._getPropertySource=function(){return"bower_components/"+t.builderType+"/property.json"},t.toggleAccordion=function(t){var n=t.currentTarget,a=e.querySelector(".menu-item.active");n.classList.contains("active")?n.classList.remove("active"):n.classList.add("active"),a&&a.classList.remove("active")},t._onElementsReceived=function(e){t.menu=e.detail.response,setTimeout(dragAndDropSetup)},t.displayInstalledToast=function(){Polymer.dom(e).querySelector("platinum-sw-cache").disabled||Polymer.dom(e).querySelector("#caching-complete").show()},t.addEventListener("dom-change",function(){t.$.manifestAjax&&t.$.manifestAjax.generateRequest()}),window.addEventListener("WebComponentsReady",function(){var e=$("t-component-panel")[0],t=$("t-stage")[0];t.componentPanel=e})}(document);