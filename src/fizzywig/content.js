fizzywig.content = function(selector_or_list) {
  var content  = {}
  ,   node_list
  ,   toolbar
  ,   current_range
  ,   save_timer
  ,   content_tree = {}
  ;
  
  if (typeof selector_or_list === 'string') {
    node_list = document.querySelectorAll(selector_or_list);
  } else if (selector_or_list instanceof node_list || Array.isArray(selector_or_list)) {
    node_list = selector_or_list;
  }
  
  node_list = Array.prototype.map.apply(node_list, [function(n) {
    return fizzy_contentNode(n, content);
  }]);
  
  content.toolbar = function(tb_selector) {
    if (!arguments.length) return toolbar;
    
    toolbar = fizzy_toolbar(tb_selector, content);
    return content;
  };
  
  content.enable = function() {
    node_list.forEach(function(el) { el.enable() });
    return content;
  };
  
  content.disable = function() {
    node_list.forEach(function(el) { el.disable() });
    return content;
  };
  
  content.json = function() {
    var object_tree = {}
    ,   object_list = node_list.map(function(el) { return el.json() })
    ;
    
    object_list.unshift(object_tree);
    
    object_deepMerge.apply(null, object_list);
    
    return object_tree;
  };
  
  // a proxy for our emitter
  content.on = fizzywig.emitter.on;
  fizzywig.emitter.on('keyup change blur paste', startSaveTimer);
  
  function startSaveTimer() {
    if (save_timer) { return; }
    
    save_timer = setTimeout(function() {
      var current_content_tree = content.json();
      
      if (JSON.stringify(content_tree) !== JSON.stringify(current_content_tree)) {
        fizzywig.emitter.emit('save', [current_content_tree]);
        content_tree = current_content_tree;
      }
      
      save_timer = null;
    }, 2000);
  }
  
  return content.enable();
};

