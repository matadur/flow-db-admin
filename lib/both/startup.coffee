@AdminTables = {}

adminTablesDom = '<"box"<"box-header"<"box-toolbar"<"pull-left"<lf>><"pull-right"p>>><"box-body"t>>'

adminEditButton = {
	data: '_id'
	title: 'Edit'
	createdCell: (node, cellData, rowData) ->
		$(node).html(Blaze.toHTMLWithData Template.adminEditBtn, {_id: cellData}, node)
	width: '40px'
	orderable: false
}

adminDelButton = {
	data: '_id'
	title: 'Delete'
	createdCell: (node, cellData, rowData) ->
	 $(node).html(Blaze.toHTMLWithData Template.adminDeleteBtn, {_id: cellData}, node)
	width: '40px'
	orderable: false
}

adminEditDelButtons = [
	adminEditButton,
	adminDelButton
]

defaultColumns = () -> [
  data: '_id',
  title: 'ID'
]

AdminTables.Users = new Tabular.Table
	# Modify selector to allow search by email
	changeSelector: (selector, userId) ->
		$or = selector['$or']
		$or and selector['$or'] = _.map $or, (exp) ->
			if exp.emails?['$regex']?
				emails: $elemMatch: address: exp.emails
			else
				exp
		selector

	name: 'Users'
	collection: Meteor.users
	columns: _.union [
		# {
		# 	data: '_id'
		# 	title: 'Admin'
		# 	createdCell: (node, cellData, rowData) ->
		# 		$(node).html(Blaze.toHTMLWithData Template.adminUsersIsAdmin, {_id: cellData}, node)
		# 	width: '40px'
		# }
		{ data: 'createdAt', title: 'Created' }
		{
			data: 'emails'
			title: 'Email'
			render: (value) ->
				if value then value[0].address else ''
			searchable: true
		}
		{
			data: '_id'
			title: 'ID'
			render: (value) ->
				' <a href="/admin/users/manage?user=' + value + '" title="open in user management" alt="manage user">manage</a> ' + value
		}
	]
	# , adminEditDelButtons
	order: [[0,"desc"]]
	dom: adminTablesDom

adminTablePubName = (collection) ->
	"admin_tabular_#{collection}"

adminCreateTables = (collections) ->
	_.each AdminConfig?.collections, (collection, name) ->
		_.defaults collection, {
			showEditColumn: true
			showDelColumn: true,
			order: [[0,"desc"]],
			stateSave: false
		}

		columns = _.map collection.tableColumns, (column) ->
			if column.template
				createdCell = (node, cellData, rowData) ->
					$(node).html ''
					Blaze.renderWithData(Template[column.template], {value: cellData, doc: rowData}, node)

			data: column.name
			title: column.label
			createdCell: createdCell
			orderable: true
			visible: column.visible

		if columns.length == 0
			columns = defaultColumns()

		if collection.showEditColumn
			columns.push(adminEditButton)
		if collection.showDelColumn
			columns.push(adminDelButton)

		AdminTables[name] = new Tabular.Table
			name: name
			collection: adminCollectionObject(name)
			pub: collection.pub || (collection.children and adminTablePubName(name))
			sub: collection.sub
			columns: columns
			extraFields: collection.extraFields
			dom: adminTablesDom
			stateSave: collection.stateSave
			ordering: true
			order: collection.order
			changeSelector: collection.changeSelector
			widgetCountQuery: collection.widgetCountQuery

adminPublishTables = (collections) ->
	_.each collections, (collection, name) ->
		if not collection.children then return undefined
		Meteor.publishComposite adminTablePubName(name), (tableName, ids, fields) ->
			check tableName, String
			check ids, Array
			check fields, Match.Optional Object

			extraFields = _.reduce collection.extraFields, (fields, name) ->
				fields[name] = 1
				fields
			, {}
			_.extend fields, extraFields

			find: ->
				adminCollectionObject(name).find {_id: {$in: ids}}, {fields: fields}
			# children: collection.children

Meteor.startup ->
	adminCreateTables AdminConfig?.collections
	adminPublishTables AdminConfig?.collections if Meteor.isServer
	AdminDashboard.users = AdminConfig.users || {
    hideFromTree: false
    hideWidget: true
    newTemplate: 'AdminDashboardUsersNew'
    editTemplate: 'AdminDashboardUsersEdit'
	}
