import { createElement, Component, PureComponent, createRef, forwardRef, Children, Fragment, cloneElement } from "react";
import * as on from "events";
console.log(on)
import EventEmitter from "events";
import { createId } from "@paralleldrive/cuid2";
import * as rfc from "rfc6902";
import Dudu, { Build_DuDu } from "./assets/dudu";
import axios from "axios";
import React from "react";
import ReactDOM from "react-dom/client";
import * as antd from "antd";
import * as antdpro from "@ant-design/pro-components";
import * as antdicons from "@ant-design/icons";
import Editor from "@monaco-editor/react";
import * as RcTweenOne from "rc-tween-one";
import * as xyflow from "@xyflow/react";
import ELK from "elkjs";
import store from "store";
import observerStore from "store/plugins/observe";
import * as lodash from "lodash";
import { animate } from "animejs";
import 'handsontable/dist/handsontable.full.min.css';
import { registerAllModules } from 'handsontable/registry';
import * as handsontableReact from "@handsontable/react";
import { HyperFormula } from "hyperformula";
import Sortable from "sortablejs";
import ImgCrop from 'antd-img-crop';
import * as cssGui from '@compai/css-gui';
registerAllModules();

// const _ = lodash();
// console.log("___-", _);
window.crypto.randomUUID = createId;
store.addPlugin(observerStore)
const AsyncFunction = (async function(){}).constructor;
let __emitter = new EventEmitter();
__emitter.setMaxListeners(0);
let images = new Map(), containers = new Map(), slotsMap = new Map(), loading = new Set();
window.containers = containers;
window.slotsMap = slotsMap;
let streamContainers = new Map();
let globalContainer = {};
let localContainer = {};
let init = Date.now();
let Loading = antd.Spin;

let DomAttributes = new Map([
  ["class", "className"]
])

let setSlots = async (module_alias, manySlot) => {
  slotsMap.set(module_alias, manySlot);
}
let deleteSlots = async (module_alias) => {
  slotsMap.delete(module_alias)
}
let getSlot = async (module_alias, slotname) => {
  let alias = slotsMap.get(module_alias);
  if (alias) {
    let slot = slotsMap.get(module_alias)[slotname] || [];
    // delete slotsMap.get(module_alias)[slotname];
    return slot
  } else {
    return []
  }
}
let setModule = async (module_id, elements, root = "root") => {
  images.set(module_id, module_id)
  containers.set(module_id, new Map([
    ["root", root],
    ["elements", elements],
    ["elroot", elements[root]]
  ]))
};

let getElement = async ({module_id, element_id, alias = null}) => {
  return new Promise( async (resolve, reject) => {
    try {
      if (!module_id) { reject("No 'module_id' be provided!")}
      if (images.has(module_id)) {
        resolve(containers.get(images.get(module_id)).get("elements")[element_id])
      } else if (containers.has(module_id)) {
        images.set(alias || module_id, module_id);
        resolve(containers.get(module_id).get("elroot"))
      } else {
        __emitter.once(module_id, el => {
          images.set(alias || module_id, module_id);
          resolve(el);
        })
        if (!loading.has(module_id)) {
          loading.add(module_id);
          console.log("Load module", module_id, Date.now() - init, import.meta.env);
          let res = await axios({
                      method: "post",
                      url: import.meta.env.VITE_GRAPHQL_URL_APP,
                      data: {
                        query: `query Get_clibkgqe60001tr2ef6bmewkn($getClibkgqe60001Tr2Ef6BmewknId: ID!) { app:get_clibkgqe60001tr2ef6bmewkn(id: $getClibkgqe60001Tr2Ef6BmewknId) {id, tag:clibkifsu0005tr2erfs4i2t4, elements:cliewwj1e0002trh7ymyo2n4t, root:cliewwzlm0005trh7cic2yjgt, name:cliez27jr0003trd31dylvg3g}}`,
                        variables: {'getClibkgqe60001Tr2Ef6BmewknId': module_id} },
                      headers: {
                        "Content-Type": "application/json",
                        // "Sec-Fetch-Site": "cross-site"
                      },
                      // maxRedirects: 20,
                      // timeout: 1000
                    })
                      .then(async ({errors, data}) => {
                        if (!errors) {
                          console.log(  "res",module_id, Date.now() - init);
                          let els = JSON.parse(data.data.app.elements);
                          containers.set(module_id, new Map([
                            ["id", data.data.app.id],
                            ["root", data.data.app.root],
                            ["name", data.data.app.name],
                            ["elements", JSON.parse(data.data.app.elements)],
                            ["elroot", els[data.data.app.root]],
                          ]));
                          loading.delete(module_id)
                          __emitter.emit(module_id, containers.get(module_id).get("elroot"));
                        }
                      })
                      .catch((err) => {
                        // reject(err?.response?.data)
                      });
        }
      }
    } catch (err) {
      reject(`${err.message} IN ${module_id}`)
    }
  })
};

