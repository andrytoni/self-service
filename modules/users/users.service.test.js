test('Morango deve existir na array de frutas', () => {
  const frutas = ['morango', 'abacaxi', 'banana', 'laranja'];
  expect(frutas).toContain('morango');
  expect(frutas).not.toContain('maracujá');
});

// funçoes to be defined
