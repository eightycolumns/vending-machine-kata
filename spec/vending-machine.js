describe('The vending machine', function () {
  var vendingMachine = undefined;

  beforeEach(function () {
    vendingMachine = VendingMachine.create();
  });

  it('displays "INSERT COINS" when no coins have been inserted', function () {
    vendingMachine.stockWithCoins([
      Nickel.create(),
      Nickel.create(),
      Dime.create()
    ]);

    var displayText = vendingMachine.getDisplayText();

    expect(displayText).toBe('INSERT COINS');
  });

  it('displays "EXACT CHANGE ONLY" when unable to make change', function () {
    var displayText = vendingMachine.getDisplayText();

    expect(displayText).toBe('EXACT CHANGE ONLY');
  });

  it('accepts nickels', function () {
    var originalDisplayText = vendingMachine.getDisplayText();

    vendingMachine.insertCoins([
      Nickel.create()
    ]);

    var displayText = vendingMachine.getDisplayText();

    expect(displayText).not.toBe(originalDisplayText);
  });

  it('displays "$0.05" when a nickel is inserted', function () {
    vendingMachine.insertCoins([
      Nickel.create()
    ]);

    var displayText = vendingMachine.getDisplayText();

    expect(displayText).toBe('$0.05');
  });

  it('accepts dimes', function () {
    var originalDisplayText = vendingMachine.getDisplayText();

    vendingMachine.insertCoins([
      Dime.create()
    ]);

    var displayText = vendingMachine.getDisplayText();

    expect(displayText).not.toBe(originalDisplayText);
  });

  it('displays "$0.10" when a dime is inserted', function () {
    vendingMachine.insertCoins([
      Dime.create()
    ]);

    var displayText = vendingMachine.getDisplayText();

    expect(displayText).toBe('$0.10');
  });

  it('accepts quarters', function () {
    var originalDisplayText = vendingMachine.getDisplayText();

    vendingMachine.insertCoins([
      Quarter.create()
    ]);

    var displayText = vendingMachine.getDisplayText();

    expect(displayText).not.toBe(originalDisplayText);
  });

  it('displays "$0.25" when a quarter is inserted', function () {
    vendingMachine.insertCoins([
      Quarter.create()
    ]);

    var displayText = vendingMachine.getDisplayText();

    expect(displayText).toBe('$0.25');
  });

  it('rejects pennies', function () {
    vendingMachine.insertCoins([
      Penny.create()
    ]);

    var coinReturnContents = vendingMachine.getCoinReturnContents();

    expect(coinReturnContents.containsPenny()).toBe(true);
  });

  it('displays the total amount inserted', function () {
    vendingMachine.insertCoins([
      Nickel.create(),
      Dime.create(),
      Quarter.create()
    ]);

    var displayText = vendingMachine.getDisplayText();

    expect(displayText).toBe('$0.40');
  });

  it('returns the coins that have been inserted when the "Return Coins" button is pressed', function () {
    vendingMachine.insertCoins([
      Nickel.create(),
      Dime.create(),
      Quarter.create()
    ]);

    vendingMachine.pressButton('Return Coins');
    var coinReturnContents = vendingMachine.getCoinReturnContents();

    expect(coinReturnContents.containsNickel()).toBe(true);
    expect(coinReturnContents.containsDime()).toBe(true);
    expect(coinReturnContents.containsQuarter()).toBe(true);
  });

  it('displays "INSERT COINS" after returning the coins', function () {
    vendingMachine.stockWithCoins([
      Nickel.create(),
      Nickel.create(),
      Dime.create()
    ]);

    vendingMachine.insertCoins([
      Nickel.create(),
      Dime.create(),
      Quarter.create()
    ]);

    vendingMachine.pressButton('Return Coins');
    var displayText = vendingMachine.getDisplayText();

    expect(displayText).toBe('INSERT COINS');
  });

  it('displays the cost of the product when a button is pressed before enough money has been inserted', function () {
    vendingMachine.insertCoins([
      Quarter.create()
    ]);

    vendingMachine.pressButton('Cola');
    var displayText = vendingMachine.getDisplayText();

    expect(displayText).toBe('PRICE: $1.00');
  });

  it('displays "SOLD OUT" when the selected product is out of stock', function () {
    vendingMachine.insertCoins([
      Quarter.create(),
      Quarter.create(),
      Quarter.create(),
      Quarter.create()
    ]);

    vendingMachine.pressButton('Cola');
    var displayText = vendingMachine.getDisplayText();

    expect(displayText).toBe('SOLD OUT');
  });

  it('dispenses cola when cola is purchased', function () {
    vendingMachine.stockWithProducts([
      Cola.create()
    ]);

    vendingMachine.insertCoins([
      Quarter.create(),
      Quarter.create(),
      Quarter.create(),
      Quarter.create()
    ]);

    vendingMachine.pressButton('Cola');
    var outputBinContents = vendingMachine.getOutputBinContents();

    expect(outputBinContents.containsCola()).toBe(true);
  });

  it('dispenses chips when chips are purchased', function () {
    vendingMachine.stockWithProducts([
      Chips.create()
    ]);

    vendingMachine.insertCoins([
      Quarter.create(),
      Quarter.create()
    ]);

    vendingMachine.pressButton('Chips');
    var outputBinContents = vendingMachine.getOutputBinContents();

    expect(outputBinContents.containsChips()).toBe(true);
  });

  it('dispenses candy when candy is purchased', function () {
    vendingMachine.stockWithProducts([
      Candy.create()
    ]);

    vendingMachine.insertCoins([
      Quarter.create(),
      Quarter.create(),
      Dime.create(),
      Nickel.create()
    ]);

    vendingMachine.pressButton('Candy');
    var outputBinContents = vendingMachine.getOutputBinContents();

    expect(outputBinContents.containsCandy()).toBe(true);
  });

  it('displays "THANK YOU" when an item is purchased', function () {
    vendingMachine.stockWithProducts([
      Cola.create()
    ]);

    vendingMachine.insertCoins([
      Quarter.create(),
      Quarter.create(),
      Quarter.create(),
      Quarter.create()
    ]);

    vendingMachine.pressButton('Cola');
    var displayText = vendingMachine.getDisplayText();

    expect(displayText).toBe('THANK YOU');
  });

  it('makes change when the amount inserted exceeds the cost of the product purchased', function () {
    vendingMachine.stockWithCoins([
      Dime.create()
    ]);

    vendingMachine.stockWithProducts([
      Candy.create()
    ]);

    vendingMachine.insertCoins([
      Quarter.create(),
      Quarter.create(),
      Quarter.create()
    ]);

    vendingMachine.pressButton('Candy');
    var coinReturnContents = vendingMachine.getCoinReturnContents();

    expect(coinReturnContents.containsDime()).toBe(true);
  });
});

