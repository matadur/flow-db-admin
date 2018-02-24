Template.fAdminLayout.events
	'click .btn-delete': (e,t) ->
		_id = $(e.target).attr('doc')
		Session.set 'admin_id', parseID(_id)
		Session.set 'admin_doc', adminCollectionObject(Session.get('admin_collection_name')).findOne(parseID(_id))

Template.AdminHeader.events
	'click .btn-sign-out': () ->
		Meteor.logout ->
			FlowRouter.go('/')

Template.adminDeleteWidget.events
	'click #confirm-delete': () ->
		collection = FlowRouter.getParam 'collectionName'
		_id = FlowRouter.getParam '_id'
		Meteor.call 'adminRemoveDoc', collection, _id, (e,r)->
			FlowRouter.go  '/admin/view/' + collection
