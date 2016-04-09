describe('The vending machine', function () {
  var vendingMachine = undefined;

  beforeEach(function () {
    vendingMachine = VendingMachine.create();
    vendingMachine.setProductPriceInCents('Cola', 100);
  });

  it('displays "INSERT COINS" when no coins have been inserted', function () {
    vendingMachine.stockWithCoins(
      Nickel.create(),
      Nickel.create(),
      Dime.create()
    );

    var displayText = vendingMachine.getDisplayText();

    expect(displayText).toBe('INSERT COINS');
  });

  it('displays "EXACT CHANGE ONLY" when unable to make change', function () {
    var displayText = vendingMachine.getDisplayText();

    expect(displayText).toBe('EXACT CHANGE ONLY');
  });

  it('accepts nickels', function () {
    var originalDisplayText = vendingMachine.getDisplayText();

    var nickel = Nickel.create();
    vendingMachine.insertCoins(nickel);

    var displayText = vendingMachine.getDisplayText();

    expect(displayText).not.toBe(originalDisplayText);
  });

  it('displays "$0.05" when a nickel is inserted', function () {
    var nickel = Nickel.create();
    vendingMachine.insertCoins(nickel);

    var displayText = vendingMachine.getDisplayText();

    expect(displayText).toBe('$0.05');
  });

  it('accepts dimes', function () {
    var originalDisplayText = vendingMachine.getDisplayText();

    var dime = Dime.create();
    vendingMachine.insertCoins(dime);

    var displayText = vendingMachine.getDisplayText();

    expect(displayText).not.toBe(originalDisplayText);
  });

  it('displays "$0.10" when a dime is inserted', function () {
    var dime = Dime.create();
    vendingMachine.insertCoins(dime);

    var displayText = vendingMachine.getDisplayText();

    expect(displayText).toBe('$0.10');
  });

  it('accepts quarters', function () {
    var originalDisplayText = vendingMachine.getDisplayText();

    var quarter = Quarter.create();
    vendingMachine.insertCoins(quarter);

    var displayText = vendingMachine.getDisplayText();

    expect(displayText).not.toBe(originalDisplayText);
  });

  it('displays "$0.25" when a quarter is inserted', function () {
    var quarter = Quarter.create();
    vendingMachine.insertCoins(quarter);

    var displayText = vendingMachine.getDisplayText();

    expect(displayText).toBe('$0.25');
  });

  it('rejects pennies', function () {
    var penny = Penny.create();
    vendingMachine.insertCoins(penny);

    var coinReturnContents = vendingMachine.getCoinReturnContents();

    var coinReturnContainsPenny = coinReturnContents.containsPenny();

    expect(coinReturnContainsPenny).toBe(true);
  });

  it('displays the total amount inserted', function () {
    vendingMachine.insertCoins(
      Nickel.create(),
      Dime.create(),
      Quarter.create()
    );

    var displayText = vendingMachine.getDisplayText();

    expect(displayText).toBe('$0.40');
  });

  it('returns the coins that have been inserted when the "Return Coins" button is pressed', function () {
    vendingMachine.insertCoins(
      Nickel.create(),
      Dime.create(),
      Quarter.create()
    );

    vendingMachine.pressButton('Return Coins');
    var coinReturnContents = vendingMachine.getCoinReturnContents();

    var coinReturnContainsNickel = coinReturnContents.containsNickel();
    var coinReturnContainsDime = coinReturnContents.containsDime();
    var coinReturnContainsQuarter = coinReturnContents.containsQuarter();

    expect(coinReturnContainsNickel).toBe(true);
    expect(coinReturnContainsDime).toBe(true);
    expect(coinReturnContainsQuarter).toBe(true);
  });

  it('displays "INSERT COINS" after returning the coins', function () {
    vendingMachine.stockWithCoins(
      Nickel.create(),
      Nickel.create(),
      Dime.create()
    );

    vendingMachine.insertCoins(
      Nickel.create(),
      Dime.create(),
      Quarter.create()
    );

    vendingMachine.pressButton('Return Coins');
    var displayText = vendingMachine.getDisplayText();

    expect(displayText).toBe('INSERT COINS');
  });

  it('displays "PRICE: $1.00" when the "Cola" button is pressed before $1.00 has been inserted', function () {
    var quarter = Quarter.create();
    vendingMachine.insertCoins(quarter);

    vendingMachine.pressButton('Cola');
    var displayText = vendingMachine.getDisplayText();

    expect(displayText).toBe('PRICE: $1.00');
  });
});

