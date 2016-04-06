describe('Coins', function () {
  describe('A penny', function () {
    var penny = Penny.create();

    it('weighs 2.5 g', function () {
      expect(penny.getWeightInGrams()).toBe(2.5);
    });

    it('is 19.05 mm in diameter', function () {
      expect(penny.getDiameterInMillimeters()).toBe(19.05);
    });

    it('is 1.52 mm thick', function () {
      expect(penny.getThicknessInMillimeters()).toBe(1.52);
    });
  });

  describe('A nickel', function () {
    var nickel = Nickel.create();

    it('weighs 5 g', function () {
      expect(nickel.getWeightInGrams()).toBe(5);
    });

    it('is 21.21 mm in diameter', function () {
      expect(nickel.getDiameterInMillimeters()).toBe(21.21);
    });

    it('is 1.95 mm thick', function () {
      expect(nickel.getThicknessInMillimeters()).toBe(1.95);
    });
  });

  describe('A dime', function () {
    var dime = Dime.create();

    it('weighs 2.268 g', function () {
      expect(dime.getWeightInGrams()).toBe(2.268);
    });

    it('is 17.91 mm in diameter', function () {
      expect(dime.getDiameterInMillimeters()).toBe(17.91);
    });

    it('is 1.35 mm thick', function () {
      expect(dime.getThicknessInMillimeters()).toBe(1.35);
    });
  });

  describe('A quarter', function () {
    var quarter = Quarter.create();

    it('weighs 5.67 g', function () {
      expect(quarter.getWeightInGrams()).toBe(5.67);
    });

    it('is 24.26 mm in diameter', function () {
      expect(quarter.getDiameterInMillimeters()).toBe(24.26);
    });

    it('is 1.75 mm thick', function () {
      expect(quarter.getThicknessInMillimeters()).toBe(1.75);
    });
  });
});

describe('Products', function () {
  describe('Cola', function () {
    var cola = Cola.create();

    it('costs $1.00', function () {
      expect(cola.getCostInCents()).toBe(100);
    });
  });

  describe('Chips', function () {
    var chips = Chips.create();

    it('cost $0.50', function () {
      expect(chips.getCostInCents()).toBe(50);
    });
  });

  describe('Candy', function () {
    var candy = Candy.create();

    it('costs $0.65', function () {
      expect(candy.getCostInCents()).toBe(65);
    });
  });
});