describe('The vending machine timer', function () {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

  var vendingMachine = undefined;

  beforeEach(function (done) {
    vendingMachine = VendingMachine.create();

    vendingMachine.stockWithCoins([
      Nickel.create(),
      Nickel.create(),
      Dime.create()
    ]);

    vendingMachine.stockWithProducts([
      Cola.create()
    ]);

    vendingMachine.insertCoins([
      Quarter.create(),
      Quarter.create(),
      Quarter.create(),
      Quarter.create()
    ]);

    vendingMachine.pressButton('Cola');

    setTimeout(function () {
      done();
    }, 5000);
  });

  it('changes "THANK YOU" back to "INSERT COINS" after five seconds', function () {
    var displayText = vendingMachine.getDisplayText();

    expect(displayText).toBe('INSERT COINS');
  });
});

describe('Coins', function () {
  describe('Pennies', function () {
    var penny = Penny.create();

    it('weigh 2.5 g', function () {
      expect(penny.getWeightInGrams()).toBe(2.5);
    });

    it('are 19.05 mm in diameter', function () {
      expect(penny.getDiameterInMillimeters()).toBe(19.05);
    });

    it('are 1.52 mm thick', function () {
      expect(penny.getThicknessInMillimeters()).toBe(1.52);
    });
  });

  describe('Nickels', function () {
    var nickel = Nickel.create();

    it('weigh 5 g', function () {
      expect(nickel.getWeightInGrams()).toBe(5);
    });

    it('are 21.21 mm in diameter', function () {
      expect(nickel.getDiameterInMillimeters()).toBe(21.21);
    });

    it('are 1.95 mm thick', function () {
      expect(nickel.getThicknessInMillimeters()).toBe(1.95);
    });
  });

  describe('Dimes', function () {
    var dime = Dime.create();

    it('weigh 2.268 g', function () {
      expect(dime.getWeightInGrams()).toBe(2.268);
    });

    it('are 17.91 mm in diameter', function () {
      expect(dime.getDiameterInMillimeters()).toBe(17.91);
    });

    it('are 1.35 mm thick', function () {
      expect(dime.getThicknessInMillimeters()).toBe(1.35);
    });
  });

  describe('Quarter', function () {
    var quarter = Quarter.create();

    it('weigh 5.67 g', function () {
      expect(quarter.getWeightInGrams()).toBe(5.67);
    });

    it('are 24.26 mm in diameter', function () {
      expect(quarter.getDiameterInMillimeters()).toBe(24.26);
    });

    it('are 1.75 mm thick', function () {
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