let getKey = ( data, loopKey = [] ) => {
  let keyFinal = data;
  for ( let i = 0; i < loopKey.length; i++) {
    keyFinal = data[loopKey[i]]
  }
  return keyFinal
}

let newKey = () => createId();

let DragDropContainer = {
  dragParentSortable: null,
  dragParentSortableId: null,
}

class DraggableComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: createId(),
      className: "group-in-parent",
      sortable: null
    }
  }

  onMouseEnter = (e) => {
    e.preventDefault()
    e.stopPropagation();

    if (DragDropContainer.dragParentSortableId !== this.state.id) {
      DragDropContainer.dragParentSortableId = this.state.id;
      setTimeout(() => {
        if (DragDropContainer.dragParentSortable) {
          DragDropContainer.dragParentSortable.destroy()
        }
        DragDropContainer.dragParentSortable = new Sortable(document.getElementById(this.state.id), { 
          group: { name: 'nested', pull: true, put: true},
          animation: 150,
          fallbackOnBody: true, invertSwap: true, swapThreshold: 1,
          easing: "cubic-bezier(1, 0, 0, 1)",
          dragoverBubble: false,
         });
         console.log(this.state.id);
        }, 500)
      }  
    this.setState({
      className: "parent",
    })
  }

  onDragOver = (e) => {

  }

  onMouseLeave = (e) => {
    // e.stopPropagation();
    // this.setState({ className: ""});
    if (this.state.sortable) {
      // this.state.sortable.destroy();
      // this.setState({ sortable: null})
    }
    console.log(this.state.id)
  }

  componentDidMount() {
    let el = document.getElementById(this.state.id);
    console.log(el)
    // let sortable = new Sortable(document.getElementById(this.state.id), { 
    //   group: { name: 'nested', pull: true, put: true},
    //   animation: 500,
    //   fallbackOnBody: true, invertSwap: true, swapThreshold: 0.65
    //  });
    //  console.log(sortable)

  }
  
  render() {
    return (<div onDragEnter={e => { e.stopPropagation(); console.log("over", this.state.id)}} onContextMenu={this.onMouseEnter} onMouseLeave={this.onMouseLeave} id={this.state.id} className={this.state.className}>
      {this.props.children.map( (child, index) => (<div key={index}>{child}</div>))}
      </div>)
  }
}

class SimpleElement extends PureComponent {
  constructor (props) {
    super(props);
    this.__stream = this.props.__stream || {};
    this.element = this.props.element || []
    this.state = {
      stream: this.props.__stream || {},
      tag: this.element[0] || "div",
      events: [...this.element[1] || []].map( ([type, func_string]) => ([ type, async (event=null) => {
        await this.attachEvent(func_string, event);
      }])),
      attributes: this.element[2] || {},
      content: this.element[3] || null,
      children: [],
      loop: [],
      loopKey: null,
      display: true,
      that: createRef(null),
      key: createId()
    };
    this.stateProxy = new Proxy({}, {
      set: async (target, prop, value) => {
        // console.log("prop", prop, value, this.state);
        if (prop == "childrenCustom") {
          value = await Promise.all(value.map( async ( [element, target, alias]) => {
            // console.log([id, await this.renderElement({ module_id: this.props.__target.module_id, element_id: id}, element), alias])
            return [ ...await this.renderElement({ module_id: this.props.__target.module_id, element_id: this.props.__target.element_id}, element), alias || newKey()]
            // return [id, [ await this.renderElement({ target: this.props.__target.module_id, element_id: id}, element), target], alias]
          }))
          // console.log("editorCustom", value[0][0][0], this.state)
          // setTimeout( () => {
            this.stateProxy.children = value
          // }, 100)
        } else if ( prop == "children" ) { 
          this.setState({ children: value.filter( (el) => el)})
        } else if (prop == "events") {
          this.setState({ [prop]: [...value || []].map( ([type, func_string]) => ([ type, async (event=null) => {
            await this.attachEvent(func_string, event);
          }]))})
        } else {
            this.setState({ [prop]: value})
        }
        return true
      },
      get: (target, prop) => {
        switch (prop) {
          case "target":
            return this.state.that.current;
          case "reload":
          case "reloadDisplay":
            return (async (timeout = 1) => {
              return new Promise( async (resolve) => {
                setTimeout(() => {
                  this.setState({
                      key: newKey(),
                  }, () => {
                    this.init()
                  });
                }, timeout)
              })
            });
          case "reloadChildren":
            return (async (timeout = 100) => {
              console.log("reload", this.state)
              if (this.state.tag === "__component") {
                this.setState({
                  key: newKey()
              }, ()=> {});
              } else {
                await this.fetchChildren();
                setTimeout(() => {
                  this.setState({
                    children: this.state.children.map( ( [el,target, key]) => [el, target, newKey()])
                  })
                }, timeout )
                }
              });
              return
          default:
            return this.state[prop]
        }
      } 
    })
  }

