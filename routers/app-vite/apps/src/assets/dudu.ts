import { io } from "socket.io-client";
import EventEmitter from "events";
import { createId } from "@paralleldrive/cuid2";
import { applyPatch } from "rfc6902";

class graphQlClient {
  private useSocket = false;
  private socket:any;
  private http_url: string;
  private ws_url: string;
  private cacheQueringMap = new Map();
  private cacheQueriedMap = new Map();
  private headers = { "content-type": "application/json" };
  private transports = ['websocket'];
  private reconectTime = 100;
  private log = (data) => {
    console.log(data);
  };
  private emitter: EventEmitter = new EventEmitter();
  constructor(args = {}) {};

  async setHeaders(addheaders) {
    this.headers = Object.assign(this.headers, addheaders)
  }

  async connect(url, useSocket: boolean = true) {
    this.emitter.setMaxListeners(0);
    this.socket = io( url || import.meta.env.VITE_GRAPHQL_URL_APP, {
      transports: this.transports,
      reconnectionDelay: 1000,
      reconnection: true
    });
    this.socket.on("error", ( error) => console.error( 'error', error));
    this.socket.on("connect", (soc) => { 
      console.log("Socket is connect", this.socket.connected);
      this.reconectTime = 100;
      this.emitter.emit("connect", true);
      this.socket.emit('data', {
        type: "connection_init",
        payload: {
          headers: this.headers
        }
      })
    });
    this.socket.on("data", ({ id, type, payload }) => { 
      console.log("id", id, type, payload, new Date())
      this.emitter.emit(id, { type, payload} )
    });
    this.socket.on("disconnect", (reason) => {
      if (reason === "io server disconnect") {
        // the disconnection was initiated by the server, you need to reconnect manually
        this.socket.connect();
      }
      // else the socket will automatically try to reconnect
    });

    let createReconnect = async () => {
      let loopReconnect = setInterval(() => {
          if (this.socket.connected) {
            clearInterval(loopReconnect)
          } else {
            console.log("Reconnect A: ", import.meta.env.VITE_GRAPHQL_URL_APP)
            this.socket.connect()
          }
        }, 1000);
        this.emitter.once("connected", () =>  clearInterval(loopReconnect))
    }

    this.socket.on("connect_error", async err => {
      await this.socket.disconnect();
      await this.socket.removeAllListeners()
      this.transports = (this.transports?.[0] == 'websocket') ? ['polling'] : ['websocket'];
      console.log("error", err.message, ` => Try socket connect with transport: ${this.transports?.[0]}`);
      this.reconectTime *= 2
      createReconnect()
    })
    createReconnect()
  };

  async sendData( data ) {
    // console.log("emit", data)
    if ( this.socket.connected) {
      this.socket.emit("data", data)
    } else {
      this.emitter.once("connect", () => {
        // console.log(data)
        this.socket.emit("data", data)
      })
    }
  }

  async query(query: string, variables: object, callback = (res: CallBackObject) => {}, cacheTimeout = 10000):Promise<CallBackObject> {
    let origin_id = createId();
    let payload = JSON.stringify({ query, variables });
    let cache = this.cacheQueriedMap.get(payload)
    if (cache) {
      console.log("cache", cache)
      callback(cache)
      return (cache)
    } else {
      let child_caching = this.cacheQueringMap.get(payload);
      if (child_caching) {
        this.cacheQueringMap.set(payload, [ ... child_caching, origin_id])
      } else {
        this.cacheQueringMap.set(payload, [origin_id])
        let query_id = createId();
        this.sendData({ payload, id: query_id, type: "query" });
        this.emitter.once(query_id, (res_data) => {
          if (["error", "data"].includes(res_data.type)) {
            this.cacheQueriedMap.set(payload, res_data.payload)
            let waiters = this.cacheQueringMap.get(payload);
            waiters.forEach( _idnearlistener => this.emitter.emit(_idnearlistener, res_data))
            this.cacheQueringMap.delete(payload)
            setTimeout( () => {
              this.cacheQueriedMap.delete(payload)
            }, cacheTimeout)
          }
        })
      }
    }
    let res_data = await new Promise((resolve)=>{
      this.emitter.once(origin_id, ({ type, payload}) => {
        console.log( "query", type, payload)
        resolve(payload)
      })
    });
    console.log("res_data", res_data)
    callback(res_data);
    return res_data
  }

  async watch(query: string, variables: object, callback = (res: CallBackObject) => {}) {
    let [id, full_patch] = [createId(), {}];
    this.sendData ({ payload: JSON.stringify({ query, variables }), id, type: "start" });

    this.emitter.on(id, ({ type, payload}) => {
      if (type == "patch") {
        applyPatch(full_patch, payload)
        callback(full_patch);
      } else if ( ["error", "data"].includes(type)) {
        full_patch = payload
        callback(full_patch);
      }
      // console.log(id, full_patch)
      if ( !["patch", "data"].includes(type)) {
        this.emitter.removeAllListeners(id);
      }
    });

    return async () => {
      this.emitter.removeAllListeners(id);
      this.socket.emit("data", { id, type: "stop" });
    };
  }
}

class Build_DuDu {
  constructor() {}