describe('The vending machine timer', function () {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

  var vendingMachine = undefined;

  beforeEach(function (done) {
    vendingMachine = VendingMachine.create();
    vendingMachine.setProductPriceInCents('Cola', 100);

    vendingMachine.insertCoins(
      Quarter.create(),
      Quarter.create(),
      Quarter.create()
    );

    vendingMachine.pressButton('Cola');

    setTimeout(function () {
      done();
    }, 5000);
  });

  it('changes "PRICE: $1.00" back to the total amount inserted after five seconds', function () {
    var displayText = vendingMachine.getDisplayText();

    expect(displayText).toBe('$0.75');
  });
});

describe('The vending machine', function () {
  var vendingMachine = undefined;

  beforeEach(function () {
    vendingMachine = VendingMachine.create();
  });

  it('displays "SOLD OUT" when the selected product is out of stock', function () {
    vendingMachine.insertCoins(
      Quarter.create(),
      Quarter.create(),
      Quarter.create(),
      Quarter.create()
    );

    vendingMachine.pressButton('Cola');
    var displayText = vendingMachine.getDisplayText();

    expect(displayText).toBe('SOLD OUT');
  });

  it('dispenses cola when cola is purchased', function () {
    var cola = Cola.create();
    vendingMachine.stockWithProducts(cola);

    vendingMachine.insertCoins(
      Quarter.create(),
      Quarter.create(),
      Quarter.create(),
      Quarter.create()
    );

    vendingMachine.pressButton('Cola');
    var outputBinContents = vendingMachine.getOutputBinContents();

    var outputBinContainsCola = outputBinContents.containsCola();

    expect(outputBinContainsCola).toBe(true);
  });

  it('dispenses chips when chips are purchased', function () {
    var chips = Chips.create();
    vendingMachine.stockWithProducts(chips);

    vendingMachine.insertCoins(
      Quarter.create(),
      Quarter.create()
    );

    vendingMachine.pressButton('Chips');
    var outputBinContents = vendingMachine.getOutputBinContents();

    var outputBinContainsChips = outputBinContents.containsChips();

    expect(outputBinContainsChips).toBe(true);
  });

  it('dispenses candy when candy is purchased', function () {
    var candy = Candy.create();
    vendingMachine.stockWithProducts(candy);

    vendingMachine.insertCoins(
      Quarter.create(),
      Quarter.create(),
      Dime.create(),
      Nickel.create()
    );

    vendingMachine.pressButton('Candy');
    var outputBinContents = vendingMachine.getOutputBinContents();

    var outputBinContainsCandy = outputBinContents.containsCandy();

    expect(outputBinContainsCandy).toBe(true);
  });

  it('displays "THANK YOU" when an item is purchased', function () {
    var cola = Cola.create();
    vendingMachine.stockWithProducts(cola);

    vendingMachine.insertCoins(
      Quarter.create(),
      Quarter.create(),
      Quarter.create(),
      Quarter.create()
    );

    vendingMachine.pressButton('Cola');
    var displayText = vendingMachine.getDisplayText();

    expect(displayText).toBe('THANK YOU');
  });
});

