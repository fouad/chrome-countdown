(function(){

var $  = document.getElementById.bind(document)
var $$ = document.querySelectorAll.bind(document)

var App = function($el){
  this.$el = $el
  this.load()

  this.renderTimeLoop()
}

App.fn = App.prototype

App.fn.load = function(){
  this.end = new Date(parseInt(1471878000192))
}

App.fn.renderTimeLoop = function(){
  this.interval = setInterval(this.renderTime.bind(this), 100)
}


function getDayDiff (first, second) {
  var diff = (second-first)/(1000*60*60*24)

  return {
    days: Math.floor(diff),
    hours: (diff - Math.floor(diff))
  }
}

App.fn.renderTime = function(){
  var now = new Date
  var end = this.end
  var diff = getDayDiff(now, end)

  requestAnimationFrame(function(){
    this.html(this.view('age')({
      days: diff.days,
      hours: Math.floor(diff.hours * 10000000)
    }))
  }.bind(this))
}

App.fn.$$ = function(sel){
  return this.$el.querySelectorAll(sel)
}

App.fn.html = function(html){
  this.$el.innerHTML = html
}

App.fn.view = function(name){
  var $el = $(name + '-template')
  return Handlebars.compile($el.innerHTML)
}

window.app = new App($('app'))

})()