  graphqlClient = graphQlClient

  ok = () => {
    console.log("Dudu is mounting!")
  };

  waitLibrary = (libraryName) => { return new Promise( (resolve, reject) => {
    let first = false;
    function _check() { if (typeof window[libraryName] != 'undefined') { 
      if (first) {
        console.log(`Finded library "${libraryName}"`)
      }
      resolve(true)
    } else {
      if (!first) {
        console.log(`Waiting library "${libraryName}"`)
      } else { first = true}
      setTimeout( _check, 100)
    };}; _check();
  })};

  listen = (selector, type, func) => {
    document.query(selector).addEventListener(type, (event) => { func(event) })
  };

  listens = (selector, type, func) => {
    Array.from(this.document.querySelectorAll(selector)).forEach( tar => {
      tar.addEventListener(type, (event) => { func(event)})
    })
  };

  batchListen = ( ...target_type_func_list ) => {
    [...target_type_func_list].forEach( ([selector, type, func]) => {
      document.querySelector(selector).addEventListener(type, (event) => { func(event)})
    })
  }

  query = (selector) => {
    var nodes = Array.from(document.querySelectorAll(selector));
    Array.from(document.querySelectorAll(".checkout > iframe")).map((iframe, _index) => {
      // @ts-ignore
      var from_iframe = Array.from(iframe.contentDocument.querySelectorAll(selector));
      nodes = nodes.concat(from_iframe);
    });
    return nodes;
  };

  headline = (nodelist, text) => {
    nodelist.forEach((node) => {
      node.firstChild.textContent = text;
    });
  };

  toDateTime = (timestamp) => {
      let time = new Date(timestamp);
      return `${time.getDate().toString().padStart(2, '0')}/${(time.getMonth()+1).toString().padStart(2, '0')} ${time.getHours().toString().padStart(2, '0')}:${time.getMinutes().toString().padStart(2, '0')}`
  }

  vnd = (number) => {
    return new Intl.NumberFormat("vi-vn", {
      style: "currency",
      currency: "VND",
    }).format(Number(number));
  };

  select = (nodelist, options, selected, onSelect) => {
    nodelist.forEach((node) => {
      node.removeEventListener("change", onSelect);
    });
    nodelist.forEach((node) => {
      var older_select = 0;
      if (node.hasChildNodes()) {
        // node.innerHTML = '<option value="">Chọn phân loại hàng:</option>';
        node.innerHTML = "";
      }
      Object.keys(options).map((opt, _index) => {
        node.insertAdjacentHTML("beforeend", `<option value="${opt}">${options[opt].display}</option>`);
        if (opt == selected) {
          older_select = _index;
        }
      });
      node.selectedIndex = older_select;
      node.addEventListener("change", onSelect);
    });
  };
  backgroundImage = (nodelist, url_img) => {
    nodelist.forEach((node) => {
      node.querySelector(".ladi-image > .ladi-image-background").style.backgroundImage = `url(${url_img})`;
      node.querySelector(".ladi-image > .ladi-image-background").classList.remove("ladi-lazyload");
    });
  };

  ladi = {
    show : (selector) => {
      // @ts-ignore
      window.ladi(selector.slice(1,)).show();
    },
  
    hide : (selector) => {
      // @ts-ignore
      window.ladi(selector.slice(1,)).hide();
    }
  };

  disk = {
    set: (key, val) => {
      window.localStorage.setItem(key, JSON.stringify(val))
    },

    get: (key) => {
      var res = window.localStorage.getItem(key);
      if (res == null) {
        return false
      } else {
        try {
          return JSON.parse(res);
        } catch (err) {
          return false
        }
      }
    }
  };

  cookie = {
    set: (key, val, days = 30) => {
      const d = new Date();
      d.setTime(d.getTime() + (days*24*60*60*1000));
      let expires = "expires="+ d.toUTCString();
      document.cookie = key + "=" + val + ";" + expires + ";path=/";
    },

    get: (key) => {
      let name = key + "=";
      let decodedCookie = decodeURIComponent(document.cookie);
      let ca = decodedCookie.split(';');
      for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return false;
    },

    getAll: () => {
      let decodedCookie = decodeURIComponent(document.cookie);
      let ca = decodedCookie.split(';');
      let dict_cookies = Object.fromEntries( ca.map( (coo) => {
        while (coo.charAt(0) == ' ') {
          coo = coo.substring(1);
        };
        let equal_index = coo.indexOf("=");
        return [coo.slice(0, equal_index), coo.slice(equal_index +1)]
      }));
      return dict_cookies;
    }
  };

  param = {
    get: (key) => {
      let match = RegExp("[?&]" + key + "=([^&]*)").exec(window.location.search);
      return match && decodeURIComponent(match[1].replace(/\+/g, " "));
    },
    set: (query, keep = false) => {
      let new_query = new URLSearchParams(keep && window.location.search)
      for ( let [key,val] of Object.entries(query)) {
        new_query.set(key, val);
      };
      window.location.search = new_query.toString()
    }
  };

  copy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) { alert(err)}
  }
}

var DuDu = new Build_DuDu()

export default DuDu;
export { DuDu, Build_DuDu };