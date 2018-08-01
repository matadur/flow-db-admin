
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

dataTableOptions = {
    "aaSorting": [],
    "bPaginate": true,
    "bLengthChange": false,
    "bFilter": true,
    "bSort": true,
    "bInfo": true,
    "bAutoWidth": true
};


function getMinHeight () {

  var hdrHeight = $('.main-header').height()
  var winHeight = $(window).height()

  return Math.max(_minHeight, (winHeight - hdrHeight))
}
