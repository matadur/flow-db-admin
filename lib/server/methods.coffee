Meteor.methods
	adminInsertDoc: (doc,collection) ->
		check arguments, [Match.Any]
		roles = adminCollection(collection).insertDocRoles || AdminConfig.insertDocRoles || 'root'
		if Roles.userIsInRole this.userId, roles
			Future = Npm.require('fibers/future');
			fut = new Future();

			adminCollectionObject(collection).insert doc, (e,_id)->
				fut['return']( {e:e,_id:_id} )
			return fut.wait()
		else
			throw new Meteor.Error 'Access Denied - Do not have required role'

	adminUpdateDoc: (modifier,collection,_id) ->
		check arguments, [Match.Any]
		roles = adminCollection(collection).updateDocRoles || AdminConfig.updateDocRoles || 'root'
		if Roles.userIsInRole this.userId, roles
			Future = Npm.require('fibers/future');
			fut = new Future();
			adminCollectionObject(collection).update {_id:_id},modifier,(e,r)->
				fut['return']( {e:e,r:r} )
			return fut.wait()
		else
			throw new Meteor.Error 'Access Denied - Do not have required role'

	adminRemoveDoc: (collection,_id) ->
		check arguments, [Match.Any]
		roles = adminCollection(collection).removeDocRoles || AdminConfig.removeDocRoles || 'root'
		if Roles.userIsInRole this.userId, roles
			if collection == 'Users'
				Meteor.users.remove {_id:_id}
			else
				# global[collection].remove {_id:_id}
				adminCollectionObject(collection).remove {_id: _id}
		else
			throw new Meteor.Error 'Access Denied - Do not have required role'

	adminCheckAdmin: ->
		check arguments, [Match.Any]
		user = Meteor.users.findOne(_id:this.userId)
		if this.userId and !Roles.userIsInRole(this.userId, ['admin']) and (user.emails.length > 0)
			email = user.emails[0].address
			if typeof Meteor.settings.adminEmails != 'undefined'
				adminEmails = Meteor.settings.adminEmails
				if adminEmails.indexOf(email) > -1
					console.log 'Adding admin user: ' + email
					Roles.addUsersToRoles this.userId, ['admin']
			else if typeof AdminConfig != 'undefined' and typeof AdminConfig.adminEmails == 'object'
				adminEmails = AdminConfig.adminEmails
				if adminEmails.indexOf(email) > -1
					console.log 'Adding admin user: ' + email
					Roles.addUsersToRoles this.userId, ['admin']
			else if this.userId == Meteor.users.findOne({},{sort:{createdAt:1}})._id
				console.log 'Making first user admin: ' + email
				Roles.addUsersToRoles this.userId, ['admin']
