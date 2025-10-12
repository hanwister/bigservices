var CheckoutWithForm = function() {
  "use strict";var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

  function noop() {
  }
  function assign(tar, src2) {
    for (const k in src2)
      tar[k] = src2[k];
    return tar;
  }
  function run(fn) {
    return fn();
  }
  function blank_object() {
    return /* @__PURE__ */ Object.create(null);
  }
  function run_all(fns) {
    fns.forEach(run);
  }
  function is_function(thing) {
    return typeof thing === "function";
  }
  function safe_not_equal(a, b) {
    return a != a ? b == b : a !== b || (a && typeof a === "object" || typeof a === "function");
  }
  let src_url_equal_anchor;
  function src_url_equal(element_src, url2) {
    if (!src_url_equal_anchor) {
      src_url_equal_anchor = document.createElement("a");
    }
    src_url_equal_anchor.href = url2;
    return element_src === src_url_equal_anchor.href;
  }
  function is_empty(obj) {
    return Object.keys(obj).length === 0;
  }
  function create_slot(definition, ctx, $$scope, fn) {
    if (definition) {
      const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
      return definition[0](slot_ctx);
    }
  }
  function get_slot_context(definition, ctx, $$scope, fn) {
    return definition[1] && fn ? assign($$scope.ctx.slice(), definition[1](fn(ctx))) : $$scope.ctx;
  }
  function get_slot_changes(definition, $$scope, dirty, fn) {
    if (definition[2] && fn) {
      const lets = definition[2](fn(dirty));
      if ($$scope.dirty === void 0) {
        return lets;
      }
      if (typeof lets === "object") {
        const merged = [];
        const len = Math.max($$scope.dirty.length, lets.length);
        for (let i2 = 0; i2 < len; i2 += 1) {
          merged[i2] = $$scope.dirty[i2] | lets[i2];
        }
        return merged;
      }
      return $$scope.dirty | lets;
    }
    return $$scope.dirty;
  }
  function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
    if (slot_changes) {
      const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
      slot.p(slot_context, slot_changes);
    }
  }
  function get_all_dirty_from_scope($$scope) {
    if ($$scope.ctx.length > 32) {
      const dirty = [];
      const length2 = $$scope.ctx.length / 32;
      for (let i2 = 0; i2 < length2; i2++) {
        dirty[i2] = -1;
      }
      return dirty;
    }
    return -1;
  }
  function append(target, node) {
    target.appendChild(node);
  }
  function append_styles(target, style_sheet_id, styles) {
    const append_styles_to = get_root_for_style(target);
    if (!append_styles_to.getElementById(style_sheet_id)) {
      const style = element("style");
      style.id = style_sheet_id;
      style.textContent = styles;
      append_stylesheet(append_styles_to, style);
    }
  }
  function get_root_for_style(node) {
    if (!node)
      return document;
    const root = node.getRootNode ? node.getRootNode() : node.ownerDocument;
    if (root && root.host) {
      return root;
    }
    return node.ownerDocument;
  }
  function append_stylesheet(node, style) {
    append(node.head || node, style);
    return style.sheet;
  }
  function insert(target, node, anchor) {
    target.insertBefore(node, anchor || null);
  }
  function detach(node) {
    if (node.parentNode) {
      node.parentNode.removeChild(node);
    }
  }
  function destroy_each(iterations, detaching) {
    for (let i2 = 0; i2 < iterations.length; i2 += 1) {
      if (iterations[i2])
        iterations[i2].d(detaching);
    }
  }
  function element(name) {
    return document.createElement(name);
  }
  function svg_element(name) {
    return document.createElementNS("http://www.w3.org/2000/svg", name);
  }
  function text(data) {
    return document.createTextNode(data);
  }
  function space() {
    return text(" ");
  }
  function empty$1() {
    return text("");
  }
  function listen(node, event, handler, options) {
    node.addEventListener(event, handler, options);
    return () => node.removeEventListener(event, handler, options);
  }
  function attr(node, attribute, value2) {
    if (value2 == null)
      node.removeAttribute(attribute);
    else if (node.getAttribute(attribute) !== value2)
      node.setAttribute(attribute, value2);
  }
  function init_binding_group(group) {
    let _inputs;
    return {
      /* push */
      p(...inputs) {
        _inputs = inputs;
        _inputs.forEach((input) => group.push(input));
      },
      /* remove */
      r() {
        _inputs.forEach((input) => group.splice(group.indexOf(input), 1));
      }
    };
  }
  function children(element2) {
    return Array.from(element2.childNodes);
  }
  function set_data(text2, data) {
    data = "" + data;
    if (text2.data === data)
      return;
    text2.data = data;
  }
  function set_input_value(input, value2) {
    input.value = value2 == null ? "" : value2;
  }
  function set_style(node, key, value2, important) {
    if (value2 == null) {
      node.style.removeProperty(key);
    } else {
      node.style.setProperty(key, value2, important ? "important" : "");
    }
  }
  function select_option(select, value2, mounting) {
    for (let i2 = 0; i2 < select.options.length; i2 += 1) {
      const option = select.options[i2];
      if (option.__value === value2) {
        option.selected = true;
        return;
      }
    }
    if (!mounting || value2 !== void 0) {
      select.selectedIndex = -1;
    }
  }
  function select_value(select) {
    const selected_option = select.querySelector(":checked");
    return selected_option && selected_option.__value;
  }
  function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
    const e = document.createEvent("CustomEvent");
    e.initCustomEvent(type, bubbles, cancelable, detail);
    return e;
  }
  let current_component;
  function set_current_component(component) {
    current_component = component;
  }
  function get_current_component() {
    if (!current_component)
      throw new Error("Function called outside component initialization");
    return current_component;
  }
  function onMount(fn) {
    get_current_component().$$.on_mount.push(fn);
  }
  function createEventDispatcher() {
    const component = get_current_component();
    return (type, detail, { cancelable = false } = {}) => {
      const callbacks = component.$$.callbacks[type];
      if (callbacks) {
        const event = custom_event(type, detail, { cancelable });
        callbacks.slice().forEach((fn) => {
          fn.call(component, event);
        });
        return !event.defaultPrevented;
      }
      return true;
    };
  }
  const dirty_components = [];
  const binding_callbacks = [];
  let render_callbacks = [];
  const flush_callbacks = [];
  const resolved_promise = /* @__PURE__ */ Promise.resolve();
  let update_scheduled = false;
  function schedule_update() {
    if (!update_scheduled) {
      update_scheduled = true;
      resolved_promise.then(flush);
    }
  }
  function add_render_callback(fn) {
    render_callbacks.push(fn);
  }
  function add_flush_callback(fn) {
    flush_callbacks.push(fn);
  }
  const seen_callbacks = /* @__PURE__ */ new Set();
  let flushidx = 0;
  function flush() {
    if (flushidx !== 0) {
      return;
    }
    const saved_component = current_component;
    do {
      try {
        while (flushidx < dirty_components.length) {
          const component = dirty_components[flushidx];
          flushidx++;
          set_current_component(component);
          update(component.$$);
        }
      } catch (e) {
        dirty_components.length = 0;
        flushidx = 0;
        throw e;
      }
      set_current_component(null);
      dirty_components.length = 0;
      flushidx = 0;
      while (binding_callbacks.length)
        binding_callbacks.pop()();
      for (let i2 = 0; i2 < render_callbacks.length; i2 += 1) {
        const callback = render_callbacks[i2];
        if (!seen_callbacks.has(callback)) {
          seen_callbacks.add(callback);
          callback();
        }
      }
      render_callbacks.length = 0;
    } while (dirty_components.length);
    while (flush_callbacks.length) {
      flush_callbacks.pop()();
    }
    update_scheduled = false;
    seen_callbacks.clear();
    set_current_component(saved_component);
  }
  function update($$) {
    if ($$.fragment !== null) {
      $$.update();
      run_all($$.before_update);
      const dirty = $$.dirty;
      $$.dirty = [-1];
      $$.fragment && $$.fragment.p($$.ctx, dirty);
      $$.after_update.forEach(add_render_callback);
    }
  }
  function flush_render_callbacks(fns) {
    const filtered = [];
    const targets = [];
    render_callbacks.forEach((c) => fns.indexOf(c) === -1 ? filtered.push(c) : targets.push(c));
    targets.forEach((c) => c());
    render_callbacks = filtered;
  }
  const outroing = /* @__PURE__ */ new Set();
  let outros;
  function group_outros() {
    outros = {
      r: 0,
      c: [],
      p: outros
      // parent group
    };
  }
  function check_outros() {
    if (!outros.r) {
      run_all(outros.c);
    }
    outros = outros.p;
  }
  function transition_in(block, local) {
    if (block && block.i) {
      outroing.delete(block);
      block.i(local);
    }
  }
  function transition_out(block, local, detach2, callback) {
    if (block && block.o) {
      if (outroing.has(block))
        return;
      outroing.add(block);
      outros.c.push(() => {
        outroing.delete(block);
        if (callback) {
          if (detach2)
            block.d(1);
          callback();
        }
      });
      block.o(local);
    } else if (callback) {
      callback();
    }
  }
  function bind(component, name, callback) {
    const index = component.$$.props[name];
    if (index !== void 0) {
      component.$$.bound[index] = callback;
      callback(component.$$.ctx[index]);
    }
  }
  function create_component(block) {
    block && block.c();
  }
  function mount_component(component, target, anchor, customElement) {
    const { fragment, after_update } = component.$$;
    fragment && fragment.m(target, anchor);
    if (!customElement) {
      add_render_callback(() => {
        const new_on_destroy = component.$$.on_mount.map(run).filter(is_function);
        if (component.$$.on_destroy) {
          component.$$.on_destroy.push(...new_on_destroy);
        } else {
          run_all(new_on_destroy);
        }
        component.$$.on_mount = [];
      });
    }
    after_update.forEach(add_render_callback);
  }
  function destroy_component(component, detaching) {
    const $$ = component.$$;
    if ($$.fragment !== null) {
      flush_render_callbacks($$.after_update);
      run_all($$.on_destroy);
      $$.fragment && $$.fragment.d(detaching);
      $$.on_destroy = $$.fragment = null;
      $$.ctx = [];
    }
  }
  function make_dirty(component, i2) {
    if (component.$$.dirty[0] === -1) {
      dirty_components.push(component);
      schedule_update();
      component.$$.dirty.fill(0);
    }
    component.$$.dirty[i2 / 31 | 0] |= 1 << i2 % 31;
  }
  function init$2(component, options, instance2, create_fragment2, not_equal, props, append_styles2, dirty = [-1]) {
    const parent_component = current_component;
    set_current_component(component);
    const $$ = component.$$ = {
      fragment: null,
      ctx: [],
      // state
      props,
      update: noop,
      not_equal,
      bound: blank_object(),
      // lifecycle
      on_mount: [],
      on_destroy: [],
      on_disconnect: [],
      before_update: [],
      after_update: [],
      context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
      // everything else
      callbacks: blank_object(),
      dirty,
      skip_bound: false,
      root: options.target || parent_component.$$.root
    };
    append_styles2 && append_styles2($$.root);
    let ready = false;
    $$.ctx = instance2 ? instance2(component, options.props || {}, (i2, ret, ...rest) => {
      const value2 = rest.length ? rest[0] : ret;
      if ($$.ctx && not_equal($$.ctx[i2], $$.ctx[i2] = value2)) {
        if (!$$.skip_bound && $$.bound[i2])
          $$.bound[i2](value2);
        if (ready)
          make_dirty(component, i2);
      }
      return ret;
    }) : [];
    $$.update();
    ready = true;
    run_all($$.before_update);
    $$.fragment = create_fragment2 ? create_fragment2($$.ctx) : false;
    if (options.target) {
      if (options.hydrate) {
        const nodes = children(options.target);
        $$.fragment && $$.fragment.l(nodes);
        nodes.forEach(detach);
      } else {
        $$.fragment && $$.fragment.c();
      }
      if (options.intro)
        transition_in(component.$$.fragment);
      mount_component(component, options.target, options.anchor, options.customElement);
      flush();
    }
    set_current_component(parent_component);
  }
  class SvelteComponent {
    $destroy() {
      destroy_component(this, 1);
      this.$destroy = noop;
    }
    $on(type, callback) {
      if (!is_function(callback)) {
        return noop;
      }
      const callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
      callbacks.push(callback);
      return () => {
        const index = callbacks.indexOf(callback);
        if (index !== -1)
          callbacks.splice(index, 1);
      };
    }
    $set($$props) {
      if (this.$$set && !is_empty($$props)) {
        this.$$.skip_bound = true;
        this.$$set($$props);
        this.$$.skip_bound = false;
      }
    }
  }
  const main = "";
  function get_each_context_1$1(ctx, list, i2) {
    const child_ctx = ctx.slice();
    child_ctx[15] = list[i2];
    return child_ctx;
  }
  function get_each_context$1(ctx, list, i2) {
    const child_ctx = ctx.slice();
    child_ctx[12] = list[i2];
    return child_ctx;
  }
  function create_else_block$1(ctx) {
    let t;
    let if_block1_anchor;
    function select_block_type_1(ctx2, dirty) {
      if (
        /*type*/
        ctx2[4] == "text"
      )
        return create_if_block_2$1;
      if (
        /*type*/
        ctx2[4] == "tel"
      )
        return create_if_block_3$1;
    }
    let current_block_type = select_block_type_1(ctx);
    let if_block0 = current_block_type && current_block_type(ctx);
    let if_block1 = (
      /*options*/
      ctx[3].length > 0 && create_if_block_1$1(ctx)
    );
    return {
      c() {
        if (if_block0)
          if_block0.c();
        t = space();
        if (if_block1)
          if_block1.c();
        if_block1_anchor = empty$1();
      },
      m(target, anchor) {
        if (if_block0)
          if_block0.m(target, anchor);
        insert(target, t, anchor);
        if (if_block1)
          if_block1.m(target, anchor);
        insert(target, if_block1_anchor, anchor);
      },
      p(ctx2, dirty) {
        if (current_block_type === (current_block_type = select_block_type_1(ctx2)) && if_block0) {
          if_block0.p(ctx2, dirty);
        } else {
          if (if_block0)
            if_block0.d(1);
          if_block0 = current_block_type && current_block_type(ctx2);
          if (if_block0) {
            if_block0.c();
            if_block0.m(t.parentNode, t);
          }
        }
        if (
          /*options*/
          ctx2[3].length > 0
        ) {
          if (if_block1) {
            if_block1.p(ctx2, dirty);
          } else {
            if_block1 = create_if_block_1$1(ctx2);
            if_block1.c();
            if_block1.m(if_block1_anchor.parentNode, if_block1_anchor);
          }
        } else if (if_block1) {
          if_block1.d(1);
          if_block1 = null;
        }
      },
      d(detaching) {
        if (if_block0) {
          if_block0.d(detaching);
        }
        if (detaching)
          detach(t);
        if (if_block1)
          if_block1.d(detaching);
        if (detaching)
          detach(if_block1_anchor);
      }
    };
  }
  function create_if_block$2(ctx) {
    let div;
    let each_value = (
      /*options*/
      ctx[3]
    );
    let each_blocks = [];
    for (let i2 = 0; i2 < each_value.length; i2 += 1) {
      each_blocks[i2] = create_each_block$1(get_each_context$1(ctx, each_value, i2));
    }
    return {
      c() {
        div = element("div");
        for (let i2 = 0; i2 < each_blocks.length; i2 += 1) {
          each_blocks[i2].c();
        }
        attr(div, "class", "flex flex-col p-2 pt-3 pb-1 border border-solid border-slate-400 rounded-lg");
      },
      m(target, anchor) {
        insert(target, div, anchor);
        for (let i2 = 0; i2 < each_blocks.length; i2 += 1) {
          if (each_blocks[i2]) {
            each_blocks[i2].m(div, null);
          }
        }
      },
      p(ctx2, dirty) {
        if (dirty & /*options, name, value*/
        11) {
          each_value = /*options*/
          ctx2[3];
          let i2;
          for (i2 = 0; i2 < each_value.length; i2 += 1) {
            const child_ctx = get_each_context$1(ctx2, each_value, i2);
            if (each_blocks[i2]) {
              each_blocks[i2].p(child_ctx, dirty);
            } else {
              each_blocks[i2] = create_each_block$1(child_ctx);
              each_blocks[i2].c();
              each_blocks[i2].m(div, null);
            }
          }
          for (; i2 < each_blocks.length; i2 += 1) {
            each_blocks[i2].d(1);
          }
          each_blocks.length = each_value.length;
        }
      },
      d(detaching) {
        if (detaching)
          detach(div);
        destroy_each(each_blocks, detaching);
      }
    };
  }
  function create_if_block_3$1(ctx) {
    let input;
    let mounted;
    let dispose;
    return {
      c() {
        input = element("input");
        attr(input, "type", "tel");
        attr(
          input,
          "name",
          /*name*/
          ctx[1]
        );
        attr(input, "class", "block focus:relative px-2.5 pb-2.5 pt-4 w-full text-gray-900 bg-transparent rounded-lg appearance-none outline-none border border-solid border-slate-400 focus:border-0 focus:ring-1 peer");
        attr(input, "placeholder", " ");
      },
      m(target, anchor) {
        insert(target, input, anchor);
        set_input_value(
          input,
          /*value*/
          ctx[0]
        );
        if (!mounted) {
          dispose = [
            listen(
              input,
              "blur",
              /*blur*/
              ctx[5]
            ),
            listen(
              input,
              "input",
              /*input_input_handler_1*/
              ctx[9]
            )
          ];
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (dirty & /*name*/
        2) {
          attr(
            input,
            "name",
            /*name*/
            ctx2[1]
          );
        }
        if (dirty & /*value, options*/
        9) {
          set_input_value(
            input,
            /*value*/
            ctx2[0]
          );
        }
      },
      d(detaching) {
        if (detaching)
          detach(input);
        mounted = false;
        run_all(dispose);
      }
    };
  }
  function create_if_block_2$1(ctx) {
    let input;
    let mounted;
    let dispose;
    return {
      c() {
        input = element("input");
        attr(input, "type", "text");
        attr(
          input,
          "name",
          /*name*/
          ctx[1]
        );
        attr(input, "class", "block focus:relative px-2.5 pb-2.5 pt-4 w-full text-gray-900 bg-transparent rounded-lg appearance-none outline-none border border-solid border-slate-400 focus:border-0 focus:ring-1 peer");
        attr(input, "placeholder", " ");
      },
      m(target, anchor) {
        insert(target, input, anchor);
        set_input_value(
          input,
          /*value*/
          ctx[0]
        );
        if (!mounted) {
          dispose = [
            listen(
              input,
              "blur",
              /*blur*/
              ctx[5]
            ),
            listen(
              input,
              "input",
              /*input_input_handler*/
              ctx[8]
            )
          ];
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (dirty & /*name*/
        2) {
          attr(
            input,
            "name",
            /*name*/
            ctx2[1]
          );
        }
        if (dirty & /*value, options*/
        9 && input.value !== /*value*/
        ctx2[0]) {
          set_input_value(
            input,
            /*value*/
            ctx2[0]
          );
        }
      },
      d(detaching) {
        if (detaching)
          detach(input);
        mounted = false;
        run_all(dispose);
      }
    };
  }
  function create_if_block_1$1(ctx) {
    let select;
    let option;
    let t;
    let span;
    let mounted;
    let dispose;
    let each_value_1 = (
      /*options*/
      ctx[3]
    );
    let each_blocks = [];
    for (let i2 = 0; i2 < each_value_1.length; i2 += 1) {
      each_blocks[i2] = create_each_block_1$1(get_each_context_1$1(ctx, each_value_1, i2));
    }
    return {
      c() {
        select = element("select");
        option = element("option");
        for (let i2 = 0; i2 < each_blocks.length; i2 += 1) {
          each_blocks[i2].c();
        }
        t = space();
        span = element("span");
        span.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5"></path></svg>`;
        option.__value = "";
        option.value = option.__value;
        attr(select, "class", "absolute w-full h-full top-0 left-0 opacity-0");
        if (
          /*value*/
          ctx[0] === void 0
        )
          add_render_callback(() => (
            /*select_change_handler*/
            ctx[10].call(select)
          ));
        attr(span, "class", "pointer-events-none absolute top-0 right-0 -translate-x-5 translate-y-3 text-gray-400");
      },
      m(target, anchor) {
        insert(target, select, anchor);
        append(select, option);
        for (let i2 = 0; i2 < each_blocks.length; i2 += 1) {
          if (each_blocks[i2]) {
            each_blocks[i2].m(select, null);
          }
        }
        select_option(
          select,
          /*value*/
          ctx[0],
          true
        );
        insert(target, t, anchor);
        insert(target, span, anchor);
        if (!mounted) {
          dispose = [
            listen(
              select,
              "change",
              /*select_change_handler*/
              ctx[10]
            ),
            listen(
              select,
              "change",
              /*blur*/
              ctx[5]
            )
          ];
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (dirty & /*options*/
        8) {
          each_value_1 = /*options*/
          ctx2[3];
          let i2;
          for (i2 = 0; i2 < each_value_1.length; i2 += 1) {
            const child_ctx = get_each_context_1$1(ctx2, each_value_1, i2);
            if (each_blocks[i2]) {
              each_blocks[i2].p(child_ctx, dirty);
            } else {
              each_blocks[i2] = create_each_block_1$1(child_ctx);
              each_blocks[i2].c();
              each_blocks[i2].m(select, null);
            }
          }
          for (; i2 < each_blocks.length; i2 += 1) {
            each_blocks[i2].d(1);
          }
          each_blocks.length = each_value_1.length;
        }
        if (dirty & /*value, options*/
        9) {
          select_option(
            select,
            /*value*/
            ctx2[0]
          );
        }
      },
      d(detaching) {
        if (detaching)
          detach(select);
        destroy_each(each_blocks, detaching);
        if (detaching)
          detach(t);
        if (detaching)
          detach(span);
        mounted = false;
        run_all(dispose);
      }
    };
  }
  function create_each_block_1$1(ctx) {
    let option;
    let t_value = (
      /*option*/
      ctx[15] + ""
    );
    let t;
    let option_value_value;
    return {
      c() {
        option = element("option");
        t = text(t_value);
        option.__value = option_value_value = /*option*/
        ctx[15];
        option.value = option.__value;
      },
      m(target, anchor) {
        insert(target, option, anchor);
        append(option, t);
      },
      p(ctx2, dirty) {
        if (dirty & /*options*/
        8 && t_value !== (t_value = /*option*/
        ctx2[15] + ""))
          set_data(t, t_value);
        if (dirty & /*options*/
        8 && option_value_value !== (option_value_value = /*option*/
        ctx2[15])) {
          option.__value = option_value_value;
          option.value = option.__value;
        }
      },
      d(detaching) {
        if (detaching)
          detach(option);
      }
    };
  }
  function create_each_block$1(ctx) {
    let label;
    let input;
    let input_value_value;
    let value_has_changed = false;
    let t0;
    let t1_value = (
      /*opt*/
      ctx[12] + ""
    );
    let t1;
    let t2;
    let binding_group;
    let mounted;
    let dispose;
    binding_group = init_binding_group(
      /*$$binding_groups*/
      ctx[7][0]
    );
    return {
      c() {
        label = element("label");
        input = element("input");
        t0 = space();
        t1 = text(t1_value);
        t2 = space();
        attr(input, "type", "radio");
        attr(
          input,
          "name",
          /*name*/
          ctx[1]
        );
        input.__value = input_value_value = /*opt*/
        ctx[12];
        input.value = input.__value;
        binding_group.p(input);
      },
      m(target, anchor) {
        insert(target, label, anchor);
        append(label, input);
        input.checked = input.__value === /*value*/
        ctx[0];
        append(label, t0);
        append(label, t1);
        append(label, t2);
        if (!mounted) {
          dispose = listen(
            input,
            "change",
            /*input_change_handler*/
            ctx[6]
          );
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (dirty & /*name*/
        2) {
          attr(
            input,
            "name",
            /*name*/
            ctx2[1]
          );
        }
        if (dirty & /*options*/
        8 && input_value_value !== (input_value_value = /*opt*/
        ctx2[12])) {
          input.__value = input_value_value;
          input.value = input.__value;
          value_has_changed = true;
        }
        if (value_has_changed || dirty & /*value, options*/
        9) {
          input.checked = input.__value === /*value*/
          ctx2[0];
        }
        if (dirty & /*options*/
        8 && t1_value !== (t1_value = /*opt*/
        ctx2[12] + ""))
          set_data(t1, t1_value);
      },
      d(detaching) {
        if (detaching)
          detach(label);
        binding_group.r();
        mounted = false;
        dispose();
      }
    };
  }
  function create_fragment$3(ctx) {
    let div;
    let t0;
    let label;
    let t1;
    function select_block_type(ctx2, dirty) {
      if (
        /*type*/
        ctx2[4] == "radio"
      )
        return create_if_block$2;
      return create_else_block$1;
    }
    let current_block_type = select_block_type(ctx);
    let if_block = current_block_type(ctx);
    return {
      c() {
        div = element("div");
        if_block.c();
        t0 = space();
        label = element("label");
        t1 = text(
          /*placeholder*/
          ctx[2]
        );
        attr(label, "for", "name");
        attr(label, "class", "absolute rounded-2xl pointer-events-none whitespace-nowrap text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 font-semibold ");
        attr(div, "class", "relative w-full border rounded-lg shadow-lg bg-white border-solid border-gray-200");
      },
      m(target, anchor) {
        insert(target, div, anchor);
        if_block.m(div, null);
        append(div, t0);
        append(div, label);
        append(label, t1);
      },
      p(ctx2, [dirty]) {
        if (current_block_type === (current_block_type = select_block_type(ctx2)) && if_block) {
          if_block.p(ctx2, dirty);
        } else {
          if_block.d(1);
          if_block = current_block_type(ctx2);
          if (if_block) {
            if_block.c();
            if_block.m(div, t0);
          }
        }
        if (dirty & /*placeholder*/
        4)
          set_data(
            t1,
            /*placeholder*/
            ctx2[2]
          );
      },
      i: noop,
      o: noop,
      d(detaching) {
        if (detaching)
          detach(div);
        if_block.d();
      }
    };
  }
  function instance$2($$self, $$props, $$invalidate) {
    let { value: value2 } = $$props;
    let { name } = $$props;
    let { placeholder } = $$props;
    let { options = [] } = $$props;
    let { type = "text" } = $$props;
    const dispatch = createEventDispatcher();
    function blur() {
      dispatch("blur", { value: value2 });
    }
    const $$binding_groups = [[]];
    function input_change_handler() {
      value2 = this.__value;
      $$invalidate(0, value2);
      $$invalidate(3, options);
    }
    function input_input_handler() {
      value2 = this.value;
      $$invalidate(0, value2);
      $$invalidate(3, options);
    }
    function input_input_handler_1() {
      value2 = this.value;
      $$invalidate(0, value2);
      $$invalidate(3, options);
    }
    function select_change_handler() {
      value2 = select_value(this);
      $$invalidate(0, value2);
      $$invalidate(3, options);
    }
    $$self.$$set = ($$props2) => {
      if ("value" in $$props2)
        $$invalidate(0, value2 = $$props2.value);
      if ("name" in $$props2)
        $$invalidate(1, name = $$props2.name);
      if ("placeholder" in $$props2)
        $$invalidate(2, placeholder = $$props2.placeholder);
      if ("options" in $$props2)
        $$invalidate(3, options = $$props2.options);
      if ("type" in $$props2)
        $$invalidate(4, type = $$props2.type);
    };
    return [
      value2,
      name,
      placeholder,
      options,
      type,
      blur,
      input_change_handler,
      $$binding_groups,
      input_input_handler,
      input_input_handler_1,
      select_change_handler
    ];
  }
  class FloatingLabelSimple extends SvelteComponent {
    constructor(options) {
      super();
      init$2(this, options, instance$2, create_fragment$3, safe_not_equal, {
        value: 0,
        name: 1,
        placeholder: 2,
        options: 3,
        type: 4
      });
    }
  }
  const PACKET_TYPES = /* @__PURE__ */ Object.create(null);
  PACKET_TYPES["open"] = "0";
  PACKET_TYPES["close"] = "1";
  PACKET_TYPES["ping"] = "2";
  PACKET_TYPES["pong"] = "3";
  PACKET_TYPES["message"] = "4";
  PACKET_TYPES["upgrade"] = "5";
  PACKET_TYPES["noop"] = "6";
  const PACKET_TYPES_REVERSE = /* @__PURE__ */ Object.create(null);
  Object.keys(PACKET_TYPES).forEach((key) => {
    PACKET_TYPES_REVERSE[PACKET_TYPES[key]] = key;
  });
  const ERROR_PACKET = { type: "error", data: "parser error" };
  const withNativeBlob$1 = typeof Blob === "function" || typeof Blob !== "undefined" && Object.prototype.toString.call(Blob) === "[object BlobConstructor]";
  const withNativeArrayBuffer$2 = typeof ArrayBuffer === "function";
  const isView$1 = (obj) => {
    return typeof ArrayBuffer.isView === "function" ? ArrayBuffer.isView(obj) : obj && obj.buffer instanceof ArrayBuffer;
  };
  const encodePacket = ({ type, data }, supportsBinary, callback) => {
    if (withNativeBlob$1 && data instanceof Blob) {
      if (supportsBinary) {
        return callback(data);
      } else {
        return encodeBlobAsBase64(data, callback);
      }
    } else if (withNativeArrayBuffer$2 && (data instanceof ArrayBuffer || isView$1(data))) {
      if (supportsBinary) {
        return callback(data);
      } else {
        return encodeBlobAsBase64(new Blob([data]), callback);
      }
    }
    return callback(PACKET_TYPES[type] + (data || ""));
  };
  const encodeBlobAsBase64 = (data, callback) => {
    const fileReader = new FileReader();
    fileReader.onload = function() {
      const content = fileReader.result.split(",")[1];
      callback("b" + (content || ""));
    };
    return fileReader.readAsDataURL(data);
  };
  function toArray(data) {
    if (data instanceof Uint8Array) {
      return data;
    } else if (data instanceof ArrayBuffer) {
      return new Uint8Array(data);
    } else {
      return new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
    }
  }
  let TEXT_ENCODER;
  function encodePacketToBinary(packet, callback) {
    if (withNativeBlob$1 && packet.data instanceof Blob) {
      return packet.data.arrayBuffer().then(toArray).then(callback);
    } else if (withNativeArrayBuffer$2 && (packet.data instanceof ArrayBuffer || isView$1(packet.data))) {
      return callback(toArray(packet.data));
    }
    encodePacket(packet, false, (encoded) => {
      if (!TEXT_ENCODER) {
        TEXT_ENCODER = new TextEncoder();
      }
      callback(TEXT_ENCODER.encode(encoded));
    });
  }
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  const lookup$1 = typeof Uint8Array === "undefined" ? [] : new Uint8Array(256);
  for (let i2 = 0; i2 < chars.length; i2++) {
    lookup$1[chars.charCodeAt(i2)] = i2;
  }
  const decode$1 = (base64) => {
    let bufferLength = base64.length * 0.75, len = base64.length, i2, p = 0, encoded1, encoded2, encoded3, encoded4;
    if (base64[base64.length - 1] === "=") {
      bufferLength--;
      if (base64[base64.length - 2] === "=") {
        bufferLength--;
      }
    }
    const arraybuffer = new ArrayBuffer(bufferLength), bytes2 = new Uint8Array(arraybuffer);
    for (i2 = 0; i2 < len; i2 += 4) {
      encoded1 = lookup$1[base64.charCodeAt(i2)];
      encoded2 = lookup$1[base64.charCodeAt(i2 + 1)];
      encoded3 = lookup$1[base64.charCodeAt(i2 + 2)];
      encoded4 = lookup$1[base64.charCodeAt(i2 + 3)];
      bytes2[p++] = encoded1 << 2 | encoded2 >> 4;
      bytes2[p++] = (encoded2 & 15) << 4 | encoded3 >> 2;
      bytes2[p++] = (encoded3 & 3) << 6 | encoded4 & 63;
    }
    return arraybuffer;
  };
  const withNativeArrayBuffer$1 = typeof ArrayBuffer === "function";
  const decodePacket = (encodedPacket, binaryType) => {
    if (typeof encodedPacket !== "string") {
      return {
        type: "message",
        data: mapBinary(encodedPacket, binaryType)
      };
    }
    const type = encodedPacket.charAt(0);
    if (type === "b") {
      return {
        type: "message",
        data: decodeBase64Packet(encodedPacket.substring(1), binaryType)
      };
    }
    const packetType = PACKET_TYPES_REVERSE[type];
    if (!packetType) {
      return ERROR_PACKET;
    }
    return encodedPacket.length > 1 ? {
      type: PACKET_TYPES_REVERSE[type],
      data: encodedPacket.substring(1)
    } : {
      type: PACKET_TYPES_REVERSE[type]
    };
  };
  const decodeBase64Packet = (data, binaryType) => {
    if (withNativeArrayBuffer$1) {
      const decoded = decode$1(data);
      return mapBinary(decoded, binaryType);
    } else {
      return { base64: true, data };
    }
  };
  const mapBinary = (data, binaryType) => {
    switch (binaryType) {
      case "blob":
        if (data instanceof Blob) {
          return data;
        } else {
          return new Blob([data]);
        }
      case "arraybuffer":
      default:
        if (data instanceof ArrayBuffer) {
          return data;
        } else {
          return data.buffer;
        }
    }
  };
  const SEPARATOR = String.fromCharCode(30);
  const encodePayload = (packets, callback) => {
    const length2 = packets.length;
    const encodedPackets = new Array(length2);
    let count = 0;
    packets.forEach((packet, i2) => {
      encodePacket(packet, false, (encodedPacket) => {
        encodedPackets[i2] = encodedPacket;
        if (++count === length2) {
          callback(encodedPackets.join(SEPARATOR));
        }
      });
    });
  };
  const decodePayload = (encodedPayload, binaryType) => {
    const encodedPackets = encodedPayload.split(SEPARATOR);
    const packets = [];
    for (let i2 = 0; i2 < encodedPackets.length; i2++) {
      const decodedPacket = decodePacket(encodedPackets[i2], binaryType);
      packets.push(decodedPacket);
      if (decodedPacket.type === "error") {
        break;
      }
    }
    return packets;
  };
  function createPacketEncoderStream() {
    return new TransformStream({
      transform(packet, controller) {
        encodePacketToBinary(packet, (encodedPacket) => {
          const payloadLength = encodedPacket.length;
          let header;
          if (payloadLength < 126) {
            header = new Uint8Array(1);
            new DataView(header.buffer).setUint8(0, payloadLength);
          } else if (payloadLength < 65536) {
            header = new Uint8Array(3);
            const view = new DataView(header.buffer);
            view.setUint8(0, 126);
            view.setUint16(1, payloadLength);
          } else {
            header = new Uint8Array(9);
            const view = new DataView(header.buffer);
            view.setUint8(0, 127);
            view.setBigUint64(1, BigInt(payloadLength));
          }
          if (packet.data && typeof packet.data !== "string") {
            header[0] |= 128;
          }
          controller.enqueue(header);
          controller.enqueue(encodedPacket);
        });
      }
    });
  }
  let TEXT_DECODER;
  function totalLength(chunks) {
    return chunks.reduce((acc, chunk) => acc + chunk.length, 0);
  }
  function concatChunks(chunks, size) {
    if (chunks[0].length === size) {
      return chunks.shift();
    }
    const buffer = new Uint8Array(size);
    let j = 0;
    for (let i2 = 0; i2 < size; i2++) {
      buffer[i2] = chunks[0][j++];
      if (j === chunks[0].length) {
        chunks.shift();
        j = 0;
      }
    }
    if (chunks.length && j < chunks[0].length) {
      chunks[0] = chunks[0].slice(j);
    }
    return buffer;
  }
  function createPacketDecoderStream(maxPayload, binaryType) {
    if (!TEXT_DECODER) {
      TEXT_DECODER = new TextDecoder();
    }
    const chunks = [];
    let state = 0;
    let expectedLength = -1;
    let isBinary2 = false;
    return new TransformStream({
      transform(chunk, controller) {
        chunks.push(chunk);
        while (true) {
          if (state === 0) {
            if (totalLength(chunks) < 1) {
              break;
            }
            const header = concatChunks(chunks, 1);
            isBinary2 = (header[0] & 128) === 128;
            expectedLength = header[0] & 127;
            if (expectedLength < 126) {
              state = 3;
            } else if (expectedLength === 126) {
              state = 1;
            } else {
              state = 2;
            }
          } else if (state === 1) {
            if (totalLength(chunks) < 2) {
              break;
            }
            const headerArray = concatChunks(chunks, 2);
            expectedLength = new DataView(headerArray.buffer, headerArray.byteOffset, headerArray.length).getUint16(0);
            state = 3;
          } else if (state === 2) {
            if (totalLength(chunks) < 8) {
              break;
            }
            const headerArray = concatChunks(chunks, 8);
            const view = new DataView(headerArray.buffer, headerArray.byteOffset, headerArray.length);
            const n = view.getUint32(0);
            if (n > Math.pow(2, 53 - 32) - 1) {
              controller.enqueue(ERROR_PACKET);
              break;
            }
            expectedLength = n * Math.pow(2, 32) + view.getUint32(4);
            state = 3;
          } else {
            if (totalLength(chunks) < expectedLength) {
              break;
            }
            const data = concatChunks(chunks, expectedLength);
            controller.enqueue(decodePacket(isBinary2 ? data : TEXT_DECODER.decode(data), binaryType));
            state = 0;
          }
          if (expectedLength === 0 || expectedLength > maxPayload) {
            controller.enqueue(ERROR_PACKET);
            break;
          }
        }
      }
    });
  }
  const protocol$1 = 4;
  function Emitter(obj) {
    if (obj)
      return mixin(obj);
  }
  function mixin(obj) {
    for (var key in Emitter.prototype) {
      obj[key] = Emitter.prototype[key];
    }
    return obj;
  }
  Emitter.prototype.on = Emitter.prototype.addEventListener = function(event, fn) {
    this._callbacks = this._callbacks || {};
    (this._callbacks["$" + event] = this._callbacks["$" + event] || []).push(fn);
    return this;
  };
  Emitter.prototype.once = function(event, fn) {
    function on2() {
      this.off(event, on2);
      fn.apply(this, arguments);
    }
    on2.fn = fn;
    this.on(event, on2);
    return this;
  };
  Emitter.prototype.off = Emitter.prototype.removeListener = Emitter.prototype.removeAllListeners = Emitter.prototype.removeEventListener = function(event, fn) {
    this._callbacks = this._callbacks || {};
    if (0 == arguments.length) {
      this._callbacks = {};
      return this;
    }
    var callbacks = this._callbacks["$" + event];
    if (!callbacks)
      return this;
    if (1 == arguments.length) {
      delete this._callbacks["$" + event];
      return this;
    }
    var cb;
    for (var i2 = 0; i2 < callbacks.length; i2++) {
      cb = callbacks[i2];
      if (cb === fn || cb.fn === fn) {
        callbacks.splice(i2, 1);
        break;
      }
    }
    if (callbacks.length === 0) {
      delete this._callbacks["$" + event];
    }
    return this;
  };
  Emitter.prototype.emit = function(event) {
    this._callbacks = this._callbacks || {};
    var args = new Array(arguments.length - 1), callbacks = this._callbacks["$" + event];
    for (var i2 = 1; i2 < arguments.length; i2++) {
      args[i2 - 1] = arguments[i2];
    }
    if (callbacks) {
      callbacks = callbacks.slice(0);
      for (var i2 = 0, len = callbacks.length; i2 < len; ++i2) {
        callbacks[i2].apply(this, args);
      }
    }
    return this;
  };
  Emitter.prototype.emitReserved = Emitter.prototype.emit;
  Emitter.prototype.listeners = function(event) {
    this._callbacks = this._callbacks || {};
    return this._callbacks["$" + event] || [];
  };
  Emitter.prototype.hasListeners = function(event) {
    return !!this.listeners(event).length;
  };
  const globalThisShim = (() => {
    if (typeof self !== "undefined") {
      return self;
    } else if (typeof window !== "undefined") {
      return window;
    } else {
      return Function("return this")();
    }
  })();
  function pick(obj, ...attr2) {
    return attr2.reduce((acc, k) => {
      if (obj.hasOwnProperty(k)) {
        acc[k] = obj[k];
      }
      return acc;
    }, {});
  }
  const NATIVE_SET_TIMEOUT = globalThisShim.setTimeout;
  const NATIVE_CLEAR_TIMEOUT = globalThisShim.clearTimeout;
  function installTimerFunctions(obj, opts) {
    if (opts.useNativeTimers) {
      obj.setTimeoutFn = NATIVE_SET_TIMEOUT.bind(globalThisShim);
      obj.clearTimeoutFn = NATIVE_CLEAR_TIMEOUT.bind(globalThisShim);
    } else {
      obj.setTimeoutFn = globalThisShim.setTimeout.bind(globalThisShim);
      obj.clearTimeoutFn = globalThisShim.clearTimeout.bind(globalThisShim);
    }
  }
  const BASE64_OVERHEAD = 1.33;
  function byteLength(obj) {
    if (typeof obj === "string") {
      return utf8Length(obj);
    }
    return Math.ceil((obj.byteLength || obj.size) * BASE64_OVERHEAD);
  }
  function utf8Length(str) {
    let c = 0, length2 = 0;
    for (let i2 = 0, l = str.length; i2 < l; i2++) {
      c = str.charCodeAt(i2);
      if (c < 128) {
        length2 += 1;
      } else if (c < 2048) {
        length2 += 2;
      } else if (c < 55296 || c >= 57344) {
        length2 += 3;
      } else {
        i2++;
        length2 += 4;
      }
    }
    return length2;
  }
  function encode$1(obj) {
    let str = "";
    for (let i2 in obj) {
      if (obj.hasOwnProperty(i2)) {
        if (str.length)
          str += "&";
        str += encodeURIComponent(i2) + "=" + encodeURIComponent(obj[i2]);
      }
    }
    return str;
  }
  function decode(qs) {
    let qry = {};
    let pairs = qs.split("&");
    for (let i2 = 0, l = pairs.length; i2 < l; i2++) {
      let pair = pairs[i2].split("=");
      qry[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
    }
    return qry;
  }
  class TransportError extends Error {
    constructor(reason, description, context) {
      super(reason);
      this.description = description;
      this.context = context;
      this.type = "TransportError";
    }
  }
  class Transport extends Emitter {
    /**
     * Transport abstract constructor.
     *
     * @param {Object} opts - options
     * @protected
     */
    constructor(opts) {
      super();
      this.writable = false;
      installTimerFunctions(this, opts);
      this.opts = opts;
      this.query = opts.query;
      this.socket = opts.socket;
    }
    /**
     * Emits an error.
     *
     * @param {String} reason
     * @param description
     * @param context - the error context
     * @return {Transport} for chaining
     * @protected
     */
    onError(reason, description, context) {
      super.emitReserved("error", new TransportError(reason, description, context));
      return this;
    }
    /**
     * Opens the transport.
     */
    open() {
      this.readyState = "opening";
      this.doOpen();
      return this;
    }
    /**
     * Closes the transport.
     */
    close() {
      if (this.readyState === "opening" || this.readyState === "open") {
        this.doClose();
        this.onClose();
      }
      return this;
    }
    /**
     * Sends multiple packets.
     *
     * @param {Array} packets
     */
    send(packets) {
      if (this.readyState === "open") {
        this.write(packets);
      }
    }
    /**
     * Called upon open
     *
     * @protected
     */
    onOpen() {
      this.readyState = "open";
      this.writable = true;
      super.emitReserved("open");
    }
    /**
     * Called with data.
     *
     * @param {String} data
     * @protected
     */
    onData(data) {
      const packet = decodePacket(data, this.socket.binaryType);
      this.onPacket(packet);
    }
    /**
     * Called with a decoded packet.
     *
     * @protected
     */
    onPacket(packet) {
      super.emitReserved("packet", packet);
    }
    /**
     * Called upon close.
     *
     * @protected
     */
    onClose(details) {
      this.readyState = "closed";
      super.emitReserved("close", details);
    }
    /**
     * Pauses the transport, in order not to lose packets during an upgrade.
     *
     * @param onPause
     */
    pause(onPause) {
    }
    createUri(schema, query = {}) {
      return schema + "://" + this._hostname() + this._port() + this.opts.path + this._query(query);
    }
    _hostname() {
      const hostname = this.opts.hostname;
      return hostname.indexOf(":") === -1 ? hostname : "[" + hostname + "]";
    }
    _port() {
      if (this.opts.port && (this.opts.secure && Number(this.opts.port !== 443) || !this.opts.secure && Number(this.opts.port) !== 80)) {
        return ":" + this.opts.port;
      } else {
        return "";
      }
    }
    _query(query) {
      const encodedQuery = encode$1(query);
      return encodedQuery.length ? "?" + encodedQuery : "";
    }
  }
  const alphabet$1 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split(""), length = 64, map = {};
  let seed = 0, i = 0, prev;
  function encode(num) {
    let encoded = "";
    do {
      encoded = alphabet$1[num % length] + encoded;
      num = Math.floor(num / length);
    } while (num > 0);
    return encoded;
  }
  function yeast() {
    const now = encode(+/* @__PURE__ */ new Date());
    if (now !== prev)
      return seed = 0, prev = now;
    return now + "." + encode(seed++);
  }
  for (; i < length; i++)
    map[alphabet$1[i]] = i;
  let value = false;
  try {
    value = typeof XMLHttpRequest !== "undefined" && "withCredentials" in new XMLHttpRequest();
  } catch (err) {
  }
  const hasCORS = value;
  function XHR(opts) {
    const xdomain = opts.xdomain;
    try {
      if ("undefined" !== typeof XMLHttpRequest && (!xdomain || hasCORS)) {
        return new XMLHttpRequest();
      }
    } catch (e) {
    }
    if (!xdomain) {
      try {
        return new globalThisShim[["Active"].concat("Object").join("X")]("Microsoft.XMLHTTP");
      } catch (e) {
      }
    }
  }
  function createCookieJar() {
  }
  function empty() {
  }
  const hasXHR2 = function() {
    const xhr = new XHR({
      xdomain: false
    });
    return null != xhr.responseType;
  }();
  class Polling extends Transport {
    /**
     * XHR Polling constructor.
     *
     * @param {Object} opts
     * @package
     */
    constructor(opts) {
      super(opts);
      this.polling = false;
      if (typeof location !== "undefined") {
        const isSSL = "https:" === location.protocol;
        let port = location.port;
        if (!port) {
          port = isSSL ? "443" : "80";
        }
        this.xd = typeof location !== "undefined" && opts.hostname !== location.hostname || port !== opts.port;
      }
      const forceBase64 = opts && opts.forceBase64;
      this.supportsBinary = hasXHR2 && !forceBase64;
      if (this.opts.withCredentials) {
        this.cookieJar = createCookieJar();
      }
    }
    get name() {
      return "polling";
    }
    /**
     * Opens the socket (triggers polling). We write a PING message to determine
     * when the transport is open.
     *
     * @protected
     */
    doOpen() {
      this.poll();
    }
    /**
     * Pauses polling.
     *
     * @param {Function} onPause - callback upon buffers are flushed and transport is paused
     * @package
     */
    pause(onPause) {
      this.readyState = "pausing";
      const pause = () => {
        this.readyState = "paused";
        onPause();
      };
      if (this.polling || !this.writable) {
        let total = 0;
        if (this.polling) {
          total++;
          this.once("pollComplete", function() {
            --total || pause();
          });
        }
        if (!this.writable) {
          total++;
          this.once("drain", function() {
            --total || pause();
          });
        }
      } else {
        pause();
      }
    }
    /**
     * Starts polling cycle.
     *
     * @private
     */
    poll() {
      this.polling = true;
      this.doPoll();
      this.emitReserved("poll");
    }
    /**
     * Overloads onData to detect payloads.
     *
     * @protected
     */
    onData(data) {
      const callback = (packet) => {
        if ("opening" === this.readyState && packet.type === "open") {
          this.onOpen();
        }
        if ("close" === packet.type) {
          this.onClose({ description: "transport closed by the server" });
          return false;
        }
        this.onPacket(packet);
      };
      decodePayload(data, this.socket.binaryType).forEach(callback);
      if ("closed" !== this.readyState) {
        this.polling = false;
        this.emitReserved("pollComplete");
        if ("open" === this.readyState) {
          this.poll();
        }
      }
    }
    /**
     * For polling, send a close packet.
     *
     * @protected
     */
    doClose() {
      const close = () => {
        this.write([{ type: "close" }]);
      };
      if ("open" === this.readyState) {
        close();
      } else {
        this.once("open", close);
      }
    }
    /**
     * Writes a packets payload.
     *
     * @param {Array} packets - data packets
     * @protected
     */
    write(packets) {
      this.writable = false;
      encodePayload(packets, (data) => {
        this.doWrite(data, () => {
          this.writable = true;
          this.emitReserved("drain");
        });
      });
    }
    /**
     * Generates uri for connection.
     *
     * @private
     */
    uri() {
      const schema = this.opts.secure ? "https" : "http";
      const query = this.query || {};
      if (false !== this.opts.timestampRequests) {
        query[this.opts.timestampParam] = yeast();
      }
      if (!this.supportsBinary && !query.sid) {
        query.b64 = 1;
      }
      return this.createUri(schema, query);
    }
    /**
     * Creates a request.
     *
     * @param {String} method
     * @private
     */
    request(opts = {}) {
      Object.assign(opts, { xd: this.xd, cookieJar: this.cookieJar }, this.opts);
      return new Request(this.uri(), opts);
    }
    /**
     * Sends data.
     *
     * @param {String} data to send.
     * @param {Function} called upon flush.
     * @private
     */
    doWrite(data, fn) {
      const req = this.request({
        method: "POST",
        data
      });
      req.on("success", fn);
      req.on("error", (xhrStatus, context) => {
        this.onError("xhr post error", xhrStatus, context);
      });
    }
    /**
     * Starts a poll cycle.
     *
     * @private
     */
    doPoll() {
      const req = this.request();
      req.on("data", this.onData.bind(this));
      req.on("error", (xhrStatus, context) => {
        this.onError("xhr poll error", xhrStatus, context);
      });
      this.pollXhr = req;
    }
  }
  class Request extends Emitter {
    /**
     * Request constructor
     *
     * @param {Object} options
     * @package
     */
    constructor(uri, opts) {
      super();
      installTimerFunctions(this, opts);
      this.opts = opts;
      this.method = opts.method || "GET";
      this.uri = uri;
      this.data = void 0 !== opts.data ? opts.data : null;
      this.create();
    }
    /**
     * Creates the XHR object and sends the request.
     *
     * @private
     */
    create() {
      var _a;
      const opts = pick(this.opts, "agent", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "autoUnref");
      opts.xdomain = !!this.opts.xd;
      const xhr = this.xhr = new XHR(opts);
      try {
        xhr.open(this.method, this.uri, true);
        try {
          if (this.opts.extraHeaders) {
            xhr.setDisableHeaderCheck && xhr.setDisableHeaderCheck(true);
            for (let i2 in this.opts.extraHeaders) {
              if (this.opts.extraHeaders.hasOwnProperty(i2)) {
                xhr.setRequestHeader(i2, this.opts.extraHeaders[i2]);
              }
            }
          }
        } catch (e) {
        }
        if ("POST" === this.method) {
          try {
            xhr.setRequestHeader("Content-type", "text/plain;charset=UTF-8");
          } catch (e) {
          }
        }
        try {
          xhr.setRequestHeader("Accept", "*/*");
        } catch (e) {
        }
        (_a = this.opts.cookieJar) === null || _a === void 0 ? void 0 : _a.addCookies(xhr);
        if ("withCredentials" in xhr) {
          xhr.withCredentials = this.opts.withCredentials;
        }
        if (this.opts.requestTimeout) {
          xhr.timeout = this.opts.requestTimeout;
        }
        xhr.onreadystatechange = () => {
          var _a2;
          if (xhr.readyState === 3) {
            (_a2 = this.opts.cookieJar) === null || _a2 === void 0 ? void 0 : _a2.parseCookies(xhr);
          }
          if (4 !== xhr.readyState)
            return;
          if (200 === xhr.status || 1223 === xhr.status) {
            this.onLoad();
          } else {
            this.setTimeoutFn(() => {
              this.onError(typeof xhr.status === "number" ? xhr.status : 0);
            }, 0);
          }
        };
        xhr.send(this.data);
      } catch (e) {
        this.setTimeoutFn(() => {
          this.onError(e);
        }, 0);
        return;
      }
      if (typeof document !== "undefined") {
        this.index = Request.requestsCount++;
        Request.requests[this.index] = this;
      }
    }
    /**
     * Called upon error.
     *
     * @private
     */
    onError(err) {
      this.emitReserved("error", err, this.xhr);
      this.cleanup(true);
    }
    /**
     * Cleans up house.
     *
     * @private
     */
    cleanup(fromError) {
      if ("undefined" === typeof this.xhr || null === this.xhr) {
        return;
      }
      this.xhr.onreadystatechange = empty;
      if (fromError) {
        try {
          this.xhr.abort();
        } catch (e) {
        }
      }
      if (typeof document !== "undefined") {
        delete Request.requests[this.index];
      }
      this.xhr = null;
    }
    /**
     * Called upon load.
     *
     * @private
     */
    onLoad() {
      const data = this.xhr.responseText;
      if (data !== null) {
        this.emitReserved("data", data);
        this.emitReserved("success");
        this.cleanup();
      }
    }
    /**
     * Aborts the request.
     *
     * @package
     */
    abort() {
      this.cleanup();
    }
  }
  Request.requestsCount = 0;
  Request.requests = {};
  if (typeof document !== "undefined") {
    if (typeof attachEvent === "function") {
      attachEvent("onunload", unloadHandler);
    } else if (typeof addEventListener === "function") {
      const terminationEvent = "onpagehide" in globalThisShim ? "pagehide" : "unload";
      addEventListener(terminationEvent, unloadHandler, false);
    }
  }
  function unloadHandler() {
    for (let i2 in Request.requests) {
      if (Request.requests.hasOwnProperty(i2)) {
        Request.requests[i2].abort();
      }
    }
  }
  const nextTick = (() => {
    const isPromiseAvailable = typeof Promise === "function" && typeof Promise.resolve === "function";
    if (isPromiseAvailable) {
      return (cb) => Promise.resolve().then(cb);
    } else {
      return (cb, setTimeoutFn) => setTimeoutFn(cb, 0);
    }
  })();
  const WebSocket = globalThisShim.WebSocket || globalThisShim.MozWebSocket;
  const usingBrowserWebSocket = true;
  const defaultBinaryType = "arraybuffer";
  const isReactNative = typeof navigator !== "undefined" && typeof navigator.product === "string" && navigator.product.toLowerCase() === "reactnative";
  class WS extends Transport {
    /**
     * WebSocket transport constructor.
     *
     * @param {Object} opts - connection options
     * @protected
     */
    constructor(opts) {
      super(opts);
      this.supportsBinary = !opts.forceBase64;
    }
    get name() {
      return "websocket";
    }
    doOpen() {
      if (!this.check()) {
        return;
      }
      const uri = this.uri();
      const protocols = this.opts.protocols;
      const opts = isReactNative ? {} : pick(this.opts, "agent", "perMessageDeflate", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "localAddress", "protocolVersion", "origin", "maxPayload", "family", "checkServerIdentity");
      if (this.opts.extraHeaders) {
        opts.headers = this.opts.extraHeaders;
      }
      try {
        this.ws = usingBrowserWebSocket && !isReactNative ? protocols ? new WebSocket(uri, protocols) : new WebSocket(uri) : new WebSocket(uri, protocols, opts);
      } catch (err) {
        return this.emitReserved("error", err);
      }
      this.ws.binaryType = this.socket.binaryType;
      this.addEventListeners();
    }
    /**
     * Adds event listeners to the socket
     *
     * @private
     */
    addEventListeners() {
      this.ws.onopen = () => {
        if (this.opts.autoUnref) {
          this.ws._socket.unref();
        }
        this.onOpen();
      };
      this.ws.onclose = (closeEvent) => this.onClose({
        description: "websocket connection closed",
        context: closeEvent
      });
      this.ws.onmessage = (ev) => this.onData(ev.data);
      this.ws.onerror = (e) => this.onError("websocket error", e);
    }
    write(packets) {
      this.writable = false;
      for (let i2 = 0; i2 < packets.length; i2++) {
        const packet = packets[i2];
        const lastPacket = i2 === packets.length - 1;
        encodePacket(packet, this.supportsBinary, (data) => {
          const opts = {};
          try {
            if (usingBrowserWebSocket) {
              this.ws.send(data);
            }
          } catch (e) {
          }
          if (lastPacket) {
            nextTick(() => {
              this.writable = true;
              this.emitReserved("drain");
            }, this.setTimeoutFn);
          }
        });
      }
    }
    doClose() {
      if (typeof this.ws !== "undefined") {
        this.ws.close();
        this.ws = null;
      }
    }
    /**
     * Generates uri for connection.
     *
     * @private
     */
    uri() {
      const schema = this.opts.secure ? "wss" : "ws";
      const query = this.query || {};
      if (this.opts.timestampRequests) {
        query[this.opts.timestampParam] = yeast();
      }
      if (!this.supportsBinary) {
        query.b64 = 1;
      }
      return this.createUri(schema, query);
    }
    /**
     * Feature detection for WebSocket.
     *
     * @return {Boolean} whether this transport is available.
     * @private
     */
    check() {
      return !!WebSocket;
    }
  }
  class WT extends Transport {
    get name() {
      return "webtransport";
    }
    doOpen() {
      if (typeof WebTransport !== "function") {
        return;
      }
      this.transport = new WebTransport(this.createUri("https"), this.opts.transportOptions[this.name]);
      this.transport.closed.then(() => {
        this.onClose();
      }).catch((err) => {
        this.onError("webtransport error", err);
      });
      this.transport.ready.then(() => {
        this.transport.createBidirectionalStream().then((stream) => {
          const decoderStream = createPacketDecoderStream(Number.MAX_SAFE_INTEGER, this.socket.binaryType);
          const reader = stream.readable.pipeThrough(decoderStream).getReader();
          const encoderStream = createPacketEncoderStream();
          encoderStream.readable.pipeTo(stream.writable);
          this.writer = encoderStream.writable.getWriter();
          const read = () => {
            reader.read().then(({ done, value: value2 }) => {
              if (done) {
                return;
              }
              this.onPacket(value2);
              read();
            }).catch((err) => {
            });
          };
          read();
          const packet = { type: "open" };
          if (this.query.sid) {
            packet.data = `{"sid":"${this.query.sid}"}`;
          }
          this.writer.write(packet).then(() => this.onOpen());
        });
      });
    }
    write(packets) {
      this.writable = false;
      for (let i2 = 0; i2 < packets.length; i2++) {
        const packet = packets[i2];
        const lastPacket = i2 === packets.length - 1;
        this.writer.write(packet).then(() => {
          if (lastPacket) {
            nextTick(() => {
              this.writable = true;
              this.emitReserved("drain");
            }, this.setTimeoutFn);
          }
        });
      }
    }
    doClose() {
      var _a;
      (_a = this.transport) === null || _a === void 0 ? void 0 : _a.close();
    }
  }
  const transports = {
    websocket: WS,
    webtransport: WT,
    polling: Polling
  };
  const re = /^(?:(?![^:@\/?#]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@\/?#]*)(?::([^:@\/?#]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;
  const parts = [
    "source",
    "protocol",
    "authority",
    "userInfo",
    "user",
    "password",
    "host",
    "port",
    "relative",
    "path",
    "directory",
    "file",
    "query",
    "anchor"
  ];
  function parse(str) {
    if (str.length > 2e3) {
      throw "URI too long";
    }
    const src2 = str, b = str.indexOf("["), e = str.indexOf("]");
    if (b != -1 && e != -1) {
      str = str.substring(0, b) + str.substring(b, e).replace(/:/g, ";") + str.substring(e, str.length);
    }
    let m = re.exec(str || ""), uri = {}, i2 = 14;
    while (i2--) {
      uri[parts[i2]] = m[i2] || "";
    }
    if (b != -1 && e != -1) {
      uri.source = src2;
      uri.host = uri.host.substring(1, uri.host.length - 1).replace(/;/g, ":");
      uri.authority = uri.authority.replace("[", "").replace("]", "").replace(/;/g, ":");
      uri.ipv6uri = true;
    }
    uri.pathNames = pathNames(uri, uri["path"]);
    uri.queryKey = queryKey(uri, uri["query"]);
    return uri;
  }
  function pathNames(obj, path) {
    const regx = /\/{2,9}/g, names = path.replace(regx, "/").split("/");
    if (path.slice(0, 1) == "/" || path.length === 0) {
      names.splice(0, 1);
    }
    if (path.slice(-1) == "/") {
      names.splice(names.length - 1, 1);
    }
    return names;
  }
  function queryKey(uri, query) {
    const data = {};
    query.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, function($0, $1, $2) {
      if ($1) {
        data[$1] = $2;
      }
    });
    return data;
  }
  let Socket$1 = class Socket2 extends Emitter {
    /**
     * Socket constructor.
     *
     * @param {String|Object} uri - uri or options
     * @param {Object} opts - options
     */
    constructor(uri, opts = {}) {
      super();
      this.binaryType = defaultBinaryType;
      this.writeBuffer = [];
      if (uri && "object" === typeof uri) {
        opts = uri;
        uri = null;
      }
      if (uri) {
        uri = parse(uri);
        opts.hostname = uri.host;
        opts.secure = uri.protocol === "https" || uri.protocol === "wss";
        opts.port = uri.port;
        if (uri.query)
          opts.query = uri.query;
      } else if (opts.host) {
        opts.hostname = parse(opts.host).host;
      }
      installTimerFunctions(this, opts);
      this.secure = null != opts.secure ? opts.secure : typeof location !== "undefined" && "https:" === location.protocol;
      if (opts.hostname && !opts.port) {
        opts.port = this.secure ? "443" : "80";
      }
      this.hostname = opts.hostname || (typeof location !== "undefined" ? location.hostname : "localhost");
      this.port = opts.port || (typeof location !== "undefined" && location.port ? location.port : this.secure ? "443" : "80");
      this.transports = opts.transports || [
        "polling",
        "websocket",
        "webtransport"
      ];
      this.writeBuffer = [];
      this.prevBufferLen = 0;
      this.opts = Object.assign({
        path: "/engine.io",
        agent: false,
        withCredentials: false,
        upgrade: true,
        timestampParam: "t",
        rememberUpgrade: false,
        addTrailingSlash: true,
        rejectUnauthorized: true,
        perMessageDeflate: {
          threshold: 1024
        },
        transportOptions: {},
        closeOnBeforeunload: false
      }, opts);
      this.opts.path = this.opts.path.replace(/\/$/, "") + (this.opts.addTrailingSlash ? "/" : "");
      if (typeof this.opts.query === "string") {
        this.opts.query = decode(this.opts.query);
      }
      this.id = null;
      this.upgrades = null;
      this.pingInterval = null;
      this.pingTimeout = null;
      this.pingTimeoutTimer = null;
      if (typeof addEventListener === "function") {
        if (this.opts.closeOnBeforeunload) {
          this.beforeunloadEventListener = () => {
            if (this.transport) {
              this.transport.removeAllListeners();
              this.transport.close();
            }
          };
          addEventListener("beforeunload", this.beforeunloadEventListener, false);
        }
        if (this.hostname !== "localhost") {
          this.offlineEventListener = () => {
            this.onClose("transport close", {
              description: "network connection lost"
            });
          };
          addEventListener("offline", this.offlineEventListener, false);
        }
      }
      this.open();
    }
    /**
     * Creates transport of the given type.
     *
     * @param {String} name - transport name
     * @return {Transport}
     * @private
     */
    createTransport(name) {
      const query = Object.assign({}, this.opts.query);
      query.EIO = protocol$1;
      query.transport = name;
      if (this.id)
        query.sid = this.id;
      const opts = Object.assign({}, this.opts, {
        query,
        socket: this,
        hostname: this.hostname,
        secure: this.secure,
        port: this.port
      }, this.opts.transportOptions[name]);
      return new transports[name](opts);
    }
    /**
     * Initializes transport to use and starts probe.
     *
     * @private
     */
    open() {
      let transport;
      if (this.opts.rememberUpgrade && Socket2.priorWebsocketSuccess && this.transports.indexOf("websocket") !== -1) {
        transport = "websocket";
      } else if (0 === this.transports.length) {
        this.setTimeoutFn(() => {
          this.emitReserved("error", "No transports available");
        }, 0);
        return;
      } else {
        transport = this.transports[0];
      }
      this.readyState = "opening";
      try {
        transport = this.createTransport(transport);
      } catch (e) {
        this.transports.shift();
        this.open();
        return;
      }
      transport.open();
      this.setTransport(transport);
    }
    /**
     * Sets the current transport. Disables the existing one (if any).
     *
     * @private
     */
    setTransport(transport) {
      if (this.transport) {
        this.transport.removeAllListeners();
      }
      this.transport = transport;
      transport.on("drain", this.onDrain.bind(this)).on("packet", this.onPacket.bind(this)).on("error", this.onError.bind(this)).on("close", (reason) => this.onClose("transport close", reason));
    }
    /**
     * Probes a transport.
     *
     * @param {String} name - transport name
     * @private
     */
    probe(name) {
      let transport = this.createTransport(name);
      let failed = false;
      Socket2.priorWebsocketSuccess = false;
      const onTransportOpen = () => {
        if (failed)
          return;
        transport.send([{ type: "ping", data: "probe" }]);
        transport.once("packet", (msg) => {
          if (failed)
            return;
          if ("pong" === msg.type && "probe" === msg.data) {
            this.upgrading = true;
            this.emitReserved("upgrading", transport);
            if (!transport)
              return;
            Socket2.priorWebsocketSuccess = "websocket" === transport.name;
            this.transport.pause(() => {
              if (failed)
                return;
              if ("closed" === this.readyState)
                return;
              cleanup();
              this.setTransport(transport);
              transport.send([{ type: "upgrade" }]);
              this.emitReserved("upgrade", transport);
              transport = null;
              this.upgrading = false;
              this.flush();
            });
          } else {
            const err = new Error("probe error");
            err.transport = transport.name;
            this.emitReserved("upgradeError", err);
          }
        });
      };
      function freezeTransport() {
        if (failed)
          return;
        failed = true;
        cleanup();
        transport.close();
        transport = null;
      }
      const onerror = (err) => {
        const error = new Error("probe error: " + err);
        error.transport = transport.name;
        freezeTransport();
        this.emitReserved("upgradeError", error);
      };
      function onTransportClose() {
        onerror("transport closed");
      }
      function onclose() {
        onerror("socket closed");
      }
      function onupgrade(to) {
        if (transport && to.name !== transport.name) {
          freezeTransport();
        }
      }
      const cleanup = () => {
        transport.removeListener("open", onTransportOpen);
        transport.removeListener("error", onerror);
        transport.removeListener("close", onTransportClose);
        this.off("close", onclose);
        this.off("upgrading", onupgrade);
      };
      transport.once("open", onTransportOpen);
      transport.once("error", onerror);
      transport.once("close", onTransportClose);
      this.once("close", onclose);
      this.once("upgrading", onupgrade);
      if (this.upgrades.indexOf("webtransport") !== -1 && name !== "webtransport") {
        this.setTimeoutFn(() => {
          if (!failed) {
            transport.open();
          }
        }, 200);
      } else {
        transport.open();
      }
    }
    /**
     * Called when connection is deemed open.
     *
     * @private
     */
    onOpen() {
      this.readyState = "open";
      Socket2.priorWebsocketSuccess = "websocket" === this.transport.name;
      this.emitReserved("open");
      this.flush();
      if ("open" === this.readyState && this.opts.upgrade) {
        let i2 = 0;
        const l = this.upgrades.length;
        for (; i2 < l; i2++) {
          this.probe(this.upgrades[i2]);
        }
      }
    }
    /**
     * Handles a packet.
     *
     * @private
     */
    onPacket(packet) {
      if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) {
        this.emitReserved("packet", packet);
        this.emitReserved("heartbeat");
        this.resetPingTimeout();
        switch (packet.type) {
          case "open":
            this.onHandshake(JSON.parse(packet.data));
            break;
          case "ping":
            this.sendPacket("pong");
            this.emitReserved("ping");
            this.emitReserved("pong");
            break;
          case "error":
            const err = new Error("server error");
            err.code = packet.data;
            this.onError(err);
            break;
          case "message":
            this.emitReserved("data", packet.data);
            this.emitReserved("message", packet.data);
            break;
        }
      }
    }
    /**
     * Called upon handshake completion.
     *
     * @param {Object} data - handshake obj
     * @private
     */
    onHandshake(data) {
      this.emitReserved("handshake", data);
      this.id = data.sid;
      this.transport.query.sid = data.sid;
      this.upgrades = this.filterUpgrades(data.upgrades);
      this.pingInterval = data.pingInterval;
      this.pingTimeout = data.pingTimeout;
      this.maxPayload = data.maxPayload;
      this.onOpen();
      if ("closed" === this.readyState)
        return;
      this.resetPingTimeout();
    }
    /**
     * Sets and resets ping timeout timer based on server pings.
     *
     * @private
     */
    resetPingTimeout() {
      this.clearTimeoutFn(this.pingTimeoutTimer);
      this.pingTimeoutTimer = this.setTimeoutFn(() => {
        this.onClose("ping timeout");
      }, this.pingInterval + this.pingTimeout);
      if (this.opts.autoUnref) {
        this.pingTimeoutTimer.unref();
      }
    }
    /**
     * Called on `drain` event
     *
     * @private
     */
    onDrain() {
      this.writeBuffer.splice(0, this.prevBufferLen);
      this.prevBufferLen = 0;
      if (0 === this.writeBuffer.length) {
        this.emitReserved("drain");
      } else {
        this.flush();
      }
    }
    /**
     * Flush write buffers.
     *
     * @private
     */
    flush() {
      if ("closed" !== this.readyState && this.transport.writable && !this.upgrading && this.writeBuffer.length) {
        const packets = this.getWritablePackets();
        this.transport.send(packets);
        this.prevBufferLen = packets.length;
        this.emitReserved("flush");
      }
    }
    /**
     * Ensure the encoded size of the writeBuffer is below the maxPayload value sent by the server (only for HTTP
     * long-polling)
     *
     * @private
     */
    getWritablePackets() {
      const shouldCheckPayloadSize = this.maxPayload && this.transport.name === "polling" && this.writeBuffer.length > 1;
      if (!shouldCheckPayloadSize) {
        return this.writeBuffer;
      }
      let payloadSize = 1;
      for (let i2 = 0; i2 < this.writeBuffer.length; i2++) {
        const data = this.writeBuffer[i2].data;
        if (data) {
          payloadSize += byteLength(data);
        }
        if (i2 > 0 && payloadSize > this.maxPayload) {
          return this.writeBuffer.slice(0, i2);
        }
        payloadSize += 2;
      }
      return this.writeBuffer;
    }
    /**
     * Sends a message.
     *
     * @param {String} msg - message.
     * @param {Object} options.
     * @param {Function} callback function.
     * @return {Socket} for chaining.
     */
    write(msg, options, fn) {
      this.sendPacket("message", msg, options, fn);
      return this;
    }
    send(msg, options, fn) {
      this.sendPacket("message", msg, options, fn);
      return this;
    }
    /**
     * Sends a packet.
     *
     * @param {String} type: packet type.
     * @param {String} data.
     * @param {Object} options.
     * @param {Function} fn - callback function.
     * @private
     */
    sendPacket(type, data, options, fn) {
      if ("function" === typeof data) {
        fn = data;
        data = void 0;
      }
      if ("function" === typeof options) {
        fn = options;
        options = null;
      }
      if ("closing" === this.readyState || "closed" === this.readyState) {
        return;
      }
      options = options || {};
      options.compress = false !== options.compress;
      const packet = {
        type,
        data,
        options
      };
      this.emitReserved("packetCreate", packet);
      this.writeBuffer.push(packet);
      if (fn)
        this.once("flush", fn);
      this.flush();
    }
    /**
     * Closes the connection.
     */
    close() {
      const close = () => {
        this.onClose("forced close");
        this.transport.close();
      };
      const cleanupAndClose = () => {
        this.off("upgrade", cleanupAndClose);
        this.off("upgradeError", cleanupAndClose);
        close();
      };
      const waitForUpgrade = () => {
        this.once("upgrade", cleanupAndClose);
        this.once("upgradeError", cleanupAndClose);
      };
      if ("opening" === this.readyState || "open" === this.readyState) {
        this.readyState = "closing";
        if (this.writeBuffer.length) {
          this.once("drain", () => {
            if (this.upgrading) {
              waitForUpgrade();
            } else {
              close();
            }
          });
        } else if (this.upgrading) {
          waitForUpgrade();
        } else {
          close();
        }
      }
      return this;
    }
    /**
     * Called upon transport error
     *
     * @private
     */
    onError(err) {
      Socket2.priorWebsocketSuccess = false;
      this.emitReserved("error", err);
      this.onClose("transport error", err);
    }
    /**
     * Called upon transport close.
     *
     * @private
     */
    onClose(reason, description) {
      if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) {
        this.clearTimeoutFn(this.pingTimeoutTimer);
        this.transport.removeAllListeners("close");
        this.transport.close();
        this.transport.removeAllListeners();
        if (typeof removeEventListener === "function") {
          removeEventListener("beforeunload", this.beforeunloadEventListener, false);
          removeEventListener("offline", this.offlineEventListener, false);
        }
        this.readyState = "closed";
        this.id = null;
        this.emitReserved("close", reason, description);
        this.writeBuffer = [];
        this.prevBufferLen = 0;
      }
    }
    /**
     * Filters upgrades, returning only those matching client transports.
     *
     * @param {Array} upgrades - server upgrades
     * @private
     */
    filterUpgrades(upgrades) {
      const filteredUpgrades = [];
      let i2 = 0;
      const j = upgrades.length;
      for (; i2 < j; i2++) {
        if (~this.transports.indexOf(upgrades[i2]))
          filteredUpgrades.push(upgrades[i2]);
      }
      return filteredUpgrades;
    }
  };
  Socket$1.protocol = protocol$1;
  function url(uri, path = "", loc) {
    let obj = uri;
    loc = loc || typeof location !== "undefined" && location;
    if (null == uri)
      uri = loc.protocol + "//" + loc.host;
    if (typeof uri === "string") {
      if ("/" === uri.charAt(0)) {
        if ("/" === uri.charAt(1)) {
          uri = loc.protocol + uri;
        } else {
          uri = loc.host + uri;
        }
      }
      if (!/^(https?|wss?):\/\//.test(uri)) {
        if ("undefined" !== typeof loc) {
          uri = loc.protocol + "//" + uri;
        } else {
          uri = "https://" + uri;
        }
      }
      obj = parse(uri);
    }
    if (!obj.port) {
      if (/^(http|ws)$/.test(obj.protocol)) {
        obj.port = "80";
      } else if (/^(http|ws)s$/.test(obj.protocol)) {
        obj.port = "443";
      }
    }
    obj.path = obj.path || "/";
    const ipv6 = obj.host.indexOf(":") !== -1;
    const host = ipv6 ? "[" + obj.host + "]" : obj.host;
    obj.id = obj.protocol + "://" + host + ":" + obj.port + path;
    obj.href = obj.protocol + "://" + host + (loc && loc.port === obj.port ? "" : ":" + obj.port);
    return obj;
  }
  const withNativeArrayBuffer = typeof ArrayBuffer === "function";
  const isView = (obj) => {
    return typeof ArrayBuffer.isView === "function" ? ArrayBuffer.isView(obj) : obj.buffer instanceof ArrayBuffer;
  };
  const toString = Object.prototype.toString;
  const withNativeBlob = typeof Blob === "function" || typeof Blob !== "undefined" && toString.call(Blob) === "[object BlobConstructor]";
  const withNativeFile = typeof File === "function" || typeof File !== "undefined" && toString.call(File) === "[object FileConstructor]";
  function isBinary(obj) {
    return withNativeArrayBuffer && (obj instanceof ArrayBuffer || isView(obj)) || withNativeBlob && obj instanceof Blob || withNativeFile && obj instanceof File;
  }
  function hasBinary(obj, toJSON) {
    if (!obj || typeof obj !== "object") {
      return false;
    }
    if (Array.isArray(obj)) {
      for (let i2 = 0, l = obj.length; i2 < l; i2++) {
        if (hasBinary(obj[i2])) {
          return true;
        }
      }
      return false;
    }
    if (isBinary(obj)) {
      return true;
    }
    if (obj.toJSON && typeof obj.toJSON === "function" && arguments.length === 1) {
      return hasBinary(obj.toJSON(), true);
    }
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key) && hasBinary(obj[key])) {
        return true;
      }
    }
    return false;
  }
  function deconstructPacket(packet) {
    const buffers = [];
    const packetData = packet.data;
    const pack = packet;
    pack.data = _deconstructPacket(packetData, buffers);
    pack.attachments = buffers.length;
    return { packet: pack, buffers };
  }
  function _deconstructPacket(data, buffers) {
    if (!data)
      return data;
    if (isBinary(data)) {
      const placeholder = { _placeholder: true, num: buffers.length };
      buffers.push(data);
      return placeholder;
    } else if (Array.isArray(data)) {
      const newData = new Array(data.length);
      for (let i2 = 0; i2 < data.length; i2++) {
        newData[i2] = _deconstructPacket(data[i2], buffers);
      }
      return newData;
    } else if (typeof data === "object" && !(data instanceof Date)) {
      const newData = {};
      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          newData[key] = _deconstructPacket(data[key], buffers);
        }
      }
      return newData;
    }
    return data;
  }
  function reconstructPacket(packet, buffers) {
    packet.data = _reconstructPacket(packet.data, buffers);
    delete packet.attachments;
    return packet;
  }
  function _reconstructPacket(data, buffers) {
    if (!data)
      return data;
    if (data && data._placeholder === true) {
      const isIndexValid = typeof data.num === "number" && data.num >= 0 && data.num < buffers.length;
      if (isIndexValid) {
        return buffers[data.num];
      } else {
        throw new Error("illegal attachments");
      }
    } else if (Array.isArray(data)) {
      for (let i2 = 0; i2 < data.length; i2++) {
        data[i2] = _reconstructPacket(data[i2], buffers);
      }
    } else if (typeof data === "object") {
      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          data[key] = _reconstructPacket(data[key], buffers);
        }
      }
    }
    return data;
  }
  const RESERVED_EVENTS$1 = [
    "connect",
    "connect_error",
    "disconnect",
    "disconnecting",
    "newListener",
    "removeListener"
    // used by the Node.js EventEmitter
  ];
  const protocol = 5;
  var PacketType;
  (function(PacketType2) {
    PacketType2[PacketType2["CONNECT"] = 0] = "CONNECT";
    PacketType2[PacketType2["DISCONNECT"] = 1] = "DISCONNECT";
    PacketType2[PacketType2["EVENT"] = 2] = "EVENT";
    PacketType2[PacketType2["ACK"] = 3] = "ACK";
    PacketType2[PacketType2["CONNECT_ERROR"] = 4] = "CONNECT_ERROR";
    PacketType2[PacketType2["BINARY_EVENT"] = 5] = "BINARY_EVENT";
    PacketType2[PacketType2["BINARY_ACK"] = 6] = "BINARY_ACK";
  })(PacketType || (PacketType = {}));
  class Encoder {
    /**
     * Encoder constructor
     *
     * @param {function} replacer - custom replacer to pass down to JSON.parse
     */
    constructor(replacer) {
      this.replacer = replacer;
    }
    /**
     * Encode a packet as a single string if non-binary, or as a
     * buffer sequence, depending on packet type.
     *
     * @param {Object} obj - packet object
     */
    encode(obj) {
      if (obj.type === PacketType.EVENT || obj.type === PacketType.ACK) {
        if (hasBinary(obj)) {
          return this.encodeAsBinary({
            type: obj.type === PacketType.EVENT ? PacketType.BINARY_EVENT : PacketType.BINARY_ACK,
            nsp: obj.nsp,
            data: obj.data,
            id: obj.id
          });
        }
      }
      return [this.encodeAsString(obj)];
    }
    /**
     * Encode packet as string.
     */
    encodeAsString(obj) {
      let str = "" + obj.type;
      if (obj.type === PacketType.BINARY_EVENT || obj.type === PacketType.BINARY_ACK) {
        str += obj.attachments + "-";
      }
      if (obj.nsp && "/" !== obj.nsp) {
        str += obj.nsp + ",";
      }
      if (null != obj.id) {
        str += obj.id;
      }
      if (null != obj.data) {
        str += JSON.stringify(obj.data, this.replacer);
      }
      return str;
    }
    /**
     * Encode packet as 'buffer sequence' by removing blobs, and
     * deconstructing packet into object with placeholders and
     * a list of buffers.
     */
    encodeAsBinary(obj) {
      const deconstruction = deconstructPacket(obj);
      const pack = this.encodeAsString(deconstruction.packet);
      const buffers = deconstruction.buffers;
      buffers.unshift(pack);
      return buffers;
    }
  }
  function isObject(value2) {
    return Object.prototype.toString.call(value2) === "[object Object]";
  }
  class Decoder extends Emitter {
    /**
     * Decoder constructor
     *
     * @param {function} reviver - custom reviver to pass down to JSON.stringify
     */
    constructor(reviver) {
      super();
      this.reviver = reviver;
    }
    /**
     * Decodes an encoded packet string into packet JSON.
     *
     * @param {String} obj - encoded packet
     */
    add(obj) {
      let packet;
      if (typeof obj === "string") {
        if (this.reconstructor) {
          throw new Error("got plaintext data when reconstructing a packet");
        }
        packet = this.decodeString(obj);
        const isBinaryEvent = packet.type === PacketType.BINARY_EVENT;
        if (isBinaryEvent || packet.type === PacketType.BINARY_ACK) {
          packet.type = isBinaryEvent ? PacketType.EVENT : PacketType.ACK;
          this.reconstructor = new BinaryReconstructor(packet);
          if (packet.attachments === 0) {
            super.emitReserved("decoded", packet);
          }
        } else {
          super.emitReserved("decoded", packet);
        }
      } else if (isBinary(obj) || obj.base64) {
        if (!this.reconstructor) {
          throw new Error("got binary data when not reconstructing a packet");
        } else {
          packet = this.reconstructor.takeBinaryData(obj);
          if (packet) {
            this.reconstructor = null;
            super.emitReserved("decoded", packet);
          }
        }
      } else {
        throw new Error("Unknown type: " + obj);
      }
    }
    /**
     * Decode a packet String (JSON data)
     *
     * @param {String} str
     * @return {Object} packet
     */
    decodeString(str) {
      let i2 = 0;
      const p = {
        type: Number(str.charAt(0))
      };
      if (PacketType[p.type] === void 0) {
        throw new Error("unknown packet type " + p.type);
      }
      if (p.type === PacketType.BINARY_EVENT || p.type === PacketType.BINARY_ACK) {
        const start = i2 + 1;
        while (str.charAt(++i2) !== "-" && i2 != str.length) {
        }
        const buf = str.substring(start, i2);
        if (buf != Number(buf) || str.charAt(i2) !== "-") {
          throw new Error("Illegal attachments");
        }
        p.attachments = Number(buf);
      }
      if ("/" === str.charAt(i2 + 1)) {
        const start = i2 + 1;
        while (++i2) {
          const c = str.charAt(i2);
          if ("," === c)
            break;
          if (i2 === str.length)
            break;
        }
        p.nsp = str.substring(start, i2);
      } else {
        p.nsp = "/";
      }
      const next = str.charAt(i2 + 1);
      if ("" !== next && Number(next) == next) {
        const start = i2 + 1;
        while (++i2) {
          const c = str.charAt(i2);
          if (null == c || Number(c) != c) {
            --i2;
            break;
          }
          if (i2 === str.length)
            break;
        }
        p.id = Number(str.substring(start, i2 + 1));
      }
      if (str.charAt(++i2)) {
        const payload = this.tryParse(str.substr(i2));
        if (Decoder.isPayloadValid(p.type, payload)) {
          p.data = payload;
        } else {
          throw new Error("invalid payload");
        }
      }
      return p;
    }
    tryParse(str) {
      try {
        return JSON.parse(str, this.reviver);
      } catch (e) {
        return false;
      }
    }
    static isPayloadValid(type, payload) {
      switch (type) {
        case PacketType.CONNECT:
          return isObject(payload);
        case PacketType.DISCONNECT:
          return payload === void 0;
        case PacketType.CONNECT_ERROR:
          return typeof payload === "string" || isObject(payload);
        case PacketType.EVENT:
        case PacketType.BINARY_EVENT:
          return Array.isArray(payload) && (typeof payload[0] === "number" || typeof payload[0] === "string" && RESERVED_EVENTS$1.indexOf(payload[0]) === -1);
        case PacketType.ACK:
        case PacketType.BINARY_ACK:
          return Array.isArray(payload);
      }
    }
    /**
     * Deallocates a parser's resources
     */
    destroy() {
      if (this.reconstructor) {
        this.reconstructor.finishedReconstruction();
        this.reconstructor = null;
      }
    }
  }
  class BinaryReconstructor {
    constructor(packet) {
      this.packet = packet;
      this.buffers = [];
      this.reconPack = packet;
    }
    /**
     * Method to be called when binary data received from connection
     * after a BINARY_EVENT packet.
     *
     * @param {Buffer | ArrayBuffer} binData - the raw binary data received
     * @return {null | Object} returns null if more binary data is expected or
     *   a reconstructed packet object if all buffers have been received.
     */
    takeBinaryData(binData) {
      this.buffers.push(binData);
      if (this.buffers.length === this.reconPack.attachments) {
        const packet = reconstructPacket(this.reconPack, this.buffers);
        this.finishedReconstruction();
        return packet;
      }
      return null;
    }
    /**
     * Cleans up binary packet reconstruction variables.
     */
    finishedReconstruction() {
      this.reconPack = null;
      this.buffers = [];
    }
  }
  const parser = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    Decoder,
    Encoder,
    get PacketType() {
      return PacketType;
    },
    protocol
  }, Symbol.toStringTag, { value: "Module" }));
  function on(obj, ev, fn) {
    obj.on(ev, fn);
    return function subDestroy() {
      obj.off(ev, fn);
    };
  }
  const RESERVED_EVENTS = Object.freeze({
    connect: 1,
    connect_error: 1,
    disconnect: 1,
    disconnecting: 1,
    // EventEmitter reserved events: https://nodejs.org/api/events.html#events_event_newlistener
    newListener: 1,
    removeListener: 1
  });
  class Socket extends Emitter {
    /**
     * `Socket` constructor.
     */
    constructor(io, nsp, opts) {
      super();
      this.connected = false;
      this.recovered = false;
      this.receiveBuffer = [];
      this.sendBuffer = [];
      this._queue = [];
      this._queueSeq = 0;
      this.ids = 0;
      this.acks = {};
      this.flags = {};
      this.io = io;
      this.nsp = nsp;
      if (opts && opts.auth) {
        this.auth = opts.auth;
      }
      this._opts = Object.assign({}, opts);
      if (this.io._autoConnect)
        this.open();
    }
    /**
     * Whether the socket is currently disconnected
     *
     * @example
     * const socket = io();
     *
     * socket.on("connect", () => {
     *   console.log(socket.disconnected); // false
     * });
     *
     * socket.on("disconnect", () => {
     *   console.log(socket.disconnected); // true
     * });
     */
    get disconnected() {
      return !this.connected;
    }
    /**
     * Subscribe to open, close and packet events
     *
     * @private
     */
    subEvents() {
      if (this.subs)
        return;
      const io = this.io;
      this.subs = [
        on(io, "open", this.onopen.bind(this)),
        on(io, "packet", this.onpacket.bind(this)),
        on(io, "error", this.onerror.bind(this)),
        on(io, "close", this.onclose.bind(this))
      ];
    }
    /**
     * Whether the Socket will try to reconnect when its Manager connects or reconnects.
     *
     * @example
     * const socket = io();
     *
     * console.log(socket.active); // true
     *
     * socket.on("disconnect", (reason) => {
     *   if (reason === "io server disconnect") {
     *     // the disconnection was initiated by the server, you need to manually reconnect
     *     console.log(socket.active); // false
     *   }
     *   // else the socket will automatically try to reconnect
     *   console.log(socket.active); // true
     * });
     */
    get active() {
      return !!this.subs;
    }
    /**
     * "Opens" the socket.
     *
     * @example
     * const socket = io({
     *   autoConnect: false
     * });
     *
     * socket.connect();
     */
    connect() {
      if (this.connected)
        return this;
      this.subEvents();
      if (!this.io["_reconnecting"])
        this.io.open();
      if ("open" === this.io._readyState)
        this.onopen();
      return this;
    }
    /**
     * Alias for {@link connect()}.
     */
    open() {
      return this.connect();
    }
    /**
     * Sends a `message` event.
     *
     * This method mimics the WebSocket.send() method.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/send
     *
     * @example
     * socket.send("hello");
     *
     * // this is equivalent to
     * socket.emit("message", "hello");
     *
     * @return self
     */
    send(...args) {
      args.unshift("message");
      this.emit.apply(this, args);
      return this;
    }
    /**
     * Override `emit`.
     * If the event is in `events`, it's emitted normally.
     *
     * @example
     * socket.emit("hello", "world");
     *
     * // all serializable datastructures are supported (no need to call JSON.stringify)
     * socket.emit("hello", 1, "2", { 3: ["4"], 5: Uint8Array.from([6]) });
     *
     * // with an acknowledgement from the server
     * socket.emit("hello", "world", (val) => {
     *   // ...
     * });
     *
     * @return self
     */
    emit(ev, ...args) {
      if (RESERVED_EVENTS.hasOwnProperty(ev)) {
        throw new Error('"' + ev.toString() + '" is a reserved event name');
      }
      args.unshift(ev);
      if (this._opts.retries && !this.flags.fromQueue && !this.flags.volatile) {
        this._addToQueue(args);
        return this;
      }
      const packet = {
        type: PacketType.EVENT,
        data: args
      };
      packet.options = {};
      packet.options.compress = this.flags.compress !== false;
      if ("function" === typeof args[args.length - 1]) {
        const id = this.ids++;
        const ack = args.pop();
        this._registerAckCallback(id, ack);
        packet.id = id;
      }
      const isTransportWritable = this.io.engine && this.io.engine.transport && this.io.engine.transport.writable;
      const discardPacket = this.flags.volatile && (!isTransportWritable || !this.connected);
      if (discardPacket)
        ;
      else if (this.connected) {
        this.notifyOutgoingListeners(packet);
        this.packet(packet);
      } else {
        this.sendBuffer.push(packet);
      }
      this.flags = {};
      return this;
    }
    /**
     * @private
     */
    _registerAckCallback(id, ack) {
      var _a;
      const timeout = (_a = this.flags.timeout) !== null && _a !== void 0 ? _a : this._opts.ackTimeout;
      if (timeout === void 0) {
        this.acks[id] = ack;
        return;
      }
      const timer = this.io.setTimeoutFn(() => {
        delete this.acks[id];
        for (let i2 = 0; i2 < this.sendBuffer.length; i2++) {
          if (this.sendBuffer[i2].id === id) {
            this.sendBuffer.splice(i2, 1);
          }
        }
        ack.call(this, new Error("operation has timed out"));
      }, timeout);
      this.acks[id] = (...args) => {
        this.io.clearTimeoutFn(timer);
        ack.apply(this, [null, ...args]);
      };
    }
    /**
     * Emits an event and waits for an acknowledgement
     *
     * @example
     * // without timeout
     * const response = await socket.emitWithAck("hello", "world");
     *
     * // with a specific timeout
     * try {
     *   const response = await socket.timeout(1000).emitWithAck("hello", "world");
     * } catch (err) {
     *   // the server did not acknowledge the event in the given delay
     * }
     *
     * @return a Promise that will be fulfilled when the server acknowledges the event
     */
    emitWithAck(ev, ...args) {
      const withErr = this.flags.timeout !== void 0 || this._opts.ackTimeout !== void 0;
      return new Promise((resolve, reject) => {
        args.push((arg1, arg2) => {
          if (withErr) {
            return arg1 ? reject(arg1) : resolve(arg2);
          } else {
            return resolve(arg1);
          }
        });
        this.emit(ev, ...args);
      });
    }
    /**
     * Add the packet to the queue.
     * @param args
     * @private
     */
    _addToQueue(args) {
      let ack;
      if (typeof args[args.length - 1] === "function") {
        ack = args.pop();
      }
      const packet = {
        id: this._queueSeq++,
        tryCount: 0,
        pending: false,
        args,
        flags: Object.assign({ fromQueue: true }, this.flags)
      };
      args.push((err, ...responseArgs) => {
        if (packet !== this._queue[0]) {
          return;
        }
        const hasError = err !== null;
        if (hasError) {
          if (packet.tryCount > this._opts.retries) {
            this._queue.shift();
            if (ack) {
              ack(err);
            }
          }
        } else {
          this._queue.shift();
          if (ack) {
            ack(null, ...responseArgs);
          }
        }
        packet.pending = false;
        return this._drainQueue();
      });
      this._queue.push(packet);
      this._drainQueue();
    }
    /**
     * Send the first packet of the queue, and wait for an acknowledgement from the server.
     * @param force - whether to resend a packet that has not been acknowledged yet
     *
     * @private
     */
    _drainQueue(force = false) {
      if (!this.connected || this._queue.length === 0) {
        return;
      }
      const packet = this._queue[0];
      if (packet.pending && !force) {
        return;
      }
      packet.pending = true;
      packet.tryCount++;
      this.flags = packet.flags;
      this.emit.apply(this, packet.args);
    }
    /**
     * Sends a packet.
     *
     * @param packet
     * @private
     */
    packet(packet) {
      packet.nsp = this.nsp;
      this.io._packet(packet);
    }
    /**
     * Called upon engine `open`.
     *
     * @private
     */
    onopen() {
      if (typeof this.auth == "function") {
        this.auth((data) => {
          this._sendConnectPacket(data);
        });
      } else {
        this._sendConnectPacket(this.auth);
      }
    }
    /**
     * Sends a CONNECT packet to initiate the Socket.IO session.
     *
     * @param data
     * @private
     */
    _sendConnectPacket(data) {
      this.packet({
        type: PacketType.CONNECT,
        data: this._pid ? Object.assign({ pid: this._pid, offset: this._lastOffset }, data) : data
      });
    }
    /**
     * Called upon engine or manager `error`.
     *
     * @param err
     * @private
     */
    onerror(err) {
      if (!this.connected) {
        this.emitReserved("connect_error", err);
      }
    }
    /**
     * Called upon engine `close`.
     *
     * @param reason
     * @param description
     * @private
     */
    onclose(reason, description) {
      this.connected = false;
      delete this.id;
      this.emitReserved("disconnect", reason, description);
    }
    /**
     * Called with socket packet.
     *
     * @param packet
     * @private
     */
    onpacket(packet) {
      const sameNamespace = packet.nsp === this.nsp;
      if (!sameNamespace)
        return;
      switch (packet.type) {
        case PacketType.CONNECT:
          if (packet.data && packet.data.sid) {
            this.onconnect(packet.data.sid, packet.data.pid);
          } else {
            this.emitReserved("connect_error", new Error("It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"));
          }
          break;
        case PacketType.EVENT:
        case PacketType.BINARY_EVENT:
          this.onevent(packet);
          break;
        case PacketType.ACK:
        case PacketType.BINARY_ACK:
          this.onack(packet);
          break;
        case PacketType.DISCONNECT:
          this.ondisconnect();
          break;
        case PacketType.CONNECT_ERROR:
          this.destroy();
          const err = new Error(packet.data.message);
          err.data = packet.data.data;
          this.emitReserved("connect_error", err);
          break;
      }
    }
    /**
     * Called upon a server event.
     *
     * @param packet
     * @private
     */
    onevent(packet) {
      const args = packet.data || [];
      if (null != packet.id) {
        args.push(this.ack(packet.id));
      }
      if (this.connected) {
        this.emitEvent(args);
      } else {
        this.receiveBuffer.push(Object.freeze(args));
      }
    }
    emitEvent(args) {
      if (this._anyListeners && this._anyListeners.length) {
        const listeners = this._anyListeners.slice();
        for (const listener of listeners) {
          listener.apply(this, args);
        }
      }
      super.emit.apply(this, args);
      if (this._pid && args.length && typeof args[args.length - 1] === "string") {
        this._lastOffset = args[args.length - 1];
      }
    }
    /**
     * Produces an ack callback to emit with an event.
     *
     * @private
     */
    ack(id) {
      const self2 = this;
      let sent = false;
      return function(...args) {
        if (sent)
          return;
        sent = true;
        self2.packet({
          type: PacketType.ACK,
          id,
          data: args
        });
      };
    }
    /**
     * Called upon a server acknowlegement.
     *
     * @param packet
     * @private
     */
    onack(packet) {
      const ack = this.acks[packet.id];
      if ("function" === typeof ack) {
        ack.apply(this, packet.data);
        delete this.acks[packet.id];
      }
    }
    /**
     * Called upon server connect.
     *
     * @private
     */
    onconnect(id, pid) {
      this.id = id;
      this.recovered = pid && this._pid === pid;
      this._pid = pid;
      this.connected = true;
      this.emitBuffered();
      this.emitReserved("connect");
      this._drainQueue(true);
    }
    /**
     * Emit buffered events (received and emitted).
     *
     * @private
     */
    emitBuffered() {
      this.receiveBuffer.forEach((args) => this.emitEvent(args));
      this.receiveBuffer = [];
      this.sendBuffer.forEach((packet) => {
        this.notifyOutgoingListeners(packet);
        this.packet(packet);
      });
      this.sendBuffer = [];
    }
    /**
     * Called upon server disconnect.
     *
     * @private
     */
    ondisconnect() {
      this.destroy();
      this.onclose("io server disconnect");
    }
    /**
     * Called upon forced client/server side disconnections,
     * this method ensures the manager stops tracking us and
     * that reconnections don't get triggered for this.
     *
     * @private
     */
    destroy() {
      if (this.subs) {
        this.subs.forEach((subDestroy) => subDestroy());
        this.subs = void 0;
      }
      this.io["_destroy"](this);
    }
    /**
     * Disconnects the socket manually. In that case, the socket will not try to reconnect.
     *
     * If this is the last active Socket instance of the {@link Manager}, the low-level connection will be closed.
     *
     * @example
     * const socket = io();
     *
     * socket.on("disconnect", (reason) => {
     *   // console.log(reason); prints "io client disconnect"
     * });
     *
     * socket.disconnect();
     *
     * @return self
     */
    disconnect() {
      if (this.connected) {
        this.packet({ type: PacketType.DISCONNECT });
      }
      this.destroy();
      if (this.connected) {
        this.onclose("io client disconnect");
      }
      return this;
    }
    /**
     * Alias for {@link disconnect()}.
     *
     * @return self
     */
    close() {
      return this.disconnect();
    }
    /**
     * Sets the compress flag.
     *
     * @example
     * socket.compress(false).emit("hello");
     *
     * @param compress - if `true`, compresses the sending data
     * @return self
     */
    compress(compress) {
      this.flags.compress = compress;
      return this;
    }
    /**
     * Sets a modifier for a subsequent event emission that the event message will be dropped when this socket is not
     * ready to send messages.
     *
     * @example
     * socket.volatile.emit("hello"); // the server may or may not receive it
     *
     * @returns self
     */
    get volatile() {
      this.flags.volatile = true;
      return this;
    }
    /**
     * Sets a modifier for a subsequent event emission that the callback will be called with an error when the
     * given number of milliseconds have elapsed without an acknowledgement from the server:
     *
     * @example
     * socket.timeout(5000).emit("my-event", (err) => {
     *   if (err) {
     *     // the server did not acknowledge the event in the given delay
     *   }
     * });
     *
     * @returns self
     */
    timeout(timeout) {
      this.flags.timeout = timeout;
      return this;
    }
    /**
     * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
     * callback.
     *
     * @example
     * socket.onAny((event, ...args) => {
     *   console.log(`got ${event}`);
     * });
     *
     * @param listener
     */
    onAny(listener) {
      this._anyListeners = this._anyListeners || [];
      this._anyListeners.push(listener);
      return this;
    }
    /**
     * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
     * callback. The listener is added to the beginning of the listeners array.
     *
     * @example
     * socket.prependAny((event, ...args) => {
     *   console.log(`got event ${event}`);
     * });
     *
     * @param listener
     */
    prependAny(listener) {
      this._anyListeners = this._anyListeners || [];
      this._anyListeners.unshift(listener);
      return this;
    }
    /**
     * Removes the listener that will be fired when any event is emitted.
     *
     * @example
     * const catchAllListener = (event, ...args) => {
     *   console.log(`got event ${event}`);
     * }
     *
     * socket.onAny(catchAllListener);
     *
     * // remove a specific listener
     * socket.offAny(catchAllListener);
     *
     * // or remove all listeners
     * socket.offAny();
     *
     * @param listener
     */
    offAny(listener) {
      if (!this._anyListeners) {
        return this;
      }
      if (listener) {
        const listeners = this._anyListeners;
        for (let i2 = 0; i2 < listeners.length; i2++) {
          if (listener === listeners[i2]) {
            listeners.splice(i2, 1);
            return this;
          }
        }
      } else {
        this._anyListeners = [];
      }
      return this;
    }
    /**
     * Returns an array of listeners that are listening for any event that is specified. This array can be manipulated,
     * e.g. to remove listeners.
     */
    listenersAny() {
      return this._anyListeners || [];
    }
    /**
     * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
     * callback.
     *
     * Note: acknowledgements sent to the server are not included.
     *
     * @example
     * socket.onAnyOutgoing((event, ...args) => {
     *   console.log(`sent event ${event}`);
     * });
     *
     * @param listener
     */
    onAnyOutgoing(listener) {
      this._anyOutgoingListeners = this._anyOutgoingListeners || [];
      this._anyOutgoingListeners.push(listener);
      return this;
    }
    /**
     * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
     * callback. The listener is added to the beginning of the listeners array.
     *
     * Note: acknowledgements sent to the server are not included.
     *
     * @example
     * socket.prependAnyOutgoing((event, ...args) => {
     *   console.log(`sent event ${event}`);
     * });
     *
     * @param listener
     */
    prependAnyOutgoing(listener) {
      this._anyOutgoingListeners = this._anyOutgoingListeners || [];
      this._anyOutgoingListeners.unshift(listener);
      return this;
    }
    /**
     * Removes the listener that will be fired when any event is emitted.
     *
     * @example
     * const catchAllListener = (event, ...args) => {
     *   console.log(`sent event ${event}`);
     * }
     *
     * socket.onAnyOutgoing(catchAllListener);
     *
     * // remove a specific listener
     * socket.offAnyOutgoing(catchAllListener);
     *
     * // or remove all listeners
     * socket.offAnyOutgoing();
     *
     * @param [listener] - the catch-all listener (optional)
     */
    offAnyOutgoing(listener) {
      if (!this._anyOutgoingListeners) {
        return this;
      }
      if (listener) {
        const listeners = this._anyOutgoingListeners;
        for (let i2 = 0; i2 < listeners.length; i2++) {
          if (listener === listeners[i2]) {
            listeners.splice(i2, 1);
            return this;
          }
        }
      } else {
        this._anyOutgoingListeners = [];
      }
      return this;
    }
    /**
     * Returns an array of listeners that are listening for any event that is specified. This array can be manipulated,
     * e.g. to remove listeners.
     */
    listenersAnyOutgoing() {
      return this._anyOutgoingListeners || [];
    }
    /**
     * Notify the listeners for each packet sent
     *
     * @param packet
     *
     * @private
     */
    notifyOutgoingListeners(packet) {
      if (this._anyOutgoingListeners && this._anyOutgoingListeners.length) {
        const listeners = this._anyOutgoingListeners.slice();
        for (const listener of listeners) {
          listener.apply(this, packet.data);
        }
      }
    }
  }
  function Backoff(opts) {
    opts = opts || {};
    this.ms = opts.min || 100;
    this.max = opts.max || 1e4;
    this.factor = opts.factor || 2;
    this.jitter = opts.jitter > 0 && opts.jitter <= 1 ? opts.jitter : 0;
    this.attempts = 0;
  }
  Backoff.prototype.duration = function() {
    var ms = this.ms * Math.pow(this.factor, this.attempts++);
    if (this.jitter) {
      var rand = Math.random();
      var deviation = Math.floor(rand * this.jitter * ms);
      ms = (Math.floor(rand * 10) & 1) == 0 ? ms - deviation : ms + deviation;
    }
    return Math.min(ms, this.max) | 0;
  };
  Backoff.prototype.reset = function() {
    this.attempts = 0;
  };
  Backoff.prototype.setMin = function(min) {
    this.ms = min;
  };
  Backoff.prototype.setMax = function(max) {
    this.max = max;
  };
  Backoff.prototype.setJitter = function(jitter) {
    this.jitter = jitter;
  };
  class Manager extends Emitter {
    constructor(uri, opts) {
      var _a;
      super();
      this.nsps = {};
      this.subs = [];
      if (uri && "object" === typeof uri) {
        opts = uri;
        uri = void 0;
      }
      opts = opts || {};
      opts.path = opts.path || "/socket.io";
      this.opts = opts;
      installTimerFunctions(this, opts);
      this.reconnection(opts.reconnection !== false);
      this.reconnectionAttempts(opts.reconnectionAttempts || Infinity);
      this.reconnectionDelay(opts.reconnectionDelay || 1e3);
      this.reconnectionDelayMax(opts.reconnectionDelayMax || 5e3);
      this.randomizationFactor((_a = opts.randomizationFactor) !== null && _a !== void 0 ? _a : 0.5);
      this.backoff = new Backoff({
        min: this.reconnectionDelay(),
        max: this.reconnectionDelayMax(),
        jitter: this.randomizationFactor()
      });
      this.timeout(null == opts.timeout ? 2e4 : opts.timeout);
      this._readyState = "closed";
      this.uri = uri;
      const _parser = opts.parser || parser;
      this.encoder = new _parser.Encoder();
      this.decoder = new _parser.Decoder();
      this._autoConnect = opts.autoConnect !== false;
      if (this._autoConnect)
        this.open();
    }
    reconnection(v) {
      if (!arguments.length)
        return this._reconnection;
      this._reconnection = !!v;
      return this;
    }
    reconnectionAttempts(v) {
      if (v === void 0)
        return this._reconnectionAttempts;
      this._reconnectionAttempts = v;
      return this;
    }
    reconnectionDelay(v) {
      var _a;
      if (v === void 0)
        return this._reconnectionDelay;
      this._reconnectionDelay = v;
      (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setMin(v);
      return this;
    }
    randomizationFactor(v) {
      var _a;
      if (v === void 0)
        return this._randomizationFactor;
      this._randomizationFactor = v;
      (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setJitter(v);
      return this;
    }
    reconnectionDelayMax(v) {
      var _a;
      if (v === void 0)
        return this._reconnectionDelayMax;
      this._reconnectionDelayMax = v;
      (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setMax(v);
      return this;
    }
    timeout(v) {
      if (!arguments.length)
        return this._timeout;
      this._timeout = v;
      return this;
    }
    /**
     * Starts trying to reconnect if reconnection is enabled and we have not
     * started reconnecting yet
     *
     * @private
     */
    maybeReconnectOnOpen() {
      if (!this._reconnecting && this._reconnection && this.backoff.attempts === 0) {
        this.reconnect();
      }
    }
    /**
     * Sets the current transport `socket`.
     *
     * @param {Function} fn - optional, callback
     * @return self
     * @public
     */
    open(fn) {
      if (~this._readyState.indexOf("open"))
        return this;
      this.engine = new Socket$1(this.uri, this.opts);
      const socket = this.engine;
      const self2 = this;
      this._readyState = "opening";
      this.skipReconnect = false;
      const openSubDestroy = on(socket, "open", function() {
        self2.onopen();
        fn && fn();
      });
      const onError = (err) => {
        this.cleanup();
        this._readyState = "closed";
        this.emitReserved("error", err);
        if (fn) {
          fn(err);
        } else {
          this.maybeReconnectOnOpen();
        }
      };
      const errorSub = on(socket, "error", onError);
      if (false !== this._timeout) {
        const timeout = this._timeout;
        const timer = this.setTimeoutFn(() => {
          openSubDestroy();
          onError(new Error("timeout"));
          socket.close();
        }, timeout);
        if (this.opts.autoUnref) {
          timer.unref();
        }
        this.subs.push(() => {
          this.clearTimeoutFn(timer);
        });
      }
      this.subs.push(openSubDestroy);
      this.subs.push(errorSub);
      return this;
    }
    /**
     * Alias for open()
     *
     * @return self
     * @public
     */
    connect(fn) {
      return this.open(fn);
    }
    /**
     * Called upon transport open.
     *
     * @private
     */
    onopen() {
      this.cleanup();
      this._readyState = "open";
      this.emitReserved("open");
      const socket = this.engine;
      this.subs.push(on(socket, "ping", this.onping.bind(this)), on(socket, "data", this.ondata.bind(this)), on(socket, "error", this.onerror.bind(this)), on(socket, "close", this.onclose.bind(this)), on(this.decoder, "decoded", this.ondecoded.bind(this)));
    }
    /**
     * Called upon a ping.
     *
     * @private
     */
    onping() {
      this.emitReserved("ping");
    }
    /**
     * Called with data.
     *
     * @private
     */
    ondata(data) {
      try {
        this.decoder.add(data);
      } catch (e) {
        this.onclose("parse error", e);
      }
    }
    /**
     * Called when parser fully decodes a packet.
     *
     * @private
     */
    ondecoded(packet) {
      nextTick(() => {
        this.emitReserved("packet", packet);
      }, this.setTimeoutFn);
    }
    /**
     * Called upon socket error.
     *
     * @private
     */
    onerror(err) {
      this.emitReserved("error", err);
    }
    /**
     * Creates a new socket for the given `nsp`.
     *
     * @return {Socket}
     * @public
     */
    socket(nsp, opts) {
      let socket = this.nsps[nsp];
      if (!socket) {
        socket = new Socket(this, nsp, opts);
        this.nsps[nsp] = socket;
      } else if (this._autoConnect && !socket.active) {
        socket.connect();
      }
      return socket;
    }
    /**
     * Called upon a socket close.
     *
     * @param socket
     * @private
     */
    _destroy(socket) {
      const nsps = Object.keys(this.nsps);
      for (const nsp of nsps) {
        const socket2 = this.nsps[nsp];
        if (socket2.active) {
          return;
        }
      }
      this._close();
    }
    /**
     * Writes a packet.
     *
     * @param packet
     * @private
     */
    _packet(packet) {
      const encodedPackets = this.encoder.encode(packet);
      for (let i2 = 0; i2 < encodedPackets.length; i2++) {
        this.engine.write(encodedPackets[i2], packet.options);
      }
    }
    /**
     * Clean up transport subscriptions and packet buffer.
     *
     * @private
     */
    cleanup() {
      this.subs.forEach((subDestroy) => subDestroy());
      this.subs.length = 0;
      this.decoder.destroy();
    }
    /**
     * Close the current socket.
     *
     * @private
     */
    _close() {
      this.skipReconnect = true;
      this._reconnecting = false;
      this.onclose("forced close");
      if (this.engine)
        this.engine.close();
    }
    /**
     * Alias for close()
     *
     * @private
     */
    disconnect() {
      return this._close();
    }
    /**
     * Called upon engine close.
     *
     * @private
     */
    onclose(reason, description) {
      this.cleanup();
      this.backoff.reset();
      this._readyState = "closed";
      this.emitReserved("close", reason, description);
      if (this._reconnection && !this.skipReconnect) {
        this.reconnect();
      }
    }
    /**
     * Attempt a reconnection.
     *
     * @private
     */
    reconnect() {
      if (this._reconnecting || this.skipReconnect)
        return this;
      const self2 = this;
      if (this.backoff.attempts >= this._reconnectionAttempts) {
        this.backoff.reset();
        this.emitReserved("reconnect_failed");
        this._reconnecting = false;
      } else {
        const delay = this.backoff.duration();
        this._reconnecting = true;
        const timer = this.setTimeoutFn(() => {
          if (self2.skipReconnect)
            return;
          this.emitReserved("reconnect_attempt", self2.backoff.attempts);
          if (self2.skipReconnect)
            return;
          self2.open((err) => {
            if (err) {
              self2._reconnecting = false;
              self2.reconnect();
              this.emitReserved("reconnect_error", err);
            } else {
              self2.onreconnect();
            }
          });
        }, delay);
        if (this.opts.autoUnref) {
          timer.unref();
        }
        this.subs.push(() => {
          this.clearTimeoutFn(timer);
        });
      }
    }
    /**
     * Called upon successful reconnect.
     *
     * @private
     */
    onreconnect() {
      const attempt = this.backoff.attempts;
      this._reconnecting = false;
      this.backoff.reset();
      this.emitReserved("reconnect", attempt);
    }
  }
  const cache = {};
  function lookup(uri, opts) {
    if (typeof uri === "object") {
      opts = uri;
      uri = void 0;
    }
    opts = opts || {};
    const parsed = url(uri, opts.path || "/socket.io");
    const source = parsed.source;
    const id = parsed.id;
    const path = parsed.path;
    const sameNamespace = cache[id] && path in cache[id]["nsps"];
    const newConnection = opts.forceNew || opts["force new connection"] || false === opts.multiplex || sameNamespace;
    let io;
    if (newConnection) {
      io = new Manager(source, opts);
    } else {
      if (!cache[id]) {
        cache[id] = new Manager(source, opts);
      }
      io = cache[id];
    }
    if (parsed.query && !opts.query) {
      opts.query = parsed.queryKey;
    }
    return io.socket(parsed.path, opts);
  }
  Object.assign(lookup, {
    Manager,
    Socket,
    io: lookup,
    connect: lookup
  });
  var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
  function getDefaultExportFromCjs(x) {
    return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
  }
  var events = { exports: {} };
  var R = typeof Reflect === "object" ? Reflect : null;
  var ReflectApply = R && typeof R.apply === "function" ? R.apply : function ReflectApply2(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
  };
  var ReflectOwnKeys;
  if (R && typeof R.ownKeys === "function") {
    ReflectOwnKeys = R.ownKeys;
  } else if (Object.getOwnPropertySymbols) {
    ReflectOwnKeys = function ReflectOwnKeys2(target) {
      return Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target));
    };
  } else {
    ReflectOwnKeys = function ReflectOwnKeys2(target) {
      return Object.getOwnPropertyNames(target);
    };
  }
  function ProcessEmitWarning(warning) {
    if (console && console.warn)
      console.warn(warning);
  }
  var NumberIsNaN = Number.isNaN || function NumberIsNaN2(value2) {
    return value2 !== value2;
  };
  function EventEmitter() {
    EventEmitter.init.call(this);
  }
  events.exports = EventEmitter;
  events.exports.once = once;
  EventEmitter.EventEmitter = EventEmitter;
  EventEmitter.prototype._events = void 0;
  EventEmitter.prototype._eventsCount = 0;
  EventEmitter.prototype._maxListeners = void 0;
  var defaultMaxListeners = 10;
  function checkListener(listener) {
    if (typeof listener !== "function") {
      throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
    }
  }
  Object.defineProperty(EventEmitter, "defaultMaxListeners", {
    enumerable: true,
    get: function() {
      return defaultMaxListeners;
    },
    set: function(arg) {
      if (typeof arg !== "number" || arg < 0 || NumberIsNaN(arg)) {
        throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + ".");
      }
      defaultMaxListeners = arg;
    }
  });
  EventEmitter.init = function() {
    if (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) {
      this._events = /* @__PURE__ */ Object.create(null);
      this._eventsCount = 0;
    }
    this._maxListeners = this._maxListeners || void 0;
  };
  EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
    if (typeof n !== "number" || n < 0 || NumberIsNaN(n)) {
      throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + ".");
    }
    this._maxListeners = n;
    return this;
  };
  function _getMaxListeners(that) {
    if (that._maxListeners === void 0)
      return EventEmitter.defaultMaxListeners;
    return that._maxListeners;
  }
  EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
    return _getMaxListeners(this);
  };
  EventEmitter.prototype.emit = function emit(type) {
    var args = [];
    for (var i2 = 1; i2 < arguments.length; i2++)
      args.push(arguments[i2]);
    var doError = type === "error";
    var events2 = this._events;
    if (events2 !== void 0)
      doError = doError && events2.error === void 0;
    else if (!doError)
      return false;
    if (doError) {
      var er;
      if (args.length > 0)
        er = args[0];
      if (er instanceof Error) {
        throw er;
      }
      var err = new Error("Unhandled error." + (er ? " (" + er.message + ")" : ""));
      err.context = er;
      throw err;
    }
    var handler = events2[type];
    if (handler === void 0)
      return false;
    if (typeof handler === "function") {
      ReflectApply(handler, this, args);
    } else {
      var len = handler.length;
      var listeners = arrayClone(handler, len);
      for (var i2 = 0; i2 < len; ++i2)
        ReflectApply(listeners[i2], this, args);
    }
    return true;
  };
  function _addListener(target, type, listener, prepend) {
    var m;
    var events2;
    var existing;
    checkListener(listener);
    events2 = target._events;
    if (events2 === void 0) {
      events2 = target._events = /* @__PURE__ */ Object.create(null);
      target._eventsCount = 0;
    } else {
      if (events2.newListener !== void 0) {
        target.emit(
          "newListener",
          type,
          listener.listener ? listener.listener : listener
        );
        events2 = target._events;
      }
      existing = events2[type];
    }
    if (existing === void 0) {
      existing = events2[type] = listener;
      ++target._eventsCount;
    } else {
      if (typeof existing === "function") {
        existing = events2[type] = prepend ? [listener, existing] : [existing, listener];
      } else if (prepend) {
        existing.unshift(listener);
      } else {
        existing.push(listener);
      }
      m = _getMaxListeners(target);
      if (m > 0 && existing.length > m && !existing.warned) {
        existing.warned = true;
        var w = new Error("Possible EventEmitter memory leak detected. " + existing.length + " " + String(type) + " listeners added. Use emitter.setMaxListeners() to increase limit");
        w.name = "MaxListenersExceededWarning";
        w.emitter = target;
        w.type = type;
        w.count = existing.length;
        ProcessEmitWarning(w);
      }
    }
    return target;
  }
  EventEmitter.prototype.addListener = function addListener(type, listener) {
    return _addListener(this, type, listener, false);
  };
  EventEmitter.prototype.on = EventEmitter.prototype.addListener;
  EventEmitter.prototype.prependListener = function prependListener(type, listener) {
    return _addListener(this, type, listener, true);
  };
  function onceWrapper() {
    if (!this.fired) {
      this.target.removeListener(this.type, this.wrapFn);
      this.fired = true;
      if (arguments.length === 0)
        return this.listener.call(this.target);
      return this.listener.apply(this.target, arguments);
    }
  }
  function _onceWrap(target, type, listener) {
    var state = { fired: false, wrapFn: void 0, target, type, listener };
    var wrapped = onceWrapper.bind(state);
    wrapped.listener = listener;
    state.wrapFn = wrapped;
    return wrapped;
  }
  EventEmitter.prototype.once = function once2(type, listener) {
    checkListener(listener);
    this.on(type, _onceWrap(this, type, listener));
    return this;
  };
  EventEmitter.prototype.prependOnceListener = function prependOnceListener(type, listener) {
    checkListener(listener);
    this.prependListener(type, _onceWrap(this, type, listener));
    return this;
  };
  EventEmitter.prototype.removeListener = function removeListener(type, listener) {
    var list, events2, position, i2, originalListener;
    checkListener(listener);
    events2 = this._events;
    if (events2 === void 0)
      return this;
    list = events2[type];
    if (list === void 0)
      return this;
    if (list === listener || list.listener === listener) {
      if (--this._eventsCount === 0)
        this._events = /* @__PURE__ */ Object.create(null);
      else {
        delete events2[type];
        if (events2.removeListener)
          this.emit("removeListener", type, list.listener || listener);
      }
    } else if (typeof list !== "function") {
      position = -1;
      for (i2 = list.length - 1; i2 >= 0; i2--) {
        if (list[i2] === listener || list[i2].listener === listener) {
          originalListener = list[i2].listener;
          position = i2;
          break;
        }
      }
      if (position < 0)
        return this;
      if (position === 0)
        list.shift();
      else {
        spliceOne(list, position);
      }
      if (list.length === 1)
        events2[type] = list[0];
      if (events2.removeListener !== void 0)
        this.emit("removeListener", type, originalListener || listener);
    }
    return this;
  };
  EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
  EventEmitter.prototype.removeAllListeners = function removeAllListeners(type) {
    var listeners, events2, i2;
    events2 = this._events;
    if (events2 === void 0)
      return this;
    if (events2.removeListener === void 0) {
      if (arguments.length === 0) {
        this._events = /* @__PURE__ */ Object.create(null);
        this._eventsCount = 0;
      } else if (events2[type] !== void 0) {
        if (--this._eventsCount === 0)
          this._events = /* @__PURE__ */ Object.create(null);
        else
          delete events2[type];
      }
      return this;
    }
    if (arguments.length === 0) {
      var keys = Object.keys(events2);
      var key;
      for (i2 = 0; i2 < keys.length; ++i2) {
        key = keys[i2];
        if (key === "removeListener")
          continue;
        this.removeAllListeners(key);
      }
      this.removeAllListeners("removeListener");
      this._events = /* @__PURE__ */ Object.create(null);
      this._eventsCount = 0;
      return this;
    }
    listeners = events2[type];
    if (typeof listeners === "function") {
      this.removeListener(type, listeners);
    } else if (listeners !== void 0) {
      for (i2 = listeners.length - 1; i2 >= 0; i2--) {
        this.removeListener(type, listeners[i2]);
      }
    }
    return this;
  };
  function _listeners(target, type, unwrap) {
    var events2 = target._events;
    if (events2 === void 0)
      return [];
    var evlistener = events2[type];
    if (evlistener === void 0)
      return [];
    if (typeof evlistener === "function")
      return unwrap ? [evlistener.listener || evlistener] : [evlistener];
    return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
  }
  EventEmitter.prototype.listeners = function listeners(type) {
    return _listeners(this, type, true);
  };
  EventEmitter.prototype.rawListeners = function rawListeners(type) {
    return _listeners(this, type, false);
  };
  EventEmitter.listenerCount = function(emitter, type) {
    if (typeof emitter.listenerCount === "function") {
      return emitter.listenerCount(type);
    } else {
      return listenerCount.call(emitter, type);
    }
  };
  EventEmitter.prototype.listenerCount = listenerCount;
  function listenerCount(type) {
    var events2 = this._events;
    if (events2 !== void 0) {
      var evlistener = events2[type];
      if (typeof evlistener === "function") {
        return 1;
      } else if (evlistener !== void 0) {
        return evlistener.length;
      }
    }
    return 0;
  }
  EventEmitter.prototype.eventNames = function eventNames() {
    return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
  };
  function arrayClone(arr, n) {
    var copy = new Array(n);
    for (var i2 = 0; i2 < n; ++i2)
      copy[i2] = arr[i2];
    return copy;
  }
  function spliceOne(list, index) {
    for (; index + 1 < list.length; index++)
      list[index] = list[index + 1];
    list.pop();
  }
  function unwrapListeners(arr) {
    var ret = new Array(arr.length);
    for (var i2 = 0; i2 < ret.length; ++i2) {
      ret[i2] = arr[i2].listener || arr[i2];
    }
    return ret;
  }
  function once(emitter, name) {
    return new Promise(function(resolve, reject) {
      function errorListener(err) {
        emitter.removeListener(name, resolver);
        reject(err);
      }
      function resolver() {
        if (typeof emitter.removeListener === "function") {
          emitter.removeListener("error", errorListener);
        }
        resolve([].slice.call(arguments));
      }
      eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
      if (name !== "error") {
        addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
      }
    });
  }
  function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
    if (typeof emitter.on === "function") {
      eventTargetAgnosticAddListener(emitter, "error", handler, flags);
    }
  }
  function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
    if (typeof emitter.on === "function") {
      if (flags.once) {
        emitter.once(name, listener);
      } else {
        emitter.on(name, listener);
      }
    } else if (typeof emitter.addEventListener === "function") {
      emitter.addEventListener(name, function wrapListener(arg) {
        if (flags.once) {
          emitter.removeEventListener(name, wrapListener);
        }
        listener(arg);
      });
    } else {
      throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
    }
  }
  var eventsExports = events.exports;
  const EventEmitter$1 = /* @__PURE__ */ getDefaultExportFromCjs(eventsExports);
  var src = {};
  var sha3$1 = {};
  var _assert = {};
  Object.defineProperty(_assert, "__esModule", { value: true });
  _assert.isBytes = isBytes;
  _assert.number = number;
  _assert.bool = bool;
  _assert.bytes = bytes;
  _assert.hash = hash$1;
  _assert.exists = exists;
  _assert.output = output;
  function number(n) {
    if (!Number.isSafeInteger(n) || n < 0)
      throw new Error(`positive integer expected, not ${n}`);
  }
  function bool(b) {
    if (typeof b !== "boolean")
      throw new Error(`boolean expected, not ${b}`);
  }
  function isBytes(a) {
    return a instanceof Uint8Array || a != null && typeof a === "object" && a.constructor.name === "Uint8Array";
  }
  function bytes(b, ...lengths) {
    if (!isBytes(b))
      throw new Error("Uint8Array expected");
    if (lengths.length > 0 && !lengths.includes(b.length))
      throw new Error(`Uint8Array expected of length ${lengths}, not of length=${b.length}`);
  }
  function hash$1(h) {
    if (typeof h !== "function" || typeof h.create !== "function")
      throw new Error("Hash should be wrapped by utils.wrapConstructor");
    number(h.outputLen);
    number(h.blockLen);
  }
  function exists(instance2, checkFinished = true) {
    if (instance2.destroyed)
      throw new Error("Hash instance has been destroyed");
    if (checkFinished && instance2.finished)
      throw new Error("Hash#digest() has already been called");
  }
  function output(out, instance2) {
    bytes(out);
    const min = instance2.outputLen;
    if (out.length < min) {
      throw new Error(`digestInto() expects output buffer of length at least ${min}`);
    }
  }
  const assert = { number, bool, bytes, hash: hash$1, exists, output };
  _assert.default = assert;
  var _u64 = {};
  Object.defineProperty(_u64, "__esModule", { value: true });
  _u64.add5L = _u64.add5H = _u64.add4H = _u64.add4L = _u64.add3H = _u64.add3L = _u64.rotlBL = _u64.rotlBH = _u64.rotlSL = _u64.rotlSH = _u64.rotr32L = _u64.rotr32H = _u64.rotrBL = _u64.rotrBH = _u64.rotrSL = _u64.rotrSH = _u64.shrSL = _u64.shrSH = _u64.toBig = void 0;
  _u64.fromBig = fromBig;
  _u64.split = split;
  _u64.add = add;
  const U32_MASK64 = /* @__PURE__ */ BigInt(2 ** 32 - 1);
  const _32n = /* @__PURE__ */ BigInt(32);
  function fromBig(n, le = false) {
    if (le)
      return { h: Number(n & U32_MASK64), l: Number(n >> _32n & U32_MASK64) };
    return { h: Number(n >> _32n & U32_MASK64) | 0, l: Number(n & U32_MASK64) | 0 };
  }
  function split(lst, le = false) {
    let Ah = new Uint32Array(lst.length);
    let Al = new Uint32Array(lst.length);
    for (let i2 = 0; i2 < lst.length; i2++) {
      const { h, l } = fromBig(lst[i2], le);
      [Ah[i2], Al[i2]] = [h, l];
    }
    return [Ah, Al];
  }
  const toBig = (h, l) => BigInt(h >>> 0) << _32n | BigInt(l >>> 0);
  _u64.toBig = toBig;
  const shrSH = (h, _l, s) => h >>> s;
  _u64.shrSH = shrSH;
  const shrSL = (h, l, s) => h << 32 - s | l >>> s;
  _u64.shrSL = shrSL;
  const rotrSH = (h, l, s) => h >>> s | l << 32 - s;
  _u64.rotrSH = rotrSH;
  const rotrSL = (h, l, s) => h << 32 - s | l >>> s;
  _u64.rotrSL = rotrSL;
  const rotrBH = (h, l, s) => h << 64 - s | l >>> s - 32;
  _u64.rotrBH = rotrBH;
  const rotrBL = (h, l, s) => h >>> s - 32 | l << 64 - s;
  _u64.rotrBL = rotrBL;
  const rotr32H = (_h, l) => l;
  _u64.rotr32H = rotr32H;
  const rotr32L = (h, _l) => h;
  _u64.rotr32L = rotr32L;
  const rotlSH = (h, l, s) => h << s | l >>> 32 - s;
  _u64.rotlSH = rotlSH;
  const rotlSL = (h, l, s) => l << s | h >>> 32 - s;
  _u64.rotlSL = rotlSL;
  const rotlBH = (h, l, s) => l << s - 32 | h >>> 64 - s;
  _u64.rotlBH = rotlBH;
  const rotlBL = (h, l, s) => h << s - 32 | l >>> 64 - s;
  _u64.rotlBL = rotlBL;
  function add(Ah, Al, Bh, Bl) {
    const l = (Al >>> 0) + (Bl >>> 0);
    return { h: Ah + Bh + (l / 2 ** 32 | 0) | 0, l: l | 0 };
  }
  const add3L = (Al, Bl, Cl) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0);
  _u64.add3L = add3L;
  const add3H = (low, Ah, Bh, Ch) => Ah + Bh + Ch + (low / 2 ** 32 | 0) | 0;
  _u64.add3H = add3H;
  const add4L = (Al, Bl, Cl, Dl) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0) + (Dl >>> 0);
  _u64.add4L = add4L;
  const add4H = (low, Ah, Bh, Ch, Dh) => Ah + Bh + Ch + Dh + (low / 2 ** 32 | 0) | 0;
  _u64.add4H = add4H;
  const add5L = (Al, Bl, Cl, Dl, El) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0) + (Dl >>> 0) + (El >>> 0);
  _u64.add5L = add5L;
  const add5H = (low, Ah, Bh, Ch, Dh, Eh) => Ah + Bh + Ch + Dh + Eh + (low / 2 ** 32 | 0) | 0;
  _u64.add5H = add5H;
  const u64 = {
    fromBig,
    split,
    toBig,
    shrSH,
    shrSL,
    rotrSH,
    rotrSL,
    rotrBH,
    rotrBL,
    rotr32H,
    rotr32L,
    rotlSH,
    rotlSL,
    rotlBH,
    rotlBL,
    add,
    add3L,
    add3H,
    add4L,
    add4H,
    add5H,
    add5L
  };
  _u64.default = u64;
  var utils = {};
  var crypto = {};
  Object.defineProperty(crypto, "__esModule", { value: true });
  crypto.crypto = void 0;
  crypto.crypto = typeof globalThis === "object" && "crypto" in globalThis ? globalThis.crypto : void 0;
  (function(exports) {
    /*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Hash = exports.nextTick = exports.byteSwapIfBE = exports.byteSwap = exports.isLE = exports.rotl = exports.rotr = exports.createView = exports.u32 = exports.u8 = void 0;
    exports.isBytes = isBytes2;
    exports.byteSwap32 = byteSwap32;
    exports.bytesToHex = bytesToHex;
    exports.hexToBytes = hexToBytes;
    exports.asyncLoop = asyncLoop;
    exports.utf8ToBytes = utf8ToBytes;
    exports.toBytes = toBytes;
    exports.concatBytes = concatBytes;
    exports.checkOpts = checkOpts;
    exports.wrapConstructor = wrapConstructor;
    exports.wrapConstructorWithOpts = wrapConstructorWithOpts;
    exports.wrapXOFConstructorWithOpts = wrapXOFConstructorWithOpts;
    exports.randomBytes = randomBytes;
    const crypto_1 = crypto;
    const _assert_js_12 = _assert;
    function isBytes2(a) {
      return a instanceof Uint8Array || a != null && typeof a === "object" && a.constructor.name === "Uint8Array";
    }
    const u8 = (arr) => new Uint8Array(arr.buffer, arr.byteOffset, arr.byteLength);
    exports.u8 = u8;
    const u32 = (arr) => new Uint32Array(arr.buffer, arr.byteOffset, Math.floor(arr.byteLength / 4));
    exports.u32 = u32;
    const createView = (arr) => new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
    exports.createView = createView;
    const rotr = (word, shift) => word << 32 - shift | word >>> shift;
    exports.rotr = rotr;
    const rotl = (word, shift) => word << shift | word >>> 32 - shift >>> 0;
    exports.rotl = rotl;
    exports.isLE = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
    const byteSwap = (word) => word << 24 & 4278190080 | word << 8 & 16711680 | word >>> 8 & 65280 | word >>> 24 & 255;
    exports.byteSwap = byteSwap;
    exports.byteSwapIfBE = exports.isLE ? (n) => n : (n) => (0, exports.byteSwap)(n);
    function byteSwap32(arr) {
      for (let i2 = 0; i2 < arr.length; i2++) {
        arr[i2] = (0, exports.byteSwap)(arr[i2]);
      }
    }
    const hexes = /* @__PURE__ */ Array.from({ length: 256 }, (_, i2) => i2.toString(16).padStart(2, "0"));
    function bytesToHex(bytes2) {
      (0, _assert_js_12.bytes)(bytes2);
      let hex = "";
      for (let i2 = 0; i2 < bytes2.length; i2++) {
        hex += hexes[bytes2[i2]];
      }
      return hex;
    }
    const asciis = { _0: 48, _9: 57, _A: 65, _F: 70, _a: 97, _f: 102 };
    function asciiToBase16(char) {
      if (char >= asciis._0 && char <= asciis._9)
        return char - asciis._0;
      if (char >= asciis._A && char <= asciis._F)
        return char - (asciis._A - 10);
      if (char >= asciis._a && char <= asciis._f)
        return char - (asciis._a - 10);
      return;
    }
    function hexToBytes(hex) {
      if (typeof hex !== "string")
        throw new Error("hex string expected, got " + typeof hex);
      const hl = hex.length;
      const al = hl / 2;
      if (hl % 2)
        throw new Error("padded hex string expected, got unpadded hex of length " + hl);
      const array = new Uint8Array(al);
      for (let ai = 0, hi = 0; ai < al; ai++, hi += 2) {
        const n1 = asciiToBase16(hex.charCodeAt(hi));
        const n2 = asciiToBase16(hex.charCodeAt(hi + 1));
        if (n1 === void 0 || n2 === void 0) {
          const char = hex[hi] + hex[hi + 1];
          throw new Error('hex string expected, got non-hex character "' + char + '" at index ' + hi);
        }
        array[ai] = n1 * 16 + n2;
      }
      return array;
    }
    const nextTick2 = async () => {
    };
    exports.nextTick = nextTick2;
    async function asyncLoop(iters, tick, cb) {
      let ts = Date.now();
      for (let i2 = 0; i2 < iters; i2++) {
        cb(i2);
        const diff = Date.now() - ts;
        if (diff >= 0 && diff < tick)
          continue;
        await (0, exports.nextTick)();
        ts += diff;
      }
    }
    function utf8ToBytes(str) {
      if (typeof str !== "string")
        throw new Error(`utf8ToBytes expected string, got ${typeof str}`);
      return new Uint8Array(new TextEncoder().encode(str));
    }
    function toBytes(data) {
      if (typeof data === "string")
        data = utf8ToBytes(data);
      (0, _assert_js_12.bytes)(data);
      return data;
    }
    function concatBytes(...arrays) {
      let sum = 0;
      for (let i2 = 0; i2 < arrays.length; i2++) {
        const a = arrays[i2];
        (0, _assert_js_12.bytes)(a);
        sum += a.length;
      }
      const res = new Uint8Array(sum);
      for (let i2 = 0, pad = 0; i2 < arrays.length; i2++) {
        const a = arrays[i2];
        res.set(a, pad);
        pad += a.length;
      }
      return res;
    }
    class Hash {
      // Safe version that clones internal state
      clone() {
        return this._cloneInto();
      }
    }
    exports.Hash = Hash;
    const toStr = {}.toString;
    function checkOpts(defaults, opts) {
      if (opts !== void 0 && toStr.call(opts) !== "[object Object]")
        throw new Error("Options should be object or undefined");
      const merged = Object.assign(defaults, opts);
      return merged;
    }
    function wrapConstructor(hashCons) {
      const hashC = (msg) => hashCons().update(toBytes(msg)).digest();
      const tmp = hashCons();
      hashC.outputLen = tmp.outputLen;
      hashC.blockLen = tmp.blockLen;
      hashC.create = () => hashCons();
      return hashC;
    }
    function wrapConstructorWithOpts(hashCons) {
      const hashC = (msg, opts) => hashCons(opts).update(toBytes(msg)).digest();
      const tmp = hashCons({});
      hashC.outputLen = tmp.outputLen;
      hashC.blockLen = tmp.blockLen;
      hashC.create = (opts) => hashCons(opts);
      return hashC;
    }
    function wrapXOFConstructorWithOpts(hashCons) {
      const hashC = (msg, opts) => hashCons(opts).update(toBytes(msg)).digest();
      const tmp = hashCons({});
      hashC.outputLen = tmp.outputLen;
      hashC.blockLen = tmp.blockLen;
      hashC.create = (opts) => hashCons(opts);
      return hashC;
    }
    function randomBytes(bytesLength = 32) {
      if (crypto_1.crypto && typeof crypto_1.crypto.getRandomValues === "function") {
        return crypto_1.crypto.getRandomValues(new Uint8Array(bytesLength));
      }
      if (crypto_1.crypto && typeof crypto_1.crypto.randomBytes === "function") {
        return crypto_1.crypto.randomBytes(bytesLength);
      }
      throw new Error("crypto.getRandomValues must be defined");
    }
  })(utils);
  Object.defineProperty(sha3$1, "__esModule", { value: true });
  sha3$1.shake256 = sha3$1.shake128 = sha3$1.keccak_512 = sha3$1.keccak_384 = sha3$1.keccak_256 = sha3$1.keccak_224 = sha3$1.sha3_512 = sha3$1.sha3_384 = sha3$1.sha3_256 = sha3$1.sha3_224 = sha3$1.Keccak = void 0;
  sha3$1.keccakP = keccakP;
  const _assert_js_1 = _assert;
  const _u64_js_1 = _u64;
  const utils_js_1 = utils;
  const SHA3_PI = [];
  const SHA3_ROTL = [];
  const _SHA3_IOTA = [];
  const _0n = /* @__PURE__ */ BigInt(0);
  const _1n = /* @__PURE__ */ BigInt(1);
  const _2n = /* @__PURE__ */ BigInt(2);
  const _7n = /* @__PURE__ */ BigInt(7);
  const _256n = /* @__PURE__ */ BigInt(256);
  const _0x71n = /* @__PURE__ */ BigInt(113);
  for (let round = 0, R2 = _1n, x = 1, y = 0; round < 24; round++) {
    [x, y] = [y, (2 * x + 3 * y) % 5];
    SHA3_PI.push(2 * (5 * y + x));
    SHA3_ROTL.push((round + 1) * (round + 2) / 2 % 64);
    let t = _0n;
    for (let j = 0; j < 7; j++) {
      R2 = (R2 << _1n ^ (R2 >> _7n) * _0x71n) % _256n;
      if (R2 & _2n)
        t ^= _1n << (_1n << /* @__PURE__ */ BigInt(j)) - _1n;
    }
    _SHA3_IOTA.push(t);
  }
  const [SHA3_IOTA_H, SHA3_IOTA_L] = /* @__PURE__ */ (0, _u64_js_1.split)(_SHA3_IOTA, true);
  const rotlH = (h, l, s) => s > 32 ? (0, _u64_js_1.rotlBH)(h, l, s) : (0, _u64_js_1.rotlSH)(h, l, s);
  const rotlL = (h, l, s) => s > 32 ? (0, _u64_js_1.rotlBL)(h, l, s) : (0, _u64_js_1.rotlSL)(h, l, s);
  function keccakP(s, rounds = 24) {
    const B = new Uint32Array(5 * 2);
    for (let round = 24 - rounds; round < 24; round++) {
      for (let x = 0; x < 10; x++)
        B[x] = s[x] ^ s[x + 10] ^ s[x + 20] ^ s[x + 30] ^ s[x + 40];
      for (let x = 0; x < 10; x += 2) {
        const idx1 = (x + 8) % 10;
        const idx0 = (x + 2) % 10;
        const B0 = B[idx0];
        const B1 = B[idx0 + 1];
        const Th = rotlH(B0, B1, 1) ^ B[idx1];
        const Tl = rotlL(B0, B1, 1) ^ B[idx1 + 1];
        for (let y = 0; y < 50; y += 10) {
          s[x + y] ^= Th;
          s[x + y + 1] ^= Tl;
        }
      }
      let curH = s[2];
      let curL = s[3];
      for (let t = 0; t < 24; t++) {
        const shift = SHA3_ROTL[t];
        const Th = rotlH(curH, curL, shift);
        const Tl = rotlL(curH, curL, shift);
        const PI = SHA3_PI[t];
        curH = s[PI];
        curL = s[PI + 1];
        s[PI] = Th;
        s[PI + 1] = Tl;
      }
      for (let y = 0; y < 50; y += 10) {
        for (let x = 0; x < 10; x++)
          B[x] = s[y + x];
        for (let x = 0; x < 10; x++)
          s[y + x] ^= ~B[(x + 2) % 10] & B[(x + 4) % 10];
      }
      s[0] ^= SHA3_IOTA_H[round];
      s[1] ^= SHA3_IOTA_L[round];
    }
    B.fill(0);
  }
  class Keccak extends utils_js_1.Hash {
    // NOTE: we accept arguments in bytes instead of bits here.
    constructor(blockLen, suffix, outputLen, enableXOF = false, rounds = 24) {
      super();
      this.blockLen = blockLen;
      this.suffix = suffix;
      this.outputLen = outputLen;
      this.enableXOF = enableXOF;
      this.rounds = rounds;
      this.pos = 0;
      this.posOut = 0;
      this.finished = false;
      this.destroyed = false;
      (0, _assert_js_1.number)(outputLen);
      if (0 >= this.blockLen || this.blockLen >= 200)
        throw new Error("Sha3 supports only keccak-f1600 function");
      this.state = new Uint8Array(200);
      this.state32 = (0, utils_js_1.u32)(this.state);
    }
    keccak() {
      if (!utils_js_1.isLE)
        (0, utils_js_1.byteSwap32)(this.state32);
      keccakP(this.state32, this.rounds);
      if (!utils_js_1.isLE)
        (0, utils_js_1.byteSwap32)(this.state32);
      this.posOut = 0;
      this.pos = 0;
    }
    update(data) {
      (0, _assert_js_1.exists)(this);
      const { blockLen, state } = this;
      data = (0, utils_js_1.toBytes)(data);
      const len = data.length;
      for (let pos = 0; pos < len; ) {
        const take = Math.min(blockLen - this.pos, len - pos);
        for (let i2 = 0; i2 < take; i2++)
          state[this.pos++] ^= data[pos++];
        if (this.pos === blockLen)
          this.keccak();
      }
      return this;
    }
    finish() {
      if (this.finished)
        return;
      this.finished = true;
      const { state, suffix, pos, blockLen } = this;
      state[pos] ^= suffix;
      if ((suffix & 128) !== 0 && pos === blockLen - 1)
        this.keccak();
      state[blockLen - 1] ^= 128;
      this.keccak();
    }
    writeInto(out) {
      (0, _assert_js_1.exists)(this, false);
      (0, _assert_js_1.bytes)(out);
      this.finish();
      const bufferOut = this.state;
      const { blockLen } = this;
      for (let pos = 0, len = out.length; pos < len; ) {
        if (this.posOut >= blockLen)
          this.keccak();
        const take = Math.min(blockLen - this.posOut, len - pos);
        out.set(bufferOut.subarray(this.posOut, this.posOut + take), pos);
        this.posOut += take;
        pos += take;
      }
      return out;
    }
    xofInto(out) {
      if (!this.enableXOF)
        throw new Error("XOF is not possible for this instance");
      return this.writeInto(out);
    }
    xof(bytes2) {
      (0, _assert_js_1.number)(bytes2);
      return this.xofInto(new Uint8Array(bytes2));
    }
    digestInto(out) {
      (0, _assert_js_1.output)(out, this);
      if (this.finished)
        throw new Error("digest() was already called");
      this.writeInto(out);
      this.destroy();
      return out;
    }
    digest() {
      return this.digestInto(new Uint8Array(this.outputLen));
    }
    destroy() {
      this.destroyed = true;
      this.state.fill(0);
    }
    _cloneInto(to) {
      const { blockLen, suffix, outputLen, rounds, enableXOF } = this;
      to || (to = new Keccak(blockLen, suffix, outputLen, enableXOF, rounds));
      to.state32.set(this.state32);
      to.pos = this.pos;
      to.posOut = this.posOut;
      to.finished = this.finished;
      to.rounds = rounds;
      to.suffix = suffix;
      to.outputLen = outputLen;
      to.enableXOF = enableXOF;
      to.destroyed = this.destroyed;
      return to;
    }
  }
  sha3$1.Keccak = Keccak;
  const gen = (suffix, blockLen, outputLen) => (0, utils_js_1.wrapConstructor)(() => new Keccak(blockLen, suffix, outputLen));
  sha3$1.sha3_224 = gen(6, 144, 224 / 8);
  sha3$1.sha3_256 = gen(6, 136, 256 / 8);
  sha3$1.sha3_384 = gen(6, 104, 384 / 8);
  sha3$1.sha3_512 = gen(6, 72, 512 / 8);
  sha3$1.keccak_224 = gen(1, 144, 224 / 8);
  sha3$1.keccak_256 = gen(1, 136, 256 / 8);
  sha3$1.keccak_384 = gen(1, 104, 384 / 8);
  sha3$1.keccak_512 = gen(1, 72, 512 / 8);
  const genShake = (suffix, blockLen, outputLen) => (0, utils_js_1.wrapXOFConstructorWithOpts)((opts = {}) => new Keccak(blockLen, suffix, opts.dkLen === void 0 ? outputLen : opts.dkLen, true));
  sha3$1.shake128 = genShake(31, 168, 128 / 8);
  sha3$1.shake256 = genShake(31, 136, 256 / 8);
  const { sha3_512: sha3 } = sha3$1;
  const defaultLength = 24;
  const bigLength = 32;
  const createEntropy = (length2 = 4, random = Math.random) => {
    let entropy = "";
    while (entropy.length < length2) {
      entropy = entropy + Math.floor(random() * 36).toString(36);
    }
    return entropy;
  };
  function bufToBigInt(buf) {
    let bits = 8n;
    let value2 = 0n;
    for (const i2 of buf.values()) {
      const bi = BigInt(i2);
      value2 = (value2 << bits) + bi;
    }
    return value2;
  }
  const hash = (input = "") => {
    return bufToBigInt(sha3(input)).toString(36).slice(1);
  };
  const alphabet = Array.from(
    { length: 26 },
    (x, i2) => String.fromCharCode(i2 + 97)
  );
  const randomLetter = (random) => alphabet[Math.floor(random() * alphabet.length)];
  const createFingerprint = ({
    globalObj = typeof commonjsGlobal !== "undefined" ? commonjsGlobal : typeof window !== "undefined" ? window : {},
    random = Math.random
  } = {}) => {
    const globals = Object.keys(globalObj).toString();
    const sourceString = globals.length ? globals + createEntropy(bigLength, random) : createEntropy(bigLength, random);
    return hash(sourceString).substring(0, bigLength);
  };
  const createCounter = (count) => () => {
    return count++;
  };
  const initialCountMax = 476782367;
  const init$1 = ({
    // Fallback if the user does not pass in a CSPRNG. This should be OK
    // because we don't rely solely on the random number generator for entropy.
    // We also use the host fingerprint, current time, and a session counter.
    random = Math.random,
    counter = createCounter(Math.floor(random() * initialCountMax)),
    length: length2 = defaultLength,
    fingerprint = createFingerprint({ random })
  } = {}) => {
    return function cuid2() {
      const firstLetter = randomLetter(random);
      const time = Date.now().toString(36);
      const count = counter().toString(36);
      const salt = createEntropy(length2, random);
      const hashInput = `${time + salt + count + fingerprint}`;
      return `${firstLetter + hash(hashInput).substring(1, length2)}`;
    };
  };
  const createId$1 = init$1();
  const isCuid$1 = (id, { minLength = 2, maxLength = bigLength } = {}) => {
    const length2 = id.length;
    const regex = /^[0-9a-z]+$/;
    try {
      if (typeof id === "string" && length2 >= minLength && length2 <= maxLength && regex.test(id))
        return true;
    } finally {
    }
    return false;
  };
  src.getConstants = () => ({ defaultLength, bigLength });
  src.init = init$1;
  src.createId = createId$1;
  src.bufToBigInt = bufToBigInt;
  src.createCounter = createCounter;
  src.createFingerprint = createFingerprint;
  src.isCuid = isCuid$1;
  const { createId, init, getConstants, isCuid } = src;
  var createId_1 = createId;
  class graphQlClient {
    constructor(args = {}) {
      __publicField(this, "useSocket", false);
      __publicField(this, "socket");
      __publicField(this, "http_url");
      __publicField(this, "ws_url");
      __publicField(this, "log", (data) => {
        console.log(data);
      });
      __publicField(this, "emitter", new EventEmitter$1());
    }
    async connect(url2, useSocket = true) {
      this.emitter.setMaxListeners(0);
      console.log(url2);
      this.socket = lookup(url2, {
        // withCredentials: true,
        reconnectionDelay: 1e3,
        reconnect: true
      });
      console.log(this.socket.connected);
      this.socket.on("error", (error) => console.error(error));
      this.socket.on("connect", () => {
        console.log("Socket is connect");
        this.emitter.emit("connect", true);
      });
      this.socket.on("data", ({ id, data }) => {
        console.log(data);
        this.emitter.emit(id, data);
      });
      this.socket.on("disconnect", (reason) => {
        if (reason === "io server disconnect") {
          this.socket.connect();
        }
      });
    }
    async sendData(data) {
      if (this.socket.connected) {
        this.socket.emit("data", data);
      } else {
        this.emitter.once("connect", () => {
          this.socket.emit("data", data);
        });
      }
    }
    async query(query, variables, callback = (res) => {
    }) {
      let id = createId_1();
      this.sendData({ payload: JSON.stringify({ query, variables }), id, type: "query" });
      return new Promise((resolve) => {
        this.emitter.once(id, (res_data) => {
          callback(res_data);
          resolve(res_data);
        });
      });
    }
    async watch(query, variables, callback = (res) => {
    }) {
      let id = createId_1();
      this.sendData({ payload: JSON.stringify({ query, variables }), id, type: "start" });
      this.emitter.on(id, (res_data) => {
        callback(res_data);
        if (res_data.errors) {
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
    constructor() {
      __publicField(this, "graphqlClient", graphQlClient);
      __publicField(this, "ok", () => {
        console.log("Dudu is mounting!");
      });
      __publicField(this, "waitLibrary", (libraryName) => {
        return new Promise((resolve, reject) => {
          function _check() {
            if (typeof window[libraryName] != "undefined") {
              resolve(true);
            } else {
              setTimeout(_check, 100);
            }
          }
          _check();
        });
      });
      __publicField(this, "listen", (selector, type, func2) => {
        document.query(selector).addEventListener(type, (event) => {
          func2(event);
        });
      });
      __publicField(this, "listens", (selector, type, func2) => {
        Array.from(this.document.querySelectorAll(selector)).forEach((tar) => {
          tar.addEventListener(type, (event) => {
            func2(event);
          });
        });
      });
      __publicField(this, "batchListen", (...target_type_func_list) => {
        [...target_type_func_list].forEach(([selector, type, func2]) => {
          document.querySelector(selector).addEventListener(type, (event) => {
            func2(event);
          });
        });
      });
      __publicField(this, "query", (selector) => {
        var nodes = Array.from(document.querySelectorAll(selector));
        Array.from(document.querySelectorAll(".checkout > iframe")).map((iframe, _index) => {
          var from_iframe = Array.from(iframe.contentDocument.querySelectorAll(selector));
          nodes = nodes.concat(from_iframe);
        });
        return nodes;
      });
      __publicField(this, "headline", (nodelist, text2) => {
        nodelist.forEach((node) => {
          node.firstChild.textContent = text2;
        });
      });
      __publicField(this, "toDateTime", (timestamp) => {
        let time = new Date(timestamp);
        return `${time.getDate().toString().padStart(2, "0")}/${(time.getMonth() + 1).toString().padStart(2, "0")} ${time.getHours().toString().padStart(2, "0")}:${time.getMinutes().toString().padStart(2, "0")}`;
      });
      __publicField(this, "vnd", (number2) => {
        return new Intl.NumberFormat("vi-vn", {
          style: "currency",
          currency: "VND"
        }).format(Number(number2));
      });
      __publicField(this, "select", (nodelist, options, selected, onSelect) => {
        nodelist.forEach((node) => {
          node.removeEventListener("change", onSelect);
        });
        nodelist.forEach((node) => {
          var older_select = 0;
          if (node.hasChildNodes()) {
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
      });
      __publicField(this, "backgroundImage", (nodelist, url_img) => {
        nodelist.forEach((node) => {
          node.querySelector(".ladi-image > .ladi-image-background").style.backgroundImage = `url(${url_img})`;
          node.querySelector(".ladi-image > .ladi-image-background").classList.remove("ladi-lazyload");
        });
      });
      __publicField(this, "ladi", {
        show: (selector) => {
          window.ladi(selector.slice(1)).show();
        },
        hide: (selector) => {
          window.ladi(selector.slice(1)).hide();
        }
      });
      __publicField(this, "disk", {
        set: (key, val) => {
          window.localStorage.setItem(key, JSON.stringify(val));
        },
        get: (key) => {
          var res = window.localStorage.getItem(key);
          if (res == null) {
            return false;
          } else {
            try {
              return JSON.parse(res);
            } catch (err) {
              return false;
            }
          }
        }
      });
      __publicField(this, "cookie", {
        set: (key, val, days = 30) => {
          const d = /* @__PURE__ */ new Date();
          d.setTime(d.getTime() + days * 24 * 60 * 60 * 1e3);
          let expires = "expires=" + d.toUTCString();
          document.cookie = key + "=" + val + ";" + expires + ";path=/";
        },
        get: (key) => {
          let name = key + "=";
          let decodedCookie = decodeURIComponent(document.cookie);
          let ca = decodedCookie.split(";");
          for (let i2 = 0; i2 < ca.length; i2++) {
            let c = ca[i2];
            while (c.charAt(0) == " ") {
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
          let ca = decodedCookie.split(";");
          let dict_cookies = Object.fromEntries(ca.map((coo) => {
            while (coo.charAt(0) == " ") {
              coo = coo.substring(1);
            }
            let equal_index = coo.indexOf("=");
            return [coo.slice(0, equal_index), coo.slice(equal_index + 1)];
          }));
          return dict_cookies;
        }
      });
      __publicField(this, "param", {
        get: (key) => {
          let match = RegExp("[?&]" + key + "=([^&]*)").exec(window.location.search);
          return match && decodeURIComponent(match[1].replace(/\+/g, " "));
        },
        set: (query, keep = false) => {
          let new_query = new URLSearchParams(keep && window.location.search);
          for (let [key, val] of Object.entries(query)) {
            new_query.set(key, val);
          }
          window.location.search = new_query.toString();
        }
      });
      __publicField(this, "copy", async (text2) => {
        try {
          await navigator.clipboard.writeText(text2);
        } catch (err) {
          alert(err);
        }
      });
    }
  }
  var DuDu = new Build_DuDu();
  function create_fragment$2(ctx) {
    let svg;
    let path0;
    let path1;
    return {
      c() {
        svg = svg_element("svg");
        path0 = svg_element("path");
        path1 = svg_element("path");
        attr(path0, "d", "M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z");
        attr(path0, "fill", "currentColor");
        attr(path1, "d", "M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z");
        attr(path1, "fill", "currentFill");
        attr(svg, "class", "animate-spin w-8 h-8 text-gray-200 dark:text-gray-600 fill-blue-600");
        attr(svg, "viewBox", "0 0 100 101");
        attr(svg, "fill", "none");
        attr(svg, "xmlns", "http://www.w3.org/2000/svg");
      },
      m(target, anchor) {
        insert(target, svg, anchor);
        append(svg, path0);
        append(svg, path1);
      },
      p: noop,
      i: noop,
      o: noop,
      d(detaching) {
        if (detaching)
          detach(svg);
      }
    };
  }
  class SpinnerSVG extends SvelteComponent {
    constructor(options) {
      super();
      init$2(this, options, null, create_fragment$2, safe_not_equal, {});
    }
  }
  function add_css$1(target) {
    append_styles(target, "svelte-1j24i22", ".fly-in.svelte-1j24i22{animation:svelte-1j24i22-fly-out 500ms ease-in-out 1}.fly-out.svelte-1j24i22{animation:svelte-1j24i22-fly-out 1s ease-in-out 1;animation-direction:reverse;animation-fill-mode:forwards}@keyframes svelte-1j24i22-fly-out{from{transform:translateY(100%);opacity:0;visibility:hidden}to{transform:translateY(0);opacity:1;visibility:visible}}");
  }
  function create_if_block$1(ctx) {
    let button;
    let mounted;
    let dispose;
    return {
      c() {
        button = element("button");
        button.innerHTML = `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>`;
        attr(button, "type", "button");
        attr(button, "class", "absolute top-0 right-0 -translate-x-1/2 translate-y-1/2 text-gray-700 bg-transparent bg-slate-200 hover:bg-red-600 hover:text-white rounded-lg text-base p-0.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white border");
      },
      m(target, anchor) {
        insert(target, button, anchor);
        if (!mounted) {
          dispose = listen(
            button,
            "click",
            /*click_handler*/
            ctx[7]
          );
          mounted = true;
        }
      },
      p: noop,
      d(detaching) {
        if (detaching)
          detach(button);
        mounted = false;
        dispose();
      }
    };
  }
  function create_fragment$1(ctx) {
    let div1;
    let div0;
    let t;
    let div0_class_value;
    let div1_class_value;
    let current;
    const default_slot_template = (
      /*#slots*/
      ctx[6].default
    );
    const default_slot = create_slot(
      default_slot_template,
      ctx,
      /*$$scope*/
      ctx[5],
      null
    );
    let if_block = (
      /*isCloseButton*/
      ctx[1] && create_if_block$1(ctx)
    );
    return {
      c() {
        div1 = element("div");
        div0 = element("div");
        if (default_slot)
          default_slot.c();
        t = space();
        if (if_block)
          if_block.c();
        attr(div0, "tabindex", "-1");
        attr(div0, "class", div0_class_value = "rounded-lg shadow relative bg-white " + /*classList*/
        ctx[2] + " svelte-1j24i22");
        attr(div1, "aria-hidden", "true");
        attr(div1, "class", div1_class_value = "w-screen h-screen overflow-y-auto backdrop-blur backdrop-brightness-75 fixed top-0 right-0 left-0 z-[9999999999999] flex flex-wrap items-center justify-center " + /*classAdd*/
        ctx[4] + " svelte-1j24i22");
      },
      m(target, anchor) {
        insert(target, div1, anchor);
        append(div1, div0);
        if (default_slot) {
          default_slot.m(div0, null);
        }
        append(div0, t);
        if (if_block)
          if_block.m(div0, null);
        ctx[8](div1);
        current = true;
      },
      p(ctx2, [dirty]) {
        if (default_slot) {
          if (default_slot.p && (!current || dirty & /*$$scope*/
          32)) {
            update_slot_base(
              default_slot,
              default_slot_template,
              ctx2,
              /*$$scope*/
              ctx2[5],
              !current ? get_all_dirty_from_scope(
                /*$$scope*/
                ctx2[5]
              ) : get_slot_changes(
                default_slot_template,
                /*$$scope*/
                ctx2[5],
                dirty,
                null
              ),
              null
            );
          }
        }
        if (
          /*isCloseButton*/
          ctx2[1]
        ) {
          if (if_block) {
            if_block.p(ctx2, dirty);
          } else {
            if_block = create_if_block$1(ctx2);
            if_block.c();
            if_block.m(div0, null);
          }
        } else if (if_block) {
          if_block.d(1);
          if_block = null;
        }
        if (!current || dirty & /*classList*/
        4 && div0_class_value !== (div0_class_value = "rounded-lg shadow relative bg-white " + /*classList*/
        ctx2[2] + " svelte-1j24i22")) {
          attr(div0, "class", div0_class_value);
        }
        if (!current || dirty & /*classAdd*/
        16 && div1_class_value !== (div1_class_value = "w-screen h-screen overflow-y-auto backdrop-blur backdrop-brightness-75 fixed top-0 right-0 left-0 z-[9999999999999] flex flex-wrap items-center justify-center " + /*classAdd*/
        ctx2[4] + " svelte-1j24i22")) {
          attr(div1, "class", div1_class_value);
        }
      },
      i(local) {
        if (current)
          return;
        transition_in(default_slot, local);
        current = true;
      },
      o(local) {
        transition_out(default_slot, local);
        current = false;
      },
      d(detaching) {
        if (detaching)
          detach(div1);
        if (default_slot)
          default_slot.d(detaching);
        if (if_block)
          if_block.d();
        ctx[8](null);
      }
    };
  }
  function instance$1($$self, $$props, $$invalidate) {
    let { $$slots: slots = {}, $$scope } = $$props;
    let { isDisplay = false } = $$props;
    let { isCloseButton = true } = $$props;
    let { classList = "" } = $$props;
    let that;
    let classAdd = "hidden";
    function flyIn() {
      that.classList.remove("fly-out");
      setTimeout(
        () => {
          $$invalidate(4, classAdd = "fly-in");
        },
        1
      );
    }
    function flyOut() {
      if (classAdd == "fly-in") {
        that.classList.remove("fly-in");
        setTimeout(() => $$invalidate(4, classAdd = "fly-out"), 1);
      }
    }
    const click_handler = () => {
      $$invalidate(0, isDisplay = false);
    };
    function div1_binding($$value) {
      binding_callbacks[$$value ? "unshift" : "push"](() => {
        that = $$value;
        $$invalidate(3, that);
      });
    }
    $$self.$$set = ($$props2) => {
      if ("isDisplay" in $$props2)
        $$invalidate(0, isDisplay = $$props2.isDisplay);
      if ("isCloseButton" in $$props2)
        $$invalidate(1, isCloseButton = $$props2.isCloseButton);
      if ("classList" in $$props2)
        $$invalidate(2, classList = $$props2.classList);
      if ("$$scope" in $$props2)
        $$invalidate(5, $$scope = $$props2.$$scope);
    };
    $$self.$$.update = () => {
      if ($$self.$$.dirty & /*that, isDisplay*/
      9) {
        {
          if (that) {
            if (isDisplay) {
              flyIn();
            } else {
              flyOut();
            }
          }
        }
      }
    };
    return [
      isDisplay,
      isCloseButton,
      classList,
      that,
      classAdd,
      $$scope,
      slots,
      click_handler,
      div1_binding
    ];
  }
  class Modal extends SvelteComponent {
    constructor(options) {
      super();
      init$2(
        this,
        options,
        instance$1,
        create_fragment$1,
        safe_not_equal,
        {
          isDisplay: 0,
          isCloseButton: 1,
          classList: 2
        },
        add_css$1
      );
    }
  }
  function add_css(target) {
    append_styles(target, "svelte-1j7tjak", ".product-name.svelte-1j7tjak{overflow:hidden;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;white-space:pre-wrap}");
  }
  function get_each_context(ctx, list, i2) {
    const child_ctx = ctx.slice();
    child_ctx[20] = list[i2][0];
    child_ctx[21] = list[i2][1];
    child_ctx[22] = list[i2][2];
    child_ctx[23] = list[i2][3];
    child_ctx[24] = list[i2][4];
    child_ctx[25] = list[i2][5];
    return child_ctx;
  }
  function get_each_context_1(ctx, list, i2) {
    const child_ctx = ctx.slice();
    child_ctx[28] = list[i2][0];
    child_ctx[29] = list[i2][1];
    child_ctx[31] = i2;
    return child_ctx;
  }
  function get_if_ctx(ctx) {
    const child_ctx = ctx.slice();
    const constants_0 = (
      /*State*/
      child_ctx[0].variantSelected
    );
    child_ctx[32] = constants_0;
    return child_ctx;
  }
  function get_each_context_2(ctx, list, i2) {
    const child_ctx = ctx.slice();
    child_ctx[28] = list[i2][0];
    child_ctx[33] = list[i2][1];
    return child_ctx;
  }
  function get_each_context_3(ctx, list, i2) {
    const child_ctx = ctx.slice();
    child_ctx[28] = list[i2][0];
    child_ctx[29] = list[i2][1];
    child_ctx[31] = i2;
    return child_ctx;
  }
  function get_each_context_4(ctx, list, i2) {
    const child_ctx = ctx.slice();
    child_ctx[37] = list[i2];
    child_ctx[39] = i2;
    return child_ctx;
  }
  function get_if_ctx_1(ctx) {
    const child_ctx = ctx.slice();
    const constants_0 = (
      /*State*/
      child_ctx[0].variantSelected
    );
    child_ctx[32] = constants_0;
    return child_ctx;
  }
  function create_if_block(ctx) {
    let t0;
    let div4;
    let div3;
    let div2;
    let div0;
    let t1;
    let div1;
    let previous_key = (
      /*State*/
      ctx[0].itemSelected
    );
    let t2;
    let class_1;
    let t3;
    let t4;
    let t5;
    let div4_class_value;
    let t6;
    let modal;
    let updating_isDisplay;
    let t7;
    let div6;
    let div5;
    let t8;
    let div7;
    let current;
    let mounted;
    let dispose;
    let if_block0 = (
      /*State*/
      ctx[0].isDisplayAddToCart && create_if_block_14()
    );
    function select_block_type(ctx2, dirty) {
      if (
        /*State*/
        ctx2[0].variantSelected
      )
        return create_if_block_13;
      return create_else_block_2;
    }
    let current_block_type = select_block_type(ctx);
    let if_block1 = current_block_type(ctx);
    let key_block = create_key_block_3(ctx);
    function select_block_type_1(ctx2, dirty) {
      if (
        /*State*/
        ctx2[0].variantSelected
      )
        return create_if_block_11;
      if (
        /*State*/
        ctx2[0].variants.length > 0 && /*State*/
        ctx2[0].product
      )
        return create_if_block_12;
    }
    function select_block_ctx(ctx2, type) {
      if (type === create_if_block_11)
        return get_if_ctx_1(ctx2);
      return ctx2;
    }
    let current_block_type_1 = select_block_type_1(ctx);
    let if_block2 = current_block_type_1 && current_block_type_1(select_block_ctx(ctx, current_block_type_1));
    let if_block3 = (
      /*State*/
      ctx[0].variants.length > 0 && create_if_block_9(ctx)
    );
    let if_block4 = (
      /*State*/
      ctx[0].variantSelected && create_if_block_5(ctx)
    );
    let if_block5 = (
      /*State*/
      ctx[0].isDisplay && create_if_block_4(ctx)
    );
    function modal_isDisplay_binding(value2) {
      ctx[13](value2);
    }
    let modal_props = {
      $$slots: { default: [create_default_slot] },
      $$scope: { ctx }
    };
    if (
      /*State*/
      ctx[0].isDisplayThankyouPopup !== void 0
    ) {
      modal_props.isDisplay = /*State*/
      ctx[0].isDisplayThankyouPopup;
    }
    modal = new Modal({ props: modal_props });
    binding_callbacks.push(() => bind(modal, "isDisplay", modal_isDisplay_binding));
    let each_value = (
      /*list_products*/
      ctx[4]
    );
    let each_blocks = [];
    for (let i2 = 0; i2 < each_value.length; i2 += 1) {
      each_blocks[i2] = create_each_block(get_each_context(ctx, each_value, i2));
    }
    return {
      c() {
        if (if_block0)
          if_block0.c();
        t0 = space();
        div4 = element("div");
        div3 = element("div");
        div2 = element("div");
        div0 = element("div");
        if_block1.c();
        t1 = space();
        div1 = element("div");
        key_block.c();
        t2 = space();
        class_1 = element("class");
        if (if_block2)
          if_block2.c();
        t3 = space();
        if (if_block3)
          if_block3.c();
        t4 = space();
        if (if_block4)
          if_block4.c();
        t5 = space();
        if (if_block5)
          if_block5.c();
        t6 = space();
        create_component(modal.$$.fragment);
        t7 = space();
        div6 = element("div");
        div5 = element("div");
        for (let i2 = 0; i2 < each_blocks.length; i2 += 1) {
          each_blocks[i2].c();
        }
        t8 = space();
        div7 = element("div");
        div7.textContent = "Xem thêm";
        attr(div0, "class", "uppercase bg-[#B40001] text-white px-2 py-1 rounded-lg font-bold");
        attr(class_1, "class", "max-w-[412px] p-1");
        attr(div1, "class", "w-full flex flex-wrap justify-center");
        attr(div2, "class", "bg-white p-2 rounded-lg space-y-2 relative flex flex-col items-center");
        set_style(div2, "font-size", "15px");
        attr(div3, "tabindex", "-1");
        attr(div3, "class", "rounded-lg shadow relative bg-white");
        attr(div4, "aria-hidden", "true");
        attr(div4, "class", div4_class_value = "overflow-y-auto " + /*State*/
        (ctx[0].isDisplay ? " w-screen h-screen backdrop-blur backdrop-brightness-75 pt-8 pb-[412px] z-[9999999999999] fixed top-0 right-0 left-0" : "") + " flex flex-wrap items-center justify-center");
        attr(div5, "class", "max-w-[412px] md:max-w-[896px] flex flex-row overflow-y-scroll space-x-1");
        attr(div6, "class", "w-full flex justify-center");
        attr(div7, "class", "w-full text-center text-lg underline cursor-pointer");
      },
      m(target, anchor) {
        if (if_block0)
          if_block0.m(target, anchor);
        insert(target, t0, anchor);
        insert(target, div4, anchor);
        append(div4, div3);
        append(div3, div2);
        append(div2, div0);
        if_block1.m(div0, null);
        append(div2, t1);
        append(div2, div1);
        key_block.m(div1, null);
        append(div1, t2);
        append(div1, class_1);
        if (if_block2)
          if_block2.m(class_1, null);
        append(class_1, t3);
        if (if_block3)
          if_block3.m(class_1, null);
        append(class_1, t4);
        if (if_block4)
          if_block4.m(class_1, null);
        append(div3, t5);
        if (if_block5)
          if_block5.m(div3, null);
        insert(target, t6, anchor);
        mount_component(modal, target, anchor);
        insert(target, t7, anchor);
        insert(target, div6, anchor);
        append(div6, div5);
        for (let i2 = 0; i2 < each_blocks.length; i2 += 1) {
          if (each_blocks[i2]) {
            each_blocks[i2].m(div5, null);
          }
        }
        insert(target, t8, anchor);
        insert(target, div7, anchor);
        current = true;
        if (!mounted) {
          dispose = listen(
            div7,
            "click",
            /*click_handler_4*/
            ctx[15]
          );
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (
          /*State*/
          ctx2[0].isDisplayAddToCart
        ) {
          if (if_block0)
            ;
          else {
            if_block0 = create_if_block_14();
            if_block0.c();
            if_block0.m(t0.parentNode, t0);
          }
        } else if (if_block0) {
          if_block0.d(1);
          if_block0 = null;
        }
        if (current_block_type !== (current_block_type = select_block_type(ctx2))) {
          if_block1.d(1);
          if_block1 = current_block_type(ctx2);
          if (if_block1) {
            if_block1.c();
            if_block1.m(div0, null);
          }
        }
        if (dirty[0] & /*State*/
        1 && safe_not_equal(previous_key, previous_key = /*State*/
        ctx2[0].itemSelected)) {
          key_block.d(1);
          key_block = create_key_block_3(ctx2);
          key_block.c();
          key_block.m(div1, t2);
        } else {
          key_block.p(ctx2, dirty);
        }
        if (current_block_type_1 === (current_block_type_1 = select_block_type_1(ctx2)) && if_block2) {
          if_block2.p(select_block_ctx(ctx2, current_block_type_1), dirty);
        } else {
          if (if_block2)
            if_block2.d(1);
          if_block2 = current_block_type_1 && current_block_type_1(select_block_ctx(ctx2, current_block_type_1));
          if (if_block2) {
            if_block2.c();
            if_block2.m(class_1, t3);
          }
        }
        if (
          /*State*/
          ctx2[0].variants.length > 0
        ) {
          if (if_block3) {
            if_block3.p(ctx2, dirty);
          } else {
            if_block3 = create_if_block_9(ctx2);
            if_block3.c();
            if_block3.m(class_1, t4);
          }
        } else if (if_block3) {
          if_block3.d(1);
          if_block3 = null;
        }
        if (
          /*State*/
          ctx2[0].variantSelected
        ) {
          if (if_block4) {
            if_block4.p(ctx2, dirty);
            if (dirty[0] & /*State*/
            1) {
              transition_in(if_block4, 1);
            }
          } else {
            if_block4 = create_if_block_5(ctx2);
            if_block4.c();
            transition_in(if_block4, 1);
            if_block4.m(class_1, null);
          }
        } else if (if_block4) {
          group_outros();
          transition_out(if_block4, 1, 1, () => {
            if_block4 = null;
          });
          check_outros();
        }
        if (
          /*State*/
          ctx2[0].isDisplay
        ) {
          if (if_block5) {
            if_block5.p(ctx2, dirty);
          } else {
            if_block5 = create_if_block_4(ctx2);
            if_block5.c();
            if_block5.m(div3, null);
          }
        } else if (if_block5) {
          if_block5.d(1);
          if_block5 = null;
        }
        if (!current || dirty[0] & /*State*/
        1 && div4_class_value !== (div4_class_value = "overflow-y-auto " + /*State*/
        (ctx2[0].isDisplay ? " w-screen h-screen backdrop-blur backdrop-brightness-75 pt-8 pb-[412px] z-[9999999999999] fixed top-0 right-0 left-0" : "") + " flex flex-wrap items-center justify-center")) {
          attr(div4, "class", div4_class_value);
        }
        const modal_changes = {};
        if (dirty[0] & /*State*/
        1 | dirty[1] & /*$$scope*/
        512) {
          modal_changes.$$scope = { dirty, ctx: ctx2 };
        }
        if (!updating_isDisplay && dirty[0] & /*State*/
        1) {
          updating_isDisplay = true;
          modal_changes.isDisplay = /*State*/
          ctx2[0].isDisplayThankyouPopup;
          add_flush_callback(() => updating_isDisplay = false);
        }
        modal.$set(modal_changes);
        if (dirty[0] & /*list_products*/
        16) {
          each_value = /*list_products*/
          ctx2[4];
          let i2;
          for (i2 = 0; i2 < each_value.length; i2 += 1) {
            const child_ctx = get_each_context(ctx2, each_value, i2);
            if (each_blocks[i2]) {
              each_blocks[i2].p(child_ctx, dirty);
            } else {
              each_blocks[i2] = create_each_block(child_ctx);
              each_blocks[i2].c();
              each_blocks[i2].m(div5, null);
            }
          }
          for (; i2 < each_blocks.length; i2 += 1) {
            each_blocks[i2].d(1);
          }
          each_blocks.length = each_value.length;
        }
      },
      i(local) {
        if (current)
          return;
        transition_in(if_block4);
        transition_in(modal.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(if_block4);
        transition_out(modal.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        if (if_block0)
          if_block0.d(detaching);
        if (detaching)
          detach(t0);
        if (detaching)
          detach(div4);
        if_block1.d();
        key_block.d(detaching);
        if (if_block2) {
          if_block2.d();
        }
        if (if_block3)
          if_block3.d();
        if (if_block4)
          if_block4.d();
        if (if_block5)
          if_block5.d();
        if (detaching)
          detach(t6);
        destroy_component(modal, detaching);
        if (detaching)
          detach(t7);
        if (detaching)
          detach(div6);
        destroy_each(each_blocks, detaching);
        if (detaching)
          detach(t8);
        if (detaching)
          detach(div7);
        mounted = false;
        dispose();
      }
    };
  }
  function create_if_block_14(ctx) {
    let div1;
    return {
      c() {
        div1 = element("div");
        div1.innerHTML = `<div class="flex w-full md:w-[412px] rounded-t-xl "><button class="text-white w-full py-2 add-to-cart font-bold text-2xl bg-[#B40001]">ĐẶT HÀNG NGAY</button></div>`;
        attr(div1, "class", "w-full flex justify-center fixed bottom-0 left-0 right-0");
        set_style(div1, "padding-bottom", "env(safe-area-inset-bottom)");
        set_style(div1, "font-size", "16px");
        set_style(div1, "z-index", "999");
      },
      m(target, anchor) {
        insert(target, div1, anchor);
      },
      d(detaching) {
        if (detaching)
          detach(div1);
      }
    };
  }
  function create_else_block_2(ctx) {
    let t;
    return {
      c() {
        t = text("Thêm sản phẩm vào giỏ hàng");
      },
      m(target, anchor) {
        insert(target, t, anchor);
      },
      d(detaching) {
        if (detaching)
          detach(t);
      }
    };
  }
  function create_if_block_13(ctx) {
    let t;
    return {
      c() {
        t = text("Thông tin thanh toán");
      },
      m(target, anchor) {
        insert(target, t, anchor);
      },
      d(detaching) {
        if (detaching)
          detach(t);
      }
    };
  }
  function create_key_block_3(ctx) {
    let div;
    let img;
    let img_src_value;
    return {
      c() {
        div = element("div");
        img = element("img");
        attr(img, "class", "w-full col-span-1 row-span-3 aspect-square rounded outline-3 outline-double outline-gray-300");
        attr(img, "alt", "Ảnh bìa sản phẩm");
        if (!src_url_equal(img.src, img_src_value = /*State*/
        ctx[0].variantSelected ? (
          /*State*/
          ctx[0].variantSelected.thumbnail
        ) : (
          /*State*/
          ctx[0].product ? (
            /*State*/
            ctx[0].product.thumbnail
          ) : ""
        )))
          attr(img, "src", img_src_value);
        attr(div, "class", "max-w-[412px] hidden md:block p-1");
      },
      m(target, anchor) {
        insert(target, div, anchor);
        append(div, img);
      },
      p(ctx2, dirty) {
        if (dirty[0] & /*State*/
        1 && !src_url_equal(img.src, img_src_value = /*State*/
        ctx2[0].variantSelected ? (
          /*State*/
          ctx2[0].variantSelected.thumbnail
        ) : (
          /*State*/
          ctx2[0].product ? (
            /*State*/
            ctx2[0].product.thumbnail
          ) : ""
        ))) {
          attr(img, "src", img_src_value);
        }
      },
      d(detaching) {
        if (detaching)
          detach(div);
      }
    };
  }
  function create_if_block_12(ctx) {
    let div2;
    let div0;
    let img;
    let img_src_value;
    let t0;
    let div1;
    let p0;
    let t1_value = (
      /*State*/
      ctx[0].product.name + ""
    );
    let t1;
    let t2;
    let span0;
    let p1;
    let t3_value = `${DuDu.vnd(Math.min(.../*State*/
    ctx[0].variants.map(func)))}${DuDu.vnd(Math.min(.../*State*/
    ctx[0].variants.map(func_1))) !== DuDu.vnd(Math.max(.../*State*/
    ctx[0].variants.map(func_2))) ? ` - ${DuDu.vnd(Math.max(.../*State*/
    ctx[0].variants.map(func_3)))}` : ""}`;
    let t3;
    let t4;
    let span1;
    let p2;
    let t5_value = `${DuDu.vnd(Math.min(.../*State*/
    ctx[0].variants.map(func_4)))}${DuDu.vnd(Math.min(.../*State*/
    ctx[0].variants.map(func_5))) !== DuDu.vnd(Math.max(.../*State*/
    ctx[0].variants.map(func_6))) ? ` - ${DuDu.vnd(Math.max(.../*State*/
    ctx[0].variants.map(func_7)))}` : ""}`;
    let t5;
    return {
      c() {
        div2 = element("div");
        div0 = element("div");
        img = element("img");
        t0 = space();
        div1 = element("div");
        p0 = element("p");
        t1 = text(t1_value);
        t2 = space();
        span0 = element("span");
        p1 = element("p");
        t3 = text(t3_value);
        t4 = space();
        span1 = element("span");
        p2 = element("p");
        t5 = text(t5_value);
        attr(img, "class", "w-full col-span-1 row-span-3 aspect-square rounded outline-3 outline-double outline-gray-300");
        attr(img, "alt", "Ảnh bìa sản phẩm");
        if (!src_url_equal(img.src, img_src_value = /*State*/
        ctx[0].product.thumbnail))
          attr(img, "src", img_src_value);
        attr(div0, "class", "w-1/2 aspect-square block md:hidden p-1");
        attr(p0, "class", "text-lg product-name svelte-1j7tjak");
        attr(p1, "class", "text-slate-500 line-through inline");
        attr(span0, "class", "inline-block");
        attr(p2, "class", "text-xl font-bold text-red-600 inline");
        attr(span1, "class", "inline-block");
        attr(div1, "class", "flex flex-col px-2");
        attr(div2, "class", "flex flex-row");
      },
      m(target, anchor) {
        insert(target, div2, anchor);
        append(div2, div0);
        append(div0, img);
        append(div2, t0);
        append(div2, div1);
        append(div1, p0);
        append(p0, t1);
        append(div1, t2);
        append(div1, span0);
        append(span0, p1);
        append(p1, t3);
        append(div1, t4);
        append(div1, span1);
        append(span1, p2);
        append(p2, t5);
      },
      p(ctx2, dirty) {
        if (dirty[0] & /*State*/
        1 && !src_url_equal(img.src, img_src_value = /*State*/
        ctx2[0].product.thumbnail)) {
          attr(img, "src", img_src_value);
        }
        if (dirty[0] & /*State*/
        1 && t1_value !== (t1_value = /*State*/
        ctx2[0].product.name + ""))
          set_data(t1, t1_value);
        if (dirty[0] & /*State*/
        1 && t3_value !== (t3_value = `${DuDu.vnd(Math.min(.../*State*/
        ctx2[0].variants.map(func)))}${DuDu.vnd(Math.min(.../*State*/
        ctx2[0].variants.map(func_1))) !== DuDu.vnd(Math.max(.../*State*/
        ctx2[0].variants.map(func_2))) ? ` - ${DuDu.vnd(Math.max(.../*State*/
        ctx2[0].variants.map(func_3)))}` : ""}`))
          set_data(t3, t3_value);
        if (dirty[0] & /*State*/
        1 && t5_value !== (t5_value = `${DuDu.vnd(Math.min(.../*State*/
        ctx2[0].variants.map(func_4)))}${DuDu.vnd(Math.min(.../*State*/
        ctx2[0].variants.map(func_5))) !== DuDu.vnd(Math.max(.../*State*/
        ctx2[0].variants.map(func_6))) ? ` - ${DuDu.vnd(Math.max(.../*State*/
        ctx2[0].variants.map(func_7)))}` : ""}`))
          set_data(t5, t5_value);
      },
      d(detaching) {
        if (detaching)
          detach(div2);
      }
    };
  }
  function create_if_block_11(ctx) {
    let previous_key = (
      /*State*/
      ctx[0].itemSelected
    );
    let key_block_anchor;
    let key_block = create_key_block_2(ctx);
    return {
      c() {
        key_block.c();
        key_block_anchor = empty$1();
      },
      m(target, anchor) {
        key_block.m(target, anchor);
        insert(target, key_block_anchor, anchor);
      },
      p(ctx2, dirty) {
        if (dirty[0] & /*State*/
        1 && safe_not_equal(previous_key, previous_key = /*State*/
        ctx2[0].itemSelected)) {
          key_block.d(1);
          key_block = create_key_block_2(ctx2);
          key_block.c();
          key_block.m(key_block_anchor.parentNode, key_block_anchor);
        } else {
          key_block.p(ctx2, dirty);
        }
      },
      d(detaching) {
        if (detaching)
          detach(key_block_anchor);
        key_block.d(detaching);
      }
    };
  }
  function create_key_block_2(ctx) {
    let div2;
    let div0;
    let img;
    let img_src_value;
    let t0;
    let div1;
    let p0;
    let t1_value = (
      /*variant*/
      ctx[32].product_name + ""
    );
    let t1;
    let t2;
    let p1;
    let t3;
    let t4_value = (
      /*variant*/
      (ctx[32].variant_name || "Mặc định") + ""
    );
    let t4;
    let t5;
    let t6;
    let span;
    let p2;
    let t7_value = DuDu.vnd(
      /*variant*/
      ctx[32].list_price
    ) + "";
    let t7;
    let t8;
    let p3;
    let t9_value = DuDu.vnd(
      /*variant*/
      ctx[32].price
    ) + "";
    let t9;
    return {
      c() {
        div2 = element("div");
        div0 = element("div");
        img = element("img");
        t0 = space();
        div1 = element("div");
        p0 = element("p");
        t1 = text(t1_value);
        t2 = space();
        p1 = element("p");
        t3 = text("(");
        t4 = text(t4_value);
        t5 = text(")");
        t6 = space();
        span = element("span");
        p2 = element("p");
        t7 = text(t7_value);
        t8 = space();
        p3 = element("p");
        t9 = text(t9_value);
        attr(img, "class", "w-full col-span-1 row-span-3 aspect-square rounded outline-3 outline-double outline-gray-300");
        attr(img, "alt", "Ảnh bìa sản phẩm");
        if (!src_url_equal(img.src, img_src_value = /*variant*/
        ctx[32].thumbnail))
          attr(img, "src", img_src_value);
        attr(div0, "class", "w-1/2 aspect-square block md:hidden p-1");
        attr(p0, "class", "text-xl product-name svelte-1j7tjak");
        attr(p1, "class", "text-slate-500 text-lg");
        attr(p2, "class", "text-slate-500 line-through inline");
        attr(p3, "class", "text-xl font-bold text-[#B40001] inline");
        attr(span, "class", "inline-block");
        attr(div1, "class", "flex flex-col px-2");
        attr(div2, "class", "flex flex-row");
      },
      m(target, anchor) {
        insert(target, div2, anchor);
        append(div2, div0);
        append(div0, img);
        append(div2, t0);
        append(div2, div1);
        append(div1, p0);
        append(p0, t1);
        append(div1, t2);
        append(div1, p1);
        append(p1, t3);
        append(p1, t4);
        append(p1, t5);
        append(div1, t6);
        append(div1, span);
        append(span, p2);
        append(p2, t7);
        append(span, t8);
        append(span, p3);
        append(p3, t9);
      },
      p(ctx2, dirty) {
        if (dirty[0] & /*State*/
        1 && !src_url_equal(img.src, img_src_value = /*variant*/
        ctx2[32].thumbnail)) {
          attr(img, "src", img_src_value);
        }
        if (dirty[0] & /*State*/
        1 && t1_value !== (t1_value = /*variant*/
        ctx2[32].product_name + ""))
          set_data(t1, t1_value);
        if (dirty[0] & /*State*/
        1 && t4_value !== (t4_value = /*variant*/
        (ctx2[32].variant_name || "Mặc định") + ""))
          set_data(t4, t4_value);
        if (dirty[0] & /*State*/
        1 && t7_value !== (t7_value = DuDu.vnd(
          /*variant*/
          ctx2[32].list_price
        ) + ""))
          set_data(t7, t7_value);
        if (dirty[0] & /*State*/
        1 && t9_value !== (t9_value = DuDu.vnd(
          /*variant*/
          ctx2[32].price
        ) + ""))
          set_data(t9, t9_value);
      },
      d(detaching) {
        if (detaching)
          detach(div2);
      }
    };
  }
  function create_if_block_9(ctx) {
    let div;
    let t;
    let if_block_anchor;
    let each_value_4 = (
      /*State*/
      ctx[0].variants
    );
    let each_blocks = [];
    for (let i2 = 0; i2 < each_value_4.length; i2 += 1) {
      each_blocks[i2] = create_each_block_4(get_each_context_4(ctx, each_value_4, i2));
    }
    let if_block = !/*State*/
    ctx[0].variantSelected && create_if_block_10();
    return {
      c() {
        div = element("div");
        for (let i2 = 0; i2 < each_blocks.length; i2 += 1) {
          each_blocks[i2].c();
        }
        t = space();
        if (if_block)
          if_block.c();
        if_block_anchor = empty$1();
        attr(div, "class", "flex flex-wrap items-center overflow-auto shadow rounded-lg border !border-orange-400 !border-double");
      },
      m(target, anchor) {
        insert(target, div, anchor);
        for (let i2 = 0; i2 < each_blocks.length; i2 += 1) {
          if (each_blocks[i2]) {
            each_blocks[i2].m(div, null);
          }
        }
        insert(target, t, anchor);
        if (if_block)
          if_block.m(target, anchor);
        insert(target, if_block_anchor, anchor);
      },
      p(ctx2, dirty) {
        if (dirty[0] & /*State, CheckoutState*/
        3) {
          each_value_4 = /*State*/
          ctx2[0].variants;
          let i2;
          for (i2 = 0; i2 < each_value_4.length; i2 += 1) {
            const child_ctx = get_each_context_4(ctx2, each_value_4, i2);
            if (each_blocks[i2]) {
              each_blocks[i2].p(child_ctx, dirty);
            } else {
              each_blocks[i2] = create_each_block_4(child_ctx);
              each_blocks[i2].c();
              each_blocks[i2].m(div, null);
            }
          }
          for (; i2 < each_blocks.length; i2 += 1) {
            each_blocks[i2].d(1);
          }
          each_blocks.length = each_value_4.length;
        }
        if (!/*State*/
        ctx2[0].variantSelected) {
          if (if_block)
            ;
          else {
            if_block = create_if_block_10();
            if_block.c();
            if_block.m(if_block_anchor.parentNode, if_block_anchor);
          }
        } else if (if_block) {
          if_block.d(1);
          if_block = null;
        }
      },
      d(detaching) {
        if (detaching)
          detach(div);
        destroy_each(each_blocks, detaching);
        if (detaching)
          detach(t);
        if (if_block)
          if_block.d(detaching);
        if (detaching)
          detach(if_block_anchor);
      }
    };
  }
  function create_each_block_4(ctx) {
    let button;
    let t0_value = (
      /*opt*/
      ctx[37].name + ""
    );
    let t0;
    let t1;
    let button_class_value;
    let mounted;
    let dispose;
    function click_handler() {
      return (
        /*click_handler*/
        ctx[5](
          /*_opt_i*/
          ctx[39]
        )
      );
    }
    return {
      c() {
        button = element("button");
        t0 = text(t0_value);
        t1 = space();
        attr(button, "class", button_class_value = "h-fit w-fit p-1 py-0.5 m-1 rounded-lg shadow cursor-pointer border border-solid border-slate-300 " + /*_opt_i*/
        (ctx[39] == /*State*/
        ctx[0].itemSelected ? "bg-blue-600 text-white text-lg" : "bg-slate-100 text-slate-500 opacity-90 text-base"));
      },
      m(target, anchor) {
        insert(target, button, anchor);
        append(button, t0);
        append(button, t1);
        if (!mounted) {
          dispose = listen(button, "click", click_handler);
          mounted = true;
        }
      },
      p(new_ctx, dirty) {
        ctx = new_ctx;
        if (dirty[0] & /*State*/
        1 && t0_value !== (t0_value = /*opt*/
        ctx[37].name + ""))
          set_data(t0, t0_value);
        if (dirty[0] & /*State*/
        1 && button_class_value !== (button_class_value = "h-fit w-fit p-1 py-0.5 m-1 rounded-lg shadow cursor-pointer border border-solid border-slate-300 " + /*_opt_i*/
        (ctx[39] == /*State*/
        ctx[0].itemSelected ? "bg-blue-600 text-white text-lg" : "bg-slate-100 text-slate-500 opacity-90 text-base"))) {
          attr(button, "class", button_class_value);
        }
      },
      d(detaching) {
        if (detaching)
          detach(button);
        mounted = false;
        dispose();
      }
    };
  }
  function create_if_block_10(ctx) {
    let br;
    let t0;
    let span;
    return {
      c() {
        br = element("br");
        t0 = space();
        span = element("span");
        span.textContent = "**/ Vui lòng chọn phân loại sản phẩm cụ thể /**";
        attr(span, "class", "text-slate-400");
      },
      m(target, anchor) {
        insert(target, br, anchor);
        insert(target, t0, anchor);
        insert(target, span, anchor);
      },
      d(detaching) {
        if (detaching)
          detach(br);
        if (detaching)
          detach(t0);
        if (detaching)
          detach(span);
      }
    };
  }
  function create_if_block_5(ctx) {
    let div0;
    let previous_key = (
      /*State*/
      ctx[0].itemSelected
    );
    let t0;
    let form;
    let floatinglabelsimple0;
    let updating_value;
    let t1;
    let t2;
    let floatinglabelsimple1;
    let updating_value_1;
    let t3;
    let div1;
    let floatinglabelsimple2;
    let updating_value_2;
    let t4;
    let div2;
    let floatinglabelsimple3;
    let updating_value_3;
    let t5;
    let t6;
    let previous_key_1 = (
      /*State*/
      ctx[0].order.payment_method
    );
    let key_block1_anchor;
    let current;
    let key_block0 = create_key_block_1(ctx);
    function floatinglabelsimple0_value_binding(value2) {
      ctx[6](value2);
    }
    let floatinglabelsimple0_props = { name: "name", placeholder: "Họ và tên" };
    if (
      /*State*/
      ctx[0].order.name !== void 0
    ) {
      floatinglabelsimple0_props.value = /*State*/
      ctx[0].order.name;
    }
    floatinglabelsimple0 = new FloatingLabelSimple({ props: floatinglabelsimple0_props });
    binding_callbacks.push(() => bind(floatinglabelsimple0, "value", floatinglabelsimple0_value_binding));
    let if_block0 = !/*State*/
    ctx[0].phoneValid && create_if_block_8();
    function floatinglabelsimple1_value_binding(value2) {
      ctx[7](value2);
    }
    let floatinglabelsimple1_props = {
      name: "phone",
      type: "tel",
      placeholder: "Số điện thoại"
    };
    if (
      /*State*/
      ctx[0].order.phone !== void 0
    ) {
      floatinglabelsimple1_props.value = /*State*/
      ctx[0].order.phone;
    }
    floatinglabelsimple1 = new FloatingLabelSimple({ props: floatinglabelsimple1_props });
    binding_callbacks.push(() => bind(floatinglabelsimple1, "value", floatinglabelsimple1_value_binding));
    floatinglabelsimple1.$on(
      "blur",
      /*blur_handler*/
      ctx[8]
    );
    function floatinglabelsimple2_value_binding(value2) {
      ctx[9](value2);
    }
    let floatinglabelsimple2_props = {
      name: "address",
      placeholder: "Địa chỉ chi tiết"
    };
    if (
      /*State*/
      ctx[0].order.address !== void 0
    ) {
      floatinglabelsimple2_props.value = /*State*/
      ctx[0].order.address;
    }
    floatinglabelsimple2 = new FloatingLabelSimple({ props: floatinglabelsimple2_props });
    binding_callbacks.push(() => bind(floatinglabelsimple2, "value", floatinglabelsimple2_value_binding));
    function floatinglabelsimple3_value_binding(value2) {
      ctx[10](value2);
    }
    let floatinglabelsimple3_props = {
      type: "radio",
      name: "payment-method",
      placeholder: "Phương thức thanh toán",
      options: ["Thanh toán khi nhận hàng (COD)", "Chuyển khoản ngân hàng (Bank Transfer)"]
    };
    if (
      /*State*/
      ctx[0].order.payment_method !== void 0
    ) {
      floatinglabelsimple3_props.value = /*State*/
      ctx[0].order.payment_method;
    }
    floatinglabelsimple3 = new FloatingLabelSimple({ props: floatinglabelsimple3_props });
    binding_callbacks.push(() => bind(floatinglabelsimple3, "value", floatinglabelsimple3_value_binding));
    let if_block1 = (
      /*State*/
      ctx[0].order.payment_method == "Chuyển khoản ngân hàng (Bank Transfer)" && create_if_block_7(ctx)
    );
    let key_block1 = create_key_block(ctx);
    return {
      c() {
        div0 = element("div");
        key_block0.c();
        t0 = space();
        form = element("form");
        create_component(floatinglabelsimple0.$$.fragment);
        t1 = space();
        if (if_block0)
          if_block0.c();
        t2 = space();
        create_component(floatinglabelsimple1.$$.fragment);
        t3 = space();
        div1 = element("div");
        create_component(floatinglabelsimple2.$$.fragment);
        t4 = space();
        div2 = element("div");
        create_component(floatinglabelsimple3.$$.fragment);
        t5 = space();
        if (if_block1)
          if_block1.c();
        t6 = space();
        key_block1.c();
        key_block1_anchor = empty$1();
        attr(div0, "class", "mb-2 mt-1 px-2 py-1 border !border-orange-400 rounded-lg space-y-1 !border-double");
        attr(div1, "class", "w-full");
        attr(div2, "class", "w-full");
        attr(form, "class", "form-payment space-y-2");
        attr(form, "autocomplete", "on");
      },
      m(target, anchor) {
        insert(target, div0, anchor);
        key_block0.m(div0, null);
        insert(target, t0, anchor);
        insert(target, form, anchor);
        mount_component(floatinglabelsimple0, form, null);
        append(form, t1);
        if (if_block0)
          if_block0.m(form, null);
        append(form, t2);
        mount_component(floatinglabelsimple1, form, null);
        append(form, t3);
        append(form, div1);
        mount_component(floatinglabelsimple2, div1, null);
        append(form, t4);
        append(form, div2);
        mount_component(floatinglabelsimple3, div2, null);
        append(form, t5);
        if (if_block1)
          if_block1.m(form, null);
        insert(target, t6, anchor);
        key_block1.m(target, anchor);
        insert(target, key_block1_anchor, anchor);
        current = true;
      },
      p(ctx2, dirty) {
        if (dirty[0] & /*State*/
        1 && safe_not_equal(previous_key, previous_key = /*State*/
        ctx2[0].itemSelected)) {
          key_block0.d(1);
          key_block0 = create_key_block_1(ctx2);
          key_block0.c();
          key_block0.m(div0, null);
        } else {
          key_block0.p(ctx2, dirty);
        }
        const floatinglabelsimple0_changes = {};
        if (!updating_value && dirty[0] & /*State*/
        1) {
          updating_value = true;
          floatinglabelsimple0_changes.value = /*State*/
          ctx2[0].order.name;
          add_flush_callback(() => updating_value = false);
        }
        floatinglabelsimple0.$set(floatinglabelsimple0_changes);
        if (!/*State*/
        ctx2[0].phoneValid) {
          if (if_block0)
            ;
          else {
            if_block0 = create_if_block_8();
            if_block0.c();
            if_block0.m(form, t2);
          }
        } else if (if_block0) {
          if_block0.d(1);
          if_block0 = null;
        }
        const floatinglabelsimple1_changes = {};
        if (!updating_value_1 && dirty[0] & /*State*/
        1) {
          updating_value_1 = true;
          floatinglabelsimple1_changes.value = /*State*/
          ctx2[0].order.phone;
          add_flush_callback(() => updating_value_1 = false);
        }
        floatinglabelsimple1.$set(floatinglabelsimple1_changes);
        const floatinglabelsimple2_changes = {};
        if (!updating_value_2 && dirty[0] & /*State*/
        1) {
          updating_value_2 = true;
          floatinglabelsimple2_changes.value = /*State*/
          ctx2[0].order.address;
          add_flush_callback(() => updating_value_2 = false);
        }
        floatinglabelsimple2.$set(floatinglabelsimple2_changes);
        const floatinglabelsimple3_changes = {};
        if (!updating_value_3 && dirty[0] & /*State*/
        1) {
          updating_value_3 = true;
          floatinglabelsimple3_changes.value = /*State*/
          ctx2[0].order.payment_method;
          add_flush_callback(() => updating_value_3 = false);
        }
        floatinglabelsimple3.$set(floatinglabelsimple3_changes);
        if (
          /*State*/
          ctx2[0].order.payment_method == "Chuyển khoản ngân hàng (Bank Transfer)"
        ) {
          if (if_block1) {
            if_block1.p(ctx2, dirty);
          } else {
            if_block1 = create_if_block_7(ctx2);
            if_block1.c();
            if_block1.m(form, null);
          }
        } else if (if_block1) {
          if_block1.d(1);
          if_block1 = null;
        }
        if (dirty[0] & /*State*/
        1 && safe_not_equal(previous_key_1, previous_key_1 = /*State*/
        ctx2[0].order.payment_method)) {
          group_outros();
          transition_out(key_block1, 1, 1, noop);
          check_outros();
          key_block1 = create_key_block(ctx2);
          key_block1.c();
          transition_in(key_block1, 1);
          key_block1.m(key_block1_anchor.parentNode, key_block1_anchor);
        } else {
          key_block1.p(ctx2, dirty);
        }
      },
      i(local) {
        if (current)
          return;
        transition_in(floatinglabelsimple0.$$.fragment, local);
        transition_in(floatinglabelsimple1.$$.fragment, local);
        transition_in(floatinglabelsimple2.$$.fragment, local);
        transition_in(floatinglabelsimple3.$$.fragment, local);
        transition_in(key_block1);
        current = true;
      },
      o(local) {
        transition_out(floatinglabelsimple0.$$.fragment, local);
        transition_out(floatinglabelsimple1.$$.fragment, local);
        transition_out(floatinglabelsimple2.$$.fragment, local);
        transition_out(floatinglabelsimple3.$$.fragment, local);
        transition_out(key_block1);
        current = false;
      },
      d(detaching) {
        if (detaching)
          detach(div0);
        key_block0.d(detaching);
        if (detaching)
          detach(t0);
        if (detaching)
          detach(form);
        destroy_component(floatinglabelsimple0);
        if (if_block0)
          if_block0.d();
        destroy_component(floatinglabelsimple1);
        destroy_component(floatinglabelsimple2);
        destroy_component(floatinglabelsimple3);
        if (if_block1)
          if_block1.d();
        if (detaching)
          detach(t6);
        if (detaching)
          detach(key_block1_anchor);
        key_block1.d(detaching);
      }
    };
  }
  function create_each_block_3(ctx) {
    let div;
    let span0;
    let t0_value = (
      /*title*/
      ctx[29] + ""
    );
    let t0;
    let t1;
    let span1;
    let t2_value = DuDu.vnd(
      /*State*/
      ctx[0].cart[
        /*key*/
        ctx[28]
      ] || 0
    ) + "";
    let t2;
    let t3;
    return {
      c() {
        div = element("div");
        span0 = element("span");
        t0 = text(t0_value);
        t1 = space();
        span1 = element("span");
        t2 = text(t2_value);
        t3 = space();
        attr(
          span1,
          "class",
          /*_rowIndex*/
          ctx[31] === 0 ? "line-through" : ""
        );
        attr(div, "class", "flex justify-between border-b last:border-none border-double border-gray-300");
      },
      m(target, anchor) {
        insert(target, div, anchor);
        append(div, span0);
        append(span0, t0);
        append(div, t1);
        append(div, span1);
        append(span1, t2);
        append(div, t3);
      },
      p(ctx2, dirty) {
        if (dirty[0] & /*State*/
        1 && t2_value !== (t2_value = DuDu.vnd(
          /*State*/
          ctx2[0].cart[
            /*key*/
            ctx2[28]
          ] || 0
        ) + ""))
          set_data(t2, t2_value);
      },
      d(detaching) {
        if (detaching)
          detach(div);
      }
    };
  }
  function create_key_block_1(ctx) {
    let each_1_anchor;
    let each_value_3 = (
      /*checkout_title*/
      ctx[3]
    );
    let each_blocks = [];
    for (let i2 = 0; i2 < each_value_3.length; i2 += 1) {
      each_blocks[i2] = create_each_block_3(get_each_context_3(ctx, each_value_3, i2));
    }
    return {
      c() {
        for (let i2 = 0; i2 < each_blocks.length; i2 += 1) {
          each_blocks[i2].c();
        }
        each_1_anchor = empty$1();
      },
      m(target, anchor) {
        for (let i2 = 0; i2 < each_blocks.length; i2 += 1) {
          if (each_blocks[i2]) {
            each_blocks[i2].m(target, anchor);
          }
        }
        insert(target, each_1_anchor, anchor);
      },
      p(ctx2, dirty) {
        if (dirty[0] & /*State, checkout_title*/
        9) {
          each_value_3 = /*checkout_title*/
          ctx2[3];
          let i2;
          for (i2 = 0; i2 < each_value_3.length; i2 += 1) {
            const child_ctx = get_each_context_3(ctx2, each_value_3, i2);
            if (each_blocks[i2]) {
              each_blocks[i2].p(child_ctx, dirty);
            } else {
              each_blocks[i2] = create_each_block_3(child_ctx);
              each_blocks[i2].c();
              each_blocks[i2].m(each_1_anchor.parentNode, each_1_anchor);
            }
          }
          for (; i2 < each_blocks.length; i2 += 1) {
            each_blocks[i2].d(1);
          }
          each_blocks.length = each_value_3.length;
        }
      },
      d(detaching) {
        destroy_each(each_blocks, detaching);
        if (detaching)
          detach(each_1_anchor);
      }
    };
  }
  function create_if_block_8(ctx) {
    let div;
    return {
      c() {
        div = element("div");
        div.innerHTML = `<span class="text-red-600 text-lg">Số điện thoại không đúng định dạng. Vui lòng kiểm tra lại!</span>`;
        attr(div, "class", "flex w-full justify-end");
      },
      m(target, anchor) {
        insert(target, div, anchor);
      },
      d(detaching) {
        if (detaching)
          detach(div);
      }
    };
  }
  function create_if_block_7(ctx) {
    let div;
    let each_value_2 = [
      ["Ngân hàng", "VPBank"],
      ["Số tài khoản", "22726366"],
      ["Chủ tài khoản", "LE DUC HIEP"],
      [
        "Nội dung",
        `DH ${/*State*/
        ctx[0].order.phone || " + (Số điện thoại đặt hàng)"}`
      ]
    ];
    let each_blocks = [];
    for (let i2 = 0; i2 < 4; i2 += 1) {
      each_blocks[i2] = create_each_block_2(get_each_context_2(ctx, each_value_2, i2));
    }
    return {
      c() {
        div = element("div");
        for (let i2 = 0; i2 < 4; i2 += 1) {
          each_blocks[i2].c();
        }
        attr(div, "class", "flex flex-col p-2 pt-0.5 text-black w-full");
      },
      m(target, anchor) {
        insert(target, div, anchor);
        for (let i2 = 0; i2 < 4; i2 += 1) {
          if (each_blocks[i2]) {
            each_blocks[i2].m(div, null);
          }
        }
      },
      p(ctx2, dirty) {
        if (dirty[0] & /*State*/
        1) {
          each_value_2 = [
            ["Ngân hàng", "VPBank"],
            ["Số tài khoản", "22726366"],
            ["Chủ tài khoản", "LE DUC HIEP"],
            [
              "Nội dung",
              `DH ${/*State*/
              ctx2[0].order.phone || " + (Số điện thoại đặt hàng)"}`
            ]
          ];
          let i2;
          for (i2 = 0; i2 < 4; i2 += 1) {
            const child_ctx = get_each_context_2(ctx2, each_value_2, i2);
            if (each_blocks[i2]) {
              each_blocks[i2].p(child_ctx, dirty);
            } else {
              each_blocks[i2] = create_each_block_2(child_ctx);
              each_blocks[i2].c();
              each_blocks[i2].m(div, null);
            }
          }
          for (; i2 < 4; i2 += 1) {
            each_blocks[i2].d(1);
          }
        }
      },
      d(detaching) {
        if (detaching)
          detach(div);
        destroy_each(each_blocks, detaching);
      }
    };
  }
  function create_each_block_2(ctx) {
    let div2;
    let div0;
    let t0_value = (
      /*key*/
      ctx[28] + ""
    );
    let t0;
    let t1;
    let t2;
    let div1;
    let t3_value = (
      /*val*/
      ctx[33] + ""
    );
    let t3;
    let t4;
    return {
      c() {
        div2 = element("div");
        div0 = element("div");
        t0 = text(t0_value);
        t1 = text(":");
        t2 = space();
        div1 = element("div");
        t3 = text(t3_value);
        t4 = space();
        attr(div2, "class", "flex justify-between w-full");
      },
      m(target, anchor) {
        insert(target, div2, anchor);
        append(div2, div0);
        append(div0, t0);
        append(div0, t1);
        append(div2, t2);
        append(div2, div1);
        append(div1, t3);
        append(div2, t4);
      },
      p(ctx2, dirty) {
        if (dirty[0] & /*State*/
        1 && t0_value !== (t0_value = /*key*/
        ctx2[28] + ""))
          set_data(t0, t0_value);
        if (dirty[0] & /*State*/
        1 && t3_value !== (t3_value = /*val*/
        ctx2[33] + ""))
          set_data(t3, t3_value);
      },
      d(detaching) {
        if (detaching)
          detach(div2);
      }
    };
  }
  function create_else_block_1(ctx) {
    let button;
    let mounted;
    let dispose;
    return {
      c() {
        button = element("button");
        button.textContent = "Đặt hàng ngay";
        attr(button, "class", "w-fit uppercase text-center bg-[#B40001] text-white m-2 px-6 py-2 font-semibold rounded-lg border-0");
      },
      m(target, anchor) {
        insert(target, button, anchor);
        if (!mounted) {
          dispose = listen(
            button,
            "click",
            /*click_handler_1*/
            ctx[11]
          );
          mounted = true;
        }
      },
      p: noop,
      i: noop,
      o: noop,
      d(detaching) {
        if (detaching)
          detach(button);
        mounted = false;
        dispose();
      }
    };
  }
  function create_if_block_6(ctx) {
    let spinnersvg;
    let current;
    spinnersvg = new SpinnerSVG({});
    return {
      c() {
        create_component(spinnersvg.$$.fragment);
      },
      m(target, anchor) {
        mount_component(spinnersvg, target, anchor);
        current = true;
      },
      p: noop,
      i(local) {
        if (current)
          return;
        transition_in(spinnersvg.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(spinnersvg.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        destroy_component(spinnersvg, detaching);
      }
    };
  }
  function create_key_block(ctx) {
    let div;
    let current_block_type_index;
    let if_block;
    let current;
    const if_block_creators = [create_if_block_6, create_else_block_1];
    const if_blocks = [];
    function select_block_type_2(ctx2, dirty) {
      if (
        /*State*/
        ctx2[0].sendingForm
      )
        return 0;
      return 1;
    }
    current_block_type_index = select_block_type_2(ctx);
    if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    return {
      c() {
        div = element("div");
        if_block.c();
        attr(div, "class", "w-full flex justify-center");
      },
      m(target, anchor) {
        insert(target, div, anchor);
        if_blocks[current_block_type_index].m(div, null);
        current = true;
      },
      p(ctx2, dirty) {
        let previous_block_index = current_block_type_index;
        current_block_type_index = select_block_type_2(ctx2);
        if (current_block_type_index === previous_block_index) {
          if_blocks[current_block_type_index].p(ctx2, dirty);
        } else {
          group_outros();
          transition_out(if_blocks[previous_block_index], 1, 1, () => {
            if_blocks[previous_block_index] = null;
          });
          check_outros();
          if_block = if_blocks[current_block_type_index];
          if (!if_block) {
            if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
            if_block.c();
          } else {
            if_block.p(ctx2, dirty);
          }
          transition_in(if_block, 1);
          if_block.m(div, null);
        }
      },
      i(local) {
        if (current)
          return;
        transition_in(if_block);
        current = true;
      },
      o(local) {
        transition_out(if_block);
        current = false;
      },
      d(detaching) {
        if (detaching)
          detach(div);
        if_blocks[current_block_type_index].d();
      }
    };
  }
  function create_if_block_4(ctx) {
    let button;
    let mounted;
    let dispose;
    return {
      c() {
        button = element("button");
        button.innerHTML = `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>`;
        attr(button, "type", "button");
        attr(button, "class", "absolute top-0 right-0 -translate-x-1/2 translate-y-1/2 text-gray-700 bg-transparent bg-slate-200 hover:bg-red-600 hover:text-white rounded-lg text-base p-0.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white border");
      },
      m(target, anchor) {
        insert(target, button, anchor);
        if (!mounted) {
          dispose = listen(
            button,
            "click",
            /*click_handler_2*/
            ctx[12]
          );
          mounted = true;
        }
      },
      p: noop,
      d(detaching) {
        if (detaching)
          detach(button);
        mounted = false;
        dispose();
      }
    };
  }
  function create_if_block_3(ctx) {
    let div4;
    let div2;
    let div0;
    let img;
    let img_src_value;
    let t0;
    let div1;
    let p0;
    let t1_value = (
      /*variant*/
      ctx[32].product_name + ""
    );
    let t1;
    let t2;
    let p1;
    let t3;
    let t4_value = (
      /*variant*/
      (ctx[32].variant_name || "Mặc định") + ""
    );
    let t4;
    let t5;
    let t6;
    let span;
    let p2;
    let t7_value = DuDu.vnd(
      /*variant*/
      ctx[32].list_price
    ) + "";
    let t7;
    let t8;
    let p3;
    let t9_value = DuDu.vnd(
      /*variant*/
      ctx[32].price
    ) + "";
    let t9;
    let t10;
    let div3;
    let p4;
    let t11;
    let t12_value = (
      /*State*/
      ctx[0].items[0].quantity + ""
    );
    let t12;
    return {
      c() {
        div4 = element("div");
        div2 = element("div");
        div0 = element("div");
        img = element("img");
        t0 = space();
        div1 = element("div");
        p0 = element("p");
        t1 = text(t1_value);
        t2 = space();
        p1 = element("p");
        t3 = text("(");
        t4 = text(t4_value);
        t5 = text(")");
        t6 = space();
        span = element("span");
        p2 = element("p");
        t7 = text(t7_value);
        t8 = space();
        p3 = element("p");
        t9 = text(t9_value);
        t10 = space();
        div3 = element("div");
        p4 = element("p");
        t11 = text("x");
        t12 = text(t12_value);
        attr(img, "class", "w-full col-span-1 row-span-3 aspect-square rounded outline-3 outline-double outline-gray-300");
        attr(img, "alt", "Ảnh bìa sản phẩm");
        if (!src_url_equal(img.src, img_src_value = /*variant*/
        ctx[32].thumbnail))
          attr(img, "src", img_src_value);
        attr(div0, "class", "h-24 aspect-square block p-1");
        attr(p0, "class", "text-xl product-name svelte-1j7tjak");
        attr(p1, "class", "text-slate-500 text-lg");
        attr(p2, "class", "text-slate-500 line-through inline");
        attr(p3, "class", "text-xl font-bold text-red-600 inline");
        attr(span, "class", "inline-block");
        attr(div1, "class", "flex flex-col px-2");
        attr(div2, "class", "flex flex-row");
        attr(p4, "class", "text-xl");
        attr(div3, "class", "flex flex-col items-center");
        attr(div4, "class", "flex justify-between items-center");
      },
      m(target, anchor) {
        insert(target, div4, anchor);
        append(div4, div2);
        append(div2, div0);
        append(div0, img);
        append(div2, t0);
        append(div2, div1);
        append(div1, p0);
        append(p0, t1);
        append(div1, t2);
        append(div1, p1);
        append(p1, t3);
        append(p1, t4);
        append(p1, t5);
        append(div1, t6);
        append(div1, span);
        append(span, p2);
        append(p2, t7);
        append(span, t8);
        append(span, p3);
        append(p3, t9);
        append(div4, t10);
        append(div4, div3);
        append(div3, p4);
        append(p4, t11);
        append(p4, t12);
      },
      p(ctx2, dirty) {
        if (dirty[0] & /*State*/
        1 && !src_url_equal(img.src, img_src_value = /*variant*/
        ctx2[32].thumbnail)) {
          attr(img, "src", img_src_value);
        }
        if (dirty[0] & /*State*/
        1 && t1_value !== (t1_value = /*variant*/
        ctx2[32].product_name + ""))
          set_data(t1, t1_value);
        if (dirty[0] & /*State*/
        1 && t4_value !== (t4_value = /*variant*/
        (ctx2[32].variant_name || "Mặc định") + ""))
          set_data(t4, t4_value);
        if (dirty[0] & /*State*/
        1 && t7_value !== (t7_value = DuDu.vnd(
          /*variant*/
          ctx2[32].list_price
        ) + ""))
          set_data(t7, t7_value);
        if (dirty[0] & /*State*/
        1 && t9_value !== (t9_value = DuDu.vnd(
          /*variant*/
          ctx2[32].price
        ) + ""))
          set_data(t9, t9_value);
        if (dirty[0] & /*State*/
        1 && t12_value !== (t12_value = /*State*/
        ctx2[0].items[0].quantity + ""))
          set_data(t12, t12_value);
      },
      d(detaching) {
        if (detaching)
          detach(div4);
      }
    };
  }
  function create_if_block_2(ctx) {
    let t0;
    let div;
    let span0;
    let t2;
    let span1;
    let t3_value = (
      /*State*/
      ctx[0].order.payment_method + ""
    );
    let t3;
    let each_value_1 = (
      /*checkout_title*/
      ctx[3]
    );
    let each_blocks = [];
    for (let i2 = 0; i2 < each_value_1.length; i2 += 1) {
      each_blocks[i2] = create_each_block_1(get_each_context_1(ctx, each_value_1, i2));
    }
    return {
      c() {
        for (let i2 = 0; i2 < each_blocks.length; i2 += 1) {
          each_blocks[i2].c();
        }
        t0 = space();
        div = element("div");
        span0 = element("span");
        span0.textContent = "Phương thức thanh toán:";
        t2 = space();
        span1 = element("span");
        t3 = text(t3_value);
        attr(span1, "class", "");
        attr(div, "class", "flex justify-between border-b last:border-none border-double border-gray-300");
      },
      m(target, anchor) {
        for (let i2 = 0; i2 < each_blocks.length; i2 += 1) {
          if (each_blocks[i2]) {
            each_blocks[i2].m(target, anchor);
          }
        }
        insert(target, t0, anchor);
        insert(target, div, anchor);
        append(div, span0);
        append(div, t2);
        append(div, span1);
        append(span1, t3);
      },
      p(ctx2, dirty) {
        if (dirty[0] & /*State, checkout_title*/
        9) {
          each_value_1 = /*checkout_title*/
          ctx2[3];
          let i2;
          for (i2 = 0; i2 < each_value_1.length; i2 += 1) {
            const child_ctx = get_each_context_1(ctx2, each_value_1, i2);
            if (each_blocks[i2]) {
              each_blocks[i2].p(child_ctx, dirty);
            } else {
              each_blocks[i2] = create_each_block_1(child_ctx);
              each_blocks[i2].c();
              each_blocks[i2].m(t0.parentNode, t0);
            }
          }
          for (; i2 < each_blocks.length; i2 += 1) {
            each_blocks[i2].d(1);
          }
          each_blocks.length = each_value_1.length;
        }
        if (dirty[0] & /*State*/
        1 && t3_value !== (t3_value = /*State*/
        ctx2[0].order.payment_method + ""))
          set_data(t3, t3_value);
      },
      d(detaching) {
        destroy_each(each_blocks, detaching);
        if (detaching)
          detach(t0);
        if (detaching)
          detach(div);
      }
    };
  }
  function create_each_block_1(ctx) {
    let div;
    let span0;
    let t0_value = (
      /*title*/
      ctx[29] + ""
    );
    let t0;
    let t1;
    let span1;
    let t2_value = DuDu.vnd(
      /*State*/
      ctx[0].cart[
        /*key*/
        ctx[28]
      ] || 0
    ) + "";
    let t2;
    return {
      c() {
        div = element("div");
        span0 = element("span");
        t0 = text(t0_value);
        t1 = space();
        span1 = element("span");
        t2 = text(t2_value);
        attr(
          span1,
          "class",
          /*_rowIndex*/
          ctx[31] === 0 ? "line-through" : ""
        );
        attr(div, "class", "flex justify-between border-b last:border-none border-double border-gray-300");
      },
      m(target, anchor) {
        insert(target, div, anchor);
        append(div, span0);
        append(span0, t0);
        append(div, t1);
        append(div, span1);
        append(span1, t2);
      },
      p(ctx2, dirty) {
        if (dirty[0] & /*State*/
        1 && t2_value !== (t2_value = DuDu.vnd(
          /*State*/
          ctx2[0].cart[
            /*key*/
            ctx2[28]
          ] || 0
        ) + ""))
          set_data(t2, t2_value);
      },
      d(detaching) {
        if (detaching)
          detach(div);
      }
    };
  }
  function create_else_block(ctx) {
    let p;
    return {
      c() {
        p = element("p");
        p.textContent = "Chúng tôi sẽ giao hàng ngay khi xác nhận thanh toán thành công.";
      },
      m(target, anchor) {
        insert(target, p, anchor);
      },
      d(detaching) {
        if (detaching)
          detach(p);
      }
    };
  }
  function create_if_block_1(ctx) {
    let p;
    return {
      c() {
        p = element("p");
        p.textContent = "Chúng tôi sẽ liên hệ giao hàng sớm nhất đến cho quý khách.";
      },
      m(target, anchor) {
        insert(target, p, anchor);
      },
      d(detaching) {
        if (detaching)
          detach(p);
      }
    };
  }
  function create_default_slot(ctx) {
    let div4;
    let img;
    let img_src_value;
    let t0;
    let p0;
    let t2;
    let div1;
    let div0;
    let t6;
    let t7;
    let div2;
    let t8;
    let div3;
    let p1;
    let t10;
    let p2;
    let t12;
    let t13;
    let p3;
    let if_block0 = (
      /*State*/
      ctx[0].variantSelected && create_if_block_3(get_if_ctx(ctx))
    );
    let if_block1 = (
      /*State*/
      ctx[0].cart && create_if_block_2(ctx)
    );
    function select_block_type_3(ctx2, dirty) {
      if (
        /*State*/
        ctx2[0].order.payment_method == "Thanh toán khi nhận hàng (COD)"
      )
        return create_if_block_1;
      return create_else_block;
    }
    let current_block_type = select_block_type_3(ctx);
    let if_block2 = current_block_type(ctx);
    return {
      c() {
        div4 = element("div");
        img = element("img");
        t0 = space();
        p0 = element("p");
        p0.textContent = "Thông tin đặt hàng";
        t2 = space();
        div1 = element("div");
        div0 = element("div");
        div0.innerHTML = `<span>Sản phẩm</span> 
          <span>Số lượng</span>`;
        t6 = space();
        if (if_block0)
          if_block0.c();
        t7 = space();
        div2 = element("div");
        if (if_block1)
          if_block1.c();
        t8 = space();
        div3 = element("div");
        p1 = element("p");
        p1.textContent = "Cảm ơn quý khách đã đặt hàng.";
        t10 = space();
        p2 = element("p");
        p2.textContent = "Đơn hàng của quý khách đang được chuẩn bị.";
        t12 = space();
        if_block2.c();
        t13 = space();
        p3 = element("p");
        p3.textContent = "*/ Trong trường hợp thông tin người nhận không chính xác. Công ty sẽ liên hệ để xác nhận lại! /*";
        attr(img, "class", "w-48 aspect-square");
        attr(img, "alt", "Ảnh người cảm ơn");
        if (!src_url_equal(img.src, img_src_value = "https://w.ladicdn.com/source/illustration/thanks-02.svg"))
          attr(img, "src", img_src_value);
        attr(p0, "class", "text-3xl uppercase font-bold text-yellow-500 drop-shadow");
        attr(div0, "class", "text-xl flex justify-between border-b last:border-none border-double border-gray-300");
        attr(div1, "class", "bg-white w-full mb-2 mt-1 px-2 py-1 border !border-orange-400 rounded-lg space-y-1 !border-double");
        attr(div2, "class", "bg-white w-full mb-2 mt-1 px-2 py-1 border !border-orange-400 rounded-lg space-y-1 !border-double text-xl");
        attr(div3, "class", "text-xl p-4 flex flex-col items-center text-white text-center");
        attr(div4, "class", "w-full max-w-[412px] md:max-w-[960px] bg-[#024D82] rounded-lg flex flex-col items-center px-4 ");
      },
      m(target, anchor) {
        insert(target, div4, anchor);
        append(div4, img);
        append(div4, t0);
        append(div4, p0);
        append(div4, t2);
        append(div4, div1);
        append(div1, div0);
        append(div1, t6);
        if (if_block0)
          if_block0.m(div1, null);
        append(div4, t7);
        append(div4, div2);
        if (if_block1)
          if_block1.m(div2, null);
        append(div4, t8);
        append(div4, div3);
        append(div3, p1);
        append(div3, t10);
        append(div3, p2);
        append(div3, t12);
        if_block2.m(div3, null);
        append(div3, t13);
        append(div3, p3);
      },
      p(ctx2, dirty) {
        if (
          /*State*/
          ctx2[0].variantSelected
        ) {
          if (if_block0) {
            if_block0.p(get_if_ctx(ctx2), dirty);
          } else {
            if_block0 = create_if_block_3(get_if_ctx(ctx2));
            if_block0.c();
            if_block0.m(div1, null);
          }
        } else if (if_block0) {
          if_block0.d(1);
          if_block0 = null;
        }
        if (
          /*State*/
          ctx2[0].cart
        ) {
          if (if_block1) {
            if_block1.p(ctx2, dirty);
          } else {
            if_block1 = create_if_block_2(ctx2);
            if_block1.c();
            if_block1.m(div2, null);
          }
        } else if (if_block1) {
          if_block1.d(1);
          if_block1 = null;
        }
        if (current_block_type !== (current_block_type = select_block_type_3(ctx2))) {
          if_block2.d(1);
          if_block2 = current_block_type(ctx2);
          if (if_block2) {
            if_block2.c();
            if_block2.m(div3, t13);
          }
        }
      },
      d(detaching) {
        if (detaching)
          detach(div4);
        if (if_block0)
          if_block0.d();
        if (if_block1)
          if_block1.d();
        if_block2.d();
      }
    };
  }
  function create_each_block(ctx) {
    let div4;
    let div0;
    let img;
    let img_src_value;
    let t0;
    let div3;
    let p0;
    let t1_value = (
      /*name*/
      ctx[20] + ""
    );
    let t1;
    let t2;
    let span;
    let div2;
    let p1;
    let t3_value = DuDu.vnd(
      /*list_price*/
      ctx[22]
    ) + "";
    let t3;
    let t4;
    let div1;
    let t5_value = new Intl.NumberFormat("en-IN", { maximumSignificantDigits: 3 }).format(
      /*sold*/
      ctx[23] / 1e3
    ) + "";
    let t5;
    let t6;
    let t7;
    let p2;
    let t8_value = DuDu.vnd(
      /*price*/
      ctx[21]
    ) + "";
    let t8;
    let t9;
    let mounted;
    let dispose;
    function click_handler_3() {
      return (
        /*click_handler_3*/
        ctx[14](
          /*url*/
          ctx[25]
        )
      );
    }
    return {
      c() {
        div4 = element("div");
        div0 = element("div");
        img = element("img");
        t0 = space();
        div3 = element("div");
        p0 = element("p");
        t1 = text(t1_value);
        t2 = space();
        span = element("span");
        div2 = element("div");
        p1 = element("p");
        t3 = text(t3_value);
        t4 = space();
        div1 = element("div");
        t5 = text(t5_value);
        t6 = text("k đã bán");
        t7 = space();
        p2 = element("p");
        t8 = text(t8_value);
        t9 = space();
        attr(img, "class", "w-full col-span-1 row-span-3 aspect-square rounded outline-3 outline-double outline-gray-300");
        attr(img, "alt", "Ảnh bìa sản phẩm");
        if (!src_url_equal(img.src, img_src_value = /*link_image*/
        ctx[24]))
          attr(img, "src", img_src_value);
        attr(div0, "class", "w-[200px] aspect-square block p-1");
        attr(p0, "class", "text-xl product-name svelte-1j7tjak");
        attr(p1, "class", "text-slate-500 line-through inline");
        attr(div1, "class", "text-slate-500");
        attr(div2, "class", "flex justify-between text-base");
        attr(p2, "class", "text-xxl font-bold text-[#B40001] inline");
        attr(span, "class", "inline-block");
        attr(div3, "class", "flex flex-col px-2");
        attr(div4, "class", "w-[200px] flex flex-col border border-1 shadow-sm rounded cursor-pointer");
      },
      m(target, anchor) {
        insert(target, div4, anchor);
        append(div4, div0);
        append(div0, img);
        append(div4, t0);
        append(div4, div3);
        append(div3, p0);
        append(p0, t1);
        append(div3, t2);
        append(div3, span);
        append(span, div2);
        append(div2, p1);
        append(p1, t3);
        append(div2, t4);
        append(div2, div1);
        append(div1, t5);
        append(div1, t6);
        append(span, t7);
        append(span, p2);
        append(p2, t8);
        append(div4, t9);
        if (!mounted) {
          dispose = listen(div4, "click", click_handler_3);
          mounted = true;
        }
      },
      p(new_ctx, dirty) {
        ctx = new_ctx;
      },
      d(detaching) {
        if (detaching)
          detach(div4);
        mounted = false;
        dispose();
      }
    };
  }
  function create_fragment(ctx) {
    let if_block_anchor;
    let current;
    let if_block = (
      /*State*/
      ctx[0].mode == "dudusales" && create_if_block(ctx)
    );
    return {
      c() {
        if (if_block)
          if_block.c();
        if_block_anchor = empty$1();
      },
      m(target, anchor) {
        if (if_block)
          if_block.m(target, anchor);
        insert(target, if_block_anchor, anchor);
        current = true;
      },
      p(ctx2, dirty) {
        if (
          /*State*/
          ctx2[0].mode == "dudusales"
        ) {
          if (if_block) {
            if_block.p(ctx2, dirty);
            if (dirty[0] & /*State*/
            1) {
              transition_in(if_block, 1);
            }
          } else {
            if_block = create_if_block(ctx2);
            if_block.c();
            transition_in(if_block, 1);
            if_block.m(if_block_anchor.parentNode, if_block_anchor);
          }
        } else if (if_block) {
          group_outros();
          transition_out(if_block, 1, 1, () => {
            if_block = null;
          });
          check_outros();
        }
      },
      i(local) {
        if (current)
          return;
        transition_in(if_block);
        current = true;
      },
      o(local) {
        transition_out(if_block);
        current = false;
      },
      d(detaching) {
        if (if_block)
          if_block.d(detaching);
        if (detaching)
          detach(if_block_anchor);
      }
    };
  }
  function checkSpammyLead(lead) {
    if (!lead || lead.trim() === "")
      return false;
    const hasManyRepeats = /(.)\1{3,}/.test(lead);
    const lacksVowels = !/[aeiouAEIOU]/.test(lead);
    const mostlyConsonants = /^[bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ\s]*$/.test(lead);
    return hasManyRepeats || lacksVowels && mostlyConsonants;
  }
  function isBetween2to5Words(str) {
    const words = str.trim().split(/\s+/);
    const count = words.length;
    return count >= 2 && count <= 5;
  }
  const func = (v) => v.list_price;
  const func_1 = (v) => v.list_price;
  const func_2 = (v) => v.list_price;
  const func_3 = (v) => v.list_price;
  const func_4 = (v) => v.price;
  const func_5 = (v) => v.price;
  const func_6 = (v) => v.price;
  const func_7 = (v) => v.price;
  function instance($$self, $$props, $$invalidate) {
    function listenAddToCart() {
      document.addEventListener("click", (e) => {
        if (e.target["closest"](".add-to-cart")) {
          $$invalidate(1, CheckoutState.isDisplay = true, CheckoutState);
          fireEvent("add_to_cart");
        }
      });
    }
    var isSpammyLead = false;
    async function sendOrder(capture = false) {
      if (State.order["phone"] && State.order["phone"].length > 9) {
        await Promise.all(State.forms.map(async ({ type, config }) => {
          var _a, _b, _c, _d, _e;
          try {
            if (type === "ladipage") {
              let { ladipage_id, form_config_id } = config;
              await fetch("https://api1.ldpform.com/sendform", {
                method: "POST",
                body: JSON.stringify({
                  data_key: `${form_config_id}|${ladipage_id}|${Date.now()}|qwerty`,
                  form_config_id,
                  ladipage_id,
                  status_send: capture ? 1 : 2,
                  time_zone: 7,
                  tracking_form: [
                    {
                      name: "url_page",
                      value: window.location.href
                    },
                    { name: "utm_source", value: "" },
                    { name: "utm_medium", value: "" },
                    { name: "utm_campaign", value: "" },
                    { name: "utm_term", value: "" },
                    { name: "utm_content", value: "" },
                    { name: "variant_url", value: "" },
                    { name: "variant_content", value: "" }
                  ],
                  form_data: [
                    {
                      name: "query",
                      value: DuDu.cookie.get("utm_campaign") ? DuDu.cookie.get("utm_campaign") : ""
                    },
                    {
                      name: "name",
                      value: State.order.name || "No name"
                    },
                    { name: "phone", value: State.order.phone },
                    {
                      name: "address",
                      value: State.order.address || "No Address"
                    },
                    {
                      name: "items",
                      value: JSON.stringify({
                        id: (_b = (_a = State.items) == null ? void 0 : _a[0]) == null ? void 0 : _b.id,
                        name: (_d = (_c = State.items) == null ? void 0 : _c[0]) == null ? void 0 : _d.variant_name
                      })
                    },
                    {
                      name: "product_name",
                      value: ((_e = State.product) == null ? void 0 : _e.name) || "khách vip"
                    },
                    {
                      name: "payment_method",
                      value: State.order.payment_method
                    },
                    {
                      name: "timeOnPage",
                      value: State.timeOnPage
                    }
                  ]
                }),
                headers: { "Content-type": "application/json" }
              });
            } else if (type === "telegram") {
            }
          } catch (err) {
            console.log(err.message);
          }
        }));
        setTimeout(
          () => {
            $$invalidate(0, State.sendingForm = false, State);
          },
          1e3
        );
        $$invalidate(0, State.sendedForm = { order: State.order, items: State.items }, State);
        if (!capture) {
          $$invalidate(0, State.isDisplay = false, State);
          $$invalidate(0, State.isDisplayThankyouPopup = true, State);
        }
      } else {
        setTimeout(
          () => {
            $$invalidate(0, State.sendingForm = false, State);
          },
          1e3
        );
      }
    }
    function checkPhoneValid() {
      let _phone = State.order["phone"];
      if (_phone && _phone.length > 9) {
        $$invalidate(1, CheckoutState.phoneValid = RegExp("^(\\\\+)?(84|0){1}[0-9]{9}$").test(_phone), CheckoutState);
        if (CheckoutState.phoneValid) {
          sendOrder(true);
          fireEvent("add_shipping_info");
        } else {
          setTimeout(
            () => {
              $$invalidate(0, State.sendingForm = false, State);
            },
            1e3
          );
          return false;
        }
        return true;
      } else {
        $$invalidate(1, CheckoutState.phoneValid = false, CheckoutState);
        setTimeout(
          () => {
            $$invalidate(0, State.sendingForm = false, State);
          },
          1e3
        );
        return false;
      }
    }
    function fireEvent(event_name, _params = {}) {
      if (!isSpammyLead) {
        isSpammyLead = checkSpammyLead(State.order.name || "") || checkSpammyLead(State.order.address || "") || isBetween2to5Words(State.order.address || "");
        if (isSpammyLead) {
          console.log("Detect user input");
        }
      }
      if (!State.eventFired.includes(event_name) && !isSpammyLead) {
        try {
          let params = {};
          if ([
            "add_to_cart",
            "begin_checkout",
            "add_shipping_info",
            "view_item",
            "purchase"
          ].includes(event_name)) {
            params = {
              value: State.cart.total_payment,
              currency: "VND",
              items: State.items.map(({ id, variant_name, variant_id, product_name, product_id, variant_thumbnail, sku, product_sku, price, list_price, quantity, thumbnail }, index) => ({
                id: product_sku,
                name: product_name,
                item_id: product_sku,
                item_name: product_name,
                // item_category: "All Products",
                // affiliation: "Google Merchandise Store",
                // index,
                item_variant: variant_name,
                price,
                quantity,
                "google_business_vertical": "retail"
              })),
              ..._params
            };
            if (event_name == "purchase") {
              params = {
                ...params,
                shipping: State.cart.shipping_fee,
                "phone_number": `84${State.order["phone"].slice(1)}`
              };
            }
            ;
            if (["view_item", "add_to_cart", "purchase"].includes(event_name)) {
              if (event_name == "purchase") {
                gtag("set", "user_data", {
                  "phone_number": `+84${State.order["phone"].slice(1)}`
                });
              }
              window["gtag"]("event", event_name, params);
              window["gtag"]("event", "conversion", Object.assign({ send_to: [event_name] }, params));
            }
            ;
          } else {
            window["dataLayer"].push({ event: `${event_name}` });
            window["gtag"]("event", event_name, _params);
          }
        } catch (err) {
          console.log(err.message);
        }
        State.eventFired.push(event_name);
      }
    }
    let checkout_title = [
      ["value_payment", "Giá niêm yết:"],
      ["value_promote", "Mã giảm giá:"],
      ["shipping_fee", "Phí vận chuyển:"],
      ["total_payment", "Tổng thanh toán:"]
    ];
    let State = {
      mode: "default",
      order: {
        payment_method: "Thanh toán khi nhận hàng (COD)"
      },
      variants: [],
      forms: [],
      timeOnPage: 0,
      eventFired: [],
      phoneValid: true,
      isDisplayAddToCart: false
    };
    let CheckoutState = new Proxy(
      State,
      {
        get(target, p, receiver) {
          return State[p] || null;
        },
        set(target, p, newValue, receiver) {
          switch (p) {
            case "mode":
              if (newValue == "dudusales") {
                listenAddToCart();
              }
              break;
            case "product":
              let { id, type } = newValue;
              if (type == "dudusales") {
                if (id)
                  ;
                else {
                  console.log("Required 'id'");
                }
              }
              break;
            case "forms":
              newValue.forEach(({ name, type: type2, config }, _index) => {
                if (type2 == "ladipage") {
                  if (!["ladipage_id", "form_config_id"].every((key) => Object.keys(config).includes(key))) {
                    throw new Error(`Config is not valid at: ${_index}`);
                  }
                } else if (type2 == "telegram") {
                  if (!["token", "group_id"].every((key) => Object.keys(config).includes(key))) {
                    throw new Error(`Config is not valid at: ${_index}`);
                  }
                } else {
                  throw new Error(`Config is not defined at: ${_index}`);
                }
              });
              break;
            case "items":
              let cart = {
                shipping_fee: 0,
                value_payment: 0,
                value_promote: 0,
                total_payment: 0,
                item_amount: 0
              };
              newValue.forEach(({ list_price, price }) => {
                cart.value_payment += list_price;
                cart.total_payment += price;
                cart.item_amount++;
              });
              $$invalidate(0, State.cart = cart, State);
              break;
            case "variants":
              setTimeout(() => {
                $$invalidate(1, CheckoutState.itemSelected = 0, CheckoutState);
                fireEvent("view_item");
              });
              break;
            case "itemSelected":
              if (typeof newValue == "number" && State.variants[newValue]) {
                let item = State.variants[newValue];
                let item_in_cart = {
                  id: item.product_id || State.product.id,
                  variant_id: item.id,
                  variant_name: item.name || "Mặc định",
                  product_name: item.product_name || State.product.name,
                  product_id: item.product_id || State.product.id,
                  price: item.price,
                  list_price: item.list_price,
                  sku: item.sku,
                  product_sku: State.product.sku,
                  thumbnail: item.thumbnail || State.product.thumbnail,
                  quantity: 1
                };
                $$invalidate(1, CheckoutState.items = [item_in_cart], CheckoutState);
                $$invalidate(0, State.variantSelected = item_in_cart, State);
              }
              break;
            case "phone":
              checkPhoneValid();
              break;
            case "sendingForm":
              checkPhoneValid();
              if (newValue) {
                if (State.phoneValid) {
                  sendOrder();
                  fireEvent("purchase");
                } else {
                  if (JSON.stringify(State.sendedForm) !== JSON.stringify({ order: State.order, items: State.items })) {
                    sendOrder(true);
                  }
                  return true;
                }
              }
              break;
          }
          $$invalidate(0, State[p] = newValue, State);
          return true;
        }
      }
    );
    onMount(async () => {
      window["dataLayer"] = window["dataLayer"] || [];
      if (window["CheckoutState"]) {
        await Promise.all(Object.entries(window["CheckoutState"]).map(([key, val]) => {
          $$invalidate(1, CheckoutState[key] = val, CheckoutState);
        }));
        window["CheckoutState"] = CheckoutState;
      } else {
        window["CheckoutState"] = CheckoutState;
      }
      let list_time = [10, 30, 60, 90, 120, 180, 300, 600, 900, 1800, 3600];
      setInterval(
        () => {
          $$invalidate(0, State.timeOnPage = (State.timeOnPage || 0) + 1, State);
          if (State.timeOnPage >= list_time[0]) {
            let time_on_page = list_time.shift();
            if (time_on_page) {
              fireEvent(`TimeOnPage_${time_on_page}_seconds`, { time_on_page });
            }
          }
        },
        1e3
      );
      let list_scroll = [25, 50, 75, 90];
      while (true) {
        let rateScroll = Math.round(window.scrollY / document.body.scrollHeight * 100);
        if (rateScroll >= list_scroll[1]) {
          list_scroll.shift();
        } else if (rateScroll >= list_scroll[0]) {
          let scroll_depth = list_scroll.shift();
          fireEvent(`ScrollDepth_${scroll_depth}_percent`, {
            scroll_depth,
            "scroll_units": "percent",
            "scroll_direction": "vertical"
          });
        } else {
          break;
        }
      }
      document.addEventListener(
        "scroll",
        () => {
          let rateScroll = Math.round(window.scrollY / document.body.scrollHeight * 100);
          if (rateScroll >= list_scroll[0]) {
            let scroll_depth = list_scroll.shift();
            if (scroll_depth) {
              fireEvent(`ScrollDepth_${scroll_depth}_percent`, {
                scroll_depth,
                "scroll_units": "percent",
                "scroll_direction": "vertical"
              });
            }
          }
        },
        { passive: true }
      );
    });
    let list_products = [
      [
        "Áo điều hoà cao cấp Mls 24 40.000mAh",
        109e4,
        218e4,
        4576,
        "/api/assets/ln5h5mpolqwhoidb2il0r9et_Untitled-11.png",
        "/aodieuhoa-mls-24v-2025"
      ],
      [
        "Máy cưa tỉa cành chuyên nghiệp Tolido 21V",
        112e4,
        25e5,
        16908,
        "https://w.ladicdn.com/s1200x1200/6151ea0cee7b600074a80a89/untitled-6-20240515080142-cy_wu.png",
        "/saw-tolido-25cm"
      ],
      [
        "Quạt chạy pin Tolido BS-Q1203",
        79e4,
        15e5,
        34872,
        "/api/assets/fsukl2pqkvde9p0ksu946ipa_quat%20tolido.png",
        "/fan-tolido-21v"
      ],
      [
        "Máy cắt cỏ tỉa cành cao cấp Lapusen 36V",
        115e4,
        22e5,
        22568,
        "https://statics.pancake.vn/web-media/19/66/5c/f2/e9a64250214271ff98752693e2b85529f9700134b5d383fdd7c706f9.png",
        "/lawn-mover-lapusen-36v"
      ],
      [
        "Máy cưa không chổi than Makita 199V 20cm",
        109e4,
        215e4,
        33545,
        "https://statics.pancake.vn/web-media/f1/75/e7/73/473d81b76d5200a51c520fc647f798adddbe12bc61c38dc81d9fd11a.png",
        "/saw-makita-199v-20cm"
      ],
      [
        "Siết bulong đầu 2 trong 1 Dewalt 20V",
        109e4,
        222e4,
        26174,
        "https://statics.pancake.vn/web-media/e2/38/f4/ee/95808e21083bed1d484527a09751c669712b6de6289c587d0a1c4f5a.png",
        "/wrench-dewalt-20v"
      ],
      [
        "Khoan 3 chức năng cầm tay Makita 72V",
        69e4,
        138e4,
        46355,
        "https://statics.pancake.vn/web-media/18/0b/6e/a5/0ee4e343586a09646cfe520046131b3cdae7d2988caf71627dd5ad91.png",
        "/drill-makita-72v"
      ],
      [
        "Máy rửa xe cao cấp Hitachi 199V",
        1149e3,
        225e4,
        13756,
        "https://statics.pancake.vn/web-media/55/74/52/07/961e6ce771f587d55a683f697bbdfb6729a06cba8e362c3adb1a53ab.png",
        "/wash-car-hitachi-199v"
      ],
      [
        "Máy siết bulong đầu đa năng Makita 20V",
        109e4,
        218e4,
        31098,
        "https://statics.pancake.vn/web-media/4f/cc/10/96/ab2787e50064e8a87ab1c0e5066af69e88d09a0bbaa5b071b789819c.png",
        "/wrench-makita-20v"
      ],
      [
        "Máy siết mở ốc bulong đa năng Hitachi 199V 125000mAh",
        109e4,
        218e4,
        19056,
        "https://statics.pancake.vn/web-media/d2/df/8f/ac/276fb6377bcdd7f13046e23470ff2c7325cd89adc5e5e856f2ac181e.png",
        "/wrench-hitachi-199v"
      ],
      [
        "Máy khoan bê tông 3 chức năng Makita 199V",
        129e4,
        25e5,
        27485,
        "https://statics.pancake.vn/web-media/31/8b/10/5c/62a566ac512675cdf9b0db3c4d67e831e9d57076d2e49663113336bf.png",
        "/drill-makita-199v"
      ],
      [
        "Máy mài, máy cắt sắt, cưa gỗ đa năng Hitachi 199V",
        135e4,
        27e5,
        9754,
        "https://statics.pancake.vn/web-media/2c/0b/6b/f6/e491f41a6c5b74cc5050fb46fbade263d204ea7bf07039610e7ca09f.png",
        "/grinder-hitachi-199v"
      ],
      [
        "Máy khoan pin đa năng Bosch 72V",
        69e4,
        138e4,
        36527,
        "https://statics.pancake.vn/web-media/f0/44/88/b7/a439d4d4ec4e37e8ad3896336e569971e2c1cc2fcc446eedd3ba6ca0.png",
        "/drill-bosch-72v"
      ]
    ];
    const click_handler = (_opt_i) => {
      $$invalidate(1, CheckoutState.itemSelected = _opt_i, CheckoutState);
    };
    function floatinglabelsimple0_value_binding(value2) {
      if ($$self.$$.not_equal(State.order.name, value2)) {
        State.order.name = value2;
        $$invalidate(0, State);
      }
    }
    function floatinglabelsimple1_value_binding(value2) {
      if ($$self.$$.not_equal(State.order.phone, value2)) {
        State.order.phone = value2;
        $$invalidate(0, State);
      }
    }
    const blur_handler = (e) => {
      checkPhoneValid();
      console.log("blur");
    };
    function floatinglabelsimple2_value_binding(value2) {
      if ($$self.$$.not_equal(State.order.address, value2)) {
        State.order.address = value2;
        $$invalidate(0, State);
      }
    }
    function floatinglabelsimple3_value_binding(value2) {
      if ($$self.$$.not_equal(State.order.payment_method, value2)) {
        State.order.payment_method = value2;
        $$invalidate(0, State);
      }
    }
    const click_handler_1 = () => {
      $$invalidate(1, CheckoutState.sendingForm = true, CheckoutState);
    };
    const click_handler_2 = () => {
      $$invalidate(0, State.isDisplay = false, State);
    };
    function modal_isDisplay_binding(value2) {
      if ($$self.$$.not_equal(State.isDisplayThankyouPopup, value2)) {
        State.isDisplayThankyouPopup = value2;
        $$invalidate(0, State);
      }
    }
    const click_handler_3 = (url2) => open(url2);
    const click_handler_4 = () => open("/");
    return [
      State,
      CheckoutState,
      checkPhoneValid,
      checkout_title,
      list_products,
      click_handler,
      floatinglabelsimple0_value_binding,
      floatinglabelsimple1_value_binding,
      blur_handler,
      floatinglabelsimple2_value_binding,
      floatinglabelsimple3_value_binding,
      click_handler_1,
      click_handler_2,
      modal_isDisplay_binding,
      click_handler_3,
      click_handler_4
    ];
  }
  class CheckoutWithForm2 extends SvelteComponent {
    constructor(options) {
      super();
      init$2(this, options, instance, create_fragment, safe_not_equal, {}, add_css, [-1, -1]);
    }
  }
  (() => {
    let node = document.createElement("div");
    node.id = "dudu-checkout";
    document.body.appendChild(node);
  })();
  const app = new CheckoutWithForm2({
    target: document.getElementById("dudu-checkout")
  });
  return app;
}();