  async attachEvent(func_string, event=null, config = { mode: "simple"}) {
    const defind = "let [$event, $global, $local, $stream, $] = arguments;";
    try {
      return await new AsyncFunction(defind + (config.mode === "full" ? `return await (${func_string})()` : `${func_string}`)).bind(this.stateProxy, event, this.props.__global, this.props.__local, this.__stream, {
        monaco: Editor,
        _: lodash,
        anime: animate,
        antd,
        antdpro,
        antdicons,
        xyflow,
        ImgCrop,
        rfc,
        ELK,
        cssGui,
        "@handsontable/react": handsontableReact,
        HyperFormula,
        r: React,
        f: async (child_func_string, child_event = null, child_config = {}) => {
          return await this.attachEvent(child_func_string, child_event, child_config)
        } ,
        c: ([el, target, alias], stream = {}) => {
          return React.createElement(SimpleElement, {
            __target: target ||el,
            element: el,
            __stream: Object.assign({}, this.state.stream, stream, { _childIndex: "custom" }),
            key: alias || newKey(),
            __global: this.props.__global,
            __local: this.props.__local
          })
        },
        rce: React.createElement,
        rcr: ReactDOM.createRoot,
        rus: React.useState,
        rue: React.useEffect,
        rur: React.useRef,
        rto: RcTweenOne,
        assign: (target, arg1, arg2, arg3) => {
          target = Object.assign( target, arg1, arg2 || {}, arg3 || {})
        }
      })();
    } catch (err) {
      console.log(`${err.message} IN '${func_string}' AT ${this.props.__local.__name}-${this.props.element_id}`);
    }
  }

  async init() {
    if ( this.state.tag === "script") {
      const script = document.createElement('script');
      Object.entries(this.stateProxy.attributes).forEach( ([key, val]) => script.setAttribute(key, val));
      document.head.appendChild(script);
    }
    if ( !["__module", "slot", "loop"].includes(this.state.tag) && this.stateProxy.target && typeof (this.state.tag) === "string") {
      Object.entries(this.stateProxy.attributes).forEach( ([key, val]) => this.stateProxy.target.setAttribute(key, key === "class" ? `e-${this.props.element_id || null} ${val}`  : val));
    }
    for await ( const [type, func] of this.stateProxy.events) {
      if ( type === "mount") {
        await func()
      } else if ( !["beforeupdate", "afterupdate", "destroy"].includes(type)) {
        this.stateProxy.target.addEventListener( type, func)}
      }
      if (this.state.children.length == 0) {
        await this.fetchChildren();
      }
  }