describe('The vending machine', function () {
  var vendingMachine = undefined;

  beforeEach(function () {
    vendingMachine = VendingMachine.create();
  });

  it('accepts nickels', function () {
    var nickel = Nickel.create();
    vendingMachine.onCoinInserted(nickel);
    var coinsInVendingMachine = vendingMachine.getCoinsOnHand();

    expect(coinsInVendingMachine).toContain(nickel);
  });

  it('accepts dimes', function () {
    var dime = Dime.create();
    vendingMachine.onCoinInserted(dime);
    var coinsInVendingMachine = vendingMachine.getCoinsOnHand();

    expect(coinsInVendingMachine).toContain(dime);
  });

  it('accepts quarters', function () {
    var quarter = Quarter.create();
    vendingMachine.onCoinInserted(quarter);
    var coinsInVendingMachine = vendingMachine.getCoinsOnHand();

    expect(coinsInVendingMachine).toContain(quarter);
  });

  it('rejects pennies', function () {
    var penny = Penny.create();
    vendingMachine.onCoinInserted(penny);
    var coinReturnContents = vendingMachine.getCoinReturnContents();

    expect(coinReturnContents).toContain(penny);
  });

  it('dispenses cola when cola is purchased', function () {
    var quarter1 = Quarter.create();
    vendingMachine.onCoinInserted(quarter1);

    var quarter2 = Quarter.create();
    vendingMachine.onCoinInserted(quarter2);

    var quarter3 = Quarter.create();
    vendingMachine.onCoinInserted(quarter3);

    var quarter4 = Quarter.create();
    vendingMachine.onCoinInserted(quarter4);

    vendingMachine.onButtonPressed('Cola');
    var outputBinContents = vendingMachine.outputBin.getContents();

    var outputBinContainsCola = outputBinContents.some(function (product) {
      var cola = Cola.create();
      cola = JSON.stringify(cola);
      product = JSON.stringify(product);

      return product === cola;
    });

    expect(outputBinContainsCola).toBe(true);
  });

  it('dispenses chips when chips are purchased', function () {
    var quarter1 = Quarter.create();
    vendingMachine.onCoinInserted(quarter1);

    var quarter2 = Quarter.create();
    vendingMachine.onCoinInserted(quarter2);

    vendingMachine.onButtonPressed('Chips');
    var outputBinContents = vendingMachine.outputBin.getContents();

    var outputBinContainsChips = outputBinContents.some(function (product) {
      var chips = Chips.create();
      chips = JSON.stringify(chips);
      product = JSON.stringify(product);

      return product === chips;
    });

    expect(outputBinContainsChips).toBe(true);
  });

  it('dispenses candy when candy is purchased', function () {
    var quarter1 = Quarter.create();
    vendingMachine.onCoinInserted(quarter1);

    var quarter2 = Quarter.create();
    vendingMachine.onCoinInserted(quarter2);

    var dime = Dime.create();
    vendingMachine.onCoinInserted(dime);

    var nickel = Nickel.create();
    vendingMachine.onCoinInserted(nickel);

    vendingMachine.onButtonPressed('Candy');
    var outputBinContents = vendingMachine.outputBin.getContents();

    var outputBinContainsCandy = outputBinContents.some(function (product) {
      var candy = Candy.create();
      candy = JSON.stringify(candy);
      product = JSON.stringify(product);

      return product === candy;
    });

    expect(outputBinContainsCandy).toBe(true);
  });

  it('makes change when the amount inserted exceeds the cost of the product purchased', function () {
    var quarter1 = Quarter.create();
    vendingMachine.onCoinInserted(quarter1);

    var quarter2 = Quarter.create();
    vendingMachine.onCoinInserted(quarter2);

    var quarter3 = Quarter.create();
    vendingMachine.onCoinInserted(quarter3);

    vendingMachine.onButtonPressed('Candy');
    var coinReturnContents = vendingMachine.coinReturn.getContents();

    var coinReturnContainsDime = coinReturnContents.some(function (coin) {
      var dime = Dime.create();
      dime = JSON.stringify(dime);
      coin = JSON.stringify(coin);

      return coin === dime;
    });

    expect(coinReturnContainsDime).toBe(true);
  });

  describe('has a display', function () {
    it('that reads "INSERT COINS" when no coins have been inserted', function () {
      var displayText = vendingMachine.getDisplayText();
      expect(displayText).toBe('INSERT COINS');
    });

    it('that reads "$0.05" when a nickel is inserted', function () {
      var nickel = Nickel.create();
      vendingMachine.onCoinInserted(nickel);
      var displayText = vendingMachine.getDisplayText();

      expect(displayText).toBe('$0.05');
    });

    it('that reads "$0.10" when a dime is inserted', function () {
      var dime = Dime.create();
      vendingMachine.onCoinInserted(dime);
      var displayText = vendingMachine.getDisplayText();

      expect(displayText).toBe('$0.10');
    });

    it('that shows the total amount inserted', function () {
      var quarter1 = Quarter.create();
      vendingMachine.onCoinInserted(quarter1);

      var quarter2 = Quarter.create();
      vendingMachine.onCoinInserted(quarter2);

      var quarter3 = Quarter.create();
      vendingMachine.onCoinInserted(quarter3);

      var quarter4 = Quarter.create();
      vendingMachine.onCoinInserted(quarter4);

      var displayText = vendingMachine.getDisplayText();

      expect(displayText).toBe('$1.00');
    });

    it('that shows the price when a button is pressed before enough money has been inserted', function () {
      var quarter = Quarter.create();
      vendingMachine.onCoinInserted(quarter);

      vendingMachine.onButtonPressed('Cola');
      var displayText = vendingMachine.getDisplayText();

      expect(displayText).toBe('PRICE: $1.00');
    });

    it('that says "THANK YOU" when an item is purchased', function () {
      var quarter1 = Quarter.create();
      vendingMachine.onCoinInserted(quarter1);

      var quarter2 = Quarter.create();
      vendingMachine.onCoinInserted(quarter2);

      var quarter3 = Quarter.create();
      vendingMachine.onCoinInserted(quarter3);

      var quarter4 = Quarter.create();
      vendingMachine.onCoinInserted(quarter4);

      vendingMachine.onButtonPressed('Cola');
      var displayText = vendingMachine.getDisplayText();

      expect(displayText).toBe('THANK YOU');
    });
  });
});
