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
      expect(cola.getCostInDollars()).toBe(1);
    });
  });

  describe('Chips', function () {
    var chips = Chips.create();

    it('cost $0.50', function () {
      expect(chips.getCostInDollars()).toBe(0.5);
    });
  });

  describe('Candy', function () {
    var candy = Candy.create();

    it('costs $0.65', function () {
      expect(candy.getCostInDollars()).toBe(0.65);
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

  describe('has a display', function () {
    it('that reads "INSERT COIN" when no coins have been inserted', function () {
      var displayText = vendingMachine.getDisplayText();
      expect(displayText).toBe('INSERT COIN');
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
  });
});
