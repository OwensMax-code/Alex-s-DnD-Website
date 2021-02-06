app.controller("rollerController", function($scope) {

    $scope.rollDice = () => {
        $scope.allMyRolls = [[],[],[],[],[],[]];
        $scope.allMyRolls.forEach(rollSet => {
            rollSet = populateRoll(rollSet);
        });
        displayResults($scope.allMyRolls);
    }

    populateRoll = (newRollArray = []) => {
        while (newRollArray.length < 4) {
            newRollArray.push(Math.floor((Math.random() * 6) + 1));
        }
        return newRollArray;
    }

    displayResults = (newAllMyRolls = []) => {
        var parentDiv = document.getElementById("roll-display");
        var allMyDisplays = [];
        parentDiv.innerHTML = "";
        newAllMyRolls.forEach(rollSet => {
            rollSet.sort(function(a, b) {return b - a});
            allMyDisplays.push(createSingleDisplay(rollSet));
        })
        allMyDisplays.forEach(rollDisplay => {
            parentDiv.appendChild(rollDisplay);
        })
    }

    createSingleDisplay = (newRollSet) => {
        var allMyLines = ["1st roll: ",
                         "2nd roll: ",
                          "3rd roll: ",
                          "4th roll: "],
        index = 0,
        rollSum = 0,
        rollH1Text,
        rollH1,
        rollSumText,
        rollSumH2 = document.createElement("h2");
        displayDiv = document.createElement("div");
        newRollSet.forEach(roll => {
            rollH1Text = document.createTextNode(allMyLines[index] + roll.toString());
            rollH1 = document.createElement("h4");
            if (index == 3) {
                rollH1.style.textDecoration = "line-through";
            }
            else {
                rollSum = (rollSum + roll);
            }
            rollH1.appendChild(rollH1Text);
            displayDiv.appendChild(rollH1);
            index++;
        });
        rollSumText = document.createTextNode(`Sum: ${rollSum.toString()}`);
        rollSumH2.appendChild(rollSumText);
        displayDiv.appendChild(rollSumH2);
        displayDiv.classList.add("border","border-info","rounded");
        displayDiv.style.padding = "1rem";
        return displayDiv;
    }

});
