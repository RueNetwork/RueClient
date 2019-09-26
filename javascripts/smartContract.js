window.onload = function() {


  $(document).ready(function () {

    console.log('running here');

    const websocketUrl = 'ws://localhost:8080';

    const connection = new WebSocket(websocketUrl);

    connection.onmessage = function (event) {

      const data = JSON.parse(event.data);

      console.log(data);

      if(data.sentStatus == 'COMPILED'){
        $('.contract-container').empty();

        $('.contract-container').append('<h2>Congratulations the contract was successfully compiled</h2></br>');
      }

      if(data.sentStatus == 'TRANSACTION_HASH'){

        const transactionHash = data.data;

        const ropsteinUrl = 'https://ropsten.etherscan.io/tx';

        const ropsteinTransaction = `${ropsteinUrl}/${transactionHash}`;

        $('.contract-container').append(`<h2>Congratulations the contract was successfully deployed to the blockchain & can be viewed <a target="_blank" href=${ropsteinTransaction}>here</a>. An update will be displayed here upon confirmation on the blockchain.</h2></br>`);
      }

      if(data.sentStatus == 'RECEIPT'){

        const transactionHash = data.data.transactionHash;

        const ropsteinUrl = 'https://ropsten.etherscan.io/tx';

        const ropsteinTransaction = `${ropsteinUrl}/${transactionHash}`;

        $('.contract-container').append(`<h2>Congratulations the contract was successfully confirmed on the blockchain & can be viewed <a target="_blank" href=${ropsteinTransaction}>here</a>.</h2></br>`);
      }


      if(data.sentStatus == 'ERROR'){
        $('.contract-container').append(`<h2>Unfortunately Web3 has returned an error: ${data.data}</h2></br>`);
      }





      // if contract compiled
      // if transaction hash
      // if completed transaction
      // if error


      console.log(event);
      // do conditional logic here
    };

    $('.contractButton').click(function (evt) {
      console.log('button clicked')
      // evt.preventDefault();
    });


    $('#deployContractForm').submit(function (evt) {
      console.log('form submitted');

      evt.preventDefault();


      $.ajax({
        url: '/deployContract',
        type: 'POST',
        dataType: 'json',
        data: $('form.deployContractForm').serialize(),
        success: function (data) {
          console.log(data);
          // ... do something with the data...
        }
      });


    });


  });

}


// $('.contract-container').empty()
//
// $('.contract-container').append('<h2>Congratulations the contract was successfully deployed to the blockchain and can be viewed <a href="/link">here</a>.</h2></br>');
//
//
// $('.contract-container').append('<h2>Congratulations the contract was successfully confirmed</h2></br>');
