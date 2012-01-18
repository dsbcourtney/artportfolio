
var viewData = {
  
  isAdmin : function(locals){
    
    locals.viewType = "admin";
    
    return locals;
  },
  
  isPublic : function(locals){
    
    locals.viewType = "public";
    
    return locals;
    
  }  

};

module.exports = viewData;