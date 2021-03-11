import{k as e,a,b as t,c as r,p as n,_ as o,n as l,r as s,f as c,F as i,d,e as u}from"./vendor.56714ef7.js";!function(e=".",a="__import__"){try{self[a]=new Function("u","return import(u)")}catch(t){const r=new URL(e,location),n=e=>{URL.revokeObjectURL(e.src),e.remove()};self[a]=e=>new Promise(((t,o)=>{const l=new URL(e,r);if(self[a].moduleMap[l])return t(self[a].moduleMap[l]);const s=new Blob([`import * as m from '${l}';`,`${a}.moduleMap['${l}']=m;`],{type:"text/javascript"}),c=Object.assign(document.createElement("script"),{type:"module",src:URL.createObjectURL(s),onerror(){o(new Error(`Failed to import: ${e}`)),n(c)},onload(){t(self[a].moduleMap[l]),n(c)}});document.head.appendChild(c)})),self[a].moduleMap={}}}("/assets/");e.CryptoEngine.argon2=async(e,t,r,n,o,l,s,c)=>a.hash({pass:new Uint8Array(e),salt:new Uint8Array(t),time:n,mem:r,hashLen:o,parallelism:l,type:s,version:c}).then((({hash:e})=>e));const p=t("app"),f=l.div`
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
`,m=({className:e="",placeholder:a="Load file",onChange:t})=>{const[r,n]=s.useState(!1),o=s.useRef(null),l=s.useCallback((e=>{var a,r;t((null==(r=null==(a=e.target)?void 0:a.files)?void 0:r[0])||null)}),[]),c=s.useCallback((()=>{var e;null==(e=o.current)||e.click()}),[]),i=s.useCallback((e=>{e.preventDefault(),n(!0)}),[]),d=s.useCallback((e=>{e.preventDefault(),n(!1)}),[]),u=s.useCallback((e=>{e.preventDefault(),n(!1),t(e.dataTransfer.items[0].getAsFile())}),[]);return s.createElement(f,{className:`${e} ${r?"dragging":""}`,onClick:c,onDragOver:i,onDragLeave:d,onDrop:u},s.createElement("input",{className:"input",type:"file",onChange:l,ref:o}),a)},g=l.div`
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
    border: 1px dashed #540B0E;
    color: #540B0E;
    &:hover {
      background-color: #FFF3B0;
    }
    &.dragging {
      background-color: #FFF3B0;
    }
  }
`,b=async(a,t="output.csv")=>{try{const l=(e=>{const a=r.Buffer.alloc(null==e?void 0:e.byteLength),t=new Uint8Array(e);for(let r=0;r<a.length;r++)a[r]=t[r];return a})(await a.arrayBuffer()),s=await(async a=>{var t,l;const s=n.parse(a.toString("utf8").trim(),{header:!0});p(s);const c=new e.Credentials(e.ProtectedValue.fromString(""),null),i=await e.Kdbx.create(c,"My new db"),d=o.uniq(null==(t=s.data)?void 0:t.map((e=>e.grouping))),u=o.object(d.map((e=>[e,i.createGroup(i.getDefaultGroup(),e)])));null==(l=s.data)||l.forEach((e=>{const a=i.createEntry(u[e.grouping]);a.fields.Title=e.name,a.fields.UserName=e.username,a.fields.Password=e.password,a.fields.URL=e.url,a.fields.Note=e.extra,a.pushHistory()})),p(i);const f=await i.save();return p(f),Promise.resolve(r.Buffer.from(f))})(l),c=new File([s],t,{type:"text/plain;charset=utf-8"});i.saveAs(c)}catch(l){d(l.message),console.error(l)}},h=()=>{const e=s.useCallback((e=>{e&&b(e,`${e.name.replace(/\.csv$/,"")}-${c(new Date,"YYYYMMDDhhmmss")}.kdbx`)}),[]);return s.createElement(g,null,s.createElement("div",{className:"title"},"Convert LastPass CSV to KDBX"),s.createElement(m,{className:"file",onChange:e}))};u.render(s.createElement(s.StrictMode,null,s.createElement(h,null)),document.getElementById("root"));
