describe('Vending machine', function () {
  describe('A penny', function () {
    it('weighs 2.5 g', function () {
      var penny = Penny.create();
      expect(penny.getWeightInGrams()).toBe(2.5);
    });
    it('is 19.05 mm in diameter', function () {
      var penny = Penny.create();
      expect(penny.getDiameterInMillimeters()).toBe(19.05);
    });
  });
});