  async renderElement(target, element) {
    if (element[0] == "__module") {
      // let module_alias = window.crypto.randomUUID();
      // let slots = await Promise.all((element[4] || []).map( async x => {
      //   let slot = (await getElement({ module_id: target.module_id, element_id: x}));
      //     return [ target.module_id, x, (slot[2] && slot[2].slot) ? slot[2].slot : "default", slot]
      //   }));
      // if (slots.length > 0) {
      //   setSlots(module_alias, Object.groupBy( slots, ([m, e, t, E]) => t))
      // }
      // let [ _tag, _events, _attrs, _content, _children ] = await getElement({ module_id: element[3], alias: module_alias});
      // return [element, { module_id: module_alias }]
      return [ element, target]
    } else if ( element[0] === "slot") {
      // let slots = await getSlot(target.module_id, (element[2] || {}).name || "default");
      // if (slots[0]) {
      //   return [slots[0][3], { module_id: slots[0][0], element_id: slots[0][1]}]
      // } else {
      //   return null
      // }
      // let [ module_id, element_id, slotname, element] = await getSlot(target.module_id, element[2].name || "default");
      // return [ element, { module_id, element_id, slotname} ]
    }
    return [ element, target]
  }

  async fetchElement(tar) {
    let element = await getElement(tar);
    if (!element) {
      return [["div", null, null, "Element is null"]]
    } else {
      return await this.renderElement(tar, element)
    }
  }

  async fetchChildren() {
    if (this.props.element[0] == "__module") {
      let module_alias = createId();
      let slots = await Promise.all((this.props.element[4] || []).map( async x => {
        let slot = (await getElement({ module_id: this.props.__target.module_id, element_id: x}));
          return [ this.props.__target.module_id, x, (slot[2] && slot[2].slot) ? slot[2].slot : "default", slot]
        }));
      if (slots.length > 0) {
        setSlots(module_alias, Object.groupBy( slots, ([m, e, t, E]) => t))
      }
      let rootChild = await getElement({ module_id: this.props.element[3], alias: module_alias});
        this.stateProxy.children = [[rootChild, { module_id: module_alias }]]
    } else if (this.props.element[0] == "slot") {
      let slots = await getSlot( this.props.__target.module_id, (this.props.element[2] || {}).name || "default");
      if (slots[0]) {
        this.stateProxy.children = slots.map( (slot) => [slot[3], { module_id: slot[0], element_id: slot[1]}, newKey()])
      } else {
        return null
      }
    } else {
      let children = await Promise.all([ ...this.props.element[4] || []].map( async (id, index) => {
          return await this.fetchElement({ module_id: this.props.__target.module_id, element_id: id})
        }));
          this.stateProxy.children = children.filter(( [el, target] ) => el);
    }
  }

  async runFilterEvents(list_event_name, is_listener = false) {
    for await ( const [type, func] of this.stateProxy.events) {
      // console.log(list_event_name, this.props.__target.element_id)
      if ( list_event_name.includes(type)) {
        await func()
      } else if (is_listener) {
        this.stateProxy.target.addEventListener( type, func)}
      }
  }

  async listeningChange() {
    if (this.props.__local.__emitter) {
      this.props.__local.__emitter.on( this.props.__target.element_id, async ({ op, path, value}) => {
        if (path && path.hasOwnProperty(1) && value) {
          switch (path[1]) {
            case 1:
              if (path.hasOwnProperty(2)) {
                // if (path.hasOwnProperty(3)) {
                //   await removeEvent(path[2]);
                //   events[path[2]][path[3]] = (path[3] == 1) ? (async (event=null) => {await attachEvent(value, event);}) : value;
                //   await addEvent(path[2]);
                // } else {
                //   await removeEvent(path[2])
                //   if (!["remove"].includes(op)) {
                //     events[path[2]] = [ value[0], (async (event=null) => {await attachEvent(value[1], event);}) ]
                //     await addEvent(path[2])
                //   }
                // }
              }
              break;
            case 2:
              if (path[2]) {
                this.stateProxy.target.setAttribute(path[2], value)
              } else {
                Object.entries(value).forEach( ([key2, value2]) => {
                  this.stateProxy.target.setAttribute(key2, value2)
                })
              }
              break;
            case 3:
              this.stateProxy.content = value;
              break;
            case 4:
              setTimeout(async () => {
                // await this.fetchChildren()
              }, 500)
              break
            default:
              break;
          }
        } else {
          // await this.init()
        }
      })
    }
  }

  // Must run events for before Update when will mount because its not run auto when mounting
  UNSAFE_componentWillMount() { this.runFilterEvents("beforeupdate")}
  componentDidMount() { this.init(); 
    this.listeningChange();
   }
  UNSAFE_componentWillUpdate() {  this.runFilterEvents("beforeupdate")}
  componentDidUpdate() { this.runFilterEvents("afterupdate") }
  // componentShou