describe('The vending machine timer', function () {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

  var vendingMachine = undefined;

  beforeEach(function (done) {
    vendingMachine = VendingMachine.create();

    vendingMachine.stockWithCoins(
      Nickel.create(),
      Nickel.create(),
      Dime.create()
    );

    var cola = Cola.create();
    vendingMachine.stockWithProducts(cola);

    vendingMachine.insertCoins(
      Quarter.create(),
      Quarter.create(),
      Quarter.create(),
      Quarter.create()
    );

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

describe('The vending machine', function () {
  var vendingMachine = undefined;

  beforeEach(function () {
    vendingMachine = VendingMachine.create();
    vendingMachine.setProductPriceInCents('Candy', 65);
  });

  it('makes change when the amount inserted exceeds the cost of the product purchased', function () {
    var dime = Dime.create();
    vendingMachine.stockWithCoins(dime);

    var candy = Candy.create();
    vendingMachine.stockWithProducts(candy);

    vendingMachine.insertCoins(
      Quarter.create(),
      Quarter.create(),
      Quarter.create()
    );

    vendingMachine.pressButton('Candy');
    var coinReturnContents = vendingMachine.getCoinReturnContents();

    var coinReturnContainsDime = coinReturnContents.containsDime();

    expect(coinReturnContainsDime).toBe(true);
  });
});

describe('Coins', function () {
  describe('Pennies', function () {
    var penny = Penny.create();

    var pennyWeightInGrams = penny.getWeightInGrams();
    var pennyDiameterInMillimeters = penny.getDiameterInMillimeters();
    var pennyThicknessInMillimeters = penny.getThicknessInMillimeters();

    it('weigh 2.5 g', function () {
      expect(pennyWeightInGrams).toBe(2.5);
    });

    it('are 19.05 mm in diameter', function () {
      expect(pennyDiameterInMillimeters).toBe(19.05);
    });

    it('are 1.52 mm thick', function () {
      expect(pennyThicknessInMillimeters).toBe(1.52);
    });
  });

  describe('Nickels', function () {
    var nickel = Nickel.create();

    var nickelWeightInGrams = nickel.getWeightInGrams();
    var nickelDiameterInMillimeters = nickel.getDiameterInMillimeters();
    var nickelThicknessInMillimeters = nickel.getThicknessInMillimeters();

    it('weigh 5 g', function () {
      expect(nickelWeightInGrams).toBe(5);
    });

    it('are 21.21 mm in diameter', function () {
      expect(nickelDiameterInMillimeters).toBe(21.21);
    });

    it('are 1.95 mm thick', function () {
      expect(nickelThicknessInMillimeters).toBe(1.95);
    });
  });

  describe('Dimes', function () {
    var dime = Dime.create();

    var dimeWeightInGrams = dime.getWeightInGrams();
    var dimeDiameterInMillimeters = dime.getDiameterInMillimeters();
    var dimeThicknessInMillimeters = dime.getThicknessInMillimeters();

    it('weigh 2.268 g', function () {
      expect(dimeWeightInGrams).toBe(2.268);
    });

    it('are 17.91 mm in diameter', function () {
      expect(dimeDiameterInMillimeters).toBe(17.91);
    });

    it('are 1.35 mm thick', function () {
      expect(dimeThicknessInMillimeters).toBe(1.35);
    });
  });

  describe('Quarters', function () {
    var quarter = Quarter.create();

    var quarterWeightInGrams = quarter.getWeightInGrams();
    var quarterDiameterInMillimeters = quarter.getDiameterInMillimeters();
    var quarterThicknessInMillimeters = quarter.getThicknessInMillimeters();

    it('weigh 5.67 g', function () {
      expect(quarterWeightInGrams).toBe(5.67);
    });

    it('are 24.26 mm in diameter', function () {
      expect(quarterDiameterInMillimeters).toBe(24.26);
    });

    it('are 1.75 mm thick', function () {
      expect(quarterThicknessInMillimeters).toBe(1.75);
    });
  });
});

describe('Products', function () {
  var productPricer = ProductPricer.create();

  productPricer.setProductPriceInCents('Cola', 100);
  productPricer.setProductPriceInCents('Chips', 50);
  productPricer.setProductPriceInCents('Candy', 65);

  describe('Cola', function () {
    var colaPriceInCents = productPricer.getProductPriceInCents('Cola');

    it('costs $1.00', function () {
      expect(colaPriceInCents).toBe(100);
    });
  });

  describe('Chips', function () {
    var chipsPriceInCents = productPricer.getProductPriceInCents('Chips');

    it('cost $0.50', function () {
      expect(chipsPriceInCents).toBe(50);
    });
  });

  describe('Candy', function () {
    var candyPriceInCents = productPricer.getProductPriceInCents('Candy');

    it('costs $0.65', function () {
      expect(candyPriceInCents).toBe(65);
    });
  });
});
