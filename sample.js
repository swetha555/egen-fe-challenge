
var app = angular.module('myApp', []);
//var count = 0;


app.controller('passwordController', function($scope) {
    $scope.pw = "";
    var passwordVal = $scope.pw;

    // the value taken from the user inut is passed into validateFunction.

    $scope.validateFunction = function(value) {
        // console.log(value);  
        if (angular.isDefined(value)) {
        	// evaluatePassword functio is defined below.. it validates the password and saved into variable evalResult
            var evalResult = evaluatePassword(value);
            if (evalResult) {
                // console.log(evalResult);
                if (evalResult.errors.length == 0 && evalResult.weight == 5 || evalResult.errors.length == 0) {
                    //decoloeStr* class added to the parent ul for styling like a meter
                    $scope.strength = 'strong';
                    $scope.strengthMeter = 'decolorStr';
                } else if (evalResult.errors.length <= 2 && evalResult.weight >= 3) {
                    $scope.strength = 'high';
                    $scope.strengthMeter = 'decolorHigh';
                } else if (evalResult.errors.length <= 3 && evalResult.weight >= 3) {
                    $scope.strength = 'medium';
                    $scope.strengthMeter = 'decolorMed';
                } else if (evalResult.errors.length > 3 && evalResult.weight <= 2 || (evalResult.errors.length == 5 && evalResult.weight == -1)) {
                    $scope.strength = 'low';
                    $scope.strengthMeter = 'decolorLow';

                } else {
                    $scope.strength = 'weak';
                    $scope.strengthMeter = 'decolorWeak';
                }
            }
            // count = 0;   
            $scope.result = evalResult;
        }
    }
});
/*Function to validate the password entered..
min character limit=8,regex check, alpha numeric,uppercase and lowercase check..
errorlist is populated at each validation step and printed on the screen .
*** strength meter is calculated on 2 parameters..weight which is calculated randomly(instead of 
writing logic as it was not specified in the description) and errorsList length.***
*/
var evaluatePassword = function(p) {
	
    var _regex = /[$-/:-?{-~!"^_`\[\]]/g; //"
    var errorsArr = [];
    var isValid = true;
    var _upperLetters = /[A-Z]+/.test(p);
    var _lowerLetters = /[a-z]+/.test(p);



    if (p.length < 8) {
        errorsArr.push(['Min 8 characters are required,']);
        //count+=1;
        isValid = false;
    }

    var _numbers = /[0-9]+/.test(p);
    if (!_numbers) {
        errorsArr.push(['At least one alphanumeric required,']);
        isValid = false;
        //count+=1;
    }
    if (!_upperLetters) {
        errorsArr.push(['At least one uppercase required,']);
        isValid = false;
        // count+=1;
    }
    if (!_lowerLetters) {
        errorsArr.push(['At least one lowercase required,']);
        isValid = false;
        // count+=1;
    }

    var _symbols = _regex.test(p);
    if (!_symbols) {
        errorsArr.push(['At least one special character required']);
        isValid = false;
        //count+=1;
    }
    if (!isValid) {
        //** weight is calculated randomly...**
        weight = Math.floor(Math.random() * 5) + 1;
    } else {
        weight = -1;
    }
    var errorMessage = '';
    if(errorsArr.length > 0){
       for(i=0; i<= errorsArr.length-1; i++){
       	  // if(errorMessage)
       	  errorMessage = errorMessage + errorsArr[i];
       }
    }
    var result = {
        weight: weight,
        errors: errorsArr,
        errorMessage : errorMessage
        // count : count
    }
    return result;
}