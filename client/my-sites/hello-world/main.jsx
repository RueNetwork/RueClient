/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
import Main from 'components/main';

export default class HelloWorld extends React.Component {
  componentDidMount() {
    const jquery = document.createElement("script");
    jquery.src = "/jQuery.js";

    // script.innerHTML = "var connection = new WebSocket('ws://localhost:8080'); connection.onmessage = function(message){ console.log(message) }"
    document.body.appendChild(jquery);


    const script = document.createElement("script");
    script.src = "/smartContract.js";

    // script.innerHTML = "var connection = new WebSocket('ws://localhost:8080'); connection.onmessage = function(message){ console.log(message) }"
    document.body.appendChild(script);



  }

  render() {
    return (
      <Main className="hello-world">
        <div class="contract-container">
          <h1 className="hello-world__title">Deploy Token</h1>
          <br />
          <form class="deployContractForm" id="deployContractForm" action="/deployContract" type="POST">
            <label>Name Of Token</label>
            <br />
            <input type="text" name="token-name" class="token-input" required defaultValue="ZenMediaToken"></input>
            <br />
            <br />

            <label>Token Symbol</label>
            <br />
            <input type="text" name="token-symbol" class="token-input" required defaultValue="ZENMEDIA"></input>
            <br />
            <br />

            <label>How Many Decimal Places (1-8)</label>
            <br />
            <input type="number" name="decimal-places" min="1" max="8" class="token-input" required defaultValue="8"></input>
            <br />
            <br />

            <label>Amount Of Tokens To Be Issued</label>
            <br />
            <input type="number" name="total-supply" min="1" class="token-input" required defaultValue="1000000000000"></input>
            <br />
            <br />

            <label>Select Asset Type</label>
            <div class="contract-radio">
              <input type="radio" id="huey" name="drone" value="huey" checked ></input>
              <label for="huey">ERC-20</label>
            </div>
            <div class="contract-radio">
              <input type="radio" id="huey" name="drone" value="huey" disabled></input>
              <label for="huey">ERC-721</label>
            </div>
            <br />

            <label>Contract Signature Type</label>
            <div class="contract-radio1 margin-top-4">
              <input type="radio" id="signature" name="signature" value="signature" checked ></input>
              <label for="huey">Single Signature</label>
            </div>
            <div class="contract-radio1">
              <input type="radio" id="signature" name="signature" value="signature" disabled></input>
              <label for="huey">Multiple Signatures</label>
            </div>
            <br />

            <label>Allow New Tokens To Be Mined</label>
            <div class="contract-radio margin-top-4">
              <input type="radio" id="newTokens" name="newTokens" value="newTokens" checked ></input>
              <label for="huey">Disallowed</label>
            </div>
            <div class="contract-radio">
              <input type="radio" id="newTokens" name="newTokens" value="newTokens" disabled></input>
              <label for="huey">Allowed</label>
            </div>
            <br />

            <label>Allow Tokens To Be Frozen From Contract</label>
            <div class="contract-radio margin-top-4">
              <input type="radio" id="frozenTokens" name="frozenTokens" value="frozenTokens" checked ></input>
              <label for="huey">Disallowed</label>
            </div>
            <div class="contract-radio">
              <input type="radio" id="frozenTokens" name="frozenTokens" value="frozenTokens" disabled></input>
              <label for="huey">Allowed</label>
            </div>
            <br />

            <label>Only Allow Whitelisted Addresses To Use Token</label>
            <div class="contract-radio1 margin-top-4">
              <input type="radio" id="frozenTokens" name="whitelistedAdresses" value="whitelistedAdresses" checked ></input>
              <label for="huey">All Addresses</label>
            </div>
            <div class="contract-radio1">
              <input type="radio" id="frozenTokens" name="whitelistedAdresses" value="whitelistedAdresses" disabled></input>
              <label for="huey">Only Whitelisted</label>
            </div>
            <br />


            {/*<label>Amount Of Tokens Reserved For Team</label>*/}
            {/*<br />*/}
            {/*<input type="number" name="quantity" min="1" class="token-input"></input>*/}
            {/*<br />*/}
            {/*<br />*/}

            {/*<label>Address To Receive Team Tokens</label>*/}
            {/*<br />*/}
            {/*<input type="text" class="token-input" ></input>*/}
            {/*<br />*/}
            {/*<br />*/}

            <button class="button contractButton" type="submit">GENERATE AND DEPLOY CONTRACT</button>
          </form>
        </div>



        <script src="https://cdnjs.cloudflare.com/ajax/libs/sweetalert/2.1.2/sweetalert.min.js"></script>

      </Main>
    );
  }
}