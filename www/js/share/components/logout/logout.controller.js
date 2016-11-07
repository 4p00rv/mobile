/**
 * @name logout controller
 * @author Nazanin Reihani Haghighi
 * @contributors []
 * @since 08/15/2016
 * @copyright Binary Ltd
 */

(function (){
  'use strict';

  angular
    .module('binary.share.components.logout.controllers')
    .controller('LogoutController', Logout);

  Logout.$inject = [
		'$rootScope', '$state', 'accountService', 'appStateService', 'websocketService', 'alertService', 'proposalService', 'marketService'];

  function Logout(
			$rootScope,
			$state,
      accountService,
      appStateService,
      websocketService,
      alertService,
      proposalService,
      marketService
    ){
    var vm = this;
		vm.logout = function(res) {
				alertService.confirmRemoveAllAccount(
					function(res){
						if(typeof(res) !== "boolean"){
							if(res == 1)
								res = true;
							else
								res = false;
						}

						if(res){
							accountService.removeAll();
              proposalService.forget();
              marketService.removeActiveSymbols();
              marketService.removeAssetIndex();
              appStateService.isRealityChecked = false;
              appStateService.isChangedAccount = false;
              appStateService.isPopupOpen = false;
              appStateService.isCheckedAccountType = false;
														appStateService.isLoggedin = false;
														sessionStorage.removeItem('start');
														sessionStorage.removeItem('_interval');
                            appStateService.profitTableRefresh = true;
                            appStateService.statementRefresh = true;
                            appStateService.isNewAccountReal = false;
                            appStateService.isNewAccountMaltainvest = false;
                            appStateService.hasMLT = false;
                            sessionStorage.removeItem('countryParams');
														websocketService.closeConnection();
							$state.go('signin');
						}
					}
				);
			};
	}
})();
