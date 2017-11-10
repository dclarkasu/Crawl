angular.module('appModule').factory('userService',
		function($http, authService, $cookies, $location, $rootScope) {
			var service = {};


			// user
			// findUser
			service.showUser = function(id) {
				if (id) {
					return $http({
						method : 'GET',
						url : `rest/users/${id}`
					})
				}
			};
			// indexUserByGroup
			service.indexUserByGroup = function(id) {
				if (id) {
					return $http({
						method : 'GET',
						url : `rest/users/${id}/group/` + group.id
					})
				}
			};

			// updateUser
			service.updateUser = function(user) {
				var id = $cookies.get('userId');
				if (id) {
					return $http({
						method : 'PUT',
						url : `rest/users/${id}`,
						headers : {
							'Content-Type' : 'application/json'
						},
						data : user
					})
				}
			};

			// addContactToUser
			service.createContact = function(contacts) {
				var id = $cookies.get('userId');
				if (id) {
					return $http({
						method : 'POST',
						url : `rest/users/${id}/contacts`,
						headers : {
							'Content-Type' : 'application/json'
						},
						data : contacts
					})
				}
			};

			// posts
			// createPost
			service.createPost = function(gid) {
				var id = $cookies.get('userId');
				if (id) {
					return $http({
						method : 'POST',
						url : `rest/users/${id}/group/${gid}/post`,
						headers : {
							'Content-Type' : 'application/json'
						},
						data : gid
					})
				}
			};
			// updatePost
			service.updatePost = function(pid) {
				var id = $cookies.get('userId');
				if (id) {
					return $http({
						method : 'PUT',
						url : `rest/users/${id}/post/${pid}`,
						headers : {
							'Content-Type' : 'application/json'
						},
						data : pid
					})
				}
			};
			// destroyPost
			service.destroyPost = function(pid) {
				var id = $cookies.get('userId');
				if (uid) {
					return $http({
						method : 'DELETE',
						url : `rest/users/${id}/post/${pid}`
					})
				}

			};
			// findPostByUser
			service.findPostByUser = function() {
				var id = $cookies.get('userId');
				if (id) {
					return $http({
						method : 'GET',
						url : `rest/users/${id}/post`
					})
				}
			};
			// findPostByGroup
			service.findPostByGroup = function() {
				var id = $cookies.get('userId');
				if (id) {
					return $http({
						method : 'GET',
						url : `rest/users/${id}/post/group/${gid}`
					})
				}
			};

			// Group findGroupByUserId
			service.findGroupByUserId = function() {
				var id = $cookies.get('userId');
				if (id) {
					return $http({
						method : 'GET',
						url : `rest/users/${id}/groups`
					})
				}
			};

			// Post createGroup
			service.createGroup = function(newGroup) {
				var id = $cookies.get('userId');
				if (id) {
					return $http({
						method : 'POST',
						url : `rest/users/${id}/groups`,
						headers : {
							'Content-Type' : 'application/json'
						},
						data : newGroup
					}).then(function(res) {
						$rootScope.$broadcast('createdGroup', {
							message : "Group Created",
							group : res.data
						})
						return res;
					})
				}
			};

			// update contact
			service.updateUserWithContact = function(contact) {
				var id = $cookies.get('userId');
				if (id) {
					return $http({
						method : 'PUT',
						url : `rest/users/${id}/contact/` + contact.id,
						headers : {
							'Content-Type' : 'application/json'
						},
						data : contact
					})
				} // terminates if
			}; // terminates updateUserWithContact

			function checkLogged() {
				if (!$cookies.get('userId')) {
					$location.path('/unauthorized');
				}
			}
			return service;

		})
