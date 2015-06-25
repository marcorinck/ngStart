//jshint module:true
class NgStartController  {
	constructor($translate) {
			this.$translate = $translate;
	}

	doSomething() {
	    this.test = "Tester!";
	}
}

NgStartController.$inject = ["$translate"];

export default NgStartController;