  render() {
    
    if (this.state.display) {
      // if (typeof(this.state.tag) === "string") {
        switch (this.state.tag) {
          case "loop":
            return (
              <Fragment key={this.state.key}>
                {this.state.loop.map( (_datachild, _index) => {
                  return <Fragment key={ this.state.loopKey === null ? _index : (getKey(_datachild, this.state.loopKey))}>
                    {this.state.children.map( ([el, target, alias], _childIndex) => (
                      <SimpleElement element_id={target?.element_id || alias} key={ _childIndex} __target={target} element={el} __stream={Object.assign({}, this.state.stream, {[this.state.content]: _datachild, [`_${this.state.content}`]: _index, _childIndex})} {...{ __global: this.props.__global, __local: this.props.__local}}></SimpleElement>
                    ))}
                  </Fragment>
        })}
              </Fragment>
            )
          case "__component":
            return <AppComponent key={this.state.key} __global={this.props.__global} __type={this.state.attributes.__type} __updatedAt={this.state.attributes.__updatedAt} __local={this.state.attributes.__local} __elements={ this.state.attributes.__elements} __name={"component"} __stream={Object.assign({}, this.state.stream)}></AppComponent>
          case "__module":
            return ([this.state.children.map( ([el, target, alias], _childIndex) => (
                <SimpleElement element_id={target?.element_id || alias} __target={target || el} element={el} __stream={Object.assign({}, this.state.stream, { _childIndex })} key={ alias || _childIndex} {...{ __global: this.props.__global, __local: this.props.__local}}></SimpleElement>
            ))]
            )
            return JSON.stringify(this.state.children)
            // if (this.state.children.length > 0) {
            //   return <SimpleElement __global={this.props.__global} __local={this.props.__local} element={this.state.children[0][1]} __target={{ module_id: this.state.children[0][0] }} __stream={Object.assign({}, this.state.stream)} ></SimpleElement>
            // } else {
            //   return "Loading"
            // }
          case "link":
            return <this.state.tag ref={this.state.that}/>
          case "script":
            return <></>
          case "input":
            return <this.state.tag ref={this.state.that}/>
          case "slot":
               return (this.state.children.map(( [element, target, alias], _childIndex) => (
                  <SimpleElement element_id={target?.element_id || alias} __target={target} element={element} __stream={Object.assign({}, this.state.stream, { _childIndex: 0 })} key={alias || _childIndex} {...{ __global: this.props.__global, __local: this.props.__local}}></SimpleElement>
                 )))
            // return JSON.stringify(this.state.children)
          case "__react":
            return "_"
          case "":
            return <>{this.state.content}</>
          default:
            if ( typeof(this.state.tag) !== "string" && [ ...(this.props.element[4] || [])].length === 0) {
              return (
                <this.state.tag key={this.state.key || createId()} key-id={this.props.__target.element_id} {... (typeof(this.state.tag) != "string" ? this.state.attributes : {})} >
              </this.state.tag>)
            } else if ( typeof(this.state.tag) === "string" ) {
              return <Fragment>
                <this.state.tag ref={this.state.that} key={this.state.key || createId()} key-id={this.props.__target.element_id} {... (typeof(this.state.tag) != "string" ? this.state.attributes : {})} >
                  {this.state.content}
                  {[this.state.children.map( ([el, target, alias], _childIndex) => (
                      <SimpleElement element_id={target?.element_id || alias} __target={target || el} element={el} __stream={Object.assign({}, this.state.stream, { _childIndex })} key={ alias || _childIndex} {...{ __global: this.props.__global, __local: this.props.__local}}></SimpleElement>
                  ))]}
                </this.state.tag>
              </Fragment> 
            } else {
              return <this.state.tag key={this.state.key}  key-id={this.props.__target.element_id} {... (typeof(this.state.tag) != "string" ? this.state.attributes : {})} >
                {this.state.content}
                {[this.state.children.map( ([el, target, alias], _childIndex) => (
                    <SimpleElement element_id={target?.element_id || alias} __target={target || el} element={el} __stream={Object.assign({}, this.state.stream, { _childIndex })} key={ alias || _childIndex} {...{ __global: this.props.__global, __local: this.props.__local}}></SimpleElement>
                ))]}
              </this.state.tag>
            }
        }
      // } else {
      //   if ([ ...(this.props.element[4] || [])].length === 0) {
      //     return <this.state.tag ref={this.state.that} key={this.state.key} key-id={this.props.element_id} {... (typeof(this.state.tag) != "string" ? this.state.attributes : {})} >
      //           </this.state.tag>
      //   }
      // }
    // } else {
    //   return <p>Nodisplay</p>
    }
  }

}

