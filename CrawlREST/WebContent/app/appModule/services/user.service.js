angular.module('appModule')
.factory('userService', function($http, authService, $cookies, $path) {
  var service = {};

  var BASE_URL = 'http://localhost:8080/CrawlREST/rest';
  

  //user
  //findUser
  service.showUser = function() {
	  var id = $cookies.get('userId');
	  if(id){
		  return $http({
			  method : 'GET',
			  url : `${BASE_URL}/users/${id}`
		  })
		  console.log(id);
	  }
  };
  //indexUserByGroup
  service.indexUserByGroup = function() {
	  var id = $cookies.get('userId');
	  if(id){
		  return $http({
			  method : 'GET',
			  url : `${BASE_URL}/users/${id}/group/` + group.id
		  })
	  }
  };
  
  //updateUser
  service.updateUser = function(user){
	  var id = $cookies.get('userId');
	  if(id){
	  return $http({
	      method : 'PUT',
	      url : `${BASE_URL}/users/${id}`, 
	      headers : {
	        'Content-Type' : 'application/json'
	      },
	      data : user
	    })
	  }
  };
  
  //addContactToUser
  service.createContact = function(contacts) { 
	  var id = $cookies.get('userId');
	  if(id){
	  return $http({
	      method : 'POST',
	      url : `${BASE_URL}/users/${id}/contacts`,
	      headers : {
	        'Content-Type' : 'application/json'
	      },
	      data : contacts
	    })
	  }
  };
   
  //posts
  //createPost
  service.createPost = function(gid) { 
	  var id = $cookies.get('userId');
	  if(id){
	  return $http({
	      method : 'POST',
	      url : `${BASE_URL}/users/${id}/group/${gid}/post`,
	      headers : {
	        'Content-Type' : 'application/json'
	      },
	      data : gid
	    })  
	  }
  };
  //updatePost
  service.updatePost = function(pid){
	  var id = $cookies.get('userId');
	  if(id){
	  return $http({
	      method : 'PUT',
	      url : `${BASE_URL}/users/${id}/post/${pid}`, 
	      headers : {
	        'Content-Type' : 'application/json'
	      },
	      data : pid
	    })
	  }
  };
  //destroyPost
  service.destroyPost = function(pid){
	  var id = $cookies.get('userId');
	  if(uid){
	  return $http({
	      method : 'DELETE',
	      url : `${BASE_URL}/users/${id}/post/${pid}`
	    })
	  }
		
  };
  //findPostByUser
  service.findPostByUser = function() {
	  var id = $cookies.get('userId');
	  if(id){
		  return $http({
			  method : 'GET',
			  url : `${BASE_URL}/users/${id}/post`
		  })
	  }
  };
  //findPostByGroup
  service.findPostByGroup = function() {
	  var id = $cookies.get('userId');
	  if(id){
		  return $http({
			  method : 'GET',
			  url : `${BASE_URL}/users/${id}/post/group/${gid}`
		  })
	  }
  };
  
  //Group findGroupByUserId
  service.findGroupByUserId = function() {
	  var id = $cookies.get('userId');
	  if(id){
		  return $http({
			  method : 'GET',
			  url : `${BASE_URL}/users/${id}/groups`
		  })
	  }
  };
  
  //Post createGroup
  service.createGroup = function(newGroup) { 
	  var id = $cookies.get('userId');
	  if(id){
	  return $http({
	      method : 'POST',
	      url : `${BASE_URL}/users/${id}/groups`,
	      headers : {
	        'Content-Type' : 'application/json'
	      },
	      data : newGroup
	    })  
	  }
  };
	 	  
	  //update contact
	  service.updateUserWithContact = function(contact){
		  var id = $cookies.get('userId');
		  if(id){
		  return $http({
		      method : 'PUT',
		      url : `${BASE_URL}/users/${id}/contact/` + contact.id, 
		      headers : {
		        'Content-Type' : 'application/json'
		      },
		      data : contact
		    })
		  } // terminates if
	  }; // terminates updateUserWithContact

	  function checkLogged(){
		  if(!$cookies.get('userId')){
			  $location.path('/unauthorized');
		  }
	  }
  return service;
  
})