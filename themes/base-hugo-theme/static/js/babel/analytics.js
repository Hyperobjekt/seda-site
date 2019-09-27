"use strict";function _readOnlyError(a){throw new Error("\""+a+"\" is read-only")}/**
 * Analytics listeners
 */(function(a){// console.log('Loading Analytics listeners');
var b={};if(b.push=function(a){dataLayer.push(a)},b.navigate=function(a,b){b?window.open(a,"_blank"):window.location.href=a},b.init=function(){a(".gta-event-CTAClick").on("click touchstart",function(c){c.preventDefault();// console.log(e.currentTarget);
var d=a(c.currentTarget).attr("href"),e="_blank"===a(c.currentTarget).attr("target"),f={event:"CTAClick",CTADestination:encodeURI(d),eventCallback:function eventCallback(){b.navigate(d,e)}};b.push(f)}),a(".gta-event-bioExpanded").on("click touchstart",function(c){// console.log('.gta-event-bioExpanded');
var d=a(c.currentTarget);// console.log($target);
b.push({event:"bioExpanded"})}),a(".gta-event-eMailSignupAttempt").on("click touchstart",function(){// console.log('.gta-event-eMailSignupAttempt');
b.push({event:"eMailSignupAttempt"})}),a(".gta-event-postSelected").on("click touchstart",function(c){c.preventDefault();var d=a(c.currentTarget).attr("href"),e={event:"postSelected",discoverySelection:encodeURI(d),eventCallback:function eventCallback(){window.location.href=d}};b.push(e)}),a(".gta-event-showAbstractandVersion").on("click touchstart",function(c){// console.log('.gta-event-showAbstractandVersion');
var d=a(c.currentTarget),e=null;e=a(".row.subnav.small-tab-nav").is(":visible")?(_readOnlyError("$paperCategory"),a(".row.subnav.small-tab-nav").find("ul.anchor-links li a.active").text()):(_readOnlyError("$paperCategory"),a(".row.subnav.large-tab-nav").find("#researchTabs li a.active").text());// console.log('$paperCategory: ' + $paperCategory);
var f=null;f=a(c.currentTarget).closest(".research-paper").find(".info h5").text();// console.log($paperName);
var g={event:"showAbstractandVersion",paperCategory:e?e:"Unavailable",paperName:f?f:"Unavailable"};b.push(g)}),a(".gta-event-categorySelected").on("click touchstart",function(c){// console.log('.gta-event-categorySelected');
var d=a(c.currentTarget),e=d.text(),f={event:"categorySelected",paperCategory:e?e:"Unavailable"};b.push(f)}),a(".gta-event-paperDownloadbyVersion").on("click touchstart",function(c){// console.log('.gta-event-paperDownloadbyVersion');
// e.preventDefault();
var d=a(c.currentTarget),e=null;e=a(c.currentTarget).closest(".research-paper").find(".info h5").text();// console.log($paperName);
var f=d.attr("data-date"),g={event:"paperDownloadbyVersion",paperVersion:f,paperName:e};// console.log($paperVersion);
b.push(g)}),a(".gta-event-paperDownloadLatest").on("click touchstart",function(c){// console.log('.gta-event-paperDownloadLatest');
var d=a(c.currentTarget),e=d.closest(".research-paper").find(".info h5").text(),f=d.attr("data-date");b.push({event:"paperDownloadLatest",paperVersion:f,paperName:e})}),a(".gta-event-articleSelected").on("click touchstart",function(c){c.preventDefault();var d=a(c.currentTarget).attr("href"),e=a(c.currentTarget).closest(".row.news-item").find("h4 a"),f=e.text(),g=e.attr("data-outlet"),h="_blank"===a(c.currentTarget).attr("target");b.push({event:"articleSelected",newsArticleName:f,newsArticlePublication:g,eventCallback:function eventCallback(){b.navigate(d,h)}})}),a(".gta-event-faqTopicExpanded").on("click touchstart",function(c){// console.log('.gta-event-faqTopicExpanded');
var d=a(c.currentTarget),e=a(c.currentTarget).find("h5").text();b.push({event:"faqTopicExpanded",faqTopicExpansion:e})}),a(".gta-event-navClick").on("click touchstart",function(c){c.preventDefault();var d=a(c.currentTarget),e=d.attr("href"),f="_blank"===d.attr("target"),g=null;1<=d.closest("#drawer").length&&(g="main"),1<=d.closest("footer").length&&(g="footer");var h=d.text().trim();0>=h.length&&(h=d.attr("href")),0>=h.length&&(h=d.find("span, h1")[0].text().trim());// console.log($navType);
// console.log($navItem);
var i={event:"navClick",navType:g,navItem:h,eventCallback:function eventCallback(){b.navigate(e,f)}};b.push(i)}),window.addEventListener("error",function(a){// console.log('Error detected in browser window. Sending GA report.');
var c={event:"error",errorMessage:"Error originating from "+a.filename+" at line "+a.lineno+", column "+a.colno+":\n"+a.message};b.push(c)})},!!dataLayer)// console.log('dataLayer found');
var c=1<=a("body.type-posts").length?1200:600,d=setTimeout(function(){3<=dataLayer.length?b.init():console.log("The GTM dataLayer cannot be found... Skipping analytics listeners.")},c);else console.log("Error! The GTM dataLayer cannot be found... Skipping analytics listeners.")})(jQuery);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hbmFseXRpY3MuanMiXSwibmFtZXMiOlsiJCIsImFuYWx5dGljcyIsInB1c2giLCJkYXRhIiwiZGF0YUxheWVyIiwibmF2aWdhdGUiLCJ0YXJnZXQiLCJibGFuayIsIndpbmRvdyIsIm9wZW4iLCJsb2NhdGlvbiIsImhyZWYiLCJpbml0Iiwib24iLCJlIiwicHJldmVudERlZmF1bHQiLCIkdGFyZ2V0IiwiY3VycmVudFRhcmdldCIsImF0dHIiLCIkdGFyZ2V0QmxhbmsiLCJfb2JqIiwiZW5jb2RlVVJJIiwiJHBhcGVyQ2F0ZWdvcnkiLCJpcyIsImZpbmQiLCJ0ZXh0IiwiJHBhcGVyTmFtZSIsImNsb3Nlc3QiLCIkcGFwZXJWZXJzaW9uIiwiJHRpdGxlTm9kZSIsIiRuZXdzQXJ0aWNsZU5hbWUiLCIkbmV3c0FydGljbGVQdWJsaWNhdGlvbiIsIiR0b3BpYyIsIiRocmVmIiwiJG5hdlR5cGUiLCJsZW5ndGgiLCIkbmF2SXRlbSIsInRyaW0iLCJhZGRFdmVudExpc3RlbmVyIiwiZXJyb3IiLCJmaWxlbmFtZSIsImxpbmVubyIsImNvbG5vIiwibWVzc2FnZSIsIndhaXRUaW1lIiwidGltZW91dCIsInNldFRpbWVvdXQiLCJjb25zb2xlIiwibG9nIiwialF1ZXJ5Il0sIm1hcHBpbmdzIjoia0ZBQUE7O0dBR0EsQ0FBQyxTQUFTQSxDQUFULENBQVksQ0FDWDtBQUNBLEdBQU1DLENBQUFBLENBQVMsQ0FBRyxFQUFsQixDQWlPQSxHQWhPQUEsQ0FBUyxDQUFDQyxJQUFWLENBQWlCLFNBQVVDLENBQVYsQ0FBZ0IsQ0FFL0JDLFNBQVMsQ0FBQ0YsSUFBVixDQUFlQyxDQUFmLENBQ0QsQ0E2TkQsQ0E1TkFGLENBQVMsQ0FBQ0ksUUFBVixDQUFxQixTQUFDQyxDQUFELENBQVNDLENBQVQsQ0FBbUIsQ0FDbENBLENBRGtDLENBRXBDQyxNQUFNLENBQUNDLElBQVAsQ0FBWUgsQ0FBWixDQUFvQixRQUFwQixDQUZvQyxDQUlwQ0UsTUFBTSxDQUFDRSxRQUFQLENB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RSxNQURwQixDQUM2QixXQUQ3QixDQUMyQ0YsQ0FBSyxDQUFDRyxLQURqRCxDQUVBLEtBRkEsQ0FFUUgsQ0FBSyxDQUFDSSxPQUpuQixDQUFiLENBTUExQyxDQUFTLENBQUNDLElBQVYsQ0FBZWtCLENBQWYsQ0FDRCxDQVRELENBVUQsQ0FDRCxDQUFJLENBQUMsQ0FBQ2hCLFNBQU4sQ0FDRTtBQURGLEdBRVF3QyxDQUFBQSxDQUFRLENBQW9DLENBQWpDLEVBQUM1QyxDQUFDLENBQUMsaUJBQUQsQ0FBRCxDQUFxQm1DLE1BQXRCLENBQXFDLElBQXJDLENBQTRDLEdBRi9ELENBR1FVLENBQU8sQ0FBR0MsVUFBVSxDQUFDLFVBQVcsQ0FDWixDQUFwQixFQUFBMUMsU0FBUyxDQUFDK0IsTUFEc0IsQ0FFbENsQyxDQUFTLENBQUNXLElBQVYsRUFGa0MsQ0FJbENtQyxPQUFPLENBQUNDLEdBQVIsQ0FBWSxvRUFBWixDQUVILENBTnlCLENBTXZCSixDQU51QixDQUg1QixLQVdFRyxDQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSwyRUFBWixDQUVILENBaFBELEVBZ1BHQyxNQWhQSCxDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBBbmFseXRpY3MgbGlzdGVuZXJzXG4gKi9cbihmdW5jdGlvbigkKSB7XG4gIC8vIGNvbnNvbGUubG9nKCdMb2FkaW5nIEFuYWx5dGljcyBsaXN0ZW5lcnMnKTtcbiAgY29uc3QgYW5hbHl0aWNzID0ge307XG4gIGFuYWx5dGljcy5wdXNoID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAvLyBjb25zb2xlLmxvZygnYW5hbHl0aWNzLnB1c2gnKTtcbiAgICBkYXRhTGF5ZXIucHVzaChkYXRhKTtcbiAgfVxuICBhbmFseXRpY3MubmF2aWdhdGUgPSAodGFyZ2V0LCBibGFuaykgPT4ge1xuICAgIGlmIChibGFuaykge1xuICAgICAgd2luZG93Lm9wZW4odGFyZ2V0LCAnX2JsYW5rJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gdGFyZ2V0O1xuICAgIH1cbiAgfVxuICBhbmFseXRpY3MuaW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAvLyBjb25zb2xlLmxvZygnYW5hbHl0aWNzLmluaXQnKTtcblxuICAgIC8vIEV2ZW50OiBDVEFDbGlja1xuICAgICQoJy5ndGEtZXZlbnQtQ1RBQ2xpY2snKS5vbignY2xpY2sgdG91Y2hzdGFydCcsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAvLyBjb25zb2xlLmxvZygnLmd0YS1ldmVudC1DVEFDbGljaycpO1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgLy8gY29uc29sZS5sb2coZS5jdXJyZW50VGFyZ2V0KTtcbiAgICAgIGNvbnN0ICR0YXJnZXQgPSAkKGUuY3VycmVudFRhcmdldCkuYXR0cignaHJlZicpO1xuICAgICAgY29uc3QgJHRhcmdldEJsYW5rID0gKCQoZS5jdXJyZW50VGFyZ2V0KS5hdHRyKCd0YXJnZXQnKSA9PT0gJ19ibGFuaycpO1xuICAgICAgLy8gY29uc29sZS5sb2coJHRhcmdldCk7XG4gICAgICBjb25zdCBfb2JqID0ge1xuICAgICAgICAnZXZlbnQnIDogJ0NUQUNsaWNrJyxcbiAgICAgICAgJ0NUQURlc3RpbmF0aW9uJzogZW5jb2RlVVJJKCR0YXJnZXQpLFxuICAgICAgICAnZXZlbnRDYWxsYmFjaycgOiAoKSA9PiB7XG4gICAgICAgICAgICBhbmFseXRpY3MubmF2aWdhdGUoJHRhcmdldCwgJHRhcmdldEJsYW5rKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgYW5hbHl0aWNzLnB1c2goX29iaik7XG4gICAgfSk7XG5cbiAgICAvLyBFdmVudDogYmlvRXhwYW5kZWRcbiAgICAkKCcuZ3RhLWV2ZW50LWJpb0V4cGFuZGVkJykub24oJ2NsaWNrIHRvdWNoc3RhcnQnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgLy8gY29uc29sZS5sb2coJy5ndGEtZXZlbnQtYmlvRXhwYW5kZWQnKTtcbiAgICAgIGNvbnN0ICR0YXJnZXQgPSAkKGUuY3VycmVudFRhcmdldCk7XG4gICAgICAvLyBjb25zb2xlLmxvZygkdGFyZ2V0KTtcbiAgICAgIGNvbnN0IF9vYmogPSB7XG4gICAgICAgICdldmVudCcgOiAnYmlvRXhwYW5kZWQnXG4gICAgICB9XG4gICAgICBhbmFseXRpY3MucHVzaChfb2JqKTtcbiAgICB9KTtcblxuICAgIC8vIEV2ZW50OiBlTWFpbFNpZ251cFxuICAgICQoJy5ndGEtZXZlbnQtZU1haWxTaWdudXBBdHRlbXB0Jykub24oJ2NsaWNrIHRvdWNoc3RhcnQnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgLy8gY29uc29sZS5sb2coJy5ndGEtZXZlbnQtZU1haWxTaWdudXBBdHRlbXB0Jyk7XG4gICAgICBjb25zdCBfb2JqID0ge1xuICAgICAgICAnZXZlbnQnIDogJ2VNYWlsU2lnbnVwQXR0ZW1wdCdcbiAgICAgIH1cbiAgICAgIGFuYWx5dGljcy5wdXNoKF9vYmopO1xuICAgIH0pO1xuXG4gICAgLy8gRXZlbnQ6IHBvc3RTZWxlY3RlZFxuICAgICQoJy5ndGEtZXZlbnQtcG9zdFNlbGVjdGVkJykub24oJ2NsaWNrIHRvdWNoc3RhcnQnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgLy8gY29uc29sZS5sb2coJy5ndGEtZXZlbnQtcG9zdFNlbGVjdGVkJyk7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBjb25zdCAkdGFyZ2V0ID0gJChlLmN1cnJlbnRUYXJnZXQpLmF0dHIoJ2hyZWYnKTtcbiAgICAgIGNvbnN0IF9vYmogPSB7XG4gICAgICAgICdldmVudCcgOiAncG9zdFNlbGVjdGVkJyxcbiAgICAgICAgJ2Rpc2NvdmVyeVNlbGVjdGlvbic6IGVuY29kZVVSSSgkdGFyZ2V0KSxcbiAgICAgICAgJ2V2ZW50Q2FsbGJhY2snIDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICR0YXJnZXQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGFuYWx5dGljcy5wdXNoKF9vYmopO1xuICAgIH0pO1xuXG4gICAgLy8gRXZlbnQ6IHNob3dBYnN0cmFjdGFuZFZlcnNpb25cbiAgICAvLyBSZXBvcnRzOiBwYXBlckNhdGVnb3J5LCBwYXBlck5hbWVcbiAgICAkKCcuZ3RhLWV2ZW50LXNob3dBYnN0cmFjdGFuZFZlcnNpb24nKS5vbignY2xpY2sgdG91Y2hzdGFydCcsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAvLyBjb25zb2xlLmxvZygnLmd0YS1ldmVudC1zaG93QWJzdHJhY3RhbmRWZXJzaW9uJyk7XG4gICAgICBjb25zdCAkdGFyZ2V0ID0gJChlLmN1cnJlbnRUYXJnZXQpO1xuICAgICAgY29uc3QgJHBhcGVyQ2F0ZWdvcnkgPSBudWxsO1xuICAgICAgaWYgKCQoJy5yb3cuc3VibmF2LnNtYWxsLXRhYi1uYXYnKS5pcygnOnZpc2libGUnKSkge1xuICAgICAgICAvLyBjb25zb2xlLmxvZygnTW9iaWxlIHZpZXcnKTtcbiAgICAgICAgJHBhcGVyQ2F0ZWdvcnkgPSAkKCcucm93LnN1Ym5hdi5zbWFsbC10YWItbmF2JykuZmluZCgndWwuYW5jaG9yLWxpbmtzIGxpIGEuYWN0aXZlJykudGV4dCgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgJHBhcGVyQ2F0ZWdvcnkgPSAkKCcucm93LnN1Ym5hdi5sYXJnZS10YWItbmF2JykuZmluZCgnI3Jlc2VhcmNoVGFicyBsaSBhLmFjdGl2ZScpLnRleHQoKTtcbiAgICAgIH1cbiAgICAgIC8vIGNvbnNvbGUubG9nKCckcGFwZXJDYXRlZ29yeTogJyArICRwYXBlckNhdGVnb3J5KTtcbiAgICAgIGxldCAkcGFwZXJOYW1lID0gbnVsbDtcbiAgICAgICRwYXBlck5hbWUgPSAkKGUuY3VycmVudFRhcmdldCkuY2xvc2VzdCgnLnJlc2VhcmNoLXBhcGVyJykuZmluZCgnLmluZm8gaDUnKS50ZXh0KCk7XG4gICAgICAvLyBjb25zb2xlLmxvZygkcGFwZXJOYW1lKTtcbiAgICAgIGNvbnN0IF9vYmogPSB7XG4gICAgICAgICdldmVudCcgOiAnc2hvd0Fic3RyYWN0YW5kVmVyc2lvbicsXG4gICAgICAgICdwYXBlckNhdGVnb3J5JzogJHBhcGVyQ2F0ZWdvcnkgPyAkcGFwZXJDYXRlZ29yeSA6ICdVbmF2YWlsYWJsZScsXG4gICAgICAgICdwYXBlck5hbWUnOiAkcGFwZXJOYW1lID8gJHBhcGVyTmFtZSA6ICdVbmF2YWlsYWJsZSdcbiAgICAgIH1cbiAgICAgIGFuYWx5dGljcy5wdXNoKF9vYmopO1xuICAgIH0pO1xuXG4gICAgLy8gRXZlbnQ6IGNhdGVnb3J5U2VsZWN0ZWRcbiAgICAvLyBSZXBvcnRzOiBwYXBlckNhdGVnb3J5XG4gICAgJCgnLmd0YS1ldmVudC1jYXRlZ29yeVNlbGVjdGVkJykub24oJ2NsaWNrIHRvdWNoc3RhcnQnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgLy8gY29uc29sZS5sb2coJy5ndGEtZXZlbnQtY2F0ZWdvcnlTZWxlY3RlZCcpO1xuICAgICAgY29uc3QgJHRhcmdldCA9ICQoZS5jdXJyZW50VGFyZ2V0KTtcbiAgICAgIGNvbnN0ICRwYXBlckNhdGVnb3J5ID0gJHRhcmdldC50ZXh0KCk7XG4gICAgICAvLyBjb25zb2xlLmxvZygkcGFwZXJDYXRlZ29yeSk7XG4gICAgICBjb25zdCBfb2JqID0ge1xuICAgICAgICAnZXZlbnQnIDogJ2NhdGVnb3J5U2VsZWN0ZWQnLFxuICAgICAgICAncGFwZXJDYXRlZ29yeSc6ICRwYXBlckNhdGVnb3J5ID8gJHBhcGVyQ2F0ZWdvcnkgOiAnVW5hdmFpbGFibGUnXG4gICAgICB9XG4gICAgICBhbmFseXRpY3MucHVzaChfb2JqKTtcbiAgICB9KTtcblxuICAgIC8vIEV2ZW50OiBwYXBlckRvd25sb2FkYnlWZXJzaW9uXG4gICAgLy8gUmVwb3J0czogcGFwZXJWZXJzaW9uLCBwYXBlck5hbWVcbiAgICAkKCcuZ3RhLWV2ZW50LXBhcGVyRG93bmxvYWRieVZlcnNpb24nKS5vbignY2xpY2sgdG91Y2hzdGFydCcsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAvLyBjb25zb2xlLmxvZygnLmd0YS1ldmVudC1wYXBlckRvd25sb2FkYnlWZXJzaW9uJyk7XG4gICAgICAvLyBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBjb25zdCAkdGFyZ2V0ID0gJChlLmN1cnJlbnRUYXJnZXQpO1xuICAgICAgbGV0ICRwYXBlck5hbWUgPSBudWxsO1xuICAgICAgJHBhcGVyTmFtZSA9ICQoZS5jdXJyZW50VGFyZ2V0KS5jbG9zZXN0KCcucmVzZWFyY2gtcGFwZXInKS5maW5kKCcuaW5mbyBoNScpLnRleHQoKTtcbiAgICAgIC8vIGNvbnNvbGUubG9nKCRwYXBlck5hbWUpO1xuICAgICAgY29uc3QgJHBhcGVyVmVyc2lvbiA9ICR0YXJnZXQuYXR0cignZGF0YS1kYXRlJyk7XG4gICAgICAvLyBjb25zb2xlLmxvZygkcGFwZXJWZXJzaW9uKTtcbiAgICAgIGNvbnN0IF9vYmogPSB7XG4gICAgICAgICdldmVudCc6ICdwYXBlckRvd25sb2FkYnlWZXJzaW9uJyxcbiAgICAgICAgJ3BhcGVyVmVyc2lvbic6ICRwYXBlclZlcnNpb24sXG4gICAgICAgICdwYXBlck5hbWUnOiAkcGFwZXJOYW1lXG4gICAgICB9XG4gICAgICBhbmFseXRpY3MucHVzaChfb2JqKTtcbiAgICB9KTtcblxuICAgIC8vIEV2ZW50OiBwYXBlckRvd25sb2FkTGF0ZXN0XG4gICAgLy8gUmVwb3J0czogcGFwZXJWZXJzaW9uLCBwYXBlck5hbWVcbiAgICAkKCcuZ3RhLWV2ZW50LXBhcGVyRG93bmxvYWRMYXRlc3QnKS5vbignY2xpY2sgdG91Y2hzdGFydCcsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAvLyBjb25zb2xlLmxvZygnLmd0YS1ldmVudC1wYXBlckRvd25sb2FkTGF0ZXN0Jyk7XG4gICAgICBjb25zdCAkdGFyZ2V0ID0gJChlLmN1cnJlbnRUYXJnZXQpO1xuICAgICAgY29uc3QgJHBhcGVyTmFtZSA9ICR0YXJnZXQuY2xvc2VzdCgnLnJlc2VhcmNoLXBhcGVyJykuZmluZCgnLmluZm8gaDUnKS50ZXh0KCk7XG4gICAgICBjb25zdCAkcGFwZXJWZXJzaW9uID0gJHRhcmdldC5hdHRyKCdkYXRhLWRhdGUnKTtcbiAgICAgIGNvbnN0IF9vYmogPSB7XG4gICAgICAgICdldmVudCc6ICdwYXBlckRvd25sb2FkTGF0ZXN0JyxcbiAgICAgICAgJ3BhcGVyVmVyc2lvbic6ICRwYXBlclZlcnNpb24sXG4gICAgICAgICdwYXBlck5hbWUnOiAkcGFwZXJOYW1lXG4gICAgICB9XG4gICAgICBhbmFseXRpY3MucHVzaChfb2JqKTtcbiAgICB9KTtcblxuICAgIC8vIEV2ZW50OiBhcnRpY2xlU2VsZWN0ZWRcbiAgICAvLyBSZXBvcnRzOiBuZXdzQXJ0aWNsZU5hbWUsIG5ld3NBcnRpY2xlUHVibGljYXRpb25cbiAgICAkKCcuZ3RhLWV2ZW50LWFydGljbGVTZWxlY3RlZCcpLm9uKCdjbGljayB0b3VjaHN0YXJ0JywgZnVuY3Rpb24oZSkge1xuICAgICAgLy8gY29uc29sZS5sb2coJy5ndGEtZXZlbnQtYXJ0aWNsZVNlbGVjdGVkJyk7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBjb25zdCAkdGFyZ2V0ID0gJChlLmN1cnJlbnRUYXJnZXQpLmF0dHIoJ2hyZWYnKTtcbiAgICAgIGNvbnN0ICR0aXRsZU5vZGUgPSAkKGUuY3VycmVudFRhcmdldCkuY2xvc2VzdCgnLnJvdy5uZXdzLWl0ZW0nKS5maW5kKCdoNCBhJyk7XG4gICAgICBjb25zdCAkbmV3c0FydGljbGVOYW1lID0gJHRpdGxlTm9kZS50ZXh0KCk7XG4gICAgICAvLyBjb25zb2xlLmxvZygkbmV3c0FydGljbGVOYW1lKTtcbiAgICAgIGNvbnN0ICRuZXdzQXJ0aWNsZVB1YmxpY2F0aW9uID0gJHRpdGxlTm9kZS5hdHRyKCdkYXRhLW91dGxldCcpO1xuICAgICAgY29uc3QgJHRhcmdldEJsYW5rID0gKCQoZS5jdXJyZW50VGFyZ2V0KS5hdHRyKCd0YXJnZXQnKSA9PT0gJ19ibGFuaycpO1xuICAgICAgLy8gY29uc29sZS5sb2coJHRhcmdldEJsYW5rKTtcbiAgICAgIC8vIGNvbnNvbGUubG9nKCRuZXdzQXJ0aWNsZVB1YmxpY2F0aW9uKTtcbiAgICAgIGNvbnN0IF9vYmogPSB7XG4gICAgICAgICdldmVudCc6ICdhcnRpY2xlU2VsZWN0ZWQnLFxuICAgICAgICAnbmV3c0FydGljbGVOYW1lJzogJG5ld3NBcnRpY2xlTmFtZSxcbiAgICAgICAgJ25ld3NBcnRpY2xlUHVibGljYXRpb24nOiAkbmV3c0FydGljbGVQdWJsaWNhdGlvbixcbiAgICAgICAgJ2V2ZW50Q2FsbGJhY2snIDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBhbmFseXRpY3MubmF2aWdhdGUoJHRhcmdldCwgJHRhcmdldEJsYW5rKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgYW5hbHl0aWNzLnB1c2goX29iaik7XG4gICAgfSk7XG5cbiAgICAvLyBFdmVudDogZmFxVG9waWNFeHBhbmRlZFxuICAgIC8vIFJlcG9ydHM6IGZhcVRvcGljRXhwYW5zaW9uXG4gICAgJCgnLmd0YS1ldmVudC1mYXFUb3BpY0V4cGFuZGVkJykub24oJ2NsaWNrIHRvdWNoc3RhcnQnLCBmdW5jdGlvbihlKSB7XG4gICAgICAvLyBjb25zb2xlLmxvZygnLmd0YS1ldmVudC1mYXFUb3BpY0V4cGFuZGVkJyk7XG4gICAgICBjb25zdCAkdGFyZ2V0ID0gJChlLmN1cnJlbnRUYXJnZXQpO1xuICAgICAgY29uc3QgJHRvcGljID0gJChlLmN1cnJlbnRUYXJnZXQpLmZpbmQoJ2g1JykudGV4dCgpO1xuICAgICAgY29uc3QgX29iaiA9IHtcbiAgICAgICAgJ2V2ZW50JyA6ICdmYXFUb3BpY0V4cGFuZGVkJyxcbiAgICAgICAgJ2ZhcVRvcGljRXhwYW5zaW9uJzogJHRvcGljXG4gICAgICB9XG4gICAgICBhbmFseXRpY3MucHVzaChfb2JqKTtcbiAgICB9KTtcblxuICAgIC8vIEV2ZW50OiBuYXZDbGlja1xuICAgIC8vIFJlcG9ydHM6IG5hdlR5cGUsIG5hdkl0ZW1cbiAgICAkKCcuZ3RhLWV2ZW50LW5hdkNsaWNrJykub24oJ2NsaWNrIHRvdWNoc3RhcnQnLCBmdW5jdGlvbihlKSB7XG4gICAgICAvLyBjb25zb2xlLmxvZygnLmd0YS1ldmVudC1uYXZDbGljaycpO1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgY29uc3QgJHRhcmdldCA9ICQoZS5jdXJyZW50VGFyZ2V0KTtcbiAgICAgIGNvbnN0ICRocmVmID0gJHRhcmdldC5hdHRyKCdocmVmJyk7XG4gICAgICBjb25zdCAkdGFyZ2V0QmxhbmsgPSAoJHRhcmdldC5hdHRyKCd0YXJnZXQnKSA9PT0gJ19ibGFuaycpO1xuICAgICAgbGV0ICRuYXZUeXBlID0gbnVsbDtcbiAgICAgIGlmICgkdGFyZ2V0LmNsb3Nlc3QoJyNkcmF3ZXInKS5sZW5ndGggPj0gMSkge1xuICAgICAgICAkbmF2VHlwZSA9ICdtYWluJztcbiAgICAgIH1cbiAgICAgIGlmICgkdGFyZ2V0LmNsb3Nlc3QoJ2Zvb3RlcicpLmxlbmd0aCA+PSAxKSB7XG4gICAgICAgICRuYXZUeXBlID0gJ2Zvb3Rlcic7XG4gICAgICB9XG4gICAgICBsZXQgJG5hdkl0ZW0gPSAkdGFyZ2V0LnRleHQoKS50cmltKCk7XG4gICAgICBpZiAoJG5hdkl0ZW0ubGVuZ3RoIDw9IDApIHtcbiAgICAgICAgJG5hdkl0ZW0gPSAkdGFyZ2V0LmF0dHIoJ2hyZWYnKTtcbiAgICAgIH1cbiAgICAgIGlmICgkbmF2SXRlbS5sZW5ndGggPD0gMCkge1xuICAgICAgICAkbmF2SXRlbSA9ICR0YXJnZXQuZmluZCgnc3BhbiwgaDEnKVswXS50ZXh0KCkudHJpbSgpO1xuICAgICAgfVxuICAgICAgLy8gY29uc29sZS5sb2coJG5hdlR5cGUpO1xuICAgICAgLy8gY29uc29sZS5sb2coJG5hdkl0ZW0pO1xuICAgICAgY29uc3QgX29iaiA9IHtcbiAgICAgICAgJ2V2ZW50JyA6ICduYXZDbGljaycsXG4gICAgICAgICduYXZUeXBlJzogJG5hdlR5cGUsXG4gICAgICAgICduYXZJdGVtJzogJG5hdkl0ZW0sXG4gICAgICAgICdldmVudENhbGxiYWNrJyA6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdyZXF1ZXN0IHN1Y2Nlc3NmdWwnKTtcbiAgICAgICAgICBhbmFseXRpY3MubmF2aWdhdGUoJGhyZWYsICR0YXJnZXRCbGFuayk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGFuYWx5dGljcy5wdXNoKF9vYmopO1xuICAgIH0pO1xuXG4gICAgLy8gQmFzaWMgSlMgZXJyb3IgbGlzdGVuZXJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCBmdW5jdGlvbihlcnJvcikge1xuICAgICAgLy8gY29uc29sZS5sb2coJ0Vycm9yIGRldGVjdGVkIGluIGJyb3dzZXIgd2luZG93LiBTZW5kaW5nIEdBIHJlcG9ydC4nKTtcbiAgICAgIGNvbnN0IF9vYmogPSB7XG4gICAgICAgICdldmVudCcgOiAnZXJyb3InLFxuICAgICAgICAnZXJyb3JNZXNzYWdlJzogJ0Vycm9yIG9yaWdpbmF0aW5nIGZyb20gJyArIGVycm9yLmZpbGVuYW1lICtcbiAgICAgICAgICAgICAgICAgICAgICAgICcgYXQgbGluZSAnICsgZXJyb3IubGluZW5vICsgJywgY29sdW1uICcgKyBlcnJvci5jb2xubyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnOlxcbicgKyBlcnJvci5tZXNzYWdlXG4gICAgICB9XG4gICAgICBhbmFseXRpY3MucHVzaChfb2JqKTtcbiAgICB9KTtcbiAgfVxuICBpZiAoISFkYXRhTGF5ZXIpIHtcbiAgICAvLyBjb25zb2xlLmxvZygnZGF0YUxheWVyIGZvdW5kJyk7XG4gICAgY29uc3Qgd2FpdFRpbWUgPSAoJCgnYm9keS50eXBlLXBvc3RzJykubGVuZ3RoKSA+PSAxID8gMTIwMCA6IDYwMDtcbiAgICBjb25zdCB0aW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgIGlmIChkYXRhTGF5ZXIubGVuZ3RoID49IDMpIHtcbiAgICAgICAgYW5hbHl0aWNzLmluaXQoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdUaGUgR1RNIGRhdGFMYXllciBjYW5ub3QgYmUgZm91bmQuLi4gU2tpcHBpbmcgYW5hbHl0aWNzIGxpc3RlbmVycy4nKTtcbiAgICAgIH1cbiAgICB9LCB3YWl0VGltZSk7XG4gIH0gZWxzZSB7XG4gICAgY29uc29sZS5sb2coJ0Vycm9yISBUaGUgR1RNIGRhdGFMYXllciBjYW5ub3QgYmUgZm91bmQuLi4gU2tpcHBpbmcgYW5hbHl0aWNzIGxpc3RlbmVycy4nKTtcbiAgfVxufSkoalF1ZXJ5KTtcbiJdfQ==