console.log(import.meta.env, "connect")

class AppComponent extends Component {
  constructor (props) {
    super(props);
    this.state = {
      __global: new Proxy({
        __createLocalObject: () => { 
          console.log("Creating Local Object", this.state.module_id ,this.props, this.state)
          let __local = new Proxy({
          __emitter: new EventEmitter(),
          __emitterContainer: {  },
          __emitterKeys: {  },
          __emitterObject: EventEmitter,
          __socketObject: Dudu.graphqlClient,
          __duduObject: Build_DuDu,
          __dudu: new Build_DuDu(),
          __framework: "reactjs",
          __log: [],
          _:lodash,
          _message: [],
          state: new Map(),
          setState: async function(stateItems) {
            await Promise.all([ ... ((stateItems.constructor === Object) ? Object.entries(stateItems) : stateItems)].map( ([itemKey, itemValue]) => {
              this._emit(itemKey, itemValue, { confirm: true });
              this.state.set(itemKey, itemValue)
            }));
            let url = new URL(window.location);
            url.search = new URLSearchParams([...this.state].map( ([key, value]) => [key, typeof(value) === 'object' ? JSON.stringify(value) : value]));
            window.history.replaceState(this.state, "", url);
            window.location.hash = Date.now();
          },
          __: {
              React, ReactDOM, antd
            },
          _store: store,
          _socket: {
            _headers: {},
            setAccessToken: (accessToken) => {
              __local._socket._headers = Object.assign(__local._socket._headers, {
                "Authorization": `Bearer ${accessToken}`
              })
            },
            connect: async (schema) => {
              __local._socket[schema] = new __local.__socketObject();
              __local._socket[schema].setHeaders(__local._socket._headers)
              await __local._socket[schema].connect( `${import.meta.env.VITE_GRAPHQL_URL}/${schema}`);
            }
          },
          _soc: async function(schema, func, properties = {}) {
            let _lineMessage = properties.name || "default";
            this._emit("__message", {
              key: _lineMessage, type: "loading", content: properties.name || "Loading ..."
            })
            if (!this._socket[schema]) { await this._socket.connect(schema); }
            let socRes = await func(this._socket[schema]);
            this._emit("__message", {
              key: _lineMessage, type: "success", content: properties.name || "Success!", duration: 1
            })
            return socRes
          },
            _once: async function(event_name, funcOn, config = false, keyOn = null) {
              if (!this.__emitterKeys[event_name]) { this.__emitterKeys[event_name] = createId() }
                let { key, init } = Object.assign({ init: false, key: keyOn || createId() }, config.constructor === Object ? config : ({ init: config }));
                if (!this.__emitterContainer[event_name]) {
                  this.__emitterContainer[event_name] = new Map();
                }
                this.__emitterContainer[event_name].set(key, funcOn);
                if (init) { funcOn() }
                // console.log("keyOn", key, init)
                this.__emitter.once(this.__emitterKeys[event_name], async ({ value, keyApply: keyEmit }) => {
                  // console.log("keyEmit", keyEmit)
                  this.__emitter.emit(keyEmit, { status: "init" })
                  await funcOn(value)
                  this.__emitter.emit(keyEmit, { status: "complete" })
                })
              },
          _on: async function(event_name, funcOn, config = false, keyOn = null) {
            if (!this.__emitterKeys[event_name]) { this.__emitterKeys[event_name] = createId() }
              let { key, init } = Object.assign({ init: false, key: keyOn || createId() }, config.constructor === Object ? config : ({ init: config }));
              if (!this.__emitterContainer[event_name]) {
                this.__emitterContainer[event_name] = new Map();
              }
              this.__emitterContainer[event_name].set(key, funcOn);
              if (init) { await funcOn(this[event_name]) }
              // console.log("keyOn", key, init)
              this.__emitter.on(this.__emitterKeys[event_name], async ({ value, keyApply: keyEmit }) => {
                // console.log("keyEmit", keyEmit)
                this.__emitter.emit(keyEmit, { status: "init" })
                await funcOn(value)
                this.__emitter.emit(keyEmit, { status: "complete" })
              })
            },
          _emit: async function (event_name, value, config = false ) {
            if (!this.__emitterKeys[event_name]) { this.__emitterKeys[event_name] = createId() }
            let { confirm, async } = Object.assign({ confirm: false, async: false }, config.constructor === Object ? config : { confirm: config });
            if ( confirm ) { this[event_name] = value}
            return new Promise( (resolve, reject) => {
              let keyApply = newKey();
              if (async) {
                var [ onLength, hasListener ] = [ 0, false ];
                this.__emitter.on(keyApply, ({ status }) => {
                  if (status === "init") { onLength++, hasListener = true }
                  if (status === "complete") { onLength-- }
                  // console.log("keyLength", onLength)
                  if (!onLength) { resolve() }
                });
                setTimeout(() => { if (!hasListener) { resolve() } }, 100)
              }
              this.__emitter.emit(this.__emitterKeys[event_name], { value, keyApply });
              this.__emitter.emit(event_name, value);
              if (!async) { resolve() }
            })
          }
        }, {
            set(target, prop, value) { target[prop] = value; return true},
            get(target, prop) { return target[prop]}
        });
        // __local._socket["connect"] = async (schema) => {
          //   __local._socket[schema] = new __local.__socketObject();
          //   await __local._socket[schema].connect(`ws://localhost:4081/${schema}`);
          // };
        __local.__emitter.setMaxListeners(0);
        (async () => {
          __local.setState( await Promise.all([...new URLSearchParams(window.location.search)].map( async ([key, val]) => [key, (await Promise.resolve(() => JSON.parse(val)).then(f=>f()).catch(err=>undefined)) || val ])))
        })()
        window.__local = __local
        return __local
      }
      }, {
        set(target, prop, value) { target[prop] = value; return true},
        get(target, prop) { return target[prop]}
      }),
      __local: null,
      module_id: this.props.__elements ? "default" : (this.props.module_id || Dudu.param.get("appIds")),
      element: ["div", null, null, "Loading"],
      children: [["root", ["div", null, null, "Loading"]]],
      stream: {},
      time: new Date(),
      key: createId(),
      __updatedAt: null
    }
  }

