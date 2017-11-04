angular.module('appModule')
.factory('userService', function($http, authService) {
  var service = {};

  var BASE_URL = 'http://localhost:8080/CrawlREST/rest';
 

  //user
  //findUser
  service.showUser = function() {
	  var id = 1
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
	  var id = 1
	  if(id){
		  return $http({
			  method : 'GET',
			  url : `${BASE_URL}/users/${id}/group/` + group.id
		  })
	  }
  };
  
  //updateUser
  service.updateUser = function(users){
	  var id = 1
	  if(id){
	  return $http({
	      method : 'PUT',
	      url : `${BASE_URL}/users/${id}`, 
	      headers : {
	        'Content-Type' : 'application/json'
	      },
	      data : users
	    })
	  }
  };
  
  //addContactToUser
  service.createContact = function(contacts) { 
	  var id = 1
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
	  var id = 1;
	  if(id){
	  return $http({
	      method : 'POST',
	      url : `${BASE_URL}/users/${id}/group/${gid}/post`,
	      headers : {
	        'Content-Type' : 'application/json'
	      },
	      data : group
	    })  
	  }
  };
  //updatePost
  service.updatePost = function(pid){
	  var id = 1
	  if(id){
	  return $http({
	      method : 'PUT',
	      url : `${BASE_URL}/users/${id}/post/${pid}`, 
	      headers : {
	        'Content-Type' : 'application/json'
	      },
	      data : post
	    })
	  }
  };
  //destroyPost
  service.destroyPost = function(pid){
	  var id = 1
	  if(uid){
	  return $http({
	      method : 'DELETE',
	      url : `${BASE_URL}/users/${id}/post/${pid}`
	    })
	  }
		
  };
  //findPostByUser
  service.findPostByUser = function() {
	  var id = 1
	  if(id){
		  return $http({
			  method : 'GET',
			  url : `${BASE_URL}/users/${id}/post`
		  })
	  }
  };
  //findPostByGroup
  service.findPostByGroup = function() {
	  var id = 1
	  if(id){
		  return $http({
			  method : 'GET',
			  url : `${BASE_URL}/users/${id}/post/group/${gid}`
		  })
	  }
  };
  
  //Group findGroupByUserId
  service.findGroupByUserId = function() {
	  var id = 1
	  if(id){
		  return $http({
			  method : 'GET',
			  url : `${BASE_URL}/users/${id}/groups`
		  })
	  }
  };
  

  return service;
})