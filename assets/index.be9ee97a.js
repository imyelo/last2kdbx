import{k as e,a as t,b as a,c as r,p as n,_ as o,n as l,r as s,f as c,F as i,d as u,e as d}from"./vendor.362ecc77.js";!function(e=".",t="__import__"){try{self[t]=new Function("u","return import(u)")}catch(a){const r=new URL(e,location),n=e=>{URL.revokeObjectURL(e.src),e.remove()};self[t]=e=>new Promise(((a,o)=>{const l=new URL(e,r);if(self[t].moduleMap[l])return a(self[t].moduleMap[l]);const s=new Blob([`import * as m from '${l}';`,`${t}.moduleMap['${l}']=m;`],{type:"text/javascript"}),c=Object.assign(document.createElement("script"),{type:"module",src:URL.createObjectURL(s),onerror(){o(new Error(`Failed to import: ${e}`)),n(c)},onload(){a(self[t].moduleMap[l]),n(c)}});document.head.appendChild(c)})),self[t].moduleMap={}}}("/assets/");e.CryptoEngine.argon2=function(e,a,r,n,o,l,s,c){return t.hash({pass:new Uint8Array(e),salt:new Uint8Array(a),time:n,mem:r,hashLen:o,parallelism:l,type:s,version:c}).then((({hash:e})=>e))};const p=a("app"),f=l.div`
  width: 100%;
  max-width: 100%;
  min-height: 360px;
  padding: 20px;
  box-sizing: border-box;
  border: 1px solid #e6e6e6;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #333;
  background-color: #f6f6f6;
  font-weight: bold;
  font-size: 24px;
  cursor: pointer;
  transition: all .2s ease;
  &:hover {
    background-color: #fcfcfc;
  }
  .dragging {
    background-color: #f3f3f3;
  }
  .input {
    display: none;
  }
`,m=({className:e="",placeholder:t="Load file",onChange:a})=>{const[r,n]=s.useState(!1),o=s.useRef(null),l=s.useCallback((e=>{var t,r;a((null==(r=null==(t=e.target)?void 0:t.files)?void 0:r[0])||null)}),[]),c=s.useCallback((()=>{var e;null==(e=o.current)||e.click()}),[]),i=s.useCallback((e=>{e.preventDefault(),n(!0)}),[]),u=s.useCallback((e=>{e.preventDefault(),n(!1)}),[]),d=s.useCallback((e=>{e.preventDefault(),n(!1),a(e.dataTransfer.items[0].getAsFile())}),[]);return s.createElement(f,{className:`${e} ${r?"dragging":""}`,onClick:c,onDragOver:i,onDragLeave:u,onDrop:d},s.createElement("input",{className:"input",type:"file",onChange:l,ref:o}),t)},g=l.div`
  height: 100%;
  padding: 20px 40px;
  box-sizing: border-box;
  background-color: #9E2A2B;
  color: #FFF3B0;
  .title {
    text-align: left;
    font-size: 16px;
    font-weight: bold;
    margin: 2em 0;
  }
  .file {
    background-color: #E09F3E;
    border: none;
    color: #540B0E;
    &:hover {
      background-color: #FFF3B0;
    }
    &.dragging {
      background-color: #FFF3B0;
    }
  }
`,b=async(t,a="output.csv")=>{try{const l=(e=>{const t=r.Buffer.alloc(null==e?void 0:e.byteLength),a=new Uint8Array(e);for(let r=0;r<t.length;r++)t[r]=a[r];return t})(await t.arrayBuffer()),s=await(async t=>{var a,l;const s=n.parse(t.toString("utf8").trim(),{header:!0});p(s);const c=new e.Credentials(e.ProtectedValue.fromString(""),null),i=await e.Kdbx.create(c,"My new db"),u=o.uniq(null==(a=s.data)?void 0:a.map((e=>e.grouping))),d=o.object(u.map((e=>[e,i.createGroup(i.getDefaultGroup(),e)])));null==(l=s.data)||l.forEach((e=>{const t=i.createEntry(d[e.grouping]);t.fields.Title=e.name,t.fields.UserName=e.username,t.fields.Password=e.password,t.fields.URL=e.url,t.fields.Note=e.extra,t.pushHistory()}));const f=await i.save();return Promise.resolve(r.Buffer.from(f))})(l),c=new File([s],a,{type:"text/plain;charset=utf-8"});i.saveAs(c)}catch(l){u(l.message)}},h=()=>{const e=s.useCallback((e=>{e&&b(e,`${e.name.replace(/\.csv$/,"")}-${c(new Date,"YYYYMMDDhhmmss")}.kdbx`)}),[]);return s.createElement(g,null,s.createElement("div",{className:"title"},"Convert LastPass CSV to KDBX"),s.createElement(m,{className:"file",onChange:e}))};d.render(s.createElement(s.StrictMode,null,s.createElement(h,null)),document.getElementById("root"));
