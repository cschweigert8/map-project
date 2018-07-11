var ViewModel = function(){
    this.name = ko.observable('Test Place');
}

ko.applyBindings(new ViewModel());