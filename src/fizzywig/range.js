fizzywig.range = fizzy_range();

function fizzy_range() {
  var range = {}
  ,   range_adapter
  ,   selection_adapter
  ,   _range
  ,   _selection
  ;
  
  if (typeof rangy !== 'undefined') {
    range_adapter = rangy;
    selection_adapter = rangy;
  } else {
    range_adapter = document;
    selection_adapter = window;
  }
  
  range.get = function() {
    _selection = selection_adapter.getSelection();
    _range = _selection.rangeCount && _selection.getRangeAt(0);
  };
  
  range.commonAncestor = function() {
    return _range && _range.commonAncestorContainer;
  };
  
  range.moveToEnd = function(node) {
    var r = range_adapter.createRange();
    
    _selection = selection_adapter.getSelection();
    
    r.selectNodeContents(node);
    r.collapse(false);
    _selection.setSingleRange(r);
  };
  
  range.selectNode = function(node) {
    _range && _range.selectNode(node);
  };
  
  range.surroundContents = function(node) {
    if (!_range) return;
    
    try {
      _range.surroundContents(node);
    } catch(e) {}
  };
  
  range.insertNode = function(node) {
    if (!_range) return;
    
    try {
      _range.insertNode(node);
    } catch(e) {}
  }
  
  return range;
}