  async parseComponentChildren() {
    if ( this.props.__elements) {
      await setModule( this.state.module_id, this.props.__elements);
    }
    let el = await getElement({module_id: this.state.module_id, element_id: "root"});
    if (JSON.stringify(el) !== JSON.stringify(this.state.children[0][1])) {
      this.setState({
        children: [["root", el, newKey()]],
        key: newKey()
      }, () => {
        console.log("Set Root", this.state.children, this.__local)
      });
    }
    console.log(`AppComponent mounted!`);
    console.log( "___local",this.state.__local)
  }

   static getDerivedStateFromProps(props, state) {
    return {
      ...(props.__updatedAt !== state.__updatedAt && props.__elements) ? { __updatedAt: props.__updatedAt } : {},
      ...(props.__global) ? { 
        __global: props.__global,
        __local: props.__local || state.__global.__createLocalObject()

      } : { __local: state.__global.__createLocalObject()}
    }

    // if (props.__updatedAt !== state.__updatedAt && props.__elements) {
    //     return {
    //       __updatedAt: props.__updatedAt
    //     }
    // } else {
    //   return null
    // }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.__updatedAt !== prevState.__updatedAt) {
      this.parseComponentChildren()
    }
  }


  componentDidMount() { this.parseComponentChildren(); globalContainer = this.state.__global; localContainer = this.state.__local  }

  render () {
    if ( this.state.__global && this.state.__local) {
      return (
          <Fragment>
            {[this.state.children.map( ([id, el, alias]) =>
            <SimpleElement __target={{ module_id: this.state.module_id, element_id:id }}  module_id={this.state.module_id} element_id={id} element={el} __stream={this.state.stream} key={alias || id} __global={this.state.__global} __local={this.state.__local}></SimpleElement>)]}
          </Fragment>
      )
    }
  }
}

export default AppComponent
