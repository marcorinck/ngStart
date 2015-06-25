//jshint module:true
class NavbarController {
	constructor($location, $translate) {
		this.$location = $location;
		this.$translate = $translate;
	}

	isActive(page) {
		return page === this.$location.path();
	}

	changeLanguage(language) {
		this.$translate.use(language);
	}

}

NavbarController.$inject = ['$location', '$translate'];

export default NavbarController;