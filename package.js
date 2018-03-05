Package.describe({
  name: 'matadur:flow-db-admin',
  version: '1.3.1',
  // Brief, one-line summary of the package.
  summary: 'Meteor Database Admin package for use with Flow Router Forked From sach:flow-db-admin',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/matadur/flow-db-admin',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2');

  both = ['client','server']

  api.use(
    [
    'coffeescript',
    'underscore',
    'reactive-var',
    'meteorhacks:unblock@1.1.0',
    'staringatlights:flow-router@2.12.2',
    'kadira:blaze-layout@2.3.0',
    'matadur:active-route-legacy@2.3.4',
    'reywood:publish-composite@1.4.2',
    'aldeed:collection2@2.10.0',
    'aldeed:autoform@5.8.1',
    'aldeed:template-extension@3.4.3',
    'alanning:roles@1.2.16',
    'raix:handlebar-helpers@0.2.5',
    'aldeed:tabular@1.4.0',
    'check'
    ],
    both);

  api.use(['less@1.0.0 || 2.5.0','session','templating'],'client')

  api.add_files([
    'lib/both/AdminDashboard.coffee',
    'lib/both/routes.js',
    'lib/both/utils.coffee',
    'lib/both/startup.coffee',
    'lib/both/collections.coffee'
    ], both);

  api.add_files([
    'lib/client/html/admin_templates.html',
    'lib/client/html/admin_widgets.html',
    'lib/client/html/fadmin_layouts.html',
    'lib/client/html/admin_sidebar.html',
    'lib/client/html/admin_header.html',
    'lib/client/js/admin_layout.js',
    'lib/client/js/helpers.coffee',
    'lib/client/js/templates.coffee',
    'lib/client/js/events.coffee',
    'lib/client/js/autoForm.coffee',
    'lib/client/css/admin-custom.less'
    ], 'client');

  api.add_files([
    'lib/server/publish.coffee',
    'lib/server/methods.coffee'
    ], 'server');

  api.export('AdminDashboard',both)

});
