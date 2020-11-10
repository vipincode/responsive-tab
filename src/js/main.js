
// =============================================================================
//               RESPONSIVE TAB 1
// =============================================================================

$('#smarttab').smartTab({
  selected: 0,
  theme: 'none',
  orientation: 'horizontal',
  justified: true,
  autoAdjustHeight: false,
  backButtonSupport: true,
  enableURLhash: true,
  transition: {
      animation: 'slide-s',
      speed: '400',
      easing:''
  },
  autoProgress: {
      enabled: false,
      interval: 3500,
      stopOnFocus: true,
  },
  keyboardSettings: {
      keyNavigation: true,
      keyLeft: [37],
      keyRight: [39]
  }
});

// =============================================================================
//               RESPONSIVE TAB 2
// =============================================================================


$(document).ready(function() {
  //Horizontal Tab
  $('#basic_tab').easyResponsiveTabs({
      type: 'default',
      width: 'auto',
      fit: true,
      tabidentify: 'hor_1',
      activate: function(event) {
          var $tab = $(this);
          var $info = $('#nested-tabInfo');
          var $name = $('span', $info);
          $name.text($tab.text());
          $info.show();
      }
  });

  //Horizontal Tab
  $('#nested_hrtab').easyResponsiveTabs({
      type: 'default',
      width: 'auto',
      fit: true,
      tabidentify: 'hor_1',
      activate: function(event) {
          var $tab = $(this);
          var $info = $('#nested-tabInfo');
          var $name = $('span', $info);
          $name.text($tab.text());
          $info.show();
      }
  });

  // Child Tab
  $('#ChildVerticalTab_1').easyResponsiveTabs({
      type: 'vertical',
      width: 'auto',
      fit: true,
      tabidentify: 'ver_1',
  });

  //Vertical Tab
  $('#nested_vtab').easyResponsiveTabs({
      type: 'vertical',
      width: 'auto',
      fit: true,
      closed: 'accordion',
      tabidentify: 'hor_1',
      activate: function(event) {
          var $tab = $(this);
          var $info = $('#nested-tabInfo2');
          var $name = $('span', $info);
          $name.text($tab.text());
          $info.show();
      }
  });
});

























