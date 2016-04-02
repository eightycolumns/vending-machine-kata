describe('Vending machine', function () {
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
});
