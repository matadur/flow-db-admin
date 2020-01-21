# Change Log

Version 1.4.4

* remove meteorhacks:unblock
* works with Meteor 1.7.0.5

Version 1.4.3

* add dash-widget class to widgets on dashboard

Version 1.4.2

* change default skin back to black-light

Version 1.4.1

* remove ostrio:flow-router-extra imports - throwing ecmascript errors and don't seem to be needed anyway

Version 1.4.0

* replace router with ostrio:flow-router-extra
* remove dependencies for staringatlights:flow-router & matadur:active-route-legacy;
* add ecmascript as dependency; up min api to 1.5
* comment out breaking children
* add visible to column def
* option to pass function to trigger on route changes
* fix and issue with admin scrolling
* get admin prefix from config

Version 1.3.1

* Role requirements for doc insert/update/remove methods can now be set at top-level or collection-level admin config
* Default role requirement for doc insert/update/remove methods is now 'root' instead of 'admin'

Version 1.3

* Added users object to AdminConfig
* Removed user new/edit templates & all related functions
* Load & handle user via templates on config
* Remove email button from user table view
* Reduce text on no config alert
* Add config option to hide Users widget
* Change default widget color to gray
* AdminConfig option for admin schemas

* Remove dependencies email, moment, jquery
* Update dependencies kadira:blaze-layout, aldeed:collection2, aldeed:autoform, alanning:roles, raix:handlebar-helpers

Version 1.2.6

* Switch to `matadur:active-route-legacy` to get support for staringatlights:flow-router

Version 1.2.5
* Switch to `staringatlights:flow-router`

Version 1.2.4
* Set data for admin users edit

Version 1.2.3
* Enable setting the target parameter on side bar urls

Version 1.2.2
* Add option to hide Users collection from side bar

Version 1.2.1
* Add option to hide collections from side bar
* Remove fixed body style
* Remove unused test files

Version 1.2.0
* Remove explicit dependency on `mfactory:admin-lte` (*Breaking Change*)

Version 1.1.10
* Added option to hide breadcrumb via Session variable

Version 1.1.9
* Removed dynamic filler text

Version 1.1.8
* Removed GLOBAL_GROUP flag in adding user roles, caused failures with alanning:roles in some cases

Version 1.1.7
* Moved extra sidebar items to top of sidebar
* Implemented datatable sort with orderable/order and added default sort (first col desc)
* Implemented tabular save state option to remember sort changes

Version 1.1.6
* **Forked from sach:flow-db-admin**
* Remove trailing comment lines in admin sidebar

------

Version 1.1.5

* Update to add check for admin authorization check , thanks @markoshust
* Updated to autoform version 5.7.1

Version 1.1
*Updates to remove modals and fixes for Meteor 1.2

Version 1.0.3
*Update to less for working with Meteor 1.2 thanks to @CaptainN

Version 1.0.0 - 3rd Aug 2015
*Update to flow-router 2.0 and blaze-layout Updated from meteorhacks:flow-router, to kadirahq:flow-router (flow-router 2.0)
*Updated from meteorhacks:flow-layout, to kadirahq:blaze-layout Minor bug fixes.
