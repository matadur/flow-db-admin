
const _minHeight = 750

BlazeLayout.setRoot('body');

Template.fAdminLayout.onCreated( function () {
  this.minHeight = new ReactiveVar(_minHeight)
})

Template.fAdminLayout.onRendered( function () {
  var self = this;

  self.minHeight.set(getMinHeight())

  $(window).resize(function () {
    self.minHeight.set(getMinHeight())
  })

})

Template.fAdminLayout.helpers({
  minHeight: function () {
    return Template.instance().minHeight.get() + 'px'
  }
});

Template.AdminDashboardView.onRendered( function () {
  
  Meteor.setTimeout(() => { addAllOption() }, 500);
})

dataTableOptions = {
    "aaSorting": [],
    "bPaginate": true,
    "bLengthChange": false,
    "bFilter": true,
    "bSort": true,
    "bInfo": true,
    "bAutoWidth": true
};


function addAllOption ( norecur ) {
  let tableId = $(".table.dataTable").attr('id')
  
  if (!tableId && !norecur) Meteor.setTimeout(() => {
    addAllOption(true)
  }, 1000);

  let selectSelector = `select[name=${tableId}_length]`
  let selectHtml = $(selectSelector).html()
  
  if (!selectHtml) return

  selectHtml += '<option value="-1">All Docs</option>'

  $(selectSelector).html(selectHtml)
}

function getMinHeight () {

  var hdrHeight = $('.main-header').height()
  var winHeight = $(window).height()

  return Math.max(_minHeight, (winHeight - hdrHeight))
}
