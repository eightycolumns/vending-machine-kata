describe('Vending machine', function () {
  describe('A penny', function () {
    var penny = Penny.create();

    it('weighs 2.5 g', function () {
      expect(penny.getWeightInGrams()).toBe(2.5);
    });

    it('is 19.05 mm in diameter', function () {
      expect(penny.getDiameterInMillimeters()).toBe(19.05);
    });
  });
});
