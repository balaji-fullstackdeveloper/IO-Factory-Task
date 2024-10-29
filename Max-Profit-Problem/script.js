/**
 * Recommend a business based on the given time unit.
 */
function recommendBusiness(unit) {
  const businesses = [
    { name: "T", earning: 1500, developmentTime: 5 },
    { name: "P", earning: 1000, developmentTime: 4 },
    { name: "C", earning: 3000, developmentTime: 10 },
  ];
  const maxEarnings = { T: 0, P: 0, C: 0, earnings: 0 };
  let results = [];
  for (const business of businesses) {
    if (business.developmentTime <= unit) {
      // Calculate the number of times the business can be developed
      const time = Math.floor(unit / business.developmentTime);
      // Calculate the total earnings from developing the business
      const earnings =
        (unit - business.developmentTime * time) * business.earning;
      if (maxEarnings.earnings < earnings) {
        // Clear the previous results and add the current business to the results
        maxEarnings.T = 0;
        maxEarnings.P = 0;
        maxEarnings.C = 0;
        maxEarnings[business.name] = time;
        maxEarnings.earnings = earnings;
      } else if (maxEarnings.earnings === earnings) {
        // Add the current business to the results if it has the same earnings
        const maxEarnings1 = { T: 0, P: 0, C: 0, earnings: 0 };
        maxEarnings1[business.name] = time;
        maxEarnings1.earnings = earnings;
        results.push(maxEarnings1);
      }
    }
  }
  results.push(maxEarnings);
  return results;
}

/**
 * Render the output of the recommendation based on the given time unit.
 */
function renderOutput() {
  const timeUnitInput = document.getElementById("Time").value;
  if (timeUnitInput) {
    const result = recommendBusiness(timeUnitInput);
    document.getElementById(
      "card"
    ).innerHTML = ` <div class="box"><h2>Output:</h2>
  <p>Time Unit:${timeUnitInput}</p>
  <p>
    Earnings:<span>$${result[0].earnings}</span>
  </p>
  <p>Solutions:</p><ul>
 
      ${result.map(
        (value) =>
          `<li>
      T:${value.T} P:${value.P} C:${value.C}
        </li>`
      )}
    </ul></div>`;
  } else {
    alert("Invalid Input");
  }
}
