var dragAndDropSetup=function(){$(".control").draggable({addClasses:!1,scroll:!1,appendTo:"body",helper:"clone",cursor:"move",revert:"invalid"}),$("#upload").on("click",function(){document.querySelector("#uploadInput").click()}),$("#uploadInput").on("change",function(){var e,t=document.querySelector("t-stage"),n=this.files,a=new FileReader;n=Array.prototype.slice.call(n),e=n.find(function(e){return"state.json"===e.name}),e&&(a.addEventListener("load",function(e){t.reset(),t.recreateBuilder(e.target.result)}),a.readAsText(e))}),$("#download").on("click",function(){var e=new JSZip,t=document.querySelector("t-stage");t&&t.getDownloadFiles().then(function(t){var n;e.file(t.name,t.contents),e.file(t.stateFileName,t.stateFile),n=e.generate({type:"blob"}),saveAs(n,t.name.replace(".html",".zip"))})}),$("body").on("click",".control",function(e){var t=document.querySelector("t-stage"),n=e.currentTarget.getAttribute("data-category"),a=e.currentTarget.getAttribute("data-component");t.addToBuilder(a,n)}),$(".component-list").on("click","paper-item.menu-item",function(){$(".component-list").toggleClass("active")}),$(".headerText").on("keydown",function(e){13===e.which&&($(this).blur(),window.getSelection().removeAllRanges())}),$(".headerText").on("focus",function(){function e(e){var t=document.createRange();t.selectNodeContents(e);var n=window.getSelection();n.removeAllRanges(),n.addRange(t)}var t=this;$(this).removeClass("inactive"),requestAnimationFrame(function(){e(t)})}),$(".headerText").on("blur",function(){var e=document.querySelector("t-stage"),t=$(this).text().trim(),n=t.toLowerCase().replace(/\s+/,"-"),a=$(this);0===t.length?a.hasClass("form-header")?a.text("Untitled Form"):a.text("Untitled Page"):(e.updateBuilderState("heading",t),e.updateBuilderState("name",n)),this.scrollLeft=0,a.addClass("inactive")})};!function(e){"use strict";var t=e.querySelector("#app");t.baseUrl="",t.menu=null,""===window.location.port&&(t.baseUrl="/fusion"),"/page"===window.location.pathname?(t.builderType="t-page",t.isPage=!0,t.builderUrl="page-manifest.json",t.canvasName="Untitled Page",t.tab="page",t.route="canvas"):"/form"===window.location.pathname?(t.builderType="t-form",t.isPage=!1,t.builderUrl="form-manifest.json",t.canvasName="Untitled Form",t.tab="form",t.route="canvas"):"/"===window.location.pathname&&(t.tab="form",t.route="browser"),t._getElementsInCategory=function(e){var n=t.menu.elements.filter(function(t){return t.category===e.name});return n},t._getPropertySource=function(e){return"bower_components/"+t.builderType+"/property.json"},t.toggleAccordion=function(t,n,a){var o=t.currentTarget,r=e.querySelector(".menu-item.active");o.classList.contains("active")?o.classList.remove("active"):o.classList.add("active"),r&&r.classList.remove("active")},t._onElementsReceived=function(e){t.menu=e.detail.response,setTimeout(dragAndDropSetup)},t.displayInstalledToast=function(){Polymer.dom(e).querySelector("platinum-sw-cache").disabled||Polymer.dom(e).querySelector("#caching-complete").show()},t.addEventListener("dom-change",function(){t.$.manifestAjax&&t.$.manifestAjax.generateRequest()}),window.addEventListener("WebComponentsReady",function(){var e=$("t-component-panel")[0],t=$(".property-panel-Header")[0],n=$("t-stage")[0];n.componentPanel=e,n.componentPanelHeader=t})}(document);