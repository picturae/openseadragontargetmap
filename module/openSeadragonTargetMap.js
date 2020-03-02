const e=function(e,t){return Number(Math.round(e+"e"+t)+"e-"+t)},t=function(t){this.name="TargetMap",this.element=document.createElement("targetmap"),this.element.style.position="absolute",this.element.style.boxShadow="inset 0 0 2px 2px blue",t.canvas.appendChild(this.element),this.resize=()=>{const n=t.world.getItemAt(0);if(!n)return;const i=n.getBounds(),r=t.viewport.pixelFromPoint(i.getTopLeft()),o=t.viewport.pixelFromPoint(i.getBottomRight());if(!function(){let e=Boolean(arguments.length);return Array.from(arguments).forEach(t=>{e=e&&"number"==typeof t&&Number.isFinite(t)}),e}(r.x,r.y,o.x,o.y))return;const s=e(r.x,3),a=e(r.y,3),l=e(o.x,3),h=e(o.y,3);this.element.style.left=`${s}px`,this.element.style.top=`${a}px`,this.element.style.width=`${l-s}px`,this.element.style.height=`${h-a}px`},t.addHandler("animation",()=>{this.resize()}),t.addHandler("open",()=>{this.resize()}),t.addHandler("rotate",()=>{this.resize()}),t.addHandler("resize",()=>{this.resize()}),this.resize()};var n=function(){var e=window.OpenSeadragon;if(!e&&!(e=require("openseadragon")))throw new Error("OpenSeadragon is missing.");e.Viewer.prototype.targetMap=function(){return this._targetMap||(this._targetMap=new t(this)),this._targetMap}}();export default n;
//# sourceMappingURL=openSeadragonTargetMap.js.map
